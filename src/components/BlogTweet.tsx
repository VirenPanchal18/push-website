import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { Tweet } from 'react-tweet';
import styled from 'styled-components';

import { device } from '@site/src/config/globals';

const BlogTweet = ({ id }: { id: string }) => {
  const { colorMode } = useColorMode();
  return (
    <TweetWrapper isDark={colorMode === 'dark'}>
      <div className={colorMode}>
        <Tweet id={id} />
      </div>
    </TweetWrapper>
  );
};

export default BlogTweet;

const TweetWrapper = styled.div<{ isDark: boolean }>`
  border: 1px solid var(--ifm-color-tweet-border);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  min-height: 200px;
  max-width: 550px;
  margin: 1.5rem 0;
  transition: all 0.3s ease;

  svg {
    display: inline-block;
    fill: currentColor;
    width: 1.25em;
    height: 1.25em;
    vertical-align: text-bottom;
  }

  .verified_node_modules-react-tweet-dist-twitter-theme-icons-icons-module {
    fill: var(--ifm-color-tweet-icon);
    width: 20px;
    height: 20px;
  }

  .twitterIcon_node_modules-react-tweet-dist-twitter-theme-tweet-header-module {
    fill: var(--ifm-color-tweet-icon);
    width: 20px;
    height: 20px;
  }

  .likeIcon_node_modules-react-tweet-dist-twitter-theme-tweet-actions-module {
    fill: var(--ifm-color-tweet-like);
    width: 20px;
    height: 20px;
  }

  .replyIcon_node_modules-react-tweet-dist-twitter-theme-tweet-actions-module,
  .copyIcon_node_modules-react-tweet-dist-twitter-theme-tweet-actions-module {
    fill: var(--ifm-color-tweet-icon);
    width: 20px;
    height: 20px;
  }

  .infoIcon_node_modules-react-tweet-dist-twitter-theme-tweet-info-module {
    fill: var(--ifm-color-tweet-icon);
    width: 16px;
    height: 16px;
  }

  .reply_node_modules-react-tweet-dist-twitter-theme-tweet-actions-module {
    display: none;
  }

  .info_node_modules-react-tweet-dist-twitter-theme-tweet-info-module {
    font-size: 0.75em;
  }

  .actions_node_modules-react-tweet-dist-twitter-theme-tweet-actions-module {
    margin-top: 10px;
    border-top: 1px solid #ffffff33;
    justify-content: end;
  }

  .copy_node_modules-react-tweet-dist-twitter-theme-tweet-actions-module {
    margin-right: 0px;
  }

  .link_node_modules-react-tweet-dist-twitter-theme-tweet-replies-module {
    border: 1px solid #ffffff33;

    &:hover {
      border-color: var(--ifm-link-color);
    }
  }

  &:hover {
    border-color: var(--ifm-link-color);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(170, 57, 188, 0.15);
  }

  @media ${device.mobileL} {
    max-width: 100%;
  }
`;
