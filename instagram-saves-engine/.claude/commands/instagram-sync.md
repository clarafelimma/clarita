---
description: Sincroniza saves do Instagram e gera ideias de conteúdo
---
Ação pedida: $ARGUMENTS

Projeto: CAMINHO_ABSOLUTO/instagram-saves-engine
Banco Instagram Saves (ID): 6f07610a0fa04086ae13acb5b0071cc0
Banco Content Ideas (ID): 12f48ec3a7274aec8d8c2f80dbc2d61f
Público/nicho: bancos, fintechs e operadores de crédito imobiliário (Corbfy: agente de IA que automatiza a concessão de crédito imobiliário via WhatsApp)
Pilares: Educação, Prova, Produto, Bastidores de IA
Mapa coleção → pilar: "Inspiration" e "Content Ideas" podem ir para qualquer pilar

Ações possíveis:

## 1. sync
Rode `.venv/bin/python3 sync.py` na pasta do projeto. Se houver saves com Status = "New", siga para ideate.

## 2. ideate
1. Consulte o banco Saves por Status = "New" (Caption, Author, Type, URL, Collection). Se houver mais de 10, processe em lotes de 10 com revisão entre os lotes.
2. Para cada save, gere 1 ideia: reformule para o público acima; escolha o pilar pela coleção; 3 ganchos (curiosidade, valor, emoção); roteiro HOOK → 3-4 pontos → CTA; versões para Instagram (carrossel ou Reel), TikTok (30-60s) e YouTube (só se o tema tiver profundidade); prioridade Alta/Média/Baixa.
3. Apresente tudo e pergunte: aprovar todas, escolher por número, pular todas ou pedir ajustes.
4. Para cada aprovada, crie página no banco Content Ideas: Name, Platform, Format, Status = "Not started", Angle, Hook Options (3 ganchos separados por " | "), Priority, Week Of (segunda-feira atual), Pillar; corpo com ângulo, roteiro e seções por plataforma.
5. Atualize cada save: "Used" se aprovada, "Reviewed" se pulada.
6. Imprima o resumo SAVES IDEATION COMPLETE (processados, ideias geradas, salvas, títulos).

## 3. status
Leia state.json e as últimas 20 linhas de sync.log. Informe último sync, total sincronizado e erros.

## 4. scheduler
Rode `launchctl list | grep instagram-saves`.

## 5. refresh session
Guie-me a pegar sessionid, csrftoken e ds_user_id no Chrome (instagram.com > DevTools > Application > Cookies), atualizar config.json e rodar um sync de teste. Nunca peça para colar os valores no chat.

## 6. recent
Liste os saves mais recentes do banco, por data Saved.
