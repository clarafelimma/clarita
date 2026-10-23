import {AbsoluteFill} from 'remotion';
import {Caption, Hl, SAFE_TOP, Scene, Scrim} from './ui';

export const Story2: React.FC = () => (
	<AbsoluteFill>
		<Scene fromSeconds={10} />
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
