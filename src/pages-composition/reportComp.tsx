// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// React + Web3 Essentials
import React from 'react';

// External Components
import { useTranslation } from 'react-i18next';

// Internal Component
import { Content, Section } from '@site/src/css/SharedStyling';

import ContentBlocks from '@site/src/components/ContentBlocks/ContentBlocks';
import { KBReportList } from '../config/KBReportList';

// Internal Configs

// Interfaces and Props

// Helper Functions

// Helper Component

// Main
const ReportComp = () => {
  // Localization
  const { t } = useTranslation();

  const breadcrumbs = [
    {
      text: t(
        'pages.knowledge.report.explainer-section.breadcrumbs.knowledge-base'
      ),
      link: '/knowledge',
    },
    {
      text: t(
        'pages.knowledge.report.explainer-section.breadcrumbs.donut-testnet'
      ),
      link: '/knowledge/testnet',
    },
  ];

  return (
    <Section>
      <Content className='skeletonsmall'>
        <ContentBlocks item={KBReportList} breadcrumbs={breadcrumbs} />
      </Content>
    </Section>
  );
};

export default ReportComp;
