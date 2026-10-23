import {AbsoluteFill, Audio, interpolate, Sequence, staticFile, useVideoConfig} from 'remotion';
import {EndCard} from './EndCard';
import {Caption, FPS, Hl, SAFE_TOP, Scene, Scrim, STORY_FRAMES} from './ui';

// A gestora começa a falar ao telefone em 7,4s e a frase é cortada no fim do
// clipe do Gemini. O áudio da cena some antes da fala e o resto do story,
// incluindo a tela final, usa um trecho só de trilha da mesma cena.
const VOICE_START = 7.4 * FPS;
const BED_FROM = VOICE_START - 15;
const BED_SOURCE_START = 10.3 * FPS;

const sceneVolume = (f: number) =>
	interpolate(f, [VOICE_START - 15, VOICE_START - 2], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

export const Story2: React.FC = () => {
	const {durationInFrames} = useVideoConfig();
	const bedLength = durationInFrames - BED_FROM;
	const bedVolume = (f: number) =>
		interpolate(f, [0, 12, bedLength - 15, bedLength], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill>
			<Sequence durationInFrames={STORY_FRAMES}>
				<Scene fromSeconds={10} volume={sceneVolume} />
				<Scrim position="top" />
				<Caption from={0.3} to={3} top={SAFE_TOP + 20} size={96}>
					Mesma sexta. <Hl>Outro provedor.</Hl>
				</Caption>
				<Caption from={1.2} to={3} top={SAFE_TOP + 250} size={60} weight={600}>
					17h40: chega um alerta.
				</Caption>
				<Caption from={3.2} to={7} top={SAFE_TOP + 20} size={74} weight={700}>
					A IA leu os atendimentos e marcou quem está <Hl>frustrado.</Hl>
				</Caption>
				<Caption from={7.2} to={10} top={SAFE_TOP + 20} size={96}>
					Ela liga antes. <Hl>O cliente fica.</Hl>
				</Caption>
			</Sequence>
			<Sequence from={STORY_FRAMES - 10}>
				<EndCard />
			</Sequence>
			<Sequence from={BED_FROM}>
				<Audio src={staticFile('cenas.mp4')} startFrom={BED_SOURCE_START} volume={bedVolume} />
			</Sequence>
		</AbsoluteFill>
	);
};
