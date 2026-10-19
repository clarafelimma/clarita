import {Composition} from 'remotion';
import {SemCupom} from './SemCupom';
import {FPS, TOTAL_FRAMES} from './cuts';

export const RemotionRoot: React.FC = () => (
	<Composition
		id="SemCupom"
		component={SemCupom}
		durationInFrames={TOTAL_FRAMES}
		fps={FPS}
		width={720}
		height={1280}
	/>
);
