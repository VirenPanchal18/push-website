"use strict";(self.webpackChunkpush_website=self.webpackChunkpush_website||[]).push([[73620],{118508:e=>{e.exports=JSON.parse('{"title":"Empower Your Wallet, App, or Platform with Push Delivery Nodes\u26a1","description":"Cover image of Empower Your Wallet, App, or Platform with Push Delivery Nodes\u26a1","frontMatter":{"slug":"empower-your-wallet-app-or-platform-with-push-delivery-nodes","title":"Empower Your Wallet, App, or Platform with Push Delivery Nodes\u26a1","authors":["push"],"image":"./cover-image.png","text":"Push Delivery Nodes serve as a decentralized solution for connecting web3 and web2. They allow any centralized or decentralized platform to receive communications from Push Storage Nodes, which validate and index all communications and link them to a user\u2019s wallet address and multi-chain identit","tags":["Web3","Developer","Blockchain Development","Blockchain Technology","Delivery Nodes"]},"content":{"id":"empower-your-wallet-app-or-platform-with-push-delivery-nodes","metadata":{"permalink":"/blog/empower-your-wallet-app-or-platform-with-push-delivery-nodes","source":"@site/blog/2023-02-16-empower-your-wallet-app-or-platform/index.md","title":"Empower Your Wallet, App, or Platform with Push Delivery Nodes\u26a1","description":"Cover image of Empower Your Wallet, App, or Platform with Push Delivery Nodes\u26a1","date":"2023-02-16T00:00:00.000Z","formattedDate":"February 16, 2023","tags":[{"label":"Web3","permalink":"/blog/tags/web-3"},{"label":"Developer","permalink":"/blog/tags/developer"},{"label":"Blockchain Development","permalink":"/blog/tags/blockchain-development"},{"label":"Blockchain Technology","permalink":"/blog/tags/blockchain-technology"},{"label":"Delivery Nodes","permalink":"/blog/tags/delivery-nodes"}],"readingTime":2.56,"hasTruncateMarker":true,"authors":[{"name":"Push Protocol","url":"https://twitter.com/pushprotocol","imageURL":"/assets/blog/authors/authorpush.png","key":"push"}],"frontMatter":{"slug":"empower-your-wallet-app-or-platform-with-push-delivery-nodes","title":"Empower Your Wallet, App, or Platform with Push Delivery Nodes\u26a1","authors":["push"],"image":"./cover-image.png","text":"Push Delivery Nodes serve as a decentralized solution for connecting web3 and web2. They allow any centralized or decentralized platform to receive communications from Push Storage Nodes, which validate and index all communications and link them to a user\u2019s wallet address and multi-chain identit","tags":["Web3","Developer","Blockchain Development","Blockchain Technology","Delivery Nodes"]},"unlisted":false,"prevItem":{"title":"Getting Started With Push SDK: uiweb API\ud83d\udee0\ufe0f","permalink":"/blog/getting-started-with-push-sdk-uiweb-api"},"nextItem":{"title":"Building a Better UX in BNB With Our 8 Launch Collaborators\ud83d\ude80","permalink":"/blog/building-a-better-ux-in-bnb-with-our-8-launch-collaborators"}},"content":"import { ImageText, VideoContainer } from \'@site/src/css/SharedStyling\';\\n\\n![Cover image of Empower Your Wallet, App, or Platform with Push Delivery Nodes\u26a1](./cover-image.png)\\n\x3c!--truncate--\x3e\\n\\n\\n<ImageText>Simplify Web3 Notifications for Your App with Push Delivery Nodes \u2014 A One-Stop Solution for Mobile, Desktop or Extension. These Decentralized Nodes Connect Web3 and Web2, Allowing Your Platform to Receive Notifications from Validating and Indexing Storage Nodes, Tied Directly to Your Wallet Address and Multi-Chain Identity</ImageText>\\n\\n\x3c!--customheaderpoint--\x3e\\n# The Swiftest Route to Web3 Notifications, Chats, and More Across Mobile, Desktop, and Extensions.\\n\\n## What are the Delivery Nodes?\\nPush Delivery Nodes serve as a decentralized solution for connecting web3 and web2. They allow any centralized or decentralized platform to receive communications from Push Storage Nodes, which validate and index all communications and link them to a user\u2019s wallet address and multi-chain identity.\\n\\n\\nDevelopers can run these nodes on their backend to connect their web2 infrastructure to web3 communication, allowing for extended communication beyond web3 wallet addresses to web2 platform users. Push Delivery Nodes enable mapping any web2 device token or platform username to a specific web3 wallet address, which can then send alerts to web2 or web2.5 platforms.\\n\\nExamples of platforms that can be reached include crypto wallet apps, mobile apps, browser extensions, Telegram and Discord bots, email alerts, and more.\\n\\nFor a pure web3 experience, listening to Push Storage Nodes or utilizing their RPC endpoints/SDK is the best option. However, if you\u2019re a developer looking to extend these communication experiences to centralized platforms, you need to use Push Delivery Nodes.\\n\\n![Docusaurus Image](./image-1.png)\\n\\n\\n## 7 Steps for Getting Started With the Delivery Node Module\ud83c\udf31\\n### Prerequisites\\n- MYSQL (Version >= 5.7)\\n- Redis (Version >= 6.0)\\n- Docker (For local setup)\\n- Google FCM Account Setup\\n### Step 1: Clone Push delivery node repo\\nGit clone can be found here: https://github.com/ethereum-push-notification-service/push-delivery-node.git\\n\\n### Step 2: Environment configuration\\nRefer env sample file. The MYSQL DB credentials and Redis URL needs to be updated. The remaining conf need not be edited as of now.\\n\\nIf you use docker-compose for the local setup MYSQL DB and Redis config can be left as it is.\\n\\n```js\\n# REDIS\\nREDIS_URL=redis://localhost:6379\\n# DELIVERY NODE MYSQL DATABASE\\nDELIVERY_NODE_DB_HOST=localhost\\nDELIVERY_NODE_DB_NAME=dbname\\nDELIVERY_NODE_DB_USER=user\\nDELIVERY_NODE_DB_PASS=pass\\nDELIVERY_NODE_DB_PORT=3306\\n```\\n### Step 3. a: Infra setup: (local)\\nThe docker-compose will bring up the MYSQL, Redis, and PHPMyAdmin containers for the Delivery Node.\\n\\n\\n```js\\ndocker compose up\\n```\\n\\n### Step 3. b: (Alternate) infra setup: (Production)\\n- Host MYSQL and Redis Separately\\n- Add MYSQL and Redis credentials in the .env file\\n### Step 4: FCM project setup\\n- Refer https://firebase.google.com/docs/admin/setup\\n- Create the firebase-adminsdk.json file in the root folder and add the FCM JSON to this file\\n### Step 5: Build the delivery node project\\nYou should then be able to build the project using:\\n\\n```js\\ncd push-delivery-node\\nnpm install\\n```\\n### Step 6: Start the delivery node project\\nYou should be able to start the server using:\\n\\n```js\\ncd push-delivery-node\\nnpm start\\n```\\n\\n### Step 7: Device registration\\n- An endpoint is hosted as part of the delivery node project, which can be used for device registration.\\n- Below is the API to create a mapping between the wallet address and the device token for which the messages need to be delivered.\\n- `<delivery_node_url>` is the base URL of the Delivery node you have hosted.\\n\\nBelow is the curl request of this endpoint\\n\\n```js\\ncurl - location - request POST \'https://<delivery_node_url>/apis/v1/pushtokens/register\' \\\\\\n - header \'Content-Type: application/json\' \\\\\\n - data-raw \'{\\n\\"wallet\\": \\"eip155:0x35B84d6848D16415177c64D64504663b998A6ab4\\",\\n\\"device_token\\": \\"device_token\\",\\n\\"platform\\": \\"android\\"\\n}\'\\n```\\n\\n## Useful Links\\n- <i>Delivery Node Repo Link:</i> <a href=\'https://github.com/ethereum-push-notification-service/push-delivery-node\'>https://github.com/ethereum-push-notification-service/push-delivery-node</a>\\n- <i>Demo Mobile App Repo Link:</i> <a href=\'https://github.com/ethereum-push-notification-service/demo-push-mobile-app\'>https://github.com/ethereum-push-notification-service/demo-push-mobile-app</a>\\n- <i>Delivery Node Setup Video Tutorial:</i>\\n\\n<VideoContainer>\\n<iframe width=\\"100%\\" height=\\"100%\\" style={{ borderRadius: \\"32px\\" }} src=\\"https://www.youtube.com/embed/OlRHL3qd4oY\\" title=\\"Get started with Push Delivery Nodes | #web3 communication\\" frameborder=\\"0\\" allow=\\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\\" allowfullscreen></iframe>\\n</VideoContainer>\\n\\n<i>PUSH Documentation:</i>  <a href=\'/docs/notifications/tutorials/integrate-notifications-via-delivery-node/\'>Integrating notifications via Push Delivery Nodes</a>\\n\\n## Push Support\\nIf at any point you find yourself needing assistance and help with getting set up, Push has a team of helpful developers ready when you need it.\\n\\nCome join us in Discord where you can get assistance and meet other devs who are building with Push\ud83d\udc49 https://discord.com/invite/pushprotocol\\n\\n## Push SNS Module for Delivery Node\\nWe have also launched the Push SNS Module for the delivery nodes, which instantly allows any developer to receive notifications, chats, or any other form of web3 communication directly to the platform they are building with the help of webhooks.\\n\\nYou can find more details here.\\n\\n### What\u2019s next for Push Delivery Nodes?\\n- Dockerization\\n- Analytics\\n- Monitoring APIs\\n- Support Push Chat"}}')}}]);