import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { useSiteBaseUrl } from '@site/src/hooks/useSiteBaseUrl';
import featuredBlogsData from '@site/static/content/featuredblogs.json';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

export default function BlogMobileSidebarContent() {
  const history = useHistory();
  const baseURL = useSiteBaseUrl() || '';
  const mobileSidebar = useNavbarMobileSidebar();

  const handleNavigation = (path) => {
    mobileSidebar.toggle();
    if (path.startsWith('http')) {
      window.open(path, '_blank');
    } else {
      history.push(baseURL + path);
    }
  };

  const stripEmojis = (text) => {
    return text
      .replace(
        /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]|[\u{1F100}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{FE00}-\u{FE0F}]|[\u{20D0}-\u{20FF}]|[\u{E0020}-\u{E007F}]/gu,
        ''
      )
      .trim();
  };

  return (
    <MobileMenuContainer>
      <MenuItem onClick={() => handleNavigation('/')}>Homepage</MenuItem>

      <MenuItem onClick={() => handleNavigation('/blog')}>Blog</MenuItem>

      <FeaturedSection>
        <FeaturedHeader>Featured</FeaturedHeader>

        <SubMenuContainer>
          {featuredBlogsData.map((blog, index) => (
            <SubMenuItem
              key={index}
              onClick={() => handleNavigation(blog.link)}
            >
              {stripEmojis(blog.title)}
            </SubMenuItem>
          ))}
        </SubMenuContainer>
      </FeaturedSection>

      <MenuDivider />

      <MenuItem onClick={() => handleNavigation('/blog/tags')}>
        Browse by Topics
      </MenuItem>

      <MenuItem onClick={() => handleNavigation('/docs')}>
        Developer Docs
      </MenuItem>

      <MenuItem onClick={() => handleNavigation('https://portal.push.org/')}>
        Push Portal
      </MenuItem>
    </MobileMenuContainer>
  );
}

const MobileMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  padding: 12px 12px;
  font-size: 1rem;
  font-weight: 400;
  color: var(--ifm-color-primary-text);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--ifm-navbar-dropdown-hover);
  }
`;

const FeaturedSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FeaturedHeader = styled.div`
  padding: 12px 12px;
  font-size: 1rem;
  font-weight: 400;
  color: var(--ifm-color-primary-text);
`;

const SubMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;
  border-left: 2px solid var(--ifm-color-pink-200);
`;

const SubMenuItem = styled.div`
  padding: 12px 12px;
  font-size: 0.95rem;
  font-weight: 400;
  color: var(--ifm-color-primary-text);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--ifm-navbar-dropdown-hover);
    color: var(--ifm-color-pink-200);
  }
`;

const MenuDivider = styled.div`
  height: 1px;
  margin: 8px 24px;
`;
