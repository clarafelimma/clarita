import {Composition} from 'remotion';
import {Story1} from './Story1';
import {Story2} from './Story2';
import {END_CARD_FRAMES, FPS, STORY_FRAMES} from './ui';

export const RemotionRoot: React.FC = () => (
	<>
		<Composition id="Story1" component={Story1} durationInFrames={STORY_FRAMES} fps={FPS} width={1080} height={1920} />
		<Composition id="Story2" component={Story2} durationInFrames={STORY_FRAMES + END_CARD_FRAMES} fps={FPS} width={1080} height={1920} />
	</>
);
