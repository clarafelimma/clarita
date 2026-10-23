import {AbsoluteFill, interpolate, OffthreadVideo, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export const FPS = 30;
export const STORY_FRAMES = 10 * FPS;
export const ORANGE = '#FF7A1A';

// Áreas que o Instagram cobre: 14% no topo e 35% na base.
export const SAFE_TOP = 1920 * 0.14;
export const SAFE_BOTTOM = 1920 * 0.35;

// cenas.mp4 tem as duas cenas do Gemini em sequência (0–10s e 10–20s).
export const Scene: React.FC<{fromSeconds: number}> = ({fromSeconds}) => (
	<AbsoluteFill style={{backgroundColor: 'black'}}>
		<OffthreadVideo
			src={staticFile('cenas.mp4')}
			startFrom={fromSeconds * FPS}
			muted={false}
			style={{width: '100%', height: '100%', objectFit: 'cover'}}
		/>
	</AbsoluteFill>
);

export const Scrim: React.FC<{position: 'top' | 'center'; opacity?: number}> = ({position, opacity = 0.65}) => (
	<AbsoluteFill
		style={{
			background:
				position === 'top'
					? `linear-gradient(180deg, rgba(0,0,0,${opacity}) 0%, rgba(0,0,0,${opacity * 0.6}) 40%, rgba(0,0,0,0) 65%)`
					: `radial-gradient(ellipse at 50% 42%, rgba(0,0,0,${opacity}) 0%, rgba(0,0,0,${opacity * 0.4}) 55%, rgba(0,0,0,0) 80%)`,
		}}
	/>
);

// Texto que entra subindo e sai com fade, entre `from` e `to` (segundos).
export const Caption: React.FC<{
	from: number;
	to: number;
	top: number;
	children: React.ReactNode;
	size?: number;
	weight?: number;
}> = ({from, to, top, children, size = 84, weight = 800}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const start = from * fps;
	const end = to * fps;
	if (frame < start || frame > end) return null;
	const enter = spring({frame: frame - start, fps, config: {damping: 200}, durationInFrames: 18});
	const exit = to * fps >= STORY_FRAMES ? 1 : interpolate(frame, [end - 8, end], [1, 0], {extrapolateLeft: 'clamp'});
	return (
		<div
			style={{
				position: 'absolute',
				top,
				left: 72,
				right: 72,
				fontFamily: 'Inter, sans-serif',
				fontSize: size,
				fontWeight: weight,
				lineHeight: 1.12,
				letterSpacing: -1.5,
				color: 'white',
				textShadow: '0 4px 24px rgba(0,0,0,0.55)',
				opacity: enter * exit,
				transform: `translateY(${(1 - enter) * 40}px)`,
			}}
		>
			{children}
		</div>
	);
};

export const Hl: React.FC<{children: React.ReactNode}> = ({children}) => <span style={{color: ORANGE}}>{children}</span>;
