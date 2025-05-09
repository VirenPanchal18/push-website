/* eslint-disable no-irregular-whitespace */
// Knowledge Base Content Configuration:
// - Add a new object with the following fields:
//   - `id`: identifier for the knowledge base item.
//   - `image`, `subtitle`: Metadata for the item.
//   - `title` & `content`: Each object has a title & content, which is in the /content folder. Add the title in the object in this directory and  // Use HTML or Markdown to create the article (similar to the blog section).
//   - `url`: For external links, provide the full URL instead of using `content`.

import { push101Content } from '../content/push101';
import { deepDivesContent } from '../content/deepdives';
import { faqContent } from '../content/faq';
import { devDocsContent } from '../content/devdocs';
import { tokenomicsContent } from '../content/tokenomics';
import { newPageContent } from '../content/new-page';

export const knowledgeBaseArticleContent = [
  {
    id: 'push101',
    url: 'push101',
    ctatitle: 'Explore More',
    target: '_self',
    image: 'knowledge_101',
    subtitle:
      'Learn about basics of Push Chain. The innovations it introduces, what makes it tick and why is it required!',
    ...push101Content,
  },
  {
    id: 'deepdives',
    url: 'deepdives',
    ctatitle: 'See it Tick',
    target: '_self',
    image: 'knowledge_deepdives',
    subtitle:
      'Want to know the intricate working of Push? or just a curious fellow? If so, this section is for you ❤️',
    ...deepDivesContent,
  },
  {
    id: 'devdocs',
    image: 'knowledge_devdocs',
    subtitle: `Let's come straight to the point! I am universal chain... and you are a dev, let's make it official!`,
    url: '/docs',
    target: '_self',
    ctatitle: 'Build Now',
    ...devDocsContent,
  },
  {
    id: 'tokenomics',
    image: 'knowledge_tokenomics',
    subtitle: `Learn how Push Chain's tokenomics incentivizes all actors and ensures sustainable network that's built to last`,
    url: 'tokenomics',
    target: '_self',
    ctatitle: 'Learn Token Design',
    ...tokenomicsContent,
  },
  {
    id: 'faq',
    image: 'frequently-asked-questions',
    subtitle:
      'The place to find answers to all the popular questions the community has asked. Crowdsourced from Push Fam ❤️ and curated by the Push team 💪.',
    url: 'faq',
    target: '_self',
    ctatitle: 'Read More',
    ...faqContent,
  },
  {
    id: 'new-page',
    url: 'new-page',
    ctatitle: 'See it Tick',
    target: '_self',
    image: 'knowledge_deepdives',
    subtitle:
      'Want to know the intricate working of Push? or just a curious fellow? If so, this section is for you ❤️',
    ...newPageContent,
  },
];
