"use strict";(self.webpackChunkpush_website=self.webpackChunkpush_website||[]).push([[94780],{431504:e=>{e.exports=JSON.parse('{"title":"Getting Started With Push SDK REST API\u2699\ufe0f","description":"Cover image of Getting Started With Push SDK REST API\u2699\ufe0f","frontMatter":{"slug":"getting-started-with-push-sdk-rest-api","title":"Getting Started With Push SDK REST API\u2699\ufe0f","authors":["push"],"image":"./cover-image.webp","text":"The PUSH-SDK, is a growing JavaScript-based SDK that allows developers to add push notification functionality to their dapps.","tags":["Web3","Blockchain","SDK","Push Notification Service","Developer"]},"content":{"id":"getting-started-with-push-sdk-rest-api","metadata":{"permalink":"/blog/getting-started-with-push-sdk-rest-api","source":"@site/blog/2023-02-01-getting-started-with-push/index.md","title":"Getting Started With Push SDK REST API\u2699\ufe0f","description":"Cover image of Getting Started With Push SDK REST API\u2699\ufe0f","date":"2023-02-01T00:00:00.000Z","formattedDate":"February 1, 2023","tags":[{"label":"Web3","permalink":"/blog/tags/web-3"},{"label":"Blockchain","permalink":"/blog/tags/blockchain"},{"label":"SDK","permalink":"/blog/tags/sdk"},{"label":"Push Notification Service","permalink":"/blog/tags/push-notification-service"},{"label":"Developer","permalink":"/blog/tags/developer"}],"readingTime":5.0633333333333335,"hasTruncateMarker":true,"authors":[{"name":"Push Protocol","url":"https://twitter.com/pushprotocol","imageURL":"/assets/blog/authors/authorpush.png","key":"push"}],"frontMatter":{"slug":"getting-started-with-push-sdk-rest-api","title":"Getting Started With Push SDK REST API\u2699\ufe0f","authors":["push"],"image":"./cover-image.webp","text":"The PUSH-SDK, is a growing JavaScript-based SDK that allows developers to add push notification functionality to their dapps.","tags":["Web3","Blockchain","SDK","Push Notification Service","Developer"]},"unlisted":false,"prevItem":{"title":"January Monthly Recap\u2744\ufe0f","permalink":"/blog/january-monthly-recap"},"nextItem":{"title":"QiDAO Taps Push to Update Users on their Debt Positions\ud83e\ude99","permalink":"/blog/qi-dao-taps-push-to-update-users-on-their-debt-positions"}},"content":"![Cover image of Getting Started With Push SDK REST API\u2699\ufe0f](./cover-image.webp)\\n\x3c!--truncate--\x3e\\n\\nThe [PUSH-SDK](https://github.com/ethereum-push-notification-service/push-sdk), is a growing JavaScript-based SDK that allows developers to add push notification functionality to their dapps. Using the SDK, developers can:\\n\\n- Build PUSH features into their dapps\\n- Get access to Push Nodes APIs\\n- Render Push Notifications UI\\n\\n\\nIt is written in Typescript and supports React, React Native, Plain JS, and Node JS-based platforms. (We are adding support for more!) It is also built on top of standard Web3 packages like <b>ethers, @web3-react</b>.\\n\\nIf you\u2019re looking for our full documentation on [Push-SDK REST API, you can find that here](https://push.org/docs).\\n\\nBut for now, let\u2019s walk you through the main features of the Push-SDK REST API and how to use them in your code.\\n\\n## Fetching user notifications\\nYou can use the <b>getFeeds</b> method to fetch a user\'s notifications. This method takes an options object as an argument, which allows you to specify the following parameters:\\n\\n- <b>user</b> (mandatory, string): The user\u2019s address in CAIP format.\\n- <b>page</b> (optional, number): The page index of the results. Default is 1.\\n- <b>limit</b> (optional, number): The number of items per page. Default is 10.\\n- <b>spam</b> (optional, boolean): Whether to fetch spam notifications. Default is false.\\n- <b>env</b> (optional, string): The API environment to use. Possible values are \u2018prod\u2019 and \u2018staging\u2019. Default is \u2018prod\u2019.\\n- <b>raw</b> (optional, boolean): Whether to return the raw, unformatted API response. Default is <b>false</b>.\\n\\nHere\u2019s an example of how you might use the <b>getFeeds</b> method in your code:\\n\\n```js\\nconst notifications = await PushAPI.user.getFeeds({\\n  user: \'eip155:11155111:0xD8634C39BBFd4033c0d3289C4515275102423681\',\\n  env: \'staging\'\\n});\\n```\\n\\nIn this example, we define a user address using the CAIP format. CAIP, or Chain Agnostic Improvement Proposal, is a way to describe standards for blockchain projects that are not specific to a single chain. It was developed by the Ethereum Improvement Proposal (EIP) process and is used to identify and encode information about Ethereum addresses, contract addresses, and other crypto-assets.\\n\\nIt is important to note that CAIP is not a standardized way of identifying and encoding information about crypto-assets; it is under development by the Ethereum community and is not yet widely adopted in the ecosystem.\\n\\nCAIP addresses are composed of three parts:\\n\\n- <b>The namespace:</b> This is a string designed to uniquely identify a blockchain ecosystem or set of ecosystems as a namespace.\\n- <b>The network ID:</b> This is an integer that identifies the Ethereum network the asset belongs to. For example, 1 is the main network, 3 is the Ropsten test network, 5 is the Goerli test network, and 11155111 is Sepolia test network.\\n- <b>The address:</b> This is the actual address of the asset, encoded as a hexadecimal string.\\n\\nFor instance:\\n\\n```js\\neip155:11155111:0xD8634C39BBFd4033c0d3289C4515275102423681\\n```\\n\\nIn this example, the namespace is eip155 which identifies EVM chains, the network ID is 5 (Goerli test network) and the address is <b>0xD8634C39BBFd4033c0d3289C4515275102423681</b>.\\n\\nCAIP is designed to be flexible and extensible, allowing for the inclusion of additional information as needed. It is used by the Push Protocol and other Ethereum-based projects as a standardized way of identifying and encoding information about crypto-assets, and distinguishing information from different chains.\\n\\nContinuing with <b>getFeeds</b>, to fetch spam notifications, set the <b>spam</b> parameter to <b>true</b>:\\n\\n```js\\nconst spams = await PushAPI.user.getFeeds({\\n  user: \'eip155:11155111:0xD8634C39BBFd4033c0d3289C4515275102423681\',\\n  spam: true,\\n  env: \'staging\'\\n});\\n```\\n\\nThe <b>getFeeds</b> method returns a list of notifications for the specified user.\\n\\n## Fetching user subscriptions\\nYou can use the <b>getSubscriptions</b> method to fetch a user\'s subscriptions. This method takes an options object as an argument, which allows you to specify the following parameters:\\n\\n- <b>user</b> (mandatory, string): The user\u2019s address in CAIP format.\\n- <b>env</b> (optional, string): The API environment to use. Possible values are \u2018prod\u2019 and \u2018staging\u2019. Default is \u2018prod\u2019.\\nHere\u2019s an example of how you might use the <b>getSubscriptions</b> method in your code:\\n\\n```js\\nconst subscriptions = await PushAPI.user.getSubscriptions({\\n  user: \'eip155:11155111:0xD8634C39BBFd4033c0d3289C4515275102423681\',\\n  env: \'staging\'\\n});\\n```\\n\\nThe <b>getSubscriptions</b> method returns a list of channels <b>`[{ channel: \'0xaddress\', ... }]`</b> subscribed by the user.\\n\\n## Fetching channel details\\nYou can use the <b>getChannel</b> method to fetch information about a specific channel. This method takes an options object as an argument, which allows you to specify the following parameters:\\n\\nchannel (mandatory, string): The channel\u2019s address in CAIP format.\\nenv (optional, string): The API environment to use. Possible values are \u2018prod\u2019 and \u2018staging\u2019. Default is \u2018prod\u2019.\\nHere\u2019s an example of how you might use the getChannel method in your code:\\n\\n```js\\nconst channelData = await PushAPI.channels.getChannel({\\n  channel: \'eip155:11155111:0xD8634C39BBFd4033c0d3289C4515275102423681\',\\n  env: \'staging\'\\n});\\n```\\n\\nThe <b>getChannel</b> method returns an object with information about the channel.\\n\\n## Searching for channels\\nYou can use the <b>search</b> method to search for channels based on a specified query. It takes an options object as an argument, which allows you to specify the following parameters:\\n\\n- <b>query</b> (mandatory, string): The search query.\\n- <b>page</b> (optional, number): The page index of the results. Default is 1.\\n- <b>limi</b>t (optional, number): The number of items per page. Default is 10.\\n- <b>env</b> (optional, string): The API environment to use. Possible values are \u2018prod\u2019 and \u2018staging\u2019. Default is \u2018prod\u2019.\\n\\nHere\u2019s an example of how you might use the <b>search</b> method in your code:\\n\\n```js\\nawait PushAPI.channels.subscribe({\\n  signer: _signer,\\n  user: \'eip155:11155111:0xD8634C39BBFd4033c0d3289C4515275102423681\',\\n  channel: \'eip155:11155111:0xD8634C39BBFd4033c0d3289C4515275102423681\',\\n\\tenv: \'staging\'\\n\\t});\\n```\\n\\nThe <b>subscribe</b> method returns a confirmation of the subscription.\\n\\n## Opting out of a channel\\nYou can use the unsubscribe method to allow a user to opt out of a specific channel. This method takes an options object as an argument, which allows you to specify the following parameters:\\n\\n- <b>signer</b> (mandatory, object): The object that signs the unsubscription transaction.\\n- <b>user</b> (mandatory, string): The user\u2019s address in CAIP format.\\n- <b>channel</b> (mandatory, string): The channel\u2019s address in CAIP format.\\n- <b>env</b> (optional, string): The API environment to use. Possible values are \u2018prod\u2019 and \u2018staging\u2019. Default is \u2018prod\u2019.\\nHere\u2019s an example of how you might use the <b>unsubscribe</b> method in your code:\\n\\n## Sending a notification\\nYou can use the <b>sendNotification</b> method from the payloads object to send a direct payload notification to a specific recipient, group of recipients, or all recipients. This method takes an options object as an argument, which allows you to specify the following parameters:\\n\\n <b>signer</b> (mandatory, object): The object representing the signer for the transaction. <br />\\n\\n <b>type</b> (mandatory, number): The type of recipient. Possible values are 1 (broadcast), 3 (single recipient), and 4 (group of recipients). <br />\\n\\n <b>identityType</b> (mandatory, number): The identity type of the recipient. Possible values are 2 (direct payload). <br />\\n\\n <b>notification</b> (mandatory, object): An object representing the notification. <br />\\n\\n- <b>title</b> (mandatory, string): The title of the notification.\\n- <b>body</b> (mandatory, string): The body of the notification.\\n<b>payload</b> (mandatory, object): An object representing the payload.\\n\\n- <b>title</b> (mandatory, string): The title of the payload.\\n- <b>body</b> (mandatory, string): The body of the payload.\\n- <b>cta</b> (optional, string): The call-to-action of the payload.\\n- <b>img</b> (optional, string): The image of the payload. <br />\\n\\n<b>recipients</b> (optional, string or array of strings): The recipient address(es) in CAIP format. Only required for type 3 (single recipient) or type 4 (group of recipients). <br />\\n\\n<b>channel</b> (mandatory, string): The channel\u2019s address in CAIP format. <br />\\n\\n<b>env</b> (optional, string): The API environment to use. Possible values are \u2018prod\u2019 and \u2018staging\u2019. Default is \u2018prod\u2019. <br />\\n\\nHere are examples of how you might use the <b>sendNotification</b> method in your code:\\n\\n<b>Single recipient (target):</b>\\n\\n```js\\nconst apiResponse = await PushAPI.payloads.sendNotification({\\n  signer,\\n  type: 3, // target\\n  identityType: 2, // direct payload\\n  notification: {\\n    title: `[SDK-TEST] notification TITLE:`,\\n    body: `[sdk-test] notification BODY`\\n  },\\n  payload: {\\n    title: `[sdk-test] payload title`,\\n    body: `sample msg body`,\\n    cta: \'\',\\n    img: \'\'\\n  },\\n  recipients: \'eip155:11155111:0xD8634C39BBFd4033c0d3289C4515275102423681\', // recipient address\\n  channel: \'eip155:11155111:0xD8634C39BBFd4033c0d3289C4515275102423681\', // your channel address\\n  env: \'staging\'\\n});\\n```\\n\\n<b>Group of recipients (subset):</b>\\n\\n```js\\nconst apiResponse = await PushAPI.payloads.sendNotification({\\n  signer,\\n  type: 4, // subset\\n  identityType: 2, // direct payload\\n  notification: {\\n    title: `[SDK-TEST] notification TITLE:`,\\n    body: `[sdk-test] notification BODY`\\n  },\\n  payload: {\\n    title: `[sdk-test] payload title`,\\n    body: `sample msg body`,\\n    cta: \'\',\\n    img: \'\'\\n  },\\n  recipients: [\'eip155:11155111:0xD8634C39BBFd4033c0d3289C4515275102423681\', \'eip155:11155111:0xCdBE6D076e05c5875D90fa35cc85694E1EAFBBd1\'], // recipients addresses\\n  channel: \'eip155:11155111:0xD8634C39BBFd4033c0d3289C4515275102423681\', // your channel address\\n  env: \'staging\'\\n});\\n```\\n<b>All recipients (broadcast):</b>\\n\\n```js\\nconst apiResponse = await PushAPI.payloads.sendNotification({\\n  signer,\\n  type: 1, // broadcast\\n  identityType: 2, // direct payload\\n  notification: {\\n    title: `[SDK-TEST] notification TITLE:`,\\n    body: `[sdk-test] notification BODY`\\n  },\\n  payload: {\\n    title: `[sdk-test] payload title`,\\n    body: `sample msg body`,\\n    cta: \'\',\\n    img: \'\'\\n  },\\n  channel: \'eip155:11155111:0xD8634C39BBFd4033c0d3289C4515275102423681\', // your channel address\\n  env: \'staging\'\\n});\\n```\\nThe <b>sendNotification</b> method returns a confirmation (apiResponse) of the notification being sent, with a status code of 204 indicating success.\\n\\nThat\u2019s it! You now know how to use the main features of the Push Protocol REST API to add push notification functionality to your application\ud83c\udf89\\n\\nWe\u2019ll cover other parts of the Push SDK in coming posts so stay tuned!\\n\\n- [Push Protocol SDK documentation here](https://www.npmjs.com/package/@pushprotocol/restapi) \u2014 if you\u2019d like more reference material to chew on.\\n- [Push SDK on GitHub](https://github.com/ethereum-push-notification-service/push-sdk)\\n- [Our Discord](https://discord.gg/pushprotocol) \u2014 we\u2019ve got devs ready to give your project whatever support and consultation you need.\\n- [Push developer docs](/docs/) to get started on building right away!\\n\\n#PoweredbyPush"}}')}}]);