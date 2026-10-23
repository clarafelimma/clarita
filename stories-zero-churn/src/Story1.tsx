import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Caption, Hl, SAFE_TOP, Scene, Scrim} from './ui';

const Bubble: React.FC<{text: string; delay: number; top: number}> = ({text, delay, top}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const start = delay * fps;
	if (frame < start || frame > 6 * fps) return null;
	const pop = spring({frame: frame - start, fps, config: {damping: 14, stiffness: 180}});
	return (
		<div
			style={{
				position: 'absolute',
				top,
				left: 72,
				maxWidth: 760,
				padding: '26px 34px',
				borderRadius: 34,
				borderTopLeftRadius: 8,
				background: 'rgba(255,255,255,0.96)',
				color: '#111',
				fontFamily: 'Inter, sans-serif',
				fontSize: 50,
				fontWeight: 500,
				boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
				opacity: pop,
				transform: `scale(${0.85 + pop * 0.15})`,
				transformOrigin: 'top left',
			}}
		>
			{text}
			<div style={{fontSize: 30, color: '#888', marginTop: 8}}>Cliente • agora</div>
		</div>
	);
};

export const Story1: React.FC = () => (
	<AbsoluteFill>
		<Scene fromSeconds={0} />
		<Scrim position="top" />
		<Caption from={0.3} to={3} top={SAFE_TOP + 20} size={120}>
			Sexta, <Hl>18h.</Hl>
		</Caption>
		<Bubble text="de novo sem internet…" delay={3.2} top={SAFE_TOP + 20} />
		<Bubble text="terceira vez essa semana 😡" delay={4.1} top={SAFE_TOP + 250} />
		<Caption from={6.2} to={10} top={SAFE_TOP + 20} size={92}>
			Esse cliente pode <Hl>cancelar no fim de semana.</Hl>
		</Caption>
	</AbsoluteFill>
);
