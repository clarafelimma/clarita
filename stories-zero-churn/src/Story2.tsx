import {AbsoluteFill, Audio, interpolate, Sequence, staticFile} from 'remotion';
import {Caption, FPS, Hl, SAFE_TOP, Scene, Scrim, STORY_FRAMES} from './ui';

// A gestora começa a falar ao telefone em 7,4s e a frase é cortada no fim do
// clipe do Gemini. O áudio da cena some antes da fala e os últimos segundos
// usam um trecho só de trilha da mesma cena (13s–15,6s do original).
const VOICE_START = 7.4 * FPS;
const BED_FROM = VOICE_START - 15;

const sceneVolume = (f: number) =>
	interpolate(f, [VOICE_START - 15, VOICE_START - 2], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const bedVolume = (f: number) =>
	interpolate(f, [0, 12, STORY_FRAMES - BED_FROM - 12, STORY_FRAMES - BED_FROM], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

export const Story2: React.FC = () => (
	<AbsoluteFill>
		<Scene fromSeconds={10} volume={sceneVolume} />
		<Sequence from={BED_FROM}>
			<Audio src={staticFile('cenas.mp4')} startFrom={13 * FPS} volume={bedVolume} />
		</Sequence>
		<Scrim position="top" />
		<Caption from={0.3} to={3} top={SAFE_TOP + 20} size={100}>
			E se você soubesse <Hl>antes?</Hl>
		</Caption>
		<Caption from={3.2} to={7} top={SAFE_TOP + 20} size={74} weight={700}>
			A IA mostra quem está <Hl>frustrado</Hl> ou <Hl>perto de cancelar.</Hl>
		</Caption>
		<Caption from={7.2} to={10} top={SAFE_TOP + 20} size={96}>
			Descubra antes de <Hl>sexta acabar.</Hl>
		</Caption>
	</AbsoluteFill>
);
