export const KBDeepDivesList = {
  title: 'pages.knowledge.deepdives.explainer-section.blocks.title',
  content: [
    {
      type: 'indexlist',
      topGap: false,
      bottomGap: false,
      value: [
        {
          type: 'text',
          valueKey:
            'pages.knowledge.deepdives.explainer-section.blocks.sections.architecture-deep-dives.items.intro',
        },
        {
          type: 'text',
          valueKey:
            'pages.knowledge.deepdives.explainer-section.blocks.sections.architecture-deep-dives.items.curated-reads',
          hidden: true,
        },
      ],
    },

    {
      title:
        'pages.knowledge.deepdives.explainer-section.blocks.sections.learn-push-chain.title',
      type: 'list',
      topGap: true,
      bottomGap: true,
      variant: 'row',
      items: [
        {
          slug: 'what-is-universal-fee-abstraction',
          image:
            '/static/assets/website/chain/knowledge/what-is-fee-abstraction',
          imageSrcSet: false,
          valueKey:
            'pages.knowledge.deepdives.explainer-section.blocks.sections.learn-push-chain.items.what-is-universal-fee-abstraction.title',
          url: '/blog/what-is-universal-abstraction',
          target: '_blank',
        },
        {
          slug: 'what-are-universal-executor-accounts',
          image:
            '/static/assets/website/chain/knowledge/what-are-executor-accounts',
          imageSrcSet: false,
          valueKey:
            'pages.knowledge.deepdives.explainer-section.blocks.sections.learn-push-chain.items.what-are-universal-executor-accounts.title',
          url: '/blog/what-are-universal-executor-accounts',
          target: '_blank',
        },
        {
          slug: 'how-universal-transaction-works',
          image:
            '/static/assets/website/chain/knowledge/how-universal-transaction-works',
          imageSrcSet: false,
          valueKey:
            'pages.knowledge.deepdives.explainer-section.blocks.sections.learn-push-chain.items.how-universal-transaction-works.title',
          url: '/blog/how-universal-transaction-works',
          target: '_blank',
        },
        {
          slug: 'push-chain-silence-labs',
          image:
            '/static/assets/website/chain/knowledge/push-chain-silence-labs',
          imageSrcSet: false,
          valueKey:
            'pages.knowledge.deepdives.explainer-section.blocks.sections.learn-push-chain.items.push-chain-silence-labs.title',
          url: '/blog/push-chain-silence-labs',
          target: '_blank',
        },
        {
          slug: 'interop-spectrum',
          image: '/static/assets/website/chain/knowledge/interop-spectrum',
          imageSrcSet: false,
          valueKey:
            'pages.knowledge.deepdives.explainer-section.blocks.sections.learn-push-chain.items.interop-spectrum.title',
          url: '/blog/interop-spectrum',
          target: '_blank',
        },
      ],
    },
  ],
};
