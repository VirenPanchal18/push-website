"use strict";(self.webpackChunkpush_website=self.webpackChunkpush_website||[]).push([[43946],{227851:e=>{e.exports=JSON.parse('{"title":"EPNS Update : Gitcoin Kernel Week-1","description":"EPNS Update : Gitcoin Kernel Week-1","frontMatter":{"slug":"epns-update-gitcoin-kernel-week-1","title":"EPNS Update : Gitcoin Kernel Week-1","description":"EPNS Update : Gitcoin Kernel Week-1","authors":["push"],"image":"./cover-image.webp","text":"What a power-packed week it\u2019s been for EPNS. @Gitcoin Kernel \u2014 product design workshops, user interviews, development and social !! We are super excited to share the project updates, woohoo!!","tags":["Ethereum","Blockchain","Web3","Notifications","Blog"]},"content":{"id":"epns-update-gitcoin-kernel-week-1","metadata":{"permalink":"/blog/epns-update-gitcoin-kernel-week-1","source":"@site/blog/2020-07-20-epns-update-gitcoin-kernel-week-1/index.md","title":"EPNS Update : Gitcoin Kernel Week-1","description":"EPNS Update : Gitcoin Kernel Week-1","date":"2020-07-20T00:00:00.000Z","formattedDate":"July 20, 2020","tags":[{"label":"Ethereum","permalink":"/blog/tags/ethereum"},{"label":"Blockchain","permalink":"/blog/tags/blockchain"},{"label":"Web3","permalink":"/blog/tags/web-3"},{"label":"Notifications","permalink":"/blog/tags/notifications"},{"label":"Blog","permalink":"/blog/tags/blog"}],"readingTime":3.83,"hasTruncateMarker":true,"authors":[{"name":"Push Protocol","url":"https://twitter.com/pushprotocol","imageURL":"/assets/blog/authors/authorpush.png","key":"push"}],"frontMatter":{"slug":"epns-update-gitcoin-kernel-week-1","title":"EPNS Update : Gitcoin Kernel Week-1","description":"EPNS Update : Gitcoin Kernel Week-1","authors":["push"],"image":"./cover-image.webp","text":"What a power-packed week it\u2019s been for EPNS. @Gitcoin Kernel \u2014 product design workshops, user interviews, development and social !! We are super excited to share the project updates, woohoo!!","tags":["Ethereum","Blockchain","Web3","Notifications","Blog"]},"unlisted":false,"prevItem":{"title":"EPNS Update: Gitcoin Week 2","permalink":"/blog/epns-update-gitcoin-week-2"},"nextItem":{"title":"EPNS push notifications are never boring","permalink":"/blog/epns-push-notifications-are-never-boring"}},"content":"import { ImageText } from \'@site/src/css/SharedStyling\';\\n\\n![Cover Image of EPNS Update : Gitcoin Kernel Week-1](./cover-image.webp)\\n\\n\x3c!--truncate--\x3e\\n\\nProduct Design, Hypersprint, User interviews, #Buidl and more!!\\n\\nWhat a power-packed week it\u2019s been for EPNS. @Gitcoin Kernel \u2014 product design workshops, user interviews, development and social !! We are super excited to share the project updates, woohoo!!\\n\\nBefore deep diving with our updates, we just wanted a moment to express how we feel\u2026 spoiler alert: we feel awesome!\\n\\nIt\u2019s been amazing how comfortable we feel with the entire Kernel team (them feeling that is however a question we left to them :D). Shoutout to our fellow peeps and mentors who are not only brilliant but always there to help and guide us, we are so grateful and happy to be a part of this journey.\\n\\nBinded by the love for all things web3 and passion for building the next generation of products to be better in every aspect is what guides all of us and having a platform to achieve this is what we have come to know **Gitcoin Kernel** to be.\\n\\nAlso, thanks Vivek, Andy (we want to trend him as the mathematical philosopher), Scott & the \u2018wiz-kid\u2019 Sachin for enabling these conversations and guiding us to make \u201cvalue-centric\u201d products for the community.\\n\\n### Updates and the Designer\u2019s Garden\\n\\nThe designer garden week is all about understanding users and making sure that the product doesn\u2019t suck, trust us, you definitely need to know this before committing your life to the product.\\n\\nPut it another way, no matter how much love you have for your product, it\u2019s the users who decide they need it or not. Thanks to this week\u2019s mentors Zach, Katie and Andrej who drilled this into our head. Research, prototyping and user journeys are incredibly powerful tools which everyone should us.\\n\\n> For our earlier successful products, this would have saved us weeks of development for features which we thought user will dig (but they didn\u2019t). And for products that didn\u2019t work, this would have definitely saved us months.\\n> \\n> Someone invent a time machine already! and contact us at [timemachine@epns.io](mailto://timemachine@epns.io), not kidding, we just made that mail to see how this works out.\\n\\nUsers Synthesis Results\\n=======================\\n\\nEthereum Push Notification Service first major pivot occurred as a result of user validation and feedback sessions.\\n\\nShoutout to **Luka Su\u010di\u0107** and **Pranay Valson** for giving their valuable time to validate / invalidate our features and give some of the really awesome suggestions and how earlier products (like MEW, etc) did it, we tested:\\n\\n1.  User need for notification \u2014 **Validated**\\n2.  User preferred communication mode (now and after EPNS) \u2014 **Validated**\\n3.  User comfortable in entering their private key (for decrypting their encrypted notification) with open repo for verification \u2014 **Invalidated**\\n\\nYes! you read that right, our private key for login to our mobile app for receiving notification through our protocol was Invalidated. But, as luck would have it, along came another one of our kernel fellow: **Alexander Salnikov** who solved this problem for us\u2026 and we can\u2019t believe how easy the solution is!!\\n\\nThis led to another user validation session of sorts where we were lucky to have **Denham Preen** and **Andy Tudhope**, who of course acted as a quick way to validate out new hypothesis. In short, Kernel and our gang of 250+ peeps did this for us.\\n\\n![Cover Image of EPNS Update : Gitcoin Kernel Week-1](./image-1.gif)\\n\\nHey you, yes you!!\\n\\nPrototype for the curios\\n========================\\n\\nCurios to see what we are #BUIDLing and to give feedback? Awesome! Let\u2019s get started!\\n\\n1\\\\. Users receives notifications from EPNS protocol to mobile app and prefer that over dApp or desktop notifications or other form of communication\\n---------------------------------------------------------------------------------------------------------------------------------------------------\\n\\n![Cover Image of EPNS Update : Gitcoin Kernel Week-1](./image-2.webp)\\n\\nThe above shows how notifications comes to our mobile platform (excluding our dApp platform and other integration of wallets).\\n\\nThe notification can be about your trade on a dEx is completed, or ENS sending your wallet notification that your domain is expiring, or Bancor or other services sending you notification about a certain security or marketing notification.\\n\\n**Do keep in mind that you as a user will subscribe to these services first on protocol (or they will pay you the amount you set for yourself to add your wallet as their subscriber) before they can send you notification.**\\n\\n![Cover Image of EPNS Update : Gitcoin Kernel Week-1](./image-3.webp)\\n\\n**Questions:**\\n\\n*   How do you feel about this new form of communication?\\n*   What is the preferred way for you to receive communication to dApps or other web3 services? Why? What do you love about them?\\n*   Can you arrange the following form of communication for us (from the above screenshot) in form of your preference?\\n\\n2\\\\. User signs in with private key(creds never leaves device, open repo) on mobile app to authenticate and decrypt encrypted notifications coming from protocol\\n---------------------------------------------------------------------------------------------------------------------------------------------------------------\\n\\n![Cover Image of EPNS Update : Gitcoin Kernel Week-1](./image-4.webp)\\n\\nThis is **already invalidated**, but instead, imagine the sign in to now just ask your wallet address. All notifications are received and plain ones are shown on feed though encrypted one will require you to enter your private key if you want to decrypt them and see those.\\n\\n**Questions**:\\n\\n*   What is your experience like when you first signed in to Metamask or MEW?\\n*   How do you feel about signing in to the our mobile app?\\n*   How comfortable do you feel about using our Mobile App, dApp?\\n*   What can be done to improve the experience?\\n\\nProtocol Updates : What we built this week\\n==========================================\\n\\n*   Upgradability in the protocol\\n*   Design specs for spam and spoof mechanism\\n*   Rework of the authentication flow\\n\\nProject Updates : What we learned this week\\n===========================================\\n\\n*   Users feedback is critical for success, it might not be the success you want but it\u2019s the thing you need.\\n*   Collaboration with brilliant minds generates better ideas than your team or you can do alone.\\n*   It\u2019s okay to ask for help, awesome people are always willing to go the extra mile but you need to return the favor as well!\\n\\nProject News : What we accomplished this week\\n=============================================\\n\\n*   Making friends and bonds for life at Kernel\\n*   Learning from the best mentors and Kernel fellows\\n*   Growing and maturing our thought process\\n*   EPNS honored to be included the [DeFi Pulse list](https://t.co/j87Zje9t3V?amp=1)\\n*   Some nice news coverage by our friends at [Moj Kripto](https://mojkripto.com/ethereum-push-notification-service-epns-interview/?lang=en) and [Finstreet](https://www.finstreet.in/crypto-news-tata-consultancy-yuan-project-gitcoin-accelerator-program/)\\n*   Recorded the most fun podcast about EPNS, our journey and all things DeFi\u2026. shhhhhhh\u2026 Keep you posted :)\\n*   Learnt Gitcoin Sachin lives 1.6 miles away , it\u2019s a small world!!\\n\\nThis is all for now. If you have been able to reach the end\u2026 then You are Awesome!!!! and thanks for taking the time to go through our updates.\\n\\nTelegram (we brainstorm here): [https://t.me/epnsproject](https://t.me/epnsproject)\\n\\nTwitter (we boast here): [https://twitter.com/epnsproject](https://twitter.com/epnsproject)"}}')}}]);