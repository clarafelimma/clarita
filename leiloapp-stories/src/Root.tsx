import React from 'react';
import {Composition, Series} from 'remotion';
import './brand';
import {FPS, HEIGHT, WIDTH} from './brand';
import {
  S1_DURATION,
  S2_DURATION,
  S3_DURATION,
  S4_DURATION,
  S5_DURATION,
  Story1,
  Story2,
  Story3,
  Story4,
  Story5,
} from './stories';

const STORIES = [
  {id: 'Story1-OErro', C: Story1, d: S1_DURATION},
  {id: 'Story2-ARevelacao', C: Story2, d: S2_DURATION},
  {id: 'Story3-ASolucao', C: Story3, d: S3_DURATION},
  {id: 'Story4-AProva', C: Story4, d: S4_DURATION},
  {id: 'Story5-OConvite', C: Story5, d: S5_DURATION},
];

const Sequencia: React.FC = () => (
  <Series>
    {STORIES.map(({id, C, d}) => (
      <Series.Sequence key={id} durationInFrames={d}>
        <C />
      </Series.Sequence>
    ))}
  </Series>
);

const base = {fps: FPS, width: WIDTH, height: HEIGHT};

export const Root: React.FC = () => (
  <>
    {STORIES.map(({id, C, d}) => (
      <Composition key={id} id={id} component={C} durationInFrames={d} {...base} />
    ))}
    <Composition
      id="Sequencia-Completa"
      component={Sequencia}
      durationInFrames={STORIES.reduce((a, s) => a + s.d, 0)}
      {...base}
    />
  </>
);
