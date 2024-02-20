"use strict";(self.webpackChunkpush_website=self.webpackChunkpush_website||[]).push([[57282],{400536:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>h,contentTitle:()=>o,default:()=>l,frontMatter:()=>r,metadata:()=>c,toc:()=>a});var s=t(617624),i=t(904552);const r={id:"docs-chat-encryption-version-in-push-chat",title:"Encryption Version in Push Chat",hide_title:!0,slug:"./encryption-version-in-push-chat",displayed_sidebar:"pushChatSidebar",sidebar_position:2,image:"/assets/docs/previews/docs_chat--encryption_version_in_push_chat.png"},o="Encryption in Push Chat",c={id:"chat/concepts/docs-chat-encryption-version-in-push-chat",title:"Encryption Version in Push Chat",description:"Each Push profile or user of Push Chat has a PGP key that is created locally and stored encrypted on Push nodes. Push SDK during initialization automatically decrypts your key by asking you to sign a nonce which is used to derive the signature that is applied to encrypt or decrypt your PGP keys.",source:"@site/docs/chat/05-concepts/02-Concepts-Encryption-Version.mdx",sourceDirName:"chat/05-concepts",slug:"/chat/concepts/encryption-version-in-push-chat",permalink:"/docs/chat/concepts/encryption-version-in-push-chat",draft:!1,unlisted:!1,editUrl:"https://github.com/ethereum-push-notification-service/push-website/blob/main/docs/chat/05-concepts/02-Concepts-Encryption-Version.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{id:"docs-chat-encryption-version-in-push-chat",title:"Encryption Version in Push Chat",hide_title:!0,slug:"./encryption-version-in-push-chat",displayed_sidebar:"pushChatSidebar",sidebar_position:2,image:"/assets/docs/previews/docs_chat--encryption_version_in_push_chat.png"},sidebar:"pushChatSidebar",previous:{title:"Push Chat Architecture",permalink:"/docs/chat/concepts/push-chat-architecture"}},h={},a=[{value:"Recommended encryption version for Push Profile",id:"recommended-encryption-version-for-push-profile",level:2},{value:"Supported Encryption Versions for Push Profile",id:"supported-encryption-versions-for-push-profile",level:2},{value:"PGP_V1",id:"pgp_v1",level:3},{value:"PGP_V2",id:"pgp_v2",level:3},{value:"PGP_V3",id:"pgp_v3",level:3},{value:"NFTPGP_V1",id:"nftpgp_v1",level:3}];function d(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.M)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"encryption-in-push-chat",children:"Encryption in Push Chat"}),"\n",(0,s.jsx)(n.p,{children:"Each Push profile or user of Push Chat has a PGP key that is created locally and stored encrypted on Push nodes. Push SDK during initialization automatically decrypts your key by asking you to sign a nonce which is used to derive the signature that is applied to encrypt or decrypt your PGP keys."}),"\n",(0,s.jsx)(n.p,{children:"Once the PGP keys are obtained locally, they are then used (in your local sandbox) to encrypt / decrypt messages, chat requests and anything that you do within Push network."}),"\n",(0,s.jsx)(n.p,{children:"Since your wallet acts only as a way to encrypt or decrypt your PGP keys and your keys encryption are not reliant or tied directly to a particular algorithm. This paves the way for cross-chain or even multi-chain communication as dynamic versions compatible with different chains or new standards can be applied."}),"\n",(0,s.jsx)(n.p,{children:"This is possible because Push maintains your PGP keys encryption version and thus is able to decrypt them using the correct standards."}),"\n",(0,s.jsx)(n.h2,{id:"recommended-encryption-version-for-push-profile",children:"Recommended encryption version for Push Profile"}),"\n",(0,s.jsxs)(n.p,{children:["Current recommended encryption version for Push Profile is ",(0,s.jsx)(n.code,{children:"PGP_V3"})," and for Push NFT profiles is ",(0,s.jsx)(n.code,{children:"NFTPGP_V1"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"supported-encryption-versions-for-push-profile",children:"Supported Encryption Versions for Push Profile"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"Encryption Version"}),(0,s.jsx)(n.th,{children:"Remarks"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.em,{children:(0,s.jsx)(n.code,{children:"PGP_V1"})})}),(0,s.jsxs)(n.td,{children:["Uses ",(0,s.jsx)(n.code,{children:"x25519-xsalsa20-poly1305"})," algorithm"]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.em,{children:(0,s.jsx)(n.code,{children:"PGP_V2"})})}),(0,s.jsxs)(n.td,{children:["Uses ",(0,s.jsx)(n.code,{children:"aes256GcmHkdfSha256"})," algorithm with ",(0,s.jsx)(n.code,{children:"EIP712"})," type signatures"]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.em,{children:(0,s.jsx)(n.code,{children:"PGP_V3"})})}),(0,s.jsxs)(n.td,{children:["Uses ",(0,s.jsx)(n.code,{children:"aes256GcmHkdfSha256"})," algorithm with ",(0,s.jsx)(n.code,{children:"EIP191"})," type signatures"]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.em,{children:(0,s.jsx)(n.code,{children:"NFTPGP_V1"})})}),(0,s.jsxs)(n.td,{children:["Uses ",(0,s.jsx)(n.code,{children:"aes256GcmHkdfSha256"})," algorithm with ",(0,s.jsx)(n.code,{children:"EIP191"})," type signatures and client enabled overriding ",(0,s.jsx)(n.code,{children:"secret"})]})]})]})]}),"\n",(0,s.jsx)(n.h3,{id:"pgp_v1",children:"PGP_V1"}),"\n",(0,s.jsxs)(n.p,{children:["This encryption version represents the initial implementation for securing Push Profiles. It relies on Metamask's legacy API functions, namely ",(0,s.jsx)(n.a,{href:"https://docs.metamask.io/wallet/reference/eth_getencryptionpublickey/",children:"eth_getEncryptionPublicKey"})," and ",(0,s.jsx)(n.a,{href:"https://docs.metamask.io/wallet/reference/eth_decrypt/",children:"eth_decrypt"}),", for the encryption and decryption of PGP keys. It's important to note that these functions have been deprecated and are not supported by other providers. Consequently, we strongly recommend against using this method for encryption."]}),"\n",(0,s.jsxs)(n.p,{children:["For more details on the deprecation of these functions, please refer to the official announcement ",(0,s.jsx)(n.a,{href:"https://medium.com/metamask/metamask-api-method-deprecation-2b0564a84686",children:"here"}),"."]}),"\n",(0,s.jsx)(n.h3,{id:"pgp_v2",children:"PGP_V2"}),"\n",(0,s.jsxs)(n.p,{children:["This encryption version utilizes the ",(0,s.jsx)(n.code,{children:"aes256Gcm"})," algorithm for encrypting PGP keys. In this scheme, a random nonce, salt, and an ",(0,s.jsx)(n.code,{children:"EIP-712"}),"-based signature are used to create the encryption key. The nonce, salt, and encrypted private keys are securely stored on Push Nodes. When combined with the user's signature, these components enable the decryption of the PGP keys."]}),"\n",(0,s.jsx)(n.h3,{id:"pgp_v3",children:"PGP_V3"}),"\n",(0,s.jsxs)(n.p,{children:["This encryption version is the same as ",(0,s.jsx)(n.code,{children:"PGP_V2"}),", but it uses an ",(0,s.jsx)(n.code,{children:"EIP-191"}),"-based signature instead of ",(0,s.jsx)(n.code,{children:"EIP-712"}),". The transition to ",(0,s.jsx)(n.code,{children:"EIP-191"})," signatures simplifies cross-chain compatibility and eliminates the necessity for typed data signing for straightforward messages."]}),"\n",(0,s.jsx)(n.h3,{id:"nftpgp_v1",children:"NFTPGP_V1"}),"\n",(0,s.jsx)(n.p,{children:"This encryption version is specifically designed for securing NFT Push Profiles within the framework of NFT Chat. NFT Chats introduce a unique concept where chat history becomes tied to an NFT and is carried along with the NFT when it changes ownership between users."}),"\n",(0,s.jsxs)(n.p,{children:["In this encryption method, users generate a secret or password, which is subsequently used to encrypt the PGP Private key. This secret is then encrypted using the ",(0,s.jsx)(n.code,{children:"PGP_V3"})," encryption scheme. Consequently, there are two methods for decrypting an NFT profile:"]}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"By providing the secret directly or decrypting the secret by signing a message, which in turn is used to decrypt the PGP Key."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"During NFT transfers, the previous owner has the option to share the secret with the new owner, granting access to the chat history. Alternatively, the new owner can choose to create a new secret, effectively resetting the chat history."}),"\n"]}),"\n"]})]})}function l(e={}){const{wrapper:n}={...(0,i.M)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},904552:(e,n,t)=>{t.d(n,{I:()=>c,M:()=>o});var s=t(811504);const i={},r=s.createContext(i);function o(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);