// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// React + Web3 Essentials
import React from 'react';

// External Components
import { useTranslation } from 'react-i18next';

// Internal Component
import { Content, Section } from '@site/src/css/SharedStyling';

import ContentBlocks from '@site/src/components/ContentBlocks/ContentBlocks';
import { KBReportIncidentList } from '../config/KBReportIncidentList';

// Internal Configs

// Interfaces and Props

// Helper Functions

// Helper Component

// Main
const ReportIncidentsComp = () => {
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
    {
      text: t('pages.knowledge.report.explainer-section.breadcrumbs.report'),
      link: '/knowledge/testnet/report',
    },
  ];

  return (
    <Section>
      <Content className='skeletonsmall'>
        <ContentBlocks item={KBReportIncidentList} breadcrumbs={breadcrumbs} />
      </Content>
    </Section>
  );
};

export default ReportIncidentsComp;
