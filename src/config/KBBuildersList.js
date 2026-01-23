export const KBBuildersList = {
  title: 'pages.knowledge.builders.explainer-section.blocks.title',
  content: [
    {
      type: 'indexlist',
      topGap: false,
      bottomGap: false,
      value: [
        {
          type: 'text',
          valueKey:
            'pages.knowledge.builders.explainer-section.blocks.sections.builders-intro.items.intro',
        },
        {
          type: 'text',
          valueKey:
            'pages.knowledge.builders.explainer-section.blocks.sections.builders-intro.items.curated-reads',
          hidden: true,
        },
      ],
    },
    {
      type: 'list',
      title:
        'pages.knowledge.builders.explainer-section.blocks.sections.universal-apps.title',
      topGap: true,
      bottomGap: true,
      variant: 'row',
      items: [
        {
          valueKey: `pages.knowledge.builders.explainer-section.blocks.sections.universal-apps.items.apps-of-the-future`,
          slug: 'apps-of-the-future-building-without-the-chaos',
          image:
            '/static/assets/website/chain/knowledge/apps-of-the-future-building-without-the-chaos',
          imageSrcSet: false,
          url: '/blog/apps-of-the-future-building-without-the-chaos',
          target: '_blank',
        },
        {
          valueKey: `pages.knowledge.builders.explainer-section.blocks.sections.universal-apps.items.consumer-apps-that-can-be-built-on-push-chain`,
          slug: 'consumer-apps-that-can-be-built-on-push-chain',
          image: '/static/assets/website/chain/knowledge/consumer-apps',
          imageSrcSet: false,
          url: '/blog/consumer-apps-that-can-be-built-on-push-chain/',
          target: '_blank',
        },
        {
          valueKey: `pages.knowledge.builders.explainer-section.blocks.sections.universal-apps.items.apps-only-possible-with-shared-state-v1`,
          slug: 'apps-only-possible-with-shared-state-v1',
          image:
            '/static/assets/website/chain/knowledge/apps-only-possible-with-shared-state-v1',
          imageSrcSet: false,
          url: '/blog/apps-only-possible-with-shared-state-v1',
          target: '_blank',
        },
        {
          valueKey: `pages.knowledge.builders.explainer-section.blocks.sections.universal-apps.items.apps-only-possible-with-shared-state-v2`,
          slug: 'apps-only-possible-with-shared-state-v2',
          image:
            '/static/assets/website/chain/knowledge/apps-only-possible-with-shared-state-v2',
          imageSrcSet: false,
          title: 'Apps Possible Only with Shared State - Vol. 2',
          url: '/blog/apps-only-possible-with-shared-state-v2',
          target: '_blank',
        },
      ],
    },

    {
      type: 'list',
      title:
        'pages.knowledge.builders.explainer-section.blocks.sections.case-studies.title',
      topGap: true,
      bottomGap: true,
      variant: 'row',
      items: [
        {
          valueKey: `pages.knowledge.builders.explainer-section.blocks.sections.case-studies.items.hodl-fun`,
          slug: 'hodl-fun',
          image: '/static/assets/website/chain/knowledge/case-study-hodl-fun',
          imageSrcSet: false,
          url: '/blog/case-study-hodl-fun/',
          target: '_blank',
        },
      ],
    },
    {
      type: 'list',
      title:
        'pages.knowledge.builders.explainer-section.blocks.sections.developer-resources.title',
      topGap: true,
      bottomGap: true,
      variant: 'row',
      items: [
        {
          valueKey: `pages.knowledge.builders.explainer-section.blocks.sections.developer-resources.items.developer-docs`,
          slug: 'developer-docs',
          image: '/static/assets/website/chain/knowledge/developer-docs',
          imageSrcSet: false,
          url: '/docs/',
          target: '_blank',
        },
        {
          valueKey: `pages.knowledge.builders.explainer-section.blocks.sections.developer-resources.items.faucet`,
          slug: 'faucet',
          image: '/static/assets/website/chain/knowledge/developer-faucet',
          imageSrcSet: false,
          url: 'https://faucet.push.org',
          target: '_blank',
        },
        {
          valueKey: `pages.knowledge.builders.explainer-section.blocks.sections.developer-resources.items.testnet-explorer`,
          slug: 'testnet-explorer',
          image: '/static/assets/website/chain/knowledge/developer-explorer',
          imageSrcSet: false,
          url: 'https://donut.push.network',
          target: '_blank',
        },
      ],
    },
  ],
};
