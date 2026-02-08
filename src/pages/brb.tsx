// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// React + Web3 Essentials
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import React from 'react';

// External Components
import { useTranslation } from 'react-i18next';

// Internal Components
import { DefaultDarkTheme } from '@site/src/css/SharedStyling';
import BRBComp from '@site/src/pages-composition/brbComp';

function BRBPage() {
  // Internationalization
  const { t } = useTranslation();

  return (
    <Layout
      title={t('pages.brb.seo.title')}
      description={t('pages.brb.seo.description')}
      showNavbar={'website'}
    >
      <Head>
        {/* <!-- Facebook Meta Tags --> */}
        <meta property='og:url' content='https://push.org/brb' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={t('pages.brb.seo.og-title')} />
        <meta
          property='og:description'
          content={t('pages.brb.seo.og-description')}
        />
        <meta
          property='og:image'
          content={useBaseUrl(
            require('/static/assets/previews/brbpreview.png').default,
            { absolute: true }
          )}
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@PushChain' />
        <meta name='twitter:creator' content='@PushChain' />
        <meta name='twitter:title' content={t('pages.brb.seo.twitter-title')} />
        <meta
          name='twitter:description'
          content={t('pages.brb.seo.twitter-description')}
        />
        <meta
          name='twitter:image'
          content={useBaseUrl(
            require('/static/assets/previews/brbpreview.png').default,
            { absolute: true }
          )}
        />
      </Head>

      <DefaultDarkTheme>
        <BRBComp />
      </DefaultDarkTheme>
    </Layout>
  );
}

export default BRBPage;
