import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { useSiteBaseUrl } from '@site/src/hooks/useSiteBaseUrl';
import featuredBlogsData from '@site/static/content/featuredblogs.json';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

export default function BlogMobileSidebarContent() {
  const history = useHistory();
  const location = useLocation();
  const baseURL = useSiteBaseUrl() || '';
  const mobileSidebar = useNavbarMobileSidebar();
  const [showBlogMenu, setShowBlogMenu] = useState(false);
  const [tocHeadings, setTocHeadings] = useState([]);

  const pathname = location?.pathname || '';
  const isBlogRoot =
    pathname === baseURL + '/blog' || pathname === baseURL + '/blog/';
  const isBlogPost =
    pathname.startsWith(baseURL + '/blog/') &&
    !isBlogRoot &&
    pathname !== baseURL + '/blog/tags' &&
    !pathname.includes('/blog/tags/');

  useEffect(() => {
    // Reset to show TOC when pathname changes
    setShowBlogMenu(false);

    if (isBlogPost) {
      // Extract TOC headings from the page
      const headings = Array.from(
        document.querySelectorAll('.markdown h2, .markdown h3')
      ).map((heading) => ({
        id: heading.id,
        text: heading.textContent,
        level: heading.tagName.toLowerCase(),
      }));
      setTocHeadings(headings);
    }
  }, [isBlogPost, pathname]);

  const handleNavigation = (path) => {
    mobileSidebar.toggle();
    if (path.startsWith('http')) {
      window.open(path, '_blank');
    } else {
      history.push(baseURL + path);
    }
  };

  const handleTocClick = (id) => {
    mobileSidebar.toggle();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  // Show TOC if on a blog post and not showing custom menu
  if (isBlogPost && !showBlogMenu) {
    return (
      <MobileMenuContainer>
        <BackButton onClick={() => setShowBlogMenu(true)}>
          ← Back to Blog
        </BackButton>
        <MenuDivider />

        {tocHeadings.length > 0 && (
          <TOCSection>
            <TOCHeader>On this page</TOCHeader>
            <TOCContainer>
              {tocHeadings.map((heading, index) => (
                <TOCItem
                  key={index}
                  level={heading.level}
                  onClick={() => handleTocClick(heading.id)}
                >
                  {heading.text}
                </TOCItem>
              ))}
            </TOCContainer>
          </TOCSection>
        )}
      </MobileMenuContainer>
    );
  }

  return (
    <MobileMenuContainer>
      {isBlogPost && (
        <>
          <BackButton onClick={() => setShowBlogMenu(false)}>
            Go to Article →
          </BackButton>
          <MenuDivider />
        </>
      )}

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

const BackButton = styled.div`
  padding: 12px 1rem;
  font-size: 0.9rem;
  margin: -8px;
  font-weight: var(--ifm-button-font-weight);
  color: var(--ifm-color-primary-text);
  background: var(--ifm-menu-color-background-active);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TOCSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const TOCHeader = styled.div`
  padding: 12px 12px;
  font-size: 1rem;
  font-weight: 500;
  color: var(--ifm-color-primary-text);
`;

const TOCContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TOCItem = styled.div`
  padding: ${(props) =>
    props.level === 'h3' ? '8px 12px 8px 36px' : '10px 12px 10px 24px'};
  font-size: ${(props) => (props.level === 'h3' ? '0.9rem' : '0.95rem')};
  font-weight: 400;
  color: var(--ifm-color-primary-text);
  cursor: pointer;
  transition: background-color 0.2s;
  margin-left: ${(props) => (props.level === 'h3' ? '24px' : '0')};

  &:hover {
    background-color: var(--ifm-navbar-dropdown-hover);
    color: var(--ifm-color-pink-200);
  }
`;
