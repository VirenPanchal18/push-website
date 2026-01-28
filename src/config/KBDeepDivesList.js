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
      title: 'Learn what makes Push Chain tick!',
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
          title: 'What is Universal Fee Abstraction and How do they work?',
          url: '/blog/what-is-universal-abstraction',
          target: '_blank',
        },
        {
          slug: 'what-are-universal-executor-accounts',
          image:
            '/static/assets/website/chain/knowledge/what-are-executor-accounts',
          imageSrcSet: false,
          title:
            'What are Universal Executor Accounts (UEAs) and How do they work?',
          url: '/blog/what-are-universal-executor-accounts',
          target: '_blank',
        },
        {
          slug: 'how-universal-transaction-works',
          image:
            '/static/assets/website/chain/knowledge/how-universal-transaction-works',
          imageSrcSet: false,
          title: 'How Universal Transaction Works',
          url: '/blog/how-universal-transaction-works',
          target: '_blank',
        },
        {
          slug: 'interop-spectrum',
          image: '/static/assets/website/chain/knowledge/interop-spectrum',
          imageSrcSet: false,
          title: 'Interop as a Spectrum',
          url: '/blog/interop-spectrum',
          target: '_blank',
        },
        {
          slug: 'understand-proof-of-stake-part-1',
          image:
            '/static/assets/website/chain/knowledge/understand-proof-of-stake',
          imageSrcSet: false,
          title: 'Understanding Proof of Stake (POS) - Part 1',
          url: '/blog/understand-proof-of-stake',
          target: '_blank',
        },
        {
          slug: 'push-chain-silence-labs',
          image:
            '/static/assets/website/chain/knowledge/push-chain-silence-labs',
          imageSrcSet: false,
          title:
            'Push Chain × Silence Labs: Building the Distributed Signing Mechanism',
          url: '/blog/push-chain-silence-labs',
          target: '_blank',
        },
      ],
    },
  ],
};
