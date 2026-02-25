export const KBTestnetList = {
  title: 'pages.knowledge.testnet.explainer-section.blocks.title',
  content: [
    {
      type: 'indexlist',
      value: [
        {
          type: 'text',
          valueKey:
            'pages.knowledge.testnet.explainer-section.blocks.sections.donut-overview.items.intro',
        },
        {
          type: 'text',
          valueKey:
            'pages.knowledge.testnet.explainer-section.blocks.sections.donut-overview.items.welcome-donut',
        },
        {
          type: 'text',
          valueKey:
            'pages.knowledge.testnet.explainer-section.blocks.sections.donut-overview.items.what-is-push-chain',
        },
        {
          type: 'text',
          valueKey:
            'pages.knowledge.testnet.explainer-section.blocks.sections.donut-overview.items.quick-links',
        },
        {
          type: 'text',
          valueKey:
            'pages.knowledge.testnet.explainer-section.blocks.sections.donut-overview.items.why-push-exists',
        },
        {
          type: 'text',
          valueKey:
            'pages.knowledge.testnet.explainer-section.blocks.sections.donut-overview.items.how-reimagines-interoperability',
        },
        {
          type: 'text',
          valueKey:
            'pages.knowledge.testnet.explainer-section.blocks.sections.donut-overview.items.how-to-participate',
        },
        {
          type: 'text',
          valueKey: `pages.knowledge.testnet.explainer-section.blocks.sections.donut-overview.items.curated-reads`,
          hidden: true,
        },
      ],
    },
    {
      type: 'list',
      title:
        'pages.knowledge.testnet.explainer-section.blocks.sections.for-developers.title',
      topGap: true,
      bottomGap: true,
      variant: 'row',
      items: [
        {
          valueKey:
            'pages.knowledge.testnet.explainer-section.blocks.sections.for-developers.items.documentation',
          image: '/static/assets/website/chain/knowledge/developer-docs',
          imageSrcSet: false,
          url: '/docs',
          target: '_blank',
        },
        {
          valueKey:
            'pages.knowledge.testnet.explainer-section.blocks.sections.for-developers.items.push-explorer',
          image: '/static/assets/website/chain/knowledge/developer-explorer',
          imageSrcSet: false,
          title: 'Push Explorer',
          url: 'https://donut.push.network',
          target: '_blank',
        },
        {
          valueKey:
            'pages.knowledge.testnet.explainer-section.blocks.sections.for-developers.items.push-faucet',
          image: '/static/assets/website/chain/knowledge/grassroots',
          imageSrcSet: false,
          url: 'https://faucet.pusj.org',
          target: '_blank',
        },
        {
          valueKey:
            'pages.knowledge.testnet.explainer-section.blocks.sections.for-developers.items.grassroots-program',
          image: '/static/assets/website/chain/knowledge/developer-explorer',
          imageSrcSet: false,
          url: 'https://zv9atndluia.typeform.com/to/ItQ7i2sO',
          target: '_blank',
        },
      ],
    },
    {
      type: 'list',
      title: 'For Users',
      topGap: true,
      bottomGap: true,
      variant: 'row',
      items: [
        {
          valueKey:
            'pages.knowledge.testnet.explainer-section.blocks.sections.for-users.items.ecosystem-apps',
          image: '/static/assets/website/chain/knowledge/ecosystem',
          imageSrcSet: false,
          url: '/ecosystem',
          target: '_blank',
        },
        {
          valueKey:
            'pages.knowledge.testnet.explainer-section.blocks.sections.for-users.items.knowledge-base',
          image: '/static/assets/website/chain/knowledge/knowledgebase',
          imageSrcSet: false,
          url: '/knowledge',
          target: '_blank',
        },
        {
          valueKey:
            'pages.knowledge.testnet.explainer-section.blocks.sections.for-users.items.lets-push-yaps',
          image: '/static/assets/website/chain/knowledge/lfpush',
          imageSrcSet: false,
          title: `Let's Push Yaps`,
          url: '/lfpush',
          target: '_blank',
        },
      ],
    },
    {
      type: 'list',
      title: 'For Validators',
      topGap: true,
      bottomGap: true,
      variant: 'row',
      items: [
        {
          valueKey:
            'pages.knowledge.testnet.explainer-section.blocks.sections.for-validators.items.push-validator',
          image: '/static/assets/website/chain/knowledge/knowledgebase',
          imageSrcSet: false,
          title: 'Push Validator',
          url: '/docs/chain/node-and-system-tools/running-push-validator/',
          target: '_blank',
        },
      ],
    },
    {
      type: 'list',
      title: 'Network Updates',
      topGap: true,
      bottomGap: true,
      variant: 'row',
      items: [
        {
          image: '/static/assets/website/chain/knowledge/network-updates',
          imageSrcSet: false,
          title: 'Chain Upgrade - Token Rebalancing - Donut Testnet',
          url: '/knowledge/testnet/updates/chain-upgrade-token-rebalance-25-feb-2026',
          target: '_blank',
        },
      ],
    },
  ],
};
