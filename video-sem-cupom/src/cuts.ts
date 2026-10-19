// Trechos do vídeo original (em segundos) que ficam na edição.
// Tudo que fica entre eles fala do cupom e foi removido:
//  51.40–54.35  "e eu ainda vou liberar um cupom pra você que assistir até o final"
//  93.40–97.00  "Lembrando que eu tenho cupom de desconto, tá, então não é esse o valor aqui ó"
// 140.23–157.20 demonstração aplicando o cupom "ROLÊ" (6 aparições por R$30)
export const FPS = 30;

export const KEEP: [number, number][] = [
	[0, 51.4],
	[54.35, 93.4],
	[97.0, 140.233],
	[157.2, 177.73],
];

export const toFrames = (s: number) => Math.round(s * FPS);

export const segments = KEEP.map(([start, end]) => ({
	startFrom: toFrames(start),
	durationInFrames: toFrames(end) - toFrames(start),
}));

export const TOTAL_FRAMES = segments.reduce((sum, s) => sum + s.durationInFrames, 0);
