import {continueRender, delayRender, staticFile} from 'remotion';

// Identidade LeiloApp (amostrada do logo oficial e da interface da CDP)
export const COLORS = {
  green: '#0D5749',
  greenDeep: '#0A4539',
  orange: '#F39836',
  cream: '#FFFAF1',
  ink: '#1E2B27',
};

export const SERIF = '"Lora", Georgia, serif';
export const SANS = '"Inter", system-ui, sans-serif';

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

// Zona segura de Stories: evita ~250px no topo e ~380px na base
export const SAFE_TOP = 236;

const fonts: Array<[string, string, string]> = [
  ['Lora', 'fonts/lora-latin-600-normal.woff2', '600'],
  ['Lora', 'fonts/lora-latin-700-normal.woff2', '700'],
  ['Inter', 'fonts/inter-latin-600-normal.woff2', '600'],
  ['Inter', 'fonts/inter-latin-700-normal.woff2', '700'],
];

if (typeof window !== 'undefined' && 'FontFace' in window) {
  const handle = delayRender('Carregando fontes');
  Promise.all(
    fonts.map(([family, file, weight]) => {
      const face = new FontFace(family, `url(${staticFile(file)}) format("woff2")`, {weight});
      return face.load().then((f) => document.fonts.add(f));
    }),
  )
    .then(() => continueRender(handle))
    .catch((err) => {
      console.error(err);
      continueRender(handle);
    });
}
