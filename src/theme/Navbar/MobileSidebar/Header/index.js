/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import IconClose from '@theme/Icon/Close';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import NavbarLogo from '@theme/Navbar/Logo';
import React from 'react';
import styled from 'styled-components';

function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <CloseButtonWrapper
      type='button'
      aria-label={translate({
        id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
        message: 'Close navigation bar',
        description: 'The ARIA label for close button of mobile sidebar',
      })}
      className='clean-btn navbar-sidebar__close'
      onClick={() => mobileSidebar.toggle()}
    >
      <IconClose color='var(--ifm-color-emphasis-600)' />
    </CloseButtonWrapper>
  );
}

export default function NavbarMobileSidebarHeader() {
  return (
    <HeaderContainer className='navbar-sidebar__brand'>
      <NavbarLogo />
      <RightSection>
        <NavbarColorModeToggle />
        <CloseButton />
      </RightSection>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`;

const CloseButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;
