"use strict";(self.webpackChunkpush_website=self.webpackChunkpush_website||[]).push([[32199],{354530:e=>{e.exports=JSON.parse('{"title":"Explaining Push Nodes: Everything You Need To Know","description":"Explaining Push Nodes: Everything You Need To Know","frontMatter":{"slug":"explaining-push-nodes","title":"Explaining Push Nodes: Everything You Need To Know","authors":["push"],"image":"./cover-image.webp","description":"Explaining Push Nodes: Everything You Need To Know","text":"We\u2019re extremely excited to announce that Push Nodes are here! An all-new decentralized infrastructure for web3\u2019s leading communication layer, the Push Protocol Network.\\nThis new and improved decentralized infrastructure for Push is a long-awaited move that we\u2019re only now executing thanks to extensive research and development. ","tags":["Push Protocol","Web3","Blockchain Technology","EthGlobal"]},"content":{"id":"explaining-push-nodes","metadata":{"permalink":"/blog/explaining-push-nodes","source":"@site/blog/2024-03-08-explaining-push-nodes/index.md","title":"Explaining Push Nodes: Everything You Need To Know","description":"Explaining Push Nodes: Everything You Need To Know","date":"2024-03-08T00:00:00.000Z","formattedDate":"March 8, 2024","tags":[{"label":"Push Protocol","permalink":"/blog/tags/push-protocol"},{"label":"Web3","permalink":"/blog/tags/web-3"},{"label":"Blockchain Technology","permalink":"/blog/tags/blockchain-technology"},{"label":"EthGlobal","permalink":"/blog/tags/eth-global"}],"readingTime":3.6233333333333335,"hasTruncateMarker":true,"authors":[{"name":"Push Protocol","url":"https://twitter.com/pushprotocol","imageURL":"/assets/blog/authors/authorpush.png","key":"push"}],"frontMatter":{"slug":"explaining-push-nodes","title":"Explaining Push Nodes: Everything You Need To Know","authors":["push"],"image":"./cover-image.webp","description":"Explaining Push Nodes: Everything You Need To Know","text":"We\u2019re extremely excited to announce that Push Nodes are here! An all-new decentralized infrastructure for web3\u2019s leading communication layer, the Push Protocol Network.\\nThis new and improved decentralized infrastructure for Push is a long-awaited move that we\u2019re only now executing thanks to extensive research and development. ","tags":["Push Protocol","Web3","Blockchain Technology","EthGlobal"]},"unlisted":false,"prevItem":{"title":"How to claim Push Alpha Access NFT","permalink":"/blog/how-to-claim-push-alpha-access-nft"},"nextItem":{"title":"Benchmarking Push Chat Message Architecture: What Changed? \ud83d\udcac \u26a1","permalink":"/blog/benchmarking-push-chat-message"}},"content":"![Cover Image of Explaining Push Nodes: Everything You Need To Know](./cover-image.webp)\\n\\n\x3c!--truncate--\x3e\\n\\nWe\u2019re extremely excited to announce that Push Nodes are here! An all-new decentralized infrastructure for web3\u2019s leading communication layer, the Push Protocol Network.\\n\\nThis new and improved decentralized infrastructure for Push is a long-awaited move that we\u2019re only now executing thanks to extensive research and development.\\n\\nSo what does this new decentralized infrastructure look like?\\n\\nIn this article, we\'ll explore:\\n\\n- What is decentralization in web3 and how will the new Push Network look\\n- Exploring types of nodes and explanation of Push Nodes\\n- Why is it necessary\\n\\n### Understanding Different Types of Decentralization - Which Will Push Become\\nDecentralization can mean different things depending who you ask because it is a very complex topic that can exist in many different forms and structures. This is why many modern blockchains and protocols have tight discussions on what it means to be fully decentralized.\\n\\nSo to begin with, we\u2019ll explore the different types of architecture at a high level as a way of best communicating what Push is working towards\\n\\nClient-Server \u2013 Linear system <br />\\nDistributed \u2013 Different nodes hold different responsibilities and contribute to one another <br />\\nPeer-toPeer \u2013 Data is passed directly from user to user with no intermediaries<br />\\nDecentralized \u2013 Collective and shared control over data and decision making<br />\\n\\n\\n![First Image of Explaining Push Nodes: Everything You Need To Know](./image-1.webp)\\n\\nAs we\u2019ve outlined in the image above, Push is moving towards the right. A fully decentralized network wherein no single node or entity has complete control of the network. Access is open and shared.\\n\\nKeep in mind, decentralization can also be applied at different layers of an organization. Just as you can decentralize software architecture, you too can decentralize teams and organizational structures (DAOs).\\n\\nWhile the Push Network already has a DAO and $PUSH token, we are now taking the final step towards decentralization by decentralizing our software architecture, completing what you might call \u2018full stack decentralization\u2019. \\n\\nOur goal is to build a permissionless, trustless, proof-of-stake protocol with different node types that provide a decentralized API for notifications processing, indexing, and delivery. Ultimately, we\u2019re aiming to wrap the whole system in a developer-friendly SDK package and a dApp that can leverage the power of this network.\\n\\n\\n### Push Nodes As The Key: How Do They Work\\nThe Push Network will comprise three different types of Nodes. This includes:\\n\\n- Validator nodes - Batching notifications into blocks, validating them, and providing all the required APIs for SDK\\n- Storage nodes - Indexing notifications\\n- Delivery nodes - Sending notifications to the end-user device based on his/her 0xwallet, not his/her hardware credentials.\\n\\nThe network is guarded by a smart contract to maintain node staking and slashing. This is where the PUSH token is used.\\n\\nIn our proposed architecture, the storage network is sharded by a smart contract, which assigns specific shards to specific nodes to ensure a high amount of redundancy. This is done on top of storage nodes.\\n\\nWe\u2019re targeting fast delivery of ~15s on average for delivery of Notifications.\\n\\nAbstract architecture\\n\\n![Second Image of Explaining Push Nodes: Everything You Need To Know](./image-2.webp)\\n\\nThe basic use-case:\\n\\nA javascript SDK locates the right validator, posts a notification, and this notification will be included in the block. The block list of validator nodes for processing is determined by a combined network random number (randao).\\n\\nA more detailed version of the architecture looks like this:\\n\\n![Third Image of Explaining Push Nodes: Everything You Need To Know](./image-3.webp)\\n\\nWe\u2019ll now explore each of the three Node types in more detail.\\n\\n#### Validator Nodes\\nEvery validator can be slashed, in case his vote on the new block differs from the majority of their validators, which voted for the block as valid.\\n\\n![Fourth Image of Explaining Push Nodes: Everything You Need To Know](./image-4.webp)\\n\\n#### Storage nodes\\nOriginally, Push Storage Nodes validate and index all communications and link them to a user\u2019s wallet address and multi-chain identity.\\n\\nThe new Push decentralized system maps every wallet notification data to a specific shard.\\n\\nThis shard maintains X copies in the network. The smart contract dynamically computes x.\\nWhenever new nodes join, the contract recomputes which storage nodes are assigned to which shards.\\n\\n![Fifth Image of Explaining Push Nodes: Everything You Need To Know](./image-5.webp)\\n\\n![Sixth Image of Explaining Push Nodes: Everything You Need To Know](./image-6.webp)\\n\\n#### Delivery Nodes\\n\\nDelivery nodes are a pivotal component of the decentralized Push Notification infrastructure. They ensure notifications are securely and efficiently delivered to the end-user\u2019s device while serving as a decentralized solution for connecting web3 and web2. These nodes can be hosted by trusted third parties, bringing reliability and professionalism to the system. Their operation hinges on a few key principles and functionalities:\\n\\n- <b>Integration with Established APIs</b>: To leverage robust, widely-accepted infrastructure for sending Push Notifications.\\n- <b>Privacy-Centric Mapping</b>: To maintain the privacy and security of the users, delivery nodes store a mapping between a registered crypto wallet and the end-user device ID. \\n- <b>Hosting by Trusted Entities</b>: Recognizing the importance of reliability and trust in the notification delivery process, delivery nodes can be hosted by trusted third parties.\\n- <b>Collaboration with Wallet Providers</b>: In addition to being hosted by trusted third parties, delivery nodes can also be hosted by wallet providers themselves. This collaboration brings an added layer of integration and convenience, as wallet providers have a direct interest in ensuring that their users receive notifications promptly and securely.\\n\\n![Seventh Image of Explaining Push Nodes: Everything You Need To Know](./image-7.webp)\\n\\n#### Why Push Nodes? Why Decentralization?\\n\\nYou can read more about Push Delivery Nodes [here](https://push.org/blog/empower-your-wallet-app-or-platform-with-push-delivery-nodes/).\\n\\nWe believe that communication tools should be a public good. Builders should have open and free access to enhance their dApps with web3-native communication, without needing to rely on centralized providers.\\n\\nAs an extension of this, those same builders should not just have access to these tools, but a say in how these tools get developed and improved over time.\\n\\nAs the accessibility of these tools grows, so does the quality of dApps that build with them. When we achieve the goal of building better projects, we move closer towards a reality where we can onboard the next billion users to web3. \\n\\nWe are excited for this new era for the Push Protocol Network and we are extremely excited to have you be a part of it.\\n\\nFor more questions or queries, join us in Discord \ud83d\udc49https://discord.com/invite/pushprotocol\\n\\nYou can also get started building with Push tools \ud83d\udc49https://push.org/docs/"}}')}}]);