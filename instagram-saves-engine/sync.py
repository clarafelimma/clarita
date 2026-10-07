#!/usr/bin/env python3
"""Sincroniza os posts salvos do Instagram com um banco de dados do Notion."""
import json
import logging
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import requests
from notion_client import Client

BASE = Path(__file__).resolve().parent
CONFIG_FILE = BASE / "config.json"
STATE_FILE = BASE / "state.json"
LOG_FILE = BASE / "sync.log"

IG = "https://www.instagram.com"
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    ),
    "X-IG-App-ID": "936619743392459",
    "X-Requested-With": "XMLHttpRequest",
    "Referer": IG + "/",
}

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
    handlers=[logging.StreamHandler(sys.stdout), logging.FileHandler(LOG_FILE)],
)
log = logging.getLogger("sync")


def load_config():
    if not CONFIG_FILE.exists():
        sys.exit("config.json não encontrado. Copie config.example.json e preencha.")
    return json.loads(CONFIG_FILE.read_text())


def load_state():
    if STATE_FILE.exists():
        return set(json.loads(STATE_FILE.read_text()))
    return set()


def save_state(ids):
    STATE_FILE.write_text(json.dumps(sorted(ids)))


def make_session(cfg):
    s = requests.Session()
    s.headers.update(HEADERS)
    s.headers["X-CSRFToken"] = cfg["ig_csrftoken"]
    s.cookies.set("sessionid", cfg["ig_session_id"], domain=".instagram.com")
    s.cookies.set("csrftoken", cfg["ig_csrftoken"], domain=".instagram.com")
    s.cookies.set("ds_user_id", str(cfg["ig_user_id"]), domain=".instagram.com")
    return s


def validate_session(s):
    r = s.get(f"{IG}/api/v1/accounts/edit/web_form_data/", timeout=30)
    if r.status_code != 200:
        sys.exit("Sessão do Instagram inválida ou expirada. Atualize os cookies no config.json.")
    try:
        user = r.json()["form_data"]["username"]
    except Exception:
        user = "?"
    log.info("Sessão do Instagram válida para @%s", user)


def fetch_collections(s):
    """Retorna {collection_id: nome}."""
    r = s.get(
        f"{IG}/api/v1/collections/list/",
        params={"collection_types": json.dumps(
            ["ALL_MEDIA_AUTO_COLLECTION", "PRODUCT_AUTO_COLLECTION", "MEDIA"])},
        timeout=30,
    )
    r.raise_for_status()
    items = r.json().get("items", [])
    log.info("Encontradas %d coleções", len(items))
    return {str(i["collection_id"]): i["collection_name"] for i in items}


def fetch_saved(s, collection_id=None):
    """Itera sobre os posts salvos (de uma coleção, se informada)."""
    url = (f"{IG}/api/v1/feed/collection/{collection_id}/posts/"
           if collection_id else f"{IG}/api/v1/feed/saved/posts/")
    max_id = None
    while True:
        params = {"count": 50}
        if max_id:
            params["max_id"] = max_id
        r = s.get(url, params=params, timeout=30)
        r.raise_for_status()
        data = r.json()
        for item in data.get("items", []):
            yield item.get("media", item)
        if not data.get("more_available") or not data.get("next_max_id"):
            break
        max_id = data["next_max_id"]
        time.sleep(1)


def post_type(m):
    if m.get("product_type") == "clips":
        return "Reel"
    if m.get("product_type") == "igtv":
        return "IGTV"
    if m.get("media_type") == 8:
        return "Carousel"
    return "Post"


def post_url(m):
    kind = "reel" if post_type(m) == "Reel" else "p"
    return f"https://instagram.com/{kind}/{m['code']}/"


def write_notion(notion, db_id, m, collection):
    author = (m.get("user") or {}).get("username", "desconhecido")
    caption = ((m.get("caption") or {}).get("text") or "")[:1900]
    props = {
        "Name": {"title": [{"text": {"content": f"@{author}/{m['code']}"}}]},
        "URL": {"url": post_url(m)},
        "Type": {"select": {"name": post_type(m)}},
        "Author": {"rich_text": [{"text": {"content": author}}]},
        "Status": {"select": {"name": "New"}},
        "Media ID": {"rich_text": [{"text": {"content": str(m["pk"])}}]},
        "Saved": {"date": {"start": datetime.now(timezone.utc).isoformat()}},
        "Caption": {"rich_text": [{"text": {"content": caption}}]},
    }
    if collection:
        props["Collection"] = {"select": {"name": collection}}
    notion.pages.create(parent={"database_id": db_id}, properties=props)


def main():
    cfg = load_config()
    s = make_session(cfg)
    validate_session(s)
    notion = Client(auth=cfg["notion_token"])
    state = load_state()
    wanted = cfg.get("collections_filter")

    # Monta lista de (post, nome_da_coleção)
    posts = []
    if wanted:
        cols = fetch_collections(s)
        for cid, name in cols.items():
            if name in wanted:
                for m in fetch_saved(s, cid):
                    posts.append((m, name))
    else:
        for m in fetch_saved(s):
            posts.append((m, None))

    new = skipped = errors = 0
    for m, collection in posts:
        pk = str(m.get("pk"))
        if pk in state:
            skipped += 1
            continue
        try:
            write_notion(notion, cfg["notion_database_id"], m, collection)
            state.add(pk)
            save_state(state)
            new += 1
            time.sleep(0.35)  # respeita o limite do Notion
        except Exception as e:
            errors += 1
            log.error("Falha no post %s: %s", pk, e)

    log.info("Sync complete: %d new | %d skipped | %d total | %d errors",
             new, skipped, len(posts), errors)


if __name__ == "__main__":
    main()
