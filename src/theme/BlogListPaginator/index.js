/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PaginatorNavLink from '@theme/PaginatorNavLink';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

// Internal Configs
import { device } from '@site/src/config/globals';

export default function BlogListPaginator(props) {
  const { t } = useTranslation();
  const { metadata } = props;
  const { previousPage, nextPage } = metadata;
  return (
    <NavItem
      // className="pagination-nav"
      aria-label={t('components.blog.paginator.nav-aria-label')}
    >
      {previousPage ? (
        <PaginatorNavLink
          permalink={previousPage}
          title={t('components.blog.paginator.newer-entries')}
        />
      ) : (
        <div />
      )}
      {nextPage && (
        <PaginatorNavLink
          permalink={nextPage}
          title={t('components.blog.paginator.older-entries')}
          isNext
        />
      )}
    </NavItem>
  );
}

const NavItem = styled.nav`
  margin: 0 auto 72px auto;
  display: flex;
  flex-direction: row;
  gap: 32px;
  justify-content: space-between;
  width: 100%;

  /* If only one button exists, it will be on the right (nextPage) or left (previousPage) */
  /* space-between handles both cases automatically */

  @media ${device.tablet} {
    flex-direction: column;
    gap: 16px;
  }
`;
