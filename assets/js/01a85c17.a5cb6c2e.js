"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[13],{2352:function(e,t,a){a.d(t,{Z:function(){return v}});var r=a(1461),n=a(2784),l=a(6277),s=a(5053),c=a(3095),i="sidebar_PGAs",m="sidebarItemTitle_lS9L",o="sidebarItemList_oTwo",u="sidebarItem_QGIx",g="sidebarItemLink_nnrq",d="sidebarItemLinkActive__t32",b=a(9489);function E(e){var t=e.sidebar;return 0===t.items.length?null:n.createElement("nav",{className:(0,l.Z)(i,"thin-scrollbar"),"aria-label":(0,b.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},n.createElement("div",{className:(0,l.Z)(m,"margin-bottom--md")},t.title),n.createElement("ul",{className:o},t.items.map((function(e){return n.createElement("li",{key:e.permalink,className:u},n.createElement(c.Z,{isNavLink:!0,to:e.permalink,className:g,activeClassName:d},e.title))}))))}var p=["sidebar","toc","children"];function v(e){var t=e.sidebar,a=e.toc,c=e.children,i=(0,r.Z)(e,p),m=t&&t.items.length>0;return n.createElement(s.Z,i,n.createElement("div",{className:"container margin-vert--lg"},n.createElement("div",{className:"row"},m&&n.createElement("aside",{className:"col col--3"},n.createElement(E,{sidebar:t})),n.createElement("main",{className:(0,l.Z)("col",{"col--7":m,"col--9 col--offset-1":!m}),itemScope:!0,itemType:"http://schema.org/Blog"},c),a&&n.createElement("div",{className:"col col--2"},a))))}},2712:function(e,t,a){a.r(t),a.d(t,{default:function(){return o}});var r=a(2784),n=a(2352),l=a(6233),s=a(1626),c="tag_p1rh";function i(e){var t=e.letterEntry;return r.createElement("article",null,r.createElement("h2",null,t.letter),r.createElement("ul",{className:"padding--none"},t.tags.map((function(e){return r.createElement("li",{key:e.permalink,className:c},r.createElement(l.Z,e))}))),r.createElement("hr",null))}function m(e){var t=e.tags,a=(0,s.PZ)(t);return r.createElement("section",{className:"margin-vert--lg"},a.map((function(e){return r.createElement(i,{key:e.letter,letterEntry:e})})))}function o(e){var t=e.tags,a=e.sidebar,l=(0,s.MA)();return r.createElement(n.Z,{title:l,wrapperClassName:s.kM.wrapper.blogPages,pageClassName:s.kM.page.blogTagsListPage,searchMetadata:{tag:"blog_tags_list"},sidebar:a},r.createElement("h1",null,l),r.createElement(m,{tags:Object.values(t)}))}},6233:function(e,t,a){a.d(t,{Z:function(){return m}});var r=a(2784),n=a(6277),l=a(3095),s="tag_YCD2",c="tagRegular_gQaq",i="tagWithCount_v9T4";function m(e){var t,a=e.permalink,m=e.name,o=e.count;return r.createElement(l.Z,{href:a,className:(0,n.Z)(s,(t={},t[c]=!o,t[i]=o,t))},m,o&&r.createElement("span",null,o))}}}]);