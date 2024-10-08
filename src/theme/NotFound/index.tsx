/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// External Components
import React from 'react';

// Internal Components
import { translate } from '@docusaurus/Translate';
import { PageMetadata } from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import NotFoundContent from '@theme/NotFound/Content';
import { useLocation } from '@docusaurus/router';
import { useSiteBaseUrl } from '@site/src/utils/useSiteBaseUrl';

export default function Index(): JSX.Element {
  const location = useLocation();
  const pathname = location?.pathname;

  const baseURL = useSiteBaseUrl();

  const title = translate({
    id: 'theme.NotFound.title',
    message: 'Page Not Found',
  });
  return (
    <>
      <PageMetadata title={title} />

      <Layout
        showNavbar={
          !pathname.startsWith(baseURL + '/docs') &&
          !pathname.startsWith(baseURL + '/blog')
            ? 'website'
            : 'docusaurus'
        }
      >
        <NotFoundContent />
      </Layout>
    </>
  );
}
