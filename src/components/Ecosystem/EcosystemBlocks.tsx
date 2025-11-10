import React from 'react';
import styled from 'styled-components';
import { device } from '@site/src/config/globals';

import EcosystemCard from './EcosystemCard';

export type EcosystemApp = {
  id: number;
  name: string;
  description: string;
  icon: string;
  bgImage: string;
  bgGradientColor: string;
  tags: string[];
  twitterId: number;
  href?: string;
  textColor: string;
};

type Props = {
  apps: EcosystemApp[];
  title?: string;
};

const EcosystemBlocks: React.FC<Props> = ({ apps }) => {
  return (
    <>
      <Grid>
        {apps.map((app) => (
          <EcosystemCard key={app.name} app={app} />
        ))}
      </Grid>
    </>
  );
};

export default EcosystemBlocks;

const Grid = styled.div`
  display: grid;
  gap: clamp(16px, 2.5vw, 24px);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

  @media ${device.laptop} {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
`;
