import useFetchRecentBlogs from '@site/src/components/Home/hooks/useFetchRecentBlogs';
import {
  Date,
  ReadingTime,
  Spacer,
} from '@site/src/components/reusables/date.tsx';
import GLOBALS, { device } from '@site/src/config/globals';
import { H2, Image, ItemH, Span } from '@site/src/css/SharedStyling';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const FeaturedBlogPosts = () => {
  const { recentBlogs } = useFetchRecentBlogs();
  const { t } = useTranslation();

  if (!recentBlogs || recentBlogs.length === 0) {
    return null;
  }

  const [firstPost, ...remainingPosts] = recentBlogs.slice(0, 4);

  return (
    <FeaturedContainer>
      {firstPost && (
        <MainFeaturedPost
          as='a'
          href={firstPost.link}
          title={firstPost.title}
          aria-label={t('components.blog.featured.post-aria-label', {
            title: firstPost.title,
          })}
        >
          <MainFeaturedImage
            src={firstPost.imageUrl}
            alt={t('components.blog.featured.image-alt', {
              title: firstPost.title,
            })}
            loading='lazy'
          />
          <MainFeaturedContent>
            <MetadataRow>
              <Date
                date={firstPost.pubDate}
                formattedDate={firstPost.pubDate}
                mr={'3px'}
              />
              {typeof firstPost.readingTime !== 'undefined' && (
                <>
                  <Spacer />
                  <ReadingTime readingTime={firstPost.readingTime} />
                </>
              )}
            </MetadataRow>
            <MainFeaturedTitle>{firstPost.title}</MainFeaturedTitle>
            <MainFeaturedDescription>
              {firstPost.description}
            </MainFeaturedDescription>
          </MainFeaturedContent>
        </MainFeaturedPost>
      )}

      <SecondaryFeaturedGrid>
        {remainingPosts.slice(0, 3).map((post, index) => (
          <SecondaryFeaturedPost
            key={index}
            as='a'
            href={post.link}
            title={post.title}
            aria-label={t('components.blog.featured.post-aria-label', {
              title: post.title,
            })}
          >
            <SecondaryFeaturedImage
              src={post.imageUrl}
              alt={t('components.blog.featured.image-alt', {
                title: post.title,
              })}
              loading='lazy'
            />
            <SecondaryFeaturedContent>
              <MetadataRow>
                <Date
                  date={post.pubDate}
                  formattedDate={post.pubDate}
                  mr={'3px'}
                />
                {typeof post.readingTime !== 'undefined' && (
                  <>
                    <Spacer />
                    <ReadingTime readingTime={post.readingTime} />
                  </>
                )}
              </MetadataRow>
              <SecondaryFeaturedTitle>{post.title}</SecondaryFeaturedTitle>
            </SecondaryFeaturedContent>
          </SecondaryFeaturedPost>
        ))}
      </SecondaryFeaturedGrid>
    </FeaturedContainer>
  );
};

export default FeaturedBlogPosts;

const FeaturedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  margin-top: 32px;
`;

const MainFeaturedPost = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
  padding: 0;
  background: transparent;
  border: none;
  text-decoration: none;
  cursor: pointer;

  @media ${device.tablet} {
    flex-direction: column;
    gap: 24px;
  }
`;

const MainFeaturedImage = styled(Image)`
  width: 50%;
  height: auto;
  border-radius: 24px;
  object-fit: cover;
  aspect-ratio: 16 / 9;

  @media ${device.tablet} {
    width: 100%;
  }
`;

const MainFeaturedContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
  flex: 1;
`;

const MetadataRow = styled(ItemH)`
  align-items: flex-start;
  align-self: flex-start;
  flex: 0;
  color: var(--ifm-color-blog-date);
  justify-content: flex-start;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: normal;
`;

const MainFeaturedTitle = styled(H2)`
  color: var(--ifm-color-primary-blog);
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 140%;
  margin: 0;
  text-align: left;
  letter-spacing: normal;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  transition: color 0.2s ease;

  ${MainFeaturedPost}:hover & {
    color: var(--ifm-color-primary);
  }

  @media ${device.tablet} {
    font-size: 1.5rem;
  }
`;

const MainFeaturedDescription = styled(Span)`
  color: var(--ifm-color-secondary-blog);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 135%;
  letter-spacing: normal;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin: 16px 0 0 0;
  text-align: start;
`;

const SecondaryFeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  @media ${device.tablet} {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const SecondaryFeaturedPost = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
  background: transparent;
  border: none;
  text-decoration: none;
  cursor: pointer;
`;

const SecondaryFeaturedImage = styled(Image)`
  width: 100%;
  height: auto;
  border-radius: 16px;
  object-fit: cover;
  aspect-ratio: 16 / 9;
`;

const SecondaryFeaturedContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const SecondaryFeaturedTitle = styled(H2)`
  color: var(--ifm-color-primary-blog);
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 140%;
  margin: 0;
  text-align: left;
  letter-spacing: normal;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  transition: color 0.2s ease;

  ${SecondaryFeaturedPost}:hover & {
    color: var(--ifm-color-primary);
  }

  @media ${device.tablet} {
    font-size: 1.5rem;
  }
`;
