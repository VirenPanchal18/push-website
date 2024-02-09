"use strict";(self.webpackChunkpush_website=self.webpackChunkpush_website||[]).push([[52686],{109734:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>c,default:()=>m,frontMatter:()=>l,metadata:()=>d,toc:()=>h});var a=n(785893),r=n(511151),i=n(374866),s=n(685162),o=n(23734);const l={id:"docs-chat-ui-components-advanced-chatviewlist-component",title:"ChatViewList Component",hide_title:!0,slug:"./chatviewlist-component",displayed_sidebar:"pushChatSidebar",sidebar_position:4,image:"/assets/docs/previews/docs_chat_ui_components_advanced--chatviewlist_component.png"},c="ChatViewList",d={id:"chat/ui-components/Advanced/docs-chat-ui-components-advanced-chatviewlist-component",title:"ChatViewList Component",description:"Streamlined Chat List Integration: Easily Add a Message List to Your Dapp with Built-in Pagination",source:"@site/docs/chat/03-ui-components/Advanced/04-Integrate-Advanced-ChatViewList-Component.mdx",sourceDirName:"chat/03-ui-components/Advanced",slug:"/chat/ui-components/Advanced/chatviewlist-component",permalink:"/docs/chat/ui-components/Advanced/chatviewlist-component",draft:!1,unlisted:!1,editUrl:"https://github.com/ethereum-push-notification-service/push-website/blob/main/docs/chat/03-ui-components/Advanced/04-Integrate-Advanced-ChatViewList-Component.mdx",tags:[],version:"current",sidebarPosition:4,frontMatter:{id:"docs-chat-ui-components-advanced-chatviewlist-component",title:"ChatViewList Component",hide_title:!0,slug:"./chatviewlist-component",displayed_sidebar:"pushChatSidebar",sidebar_position:4,image:"/assets/docs/previews/docs_chat_ui_components_advanced--chatviewlist_component.png"},sidebar:"pushChatSidebar",previous:{title:"ChatProfile Component",permalink:"/docs/chat/ui-components/Advanced/chatprofile-component"},next:{title:"MessageInput Component",permalink:"/docs/chat/ui-components/Advanced/messageinput-component"}},u={},h=[{value:"Usage",id:"usage",level:2},{value:"Customization parameters",id:"customization-parameters",level:3},{value:"Live playground",id:"live-playground",level:3}];function p(e){const t={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",hr:"hr",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.a)(),...e.components},{Head:l}=t;return l||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"chatviewlist",children:"ChatViewList"}),"\n",(0,a.jsx)(t.p,{children:"Streamlined Chat List Integration: Easily Add a Message List to Your Dapp with Built-in Pagination"}),"\n",(0,a.jsx)(t.p,{children:"This component streamlines the process of displaying a paginated list of messages within your user interface. All you need to do is provide a chat ID, and the component handles the rest, presenting you with a comprehensive view of all messages. Additionally, it conveniently includes chat meta information at the top of the component for a complete chat experience."}),"\n",(0,a.jsx)(l,{children:(0,a.jsx)("title",{children:"ChatViewList | UI Components (@pushprotocol/uiweb) | Push Chat | Push\nDocumentation"})}),"\n","\n","\n",(0,a.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,a.jsx)(i.Z,{className:"codetabs",groupId:"code-examples",children:(0,a.jsxs)(s.Z,{value:"react",attributes:{className:"codetab react"},default:!0,children:[(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-typescript",children:'import { useContext } from "react";\nimport styled from "styled-components";\nimport { ChatViewList } from "@pushprotocol/uiweb";\n\nconst ChatViewListTest = () => {\n  return (\n    <ChatViewListCard>\n      <ChatViewList\n        chatId="196f58cbe07c7eb5716d939e0a3be1f15b22b2334d5179c601566600016860ac"\n        limit={10}\n      />\n    </ChatViewListCard>\n  );\n};\n\nexport default ChatViewListTest;\n\nconst ChatViewListCard = styled.div`\n  height: 40vh;\n  background: black;\n  overflow: auto;\n  overflow-x: hidden;\n`;\n'})})," ",(0,a.jsx)(o.F0,{children:(0,a.jsx)("img",{src:n(49829).Z})})]})}),"\n",(0,a.jsx)(t.hr,{}),"\n",(0,a.jsx)(t.h3,{id:"customization-parameters",children:"Customization parameters"}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{children:"Param"}),(0,a.jsx)(t.th,{children:"Type"}),(0,a.jsx)(t.th,{children:"Default"}),(0,a.jsx)(t.th,{children:"Remarks"})]})}),(0,a.jsxs)(t.tbody,{children:[(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:(0,a.jsx)(t.em,{children:(0,a.jsx)(t.code,{children:"chatId"})})}),(0,a.jsx)(t.td,{children:(0,a.jsx)(t.code,{children:"string"})}),(0,a.jsx)(t.td,{children:"-"}),(0,a.jsx)(t.td,{children:"Chat id for a particular chat"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"limit"}),(0,a.jsx)(t.td,{children:(0,a.jsx)(t.code,{children:"number"})}),(0,a.jsx)(t.td,{children:"-"}),(0,a.jsx)(t.td,{children:"Number of messages fetched in each paginated api call,default value is 10"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:(0,a.jsx)(t.em,{children:(0,a.jsx)(t.code,{children:"chatFilterList"})})}),(0,a.jsx)(t.td,{children:(0,a.jsx)(t.code,{children:"Array<string>"})}),(0,a.jsx)(t.td,{children:"-"}),(0,a.jsx)(t.td,{children:"Array of cid's of messages that needs to be excluded from chatViewList"})]})]})]}),"\n",(0,a.jsxs)(t.blockquote,{children:["\n",(0,a.jsxs)(t.p,{children:["Note: Parameters ",(0,a.jsx)(t.em,{children:(0,a.jsx)(t.code,{children:"in this style"})})," are mandatory."]}),"\n"]}),"\n",(0,a.jsxs)(t.blockquote,{children:["\n",(0,a.jsxs)(t.p,{children:["Note: Refer ",(0,a.jsx)(t.a,{href:"/docs/chat/ui-components/Advanced/ChatUIProvider/",children:"ChatUIProvider"})," for details on its paramters."]}),"\n"]}),"\n",(0,a.jsx)(t.h3,{id:"live-playground",children:"Live playground"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-jsx",metastring:"live",live:!0,children:'customPropMinimized="true"\n\n// DO NOT FORGET TO IMPORT LIBRARIES\n// NOT NEEDED HERE SINCE PLAYGROUND IMPORTS INTERNALLY\n// import { ChatUIProvider, ChatViewList } from @pushprotocol/uiweb;\nfunction App(props) {\n  const [signer, setSigner] = useState(null);\n\n  const connectWallet = async () => {\n    // Demo only supports MetaMask (or other browser based wallets) and gets provider that injects as window.ethereum into each page\n    const provider = new ethers.providers.Web3Provider(window.ethereum);\n\n    // Get provider\n    await provider.send("eth_requestAccounts", []);\n\n    // Grabbing signer from provider\n    const signer = provider.getSigner();\n\n    // store signer\n    setSigner(signer);\n  };\n\n  const disconnectWallet = async () => {\n    setSigner(null);\n  };\n  const buttonStyle = {\n    padding: "10px 20px",\n    backgroundColor: "#dd44b9",\n    color: "#FFF",\n    border: "none",\n    borderRadius: "5px",\n    cursor: "pointer",\n    marginTop: "20px",\n  };\n  return (\n    <>\n      <h2>Interact with ChatViewList by changing the chatId.</h2>\n      <ChatUIProvider signer={signer}>\n        <label>\n          For this demo, You will need Metamask (or equivalent browser injected\n          wallet), you will also need to sign a transaction to see the\n          notifications. Connect wallet for better usage of the ChatViewList\n          component.\n        </label>\n\n        <p />\n        <button\n          style={buttonStyle}\n          onClick={signer ? disconnectWallet : connectWallet}\n        >\n          {signer ? "Disconnect wallet" : "Connect Wallet"}\n        </button>\n\n        <div\n          style={{\n            height: "75vh",\n            margin: "20px auto",\n            overflow: "hidden scroll",\n          }}\n        >\n          <ChatViewList chatId="0x99A08ac6254dcf7ccc37CeC662aeba8eFA666666" />\n        </div>\n      </ChatUIProvider>\n    </>\n  );\n}\n'})})]})}function m(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},685162:(e,t,n)=>{n.d(t,{Z:()=>s});n(667294);var a=n(236905);const r={tabItem:"tabItem_Ymn6"};var i=n(785893);function s(e){let{children:t,hidden:n,className:s}=e;return(0,i.jsx)("div",{role:"tabpanel",className:(0,a.Z)(r.tabItem,s),hidden:n,children:t})}},374866:(e,t,n)=>{n.d(t,{Z:()=>C});var a=n(667294),r=n(236905),i=n(212466),s=n(616550),o=n(120469),l=n(191980),c=n(867392),d=n(750012);function u(e){var t,n;return null!==(t=null===(n=a.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})))||void 0===n?void 0:n.filter(Boolean))&&void 0!==t?t:[]}function h(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=null!=t?t:function(e){return u(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}(n);return function(e){const t=(0,c.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error('Docusaurus error: Duplicate values "'+t.map((e=>e.value)).join(", ")+'" found in <Tabs>. Every value needs to be unique.')}(e),e}),[t,n])}function p(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:n}=e;const r=(0,s.k6)(),i=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=n?n:null}({queryString:t,groupId:n});return[(0,l._X)(i),(0,a.useCallback)((e=>{if(!i)return;const t=new URLSearchParams(r.location.search);t.set(i,e),r.replace({...r.location,search:t.toString()})}),[i,r])]}function v(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,i=h(e),[s,l]=(0,a.useState)((()=>function(e){var t;let{defaultValue:n,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:a}))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+n+'" but none of its children has the corresponding value. Available values are: '+a.map((e=>e.value)).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");return n}const r=null!==(t=a.find((e=>e.default)))&&void 0!==t?t:a[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:i}))),[c,u]=m({queryString:n,groupId:r}),[v,b]=function(e){let{groupId:t}=e;const n=function(e){return e?"docusaurus.tab."+e:null}(t),[r,i]=(0,d.Nk)(n);return[r,(0,a.useCallback)((e=>{n&&i.set(e)}),[n,i])]}({groupId:r}),f=(()=>{const e=null!=c?c:v;return p({value:e,tabValues:i})?e:null})();(0,o.Z)((()=>{f&&l(f)}),[f]);return{selectedValue:s,selectValue:(0,a.useCallback)((e=>{if(!p({value:e,tabValues:i}))throw new Error("Can't select invalid tab value="+e);l(e),u(e),b(e)}),[u,b,i]),tabValues:i}}var b=n(972389);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var g=n(785893);function x(e){let{className:t,block:n,selectedValue:a,selectValue:s,tabValues:o}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,i.o5)(),d=e=>{const t=e.currentTarget,n=l.indexOf(t),r=o[n].value;r!==a&&(c(t),s(r))},u=e=>{var t;let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{var a;const t=l.indexOf(e.currentTarget)+1;n=null!==(a=l[t])&&void 0!==a?a:l[0];break}case"ArrowLeft":{var r;const t=l.indexOf(e.currentTarget)-1;n=null!==(r=l[t])&&void 0!==r?r:l[l.length-1];break}}null===(t=n)||void 0===t||t.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":n},t),children:o.map((e=>{let{value:t,label:n,attributes:i}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:a===t?0:-1,"aria-selected":a===t,ref:e=>l.push(e),onKeyDown:u,onClick:d,...i,className:(0,r.Z)("tabs__item",f.tabItem,null==i?void 0:i.className,{"tabs__item--active":a===t}),children:null!=n?n:t},t)}))})}function w(e){let{lazy:t,children:n,selectedValue:r}=e;const i=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=i.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:i.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r})))})}function j(e){const t=v(e);return(0,g.jsxs)("div",{className:(0,r.Z)("tabs-container",f.tabList),children:[(0,g.jsx)(x,{...e,...t}),(0,g.jsx)(w,{...e,...t})]})}function C(e){const t=(0,b.Z)();return(0,g.jsx)(j,{...e,children:u(e.children)},String(t))}},49829:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/chat-view-list-ee1c1ff20549ae407b9ec52fe4985d36.png"},511151:(e,t,n)=>{n.d(t,{Z:()=>o,a:()=>s});var a=n(667294);const r={},i=a.createContext(r);function s(e){const t=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),a.createElement(i.Provider,{value:t},e.children)}}}]);