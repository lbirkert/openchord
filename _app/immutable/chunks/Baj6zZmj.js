var bn=Array.isArray,$t=Array.prototype.indexOf,Cn=Array.from,Pn=Object.defineProperty,ct=Object.getOwnPropertyDescriptor,zt=Object.getOwnPropertyDescriptors,Fn=Object.prototype,Ln=Array.prototype,Jt=Object.getPrototypeOf;function Mn(t){return typeof t=="function"}const qn=()=>{};function Yn(t){return typeof t?.then=="function"}function Hn(t){return t()}function yt(t){for(var n=0;n<t.length;n++)t[n]()}const y=2,wt=4,Q=8,ut=16,I=32,P=64,U=128,d=256,V=512,v=1024,k=2048,N=4096,C=8192,W=16384,Qt=32768,gt=65536,jn=1<<17,Wt=1<<19,Tt=1<<20,vt=Symbol("$state"),Bn=Symbol("legacy props"),Un=Symbol("");function mt(t){return t===this.v}function Xt(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function At(t){return!Xt(t,this.v)}function tn(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function nn(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function en(t){throw new Error("https://svelte.dev/e/effect_orphan")}function rn(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Vn(){throw new Error("https://svelte.dev/e/hydration_failed")}function Gn(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function Kn(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Zn(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function an(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function ln(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let X=!1;function $n(){X=!0}const zn=1,Jn=2,Qn=4,Wn=8,Xn=16,te=1,ne=2,ee=4,re=8,ae=16,le=4,se=1,ue=2,sn="[",un="[!",on="]",xt={},oe=Symbol(),fe="http://www.w3.org/1999/xhtml";function It(t){console.warn("https://svelte.dev/e/hydration_mismatch")}let f=null;function pt(t){f=t}function ie(t,n=!1,e){f={p:f,c:null,e:null,m:!1,s:t,x:null,l:null},X&&!n&&(f.l={s:null,u:null,r1:[],r2:ot(!1)})}function _e(t){const n=f;if(n!==null){const s=n.e;if(s!==null){var e=o,r=u;n.e=null;try{for(var a=0;a<s.length;a++){var l=s[a];$(l.effect),Z(l.reaction),Ft(l.fn)}}finally{$(e),Z(r)}}f=n.p,n.m=!0}return{}}function tt(){return!X||f!==null&&f.l===null}function ot(t,n){var e={f:0,v:t,reactions:null,equals:mt,rv:0,wv:0};return e}function ce(t){return Rt(ot(t))}function fn(t,n=!1){const e=ot(t);return n||(e.equals=At),X&&f!==null&&f.l!==null&&(f.l.s??=[]).push(e),e}function ve(t,n=!1){return Rt(fn(t,n))}function Rt(t){return u!==null&&!E&&(u.f&y)!==0&&(A===null?Tn([t]):A.push(t)),t}function kt(t,n){return u!==null&&!E&&tt()&&(u.f&(y|ut))!==0&&(A===null||!A.includes(t))&&ln(),_n(t,n)}function _n(t,n){return t.equals(n)||(t.v,t.v=n,t.wv=Vt(),Dt(t,k),tt()&&o!==null&&(o.f&v)!==0&&(o.f&(I|P))===0&&(x===null?mn([t]):x.push(t))),n}function pe(t,n=1){var e=_t(t),r=n===1?e++:e--;return kt(t,e),r}function Dt(t,n){var e=t.reactions;if(e!==null)for(var r=tt(),a=e.length,l=0;l<a;l++){var s=e[l],i=s.f;(i&k)===0&&(!r&&s===o||(g(s,n),(i&(v|d))!==0&&((i&y)!==0?Dt(s,N):rt(s))))}}let O=!1;function he(t){O=t}let w;function q(t){if(t===null)throw It(),xt;return w=t}function de(){return q(b(w))}function Ee(t){if(O){if(b(w)!==null)throw It(),xt;w=t}}function ye(t=1){if(O){for(var n=t,e=w;n--;)e=b(e);w=e}}function we(){for(var t=0,n=w;;){if(n.nodeType===8){var e=n.data;if(e===on){if(t===0)return n;t-=1}else(e===sn||e===un)&&(t+=1)}var r=b(n);n.remove(),n=r}}var ht,cn,Ot,St;function ge(){if(ht===void 0){ht=window,cn=/Firefox/.test(navigator.userAgent);var t=Element.prototype,n=Node.prototype;Ot=ct(n,"firstChild").get,St=ct(n,"nextSibling").get,t.__click=void 0,t.__className=void 0,t.__attributes=null,t.__style=void 0,t.__e=void 0,Text.prototype.__t=void 0}}function at(t=""){return document.createTextNode(t)}function lt(t){return Ot.call(t)}function b(t){return St.call(t)}function Te(t,n){if(!O)return lt(t);var e=lt(w);if(e===null)e=w.appendChild(at());else if(n&&e.nodeType!==3){var r=at();return e?.before(r),q(r),r}return q(e),e}function me(t,n){if(!O){var e=lt(t);return e instanceof Comment&&e.data===""?b(e):e}return w}function Ae(t,n=1,e=!1){let r=O?w:t;for(var a;n--;)a=r,r=b(r);if(!O)return r;var l=r?.nodeType;if(e&&l!==3){var s=at();return r===null?a?.after(s):r.before(s),q(s),s}return q(r),r}function xe(t){t.textContent=""}function Nt(t){var n=y|k,e=u!==null&&(u.f&y)!==0?u:null;return o===null||e!==null&&(e.f&d)!==0?n|=d:o.f|=Tt,{ctx:f,deps:null,effects:null,equals:mt,f:n,fn:t,reactions:null,rv:0,v:null,wv:0,parent:e??o}}function Ie(t){const n=Nt(t);return n.equals=At,n}function bt(t){var n=t.effects;if(n!==null){t.effects=null;for(var e=0;e<n.length;e+=1)S(n[e])}}function vn(t){for(var n=t.parent;n!==null;){if((n.f&y)===0)return n;n=n.parent}return null}function pn(t){var n,e=o;$(vn(t));try{bt(t),n=Kt(t)}finally{$(e)}return n}function Ct(t){var n=pn(t),e=(R||(t.f&d)!==0)&&t.deps!==null?N:v;g(t,e),t.equals(n)||(t.v=n,t.wv=Vt())}function Pt(t){o===null&&u===null&&en(),u!==null&&(u.f&d)!==0&&o===null&&nn(),it&&tn()}function hn(t,n){var e=n.last;e===null?n.last=n.first=t:(e.next=t,t.prev=e,n.last=t)}function F(t,n,e,r=!0){var a=o,l={ctx:f,deps:null,nodes_start:null,nodes_end:null,f:t|k,first:null,fn:n,last:null,next:null,parent:a,prev:null,teardown:null,transitions:null,wv:0};if(e)try{et(l),l.f|=Qt}catch(_){throw S(l),_}else n!==null&&rt(l);var s=e&&l.deps===null&&l.first===null&&l.nodes_start===null&&l.teardown===null&&(l.f&(Tt|U))===0;if(!s&&r&&(a!==null&&hn(l,a),u!==null&&(u.f&y)!==0)){var i=u;(i.effects??=[]).push(l)}return l}function Re(t){const n=F(Q,null,!1);return g(n,v),n.teardown=t,n}function ke(t){Pt();var n=o!==null&&(o.f&I)!==0&&f!==null&&!f.m;if(n){var e=f;(e.e??=[]).push({fn:t,effect:o,reaction:u})}else{var r=Ft(t);return r}}function De(t){return Pt(),ft(t)}function Oe(t){const n=F(P,t,!0);return(e={})=>new Promise(r=>{e.outro?yn(n,()=>{S(n),r(void 0)}):(S(n),r(void 0))})}function Ft(t){return F(wt,t,!1)}function Se(t,n){var e=f,r={effect:null,ran:!1};e.l.r1.push(r),r.effect=ft(()=>{t(),!r.ran&&(r.ran=!0,kt(e.l.r2,!0),Sn(n))})}function Ne(){var t=f;ft(()=>{if(_t(t.l.r2)){for(var n of t.l.r1){var e=n.effect;(e.f&v)!==0&&g(e,N),L(e)&&et(e),n.ran=!1}t.l.r2.v=!1}})}function ft(t){return F(Q,t,!0)}function be(t,n=[],e=Nt){const r=n.map(e);return dn(()=>t(...r.map(_t)))}function dn(t,n=0){return F(Q|ut|n,t,!0)}function Ce(t,n=!0){return F(Q|I,t,!0,n)}function Lt(t){var n=t.teardown;if(n!==null){const e=it,r=u;Et(!0),Z(null);try{n.call(null)}finally{Et(e),Z(r)}}}function Mt(t,n=!1){var e=t.first;for(t.first=t.last=null;e!==null;){var r=e.next;(e.f&P)!==0?e.parent=null:S(e,n),e=r}}function En(t){for(var n=t.first;n!==null;){var e=n.next;(n.f&I)===0&&S(n),n=e}}function S(t,n=!0){var e=!1;if((n||(t.f&Wt)!==0)&&t.nodes_start!==null){for(var r=t.nodes_start,a=t.nodes_end;r!==null;){var l=r===a?null:b(r);r.remove(),r=l}e=!0}Mt(t,n&&!e),J(t,0),g(t,W);var s=t.transitions;if(s!==null)for(const _ of s)_.stop();Lt(t);var i=t.parent;i!==null&&i.first!==null&&qt(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function qt(t){var n=t.parent,e=t.prev,r=t.next;e!==null&&(e.next=r),r!==null&&(r.prev=e),n!==null&&(n.first===t&&(n.first=r),n.last===t&&(n.last=e))}function yn(t,n){var e=[];Yt(t,e,!0),wn(e,()=>{S(t),n&&n()})}function wn(t,n){var e=t.length;if(e>0){var r=()=>--e||n();for(var a of t)a.out(r)}else n()}function Yt(t,n,e){if((t.f&C)===0){if(t.f^=C,t.transitions!==null)for(const s of t.transitions)(s.is_global||e)&&n.push(s);for(var r=t.first;r!==null;){var a=r.next,l=(r.f&gt)!==0||(r.f&I)!==0;Yt(r,n,l?e:!1),r=a}}}function Pe(t){Ht(t,!0)}function Ht(t,n){if((t.f&C)!==0){t.f^=C,(t.f&v)===0&&(t.f^=v),L(t)&&(g(t,k),rt(t));for(var e=t.first;e!==null;){var r=e.next,a=(e.f&gt)!==0||(e.f&I)!==0;Ht(e,a?n:!1),e=r}if(t.transitions!==null)for(const l of t.transitions)(l.is_global||n)&&l.in()}}const gn=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let Y=[],H=[];function jt(){var t=Y;Y=[],yt(t)}function Bt(){var t=H;H=[],yt(t)}function Fe(t){Y.length===0&&queueMicrotask(jt),Y.push(t)}function Le(t){H.length===0&&gn(Bt),H.push(t)}function dt(){Y.length>0&&jt(),H.length>0&&Bt()}let B=!1,G=!1,K=null,D=!1,it=!1;function Et(t){it=t}let M=[];let u=null,E=!1;function Z(t){u=t}let o=null;function $(t){o=t}let A=null;function Tn(t){A=t}let c=null,h=0,x=null;function mn(t){x=t}let Ut=1,z=0,R=!1;function Vt(){return++Ut}function L(t){var n=t.f;if((n&k)!==0)return!0;if((n&N)!==0){var e=t.deps,r=(n&d)!==0;if(e!==null){var a,l,s=(n&V)!==0,i=r&&o!==null&&!R,_=e.length;if(s||i){var T=t,j=T.parent;for(a=0;a<_;a++)l=e[a],(s||!l?.reactions?.includes(T))&&(l.reactions??=[]).push(T);s&&(T.f^=V),i&&j!==null&&(j.f&d)===0&&(T.f^=d)}for(a=0;a<_;a++)if(l=e[a],L(l)&&Ct(l),l.wv>t.wv)return!0}(!r||o!==null&&!R)&&g(t,v)}return!1}function An(t,n){for(var e=n;e!==null;){if((e.f&U)!==0)try{e.fn(t);return}catch{e.f^=U}e=e.parent}throw B=!1,t}function xn(t){return(t.f&W)===0&&(t.parent===null||(t.parent.f&U)===0)}function nt(t,n,e,r){if(B){if(e===null&&(B=!1),xn(n))throw t;return}e!==null&&(B=!0);{An(t,n);return}}function Gt(t,n,e=!0){var r=t.reactions;if(r!==null)for(var a=0;a<r.length;a++){var l=r[a];(l.f&y)!==0?Gt(l,n,!1):n===l&&(e?g(l,k):(l.f&v)!==0&&g(l,N),rt(l))}}function Kt(t){var n=c,e=h,r=x,a=u,l=R,s=A,i=f,_=E,T=t.f;c=null,h=0,x=null,R=(T&d)!==0&&(E||!D||u===null),u=(T&(I|P))===0?t:null,A=null,pt(t.ctx),E=!1,z++;try{var j=(0,t.fn)(),m=t.deps;if(c!==null){var p;if(J(t,h),m!==null&&h>0)for(m.length=h+c.length,p=0;p<c.length;p++)m[h+p]=c[p];else t.deps=m=c;if(!R)for(p=h;p<m.length;p++)(m[p].reactions??=[]).push(t)}else m!==null&&h<m.length&&(J(t,h),m.length=h);if(tt()&&x!==null&&!E&&m!==null&&(t.f&(y|N|k))===0)for(p=0;p<x.length;p++)Gt(x[p],t);return a!==null&&z++,j}finally{c=n,h=e,x=r,u=a,R=l,A=s,pt(i),E=_}}function In(t,n){let e=n.reactions;if(e!==null){var r=$t.call(e,t);if(r!==-1){var a=e.length-1;a===0?e=n.reactions=null:(e[r]=e[a],e.pop())}}e===null&&(n.f&y)!==0&&(c===null||!c.includes(n))&&(g(n,N),(n.f&(d|V))===0&&(n.f^=V),bt(n),J(n,0))}function J(t,n){var e=t.deps;if(e!==null)for(var r=n;r<e.length;r++)In(t,e[r])}function et(t){var n=t.f;if((n&W)===0){g(t,v);var e=o,r=f,a=D;o=t,D=!0;try{(n&ut)!==0?En(t):Mt(t),Lt(t);var l=Kt(t);t.teardown=typeof l=="function"?l:null,t.wv=Ut;var s=t.deps,i}catch(_){nt(_,t,e,r||t.ctx)}finally{D=a,o=e}}}function Rn(){try{rn()}catch(t){if(K!==null)nt(t,K,null);else throw t}}function Zt(){var t=D;try{var n=0;for(D=!0;M.length>0;){n++>1e3&&Rn();var e=M,r=e.length;M=[];for(var a=0;a<r;a++){var l=Dn(e[a]);kn(l)}}}finally{G=!1,D=t,K=null}}function kn(t){var n=t.length;if(n!==0)for(var e=0;e<n;e++){var r=t[e];if((r.f&(W|C))===0)try{L(r)&&(et(r),r.deps===null&&r.first===null&&r.nodes_start===null&&(r.teardown===null?qt(r):r.fn=null))}catch(a){nt(a,r,null,r.ctx)}}}function rt(t){G||(G=!0,queueMicrotask(Zt));for(var n=K=t;n.parent!==null;){n=n.parent;var e=n.f;if((e&(P|I))!==0){if((e&v)===0)return;n.f^=v}}M.push(n)}function Dn(t){for(var n=[],e=t;e!==null;){var r=e.f,a=(r&(I|P))!==0,l=a&&(r&v)!==0;if(!l&&(r&C)===0){if((r&wt)!==0)n.push(e);else if(a)e.f^=v;else{var s=u;try{u=e,L(e)&&et(e)}catch(T){nt(T,e,null,e.ctx)}finally{u=s}}var i=e.first;if(i!==null){e=i;continue}}var _=e.parent;for(e=e.next;e===null&&_!==null;)e=_.next,_=_.parent}return n}function On(t){var n;for(dt();M.length>0;)G=!0,Zt(),dt();return n}async function Me(){await Promise.resolve(),On()}function _t(t){var n=t.f,e=(n&y)!==0;if(u!==null&&!E){A!==null&&A.includes(t)&&an();var r=u.deps;t.rv<z&&(t.rv=z,c===null&&r!==null&&r[h]===t?h++:c===null?c=[t]:(!R||!c.includes(t))&&c.push(t))}else if(e&&t.deps===null&&t.effects===null){var a=t,l=a.parent;l!==null&&(l.f&d)===0&&(a.f^=d)}return e&&(a=t,L(a)&&Ct(a)),t.v}function Sn(t){var n=E;try{return E=!0,t()}finally{E=n}}const Nn=-7169;function g(t,n){t.f=t.f&Nn|n}function qe(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(vt in t)st(t);else if(!Array.isArray(t))for(let n in t){const e=t[n];typeof e=="object"&&e&&vt in e&&st(e)}}}function st(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let r in t)try{st(t[r],n)}catch{}const e=Jt(t);if(e!==Object.prototype&&e!==Array.prototype&&e!==Map.prototype&&e!==Set.prototype&&e!==Date.prototype){const r=zt(e);for(let a in r){const l=r[a].get;if(l)try{l.call(t)}catch{}}}}}export{Pe as $,q as A,dn as B,Ce as C,yn as D,gt as E,kt as F,On as G,Pn as H,fn as I,ce as J,Me as K,Bn as L,Fn as M,Ln as N,ot as O,Zn as P,ct as Q,Kn as R,vt as S,se as T,oe as U,Jt as V,bn as W,sn as X,un as Y,we as Z,he as _,ke as a,Ft as a0,ft as a1,Fe as a2,Gn as a3,jn as a4,Ie as a5,ee as a6,At as a7,pe as a8,re as a9,S as aA,zn as aB,Xn as aC,Qn as aD,Wn as aE,Xt as aF,fe as aG,Un as aH,zt as aI,Le as aJ,ut as aK,Qt as aL,le as aM,qn as aN,Se as aO,ve as aP,Ne as aQ,ye as aR,ne as aa,te as ab,Mn as ac,ae as ad,Z as ae,$ as af,u as ag,Re as ah,Wt as ai,b as aj,ge as ak,xt as al,on as am,It as an,Vn as ao,xe as ap,Cn as aq,Oe as ar,tt as as,Yn as at,_n as au,pt as av,C as aw,Jn as ax,Yt as ay,wn as az,Sn as b,f as c,Hn as d,qe as e,me as f,_t as g,Nt as h,$n as i,_e as j,Te as k,X as l,Ee as m,at as n,lt as o,ie as p,cn as q,yt as r,Ae as s,be as t,De as u,o as v,ue as w,O as x,w as y,de as z};
