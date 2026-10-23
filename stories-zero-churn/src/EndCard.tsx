import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Hl, ORANGE, SAFE_TOP} from './ui';

// Dados fictícios: nenhum cliente, preço ou print real.
const ROWS = [
	{id: '#4821', motivo: '3 reclamações em 5 dias', tag: 'Frustração alta', color: '#E5484D'},
	{id: '#3307', motivo: 'Nota 1 no último atendimento', tag: 'Risco alto', color: '#E5484D'},
	{id: '#5190', motivo: 'Problema sem retorno há 2 dias', tag: 'Atenção', color: ORANGE},
];

const font = 'Inter, sans-serif';

export const EndCard: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const appear = (delay: number) => spring({frame: frame - delay, fps, config: {damping: 200}, durationInFrames: 18});
	const pulse = 1 + 0.04 * Math.sin((frame / fps) * Math.PI * 2);
	const arrowY = 10 * Math.sin((frame / fps) * Math.PI * 3);

	return (
		<AbsoluteFill
			style={{
				background: `radial-gradient(circle at 50% 30%, rgba(255,122,26,0.35) 0%, rgba(14,15,19,1) 60%), #0E0F13`,
				fontFamily: font,
				color: 'white',
				opacity: interpolate(frame, [0, 10], [0, 1], {extrapolateRight: 'clamp'}),
			}}
		>
			<div style={{position: 'absolute', top: SAFE_TOP + 10, left: 72, right: 72}}>
				<div
					style={{
						fontSize: 78,
						fontWeight: 800,
						lineHeight: 1.1,
						letterSpacing: -1.5,
						opacity: appear(4),
						transform: `translateY(${(1 - appear(4)) * 30}px)`,
					}}
				>
					Veja quem pode cancelar <Hl>antes que cancele.</Hl>
				</div>

				<div
					style={{
						marginTop: 36,
						background: 'white',
						borderRadius: 36,
						padding: '34px 36px 18px',
						color: '#111',
						boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
						opacity: appear(12),
						transform: `translateY(${(1 - appear(12)) * 40}px)`,
					}}
				>
					<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18}}>
						<div style={{fontSize: 38, fontWeight: 700}}>Possíveis cancelamentos</div>
						<div
							style={{
								fontSize: 30,
								fontWeight: 700,
								color: 'white',
								background: '#E5484D',
								borderRadius: 999,
								padding: '6px 20px',
							}}
						>
							3 hoje
						</div>
					</div>
					{ROWS.map((r, i) => {
						const a = appear(22 + i * 6);
						return (
							<div
								key={r.id}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 22,
									padding: '16px 0',
									borderTop: '2px solid #EEE',
									opacity: a,
									transform: `translateX(${(1 - a) * 40}px)`,
								}}
							>
								<div
									style={{
										width: 64,
										height: 64,
										borderRadius: 999,
										background: '#F1F1F3',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: 28,
										fontWeight: 700,
										color: '#666',
									}}
								>
									<div style={{width: 18, height: 18, borderRadius: 999, background: r.color}} />
								</div>
								<div style={{flex: 1}}>
									<div style={{fontSize: 34, fontWeight: 700}}>Cliente {r.id}</div>
									<div style={{fontSize: 28, color: '#666', marginTop: 4}}>{r.motivo}</div>
								</div>
								<div
									style={{
										fontSize: 24,
										fontWeight: 700,
										color: r.color,
										background: `${r.color}1A`,
										borderRadius: 999,
										padding: '8px 16px',
										whiteSpace: 'nowrap',
									}}
								>
									{r.tag}
								</div>
							</div>
						);
					})}
				</div>
				<div
					style={{
						marginTop: 44,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						opacity: appear(44),
					}}
				>
					<div
						style={{
							background: ORANGE,
							color: 'white',
							fontSize: 50,
							fontWeight: 800,
							borderRadius: 999,
							padding: '26px 60px',
							transform: `scale(${pulse})`,
							boxShadow: '0 16px 40px rgba(255,122,26,0.45)',
						}}
					>
						Ative o Zero Churn
					</div>
					<div style={{fontSize: 38, fontWeight: 600, marginTop: 26, transform: `translateY(${arrowY}px)`}}>
						Toque no link 👇
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
