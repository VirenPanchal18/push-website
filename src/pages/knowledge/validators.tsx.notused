// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// React + Web3 Essentials
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import React from 'react';

// External Components
import { useTranslation } from 'react-i18next';

// Internal Component
import ValidatorsComp from '@site/src/pages-composition/validatorsComp';

// Internal Configs
import SchemaMarkup from '@site/src/components/SEO/SchemaMarkup';
import { DefaultDarkTheme } from '@site/src/css/SharedStyling';

// Main
function validatorsPage() {
  // Internationalization
  const { t } = useTranslation();

  return (
    <Layout
      title={t('pages.knowledge.validators.seo.title')}
      description={t('pages.knowledge.validators.seo.description')}
      showNavbar={'website'}
    >
      <Head>
        {/* <!-- Update Facebook Meta Tags --> */}
        <meta
          property='og:url'
          content='https://push.org/knowledge/validators'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content={t('pages.knowledge.validators.seo.og-title')}
        />
        <meta
          property='og:description'
          content={t('pages.knowledge.validators.seo.og-description')}
        />
        <meta
          property='og:image'
          content={useBaseUrl(
            require('/static/assets/previews/kbfaqpreview.png').default,
            { absolute: true }
          )}
        />

        {/* <!-- Update Twitter Meta Tags --> */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@PushChain' />
        <meta name='twitter:creator' content='@PushChain' />
        <meta
          name='twitter:title'
          content={t('pages.knowledge.validators.seo.twitter-title')}
        />
        <meta
          name='twitter:description'
          content={t('pages.knowledge.validators.seo.twitter-description')}
        />
        <meta
          name='twitter:image'
          content={useBaseUrl(
            require('/static/assets/previews/kbfaqpreview.png').default,
            { absolute: true }
          )}
        />
      </Head>

      {/* validators Schema Markup with default FAQs */}
      <SchemaMarkup type='validatorsPage' />
      <DefaultDarkTheme>
        <ValidatorsComp />
      </DefaultDarkTheme>
    </Layout>
  );
}

export default validatorsPage;
