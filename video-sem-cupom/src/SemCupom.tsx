import {AbsoluteFill, OffthreadVideo, Series, staticFile} from 'remotion';
import {segments} from './cuts';

export const SemCupom: React.FC = () => (
	<AbsoluteFill style={{backgroundColor: 'black'}}>
		<Series>
			{segments.map(({startFrom, durationInFrames}) => (
				<Series.Sequence key={startFrom} durationInFrames={durationInFrames}>
					<OffthreadVideo src={staticFile('original.mp4')} startFrom={startFrom} />
				</Series.Sequence>
			))}
		</Series>
	</AbsoluteFill>
);
