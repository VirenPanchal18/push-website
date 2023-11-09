/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  pushNotificationSidebar: [
    {
      type: "doc",
      id: "notifications/notifications",
    },
    {
      type: "doc",
      id: "notifications/docs-notifications-quickstart",
    },
    {
      type: "doc",
      id: "notifications/docs-notifications-important-concepts",
    },
    {
      type: "category",
      label: "Build",
      link: {
        type: "doc",
        id: "notifications/docs-notifications-build-section",
      },
      collapsed: false,
      items: [
        { type: "autogenerated", dirName: "notifications/01-build" },
        {
          label: "Build Push Chat",
          type: "link",
          href: "https://push.org/docs/chat",
        },
      ],
    },
    {
      type: "category",
      label: "Playground",
      link: {
        type: "doc",
        id: "notifications/docs-notifications-playground-section",
      },
      collapsed: true,
      items: [
        { type: "autogenerated", dirName: "notifications/02-playground" },
      ],
    },
    {
      type: "category",
      label: "Showrunners Scaffold",
      link: {
        type: "doc",
        id: "notifications/docs-notifications-showrunners-scaffold-section",
      },
      collapsed: true,
      items: [
        {
          type: "autogenerated",
          dirName: "notifications/03-showrunners-scaffold",
        },
      ],
    },
    {
      type: "category",
      label: "Tutorials",
      link: {
        type: "doc",
        id: "notifications/docs-notifications-tutorials-section",
      },
      collapsed: true,
      items: [{ type: "autogenerated", dirName: "notifications/04-tutorials" }],
    },
    {
      type: "category",
      label: "Concepts",
      link: {
        type: "doc",
        id: "notifications/docs-notifications-concepts-section",
      },
      collapsed: true,
      items: [{ type: "autogenerated", dirName: "notifications/05-concepts" }],
    },
    {
      type: "category",
      label: "Notification Standards",
      link: {
        type: "doc",
        id: "notifications/docs-notifications-notification-standards-section",
      },
      collapsed: true,
      items: [
        {
          type: "autogenerated",
          dirName: "notifications/06-notification-standards",
        },
      ],
    },
    {
      type: "category",
      label: "Push Smart Contracts",
      link: {
        type: "doc",
        id: "notifications/docs-notifications-push-smart-contracts-section",
      },
      collapsed: true,
      items: [
        {
          type: "autogenerated",
          dirName: "notifications/07-push-smart-contracts",
        },
      ],
    },
  ],
  pushChatSidebar: [
    {
      type: "doc",
      id: "chat/chat",
    },
    {
      type: "doc",
      id: "chat/docs-chat-quickstart",
    },
    {
      type: "category",
      label: "Build",
      link: {
        type: "doc",
        id: "chat/docs-chat-build-section",
      },
      collapsed: false,
      items: [
        { type: "autogenerated", dirName: "chat/01-build" },
        {
          label: "Build Push Notfications",
          type: "link",
          href: "https://push.org/docs/notifications",
        },
      ],
    },
    {
      type: "category",
      label: "Message Types",
      link: {
        type: "doc",
        id: "chat/docs-chat-message-types-section",
      },
      collapsed: false,
      items: [{ type: "autogenerated", dirName: "chat/02-message-types" }],
    },
    {
      type: "category",
      label: "UI Components",
      link: {
        type: "doc",
        id: "chat/docs-chat-ui-components-section",
      },
      collapsed: true,
      items: [{ type: "autogenerated", dirName: "chat/03-ui-components" }],
    },
    {
      type: "category",
      label: "Tutorials",
      link: {
        type: "doc",
        id: "chat/docs-chat-tutorials-section",
      },
      collapsed: true,
      items: [{ type: "autogenerated", dirName: "chat/04-tutorials" }],
    },
    {
      type: "category",
      label: "Concepts",
      link: {
        type: "doc",
        id: "chat/docs-chat-concepts-section",
      },
      collapsed: true,
      items: [{ type: "autogenerated", dirName: "chat/05-concepts" }],
    },
  ],
  pushVideoSidebar: [
    {
      type: 'doc',
      id: 'video/video',
    },
    {
      type: 'doc',
      id: 'video/docs-video-quickstart',
    },
    {
      type: 'doc',
      id: 'video/docs-video-supported-wallet-standards',
    },
    {
      type: 'category',
      label: 'Build',
      link: {
        type: 'doc',
        id: 'video/docs-video-build-section',
      },
      collapsed: false,
      items: [
        { type: 'autogenerated', dirName: 'video/01-build' },
        {
          label: 'Build Push Notfications',
          type: 'link',
          href: 'https://push.org/docs/notifications',
        },
        {
          label: 'Build Push Chat',
          type: 'link',
          href: 'https://push.org/docs/chat',
        },
      ]
    },
  ],
  pushDaoSidebar: [
    {
      type: "doc",
      id: "dao/dao",
    },
    {
      type: "doc",
      id: "dao/mission-and-values",
    },
    {
      type: "doc",
      id: "dao/governance",
    },
    {
      type: "doc",
      id: "dao/introduction-to-push-governance",
    },
    {
      type: "doc",
      id: "dao/governance-process",
    },
    {
      type: "doc",
      id: "dao/the-proposal-phase",
    },
    {
      type: "doc",
      id: "dao/the-discussion-phase",
    },
    {
      type: "doc",
      id: "dao/the-governance-phase",
    },
    {
      type: "doc",
      id: "dao/game-theory",
    },
    {
      type: "doc",
      id: "dao/getting-involved",
    },
    {
      type: "doc",
      id: "dao/contribute-to-push-dao",
    },
  ],
}

module.exports = sidebars
