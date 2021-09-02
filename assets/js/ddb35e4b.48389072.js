"use strict";(self.webpackChunkdocusaurus_plugin_docs_editor_preview=self.webpackChunkdocusaurus_plugin_docs_editor_preview||[]).push([[669],{93137:function(e,t,n){n.r(t),n.d(t,{default:function(){return Le}});var r=n(15861),a=n(87757),o=n.n(a),c=n(67294),s=n(97501),u=n.n(s),i=n(57458),l=n.n(i),p=n(86010),d=n(52263),f=n(44996),h=n(96470),m=n(25745),g=n.n(m),v=n(96344),w=n.n(v),b=n(93839),x=n.n(b),k=n(30308),E=n.n(k),_=n(11374),Z=n.n(_),y=n(19514),N=n.n(y),C=n(36168),L=n(56856),S=n(70128),P=n(7082),T=n(60054),R=n(68798),z=n(8481),A=n(49302),I=n(47191),U=n(41769),B=n(83142),H=n(6829),O=n(92943),q=n(29802),M=n(18802),G=n(93427),j=n(85961),F=n(69457),W=n(79068),V=n(95156),D=n(19401),J=n(17532),$=n.n(J),K=n(71647),Q=n.n(K),X=n(90582),Y=n.n(X),ee=n(64825),te=n.n(ee),ne=n(13734),re=n.n(ne),ae=n(53850),oe=n.n(ae),ce=n(15941),se=n.n(ce),ue=n(86401),ie=n(84796),le=n.n(ie),pe=n(67597),de=n.n(pe),fe=n(78818),he=n.n(fe),me=n(84338),ge=n.n(me),ve=n(55006),we=n.n(ve),be=n(55196),xe=n(99105),ke=[1,2,3,4,5,6],Ee=function(e){var t=e.children;return c.createElement("div",{className:(0,p.Z)("editor__group","margin-vert--sm","padding-horiz--xs")},t)},_e=function(e){var t=e.editor,n=e.name,r=e.action,a=e.children;return c.createElement("button",{className:(0,p.Z)("editor__control","margin-horiz--xs",n&&t.isActive(n)&&"editor__control--active"),onClick:r},c.createElement("span",{className:"editor__icon"},a))};function Ze(e){var t=e.editor,n=e.save,r=e.submit,a=e.dirty,o=e.syncing,s=e.pullrequest,u=e.className;return t?c.createElement(c.Fragment,null,c.createElement(xe.Z,null,c.createElement("link",{href:"https://fonts.googleapis.com/icon?family=Material+Icons",rel:"stylesheet"})),c.createElement("div",{className:(0,p.Z)("editor__menu",u)},c.createElement("div",{className:(0,p.Z)("editor__submenu")},c.createElement(Ee,null,c.createElement(_e,{editor:t,action:function(){return t.chain().focus().undo().run()}},"undo"),c.createElement(_e,{editor:t,action:function(){return t.chain().focus().redo().run()}},"redo")),c.createElement(Ee,null,c.createElement("select",{className:(0,p.Z)("editor__select","margin-horiz--xs"),value:function(){var e=[];t.isActive("code")&&e.push("code"),t.isActive("paragraph")&&e.push("paragraph");for(var n,r=(0,be.Z)(ke);!(n=r()).done;){var a=n.value;t.isActive("heading",{level:a})&&e.push(a.toString())}return 1==e.length?e[0]:""}(),onChange:function(e){e.preventDefault();var n=e.target.value;if("code"===n)t.chain().focus().clearNodes().setCode().run();else if("paragraph"===n)t.chain().focus().unsetCode().setParagraph().run();else{var r=parseInt(n);ke.includes(r)&&t.chain().focus().clearNodes().unsetCode().setHeading({level:r}).selectParentNode().unsetCode().run()}}},c.createElement("option",{hidden:!0,disabled:!0,value:""}),c.createElement("option",{value:"paragraph"},"Normal text"),ke.map((function(e){return c.createElement("option",{key:e,value:e},"Heading "+e)})),c.createElement("option",{value:"code"},"Inline code"))),c.createElement(Ee,null,c.createElement(_e,{editor:t,action:function(){return t.chain().focus().toggleBold().run()},name:"bold"},"format_bold"),c.createElement(_e,{editor:t,action:function(){return t.chain().focus().toggleItalic().run()},name:"italic"},"format_italic"),c.createElement(_e,{editor:t,action:function(){if(t.isActive("link")){var e=t.state,n=e.selection,r=n.from,a=n.to,o=[];e.doc.nodesBetween(r,a,(function(e){o=[].concat(o,e.marks)}));var c=o.find((function(e){return"link"===e.type.name})),s=c&&c.attrs.href?c.attrs.href:"";(s=window.prompt("Update or remove the URL",s))?t.chain().focus().extendMarkRange("link").setLink({href:s}).run():t.chain().focus().unsetLink().run()}else{var u=window.prompt("Add a URL");u&&t.chain().focus().extendMarkRange("link").setLink({href:u}).run()}},name:"link"},"link")),c.createElement(Ee,null,c.createElement(_e,{editor:t,action:function(){return t.chain().focus().toggleBulletList().run()},name:"bulletList"},"format_list_bulleted"),c.createElement(_e,{editor:t,action:function(){return t.chain().focus().toggleOrderedList().run()},name:"orderedList"},"format_list_numbered"),c.createElement(_e,{editor:t,action:function(){return t.chain().focus().toggleCodeBlock().run()},name:"codeBlock"},"code"),c.createElement(_e,{editor:t,action:function(){return t.chain().focus().toggleBlockquote().run()},name:"blockquote"},"format_quote")),c.createElement(Ee,null,c.createElement(_e,{editor:t,action:function(){return t.chain().focus().setHorizontalRule().run()}},"horizontal_rule"),c.createElement(_e,{editor:t,action:function(){return t.chain().focus().setHardBreak().run()}},"keyboard_return")),c.createElement(Ee,null,c.createElement(_e,{editor:t,action:function(){return t.chain().focus().unsetAllMarks().clearNodes().run()}},"format_clear"))),c.createElement("div",{className:(0,p.Z)("editor__submenu")},c.createElement(Ee,null,c.createElement("button",{className:"button button--sm button--primary margin-horiz--xs",disabled:o||!a,onClick:function(){t.chain().focus().run(),n()}},"Save"),s?c.createElement("a",{className:"button button--sm button--outline button--primary margin-horiz--xs",href:s,target:"_blank"},"Review"):c.createElement("button",{className:"button button--sm button--primary margin-horiz--xs",disabled:o,onClick:function(){t.chain().focus().run(),r()}},"Submit"))))):null}function ye(e){var t=e.editor,n=e.className;return c.createElement("div",{className:(0,p.Z)("editor__page",n)},c.createElement(C.kg,{editor:t,className:"editor__content"}))}function Ne(){return null}var Ce=function(e){var t=e.node.attrs.language,n=e.updateAttributes,r=e.extension,a=(0,c.useState)(t),o=a[0],s=a[1];return c.createElement(C.T5,{className:"codeblock"},c.createElement("select",{className:"codeblock__language",contentEditable:!1,defaultValue:t,onChange:function(e){return function(e){s(e),n({language:e})}(e.target.value)}},c.createElement("option",{value:!0},"auto"),c.createElement("option",{disabled:!0},"---"),r.options.lowlight.listLanguages().map((function(e,t){return c.createElement("option",{key:t,value:e},e)}))),c.createElement("pre",{className:"codeblock__code"},c.createElement(C.ms,{as:"code",className:(0,p.Z)(o?"language-"+o:"")})))};function Le(e){var t=e.options,n=e.className,a=(0,c.useState)(""),s=a[0],i=a[1],m=(0,c.useState)(""),g=m[0],v=m[1],w=(0,c.useState)(),b=w[0],x=w[1],k=(0,c.useState)(),E=k[0],_=k[1],Z=(0,c.useState)(),y=Z[0],N=Z[1],J=(0,c.useState)(),K=J[0],X=J[1],ee=(0,c.useState)(!1),ne=ee[0],ae=ee[1],ce=(0,c.useState)(""),ie=ce[0],pe=ce[1],fe=(0,c.useState)(""),me=fe[0],ve=fe[1],be=(0,c.useState)(!1),xe=be[0],ke=be[1],Ee=(0,d.Z)(),_e=(0,f.Z)(t.route||"edit"),Le=Ee.siteConfig.organizationName,Se=Ee.siteConfig.projectName,Pe="docs";t.docs&&(Le=t.docs.owner||Le,Se=t.docs.repo||Se,Pe=t.docs.path||Pe);var Te="static";t.static&&(Te=t.static.path||Te);var Re=t.github.clientId,ze=t.github.tokenUrl;ze&&!ze.endsWith("/")&&(ze+="/");var Ae=t.github.method?t.github.method.toUpperCase():"GET";if(!["GET","POST"].includes(Ae))throw"Authorization request method must be GET or POST.";var Ie=(0,C.jE)({extensions:[L.ZP,S.ZP,P.ZP,T.ZP,R.Z.extend({addNodeView:function(){return(0,C.fW)(Ce)}}).configure({lowlight:h}),z.Z,A.Z,I.Z,U.Z,B.Z,H.Z,q.ZP,O.ZP,M.ZP.configure({openOnClick:!1}),G.Z,j.ZP,F.Z,W.Z],autofocus:"start",onUpdate:function(e){var t=e.editor;ve(t.getHTML())}}),Ue=function(e){var t=new URL("https://github.com/login/oauth/authorize"),n=t.searchParams;n.append("client_id",Re),n.append("scope","public_repo"),n.append("redirect_uri",e),window.location.replace(t)},Be=function(){var e=(0,r.Z)(o().mark((function e(t){var n;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("GET"!==Ae){e.next=7;break}return n=new URL(t,ze),e.next=4,fetch(n).then((function(e){return e.json()})).then((function(e){return e.token}));case 4:return e.abrupt("return",e.sent);case 7:if("POST"!==Ae){e.next=13;break}return e.next=10,fetch(ze,{method:"POST",mode:"cors",headers:{"content-type":"application/json"},body:JSON.stringify({code:t})}).then((function(e){return e.json()})).then((function(e){return e.token}));case 10:return e.abrupt("return",e.sent);case 13:throw"Authorization request method must be GET or POST.";case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),He=function(){var e=(0,r.Z)(o().mark((function e(){var t,n,a,c,s,u,i,l,p,d;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=new URL(window.location.pathname,window.location.origin),n=new URLSearchParams(window.location.search),!(a=n.get("code"))){e.next=18;break}return window.history.replaceState(window.history.state,"",t),e.next=7,Be(a);case 7:return c=e.sent,s=V.v.plugin(D.T),u=new s({auth:c}),i=u.hook,l=u.rest,i.error("request",function(){var e=(0,r.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(403!==t.status){e.next=5;break}return e.next=3,He();case 3:e.next=6;break;case 5:throw t;case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e.next=13,l.users.getAuthenticated();case 13:return p=e.sent,d=p.data.login,e.abrupt("return",{api:l,user:d});case 18:Ue(t);case 19:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Oe=function(){var e=(0,r.Z)(o().mark((function e(){var t,n,r,a;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K.api.repos.createFork({owner:Le,repo:Se});case 2:return t=e.sent,n=t.data,r=n.name,a=n.owner.login,e.next=8,new Promise((function(e,t){var n=setInterval((function(){K.api.repos.get({owner:a,repo:r}).then((function(t){clearInterval(n),e(t)})).catch((function(e){404!==e.status&&t(e)}))}),1e3)}));case 8:return e.abrupt("return",e.sent);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),qe=function(){var e=(0,r.Z)(o().mark((function e(t,n){var r,a,c,s,u,i;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,K.api.repos.get({owner:t,repo:n});case 3:r=e.sent,e.next=15;break;case 6:if(e.prev=6,e.t0=e.catch(0),404!==e.t0.status||t===Le){e.next=14;break}return e.next=11,Oe();case 11:r=e.sent,e.next=15;break;case 14:throw e.t0;case 15:if(a=r.data,c=a.name,s=a.owner.login,u=a.parent,s===Le){e.next=24;break}if(!u){e.next=23;break}if(i=u.name,u.owner.login===Le||i===Se){e.next=21;break}throw"Repo is not a fork of "+Le+"/"+Se;case 21:e.next=24;break;case 23:throw"Repo is not a fork of "+Le+"/"+Se;case 24:return e.abrupt("return",{owner:s,repo:c});case 25:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t,n){return e.apply(this,arguments)}}(),Me=function(){var e=(0,r.Z)(o().mark((function e(t,n,r){var a,c,s,u;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K.api.repos.get({owner:Le,repo:Se});case 2:return a=e.sent,c=a.data.default_branch,e.next=6,K.api.repos.getBranch({owner:Le,repo:Se,branch:c});case 6:return s=e.sent,u=s.data.commit.sha,e.next=10,K.api.git.createRef({owner:t,repo:n,sha:u,ref:"refs/heads/"+r});case 10:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),Ge=function(){var e=(0,r.Z)(o().mark((function e(t,n,r){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,K.api.repos.getBranch({owner:t,repo:n,branch:r});case 3:e.next=13;break;case 5:if(e.prev=5,e.t0=e.catch(0),404!==e.t0.status){e.next=12;break}return e.next=10,Me(t,n,r);case 10:e.next=13;break;case 12:throw e.t0;case 13:return e.abrupt("return",r);case 14:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t,n,r){return e.apply(this,arguments)}}(),je=function(){var e=(0,r.Z)(o().mark((function e(t,n,r,a){var c,s,i,p,d,f,h,m;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K.api.repos.getContent({owner:t,repo:n,path:a,ref:"refs/heads/"+r});case 2:return c=e.sent,s=c.data.content,i=l().decode(u().decode(s)),p="https://raw.githubusercontent.com/"+t+"/"+n+"/"+r+"/"+Te+"/",d=ge()().use(oe()).use(se(),["yaml"]).use(de(),{yaml:we().parse}).use(ue.Z).use(le(),{absolutePath:p}).use(he()).use($()),e.next=9,d.process(i);case 9:f=e.sent,h=f.data,m=f.contents,x(h),Ie.chain().setContent(m).focus("start").run(),pe(Ie.getHTML()),ve(Ie.getHTML());case 16:case"end":return e.stop()}}),e)})));return function(t,n,r,a){return e.apply(this,arguments)}}(),Fe=function(){var e=(0,r.Z)(o().mark((function e(t,n,r,a){var c,s,p,d,f,h,m,g,v,w;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c="https://raw.githubusercontent.com/"+t+"/"+n+"/"+r+"/"+Te+"/",s=function(e){if(e.href.startsWith(c))return"/"+e.href.slice(c.length)},p=Ie.getHTML(),d=ge()().use(Q()).use(Y(),s).use(te()).use(re(),{bullet:"-",rule:"-",listItemIndent:"mixed"}),e.next=6,d.process(p);case 6:return f=e.sent,h=f.contents,b&&(m=we().stringify(b),h="---\n"+m+"---\n\n"+h),g=u().encode(l().encode(h)),ae(!0),e.next=13,K.api.repos.getContent({owner:t,repo:n,path:a,ref:"refs/heads/"+r});case 13:return v=e.sent,w=v.data.sha,i("Saving changes..."),e.next=18,K.api.repos.createOrUpdateFileContents({owner:t,repo:n,branch:r,path:a,sha:w,content:g,message:"Edit "+y});case 18:return pe(p),i("Changes have been saved, syncing with GitHub..."),e.next=22,new Promise((function(e,o){var c=setInterval((function(){K.api.repos.getContent({owner:t,repo:n,path:a,ref:"refs/heads/"+r}).then((function(t){t.data.sha!=w&&(clearInterval(c),ae(!1),i("Changes have been saved"),e())})).catch((function(e){404!==e.status&&(ae(!1),i("An error occured during sync"),o(e))}))}),1e3)}));case 22:case"end":return e.stop()}}),e)})));return function(t,n,r,a){return e.apply(this,arguments)}}(),We=function(){var e=(0,r.Z)(o().mark((function e(t,n){var r,a,c,s,u,l,p;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t+":"+n,e.next=3,K.api.pulls.list({owner:Le,repo:Se,state:"open",head:r});case 3:if(a=e.sent,!(c=a.data).length){e.next=10;break}v(c[0].html_url),i("Changes already submitted"),e.next=21;break;case 10:return i("Submitting changes..."),e.next=13,K.api.repos.get({owner:Le,repo:Se});case 13:return s=e.sent,u=s.data.default_branch,e.next=17,K.api.pulls.create({owner:Le,repo:Se,base:u,head:r,title:"Edit "+y});case 17:l=e.sent,p=l.data.html_url,v(p),i("Changes submitted");case 21:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Ve=function(){var e=(0,r.Z)(o().mark((function e(){var t,n,r,a;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,He();case 2:t=e.sent,n=window.location.pathname.slice(_e.length).replace(/\/$/,""),a="edit/"+(r=""+Pe+n+".md").replace(/[/.]/g,"-"),X(t),_(a),N(r);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),De=function(){var e=(0,r.Z)(o().mark((function e(){var t,n,r,a;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,qe(K.user,Se);case 2:return t=e.sent,n=t.owner,r=t.repo,e.next=7,Ge(n,r,E);case 7:return a=e.sent,e.next=10,je(n,r,a,y);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Je=function(){var e=(0,r.Z)(o().mark((function e(){var t,n,r,a;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!xe){e.next=11;break}return e.next=3,qe(K.user,Se);case 3:return t=e.sent,n=t.owner,r=t.repo,e.next=8,Ge(n,r,E);case 8:return a=e.sent,e.next=11,Fe(n,r,a,y);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),$e=function(){var e=(0,r.Z)(o().mark((function e(){var t,n,r,a;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,qe(K.user,Se);case 2:return t=e.sent,n=t.owner,r=t.repo,e.next=7,Ge(n,r,E);case 7:if(a=e.sent,!xe){e.next=11;break}return e.next=11,Fe(n,r,a,y);case 11:return e.next=13,We(n,a);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,c.useEffect)((function(){document.documentElement.dataset.theme="light",i("Getting ready..."),Ve(),i("Ready to edit")}),[]),(0,c.useEffect)((function(){K&&E&&y&&De()}),[K,E,y]),(0,c.useEffect)((function(){ke(me!==ie)}),[me,ie]),c.createElement(c.Fragment,null,K?c.createElement("div",{className:(0,p.Z)("editor",n)},c.createElement("div",{className:"editor__announcements padding-horiz--md padding-vert--xs"},s),c.createElement(Ze,{editor:Ie,save:Je,submit:$e,dirty:xe,syncing:ne,pullrequest:g}),c.createElement(ye,{editor:Ie})):c.createElement(Ne,null))}h.registerLanguage("c",g()),h.registerLanguage("javascript",w()),h.registerLanguage("markdown",x()),h.registerLanguage("python",E()),h.registerLanguage("rust",Z()),h.registerLanguage("shell",N())}}]);