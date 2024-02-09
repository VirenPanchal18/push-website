"use strict";(self.webpackChunkpush_website=self.webpackChunkpush_website||[]).push([[64708],{628494:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>g,frontMatter:()=>i,metadata:()=>u,toc:()=>d});var r=n(785893),a=n(511151),o=n(374866),s=n(685162);n(23734);const i={id:"docs-chat-ui-components-advanced-themization",title:"Themization",hide_title:!0,slug:"./themization",displayed_sidebar:"pushChatSidebar",sidebar_position:7,image:"/assets/docs/previews/docs_chat_ui_components_advanced--themization.png"},c="Themization overview",u={id:"chat/ui-components/Advanced/docs-chat-ui-components-advanced-themization",title:"Themization",description:"Customisable theme: Change the look of the components as per your need.",source:"@site/docs/chat/03-ui-components/Advanced/08-Integrate-Advanced-Themization.mdx",sourceDirName:"chat/03-ui-components/Advanced",slug:"/chat/ui-components/Advanced/themization",permalink:"/docs/chat/ui-components/Advanced/themization",draft:!1,unlisted:!1,editUrl:"https://github.com/ethereum-push-notification-service/push-website/blob/main/docs/chat/03-ui-components/Advanced/08-Integrate-Advanced-Themization.mdx",tags:[],version:"current",sidebarPosition:7,frontMatter:{id:"docs-chat-ui-components-advanced-themization",title:"Themization",hide_title:!0,slug:"./themization",displayed_sidebar:"pushChatSidebar",sidebar_position:7,image:"/assets/docs/previews/docs_chat_ui_components_advanced--themization.png"},sidebar:"pushChatSidebar",previous:{title:"CreateGroupModal Component",permalink:"/docs/chat/ui-components/Advanced/creategroupmodal-component"},next:{title:"Tutorials",permalink:"/docs/chat/playground"}},l={},d=[{value:"Usage",id:"usage",level:2}];function h(e){const t={code:"code",h1:"h1",h2:"h2",hr:"hr",p:"p",pre:"pre",...(0,a.a)(),...e.components},{Head:n}=t;return n||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"themization-overview",children:"Themization overview"}),"\n",(0,r.jsx)(t.p,{children:"Customisable theme: Change the look of the components as per your need."}),"\n",(0,r.jsx)(n,{children:(0,r.jsx)("title",{children:"Component Themization | UI Components (@pushprotocol/uiweb) | Push Chat |\nPush Documentation"})}),"\n","\n","\n",(0,r.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,r.jsx)(o.Z,{className:"codetabs",groupId:"code-examples",children:(0,r.jsxs)(s.Z,{value:"js",attributes:{className:"codetab js"},default:!0,children:[(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"interface IBorder {\n  chatViewComponent?: string;\n  chatProfile?: string;\n  messageInput?: string;\n  searchInput?: string;\n  modal?: string;\n  modalInnerComponents?: string;\n}\ninterface IBorderRadius {\n  chatViewComponent?: string;\n  chatProfile?: string;\n  messageInput?: string;\n  searchInput?: string;\n  modal?: string;\n  modalInnerComponents?: string;\n}\ninterface IBackgroundColor {\n  chatViewComponentBackground?: string;\n  chatProfileBackground?: string;\n  messageInputBackground?: string;\n  chatSentBubbleBackground?: string;\n  chatReceivedBubbleBackground?: string;\n  encryptionMessageBackground?: string;\n  buttonBackground?: string;\n  buttonDisableBackground?: string;\n  searchInputBackground?: string;\n  modalBackground?: string;\n  modalInputBackground?: string;\n  modalHoverBackground?: string;\n  toastSuccessBackground?: string;\n  toastErrorBackground?: string;\n  toastShadowBackground?: string;\n}\n\ninterface ITextColor {\n  chatProfileText?: string;\n  messageInputText?: string;\n  chatSentBubbleText?: string;\n  chatReceivedBubbleText?: string;\n  timestamp?: string;\n  encryptionMessageText?: string;\n  buttonText?: string;\n  buttonDisableText?: string;\n  chatReceivedBubbleAddressText?: string;\n  chatReceivedBubbleTimestampText?: string;\n  chatSentBubbleTimestampText?: string;\n  searchInputText?: string;\n  searchPlaceholderText?: string;\n  modalHeadingText?: string;\n  modalSubHeadingText?: string;\n}\ninterface IFont {\n  chatProfileText?: string;\n  messageInputText?: string;\n  chatSentBubbleText?: string;\n  chatReceivedBubbleText?: string;\n  timestamp?: string;\n  encryptionMessageText?: string;\n  chatReceivedBubbleAddressText?: string;\n  chatReceivedBubbleTimestampText?: string;\n  chatSentBubbleTimestampText?: string;\n  searchInputText?: string;\n  searchPlaceholderText?: string;\n}\ninterface IFontWeight {\n  chatProfileText?: string;\n  messageInputText?: string;\n  chatSentBubbleText?: string;\n  chatReceivedBubbleText?: string;\n  timestamp?: string;\n  encryptionMessageText?: string;\n  chatReceivedBubbleAddressText?: string;\n  chatReceivedBubbleTimestampText?: string;\n  chatSentBubbleTimestampText?: string;\n  searchInputText?: string;\n  searchPlaceholderText?: string;\n}\ninterface IIconColor {\n  emoji?: string;\n  attachment?: string;\n  sendButton?: string;\n  groupSettings?: string;\n}\nexport interface IChatTheme {\n  borderRadius?: IBorderRadius;\n\n  backgroundColor?: IBackgroundColor;\n\n  fontSize?: IFont;\n\n  fontWeight?: IFontWeight;\n\n  fontFamily?: string;\n\n  border?: IBorder;\n  iconColor?: IIconColor;\n  textColor?: ITextColor;\n  backdropFilter?: string;\n  scrollbarColor?: string;\n\n  spinnerColor?: string;\n}\n"})}),(0,r.jsx)(t.hr,{}),(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:"lightChatTheme"})," and ",(0,r.jsx)(t.code,{children:"darkChatTheme"})," are available as default but these can be customised as per need."]})]})}),"\n",(0,r.jsx)(t.hr,{})]})}function g(e={}){const{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},685162:(e,t,n)=>{n.d(t,{Z:()=>s});n(667294);var r=n(236905);const a={tabItem:"tabItem_Ymn6"};var o=n(785893);function s(e){let{children:t,hidden:n,className:s}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,r.Z)(a.tabItem,s),hidden:n,children:t})}},374866:(e,t,n)=>{n.d(t,{Z:()=>k});var r=n(667294),a=n(236905),o=n(212466),s=n(616550),i=n(120469),c=n(191980),u=n(867392),l=n(750012);function d(e){var t,n;return null!==(t=null===(n=r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})))||void 0===n?void 0:n.filter(Boolean))&&void 0!==t?t:[]}function h(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=null!=t?t:function(e){return d(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}(n);return function(e){const t=(0,u.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error('Docusaurus error: Duplicate values "'+t.map((e=>e.value)).join(", ")+'" found in <Tabs>. Every value needs to be unique.')}(e),e}),[t,n])}function g(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:n}=e;const a=(0,s.k6)(),o=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=n?n:null}({queryString:t,groupId:n});return[(0,c._X)(o),(0,r.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(a.location.search);t.set(o,e),a.replace({...a.location,search:t.toString()})}),[o,a])]}function p(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,o=h(e),[s,c]=(0,r.useState)((()=>function(e){var t;let{defaultValue:n,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!g({value:n,tabValues:r}))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+n+'" but none of its children has the corresponding value. Available values are: '+r.map((e=>e.value)).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");return n}const a=null!==(t=r.find((e=>e.default)))&&void 0!==t?t:r[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:o}))),[u,d]=m({queryString:n,groupId:a}),[p,b]=function(e){let{groupId:t}=e;const n=function(e){return e?"docusaurus.tab."+e:null}(t),[a,o]=(0,l.Nk)(n);return[a,(0,r.useCallback)((e=>{n&&o.set(e)}),[n,o])]}({groupId:a}),v=(()=>{const e=null!=u?u:p;return g({value:e,tabValues:o})?e:null})();(0,i.Z)((()=>{v&&c(v)}),[v]);return{selectedValue:s,selectValue:(0,r.useCallback)((e=>{if(!g({value:e,tabValues:o}))throw new Error("Can't select invalid tab value="+e);c(e),d(e),b(e)}),[d,b,o]),tabValues:o}}var b=n(972389);const v={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var f=n(785893);function x(e){let{className:t,block:n,selectedValue:r,selectValue:s,tabValues:i}=e;const c=[],{blockElementScrollPositionUntilNextRender:u}=(0,o.o5)(),l=e=>{const t=e.currentTarget,n=c.indexOf(t),a=i[n].value;a!==r&&(u(t),s(a))},d=e=>{var t;let n=null;switch(e.key){case"Enter":l(e);break;case"ArrowRight":{var r;const t=c.indexOf(e.currentTarget)+1;n=null!==(r=c[t])&&void 0!==r?r:c[0];break}case"ArrowLeft":{var a;const t=c.indexOf(e.currentTarget)-1;n=null!==(a=c[t])&&void 0!==a?a:c[c.length-1];break}}null===(t=n)||void 0===t||t.focus()};return(0,f.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":n},t),children:i.map((e=>{let{value:t,label:n,attributes:o}=e;return(0,f.jsx)("li",{role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:e=>c.push(e),onKeyDown:d,onClick:l,...o,className:(0,a.Z)("tabs__item",v.tabItem,null==o?void 0:o.className,{"tabs__item--active":r===t}),children:null!=n?n:t},t)}))})}function T(e){let{lazy:t,children:n,selectedValue:a}=e;const o=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,f.jsx)("div",{className:"margin-top--md",children:o.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a})))})}function I(e){const t=p(e);return(0,f.jsxs)("div",{className:(0,a.Z)("tabs-container",v.tabList),children:[(0,f.jsx)(x,{...e,...t}),(0,f.jsx)(T,{...e,...t})]})}function k(e){const t=(0,b.Z)();return(0,f.jsx)(I,{...e,children:d(e.children)},String(t))}},511151:(e,t,n)=>{n.d(t,{Z:()=>i,a:()=>s});var r=n(667294);const a={},o=r.createContext(a);function s(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);