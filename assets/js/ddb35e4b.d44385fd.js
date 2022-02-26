"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[669],{5199:function(e,t,n){n.r(t),n.d(t,{default:function(){return ve}});var r=n(4795),a=n(7162),o=n.n(a),c=n(2784),u=n(1166),s=n.n(u),i=n(5050),l=n.n(i),p=n(957),f=n.n(p),d=n(6277),m=n(1588),h=n(6506),g=n(3181),v=n(3580),w=n(9233),b=n(7801),x=n(8586),k=n(2769),E=n(6674),Z=n(8381),y=n(6501),_=n(7630),N=n(5921),S=n(8266),C=n(4068),L=n(3926),P=n(7665),z=n(9044),T=n(7125),R=n(3138),A=n(7207),B=n(2100),H=n(5491),I=n(6228),M=n(1233),q=n(5892),O=n(4748),$=n(5091),j=n(8739),U=n(2212),F=n(5173),D=n(7507),G=n(9678),Q=n(3250),V=n(6495),J=n.n(V),W=n(3726),K=n(4945),X=n(3720),Y=n(2551),ee=n(9087),te=n(779),ne=n.n(te),re=n(3115),ae=n.n(re),oe=n(1056),ce=n(4806),ue=n(155),se=n.n(ue),ie=n(3578),le=[1,2,3,4,5,6],pe=function(e){var t=e.children;return c.createElement("div",{className:(0,d.Z)("editor__group","margin-vert--sm","padding-horiz--xs")},t)},fe=function(e){var t=e.editor,n=e.name,r=e.action,a=e.children;return c.createElement("button",{className:(0,d.Z)("editor__control","margin-horiz--xs",n&&t.isActive(n)&&"editor__control--active"),onClick:r},c.createElement("span",{className:"editor__icon"},a))};function de(e){var t=e.editor,n=e.save,r=e.submit,a=e.dirty,o=e.syncing,u=e.pullrequest,s=e.className;return t?c.createElement(c.Fragment,null,c.createElement(h.Z,null,c.createElement("link",{href:"https://fonts.googleapis.com/icon?family=Material+Icons",rel:"stylesheet"})),c.createElement("div",{className:(0,d.Z)("editor__menu",s)},c.createElement("div",{className:(0,d.Z)("editor__submenu")},c.createElement(pe,null,c.createElement(fe,{editor:t,action:function(){return t.chain().focus().undo().run()}},"undo"),c.createElement(fe,{editor:t,action:function(){return t.chain().focus().redo().run()}},"redo")),c.createElement(pe,null,c.createElement("select",{className:(0,d.Z)("editor__select","margin-horiz--xs"),value:function(){var e=[];t.isActive("code")&&e.push("code"),t.isActive("paragraph")&&e.push("paragraph");for(var n,r=(0,ie.Z)(le);!(n=r()).done;){var a=n.value;t.isActive("heading",{level:a})&&e.push(a.toString())}return 1==e.length?e[0]:""}(),onChange:function(e){e.preventDefault();var n=e.target.value;"code"===n?t.chain().focus().clearNodes().setCode().run():"paragraph"===n?t.chain().focus().unsetCode().setParagraph().run():le.includes(n)&&t.chain().focus().clearNodes().unsetCode().setHeading({level:n}).selectParentNode().unsetCode().run()}},c.createElement("option",{hidden:!0,disabled:!0,value:""}),c.createElement("option",{value:"paragraph"},"Normal text"),le.map((function(e){return c.createElement("option",{key:e,value:e},"Heading "+e)})),c.createElement("option",{value:"code"},"Inline code"))),c.createElement(pe,null,c.createElement(fe,{editor:t,action:function(){return t.chain().focus().toggleBold().run()},name:"bold"},"format_bold"),c.createElement(fe,{editor:t,action:function(){return t.chain().focus().toggleItalic().run()},name:"italic"},"format_italic"),c.createElement(fe,{editor:t,action:function(){if(t.isActive("link")){var e=t.state,n=e.selection,r=n.from,a=n.to,o=[];e.doc.nodesBetween(r,a,(function(e){o=[].concat(o,e.marks)}));var c=o.find((function(e){return"link"===e.type.name})),u=c&&c.attrs.href?c.attrs.href:"";(u=window.prompt("Update or remove the URL",u))?t.chain().focus().extendMarkRange("link").setLink({href:u}).run():t.chain().focus().unsetLink().run()}else{var s=window.prompt("Add a URL");s&&t.chain().focus().extendMarkRange("link").setLink({href:s}).run()}},name:"link"},"link")),c.createElement(pe,null,c.createElement(fe,{editor:t,action:function(){return t.chain().focus().toggleBulletList().run()},name:"bulletList"},"format_list_bulleted"),c.createElement(fe,{editor:t,action:function(){return t.chain().focus().toggleOrderedList().run()},name:"orderedList"},"format_list_numbered"),c.createElement(fe,{editor:t,action:function(){return t.chain().focus().toggleCodeBlock().run()},name:"codeBlock"},"code"),c.createElement(fe,{editor:t,action:function(){return t.chain().focus().toggleBlockquote().run()},name:"blockquote"},"format_quote")),c.createElement(pe,null,c.createElement(fe,{editor:t,action:function(){return t.chain().focus().setHorizontalRule().run()}},"horizontal_rule"),c.createElement(fe,{editor:t,action:function(){return t.chain().focus().setHardBreak().run()}},"keyboard_return")),c.createElement(pe,null,c.createElement(fe,{editor:t,action:function(){return t.chain().focus().unsetAllMarks().clearNodes().run()}},"format_clear"))),c.createElement("div",{className:(0,d.Z)("editor__submenu")},c.createElement(pe,null,c.createElement("button",{className:"button button--sm button--primary margin-horiz--xs",disabled:o||!a,onClick:function(){t.chain().focus().run(),n()}},"Save"),u?c.createElement("a",{className:"button button--sm button--outline button--primary margin-horiz--xs",href:u,target:"_blank",rel:"noreferrer"},"Review"):c.createElement("button",{className:"button button--sm button--primary margin-horiz--xs",disabled:o,onClick:function(){t.chain().focus().run(),r()}},"Submit"))))):null}function me(e){var t=e.editor,n=e.className;return c.createElement("div",{className:(0,d.Z)("editor__page",n)},c.createElement(y.kg,{editor:t,className:"editor__content"}))}function he(){return null}function ge(e){var t=e.node.attrs.language,n=e.updateAttributes,r=e.extension,a=(0,c.useState)(t),o=a[0],u=a[1];return c.createElement(y.T5,{className:"codeblock"},c.createElement("select",{className:"codeblock__language",contentEditable:!1,defaultValue:t,onChange:function(e){return function(e){u(e),n({language:e})}(e.target.value)}},c.createElement("option",{value:""},"auto"),c.createElement("option",{disabled:!0},"---"),r.options.lowlight.listLanguages().map((function(e,t){return c.createElement("option",{key:t,value:e},e)}))),c.createElement("pre",{className:"codeblock__code"},c.createElement(y.ms,{as:"code",className:(0,d.Z)(o?"language-"+o:"")})))}function ve(e){var t=e.options,n=e.className,a=(0,c.useState)(""),u=a[0],i=a[1],p=(0,c.useState)(""),w=p[0],b=p[1],x=(0,c.useState)({}),k=x[0],E=x[1],Z=(0,c.useState)({}),V=Z[0],te=Z[1],re=(0,c.useState)(!1),ue=re[0],ie=re[1],le=(0,c.useState)(""),pe=le[0],fe=le[1],ve=(0,c.useState)(""),we=ve[0],be=ve[1],xe=(0,c.useState)(!1),ke=xe[0],Ee=xe[1],Ze=t.authorizationClientId,ye=t.authorizationTokenUrl,_e=t.authorizationMethod,Ne=t.contentOwner,Se=t.contentRepo,Ce=t.contentDocsPath,Le=t.contentStaticPath,Pe=(0,g.TH)().pathname,ze=(0,m.usePluginData)("docusaurus-plugin-docs-editor").editorBasePath,Te=new(f())(Pe).relativeTo(ze+"/").toString(),Re=f().joinPaths(Ce,Te).suffix("md").toString(),Ae="edit/"+Re.replace(/[/.]/g,"-"),Be=(0,y.jE)({extensions:[_.ZP,N.ZP,S.ZP,C.ZP,L.Z.extend({addNodeView:function(){return(0,y.fW)(ge)}}).configure({lowlight:v.$}),P.Z,z.Z,T.Z,R.Z,A.Z,B.Z,I.ZP,H.ZP,M.Z.configure({openOnClick:!1}),q.Z,O.ZP,$.Z,j.Z],autofocus:"start",onUpdate:function(e){var t=e.editor;be(t.getHTML())}}),He=function(e){var t=new(f())("https://github.com/login/oauth/authorize").query({client_id:Ze,scope:"public_repo",redirect_uri:e}).toString();window.location.replace(t)},Ie=function(){var e=(0,r.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=_e,e.next="GET"===e.t0?3:"POST"===e.t0?4:5;break;case 3:return e.abrupt("return",fetch(ye+t).then((function(e){return e.json()})).then((function(e){return e.token})));case 4:return e.abrupt("return",fetch(ye,{method:"POST",mode:"cors",headers:{"content-type":"application/json"},body:JSON.stringify({code:t})}).then((function(e){return e.json()})).then((function(e){return e.token})));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Me=function(){var e=(0,r.Z)(o().mark((function e(){var t,n,a,c,u,s,i,l,p,d,m;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=new(f()),n=f().parseQuery(t.query()),!(a=n.code)){e.next=18;break}return c=t.removeQuery("code").toString(),window.history.replaceState(window.history.state,"",c),e.next=7,Ie(a);case 7:return u=e.sent,s=U.v.plugin(F.T),i=new s({auth:u}),l=i.hook,p=i.rest,l.error("request",function(){var e=(0,r.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t instanceof D.L&&403===t.status)){e.next=5;break}return e.next=3,Me();case 3:e.next=6;break;case 5:throw t;case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e.next=13,p.users.getAuthenticated();case 13:return d=e.sent,m=d.data.login,e.abrupt("return",{api:p,user:m});case 18:He(t);case 19:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),qe=function(){var e=(0,r.Z)(o().mark((function e(){var t,n,r,a;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V.api.repos.createFork({owner:Ne,repo:Se});case 2:return t=e.sent,n=t.data,r=n.name,a=n.owner.login,e.next=8,new Promise((function(e,t){var n=setInterval((function(){V.api.repos.get({owner:a,repo:r}).then((function(t){clearInterval(n),e(t)})).catch((function(e){404!==e.status&&t(e)}))}),1e3)}));case 8:return e.abrupt("return",e.sent);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Oe=function(){var e=(0,r.Z)(o().mark((function e(t,n){var r,a,c,u,s,i;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,V.api.repos.get({owner:t,repo:n});case 3:case 11:r=e.sent,e.next=15;break;case 6:if(e.prev=6,e.t0=e.catch(0),404!==e.t0.status||t===Ne){e.next=14;break}return e.next=11,qe();case 14:throw e.t0;case 15:if(a=r.data,c=a.name,u=a.owner.login,s=a.parent,u===Ne){e.next=24;break}if(!s){e.next=23;break}if(i=s.name,s.owner.login===Ne||i===Se){e.next=21;break}throw"Repo is not a fork of "+Ne+"/"+Se;case 21:e.next=24;break;case 23:throw"Repo is not a fork of "+Ne+"/"+Se;case 24:return e.abrupt("return",{owner:u,repo:c});case 25:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t,n){return e.apply(this,arguments)}}(),$e=function(){var e=(0,r.Z)(o().mark((function e(t,n,r){var a,c,u,s;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V.api.repos.get({owner:Ne,repo:Se});case 2:return a=e.sent,c=a.data.default_branch,e.next=6,V.api.repos.getBranch({owner:Ne,repo:Se,branch:c});case 6:return u=e.sent,s=u.data.commit.sha,e.next=10,V.api.git.createRef({owner:t,repo:n,sha:s,ref:"refs/heads/"+r});case 10:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),je=function(){var e=(0,r.Z)(o().mark((function e(t,n,r){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,V.api.repos.getBranch({owner:t,repo:n,branch:r});case 3:case 10:e.next=13;break;case 5:if(e.prev=5,e.t0=e.catch(0),404!==e.t0.status){e.next=12;break}return e.next=10,$e(t,n,r);case 12:throw e.t0;case 13:return e.abrupt("return",r);case 14:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t,n,r){return e.apply(this,arguments)}}(),Ue=function(){var e=(0,r.Z)(o().mark((function e(t,n,r,a){var c,u,i,p,f,d,m,h,g;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V.api.repos.getContent({owner:t,repo:n,path:a,ref:"refs/heads/"+r});case 2:return c=e.sent,u=c.data,i=u.content,p=l().decode(s().decode(i)),f="https://raw.githubusercontent.com/"+t+"/"+n+"/"+r+"/"+Le+"/",d=(0,ce.l)().use(X.Z).use(Y.Z,["yaml"]).use(ae(),{yaml:se().parse,remove:!0}).use(ee.Z).use(ne(),{absolutePath:f}).use(oe.Z).use(G.Z),e.next=10,d.process(p);case 10:m=e.sent,h=m.data,g=m.value,E(h),Be.chain().setContent(g).focus("start").run(),fe(Be.getHTML()),be(Be.getHTML());case 17:case"end":return e.stop()}}),e)})));return function(t,n,r,a){return e.apply(this,arguments)}}(),Fe=function(){var e=(0,r.Z)(o().mark((function e(t,n,r,a){var c,u,p,d,m,h,g,v,w,b,x;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c="https://raw.githubusercontent.com/"+t+"/"+n+"/"+r+"/"+Le+"/",u=function(e){return new(f())(e).relativeTo(c).toString()},p=Be.getHTML(),d=(0,ce.l)().use(Q.Z).use(J(),u).use(W.Z).use(K.Z,{bullet:"-",rule:"-",listItemIndent:"mixed"}),e.next=6,d.process(p);case 6:return m=e.sent,h=m.value,k&&(g=se().stringify(k),h="---\n"+g+"---\n\n"+h),v=s().encode(l().encode(h)),ie(!0),e.next=13,V.api.repos.getContent({owner:t,repo:n,path:a,ref:"refs/heads/"+r});case 13:return w=e.sent,b=w.data,x=b.sha,i("Saving changes..."),e.next=19,V.api.repos.createOrUpdateFileContents({owner:t,repo:n,branch:r,path:a,sha:x,content:v,message:"Edit "+Re});case 19:return fe(p),i("Changes have been saved, syncing with GitHub..."),e.next=23,new Promise((function(e,o){var c=setInterval((function(){V.api.repos.getContent({owner:t,repo:n,path:a,ref:"refs/heads/"+r}).then((function(t){t.data.sha!=x&&(clearInterval(c),ie(!1),i("Changes have been saved"),e(null))})).catch((function(e){404!==e.status&&(ie(!1),i("An error occured during sync"),o(e))}))}),1e3)}));case 23:case"end":return e.stop()}}),e)})));return function(t,n,r,a){return e.apply(this,arguments)}}(),De=function(){var e=(0,r.Z)(o().mark((function e(t,n){var r,a,c,u,s,l,p;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t+":"+n,e.next=3,V.api.pulls.list({owner:Ne,repo:Se,state:"open",head:r});case 3:if(a=e.sent,!(c=a.data).length){e.next=10;break}b(c[0].html_url),i("Changes already submitted"),e.next=21;break;case 10:return i("Submitting changes..."),e.next=13,V.api.repos.get({owner:Ne,repo:Se});case 13:return u=e.sent,s=u.data.default_branch,e.next=17,V.api.pulls.create({owner:Ne,repo:Se,base:s,head:r,title:"Edit "+Re});case 17:l=e.sent,p=l.data.html_url,b(p),i("Changes submitted");case 21:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Ge=function(){var e=(0,r.Z)(o().mark((function e(){var t;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Me();case 2:t=e.sent,te(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Qe=function(){var e=(0,r.Z)(o().mark((function e(){var t,n,r,a;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Oe(V.user,Se);case 2:return t=e.sent,n=t.owner,r=t.repo,e.next=7,je(n,r,Ae);case 7:return a=e.sent,e.next=10,Ue(n,r,a,Re);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Ve=function(){var e=(0,r.Z)(o().mark((function e(){var t,n,r,a;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!ke){e.next=11;break}return e.next=3,Oe(V.user,Se);case 3:return t=e.sent,n=t.owner,r=t.repo,e.next=8,je(n,r,Ae);case 8:return a=e.sent,e.next=11,Fe(n,r,a,Re);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Je=function(){var e=(0,r.Z)(o().mark((function e(){var t,n,r,a;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Oe(V.user,Se);case 2:return t=e.sent,n=t.owner,r=t.repo,e.next=7,je(n,r,Ae);case 7:if(a=e.sent,!ke){e.next=11;break}return e.next=11,Fe(n,r,a,Re);case 11:return e.next=13,De(n,a);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,c.useEffect)((function(){document.documentElement.dataset.theme="light",i("Getting ready..."),Ge(),i("Ready to edit")}),[]),(0,c.useEffect)((function(){V.user&&V.api&&Qe()}),[V]),(0,c.useEffect)((function(){Ee(we!==pe)}),[we,pe]),c.createElement(c.Fragment,null,c.createElement(h.Z,null,c.createElement("title",null,"Editor | ",Te)),V.user&&V.api?c.createElement("div",{className:(0,d.Z)("editor",n)},c.createElement("div",{className:"editor__announcements padding-horiz--md padding-vert--xs"},u),c.createElement(de,{editor:Be,save:Ve,submit:Je,dirty:ke,syncing:ue,pullrequest:w}),c.createElement(me,{editor:Be})):c.createElement(he,null))}v.$.registerLanguage("c",w.Z),v.$.registerLanguage("javascript",b.Z),v.$.registerLanguage("markdown",x.Z),v.$.registerLanguage("python",k.Z),v.$.registerLanguage("rust",E.Z),v.$.registerLanguage("shell",Z.Z)}}]);