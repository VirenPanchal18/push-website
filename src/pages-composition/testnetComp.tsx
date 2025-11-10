// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// React + Web3 Essentials
import React from 'react';

// External Components
import { useTranslation } from 'react-i18next';

// Internal Component
import { Content, Section } from '@site/src/css/SharedStyling';

import ContentBlocks from '@site/src/components/ContentBlocks/ContentBlocks';
import { KBTestnetList } from '../config/KBTestnetList';

// Internal Configs

// Interfaces and Props

// Helper Functions

// Helper Component

// Main
const TestnetComp = () => {
  // Localization
  const { t } = useTranslation();

  const breadcrumbs = [
    {
      text: t(
        'pages.knowledge.testnet.explainer-section.breadcrumbs.knowledge-base'
      ),
      link: '/knowledge',
    },
  ];

  return (
    <Section>
      <Content className='skeletonsmall'>
        <ContentBlocks item={KBTestnetList} breadcrumbs={breadcrumbs} />
      </Content>
    </Section>
  );
};

export default TestnetComp;
