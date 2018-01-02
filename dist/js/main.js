// Check for jQuery.
if (typeof(jQuery) === 'undefined') {
  // Check if require is a defined function.
  if (typeof(require) === 'function') {
    jQuery = $ = require('jquery');
  // Else use the dollar sign alias.
  } else {
    jQuery = $;
  }
}

/*
 * jQuery Easing v1.4.0 - http://gsgd.co.uk/sandbox/jquery/easing/
 * Open source under the BSD License.
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * https://raw.github.com/gdsmith/jquery-easing/master/LICENSE
*/

(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(['jquery'], function ($) {
			return factory($);
		});
	} else if (typeof module === "object" && typeof module.exports === "object") {
		exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
})(function($){

// Preserve the original jQuery "swing" easing as "jswing"
$.easing['jswing'] = $.easing['swing'];

var pow = Math.pow,
	sqrt = Math.sqrt,
	sin = Math.sin,
	cos = Math.cos,
	PI = Math.PI,
	c1 = 1.70158,
	c2 = c1 * 1.525,
	c3 = c1 + 1,
	c4 = ( 2 * PI ) / 3,
	c5 = ( 2 * PI ) / 4.5;

// x is the fraction of animation progress, in the range 0..1
function bounceOut(x) {
	var n1 = 7.5625,
		d1 = 2.75;
	if ( x < 1/d1 ) {
		return n1*x*x;
	} else if ( x < 2/d1 ) {
		return n1*(x-=(1.5/d1))*x + .75;
	} else if ( x < 2.5/d1 ) {
		return n1*(x-=(2.25/d1))*x + .9375;
	} else {
		return n1*(x-=(2.625/d1))*x + .984375;
	}
}

$.extend( $.easing,
{
	def: 'easeOutQuad',
	swing: function (x) {
		return $.easing[$.easing.def](x);
	},
	easeInQuad: function (x) {
		return x * x;
	},
	easeOutQuad: function (x) {
		return 1 - ( 1 - x ) * ( 1 - x );
	},
	easeInOutQuad: function (x) {
		return x < 0.5 ?
			2 * x * x :
			1 - pow( -2 * x + 2, 2 ) / 2;
	},
	easeInCubic: function (x) {
		return x * x * x;
	},
	easeOutCubic: function (x) {
		return 1 - pow( 1 - x, 3 );
	},
	easeInOutCubic: function (x) {
		return x < 0.5 ?
			4 * x * x * x :
			1 - pow( -2 * x + 2, 3 ) / 2;
	},
	easeInQuart: function (x) {
		return x * x * x * x;
	},
	easeOutQuart: function (x) {
		return 1 - pow( 1 - x, 4 );
	},
	easeInOutQuart: function (x) {
		return x < 0.5 ?
			8 * x * x * x * x :
			1 - pow( -2 * x + 2, 4 ) / 2;
	},
	easeInQuint: function (x) {
		return x * x * x * x * x;
	},
	easeOutQuint: function (x) {
		return 1 - pow( 1 - x, 5 );
	},
	easeInOutQuint: function (x) {
		return x < 0.5 ?
			16 * x * x * x * x * x :
			1 - pow( -2 * x + 2, 5 ) / 2;
	},
	easeInSine: function (x) {
		return 1 - cos( x * PI/2 );
	},
	easeOutSine: function (x) {
		return sin( x * PI/2 );
	},
	easeInOutSine: function (x) {
		return -( cos( PI * x ) - 1 ) / 2;
	},
	easeInExpo: function (x) {
		return x === 0 ? 0 : pow( 2, 10 * x - 10 );
	},
	easeOutExpo: function (x) {
		return x === 1 ? 1 : 1 - pow( 2, -10 * x );
	},
	easeInOutExpo: function (x) {
		return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
			pow( 2, 20 * x - 10 ) / 2 :
			( 2 - pow( 2, -20 * x + 10 ) ) / 2;
	},
	easeInCirc: function (x) {
		return 1 - sqrt( 1 - pow( x, 2 ) );
	},
	easeOutCirc: function (x) {
		return sqrt( 1 - pow( x - 1, 2 ) );
	},
	easeInOutCirc: function (x) {
		return x < 0.5 ?
			( 1 - sqrt( 1 - pow( 2 * x, 2 ) ) ) / 2 :
			( sqrt( 1 - pow( -2 * x + 2, 2 ) ) + 1 ) / 2;
	},
	easeInElastic: function (x) {
		return x === 0 ? 0 : x === 1 ? 1 :
			-pow( 2, 10 * x - 10 ) * sin( ( x * 10 - 10.75 ) * c4 );
	},
	easeOutElastic: function (x) {
		return x === 0 ? 0 : x === 1 ? 1 :
			pow( 2, -10 * x ) * sin( ( x * 10 - 0.75 ) * c4 ) + 1;
	},
	easeInOutElastic: function (x) {
		return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
			-( pow( 2, 20 * x - 10 ) * sin( ( 20 * x - 11.125 ) * c5 )) / 2 :
			pow( 2, -20 * x + 10 ) * sin( ( 20 * x - 11.125 ) * c5 ) / 2 + 1;
	},
	easeInBack: function (x) {
		return c3 * x * x * x - c1 * x * x;
	},
	easeOutBack: function (x) {
		return 1 + c3 * pow( x - 1, 3 ) + c1 * pow( x - 1, 2 );
	},
	easeInOutBack: function (x) {
		return x < 0.5 ?
			( pow( 2 * x, 2 ) * ( ( c2 + 1 ) * 2 * x - c2 ) ) / 2 :
			( pow( 2 * x - 2, 2 ) *( ( c2 + 1 ) * ( x * 2 - 2 ) + c2 ) + 2 ) / 2;
	},
	easeInBounce: function (x) {
		return 1 - bounceOut( 1 - x );
	},
	easeOutBounce: bounceOut,
	easeInOutBounce: function (x) {
		return x < 0.5 ?
			( 1 - bounceOut( 1 - 2 * x ) ) / 2 :
			( 1 + bounceOut( 2 * x - 1 ) ) / 2;
	}
});

});
// Custom Easing
jQuery.extend( jQuery.easing,
{
  easeInOutMaterial: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return c/4*((t-=2)*t*t + 2) + b;
  }
});
/*! VelocityJS.org (1.2.3). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
/*! Note that this has been modified by Materialize to confirm that Velocity is not already being imported. */
jQuery.Velocity?console.log("Velocity is already loaded. You may be needlessly importing Velocity again; note that Materialize includes Velocity."):(!function(e){function t(e){var t=e.length,a=r.type(e);return"function"===a||r.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===a||0===t||"number"==typeof t&&t>0&&t-1 in e}if(!e.jQuery){var r=function(e,t){return new r.fn.init(e,t)};r.isWindow=function(e){return null!=e&&e==e.window},r.type=function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[i.call(e)]||"object":typeof e},r.isArray=Array.isArray||function(e){return"array"===r.type(e)},r.isPlainObject=function(e){var t;if(!e||"object"!==r.type(e)||e.nodeType||r.isWindow(e))return!1;try{if(e.constructor&&!o.call(e,"constructor")&&!o.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(a){return!1}for(t in e);return void 0===t||o.call(e,t)},r.each=function(e,r,a){var n,o=0,i=e.length,s=t(e);if(a){if(s)for(;i>o&&(n=r.apply(e[o],a),n!==!1);o++);else for(o in e)if(n=r.apply(e[o],a),n===!1)break}else if(s)for(;i>o&&(n=r.call(e[o],o,e[o]),n!==!1);o++);else for(o in e)if(n=r.call(e[o],o,e[o]),n===!1)break;return e},r.data=function(e,t,n){if(void 0===n){var o=e[r.expando],i=o&&a[o];if(void 0===t)return i;if(i&&t in i)return i[t]}else if(void 0!==t){var o=e[r.expando]||(e[r.expando]=++r.uuid);return a[o]=a[o]||{},a[o][t]=n,n}},r.removeData=function(e,t){var n=e[r.expando],o=n&&a[n];o&&r.each(t,function(e,t){delete o[t]})},r.extend=function(){var e,t,a,n,o,i,s=arguments[0]||{},l=1,u=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[l]||{},l++),"object"!=typeof s&&"function"!==r.type(s)&&(s={}),l===u&&(s=this,l--);u>l;l++)if(null!=(o=arguments[l]))for(n in o)e=s[n],a=o[n],s!==a&&(c&&a&&(r.isPlainObject(a)||(t=r.isArray(a)))?(t?(t=!1,i=e&&r.isArray(e)?e:[]):i=e&&r.isPlainObject(e)?e:{},s[n]=r.extend(c,i,a)):void 0!==a&&(s[n]=a));return s},r.queue=function(e,a,n){function o(e,r){var a=r||[];return null!=e&&(t(Object(e))?!function(e,t){for(var r=+t.length,a=0,n=e.length;r>a;)e[n++]=t[a++];if(r!==r)for(;void 0!==t[a];)e[n++]=t[a++];return e.length=n,e}(a,"string"==typeof e?[e]:e):[].push.call(a,e)),a}if(e){a=(a||"fx")+"queue";var i=r.data(e,a);return n?(!i||r.isArray(n)?i=r.data(e,a,o(n)):i.push(n),i):i||[]}},r.dequeue=function(e,t){r.each(e.nodeType?[e]:e,function(e,a){t=t||"fx";var n=r.queue(a,t),o=n.shift();"inprogress"===o&&(o=n.shift()),o&&("fx"===t&&n.unshift("inprogress"),o.call(a,function(){r.dequeue(a,t)}))})},r.fn=r.prototype={init:function(e){if(e.nodeType)return this[0]=e,this;throw new Error("Not a DOM node.")},offset:function(){var t=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:t.top+(e.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:t.left+(e.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function e(){for(var e=this.offsetParent||document;e&&"html"===!e.nodeType.toLowerCase&&"static"===e.style.position;)e=e.offsetParent;return e||document}var t=this[0],e=e.apply(t),a=this.offset(),n=/^(?:body|html)$/i.test(e.nodeName)?{top:0,left:0}:r(e).offset();return a.top-=parseFloat(t.style.marginTop)||0,a.left-=parseFloat(t.style.marginLeft)||0,e.style&&(n.top+=parseFloat(e.style.borderTopWidth)||0,n.left+=parseFloat(e.style.borderLeftWidth)||0),{top:a.top-n.top,left:a.left-n.left}}};var a={};r.expando="velocity"+(new Date).getTime(),r.uuid=0;for(var n={},o=n.hasOwnProperty,i=n.toString,s="Boolean Number String Function Array Date RegExp Object Error".split(" "),l=0;l<s.length;l++)n["[object "+s[l]+"]"]=s[l].toLowerCase();r.fn.init.prototype=r.fn,e.Velocity={Utilities:r}}}(window),function(e){"object"==typeof module&&"object"==typeof module.exports?module.exports=e():"function"==typeof define&&define.amd?define(e):e()}(function(){return function(e,t,r,a){function n(e){for(var t=-1,r=e?e.length:0,a=[];++t<r;){var n=e[t];n&&a.push(n)}return a}function o(e){return m.isWrapped(e)?e=[].slice.call(e):m.isNode(e)&&(e=[e]),e}function i(e){var t=f.data(e,"velocity");return null===t?a:t}function s(e){return function(t){return Math.round(t*e)*(1/e)}}function l(e,r,a,n){function o(e,t){return 1-3*t+3*e}function i(e,t){return 3*t-6*e}function s(e){return 3*e}function l(e,t,r){return((o(t,r)*e+i(t,r))*e+s(t))*e}function u(e,t,r){return 3*o(t,r)*e*e+2*i(t,r)*e+s(t)}function c(t,r){for(var n=0;m>n;++n){var o=u(r,e,a);if(0===o)return r;var i=l(r,e,a)-t;r-=i/o}return r}function p(){for(var t=0;b>t;++t)w[t]=l(t*x,e,a)}function f(t,r,n){var o,i,s=0;do i=r+(n-r)/2,o=l(i,e,a)-t,o>0?n=i:r=i;while(Math.abs(o)>h&&++s<v);return i}function d(t){for(var r=0,n=1,o=b-1;n!=o&&w[n]<=t;++n)r+=x;--n;var i=(t-w[n])/(w[n+1]-w[n]),s=r+i*x,l=u(s,e,a);return l>=y?c(t,s):0==l?s:f(t,r,r+x)}function g(){V=!0,(e!=r||a!=n)&&p()}var m=4,y=.001,h=1e-7,v=10,b=11,x=1/(b-1),S="Float32Array"in t;if(4!==arguments.length)return!1;for(var P=0;4>P;++P)if("number"!=typeof arguments[P]||isNaN(arguments[P])||!isFinite(arguments[P]))return!1;e=Math.min(e,1),a=Math.min(a,1),e=Math.max(e,0),a=Math.max(a,0);var w=S?new Float32Array(b):new Array(b),V=!1,C=function(t){return V||g(),e===r&&a===n?t:0===t?0:1===t?1:l(d(t),r,n)};C.getControlPoints=function(){return[{x:e,y:r},{x:a,y:n}]};var T="generateBezier("+[e,r,a,n]+")";return C.toString=function(){return T},C}function u(e,t){var r=e;return m.isString(e)?b.Easings[e]||(r=!1):r=m.isArray(e)&&1===e.length?s.apply(null,e):m.isArray(e)&&2===e.length?x.apply(null,e.concat([t])):m.isArray(e)&&4===e.length?l.apply(null,e):!1,r===!1&&(r=b.Easings[b.defaults.easing]?b.defaults.easing:v),r}function c(e){if(e){var t=(new Date).getTime(),r=b.State.calls.length;r>1e4&&(b.State.calls=n(b.State.calls));for(var o=0;r>o;o++)if(b.State.calls[o]){var s=b.State.calls[o],l=s[0],u=s[2],d=s[3],g=!!d,y=null;d||(d=b.State.calls[o][3]=t-16);for(var h=Math.min((t-d)/u.duration,1),v=0,x=l.length;x>v;v++){var P=l[v],V=P.element;if(i(V)){var C=!1;if(u.display!==a&&null!==u.display&&"none"!==u.display){if("flex"===u.display){var T=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];f.each(T,function(e,t){S.setPropertyValue(V,"display",t)})}S.setPropertyValue(V,"display",u.display)}u.visibility!==a&&"hidden"!==u.visibility&&S.setPropertyValue(V,"visibility",u.visibility);for(var k in P)if("element"!==k){var A,F=P[k],j=m.isString(F.easing)?b.Easings[F.easing]:F.easing;if(1===h)A=F.endValue;else{var E=F.endValue-F.startValue;if(A=F.startValue+E*j(h,u,E),!g&&A===F.currentValue)continue}if(F.currentValue=A,"tween"===k)y=A;else{if(S.Hooks.registered[k]){var H=S.Hooks.getRoot(k),N=i(V).rootPropertyValueCache[H];N&&(F.rootPropertyValue=N)}var L=S.setPropertyValue(V,k,F.currentValue+(0===parseFloat(A)?"":F.unitType),F.rootPropertyValue,F.scrollData);S.Hooks.registered[k]&&(i(V).rootPropertyValueCache[H]=S.Normalizations.registered[H]?S.Normalizations.registered[H]("extract",null,L[1]):L[1]),"transform"===L[0]&&(C=!0)}}u.mobileHA&&i(V).transformCache.translate3d===a&&(i(V).transformCache.translate3d="(0px, 0px, 0px)",C=!0),C&&S.flushTransformCache(V)}}u.display!==a&&"none"!==u.display&&(b.State.calls[o][2].display=!1),u.visibility!==a&&"hidden"!==u.visibility&&(b.State.calls[o][2].visibility=!1),u.progress&&u.progress.call(s[1],s[1],h,Math.max(0,d+u.duration-t),d,y),1===h&&p(o)}}b.State.isTicking&&w(c)}function p(e,t){if(!b.State.calls[e])return!1;for(var r=b.State.calls[e][0],n=b.State.calls[e][1],o=b.State.calls[e][2],s=b.State.calls[e][4],l=!1,u=0,c=r.length;c>u;u++){var p=r[u].element;if(t||o.loop||("none"===o.display&&S.setPropertyValue(p,"display",o.display),"hidden"===o.visibility&&S.setPropertyValue(p,"visibility",o.visibility)),o.loop!==!0&&(f.queue(p)[1]===a||!/\.velocityQueueEntryFlag/i.test(f.queue(p)[1]))&&i(p)){i(p).isAnimating=!1,i(p).rootPropertyValueCache={};var d=!1;f.each(S.Lists.transforms3D,function(e,t){var r=/^scale/.test(t)?1:0,n=i(p).transformCache[t];i(p).transformCache[t]!==a&&new RegExp("^\\("+r+"[^.]").test(n)&&(d=!0,delete i(p).transformCache[t])}),o.mobileHA&&(d=!0,delete i(p).transformCache.translate3d),d&&S.flushTransformCache(p),S.Values.removeClass(p,"velocity-animating")}if(!t&&o.complete&&!o.loop&&u===c-1)try{o.complete.call(n,n)}catch(g){setTimeout(function(){throw g},1)}s&&o.loop!==!0&&s(n),i(p)&&o.loop===!0&&!t&&(f.each(i(p).tweensContainer,function(e,t){/^rotate/.test(e)&&360===parseFloat(t.endValue)&&(t.endValue=0,t.startValue=360),/^backgroundPosition/.test(e)&&100===parseFloat(t.endValue)&&"%"===t.unitType&&(t.endValue=0,t.startValue=100)}),b(p,"reverse",{loop:!0,delay:o.delay})),o.queue!==!1&&f.dequeue(p,o.queue)}b.State.calls[e]=!1;for(var m=0,y=b.State.calls.length;y>m;m++)if(b.State.calls[m]!==!1){l=!0;break}l===!1&&(b.State.isTicking=!1,delete b.State.calls,b.State.calls=[])}var f,d=function(){if(r.documentMode)return r.documentMode;for(var e=7;e>4;e--){var t=r.createElement("div");if(t.innerHTML="<!--[if IE "+e+"]><span></span><![endif]-->",t.getElementsByTagName("span").length)return t=null,e}return a}(),g=function(){var e=0;return t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||function(t){var r,a=(new Date).getTime();return r=Math.max(0,16-(a-e)),e=a+r,setTimeout(function(){t(a+r)},r)}}(),m={isString:function(e){return"string"==typeof e},isArray:Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},isFunction:function(e){return"[object Function]"===Object.prototype.toString.call(e)},isNode:function(e){return e&&e.nodeType},isNodeList:function(e){return"object"==typeof e&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e))&&e.length!==a&&(0===e.length||"object"==typeof e[0]&&e[0].nodeType>0)},isWrapped:function(e){return e&&(e.jquery||t.Zepto&&t.Zepto.zepto.isZ(e))},isSVG:function(e){return t.SVGElement&&e instanceof t.SVGElement},isEmptyObject:function(e){for(var t in e)return!1;return!0}},y=!1;if(e.fn&&e.fn.jquery?(f=e,y=!0):f=t.Velocity.Utilities,8>=d&&!y)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(7>=d)return void(jQuery.fn.velocity=jQuery.fn.animate);var h=400,v="swing",b={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:t.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:r.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:f,Redirects:{},Easings:{},Promise:t.Promise,defaults:{queue:"",duration:h,easing:v,begin:a,complete:a,progress:a,display:a,visibility:a,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},init:function(e){f.data(e,"velocity",{isSVG:m.isSVG(e),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:2,patch:2},debug:!1};t.pageYOffset!==a?(b.State.scrollAnchor=t,b.State.scrollPropertyLeft="pageXOffset",b.State.scrollPropertyTop="pageYOffset"):(b.State.scrollAnchor=r.documentElement||r.body.parentNode||r.body,b.State.scrollPropertyLeft="scrollLeft",b.State.scrollPropertyTop="scrollTop");var x=function(){function e(e){return-e.tension*e.x-e.friction*e.v}function t(t,r,a){var n={x:t.x+a.dx*r,v:t.v+a.dv*r,tension:t.tension,friction:t.friction};return{dx:n.v,dv:e(n)}}function r(r,a){var n={dx:r.v,dv:e(r)},o=t(r,.5*a,n),i=t(r,.5*a,o),s=t(r,a,i),l=1/6*(n.dx+2*(o.dx+i.dx)+s.dx),u=1/6*(n.dv+2*(o.dv+i.dv)+s.dv);return r.x=r.x+l*a,r.v=r.v+u*a,r}return function a(e,t,n){var o,i,s,l={x:-1,v:0,tension:null,friction:null},u=[0],c=0,p=1e-4,f=.016;for(e=parseFloat(e)||500,t=parseFloat(t)||20,n=n||null,l.tension=e,l.friction=t,o=null!==n,o?(c=a(e,t),i=c/n*f):i=f;s=r(s||l,i),u.push(1+s.x),c+=16,Math.abs(s.x)>p&&Math.abs(s.v)>p;);return o?function(e){return u[e*(u.length-1)|0]}:c}}();b.Easings={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},spring:function(e){return 1-Math.cos(4.5*e*Math.PI)*Math.exp(6*-e)}},f.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(e,t){b.Easings[t[0]]=l.apply(null,t[1])});var S=b.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var e=0;e<S.Lists.colors.length;e++){var t="color"===S.Lists.colors[e]?"0 0 0 1":"255 255 255 1";S.Hooks.templates[S.Lists.colors[e]]=["Red Green Blue Alpha",t]}var r,a,n;if(d)for(r in S.Hooks.templates){a=S.Hooks.templates[r],n=a[0].split(" ");var o=a[1].match(S.RegEx.valueSplit);"Color"===n[0]&&(n.push(n.shift()),o.push(o.shift()),S.Hooks.templates[r]=[n.join(" "),o.join(" ")])}for(r in S.Hooks.templates){a=S.Hooks.templates[r],n=a[0].split(" ");for(var e in n){var i=r+n[e],s=e;S.Hooks.registered[i]=[r,s]}}},getRoot:function(e){var t=S.Hooks.registered[e];return t?t[0]:e},cleanRootPropertyValue:function(e,t){return S.RegEx.valueUnwrap.test(t)&&(t=t.match(S.RegEx.valueUnwrap)[1]),S.Values.isCSSNullValue(t)&&(t=S.Hooks.templates[e][1]),t},extractValue:function(e,t){var r=S.Hooks.registered[e];if(r){var a=r[0],n=r[1];return t=S.Hooks.cleanRootPropertyValue(a,t),t.toString().match(S.RegEx.valueSplit)[n]}return t},injectValue:function(e,t,r){var a=S.Hooks.registered[e];if(a){var n,o,i=a[0],s=a[1];return r=S.Hooks.cleanRootPropertyValue(i,r),n=r.toString().match(S.RegEx.valueSplit),n[s]=t,o=n.join(" ")}return r}},Normalizations:{registered:{clip:function(e,t,r){switch(e){case"name":return"clip";case"extract":var a;return S.RegEx.wrappedValueAlreadyExtracted.test(r)?a=r:(a=r.toString().match(S.RegEx.valueUnwrap),a=a?a[1].replace(/,(\s+)?/g," "):r),a;case"inject":return"rect("+r+")"}},blur:function(e,t,r){switch(e){case"name":return b.State.isFirefox?"filter":"-webkit-filter";case"extract":var a=parseFloat(r);if(!a&&0!==a){var n=r.toString().match(/blur\(([0-9]+[A-z]+)\)/i);a=n?n[1]:0}return a;case"inject":return parseFloat(r)?"blur("+r+")":"none"}},opacity:function(e,t,r){if(8>=d)switch(e){case"name":return"filter";case"extract":var a=r.toString().match(/alpha\(opacity=(.*)\)/i);return r=a?a[1]/100:1;case"inject":return t.style.zoom=1,parseFloat(r)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(r),10)+")"}else switch(e){case"name":return"opacity";case"extract":return r;case"inject":return r}}},register:function(){9>=d||b.State.isGingerbread||(S.Lists.transformsBase=S.Lists.transformsBase.concat(S.Lists.transforms3D));for(var e=0;e<S.Lists.transformsBase.length;e++)!function(){var t=S.Lists.transformsBase[e];S.Normalizations.registered[t]=function(e,r,n){switch(e){case"name":return"transform";case"extract":return i(r)===a||i(r).transformCache[t]===a?/^scale/i.test(t)?1:0:i(r).transformCache[t].replace(/[()]/g,"");case"inject":var o=!1;switch(t.substr(0,t.length-1)){case"translate":o=!/(%|px|em|rem|vw|vh|\d)$/i.test(n);break;case"scal":case"scale":b.State.isAndroid&&i(r).transformCache[t]===a&&1>n&&(n=1),o=!/(\d)$/i.test(n);break;case"skew":o=!/(deg|\d)$/i.test(n);break;case"rotate":o=!/(deg|\d)$/i.test(n)}return o||(i(r).transformCache[t]="("+n+")"),i(r).transformCache[t]}}}();for(var e=0;e<S.Lists.colors.length;e++)!function(){var t=S.Lists.colors[e];S.Normalizations.registered[t]=function(e,r,n){switch(e){case"name":return t;case"extract":var o;if(S.RegEx.wrappedValueAlreadyExtracted.test(n))o=n;else{var i,s={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(n)?i=s[n]!==a?s[n]:s.black:S.RegEx.isHex.test(n)?i="rgb("+S.Values.hexToRgb(n).join(" ")+")":/^rgba?\(/i.test(n)||(i=s.black),o=(i||n).toString().match(S.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return 8>=d||3!==o.split(" ").length||(o+=" 1"),o;case"inject":return 8>=d?4===n.split(" ").length&&(n=n.split(/\s+/).slice(0,3).join(" ")):3===n.split(" ").length&&(n+=" 1"),(8>=d?"rgb":"rgba")+"("+n.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})},SVGAttribute:function(e){var t="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(d||b.State.isAndroid&&!b.State.isChrome)&&(t+="|transform"),new RegExp("^("+t+")$","i").test(e)},prefixCheck:function(e){if(b.State.prefixMatches[e])return[b.State.prefixMatches[e],!0];for(var t=["","Webkit","Moz","ms","O"],r=0,a=t.length;a>r;r++){var n;if(n=0===r?e:t[r]+e.replace(/^\w/,function(e){return e.toUpperCase()}),m.isString(b.State.prefixElement.style[n]))return b.State.prefixMatches[e]=n,[n,!0]}return[e,!1]}},Values:{hexToRgb:function(e){var t,r=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return e=e.replace(r,function(e,t,r,a){return t+t+r+r+a+a}),t=a.exec(e),t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:[0,0,0]},isCSSNullValue:function(e){return 0==e||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)},getUnitType:function(e){return/^(rotate|skew)/i.test(e)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e)?"":"px"},getDisplayType:function(e){var t=e&&e.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t)?"inline":/^(li)$/i.test(t)?"list-item":/^(tr)$/i.test(t)?"table-row":/^(table)$/i.test(t)?"table":/^(tbody)$/i.test(t)?"table-row-group":"block"},addClass:function(e,t){e.classList?e.classList.add(t):e.className+=(e.className.length?" ":"")+t},removeClass:function(e,t){e.classList?e.classList.remove(t):e.className=e.className.toString().replace(new RegExp("(^|\\s)"+t.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(e,r,n,o){function s(e,r){function n(){u&&S.setPropertyValue(e,"display","none")}var l=0;if(8>=d)l=f.css(e,r);else{var u=!1;if(/^(width|height)$/.test(r)&&0===S.getPropertyValue(e,"display")&&(u=!0,S.setPropertyValue(e,"display",S.Values.getDisplayType(e))),!o){if("height"===r&&"border-box"!==S.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var c=e.offsetHeight-(parseFloat(S.getPropertyValue(e,"borderTopWidth"))||0)-(parseFloat(S.getPropertyValue(e,"borderBottomWidth"))||0)-(parseFloat(S.getPropertyValue(e,"paddingTop"))||0)-(parseFloat(S.getPropertyValue(e,"paddingBottom"))||0);return n(),c}if("width"===r&&"border-box"!==S.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var p=e.offsetWidth-(parseFloat(S.getPropertyValue(e,"borderLeftWidth"))||0)-(parseFloat(S.getPropertyValue(e,"borderRightWidth"))||0)-(parseFloat(S.getPropertyValue(e,"paddingLeft"))||0)-(parseFloat(S.getPropertyValue(e,"paddingRight"))||0);return n(),p}}var g;g=i(e)===a?t.getComputedStyle(e,null):i(e).computedStyle?i(e).computedStyle:i(e).computedStyle=t.getComputedStyle(e,null),"borderColor"===r&&(r="borderTopColor"),l=9===d&&"filter"===r?g.getPropertyValue(r):g[r],(""===l||null===l)&&(l=e.style[r]),n()}if("auto"===l&&/^(top|right|bottom|left)$/i.test(r)){var m=s(e,"position");("fixed"===m||"absolute"===m&&/top|left/i.test(r))&&(l=f(e).position()[r]+"px")}return l}var l;if(S.Hooks.registered[r]){var u=r,c=S.Hooks.getRoot(u);n===a&&(n=S.getPropertyValue(e,S.Names.prefixCheck(c)[0])),S.Normalizations.registered[c]&&(n=S.Normalizations.registered[c]("extract",e,n)),l=S.Hooks.extractValue(u,n)}else if(S.Normalizations.registered[r]){var p,g;p=S.Normalizations.registered[r]("name",e),"transform"!==p&&(g=s(e,S.Names.prefixCheck(p)[0]),S.Values.isCSSNullValue(g)&&S.Hooks.templates[r]&&(g=S.Hooks.templates[r][1])),l=S.Normalizations.registered[r]("extract",e,g)}if(!/^[\d-]/.test(l))if(i(e)&&i(e).isSVG&&S.Names.SVGAttribute(r))if(/^(height|width)$/i.test(r))try{l=e.getBBox()[r]}catch(m){l=0}else l=e.getAttribute(r);else l=s(e,S.Names.prefixCheck(r)[0]);return S.Values.isCSSNullValue(l)&&(l=0),b.debug>=2&&console.log("Get "+r+": "+l),l},setPropertyValue:function(e,r,a,n,o){var s=r;if("scroll"===r)o.container?o.container["scroll"+o.direction]=a:"Left"===o.direction?t.scrollTo(a,o.alternateValue):t.scrollTo(o.alternateValue,a);else if(S.Normalizations.registered[r]&&"transform"===S.Normalizations.registered[r]("name",e))S.Normalizations.registered[r]("inject",e,a),s="transform",a=i(e).transformCache[r];else{if(S.Hooks.registered[r]){var l=r,u=S.Hooks.getRoot(r);n=n||S.getPropertyValue(e,u),a=S.Hooks.injectValue(l,a,n),r=u}if(S.Normalizations.registered[r]&&(a=S.Normalizations.registered[r]("inject",e,a),r=S.Normalizations.registered[r]("name",e)),s=S.Names.prefixCheck(r)[0],8>=d)try{e.style[s]=a}catch(c){b.debug&&console.log("Browser does not support ["+a+"] for ["+s+"]")}else i(e)&&i(e).isSVG&&S.Names.SVGAttribute(r)?e.setAttribute(r,a):e.style[s]=a;b.debug>=2&&console.log("Set "+r+" ("+s+"): "+a)}return[s,a]},flushTransformCache:function(e){function t(t){return parseFloat(S.getPropertyValue(e,t))}var r="";if((d||b.State.isAndroid&&!b.State.isChrome)&&i(e).isSVG){var a={translate:[t("translateX"),t("translateY")],skewX:[t("skewX")],skewY:[t("skewY")],scale:1!==t("scale")?[t("scale"),t("scale")]:[t("scaleX"),t("scaleY")],rotate:[t("rotateZ"),0,0]};f.each(i(e).transformCache,function(e){/^translate/i.test(e)?e="translate":/^scale/i.test(e)?e="scale":/^rotate/i.test(e)&&(e="rotate"),a[e]&&(r+=e+"("+a[e].join(" ")+") ",delete a[e])})}else{var n,o;f.each(i(e).transformCache,function(t){return n=i(e).transformCache[t],"transformPerspective"===t?(o=n,!0):(9===d&&"rotateZ"===t&&(t="rotate"),void(r+=t+n+" "))}),o&&(r="perspective"+o+" "+r)}S.setPropertyValue(e,"transform",r)}};S.Hooks.register(),S.Normalizations.register(),b.hook=function(e,t,r){var n=a;return e=o(e),f.each(e,function(e,o){if(i(o)===a&&b.init(o),r===a)n===a&&(n=b.CSS.getPropertyValue(o,t));else{var s=b.CSS.setPropertyValue(o,t,r);"transform"===s[0]&&b.CSS.flushTransformCache(o),n=s}}),n};var P=function(){function e(){return s?k.promise||null:l}function n(){function e(e){function p(e,t){var r=a,n=a,i=a;return m.isArray(e)?(r=e[0],!m.isArray(e[1])&&/^[\d-]/.test(e[1])||m.isFunction(e[1])||S.RegEx.isHex.test(e[1])?i=e[1]:(m.isString(e[1])&&!S.RegEx.isHex.test(e[1])||m.isArray(e[1]))&&(n=t?e[1]:u(e[1],s.duration),e[2]!==a&&(i=e[2]))):r=e,t||(n=n||s.easing),m.isFunction(r)&&(r=r.call(o,V,w)),m.isFunction(i)&&(i=i.call(o,V,w)),[r||0,n,i]}function d(e,t){var r,a;return a=(t||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(e){return r=e,""}),r||(r=S.Values.getUnitType(e)),[a,r]}function h(){var e={myParent:o.parentNode||r.body,position:S.getPropertyValue(o,"position"),fontSize:S.getPropertyValue(o,"fontSize")},a=e.position===L.lastPosition&&e.myParent===L.lastParent,n=e.fontSize===L.lastFontSize;L.lastParent=e.myParent,L.lastPosition=e.position,L.lastFontSize=e.fontSize;var s=100,l={};if(n&&a)l.emToPx=L.lastEmToPx,l.percentToPxWidth=L.lastPercentToPxWidth,l.percentToPxHeight=L.lastPercentToPxHeight;else{var u=i(o).isSVG?r.createElementNS("http://www.w3.org/2000/svg","rect"):r.createElement("div");b.init(u),e.myParent.appendChild(u),f.each(["overflow","overflowX","overflowY"],function(e,t){b.CSS.setPropertyValue(u,t,"hidden")}),b.CSS.setPropertyValue(u,"position",e.position),b.CSS.setPropertyValue(u,"fontSize",e.fontSize),b.CSS.setPropertyValue(u,"boxSizing","content-box"),f.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(e,t){b.CSS.setPropertyValue(u,t,s+"%")}),b.CSS.setPropertyValue(u,"paddingLeft",s+"em"),l.percentToPxWidth=L.lastPercentToPxWidth=(parseFloat(S.getPropertyValue(u,"width",null,!0))||1)/s,l.percentToPxHeight=L.lastPercentToPxHeight=(parseFloat(S.getPropertyValue(u,"height",null,!0))||1)/s,l.emToPx=L.lastEmToPx=(parseFloat(S.getPropertyValue(u,"paddingLeft"))||1)/s,e.myParent.removeChild(u)}return null===L.remToPx&&(L.remToPx=parseFloat(S.getPropertyValue(r.body,"fontSize"))||16),null===L.vwToPx&&(L.vwToPx=parseFloat(t.innerWidth)/100,L.vhToPx=parseFloat(t.innerHeight)/100),l.remToPx=L.remToPx,l.vwToPx=L.vwToPx,l.vhToPx=L.vhToPx,b.debug>=1&&console.log("Unit ratios: "+JSON.stringify(l),o),l}if(s.begin&&0===V)try{s.begin.call(g,g)}catch(x){setTimeout(function(){throw x},1)}if("scroll"===A){var P,C,T,F=/^x$/i.test(s.axis)?"Left":"Top",j=parseFloat(s.offset)||0;s.container?m.isWrapped(s.container)||m.isNode(s.container)?(s.container=s.container[0]||s.container,P=s.container["scroll"+F],T=P+f(o).position()[F.toLowerCase()]+j):s.container=null:(P=b.State.scrollAnchor[b.State["scrollProperty"+F]],C=b.State.scrollAnchor[b.State["scrollProperty"+("Left"===F?"Top":"Left")]],T=f(o).offset()[F.toLowerCase()]+j),l={scroll:{rootPropertyValue:!1,startValue:P,currentValue:P,endValue:T,unitType:"",easing:s.easing,scrollData:{container:s.container,direction:F,alternateValue:C}},element:o},b.debug&&console.log("tweensContainer (scroll): ",l.scroll,o)}else if("reverse"===A){if(!i(o).tweensContainer)return void f.dequeue(o,s.queue);"none"===i(o).opts.display&&(i(o).opts.display="auto"),"hidden"===i(o).opts.visibility&&(i(o).opts.visibility="visible"),i(o).opts.loop=!1,i(o).opts.begin=null,i(o).opts.complete=null,v.easing||delete s.easing,v.duration||delete s.duration,s=f.extend({},i(o).opts,s);var E=f.extend(!0,{},i(o).tweensContainer);for(var H in E)if("element"!==H){var N=E[H].startValue;E[H].startValue=E[H].currentValue=E[H].endValue,E[H].endValue=N,m.isEmptyObject(v)||(E[H].easing=s.easing),b.debug&&console.log("reverse tweensContainer ("+H+"): "+JSON.stringify(E[H]),o)}l=E}else if("start"===A){var E;i(o).tweensContainer&&i(o).isAnimating===!0&&(E=i(o).tweensContainer),f.each(y,function(e,t){if(RegExp("^"+S.Lists.colors.join("$|^")+"$").test(e)){var r=p(t,!0),n=r[0],o=r[1],i=r[2];if(S.RegEx.isHex.test(n)){for(var s=["Red","Green","Blue"],l=S.Values.hexToRgb(n),u=i?S.Values.hexToRgb(i):a,c=0;c<s.length;c++){var f=[l[c]];o&&f.push(o),u!==a&&f.push(u[c]),y[e+s[c]]=f}delete y[e]}}});for(var z in y){var O=p(y[z]),q=O[0],$=O[1],M=O[2];z=S.Names.camelCase(z);var I=S.Hooks.getRoot(z),B=!1;if(i(o).isSVG||"tween"===I||S.Names.prefixCheck(I)[1]!==!1||S.Normalizations.registered[I]!==a){(s.display!==a&&null!==s.display&&"none"!==s.display||s.visibility!==a&&"hidden"!==s.visibility)&&/opacity|filter/.test(z)&&!M&&0!==q&&(M=0),s._cacheValues&&E&&E[z]?(M===a&&(M=E[z].endValue+E[z].unitType),B=i(o).rootPropertyValueCache[I]):S.Hooks.registered[z]?M===a?(B=S.getPropertyValue(o,I),M=S.getPropertyValue(o,z,B)):B=S.Hooks.templates[I][1]:M===a&&(M=S.getPropertyValue(o,z));var W,G,Y,D=!1;if(W=d(z,M),M=W[0],Y=W[1],W=d(z,q),q=W[0].replace(/^([+-\/*])=/,function(e,t){return D=t,""}),G=W[1],M=parseFloat(M)||0,q=parseFloat(q)||0,"%"===G&&(/^(fontSize|lineHeight)$/.test(z)?(q/=100,G="em"):/^scale/.test(z)?(q/=100,G=""):/(Red|Green|Blue)$/i.test(z)&&(q=q/100*255,G="")),/[\/*]/.test(D))G=Y;else if(Y!==G&&0!==M)if(0===q)G=Y;else{n=n||h();var Q=/margin|padding|left|right|width|text|word|letter/i.test(z)||/X$/.test(z)||"x"===z?"x":"y";switch(Y){case"%":M*="x"===Q?n.percentToPxWidth:n.percentToPxHeight;break;case"px":break;default:M*=n[Y+"ToPx"]}switch(G){case"%":M*=1/("x"===Q?n.percentToPxWidth:n.percentToPxHeight);break;case"px":break;default:M*=1/n[G+"ToPx"]}}switch(D){case"+":q=M+q;break;case"-":q=M-q;break;case"*":q=M*q;break;case"/":q=M/q}l[z]={rootPropertyValue:B,startValue:M,currentValue:M,endValue:q,unitType:G,easing:$},b.debug&&console.log("tweensContainer ("+z+"): "+JSON.stringify(l[z]),o)}else b.debug&&console.log("Skipping ["+I+"] due to a lack of browser support.")}l.element=o}l.element&&(S.Values.addClass(o,"velocity-animating"),R.push(l),""===s.queue&&(i(o).tweensContainer=l,i(o).opts=s),i(o).isAnimating=!0,V===w-1?(b.State.calls.push([R,g,s,null,k.resolver]),b.State.isTicking===!1&&(b.State.isTicking=!0,c())):V++)}var n,o=this,s=f.extend({},b.defaults,v),l={};switch(i(o)===a&&b.init(o),parseFloat(s.delay)&&s.queue!==!1&&f.queue(o,s.queue,function(e){b.velocityQueueEntryFlag=!0,i(o).delayTimer={setTimeout:setTimeout(e,parseFloat(s.delay)),next:e}}),s.duration.toString().toLowerCase()){case"fast":s.duration=200;break;case"normal":s.duration=h;break;case"slow":s.duration=600;break;default:s.duration=parseFloat(s.duration)||1}b.mock!==!1&&(b.mock===!0?s.duration=s.delay=1:(s.duration*=parseFloat(b.mock)||1,s.delay*=parseFloat(b.mock)||1)),s.easing=u(s.easing,s.duration),s.begin&&!m.isFunction(s.begin)&&(s.begin=null),s.progress&&!m.isFunction(s.progress)&&(s.progress=null),s.complete&&!m.isFunction(s.complete)&&(s.complete=null),s.display!==a&&null!==s.display&&(s.display=s.display.toString().toLowerCase(),"auto"===s.display&&(s.display=b.CSS.Values.getDisplayType(o))),s.visibility!==a&&null!==s.visibility&&(s.visibility=s.visibility.toString().toLowerCase()),s.mobileHA=s.mobileHA&&b.State.isMobile&&!b.State.isGingerbread,s.queue===!1?s.delay?setTimeout(e,s.delay):e():f.queue(o,s.queue,function(t,r){return r===!0?(k.promise&&k.resolver(g),!0):(b.velocityQueueEntryFlag=!0,void e(t))}),""!==s.queue&&"fx"!==s.queue||"inprogress"===f.queue(o)[0]||f.dequeue(o)}var s,l,d,g,y,v,x=arguments[0]&&(arguments[0].p||f.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||m.isString(arguments[0].properties));if(m.isWrapped(this)?(s=!1,d=0,g=this,l=this):(s=!0,d=1,g=x?arguments[0].elements||arguments[0].e:arguments[0]),g=o(g)){x?(y=arguments[0].properties||arguments[0].p,v=arguments[0].options||arguments[0].o):(y=arguments[d],v=arguments[d+1]);var w=g.length,V=0;if(!/^(stop|finish)$/i.test(y)&&!f.isPlainObject(v)){var C=d+1;v={};for(var T=C;T<arguments.length;T++)m.isArray(arguments[T])||!/^(fast|normal|slow)$/i.test(arguments[T])&&!/^\d/.test(arguments[T])?m.isString(arguments[T])||m.isArray(arguments[T])?v.easing=arguments[T]:m.isFunction(arguments[T])&&(v.complete=arguments[T]):v.duration=arguments[T]}var k={promise:null,resolver:null,rejecter:null};s&&b.Promise&&(k.promise=new b.Promise(function(e,t){k.resolver=e,k.rejecter=t}));var A;switch(y){case"scroll":A="scroll";break;case"reverse":A="reverse";break;case"finish":case"stop":f.each(g,function(e,t){i(t)&&i(t).delayTimer&&(clearTimeout(i(t).delayTimer.setTimeout),i(t).delayTimer.next&&i(t).delayTimer.next(),delete i(t).delayTimer)});var F=[];return f.each(b.State.calls,function(e,t){t&&f.each(t[1],function(r,n){var o=v===a?"":v;return o===!0||t[2].queue===o||v===a&&t[2].queue===!1?void f.each(g,function(r,a){a===n&&((v===!0||m.isString(v))&&(f.each(f.queue(a,m.isString(v)?v:""),function(e,t){
m.isFunction(t)&&t(null,!0)}),f.queue(a,m.isString(v)?v:"",[])),"stop"===y?(i(a)&&i(a).tweensContainer&&o!==!1&&f.each(i(a).tweensContainer,function(e,t){t.endValue=t.currentValue}),F.push(e)):"finish"===y&&(t[2].duration=1))}):!0})}),"stop"===y&&(f.each(F,function(e,t){p(t,!0)}),k.promise&&k.resolver(g)),e();default:if(!f.isPlainObject(y)||m.isEmptyObject(y)){if(m.isString(y)&&b.Redirects[y]){var j=f.extend({},v),E=j.duration,H=j.delay||0;return j.backwards===!0&&(g=f.extend(!0,[],g).reverse()),f.each(g,function(e,t){parseFloat(j.stagger)?j.delay=H+parseFloat(j.stagger)*e:m.isFunction(j.stagger)&&(j.delay=H+j.stagger.call(t,e,w)),j.drag&&(j.duration=parseFloat(E)||(/^(callout|transition)/.test(y)?1e3:h),j.duration=Math.max(j.duration*(j.backwards?1-e/w:(e+1)/w),.75*j.duration,200)),b.Redirects[y].call(t,t,j||{},e,w,g,k.promise?k:a)}),e()}var N="Velocity: First argument ("+y+") was not a property map, a known action, or a registered redirect. Aborting.";return k.promise?k.rejecter(new Error(N)):console.log(N),e()}A="start"}var L={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},R=[];f.each(g,function(e,t){m.isNode(t)&&n.call(t)});var z,j=f.extend({},b.defaults,v);if(j.loop=parseInt(j.loop),z=2*j.loop-1,j.loop)for(var O=0;z>O;O++){var q={delay:j.delay,progress:j.progress};O===z-1&&(q.display=j.display,q.visibility=j.visibility,q.complete=j.complete),P(g,"reverse",q)}return e()}};b=f.extend(P,b),b.animate=P;var w=t.requestAnimationFrame||g;return b.State.isMobile||r.hidden===a||r.addEventListener("visibilitychange",function(){r.hidden?(w=function(e){return setTimeout(function(){e(!0)},16)},c()):w=t.requestAnimationFrame||g}),e.Velocity=b,e!==t&&(e.fn.velocity=P,e.fn.velocity.defaults=b.defaults),f.each(["Down","Up"],function(e,t){b.Redirects["slide"+t]=function(e,r,n,o,i,s){var l=f.extend({},r),u=l.begin,c=l.complete,p={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},d={};l.display===a&&(l.display="Down"===t?"inline"===b.CSS.Values.getDisplayType(e)?"inline-block":"block":"none"),l.begin=function(){u&&u.call(i,i);for(var r in p){d[r]=e.style[r];var a=b.CSS.getPropertyValue(e,r);p[r]="Down"===t?[a,0]:[0,a]}d.overflow=e.style.overflow,e.style.overflow="hidden"},l.complete=function(){for(var t in d)e.style[t]=d[t];c&&c.call(i,i),s&&s.resolver(i)},b(e,p,l)}}),f.each(["In","Out"],function(e,t){b.Redirects["fade"+t]=function(e,r,n,o,i,s){var l=f.extend({},r),u={opacity:"In"===t?1:0},c=l.complete;l.complete=n!==o-1?l.begin=null:function(){c&&c.call(i,i),s&&s.resolver(i)},l.display===a&&(l.display="In"===t?"auto":"none"),b(this,u,l)}}),b}(window.jQuery||window.Zepto||window,window,document)}));

!function(a,b,c,d){"use strict";function k(a,b,c){return setTimeout(q(a,c),b)}function l(a,b,c){return Array.isArray(a)?(m(a,c[b],c),!0):!1}function m(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function n(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function o(a,b){return n(a,b,!0)}function p(a,b,c){var e,d=b.prototype;e=a.prototype=Object.create(d),e.constructor=a,e._super=d,c&&n(e,c)}function q(a,b){return function(){return a.apply(b,arguments)}}function r(a,b){return typeof a==g?a.apply(b?b[0]||d:d,b):a}function s(a,b){return a===d?b:a}function t(a,b,c){m(x(b),function(b){a.addEventListener(b,c,!1)})}function u(a,b,c){m(x(b),function(b){a.removeEventListener(b,c,!1)})}function v(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function w(a,b){return a.indexOf(b)>-1}function x(a){return a.trim().split(/\s+/g)}function y(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function z(a){return Array.prototype.slice.call(a,0)}function A(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];y(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function B(a,b){for(var c,f,g=b[0].toUpperCase()+b.slice(1),h=0;h<e.length;){if(c=e[h],f=c?c+g:b,f in a)return f;h++}return d}function D(){return C++}function E(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function ab(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){r(a.options.enable,[a])&&c.handler(b)},this.init()}function bb(a){var b,c=a.options.inputClass;return b=c?c:H?wb:I?Eb:G?Gb:rb,new b(a,cb)}function cb(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&O&&0===d-e,g=b&(Q|R)&&0===d-e;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,db(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function db(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=gb(b)),e>1&&!c.firstMultiple?c.firstMultiple=gb(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=hb(d);b.timeStamp=j(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=lb(h,i),b.distance=kb(h,i),eb(c,b),b.offsetDirection=jb(b.deltaX,b.deltaY),b.scale=g?nb(g.pointers,d):1,b.rotation=g?mb(g.pointers,d):0,fb(c,b);var k=a.element;v(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function eb(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===O||f.eventType===Q)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function fb(a,b){var f,g,h,j,c=a.lastInterval||b,e=b.timeStamp-c.timeStamp;if(b.eventType!=R&&(e>N||c.velocity===d)){var k=c.deltaX-b.deltaX,l=c.deltaY-b.deltaY,m=ib(e,k,l);g=m.x,h=m.y,f=i(m.x)>i(m.y)?m.x:m.y,j=jb(k,l),a.lastInterval=b}else f=c.velocity,g=c.velocityX,h=c.velocityY,j=c.direction;b.velocity=f,b.velocityX=g,b.velocityY=h,b.direction=j}function gb(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:h(a.pointers[c].clientX),clientY:h(a.pointers[c].clientY)},c++;return{timeStamp:j(),pointers:b,center:hb(b),deltaX:a.deltaX,deltaY:a.deltaY}}function hb(a){var b=a.length;if(1===b)return{x:h(a[0].clientX),y:h(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:h(c/b),y:h(d/b)}}function ib(a,b,c){return{x:b/a||0,y:c/a||0}}function jb(a,b){return a===b?S:i(a)>=i(b)?a>0?T:U:b>0?V:W}function kb(a,b,c){c||(c=$);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function lb(a,b,c){c||(c=$);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function mb(a,b){return lb(b[1],b[0],_)-lb(a[1],a[0],_)}function nb(a,b){return kb(b[0],b[1],_)/kb(a[0],a[1],_)}function rb(){this.evEl=pb,this.evWin=qb,this.allow=!0,this.pressed=!1,ab.apply(this,arguments)}function wb(){this.evEl=ub,this.evWin=vb,ab.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function Ab(){this.evTarget=yb,this.evWin=zb,this.started=!1,ab.apply(this,arguments)}function Bb(a,b){var c=z(a.touches),d=z(a.changedTouches);return b&(Q|R)&&(c=A(c.concat(d),"identifier",!0)),[c,d]}function Eb(){this.evTarget=Db,this.targetIds={},ab.apply(this,arguments)}function Fb(a,b){var c=z(a.touches),d=this.targetIds;if(b&(O|P)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=z(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return v(a.target,i)}),b===O)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Q|R)&&delete d[g[e].identifier],e++;return h.length?[A(f.concat(h),"identifier",!0),h]:void 0}function Gb(){ab.apply(this,arguments);var a=q(this.handler,this);this.touch=new Eb(this.manager,a),this.mouse=new rb(this.manager,a)}function Pb(a,b){this.manager=a,this.set(b)}function Qb(a){if(w(a,Mb))return Mb;var b=w(a,Nb),c=w(a,Ob);return b&&c?Nb+" "+Ob:b||c?b?Nb:Ob:w(a,Lb)?Lb:Kb}function Yb(a){this.id=D(),this.manager=null,this.options=o(a||{},this.defaults),this.options.enable=s(this.options.enable,!0),this.state=Rb,this.simultaneous={},this.requireFail=[]}function Zb(a){return a&Wb?"cancel":a&Ub?"end":a&Tb?"move":a&Sb?"start":""}function $b(a){return a==W?"down":a==V?"up":a==T?"left":a==U?"right":""}function _b(a,b){var c=b.manager;return c?c.get(a):a}function ac(){Yb.apply(this,arguments)}function bc(){ac.apply(this,arguments),this.pX=null,this.pY=null}function cc(){ac.apply(this,arguments)}function dc(){Yb.apply(this,arguments),this._timer=null,this._input=null}function ec(){ac.apply(this,arguments)}function fc(){ac.apply(this,arguments)}function gc(){Yb.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function hc(a,b){return b=b||{},b.recognizers=s(b.recognizers,hc.defaults.preset),new kc(a,b)}function kc(a,b){b=b||{},this.options=o(b,hc.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=bb(this),this.touchAction=new Pb(this,this.options.touchAction),lc(this,!0),m(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function lc(a,b){var c=a.element;m(a.options.cssProps,function(a,d){c.style[B(c.style,d)]=b?a:""})}function mc(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var e=["","webkit","moz","MS","ms","o"],f=b.createElement("div"),g="function",h=Math.round,i=Math.abs,j=Date.now,C=1,F=/mobile|tablet|ip(ad|hone|od)|android/i,G="ontouchstart"in a,H=B(a,"PointerEvent")!==d,I=G&&F.test(navigator.userAgent),J="touch",K="pen",L="mouse",M="kinect",N=25,O=1,P=2,Q=4,R=8,S=1,T=2,U=4,V=8,W=16,X=T|U,Y=V|W,Z=X|Y,$=["x","y"],_=["clientX","clientY"];ab.prototype={handler:function(){},init:function(){this.evEl&&t(this.element,this.evEl,this.domHandler),this.evTarget&&t(this.target,this.evTarget,this.domHandler),this.evWin&&t(E(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&u(this.element,this.evEl,this.domHandler),this.evTarget&&u(this.target,this.evTarget,this.domHandler),this.evWin&&u(E(this.element),this.evWin,this.domHandler)}};var ob={mousedown:O,mousemove:P,mouseup:Q},pb="mousedown",qb="mousemove mouseup";p(rb,ab,{handler:function(a){var b=ob[a.type];b&O&&0===a.button&&(this.pressed=!0),b&P&&1!==a.which&&(b=Q),this.pressed&&this.allow&&(b&Q&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:L,srcEvent:a}))}});var sb={pointerdown:O,pointermove:P,pointerup:Q,pointercancel:R,pointerout:R},tb={2:J,3:K,4:L,5:M},ub="pointerdown",vb="pointermove pointerup pointercancel";a.MSPointerEvent&&(ub="MSPointerDown",vb="MSPointerMove MSPointerUp MSPointerCancel"),p(wb,ab,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=sb[d],f=tb[a.pointerType]||a.pointerType,g=f==J,h=y(b,a.pointerId,"pointerId");e&O&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Q|R)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var xb={touchstart:O,touchmove:P,touchend:Q,touchcancel:R},yb="touchstart",zb="touchstart touchmove touchend touchcancel";p(Ab,ab,{handler:function(a){var b=xb[a.type];if(b===O&&(this.started=!0),this.started){var c=Bb.call(this,a,b);b&(Q|R)&&0===c[0].length-c[1].length&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:J,srcEvent:a})}}});var Cb={touchstart:O,touchmove:P,touchend:Q,touchcancel:R},Db="touchstart touchmove touchend touchcancel";p(Eb,ab,{handler:function(a){var b=Cb[a.type],c=Fb.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:J,srcEvent:a})}}),p(Gb,ab,{handler:function(a,b,c){var d=c.pointerType==J,e=c.pointerType==L;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Q|R)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Hb=B(f.style,"touchAction"),Ib=Hb!==d,Jb="compute",Kb="auto",Lb="manipulation",Mb="none",Nb="pan-x",Ob="pan-y";Pb.prototype={set:function(a){a==Jb&&(a=this.compute()),Ib&&(this.manager.element.style[Hb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return m(this.manager.recognizers,function(b){r(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),Qb(a.join(" "))},preventDefaults:function(a){if(!Ib){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return b.preventDefault(),void 0;var d=this.actions,e=w(d,Mb),f=w(d,Ob),g=w(d,Nb);return e||f&&c&X||g&&c&Y?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var Rb=1,Sb=2,Tb=4,Ub=8,Vb=Ub,Wb=16,Xb=32;Yb.prototype={defaults:{},set:function(a){return n(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(l(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_b(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return l(a,"dropRecognizeWith",this)?this:(a=_b(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(l(a,"requireFailure",this))return this;var b=this.requireFail;return a=_b(a,this),-1===y(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(l(a,"dropRequireFailure",this))return this;a=_b(a,this);var b=y(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function d(d){b.manager.emit(b.options.event+(d?Zb(c):""),a)}var b=this,c=this.state;Ub>c&&d(!0),d(),c>=Ub&&d(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):(this.state=Xb,void 0)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(Xb|Rb)))return!1;a++}return!0},recognize:function(a){var b=n({},a);return r(this.options.enable,[this,b])?(this.state&(Vb|Wb|Xb)&&(this.state=Rb),this.state=this.process(b),this.state&(Sb|Tb|Ub|Wb)&&this.tryEmit(b),void 0):(this.reset(),this.state=Xb,void 0)},process:function(){},getTouchAction:function(){},reset:function(){}},p(ac,Yb,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(Sb|Tb),e=this.attrTest(a);return d&&(c&R||!e)?b|Wb:d||e?c&Q?b|Ub:b&Sb?b|Tb:Sb:Xb}}),p(bc,ac,{defaults:{event:"pan",threshold:10,pointers:1,direction:Z},getTouchAction:function(){var a=this.options.direction,b=[];return a&X&&b.push(Ob),a&Y&&b.push(Nb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&X?(e=0===f?S:0>f?T:U,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?S:0>g?V:W,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return ac.prototype.attrTest.call(this,a)&&(this.state&Sb||!(this.state&Sb)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$b(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),p(cc,ac,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[Mb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&Sb)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),p(dc,Yb,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[Kb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,e=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Q|R)&&!e)this.reset();else if(a.eventType&O)this.reset(),this._timer=k(function(){this.state=Vb,this.tryEmit()},b.time,this);else if(a.eventType&Q)return Vb;return Xb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===Vb&&(a&&a.eventType&Q?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=j(),this.manager.emit(this.options.event,this._input)))}}),p(ec,ac,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[Mb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&Sb)}}),p(fc,ac,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:X|Y,pointers:1},getTouchAction:function(){return bc.prototype.getTouchAction.call(this)},attrTest:function(a){var c,b=this.options.direction;return b&(X|Y)?c=a.velocity:b&X?c=a.velocityX:b&Y&&(c=a.velocityY),this._super.attrTest.call(this,a)&&b&a.direction&&a.distance>this.options.threshold&&i(c)>this.options.velocity&&a.eventType&Q},emit:function(a){var b=$b(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),p(gc,Yb,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[Lb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,e=a.deltaTime<b.time;if(this.reset(),a.eventType&O&&0===this.count)return this.failTimeout();if(d&&e&&c){if(a.eventType!=Q)return this.failTimeout();var f=this.pTime?a.timeStamp-this.pTime<b.interval:!0,g=!this.pCenter||kb(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,g&&f?this.count+=1:this.count=1,this._input=a;var h=this.count%b.taps;if(0===h)return this.hasRequireFailures()?(this._timer=k(function(){this.state=Vb,this.tryEmit()},b.interval,this),Sb):Vb}return Xb},failTimeout:function(){return this._timer=k(function(){this.state=Xb},this.options.interval,this),Xb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==Vb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),hc.VERSION="2.0.4",hc.defaults={domEvents:!1,touchAction:Jb,enable:!0,inputTarget:null,inputClass:null,preset:[[ec,{enable:!1}],[cc,{enable:!1},["rotate"]],[fc,{direction:X}],[bc,{direction:X},["swipe"]],[gc],[gc,{event:"doubletap",taps:2},["tap"]],[dc]],cssProps:{userSelect:"default",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ic=1,jc=2;kc.prototype={set:function(a){return n(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?jc:ic},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&Vb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===jc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(Sb|Tb|Ub)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof Yb)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(l(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(l(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(y(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return m(x(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return m(x(a),function(a){b?c[a].splice(y(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&mc(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&lc(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},n(hc,{INPUT_START:O,INPUT_MOVE:P,INPUT_END:Q,INPUT_CANCEL:R,STATE_POSSIBLE:Rb,STATE_BEGAN:Sb,STATE_CHANGED:Tb,STATE_ENDED:Ub,STATE_RECOGNIZED:Vb,STATE_CANCELLED:Wb,STATE_FAILED:Xb,DIRECTION_NONE:S,DIRECTION_LEFT:T,DIRECTION_RIGHT:U,DIRECTION_UP:V,DIRECTION_DOWN:W,DIRECTION_HORIZONTAL:X,DIRECTION_VERTICAL:Y,DIRECTION_ALL:Z,Manager:kc,Input:ab,TouchAction:Pb,TouchInput:Eb,MouseInput:rb,PointerEventInput:wb,TouchMouseInput:Gb,SingleTouchInput:Ab,Recognizer:Yb,AttrRecognizer:ac,Tap:gc,Pan:bc,Swipe:fc,Pinch:cc,Rotate:ec,Press:dc,on:t,off:u,each:m,merge:o,extend:n,inherit:p,bindFn:q,prefixed:B}),typeof define==g&&define.amd?define(function(){return hc}):"undefined"!=typeof module&&module.exports?module.exports=hc:a[c]=hc}(window,document,"Hammer");
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'hammerjs'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'), require('hammerjs'));
    } else {
        factory(jQuery, Hammer);
    }
}(function($, Hammer) {
    function hammerify(el, options) {
        var $el = $(el);
        if(!$el.data("hammer")) {
            $el.data("hammer", new Hammer($el[0], options));
        }
    }

    $.fn.hammer = function(options) {
        return this.each(function() {
            hammerify(this, options);
        });
    };

    // extend the emit method to also trigger jQuery events
    Hammer.Manager.prototype.emit = (function(originalEmit) {
        return function(type, data) {
            originalEmit.call(this, type, data);
            $(this.element).trigger({
                type: type,
                gesture: data
            });
        };
    })(Hammer.Manager.prototype.emit);
}));

// Required for Meteor package, the use of window prevents export by Meteor
(function(window){
  if(window.Package){
    Materialize = {};
  } else {
    window.Materialize = {};
  }
})(window);

if (typeof exports !== 'undefined' && !exports.nodeType) {
  if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
    exports = module.exports = Materialize;
  }
  exports.default = Materialize;
}

/*
 * raf.js
 * https://github.com/ngryman/raf.js
 *
 * original requestAnimationFrame polyfill by Erik Möller
 * inspired from paul_irish gist and post
 *
 * Copyright (c) 2013 ngryman
 * Licensed under the MIT license.
 */
(function(window) {
  var lastTime = 0,
    vendors = ['webkit', 'moz'],
    requestAnimationFrame = window.requestAnimationFrame,
    cancelAnimationFrame = window.cancelAnimationFrame,
    i = vendors.length;

  // try to un-prefix existing raf
  while (--i >= 0 && !requestAnimationFrame) {
    requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
    cancelAnimationFrame = window[vendors[i] + 'CancelRequestAnimationFrame'];
  }

  // polyfill with setTimeout fallback
  // heavily inspired from @darius gist mod: https://gist.github.com/paulirish/1579671#comment-837945
  if (!requestAnimationFrame || !cancelAnimationFrame) {
    requestAnimationFrame = function(callback) {
      var now = +Date.now(),
        nextTime = Math.max(lastTime + 16, now);
      return setTimeout(function() {
        callback(lastTime = nextTime);
      }, nextTime - now);
    };

    cancelAnimationFrame = clearTimeout;
  }

  // export to window
  window.requestAnimationFrame = requestAnimationFrame;
  window.cancelAnimationFrame = cancelAnimationFrame;
}(window));

/**
 * Generate approximated selector string for a jQuery object
 * @param {jQuery} obj  jQuery object to be parsed
 * @returns {string}
 */
Materialize.objectSelectorString = function(obj) {
  var tagStr = obj.prop('tagName') || '';
  var idStr = obj.attr('id') || '';
  var classStr = obj.attr('class') || '';
  return (tagStr + idStr + classStr).replace(/\s/g,'');
};


// Unique Random ID
Materialize.guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

/**
 * Escapes hash from special characters
 * @param {string} hash  String returned from this.hash
 * @returns {string}
 */
Materialize.escapeHash = function(hash) {
  return hash.replace( /(:|\.|\[|\]|,|=)/g, "\\$1" );
};

Materialize.elementOrParentIsFixed = function(element) {
    var $element = $(element);
    var $checkElements = $element.add($element.parents());
    var isFixed = false;
    $checkElements.each(function(){
        if ($(this).css("position") === "fixed") {
            isFixed = true;
            return false;
        }
    });
    return isFixed;
};


/**
 * Get time in ms
 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
 * @type {function}
 * @return {number}
 */
var getTime = (Date.now || function () {
  return new Date().getTime();
});


/**
 * Returns a function, that, when invoked, will only be triggered at most once
 * during a given window of time. Normally, the throttled function will run
 * as much as it can, without ever going more than once per `wait` duration;
 * but if you'd like to disable the execution on the leading edge, pass
 * `{leading: false}`. To disable execution on the trailing edge, ditto.
 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
 * @param {function} func
 * @param {number} wait
 * @param {Object=} options
 * @returns {Function}
 */
Materialize.throttle = function(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  options || (options = {});
  var later = function () {
    previous = options.leading === false ? 0 : getTime();
    timeout = null;
    result = func.apply(context, args);
    context = args = null;
  };
  return function () {
    var now = getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};


// Velocity has conflicts when loaded with jQuery, this will check for it
// First, check if in noConflict mode
var Vel;
if (jQuery) {
  Vel = jQuery.Velocity;
} else if ($) {
  Vel = $.Velocity;
} else {
  Vel = Velocity;
}

if (Vel) {
  Materialize.Vel = Vel;
} else {
  Materialize.Vel = Velocity;
}

(function ($) {
  $.fn.collapsible = function(options, methodParam) {
    var defaults = {
      accordion: undefined,
      onOpen: undefined,
      onClose: undefined
    };

    var methodName = options;
    options = $.extend(defaults, options);


    return this.each(function() {

      var $this = $(this);

      var $panel_headers = $(this).find('> li > .collapsible-header');

      var collapsible_type = $this.data("collapsible");

      /****************
      Helper Functions
      ****************/

      // Accordion Open
      function accordionOpen(object) {
        $panel_headers = $this.find('> li > .collapsible-header');
        if (object.hasClass('active')) {
          object.parent().addClass('active');
        }
        else {
          object.parent().removeClass('active');
        }
        if (object.parent().hasClass('active')){
          object.siblings('.collapsible-body').stop(true,false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
        }
        else{
          object.siblings('.collapsible-body').stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
        }

        $panel_headers.not(object).removeClass('active').parent().removeClass('active');

        // Close previously open accordion elements.
        $panel_headers.not(object).parent().children('.collapsible-body').stop(true,false).each(function() {
          if ($(this).is(':visible')) {
            $(this).slideUp({
              duration: 350,
              easing: "easeOutQuart",
              queue: false,
              complete:
                function() {
                  $(this).css('height', '');
                  execCallbacks($(this).siblings('.collapsible-header'));
                }
            });
          }
        });
      }

      // Expandable Open
      function expandableOpen(object) {
        if (object.hasClass('active')) {
          object.parent().addClass('active');
        }
        else {
          object.parent().removeClass('active');
        }
        if (object.parent().hasClass('active')){
          object.siblings('.collapsible-body').stop(true,false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
        }
        else {
          object.siblings('.collapsible-body').stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
        }
      }

      // Open collapsible. object: .collapsible-header
      function collapsibleOpen(object, noToggle) {
        if (!noToggle) {
          object.toggleClass('active');
        }

        if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) { // Handle Accordion
          accordionOpen(object);
        } else { // Handle Expandables
          expandableOpen(object);
        }

        execCallbacks(object);
      }

      // Handle callbacks
      function execCallbacks(object) {
        if (object.hasClass('active')) {
          if (typeof(options.onOpen) === "function") {
            options.onOpen.call(this, object.parent());
          }
        } else {
          if (typeof(options.onClose) === "function") {
            options.onClose.call(this, object.parent());
          }
        }
      }

      /**
       * Check if object is children of panel header
       * @param  {Object}  object Jquery object
       * @return {Boolean} true if it is children
       */
      function isChildrenOfPanelHeader(object) {

        var panelHeader = getPanelHeader(object);

        return panelHeader.length > 0;
      }

      /**
       * Get panel header from a children element
       * @param  {Object} object Jquery object
       * @return {Object} panel header object
       */
      function getPanelHeader(object) {

        return object.closest('li > .collapsible-header');
      }


      // Turn off any existing event handlers
      function removeEventHandlers() {
        $this.off('click.collapse', '> li > .collapsible-header');
      }

      /*****  End Helper Functions  *****/


      // Methods
      if (methodName === 'destroy') {
        removeEventHandlers();
        return;
      } else if (methodParam >= 0 &&
          methodParam < $panel_headers.length) {
        var $curr_header = $panel_headers.eq(methodParam);
        if ($curr_header.length &&
            (methodName === 'open' ||
            (methodName === 'close' &&
            $curr_header.hasClass('active')))) {
          collapsibleOpen($curr_header);
        }
        return;
      }


      removeEventHandlers();


      // Add click handler to only direct collapsible header children
      $this.on('click.collapse', '> li > .collapsible-header', function(e) {
        var element = $(e.target);

        if (isChildrenOfPanelHeader(element)) {
          element = getPanelHeader(element);
        }

        collapsibleOpen(element);
      });


      // Open first active
      if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) { // Handle Accordion
        collapsibleOpen($panel_headers.filter('.active').first(), true);

      } else { // Handle Expandables
        $panel_headers.filter('.active').each(function() {
          collapsibleOpen($(this), true);
        });
      }

    });
  };

  $(document).ready(function(){
    $('.collapsible').collapsible();
  });
}( jQuery ));
(function ($) {

  // Add posibility to scroll to selected option
  // usefull for select for example
  $.fn.scrollTo = function(elem) {
    $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top);
    return this;
  };

  $.fn.dropdown = function (options) {
    var defaults = {
      inDuration: 300,
      outDuration: 225,
      constrainWidth: true, // Constrains width of dropdown to the activator
      hover: false,
      gutter: 0, // Spacing from edge
      belowOrigin: false,
      alignment: 'left',
      stopPropagation: false
    };

    // Open dropdown.
    if (options === "open") {
      this.each(function() {
        $(this).trigger('open');
      });
      return false;
    }

    // Close dropdown.
    if (options === "close") {
      this.each(function() {
        $(this).trigger('close');
      });
      return false;
    }

    this.each(function(){
      var origin = $(this);
      var curr_options = $.extend({}, defaults, options);
      var isFocused = false;

      // Dropdown menu
      var activates = $("#"+ origin.attr('data-activates'));

      function updateOptions() {
        if (origin.data('induration') !== undefined)
          curr_options.inDuration = origin.data('induration');
        if (origin.data('outduration') !== undefined)
          curr_options.outDuration = origin.data('outduration');
        if (origin.data('constrainwidth') !== undefined)
          curr_options.constrainWidth = origin.data('constrainwidth');
        if (origin.data('hover') !== undefined)
          curr_options.hover = origin.data('hover');
        if (origin.data('gutter') !== undefined)
          curr_options.gutter = origin.data('gutter');
        if (origin.data('beloworigin') !== undefined)
          curr_options.belowOrigin = origin.data('beloworigin');
        if (origin.data('alignment') !== undefined)
          curr_options.alignment = origin.data('alignment');
        if (origin.data('stoppropagation') !== undefined)
          curr_options.stopPropagation = origin.data('stoppropagation');
      }

      updateOptions();

      // Attach dropdown to its activator
      origin.after(activates);

      /*
        Helper function to position and resize dropdown.
        Used in hover and click handler.
      */
      function placeDropdown(eventType) {
        // Check for simultaneous focus and click events.
        if (eventType === 'focus') {
          isFocused = true;
        }

        // Check html data attributes
        updateOptions();

        // Set Dropdown state
        activates.addClass('active');
        origin.addClass('active');

        var originWidth = origin[0].getBoundingClientRect().width;

        // Constrain width
        if (curr_options.constrainWidth === true) {
          activates.css('width', originWidth);

        } else {
          activates.css('white-space', 'nowrap');
        }

        // Offscreen detection
        var windowHeight = window.innerHeight;
        var originHeight = origin.innerHeight();
        var offsetLeft = origin.offset().left;
        var offsetTop = origin.offset().top - $(window).scrollTop();
        var currAlignment = curr_options.alignment;
        var gutterSpacing = 0;
        var leftPosition = 0;

        // Below Origin
        var verticalOffset = 0;
        if (curr_options.belowOrigin === true) {
          verticalOffset = originHeight;
        }

        // Check for scrolling positioned container.
        var scrollYOffset = 0;
        var scrollXOffset = 0;
        var wrapper = origin.parent();
        if (!wrapper.is('body')) {
          if (wrapper[0].scrollHeight > wrapper[0].clientHeight) {
            scrollYOffset = wrapper[0].scrollTop;
          }
          if (wrapper[0].scrollWidth > wrapper[0].clientWidth) {
            scrollXOffset = wrapper[0].scrollLeft;
          }
        }


        if (offsetLeft + activates.innerWidth() > $(window).width()) {
          // Dropdown goes past screen on right, force right alignment
          currAlignment = 'right';

        } else if (offsetLeft - activates.innerWidth() + origin.innerWidth() < 0) {
          // Dropdown goes past screen on left, force left alignment
          currAlignment = 'left';
        }
        // Vertical bottom offscreen detection
        if (offsetTop + activates.innerHeight() > windowHeight) {
          // If going upwards still goes offscreen, just crop height of dropdown.
          if (offsetTop + originHeight - activates.innerHeight() < 0) {
            var adjustedHeight = windowHeight - offsetTop - verticalOffset;
            activates.css('max-height', adjustedHeight);
          } else {
            // Flow upwards.
            if (!verticalOffset) {
              verticalOffset += originHeight;
            }
            verticalOffset -= activates.innerHeight();
          }
        }

        // Handle edge alignment
        if (currAlignment === 'left') {
          gutterSpacing = curr_options.gutter;
          leftPosition = origin.position().left + gutterSpacing;
        }
        else if (currAlignment === 'right') {
          // Material icons fix
          activates
            .stop(true, true)
            .css({
              opacity: 0,
              left: 0
            })

          var offsetRight = origin.position().left + originWidth - activates.width();
          gutterSpacing = -curr_options.gutter;
          leftPosition =  offsetRight + gutterSpacing;
        }

        // Position dropdown
        activates.css({
          position: 'absolute',
          top: origin.position().top + verticalOffset + scrollYOffset,
          left: leftPosition + scrollXOffset
        });

        // Show dropdown
        activates
          .slideDown({
            queue: false,
            duration: curr_options.inDuration,
            easing: 'easeOutCubic',
            complete: function() {
              $(this).css('height', '');
            }
          })
          .animate( {opacity: 1}, {queue: false, duration: curr_options.inDuration, easing: 'easeOutSine'});

        // Add click close handler to document
        setTimeout(function() {
          $(document).on('click.'+ activates.attr('id'), function (e) {
            hideDropdown();
            $(document).off('click.'+ activates.attr('id'));
          });
        }, 0);
      }

      function hideDropdown() {
        // Check for simultaneous focus and click events.
        isFocused = false;
        activates.fadeOut(curr_options.outDuration);
        activates.removeClass('active');
        origin.removeClass('active');
        $(document).off('click.'+ activates.attr('id'));
        setTimeout(function() { activates.css('max-height', ''); }, curr_options.outDuration);
      }

      // Hover
      if (curr_options.hover) {
        var open = false;
        origin.off('click.' + origin.attr('id'));
        // Hover handler to show dropdown
        origin.on('mouseenter', function(e){ // Mouse over
          if (open === false) {
            placeDropdown();
            open = true;
          }
        });
        origin.on('mouseleave', function(e){
          // If hover on origin then to something other than dropdown content, then close
          var toEl = e.toElement || e.relatedTarget; // added browser compatibility for target element
          if(!$(toEl).closest('.dropdown-content').is(activates)) {
            activates.stop(true, true);
            hideDropdown();
            open = false;
          }
        });

        activates.on('mouseleave', function(e){ // Mouse out
          var toEl = e.toElement || e.relatedTarget;
          if(!$(toEl).closest('.dropdown-button').is(origin)) {
            activates.stop(true, true);
            hideDropdown();
            open = false;
          }
        });

        // Click
      } else {
        // Click handler to show dropdown
        origin.off('click.' + origin.attr('id'));
        origin.on('click.'+origin.attr('id'), function(e){
          if (!isFocused) {
            if ( origin[0] == e.currentTarget &&
                 !origin.hasClass('active') &&
                 ($(e.target).closest('.dropdown-content').length === 0)) {
              e.preventDefault(); // Prevents button click from moving window
              if (curr_options.stopPropagation) {
                e.stopPropagation();
              }
              placeDropdown('click');
            }
            // If origin is clicked and menu is open, close menu
            else if (origin.hasClass('active')) {
              hideDropdown();
              $(document).off('click.'+ activates.attr('id'));
            }
          }
        });

      } // End else

      // Listen to open and close event - useful for select component
      origin.on('open', function(e, eventType) {
        placeDropdown(eventType);
      });
      origin.on('close', hideDropdown);


    });
  }; // End dropdown plugin

  $(document).ready(function(){
    $('.dropdown-button').dropdown();
  });
}( jQuery ));

(function($, Vel) {
  'use strict';

  let _defaults = {
    opacity: 0.5,
    inDuration: 250,
    outDuration: 250,
    ready: undefined,
    complete: undefined,
    dismissible: true,
    startingTop: '4%',
    endingTop: '10%'
  };


  /**
   * @class
   *
   */
  class Modal {
    /**
     * Construct Modal instance and set up overlay
     * @constructor
     * @param {jQuery} $el
     * @param {Object} options
     */
    constructor($el, options) {

      // If exists, destroy and reinitialize
      if (!!$el[0].M_Modal) {
        $el[0].M_Modal.destroy();
      }

      /**
       * The jQuery element
       * @type {jQuery}
       */
      this.$el = $el;

      /**
       * Options for the modal
       * @member Modal#options
       * @prop {Number} [opacity=0.5] - Opacity of the modal overlay
       * @prop {Number} [inDuration=250] - Length in ms of enter transition
       * @prop {Number} [outDuration=250] - Length in ms of exit transition
       * @prop {Function} ready - Callback function called when modal is finished entering
       * @prop {Function} complete - Callback function called when modal is finished exiting
       * @prop {Boolean} [dismissible=true] - Allow modal to be dismissed by keyboard or overlay click
       * @prop {String} [startingTop='4%'] - startingTop
       * @prop {String} [endingTop='10%'] - endingTop
       */
      this.options = $.extend({}, Modal.defaults, options);

      /**
       * Describes open/close state of modal
       * @type {Boolean}
       */
      this.isOpen = false;

      this.$el[0].M_Modal = this;
      this.id = $el.attr('id');
      this.openingTrigger = undefined;
      this.$overlay = $('<div class="modal-overlay"></div>');

      Modal._increment++;
      Modal._count++;
      this.$overlay[0].style.zIndex = 1000 + Modal._increment * 2;
      this.$el[0].style.zIndex = 1000 + Modal._increment * 2 + 1;
      this.setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new Modal($(this), options));
      });
      return arr;
    }

    /**
     * Get Instance
     */
    getInstance() {
      return this;
    }

    /**
     * Teardown component
     */
    destroy() {
      this.removeEventHandlers();
      this.$el[0].removeAttribute('style')
      if (!!this.$overlay[0].parentNode) {
        this.$overlay[0].parentNode.removeChild(this.$overlay[0]);
      }
      this.$el[0].M_Modal = undefined;
      Modal._count--;
    }

    /**
     * Setup Event Handlers
     */
    setupEventHandlers() {
      this.handleOverlayClickBound = this.handleOverlayClick.bind(this);
      this.handleModalCloseClickBound = this.handleModalCloseClick.bind(this);

      if (Modal._count === 1) {
        document.body.addEventListener('click', this.handleTriggerClick);
      }
      this.$overlay[0].addEventListener('click', this.handleOverlayClickBound);
      this.$el[0].addEventListener('click', this.handleModalCloseClickBound);
    }

    /**
     * Remove Event Handlers
     */
    removeEventHandlers() {
      if (Modal._count === 0) {
        document.body.removeEventListener('click', this.handleTriggerClick);
      }
      this.$overlay[0].removeEventListener('click', this.handleOverlayClickBound);
      this.$el[0].removeEventListener('click', this.handleModalCloseClickBound);
    }

    /**
     * Handle Trigger Click
     * @param {Event} e
     */
    handleTriggerClick(e) {
      let $trigger =  $(e.target).closest('.modal-trigger');
      if (e.target && $trigger.length) {
        let modalId = $trigger[0].getAttribute('href');
        if (modalId) {
          modalId = modalId.slice(1);
        } else {
          modalId = $trigger[0].getAttribute('data-target');
        }
        let modalInstance = document.getElementById(modalId).M_Modal;
        if (modalInstance) {
          modalInstance.open($trigger);
        }
        e.preventDefault();
      }
    }

    /**
     * Handle Overlay Click
     */
    handleOverlayClick() {
      if (this.options.dismissible) {
        this.close();
      }
    }

    /**
     * Handle Modal Close Click
     * @param {Event} e
     */
    handleModalCloseClick(e) {
      let $closeTrigger =  $(e.target).closest('.modal-close');
      if (e.target && $closeTrigger.length) {
        this.close();
      }
    }

    /**
     * Handle Keydown
     * @param {Event} e
     */
    handleKeydown(e) {
      // ESC key
      if (e.keyCode === 27 && this.options.dismissible) {
        this.close();
      }
    }

    /**
     * Animate in modal
     */
    animateIn() {
      // Set initial styles
      $.extend(this.$el[0].style, {
        display: 'block',
        opacity: 0
      });
      $.extend(this.$overlay[0].style, {
        display: 'block',
        opacity: 0
      });

      // Animate overlay
      Vel(
        this.$overlay[0],
        {opacity: this.options.opacity},
        {duration: this.options.inDuration, queue: false, ease: 'easeOutCubic'}
      );


      // Define modal animation options
      let enterVelocityOptions = {
        duration: this.options.inDuration,
        queue: false,
        ease: 'easeOutCubic',
        // Handle modal ready callback
        complete: () => {
          if (typeof(this.options.ready) === 'function') {
            this.options.ready.call(this, this.$el, this.openingTrigger);
          }
        }
      };

      // Bottom sheet animation
      if (this.$el[0].classList.contains('bottom-sheet')) {
        Vel(
          this.$el[0],
          {bottom: 0, opacity: 1},
          enterVelocityOptions);

      // Normal modal animation
      } else {
        Vel.hook(this.$el[0], 'scaleX', 0.7);
        this.$el[0].style.top = this.options.startingTop;
        Vel(
          this.$el[0],
          {top: this.options.endingTop, opacity: 1, scaleX: 1},
          enterVelocityOptions
        );
      }
    }

    /**
     * Animate out modal
     */
    animateOut() {
      // Animate overlay
      Vel(
        this.$overlay[0],
        { opacity: 0},
        {duration: this.options.outDuration, queue: false, ease: 'easeOutQuart'}
      );

      // Define modal animation options
      var exitVelocityOptions = {
        duration: this.options.outDuration,
        queue: false,
        ease: 'easeOutCubic',
        // Handle modal ready callback
        complete: () => {
          this.$el[0].style.display = 'none';
          // Call complete callback
          if (typeof(this.options.complete) === 'function') {
            this.options.complete.call(this, this.$el);
          }
          this.$overlay[0].parentNode.removeChild(this.$overlay[0]);
        }
      };

      // Bottom sheet animation
      if (this.$el[0].classList.contains('bottom-sheet')) {
        Vel(
          this.$el[0],
          {bottom: '-100%', opacity: 0},
          exitVelocityOptions
        );

      // Normal modal animation
      } else {
        Vel(
          this.$el[0],
          {top: this.options.startingTop, opacity: 0, scaleX: 0.7},
          exitVelocityOptions
        );
      }
    }


    /**
     * Open Modal
     * @param {jQuery} [$trigger]
     */
    open($trigger) {
      if (this.isOpen) {
        return;
      }

      this.isOpen = true;
      let body = document.body;
      body.style.overflow = 'hidden';
      this.$el[0].classList.add('open');
      body.appendChild(this.$overlay[0]);

      // Set opening trigger, undefined indicates modal was opened by javascript
      this.openingTrigger = !!$trigger ? $trigger : undefined;


      if (this.options.dismissible) {
        this.handleKeydownBound = this.handleKeydown.bind(this);
        document.addEventListener('keydown', this.handleKeydownBound);
      }

      this.animateIn();

      return this;
    }

    /**
     * Close Modal
     */
    close() {
      if (!this.isOpen) {
        return;
      }

      this.isOpen = false;
      this.$el[0].classList.remove('open');
      document.body.style.overflow = '';

      if (this.options.dismissible) {
        document.removeEventListener('keydown', this.handleKeydownBound);
      }

      this.animateOut();

      return this;
    }
  }

  /**
   * @static
   * @memberof Modal
   */
  Modal._increment = 0;

  /**
   * @static
   * @memberof Modal
   */
  Modal._count = 0;

  Materialize.Modal = Modal;

  $.fn.modal = function(methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (Modal.prototype[methodOrOptions]) {
      // Getter methods
      if (methodOrOptions.slice(0,3) === 'get') {
        return this.first()[0].M_Modal[methodOrOptions]();

      // Void methods
      } else {
        return this.each(function() {
          this.M_Modal[methodOrOptions]();
        });
      }

    // Initialize plugin if options or no argument is passed in
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      Modal.init(this, arguments[0]);
      return this;

    // Return error if an unrecognized  method name is passed in
    } else {
      $.error(`Method ${methodOrOptions} does not exist on jQuery.modal`);
    }
  };

})(jQuery, Materialize.Vel);

(function ($) {

  $.fn.materialbox = function () {

    return this.each(function() {

      if ($(this).hasClass('initialized')) {
        return;
      }

      $(this).addClass('initialized');

      var overlayActive = false;
      var doneAnimating = true;
      var inDuration = 275;
      var outDuration = 200;
      var origin = $(this);
      var placeholder = $('<div></div>').addClass('material-placeholder');
      var originalWidth = 0;
      var originalHeight = 0;
      var ancestorsChanged;
      var ancestor;
      var originInlineStyles = origin.attr('style');
      origin.wrap(placeholder);


      // Start click handler
      origin.on('click', function() {
        var placeholder = origin.parent('.material-placeholder');
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var originalWidth = origin.width();
        var originalHeight = origin.height();


        // If already modal, return to original
        if (doneAnimating === false) {
          returnToOriginal();
          return false;
        }
        else if (overlayActive && doneAnimating===true) {
          returnToOriginal();
          return false;
        }


        // Set states
        doneAnimating = false;
        origin.addClass('active');
        overlayActive = true;

        // Set positioning for placeholder
        placeholder.css({
          width: placeholder[0].getBoundingClientRect().width,
          height: placeholder[0].getBoundingClientRect().height,
          position: 'relative',
          top: 0,
          left: 0
        });

        // Find ancestor with overflow: hidden; and remove it
        ancestorsChanged = undefined;
        ancestor = placeholder[0].parentNode;
        var count = 0;
        while (ancestor !== null && !$(ancestor).is(document)) {
          var curr = $(ancestor);
          if (curr.css('overflow') !== 'visible') {
            curr.css('overflow', 'visible');
            if (ancestorsChanged === undefined) {
              ancestorsChanged = curr;
            }
            else {
              ancestorsChanged = ancestorsChanged.add(curr);
            }
          }
          ancestor = ancestor.parentNode;
        }

        // Set css on origin
        origin.css({
          position: 'absolute',
          'z-index': 1000,
          'will-change': 'left, top, width, height'
        })
        .data('width', originalWidth)
        .data('height', originalHeight);

        // Add overlay
        var overlay = $('<div id="materialbox-overlay"></div>')
          .css({
            opacity: 0
          })
          .click(function(){
            if (doneAnimating === true)
            returnToOriginal();
          });

        // Put before in origin image to preserve z-index layering.
        origin.before(overlay);

        // Set dimensions if needed
        var overlayOffset = overlay[0].getBoundingClientRect();
        overlay.css({
          width: windowWidth,
          height: windowHeight,
          left: -1 * overlayOffset.left,
          top: -1 * overlayOffset.top
        })

        // Animate Overlay
        overlay.velocity({opacity: 1},
                           {duration: inDuration, queue: false, easing: 'easeOutQuad'} );

        // Add and animate caption if it exists
        if (origin.data('caption') !== "") {
          var $photo_caption = $('<div class="materialbox-caption"></div>');
          $photo_caption.text(origin.data('caption'));
          $('body').append($photo_caption);
          $photo_caption.css({ "display": "inline" });
          $photo_caption.velocity({opacity: 1}, {duration: inDuration, queue: false, easing: 'easeOutQuad'});
        }

        // Resize Image
        var ratio = 0;
        var widthPercent = originalWidth / windowWidth;
        var heightPercent = originalHeight / windowHeight;
        var newWidth = 0;
        var newHeight = 0;

        if (widthPercent > heightPercent) {
          ratio = originalHeight / originalWidth;
          newWidth = windowWidth * 0.9;
          newHeight = windowWidth * 0.9 * ratio;
        }
        else {
          ratio = originalWidth / originalHeight;
          newWidth = (windowHeight * 0.9) * ratio;
          newHeight = windowHeight * 0.9;
        }

        // Animate image + set z-index
        if(origin.hasClass('responsive-img')) {
          origin.velocity({'max-width': newWidth, 'width': originalWidth}, {duration: 0, queue: false,
            complete: function(){
              origin.css({left: 0, top: 0})
              .velocity(
                {
                  height: newHeight,
                  width: newWidth,
                  left: $(document).scrollLeft() + windowWidth/2 - origin.parent('.material-placeholder').offset().left - newWidth/2,
                  top: $(document).scrollTop() + windowHeight/2 - origin.parent('.material-placeholder').offset().top - newHeight/ 2
                },
                {
                  duration: inDuration,
                  queue: false,
                  easing: 'easeOutQuad',
                  complete: function(){doneAnimating = true;}
                }
              );
            } // End Complete
          }); // End Velocity
        }
        else {
          origin.css('left', 0)
          .css('top', 0)
          .velocity(
            {
              height: newHeight,
              width: newWidth,
              left: $(document).scrollLeft() + windowWidth/2 - origin.parent('.material-placeholder').offset().left - newWidth/2,
              top: $(document).scrollTop() + windowHeight/2 - origin.parent('.material-placeholder').offset().top - newHeight/ 2
            },
            {
              duration: inDuration,
              queue: false,
              easing: 'easeOutQuad',
              complete: function(){doneAnimating = true;}
            }
            ); // End Velocity
        }

        // Handle Exit triggers
        $(window).on('scroll.materialbox', function() {
          if (overlayActive) {
            returnToOriginal();
          }
        });

        $(window).on('resize.materialbox', function() {
          if (overlayActive) {
            returnToOriginal();
          }
        });

        $(document).on('keyup.materialbox', function(e) {
          // ESC key
          if (e.keyCode === 27 &&
              doneAnimating === true &&
              overlayActive) {
            returnToOriginal();
          }
        });

      }); // End click handler


      // This function returns the modaled image to the original spot
      function returnToOriginal() {

        doneAnimating = false;

        var placeholder = origin.parent('.material-placeholder');
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var originalWidth = origin.data('width');
        var originalHeight = origin.data('height');

        origin.velocity("stop", true);
        $('#materialbox-overlay').velocity("stop", true);
        $('.materialbox-caption').velocity("stop", true);

        // disable exit handlers
        $(window).off('scroll.materialbox');
        $(document).off('keyup.materialbox');
        $(window).off('resize.materialbox');

        $('#materialbox-overlay').velocity({opacity: 0}, {
          duration: outDuration, // Delay prevents animation overlapping
          queue: false, easing: 'easeOutQuad',
          complete: function(){
            // Remove Overlay
            overlayActive = false;
            $(this).remove();
          }
        });

        // Resize Image
        origin.velocity(
          {
            width: originalWidth,
            height: originalHeight,
            left: 0,
            top: 0
          },
          {
            duration: outDuration,
            queue: false, easing: 'easeOutQuad',
            complete: function() {
              placeholder.css({
                height: '',
                width: '',
                position: '',
                top: '',
                left: ''
              });

              origin.removeAttr('style');
              origin.attr('style', originInlineStyles);

              // Remove class
              origin.removeClass('active');
              doneAnimating = true;

              // Remove overflow overrides on ancestors
              if (ancestorsChanged) {
                ancestorsChanged.css('overflow', '');
              }
            }
          }
        );

        // Remove Caption + reset css settings on image
        $('.materialbox-caption').velocity({opacity: 0}, {
          duration: outDuration, // Delay prevents animation overlapping
          queue: false, easing: 'easeOutQuad',
          complete: function(){
            $(this).remove();
          }
        });

      }
    });
  };

  $(document).ready(function(){
    $('.materialboxed').materialbox();
  });

}( jQuery ));

(function ($) {

  $.fn.parallax = function () {
    var window_width = $(window).width();
    // Parallax Scripts
    return this.each(function(i) {
      var $this = $(this);
      $this.addClass('parallax');

      function updateParallax(initial) {
        var container_height;
        if (window_width < 601) {
          container_height = ($this.height() > 0) ? $this.height() : $this.children("img").height();
        }
        else {
          container_height = ($this.height() > 0) ? $this.height() : 500;
        }
        var $img = $this.children("img").first();
        var img_height = $img.height();
        var parallax_dist = img_height - container_height;
        var bottom = $this.offset().top + container_height;
        var top = $this.offset().top;
        var scrollTop = $(window).scrollTop();
        var windowHeight = window.innerHeight;
        var windowBottom = scrollTop + windowHeight;
        var percentScrolled = (windowBottom - top) / (container_height + windowHeight);
        var parallax = Math.round((parallax_dist * percentScrolled));

        if (initial) {
          $img.css('display', 'block');
        }
        if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) {
          $img.css('transform', "translate3D(-50%," + parallax + "px, 0)");
        }

      }

      // Wait for image load
      $this.children("img").one("load", function() {
        updateParallax(true);
      }).each(function() {
        if (this.complete) $(this).trigger("load");
      });

      $(window).scroll(function() {
        window_width = $(window).width();
        updateParallax(false);
      });

      $(window).resize(function() {
        window_width = $(window).width();
        updateParallax(false);
      });

    });

  };
}( jQuery ));

(function ($) {

  var methods = {
    init : function(options) {
      var defaults = {
        onShow: null,
        swipeable: false,
        responsiveThreshold: Infinity, // breakpoint for swipeable
      };
      options = $.extend(defaults, options);
      var namespace = Materialize.objectSelectorString($(this));

      return this.each(function(i) {

      var uniqueNamespace = namespace+i;

      // For each set of tabs, we want to keep track of
      // which tab is active and its associated content
      var $this = $(this),
          window_width = $(window).width();

      var $active, $content, $links = $this.find('li.tab a'),
          $tabs_width = $this.width(),
          $tabs_content = $(),
          $tabs_wrapper,
          $tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length,
          $indicator,
          index = 0,
          prev_index = 0,
          clicked = false,
          clickedTimeout,
          transition = 300;


      // Finds right attribute for indicator based on active tab.
      // el: jQuery Object
        var calcRightPos = function(el) {
          return Math.ceil($tabs_width - el.position().left - el[0].getBoundingClientRect().width - $this.scrollLeft());
      };

      // Finds left attribute for indicator based on active tab.
      // el: jQuery Object
      var calcLeftPos = function(el) {
        return Math.floor(el.position().left + $this.scrollLeft());
      };

      // Animates Indicator to active tab.
      // prev_index: Number
      var animateIndicator = function(prev_index) {
        if ((index - prev_index) >= 0) {
          $indicator.velocity({"right": calcRightPos($active) }, { duration: transition, queue: false, easing: 'easeOutQuad'});
          $indicator.velocity({"left": calcLeftPos($active) }, {duration: transition, queue: false, easing: 'easeOutQuad', delay: 90});

        } else {
          $indicator.velocity({"left": calcLeftPos($active) }, { duration: transition, queue: false, easing: 'easeOutQuad'});
          $indicator.velocity({"right": calcRightPos($active) }, {duration: transition, queue: false, easing: 'easeOutQuad', delay: 90});
        }
      };

      // Change swipeable according to responsive threshold
      if (options.swipeable) {
        if (window_width > options.responsiveThreshold) {
          options.swipeable = false;
        }
      }


      // If the location.hash matches one of the links, use that as the active tab.
      $active = $($links.filter('[href="'+location.hash+'"]'));

      // If no match is found, use the first link or any with class 'active' as the initial active tab.
      if ($active.length === 0) {
        $active = $(this).find('li.tab a.active').first();
      }
      if ($active.length === 0) {
        $active = $(this).find('li.tab a').first();
      }

      $active.addClass('active');
      index = $links.index($active);
      if (index < 0) {
        index = 0;
      }

      if ($active[0] !== undefined) {
        $content = $($active[0].hash);
        $content.addClass('active');
      }

      // append indicator then set indicator width to tab width
      if (!$this.find('.indicator').length) {
        $this.append('<li class="indicator"></li>');
      }
      $indicator = $this.find('.indicator');

      // we make sure that the indicator is at the end of the tabs
      $this.append($indicator);

      if ($this.is(":visible")) {
        // $indicator.css({"right": $tabs_width - ((index + 1) * $tab_width)});
        // $indicator.css({"left": index * $tab_width});
        setTimeout(function() {
          $indicator.css({"right": calcRightPos($active) });
          $indicator.css({"left": calcLeftPos($active) });
        }, 0);
      }
      $(window).off('resize.tabs-'+uniqueNamespace).on('resize.tabs-'+uniqueNamespace, function () {
        $tabs_width = $this.width();
        $tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length;
        if (index < 0) {
          index = 0;
        }
        if ($tab_width !== 0 && $tabs_width !== 0) {
          $indicator.css({"right": calcRightPos($active) });
          $indicator.css({"left": calcLeftPos($active) });
        }
      });

      // Initialize Tabs Content.
      if (options.swipeable) {
        // TODO: Duplicate calls with swipeable? handle multiple div wrapping.
        $links.each(function () {
          var $curr_content = $(Materialize.escapeHash(this.hash));
          $curr_content.addClass('carousel-item');
          $tabs_content = $tabs_content.add($curr_content);
        });
        $tabs_wrapper = $tabs_content.wrapAll('<div class="tabs-content carousel"></div>');
        $tabs_content.css('display', '');
        $('.tabs-content.carousel').carousel({
          fullWidth: true,
          noWrap: true,
          onCycleTo: function(item) {
            if (!clicked) {
              var prev_index = index;
              index = $tabs_wrapper.index(item);
              $active.removeClass('active');
              $active = $links.eq(index);
              $active.addClass('active');
              animateIndicator(prev_index);
              if (typeof(options.onShow) === "function") {
                options.onShow.call($this[0], $content);
              }
            }
          },
        });
      } else {
        // Hide the remaining content
        $links.not($active).each(function () {
          $(Materialize.escapeHash(this.hash)).hide();
        });
      }


      // Bind the click event handler
      $this.off('click.tabs').on('click.tabs', 'a', function(e) {
        if ($(this).parent().hasClass('disabled')) {
          e.preventDefault();
          return;
        }

        // Act as regular link if target attribute is specified.
        if (!!$(this).attr("target")) {
          return;
        }

        clicked = true;
        $tabs_width = $this.width();
        $tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length;

        // Make the old tab inactive.
        $active.removeClass('active');
        var $oldContent = $content

        // Update the variables with the new link and content
        $active = $(this);
        $content = $(Materialize.escapeHash(this.hash));
        $links = $this.find('li.tab a');
        var activeRect = $active.position();

        // Make the tab active.
        $active.addClass('active');
        prev_index = index;
        index = $links.index($(this));
        if (index < 0) {
          index = 0;
        }
        // Change url to current tab
        // window.location.hash = $active.attr('href');

        // Swap content
        if (options.swipeable) {
          if ($tabs_content.length) {
            $tabs_content.carousel('set', index, function() {
              if (typeof(options.onShow) === "function") {
                options.onShow.call($this[0], $content);
              }
            });
          }
        } else {
          if ($content !== undefined) {
            $content.show();
            $content.addClass('active');
            if (typeof(options.onShow) === "function") {
              options.onShow.call(this, $content);
            }
          }

          if ($oldContent !== undefined &&
              !$oldContent.is($content)) {
            $oldContent.hide();
            $oldContent.removeClass('active');
          }
        }

        // Reset clicked state
        clickedTimeout = setTimeout(function(){ clicked = false; }, transition);

        // Update indicator
        animateIndicator(prev_index);

        // Prevent the anchor's default click action
        e.preventDefault();
      });
    });

    },
    select_tab : function( id ) {
      this.find('a[href="#' + id + '"]').trigger('click');
    }
  };

  $.fn.tabs = function(methodOrOptions) {
    if ( methods[methodOrOptions] ) {
      return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      // Default to "init"
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tabs' );
    }
  };

  $(document).ready(function(){
    $('ul.tabs').tabs();
  });
}( jQuery ));

(function ($) {
    $.fn.tooltip = function (options) {
      var timeout = null,
      margin = 5;

      // Defaults
      var defaults = {
        delay: 350,
        tooltip: '',
        position: 'bottom',
        html: false
      };

      // Remove tooltip from the activator
      if (options === "remove") {
        this.each(function() {
          $('#' + $(this).attr('data-tooltip-id')).remove();
          $(this).removeAttr('data-tooltip-id');
          $(this).off('mouseenter.tooltip mouseleave.tooltip');
        });
        return false;
      }

      options = $.extend(defaults, options);

      return this.each(function() {
        var tooltipId = Materialize.guid();
        var origin = $(this);

        // Destroy old tooltip
        if (origin.attr('data-tooltip-id')) {
          $('#' + origin.attr('data-tooltip-id')).remove();
        }

        origin.attr('data-tooltip-id', tooltipId);

        // Get attributes.
        var allowHtml,
            tooltipDelay,
            tooltipPosition,
            tooltipText,
            tooltipEl,
            backdrop;
        var setAttributes = function() {
          allowHtml = origin.attr('data-html') ? origin.attr('data-html') === 'true' : options.html;
          tooltipDelay = origin.attr('data-delay');
          tooltipDelay = (tooltipDelay === undefined || tooltipDelay === '') ?
              options.delay : tooltipDelay;
          tooltipPosition = origin.attr('data-position');
          tooltipPosition = (tooltipPosition === undefined || tooltipPosition === '') ?
              options.position : tooltipPosition;
          tooltipText = origin.attr('data-tooltip');
          tooltipText = (tooltipText === undefined || tooltipText === '') ?
              options.tooltip : tooltipText;
        };
        setAttributes();

        var renderTooltipEl = function() {
          var tooltip = $('<div class="material-tooltip"></div>');

          // Create Text span
          if (allowHtml) {
            tooltipText = $('<span></span>').html(tooltipText);
          } else{
            tooltipText = $('<span></span>').text(tooltipText);
          }

          // Create tooltip
          tooltip.append(tooltipText)
            .appendTo($('body'))
            .attr('id', tooltipId);

          // Create backdrop
          backdrop = $('<div class="backdrop"></div>');
          backdrop.appendTo(tooltip);
          return tooltip;
        };
        tooltipEl = renderTooltipEl();

        // Destroy previously binded events
        origin.off('mouseenter.tooltip mouseleave.tooltip');
        // Mouse In
        var started = false, timeoutRef;
        origin.on({'mouseenter.tooltip': function(e) {
          var showTooltip = function() {
            setAttributes();
            started = true;
            tooltipEl.velocity('stop');
            backdrop.velocity('stop');
            tooltipEl.css({ visibility: 'visible', left: '0px', top: '0px' });

            // Tooltip positioning
            var originWidth = origin.outerWidth();
            var originHeight = origin.outerHeight();
            var tooltipHeight = tooltipEl.outerHeight();
            var tooltipWidth = tooltipEl.outerWidth();
            var tooltipVerticalMovement = '0px';
            var tooltipHorizontalMovement = '0px';
            var backdropOffsetWidth = backdrop[0].offsetWidth;
            var backdropOffsetHeight = backdrop[0].offsetHeight;
            var scaleXFactor = 8;
            var scaleYFactor = 8;
            var scaleFactor = 0;
            var targetTop, targetLeft, newCoordinates;

            if (tooltipPosition === "top") {
              // Top Position
              targetTop = origin.offset().top - tooltipHeight - margin;
              targetLeft = origin.offset().left + originWidth/2 - tooltipWidth/2;
              newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
              tooltipVerticalMovement = '-10px';
              backdrop.css({
                bottom: 0,
                left: 0,
                borderRadius: '14px 14px 0 0',
                transformOrigin: '50% 100%',
                marginTop: tooltipHeight,
                marginLeft: (tooltipWidth/2) - (backdropOffsetWidth/2)
              });
            }
            // Left Position
            else if (tooltipPosition === "left") {
              targetTop = origin.offset().top + originHeight/2 - tooltipHeight/2;
              targetLeft =  origin.offset().left - tooltipWidth - margin;
              newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);

              tooltipHorizontalMovement = '-10px';
              backdrop.css({
                top: '-7px',
                right: 0,
                width: '14px',
                height: '14px',
                borderRadius: '14px 0 0 14px',
                transformOrigin: '95% 50%',
                marginTop: tooltipHeight/2,
                marginLeft: tooltipWidth
              });
            }
            // Right Position
            else if (tooltipPosition === "right") {
              targetTop = origin.offset().top + originHeight/2 - tooltipHeight/2;
              targetLeft = origin.offset().left + originWidth + margin;
              newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);

              tooltipHorizontalMovement = '+10px';
              backdrop.css({
                top: '-7px',
                left: 0,
                width: '14px',
                height: '14px',
                borderRadius: '0 14px 14px 0',
                transformOrigin: '5% 50%',
                marginTop: tooltipHeight/2,
                marginLeft: '0px'
              });
            }
            else {
              // Bottom Position
              targetTop = origin.offset().top + origin.outerHeight() + margin;
              targetLeft = origin.offset().left + originWidth/2 - tooltipWidth/2;
              newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
              tooltipVerticalMovement = '+10px';
              backdrop.css({
                top: 0,
                left: 0,
                marginLeft: (tooltipWidth/2) - (backdropOffsetWidth/2)
              });
            }

            // Set tooptip css placement
            tooltipEl.css({
              top: newCoordinates.y,
              left: newCoordinates.x
            });

            // Calculate Scale to fill
            scaleXFactor = Math.SQRT2 * tooltipWidth / parseInt(backdropOffsetWidth);
            scaleYFactor = Math.SQRT2 * tooltipHeight / parseInt(backdropOffsetHeight);
            scaleFactor = Math.max(scaleXFactor, scaleYFactor);

            tooltipEl.velocity({ translateY: tooltipVerticalMovement, translateX: tooltipHorizontalMovement}, { duration: 350, queue: false })
              .velocity({opacity: 1}, {duration: 300, delay: 50, queue: false});
            backdrop.css({ visibility: 'visible' })
              .velocity({opacity:1},{duration: 55, delay: 0, queue: false})
              .velocity({scaleX: scaleFactor, scaleY: scaleFactor}, {duration: 300, delay: 0, queue: false, easing: 'easeInOutQuad'});
          };

          timeoutRef = setTimeout(showTooltip, tooltipDelay); // End Interval

        // Mouse Out
        },
        'mouseleave.tooltip': function(){
          // Reset State
          started = false;
          clearTimeout(timeoutRef);

          // Animate back
          setTimeout(function() {
            if (started !== true) {
              tooltipEl.velocity({
                opacity: 0, translateY: 0, translateX: 0}, { duration: 225, queue: false});
              backdrop.velocity({opacity: 0, scaleX: 1, scaleY: 1}, {
                duration:225,
                queue: false,
                complete: function(){
                  backdrop.css({ visibility: 'hidden' });
                  tooltipEl.css({ visibility: 'hidden' });
                  started = false;}
              });
            }
          },225);
        }
        });
    });
  };

  var repositionWithinScreen = function(x, y, width, height) {
    var newX = x;
    var newY = y;

    if (newX < 0) {
      newX = 4;
    } else if (newX + width > window.innerWidth) {
      newX -= newX + width - window.innerWidth;
    }

    if (newY < 0) {
      newY = 4;
    } else if (newY + height > window.innerHeight + $(window).scrollTop) {
      newY -= newY + height - window.innerHeight;
    }

    return {x: newX, y: newY};
  };

  $(document).ready(function(){
     $('.tooltipped').tooltip();
   });
}( jQuery ));

/*!
 * Waves v0.6.4
 * http://fian.my.id/Waves
 *
 * Copyright 2014 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */

;(function(window) {
    'use strict';

    var Waves = Waves || {};
    var $$ = document.querySelectorAll.bind(document);

    // Find exact position of element
    function isWindow(obj) {
        return obj !== null && obj === obj.window;
    }

    function getWindow(elem) {
        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    function offset(elem) {
        var docElem, win,
            box = {top: 0, left: 0},
            doc = elem && elem.ownerDocument;

        docElem = doc.documentElement;

        if (typeof elem.getBoundingClientRect !== typeof undefined) {
            box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
            top: box.top + win.pageYOffset - docElem.clientTop,
            left: box.left + win.pageXOffset - docElem.clientLeft
        };
    }

    function convertStyle(obj) {
        var style = '';

        for (var a in obj) {
            if (obj.hasOwnProperty(a)) {
                style += (a + ':' + obj[a] + ';');
            }
        }

        return style;
    }

    var Effect = {

        // Effect delay
        duration: 750,

        show: function(e, element) {

            // Disable right click
            if (e.button === 2) {
                return false;
            }

            var el = element || this;

            // Create ripple
            var ripple = document.createElement('div');
            ripple.className = 'waves-ripple';
            el.appendChild(ripple);

            // Get click coordinate and element witdh
            var pos         = offset(el);
            var relativeY   = (e.pageY - pos.top);
            var relativeX   = (e.pageX - pos.left);
            var scale       = 'scale('+((el.clientWidth / 100) * 10)+')';

            // Support for touch devices
            if ('touches' in e) {
              relativeY   = (e.touches[0].pageY - pos.top);
              relativeX   = (e.touches[0].pageX - pos.left);
            }

            // Attach data to element
            ripple.setAttribute('data-hold', Date.now());
            ripple.setAttribute('data-scale', scale);
            ripple.setAttribute('data-x', relativeX);
            ripple.setAttribute('data-y', relativeY);

            // Set ripple position
            var rippleStyle = {
                'top': relativeY+'px',
                'left': relativeX+'px'
            };

            ripple.className = ripple.className + ' waves-notransition';
            ripple.setAttribute('style', convertStyle(rippleStyle));
            ripple.className = ripple.className.replace('waves-notransition', '');

            // Scale the ripple
            rippleStyle['-webkit-transform'] = scale;
            rippleStyle['-moz-transform'] = scale;
            rippleStyle['-ms-transform'] = scale;
            rippleStyle['-o-transform'] = scale;
            rippleStyle.transform = scale;
            rippleStyle.opacity   = '1';

            rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['-moz-transition-duration']    = Effect.duration + 'ms';
            rippleStyle['-o-transition-duration']      = Effect.duration + 'ms';
            rippleStyle['transition-duration']         = Effect.duration + 'ms';

            rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-moz-transition-timing-function']    = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-o-transition-timing-function']      = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['transition-timing-function']         = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

            ripple.setAttribute('style', convertStyle(rippleStyle));
        },

        hide: function(e) {
            TouchHandler.touchup(e);

            var el = this;
            var width = el.clientWidth * 1.4;

            // Get first ripple
            var ripple = null;
            var ripples = el.getElementsByClassName('waves-ripple');
            if (ripples.length > 0) {
                ripple = ripples[ripples.length - 1];
            } else {
                return false;
            }

            var relativeX   = ripple.getAttribute('data-x');
            var relativeY   = ripple.getAttribute('data-y');
            var scale       = ripple.getAttribute('data-scale');

            // Get delay beetween mousedown and mouse leave
            var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
            var delay = 350 - diff;

            if (delay < 0) {
                delay = 0;
            }

            // Fade out ripple after delay
            setTimeout(function() {
                var style = {
                    'top': relativeY+'px',
                    'left': relativeX+'px',
                    'opacity': '0',

                    // Duration
                    '-webkit-transition-duration': Effect.duration + 'ms',
                    '-moz-transition-duration': Effect.duration + 'ms',
                    '-o-transition-duration': Effect.duration + 'ms',
                    'transition-duration': Effect.duration + 'ms',
                    '-webkit-transform': scale,
                    '-moz-transform': scale,
                    '-ms-transform': scale,
                    '-o-transform': scale,
                    'transform': scale,
                };

                ripple.setAttribute('style', convertStyle(style));

                setTimeout(function() {
                    try {
                        el.removeChild(ripple);
                    } catch(e) {
                        return false;
                    }
                }, Effect.duration);
            }, delay);
        },

        // Little hack to make <input> can perform waves effect
        wrapInput: function(elements) {
            for (var a = 0; a < elements.length; a++) {
                var el = elements[a];

                if (el.tagName.toLowerCase() === 'input') {
                    var parent = el.parentNode;

                    // If input already have parent just pass through
                    if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
                        continue;
                    }

                    // Put element class and style to the specified parent
                    var wrapper = document.createElement('i');
                    wrapper.className = el.className + ' waves-input-wrapper';

                    var elementStyle = el.getAttribute('style');

                    if (!elementStyle) {
                        elementStyle = '';
                    }

                    wrapper.setAttribute('style', elementStyle);

                    el.className = 'waves-button-input';
                    el.removeAttribute('style');

                    // Put element as child
                    parent.replaceChild(wrapper, el);
                    wrapper.appendChild(el);
                }
            }
        }
    };


    /**
     * Disable mousedown event for 500ms during and after touch
     */
    var TouchHandler = {
        /* uses an integer rather than bool so there's no issues with
         * needing to clear timeouts if another touch event occurred
         * within the 500ms. Cannot mouseup between touchstart and
         * touchend, nor in the 500ms after touchend. */
        touches: 0,
        allowEvent: function(e) {
            var allow = true;

            if (e.type === 'touchstart') {
                TouchHandler.touches += 1; //push
            } else if (e.type === 'touchend' || e.type === 'touchcancel') {
                setTimeout(function() {
                    if (TouchHandler.touches > 0) {
                        TouchHandler.touches -= 1; //pop after 500ms
                    }
                }, 500);
            } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
                allow = false;
            }

            return allow;
        },
        touchup: function(e) {
            TouchHandler.allowEvent(e);
        }
    };


    /**
     * Delegated click handler for .waves-effect element.
     * returns null when .waves-effect element not in "click tree"
     */
    function getWavesEffectElement(e) {
        if (TouchHandler.allowEvent(e) === false) {
            return null;
        }

        var element = null;
        var target = e.target || e.srcElement;

        while (target.parentNode !== null) {
            if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
                element = target;
                break;
            }
            target = target.parentNode;
        }
        return element;
    }

    /**
     * Bubble the click and show effect if .waves-effect elem was found
     */
    function showEffect(e) {
        var element = getWavesEffectElement(e);

        if (element !== null) {
            Effect.show(e, element);

            if ('ontouchstart' in window) {
                element.addEventListener('touchend', Effect.hide, false);
                element.addEventListener('touchcancel', Effect.hide, false);
            }

            element.addEventListener('mouseup', Effect.hide, false);
            element.addEventListener('mouseleave', Effect.hide, false);
            element.addEventListener('dragend', Effect.hide, false);
        }
    }

    Waves.displayEffect = function(options) {
        options = options || {};

        if ('duration' in options) {
            Effect.duration = options.duration;
        }

        //Wrap input inside <i> tag
        Effect.wrapInput($$('.waves-effect'));

        if ('ontouchstart' in window) {
            document.body.addEventListener('touchstart', showEffect, false);
        }

        document.body.addEventListener('mousedown', showEffect, false);
    };

    /**
     * Attach Waves to an input element (or any element which doesn't
     * bubble mouseup/mousedown events).
     *   Intended to be used with dynamically loaded forms/inputs, or
     * where the user doesn't want a delegated click handler.
     */
    Waves.attach = function(element) {
        //FUTURE: automatically add waves classes and allow users
        // to specify them with an options param? Eg. light/classic/button
        if (element.tagName.toLowerCase() === 'input') {
            Effect.wrapInput([element]);
            element = element.parentNode;
        }

        if ('ontouchstart' in window) {
            element.addEventListener('touchstart', showEffect, false);
        }

        element.addEventListener('mousedown', showEffect, false);
    };

    window.Waves = Waves;

    document.addEventListener('DOMContentLoaded', function() {
        Waves.displayEffect();
    }, false);

})(window);

(function($, Vel) {
  'use strict';

  let _defaults = {
    displayLength: Infinity,
    inDuration: 300,
    outDuration: 375,
    className: undefined,
    completeCallback: undefined,
    activationPercent: 0.8
  };

  class Toast {
    constructor(message, displayLength, className, completeCallback) {
      if (!message) {
        return;
      }


      /**
       * Options for the toast
       * @member Toast#options
       */
      this.options = {
        displayLength: displayLength,
        className: className,
        completeCallback: completeCallback
      };

      this.options = $.extend({}, Toast.defaults, this.options);
      this.message = message;

      /**
       * Describes current pan state toast
       * @type {Boolean}
       */
      this.panning = false;

      /**
       * Time remaining until toast is removed
       */
      this.timeRemaining = this.options.displayLength;

      if (Toast._toasts.length === 0) {
        Toast._createContainer();
      }

      // Create new toast
      Toast._toasts.push(this);
      let toastElement = this.createToast();
      toastElement.M_Toast = this;
      this.el = toastElement;
      this._animateIn();
      this.setTimer();
    }

    static get defaults() {
      return _defaults;
    }

    /**
     * Append toast container and add event handlers
     */
    static _createContainer() {
      let container = document.createElement('div');
      container.setAttribute('id', 'toast-container');

      // Add event handler
      container.addEventListener('touchstart', Toast._onDragStart);
      container.addEventListener('touchmove', Toast._onDragMove);
      container.addEventListener('touchend', Toast._onDragEnd);

      container.addEventListener('mousedown', Toast._onDragStart);
      document.addEventListener('mousemove', Toast._onDragMove);
      document.addEventListener('mouseup', Toast._onDragEnd);

      document.body.appendChild(container);
      Toast._container = container;
    }

    /**
     * Remove toast container and event handlers
     */
    static _removeContainer() {
      // Add event handler
      document.removeEventListener('mousemove', Toast._onDragMove);
      document.removeEventListener('mouseup', Toast._onDragEnd);

      Toast._container.parentNode.removeChild(Toast._container);
      Toast._container = null;
    }

    /**
     * Begin drag handler
     * @param {Event} e
     */
    static _onDragStart(e) {
      if (e.target && $(e.target).closest('.toast').length) {
        let $toast = $(e.target).closest('.toast');
        let toast = $toast[0].M_Toast;
        toast.panning = true;
        Toast._draggedToast = toast;
        toast.el.classList.add('panning');
        toast.el.style.transition = '';
        toast.startingXPos = Toast._xPos(e);
        toast.time = Date.now();
        toast.xPos = Toast._xPos(e);
      }
    }

    /**
     * Drag move handler
     * @param {Event} e
     */
    static _onDragMove(e) {
      if (!!Toast._draggedToast) {
        e.preventDefault();
        let toast = Toast._draggedToast;
        toast.deltaX = Math.abs(toast.xPos - Toast._xPos(e));
        toast.xPos = Toast._xPos(e);
        toast.velocityX = toast.deltaX / (Date.now() - toast.time);
        toast.time = Date.now();

        let totalDeltaX = toast.xPos - toast.startingXPos;
        let activationDistance =
            toast.el.offsetWidth * toast.options.activationPercent;
        toast.el.style.transform = `translateX(${totalDeltaX}px)`;
        toast.el.style.opacity = 1-Math.abs(totalDeltaX / activationDistance);
      }
    }

    /**
     * End drag handler
     * @param {Event} e
     */
    static _onDragEnd(e) {
      if (!!Toast._draggedToast) {
        let toast = Toast._draggedToast;
        toast.panning = false;
        toast.el.classList.remove('panning');

        let totalDeltaX = toast.xPos - toast.startingXPos;
        let activationDistance =
            toast.el.offsetWidth * toast.options.activationPercent;
        let shouldBeDismissed = Math.abs(totalDeltaX) > activationDistance ||
            toast.velocityX > 1;

        // Remove toast
        if (shouldBeDismissed) {
          toast.wasSwiped = true;
          toast.remove();

        // Animate toast back to original position
        } else {
          toast.el.style.transition = 'transform .2s, opacity .2s';
          toast.el.style.transform = '';
          toast.el.style.opacity = '';
        }
        Toast._draggedToast = null;
      }
    }

    /**
     * Get x position of mouse or touch event
     * @param {Event} e
     */
    static _xPos(e) {
      if (e.targetTouches && (e.targetTouches.length >= 1)) {
        return e.targetTouches[0].clientX;
      }
      // mouse event
      return e.clientX;
    }

    /**
     * Remove all toasts
     */
    static removeAll() {
      for(let toastIndex in Toast._toasts) {
        Toast._toasts[toastIndex].remove();
      }
    }


    /**
     * Create toast and append it to toast container
     */
    createToast() {
      let toast = document.createElement('div');
      toast.classList.add('toast');

      // Add custom classes onto toast
      if (this.options.className) {
        let classes = this.options.className.split(' ');
        let i, count;
        for (i = 0, count = classes.length; i < count; i++) {
          toast.classList.add(classes[i]);
        }
      }

      // Set content
      if ( typeof HTMLElement === 'object' ?
           this.message instanceof HTMLElement :
           this.message && typeof this.message === 'object' &&
           this.message !== null && this.message.nodeType === 1 &&
           typeof this.message.nodeName==='string'
         ) {
        toast.appendChild(this.message);

      // Check if it is jQuery object
      } else if (this.message instanceof jQuery) {
        $(toast).append(this.message);

        // Insert as text;
      } else {
        toast.innerHTML = this.message;
      }

      // Append toasft
      Toast._container.appendChild(toast);
      return toast;
    }

    /**
     * Animate in toast
     */
    _animateIn() {
      // Animate toast in
      Vel(this.el, {top: 0,  opacity: 1 }, {
        duration: 300,
        easing: 'easeOutCubic',
        queue: false
      });
    }


    /**
     * Create setInterval which automatically removes toast when timeRemaining >= 0
     * has been reached
     */
    setTimer() {
      if (this.timeRemaining !== Infinity)  {
        this.counterInterval = setInterval(() => {
          // If toast is not being dragged, decrease its time remaining
          if (!this.panning) {
            this.timeRemaining -= 20;
          }

          // Animate toast out
          if (this.timeRemaining <= 0) {
            this.remove();
          }
        }, 20);
      }
    }


    /**
     * Dismiss toast with animation
     */
    remove() {
      window.clearInterval(this.counterInterval);
      let activationDistance =
          this.el.offsetWidth * this.options.activationPercent;

      if(this.wasSwiped) {
        this.el.style.transition = 'transform .05s, opacity .05s';
        this.el.style.transform = `translateX(${activationDistance}px)`;
        this.el.style.opacity = 0;
      }

      Vel(
        this.el,
        {opacity: 0, marginTop: '-40px'},
        {
          duration: this.options.outDuration,
          easing: 'easeOutExpo',
          queue: false,
          complete: () => {
            // Call the optional callback
            if(typeof(this.options.completeCallback) === 'function') {
              this.options.completeCallback();
            }
            // Remove toast from DOM
            this.el.parentNode.removeChild(this.el);
            Toast._toasts.splice(Toast._toasts.indexOf(this), 1);
            if (Toast._toasts.length === 0) {
              Toast._removeContainer();
            }
          }
        }
      );
    }
  }

  /**
   * @static
   * @memberof Toast
   * @type {Array.<Toast>}
   */
  Toast._toasts = [];

  /**
   * @static
   * @memberof Toast
   */
  Toast._container = null;

  /**
   * @static
   * @memberof Toast
   * @type {Toast}
   */
  Toast._draggedToast = null;

  Materialize.Toast = Toast;
  Materialize.toast = function(message, displayLength, className, completeCallback) {
    return new Toast(message, displayLength, className, completeCallback);
  };
})(jQuery, Materialize.Vel);

(function ($) {

  var methods = {
    init : function(options) {
      var defaults = {
        menuWidth: 300,
        edge: 'left',
        closeOnClick: false,
        draggable: true,
        onOpen: null,
        onClose: null
      };
      options = $.extend(defaults, options);

      $(this).each(function(){
        var $this = $(this);
        var menuId = $this.attr('data-activates');
        var menu = $("#"+ menuId);

        // Set to width
        if (options.menuWidth != 300) {
          menu.css('width', options.menuWidth);
        }

        // Add Touch Area
        var $dragTarget = $('.drag-target[data-sidenav="' + menuId + '"]');
        if (options.draggable) {
          // Regenerate dragTarget
          if ($dragTarget.length) {
            $dragTarget.remove();
          }

          $dragTarget = $('<div class="drag-target"></div>').attr('data-sidenav', menuId);
          $('body').append($dragTarget);
        } else {
          $dragTarget = $();
        }

        if (options.edge == 'left') {
          menu.css('transform', 'translateX(-100%)');
          $dragTarget.css({'left': 0}); // Add Touch Area
        }
        else {
          menu.addClass('right-aligned') // Change text-alignment to right
            .css('transform', 'translateX(100%)');
          $dragTarget.css({'right': 0}); // Add Touch Area
        }

        // If fixed sidenav, bring menu out
        if (menu.hasClass('fixed')) {
            if (window.innerWidth > 992) {
              menu.css('transform', 'translateX(0)');
            }
          }

        // Window resize to reset on large screens fixed
        if (menu.hasClass('fixed')) {
          $(window).resize( function() {
            if (window.innerWidth > 992) {
              // Close menu if window is resized bigger than 992 and user has fixed sidenav
              if ($('#sidenav-overlay').length !== 0 && menuOut) {
                removeMenu(true);
              }
              else {
                // menu.removeAttr('style');
                menu.css('transform', 'translateX(0%)');
                // menu.css('width', options.menuWidth);
              }
            }
            else if (menuOut === false){
              if (options.edge === 'left') {
                menu.css('transform', 'translateX(-100%)');
              } else {
                menu.css('transform', 'translateX(100%)');
              }

            }

          });
        }

        // if closeOnClick, then add close event for all a tags in side sideNav
        if (options.closeOnClick === true) {
          menu.on("click.itemclick", "a:not(.collapsible-header)", function(){
            if (!(window.innerWidth > 992 && menu.hasClass('fixed'))){
              removeMenu();
            }
          });
        }

        var removeMenu = function(restoreNav) {
          panning = false;
          menuOut = false;
          // Reenable scrolling
          $('body').css({
            overflow: '',
            width: ''
          });

          $('#sidenav-overlay').velocity({opacity: 0}, {duration: 200,
              queue: false, easing: 'easeOutQuad',
            complete: function() {
              $(this).remove();
            } });
          if (options.edge === 'left') {
            // Reset phantom div
            $dragTarget.css({width: '', right: '', left: '0'});
            menu.velocity(
              {'translateX': '-100%'},
              { duration: 200,
                queue: false,
                easing: 'easeOutCubic',
                complete: function() {
                  if (restoreNav === true) {
                    // Restore Fixed sidenav
                    menu.removeAttr('style');
                    menu.css('width', options.menuWidth);
                  }
                }

            });
          }
          else {
            // Reset phantom div
            $dragTarget.css({width: '', right: '0', left: ''});
            menu.velocity(
              {'translateX': '100%'},
              { duration: 200,
                queue: false,
                easing: 'easeOutCubic',
                complete: function() {
                  if (restoreNav === true) {
                    // Restore Fixed sidenav
                    menu.removeAttr('style');
                    menu.css('width', options.menuWidth);
                  }
                }
              });
          }

          // Callback
          if (typeof(options.onClose) === 'function') {
            options.onClose.call(this, menu);
          }
        }



        // Touch Event
        var panning = false;
        var menuOut = false;

        if (options.draggable) {
          $dragTarget.on('click', function(){
            if (menuOut) {
              removeMenu();
            }
          });

          $dragTarget.hammer({
            prevent_default: false
          }).on('pan', function(e) {

            if (e.gesture.pointerType == "touch") {

              var direction = e.gesture.direction;
              var x = e.gesture.center.x;
              var y = e.gesture.center.y;
              var velocityX = e.gesture.velocityX;

              // Vertical scroll bugfix
              if (x === 0 && y === 0) {
                return;
              }

              // Disable Scrolling
              var $body = $('body');
              var $overlay = $('#sidenav-overlay');
              var oldWidth = $body.innerWidth();
              $body.css('overflow', 'hidden');
              $body.width(oldWidth);

              // If overlay does not exist, create one and if it is clicked, close menu
              if ($overlay.length === 0) {
                $overlay = $('<div id="sidenav-overlay"></div>');
                $overlay.css('opacity', 0).click( function(){
                  removeMenu();
                });

                // Run 'onOpen' when sidenav is opened via touch/swipe if applicable
                if (typeof(options.onOpen) === 'function') {
                  options.onOpen.call(this, menu);
                }

                $('body').append($overlay);
              }

              // Keep within boundaries
              if (options.edge === 'left') {
                if (x > options.menuWidth) { x = options.menuWidth; }
                else if (x < 0) { x = 0; }
              }

              if (options.edge === 'left') {
                // Left Direction
                if (x < (options.menuWidth / 2)) { menuOut = false; }
                // Right Direction
                else if (x >= (options.menuWidth / 2)) { menuOut = true; }
                menu.css('transform', 'translateX(' + (x - options.menuWidth) + 'px)');
              }
              else {
                // Left Direction
                if (x < (window.innerWidth - options.menuWidth / 2)) {
                  menuOut = true;
                }
                // Right Direction
                else if (x >= (window.innerWidth - options.menuWidth / 2)) {
                 menuOut = false;
               }
                var rightPos = (x - options.menuWidth / 2);
                if (rightPos < 0) {
                  rightPos = 0;
                }

                menu.css('transform', 'translateX(' + rightPos + 'px)');
              }


              // Percentage overlay
              var overlayPerc;
              if (options.edge === 'left') {
                overlayPerc = x / options.menuWidth;
                $overlay.velocity({opacity: overlayPerc }, {duration: 10, queue: false, easing: 'easeOutQuad'});
              }
              else {
                overlayPerc = Math.abs((x - window.innerWidth) / options.menuWidth);
                $overlay.velocity({opacity: overlayPerc }, {duration: 10, queue: false, easing: 'easeOutQuad'});
              }
            }

          }).on('panend', function(e) {

            if (e.gesture.pointerType == "touch") {
              var $overlay = $('#sidenav-overlay');
              var velocityX = e.gesture.velocityX;
              var x = e.gesture.center.x;
              var leftPos = x - options.menuWidth;
              var rightPos = x - options.menuWidth / 2;
              if (leftPos > 0 ) {
                leftPos = 0;
              }
              if (rightPos < 0) {
                rightPos = 0;
              }
              panning = false;

              if (options.edge === 'left') {
                // If velocityX <= 0.3 then the user is flinging the menu closed so ignore menuOut
                if ((menuOut && velocityX <= 0.3) || velocityX < -0.5) {
                  // Return menu to open
                  if (leftPos !== 0) {
                    menu.velocity({'translateX': [0, leftPos]}, {duration: 300, queue: false, easing: 'easeOutQuad'});
                  }

                  $overlay.velocity({opacity: 1 }, {duration: 50, queue: false, easing: 'easeOutQuad'});
                  $dragTarget.css({width: '50%', right: 0, left: ''});
                  menuOut = true;
                }
                else if (!menuOut || velocityX > 0.3) {
                  // Enable Scrolling
                  $('body').css({
                    overflow: '',
                    width: ''
                  });
                  // Slide menu closed
                  menu.velocity({'translateX': [-1 * options.menuWidth - 10, leftPos]}, {duration: 200, queue: false, easing: 'easeOutQuad'});
                  $overlay.velocity({opacity: 0 }, {duration: 200, queue: false, easing: 'easeOutQuad',
                    complete: function () {
                      // Run 'onClose' when sidenav is closed via touch/swipe if applicable
                      if (typeof(options.onClose) === 'function') {
                        options.onClose.call(this, menu);
                      }

                      $(this).remove();
                    }});
                  $dragTarget.css({width: '10px', right: '', left: 0});
                }
              }
              else {
                if ((menuOut && velocityX >= -0.3) || velocityX > 0.5) {
                  // Return menu to open
                  if (rightPos !== 0) {
                    menu.velocity({'translateX': [0, rightPos]}, {duration: 300, queue: false, easing: 'easeOutQuad'});
                  }

                  $overlay.velocity({opacity: 1 }, {duration: 50, queue: false, easing: 'easeOutQuad'});
                  $dragTarget.css({width: '50%', right: '', left: 0});
                  menuOut = true;
                }
                else if (!menuOut || velocityX < -0.3) {
                  // Enable Scrolling
                  $('body').css({
                    overflow: '',
                    width: ''
                  });

                  // Slide menu closed
                  menu.velocity({'translateX': [options.menuWidth + 10, rightPos]}, {duration: 200, queue: false, easing: 'easeOutQuad'});
                  $overlay.velocity({opacity: 0 }, {duration: 200, queue: false, easing: 'easeOutQuad',
                    complete: function () {
                      // Run 'onClose' when sidenav is closed via touch/swipe if applicable
                      if (typeof(options.onClose) === 'function') {
                        options.onClose.call(this, menu);
                      }

                      $(this).remove();
                    }});
                  $dragTarget.css({width: '10px', right: 0, left: ''});
                }
              }

            }
          });
        }

        $this.off('click.sidenav').on('click.sidenav', function() {
          if (menuOut === true) {
            menuOut = false;
            panning = false;
            removeMenu();
          }
          else {

            // Disable Scrolling
            var $body = $('body');
            var $overlay = $('<div id="sidenav-overlay"></div>');
            var oldWidth = $body.innerWidth();
            $body.css('overflow', 'hidden');
            $body.width(oldWidth);

            // Push current drag target on top of DOM tree
            $('body').append($dragTarget);

            if (options.edge === 'left') {
              $dragTarget.css({width: '50%', right: 0, left: ''});
              menu.velocity({'translateX': [0, -1 * options.menuWidth]}, {duration: 300, queue: false, easing: 'easeOutQuad'});
            }
            else {
              $dragTarget.css({width: '50%', right: '', left: 0});
              menu.velocity({'translateX': [0, options.menuWidth]}, {duration: 300, queue: false, easing: 'easeOutQuad'});
            }

            // Overlay close on click
            $overlay.css('opacity', 0)
              .click(function() {
                menuOut = false;
                panning = false;
                removeMenu();
                $overlay.velocity({opacity: 0}, {duration: 300, queue: false, easing: 'easeOutQuad',
                  complete: function() {
                    $(this).remove();
                  }
                });
              });

            // Append body
            $('body').append($overlay);
            $overlay.velocity({opacity: 1}, {duration: 300, queue: false, easing: 'easeOutQuad',
              complete: function () {
                menuOut = true;
                panning = false;
              }
            });

            // Callback
            if (typeof(options.onOpen) === 'function') {
              options.onOpen.call(this, menu);
            }
          }

          return false;
        });
      });


    },
    destroy: function () {
      var $overlay = $('#sidenav-overlay');
      var $dragTarget = $('.drag-target[data-sidenav="' + $(this).attr('data-activates') + '"]');
      $overlay.trigger('click');
      $dragTarget.remove();
      $(this).off('click');
      $overlay.remove();
    },
    show : function() {
      this.trigger('click');
    },
    hide : function() {
      $('#sidenav-overlay').trigger('click');
    }
  };


  $.fn.sideNav = function(methodOrOptions) {
    if ( methods[methodOrOptions] ) {
      return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      // Default to "init"
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.sideNav' );
    }
  }; // Plugin end
}( jQuery ));

/**
 * Extend jquery with a scrollspy plugin.
 * This watches the window scroll and fires events when elements are scrolled into viewport.
 *
 * throttle() and getTime() taken from Underscore.js
 * https://github.com/jashkenas/underscore
 *
 * @author Copyright 2013 John Smart
 * @license https://raw.github.com/thesmart/jquery-scrollspy/master/LICENSE
 * @see https://github.com/thesmart
 * @version 0.1.2
 */
(function($) {

	var jWindow = $(window);
	var elements = [];
	var elementsInView = [];
	var isSpying = false;
	var ticks = 0;
	var unique_id = 1;
	var offset = {
		top : 0,
		right : 0,
		bottom : 0,
		left : 0,
	}

	/**
	 * Find elements that are within the boundary
	 * @param {number} top
	 * @param {number} right
	 * @param {number} bottom
	 * @param {number} left
	 * @return {jQuery}		A collection of elements
	 */
	function findElements(top, right, bottom, left) {
		var hits = $();
		$.each(elements, function(i, element) {
			if (element.height() > 0) {
				var elTop = element.offset().top,
					elLeft = element.offset().left,
					elRight = elLeft + element.width(),
					elBottom = elTop + element.height();

				var isIntersect = !(elLeft > right ||
					elRight < left ||
					elTop > bottom ||
					elBottom < top);

				if (isIntersect) {
					hits.push(element);
				}
			}
		});

		return hits;
	}


	/**
	 * Called when the user scrolls the window
	 */
	function onScroll(scrollOffset) {
		// unique tick id
		++ticks;

		// viewport rectangle
		var top = jWindow.scrollTop(),
			left = jWindow.scrollLeft(),
			right = left + jWindow.width(),
			bottom = top + jWindow.height();

		// determine which elements are in view
		var intersections = findElements(top+offset.top + scrollOffset || 200, right+offset.right, bottom+offset.bottom, left+offset.left);
		$.each(intersections, function(i, element) {

			var lastTick = element.data('scrollSpy:ticks');
			if (typeof lastTick != 'number') {
				// entered into view
				element.triggerHandler('scrollSpy:enter');
			}

			// update tick id
			element.data('scrollSpy:ticks', ticks);
		});

		// determine which elements are no longer in view
		$.each(elementsInView, function(i, element) {
			var lastTick = element.data('scrollSpy:ticks');
			if (typeof lastTick == 'number' && lastTick !== ticks) {
				// exited from view
				element.triggerHandler('scrollSpy:exit');
				element.data('scrollSpy:ticks', null);
			}
		});

		// remember elements in view for next tick
		elementsInView = intersections;
	}

	/**
	 * Called when window is resized
	*/
	function onWinSize() {
		jWindow.trigger('scrollSpy:winSize');
	}


	/**
	 * Enables ScrollSpy using a selector
	 * @param {jQuery|string} selector  The elements collection, or a selector
	 * @param {Object=} options	Optional.
        throttle : number -> scrollspy throttling. Default: 100 ms
        offsetTop : number -> offset from top. Default: 0
        offsetRight : number -> offset from right. Default: 0
        offsetBottom : number -> offset from bottom. Default: 0
        offsetLeft : number -> offset from left. Default: 0
				activeClass : string -> Class name to be added to the active link. Default: active
	 * @returns {jQuery}
	 */
	$.scrollSpy = function(selector, options) {
	  var defaults = {
			throttle: 100,
			scrollOffset: 200, // offset - 200 allows elements near bottom of page to scroll
			activeClass: 'active',
			getActiveElement: function(id) {
				return 'a[href="#' + id + '"]';
			}
    };
    options = $.extend(defaults, options);

		var visible = [];
		selector = $(selector);
		selector.each(function(i, element) {
			elements.push($(element));
			$(element).data("scrollSpy:id", i);
			// Smooth scroll to section
		  $('a[href="#' + $(element).attr('id') + '"]').click(function(e) {
		    e.preventDefault();
		    var offset = $(Materialize.escapeHash(this.hash)).offset().top + 1;
	    	$('html, body').animate({ scrollTop: offset - options.scrollOffset }, {duration: 400, queue: false, easing: 'easeOutCubic'});
		  });
		});

		offset.top = options.offsetTop || 0;
		offset.right = options.offsetRight || 0;
		offset.bottom = options.offsetBottom || 0;
		offset.left = options.offsetLeft || 0;

		var throttledScroll = Materialize.throttle(function() {
			onScroll(options.scrollOffset);
		}, options.throttle || 100);
		var readyScroll = function(){
			$(document).ready(throttledScroll);
		};

		if (!isSpying) {
			jWindow.on('scroll', readyScroll);
			jWindow.on('resize', readyScroll);
			isSpying = true;
		}

		// perform a scan once, after current execution context, and after dom is ready
		setTimeout(readyScroll, 0);


		selector.on('scrollSpy:enter', function() {
			visible = $.grep(visible, function(value) {
	      return value.height() != 0;
	    });

			var $this = $(this);

			if (visible[0]) {
				$(options.getActiveElement(visible[0].attr('id'))).removeClass(options.activeClass);
				if ($this.data('scrollSpy:id') < visible[0].data('scrollSpy:id')) {
					visible.unshift($(this));
				}
				else {
					visible.push($(this));
				}
			}
			else {
				visible.push($(this));
			}


			$(options.getActiveElement(visible[0].attr('id'))).addClass(options.activeClass);
		});
		selector.on('scrollSpy:exit', function() {
			visible = $.grep(visible, function(value) {
	      return value.height() != 0;
	    });

			if (visible[0]) {
				$(options.getActiveElement(visible[0].attr('id'))).removeClass(options.activeClass);
				var $this = $(this);
				visible = $.grep(visible, function(value) {
	        return value.attr('id') != $this.attr('id');
	      });
	      if (visible[0]) { // Check if empty
					$(options.getActiveElement(visible[0].attr('id'))).addClass(options.activeClass);
	      }
			}
		});

		return selector;
	};

	/**
	 * Listen for window resize events
	 * @param {Object=} options						Optional. Set { throttle: number } to change throttling. Default: 100 ms
	 * @returns {jQuery}		$(window)
	 */
	$.winSizeSpy = function(options) {
		$.winSizeSpy = function() { return jWindow; }; // lock from multiple calls
		options = options || {
			throttle: 100
		};
		return jWindow.on('resize', Materialize.throttle(onWinSize, options.throttle || 100));
	};

	/**
	 * Enables ScrollSpy on a collection of elements
	 * e.g. $('.scrollSpy').scrollSpy()
	 * @param {Object=} options	Optional.
											throttle : number -> scrollspy throttling. Default: 100 ms
											offsetTop : number -> offset from top. Default: 0
											offsetRight : number -> offset from right. Default: 0
											offsetBottom : number -> offset from bottom. Default: 0
											offsetLeft : number -> offset from left. Default: 0
	 * @returns {jQuery}
	 */
	$.fn.scrollSpy = function(options) {
		return $.scrollSpy($(this), options);
	};

})(jQuery);

(function ($) {
  $(document).ready(function() {

    // Function to update labels of text fields
    Materialize.updateTextFields = function() {
      var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
      $(input_selector).each(function(index, element) {
        var $this = $(this);
        if ($(element).val().length > 0 || $(element).is(':focus') || element.autofocus || $this.attr('placeholder') !== undefined) {
          $this.siblings('label').addClass('active');
        } else if ($(element)[0].validity) {
          $this.siblings('label').toggleClass('active', $(element)[0].validity.badInput === true);
        } else {
          $this.siblings('label').removeClass('active');
        }
      });
    };

    // Text based inputs
    var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';

    // Add active if form auto complete
    $(document).on('change', input_selector, function () {
      if($(this).val().length !== 0 || $(this).attr('placeholder') !== undefined) {
        $(this).siblings('label').addClass('active');
      }
      validate_field($(this));
    });

    // Add active if input element has been pre-populated on document ready
    $(document).ready(function() {
      Materialize.updateTextFields();
    });

    // HTML DOM FORM RESET handling
    $(document).on('reset', function(e) {
      var formReset = $(e.target);
      if (formReset.is('form')) {
        formReset.find(input_selector).removeClass('valid').removeClass('invalid');
        formReset.find(input_selector).each(function () {
          if ($(this).attr('value') === '') {
            $(this).siblings('label').removeClass('active');
          }
        });

        // Reset select
        formReset.find('select.initialized').each(function () {
          var reset_text = formReset.find('option[selected]').text();
          formReset.siblings('input.select-dropdown').val(reset_text);
        });
      }
    });

    // Add active when element has focus
    $(document).on('focus', input_selector, function () {
      $(this).siblings('label, .prefix').addClass('active');
    });

    $(document).on('blur', input_selector, function () {
      var $inputElement = $(this);
      var selector = ".prefix";

      if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === undefined) {
        selector += ", label";
      }

      $inputElement.siblings(selector).removeClass('active');

      validate_field($inputElement);
    });

    window.validate_field = function(object) {
      var hasLength = object.attr('data-length') !== undefined;
      var lenAttr = parseInt(object.attr('data-length'));
      var len = object.val().length;

      if (object.val().length === 0 && object[0].validity.badInput === false && !object.is(':required')) {
        if (object.hasClass('validate')) {
          object.removeClass('valid');
          object.removeClass('invalid');
        }
      }
      else {
        if (object.hasClass('validate')) {
          // Check for character counter attributes
          if ((object.is(':valid') && hasLength && (len <= lenAttr)) || (object.is(':valid') && !hasLength)) {
            object.removeClass('invalid');
            object.addClass('valid');
          }
          else {
            object.removeClass('valid');
            object.addClass('invalid');
          }
        }
      }
    };

    // Radio and Checkbox focus class
    var radio_checkbox = 'input[type=radio], input[type=checkbox]';
    $(document).on('keyup.radio', radio_checkbox, function(e) {
      // TAB, check if tabbing to radio or checkbox.
      if (e.which === 9) {
        $(this).addClass('tabbed');
        var $this = $(this);
        $this.one('blur', function(e) {

          $(this).removeClass('tabbed');
        });
        return;
      }
    });

    // Textarea Auto Resize
    var hiddenDiv = $('.hiddendiv').first();
    if (!hiddenDiv.length) {
      hiddenDiv = $('<div class="hiddendiv common"></div>');
      $('body').append(hiddenDiv);
    }
    var text_area_selector = '.materialize-textarea';

    function textareaAutoResize($textarea) {
      // Set font properties of hiddenDiv

      var fontFamily = $textarea.css('font-family');
      var fontSize = $textarea.css('font-size');
      var lineHeight = $textarea.css('line-height');
      var padding = $textarea.css('padding');

      if (fontSize) { hiddenDiv.css('font-size', fontSize); }
      if (fontFamily) { hiddenDiv.css('font-family', fontFamily); }
      if (lineHeight) { hiddenDiv.css('line-height', lineHeight); }
      if (padding) { hiddenDiv.css('padding', padding); }

      // Set original-height, if none
      if (!$textarea.data('original-height')) {
        $textarea.data('original-height', $textarea.height());
      }

      if ($textarea.attr('wrap') === 'off') {
        hiddenDiv.css('overflow-wrap', 'normal')
                 .css('white-space', 'pre');
      }

      hiddenDiv.text($textarea.val() + '\n');
      var content = hiddenDiv.html().replace(/\n/g, '<br>');
      hiddenDiv.html(content);


      // When textarea is hidden, width goes crazy.
      // Approximate with half of window size

      if ($textarea.is(':visible')) {
        hiddenDiv.css('width', $textarea.width());
      }
      else {
        hiddenDiv.css('width', $(window).width()/2);
      }


      /**
       * Resize if the new height is greater than the
       * original height of the textarea
       */
      if ($textarea.data('original-height') <= hiddenDiv.height()) {
        $textarea.css('height', hiddenDiv.height());
      } else if ($textarea.val().length < $textarea.data('previous-length')) {
        /**
         * In case the new height is less than original height, it
         * means the textarea has less text than before
         * So we set the height to the original one
         */
        $textarea.css('height', $textarea.data('original-height'));
      }
      $textarea.data('previous-length', $textarea.val().length);
    }

    $(text_area_selector).each(function () {
      var $textarea = $(this);
      /**
       * Instead of resizing textarea on document load,
       * store the original height and the original length
       */
      $textarea.data('original-height', $textarea.height());
      $textarea.data('previous-length', $textarea.val().length);
    });

    $('body').on('keyup keydown autoresize', text_area_selector, function () {
      textareaAutoResize($(this));
    });

    // File Input Path
    $(document).on('change', '.file-field input[type="file"]', function () {
      var file_field = $(this).closest('.file-field');
      var path_input = file_field.find('input.file-path');
      var files      = $(this)[0].files;
      var file_names = [];
      for (var i = 0; i < files.length; i++) {
        file_names.push(files[i].name);
      }
      path_input.val(file_names.join(", "));
      path_input.trigger('change');
    });

    /****************
    *  Range Input  *
    ****************/

    var range_type = 'input[type=range]';
    var range_mousedown = false;
    var left;

    $(range_type).each(function () {
      var thumb = $('<span class="thumb"><span class="value"></span></span>');
      $(this).after(thumb);
    });

    var showRangeBubble = function(thumb) {
      var paddingLeft = parseInt(thumb.parent().css('padding-left'));
      var marginLeft = (-7 + paddingLeft) + 'px';
      thumb.velocity({ height: "30px", width: "30px", top: "-30px", marginLeft: marginLeft}, { duration: 300, easing: 'easeOutExpo' });
    };

    var calcRangeOffset = function(range) {
      var width = range.width() - 15;
      var max = parseFloat(range.attr('max'));
      var min = parseFloat(range.attr('min'));
      var percent = (parseFloat(range.val()) - min) / (max - min);
      return percent * width;
    }

    var range_wrapper = '.range-field';
    $(document).on('change', range_type, function(e) {
      var thumb = $(this).siblings('.thumb');
      thumb.find('.value').html($(this).val());

      if (!thumb.hasClass('active')) {
        showRangeBubble(thumb);
      }

      var offsetLeft = calcRangeOffset($(this));
      thumb.addClass('active').css('left', offsetLeft);
    });

    $(document).on('mousedown touchstart', range_type, function(e) {
      var thumb = $(this).siblings('.thumb');

      // If thumb indicator does not exist yet, create it
      if (thumb.length <= 0) {
        thumb = $('<span class="thumb"><span class="value"></span></span>');
        $(this).after(thumb);
      }

      // Set indicator value
      thumb.find('.value').html($(this).val());

      range_mousedown = true;
      $(this).addClass('active');

      if (!thumb.hasClass('active')) {
        showRangeBubble(thumb);
      }

      if (e.type !== 'input') {
        var offsetLeft = calcRangeOffset($(this));
        thumb.addClass('active').css('left', offsetLeft);
      }
    });

    $(document).on('mouseup touchend', range_wrapper, function() {
      range_mousedown = false;
      $(this).removeClass('active');
    });

    $(document).on('input mousemove touchmove', range_wrapper, function(e) {
      var thumb = $(this).children('.thumb');
      var left;
      var input = $(this).find(range_type);

      if (range_mousedown) {
        if (!thumb.hasClass('active')) {
          showRangeBubble(thumb);
        }

        var offsetLeft = calcRangeOffset(input);
        thumb.addClass('active').css('left', offsetLeft);
        thumb.find('.value').html(thumb.siblings(range_type).val());
      }
    });

    $(document).on('mouseout touchleave', range_wrapper, function() {
      if (!range_mousedown) {

        var thumb = $(this).children('.thumb');
        var paddingLeft = parseInt($(this).css('padding-left'));
        var marginLeft = (7 + paddingLeft) + 'px';

        if (thumb.hasClass('active')) {
          thumb.velocity({ height: '0', width: '0', top: '10px', marginLeft: marginLeft}, { duration: 100 });
        }
        thumb.removeClass('active');
      }
    });

    /**************************
     * Auto complete plugin  *
     *************************/
    $.fn.autocomplete = function (options) {
      // Defaults
      var defaults = {
        data: {},
        limit: Infinity,
        onAutocomplete: null,
        minLength: 1
      };

      options = $.extend(defaults, options);

      return this.each(function() {
        var $input = $(this);
        var data = options.data,
            count = 0,
            activeIndex = -1,
            oldVal,
            $inputDiv = $input.closest('.input-field'); // Div to append on

        // Check if data isn't empty
        if (!$.isEmptyObject(data)) {
          var $autocomplete = $('<ul class="autocomplete-content dropdown-content"></ul>');
          var $oldAutocomplete;

          // Append autocomplete element.
          // Prevent double structure init.
          if ($inputDiv.length) {
            $oldAutocomplete = $inputDiv.children('.autocomplete-content.dropdown-content').first();
            if (!$oldAutocomplete.length) {
              $inputDiv.append($autocomplete); // Set ul in body
            }
          } else {
            $oldAutocomplete = $input.next('.autocomplete-content.dropdown-content');
            if (!$oldAutocomplete.length) {
              $input.after($autocomplete);
            }
          }
          if ($oldAutocomplete.length) {
            $autocomplete = $oldAutocomplete;
          }

          // Highlight partial match.
          var highlight = function(string, $el) {
            var img = $el.find('img');
            var matchStart = $el.text().toLowerCase().indexOf("" + string.toLowerCase() + ""),
                matchEnd = matchStart + string.length - 1,
                beforeMatch = $el.text().slice(0, matchStart),
                matchText = $el.text().slice(matchStart, matchEnd + 1),
                afterMatch = $el.text().slice(matchEnd + 1);
            $el.html("<span>" + beforeMatch + "<span class='highlight'>" + matchText + "</span>" + afterMatch + "</span>");
            if (img.length) {
              $el.prepend(img);
            }
          };

          // Reset current element position
          var resetCurrentElement = function() {
            activeIndex = -1;
            $autocomplete.find('.active').removeClass('active');
          }

          // Remove autocomplete elements
          var removeAutocomplete = function() {
            $autocomplete.empty();
            resetCurrentElement();
            oldVal = undefined;
          };

          $input.off('blur.autocomplete').on('blur.autocomplete', function() {
            removeAutocomplete();
          });

          // Perform search
          $input.off('keyup.autocomplete focus.autocomplete').on('keyup.autocomplete focus.autocomplete', function (e) {
            // Reset count.
            count = 0;
            var val = $input.val().toLowerCase();

            // Don't capture enter or arrow key usage.
            if (e.which === 13 ||
                e.which === 38 ||
                e.which === 40) {
              return;
            }


            // Check if the input isn't empty
            if (oldVal !== val) {
              removeAutocomplete();

              if (val.length >= options.minLength) {
                for(var key in data) {
                  if (data.hasOwnProperty(key) &&
                      key.toLowerCase().indexOf(val) !== -1) {
                    // Break if past limit
                    if (count >= options.limit) {
                      break;
                    }

                    var autocompleteOption = $('<li></li>');
                    if (!!data[key]) {
                      autocompleteOption.append('<img src="'+ data[key] +'" class="right circle"><span>'+ key +'</span>');
                    } else {
                      autocompleteOption.append('<span>'+ key +'</span>');
                    }

                    $autocomplete.append(autocompleteOption);
                    highlight(val, autocompleteOption);
                    count++;
                  }
                }
              }
            }

            // Update oldVal
            oldVal = val;
          });

          $input.off('keydown.autocomplete').on('keydown.autocomplete', function (e) {
            // Arrow keys and enter key usage
            var keyCode = e.which,
                liElement,
                numItems = $autocomplete.children('li').length,
                $active = $autocomplete.children('.active').first();

            // select element on Enter
            if (keyCode === 13 && activeIndex >= 0) {
              liElement = $autocomplete.children('li').eq(activeIndex);
              if (liElement.length) {
                liElement.trigger('mousedown.autocomplete');
                e.preventDefault();
              }
              return;
            }

            // Capture up and down key
            if ( keyCode === 38 || keyCode === 40 ) {
              e.preventDefault();

              if (keyCode === 38 &&
                  activeIndex > 0) {
                activeIndex--;
              }

              if (keyCode === 40 &&
                  activeIndex < (numItems - 1)) {
                activeIndex++;
              }

              $active.removeClass('active');
              if (activeIndex >= 0) {
                $autocomplete.children('li').eq(activeIndex).addClass('active');
              }
            }
          });

          // Set input value
          $autocomplete.off('mousedown.autocomplete touchstart.autocomplete').on('mousedown.autocomplete touchstart.autocomplete', 'li', function () {
            var text = $(this).text().trim();
            $input.val(text);
            $input.trigger('change');
            removeAutocomplete();

            // Handle onAutocomplete callback.
            if (typeof(options.onAutocomplete) === "function") {
              options.onAutocomplete.call(this, text);
            }
          });

        // Empty data
        } else {
          $input.off('keyup.autocomplete focus.autocomplete');
        }
      });
    };

  }); // End of $(document).ready

  /*******************
   *  Select Plugin  *
   ******************/
  $.fn.material_select = function (callback) {
    $(this).each(function(){
      var $select = $(this);

      if ($select.hasClass('browser-default')) {
        return; // Continue to next (return false breaks out of entire loop)
      }

      var multiple = $select.attr('multiple') ? true : false,
          lastID = $select.attr('data-select-id'); // Tear down structure if Select needs to be rebuilt

      if (lastID) {
        $select.parent().find('span.caret').remove();
        $select.parent().find('input').remove();

        $select.unwrap();
        $('ul#select-options-'+lastID).remove();
      }

      // If destroying the select, remove the selelct-id and reset it to it's uninitialized state.
      if(callback === 'destroy') {
        $select.removeAttr('data-select-id').removeClass('initialized');
        $(window).off('click.select');
        return;
      }

      var uniqueID = Materialize.guid();
      $select.attr('data-select-id', uniqueID);
      var wrapper = $('<div class="select-wrapper"></div>');
      wrapper.addClass($select.attr('class'));
      if ($select.is(':disabled'))
        wrapper.addClass('disabled');
      var options = $('<ul id="select-options-' + uniqueID +'" class="dropdown-content select-dropdown ' + (multiple ? 'multiple-select-dropdown' : '') + '"></ul>'),
          selectChildren = $select.children('option, optgroup'),
          valuesSelected = [],
          optionsHover = false;

      var label = $select.find('option:selected').html() || $select.find('option:first').html() || "";

      // Function that renders and appends the option taking into
      // account type and possible image icon.
      var appendOptionWithIcon = function(select, option, type) {
        // Add disabled attr if disabled
        var disabledClass = (option.is(':disabled')) ? 'disabled ' : '';
        var optgroupClass = (type === 'optgroup-option') ? 'optgroup-option ' : '';
        var multipleCheckbox = multiple ? '<input type="checkbox"' + disabledClass + '/><label></label>' : '';

        // add icons
        var icon_url = option.data('icon');
        var classes = option.attr('class');
        if (!!icon_url) {
          var classString = '';
          if (!!classes) classString = ' class="' + classes + '"';

          // Check for multiple type.
          options.append($('<li class="' + disabledClass + optgroupClass + '"><img alt="" src="' + icon_url + '"' + classString + '><span>' + multipleCheckbox + option.html() + '</span></li>'));
          return true;
        }

        // Check for multiple type.
        options.append($('<li class="' + disabledClass + optgroupClass + '"><span>' + multipleCheckbox + option.html() + '</span></li>'));
      };

      /* Create dropdown structure. */
      if (selectChildren.length) {
        selectChildren.each(function() {
          if ($(this).is('option')) {
            // Direct descendant option.
            if (multiple) {
              appendOptionWithIcon($select, $(this), 'multiple');

            } else {
              appendOptionWithIcon($select, $(this));
            }
          } else if ($(this).is('optgroup')) {
            // Optgroup.
            var selectOptions = $(this).children('option');
            options.append($('<li class="optgroup"><span>' + $(this).attr('label') + '</span></li>'));

            selectOptions.each(function() {
              appendOptionWithIcon($select, $(this), 'optgroup-option');
            });
          }
        });
      }

      options.find('li:not(.optgroup)').each(function (i) {
        $(this).click(function (e) {
          // Check if option element is disabled
          if (!$(this).hasClass('disabled') && !$(this).hasClass('optgroup')) {
            var selected = true;

            if (multiple) {
              $('input[type="checkbox"]', this).prop('checked', function(i, v) { return !v; });
              selected = toggleEntryFromArray(valuesSelected, i, $select);
              $newSelect.trigger('focus');
            } else {
              options.find('li').removeClass('active');
              $(this).toggleClass('active');
              $newSelect.val($(this).text());
            }

            activateOption(options, $(this));
            $select.find('option').eq(i).prop('selected', selected);
            // Trigger onchange() event
            $select.trigger('change');
            if (typeof callback !== 'undefined') callback();
          }

          e.stopPropagation();
        });
      });

      // Wrap Elements
      $select.wrap(wrapper);
      // Add Select Display Element
      var dropdownIcon = $('<span class="caret">&#9660;</span>');

      // escape double quotes
      var sanitizedLabelHtml = label.replace(/"/g, '&quot;');

      var $newSelect = $('<input type="text" class="select-dropdown" readonly="true" ' + (($select.is(':disabled')) ? 'disabled' : '') + ' data-activates="select-options-' + uniqueID +'" value="'+ sanitizedLabelHtml +'"/>');
      $select.before($newSelect);
      $newSelect.before(dropdownIcon);

      $newSelect.after(options);
      // Check if section element is disabled
      if (!$select.is(':disabled')) {
        $newSelect.dropdown({'hover': false});
      }

      // Copy tabindex
      if ($select.attr('tabindex')) {
        $($newSelect[0]).attr('tabindex', $select.attr('tabindex'));
      }

      $select.addClass('initialized');

      $newSelect.on({
        'focus': function (){
          if ($('ul.select-dropdown').not(options[0]).is(':visible')) {
            $('input.select-dropdown').trigger('close');
            $(window).off('click.select');
          }
          if (!options.is(':visible')) {
            $(this).trigger('open', ['focus']);
            var label = $(this).val();
            if (multiple && label.indexOf(',') >= 0) {
              label = label.split(',')[0];
            }

            var selectedOption = options.find('li').filter(function() {
              return $(this).text().toLowerCase() === label.toLowerCase();
            })[0];
            activateOption(options, selectedOption, true);

            $(window).off('click.select').on('click.select', function () {
              multiple && (optionsHover || $newSelect.trigger('close'));
              $(window).off('click.select');
            });
          }
        },
        'click': function (e){
          e.stopPropagation();
        }
      });

      $newSelect.on('blur', function() {
        if (!multiple) {
          $(this).trigger('close');
          $(window).off('click.select');
        }
        options.find('li.selected').removeClass('selected');
      });

      options.hover(function() {
        optionsHover = true;
      }, function () {
        optionsHover = false;
      });

      // Add initial multiple selections.
      if (multiple) {
        $select.find("option:selected:not(:disabled)").each(function () {
          var index = this.index;

          toggleEntryFromArray(valuesSelected, index, $select);
          options.find("li:not(.optgroup)").eq(index).find(":checkbox").prop("checked", true);
        });
      }

      /**
       * Make option as selected and scroll to selected position
       * @param {jQuery} collection  Select options jQuery element
       * @param {Element} newOption  element of the new option
       * @param {Boolean} firstActivation  If on first activation of select
       */
      var activateOption = function(collection, newOption, firstActivation) {
        if (newOption) {
          collection.find('li.selected').removeClass('selected');
          var option = $(newOption);
          option.addClass('selected');
          if (!multiple || !!firstActivation) {
            options.scrollTo(option);
          }
        }
      };

      // Allow user to search by typing
      // this array is cleared after 1 second
      var filterQuery = [],
          onKeyDown = function(e){
            // TAB - switch to another input
            if(e.which == 9){
              $newSelect.trigger('close');
              return;
            }

            // ARROW DOWN WHEN SELECT IS CLOSED - open select options
            if(e.which == 40 && !options.is(':visible')){
              $newSelect.trigger('open');
              return;
            }

            // ENTER WHEN SELECT IS CLOSED - submit form
            if(e.which == 13 && !options.is(':visible')){
              return;
            }

            e.preventDefault();

            // CASE WHEN USER TYPE LETTERS
            var letter = String.fromCharCode(e.which).toLowerCase(),
                nonLetters = [9,13,27,38,40];
            if (letter && (nonLetters.indexOf(e.which) === -1)) {
              filterQuery.push(letter);

              var string = filterQuery.join(''),
                  newOption = options.find('li').filter(function() {
                    return $(this).text().toLowerCase().indexOf(string) === 0;
                  })[0];

              if (newOption) {
                activateOption(options, newOption);
              }
            }

            // ENTER - select option and close when select options are opened
            if (e.which == 13) {
              var activeOption = options.find('li.selected:not(.disabled)')[0];
              if(activeOption){
                $(activeOption).trigger('click');
                if (!multiple) {
                  $newSelect.trigger('close');
                }
              }
            }

            // ARROW DOWN - move to next not disabled option
            if (e.which == 40) {
              if (options.find('li.selected').length) {
                newOption = options.find('li.selected').next('li:not(.disabled)')[0];
              } else {
                newOption = options.find('li:not(.disabled)')[0];
              }
              activateOption(options, newOption);
            }

            // ESC - close options
            if (e.which == 27) {
              $newSelect.trigger('close');
            }

            // ARROW UP - move to previous not disabled option
            if (e.which == 38) {
              newOption = options.find('li.selected').prev('li:not(.disabled)')[0];
              if(newOption)
                activateOption(options, newOption);
            }

            // Automaticaly clean filter query so user can search again by starting letters
            setTimeout(function(){ filterQuery = []; }, 1000);
          };

      $newSelect.on('keydown', onKeyDown);
    });

    function toggleEntryFromArray(entriesArray, entryIndex, select) {
      var index = entriesArray.indexOf(entryIndex),
          notAdded = index === -1;

      if (notAdded) {
        entriesArray.push(entryIndex);
      } else {
        entriesArray.splice(index, 1);
      }

      select.siblings('ul.dropdown-content').find('li:not(.optgroup)').eq(entryIndex).toggleClass('active');

      // use notAdded instead of true (to detect if the option is selected or not)
      select.find('option').eq(entryIndex).prop('selected', notAdded);
      setValueToInput(entriesArray, select);

      return notAdded;
    }

    function setValueToInput(entriesArray, select) {
      var value = '';

      for (var i = 0, count = entriesArray.length; i < count; i++) {
        var text = select.find('option').eq(entriesArray[i]).text();

        i === 0 ? value += text : value += ', ' + text;
      }

      if (value === '') {
        value = select.find('option:disabled').eq(0).text();
      }

      select.siblings('input.select-dropdown').val(value);
    }
  };

}( jQuery ));

(function ($) {

  var methods = {

    init : function(options) {
      var defaults = {
        indicators: true,
        height: 400,
        transition: 500,
        interval: 6000
      };
      options = $.extend(defaults, options);

      return this.each(function() {

        // For each slider, we want to keep track of
        // which slide is active and its associated content
        var $this = $(this);
        var $slider = $this.find('ul.slides').first();
        var $slides = $slider.find('> li');
        var $active_index = $slider.find('.active').index();
        var $active, $indicators, $interval;
        if ($active_index != -1) { $active = $slides.eq($active_index); }

        // Transitions the caption depending on alignment
        function captionTransition(caption, duration) {
          if (caption.hasClass("center-align")) {
            caption.velocity({opacity: 0, translateY: -100}, {duration: duration, queue: false});
          }
          else if (caption.hasClass("right-align")) {
            caption.velocity({opacity: 0, translateX: 100}, {duration: duration, queue: false});
          }
          else if (caption.hasClass("left-align")) {
            caption.velocity({opacity: 0, translateX: -100}, {duration: duration, queue: false});
          }
        }

        // This function will transition the slide to any index of the next slide
        function moveToSlide(index) {
          // Wrap around indices.
          if (index >= $slides.length) index = 0;
          else if (index < 0) index = $slides.length -1;

          $active_index = $slider.find('.active').index();

          // Only do if index changes
          if ($active_index != index) {
            $active = $slides.eq($active_index);
            $caption = $active.find('.caption');

            $active.removeClass('active');
            $active.velocity({opacity: 0}, {duration: options.transition, queue: false, easing: 'easeOutQuad',
                              complete: function() {
                                $slides.not('.active').velocity({opacity: 0, translateX: 0, translateY: 0}, {duration: 0, queue: false});
                              } });
            captionTransition($caption, options.transition);


            // Update indicators
            if (options.indicators) {
              $indicators.eq($active_index).removeClass('active');
            }

            $slides.eq(index).velocity({opacity: 1}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
            $slides.eq(index).find('.caption').velocity({opacity: 1, translateX: 0, translateY: 0}, {duration: options.transition, delay: options.transition, queue: false, easing: 'easeOutQuad'});
            $slides.eq(index).addClass('active');


            // Update indicators
            if (options.indicators) {
              $indicators.eq(index).addClass('active');
            }
          }
        }

        // Set height of slider
        // If fullscreen, do nothing
        if (!$this.hasClass('fullscreen')) {
          if (options.indicators) {
            // Add height if indicators are present
            $this.height(options.height + 40);
          }
          else {
            $this.height(options.height);
          }
          $slider.height(options.height);
        }


        // Set initial positions of captions
        $slides.find('.caption').each(function () {
          captionTransition($(this), 0);
        });

        // Move img src into background-image
        $slides.find('img').each(function () {
          var placeholderBase64 = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
          if ($(this).attr('src') !== placeholderBase64) {
            $(this).css('background-image', 'url("' + $(this).attr('src') + '")' );
            $(this).attr('src', placeholderBase64);
          }
        });

        // dynamically add indicators
        if (options.indicators) {
          $indicators = $('<ul class="indicators"></ul>');
          $slides.each(function( index ) {
            var $indicator = $('<li class="indicator-item"></li>');

            // Handle clicks on indicators
            $indicator.click(function () {
              var $parent = $slider.parent();
              var curr_index = $parent.find($(this)).index();
              moveToSlide(curr_index);

              // reset interval
              clearInterval($interval);
              $interval = setInterval(
                function(){
                  $active_index = $slider.find('.active').index();
                  if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
                  else $active_index += 1;

                  moveToSlide($active_index);

                }, options.transition + options.interval
              );
            });
            $indicators.append($indicator);
          });
          $this.append($indicators);
          $indicators = $this.find('ul.indicators').find('li.indicator-item');
        }

        if ($active) {
          $active.show();
        }
        else {
          $slides.first().addClass('active').velocity({opacity: 1}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});

          $active_index = 0;
          $active = $slides.eq($active_index);

          // Update indicators
          if (options.indicators) {
            $indicators.eq($active_index).addClass('active');
          }
        }

        // Adjust height to current slide
        $active.find('img').each(function() {
          $active.find('.caption').velocity({opacity: 1, translateX: 0, translateY: 0}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
        });

        // auto scroll
        $interval = setInterval(
          function(){
            $active_index = $slider.find('.active').index();
            moveToSlide($active_index + 1);

          }, options.transition + options.interval
        );


        // HammerJS, Swipe navigation

        // Touch Event
        var panning = false;
        var swipeLeft = false;
        var swipeRight = false;

        $this.hammer({
            prevent_default: false
        }).on('pan', function(e) {
          if (e.gesture.pointerType === "touch") {

            // reset interval
            clearInterval($interval);

            var direction = e.gesture.direction;
            var x = e.gesture.deltaX;
            var velocityX = e.gesture.velocityX;
            var velocityY = e.gesture.velocityY;

            $curr_slide = $slider.find('.active');
            if (Math.abs(velocityX) > Math.abs(velocityY)) {
              $curr_slide.velocity({ translateX: x
                  }, {duration: 50, queue: false, easing: 'easeOutQuad'});
            }

            // Swipe Left
            if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.65)) {
              swipeRight = true;
            }
            // Swipe Right
            else if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.65)) {
              swipeLeft = true;
            }

            // Make Slide Behind active slide visible
            var next_slide;
            if (swipeLeft) {
              next_slide = $curr_slide.next();
              if (next_slide.length === 0) {
                next_slide = $slides.first();
              }
              next_slide.velocity({ opacity: 1
                  }, {duration: 300, queue: false, easing: 'easeOutQuad'});
            }
            if (swipeRight) {
              next_slide = $curr_slide.prev();
              if (next_slide.length === 0) {
                next_slide = $slides.last();
              }
              next_slide.velocity({ opacity: 1
                  }, {duration: 300, queue: false, easing: 'easeOutQuad'});
            }


          }

        }).on('panend', function(e) {
          if (e.gesture.pointerType === "touch") {

            $curr_slide = $slider.find('.active');
            panning = false;
            curr_index = $slider.find('.active').index();

            if (!swipeRight && !swipeLeft || $slides.length <=1) {
              // Return to original spot
              $curr_slide.velocity({ translateX: 0
                  }, {duration: 300, queue: false, easing: 'easeOutQuad'});
            }
            else if (swipeLeft) {
              moveToSlide(curr_index + 1);
              $curr_slide.velocity({translateX: -1 * $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad',
                                    complete: function() {
                                      $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
                                    } });
            }
            else if (swipeRight) {
              moveToSlide(curr_index - 1);
              $curr_slide.velocity({translateX: $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad',
                                    complete: function() {
                                      $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
                                    } });
            }
            swipeLeft = false;
            swipeRight = false;

            // Restart interval
            clearInterval($interval);
            $interval = setInterval(
              function(){
                $active_index = $slider.find('.active').index();
                if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
                else $active_index += 1;

                moveToSlide($active_index);

              }, options.transition + options.interval
            );
          }
        });

        $this.on('sliderPause', function() {
          clearInterval($interval);
        });

        $this.on('sliderStart', function() {
          clearInterval($interval);
          $interval = setInterval(
            function(){
              $active_index = $slider.find('.active').index();
              if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
              else $active_index += 1;

              moveToSlide($active_index);

            }, options.transition + options.interval
          );
        });

        $this.on('sliderNext', function() {
          $active_index = $slider.find('.active').index();
          moveToSlide($active_index + 1);
        });

        $this.on('sliderPrev', function() {
          $active_index = $slider.find('.active').index();
          moveToSlide($active_index - 1);
        });

      });



    },
    pause : function() {
      $(this).trigger('sliderPause');
    },
    start : function() {
      $(this).trigger('sliderStart');
    },
    next : function() {
      $(this).trigger('sliderNext');
    },
    prev : function() {
      $(this).trigger('sliderPrev');
    }
  };


  $.fn.slider = function(methodOrOptions) {
    if ( methods[methodOrOptions] ) {
      return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      // Default to "init"
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
    }
  }; // Plugin end
}( jQuery ));

(function ($) {
  $(document).ready(function() {

    $(document).on('click.card', '.card', function (e) {
      if ($(this).find('> .card-reveal').length) {
        var $card = $(e.target).closest('.card');
        if ($card.data('initialOverflow') === undefined) {
          $card.data(
            'initialOverflow',
            $card.css('overflow') === undefined ? '' : $card.css('overflow')
          );
        }
        if ($(e.target).is($('.card-reveal .card-title')) || $(e.target).is($('.card-reveal .card-title i'))) {
          // Make Reveal animate down and display none
          $(this).find('.card-reveal').velocity(
            {translateY: 0}, {
              duration: 225,
              queue: false,
              easing: 'easeInOutQuad',
              complete: function() {
                $(this).css({ display: 'none'});
                $card.css('overflow', $card.data('initialOverflow'));
              }
            }
          );
        }
        else if ($(e.target).is($('.card .activator')) ||
                 $(e.target).is($('.card .activator i')) ) {
          $card.css('overflow', 'hidden');
          $(this).find('.card-reveal').css({ display: 'block'}).velocity("stop", false).velocity({translateY: '-100%'}, {duration: 300, queue: false, easing: 'easeInOutQuad'});
        }
      }
    });

  });
}( jQuery ));

(function ($) {
  var materialChipsDefaults = {
    data: [],
    placeholder: '',
    secondaryPlaceholder: '',
    autocompleteOptions: {},
  };

  $(document).ready(function() {
    // Handle removal of static chips.
    $(document).on('click', '.chip .close', function(e){
      var $chips = $(this).closest('.chips');
      if ($chips.attr('data-initialized')) {
        return;
      }
      $(this).closest('.chip').remove();
    });
  });

  $.fn.material_chip = function (options) {
    var self = this;
    this.$el = $(this);
    this.$document = $(document);
    this.SELS = {
      CHIPS: '.chips',
      CHIP: '.chip',
      INPUT: 'input',
      DELETE: '.material-icons',
      SELECTED_CHIP: '.selected',
    };

    if ('data' === options) {
      return this.$el.data('chips');
    }

    var curr_options = $.extend({}, materialChipsDefaults, options);
    self.hasAutocomplete = !$.isEmptyObject(curr_options.autocompleteOptions.data);

    // Initialize
    this.init = function() {
      var i = 0;
      var chips;
      self.$el.each(function(){
        var $chips = $(this);
        var chipId = Materialize.guid();
        self.chipId = chipId;

        if (!curr_options.data || !(curr_options.data instanceof Array)) {
          curr_options.data = [];
        }
        $chips.data('chips', curr_options.data);
        $chips.attr('data-index', i);
        $chips.attr('data-initialized', true);

        if (!$chips.hasClass(self.SELS.CHIPS)) {
          $chips.addClass('chips');
        }

        self.chips($chips, chipId);
        i++;
      });
    };

    this.handleEvents = function() {
      var SELS = self.SELS;

      self.$document.off('click.chips-focus', SELS.CHIPS).on('click.chips-focus', SELS.CHIPS, function(e){
        $(e.target).find(SELS.INPUT).focus();
      });

      self.$document.off('click.chips-select', SELS.CHIP).on('click.chips-select', SELS.CHIP, function(e){
        var $chip = $(e.target);
        if ($chip.length) {
          var wasSelected = $chip.hasClass('selected');
          var $chips = $chip.closest(SELS.CHIPS);
          $(SELS.CHIP).removeClass('selected');

          if (!wasSelected) {
            self.selectChip($chip.index(), $chips);
          }
        }
      });

      self.$document.off('keydown.chips').on('keydown.chips', function(e){
        if ($(e.target).is('input, textarea')) {
          return;
        }

        // delete
        var $chip = self.$document.find(SELS.CHIP + SELS.SELECTED_CHIP);
        var $chips = $chip.closest(SELS.CHIPS);
        var length = $chip.siblings(SELS.CHIP).length;
        var index;

        if (!$chip.length) {
          return;
        }

        if (e.which === 8 || e.which === 46) {
          e.preventDefault();

          index = $chip.index();
          self.deleteChip(index, $chips);

          var selectIndex = null;
          if ((index + 1) < length) {
            selectIndex = index;
          } else if (index === length || (index + 1) === length) {
            selectIndex = length - 1;
          }

          if (selectIndex < 0) selectIndex = null;

          if (null !== selectIndex) {
            self.selectChip(selectIndex, $chips);
          }
          if (!length) $chips.find('input').focus();

        // left
        } else if (e.which === 37) {
          index = $chip.index() - 1;
          if (index < 0) {
            return;
          }
          $(SELS.CHIP).removeClass('selected');
          self.selectChip(index, $chips);

        // right
        } else if (e.which === 39) {
          index = $chip.index() + 1;
          $(SELS.CHIP).removeClass('selected');
          if (index > length) {
            $chips.find('input').focus();
            return;
          }
          self.selectChip(index, $chips);
        }
      });

      self.$document.off('focusin.chips', SELS.CHIPS + ' ' + SELS.INPUT).on('focusin.chips', SELS.CHIPS + ' ' + SELS.INPUT, function(e){
        var $currChips = $(e.target).closest(SELS.CHIPS);
        $currChips.addClass('focus');
        $currChips.siblings('label, .prefix').addClass('active');
        $(SELS.CHIP).removeClass('selected');
      });

      self.$document.off('focusout.chips', SELS.CHIPS + ' ' + SELS.INPUT).on('focusout.chips', SELS.CHIPS + ' ' + SELS.INPUT, function(e){
        var $currChips = $(e.target).closest(SELS.CHIPS);
        $currChips.removeClass('focus');

        // Remove active if empty
        if ($currChips.data('chips') === undefined || !$currChips.data('chips').length) {
          $currChips.siblings('label').removeClass('active');
        }
        $currChips.siblings('.prefix').removeClass('active');
      });

      self.$document.off('keydown.chips-add', SELS.CHIPS + ' ' + SELS.INPUT).on('keydown.chips-add', SELS.CHIPS + ' ' + SELS.INPUT, function(e){
        var $target = $(e.target);
        var $chips = $target.closest(SELS.CHIPS);
        var chipsLength = $chips.children(SELS.CHIP).length;

        // enter
        if (13 === e.which) {
          // Override enter if autocompleting.
          if (self.hasAutocomplete &&
              $chips.find('.autocomplete-content.dropdown-content').length &&
              $chips.find('.autocomplete-content.dropdown-content').children().length) {
            return;
          }

          e.preventDefault();
          self.addChip({tag: $target.val()}, $chips);
          $target.val('');
          return;
        }

        // delete or left
        if ((8 === e.keyCode || 37 === e.keyCode) && '' === $target.val() && chipsLength) {
          e.preventDefault();
          self.selectChip(chipsLength - 1, $chips);
          $target.blur();
          return;
        }
      });

      // Click on delete icon in chip.
      self.$document.off('click.chips-delete', SELS.CHIPS + ' ' + SELS.DELETE).on('click.chips-delete', SELS.CHIPS + ' ' + SELS.DELETE, function(e) {
        var $target = $(e.target);
        var $chips = $target.closest(SELS.CHIPS);
        var $chip = $target.closest(SELS.CHIP);
        e.stopPropagation();
        self.deleteChip($chip.index(), $chips);
        $chips.find('input').focus();
      });
    };

    this.chips = function($chips, chipId) {
      $chips.empty();
      $chips.data('chips').forEach(function(elem){
        $chips.append(self.renderChip(elem));
      });
      $chips.append($('<input id="' + chipId +'" class="input" placeholder="">'));
      self.setPlaceholder($chips);

      // Set for attribute for label
      var label = $chips.next('label');
      if (label.length) {
        label.attr('for', chipId);

        if ($chips.data('chips')!== undefined && $chips.data('chips').length) {
          label.addClass('active');
        }
      }

      // Setup autocomplete if needed.
      var input = $('#' + chipId);
      if (self.hasAutocomplete) {
        curr_options.autocompleteOptions.onAutocomplete = function(val) {
          self.addChip({tag: val}, $chips);
          input.val('');
          input.focus();
        }
        input.autocomplete(curr_options.autocompleteOptions);
      }
    };

    /**
     * Render chip jQuery element.
     * @param {Object} elem
     * @return {jQuery}
     */
    this.renderChip = function(elem) {
      if (!elem.tag) return;

      var $renderedChip = $('<div class="chip"></div>');
      $renderedChip.text(elem.tag);
      if (elem.image) {
        $renderedChip.prepend($('<img />').attr('src', elem.image))
      }
      $renderedChip.append($('<i class="material-icons close">close</i>'));
      return $renderedChip;
    };

    this.setPlaceholder = function($chips) {
      if (($chips.data('chips') !== undefined && !$chips.data('chips').length) && curr_options.placeholder) {
        $chips.find('input').prop('placeholder', curr_options.placeholder);

      } else if (($chips.data('chips') === undefined || !!$chips.data('chips').length) && curr_options.secondaryPlaceholder) {
        $chips.find('input').prop('placeholder', curr_options.secondaryPlaceholder);
      }
    };

    this.isValid = function($chips, elem) {
      var chips = $chips.data('chips');
      var exists = false;
      for (var i=0; i < chips.length; i++) {
        if (chips[i].tag === elem.tag) {
            exists = true;
            return;
        }
      }
      return '' !== elem.tag && !exists;
    };

    this.addChip = function(elem, $chips) {
      if (!self.isValid($chips, elem)) {
        return;
      }
      var $renderedChip = self.renderChip(elem);
      var newData = [];
      var oldData = $chips.data('chips');
      for (var i = 0; i < oldData.length; i++) {
        newData.push(oldData[i]);
      }
      newData.push(elem);

      $chips.data('chips', newData);
      $renderedChip.insertBefore($chips.find('input'));
      $chips.trigger('chip.add', elem);
      self.setPlaceholder($chips);
    };

    this.deleteChip = function(chipIndex, $chips) {
      var chip = $chips.data('chips')[chipIndex];
      $chips.find('.chip').eq(chipIndex).remove();

      var newData = [];
      var oldData = $chips.data('chips');
      for (var i = 0; i < oldData.length; i++) {
        if (i !== chipIndex) {
          newData.push(oldData[i]);
        }
      }

      $chips.data('chips', newData);
      $chips.trigger('chip.delete', chip);
      self.setPlaceholder($chips);
    };

    this.selectChip = function(chipIndex, $chips) {
      var $chip = $chips.find('.chip').eq(chipIndex);
      if ($chip && false === $chip.hasClass('selected')) {
        $chip.addClass('selected');
        $chips.trigger('chip.select', $chips.data('chips')[chipIndex]);
      }
    };

    this.getChipsElement = function(index, $chips) {
      return $chips.eq(index);
    };

    // init
    this.init();

    this.handleEvents();
  };
}( jQuery ));

(function ($) {
  $.fn.pushpin = function (options) {
    // Defaults
    var defaults = {
      top: 0,
      bottom: Infinity,
      offset: 0
    };

    // Remove pushpin event and classes
    if (options === "remove") {
      this.each(function () {
        if (id = $(this).data('pushpin-id')) {
          $(window).off('scroll.' + id);
          $(this).removeData('pushpin-id').removeClass('pin-top pinned pin-bottom').removeAttr('style');
        }
      });
      return false;
    }

    options = $.extend(defaults, options);


    $index = 0;
    return this.each(function() {
      var $uniqueId = Materialize.guid(),
          $this = $(this),
          $original_offset = $(this).offset().top;

      function removePinClasses(object) {
        object.removeClass('pin-top');
        object.removeClass('pinned');
        object.removeClass('pin-bottom');
      }

      function updateElements(objects, scrolled) {
        objects.each(function () {
          // Add position fixed (because its between top and bottom)
          if (options.top <= scrolled && options.bottom >= scrolled && !$(this).hasClass('pinned')) {
            removePinClasses($(this));
            $(this).css('top', options.offset);
            $(this).addClass('pinned');
          }

          // Add pin-top (when scrolled position is above top)
          if (scrolled < options.top && !$(this).hasClass('pin-top')) {
            removePinClasses($(this));
            $(this).css('top', 0);
            $(this).addClass('pin-top');
          }

          // Add pin-bottom (when scrolled position is below bottom)
          if (scrolled > options.bottom && !$(this).hasClass('pin-bottom')) {
            removePinClasses($(this));
            $(this).addClass('pin-bottom');
            $(this).css('top', options.bottom - $original_offset);
          }
        });
      }

      $(this).data('pushpin-id', $uniqueId);
      updateElements($this, $(window).scrollTop());
      $(window).on('scroll.' + $uniqueId, function () {
        var $scrolled = $(window).scrollTop() + options.offset;
        updateElements($this, $scrolled);
      });

    });

  };
}( jQuery ));
(function ($) {
  $(document).ready(function() {

    // jQuery reverse
    $.fn.reverse = [].reverse;

    // Hover behaviour: make sure this doesn't work on .click-to-toggle FABs!
    $(document).on('mouseenter.fixedActionBtn', '.fixed-action-btn:not(.click-to-toggle):not(.toolbar)', function(e) {
      var $this = $(this);
      openFABMenu($this);
    });
    $(document).on('mouseleave.fixedActionBtn', '.fixed-action-btn:not(.click-to-toggle):not(.toolbar)', function(e) {
      var $this = $(this);
      closeFABMenu($this);
    });

    // Toggle-on-click behaviour.
    $(document).on('click.fabClickToggle', '.fixed-action-btn.click-to-toggle > a', function(e) {
      var $this = $(this);
      var $menu = $this.parent();
      if ($menu.hasClass('active')) {
        closeFABMenu($menu);
      } else {
        openFABMenu($menu);
      }
    });

    // Toolbar transition behaviour.
    $(document).on('click.fabToolbar', '.fixed-action-btn.toolbar > a', function(e) {
      var $this = $(this);
      var $menu = $this.parent();
      FABtoToolbar($menu);
    });

  });

  $.fn.extend({
    openFAB: function() {
      openFABMenu($(this));
    },
    closeFAB: function() {
      closeFABMenu($(this));
    },
    openToolbar: function() {
      FABtoToolbar($(this));
    },
    closeToolbar: function() {
      toolbarToFAB($(this));
    }
  });


  var openFABMenu = function (btn) {
    var $this = btn;
    if ($this.hasClass('active') === false) {

      // Get direction option
      var horizontal = $this.hasClass('horizontal');
      var offsetY, offsetX;

      if (horizontal === true) {
        offsetX = 40;
      } else {
        offsetY = 40;
      }

      $this.addClass('active');
      $this.find('ul .btn-floating').velocity(
        { scaleY: ".4", scaleX: ".4", translateY: offsetY + 'px', translateX: offsetX + 'px'},
        { duration: 0 });

      var time = 0;
      $this.find('ul .btn-floating').reverse().each( function () {
        $(this).velocity(
          { opacity: "1", scaleX: "1", scaleY: "1", translateY: "0", translateX: '0'},
          { duration: 80, delay: time });
        time += 40;
      });
    }
  };

  var closeFABMenu = function (btn) {
    var $this = btn;
    // Get direction option
    var horizontal = $this.hasClass('horizontal');
    var offsetY, offsetX;

    if (horizontal === true) {
      offsetX = 40;
    } else {
      offsetY = 40;
    }

    $this.removeClass('active');
    var time = 0;
    $this.find('ul .btn-floating').velocity("stop", true);
    $this.find('ul .btn-floating').velocity(
      { opacity: "0", scaleX: ".4", scaleY: ".4", translateY: offsetY + 'px', translateX: offsetX + 'px'},
      { duration: 80 }
    );
  };


  /**
   * Transform FAB into toolbar
   * @param  {Object}  object jQuery object
   */
  var FABtoToolbar = function(btn) {
    if (btn.attr('data-open') === "true") {
      return;
    }

    var offsetX, offsetY, scaleFactor;
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var btnRect = btn[0].getBoundingClientRect();
    var anchor = btn.find('> a').first();
    var menu = btn.find('> ul').first();
    var backdrop = $('<div class="fab-backdrop"></div>');
    var fabColor = anchor.css('background-color');
    anchor.append(backdrop);

    offsetX = btnRect.left - (windowWidth / 2) + (btnRect.width / 2);
    offsetY = windowHeight - btnRect.bottom;
    scaleFactor = windowWidth / backdrop.width();
    btn.attr('data-origin-bottom', btnRect.bottom);
    btn.attr('data-origin-left', btnRect.left);
    btn.attr('data-origin-width', btnRect.width);

    // Set initial state
    btn.addClass('active');
    btn.attr('data-open', true);
    btn.css({
      'text-align': 'center',
      width: '100%',
      bottom: 0,
      left: 0,
      transform: 'translateX(' + offsetX + 'px)',
      transition: 'none'
    });
    anchor.css({
      transform: 'translateY(' + -offsetY + 'px)',
      transition: 'none'
    });
    backdrop.css({
      'background-color': fabColor
    });


    setTimeout(function() {
      btn.css({
        transform: '',
        transition: 'transform .2s cubic-bezier(0.550, 0.085, 0.680, 0.530), background-color 0s linear .2s'
      });
      anchor.css({
        overflow: 'visible',
        transform: '',
        transition: 'transform .2s'
      });

      setTimeout(function() {
        btn.css({
          overflow: 'hidden',
          'background-color': fabColor
        });
        backdrop.css({
          transform: 'scale(' + scaleFactor + ')',
          transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
        });
        menu.find('> li > a').css({
          opacity: 1
        });

        // Scroll to close.
        $(window).on('scroll.fabToolbarClose', function() {
          toolbarToFAB(btn);
          $(window).off('scroll.fabToolbarClose');
          $(document).off('click.fabToolbarClose');
        });

        $(document).on('click.fabToolbarClose', function(e) {
          if (!$(e.target).closest(menu).length) {
            toolbarToFAB(btn);
            $(window).off('scroll.fabToolbarClose');
            $(document).off('click.fabToolbarClose');
          }
        });
      }, 100);
    }, 0);
  };

  /**
   * Transform toolbar back into FAB
   * @param  {Object}  object jQuery object
   */
  var toolbarToFAB = function(btn) {
    if (btn.attr('data-open') !== "true") {
      return;
    }

    var offsetX, offsetY, scaleFactor;
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var btnWidth = btn.attr('data-origin-width');
    var btnBottom = btn.attr('data-origin-bottom');
    var btnLeft = btn.attr('data-origin-left');
    var anchor = btn.find('> .btn-floating').first();
    var menu = btn.find('> ul').first();
    var backdrop = btn.find('.fab-backdrop');
    var fabColor = anchor.css('background-color');

    offsetX = btnLeft - (windowWidth / 2) + (btnWidth / 2);
    offsetY = windowHeight - btnBottom;
    scaleFactor = windowWidth / backdrop.width();


    // Hide backdrop
    btn.removeClass('active');
    btn.attr('data-open', false);
    btn.css({
      'background-color': 'transparent',
      transition: 'none'
    });
    anchor.css({
      transition: 'none'
    });
    backdrop.css({
      transform: 'scale(0)',
      'background-color': fabColor
    });
    menu.find('> li > a').css({
      opacity: ''
    });

    setTimeout(function() {
      backdrop.remove();

      // Set initial state.
      btn.css({
        'text-align': '',
        width: '',
        bottom: '',
        left: '',
        overflow: '',
        'background-color': '',
        transform: 'translate3d(' + -offsetX + 'px,0,0)'
      });
      anchor.css({
        overflow: '',
        transform: 'translate3d(0,' + offsetY + 'px,0)'
      });

      setTimeout(function() {
        btn.css({
          transform: 'translate3d(0,0,0)',
          transition: 'transform .2s'
        });
        anchor.css({
          transform: 'translate3d(0,0,0)',
          transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
        });
      }, 20);
    }, 200);
  };


}( jQuery ));

(function ($) {
  // Image transition function
  Materialize.fadeInImage = function(selectorOrEl) {
    var element;
    if (typeof(selectorOrEl) === 'string') {
      element = $(selectorOrEl);
    } else if (typeof(selectorOrEl) === 'object') {
      element = selectorOrEl;
    } else {
      return;
    }
    element.css({opacity: 0});
    $(element).velocity({opacity: 1}, {
      duration: 650,
      queue: false,
      easing: 'easeOutSine'
    });
    $(element).velocity({opacity: 1}, {
      duration: 1300,
      queue: false,
      easing: 'swing',
      step: function(now, fx) {
        fx.start = 100;
        var grayscale_setting = now/100;
        var brightness_setting = 150 - (100 - now)/1.75;

        if (brightness_setting < 100) {
          brightness_setting = 100;
        }
        if (now >= 0) {
          $(this).css({
              "-webkit-filter": "grayscale("+grayscale_setting+")" + "brightness("+brightness_setting+"%)",
              "filter": "grayscale("+grayscale_setting+")" + "brightness("+brightness_setting+"%)"
          });
        }
      }
    });
  };

  // Horizontal staggered list
  Materialize.showStaggeredList = function(selectorOrEl) {
    var element;
    if (typeof(selectorOrEl) === 'string') {
      element = $(selectorOrEl);
    } else if (typeof(selectorOrEl) === 'object') {
      element = selectorOrEl;
    } else {
      return;
    }
    var time = 0;
    element.find('li').velocity(
        { translateX: "-100px"},
        { duration: 0 });

    element.find('li').each(function() {
      $(this).velocity(
        { opacity: "1", translateX: "0"},
        { duration: 800, delay: time, easing: [60, 10] });
      time += 120;
    });
  };


  $(document).ready(function() {
    // Hardcoded .staggered-list scrollFire
    // var staggeredListOptions = [];
    // $('ul.staggered-list').each(function (i) {

    //   var label = 'scrollFire-' + i;
    //   $(this).addClass(label);
    //   staggeredListOptions.push(
    //     {selector: 'ul.staggered-list.' + label,
    //      offset: 200,
    //      callback: 'showStaggeredList("ul.staggered-list.' + label + '")'});
    // });
    // scrollFire(staggeredListOptions);

    // HammerJS, Swipe navigation

    // Touch Event
    var swipeLeft = false;
    var swipeRight = false;


    // Dismissible Collections
    $('.dismissable').each(function() {
      $(this).hammer({
        prevent_default: false
      }).on('pan', function(e) {
        if (e.gesture.pointerType === "touch") {
          var $this = $(this);
          var direction = e.gesture.direction;
          var x = e.gesture.deltaX;
          var velocityX = e.gesture.velocityX;

          $this.velocity({ translateX: x
              }, {duration: 50, queue: false, easing: 'easeOutQuad'});

          // Swipe Left
          if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.75)) {
            swipeLeft = true;
          }

          // Swipe Right
          if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.75)) {
            swipeRight = true;
          }
        }
      }).on('panend', function(e) {
        // Reset if collection is moved back into original position
        if (Math.abs(e.gesture.deltaX) < ($(this).innerWidth() / 2)) {
          swipeRight = false;
          swipeLeft = false;
        }

        if (e.gesture.pointerType === "touch") {
          var $this = $(this);
          if (swipeLeft || swipeRight) {
            var fullWidth;
            if (swipeLeft) { fullWidth = $this.innerWidth(); }
            else { fullWidth = -1 * $this.innerWidth(); }

            $this.velocity({ translateX: fullWidth,
              }, {duration: 100, queue: false, easing: 'easeOutQuad', complete:
              function() {
                $this.css('border', 'none');
                $this.velocity({ height: 0, padding: 0,
                  }, {duration: 200, queue: false, easing: 'easeOutQuad', complete:
                    function() { $this.remove(); }
                  });
              }
            });
          }
          else {
            $this.velocity({ translateX: 0,
              }, {duration: 100, queue: false, easing: 'easeOutQuad'});
          }
          swipeLeft = false;
          swipeRight = false;
        }
      });

    });


    // time = 0
    // // Vertical Staggered list
    // $('ul.staggered-list.vertical li').velocity(
    //     { translateY: "100px"},
    //     { duration: 0 });

    // $('ul.staggered-list.vertical li').each(function() {
    //   $(this).velocity(
    //     { opacity: "1", translateY: "0"},
    //     { duration: 800, delay: time, easing: [60, 25] });
    //   time += 120;
    // });

    // // Fade in and Scale
    // $('.fade-in.scale').velocity(
    //     { scaleX: .4, scaleY: .4, translateX: -600},
    //     { duration: 0});
    // $('.fade-in').each(function() {
    //   $(this).velocity(
    //     { opacity: "1", scaleX: 1, scaleY: 1, translateX: 0},
    //     { duration: 800, easing: [60, 10] });
    // });
  });
}( jQuery ));

(function($) {

  var scrollFireEventsHandled = false;

  // Input: Array of JSON objects {selector, offset, callback}
  Materialize.scrollFire = function(options) {
    var onScroll = function() {
      var windowScroll = window.pageYOffset + window.innerHeight;

      for (var i = 0 ; i < options.length; i++) {
        // Get options from each line
        var value = options[i];
        var selector = value.selector,
            offset = value.offset,
            callback = value.callback;

        var currentElement = document.querySelector(selector);
        if ( currentElement !== null) {
          var elementOffset = currentElement.getBoundingClientRect().top + window.pageYOffset;

          if (windowScroll > (elementOffset + offset)) {
            if (value.done !== true) {
              if (typeof(callback) === 'function') {
                callback.call(this, currentElement);
              } else if (typeof(callback) === 'string') {
                var callbackFunc = new Function(callback);
                callbackFunc(currentElement);
              }
              value.done = true;
            }
          }
        }
      }
    };


    var throttledScroll = Materialize.throttle(function() {
      onScroll();
    }, options.throttle || 100);

    if (!scrollFireEventsHandled) {
      window.addEventListener("scroll", throttledScroll);
      window.addEventListener("resize", throttledScroll);
      scrollFireEventsHandled = true;
    }

    // perform a scan once, after current execution context, and after dom is ready
    setTimeout(throttledScroll, 0);
  };

})(jQuery);

/*!
 * pickadate.js v3.5.0, 2014/04/13
 * By Amsul, http://amsul.ca
 * Hosted on http://amsul.github.io/pickadate.js
 * Licensed under MIT
 */

(function ( factory ) {

    Materialize.Picker = factory( jQuery )

}(function( $ ) {

var $window = $( window )
var $document = $( document )
var $html = $( document.documentElement )


/**
 * The picker constructor that creates a blank picker.
 */
function PickerConstructor( ELEMENT, NAME, COMPONENT, OPTIONS ) {

    // If there’s no element, return the picker constructor.
    if ( !ELEMENT ) return PickerConstructor


    var
        IS_DEFAULT_THEME = false,


        // The state of the picker.
        STATE = {
            id: ELEMENT.id || 'P' + Math.abs( ~~(Math.random() * new Date()) )
        },


        // Merge the defaults and options passed.
        SETTINGS = COMPONENT ? $.extend( true, {}, COMPONENT.defaults, OPTIONS ) : OPTIONS || {},


        // Merge the default classes with the settings classes.
        CLASSES = $.extend( {}, PickerConstructor.klasses(), SETTINGS.klass ),


        // The element node wrapper into a jQuery object.
        $ELEMENT = $( ELEMENT ),


        // Pseudo picker constructor.
        PickerInstance = function() {
            return this.start()
        },


        // The picker prototype.
        P = PickerInstance.prototype = {

            constructor: PickerInstance,

            $node: $ELEMENT,


            /**
             * Initialize everything
             */
            start: function() {

                // If it’s already started, do nothing.
                if ( STATE && STATE.start ) return P


                // Update the picker states.
                STATE.methods = {}
                STATE.start = true
                STATE.open = false
                STATE.type = ELEMENT.type


                // Confirm focus state, convert into text input to remove UA stylings,
                // and set as readonly to prevent keyboard popup.
                ELEMENT.autofocus = ELEMENT == getActiveElement()
                ELEMENT.readOnly = !SETTINGS.editable
                ELEMENT.id = ELEMENT.id || STATE.id
                if ( ELEMENT.type != 'text' ) {
                    ELEMENT.type = 'text'
                }


                // Create a new picker component with the settings.
                P.component = new COMPONENT(P, SETTINGS)


                // Create the picker root with a holder and then prepare it.
                P.$root = $( PickerConstructor._.node('div', createWrappedComponent(), CLASSES.picker, 'id="' + ELEMENT.id + '_root" tabindex="0"') )
                prepareElementRoot()


                // If there’s a format for the hidden input element, create the element.
                if ( SETTINGS.formatSubmit ) {
                    prepareElementHidden()
                }


                // Prepare the input element.
                prepareElement()


                // Insert the root as specified in the settings.
                if ( SETTINGS.container ) $( SETTINGS.container ).append( P.$root )
                else $ELEMENT.before( P.$root )


                // Bind the default component and settings events.
                P.on({
                    start: P.component.onStart,
                    render: P.component.onRender,
                    stop: P.component.onStop,
                    open: P.component.onOpen,
                    close: P.component.onClose,
                    set: P.component.onSet
                }).on({
                    start: SETTINGS.onStart,
                    render: SETTINGS.onRender,
                    stop: SETTINGS.onStop,
                    open: SETTINGS.onOpen,
                    close: SETTINGS.onClose,
                    set: SETTINGS.onSet
                })


                // Once we’re all set, check the theme in use.
                IS_DEFAULT_THEME = isUsingDefaultTheme( P.$root.children()[ 0 ] )


                // If the element has autofocus, open the picker.
                if ( ELEMENT.autofocus ) {
                    P.open()
                }


                // Trigger queued the “start” and “render” events.
                return P.trigger( 'start' ).trigger( 'render' )
            }, //start


            /**
             * Render a new picker
             */
            render: function( entireComponent ) {

                // Insert a new component holder in the root or box.
                if ( entireComponent ) P.$root.html( createWrappedComponent() )
                else P.$root.find( '.' + CLASSES.box ).html( P.component.nodes( STATE.open ) )

                // Trigger the queued “render” events.
                return P.trigger( 'render' )
            }, //render


            /**
             * Destroy everything
             */
            stop: function() {

                // If it’s already stopped, do nothing.
                if ( !STATE.start ) return P

                // Then close the picker.
                P.close()

                // Remove the hidden field.
                if ( P._hidden ) {
                    P._hidden.parentNode.removeChild( P._hidden )
                }

                // Remove the root.
                P.$root.remove()

                // Remove the input class, remove the stored data, and unbind
                // the events (after a tick for IE - see `P.close`).
                $ELEMENT.removeClass( CLASSES.input ).removeData( NAME )
                setTimeout( function() {
                    $ELEMENT.off( '.' + STATE.id )
                }, 0)

                // Restore the element state
                ELEMENT.type = STATE.type
                ELEMENT.readOnly = false

                // Trigger the queued “stop” events.
                P.trigger( 'stop' )

                // Reset the picker states.
                STATE.methods = {}
                STATE.start = false

                return P
            }, //stop


            /**
             * Open up the picker
             */
            open: function( dontGiveFocus ) {

                // If it’s already open, do nothing.
                if ( STATE.open ) return P

                // Add the “active” class.
                $ELEMENT.addClass( CLASSES.active )
                aria( ELEMENT, 'expanded', true )

                // * A Firefox bug, when `html` has `overflow:hidden`, results in
                //   killing transitions :(. So add the “opened” state on the next tick.
                //   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289
                setTimeout( function() {

                    // Add the “opened” class to the picker root.
                    P.$root.addClass( CLASSES.opened )
                    aria( P.$root[0], 'hidden', false )

                }, 0 )

                // If we have to give focus, bind the element and doc events.
                if ( dontGiveFocus !== false ) {

                    // Set it as open.
                    STATE.open = true

                    // Prevent the page from scrolling.
                    if ( IS_DEFAULT_THEME ) {
                        $html.
                            css( 'overflow', 'hidden' ).
                            css( 'padding-right', '+=' + getScrollbarWidth() )
                    }

                    // Pass focus to the root element’s jQuery object.
                    // * Workaround for iOS8 to bring the picker’s root into view.
                    P.$root.eq(0).focus()

                    // Bind the document events.
                    $document.on( 'click.' + STATE.id + ' focusin.' + STATE.id, function( event ) {

                        var target = event.target

                        // If the target of the event is not the element, close the picker picker.
                        // * Don’t worry about clicks or focusins on the root because those don’t bubble up.
                        //   Also, for Firefox, a click on an `option` element bubbles up directly
                        //   to the doc. So make sure the target wasn't the doc.
                        // * In Firefox stopPropagation() doesn’t prevent right-click events from bubbling,
                        //   which causes the picker to unexpectedly close when right-clicking it. So make
                        //   sure the event wasn’t a right-click.
                        if ( target != ELEMENT && target != document && event.which != 3 ) {

                            // If the target was the holder that covers the screen,
                            // keep the element focused to maintain tabindex.
                            P.close( target === P.$root.children()[0] )
                        }

                    }).on( 'keydown.' + STATE.id, function( event ) {

                        var
                            // Get the keycode.
                            keycode = event.keyCode,

                            // Translate that to a selection change.
                            keycodeToMove = P.component.key[ keycode ],

                            // Grab the target.
                            target = event.target


                        // On escape, close the picker and give focus.
                        if ( keycode == 27 ) {
                            P.close( true )
                        }


                        // Check if there is a key movement or “enter” keypress on the element.
                        else if ( target == P.$root[0] && ( keycodeToMove || keycode == 13 ) ) {

                            // Prevent the default action to stop page movement.
                            event.preventDefault()

                            // Trigger the key movement action.
                            if ( keycodeToMove ) {
                                PickerConstructor._.trigger( P.component.key.go, P, [ PickerConstructor._.trigger( keycodeToMove ) ] )
                            }

                            // On “enter”, if the highlighted item isn’t disabled, set the value and close.
                            else if ( !P.$root.find( '.' + CLASSES.highlighted ).hasClass( CLASSES.disabled ) ) {
                                P.set( 'select', P.component.item.highlight )
                                if ( SETTINGS.closeOnSelect ) {
                                    P.close( true )
                                }
                            }
                        }


                        // If the target is within the root and “enter” is pressed,
                        // prevent the default action and trigger a click on the target instead.
                        else if ( $.contains( P.$root[0], target ) && keycode == 13 ) {
                            event.preventDefault()
                            target.click()
                        }
                    })
                }

                // Trigger the queued “open” events.
                return P.trigger( 'open' )
            }, //open


            /**
             * Close the picker
             */
            close: function( giveFocus ) {

                // If we need to give focus, do it before changing states.
                if ( giveFocus ) {
                    // ....ah yes! It would’ve been incomplete without a crazy workaround for IE :|
                    // The focus is triggered *after* the close has completed - causing it
                    // to open again. So unbind and rebind the event at the next tick.
                    P.$root.off( 'focus.toOpen' ).eq(0).focus()
                    setTimeout( function() {
                        P.$root.on( 'focus.toOpen', handleFocusToOpenEvent )
                    }, 0 )
                }

                // Remove the “active” class.
                $ELEMENT.removeClass( CLASSES.active )
                aria( ELEMENT, 'expanded', false )

                // * A Firefox bug, when `html` has `overflow:hidden`, results in
                //   killing transitions :(. So remove the “opened” state on the next tick.
                //   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289
                setTimeout( function() {

                    // Remove the “opened” and “focused” class from the picker root.
                    P.$root.removeClass( CLASSES.opened + ' ' + CLASSES.focused )
                    aria( P.$root[0], 'hidden', true )

                }, 0 )

                // If it’s already closed, do nothing more.
                if ( !STATE.open ) return P

                // Set it as closed.
                STATE.open = false

                // Allow the page to scroll.
                if ( IS_DEFAULT_THEME ) {
                    $html.
                        css( 'overflow', '' ).
                        css( 'padding-right', '-=' + getScrollbarWidth() )
                }

                // Unbind the document events.
                $document.off( '.' + STATE.id )

                // Trigger the queued “close” events.
                return P.trigger( 'close' )
            }, //close


            /**
             * Clear the values
             */
            clear: function( options ) {
                return P.set( 'clear', null, options )
            }, //clear


            /**
             * Set something
             */
            set: function( thing, value, options ) {

                var thingItem, thingValue,
                    thingIsObject = $.isPlainObject( thing ),
                    thingObject = thingIsObject ? thing : {}

                // Make sure we have usable options.
                options = thingIsObject && $.isPlainObject( value ) ? value : options || {}

                if ( thing ) {

                    // If the thing isn’t an object, make it one.
                    if ( !thingIsObject ) {
                        thingObject[ thing ] = value
                    }

                    // Go through the things of items to set.
                    for ( thingItem in thingObject ) {

                        // Grab the value of the thing.
                        thingValue = thingObject[ thingItem ]

                        // First, if the item exists and there’s a value, set it.
                        if ( thingItem in P.component.item ) {
                            if ( thingValue === undefined ) thingValue = null
                            P.component.set( thingItem, thingValue, options )
                        }

                        // Then, check to update the element value and broadcast a change.
                        if ( thingItem == 'select' || thingItem == 'clear' ) {
                            $ELEMENT.
                                val( thingItem == 'clear' ? '' : P.get( thingItem, SETTINGS.format ) ).
                                trigger( 'change' )
                        }
                    }

                    // Render a new picker.
                    P.render()
                }

                // When the method isn’t muted, trigger queued “set” events and pass the `thingObject`.
                return options.muted ? P : P.trigger( 'set', thingObject )
            }, //set


            /**
             * Get something
             */
            get: function( thing, format ) {

                // Make sure there’s something to get.
                thing = thing || 'value'

                // If a picker state exists, return that.
                if ( STATE[ thing ] != null ) {
                    return STATE[ thing ]
                }

                // Return the submission value, if that.
                if ( thing == 'valueSubmit' ) {
                    if ( P._hidden ) {
                        return P._hidden.value
                    }
                    thing = 'value'
                }

                // Return the value, if that.
                if ( thing == 'value' ) {
                    return ELEMENT.value
                }

                // Check if a component item exists, return that.
                if ( thing in P.component.item ) {
                    if ( typeof format == 'string' ) {
                        var thingValue = P.component.get( thing )
                        return thingValue ?
                            PickerConstructor._.trigger(
                                P.component.formats.toString,
                                P.component,
                                [ format, thingValue ]
                            ) : ''
                    }
                    return P.component.get( thing )
                }
            }, //get



            /**
             * Bind events on the things.
             */
            on: function( thing, method, internal ) {

                var thingName, thingMethod,
                    thingIsObject = $.isPlainObject( thing ),
                    thingObject = thingIsObject ? thing : {}

                if ( thing ) {

                    // If the thing isn’t an object, make it one.
                    if ( !thingIsObject ) {
                        thingObject[ thing ] = method
                    }

                    // Go through the things to bind to.
                    for ( thingName in thingObject ) {

                        // Grab the method of the thing.
                        thingMethod = thingObject[ thingName ]

                        // If it was an internal binding, prefix it.
                        if ( internal ) {
                            thingName = '_' + thingName
                        }

                        // Make sure the thing methods collection exists.
                        STATE.methods[ thingName ] = STATE.methods[ thingName ] || []

                        // Add the method to the relative method collection.
                        STATE.methods[ thingName ].push( thingMethod )
                    }
                }

                return P
            }, //on



            /**
             * Unbind events on the things.
             */
            off: function() {
                var i, thingName,
                    names = arguments;
                for ( i = 0, namesCount = names.length; i < namesCount; i += 1 ) {
                    thingName = names[i]
                    if ( thingName in STATE.methods ) {
                        delete STATE.methods[thingName]
                    }
                }
                return P
            },


            /**
             * Fire off method events.
             */
            trigger: function( name, data ) {
                var _trigger = function( name ) {
                    var methodList = STATE.methods[ name ]
                    if ( methodList ) {
                        methodList.map( function( method ) {
                            PickerConstructor._.trigger( method, P, [ data ] )
                        })
                    }
                }
                _trigger( '_' + name )
                _trigger( name )
                return P
            } //trigger
        } //PickerInstance.prototype


    /**
     * Wrap the picker holder components together.
     */
    function createWrappedComponent() {

        // Create a picker wrapper holder
        return PickerConstructor._.node( 'div',

            // Create a picker wrapper node
            PickerConstructor._.node( 'div',

                // Create a picker frame
                PickerConstructor._.node( 'div',

                    // Create a picker box node
                    PickerConstructor._.node( 'div',

                        // Create the components nodes.
                        P.component.nodes( STATE.open ),

                        // The picker box class
                        CLASSES.box
                    ),

                    // Picker wrap class
                    CLASSES.wrap
                ),

                // Picker frame class
                CLASSES.frame
            ),

            // Picker holder class
            CLASSES.holder
        ) //endreturn
    } //createWrappedComponent



    /**
     * Prepare the input element with all bindings.
     */
    function prepareElement() {

        $ELEMENT.

            // Store the picker data by component name.
            data(NAME, P).

            // Add the “input” class name.
            addClass(CLASSES.input).

            // Remove the tabindex.
            attr('tabindex', -1).

            // If there’s a `data-value`, update the value of the element.
            val( $ELEMENT.data('value') ?
                P.get('select', SETTINGS.format) :
                ELEMENT.value
            )


        // Only bind keydown events if the element isn’t editable.
        if ( !SETTINGS.editable ) {

            $ELEMENT.

                // On focus/click, focus onto the root to open it up.
                on( 'focus.' + STATE.id + ' click.' + STATE.id, function( event ) {
                    event.preventDefault()
                    P.$root.eq(0).focus()
                }).

                // Handle keyboard event based on the picker being opened or not.
                on( 'keydown.' + STATE.id, handleKeydownEvent )
        }


        // Update the aria attributes.
        aria(ELEMENT, {
            haspopup: true,
            expanded: false,
            readonly: false,
            owns: ELEMENT.id + '_root'
        })
    }


    /**
     * Prepare the root picker element with all bindings.
     */
    function prepareElementRoot() {

        P.$root.

            on({

                // For iOS8.
                keydown: handleKeydownEvent,

                // When something within the root is focused, stop from bubbling
                // to the doc and remove the “focused” state from the root.
                focusin: function( event ) {
                    P.$root.removeClass( CLASSES.focused )
                    event.stopPropagation()
                },

                // When something within the root holder is clicked, stop it
                // from bubbling to the doc.
                'mousedown click': function( event ) {

                    var target = event.target

                    // Make sure the target isn’t the root holder so it can bubble up.
                    if ( target != P.$root.children()[ 0 ] ) {

                        event.stopPropagation()

                        // * For mousedown events, cancel the default action in order to
                        //   prevent cases where focus is shifted onto external elements
                        //   when using things like jQuery mobile or MagnificPopup (ref: #249 & #120).
                        //   Also, for Firefox, don’t prevent action on the `option` element.
                        if ( event.type == 'mousedown' && !$( target ).is( 'input, select, textarea, button, option' )) {

                            event.preventDefault()

                            // Re-focus onto the root so that users can click away
                            // from elements focused within the picker.
                            P.$root.eq(0).focus()
                        }
                    }
                }
            }).

            // Add/remove the “target” class on focus and blur.
            on({
                focus: function() {
                    $ELEMENT.addClass( CLASSES.target )
                },
                blur: function() {
                    $ELEMENT.removeClass( CLASSES.target )
                }
            }).

            // Open the picker and adjust the root “focused” state
            on( 'focus.toOpen', handleFocusToOpenEvent ).

            // If there’s a click on an actionable element, carry out the actions.
            on( 'click', '[data-pick], [data-nav], [data-clear], [data-close]', function() {

                var $target = $( this ),
                    targetData = $target.data(),
                    targetDisabled = $target.hasClass( CLASSES.navDisabled ) || $target.hasClass( CLASSES.disabled ),

                    // * For IE, non-focusable elements can be active elements as well
                    //   (http://stackoverflow.com/a/2684561).
                    activeElement = getActiveElement();
                    activeElement = activeElement && ( activeElement.type || activeElement.href ) && activeElement;

                // If it’s disabled or nothing inside is actively focused, re-focus the element.
                if ( targetDisabled || activeElement && !$.contains( P.$root[0], activeElement ) ) {
                    P.$root.eq(0).focus()
                }

                // If something is superficially changed, update the `highlight` based on the `nav`.
                if ( !targetDisabled && targetData.nav ) {
                    P.set( 'highlight', P.component.item.highlight, { nav: targetData.nav } )
                }

                // If something is picked, set `select` then close with focus.
                else if ( !targetDisabled && 'pick' in targetData ) {
                    P.set( 'select', targetData.pick )
                    if ( SETTINGS.closeOnSelect ) {
                        P.close( true )
                    }
                }

                // If a “clear” button is pressed, empty the values and close with focus.
                else if ( targetData.clear ) {
                    P.clear()
                    if ( SETTINGS.closeOnSelect ) {
                        P.close( true )
                    }
                }

                else if ( targetData.close ) {
                    P.close( true )
                }

            }) //P.$root

        aria( P.$root[0], 'hidden', true )
    }


     /**
      * Prepare the hidden input element along with all bindings.
      */
    function prepareElementHidden() {

        var name

        if ( SETTINGS.hiddenName === true ) {
            name = ELEMENT.name
            ELEMENT.name = ''
        }
        else {
            name = [
                typeof SETTINGS.hiddenPrefix == 'string' ? SETTINGS.hiddenPrefix : '',
                typeof SETTINGS.hiddenSuffix == 'string' ? SETTINGS.hiddenSuffix : '_submit'
            ]
            name = name[0] + ELEMENT.name + name[1]
        }

        P._hidden = $(
            '<input ' +
            'type=hidden ' +

            // Create the name using the original input’s with a prefix and suffix.
            'name="' + name + '"' +

            // If the element has a value, set the hidden value as well.
            (
                $ELEMENT.data('value') || ELEMENT.value ?
                    ' value="' + P.get('select', SETTINGS.formatSubmit) + '"' :
                    ''
            ) +
            '>'
        )[0]

        $ELEMENT.

            // If the value changes, update the hidden input with the correct format.
            on('change.' + STATE.id, function() {
                P._hidden.value = ELEMENT.value ?
                    P.get('select', SETTINGS.formatSubmit) :
                    ''
            })


        // Insert the hidden input as specified in the settings.
        if ( SETTINGS.container ) $( SETTINGS.container ).append( P._hidden )
        else $ELEMENT.before( P._hidden )
    }


    // For iOS8.
    function handleKeydownEvent( event ) {

        var keycode = event.keyCode,

            // Check if one of the delete keys was pressed.
            isKeycodeDelete = /^(8|46)$/.test(keycode)

        // For some reason IE clears the input value on “escape”.
        if ( keycode == 27 ) {
            P.close()
            return false
        }

        // Check if `space` or `delete` was pressed or the picker is closed with a key movement.
        if ( keycode == 32 || isKeycodeDelete || !STATE.open && P.component.key[keycode] ) {

            // Prevent it from moving the page and bubbling to doc.
            event.preventDefault()
            event.stopPropagation()

            // If `delete` was pressed, clear the values and close the picker.
            // Otherwise open the picker.
            if ( isKeycodeDelete ) { P.clear().close() }
            else { P.open() }
        }
    }


    // Separated for IE
    function handleFocusToOpenEvent( event ) {

        // Stop the event from propagating to the doc.
        event.stopPropagation()

        // If it’s a focus event, add the “focused” class to the root.
        if ( event.type == 'focus' ) {
            P.$root.addClass( CLASSES.focused )
        }

        // And then finally open the picker.
        P.open()
    }


    // Return a new picker instance.
    return new PickerInstance()
} //PickerConstructor



/**
 * The default classes and prefix to use for the HTML classes.
 */
PickerConstructor.klasses = function( prefix ) {
    prefix = prefix || 'picker'
    return {

        picker: prefix,
        opened: prefix + '--opened',
        focused: prefix + '--focused',

        input: prefix + '__input',
        active: prefix + '__input--active',
        target: prefix + '__input--target',

        holder: prefix + '__holder',

        frame: prefix + '__frame',
        wrap: prefix + '__wrap',

        box: prefix + '__box'
    }
} //PickerConstructor.klasses



/**
 * Check if the default theme is being used.
 */
function isUsingDefaultTheme( element ) {

    var theme,
        prop = 'position'

    // For IE.
    if ( element.currentStyle ) {
        theme = element.currentStyle[prop]
    }

    // For normal browsers.
    else if ( window.getComputedStyle ) {
        theme = getComputedStyle( element )[prop]
    }

    return theme == 'fixed'
}



/**
 * Get the width of the browser’s scrollbar.
 * Taken from: https://github.com/VodkaBears/Remodal/blob/master/src/jquery.remodal.js
 */
function getScrollbarWidth() {

    if ( $html.height() <= $window.height() ) {
        return 0
    }

    var $outer = $( '<div style="visibility:hidden;width:100px" />' ).
        appendTo( 'body' )

    // Get the width without scrollbars.
    var widthWithoutScroll = $outer[0].offsetWidth

    // Force adding scrollbars.
    $outer.css( 'overflow', 'scroll' )

    // Add the inner div.
    var $inner = $( '<div style="width:100%" />' ).appendTo( $outer )

    // Get the width with scrollbars.
    var widthWithScroll = $inner[0].offsetWidth

    // Remove the divs.
    $outer.remove()

    // Return the difference between the widths.
    return widthWithoutScroll - widthWithScroll
}



/**
 * PickerConstructor helper methods.
 */
PickerConstructor._ = {

    /**
     * Create a group of nodes. Expects:
     * `
        {
            min:    {Integer},
            max:    {Integer},
            i:      {Integer},
            node:   {String},
            item:   {Function}
        }
     * `
     */
    group: function( groupObject ) {

        var
            // Scope for the looped object
            loopObjectScope,

            // Create the nodes list
            nodesList = '',

            // The counter starts from the `min`
            counter = PickerConstructor._.trigger( groupObject.min, groupObject )


        // Loop from the `min` to `max`, incrementing by `i`
        for ( ; counter <= PickerConstructor._.trigger( groupObject.max, groupObject, [ counter ] ); counter += groupObject.i ) {

            // Trigger the `item` function within scope of the object
            loopObjectScope = PickerConstructor._.trigger( groupObject.item, groupObject, [ counter ] )

            // Splice the subgroup and create nodes out of the sub nodes
            nodesList += PickerConstructor._.node(
                groupObject.node,
                loopObjectScope[ 0 ],   // the node
                loopObjectScope[ 1 ],   // the classes
                loopObjectScope[ 2 ]    // the attributes
            )
        }

        // Return the list of nodes
        return nodesList
    }, //group


    /**
     * Create a dom node string
     */
    node: function( wrapper, item, klass, attribute ) {

        // If the item is false-y, just return an empty string
        if ( !item ) return ''

        // If the item is an array, do a join
        item = $.isArray( item ) ? item.join( '' ) : item

        // Check for the class
        klass = klass ? ' class="' + klass + '"' : ''

        // Check for any attributes
        attribute = attribute ? ' ' + attribute : ''

        // Return the wrapped item
        return '<' + wrapper + klass + attribute + '>' + item + '</' + wrapper + '>'
    }, //node


    /**
     * Lead numbers below 10 with a zero.
     */
    lead: function( number ) {
        return ( number < 10 ? '0': '' ) + number
    },


    /**
     * Trigger a function otherwise return the value.
     */
    trigger: function( callback, scope, args ) {
        return typeof callback == 'function' ? callback.apply( scope, args || [] ) : callback
    },


    /**
     * If the second character is a digit, length is 2 otherwise 1.
     */
    digits: function( string ) {
        return ( /\d/ ).test( string[ 1 ] ) ? 2 : 1
    },


    /**
     * Tell if something is a date object.
     */
    isDate: function( value ) {
        return {}.toString.call( value ).indexOf( 'Date' ) > -1 && this.isInteger( value.getDate() )
    },


    /**
     * Tell if something is an integer.
     */
    isInteger: function( value ) {
        return {}.toString.call( value ).indexOf( 'Number' ) > -1 && value % 1 === 0
    },


    /**
     * Create ARIA attribute strings.
     */
    ariaAttr: ariaAttr
} //PickerConstructor._



/**
 * Extend the picker with a component and defaults.
 */
PickerConstructor.extend = function( name, Component ) {

    // Extend jQuery.
    $.fn[ name ] = function( options, action ) {

        // Grab the component data.
        var componentData = this.data( name )

        // If the picker is requested, return the data object.
        if ( options == 'picker' ) {
            return componentData
        }

        // If the component data exists and `options` is a string, carry out the action.
        if ( componentData && typeof options == 'string' ) {
            return PickerConstructor._.trigger( componentData[ options ], componentData, [ action ] )
        }

        // Otherwise go through each matched element and if the component
        // doesn’t exist, create a new picker using `this` element
        // and merging the defaults and options with a deep copy.
        return this.each( function() {
            var $this = $( this )
            if ( !$this.data( name ) ) {
                new PickerConstructor( this, name, Component, options )
            }
        })
    }

    // Set the defaults.
    $.fn[ name ].defaults = Component.defaults
} //PickerConstructor.extend



function aria(element, attribute, value) {
    if ( $.isPlainObject(attribute) ) {
        for ( var key in attribute ) {
            ariaSet(element, key, attribute[key])
        }
    }
    else {
        ariaSet(element, attribute, value)
    }
}
function ariaSet(element, attribute, value) {
    element.setAttribute(
        (attribute == 'role' ? '' : 'aria-') + attribute,
        value
    )
}
function ariaAttr(attribute, data) {
    if ( !$.isPlainObject(attribute) ) {
        attribute = { attribute: data }
    }
    data = ''
    for ( var key in attribute ) {
        var attr = (key == 'role' ? '' : 'aria-') + key,
            attrVal = attribute[key]
        data += attrVal == null ? '' : attr + '="' + attribute[key] + '"'
    }
    return data
}

// IE8 bug throws an error for activeElements within iframes.
function getActiveElement() {
    try {
        return document.activeElement
    } catch ( err ) { }
}



// Expose the picker constructor.
return PickerConstructor


}));

/*!
 * Date picker for pickadate.js v3.5.0
 * http://amsul.github.io/pickadate.js/date.htm
 */

(function ( factory ) {
  factory( Materialize.Picker, jQuery )

}(function( Picker, $ ) {


/**
 * Globals and constants
 */
var DAYS_IN_WEEK = 7,
    WEEKS_IN_CALENDAR = 6,
    _ = Picker._;



/**
 * The date picker constructor
 */
function DatePicker( picker, settings ) {

    var calendar = this,
        element = picker.$node[ 0 ],
        elementValue = element.value,
        elementDataValue = picker.$node.data( 'value' ),
        valueString = elementDataValue || elementValue,
        formatString = elementDataValue ? settings.formatSubmit : settings.format,
        isRTL = function() {

            return element.currentStyle ?

                // For IE.
                element.currentStyle.direction == 'rtl' :

                // For normal browsers.
                getComputedStyle( picker.$root[0] ).direction == 'rtl'
        }

    calendar.settings = settings
    calendar.$node = picker.$node

    // The queue of methods that will be used to build item objects.
    calendar.queue = {
        min: 'measure create',
        max: 'measure create',
        now: 'now create',
        select: 'parse create validate',
        highlight: 'parse navigate create validate',
        view: 'parse create validate viewset',
        disable: 'deactivate',
        enable: 'activate'
    }

    // The component's item object.
    calendar.item = {}

    calendar.item.clear = null
    calendar.item.disable = ( settings.disable || [] ).slice( 0 )
    calendar.item.enable = -(function( collectionDisabled ) {
        return collectionDisabled[ 0 ] === true ? collectionDisabled.shift() : -1
    })( calendar.item.disable )

    calendar.
        set( 'min', settings.min ).
        set( 'max', settings.max ).
        set( 'now' )

    // When there’s a value, set the `select`, which in turn
    // also sets the `highlight` and `view`.
    if ( valueString ) {
        calendar.set( 'select', valueString, { format: formatString })
    }

    // If there’s no value, default to highlighting “today”.
    else {
        calendar.
            set( 'select', null ).
            set( 'highlight', calendar.item.now )
    }


    // The keycode to movement mapping.
    calendar.key = {
        40: 7, // Down
        38: -7, // Up
        39: function() { return isRTL() ? -1 : 1 }, // Right
        37: function() { return isRTL() ? 1 : -1 }, // Left
        go: function( timeChange ) {
            var highlightedObject = calendar.item.highlight,
                targetDate = new Date( highlightedObject.year, highlightedObject.month, highlightedObject.date + timeChange )
            calendar.set(
                'highlight',
                targetDate,
                { interval: timeChange }
            )
            this.render()
        }
    }


    // Bind some picker events.
    picker.
        on( 'render', function() {
            picker.$root.find( '.' + settings.klass.selectMonth ).on( 'change', function() {
                var value = this.value
                if ( value ) {
                    picker.set( 'highlight', [ picker.get( 'view' ).year, value, picker.get( 'highlight' ).date ] )
                    picker.$root.find( '.' + settings.klass.selectMonth ).trigger( 'focus' )
                }
            })
            picker.$root.find( '.' + settings.klass.selectYear ).on( 'change', function() {
                var value = this.value
                if ( value ) {
                    picker.set( 'highlight', [ value, picker.get( 'view' ).month, picker.get( 'highlight' ).date ] )
                    picker.$root.find( '.' + settings.klass.selectYear ).trigger( 'focus' )
                }
            })
        }, 1 ).
        on( 'open', function() {
            var includeToday = ''
            if ( calendar.disabled( calendar.get('now') ) ) {
                includeToday = ':not(.' + settings.klass.buttonToday + ')'
            }
            picker.$root.find( 'button' + includeToday + ', select' ).attr( 'disabled', false )
        }, 1 ).
        on( 'close', function() {
            picker.$root.find( 'button, select' ).attr( 'disabled', true )
        }, 1 )

} //DatePicker


/**
 * Set a datepicker item object.
 */
DatePicker.prototype.set = function( type, value, options ) {

    var calendar = this,
        calendarItem = calendar.item

    // If the value is `null` just set it immediately.
    if ( value === null ) {
        if ( type == 'clear' ) type = 'select'
        calendarItem[ type ] = value
        return calendar
    }

    // Otherwise go through the queue of methods, and invoke the functions.
    // Update this as the time unit, and set the final value as this item.
    // * In the case of `enable`, keep the queue but set `disable` instead.
    //   And in the case of `flip`, keep the queue but set `enable` instead.
    calendarItem[ ( type == 'enable' ? 'disable' : type == 'flip' ? 'enable' : type ) ] = calendar.queue[ type ].split( ' ' ).map( function( method ) {
        value = calendar[ method ]( type, value, options )
        return value
    }).pop()

    // Check if we need to cascade through more updates.
    if ( type == 'select' ) {
        calendar.set( 'highlight', calendarItem.select, options )
    }
    else if ( type == 'highlight' ) {
        calendar.set( 'view', calendarItem.highlight, options )
    }
    else if ( type.match( /^(flip|min|max|disable|enable)$/ ) ) {
        if ( calendarItem.select && calendar.disabled( calendarItem.select ) ) {
            calendar.set( 'select', calendarItem.select, options )
        }
        if ( calendarItem.highlight && calendar.disabled( calendarItem.highlight ) ) {
            calendar.set( 'highlight', calendarItem.highlight, options )
        }
    }

    return calendar
} //DatePicker.prototype.set


/**
 * Get a datepicker item object.
 */
DatePicker.prototype.get = function( type ) {
    return this.item[ type ]
} //DatePicker.prototype.get


/**
 * Create a picker date object.
 */
DatePicker.prototype.create = function( type, value, options ) {

    var isInfiniteValue,
        calendar = this

    // If there’s no value, use the type as the value.
    value = value === undefined ? type : value


    // If it’s infinity, update the value.
    if ( value == -Infinity || value == Infinity ) {
        isInfiniteValue = value
    }

    // If it’s an object, use the native date object.
    else if ( $.isPlainObject( value ) && _.isInteger( value.pick ) ) {
        value = value.obj
    }

    // If it’s an array, convert it into a date and make sure
    // that it’s a valid date – otherwise default to today.
    else if ( $.isArray( value ) ) {
        value = new Date( value[ 0 ], value[ 1 ], value[ 2 ] )
        value = _.isDate( value ) ? value : calendar.create().obj
    }

    // If it’s a number or date object, make a normalized date.
    else if ( _.isInteger( value ) || _.isDate( value ) ) {
        value = calendar.normalize( new Date( value ), options )
    }

    // If it’s a literal true or any other case, set it to now.
    else /*if ( value === true )*/ {
        value = calendar.now( type, value, options )
    }

    // Return the compiled object.
    return {
        year: isInfiniteValue || value.getFullYear(),
        month: isInfiniteValue || value.getMonth(),
        date: isInfiniteValue || value.getDate(),
        day: isInfiniteValue || value.getDay(),
        obj: isInfiniteValue || value,
        pick: isInfiniteValue || value.getTime()
    }
} //DatePicker.prototype.create


/**
 * Create a range limit object using an array, date object,
 * literal “true”, or integer relative to another time.
 */
DatePicker.prototype.createRange = function( from, to ) {

    var calendar = this,
        createDate = function( date ) {
            if ( date === true || $.isArray( date ) || _.isDate( date ) ) {
                return calendar.create( date )
            }
            return date
        }

    // Create objects if possible.
    if ( !_.isInteger( from ) ) {
        from = createDate( from )
    }
    if ( !_.isInteger( to ) ) {
        to = createDate( to )
    }

    // Create relative dates.
    if ( _.isInteger( from ) && $.isPlainObject( to ) ) {
        from = [ to.year, to.month, to.date + from ];
    }
    else if ( _.isInteger( to ) && $.isPlainObject( from ) ) {
        to = [ from.year, from.month, from.date + to ];
    }

    return {
        from: createDate( from ),
        to: createDate( to )
    }
} //DatePicker.prototype.createRange


/**
 * Check if a date unit falls within a date range object.
 */
DatePicker.prototype.withinRange = function( range, dateUnit ) {
    range = this.createRange(range.from, range.to)
    return dateUnit.pick >= range.from.pick && dateUnit.pick <= range.to.pick
}


/**
 * Check if two date range objects overlap.
 */
DatePicker.prototype.overlapRanges = function( one, two ) {

    var calendar = this

    // Convert the ranges into comparable dates.
    one = calendar.createRange( one.from, one.to )
    two = calendar.createRange( two.from, two.to )

    return calendar.withinRange( one, two.from ) || calendar.withinRange( one, two.to ) ||
        calendar.withinRange( two, one.from ) || calendar.withinRange( two, one.to )
}


/**
 * Get the date today.
 */
DatePicker.prototype.now = function( type, value, options ) {
    value = new Date()
    if ( options && options.rel ) {
        value.setDate( value.getDate() + options.rel )
    }
    return this.normalize( value, options )
}


/**
 * Navigate to next/prev month.
 */
DatePicker.prototype.navigate = function( type, value, options ) {

    var targetDateObject,
        targetYear,
        targetMonth,
        targetDate,
        isTargetArray = $.isArray( value ),
        isTargetObject = $.isPlainObject( value ),
        viewsetObject = this.item.view/*,
        safety = 100*/


    if ( isTargetArray || isTargetObject ) {

        if ( isTargetObject ) {
            targetYear = value.year
            targetMonth = value.month
            targetDate = value.date
        }
        else {
            targetYear = +value[0]
            targetMonth = +value[1]
            targetDate = +value[2]
        }

        // If we’re navigating months but the view is in a different
        // month, navigate to the view’s year and month.
        if ( options && options.nav && viewsetObject && viewsetObject.month !== targetMonth ) {
            targetYear = viewsetObject.year
            targetMonth = viewsetObject.month
        }

        // Figure out the expected target year and month.
        targetDateObject = new Date( targetYear, targetMonth + ( options && options.nav ? options.nav : 0 ), 1 )
        targetYear = targetDateObject.getFullYear()
        targetMonth = targetDateObject.getMonth()

        // If the month we’re going to doesn’t have enough days,
        // keep decreasing the date until we reach the month’s last date.
        while ( /*safety &&*/ new Date( targetYear, targetMonth, targetDate ).getMonth() !== targetMonth ) {
            targetDate -= 1
            /*safety -= 1
            if ( !safety ) {
                throw 'Fell into an infinite loop while navigating to ' + new Date( targetYear, targetMonth, targetDate ) + '.'
            }*/
        }

        value = [ targetYear, targetMonth, targetDate ]
    }

    return value
} //DatePicker.prototype.navigate


/**
 * Normalize a date by setting the hours to midnight.
 */
DatePicker.prototype.normalize = function( value/*, options*/ ) {
    value.setHours( 0, 0, 0, 0 )
    return value
}


/**
 * Measure the range of dates.
 */
DatePicker.prototype.measure = function( type, value/*, options*/ ) {

    var calendar = this

    // If it’s anything false-y, remove the limits.
    if ( !value ) {
        value = type == 'min' ? -Infinity : Infinity
    }

    // If it’s a string, parse it.
    else if ( typeof value == 'string' ) {
        value = calendar.parse( type, value )
    }

    // If it's an integer, get a date relative to today.
    else if ( _.isInteger( value ) ) {
        value = calendar.now( type, value, { rel: value } )
    }

    return value
} ///DatePicker.prototype.measure


/**
 * Create a viewset object based on navigation.
 */
DatePicker.prototype.viewset = function( type, dateObject/*, options*/ ) {
    return this.create([ dateObject.year, dateObject.month, 1 ])
}


/**
 * Validate a date as enabled and shift if needed.
 */
DatePicker.prototype.validate = function( type, dateObject, options ) {

    var calendar = this,

        // Keep a reference to the original date.
        originalDateObject = dateObject,

        // Make sure we have an interval.
        interval = options && options.interval ? options.interval : 1,

        // Check if the calendar enabled dates are inverted.
        isFlippedBase = calendar.item.enable === -1,

        // Check if we have any enabled dates after/before now.
        hasEnabledBeforeTarget, hasEnabledAfterTarget,

        // The min & max limits.
        minLimitObject = calendar.item.min,
        maxLimitObject = calendar.item.max,

        // Check if we’ve reached the limit during shifting.
        reachedMin, reachedMax,

        // Check if the calendar is inverted and at least one weekday is enabled.
        hasEnabledWeekdays = isFlippedBase && calendar.item.disable.filter( function( value ) {

            // If there’s a date, check where it is relative to the target.
            if ( $.isArray( value ) ) {
                var dateTime = calendar.create( value ).pick
                if ( dateTime < dateObject.pick ) hasEnabledBeforeTarget = true
                else if ( dateTime > dateObject.pick ) hasEnabledAfterTarget = true
            }

            // Return only integers for enabled weekdays.
            return _.isInteger( value )
        }).length/*,

        safety = 100*/



    // Cases to validate for:
    // [1] Not inverted and date disabled.
    // [2] Inverted and some dates enabled.
    // [3] Not inverted and out of range.
    //
    // Cases to **not** validate for:
    // • Navigating months.
    // • Not inverted and date enabled.
    // • Inverted and all dates disabled.
    // • ..and anything else.
    if ( !options || !options.nav ) if (
        /* 1 */ ( !isFlippedBase && calendar.disabled( dateObject ) ) ||
        /* 2 */ ( isFlippedBase && calendar.disabled( dateObject ) && ( hasEnabledWeekdays || hasEnabledBeforeTarget || hasEnabledAfterTarget ) ) ||
        /* 3 */ ( !isFlippedBase && (dateObject.pick <= minLimitObject.pick || dateObject.pick >= maxLimitObject.pick) )
    ) {


        // When inverted, flip the direction if there aren’t any enabled weekdays
        // and there are no enabled dates in the direction of the interval.
        if ( isFlippedBase && !hasEnabledWeekdays && ( ( !hasEnabledAfterTarget && interval > 0 ) || ( !hasEnabledBeforeTarget && interval < 0 ) ) ) {
            interval *= -1
        }


        // Keep looping until we reach an enabled date.
        while ( /*safety &&*/ calendar.disabled( dateObject ) ) {

            /*safety -= 1
            if ( !safety ) {
                throw 'Fell into an infinite loop while validating ' + dateObject.obj + '.'
            }*/


            // If we’ve looped into the next/prev month with a large interval, return to the original date and flatten the interval.
            if ( Math.abs( interval ) > 1 && ( dateObject.month < originalDateObject.month || dateObject.month > originalDateObject.month ) ) {
                dateObject = originalDateObject
                interval = interval > 0 ? 1 : -1
            }


            // If we’ve reached the min/max limit, reverse the direction, flatten the interval and set it to the limit.
            if ( dateObject.pick <= minLimitObject.pick ) {
                reachedMin = true
                interval = 1
                dateObject = calendar.create([
                    minLimitObject.year,
                    minLimitObject.month,
                    minLimitObject.date + (dateObject.pick === minLimitObject.pick ? 0 : -1)
                ])
            }
            else if ( dateObject.pick >= maxLimitObject.pick ) {
                reachedMax = true
                interval = -1
                dateObject = calendar.create([
                    maxLimitObject.year,
                    maxLimitObject.month,
                    maxLimitObject.date + (dateObject.pick === maxLimitObject.pick ? 0 : 1)
                ])
            }


            // If we’ve reached both limits, just break out of the loop.
            if ( reachedMin && reachedMax ) {
                break
            }


            // Finally, create the shifted date using the interval and keep looping.
            dateObject = calendar.create([ dateObject.year, dateObject.month, dateObject.date + interval ])
        }

    } //endif


    // Return the date object settled on.
    return dateObject
} //DatePicker.prototype.validate


/**
 * Check if a date is disabled.
 */
DatePicker.prototype.disabled = function( dateToVerify ) {

    var
        calendar = this,

        // Filter through the disabled dates to check if this is one.
        isDisabledMatch = calendar.item.disable.filter( function( dateToDisable ) {

            // If the date is a number, match the weekday with 0index and `firstDay` check.
            if ( _.isInteger( dateToDisable ) ) {
                return dateToVerify.day === ( calendar.settings.firstDay ? dateToDisable : dateToDisable - 1 ) % 7
            }

            // If it’s an array or a native JS date, create and match the exact date.
            if ( $.isArray( dateToDisable ) || _.isDate( dateToDisable ) ) {
                return dateToVerify.pick === calendar.create( dateToDisable ).pick
            }

            // If it’s an object, match a date within the “from” and “to” range.
            if ( $.isPlainObject( dateToDisable ) ) {
                return calendar.withinRange( dateToDisable, dateToVerify )
            }
        })

    // If this date matches a disabled date, confirm it’s not inverted.
    isDisabledMatch = isDisabledMatch.length && !isDisabledMatch.filter(function( dateToDisable ) {
        return $.isArray( dateToDisable ) && dateToDisable[3] == 'inverted' ||
            $.isPlainObject( dateToDisable ) && dateToDisable.inverted
    }).length

    // Check the calendar “enabled” flag and respectively flip the
    // disabled state. Then also check if it’s beyond the min/max limits.
    return calendar.item.enable === -1 ? !isDisabledMatch : isDisabledMatch ||
        dateToVerify.pick < calendar.item.min.pick ||
        dateToVerify.pick > calendar.item.max.pick

} //DatePicker.prototype.disabled


/**
 * Parse a string into a usable type.
 */
DatePicker.prototype.parse = function( type, value, options ) {

    var calendar = this,
        parsingObject = {}

    // If it’s already parsed, we’re good.
    if ( !value || typeof value != 'string' ) {
        return value
    }

    // We need a `.format` to parse the value with.
    if ( !( options && options.format ) ) {
        options = options || {}
        options.format = calendar.settings.format
    }

    // Convert the format into an array and then map through it.
    calendar.formats.toArray( options.format ).map( function( label ) {

        var
            // Grab the formatting label.
            formattingLabel = calendar.formats[ label ],

            // The format length is from the formatting label function or the
            // label length without the escaping exclamation (!) mark.
            formatLength = formattingLabel ? _.trigger( formattingLabel, calendar, [ value, parsingObject ] ) : label.replace( /^!/, '' ).length

        // If there's a format label, split the value up to the format length.
        // Then add it to the parsing object with appropriate label.
        if ( formattingLabel ) {
            parsingObject[ label ] = value.substr( 0, formatLength )
        }

        // Update the value as the substring from format length to end.
        value = value.substr( formatLength )
    })

    // Compensate for month 0index.
    return [
        parsingObject.yyyy || parsingObject.yy,
        +( parsingObject.mm || parsingObject.m ) - 1,
        parsingObject.dd || parsingObject.d
    ]
} //DatePicker.prototype.parse


/**
 * Various formats to display the object in.
 */
DatePicker.prototype.formats = (function() {

    // Return the length of the first word in a collection.
    function getWordLengthFromCollection( string, collection, dateObject ) {

        // Grab the first word from the string.
        var word = string.match( /\w+/ )[ 0 ]

        // If there's no month index, add it to the date object
        if ( !dateObject.mm && !dateObject.m ) {
            dateObject.m = collection.indexOf( word ) + 1
        }

        // Return the length of the word.
        return word.length
    }

    // Get the length of the first word in a string.
    function getFirstWordLength( string ) {
        return string.match( /\w+/ )[ 0 ].length
    }

    return {

        d: function( string, dateObject ) {

            // If there's string, then get the digits length.
            // Otherwise return the selected date.
            return string ? _.digits( string ) : dateObject.date
        },
        dd: function( string, dateObject ) {

            // If there's a string, then the length is always 2.
            // Otherwise return the selected date with a leading zero.
            return string ? 2 : _.lead( dateObject.date )
        },
        ddd: function( string, dateObject ) {

            // If there's a string, then get the length of the first word.
            // Otherwise return the short selected weekday.
            return string ? getFirstWordLength( string ) : this.settings.weekdaysShort[ dateObject.day ]
        },
        dddd: function( string, dateObject ) {

            // If there's a string, then get the length of the first word.
            // Otherwise return the full selected weekday.
            return string ? getFirstWordLength( string ) : this.settings.weekdaysFull[ dateObject.day ]
        },
        m: function( string, dateObject ) {

            // If there's a string, then get the length of the digits
            // Otherwise return the selected month with 0index compensation.
            return string ? _.digits( string ) : dateObject.month + 1
        },
        mm: function( string, dateObject ) {

            // If there's a string, then the length is always 2.
            // Otherwise return the selected month with 0index and leading zero.
            return string ? 2 : _.lead( dateObject.month + 1 )
        },
        mmm: function( string, dateObject ) {

            var collection = this.settings.monthsShort

            // If there's a string, get length of the relevant month from the short
            // months collection. Otherwise return the selected month from that collection.
            return string ? getWordLengthFromCollection( string, collection, dateObject ) : collection[ dateObject.month ]
        },
        mmmm: function( string, dateObject ) {

            var collection = this.settings.monthsFull

            // If there's a string, get length of the relevant month from the full
            // months collection. Otherwise return the selected month from that collection.
            return string ? getWordLengthFromCollection( string, collection, dateObject ) : collection[ dateObject.month ]
        },
        yy: function( string, dateObject ) {

            // If there's a string, then the length is always 2.
            // Otherwise return the selected year by slicing out the first 2 digits.
            return string ? 2 : ( '' + dateObject.year ).slice( 2 )
        },
        yyyy: function( string, dateObject ) {

            // If there's a string, then the length is always 4.
            // Otherwise return the selected year.
            return string ? 4 : dateObject.year
        },

        // Create an array by splitting the formatting string passed.
        toArray: function( formatString ) { return formatString.split( /(d{1,4}|m{1,4}|y{4}|yy|!.)/g ) },

        // Format an object into a string using the formatting options.
        toString: function ( formatString, itemObject ) {
            var calendar = this
            return calendar.formats.toArray( formatString ).map( function( label ) {
                return _.trigger( calendar.formats[ label ], calendar, [ 0, itemObject ] ) || label.replace( /^!/, '' )
            }).join( '' )
        }
    }
})() //DatePicker.prototype.formats




/**
 * Check if two date units are the exact.
 */
DatePicker.prototype.isDateExact = function( one, two ) {

    var calendar = this

    // When we’re working with weekdays, do a direct comparison.
    if (
        ( _.isInteger( one ) && _.isInteger( two ) ) ||
        ( typeof one == 'boolean' && typeof two == 'boolean' )
     ) {
        return one === two
    }

    // When we’re working with date representations, compare the “pick” value.
    if (
        ( _.isDate( one ) || $.isArray( one ) ) &&
        ( _.isDate( two ) || $.isArray( two ) )
    ) {
        return calendar.create( one ).pick === calendar.create( two ).pick
    }

    // When we’re working with range objects, compare the “from” and “to”.
    if ( $.isPlainObject( one ) && $.isPlainObject( two ) ) {
        return calendar.isDateExact( one.from, two.from ) && calendar.isDateExact( one.to, two.to )
    }

    return false
}


/**
 * Check if two date units overlap.
 */
DatePicker.prototype.isDateOverlap = function( one, two ) {

    var calendar = this,
        firstDay = calendar.settings.firstDay ? 1 : 0

    // When we’re working with a weekday index, compare the days.
    if ( _.isInteger( one ) && ( _.isDate( two ) || $.isArray( two ) ) ) {
        one = one % 7 + firstDay
        return one === calendar.create( two ).day + 1
    }
    if ( _.isInteger( two ) && ( _.isDate( one ) || $.isArray( one ) ) ) {
        two = two % 7 + firstDay
        return two === calendar.create( one ).day + 1
    }

    // When we’re working with range objects, check if the ranges overlap.
    if ( $.isPlainObject( one ) && $.isPlainObject( two ) ) {
        return calendar.overlapRanges( one, two )
    }

    return false
}


/**
 * Flip the “enabled” state.
 */
DatePicker.prototype.flipEnable = function(val) {
    var itemObject = this.item
    itemObject.enable = val || (itemObject.enable == -1 ? 1 : -1)
}


/**
 * Mark a collection of dates as “disabled”.
 */
DatePicker.prototype.deactivate = function( type, datesToDisable ) {

    var calendar = this,
        disabledItems = calendar.item.disable.slice(0)


    // If we’re flipping, that’s all we need to do.
    if ( datesToDisable == 'flip' ) {
        calendar.flipEnable()
    }

    else if ( datesToDisable === false ) {
        calendar.flipEnable(1)
        disabledItems = []
    }

    else if ( datesToDisable === true ) {
        calendar.flipEnable(-1)
        disabledItems = []
    }

    // Otherwise go through the dates to disable.
    else {

        datesToDisable.map(function( unitToDisable ) {

            var matchFound

            // When we have disabled items, check for matches.
            // If something is matched, immediately break out.
            for ( var index = 0; index < disabledItems.length; index += 1 ) {
                if ( calendar.isDateExact( unitToDisable, disabledItems[index] ) ) {
                    matchFound = true
                    break
                }
            }

            // If nothing was found, add the validated unit to the collection.
            if ( !matchFound ) {
                if (
                    _.isInteger( unitToDisable ) ||
                    _.isDate( unitToDisable ) ||
                    $.isArray( unitToDisable ) ||
                    ( $.isPlainObject( unitToDisable ) && unitToDisable.from && unitToDisable.to )
                ) {
                    disabledItems.push( unitToDisable )
                }
            }
        })
    }

    // Return the updated collection.
    return disabledItems
} //DatePicker.prototype.deactivate


/**
 * Mark a collection of dates as “enabled”.
 */
DatePicker.prototype.activate = function( type, datesToEnable ) {

    var calendar = this,
        disabledItems = calendar.item.disable,
        disabledItemsCount = disabledItems.length

    // If we’re flipping, that’s all we need to do.
    if ( datesToEnable == 'flip' ) {
        calendar.flipEnable()
    }

    else if ( datesToEnable === true ) {
        calendar.flipEnable(1)
        disabledItems = []
    }

    else if ( datesToEnable === false ) {
        calendar.flipEnable(-1)
        disabledItems = []
    }

    // Otherwise go through the disabled dates.
    else {

        datesToEnable.map(function( unitToEnable ) {

            var matchFound,
                disabledUnit,
                index,
                isExactRange

            // Go through the disabled items and try to find a match.
            for ( index = 0; index < disabledItemsCount; index += 1 ) {

                disabledUnit = disabledItems[index]

                // When an exact match is found, remove it from the collection.
                if ( calendar.isDateExact( disabledUnit, unitToEnable ) ) {
                    matchFound = disabledItems[index] = null
                    isExactRange = true
                    break
                }

                // When an overlapped match is found, add the “inverted” state to it.
                else if ( calendar.isDateOverlap( disabledUnit, unitToEnable ) ) {
                    if ( $.isPlainObject( unitToEnable ) ) {
                        unitToEnable.inverted = true
                        matchFound = unitToEnable
                    }
                    else if ( $.isArray( unitToEnable ) ) {
                        matchFound = unitToEnable
                        if ( !matchFound[3] ) matchFound.push( 'inverted' )
                    }
                    else if ( _.isDate( unitToEnable ) ) {
                        matchFound = [ unitToEnable.getFullYear(), unitToEnable.getMonth(), unitToEnable.getDate(), 'inverted' ]
                    }
                    break
                }
            }

            // If a match was found, remove a previous duplicate entry.
            if ( matchFound ) for ( index = 0; index < disabledItemsCount; index += 1 ) {
                if ( calendar.isDateExact( disabledItems[index], unitToEnable ) ) {
                    disabledItems[index] = null
                    break
                }
            }

            // In the event that we’re dealing with an exact range of dates,
            // make sure there are no “inverted” dates because of it.
            if ( isExactRange ) for ( index = 0; index < disabledItemsCount; index += 1 ) {
                if ( calendar.isDateOverlap( disabledItems[index], unitToEnable ) ) {
                    disabledItems[index] = null
                    break
                }
            }

            // If something is still matched, add it into the collection.
            if ( matchFound ) {
                disabledItems.push( matchFound )
            }
        })
    }

    // Return the updated collection.
    return disabledItems.filter(function( val ) { return val != null })
} //DatePicker.prototype.activate


/**
 * Create a string for the nodes in the picker.
 */
DatePicker.prototype.nodes = function( isOpen ) {

    var
        calendar = this,
        settings = calendar.settings,
        calendarItem = calendar.item,
        nowObject = calendarItem.now,
        selectedObject = calendarItem.select,
        highlightedObject = calendarItem.highlight,
        viewsetObject = calendarItem.view,
        disabledCollection = calendarItem.disable,
        minLimitObject = calendarItem.min,
        maxLimitObject = calendarItem.max,


        // Create the calendar table head using a copy of weekday labels collection.
        // * We do a copy so we don't mutate the original array.
        tableHead = (function( collection, fullCollection ) {

            // If the first day should be Monday, move Sunday to the end.
            if ( settings.firstDay ) {
                collection.push( collection.shift() )
                fullCollection.push( fullCollection.shift() )
            }

            // Create and return the table head group.
            return _.node(
                'thead',
                _.node(
                    'tr',
                    _.group({
                        min: 0,
                        max: DAYS_IN_WEEK - 1,
                        i: 1,
                        node: 'th',
                        item: function( counter ) {
                            return [
                                collection[ counter ],
                                settings.klass.weekdays,
                                'scope=col title="' + fullCollection[ counter ] + '"'
                            ]
                        }
                    })
                )
            ) //endreturn

        // Materialize modified
        })( ( settings.showWeekdaysFull ? settings.weekdaysFull : settings.weekdaysLetter ).slice( 0 ), settings.weekdaysFull.slice( 0 ) ), //tableHead


        // Create the nav for next/prev month.
        createMonthNav = function( next ) {

            // Otherwise, return the created month tag.
            return _.node(
                'div',
                ' ',
                settings.klass[ 'nav' + ( next ? 'Next' : 'Prev' ) ] + (

                    // If the focused month is outside the range, disabled the button.
                    ( next && viewsetObject.year >= maxLimitObject.year && viewsetObject.month >= maxLimitObject.month ) ||
                    ( !next && viewsetObject.year <= minLimitObject.year && viewsetObject.month <= minLimitObject.month ) ?
                    ' ' + settings.klass.navDisabled : ''
                ),
                'data-nav=' + ( next || -1 ) + ' ' +
                _.ariaAttr({
                    role: 'button',
                    controls: calendar.$node[0].id + '_table'
                }) + ' ' +
                'title="' + (next ? settings.labelMonthNext : settings.labelMonthPrev ) + '"'
            ) //endreturn
        }, //createMonthNav


        // Create the month label.
        //Materialize modified
        createMonthLabel = function(override) {

            var monthsCollection = settings.showMonthsShort ? settings.monthsShort : settings.monthsFull

             // Materialize modified
            if (override == "short_months") {
              monthsCollection = settings.monthsShort;
            }

            // If there are months to select, add a dropdown menu.
            if ( settings.selectMonths  && override == undefined) {

                return _.node( 'select',
                    _.group({
                        min: 0,
                        max: 11,
                        i: 1,
                        node: 'option',
                        item: function( loopedMonth ) {

                            return [

                                // The looped month and no classes.
                                monthsCollection[ loopedMonth ], 0,

                                // Set the value and selected index.
                                'value=' + loopedMonth +
                                ( viewsetObject.month == loopedMonth ? ' selected' : '' ) +
                                (
                                    (
                                        ( viewsetObject.year == minLimitObject.year && loopedMonth < minLimitObject.month ) ||
                                        ( viewsetObject.year == maxLimitObject.year && loopedMonth > maxLimitObject.month )
                                    ) ?
                                    ' disabled' : ''
                                )
                            ]
                        }
                    }),
                    settings.klass.selectMonth + ' browser-default',
                    ( isOpen ? '' : 'disabled' ) + ' ' +
                    _.ariaAttr({ controls: calendar.$node[0].id + '_table' }) + ' ' +
                    'title="' + settings.labelMonthSelect + '"'
                )
            }

            // Materialize modified
            if (override == "short_months")
                if (selectedObject != null)
                return monthsCollection[ selectedObject.month ];
                else return monthsCollection[ viewsetObject.month ];

            // If there's a need for a month selector
            return _.node( 'div', monthsCollection[ viewsetObject.month ], settings.klass.month )
        }, //createMonthLabel


        // Create the year label.
        // Materialize modified
        createYearLabel = function(override) {

            var focusedYear = viewsetObject.year,

            // If years selector is set to a literal "true", set it to 5. Otherwise
            // divide in half to get half before and half after focused year.
            numberYears = settings.selectYears === true ? 5 : ~~( settings.selectYears / 2 )


            // If there are years to select, add a dropdown menu.
            if ( numberYears ) {

                var
                    minYear = minLimitObject.year,
                    maxYear = maxLimitObject.year,
                    lowestYear = focusedYear - numberYears,
                    highestYear = focusedYear + numberYears

                // If the min year is greater than the lowest year, increase the highest year
                // by the difference and set the lowest year to the min year.
                if ( minYear > lowestYear ) {
                    highestYear += minYear - lowestYear
                    lowestYear = minYear
                }

                // If the max year is less than the highest year, decrease the lowest year
                // by the lower of the two: available and needed years. Then set the
                // highest year to the max year.
                if ( maxYear < highestYear ) {

                    var availableYears = lowestYear - minYear,
                        neededYears = highestYear - maxYear

                    lowestYear -= availableYears > neededYears ? neededYears : availableYears
                    highestYear = maxYear
                }

                if ( settings.selectYears  && override == undefined ) {
                    return _.node( 'select',
                        _.group({
                            min: lowestYear,
                            max: highestYear,
                            i: 1,
                            node: 'option',
                            item: function( loopedYear ) {
                                return [

                                    // The looped year and no classes.
                                    loopedYear, 0,

                                    // Set the value and selected index.
                                    'value=' + loopedYear + ( focusedYear == loopedYear ? ' selected' : '' )
                                ]
                            }
                        }),
                        settings.klass.selectYear + ' browser-default',
                        ( isOpen ? '' : 'disabled' ) + ' ' + _.ariaAttr({ controls: calendar.$node[0].id + '_table' }) + ' ' +
                        'title="' + settings.labelYearSelect + '"'
                    )
                }
            }


          // Materialize modified
          if (override === 'raw' && selectedObject != null) {
            return _.node( 'div', selectedObject.year )
          }



            // Otherwise just return the year focused
            return _.node( 'div', focusedYear, settings.klass.year )
        } //createYearLabel


        // Materialize modified
        createDayLabel = function() {
                if (selectedObject != null)
                    return selectedObject.date
                else return nowObject.date
            }
        createWeekdayLabel = function() {
            var display_day;

            if (selectedObject != null)
                display_day = selectedObject.day;
            else
                display_day = nowObject.day;
            var weekday = settings.weekdaysShort[ display_day ];
            return weekday
        }


  // Create and return the entire calendar.

return _.node(
        // Date presentation View
        'div',
            _.node(
                // Div for Year
                'div',
                createYearLabel("raw") ,
                settings.klass.year_display
            )+
            _.node(
                'span',
                createWeekdayLabel() + ', ',
                "picker__weekday-display"
            )+
            _.node(
                // Div for short Month
                'span',
                createMonthLabel("short_months") + ' ',
                settings.klass.month_display
            )+
            _.node(
              // Div for Day
              'span',
              createDayLabel() ,
              settings.klass.day_display
            ),
        settings.klass.date_display
    )+
    // Calendar container
    _.node('div',
	    _.node('div',
		_.node('div',
		( settings.selectYears ?  createMonthLabel() + createYearLabel() : createMonthLabel() + createYearLabel() ) +
		createMonthNav() + createMonthNav( 1 ),
		settings.klass.header
	    ) + _.node(
		'table',
		tableHead +
		_.node(
		    'tbody',
		    _.group({
		        min: 0,
		        max: WEEKS_IN_CALENDAR - 1,
		        i: 1,
		        node: 'tr',
		        item: function( rowCounter ) {

		            // If Monday is the first day and the month starts on Sunday, shift the date back a week.
		            var shiftDateBy = settings.firstDay && calendar.create([ viewsetObject.year, viewsetObject.month, 1 ]).day === 0 ? -7 : 0

		            return [
		                _.group({
		                    min: DAYS_IN_WEEK * rowCounter - viewsetObject.day + shiftDateBy + 1, // Add 1 for weekday 0index
		                    max: function() {
		                        return this.min + DAYS_IN_WEEK - 1
		                    },
		                    i: 1,
		                    node: 'td',
		                    item: function( targetDate ) {

		                        // Convert the time date from a relative date to a target date.
		                        targetDate = calendar.create([ viewsetObject.year, viewsetObject.month, targetDate + ( settings.firstDay ? 1 : 0 ) ])

		                        var isSelected = selectedObject && selectedObject.pick == targetDate.pick,
		                            isHighlighted = highlightedObject && highlightedObject.pick == targetDate.pick,
		                            isDisabled = disabledCollection && calendar.disabled( targetDate ) || targetDate.pick < minLimitObject.pick || targetDate.pick > maxLimitObject.pick,
		                            formattedDate = _.trigger( calendar.formats.toString, calendar, [ settings.format, targetDate ] )

		                        return [
		                            _.node(
		                                'div',
		                                targetDate.date,
		                                (function( klasses ) {

		                                    // Add the `infocus` or `outfocus` classes based on month in view.
		                                    klasses.push( viewsetObject.month == targetDate.month ? settings.klass.infocus : settings.klass.outfocus )

		                                    // Add the `today` class if needed.
		                                    if ( nowObject.pick == targetDate.pick ) {
		                                        klasses.push( settings.klass.now )
		                                    }

		                                    // Add the `selected` class if something's selected and the time matches.
		                                    if ( isSelected ) {
		                                        klasses.push( settings.klass.selected )
		                                    }

		                                    // Add the `highlighted` class if something's highlighted and the time matches.
		                                    if ( isHighlighted ) {
		                                        klasses.push( settings.klass.highlighted )
		                                    }

		                                    // Add the `disabled` class if something's disabled and the object matches.
		                                    if ( isDisabled ) {
		                                        klasses.push( settings.klass.disabled )
		                                    }

		                                    return klasses.join( ' ' )
		                                })([ settings.klass.day ]),
		                                'data-pick=' + targetDate.pick + ' ' + _.ariaAttr({
		                                    role: 'gridcell',
		                                    label: formattedDate,
		                                    selected: isSelected && calendar.$node.val() === formattedDate ? true : null,
		                                    activedescendant: isHighlighted ? true : null,
		                                    disabled: isDisabled ? true : null
		                                }) + ' ' + (isDisabled ? '' : 'tabindex="0"')
		                            ),
		                            '',
		                            _.ariaAttr({ role: 'presentation' })
		                        ] //endreturn
		                    }
		                })
		            ] //endreturn
		        }
		    })
		),
		settings.klass.table,
		'id="' + calendar.$node[0].id + '_table' + '" ' + _.ariaAttr({
		    role: 'grid',
		    controls: calendar.$node[0].id,
		    readonly: true
		})
	    )
	    , settings.klass.calendar_container) // end calendar

	     +

	    // * For Firefox forms to submit, make sure to set the buttons’ `type` attributes as “button”.
	    _.node(
		'div',
		_.node( 'button', settings.today, "btn-flat picker__today waves-effect",
		    'type=button data-pick=' + nowObject.pick +
		    ( isOpen && !calendar.disabled(nowObject) ? '' : ' disabled' ) + ' ' +
		    _.ariaAttr({ controls: calendar.$node[0].id }) ) +
		_.node( 'button', settings.clear, "btn-flat picker__clear waves-effect",
		    'type=button data-clear=1' +
		    ( isOpen ? '' : ' disabled' ) + ' ' +
		    _.ariaAttr({ controls: calendar.$node[0].id }) ) +
		_.node('button', settings.close, "btn-flat picker__close waves-effect",
		    'type=button data-close=true ' +
		    ( isOpen ? '' : ' disabled' ) + ' ' +
		    _.ariaAttr({ controls: calendar.$node[0].id }) ),
		settings.klass.footer
	    ), 'picker__container__wrapper'
	) //endreturn
} //DatePicker.prototype.nodes




/**
 * The date picker defaults.
 */
DatePicker.defaults = (function( prefix ) {

    return {

        // The title label to use for the month nav buttons
        labelMonthNext: 'Next month',
        labelMonthPrev: 'Previous month',

        // The title label to use for the dropdown selectors
        labelMonthSelect: 'Select a month',
        labelYearSelect: 'Select a year',

        // Months and weekdays
        monthsFull: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
        monthsShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
        weekdaysFull: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
        weekdaysShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],

        // Materialize modified
        weekdaysLetter: [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],

        // Today and clear
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',

        // Picker close behavior (Prevent a change in behaviour for backwards compatibility)
        closeOnSelect: false,

        // The format to show on the `input` element
        format: 'd mmmm, yyyy',

        // Classes
        klass: {

            table: prefix + 'table',

            header: prefix + 'header',


            // Materialize Added klasses
            date_display: prefix + 'date-display',
            day_display: prefix + 'day-display',
            month_display: prefix + 'month-display',
            year_display: prefix + 'year-display',
            calendar_container: prefix + 'calendar-container',
            // end



            navPrev: prefix + 'nav--prev',
            navNext: prefix + 'nav--next',
            navDisabled: prefix + 'nav--disabled',

            month: prefix + 'month',
            year: prefix + 'year',

            selectMonth: prefix + 'select--month',
            selectYear: prefix + 'select--year',

            weekdays: prefix + 'weekday',

            day: prefix + 'day',
            disabled: prefix + 'day--disabled',
            selected: prefix + 'day--selected',
            highlighted: prefix + 'day--highlighted',
            now: prefix + 'day--today',
            infocus: prefix + 'day--infocus',
            outfocus: prefix + 'day--outfocus',

            footer: prefix + 'footer',

            buttonClear: prefix + 'button--clear',
            buttonToday: prefix + 'button--today',
            buttonClose: prefix + 'button--close'
        }
    }
})( Picker.klasses().picker + '__' )





/**
 * Extend the picker to add the date picker.
 */
Picker.extend( 'pickadate', DatePicker )


}));

/*!
 * ClockPicker v0.0.7 (http://weareoutman.github.io/clockpicker/)
 * Copyright 2014 Wang Shenwei.
 * Licensed under MIT (https://github.com/weareoutman/clockpicker/blob/gh-pages/LICENSE)
 *
 * Further modified
 * Copyright 2015 Ching Yaw Hao.
 */

(function($){
	var $win = $(window),
			$doc = $(document);

	// Can I use inline svg ?
	var svgNS = 'http://www.w3.org/2000/svg',
		  svgSupported = 'SVGAngle' in window && (function() {
			  var supported,
				el = document.createElement('div');
				el.innerHTML = '<svg/>';
				supported = (el.firstChild && el.firstChild.namespaceURI) == svgNS;
				el.innerHTML = '';
				return supported;
			})();

	// Can I use transition ?
	var transitionSupported = (function() {
		var style = document.createElement('div').style;
		return 'transition' in style ||
					 'WebkitTransition' in style ||
				   'MozTransition' in style ||
					 'msTransition' in style ||
					 'OTransition' in style;
	})();

	// Listen touch events in touch screen device, instead of mouse events in desktop.
	var touchSupported = 'ontouchstart' in window,
			mousedownEvent = 'mousedown' + ( touchSupported ? ' touchstart' : ''),
			mousemoveEvent = 'mousemove.clockpicker' + ( touchSupported ? ' touchmove.clockpicker' : ''),
			mouseupEvent = 'mouseup.clockpicker' + ( touchSupported ? ' touchend.clockpicker' : '');

	// Vibrate the device if supported
	var vibrate = navigator.vibrate ? 'vibrate' : navigator.webkitVibrate ? 'webkitVibrate' : null;

	function createSvgElement(name) {
		return document.createElementNS(svgNS, name);
	}

	function leadingZero(num) {
		return (num < 10 ? '0' : '') + num;
	}

	// Get a unique id
	var idCounter = 0;
	function uniqueId(prefix) {
		var id = ++idCounter + '';
		return prefix ? prefix + id : id;
	}

	// Clock size
	var dialRadius = 135,
			outerRadius = 105,
			// innerRadius = 80 on 12 hour clock
			innerRadius = 70,
			tickRadius = 20,
			diameter = dialRadius * 2,
			duration = transitionSupported ? 350 : 1;

	// Popover template
	var tpl = [
		'<div class="clockpicker picker">',
			'<div class="picker__holder">',
				'<div class="picker__frame">',
					'<div class="picker__wrap">',
						'<div class="picker__box">',
							'<div class="picker__date-display">',
								'<div class="clockpicker-display">',
									'<div class="clockpicker-display-column">',
										'<span class="clockpicker-span-hours text-primary"></span>',
										':',
										'<span class="clockpicker-span-minutes"></span>',
									'</div>',
									'<div class="clockpicker-display-column clockpicker-display-am-pm">',
										'<div class="clockpicker-span-am-pm"></div>',
									'</div>',
								'</div>',
							'</div>',
							'<div class="picker__container__wrapper">',
								'<div class="picker__calendar-container">',
									'<div class="clockpicker-plate">',
										'<div class="clockpicker-canvas"></div>',
										'<div class="clockpicker-dial clockpicker-hours"></div>',
										'<div class="clockpicker-dial clockpicker-minutes clockpicker-dial-out"></div>',
									'</div>',
									'<div class="clockpicker-am-pm-block">',
									'</div>',
								'</div>',
								'<div class="picker__footer">',
								'</div>',
							'</div>',
						'</div>',
					'</div>',
				'</div>',
			'</div>',
		'</div>'
	].join('');

	// ClockPicker
	function ClockPicker(element, options) {
		var popover = $(tpl),
				plate = popover.find('.clockpicker-plate'),
				holder = popover.find('.picker__holder'),
				hoursView = popover.find('.clockpicker-hours'),
				minutesView = popover.find('.clockpicker-minutes'),
				amPmBlock = popover.find('.clockpicker-am-pm-block'),
				isInput = element.prop('tagName') === 'INPUT',
				input = isInput ? element : element.find('input'),
				label = $("label[for=" + input.attr("id") + "]"),
				self = this;

		this.id = uniqueId('cp');
		this.element = element;
		this.holder = holder;
		this.options = options;
		this.isAppended = false;
		this.isShown = false;
		this.currentView = 'hours';
		this.isInput = isInput;
		this.input = input;
		this.label = label;
		this.popover = popover;
		this.plate = plate;
		this.hoursView = hoursView;
		this.minutesView = minutesView;
		this.amPmBlock = amPmBlock;
		this.spanHours = popover.find('.clockpicker-span-hours');
		this.spanMinutes = popover.find('.clockpicker-span-minutes');
		this.spanAmPm = popover.find('.clockpicker-span-am-pm');
		this.footer = popover.find('.picker__footer');
		this.amOrPm = "PM";

		// Setup for for 12 hour clock if option is selected
		if (options.twelvehour) {
			if (!options.ampmclickable) {
				this.spanAmPm.empty();
				$('<div id="click-am">AM</div>').appendTo(this.spanAmPm);
				$('<div id="click-pm">PM</div>').appendTo(this.spanAmPm);
			}
			else {
				this.spanAmPm.empty();
				$('<div id="click-am">AM</div>').on("click", function() {
					self.spanAmPm.children('#click-am').addClass("text-primary");
					self.spanAmPm.children('#click-pm').removeClass("text-primary");
					self.amOrPm = "AM";
				}).appendTo(this.spanAmPm);
				$('<div id="click-pm">PM</div>').on("click", function() {
					self.spanAmPm.children('#click-pm').addClass("text-primary");
					self.spanAmPm.children('#click-am').removeClass("text-primary");
					self.amOrPm = 'PM';
				}).appendTo(this.spanAmPm);
			}
		}

		// Add buttons to footer
		$('<button type="button" class="btn-flat picker__clear" tabindex="' + (options.twelvehour? '3' : '1') + '">' + options.cleartext + '</button>').click($.proxy(this.clear, this)).appendTo(this.footer);
		$('<button type="button" class="btn-flat picker__close" tabindex="' + (options.twelvehour? '3' : '1') + '">' + options.canceltext + '</button>').click($.proxy(this.hide, this)).appendTo(this.footer);
		$('<button type="button" class="btn-flat picker__close" tabindex="' + (options.twelvehour? '3' : '1') + '">' + options.donetext + '</button>').click($.proxy(this.done, this)).appendTo(this.footer);

		this.spanHours.click($.proxy(this.toggleView, this, 'hours'));
		this.spanMinutes.click($.proxy(this.toggleView, this, 'minutes'));

		// Show or toggle
		input.on('focus.clockpicker click.clockpicker', $.proxy(this.show, this));

		// Build ticks
		var tickTpl = $('<div class="clockpicker-tick"></div>'),
				i, tick, radian, radius;

		// Hours view
		if (options.twelvehour) {
			for (i = 1; i < 13; i += 1) {
				tick = tickTpl.clone();
				radian = i / 6 * Math.PI;
				radius = outerRadius;
				tick.css({
					left: dialRadius + Math.sin(radian) * radius - tickRadius,
					top: dialRadius - Math.cos(radian) * radius - tickRadius
				});
				tick.html(i === 0 ? '00' : i);
				hoursView.append(tick);
				tick.on(mousedownEvent, mousedown);
			}
		} else {
			for (i = 0; i < 24; i += 1) {
				tick = tickTpl.clone();
				radian = i / 6 * Math.PI;
				var inner = i > 0 && i < 13;
				radius = inner ? innerRadius : outerRadius;
				tick.css({
					left: dialRadius + Math.sin(radian) * radius - tickRadius,
					top: dialRadius - Math.cos(radian) * radius - tickRadius
				});
				tick.html(i === 0 ? '00' : i);
				hoursView.append(tick);
				tick.on(mousedownEvent, mousedown);
			}
		}

		// Minutes view
		for (i = 0; i < 60; i += 5) {
			tick = tickTpl.clone();
			radian = i / 30 * Math.PI;
			tick.css({
				left: dialRadius + Math.sin(radian) * outerRadius - tickRadius,
				top: dialRadius - Math.cos(radian) * outerRadius - tickRadius
			});
			tick.html(leadingZero(i));
			minutesView.append(tick);
			tick.on(mousedownEvent, mousedown);
		}

		// Clicking on minutes view space
		plate.on(mousedownEvent, function(e) {
			if ($(e.target).closest('.clockpicker-tick').length === 0) {
				mousedown(e, true);
      }
		});

		// Mousedown or touchstart
		function mousedown(e, space) {
			var offset = plate.offset(),
					isTouch = /^touch/.test(e.type),
					x0 = offset.left + dialRadius,
					y0 = offset.top + dialRadius,
					dx = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
					dy = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0,
					z = Math.sqrt(dx * dx + dy * dy),
					moved = false;

			// When clicking on minutes view space, check the mouse position
			if (space && (z < outerRadius - tickRadius || z > outerRadius + tickRadius)) {
				return;
      }
			e.preventDefault();

			// Set cursor style of body after 200ms
			var movingTimer = setTimeout(function(){
				self.popover.addClass('clockpicker-moving');
			}, 200);

			// Clock
			self.setHand(dx, dy, !space, true);

			// Mousemove on document
			$doc.off(mousemoveEvent).on(mousemoveEvent, function(e){
				e.preventDefault();
				var isTouch = /^touch/.test(e.type),
						x = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
						y = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0;
				if (! moved && x === dx && y === dy) {
					// Clicking in chrome on windows will trigger a mousemove event
					return;
        }
				moved = true;
				self.setHand(x, y, false, true);
			});

			// Mouseup on document
			$doc.off(mouseupEvent).on(mouseupEvent, function(e) {
				$doc.off(mouseupEvent);
				e.preventDefault();
				var isTouch = /^touch/.test(e.type),
						x = (isTouch ? e.originalEvent.changedTouches[0] : e).pageX - x0,
						y = (isTouch ? e.originalEvent.changedTouches[0] : e).pageY - y0;
				if ((space || moved) && x === dx && y === dy) {
					self.setHand(x, y);
        }

				if (self.currentView === 'hours') {
					self.toggleView('minutes', duration / 2);
        } else if (options.autoclose) {
					self.minutesView.addClass('clockpicker-dial-out');
					setTimeout(function(){
						self.done();
					}, duration / 2);
        }
				plate.prepend(canvas);

				// Reset cursor style of body
				clearTimeout(movingTimer);
				self.popover.removeClass('clockpicker-moving');

				// Unbind mousemove event
				$doc.off(mousemoveEvent);
			});
		}

		if (svgSupported) {
			// Draw clock hands and others
			var canvas = popover.find('.clockpicker-canvas'),
					svg = createSvgElement('svg');
			svg.setAttribute('class', 'clockpicker-svg');
			svg.setAttribute('width', diameter);
			svg.setAttribute('height', diameter);
			var g = createSvgElement('g');
			g.setAttribute('transform', 'translate(' + dialRadius + ',' + dialRadius + ')');
			var bearing = createSvgElement('circle');
			bearing.setAttribute('class', 'clockpicker-canvas-bearing');
			bearing.setAttribute('cx', 0);
			bearing.setAttribute('cy', 0);
			bearing.setAttribute('r', 4);
			var hand = createSvgElement('line');
			hand.setAttribute('x1', 0);
			hand.setAttribute('y1', 0);
			var bg = createSvgElement('circle');
			bg.setAttribute('class', 'clockpicker-canvas-bg');
			bg.setAttribute('r', tickRadius);
			g.appendChild(hand);
			g.appendChild(bg);
			g.appendChild(bearing);
			svg.appendChild(g);
			canvas.append(svg);

			this.hand = hand;
			this.bg = bg;
			this.bearing = bearing;
			this.g = g;
			this.canvas = canvas;
		}

		raiseCallback(this.options.init);
	}

	function raiseCallback(callbackFunction) {
		if (callbackFunction && typeof callbackFunction === "function")
			callbackFunction();
	}

	// Default options
	ClockPicker.DEFAULTS = {
		'default': '',         // default time, 'now' or '13:14' e.g.
		fromnow: 0,            // set default time to * milliseconds from now (using with default = 'now')
		donetext: 'Ok',      // done button text
		cleartext: 'Clear',
		canceltext: 'Cancel',
		autoclose: false,      // auto close when minute is selected
		ampmclickable: true,  // set am/pm button on itself
		darktheme: false,			 // set to dark theme
		twelvehour: true,      // change to 12 hour AM/PM clock from 24 hour
		vibrate: true          // vibrate the device when dragging clock hand
	};

	// Show or hide popover
	ClockPicker.prototype.toggle = function() {
		this[this.isShown ? 'hide' : 'show']();
	};

	// Set popover position
	ClockPicker.prototype.locate = function() {
		var element = this.element,
				popover = this.popover,
				offset = element.offset(),
				width = element.outerWidth(),
				height = element.outerHeight(),
				align = this.options.align,
				self = this;

		popover.show();
	};

	// Show popover
	ClockPicker.prototype.show = function(e){
		// Not show again
		if (this.isShown) {
			return;
		}
		raiseCallback(this.options.beforeShow);
		$(':input').each(function() {
			$(this).attr('tabindex', -1);
		})
		var self = this;
		// Initialize
		this.input.blur();
		this.popover.addClass('picker--opened');
		this.input.addClass('picker__input picker__input--active');
		$(document.body).css('overflow', 'hidden');
		// Get the time
		var value = ((this.input.prop('value') || this.options['default'] || '') + '').split(':');
		if (this.options.twelvehour && !(typeof value[1] === 'undefined')) {
			if (value[1].indexOf("AM") > 0){
				this.amOrPm = 'AM';
			} else {
				this.amOrPm = 'PM';
			}
			value[1] = value[1].replace("AM", "").replace("PM", "");
		}
		if (value[0] === 'now') {
			var now = new Date(+ new Date() + this.options.fromnow);
			value = [
				now.getHours(),
				now.getMinutes()
			];
      if (this.options.twelvehour) {
        this.amOrPm = value[0] >= 12 && value[0] < 24 ? 'PM' : 'AM';
      }
		}
		this.hours = + value[0] || 0;
		this.minutes = + value[1] || 0;
		this.spanHours.html(this.hours);
		this.spanMinutes.html(leadingZero(this.minutes));
		if (!this.isAppended) {

			// Append popover to input by default
      var containerEl = document.querySelector(this.options.container);
      if (this.options.container && containerEl) {
        containerEl.appendChild(this.popover[0]);
      } else {
        this.popover.insertAfter(this.input);
      }

			if (this.options.twelvehour) {
				if (this.amOrPm === 'PM'){
					this.spanAmPm.children('#click-pm').addClass("text-primary");
					this.spanAmPm.children('#click-am').removeClass("text-primary");
				} else {
					this.spanAmPm.children('#click-am').addClass("text-primary");
					this.spanAmPm.children('#click-pm').removeClass("text-primary");
				}
			}
			// Reset position when resize
			$win.on('resize.clockpicker' + this.id, function() {
				if (self.isShown) {
					self.locate();
				}
			});
			this.isAppended = true;
		}
		// Toggle to hours view
		this.toggleView('hours');
		// Set position
		this.locate();
		this.isShown = true;
		// Hide when clicking or tabbing on any element except the clock and input
		$doc.on('click.clockpicker.' + this.id + ' focusin.clockpicker.' + this.id, function(e) {
			var target = $(e.target);
			if (target.closest(self.popover.find('.picker__wrap')).length === 0 && target.closest(self.input).length === 0) {
				self.hide();
      }
		});
		// Hide when ESC is pressed
		$doc.on('keyup.clockpicker.' + this.id, function(e){
			if (e.keyCode === 27) {
				self.hide();
      }
		});
		raiseCallback(this.options.afterShow);
	};
	// Hide popover
	ClockPicker.prototype.hide = function() {
		raiseCallback(this.options.beforeHide);
		this.input.removeClass('picker__input picker__input--active');
		this.popover.removeClass('picker--opened');
		$(document.body).css('overflow', 'visible');
		this.isShown = false;
		$(':input').each(function(index) {
			$(this).attr('tabindex', index + 1);
		});
		// Unbinding events on document
		$doc.off('click.clockpicker.' + this.id + ' focusin.clockpicker.' + this.id);
		$doc.off('keyup.clockpicker.' + this.id);
		this.popover.hide();
		raiseCallback(this.options.afterHide);
	};
	// Toggle to hours or minutes view
	ClockPicker.prototype.toggleView = function(view, delay) {
		var raiseAfterHourSelect = false;
		if (view === 'minutes' && $(this.hoursView).css("visibility") === "visible") {
			raiseCallback(this.options.beforeHourSelect);
			raiseAfterHourSelect = true;
		}
		var isHours = view === 'hours',
				nextView = isHours ? this.hoursView : this.minutesView,
				hideView = isHours ? this.minutesView : this.hoursView;
		this.currentView = view;

		this.spanHours.toggleClass('text-primary', isHours);
		this.spanMinutes.toggleClass('text-primary', ! isHours);

		// Let's make transitions
		hideView.addClass('clockpicker-dial-out');
		nextView.css('visibility', 'visible').removeClass('clockpicker-dial-out');

		// Reset clock hand
		this.resetClock(delay);

		// After transitions ended
		clearTimeout(this.toggleViewTimer);
		this.toggleViewTimer = setTimeout(function() {
			hideView.css('visibility', 'hidden');
		}, duration);

		if (raiseAfterHourSelect) {
			raiseCallback(this.options.afterHourSelect);
    }
	};

	// Reset clock hand
	ClockPicker.prototype.resetClock = function(delay) {
		var view = this.currentView,
				value = this[view],
				isHours = view === 'hours',
				unit = Math.PI / (isHours ? 6 : 30),
				radian = value * unit,
				radius = isHours && value > 0 && value < 13 ? innerRadius : outerRadius,
				x = Math.sin(radian) * radius,
				y = - Math.cos(radian) * radius,
				self = this;

		if (svgSupported && delay) {
			self.canvas.addClass('clockpicker-canvas-out');
			setTimeout(function(){
				self.canvas.removeClass('clockpicker-canvas-out');
				self.setHand(x, y);
			}, delay);
		} else
			this.setHand(x, y);
	};

	// Set clock hand to (x, y)
	ClockPicker.prototype.setHand = function(x, y, roundBy5, dragging) {
		var radian = Math.atan2(x, - y),
				isHours = this.currentView === 'hours',
				unit = Math.PI / (isHours || roundBy5? 6 : 30),
				z = Math.sqrt(x * x + y * y),
				options = this.options,
				inner = isHours && z < (outerRadius + innerRadius) / 2,
				radius = inner ? innerRadius : outerRadius,
				value;

		if (options.twelvehour) {
			radius = outerRadius;
    }

		// Radian should in range [0, 2PI]
		if (radian < 0) {
			radian = Math.PI * 2 + radian;
    }

		// Get the round value
		value = Math.round(radian / unit);

		// Get the round radian
		radian = value * unit;

		// Correct the hours or minutes
		if (options.twelvehour) {
			if (isHours) {
				if (value === 0)
					value = 12;
			} else {
				if (roundBy5)
					value *= 5;
				if (value === 60)
					value = 0;
			}
		} else {
			if (isHours) {
				if (value === 12)
					value = 0;
				value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
			} else {
				if (roundBy5)
					value *= 5;
				if (value === 60)
					value = 0;
			}
		}

		// Once hours or minutes changed, vibrate the device
		if (this[this.currentView] !== value) {
			if (vibrate && this.options.vibrate) {
				// Do not vibrate too frequently
				if (!this.vibrateTimer) {
					navigator[vibrate](10);
					this.vibrateTimer = setTimeout($.proxy(function(){
						this.vibrateTimer = null;
					}, this), 100);
				}
      }
    }

		this[this.currentView] = value;
    if (isHours) {
      this['spanHours'].html(value);
    } else {
      this['spanMinutes'].html(leadingZero(value));
    }

		// If svg is not supported, just add an active class to the tick
		if (!svgSupported) {
			this[isHours ? 'hoursView' : 'minutesView'].find('.clockpicker-tick').each(function(){
				var tick = $(this);
				tick.toggleClass('active', value === + tick.html());
			});
			return;
		}

		// Set clock hand and others' position
		var cx1 = Math.sin(radian) * (radius - tickRadius),
			  cy1 = - Math.cos(radian) * (radius - tickRadius),
		    cx2 = Math.sin(radian) * radius,
			  cy2 = - Math.cos(radian) * radius;
		this.hand.setAttribute('x2', cx1);
		this.hand.setAttribute('y2', cy1);
		this.bg.setAttribute('cx', cx2);
		this.bg.setAttribute('cy', cy2);
	};

	// Hours and minutes are selected
	ClockPicker.prototype.done = function() {
		raiseCallback(this.options.beforeDone);
		this.hide();
		this.label.addClass('active');

		var last = this.input.prop('value'),
				value = leadingZero(this.hours) + ':' + leadingZero(this.minutes);
		if (this.options.twelvehour) {
			value = value + this.amOrPm;
    }

		this.input.prop('value', value);
		if (value !== last) {
			this.input.triggerHandler('change');
			if (!this.isInput) {
				this.element.trigger('change');
      }
		}

		if (this.options.autoclose)
			this.input.trigger('blur');

		raiseCallback(this.options.afterDone);
	};

	// Clear input field
	ClockPicker.prototype.clear = function() {
		this.hide();
		this.label.removeClass('active');

		var last = this.input.prop('value'),
			  value = '';

		this.input.prop('value', value);
		if (value !== last) {
			this.input.triggerHandler('change');
			if (! this.isInput) {
				this.element.trigger('change');
			}
		}

		if (this.options.autoclose) {
			this.input.trigger('blur');
		}
	};

	// Remove clockpicker from input
	ClockPicker.prototype.remove = function() {
		this.element.removeData('clockpicker');
		this.input.off('focus.clockpicker click.clockpicker');
		if (this.isShown) {
			this.hide();
    }
		if (this.isAppended) {
			$win.off('resize.clockpicker' + this.id);
			this.popover.remove();
		}
	};

	// Extends $.fn.clockpicker
	$.fn.pickatime = function(option){
		var args = Array.prototype.slice.call(arguments, 1);
		return this.each(function(){
			var $this = $(this),
					data = $this.data('clockpicker');
			if (!data) {
				var options = $.extend({}, ClockPicker.DEFAULTS, $this.data(), typeof option == 'object' && option);
				$this.data('clockpicker', new ClockPicker($this, options));
			} else {
				// Manual operatsions. show, hide, remove, e.g.
				if (typeof data[option] === 'function') {
					data[option].apply(data, args);
        }
			}
		});
	};
})(jQuery);

(function ($) {

  $.fn.characterCounter = function(){
    return this.each(function(){
      var $input = $(this);
      var $counterElement = $input.parent().find('span[class="character-counter"]');

      // character counter has already been added appended to the parent container
      if ($counterElement.length) {
        return;
      }

      var itHasLengthAttribute = $input.attr('data-length') !== undefined;

      if(itHasLengthAttribute){
        $input.on('input', updateCounter);
        $input.on('focus', updateCounter);
        $input.on('blur', removeCounterElement);

        addCounterElement($input);
      }

    });
  };

  function updateCounter(){
    var maxLength     = +$(this).attr('data-length'),
    actualLength      = +$(this).val().length,
    isValidLength     = actualLength <= maxLength;

    $(this).parent().find('span[class="character-counter"]')
                    .html( actualLength + '/' + maxLength);

    addInputStyle(isValidLength, $(this));
  }

  function addCounterElement($input) {
    var $counterElement = $input.parent().find('span[class="character-counter"]');

    if ($counterElement.length) {
      return;
    }

    $counterElement = $('<span/>')
                        .addClass('character-counter')
                        .css('float','right')
                        .css('font-size','12px')
                        .css('height', 1);

    $input.parent().append($counterElement);
  }

  function removeCounterElement(){
    $(this).parent().find('span[class="character-counter"]').html('');
  }

  function addInputStyle(isValidLength, $input){
    var inputHasInvalidClass = $input.hasClass('invalid');
    if (isValidLength && inputHasInvalidClass) {
      $input.removeClass('invalid');
    }
    else if(!isValidLength && !inputHasInvalidClass){
      $input.removeClass('valid');
      $input.addClass('invalid');
    }
  }

  $(document).ready(function(){
    $('input, textarea').characterCounter();
  });

}( jQuery ));

(function ($) {

  var methods = {

    init : function(options) {
      var defaults = {
        duration: 200, // ms
        dist: -100, // zoom scale TODO: make this more intuitive as an option
        shift: 0, // spacing for center image
        padding: 0, // Padding between non center items
        fullWidth: false, // Change to full width styles
        indicators: false, // Toggle indicators
        noWrap: false, // Don't wrap around and cycle through items.
        onCycleTo: null // Callback for when a new slide is cycled to.
      };
      options = $.extend(defaults, options);
      var namespace = Materialize.objectSelectorString($(this));

      return this.each(function(i) {

        var images, item_width, item_height, offset, center, pressed, dim, count,
            reference, referenceY, amplitude, target, velocity, scrolling,
            xform, frame, timestamp, ticker, dragged, vertical_dragged;
        var $indicators = $('<ul class="indicators"></ul>');
        var scrollingTimeout = null;
        var oneTimeCallback = null;


        // Initialize
        var view = $(this);
        var hasMultipleSlides = view.find('.carousel-item').length > 1;
        var showIndicators = (view.attr('data-indicators') || options.indicators) && hasMultipleSlides;
        var noWrap = (view.attr('data-no-wrap') || options.noWrap) || !hasMultipleSlides;
        var uniqueNamespace = view.attr('data-namespace') || namespace+i;
        view.attr('data-namespace', uniqueNamespace);


        // Options
        var setCarouselHeight = function(imageOnly) {
          var firstSlide = view.find('.carousel-item.active').length ? view.find('.carousel-item.active').first() : view.find('.carousel-item').first();
          var firstImage = firstSlide.find('img').first();
          if (firstImage.length) {
            if (firstImage[0].complete) {
              // If image won't trigger the load event
              var imageHeight = firstImage.height();
              if (imageHeight > 0) {
                view.css('height', firstImage.height());
              } else {
                // If image still has no height, use the natural dimensions to calculate
                var naturalWidth = firstImage[0].naturalWidth;
                var naturalHeight = firstImage[0].naturalHeight;
                var adjustedHeight = (view.width() / naturalWidth) * naturalHeight;
                view.css('height', adjustedHeight);
              }
            } else {
              // Get height when image is loaded normally
              firstImage.on('load', function(){
                view.css('height', $(this).height());
              });
            }
          } else if (!imageOnly) {
            var slideHeight = firstSlide.height();
            view.css('height', slideHeight);
          }
        };

        if (options.fullWidth) {
          options.dist = 0;
          setCarouselHeight();

          // Offset fixed items when indicators.
          if (showIndicators) {
            view.find('.carousel-fixed-item').addClass('with-indicators');
          }
        }


        // Don't double initialize.
        if (view.hasClass('initialized')) {
          // Recalculate variables
          $(window).trigger('resize');

          // Redraw carousel.
          view.trigger('carouselNext', [0.000001]);
          return true;
        }


        view.addClass('initialized');
        pressed = false;
        offset = target = 0;
        images = [];
        item_width = view.find('.carousel-item').first().innerWidth();
        item_height = view.find('.carousel-item').first().innerHeight();
        dim = item_width * 2 + options.padding;

        view.find('.carousel-item').each(function (i) {
          images.push($(this)[0]);
          if (showIndicators) {
            var $indicator = $('<li class="indicator-item"></li>');

            // Add active to first by default.
            if (i === 0) {
              $indicator.addClass('active');
            }

            // Handle clicks on indicators.
            $indicator.click(function (e) {
              e.stopPropagation();

              var index = $(this).index();
              cycleTo(index);
            });
            $indicators.append($indicator);
          }
        });

        if (showIndicators) {
          view.append($indicators);
        }
        count = images.length;


        function setupEvents() {
          if (typeof window.ontouchstart !== 'undefined') {
            view.on('touchstart.carousel', tap);
            view.on('touchmove.carousel', drag);
            view.on('touchend.carousel', release);
          }
          view.on('mousedown.carousel', tap);
          view.on('mousemove.carousel', drag);
          view.on('mouseup.carousel', release);
          view.on('mouseleave.carousel', release);
          view.on('click.carousel', click);
        }

        function xpos(e) {
          // touch event
          if (e.targetTouches && (e.targetTouches.length >= 1)) {
            return e.targetTouches[0].clientX;
          }

          // mouse event
          return e.clientX;
        }

        function ypos(e) {
          // touch event
          if (e.targetTouches && (e.targetTouches.length >= 1)) {
            return e.targetTouches[0].clientY;
          }

          // mouse event
          return e.clientY;
        }

        function wrap(x) {
          return (x >= count) ? (x % count) : (x < 0) ? wrap(count + (x % count)) : x;
        }

        function scroll(x) {
          // Track scrolling state
          scrolling = true;
          if (!view.hasClass('scrolling')) {
            view.addClass('scrolling');
          }
          if (scrollingTimeout != null) {
            window.clearTimeout(scrollingTimeout);
          }
          scrollingTimeout = window.setTimeout(function() {
            scrolling = false;
            view.removeClass('scrolling');
          }, options.duration);

          // Start actual scroll
          var i, half, delta, dir, tween, el, alignment, xTranslation;
          var lastCenter = center;

          offset = (typeof x === 'number') ? x : offset;
          center = Math.floor((offset + dim / 2) / dim);
          delta = offset - center * dim;
          dir = (delta < 0) ? 1 : -1;
          tween = -dir * delta * 2 / dim;
          half = count >> 1;

          if (!options.fullWidth) {
            alignment = 'translateX(' + (view[0].clientWidth - item_width) / 2 + 'px) ';
            alignment += 'translateY(' + (view[0].clientHeight - item_height) / 2 + 'px)';
          } else {
            alignment = 'translateX(0)';
          }

          // Set indicator active
          if (showIndicators) {
            var diff = (center % count);
            var activeIndicator = $indicators.find('.indicator-item.active');
            if (activeIndicator.index() !== diff) {
              activeIndicator.removeClass('active');
              $indicators.find('.indicator-item').eq(diff).addClass('active');
            }
          }

          // center
          // Don't show wrapped items.
          if (!noWrap || (center >= 0 && center < count)) {
            el = images[wrap(center)];

            // Add active class to center item.
            if (!$(el).hasClass('active')) {
              view.find('.carousel-item').removeClass('active');
              $(el).addClass('active');
            }
            el.style[xform] = alignment +
              ' translateX(' + (-delta / 2) + 'px)' +
              ' translateX(' + (dir * options.shift * tween * i) + 'px)' +
              ' translateZ(' + (options.dist * tween) + 'px)';
            el.style.zIndex = 0;
            if (options.fullWidth) { tweenedOpacity = 1; }
            else { tweenedOpacity = 1 - 0.2 * tween; }
            el.style.opacity = tweenedOpacity;
            el.style.display = 'block';
          }

          for (i = 1; i <= half; ++i) {
            // right side
            if (options.fullWidth) {
              zTranslation = options.dist;
              tweenedOpacity = (i === half && delta < 0) ? 1 - tween : 1;
            } else {
              zTranslation = options.dist * (i * 2 + tween * dir);
              tweenedOpacity = 1 - 0.2 * (i * 2 + tween * dir);
            }
            // Don't show wrapped items.
            if (!noWrap || center + i < count) {
              el = images[wrap(center + i)];
              el.style[xform] = alignment +
                ' translateX(' + (options.shift + (dim * i - delta) / 2) + 'px)' +
                ' translateZ(' + zTranslation + 'px)';
              el.style.zIndex = -i;
              el.style.opacity = tweenedOpacity;
              el.style.display = 'block';
            }


            // left side
            if (options.fullWidth) {
              zTranslation = options.dist;
              tweenedOpacity = (i === half && delta > 0) ? 1 - tween : 1;
            } else {
              zTranslation = options.dist * (i * 2 - tween * dir);
              tweenedOpacity = 1 - 0.2 * (i * 2 - tween * dir);
            }
            // Don't show wrapped items.
            if (!noWrap || center - i >= 0) {
              el = images[wrap(center - i)];
              el.style[xform] = alignment +
                ' translateX(' + (-options.shift + (-dim * i - delta) / 2) + 'px)' +
                ' translateZ(' + zTranslation + 'px)';
              el.style.zIndex = -i;
              el.style.opacity = tweenedOpacity;
              el.style.display = 'block';
            }
          }

          // center
          // Don't show wrapped items.
          if (!noWrap || (center >= 0 && center < count)) {
            el = images[wrap(center)];
            el.style[xform] = alignment +
              ' translateX(' + (-delta / 2) + 'px)' +
              ' translateX(' + (dir * options.shift * tween) + 'px)' +
              ' translateZ(' + (options.dist * tween) + 'px)';
            el.style.zIndex = 0;
            if (options.fullWidth) { tweenedOpacity = 1; }
            else { tweenedOpacity = 1 - 0.2 * tween; }
            el.style.opacity = tweenedOpacity;
            el.style.display = 'block';
          }

          // onCycleTo callback
          if (lastCenter !== center &&
              typeof(options.onCycleTo) === "function") {
            var $curr_item = view.find('.carousel-item').eq(wrap(center));
            options.onCycleTo.call(this, $curr_item, dragged);
          }

          // One time callback
          if (typeof(oneTimeCallback) === "function") {
            oneTimeCallback.call(this, $curr_item, dragged);
            oneTimeCallback = null;
          }
        }

        function track() {
          var now, elapsed, delta, v;

          now = Date.now();
          elapsed = now - timestamp;
          timestamp = now;
          delta = offset - frame;
          frame = offset;

          v = 1000 * delta / (1 + elapsed);
          velocity = 0.8 * v + 0.2 * velocity;
        }

        function autoScroll() {
          var elapsed, delta;

          if (amplitude) {
            elapsed = Date.now() - timestamp;
            delta = amplitude * Math.exp(-elapsed / options.duration);
            if (delta > 2 || delta < -2) {
                scroll(target - delta);
                requestAnimationFrame(autoScroll);
            } else {
                scroll(target);
            }
          }
        }

        function click(e) {
          // Disable clicks if carousel was dragged.
          if (dragged) {
            e.preventDefault();
            e.stopPropagation();
            return false;

          } else if (!options.fullWidth) {
            var clickedIndex = $(e.target).closest('.carousel-item').index();
            var diff = wrap(center) - clickedIndex;

            // Disable clicks if carousel was shifted by click
            if (diff !== 0) {
              e.preventDefault();
              e.stopPropagation();
            }
            cycleTo(clickedIndex);
          }
        }

        function cycleTo(n) {
          var diff = (center % count) - n;

          // Account for wraparound.
          if (!noWrap) {
            if (diff < 0) {
              if (Math.abs(diff + count) < Math.abs(diff)) { diff += count; }

            } else if (diff > 0) {
              if (Math.abs(diff - count) < diff) { diff -= count; }
            }
          }

          // Call prev or next accordingly.
          if (diff < 0) {
            view.trigger('carouselNext', [Math.abs(diff)]);

          } else if (diff > 0) {
            view.trigger('carouselPrev', [diff]);
          }
        }

        function tap(e) {
          // Fixes firefox draggable image bug
          if (e.type === 'mousedown' && $(e.target).is('img')) {
            e.preventDefault();
          }
          pressed = true;
          dragged = false;
          vertical_dragged = false;
          reference = xpos(e);
          referenceY = ypos(e);

          velocity = amplitude = 0;
          frame = offset;
          timestamp = Date.now();
          clearInterval(ticker);
          ticker = setInterval(track, 100);
        }

        function drag(e) {
          var x, delta, deltaY;
          if (pressed) {
            x = xpos(e);
            y = ypos(e);
            delta = reference - x;
            deltaY = Math.abs(referenceY - y);
            if (deltaY < 30 && !vertical_dragged) {
              // If vertical scrolling don't allow dragging.
              if (delta > 2 || delta < -2) {
                dragged = true;
                reference = x;
                scroll(offset + delta);
              }

            } else if (dragged) {
              // If dragging don't allow vertical scroll.
              e.preventDefault();
              e.stopPropagation();
              return false;

            } else {
              // Vertical scrolling.
              vertical_dragged = true;
            }
          }

          if (dragged) {
            // If dragging don't allow vertical scroll.
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        }

        function release(e) {
          if (pressed) {
            pressed = false;
          } else {
            return;
          }

          clearInterval(ticker);
          target = offset;
          if (velocity > 10 || velocity < -10) {
            amplitude = 0.9 * velocity;
            target = offset + amplitude;
          }
          target = Math.round(target / dim) * dim;

          // No wrap of items.
          if (noWrap) {
            if (target >= dim * (count - 1)) {
              target = dim * (count - 1);
            } else if (target < 0) {
              target = 0;
            }
          }
          amplitude = target - offset;
          timestamp = Date.now();
          requestAnimationFrame(autoScroll);

          if (dragged) {
            e.preventDefault();
            e.stopPropagation();
          }
          return false;
        }

        xform = 'transform';
        ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
          var e = prefix + 'Transform';
          if (typeof document.body.style[e] !== 'undefined') {
            xform = e;
            return false;
          }
          return true;
        });


        var throttledResize = Materialize.throttle(function() {
          if (options.fullWidth) {
            item_width = view.find('.carousel-item').first().innerWidth();
            var imageHeight = view.find('.carousel-item.active').height();
            dim = item_width * 2 + options.padding;
            offset = center * 2 * item_width;
            target = offset;
            setCarouselHeight(true);
          } else {
            scroll();
          }
        }, 200);
        $(window)
          .off('resize.carousel-'+uniqueNamespace)
          .on('resize.carousel-'+uniqueNamespace, throttledResize);

        setupEvents();
        scroll(offset);

        $(this).on('carouselNext', function(e, n, callback) {
          if (n === undefined) {
            n = 1;
          }
          if (typeof(callback) === "function") {
            oneTimeCallback = callback;
          }

          target = (dim * Math.round(offset / dim)) + (dim * n);
          if (offset !== target) {
            amplitude = target - offset;
            timestamp = Date.now();
            requestAnimationFrame(autoScroll);
          }
        });

        $(this).on('carouselPrev', function(e, n, callback) {
          if (n === undefined) {
            n = 1;
          }
          if (typeof(callback) === "function") {
            oneTimeCallback = callback;
          }

          target = (dim * Math.round(offset / dim)) - (dim * n);
          if (offset !== target) {
            amplitude = target - offset;
            timestamp = Date.now();
            requestAnimationFrame(autoScroll);
          }
        });

        $(this).on('carouselSet', function(e, n, callback) {
          if (n === undefined) {
            n = 0;
          }
          if (typeof(callback) === "function") {
            oneTimeCallback = callback;
          }

          cycleTo(n);
        });

      });



    },
    next : function(n, callback) {
      $(this).trigger('carouselNext', [n, callback]);
    },
    prev : function(n, callback) {
      $(this).trigger('carouselPrev', [n, callback]);
    },
    set : function(n, callback) {
      $(this).trigger('carouselSet', [n, callback]);
    },
    destroy : function() {
      var uniqueNamespace = $(this).attr('data-namespace');
      $(this).removeAttr('data-namespace');
      $(this).removeClass('initialized');
      $(this).find('.indicators').remove();

      // Remove event handlers
      $(this).off('carouselNext carouselPrev carouselSet');
      $(window).off('resize.carousel-'+uniqueNamespace);
      if (typeof window.ontouchstart !== 'undefined') {
        $(this).off('touchstart.carousel touchmove.carousel touchend.carousel');
      }
      $(this).off('mousedown.carousel mousemove.carousel mouseup.carousel mouseleave.carousel click.carousel');
    }
  };


    $.fn.carousel = function(methodOrOptions) {
      if ( methods[methodOrOptions] ) {
        return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
        // Default to "init"
        return methods.init.apply( this, arguments );
      } else {
        $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.carousel' );
      }
    }; // Plugin end
}( jQuery ));

(function ($) {

  var methods = {
  init: function (options) {
    return this.each(function() {
    var origin = $('#'+$(this).attr('data-activates'));
    var screen = $('body');

    // Creating tap target
    var tapTargetEl = $(this);
    var tapTargetWrapper = tapTargetEl.parent('.tap-target-wrapper');
    var tapTargetWave = tapTargetWrapper.find('.tap-target-wave');
    var tapTargetOriginEl = tapTargetWrapper.find('.tap-target-origin');
    var tapTargetContentEl = tapTargetEl.find('.tap-target-content');

    // Creating wrapper
    if (!tapTargetWrapper.length) {
      tapTargetWrapper = tapTargetEl.wrap($('<div class="tap-target-wrapper"></div>')).parent();
    }

    // Creating content
    if (!tapTargetContentEl.length) {
      tapTargetContentEl = $('<div class="tap-target-content"></div>');
      tapTargetEl.append(tapTargetContentEl);
    }

    // Creating foreground wave
    if (!tapTargetWave.length) {
      tapTargetWave = $('<div class="tap-target-wave"></div>');

      // Creating origin
      if (!tapTargetOriginEl.length) {
        tapTargetOriginEl = origin.clone(true, true);
        tapTargetOriginEl.addClass('tap-target-origin');
        tapTargetOriginEl.removeAttr('id');
        tapTargetOriginEl.removeAttr('style');
        tapTargetWave.append(tapTargetOriginEl);
      }

      tapTargetWrapper.append(tapTargetWave);
    }

    // Open
    var openTapTarget = function() {
      if (tapTargetWrapper.is('.open')) {
        return;
      }

      // Adding open class
      tapTargetWrapper.addClass('open');

      setTimeout(function() {
        tapTargetOriginEl.off('click.tapTarget').on('click.tapTarget', function(e) {
          closeTapTarget();
          tapTargetOriginEl.off('click.tapTarget');
        });

        $(document).off('click.tapTarget').on('click.tapTarget', function(e) {
          closeTapTarget();
          $(document).off('click.tapTarget');
        });

        var throttledCalc = Materialize.throttle(function() {
          calculateTapTarget();
        }, 200);
        $(window).off('resize.tapTarget').on('resize.tapTarget', throttledCalc);
      }, 0);
    };

    // Close
    var closeTapTarget = function(){
      if (!tapTargetWrapper.is('.open')) {
        return;
      }

      tapTargetWrapper.removeClass('open');
      tapTargetOriginEl.off('click.tapTarget')
      $(document).off('click.tapTarget');
      $(window).off('resize.tapTarget');
    };

    // Pre calculate
    var calculateTapTarget = function() {
      // Element or parent is fixed position?
      var isFixed = origin.css('position') === 'fixed';
      if (!isFixed) {
        var parents = origin.parents();
        for(var i = 0; i < parents.length; i++) {
          isFixed = $(parents[i]).css('position') == 'fixed';
          if (isFixed) {
            break;
          }
        }
      }

      // Calculating origin
      var originWidth = origin.outerWidth();
      var originHeight = origin.outerHeight();
      var originTop = isFixed ? origin.offset().top - $(document).scrollTop() : origin.offset().top;
      var originLeft = isFixed ? origin.offset().left - $(document).scrollLeft() : origin.offset().left;

      // Calculating screen
      var windowWidth = $(window).width();
      var windowHeight = $(window).height();
      var centerX = windowWidth / 2;
      var centerY = windowHeight / 2;
      var isLeft = originLeft <= centerX;
      var isRight = originLeft > centerX;
      var isTop = originTop <= centerY;
      var isBottom = originTop > centerY;
      var isCenterX = originLeft >= windowWidth*0.25 && originLeft <= windowWidth*0.75;
      var isCenterY = originTop >= windowHeight*0.25 && originTop <= windowHeight*0.75;

      // Calculating tap target
      var tapTargetWidth = tapTargetEl.outerWidth();
      var tapTargetHeight = tapTargetEl.outerHeight();
      var tapTargetTop = originTop + originHeight/2 - tapTargetHeight/2;
      var tapTargetLeft = originLeft + originWidth/2 - tapTargetWidth/2;
      var tapTargetPosition = isFixed ? 'fixed' : 'absolute';

      // Calculating content
      var tapTargetTextWidth = isCenterX ? tapTargetWidth : tapTargetWidth/2 + originWidth;
      var tapTargetTextHeight = tapTargetHeight/2;
      var tapTargetTextTop = isTop ? tapTargetHeight/2 : 0;
      var tapTargetTextBottom = 0;
      var tapTargetTextLeft = isLeft && !isCenterX ? tapTargetWidth/2 - originWidth : 0;
      var tapTargetTextRight = 0;
      var tapTargetTextPadding = originWidth;
      var tapTargetTextAlign = isBottom ? 'bottom' : 'top';

      // Calculating wave
      var tapTargetWaveWidth = originWidth > originHeight ? originWidth*2 : originWidth*2;
      var tapTargetWaveHeight = tapTargetWaveWidth;
      var tapTargetWaveTop = tapTargetHeight/2 - tapTargetWaveHeight/2;
      var tapTargetWaveLeft = tapTargetWidth/2 - tapTargetWaveWidth/2;

      // Setting tap target
      var tapTargetWrapperCssObj = {};
      tapTargetWrapperCssObj.top = isTop ? tapTargetTop : '';
      tapTargetWrapperCssObj.right = isRight ? windowWidth - tapTargetLeft - tapTargetWidth : '';
      tapTargetWrapperCssObj.bottom = isBottom ? windowHeight - tapTargetTop - tapTargetHeight : '';
      tapTargetWrapperCssObj.left = isLeft ? tapTargetLeft : '';
      tapTargetWrapperCssObj.position = tapTargetPosition;
      tapTargetWrapper.css(tapTargetWrapperCssObj);

      // Setting content
      tapTargetContentEl.css({
        width: tapTargetTextWidth,
        height: tapTargetTextHeight,
        top: tapTargetTextTop,
        right: tapTargetTextRight,
        bottom: tapTargetTextBottom,
        left: tapTargetTextLeft,
        padding: tapTargetTextPadding,
        verticalAlign: tapTargetTextAlign
      });

      // Setting wave
      tapTargetWave.css({
        top: tapTargetWaveTop,
        left: tapTargetWaveLeft,
        width: tapTargetWaveWidth,
        height: tapTargetWaveHeight
      });
    }

    if (options == 'open') {
      calculateTapTarget();
      openTapTarget();
    }

    if (options == 'close')
      closeTapTarget();
    });
  },
  open: function() {},
  close: function() {}
  };

  $.fn.tapTarget = function(methodOrOptions) {
  if (methods[methodOrOptions] || typeof methodOrOptions === 'object')
    return methods.init.apply( this, arguments );

  $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tap-target' );
  };

}( jQuery ));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENoZWNrIGZvciBqUXVlcnkuXHJcbmlmICh0eXBlb2YoalF1ZXJ5KSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAvLyBDaGVjayBpZiByZXF1aXJlIGlzIGEgZGVmaW5lZCBmdW5jdGlvbi5cclxuICBpZiAodHlwZW9mKHJlcXVpcmUpID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICBqUXVlcnkgPSAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcbiAgLy8gRWxzZSB1c2UgdGhlIGRvbGxhciBzaWduIGFsaWFzLlxyXG4gIH0gZWxzZSB7XHJcbiAgICBqUXVlcnkgPSAkO1xyXG4gIH1cclxufVxyXG5cbi8qXHJcbiAqIGpRdWVyeSBFYXNpbmcgdjEuNC4wIC0gaHR0cDovL2dzZ2QuY28udWsvc2FuZGJveC9qcXVlcnkvZWFzaW5nL1xyXG4gKiBPcGVuIHNvdXJjZSB1bmRlciB0aGUgQlNEIExpY2Vuc2UuXHJcbiAqIENvcHlyaWdodCDCqSAyMDA4IEdlb3JnZSBNY0dpbmxleSBTbWl0aFxyXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiBodHRwczovL3Jhdy5naXRodWIuY29tL2dkc21pdGgvanF1ZXJ5LWVhc2luZy9tYXN0ZXIvTElDRU5TRVxyXG4qL1xyXG5cclxuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XHJcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XHJcblx0XHRkZWZpbmUoWydqcXVlcnknXSwgZnVuY3Rpb24gKCQpIHtcclxuXHRcdFx0cmV0dXJuIGZhY3RvcnkoJCk7XHJcblx0XHR9KTtcclxuXHR9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XHJcblx0XHRleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGZhY3RvcnkoalF1ZXJ5KTtcclxuXHR9XHJcbn0pKGZ1bmN0aW9uKCQpe1xyXG5cclxuLy8gUHJlc2VydmUgdGhlIG9yaWdpbmFsIGpRdWVyeSBcInN3aW5nXCIgZWFzaW5nIGFzIFwianN3aW5nXCJcclxuJC5lYXNpbmdbJ2pzd2luZyddID0gJC5lYXNpbmdbJ3N3aW5nJ107XHJcblxyXG52YXIgcG93ID0gTWF0aC5wb3csXHJcblx0c3FydCA9IE1hdGguc3FydCxcclxuXHRzaW4gPSBNYXRoLnNpbixcclxuXHRjb3MgPSBNYXRoLmNvcyxcclxuXHRQSSA9IE1hdGguUEksXHJcblx0YzEgPSAxLjcwMTU4LFxyXG5cdGMyID0gYzEgKiAxLjUyNSxcclxuXHRjMyA9IGMxICsgMSxcclxuXHRjNCA9ICggMiAqIFBJICkgLyAzLFxyXG5cdGM1ID0gKCAyICogUEkgKSAvIDQuNTtcclxuXHJcbi8vIHggaXMgdGhlIGZyYWN0aW9uIG9mIGFuaW1hdGlvbiBwcm9ncmVzcywgaW4gdGhlIHJhbmdlIDAuLjFcclxuZnVuY3Rpb24gYm91bmNlT3V0KHgpIHtcclxuXHR2YXIgbjEgPSA3LjU2MjUsXHJcblx0XHRkMSA9IDIuNzU7XHJcblx0aWYgKCB4IDwgMS9kMSApIHtcclxuXHRcdHJldHVybiBuMSp4Kng7XHJcblx0fSBlbHNlIGlmICggeCA8IDIvZDEgKSB7XHJcblx0XHRyZXR1cm4gbjEqKHgtPSgxLjUvZDEpKSp4ICsgLjc1O1xyXG5cdH0gZWxzZSBpZiAoIHggPCAyLjUvZDEgKSB7XHJcblx0XHRyZXR1cm4gbjEqKHgtPSgyLjI1L2QxKSkqeCArIC45Mzc1O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gbjEqKHgtPSgyLjYyNS9kMSkpKnggKyAuOTg0Mzc1O1xyXG5cdH1cclxufVxyXG5cclxuJC5leHRlbmQoICQuZWFzaW5nLFxyXG57XHJcblx0ZGVmOiAnZWFzZU91dFF1YWQnLFxyXG5cdHN3aW5nOiBmdW5jdGlvbiAoeCkge1xyXG5cdFx0cmV0dXJuICQuZWFzaW5nWyQuZWFzaW5nLmRlZl0oeCk7XHJcblx0fSxcclxuXHRlYXNlSW5RdWFkOiBmdW5jdGlvbiAoeCkge1xyXG5cdFx0cmV0dXJuIHggKiB4O1xyXG5cdH0sXHJcblx0ZWFzZU91dFF1YWQ6IGZ1bmN0aW9uICh4KSB7XHJcblx0XHRyZXR1cm4gMSAtICggMSAtIHggKSAqICggMSAtIHggKTtcclxuXHR9LFxyXG5cdGVhc2VJbk91dFF1YWQ6IGZ1bmN0aW9uICh4KSB7XHJcblx0XHRyZXR1cm4geCA8IDAuNSA/XHJcblx0XHRcdDIgKiB4ICogeCA6XHJcblx0XHRcdDEgLSBwb3coIC0yICogeCArIDIsIDIgKSAvIDI7XHJcblx0fSxcclxuXHRlYXNlSW5DdWJpYzogZnVuY3Rpb24gKHgpIHtcclxuXHRcdHJldHVybiB4ICogeCAqIHg7XHJcblx0fSxcclxuXHRlYXNlT3V0Q3ViaWM6IGZ1bmN0aW9uICh4KSB7XHJcblx0XHRyZXR1cm4gMSAtIHBvdyggMSAtIHgsIDMgKTtcclxuXHR9LFxyXG5cdGVhc2VJbk91dEN1YmljOiBmdW5jdGlvbiAoeCkge1xyXG5cdFx0cmV0dXJuIHggPCAwLjUgP1xyXG5cdFx0XHQ0ICogeCAqIHggKiB4IDpcclxuXHRcdFx0MSAtIHBvdyggLTIgKiB4ICsgMiwgMyApIC8gMjtcclxuXHR9LFxyXG5cdGVhc2VJblF1YXJ0OiBmdW5jdGlvbiAoeCkge1xyXG5cdFx0cmV0dXJuIHggKiB4ICogeCAqIHg7XHJcblx0fSxcclxuXHRlYXNlT3V0UXVhcnQ6IGZ1bmN0aW9uICh4KSB7XHJcblx0XHRyZXR1cm4gMSAtIHBvdyggMSAtIHgsIDQgKTtcclxuXHR9LFxyXG5cdGVhc2VJbk91dFF1YXJ0OiBmdW5jdGlvbiAoeCkge1xyXG5cdFx0cmV0dXJuIHggPCAwLjUgP1xyXG5cdFx0XHQ4ICogeCAqIHggKiB4ICogeCA6XHJcblx0XHRcdDEgLSBwb3coIC0yICogeCArIDIsIDQgKSAvIDI7XHJcblx0fSxcclxuXHRlYXNlSW5RdWludDogZnVuY3Rpb24gKHgpIHtcclxuXHRcdHJldHVybiB4ICogeCAqIHggKiB4ICogeDtcclxuXHR9LFxyXG5cdGVhc2VPdXRRdWludDogZnVuY3Rpb24gKHgpIHtcclxuXHRcdHJldHVybiAxIC0gcG93KCAxIC0geCwgNSApO1xyXG5cdH0sXHJcblx0ZWFzZUluT3V0UXVpbnQ6IGZ1bmN0aW9uICh4KSB7XHJcblx0XHRyZXR1cm4geCA8IDAuNSA/XHJcblx0XHRcdDE2ICogeCAqIHggKiB4ICogeCAqIHggOlxyXG5cdFx0XHQxIC0gcG93KCAtMiAqIHggKyAyLCA1ICkgLyAyO1xyXG5cdH0sXHJcblx0ZWFzZUluU2luZTogZnVuY3Rpb24gKHgpIHtcclxuXHRcdHJldHVybiAxIC0gY29zKCB4ICogUEkvMiApO1xyXG5cdH0sXHJcblx0ZWFzZU91dFNpbmU6IGZ1bmN0aW9uICh4KSB7XHJcblx0XHRyZXR1cm4gc2luKCB4ICogUEkvMiApO1xyXG5cdH0sXHJcblx0ZWFzZUluT3V0U2luZTogZnVuY3Rpb24gKHgpIHtcclxuXHRcdHJldHVybiAtKCBjb3MoIFBJICogeCApIC0gMSApIC8gMjtcclxuXHR9LFxyXG5cdGVhc2VJbkV4cG86IGZ1bmN0aW9uICh4KSB7XHJcblx0XHRyZXR1cm4geCA9PT0gMCA/IDAgOiBwb3coIDIsIDEwICogeCAtIDEwICk7XHJcblx0fSxcclxuXHRlYXNlT3V0RXhwbzogZnVuY3Rpb24gKHgpIHtcclxuXHRcdHJldHVybiB4ID09PSAxID8gMSA6IDEgLSBwb3coIDIsIC0xMCAqIHggKTtcclxuXHR9LFxyXG5cdGVhc2VJbk91dEV4cG86IGZ1bmN0aW9uICh4KSB7XHJcblx0XHRyZXR1cm4geCA9PT0gMCA/IDAgOiB4ID09PSAxID8gMSA6IHggPCAwLjUgP1xyXG5cdFx0XHRwb3coIDIsIDIwICogeCAtIDEwICkgLyAyIDpcclxuXHRcdFx0KCAyIC0gcG93KCAyLCAtMjAgKiB4ICsgMTAgKSApIC8gMjtcclxuXHR9LFxyXG5cdGVhc2VJbkNpcmM6IGZ1bmN0aW9uICh4KSB7XHJcblx0XHRyZXR1cm4gMSAtIHNxcnQoIDEgLSBwb3coIHgsIDIgKSApO1xyXG5cdH0sXHJcblx0ZWFzZU91dENpcmM6IGZ1bmN0aW9uICh4KSB7XHJcblx0XHRyZXR1cm4gc3FydCggMSAtIHBvdyggeCAtIDEsIDIgKSApO1xyXG5cdH0sXHJcblx0ZWFzZUluT3V0Q2lyYzogZnVuY3Rpb24gKHgpIHtcclxuXHRcdHJldHVybiB4IDwgMC41ID9cclxuXHRcdFx0KCAxIC0gc3FydCggMSAtIHBvdyggMiAqIHgsIDIgKSApICkgLyAyIDpcclxuXHRcdFx0KCBzcXJ0KCAxIC0gcG93KCAtMiAqIHggKyAyLCAyICkgKSArIDEgKSAvIDI7XHJcblx0fSxcclxuXHRlYXNlSW5FbGFzdGljOiBmdW5jdGlvbiAoeCkge1xyXG5cdFx0cmV0dXJuIHggPT09IDAgPyAwIDogeCA9PT0gMSA/IDEgOlxyXG5cdFx0XHQtcG93KCAyLCAxMCAqIHggLSAxMCApICogc2luKCAoIHggKiAxMCAtIDEwLjc1ICkgKiBjNCApO1xyXG5cdH0sXHJcblx0ZWFzZU91dEVsYXN0aWM6IGZ1bmN0aW9uICh4KSB7XHJcblx0XHRyZXR1cm4geCA9PT0gMCA/IDAgOiB4ID09PSAxID8gMSA6XHJcblx0XHRcdHBvdyggMiwgLTEwICogeCApICogc2luKCAoIHggKiAxMCAtIDAuNzUgKSAqIGM0ICkgKyAxO1xyXG5cdH0sXHJcblx0ZWFzZUluT3V0RWxhc3RpYzogZnVuY3Rpb24gKHgpIHtcclxuXHRcdHJldHVybiB4ID09PSAwID8gMCA6IHggPT09IDEgPyAxIDogeCA8IDAuNSA/XHJcblx0XHRcdC0oIHBvdyggMiwgMjAgKiB4IC0gMTAgKSAqIHNpbiggKCAyMCAqIHggLSAxMS4xMjUgKSAqIGM1ICkpIC8gMiA6XHJcblx0XHRcdHBvdyggMiwgLTIwICogeCArIDEwICkgKiBzaW4oICggMjAgKiB4IC0gMTEuMTI1ICkgKiBjNSApIC8gMiArIDE7XHJcblx0fSxcclxuXHRlYXNlSW5CYWNrOiBmdW5jdGlvbiAoeCkge1xyXG5cdFx0cmV0dXJuIGMzICogeCAqIHggKiB4IC0gYzEgKiB4ICogeDtcclxuXHR9LFxyXG5cdGVhc2VPdXRCYWNrOiBmdW5jdGlvbiAoeCkge1xyXG5cdFx0cmV0dXJuIDEgKyBjMyAqIHBvdyggeCAtIDEsIDMgKSArIGMxICogcG93KCB4IC0gMSwgMiApO1xyXG5cdH0sXHJcblx0ZWFzZUluT3V0QmFjazogZnVuY3Rpb24gKHgpIHtcclxuXHRcdHJldHVybiB4IDwgMC41ID9cclxuXHRcdFx0KCBwb3coIDIgKiB4LCAyICkgKiAoICggYzIgKyAxICkgKiAyICogeCAtIGMyICkgKSAvIDIgOlxyXG5cdFx0XHQoIHBvdyggMiAqIHggLSAyLCAyICkgKiggKCBjMiArIDEgKSAqICggeCAqIDIgLSAyICkgKyBjMiApICsgMiApIC8gMjtcclxuXHR9LFxyXG5cdGVhc2VJbkJvdW5jZTogZnVuY3Rpb24gKHgpIHtcclxuXHRcdHJldHVybiAxIC0gYm91bmNlT3V0KCAxIC0geCApO1xyXG5cdH0sXHJcblx0ZWFzZU91dEJvdW5jZTogYm91bmNlT3V0LFxyXG5cdGVhc2VJbk91dEJvdW5jZTogZnVuY3Rpb24gKHgpIHtcclxuXHRcdHJldHVybiB4IDwgMC41ID9cclxuXHRcdFx0KCAxIC0gYm91bmNlT3V0KCAxIC0gMiAqIHggKSApIC8gMiA6XHJcblx0XHRcdCggMSArIGJvdW5jZU91dCggMiAqIHggLSAxICkgKSAvIDI7XHJcblx0fVxyXG59KTtcclxuXHJcbn0pO1xuLy8gQ3VzdG9tIEVhc2luZ1xyXG5qUXVlcnkuZXh0ZW5kKCBqUXVlcnkuZWFzaW5nLFxyXG57XHJcbiAgZWFzZUluT3V0TWF0ZXJpYWw6IGZ1bmN0aW9uICh4LCB0LCBiLCBjLCBkKSB7XHJcbiAgICBpZiAoKHQvPWQvMikgPCAxKSByZXR1cm4gYy8yKnQqdCArIGI7XHJcbiAgICByZXR1cm4gYy80KigodC09MikqdCp0ICsgMikgKyBiO1xyXG4gIH1cclxufSk7XG4vKiEgVmVsb2NpdHlKUy5vcmcgKDEuMi4zKS4gKEMpIDIwMTQgSnVsaWFuIFNoYXBpcm8uIE1JVCBAbGljZW5zZTogZW4ud2lraXBlZGlhLm9yZy93aWtpL01JVF9MaWNlbnNlICovXHJcbi8qISBWZWxvY2l0eUpTLm9yZyBqUXVlcnkgU2hpbSAoMS4wLjEpLiAoQykgMjAxNCBUaGUgalF1ZXJ5IEZvdW5kYXRpb24uIE1JVCBAbGljZW5zZTogZW4ud2lraXBlZGlhLm9yZy93aWtpL01JVF9MaWNlbnNlLiAqL1xyXG4vKiEgTm90ZSB0aGF0IHRoaXMgaGFzIGJlZW4gbW9kaWZpZWQgYnkgTWF0ZXJpYWxpemUgdG8gY29uZmlybSB0aGF0IFZlbG9jaXR5IGlzIG5vdCBhbHJlYWR5IGJlaW5nIGltcG9ydGVkLiAqL1xyXG5qUXVlcnkuVmVsb2NpdHk/Y29uc29sZS5sb2coXCJWZWxvY2l0eSBpcyBhbHJlYWR5IGxvYWRlZC4gWW91IG1heSBiZSBuZWVkbGVzc2x5IGltcG9ydGluZyBWZWxvY2l0eSBhZ2Fpbjsgbm90ZSB0aGF0IE1hdGVyaWFsaXplIGluY2x1ZGVzIFZlbG9jaXR5LlwiKTooIWZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQoZSl7dmFyIHQ9ZS5sZW5ndGgsYT1yLnR5cGUoZSk7cmV0dXJuXCJmdW5jdGlvblwiPT09YXx8ci5pc1dpbmRvdyhlKT8hMToxPT09ZS5ub2RlVHlwZSYmdD8hMDpcImFycmF5XCI9PT1hfHwwPT09dHx8XCJudW1iZXJcIj09dHlwZW9mIHQmJnQ+MCYmdC0xIGluIGV9aWYoIWUualF1ZXJ5KXt2YXIgcj1mdW5jdGlvbihlLHQpe3JldHVybiBuZXcgci5mbi5pbml0KGUsdCl9O3IuaXNXaW5kb3c9ZnVuY3Rpb24oZSl7cmV0dXJuIG51bGwhPWUmJmU9PWUud2luZG93fSxyLnR5cGU9ZnVuY3Rpb24oZSl7cmV0dXJuIG51bGw9PWU/ZStcIlwiOlwib2JqZWN0XCI9PXR5cGVvZiBlfHxcImZ1bmN0aW9uXCI9PXR5cGVvZiBlP25baS5jYWxsKGUpXXx8XCJvYmplY3RcIjp0eXBlb2YgZX0sci5pc0FycmF5PUFycmF5LmlzQXJyYXl8fGZ1bmN0aW9uKGUpe3JldHVyblwiYXJyYXlcIj09PXIudHlwZShlKX0sci5pc1BsYWluT2JqZWN0PWZ1bmN0aW9uKGUpe3ZhciB0O2lmKCFlfHxcIm9iamVjdFwiIT09ci50eXBlKGUpfHxlLm5vZGVUeXBlfHxyLmlzV2luZG93KGUpKXJldHVybiExO3RyeXtpZihlLmNvbnN0cnVjdG9yJiYhby5jYWxsKGUsXCJjb25zdHJ1Y3RvclwiKSYmIW8uY2FsbChlLmNvbnN0cnVjdG9yLnByb3RvdHlwZSxcImlzUHJvdG90eXBlT2ZcIikpcmV0dXJuITF9Y2F0Y2goYSl7cmV0dXJuITF9Zm9yKHQgaW4gZSk7cmV0dXJuIHZvaWQgMD09PXR8fG8uY2FsbChlLHQpfSxyLmVhY2g9ZnVuY3Rpb24oZSxyLGEpe3ZhciBuLG89MCxpPWUubGVuZ3RoLHM9dChlKTtpZihhKXtpZihzKWZvcig7aT5vJiYobj1yLmFwcGx5KGVbb10sYSksbiE9PSExKTtvKyspO2Vsc2UgZm9yKG8gaW4gZSlpZihuPXIuYXBwbHkoZVtvXSxhKSxuPT09ITEpYnJlYWt9ZWxzZSBpZihzKWZvcig7aT5vJiYobj1yLmNhbGwoZVtvXSxvLGVbb10pLG4hPT0hMSk7bysrKTtlbHNlIGZvcihvIGluIGUpaWYobj1yLmNhbGwoZVtvXSxvLGVbb10pLG49PT0hMSlicmVhaztyZXR1cm4gZX0sci5kYXRhPWZ1bmN0aW9uKGUsdCxuKXtpZih2b2lkIDA9PT1uKXt2YXIgbz1lW3IuZXhwYW5kb10saT1vJiZhW29dO2lmKHZvaWQgMD09PXQpcmV0dXJuIGk7aWYoaSYmdCBpbiBpKXJldHVybiBpW3RdfWVsc2UgaWYodm9pZCAwIT09dCl7dmFyIG89ZVtyLmV4cGFuZG9dfHwoZVtyLmV4cGFuZG9dPSsrci51dWlkKTtyZXR1cm4gYVtvXT1hW29dfHx7fSxhW29dW3RdPW4sbn19LHIucmVtb3ZlRGF0YT1mdW5jdGlvbihlLHQpe3ZhciBuPWVbci5leHBhbmRvXSxvPW4mJmFbbl07byYmci5lYWNoKHQsZnVuY3Rpb24oZSx0KXtkZWxldGUgb1t0XX0pfSxyLmV4dGVuZD1mdW5jdGlvbigpe3ZhciBlLHQsYSxuLG8saSxzPWFyZ3VtZW50c1swXXx8e30sbD0xLHU9YXJndW1lbnRzLmxlbmd0aCxjPSExO2ZvcihcImJvb2xlYW5cIj09dHlwZW9mIHMmJihjPXMscz1hcmd1bWVudHNbbF18fHt9LGwrKyksXCJvYmplY3RcIiE9dHlwZW9mIHMmJlwiZnVuY3Rpb25cIiE9PXIudHlwZShzKSYmKHM9e30pLGw9PT11JiYocz10aGlzLGwtLSk7dT5sO2wrKylpZihudWxsIT0obz1hcmd1bWVudHNbbF0pKWZvcihuIGluIG8pZT1zW25dLGE9b1tuXSxzIT09YSYmKGMmJmEmJihyLmlzUGxhaW5PYmplY3QoYSl8fCh0PXIuaXNBcnJheShhKSkpPyh0Pyh0PSExLGk9ZSYmci5pc0FycmF5KGUpP2U6W10pOmk9ZSYmci5pc1BsYWluT2JqZWN0KGUpP2U6e30sc1tuXT1yLmV4dGVuZChjLGksYSkpOnZvaWQgMCE9PWEmJihzW25dPWEpKTtyZXR1cm4gc30sci5xdWV1ZT1mdW5jdGlvbihlLGEsbil7ZnVuY3Rpb24gbyhlLHIpe3ZhciBhPXJ8fFtdO3JldHVybiBudWxsIT1lJiYodChPYmplY3QoZSkpPyFmdW5jdGlvbihlLHQpe2Zvcih2YXIgcj0rdC5sZW5ndGgsYT0wLG49ZS5sZW5ndGg7cj5hOyllW24rK109dFthKytdO2lmKHIhPT1yKWZvcig7dm9pZCAwIT09dFthXTspZVtuKytdPXRbYSsrXTtyZXR1cm4gZS5sZW5ndGg9bixlfShhLFwic3RyaW5nXCI9PXR5cGVvZiBlP1tlXTplKTpbXS5wdXNoLmNhbGwoYSxlKSksYX1pZihlKXthPShhfHxcImZ4XCIpK1wicXVldWVcIjt2YXIgaT1yLmRhdGEoZSxhKTtyZXR1cm4gbj8oIWl8fHIuaXNBcnJheShuKT9pPXIuZGF0YShlLGEsbyhuKSk6aS5wdXNoKG4pLGkpOml8fFtdfX0sci5kZXF1ZXVlPWZ1bmN0aW9uKGUsdCl7ci5lYWNoKGUubm9kZVR5cGU/W2VdOmUsZnVuY3Rpb24oZSxhKXt0PXR8fFwiZnhcIjt2YXIgbj1yLnF1ZXVlKGEsdCksbz1uLnNoaWZ0KCk7XCJpbnByb2dyZXNzXCI9PT1vJiYobz1uLnNoaWZ0KCkpLG8mJihcImZ4XCI9PT10JiZuLnVuc2hpZnQoXCJpbnByb2dyZXNzXCIpLG8uY2FsbChhLGZ1bmN0aW9uKCl7ci5kZXF1ZXVlKGEsdCl9KSl9KX0sci5mbj1yLnByb3RvdHlwZT17aW5pdDpmdW5jdGlvbihlKXtpZihlLm5vZGVUeXBlKXJldHVybiB0aGlzWzBdPWUsdGhpczt0aHJvdyBuZXcgRXJyb3IoXCJOb3QgYSBET00gbm9kZS5cIil9LG9mZnNldDpmdW5jdGlvbigpe3ZhciB0PXRoaXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0P3RoaXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk6e3RvcDowLGxlZnQ6MH07cmV0dXJue3RvcDp0LnRvcCsoZS5wYWdlWU9mZnNldHx8ZG9jdW1lbnQuc2Nyb2xsVG9wfHwwKS0oZG9jdW1lbnQuY2xpZW50VG9wfHwwKSxsZWZ0OnQubGVmdCsoZS5wYWdlWE9mZnNldHx8ZG9jdW1lbnQuc2Nyb2xsTGVmdHx8MCktKGRvY3VtZW50LmNsaWVudExlZnR8fDApfX0scG9zaXRpb246ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKCl7Zm9yKHZhciBlPXRoaXMub2Zmc2V0UGFyZW50fHxkb2N1bWVudDtlJiZcImh0bWxcIj09PSFlLm5vZGVUeXBlLnRvTG93ZXJDYXNlJiZcInN0YXRpY1wiPT09ZS5zdHlsZS5wb3NpdGlvbjspZT1lLm9mZnNldFBhcmVudDtyZXR1cm4gZXx8ZG9jdW1lbnR9dmFyIHQ9dGhpc1swXSxlPWUuYXBwbHkodCksYT10aGlzLm9mZnNldCgpLG49L14oPzpib2R5fGh0bWwpJC9pLnRlc3QoZS5ub2RlTmFtZSk/e3RvcDowLGxlZnQ6MH06cihlKS5vZmZzZXQoKTtyZXR1cm4gYS50b3AtPXBhcnNlRmxvYXQodC5zdHlsZS5tYXJnaW5Ub3ApfHwwLGEubGVmdC09cGFyc2VGbG9hdCh0LnN0eWxlLm1hcmdpbkxlZnQpfHwwLGUuc3R5bGUmJihuLnRvcCs9cGFyc2VGbG9hdChlLnN0eWxlLmJvcmRlclRvcFdpZHRoKXx8MCxuLmxlZnQrPXBhcnNlRmxvYXQoZS5zdHlsZS5ib3JkZXJMZWZ0V2lkdGgpfHwwKSx7dG9wOmEudG9wLW4udG9wLGxlZnQ6YS5sZWZ0LW4ubGVmdH19fTt2YXIgYT17fTtyLmV4cGFuZG89XCJ2ZWxvY2l0eVwiKyhuZXcgRGF0ZSkuZ2V0VGltZSgpLHIudXVpZD0wO2Zvcih2YXIgbj17fSxvPW4uaGFzT3duUHJvcGVydHksaT1uLnRvU3RyaW5nLHM9XCJCb29sZWFuIE51bWJlciBTdHJpbmcgRnVuY3Rpb24gQXJyYXkgRGF0ZSBSZWdFeHAgT2JqZWN0IEVycm9yXCIuc3BsaXQoXCIgXCIpLGw9MDtsPHMubGVuZ3RoO2wrKyluW1wiW29iamVjdCBcIitzW2xdK1wiXVwiXT1zW2xdLnRvTG93ZXJDYXNlKCk7ci5mbi5pbml0LnByb3RvdHlwZT1yLmZuLGUuVmVsb2NpdHk9e1V0aWxpdGllczpyfX19KHdpbmRvdyksZnVuY3Rpb24oZSl7XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWUoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGUpOmUoKX0oZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSx0LHIsYSl7ZnVuY3Rpb24gbihlKXtmb3IodmFyIHQ9LTEscj1lP2UubGVuZ3RoOjAsYT1bXTsrK3Q8cjspe3ZhciBuPWVbdF07biYmYS5wdXNoKG4pfXJldHVybiBhfWZ1bmN0aW9uIG8oZSl7cmV0dXJuIG0uaXNXcmFwcGVkKGUpP2U9W10uc2xpY2UuY2FsbChlKTptLmlzTm9kZShlKSYmKGU9W2VdKSxlfWZ1bmN0aW9uIGkoZSl7dmFyIHQ9Zi5kYXRhKGUsXCJ2ZWxvY2l0eVwiKTtyZXR1cm4gbnVsbD09PXQ/YTp0fWZ1bmN0aW9uIHMoZSl7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiBNYXRoLnJvdW5kKHQqZSkqKDEvZSl9fWZ1bmN0aW9uIGwoZSxyLGEsbil7ZnVuY3Rpb24gbyhlLHQpe3JldHVybiAxLTMqdCszKmV9ZnVuY3Rpb24gaShlLHQpe3JldHVybiAzKnQtNiplfWZ1bmN0aW9uIHMoZSl7cmV0dXJuIDMqZX1mdW5jdGlvbiBsKGUsdCxyKXtyZXR1cm4oKG8odCxyKSplK2kodCxyKSkqZStzKHQpKSplfWZ1bmN0aW9uIHUoZSx0LHIpe3JldHVybiAzKm8odCxyKSplKmUrMippKHQscikqZStzKHQpfWZ1bmN0aW9uIGModCxyKXtmb3IodmFyIG49MDttPm47KytuKXt2YXIgbz11KHIsZSxhKTtpZigwPT09bylyZXR1cm4gcjt2YXIgaT1sKHIsZSxhKS10O3ItPWkvb31yZXR1cm4gcn1mdW5jdGlvbiBwKCl7Zm9yKHZhciB0PTA7Yj50OysrdCl3W3RdPWwodCp4LGUsYSl9ZnVuY3Rpb24gZih0LHIsbil7dmFyIG8saSxzPTA7ZG8gaT1yKyhuLXIpLzIsbz1sKGksZSxhKS10LG8+MD9uPWk6cj1pO3doaWxlKE1hdGguYWJzKG8pPmgmJisrczx2KTtyZXR1cm4gaX1mdW5jdGlvbiBkKHQpe2Zvcih2YXIgcj0wLG49MSxvPWItMTtuIT1vJiZ3W25dPD10OysrbilyKz14Oy0tbjt2YXIgaT0odC13W25dKS8od1tuKzFdLXdbbl0pLHM9citpKngsbD11KHMsZSxhKTtyZXR1cm4gbD49eT9jKHQscyk6MD09bD9zOmYodCxyLHIreCl9ZnVuY3Rpb24gZygpe1Y9ITAsKGUhPXJ8fGEhPW4pJiZwKCl9dmFyIG09NCx5PS4wMDEsaD0xZS03LHY9MTAsYj0xMSx4PTEvKGItMSksUz1cIkZsb2F0MzJBcnJheVwiaW4gdDtpZig0IT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4hMTtmb3IodmFyIFA9MDs0PlA7KytQKWlmKFwibnVtYmVyXCIhPXR5cGVvZiBhcmd1bWVudHNbUF18fGlzTmFOKGFyZ3VtZW50c1tQXSl8fCFpc0Zpbml0ZShhcmd1bWVudHNbUF0pKXJldHVybiExO2U9TWF0aC5taW4oZSwxKSxhPU1hdGgubWluKGEsMSksZT1NYXRoLm1heChlLDApLGE9TWF0aC5tYXgoYSwwKTt2YXIgdz1TP25ldyBGbG9hdDMyQXJyYXkoYik6bmV3IEFycmF5KGIpLFY9ITEsQz1mdW5jdGlvbih0KXtyZXR1cm4gVnx8ZygpLGU9PT1yJiZhPT09bj90OjA9PT10PzA6MT09PXQ/MTpsKGQodCkscixuKX07Qy5nZXRDb250cm9sUG9pbnRzPWZ1bmN0aW9uKCl7cmV0dXJuW3t4OmUseTpyfSx7eDphLHk6bn1dfTt2YXIgVD1cImdlbmVyYXRlQmV6aWVyKFwiK1tlLHIsYSxuXStcIilcIjtyZXR1cm4gQy50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiBUfSxDfWZ1bmN0aW9uIHUoZSx0KXt2YXIgcj1lO3JldHVybiBtLmlzU3RyaW5nKGUpP2IuRWFzaW5nc1tlXXx8KHI9ITEpOnI9bS5pc0FycmF5KGUpJiYxPT09ZS5sZW5ndGg/cy5hcHBseShudWxsLGUpOm0uaXNBcnJheShlKSYmMj09PWUubGVuZ3RoP3guYXBwbHkobnVsbCxlLmNvbmNhdChbdF0pKTptLmlzQXJyYXkoZSkmJjQ9PT1lLmxlbmd0aD9sLmFwcGx5KG51bGwsZSk6ITEscj09PSExJiYocj1iLkVhc2luZ3NbYi5kZWZhdWx0cy5lYXNpbmddP2IuZGVmYXVsdHMuZWFzaW5nOnYpLHJ9ZnVuY3Rpb24gYyhlKXtpZihlKXt2YXIgdD0obmV3IERhdGUpLmdldFRpbWUoKSxyPWIuU3RhdGUuY2FsbHMubGVuZ3RoO3I+MWU0JiYoYi5TdGF0ZS5jYWxscz1uKGIuU3RhdGUuY2FsbHMpKTtmb3IodmFyIG89MDtyPm87bysrKWlmKGIuU3RhdGUuY2FsbHNbb10pe3ZhciBzPWIuU3RhdGUuY2FsbHNbb10sbD1zWzBdLHU9c1syXSxkPXNbM10sZz0hIWQseT1udWxsO2R8fChkPWIuU3RhdGUuY2FsbHNbb11bM109dC0xNik7Zm9yKHZhciBoPU1hdGgubWluKCh0LWQpL3UuZHVyYXRpb24sMSksdj0wLHg9bC5sZW5ndGg7eD52O3YrKyl7dmFyIFA9bFt2XSxWPVAuZWxlbWVudDtpZihpKFYpKXt2YXIgQz0hMTtpZih1LmRpc3BsYXkhPT1hJiZudWxsIT09dS5kaXNwbGF5JiZcIm5vbmVcIiE9PXUuZGlzcGxheSl7aWYoXCJmbGV4XCI9PT11LmRpc3BsYXkpe3ZhciBUPVtcIi13ZWJraXQtYm94XCIsXCItbW96LWJveFwiLFwiLW1zLWZsZXhib3hcIixcIi13ZWJraXQtZmxleFwiXTtmLmVhY2goVCxmdW5jdGlvbihlLHQpe1Muc2V0UHJvcGVydHlWYWx1ZShWLFwiZGlzcGxheVwiLHQpfSl9Uy5zZXRQcm9wZXJ0eVZhbHVlKFYsXCJkaXNwbGF5XCIsdS5kaXNwbGF5KX11LnZpc2liaWxpdHkhPT1hJiZcImhpZGRlblwiIT09dS52aXNpYmlsaXR5JiZTLnNldFByb3BlcnR5VmFsdWUoVixcInZpc2liaWxpdHlcIix1LnZpc2liaWxpdHkpO2Zvcih2YXIgayBpbiBQKWlmKFwiZWxlbWVudFwiIT09ayl7dmFyIEEsRj1QW2tdLGo9bS5pc1N0cmluZyhGLmVhc2luZyk/Yi5FYXNpbmdzW0YuZWFzaW5nXTpGLmVhc2luZztpZigxPT09aClBPUYuZW5kVmFsdWU7ZWxzZXt2YXIgRT1GLmVuZFZhbHVlLUYuc3RhcnRWYWx1ZTtpZihBPUYuc3RhcnRWYWx1ZStFKmooaCx1LEUpLCFnJiZBPT09Ri5jdXJyZW50VmFsdWUpY29udGludWV9aWYoRi5jdXJyZW50VmFsdWU9QSxcInR3ZWVuXCI9PT1rKXk9QTtlbHNle2lmKFMuSG9va3MucmVnaXN0ZXJlZFtrXSl7dmFyIEg9Uy5Ib29rcy5nZXRSb290KGspLE49aShWKS5yb290UHJvcGVydHlWYWx1ZUNhY2hlW0hdO04mJihGLnJvb3RQcm9wZXJ0eVZhbHVlPU4pfXZhciBMPVMuc2V0UHJvcGVydHlWYWx1ZShWLGssRi5jdXJyZW50VmFsdWUrKDA9PT1wYXJzZUZsb2F0KEEpP1wiXCI6Ri51bml0VHlwZSksRi5yb290UHJvcGVydHlWYWx1ZSxGLnNjcm9sbERhdGEpO1MuSG9va3MucmVnaXN0ZXJlZFtrXSYmKGkoVikucm9vdFByb3BlcnR5VmFsdWVDYWNoZVtIXT1TLk5vcm1hbGl6YXRpb25zLnJlZ2lzdGVyZWRbSF0/Uy5Ob3JtYWxpemF0aW9ucy5yZWdpc3RlcmVkW0hdKFwiZXh0cmFjdFwiLG51bGwsTFsxXSk6TFsxXSksXCJ0cmFuc2Zvcm1cIj09PUxbMF0mJihDPSEwKX19dS5tb2JpbGVIQSYmaShWKS50cmFuc2Zvcm1DYWNoZS50cmFuc2xhdGUzZD09PWEmJihpKFYpLnRyYW5zZm9ybUNhY2hlLnRyYW5zbGF0ZTNkPVwiKDBweCwgMHB4LCAwcHgpXCIsQz0hMCksQyYmUy5mbHVzaFRyYW5zZm9ybUNhY2hlKFYpfX11LmRpc3BsYXkhPT1hJiZcIm5vbmVcIiE9PXUuZGlzcGxheSYmKGIuU3RhdGUuY2FsbHNbb11bMl0uZGlzcGxheT0hMSksdS52aXNpYmlsaXR5IT09YSYmXCJoaWRkZW5cIiE9PXUudmlzaWJpbGl0eSYmKGIuU3RhdGUuY2FsbHNbb11bMl0udmlzaWJpbGl0eT0hMSksdS5wcm9ncmVzcyYmdS5wcm9ncmVzcy5jYWxsKHNbMV0sc1sxXSxoLE1hdGgubWF4KDAsZCt1LmR1cmF0aW9uLXQpLGQseSksMT09PWgmJnAobyl9fWIuU3RhdGUuaXNUaWNraW5nJiZ3KGMpfWZ1bmN0aW9uIHAoZSx0KXtpZighYi5TdGF0ZS5jYWxsc1tlXSlyZXR1cm4hMTtmb3IodmFyIHI9Yi5TdGF0ZS5jYWxsc1tlXVswXSxuPWIuU3RhdGUuY2FsbHNbZV1bMV0sbz1iLlN0YXRlLmNhbGxzW2VdWzJdLHM9Yi5TdGF0ZS5jYWxsc1tlXVs0XSxsPSExLHU9MCxjPXIubGVuZ3RoO2M+dTt1Kyspe3ZhciBwPXJbdV0uZWxlbWVudDtpZih0fHxvLmxvb3B8fChcIm5vbmVcIj09PW8uZGlzcGxheSYmUy5zZXRQcm9wZXJ0eVZhbHVlKHAsXCJkaXNwbGF5XCIsby5kaXNwbGF5KSxcImhpZGRlblwiPT09by52aXNpYmlsaXR5JiZTLnNldFByb3BlcnR5VmFsdWUocCxcInZpc2liaWxpdHlcIixvLnZpc2liaWxpdHkpKSxvLmxvb3AhPT0hMCYmKGYucXVldWUocClbMV09PT1hfHwhL1xcLnZlbG9jaXR5UXVldWVFbnRyeUZsYWcvaS50ZXN0KGYucXVldWUocClbMV0pKSYmaShwKSl7aShwKS5pc0FuaW1hdGluZz0hMSxpKHApLnJvb3RQcm9wZXJ0eVZhbHVlQ2FjaGU9e307dmFyIGQ9ITE7Zi5lYWNoKFMuTGlzdHMudHJhbnNmb3JtczNELGZ1bmN0aW9uKGUsdCl7dmFyIHI9L15zY2FsZS8udGVzdCh0KT8xOjAsbj1pKHApLnRyYW5zZm9ybUNhY2hlW3RdO2kocCkudHJhbnNmb3JtQ2FjaGVbdF0hPT1hJiZuZXcgUmVnRXhwKFwiXlxcXFwoXCIrcitcIlteLl1cIikudGVzdChuKSYmKGQ9ITAsZGVsZXRlIGkocCkudHJhbnNmb3JtQ2FjaGVbdF0pfSksby5tb2JpbGVIQSYmKGQ9ITAsZGVsZXRlIGkocCkudHJhbnNmb3JtQ2FjaGUudHJhbnNsYXRlM2QpLGQmJlMuZmx1c2hUcmFuc2Zvcm1DYWNoZShwKSxTLlZhbHVlcy5yZW1vdmVDbGFzcyhwLFwidmVsb2NpdHktYW5pbWF0aW5nXCIpfWlmKCF0JiZvLmNvbXBsZXRlJiYhby5sb29wJiZ1PT09Yy0xKXRyeXtvLmNvbXBsZXRlLmNhbGwobixuKX1jYXRjaChnKXtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dGhyb3cgZ30sMSl9cyYmby5sb29wIT09ITAmJnMobiksaShwKSYmby5sb29wPT09ITAmJiF0JiYoZi5lYWNoKGkocCkudHdlZW5zQ29udGFpbmVyLGZ1bmN0aW9uKGUsdCl7L15yb3RhdGUvLnRlc3QoZSkmJjM2MD09PXBhcnNlRmxvYXQodC5lbmRWYWx1ZSkmJih0LmVuZFZhbHVlPTAsdC5zdGFydFZhbHVlPTM2MCksL15iYWNrZ3JvdW5kUG9zaXRpb24vLnRlc3QoZSkmJjEwMD09PXBhcnNlRmxvYXQodC5lbmRWYWx1ZSkmJlwiJVwiPT09dC51bml0VHlwZSYmKHQuZW5kVmFsdWU9MCx0LnN0YXJ0VmFsdWU9MTAwKX0pLGIocCxcInJldmVyc2VcIix7bG9vcDohMCxkZWxheTpvLmRlbGF5fSkpLG8ucXVldWUhPT0hMSYmZi5kZXF1ZXVlKHAsby5xdWV1ZSl9Yi5TdGF0ZS5jYWxsc1tlXT0hMTtmb3IodmFyIG09MCx5PWIuU3RhdGUuY2FsbHMubGVuZ3RoO3k+bTttKyspaWYoYi5TdGF0ZS5jYWxsc1ttXSE9PSExKXtsPSEwO2JyZWFrfWw9PT0hMSYmKGIuU3RhdGUuaXNUaWNraW5nPSExLGRlbGV0ZSBiLlN0YXRlLmNhbGxzLGIuU3RhdGUuY2FsbHM9W10pfXZhciBmLGQ9ZnVuY3Rpb24oKXtpZihyLmRvY3VtZW50TW9kZSlyZXR1cm4gci5kb2N1bWVudE1vZGU7Zm9yKHZhciBlPTc7ZT40O2UtLSl7dmFyIHQ9ci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2lmKHQuaW5uZXJIVE1MPVwiPCEtLVtpZiBJRSBcIitlK1wiXT48c3Bhbj48L3NwYW4+PCFbZW5kaWZdLS0+XCIsdC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNwYW5cIikubGVuZ3RoKXJldHVybiB0PW51bGwsZX1yZXR1cm4gYX0oKSxnPWZ1bmN0aW9uKCl7dmFyIGU9MDtyZXR1cm4gdC53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHQubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lfHxmdW5jdGlvbih0KXt2YXIgcixhPShuZXcgRGF0ZSkuZ2V0VGltZSgpO3JldHVybiByPU1hdGgubWF4KDAsMTYtKGEtZSkpLGU9YStyLHNldFRpbWVvdXQoZnVuY3Rpb24oKXt0KGErcil9LHIpfX0oKSxtPXtpc1N0cmluZzpmdW5jdGlvbihlKXtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgZX0saXNBcnJheTpBcnJheS5pc0FycmF5fHxmdW5jdGlvbihlKXtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSl9LGlzRnVuY3Rpb246ZnVuY3Rpb24oZSl7cmV0dXJuXCJbb2JqZWN0IEZ1bmN0aW9uXVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpfSxpc05vZGU6ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJmUubm9kZVR5cGV9LGlzTm9kZUxpc3Q6ZnVuY3Rpb24oZSl7cmV0dXJuXCJvYmplY3RcIj09dHlwZW9mIGUmJi9eXFxbb2JqZWN0IChIVE1MQ29sbGVjdGlvbnxOb2RlTGlzdHxPYmplY3QpXFxdJC8udGVzdChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkpJiZlLmxlbmd0aCE9PWEmJigwPT09ZS5sZW5ndGh8fFwib2JqZWN0XCI9PXR5cGVvZiBlWzBdJiZlWzBdLm5vZGVUeXBlPjApfSxpc1dyYXBwZWQ6ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJihlLmpxdWVyeXx8dC5aZXB0byYmdC5aZXB0by56ZXB0by5pc1ooZSkpfSxpc1NWRzpmdW5jdGlvbihlKXtyZXR1cm4gdC5TVkdFbGVtZW50JiZlIGluc3RhbmNlb2YgdC5TVkdFbGVtZW50fSxpc0VtcHR5T2JqZWN0OmZ1bmN0aW9uKGUpe2Zvcih2YXIgdCBpbiBlKXJldHVybiExO3JldHVybiEwfX0seT0hMTtpZihlLmZuJiZlLmZuLmpxdWVyeT8oZj1lLHk9ITApOmY9dC5WZWxvY2l0eS5VdGlsaXRpZXMsOD49ZCYmIXkpdGhyb3cgbmV3IEVycm9yKFwiVmVsb2NpdHk6IElFOCBhbmQgYmVsb3cgcmVxdWlyZSBqUXVlcnkgdG8gYmUgbG9hZGVkIGJlZm9yZSBWZWxvY2l0eS5cIik7aWYoNz49ZClyZXR1cm4gdm9pZChqUXVlcnkuZm4udmVsb2NpdHk9alF1ZXJ5LmZuLmFuaW1hdGUpO3ZhciBoPTQwMCx2PVwic3dpbmdcIixiPXtTdGF0ZTp7aXNNb2JpbGU6L0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLGlzQW5kcm9pZDovQW5kcm9pZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCksaXNHaW5nZXJicmVhZDovQW5kcm9pZCAyXFwuM1xcLlszLTddL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSxpc0Nocm9tZTp0LmNocm9tZSxpc0ZpcmVmb3g6L0ZpcmVmb3gvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLHByZWZpeEVsZW1lbnQ6ci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLHByZWZpeE1hdGNoZXM6e30sc2Nyb2xsQW5jaG9yOm51bGwsc2Nyb2xsUHJvcGVydHlMZWZ0Om51bGwsc2Nyb2xsUHJvcGVydHlUb3A6bnVsbCxpc1RpY2tpbmc6ITEsY2FsbHM6W119LENTUzp7fSxVdGlsaXRpZXM6ZixSZWRpcmVjdHM6e30sRWFzaW5nczp7fSxQcm9taXNlOnQuUHJvbWlzZSxkZWZhdWx0czp7cXVldWU6XCJcIixkdXJhdGlvbjpoLGVhc2luZzp2LGJlZ2luOmEsY29tcGxldGU6YSxwcm9ncmVzczphLGRpc3BsYXk6YSx2aXNpYmlsaXR5OmEsbG9vcDohMSxkZWxheTohMSxtb2JpbGVIQTohMCxfY2FjaGVWYWx1ZXM6ITB9LGluaXQ6ZnVuY3Rpb24oZSl7Zi5kYXRhKGUsXCJ2ZWxvY2l0eVwiLHtpc1NWRzptLmlzU1ZHKGUpLGlzQW5pbWF0aW5nOiExLGNvbXB1dGVkU3R5bGU6bnVsbCx0d2VlbnNDb250YWluZXI6bnVsbCxyb290UHJvcGVydHlWYWx1ZUNhY2hlOnt9LHRyYW5zZm9ybUNhY2hlOnt9fSl9LGhvb2s6bnVsbCxtb2NrOiExLHZlcnNpb246e21ham9yOjEsbWlub3I6MixwYXRjaDoyfSxkZWJ1ZzohMX07dC5wYWdlWU9mZnNldCE9PWE/KGIuU3RhdGUuc2Nyb2xsQW5jaG9yPXQsYi5TdGF0ZS5zY3JvbGxQcm9wZXJ0eUxlZnQ9XCJwYWdlWE9mZnNldFwiLGIuU3RhdGUuc2Nyb2xsUHJvcGVydHlUb3A9XCJwYWdlWU9mZnNldFwiKTooYi5TdGF0ZS5zY3JvbGxBbmNob3I9ci5kb2N1bWVudEVsZW1lbnR8fHIuYm9keS5wYXJlbnROb2RlfHxyLmJvZHksYi5TdGF0ZS5zY3JvbGxQcm9wZXJ0eUxlZnQ9XCJzY3JvbGxMZWZ0XCIsYi5TdGF0ZS5zY3JvbGxQcm9wZXJ0eVRvcD1cInNjcm9sbFRvcFwiKTt2YXIgeD1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSl7cmV0dXJuLWUudGVuc2lvbiplLngtZS5mcmljdGlvbiplLnZ9ZnVuY3Rpb24gdCh0LHIsYSl7dmFyIG49e3g6dC54K2EuZHgqcix2OnQudithLmR2KnIsdGVuc2lvbjp0LnRlbnNpb24sZnJpY3Rpb246dC5mcmljdGlvbn07cmV0dXJue2R4Om4udixkdjplKG4pfX1mdW5jdGlvbiByKHIsYSl7dmFyIG49e2R4OnIudixkdjplKHIpfSxvPXQociwuNSphLG4pLGk9dChyLC41KmEsbykscz10KHIsYSxpKSxsPTEvNioobi5keCsyKihvLmR4K2kuZHgpK3MuZHgpLHU9MS82KihuLmR2KzIqKG8uZHYraS5kdikrcy5kdik7cmV0dXJuIHIueD1yLngrbCphLHIudj1yLnYrdSphLHJ9cmV0dXJuIGZ1bmN0aW9uIGEoZSx0LG4pe3ZhciBvLGkscyxsPXt4Oi0xLHY6MCx0ZW5zaW9uOm51bGwsZnJpY3Rpb246bnVsbH0sdT1bMF0sYz0wLHA9MWUtNCxmPS4wMTY7Zm9yKGU9cGFyc2VGbG9hdChlKXx8NTAwLHQ9cGFyc2VGbG9hdCh0KXx8MjAsbj1ufHxudWxsLGwudGVuc2lvbj1lLGwuZnJpY3Rpb249dCxvPW51bGwhPT1uLG8/KGM9YShlLHQpLGk9Yy9uKmYpOmk9ZjtzPXIoc3x8bCxpKSx1LnB1c2goMStzLngpLGMrPTE2LE1hdGguYWJzKHMueCk+cCYmTWF0aC5hYnMocy52KT5wOyk7cmV0dXJuIG8/ZnVuY3Rpb24oZSl7cmV0dXJuIHVbZSoodS5sZW5ndGgtMSl8MF19OmN9fSgpO2IuRWFzaW5ncz17bGluZWFyOmZ1bmN0aW9uKGUpe3JldHVybiBlfSxzd2luZzpmdW5jdGlvbihlKXtyZXR1cm4uNS1NYXRoLmNvcyhlKk1hdGguUEkpLzJ9LHNwcmluZzpmdW5jdGlvbihlKXtyZXR1cm4gMS1NYXRoLmNvcyg0LjUqZSpNYXRoLlBJKSpNYXRoLmV4cCg2Ki1lKX19LGYuZWFjaChbW1wiZWFzZVwiLFsuMjUsLjEsLjI1LDFdXSxbXCJlYXNlLWluXCIsWy40MiwwLDEsMV1dLFtcImVhc2Utb3V0XCIsWzAsMCwuNTgsMV1dLFtcImVhc2UtaW4tb3V0XCIsWy40MiwwLC41OCwxXV0sW1wiZWFzZUluU2luZVwiLFsuNDcsMCwuNzQ1LC43MTVdXSxbXCJlYXNlT3V0U2luZVwiLFsuMzksLjU3NSwuNTY1LDFdXSxbXCJlYXNlSW5PdXRTaW5lXCIsWy40NDUsLjA1LC41NSwuOTVdXSxbXCJlYXNlSW5RdWFkXCIsWy41NSwuMDg1LC42OCwuNTNdXSxbXCJlYXNlT3V0UXVhZFwiLFsuMjUsLjQ2LC40NSwuOTRdXSxbXCJlYXNlSW5PdXRRdWFkXCIsWy40NTUsLjAzLC41MTUsLjk1NV1dLFtcImVhc2VJbkN1YmljXCIsWy41NSwuMDU1LC42NzUsLjE5XV0sW1wiZWFzZU91dEN1YmljXCIsWy4yMTUsLjYxLC4zNTUsMV1dLFtcImVhc2VJbk91dEN1YmljXCIsWy42NDUsLjA0NSwuMzU1LDFdXSxbXCJlYXNlSW5RdWFydFwiLFsuODk1LC4wMywuNjg1LC4yMl1dLFtcImVhc2VPdXRRdWFydFwiLFsuMTY1LC44NCwuNDQsMV1dLFtcImVhc2VJbk91dFF1YXJ0XCIsWy43NywwLC4xNzUsMV1dLFtcImVhc2VJblF1aW50XCIsWy43NTUsLjA1LC44NTUsLjA2XV0sW1wiZWFzZU91dFF1aW50XCIsWy4yMywxLC4zMiwxXV0sW1wiZWFzZUluT3V0UXVpbnRcIixbLjg2LDAsLjA3LDFdXSxbXCJlYXNlSW5FeHBvXCIsWy45NSwuMDUsLjc5NSwuMDM1XV0sW1wiZWFzZU91dEV4cG9cIixbLjE5LDEsLjIyLDFdXSxbXCJlYXNlSW5PdXRFeHBvXCIsWzEsMCwwLDFdXSxbXCJlYXNlSW5DaXJjXCIsWy42LC4wNCwuOTgsLjMzNV1dLFtcImVhc2VPdXRDaXJjXCIsWy4wNzUsLjgyLC4xNjUsMV1dLFtcImVhc2VJbk91dENpcmNcIixbLjc4NSwuMTM1LC4xNSwuODZdXV0sZnVuY3Rpb24oZSx0KXtiLkVhc2luZ3NbdFswXV09bC5hcHBseShudWxsLHRbMV0pfSk7dmFyIFM9Yi5DU1M9e1JlZ0V4Ontpc0hleDovXiMoW0EtZlxcZF17M30pezEsMn0kL2ksdmFsdWVVbndyYXA6L15bQS16XStcXCgoLiopXFwpJC9pLHdyYXBwZWRWYWx1ZUFscmVhZHlFeHRyYWN0ZWQ6L1swLTkuXSsgWzAtOS5dKyBbMC05Ll0rKCBbMC05Ll0rKT8vLHZhbHVlU3BsaXQ6LyhbQS16XStcXCguK1xcKSl8KChbQS16MC05Iy0uXSs/KSg/PVxcc3wkKSkvZ2l9LExpc3RzOntjb2xvcnM6W1wiZmlsbFwiLFwic3Ryb2tlXCIsXCJzdG9wQ29sb3JcIixcImNvbG9yXCIsXCJiYWNrZ3JvdW5kQ29sb3JcIixcImJvcmRlckNvbG9yXCIsXCJib3JkZXJUb3BDb2xvclwiLFwiYm9yZGVyUmlnaHRDb2xvclwiLFwiYm9yZGVyQm90dG9tQ29sb3JcIixcImJvcmRlckxlZnRDb2xvclwiLFwib3V0bGluZUNvbG9yXCJdLHRyYW5zZm9ybXNCYXNlOltcInRyYW5zbGF0ZVhcIixcInRyYW5zbGF0ZVlcIixcInNjYWxlXCIsXCJzY2FsZVhcIixcInNjYWxlWVwiLFwic2tld1hcIixcInNrZXdZXCIsXCJyb3RhdGVaXCJdLHRyYW5zZm9ybXMzRDpbXCJ0cmFuc2Zvcm1QZXJzcGVjdGl2ZVwiLFwidHJhbnNsYXRlWlwiLFwic2NhbGVaXCIsXCJyb3RhdGVYXCIsXCJyb3RhdGVZXCJdfSxIb29rczp7dGVtcGxhdGVzOnt0ZXh0U2hhZG93OltcIkNvbG9yIFggWSBCbHVyXCIsXCJibGFjayAwcHggMHB4IDBweFwiXSxib3hTaGFkb3c6W1wiQ29sb3IgWCBZIEJsdXIgU3ByZWFkXCIsXCJibGFjayAwcHggMHB4IDBweCAwcHhcIl0sY2xpcDpbXCJUb3AgUmlnaHQgQm90dG9tIExlZnRcIixcIjBweCAwcHggMHB4IDBweFwiXSxiYWNrZ3JvdW5kUG9zaXRpb246W1wiWCBZXCIsXCIwJSAwJVwiXSx0cmFuc2Zvcm1PcmlnaW46W1wiWCBZIFpcIixcIjUwJSA1MCUgMHB4XCJdLHBlcnNwZWN0aXZlT3JpZ2luOltcIlggWVwiLFwiNTAlIDUwJVwiXX0scmVnaXN0ZXJlZDp7fSxyZWdpc3RlcjpmdW5jdGlvbigpe2Zvcih2YXIgZT0wO2U8Uy5MaXN0cy5jb2xvcnMubGVuZ3RoO2UrKyl7dmFyIHQ9XCJjb2xvclwiPT09Uy5MaXN0cy5jb2xvcnNbZV0/XCIwIDAgMCAxXCI6XCIyNTUgMjU1IDI1NSAxXCI7Uy5Ib29rcy50ZW1wbGF0ZXNbUy5MaXN0cy5jb2xvcnNbZV1dPVtcIlJlZCBHcmVlbiBCbHVlIEFscGhhXCIsdF19dmFyIHIsYSxuO2lmKGQpZm9yKHIgaW4gUy5Ib29rcy50ZW1wbGF0ZXMpe2E9Uy5Ib29rcy50ZW1wbGF0ZXNbcl0sbj1hWzBdLnNwbGl0KFwiIFwiKTt2YXIgbz1hWzFdLm1hdGNoKFMuUmVnRXgudmFsdWVTcGxpdCk7XCJDb2xvclwiPT09blswXSYmKG4ucHVzaChuLnNoaWZ0KCkpLG8ucHVzaChvLnNoaWZ0KCkpLFMuSG9va3MudGVtcGxhdGVzW3JdPVtuLmpvaW4oXCIgXCIpLG8uam9pbihcIiBcIildKX1mb3IociBpbiBTLkhvb2tzLnRlbXBsYXRlcyl7YT1TLkhvb2tzLnRlbXBsYXRlc1tyXSxuPWFbMF0uc3BsaXQoXCIgXCIpO2Zvcih2YXIgZSBpbiBuKXt2YXIgaT1yK25bZV0scz1lO1MuSG9va3MucmVnaXN0ZXJlZFtpXT1bcixzXX19fSxnZXRSb290OmZ1bmN0aW9uKGUpe3ZhciB0PVMuSG9va3MucmVnaXN0ZXJlZFtlXTtyZXR1cm4gdD90WzBdOmV9LGNsZWFuUm9vdFByb3BlcnR5VmFsdWU6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gUy5SZWdFeC52YWx1ZVVud3JhcC50ZXN0KHQpJiYodD10Lm1hdGNoKFMuUmVnRXgudmFsdWVVbndyYXApWzFdKSxTLlZhbHVlcy5pc0NTU051bGxWYWx1ZSh0KSYmKHQ9Uy5Ib29rcy50ZW1wbGF0ZXNbZV1bMV0pLHR9LGV4dHJhY3RWYWx1ZTpmdW5jdGlvbihlLHQpe3ZhciByPVMuSG9va3MucmVnaXN0ZXJlZFtlXTtpZihyKXt2YXIgYT1yWzBdLG49clsxXTtyZXR1cm4gdD1TLkhvb2tzLmNsZWFuUm9vdFByb3BlcnR5VmFsdWUoYSx0KSx0LnRvU3RyaW5nKCkubWF0Y2goUy5SZWdFeC52YWx1ZVNwbGl0KVtuXX1yZXR1cm4gdH0saW5qZWN0VmFsdWU6ZnVuY3Rpb24oZSx0LHIpe3ZhciBhPVMuSG9va3MucmVnaXN0ZXJlZFtlXTtpZihhKXt2YXIgbixvLGk9YVswXSxzPWFbMV07cmV0dXJuIHI9Uy5Ib29rcy5jbGVhblJvb3RQcm9wZXJ0eVZhbHVlKGksciksbj1yLnRvU3RyaW5nKCkubWF0Y2goUy5SZWdFeC52YWx1ZVNwbGl0KSxuW3NdPXQsbz1uLmpvaW4oXCIgXCIpfXJldHVybiByfX0sTm9ybWFsaXphdGlvbnM6e3JlZ2lzdGVyZWQ6e2NsaXA6ZnVuY3Rpb24oZSx0LHIpe3N3aXRjaChlKXtjYXNlXCJuYW1lXCI6cmV0dXJuXCJjbGlwXCI7Y2FzZVwiZXh0cmFjdFwiOnZhciBhO3JldHVybiBTLlJlZ0V4LndyYXBwZWRWYWx1ZUFscmVhZHlFeHRyYWN0ZWQudGVzdChyKT9hPXI6KGE9ci50b1N0cmluZygpLm1hdGNoKFMuUmVnRXgudmFsdWVVbndyYXApLGE9YT9hWzFdLnJlcGxhY2UoLywoXFxzKyk/L2csXCIgXCIpOnIpLGE7Y2FzZVwiaW5qZWN0XCI6cmV0dXJuXCJyZWN0KFwiK3IrXCIpXCJ9fSxibHVyOmZ1bmN0aW9uKGUsdCxyKXtzd2l0Y2goZSl7Y2FzZVwibmFtZVwiOnJldHVybiBiLlN0YXRlLmlzRmlyZWZveD9cImZpbHRlclwiOlwiLXdlYmtpdC1maWx0ZXJcIjtjYXNlXCJleHRyYWN0XCI6dmFyIGE9cGFyc2VGbG9hdChyKTtpZighYSYmMCE9PWEpe3ZhciBuPXIudG9TdHJpbmcoKS5tYXRjaCgvYmx1clxcKChbMC05XStbQS16XSspXFwpL2kpO2E9bj9uWzFdOjB9cmV0dXJuIGE7Y2FzZVwiaW5qZWN0XCI6cmV0dXJuIHBhcnNlRmxvYXQocik/XCJibHVyKFwiK3IrXCIpXCI6XCJub25lXCJ9fSxvcGFjaXR5OmZ1bmN0aW9uKGUsdCxyKXtpZig4Pj1kKXN3aXRjaChlKXtjYXNlXCJuYW1lXCI6cmV0dXJuXCJmaWx0ZXJcIjtjYXNlXCJleHRyYWN0XCI6dmFyIGE9ci50b1N0cmluZygpLm1hdGNoKC9hbHBoYVxcKG9wYWNpdHk9KC4qKVxcKS9pKTtyZXR1cm4gcj1hP2FbMV0vMTAwOjE7Y2FzZVwiaW5qZWN0XCI6cmV0dXJuIHQuc3R5bGUuem9vbT0xLHBhcnNlRmxvYXQocik+PTE/XCJcIjpcImFscGhhKG9wYWNpdHk9XCIrcGFyc2VJbnQoMTAwKnBhcnNlRmxvYXQociksMTApK1wiKVwifWVsc2Ugc3dpdGNoKGUpe2Nhc2VcIm5hbWVcIjpyZXR1cm5cIm9wYWNpdHlcIjtjYXNlXCJleHRyYWN0XCI6cmV0dXJuIHI7Y2FzZVwiaW5qZWN0XCI6cmV0dXJuIHJ9fX0scmVnaXN0ZXI6ZnVuY3Rpb24oKXs5Pj1kfHxiLlN0YXRlLmlzR2luZ2VyYnJlYWR8fChTLkxpc3RzLnRyYW5zZm9ybXNCYXNlPVMuTGlzdHMudHJhbnNmb3Jtc0Jhc2UuY29uY2F0KFMuTGlzdHMudHJhbnNmb3JtczNEKSk7Zm9yKHZhciBlPTA7ZTxTLkxpc3RzLnRyYW5zZm9ybXNCYXNlLmxlbmd0aDtlKyspIWZ1bmN0aW9uKCl7dmFyIHQ9Uy5MaXN0cy50cmFuc2Zvcm1zQmFzZVtlXTtTLk5vcm1hbGl6YXRpb25zLnJlZ2lzdGVyZWRbdF09ZnVuY3Rpb24oZSxyLG4pe3N3aXRjaChlKXtjYXNlXCJuYW1lXCI6cmV0dXJuXCJ0cmFuc2Zvcm1cIjtjYXNlXCJleHRyYWN0XCI6cmV0dXJuIGkocik9PT1hfHxpKHIpLnRyYW5zZm9ybUNhY2hlW3RdPT09YT8vXnNjYWxlL2kudGVzdCh0KT8xOjA6aShyKS50cmFuc2Zvcm1DYWNoZVt0XS5yZXBsYWNlKC9bKCldL2csXCJcIik7Y2FzZVwiaW5qZWN0XCI6dmFyIG89ITE7c3dpdGNoKHQuc3Vic3RyKDAsdC5sZW5ndGgtMSkpe2Nhc2VcInRyYW5zbGF0ZVwiOm89IS8oJXxweHxlbXxyZW18dnd8dmh8XFxkKSQvaS50ZXN0KG4pO2JyZWFrO2Nhc2VcInNjYWxcIjpjYXNlXCJzY2FsZVwiOmIuU3RhdGUuaXNBbmRyb2lkJiZpKHIpLnRyYW5zZm9ybUNhY2hlW3RdPT09YSYmMT5uJiYobj0xKSxvPSEvKFxcZCkkL2kudGVzdChuKTticmVhaztjYXNlXCJza2V3XCI6bz0hLyhkZWd8XFxkKSQvaS50ZXN0KG4pO2JyZWFrO2Nhc2VcInJvdGF0ZVwiOm89IS8oZGVnfFxcZCkkL2kudGVzdChuKX1yZXR1cm4gb3x8KGkocikudHJhbnNmb3JtQ2FjaGVbdF09XCIoXCIrbitcIilcIiksaShyKS50cmFuc2Zvcm1DYWNoZVt0XX19fSgpO2Zvcih2YXIgZT0wO2U8Uy5MaXN0cy5jb2xvcnMubGVuZ3RoO2UrKykhZnVuY3Rpb24oKXt2YXIgdD1TLkxpc3RzLmNvbG9yc1tlXTtTLk5vcm1hbGl6YXRpb25zLnJlZ2lzdGVyZWRbdF09ZnVuY3Rpb24oZSxyLG4pe3N3aXRjaChlKXtjYXNlXCJuYW1lXCI6cmV0dXJuIHQ7Y2FzZVwiZXh0cmFjdFwiOnZhciBvO2lmKFMuUmVnRXgud3JhcHBlZFZhbHVlQWxyZWFkeUV4dHJhY3RlZC50ZXN0KG4pKW89bjtlbHNle3ZhciBpLHM9e2JsYWNrOlwicmdiKDAsIDAsIDApXCIsYmx1ZTpcInJnYigwLCAwLCAyNTUpXCIsZ3JheTpcInJnYigxMjgsIDEyOCwgMTI4KVwiLGdyZWVuOlwicmdiKDAsIDEyOCwgMClcIixyZWQ6XCJyZ2IoMjU1LCAwLCAwKVwiLHdoaXRlOlwicmdiKDI1NSwgMjU1LCAyNTUpXCJ9Oy9eW0Etel0rJC9pLnRlc3Qobik/aT1zW25dIT09YT9zW25dOnMuYmxhY2s6Uy5SZWdFeC5pc0hleC50ZXN0KG4pP2k9XCJyZ2IoXCIrUy5WYWx1ZXMuaGV4VG9SZ2Iobikuam9pbihcIiBcIikrXCIpXCI6L15yZ2JhP1xcKC9pLnRlc3Qobil8fChpPXMuYmxhY2spLG89KGl8fG4pLnRvU3RyaW5nKCkubWF0Y2goUy5SZWdFeC52YWx1ZVVud3JhcClbMV0ucmVwbGFjZSgvLChcXHMrKT8vZyxcIiBcIil9cmV0dXJuIDg+PWR8fDMhPT1vLnNwbGl0KFwiIFwiKS5sZW5ndGh8fChvKz1cIiAxXCIpLG87Y2FzZVwiaW5qZWN0XCI6cmV0dXJuIDg+PWQ/ND09PW4uc3BsaXQoXCIgXCIpLmxlbmd0aCYmKG49bi5zcGxpdCgvXFxzKy8pLnNsaWNlKDAsMykuam9pbihcIiBcIikpOjM9PT1uLnNwbGl0KFwiIFwiKS5sZW5ndGgmJihuKz1cIiAxXCIpLCg4Pj1kP1wicmdiXCI6XCJyZ2JhXCIpK1wiKFwiK24ucmVwbGFjZSgvXFxzKy9nLFwiLFwiKS5yZXBsYWNlKC9cXC4oXFxkKSsoPz0sKS9nLFwiXCIpK1wiKVwifX19KCl9fSxOYW1lczp7Y2FtZWxDYXNlOmZ1bmN0aW9uKGUpe3JldHVybiBlLnJlcGxhY2UoLy0oXFx3KS9nLGZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQudG9VcHBlckNhc2UoKX0pfSxTVkdBdHRyaWJ1dGU6ZnVuY3Rpb24oZSl7dmFyIHQ9XCJ3aWR0aHxoZWlnaHR8eHx5fGN4fGN5fHJ8cnh8cnl8eDF8eDJ8eTF8eTJcIjtyZXR1cm4oZHx8Yi5TdGF0ZS5pc0FuZHJvaWQmJiFiLlN0YXRlLmlzQ2hyb21lKSYmKHQrPVwifHRyYW5zZm9ybVwiKSxuZXcgUmVnRXhwKFwiXihcIit0K1wiKSRcIixcImlcIikudGVzdChlKX0scHJlZml4Q2hlY2s6ZnVuY3Rpb24oZSl7aWYoYi5TdGF0ZS5wcmVmaXhNYXRjaGVzW2VdKXJldHVybltiLlN0YXRlLnByZWZpeE1hdGNoZXNbZV0sITBdO2Zvcih2YXIgdD1bXCJcIixcIldlYmtpdFwiLFwiTW96XCIsXCJtc1wiLFwiT1wiXSxyPTAsYT10Lmxlbmd0aDthPnI7cisrKXt2YXIgbjtpZihuPTA9PT1yP2U6dFtyXStlLnJlcGxhY2UoL15cXHcvLGZ1bmN0aW9uKGUpe3JldHVybiBlLnRvVXBwZXJDYXNlKCl9KSxtLmlzU3RyaW5nKGIuU3RhdGUucHJlZml4RWxlbWVudC5zdHlsZVtuXSkpcmV0dXJuIGIuU3RhdGUucHJlZml4TWF0Y2hlc1tlXT1uLFtuLCEwXX1yZXR1cm5bZSwhMV19fSxWYWx1ZXM6e2hleFRvUmdiOmZ1bmN0aW9uKGUpe3ZhciB0LHI9L14jPyhbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKSQvaSxhPS9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2k7cmV0dXJuIGU9ZS5yZXBsYWNlKHIsZnVuY3Rpb24oZSx0LHIsYSl7cmV0dXJuIHQrdCtyK3IrYSthfSksdD1hLmV4ZWMoZSksdD9bcGFyc2VJbnQodFsxXSwxNikscGFyc2VJbnQodFsyXSwxNikscGFyc2VJbnQodFszXSwxNildOlswLDAsMF19LGlzQ1NTTnVsbFZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiAwPT1lfHwvXihub25lfGF1dG98dHJhbnNwYXJlbnR8KHJnYmFcXCgwLCA/MCwgPzAsID8wXFwpKSkkL2kudGVzdChlKX0sZ2V0VW5pdFR5cGU6ZnVuY3Rpb24oZSl7cmV0dXJuL14ocm90YXRlfHNrZXcpL2kudGVzdChlKT9cImRlZ1wiOi8oXihzY2FsZXxzY2FsZVh8c2NhbGVZfHNjYWxlWnxhbHBoYXxmbGV4R3Jvd3xmbGV4SGVpZ2h0fHpJbmRleHxmb250V2VpZ2h0KSQpfCgob3BhY2l0eXxyZWR8Z3JlZW58Ymx1ZXxhbHBoYSkkKS9pLnRlc3QoZSk/XCJcIjpcInB4XCJ9LGdldERpc3BsYXlUeXBlOmZ1bmN0aW9uKGUpe3ZhciB0PWUmJmUudGFnTmFtZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7cmV0dXJuL14oYnxiaWd8aXxzbWFsbHx0dHxhYmJyfGFjcm9ueW18Y2l0ZXxjb2RlfGRmbnxlbXxrYmR8c3Ryb25nfHNhbXB8dmFyfGF8YmRvfGJyfGltZ3xtYXB8b2JqZWN0fHF8c2NyaXB0fHNwYW58c3VifHN1cHxidXR0b258aW5wdXR8bGFiZWx8c2VsZWN0fHRleHRhcmVhKSQvaS50ZXN0KHQpP1wiaW5saW5lXCI6L14obGkpJC9pLnRlc3QodCk/XCJsaXN0LWl0ZW1cIjovXih0cikkL2kudGVzdCh0KT9cInRhYmxlLXJvd1wiOi9eKHRhYmxlKSQvaS50ZXN0KHQpP1widGFibGVcIjovXih0Ym9keSkkL2kudGVzdCh0KT9cInRhYmxlLXJvdy1ncm91cFwiOlwiYmxvY2tcIn0sYWRkQ2xhc3M6ZnVuY3Rpb24oZSx0KXtlLmNsYXNzTGlzdD9lLmNsYXNzTGlzdC5hZGQodCk6ZS5jbGFzc05hbWUrPShlLmNsYXNzTmFtZS5sZW5ndGg/XCIgXCI6XCJcIikrdH0scmVtb3ZlQ2xhc3M6ZnVuY3Rpb24oZSx0KXtlLmNsYXNzTGlzdD9lLmNsYXNzTGlzdC5yZW1vdmUodCk6ZS5jbGFzc05hbWU9ZS5jbGFzc05hbWUudG9TdHJpbmcoKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoXnxcXFxccylcIit0LnNwbGl0KFwiIFwiKS5qb2luKFwifFwiKStcIihcXFxcc3wkKVwiLFwiZ2lcIiksXCIgXCIpfX0sZ2V0UHJvcGVydHlWYWx1ZTpmdW5jdGlvbihlLHIsbixvKXtmdW5jdGlvbiBzKGUscil7ZnVuY3Rpb24gbigpe3UmJlMuc2V0UHJvcGVydHlWYWx1ZShlLFwiZGlzcGxheVwiLFwibm9uZVwiKX12YXIgbD0wO2lmKDg+PWQpbD1mLmNzcyhlLHIpO2Vsc2V7dmFyIHU9ITE7aWYoL14od2lkdGh8aGVpZ2h0KSQvLnRlc3QocikmJjA9PT1TLmdldFByb3BlcnR5VmFsdWUoZSxcImRpc3BsYXlcIikmJih1PSEwLFMuc2V0UHJvcGVydHlWYWx1ZShlLFwiZGlzcGxheVwiLFMuVmFsdWVzLmdldERpc3BsYXlUeXBlKGUpKSksIW8pe2lmKFwiaGVpZ2h0XCI9PT1yJiZcImJvcmRlci1ib3hcIiE9PVMuZ2V0UHJvcGVydHlWYWx1ZShlLFwiYm94U2l6aW5nXCIpLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSl7dmFyIGM9ZS5vZmZzZXRIZWlnaHQtKHBhcnNlRmxvYXQoUy5nZXRQcm9wZXJ0eVZhbHVlKGUsXCJib3JkZXJUb3BXaWR0aFwiKSl8fDApLShwYXJzZUZsb2F0KFMuZ2V0UHJvcGVydHlWYWx1ZShlLFwiYm9yZGVyQm90dG9tV2lkdGhcIikpfHwwKS0ocGFyc2VGbG9hdChTLmdldFByb3BlcnR5VmFsdWUoZSxcInBhZGRpbmdUb3BcIikpfHwwKS0ocGFyc2VGbG9hdChTLmdldFByb3BlcnR5VmFsdWUoZSxcInBhZGRpbmdCb3R0b21cIikpfHwwKTtyZXR1cm4gbigpLGN9aWYoXCJ3aWR0aFwiPT09ciYmXCJib3JkZXItYm94XCIhPT1TLmdldFByb3BlcnR5VmFsdWUoZSxcImJveFNpemluZ1wiKS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkpe3ZhciBwPWUub2Zmc2V0V2lkdGgtKHBhcnNlRmxvYXQoUy5nZXRQcm9wZXJ0eVZhbHVlKGUsXCJib3JkZXJMZWZ0V2lkdGhcIikpfHwwKS0ocGFyc2VGbG9hdChTLmdldFByb3BlcnR5VmFsdWUoZSxcImJvcmRlclJpZ2h0V2lkdGhcIikpfHwwKS0ocGFyc2VGbG9hdChTLmdldFByb3BlcnR5VmFsdWUoZSxcInBhZGRpbmdMZWZ0XCIpKXx8MCktKHBhcnNlRmxvYXQoUy5nZXRQcm9wZXJ0eVZhbHVlKGUsXCJwYWRkaW5nUmlnaHRcIikpfHwwKTtyZXR1cm4gbigpLHB9fXZhciBnO2c9aShlKT09PWE/dC5nZXRDb21wdXRlZFN0eWxlKGUsbnVsbCk6aShlKS5jb21wdXRlZFN0eWxlP2koZSkuY29tcHV0ZWRTdHlsZTppKGUpLmNvbXB1dGVkU3R5bGU9dC5nZXRDb21wdXRlZFN0eWxlKGUsbnVsbCksXCJib3JkZXJDb2xvclwiPT09ciYmKHI9XCJib3JkZXJUb3BDb2xvclwiKSxsPTk9PT1kJiZcImZpbHRlclwiPT09cj9nLmdldFByb3BlcnR5VmFsdWUocik6Z1tyXSwoXCJcIj09PWx8fG51bGw9PT1sKSYmKGw9ZS5zdHlsZVtyXSksbigpfWlmKFwiYXV0b1wiPT09bCYmL14odG9wfHJpZ2h0fGJvdHRvbXxsZWZ0KSQvaS50ZXN0KHIpKXt2YXIgbT1zKGUsXCJwb3NpdGlvblwiKTsoXCJmaXhlZFwiPT09bXx8XCJhYnNvbHV0ZVwiPT09bSYmL3RvcHxsZWZ0L2kudGVzdChyKSkmJihsPWYoZSkucG9zaXRpb24oKVtyXStcInB4XCIpfXJldHVybiBsfXZhciBsO2lmKFMuSG9va3MucmVnaXN0ZXJlZFtyXSl7dmFyIHU9cixjPVMuSG9va3MuZ2V0Um9vdCh1KTtuPT09YSYmKG49Uy5nZXRQcm9wZXJ0eVZhbHVlKGUsUy5OYW1lcy5wcmVmaXhDaGVjayhjKVswXSkpLFMuTm9ybWFsaXphdGlvbnMucmVnaXN0ZXJlZFtjXSYmKG49Uy5Ob3JtYWxpemF0aW9ucy5yZWdpc3RlcmVkW2NdKFwiZXh0cmFjdFwiLGUsbikpLGw9Uy5Ib29rcy5leHRyYWN0VmFsdWUodSxuKX1lbHNlIGlmKFMuTm9ybWFsaXphdGlvbnMucmVnaXN0ZXJlZFtyXSl7dmFyIHAsZztwPVMuTm9ybWFsaXphdGlvbnMucmVnaXN0ZXJlZFtyXShcIm5hbWVcIixlKSxcInRyYW5zZm9ybVwiIT09cCYmKGc9cyhlLFMuTmFtZXMucHJlZml4Q2hlY2socClbMF0pLFMuVmFsdWVzLmlzQ1NTTnVsbFZhbHVlKGcpJiZTLkhvb2tzLnRlbXBsYXRlc1tyXSYmKGc9Uy5Ib29rcy50ZW1wbGF0ZXNbcl1bMV0pKSxsPVMuTm9ybWFsaXphdGlvbnMucmVnaXN0ZXJlZFtyXShcImV4dHJhY3RcIixlLGcpfWlmKCEvXltcXGQtXS8udGVzdChsKSlpZihpKGUpJiZpKGUpLmlzU1ZHJiZTLk5hbWVzLlNWR0F0dHJpYnV0ZShyKSlpZigvXihoZWlnaHR8d2lkdGgpJC9pLnRlc3QocikpdHJ5e2w9ZS5nZXRCQm94KClbcl19Y2F0Y2gobSl7bD0wfWVsc2UgbD1lLmdldEF0dHJpYnV0ZShyKTtlbHNlIGw9cyhlLFMuTmFtZXMucHJlZml4Q2hlY2socilbMF0pO3JldHVybiBTLlZhbHVlcy5pc0NTU051bGxWYWx1ZShsKSYmKGw9MCksYi5kZWJ1Zz49MiYmY29uc29sZS5sb2coXCJHZXQgXCIrcitcIjogXCIrbCksbH0sc2V0UHJvcGVydHlWYWx1ZTpmdW5jdGlvbihlLHIsYSxuLG8pe3ZhciBzPXI7aWYoXCJzY3JvbGxcIj09PXIpby5jb250YWluZXI/by5jb250YWluZXJbXCJzY3JvbGxcIitvLmRpcmVjdGlvbl09YTpcIkxlZnRcIj09PW8uZGlyZWN0aW9uP3Quc2Nyb2xsVG8oYSxvLmFsdGVybmF0ZVZhbHVlKTp0LnNjcm9sbFRvKG8uYWx0ZXJuYXRlVmFsdWUsYSk7ZWxzZSBpZihTLk5vcm1hbGl6YXRpb25zLnJlZ2lzdGVyZWRbcl0mJlwidHJhbnNmb3JtXCI9PT1TLk5vcm1hbGl6YXRpb25zLnJlZ2lzdGVyZWRbcl0oXCJuYW1lXCIsZSkpUy5Ob3JtYWxpemF0aW9ucy5yZWdpc3RlcmVkW3JdKFwiaW5qZWN0XCIsZSxhKSxzPVwidHJhbnNmb3JtXCIsYT1pKGUpLnRyYW5zZm9ybUNhY2hlW3JdO2Vsc2V7aWYoUy5Ib29rcy5yZWdpc3RlcmVkW3JdKXt2YXIgbD1yLHU9Uy5Ib29rcy5nZXRSb290KHIpO249bnx8Uy5nZXRQcm9wZXJ0eVZhbHVlKGUsdSksYT1TLkhvb2tzLmluamVjdFZhbHVlKGwsYSxuKSxyPXV9aWYoUy5Ob3JtYWxpemF0aW9ucy5yZWdpc3RlcmVkW3JdJiYoYT1TLk5vcm1hbGl6YXRpb25zLnJlZ2lzdGVyZWRbcl0oXCJpbmplY3RcIixlLGEpLHI9Uy5Ob3JtYWxpemF0aW9ucy5yZWdpc3RlcmVkW3JdKFwibmFtZVwiLGUpKSxzPVMuTmFtZXMucHJlZml4Q2hlY2socilbMF0sOD49ZCl0cnl7ZS5zdHlsZVtzXT1hfWNhdGNoKGMpe2IuZGVidWcmJmNvbnNvbGUubG9nKFwiQnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFtcIithK1wiXSBmb3IgW1wiK3MrXCJdXCIpfWVsc2UgaShlKSYmaShlKS5pc1NWRyYmUy5OYW1lcy5TVkdBdHRyaWJ1dGUocik/ZS5zZXRBdHRyaWJ1dGUocixhKTplLnN0eWxlW3NdPWE7Yi5kZWJ1Zz49MiYmY29uc29sZS5sb2coXCJTZXQgXCIrcitcIiAoXCIrcytcIik6IFwiK2EpfXJldHVybltzLGFdfSxmbHVzaFRyYW5zZm9ybUNhY2hlOmZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQodCl7cmV0dXJuIHBhcnNlRmxvYXQoUy5nZXRQcm9wZXJ0eVZhbHVlKGUsdCkpfXZhciByPVwiXCI7aWYoKGR8fGIuU3RhdGUuaXNBbmRyb2lkJiYhYi5TdGF0ZS5pc0Nocm9tZSkmJmkoZSkuaXNTVkcpe3ZhciBhPXt0cmFuc2xhdGU6W3QoXCJ0cmFuc2xhdGVYXCIpLHQoXCJ0cmFuc2xhdGVZXCIpXSxza2V3WDpbdChcInNrZXdYXCIpXSxza2V3WTpbdChcInNrZXdZXCIpXSxzY2FsZToxIT09dChcInNjYWxlXCIpP1t0KFwic2NhbGVcIiksdChcInNjYWxlXCIpXTpbdChcInNjYWxlWFwiKSx0KFwic2NhbGVZXCIpXSxyb3RhdGU6W3QoXCJyb3RhdGVaXCIpLDAsMF19O2YuZWFjaChpKGUpLnRyYW5zZm9ybUNhY2hlLGZ1bmN0aW9uKGUpey9edHJhbnNsYXRlL2kudGVzdChlKT9lPVwidHJhbnNsYXRlXCI6L15zY2FsZS9pLnRlc3QoZSk/ZT1cInNjYWxlXCI6L15yb3RhdGUvaS50ZXN0KGUpJiYoZT1cInJvdGF0ZVwiKSxhW2VdJiYocis9ZStcIihcIithW2VdLmpvaW4oXCIgXCIpK1wiKSBcIixkZWxldGUgYVtlXSl9KX1lbHNle3ZhciBuLG87Zi5lYWNoKGkoZSkudHJhbnNmb3JtQ2FjaGUsZnVuY3Rpb24odCl7cmV0dXJuIG49aShlKS50cmFuc2Zvcm1DYWNoZVt0XSxcInRyYW5zZm9ybVBlcnNwZWN0aXZlXCI9PT10PyhvPW4sITApOig5PT09ZCYmXCJyb3RhdGVaXCI9PT10JiYodD1cInJvdGF0ZVwiKSx2b2lkKHIrPXQrbitcIiBcIikpfSksbyYmKHI9XCJwZXJzcGVjdGl2ZVwiK28rXCIgXCIrcil9Uy5zZXRQcm9wZXJ0eVZhbHVlKGUsXCJ0cmFuc2Zvcm1cIixyKX19O1MuSG9va3MucmVnaXN0ZXIoKSxTLk5vcm1hbGl6YXRpb25zLnJlZ2lzdGVyKCksYi5ob29rPWZ1bmN0aW9uKGUsdCxyKXt2YXIgbj1hO3JldHVybiBlPW8oZSksZi5lYWNoKGUsZnVuY3Rpb24oZSxvKXtpZihpKG8pPT09YSYmYi5pbml0KG8pLHI9PT1hKW49PT1hJiYobj1iLkNTUy5nZXRQcm9wZXJ0eVZhbHVlKG8sdCkpO2Vsc2V7dmFyIHM9Yi5DU1Muc2V0UHJvcGVydHlWYWx1ZShvLHQscik7XCJ0cmFuc2Zvcm1cIj09PXNbMF0mJmIuQ1NTLmZsdXNoVHJhbnNmb3JtQ2FjaGUobyksbj1zfX0pLG59O3ZhciBQPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSgpe3JldHVybiBzP2sucHJvbWlzZXx8bnVsbDpsfWZ1bmN0aW9uIG4oKXtmdW5jdGlvbiBlKGUpe2Z1bmN0aW9uIHAoZSx0KXt2YXIgcj1hLG49YSxpPWE7cmV0dXJuIG0uaXNBcnJheShlKT8ocj1lWzBdLCFtLmlzQXJyYXkoZVsxXSkmJi9eW1xcZC1dLy50ZXN0KGVbMV0pfHxtLmlzRnVuY3Rpb24oZVsxXSl8fFMuUmVnRXguaXNIZXgudGVzdChlWzFdKT9pPWVbMV06KG0uaXNTdHJpbmcoZVsxXSkmJiFTLlJlZ0V4LmlzSGV4LnRlc3QoZVsxXSl8fG0uaXNBcnJheShlWzFdKSkmJihuPXQ/ZVsxXTp1KGVbMV0scy5kdXJhdGlvbiksZVsyXSE9PWEmJihpPWVbMl0pKSk6cj1lLHR8fChuPW58fHMuZWFzaW5nKSxtLmlzRnVuY3Rpb24ocikmJihyPXIuY2FsbChvLFYsdykpLG0uaXNGdW5jdGlvbihpKSYmKGk9aS5jYWxsKG8sVix3KSksW3J8fDAsbixpXX1mdW5jdGlvbiBkKGUsdCl7dmFyIHIsYTtyZXR1cm4gYT0odHx8XCIwXCIpLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bJUEtel0rJC8sZnVuY3Rpb24oZSl7cmV0dXJuIHI9ZSxcIlwifSkscnx8KHI9Uy5WYWx1ZXMuZ2V0VW5pdFR5cGUoZSkpLFthLHJdfWZ1bmN0aW9uIGgoKXt2YXIgZT17bXlQYXJlbnQ6by5wYXJlbnROb2RlfHxyLmJvZHkscG9zaXRpb246Uy5nZXRQcm9wZXJ0eVZhbHVlKG8sXCJwb3NpdGlvblwiKSxmb250U2l6ZTpTLmdldFByb3BlcnR5VmFsdWUobyxcImZvbnRTaXplXCIpfSxhPWUucG9zaXRpb249PT1MLmxhc3RQb3NpdGlvbiYmZS5teVBhcmVudD09PUwubGFzdFBhcmVudCxuPWUuZm9udFNpemU9PT1MLmxhc3RGb250U2l6ZTtMLmxhc3RQYXJlbnQ9ZS5teVBhcmVudCxMLmxhc3RQb3NpdGlvbj1lLnBvc2l0aW9uLEwubGFzdEZvbnRTaXplPWUuZm9udFNpemU7dmFyIHM9MTAwLGw9e307aWYobiYmYSlsLmVtVG9QeD1MLmxhc3RFbVRvUHgsbC5wZXJjZW50VG9QeFdpZHRoPUwubGFzdFBlcmNlbnRUb1B4V2lkdGgsbC5wZXJjZW50VG9QeEhlaWdodD1MLmxhc3RQZXJjZW50VG9QeEhlaWdodDtlbHNle3ZhciB1PWkobykuaXNTVkc/ci5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFwicmVjdFwiKTpyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7Yi5pbml0KHUpLGUubXlQYXJlbnQuYXBwZW5kQ2hpbGQodSksZi5lYWNoKFtcIm92ZXJmbG93XCIsXCJvdmVyZmxvd1hcIixcIm92ZXJmbG93WVwiXSxmdW5jdGlvbihlLHQpe2IuQ1NTLnNldFByb3BlcnR5VmFsdWUodSx0LFwiaGlkZGVuXCIpfSksYi5DU1Muc2V0UHJvcGVydHlWYWx1ZSh1LFwicG9zaXRpb25cIixlLnBvc2l0aW9uKSxiLkNTUy5zZXRQcm9wZXJ0eVZhbHVlKHUsXCJmb250U2l6ZVwiLGUuZm9udFNpemUpLGIuQ1NTLnNldFByb3BlcnR5VmFsdWUodSxcImJveFNpemluZ1wiLFwiY29udGVudC1ib3hcIiksZi5lYWNoKFtcIm1pbldpZHRoXCIsXCJtYXhXaWR0aFwiLFwid2lkdGhcIixcIm1pbkhlaWdodFwiLFwibWF4SGVpZ2h0XCIsXCJoZWlnaHRcIl0sZnVuY3Rpb24oZSx0KXtiLkNTUy5zZXRQcm9wZXJ0eVZhbHVlKHUsdCxzK1wiJVwiKX0pLGIuQ1NTLnNldFByb3BlcnR5VmFsdWUodSxcInBhZGRpbmdMZWZ0XCIscytcImVtXCIpLGwucGVyY2VudFRvUHhXaWR0aD1MLmxhc3RQZXJjZW50VG9QeFdpZHRoPShwYXJzZUZsb2F0KFMuZ2V0UHJvcGVydHlWYWx1ZSh1LFwid2lkdGhcIixudWxsLCEwKSl8fDEpL3MsbC5wZXJjZW50VG9QeEhlaWdodD1MLmxhc3RQZXJjZW50VG9QeEhlaWdodD0ocGFyc2VGbG9hdChTLmdldFByb3BlcnR5VmFsdWUodSxcImhlaWdodFwiLG51bGwsITApKXx8MSkvcyxsLmVtVG9QeD1MLmxhc3RFbVRvUHg9KHBhcnNlRmxvYXQoUy5nZXRQcm9wZXJ0eVZhbHVlKHUsXCJwYWRkaW5nTGVmdFwiKSl8fDEpL3MsZS5teVBhcmVudC5yZW1vdmVDaGlsZCh1KX1yZXR1cm4gbnVsbD09PUwucmVtVG9QeCYmKEwucmVtVG9QeD1wYXJzZUZsb2F0KFMuZ2V0UHJvcGVydHlWYWx1ZShyLmJvZHksXCJmb250U2l6ZVwiKSl8fDE2KSxudWxsPT09TC52d1RvUHgmJihMLnZ3VG9QeD1wYXJzZUZsb2F0KHQuaW5uZXJXaWR0aCkvMTAwLEwudmhUb1B4PXBhcnNlRmxvYXQodC5pbm5lckhlaWdodCkvMTAwKSxsLnJlbVRvUHg9TC5yZW1Ub1B4LGwudndUb1B4PUwudndUb1B4LGwudmhUb1B4PUwudmhUb1B4LGIuZGVidWc+PTEmJmNvbnNvbGUubG9nKFwiVW5pdCByYXRpb3M6IFwiK0pTT04uc3RyaW5naWZ5KGwpLG8pLGx9aWYocy5iZWdpbiYmMD09PVYpdHJ5e3MuYmVnaW4uY2FsbChnLGcpfWNhdGNoKHgpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXt0aHJvdyB4fSwxKX1pZihcInNjcm9sbFwiPT09QSl7dmFyIFAsQyxULEY9L154JC9pLnRlc3Qocy5heGlzKT9cIkxlZnRcIjpcIlRvcFwiLGo9cGFyc2VGbG9hdChzLm9mZnNldCl8fDA7cy5jb250YWluZXI/bS5pc1dyYXBwZWQocy5jb250YWluZXIpfHxtLmlzTm9kZShzLmNvbnRhaW5lcik/KHMuY29udGFpbmVyPXMuY29udGFpbmVyWzBdfHxzLmNvbnRhaW5lcixQPXMuY29udGFpbmVyW1wic2Nyb2xsXCIrRl0sVD1QK2YobykucG9zaXRpb24oKVtGLnRvTG93ZXJDYXNlKCldK2opOnMuY29udGFpbmVyPW51bGw6KFA9Yi5TdGF0ZS5zY3JvbGxBbmNob3JbYi5TdGF0ZVtcInNjcm9sbFByb3BlcnR5XCIrRl1dLEM9Yi5TdGF0ZS5zY3JvbGxBbmNob3JbYi5TdGF0ZVtcInNjcm9sbFByb3BlcnR5XCIrKFwiTGVmdFwiPT09Rj9cIlRvcFwiOlwiTGVmdFwiKV1dLFQ9ZihvKS5vZmZzZXQoKVtGLnRvTG93ZXJDYXNlKCldK2opLGw9e3Njcm9sbDp7cm9vdFByb3BlcnR5VmFsdWU6ITEsc3RhcnRWYWx1ZTpQLGN1cnJlbnRWYWx1ZTpQLGVuZFZhbHVlOlQsdW5pdFR5cGU6XCJcIixlYXNpbmc6cy5lYXNpbmcsc2Nyb2xsRGF0YTp7Y29udGFpbmVyOnMuY29udGFpbmVyLGRpcmVjdGlvbjpGLGFsdGVybmF0ZVZhbHVlOkN9fSxlbGVtZW50Om99LGIuZGVidWcmJmNvbnNvbGUubG9nKFwidHdlZW5zQ29udGFpbmVyIChzY3JvbGwpOiBcIixsLnNjcm9sbCxvKX1lbHNlIGlmKFwicmV2ZXJzZVwiPT09QSl7aWYoIWkobykudHdlZW5zQ29udGFpbmVyKXJldHVybiB2b2lkIGYuZGVxdWV1ZShvLHMucXVldWUpO1wibm9uZVwiPT09aShvKS5vcHRzLmRpc3BsYXkmJihpKG8pLm9wdHMuZGlzcGxheT1cImF1dG9cIiksXCJoaWRkZW5cIj09PWkobykub3B0cy52aXNpYmlsaXR5JiYoaShvKS5vcHRzLnZpc2liaWxpdHk9XCJ2aXNpYmxlXCIpLGkobykub3B0cy5sb29wPSExLGkobykub3B0cy5iZWdpbj1udWxsLGkobykub3B0cy5jb21wbGV0ZT1udWxsLHYuZWFzaW5nfHxkZWxldGUgcy5lYXNpbmcsdi5kdXJhdGlvbnx8ZGVsZXRlIHMuZHVyYXRpb24scz1mLmV4dGVuZCh7fSxpKG8pLm9wdHMscyk7dmFyIEU9Zi5leHRlbmQoITAse30saShvKS50d2VlbnNDb250YWluZXIpO2Zvcih2YXIgSCBpbiBFKWlmKFwiZWxlbWVudFwiIT09SCl7dmFyIE49RVtIXS5zdGFydFZhbHVlO0VbSF0uc3RhcnRWYWx1ZT1FW0hdLmN1cnJlbnRWYWx1ZT1FW0hdLmVuZFZhbHVlLEVbSF0uZW5kVmFsdWU9TixtLmlzRW1wdHlPYmplY3Qodil8fChFW0hdLmVhc2luZz1zLmVhc2luZyksYi5kZWJ1ZyYmY29uc29sZS5sb2coXCJyZXZlcnNlIHR3ZWVuc0NvbnRhaW5lciAoXCIrSCtcIik6IFwiK0pTT04uc3RyaW5naWZ5KEVbSF0pLG8pfWw9RX1lbHNlIGlmKFwic3RhcnRcIj09PUEpe3ZhciBFO2kobykudHdlZW5zQ29udGFpbmVyJiZpKG8pLmlzQW5pbWF0aW5nPT09ITAmJihFPWkobykudHdlZW5zQ29udGFpbmVyKSxmLmVhY2goeSxmdW5jdGlvbihlLHQpe2lmKFJlZ0V4cChcIl5cIitTLkxpc3RzLmNvbG9ycy5qb2luKFwiJHxeXCIpK1wiJFwiKS50ZXN0KGUpKXt2YXIgcj1wKHQsITApLG49clswXSxvPXJbMV0saT1yWzJdO2lmKFMuUmVnRXguaXNIZXgudGVzdChuKSl7Zm9yKHZhciBzPVtcIlJlZFwiLFwiR3JlZW5cIixcIkJsdWVcIl0sbD1TLlZhbHVlcy5oZXhUb1JnYihuKSx1PWk/Uy5WYWx1ZXMuaGV4VG9SZ2IoaSk6YSxjPTA7YzxzLmxlbmd0aDtjKyspe3ZhciBmPVtsW2NdXTtvJiZmLnB1c2gobyksdSE9PWEmJmYucHVzaCh1W2NdKSx5W2Urc1tjXV09Zn1kZWxldGUgeVtlXX19fSk7Zm9yKHZhciB6IGluIHkpe3ZhciBPPXAoeVt6XSkscT1PWzBdLCQ9T1sxXSxNPU9bMl07ej1TLk5hbWVzLmNhbWVsQ2FzZSh6KTt2YXIgST1TLkhvb2tzLmdldFJvb3QoeiksQj0hMTtpZihpKG8pLmlzU1ZHfHxcInR3ZWVuXCI9PT1JfHxTLk5hbWVzLnByZWZpeENoZWNrKEkpWzFdIT09ITF8fFMuTm9ybWFsaXphdGlvbnMucmVnaXN0ZXJlZFtJXSE9PWEpeyhzLmRpc3BsYXkhPT1hJiZudWxsIT09cy5kaXNwbGF5JiZcIm5vbmVcIiE9PXMuZGlzcGxheXx8cy52aXNpYmlsaXR5IT09YSYmXCJoaWRkZW5cIiE9PXMudmlzaWJpbGl0eSkmJi9vcGFjaXR5fGZpbHRlci8udGVzdCh6KSYmIU0mJjAhPT1xJiYoTT0wKSxzLl9jYWNoZVZhbHVlcyYmRSYmRVt6XT8oTT09PWEmJihNPUVbel0uZW5kVmFsdWUrRVt6XS51bml0VHlwZSksQj1pKG8pLnJvb3RQcm9wZXJ0eVZhbHVlQ2FjaGVbSV0pOlMuSG9va3MucmVnaXN0ZXJlZFt6XT9NPT09YT8oQj1TLmdldFByb3BlcnR5VmFsdWUobyxJKSxNPVMuZ2V0UHJvcGVydHlWYWx1ZShvLHosQikpOkI9Uy5Ib29rcy50ZW1wbGF0ZXNbSV1bMV06TT09PWEmJihNPVMuZ2V0UHJvcGVydHlWYWx1ZShvLHopKTt2YXIgVyxHLFksRD0hMTtpZihXPWQoeixNKSxNPVdbMF0sWT1XWzFdLFc9ZCh6LHEpLHE9V1swXS5yZXBsYWNlKC9eKFsrLVxcLypdKT0vLGZ1bmN0aW9uKGUsdCl7cmV0dXJuIEQ9dCxcIlwifSksRz1XWzFdLE09cGFyc2VGbG9hdChNKXx8MCxxPXBhcnNlRmxvYXQocSl8fDAsXCIlXCI9PT1HJiYoL14oZm9udFNpemV8bGluZUhlaWdodCkkLy50ZXN0KHopPyhxLz0xMDAsRz1cImVtXCIpOi9ec2NhbGUvLnRlc3Qoeik/KHEvPTEwMCxHPVwiXCIpOi8oUmVkfEdyZWVufEJsdWUpJC9pLnRlc3QoeikmJihxPXEvMTAwKjI1NSxHPVwiXCIpKSwvW1xcLypdLy50ZXN0KEQpKUc9WTtlbHNlIGlmKFkhPT1HJiYwIT09TSlpZigwPT09cSlHPVk7ZWxzZXtuPW58fGgoKTt2YXIgUT0vbWFyZ2lufHBhZGRpbmd8bGVmdHxyaWdodHx3aWR0aHx0ZXh0fHdvcmR8bGV0dGVyL2kudGVzdCh6KXx8L1gkLy50ZXN0KHopfHxcInhcIj09PXo/XCJ4XCI6XCJ5XCI7c3dpdGNoKFkpe2Nhc2VcIiVcIjpNKj1cInhcIj09PVE/bi5wZXJjZW50VG9QeFdpZHRoOm4ucGVyY2VudFRvUHhIZWlnaHQ7YnJlYWs7Y2FzZVwicHhcIjpicmVhaztkZWZhdWx0Ok0qPW5bWStcIlRvUHhcIl19c3dpdGNoKEcpe2Nhc2VcIiVcIjpNKj0xLyhcInhcIj09PVE/bi5wZXJjZW50VG9QeFdpZHRoOm4ucGVyY2VudFRvUHhIZWlnaHQpO2JyZWFrO2Nhc2VcInB4XCI6YnJlYWs7ZGVmYXVsdDpNKj0xL25bRytcIlRvUHhcIl19fXN3aXRjaChEKXtjYXNlXCIrXCI6cT1NK3E7YnJlYWs7Y2FzZVwiLVwiOnE9TS1xO2JyZWFrO2Nhc2VcIipcIjpxPU0qcTticmVhaztjYXNlXCIvXCI6cT1NL3F9bFt6XT17cm9vdFByb3BlcnR5VmFsdWU6QixzdGFydFZhbHVlOk0sY3VycmVudFZhbHVlOk0sZW5kVmFsdWU6cSx1bml0VHlwZTpHLGVhc2luZzokfSxiLmRlYnVnJiZjb25zb2xlLmxvZyhcInR3ZWVuc0NvbnRhaW5lciAoXCIreitcIik6IFwiK0pTT04uc3RyaW5naWZ5KGxbel0pLG8pfWVsc2UgYi5kZWJ1ZyYmY29uc29sZS5sb2coXCJTa2lwcGluZyBbXCIrSStcIl0gZHVlIHRvIGEgbGFjayBvZiBicm93c2VyIHN1cHBvcnQuXCIpfWwuZWxlbWVudD1vfWwuZWxlbWVudCYmKFMuVmFsdWVzLmFkZENsYXNzKG8sXCJ2ZWxvY2l0eS1hbmltYXRpbmdcIiksUi5wdXNoKGwpLFwiXCI9PT1zLnF1ZXVlJiYoaShvKS50d2VlbnNDb250YWluZXI9bCxpKG8pLm9wdHM9cyksaShvKS5pc0FuaW1hdGluZz0hMCxWPT09dy0xPyhiLlN0YXRlLmNhbGxzLnB1c2goW1IsZyxzLG51bGwsay5yZXNvbHZlcl0pLGIuU3RhdGUuaXNUaWNraW5nPT09ITEmJihiLlN0YXRlLmlzVGlja2luZz0hMCxjKCkpKTpWKyspfXZhciBuLG89dGhpcyxzPWYuZXh0ZW5kKHt9LGIuZGVmYXVsdHMsdiksbD17fTtzd2l0Y2goaShvKT09PWEmJmIuaW5pdChvKSxwYXJzZUZsb2F0KHMuZGVsYXkpJiZzLnF1ZXVlIT09ITEmJmYucXVldWUobyxzLnF1ZXVlLGZ1bmN0aW9uKGUpe2IudmVsb2NpdHlRdWV1ZUVudHJ5RmxhZz0hMCxpKG8pLmRlbGF5VGltZXI9e3NldFRpbWVvdXQ6c2V0VGltZW91dChlLHBhcnNlRmxvYXQocy5kZWxheSkpLG5leHQ6ZX19KSxzLmR1cmF0aW9uLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSl7Y2FzZVwiZmFzdFwiOnMuZHVyYXRpb249MjAwO2JyZWFrO2Nhc2VcIm5vcm1hbFwiOnMuZHVyYXRpb249aDticmVhaztjYXNlXCJzbG93XCI6cy5kdXJhdGlvbj02MDA7YnJlYWs7ZGVmYXVsdDpzLmR1cmF0aW9uPXBhcnNlRmxvYXQocy5kdXJhdGlvbil8fDF9Yi5tb2NrIT09ITEmJihiLm1vY2s9PT0hMD9zLmR1cmF0aW9uPXMuZGVsYXk9MToocy5kdXJhdGlvbio9cGFyc2VGbG9hdChiLm1vY2spfHwxLHMuZGVsYXkqPXBhcnNlRmxvYXQoYi5tb2NrKXx8MSkpLHMuZWFzaW5nPXUocy5lYXNpbmcscy5kdXJhdGlvbikscy5iZWdpbiYmIW0uaXNGdW5jdGlvbihzLmJlZ2luKSYmKHMuYmVnaW49bnVsbCkscy5wcm9ncmVzcyYmIW0uaXNGdW5jdGlvbihzLnByb2dyZXNzKSYmKHMucHJvZ3Jlc3M9bnVsbCkscy5jb21wbGV0ZSYmIW0uaXNGdW5jdGlvbihzLmNvbXBsZXRlKSYmKHMuY29tcGxldGU9bnVsbCkscy5kaXNwbGF5IT09YSYmbnVsbCE9PXMuZGlzcGxheSYmKHMuZGlzcGxheT1zLmRpc3BsYXkudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLFwiYXV0b1wiPT09cy5kaXNwbGF5JiYocy5kaXNwbGF5PWIuQ1NTLlZhbHVlcy5nZXREaXNwbGF5VHlwZShvKSkpLHMudmlzaWJpbGl0eSE9PWEmJm51bGwhPT1zLnZpc2liaWxpdHkmJihzLnZpc2liaWxpdHk9cy52aXNpYmlsaXR5LnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSkscy5tb2JpbGVIQT1zLm1vYmlsZUhBJiZiLlN0YXRlLmlzTW9iaWxlJiYhYi5TdGF0ZS5pc0dpbmdlcmJyZWFkLHMucXVldWU9PT0hMT9zLmRlbGF5P3NldFRpbWVvdXQoZSxzLmRlbGF5KTplKCk6Zi5xdWV1ZShvLHMucXVldWUsZnVuY3Rpb24odCxyKXtyZXR1cm4gcj09PSEwPyhrLnByb21pc2UmJmsucmVzb2x2ZXIoZyksITApOihiLnZlbG9jaXR5UXVldWVFbnRyeUZsYWc9ITAsdm9pZCBlKHQpKX0pLFwiXCIhPT1zLnF1ZXVlJiZcImZ4XCIhPT1zLnF1ZXVlfHxcImlucHJvZ3Jlc3NcIj09PWYucXVldWUobylbMF18fGYuZGVxdWV1ZShvKX12YXIgcyxsLGQsZyx5LHYseD1hcmd1bWVudHNbMF0mJihhcmd1bWVudHNbMF0ucHx8Zi5pc1BsYWluT2JqZWN0KGFyZ3VtZW50c1swXS5wcm9wZXJ0aWVzKSYmIWFyZ3VtZW50c1swXS5wcm9wZXJ0aWVzLm5hbWVzfHxtLmlzU3RyaW5nKGFyZ3VtZW50c1swXS5wcm9wZXJ0aWVzKSk7aWYobS5pc1dyYXBwZWQodGhpcyk/KHM9ITEsZD0wLGc9dGhpcyxsPXRoaXMpOihzPSEwLGQ9MSxnPXg/YXJndW1lbnRzWzBdLmVsZW1lbnRzfHxhcmd1bWVudHNbMF0uZTphcmd1bWVudHNbMF0pLGc9byhnKSl7eD8oeT1hcmd1bWVudHNbMF0ucHJvcGVydGllc3x8YXJndW1lbnRzWzBdLnAsdj1hcmd1bWVudHNbMF0ub3B0aW9uc3x8YXJndW1lbnRzWzBdLm8pOih5PWFyZ3VtZW50c1tkXSx2PWFyZ3VtZW50c1tkKzFdKTt2YXIgdz1nLmxlbmd0aCxWPTA7aWYoIS9eKHN0b3B8ZmluaXNoKSQvaS50ZXN0KHkpJiYhZi5pc1BsYWluT2JqZWN0KHYpKXt2YXIgQz1kKzE7dj17fTtmb3IodmFyIFQ9QztUPGFyZ3VtZW50cy5sZW5ndGg7VCsrKW0uaXNBcnJheShhcmd1bWVudHNbVF0pfHwhL14oZmFzdHxub3JtYWx8c2xvdykkL2kudGVzdChhcmd1bWVudHNbVF0pJiYhL15cXGQvLnRlc3QoYXJndW1lbnRzW1RdKT9tLmlzU3RyaW5nKGFyZ3VtZW50c1tUXSl8fG0uaXNBcnJheShhcmd1bWVudHNbVF0pP3YuZWFzaW5nPWFyZ3VtZW50c1tUXTptLmlzRnVuY3Rpb24oYXJndW1lbnRzW1RdKSYmKHYuY29tcGxldGU9YXJndW1lbnRzW1RdKTp2LmR1cmF0aW9uPWFyZ3VtZW50c1tUXX12YXIgaz17cHJvbWlzZTpudWxsLHJlc29sdmVyOm51bGwscmVqZWN0ZXI6bnVsbH07cyYmYi5Qcm9taXNlJiYoay5wcm9taXNlPW5ldyBiLlByb21pc2UoZnVuY3Rpb24oZSx0KXtrLnJlc29sdmVyPWUsay5yZWplY3Rlcj10fSkpO3ZhciBBO3N3aXRjaCh5KXtjYXNlXCJzY3JvbGxcIjpBPVwic2Nyb2xsXCI7YnJlYWs7Y2FzZVwicmV2ZXJzZVwiOkE9XCJyZXZlcnNlXCI7YnJlYWs7Y2FzZVwiZmluaXNoXCI6Y2FzZVwic3RvcFwiOmYuZWFjaChnLGZ1bmN0aW9uKGUsdCl7aSh0KSYmaSh0KS5kZWxheVRpbWVyJiYoY2xlYXJUaW1lb3V0KGkodCkuZGVsYXlUaW1lci5zZXRUaW1lb3V0KSxpKHQpLmRlbGF5VGltZXIubmV4dCYmaSh0KS5kZWxheVRpbWVyLm5leHQoKSxkZWxldGUgaSh0KS5kZWxheVRpbWVyKX0pO3ZhciBGPVtdO3JldHVybiBmLmVhY2goYi5TdGF0ZS5jYWxscyxmdW5jdGlvbihlLHQpe3QmJmYuZWFjaCh0WzFdLGZ1bmN0aW9uKHIsbil7dmFyIG89dj09PWE/XCJcIjp2O3JldHVybiBvPT09ITB8fHRbMl0ucXVldWU9PT1vfHx2PT09YSYmdFsyXS5xdWV1ZT09PSExP3ZvaWQgZi5lYWNoKGcsZnVuY3Rpb24ocixhKXthPT09biYmKCh2PT09ITB8fG0uaXNTdHJpbmcodikpJiYoZi5lYWNoKGYucXVldWUoYSxtLmlzU3RyaW5nKHYpP3Y6XCJcIiksZnVuY3Rpb24oZSx0KXtcclxubS5pc0Z1bmN0aW9uKHQpJiZ0KG51bGwsITApfSksZi5xdWV1ZShhLG0uaXNTdHJpbmcodik/djpcIlwiLFtdKSksXCJzdG9wXCI9PT15PyhpKGEpJiZpKGEpLnR3ZWVuc0NvbnRhaW5lciYmbyE9PSExJiZmLmVhY2goaShhKS50d2VlbnNDb250YWluZXIsZnVuY3Rpb24oZSx0KXt0LmVuZFZhbHVlPXQuY3VycmVudFZhbHVlfSksRi5wdXNoKGUpKTpcImZpbmlzaFwiPT09eSYmKHRbMl0uZHVyYXRpb249MSkpfSk6ITB9KX0pLFwic3RvcFwiPT09eSYmKGYuZWFjaChGLGZ1bmN0aW9uKGUsdCl7cCh0LCEwKX0pLGsucHJvbWlzZSYmay5yZXNvbHZlcihnKSksZSgpO2RlZmF1bHQ6aWYoIWYuaXNQbGFpbk9iamVjdCh5KXx8bS5pc0VtcHR5T2JqZWN0KHkpKXtpZihtLmlzU3RyaW5nKHkpJiZiLlJlZGlyZWN0c1t5XSl7dmFyIGo9Zi5leHRlbmQoe30sdiksRT1qLmR1cmF0aW9uLEg9ai5kZWxheXx8MDtyZXR1cm4gai5iYWNrd2FyZHM9PT0hMCYmKGc9Zi5leHRlbmQoITAsW10sZykucmV2ZXJzZSgpKSxmLmVhY2goZyxmdW5jdGlvbihlLHQpe3BhcnNlRmxvYXQoai5zdGFnZ2VyKT9qLmRlbGF5PUgrcGFyc2VGbG9hdChqLnN0YWdnZXIpKmU6bS5pc0Z1bmN0aW9uKGouc3RhZ2dlcikmJihqLmRlbGF5PUgrai5zdGFnZ2VyLmNhbGwodCxlLHcpKSxqLmRyYWcmJihqLmR1cmF0aW9uPXBhcnNlRmxvYXQoRSl8fCgvXihjYWxsb3V0fHRyYW5zaXRpb24pLy50ZXN0KHkpPzFlMzpoKSxqLmR1cmF0aW9uPU1hdGgubWF4KGouZHVyYXRpb24qKGouYmFja3dhcmRzPzEtZS93OihlKzEpL3cpLC43NSpqLmR1cmF0aW9uLDIwMCkpLGIuUmVkaXJlY3RzW3ldLmNhbGwodCx0LGp8fHt9LGUsdyxnLGsucHJvbWlzZT9rOmEpfSksZSgpfXZhciBOPVwiVmVsb2NpdHk6IEZpcnN0IGFyZ3VtZW50IChcIit5K1wiKSB3YXMgbm90IGEgcHJvcGVydHkgbWFwLCBhIGtub3duIGFjdGlvbiwgb3IgYSByZWdpc3RlcmVkIHJlZGlyZWN0LiBBYm9ydGluZy5cIjtyZXR1cm4gay5wcm9taXNlP2sucmVqZWN0ZXIobmV3IEVycm9yKE4pKTpjb25zb2xlLmxvZyhOKSxlKCl9QT1cInN0YXJ0XCJ9dmFyIEw9e2xhc3RQYXJlbnQ6bnVsbCxsYXN0UG9zaXRpb246bnVsbCxsYXN0Rm9udFNpemU6bnVsbCxsYXN0UGVyY2VudFRvUHhXaWR0aDpudWxsLGxhc3RQZXJjZW50VG9QeEhlaWdodDpudWxsLGxhc3RFbVRvUHg6bnVsbCxyZW1Ub1B4Om51bGwsdndUb1B4Om51bGwsdmhUb1B4Om51bGx9LFI9W107Zi5lYWNoKGcsZnVuY3Rpb24oZSx0KXttLmlzTm9kZSh0KSYmbi5jYWxsKHQpfSk7dmFyIHosaj1mLmV4dGVuZCh7fSxiLmRlZmF1bHRzLHYpO2lmKGoubG9vcD1wYXJzZUludChqLmxvb3ApLHo9MipqLmxvb3AtMSxqLmxvb3ApZm9yKHZhciBPPTA7ej5PO08rKyl7dmFyIHE9e2RlbGF5OmouZGVsYXkscHJvZ3Jlc3M6ai5wcm9ncmVzc307Tz09PXotMSYmKHEuZGlzcGxheT1qLmRpc3BsYXkscS52aXNpYmlsaXR5PWoudmlzaWJpbGl0eSxxLmNvbXBsZXRlPWouY29tcGxldGUpLFAoZyxcInJldmVyc2VcIixxKX1yZXR1cm4gZSgpfX07Yj1mLmV4dGVuZChQLGIpLGIuYW5pbWF0ZT1QO3ZhciB3PXQucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHxnO3JldHVybiBiLlN0YXRlLmlzTW9iaWxlfHxyLmhpZGRlbj09PWF8fHIuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIixmdW5jdGlvbigpe3IuaGlkZGVuPyh3PWZ1bmN0aW9uKGUpe3JldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZSghMCl9LDE2KX0sYygpKTp3PXQucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHxnfSksZS5WZWxvY2l0eT1iLGUhPT10JiYoZS5mbi52ZWxvY2l0eT1QLGUuZm4udmVsb2NpdHkuZGVmYXVsdHM9Yi5kZWZhdWx0cyksZi5lYWNoKFtcIkRvd25cIixcIlVwXCJdLGZ1bmN0aW9uKGUsdCl7Yi5SZWRpcmVjdHNbXCJzbGlkZVwiK3RdPWZ1bmN0aW9uKGUscixuLG8saSxzKXt2YXIgbD1mLmV4dGVuZCh7fSxyKSx1PWwuYmVnaW4sYz1sLmNvbXBsZXRlLHA9e2hlaWdodDpcIlwiLG1hcmdpblRvcDpcIlwiLG1hcmdpbkJvdHRvbTpcIlwiLHBhZGRpbmdUb3A6XCJcIixwYWRkaW5nQm90dG9tOlwiXCJ9LGQ9e307bC5kaXNwbGF5PT09YSYmKGwuZGlzcGxheT1cIkRvd25cIj09PXQ/XCJpbmxpbmVcIj09PWIuQ1NTLlZhbHVlcy5nZXREaXNwbGF5VHlwZShlKT9cImlubGluZS1ibG9ja1wiOlwiYmxvY2tcIjpcIm5vbmVcIiksbC5iZWdpbj1mdW5jdGlvbigpe3UmJnUuY2FsbChpLGkpO2Zvcih2YXIgciBpbiBwKXtkW3JdPWUuc3R5bGVbcl07dmFyIGE9Yi5DU1MuZ2V0UHJvcGVydHlWYWx1ZShlLHIpO3Bbcl09XCJEb3duXCI9PT10P1thLDBdOlswLGFdfWQub3ZlcmZsb3c9ZS5zdHlsZS5vdmVyZmxvdyxlLnN0eWxlLm92ZXJmbG93PVwiaGlkZGVuXCJ9LGwuY29tcGxldGU9ZnVuY3Rpb24oKXtmb3IodmFyIHQgaW4gZCllLnN0eWxlW3RdPWRbdF07YyYmYy5jYWxsKGksaSkscyYmcy5yZXNvbHZlcihpKX0sYihlLHAsbCl9fSksZi5lYWNoKFtcIkluXCIsXCJPdXRcIl0sZnVuY3Rpb24oZSx0KXtiLlJlZGlyZWN0c1tcImZhZGVcIit0XT1mdW5jdGlvbihlLHIsbixvLGkscyl7dmFyIGw9Zi5leHRlbmQoe30sciksdT17b3BhY2l0eTpcIkluXCI9PT10PzE6MH0sYz1sLmNvbXBsZXRlO2wuY29tcGxldGU9biE9PW8tMT9sLmJlZ2luPW51bGw6ZnVuY3Rpb24oKXtjJiZjLmNhbGwoaSxpKSxzJiZzLnJlc29sdmVyKGkpfSxsLmRpc3BsYXk9PT1hJiYobC5kaXNwbGF5PVwiSW5cIj09PXQ/XCJhdXRvXCI6XCJub25lXCIpLGIodGhpcyx1LGwpfX0pLGJ9KHdpbmRvdy5qUXVlcnl8fHdpbmRvdy5aZXB0b3x8d2luZG93LHdpbmRvdyxkb2N1bWVudCl9KSk7XHJcblxuIWZ1bmN0aW9uKGEsYixjLGQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGsoYSxiLGMpe3JldHVybiBzZXRUaW1lb3V0KHEoYSxjKSxiKX1mdW5jdGlvbiBsKGEsYixjKXtyZXR1cm4gQXJyYXkuaXNBcnJheShhKT8obShhLGNbYl0sYyksITApOiExfWZ1bmN0aW9uIG0oYSxiLGMpe3ZhciBlO2lmKGEpaWYoYS5mb3JFYWNoKWEuZm9yRWFjaChiLGMpO2Vsc2UgaWYoYS5sZW5ndGghPT1kKWZvcihlPTA7ZTxhLmxlbmd0aDspYi5jYWxsKGMsYVtlXSxlLGEpLGUrKztlbHNlIGZvcihlIGluIGEpYS5oYXNPd25Qcm9wZXJ0eShlKSYmYi5jYWxsKGMsYVtlXSxlLGEpfWZ1bmN0aW9uIG4oYSxiLGMpe2Zvcih2YXIgZT1PYmplY3Qua2V5cyhiKSxmPTA7ZjxlLmxlbmd0aDspKCFjfHxjJiZhW2VbZl1dPT09ZCkmJihhW2VbZl1dPWJbZVtmXV0pLGYrKztyZXR1cm4gYX1mdW5jdGlvbiBvKGEsYil7cmV0dXJuIG4oYSxiLCEwKX1mdW5jdGlvbiBwKGEsYixjKXt2YXIgZSxkPWIucHJvdG90eXBlO2U9YS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShkKSxlLmNvbnN0cnVjdG9yPWEsZS5fc3VwZXI9ZCxjJiZuKGUsYyl9ZnVuY3Rpb24gcShhLGIpe3JldHVybiBmdW5jdGlvbigpe3JldHVybiBhLmFwcGx5KGIsYXJndW1lbnRzKX19ZnVuY3Rpb24gcihhLGIpe3JldHVybiB0eXBlb2YgYT09Zz9hLmFwcGx5KGI/YlswXXx8ZDpkLGIpOmF9ZnVuY3Rpb24gcyhhLGIpe3JldHVybiBhPT09ZD9iOmF9ZnVuY3Rpb24gdChhLGIsYyl7bSh4KGIpLGZ1bmN0aW9uKGIpe2EuYWRkRXZlbnRMaXN0ZW5lcihiLGMsITEpfSl9ZnVuY3Rpb24gdShhLGIsYyl7bSh4KGIpLGZ1bmN0aW9uKGIpe2EucmVtb3ZlRXZlbnRMaXN0ZW5lcihiLGMsITEpfSl9ZnVuY3Rpb24gdihhLGIpe2Zvcig7YTspe2lmKGE9PWIpcmV0dXJuITA7YT1hLnBhcmVudE5vZGV9cmV0dXJuITF9ZnVuY3Rpb24gdyhhLGIpe3JldHVybiBhLmluZGV4T2YoYik+LTF9ZnVuY3Rpb24geChhKXtyZXR1cm4gYS50cmltKCkuc3BsaXQoL1xccysvZyl9ZnVuY3Rpb24geShhLGIsYyl7aWYoYS5pbmRleE9mJiYhYylyZXR1cm4gYS5pbmRleE9mKGIpO2Zvcih2YXIgZD0wO2Q8YS5sZW5ndGg7KXtpZihjJiZhW2RdW2NdPT1ifHwhYyYmYVtkXT09PWIpcmV0dXJuIGQ7ZCsrfXJldHVybi0xfWZ1bmN0aW9uIHooYSl7cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGEsMCl9ZnVuY3Rpb24gQShhLGIsYyl7Zm9yKHZhciBkPVtdLGU9W10sZj0wO2Y8YS5sZW5ndGg7KXt2YXIgZz1iP2FbZl1bYl06YVtmXTt5KGUsZyk8MCYmZC5wdXNoKGFbZl0pLGVbZl09ZyxmKyt9cmV0dXJuIGMmJihkPWI/ZC5zb3J0KGZ1bmN0aW9uKGEsYyl7cmV0dXJuIGFbYl0+Y1tiXX0pOmQuc29ydCgpKSxkfWZ1bmN0aW9uIEIoYSxiKXtmb3IodmFyIGMsZixnPWJbMF0udG9VcHBlckNhc2UoKStiLnNsaWNlKDEpLGg9MDtoPGUubGVuZ3RoOyl7aWYoYz1lW2hdLGY9Yz9jK2c6YixmIGluIGEpcmV0dXJuIGY7aCsrfXJldHVybiBkfWZ1bmN0aW9uIEQoKXtyZXR1cm4gQysrfWZ1bmN0aW9uIEUoYSl7dmFyIGI9YS5vd25lckRvY3VtZW50O3JldHVybiBiLmRlZmF1bHRWaWV3fHxiLnBhcmVudFdpbmRvd31mdW5jdGlvbiBhYihhLGIpe3ZhciBjPXRoaXM7dGhpcy5tYW5hZ2VyPWEsdGhpcy5jYWxsYmFjaz1iLHRoaXMuZWxlbWVudD1hLmVsZW1lbnQsdGhpcy50YXJnZXQ9YS5vcHRpb25zLmlucHV0VGFyZ2V0LHRoaXMuZG9tSGFuZGxlcj1mdW5jdGlvbihiKXtyKGEub3B0aW9ucy5lbmFibGUsW2FdKSYmYy5oYW5kbGVyKGIpfSx0aGlzLmluaXQoKX1mdW5jdGlvbiBiYihhKXt2YXIgYixjPWEub3B0aW9ucy5pbnB1dENsYXNzO3JldHVybiBiPWM/YzpIP3diOkk/RWI6Rz9HYjpyYixuZXcgYihhLGNiKX1mdW5jdGlvbiBjYihhLGIsYyl7dmFyIGQ9Yy5wb2ludGVycy5sZW5ndGgsZT1jLmNoYW5nZWRQb2ludGVycy5sZW5ndGgsZj1iJk8mJjA9PT1kLWUsZz1iJihRfFIpJiYwPT09ZC1lO2MuaXNGaXJzdD0hIWYsYy5pc0ZpbmFsPSEhZyxmJiYoYS5zZXNzaW9uPXt9KSxjLmV2ZW50VHlwZT1iLGRiKGEsYyksYS5lbWl0KFwiaGFtbWVyLmlucHV0XCIsYyksYS5yZWNvZ25pemUoYyksYS5zZXNzaW9uLnByZXZJbnB1dD1jfWZ1bmN0aW9uIGRiKGEsYil7dmFyIGM9YS5zZXNzaW9uLGQ9Yi5wb2ludGVycyxlPWQubGVuZ3RoO2MuZmlyc3RJbnB1dHx8KGMuZmlyc3RJbnB1dD1nYihiKSksZT4xJiYhYy5maXJzdE11bHRpcGxlP2MuZmlyc3RNdWx0aXBsZT1nYihiKToxPT09ZSYmKGMuZmlyc3RNdWx0aXBsZT0hMSk7dmFyIGY9Yy5maXJzdElucHV0LGc9Yy5maXJzdE11bHRpcGxlLGg9Zz9nLmNlbnRlcjpmLmNlbnRlcixpPWIuY2VudGVyPWhiKGQpO2IudGltZVN0YW1wPWooKSxiLmRlbHRhVGltZT1iLnRpbWVTdGFtcC1mLnRpbWVTdGFtcCxiLmFuZ2xlPWxiKGgsaSksYi5kaXN0YW5jZT1rYihoLGkpLGViKGMsYiksYi5vZmZzZXREaXJlY3Rpb249amIoYi5kZWx0YVgsYi5kZWx0YVkpLGIuc2NhbGU9Zz9uYihnLnBvaW50ZXJzLGQpOjEsYi5yb3RhdGlvbj1nP21iKGcucG9pbnRlcnMsZCk6MCxmYihjLGIpO3ZhciBrPWEuZWxlbWVudDt2KGIuc3JjRXZlbnQudGFyZ2V0LGspJiYoaz1iLnNyY0V2ZW50LnRhcmdldCksYi50YXJnZXQ9a31mdW5jdGlvbiBlYihhLGIpe3ZhciBjPWIuY2VudGVyLGQ9YS5vZmZzZXREZWx0YXx8e30sZT1hLnByZXZEZWx0YXx8e30sZj1hLnByZXZJbnB1dHx8e307KGIuZXZlbnRUeXBlPT09T3x8Zi5ldmVudFR5cGU9PT1RKSYmKGU9YS5wcmV2RGVsdGE9e3g6Zi5kZWx0YVh8fDAseTpmLmRlbHRhWXx8MH0sZD1hLm9mZnNldERlbHRhPXt4OmMueCx5OmMueX0pLGIuZGVsdGFYPWUueCsoYy54LWQueCksYi5kZWx0YVk9ZS55KyhjLnktZC55KX1mdW5jdGlvbiBmYihhLGIpe3ZhciBmLGcsaCxqLGM9YS5sYXN0SW50ZXJ2YWx8fGIsZT1iLnRpbWVTdGFtcC1jLnRpbWVTdGFtcDtpZihiLmV2ZW50VHlwZSE9UiYmKGU+Tnx8Yy52ZWxvY2l0eT09PWQpKXt2YXIgaz1jLmRlbHRhWC1iLmRlbHRhWCxsPWMuZGVsdGFZLWIuZGVsdGFZLG09aWIoZSxrLGwpO2c9bS54LGg9bS55LGY9aShtLngpPmkobS55KT9tLng6bS55LGo9amIoayxsKSxhLmxhc3RJbnRlcnZhbD1ifWVsc2UgZj1jLnZlbG9jaXR5LGc9Yy52ZWxvY2l0eVgsaD1jLnZlbG9jaXR5WSxqPWMuZGlyZWN0aW9uO2IudmVsb2NpdHk9ZixiLnZlbG9jaXR5WD1nLGIudmVsb2NpdHlZPWgsYi5kaXJlY3Rpb249an1mdW5jdGlvbiBnYihhKXtmb3IodmFyIGI9W10sYz0wO2M8YS5wb2ludGVycy5sZW5ndGg7KWJbY109e2NsaWVudFg6aChhLnBvaW50ZXJzW2NdLmNsaWVudFgpLGNsaWVudFk6aChhLnBvaW50ZXJzW2NdLmNsaWVudFkpfSxjKys7cmV0dXJue3RpbWVTdGFtcDpqKCkscG9pbnRlcnM6YixjZW50ZXI6aGIoYiksZGVsdGFYOmEuZGVsdGFYLGRlbHRhWTphLmRlbHRhWX19ZnVuY3Rpb24gaGIoYSl7dmFyIGI9YS5sZW5ndGg7aWYoMT09PWIpcmV0dXJue3g6aChhWzBdLmNsaWVudFgpLHk6aChhWzBdLmNsaWVudFkpfTtmb3IodmFyIGM9MCxkPTAsZT0wO2I+ZTspYys9YVtlXS5jbGllbnRYLGQrPWFbZV0uY2xpZW50WSxlKys7cmV0dXJue3g6aChjL2IpLHk6aChkL2IpfX1mdW5jdGlvbiBpYihhLGIsYyl7cmV0dXJue3g6Yi9hfHwwLHk6Yy9hfHwwfX1mdW5jdGlvbiBqYihhLGIpe3JldHVybiBhPT09Yj9TOmkoYSk+PWkoYik/YT4wP1Q6VTpiPjA/VjpXfWZ1bmN0aW9uIGtiKGEsYixjKXtjfHwoYz0kKTt2YXIgZD1iW2NbMF1dLWFbY1swXV0sZT1iW2NbMV1dLWFbY1sxXV07cmV0dXJuIE1hdGguc3FydChkKmQrZSplKX1mdW5jdGlvbiBsYihhLGIsYyl7Y3x8KGM9JCk7dmFyIGQ9YltjWzBdXS1hW2NbMF1dLGU9YltjWzFdXS1hW2NbMV1dO3JldHVybiAxODAqTWF0aC5hdGFuMihlLGQpL01hdGguUEl9ZnVuY3Rpb24gbWIoYSxiKXtyZXR1cm4gbGIoYlsxXSxiWzBdLF8pLWxiKGFbMV0sYVswXSxfKX1mdW5jdGlvbiBuYihhLGIpe3JldHVybiBrYihiWzBdLGJbMV0sXykva2IoYVswXSxhWzFdLF8pfWZ1bmN0aW9uIHJiKCl7dGhpcy5ldkVsPXBiLHRoaXMuZXZXaW49cWIsdGhpcy5hbGxvdz0hMCx0aGlzLnByZXNzZWQ9ITEsYWIuYXBwbHkodGhpcyxhcmd1bWVudHMpfWZ1bmN0aW9uIHdiKCl7dGhpcy5ldkVsPXViLHRoaXMuZXZXaW49dmIsYWIuYXBwbHkodGhpcyxhcmd1bWVudHMpLHRoaXMuc3RvcmU9dGhpcy5tYW5hZ2VyLnNlc3Npb24ucG9pbnRlckV2ZW50cz1bXX1mdW5jdGlvbiBBYigpe3RoaXMuZXZUYXJnZXQ9eWIsdGhpcy5ldldpbj16Yix0aGlzLnN0YXJ0ZWQ9ITEsYWIuYXBwbHkodGhpcyxhcmd1bWVudHMpfWZ1bmN0aW9uIEJiKGEsYil7dmFyIGM9eihhLnRvdWNoZXMpLGQ9eihhLmNoYW5nZWRUb3VjaGVzKTtyZXR1cm4gYiYoUXxSKSYmKGM9QShjLmNvbmNhdChkKSxcImlkZW50aWZpZXJcIiwhMCkpLFtjLGRdfWZ1bmN0aW9uIEViKCl7dGhpcy5ldlRhcmdldD1EYix0aGlzLnRhcmdldElkcz17fSxhYi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9ZnVuY3Rpb24gRmIoYSxiKXt2YXIgYz16KGEudG91Y2hlcyksZD10aGlzLnRhcmdldElkcztpZihiJihPfFApJiYxPT09Yy5sZW5ndGgpcmV0dXJuIGRbY1swXS5pZGVudGlmaWVyXT0hMCxbYyxjXTt2YXIgZSxmLGc9eihhLmNoYW5nZWRUb3VjaGVzKSxoPVtdLGk9dGhpcy50YXJnZXQ7aWYoZj1jLmZpbHRlcihmdW5jdGlvbihhKXtyZXR1cm4gdihhLnRhcmdldCxpKX0pLGI9PT1PKWZvcihlPTA7ZTxmLmxlbmd0aDspZFtmW2VdLmlkZW50aWZpZXJdPSEwLGUrKztmb3IoZT0wO2U8Zy5sZW5ndGg7KWRbZ1tlXS5pZGVudGlmaWVyXSYmaC5wdXNoKGdbZV0pLGImKFF8UikmJmRlbGV0ZSBkW2dbZV0uaWRlbnRpZmllcl0sZSsrO3JldHVybiBoLmxlbmd0aD9bQShmLmNvbmNhdChoKSxcImlkZW50aWZpZXJcIiwhMCksaF06dm9pZCAwfWZ1bmN0aW9uIEdiKCl7YWIuYXBwbHkodGhpcyxhcmd1bWVudHMpO3ZhciBhPXEodGhpcy5oYW5kbGVyLHRoaXMpO3RoaXMudG91Y2g9bmV3IEViKHRoaXMubWFuYWdlcixhKSx0aGlzLm1vdXNlPW5ldyByYih0aGlzLm1hbmFnZXIsYSl9ZnVuY3Rpb24gUGIoYSxiKXt0aGlzLm1hbmFnZXI9YSx0aGlzLnNldChiKX1mdW5jdGlvbiBRYihhKXtpZih3KGEsTWIpKXJldHVybiBNYjt2YXIgYj13KGEsTmIpLGM9dyhhLE9iKTtyZXR1cm4gYiYmYz9OYitcIiBcIitPYjpifHxjP2I/TmI6T2I6dyhhLExiKT9MYjpLYn1mdW5jdGlvbiBZYihhKXt0aGlzLmlkPUQoKSx0aGlzLm1hbmFnZXI9bnVsbCx0aGlzLm9wdGlvbnM9byhhfHx7fSx0aGlzLmRlZmF1bHRzKSx0aGlzLm9wdGlvbnMuZW5hYmxlPXModGhpcy5vcHRpb25zLmVuYWJsZSwhMCksdGhpcy5zdGF0ZT1SYix0aGlzLnNpbXVsdGFuZW91cz17fSx0aGlzLnJlcXVpcmVGYWlsPVtdfWZ1bmN0aW9uIFpiKGEpe3JldHVybiBhJldiP1wiY2FuY2VsXCI6YSZVYj9cImVuZFwiOmEmVGI/XCJtb3ZlXCI6YSZTYj9cInN0YXJ0XCI6XCJcIn1mdW5jdGlvbiAkYihhKXtyZXR1cm4gYT09Vz9cImRvd25cIjphPT1WP1widXBcIjphPT1UP1wibGVmdFwiOmE9PVU/XCJyaWdodFwiOlwiXCJ9ZnVuY3Rpb24gX2IoYSxiKXt2YXIgYz1iLm1hbmFnZXI7cmV0dXJuIGM/Yy5nZXQoYSk6YX1mdW5jdGlvbiBhYygpe1liLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1mdW5jdGlvbiBiYygpe2FjLmFwcGx5KHRoaXMsYXJndW1lbnRzKSx0aGlzLnBYPW51bGwsdGhpcy5wWT1udWxsfWZ1bmN0aW9uIGNjKCl7YWMuYXBwbHkodGhpcyxhcmd1bWVudHMpfWZ1bmN0aW9uIGRjKCl7WWIuYXBwbHkodGhpcyxhcmd1bWVudHMpLHRoaXMuX3RpbWVyPW51bGwsdGhpcy5faW5wdXQ9bnVsbH1mdW5jdGlvbiBlYygpe2FjLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1mdW5jdGlvbiBmYygpe2FjLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1mdW5jdGlvbiBnYygpe1liLmFwcGx5KHRoaXMsYXJndW1lbnRzKSx0aGlzLnBUaW1lPSExLHRoaXMucENlbnRlcj0hMSx0aGlzLl90aW1lcj1udWxsLHRoaXMuX2lucHV0PW51bGwsdGhpcy5jb3VudD0wfWZ1bmN0aW9uIGhjKGEsYil7cmV0dXJuIGI9Ynx8e30sYi5yZWNvZ25pemVycz1zKGIucmVjb2duaXplcnMsaGMuZGVmYXVsdHMucHJlc2V0KSxuZXcga2MoYSxiKX1mdW5jdGlvbiBrYyhhLGIpe2I9Ynx8e30sdGhpcy5vcHRpb25zPW8oYixoYy5kZWZhdWx0cyksdGhpcy5vcHRpb25zLmlucHV0VGFyZ2V0PXRoaXMub3B0aW9ucy5pbnB1dFRhcmdldHx8YSx0aGlzLmhhbmRsZXJzPXt9LHRoaXMuc2Vzc2lvbj17fSx0aGlzLnJlY29nbml6ZXJzPVtdLHRoaXMuZWxlbWVudD1hLHRoaXMuaW5wdXQ9YmIodGhpcyksdGhpcy50b3VjaEFjdGlvbj1uZXcgUGIodGhpcyx0aGlzLm9wdGlvbnMudG91Y2hBY3Rpb24pLGxjKHRoaXMsITApLG0oYi5yZWNvZ25pemVycyxmdW5jdGlvbihhKXt2YXIgYj10aGlzLmFkZChuZXcgYVswXShhWzFdKSk7YVsyXSYmYi5yZWNvZ25pemVXaXRoKGFbMl0pLGFbM10mJmIucmVxdWlyZUZhaWx1cmUoYVszXSl9LHRoaXMpfWZ1bmN0aW9uIGxjKGEsYil7dmFyIGM9YS5lbGVtZW50O20oYS5vcHRpb25zLmNzc1Byb3BzLGZ1bmN0aW9uKGEsZCl7Yy5zdHlsZVtCKGMuc3R5bGUsZCldPWI/YTpcIlwifSl9ZnVuY3Rpb24gbWMoYSxjKXt2YXIgZD1iLmNyZWF0ZUV2ZW50KFwiRXZlbnRcIik7ZC5pbml0RXZlbnQoYSwhMCwhMCksZC5nZXN0dXJlPWMsYy50YXJnZXQuZGlzcGF0Y2hFdmVudChkKX12YXIgZT1bXCJcIixcIndlYmtpdFwiLFwibW96XCIsXCJNU1wiLFwibXNcIixcIm9cIl0sZj1iLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksZz1cImZ1bmN0aW9uXCIsaD1NYXRoLnJvdW5kLGk9TWF0aC5hYnMsaj1EYXRlLm5vdyxDPTEsRj0vbW9iaWxlfHRhYmxldHxpcChhZHxob25lfG9kKXxhbmRyb2lkL2ksRz1cIm9udG91Y2hzdGFydFwiaW4gYSxIPUIoYSxcIlBvaW50ZXJFdmVudFwiKSE9PWQsST1HJiZGLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCksSj1cInRvdWNoXCIsSz1cInBlblwiLEw9XCJtb3VzZVwiLE09XCJraW5lY3RcIixOPTI1LE89MSxQPTIsUT00LFI9OCxTPTEsVD0yLFU9NCxWPTgsVz0xNixYPVR8VSxZPVZ8VyxaPVh8WSwkPVtcInhcIixcInlcIl0sXz1bXCJjbGllbnRYXCIsXCJjbGllbnRZXCJdO2FiLnByb3RvdHlwZT17aGFuZGxlcjpmdW5jdGlvbigpe30saW5pdDpmdW5jdGlvbigpe3RoaXMuZXZFbCYmdCh0aGlzLmVsZW1lbnQsdGhpcy5ldkVsLHRoaXMuZG9tSGFuZGxlciksdGhpcy5ldlRhcmdldCYmdCh0aGlzLnRhcmdldCx0aGlzLmV2VGFyZ2V0LHRoaXMuZG9tSGFuZGxlciksdGhpcy5ldldpbiYmdChFKHRoaXMuZWxlbWVudCksdGhpcy5ldldpbix0aGlzLmRvbUhhbmRsZXIpfSxkZXN0cm95OmZ1bmN0aW9uKCl7dGhpcy5ldkVsJiZ1KHRoaXMuZWxlbWVudCx0aGlzLmV2RWwsdGhpcy5kb21IYW5kbGVyKSx0aGlzLmV2VGFyZ2V0JiZ1KHRoaXMudGFyZ2V0LHRoaXMuZXZUYXJnZXQsdGhpcy5kb21IYW5kbGVyKSx0aGlzLmV2V2luJiZ1KEUodGhpcy5lbGVtZW50KSx0aGlzLmV2V2luLHRoaXMuZG9tSGFuZGxlcil9fTt2YXIgb2I9e21vdXNlZG93bjpPLG1vdXNlbW92ZTpQLG1vdXNldXA6UX0scGI9XCJtb3VzZWRvd25cIixxYj1cIm1vdXNlbW92ZSBtb3VzZXVwXCI7cChyYixhYix7aGFuZGxlcjpmdW5jdGlvbihhKXt2YXIgYj1vYlthLnR5cGVdO2ImTyYmMD09PWEuYnV0dG9uJiYodGhpcy5wcmVzc2VkPSEwKSxiJlAmJjEhPT1hLndoaWNoJiYoYj1RKSx0aGlzLnByZXNzZWQmJnRoaXMuYWxsb3cmJihiJlEmJih0aGlzLnByZXNzZWQ9ITEpLHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLGIse3BvaW50ZXJzOlthXSxjaGFuZ2VkUG9pbnRlcnM6W2FdLHBvaW50ZXJUeXBlOkwsc3JjRXZlbnQ6YX0pKX19KTt2YXIgc2I9e3BvaW50ZXJkb3duOk8scG9pbnRlcm1vdmU6UCxwb2ludGVydXA6USxwb2ludGVyY2FuY2VsOlIscG9pbnRlcm91dDpSfSx0Yj17MjpKLDM6Syw0OkwsNTpNfSx1Yj1cInBvaW50ZXJkb3duXCIsdmI9XCJwb2ludGVybW92ZSBwb2ludGVydXAgcG9pbnRlcmNhbmNlbFwiO2EuTVNQb2ludGVyRXZlbnQmJih1Yj1cIk1TUG9pbnRlckRvd25cIix2Yj1cIk1TUG9pbnRlck1vdmUgTVNQb2ludGVyVXAgTVNQb2ludGVyQ2FuY2VsXCIpLHAod2IsYWIse2hhbmRsZXI6ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5zdG9yZSxjPSExLGQ9YS50eXBlLnRvTG93ZXJDYXNlKCkucmVwbGFjZShcIm1zXCIsXCJcIiksZT1zYltkXSxmPXRiW2EucG9pbnRlclR5cGVdfHxhLnBvaW50ZXJUeXBlLGc9Zj09SixoPXkoYixhLnBvaW50ZXJJZCxcInBvaW50ZXJJZFwiKTtlJk8mJigwPT09YS5idXR0b258fGcpPzA+aCYmKGIucHVzaChhKSxoPWIubGVuZ3RoLTEpOmUmKFF8UikmJihjPSEwKSwwPmh8fChiW2hdPWEsdGhpcy5jYWxsYmFjayh0aGlzLm1hbmFnZXIsZSx7cG9pbnRlcnM6YixjaGFuZ2VkUG9pbnRlcnM6W2FdLHBvaW50ZXJUeXBlOmYsc3JjRXZlbnQ6YX0pLGMmJmIuc3BsaWNlKGgsMSkpfX0pO3ZhciB4Yj17dG91Y2hzdGFydDpPLHRvdWNobW92ZTpQLHRvdWNoZW5kOlEsdG91Y2hjYW5jZWw6Un0seWI9XCJ0b3VjaHN0YXJ0XCIsemI9XCJ0b3VjaHN0YXJ0IHRvdWNobW92ZSB0b3VjaGVuZCB0b3VjaGNhbmNlbFwiO3AoQWIsYWIse2hhbmRsZXI6ZnVuY3Rpb24oYSl7dmFyIGI9eGJbYS50eXBlXTtpZihiPT09TyYmKHRoaXMuc3RhcnRlZD0hMCksdGhpcy5zdGFydGVkKXt2YXIgYz1CYi5jYWxsKHRoaXMsYSxiKTtiJihRfFIpJiYwPT09Y1swXS5sZW5ndGgtY1sxXS5sZW5ndGgmJih0aGlzLnN0YXJ0ZWQ9ITEpLHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLGIse3BvaW50ZXJzOmNbMF0sY2hhbmdlZFBvaW50ZXJzOmNbMV0scG9pbnRlclR5cGU6SixzcmNFdmVudDphfSl9fX0pO3ZhciBDYj17dG91Y2hzdGFydDpPLHRvdWNobW92ZTpQLHRvdWNoZW5kOlEsdG91Y2hjYW5jZWw6Un0sRGI9XCJ0b3VjaHN0YXJ0IHRvdWNobW92ZSB0b3VjaGVuZCB0b3VjaGNhbmNlbFwiO3AoRWIsYWIse2hhbmRsZXI6ZnVuY3Rpb24oYSl7dmFyIGI9Q2JbYS50eXBlXSxjPUZiLmNhbGwodGhpcyxhLGIpO2MmJnRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLGIse3BvaW50ZXJzOmNbMF0sY2hhbmdlZFBvaW50ZXJzOmNbMV0scG9pbnRlclR5cGU6SixzcmNFdmVudDphfSl9fSkscChHYixhYix7aGFuZGxlcjpmdW5jdGlvbihhLGIsYyl7dmFyIGQ9Yy5wb2ludGVyVHlwZT09SixlPWMucG9pbnRlclR5cGU9PUw7aWYoZCl0aGlzLm1vdXNlLmFsbG93PSExO2Vsc2UgaWYoZSYmIXRoaXMubW91c2UuYWxsb3cpcmV0dXJuO2ImKFF8UikmJih0aGlzLm1vdXNlLmFsbG93PSEwKSx0aGlzLmNhbGxiYWNrKGEsYixjKX0sZGVzdHJveTpmdW5jdGlvbigpe3RoaXMudG91Y2guZGVzdHJveSgpLHRoaXMubW91c2UuZGVzdHJveSgpfX0pO3ZhciBIYj1CKGYuc3R5bGUsXCJ0b3VjaEFjdGlvblwiKSxJYj1IYiE9PWQsSmI9XCJjb21wdXRlXCIsS2I9XCJhdXRvXCIsTGI9XCJtYW5pcHVsYXRpb25cIixNYj1cIm5vbmVcIixOYj1cInBhbi14XCIsT2I9XCJwYW4teVwiO1BiLnByb3RvdHlwZT17c2V0OmZ1bmN0aW9uKGEpe2E9PUpiJiYoYT10aGlzLmNvbXB1dGUoKSksSWImJih0aGlzLm1hbmFnZXIuZWxlbWVudC5zdHlsZVtIYl09YSksdGhpcy5hY3Rpb25zPWEudG9Mb3dlckNhc2UoKS50cmltKCl9LHVwZGF0ZTpmdW5jdGlvbigpe3RoaXMuc2V0KHRoaXMubWFuYWdlci5vcHRpb25zLnRvdWNoQWN0aW9uKX0sY29tcHV0ZTpmdW5jdGlvbigpe3ZhciBhPVtdO3JldHVybiBtKHRoaXMubWFuYWdlci5yZWNvZ25pemVycyxmdW5jdGlvbihiKXtyKGIub3B0aW9ucy5lbmFibGUsW2JdKSYmKGE9YS5jb25jYXQoYi5nZXRUb3VjaEFjdGlvbigpKSl9KSxRYihhLmpvaW4oXCIgXCIpKX0scHJldmVudERlZmF1bHRzOmZ1bmN0aW9uKGEpe2lmKCFJYil7dmFyIGI9YS5zcmNFdmVudCxjPWEub2Zmc2V0RGlyZWN0aW9uO2lmKHRoaXMubWFuYWdlci5zZXNzaW9uLnByZXZlbnRlZClyZXR1cm4gYi5wcmV2ZW50RGVmYXVsdCgpLHZvaWQgMDt2YXIgZD10aGlzLmFjdGlvbnMsZT13KGQsTWIpLGY9dyhkLE9iKSxnPXcoZCxOYik7cmV0dXJuIGV8fGYmJmMmWHx8ZyYmYyZZP3RoaXMucHJldmVudFNyYyhiKTp2b2lkIDB9fSxwcmV2ZW50U3JjOmZ1bmN0aW9uKGEpe3RoaXMubWFuYWdlci5zZXNzaW9uLnByZXZlbnRlZD0hMCxhLnByZXZlbnREZWZhdWx0KCl9fTt2YXIgUmI9MSxTYj0yLFRiPTQsVWI9OCxWYj1VYixXYj0xNixYYj0zMjtZYi5wcm90b3R5cGU9e2RlZmF1bHRzOnt9LHNldDpmdW5jdGlvbihhKXtyZXR1cm4gbih0aGlzLm9wdGlvbnMsYSksdGhpcy5tYW5hZ2VyJiZ0aGlzLm1hbmFnZXIudG91Y2hBY3Rpb24udXBkYXRlKCksdGhpc30scmVjb2duaXplV2l0aDpmdW5jdGlvbihhKXtpZihsKGEsXCJyZWNvZ25pemVXaXRoXCIsdGhpcykpcmV0dXJuIHRoaXM7dmFyIGI9dGhpcy5zaW11bHRhbmVvdXM7cmV0dXJuIGE9X2IoYSx0aGlzKSxiW2EuaWRdfHwoYlthLmlkXT1hLGEucmVjb2duaXplV2l0aCh0aGlzKSksdGhpc30sZHJvcFJlY29nbml6ZVdpdGg6ZnVuY3Rpb24oYSl7cmV0dXJuIGwoYSxcImRyb3BSZWNvZ25pemVXaXRoXCIsdGhpcyk/dGhpczooYT1fYihhLHRoaXMpLGRlbGV0ZSB0aGlzLnNpbXVsdGFuZW91c1thLmlkXSx0aGlzKX0scmVxdWlyZUZhaWx1cmU6ZnVuY3Rpb24oYSl7aWYobChhLFwicmVxdWlyZUZhaWx1cmVcIix0aGlzKSlyZXR1cm4gdGhpczt2YXIgYj10aGlzLnJlcXVpcmVGYWlsO3JldHVybiBhPV9iKGEsdGhpcyksLTE9PT15KGIsYSkmJihiLnB1c2goYSksYS5yZXF1aXJlRmFpbHVyZSh0aGlzKSksdGhpc30sZHJvcFJlcXVpcmVGYWlsdXJlOmZ1bmN0aW9uKGEpe2lmKGwoYSxcImRyb3BSZXF1aXJlRmFpbHVyZVwiLHRoaXMpKXJldHVybiB0aGlzO2E9X2IoYSx0aGlzKTt2YXIgYj15KHRoaXMucmVxdWlyZUZhaWwsYSk7cmV0dXJuIGI+LTEmJnRoaXMucmVxdWlyZUZhaWwuc3BsaWNlKGIsMSksdGhpc30saGFzUmVxdWlyZUZhaWx1cmVzOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucmVxdWlyZUZhaWwubGVuZ3RoPjB9LGNhblJlY29nbml6ZVdpdGg6ZnVuY3Rpb24oYSl7cmV0dXJuISF0aGlzLnNpbXVsdGFuZW91c1thLmlkXX0sZW1pdDpmdW5jdGlvbihhKXtmdW5jdGlvbiBkKGQpe2IubWFuYWdlci5lbWl0KGIub3B0aW9ucy5ldmVudCsoZD9aYihjKTpcIlwiKSxhKX12YXIgYj10aGlzLGM9dGhpcy5zdGF0ZTtVYj5jJiZkKCEwKSxkKCksYz49VWImJmQoITApfSx0cnlFbWl0OmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLmNhbkVtaXQoKT90aGlzLmVtaXQoYSk6KHRoaXMuc3RhdGU9WGIsdm9pZCAwKX0sY2FuRW1pdDpmdW5jdGlvbigpe2Zvcih2YXIgYT0wO2E8dGhpcy5yZXF1aXJlRmFpbC5sZW5ndGg7KXtpZighKHRoaXMucmVxdWlyZUZhaWxbYV0uc3RhdGUmKFhifFJiKSkpcmV0dXJuITE7YSsrfXJldHVybiEwfSxyZWNvZ25pemU6ZnVuY3Rpb24oYSl7dmFyIGI9bih7fSxhKTtyZXR1cm4gcih0aGlzLm9wdGlvbnMuZW5hYmxlLFt0aGlzLGJdKT8odGhpcy5zdGF0ZSYoVmJ8V2J8WGIpJiYodGhpcy5zdGF0ZT1SYiksdGhpcy5zdGF0ZT10aGlzLnByb2Nlc3MoYiksdGhpcy5zdGF0ZSYoU2J8VGJ8VWJ8V2IpJiZ0aGlzLnRyeUVtaXQoYiksdm9pZCAwKToodGhpcy5yZXNldCgpLHRoaXMuc3RhdGU9WGIsdm9pZCAwKX0scHJvY2VzczpmdW5jdGlvbigpe30sZ2V0VG91Y2hBY3Rpb246ZnVuY3Rpb24oKXt9LHJlc2V0OmZ1bmN0aW9uKCl7fX0scChhYyxZYix7ZGVmYXVsdHM6e3BvaW50ZXJzOjF9LGF0dHJUZXN0OmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMub3B0aW9ucy5wb2ludGVycztyZXR1cm4gMD09PWJ8fGEucG9pbnRlcnMubGVuZ3RoPT09Yn0scHJvY2VzczpmdW5jdGlvbihhKXt2YXIgYj10aGlzLnN0YXRlLGM9YS5ldmVudFR5cGUsZD1iJihTYnxUYiksZT10aGlzLmF0dHJUZXN0KGEpO3JldHVybiBkJiYoYyZSfHwhZSk/YnxXYjpkfHxlP2MmUT9ifFViOmImU2I/YnxUYjpTYjpYYn19KSxwKGJjLGFjLHtkZWZhdWx0czp7ZXZlbnQ6XCJwYW5cIix0aHJlc2hvbGQ6MTAscG9pbnRlcnM6MSxkaXJlY3Rpb246Wn0sZ2V0VG91Y2hBY3Rpb246ZnVuY3Rpb24oKXt2YXIgYT10aGlzLm9wdGlvbnMuZGlyZWN0aW9uLGI9W107cmV0dXJuIGEmWCYmYi5wdXNoKE9iKSxhJlkmJmIucHVzaChOYiksYn0sZGlyZWN0aW9uVGVzdDpmdW5jdGlvbihhKXt2YXIgYj10aGlzLm9wdGlvbnMsYz0hMCxkPWEuZGlzdGFuY2UsZT1hLmRpcmVjdGlvbixmPWEuZGVsdGFYLGc9YS5kZWx0YVk7cmV0dXJuIGUmYi5kaXJlY3Rpb258fChiLmRpcmVjdGlvbiZYPyhlPTA9PT1mP1M6MD5mP1Q6VSxjPWYhPXRoaXMucFgsZD1NYXRoLmFicyhhLmRlbHRhWCkpOihlPTA9PT1nP1M6MD5nP1Y6VyxjPWchPXRoaXMucFksZD1NYXRoLmFicyhhLmRlbHRhWSkpKSxhLmRpcmVjdGlvbj1lLGMmJmQ+Yi50aHJlc2hvbGQmJmUmYi5kaXJlY3Rpb259LGF0dHJUZXN0OmZ1bmN0aW9uKGEpe3JldHVybiBhYy5wcm90b3R5cGUuYXR0clRlc3QuY2FsbCh0aGlzLGEpJiYodGhpcy5zdGF0ZSZTYnx8ISh0aGlzLnN0YXRlJlNiKSYmdGhpcy5kaXJlY3Rpb25UZXN0KGEpKX0sZW1pdDpmdW5jdGlvbihhKXt0aGlzLnBYPWEuZGVsdGFYLHRoaXMucFk9YS5kZWx0YVk7dmFyIGI9JGIoYS5kaXJlY3Rpb24pO2ImJnRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCtiLGEpLHRoaXMuX3N1cGVyLmVtaXQuY2FsbCh0aGlzLGEpfX0pLHAoY2MsYWMse2RlZmF1bHRzOntldmVudDpcInBpbmNoXCIsdGhyZXNob2xkOjAscG9pbnRlcnM6Mn0sZ2V0VG91Y2hBY3Rpb246ZnVuY3Rpb24oKXtyZXR1cm5bTWJdfSxhdHRyVGVzdDpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5fc3VwZXIuYXR0clRlc3QuY2FsbCh0aGlzLGEpJiYoTWF0aC5hYnMoYS5zY2FsZS0xKT50aGlzLm9wdGlvbnMudGhyZXNob2xkfHx0aGlzLnN0YXRlJlNiKX0sZW1pdDpmdW5jdGlvbihhKXtpZih0aGlzLl9zdXBlci5lbWl0LmNhbGwodGhpcyxhKSwxIT09YS5zY2FsZSl7dmFyIGI9YS5zY2FsZTwxP1wiaW5cIjpcIm91dFwiO3RoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCtiLGEpfX19KSxwKGRjLFliLHtkZWZhdWx0czp7ZXZlbnQ6XCJwcmVzc1wiLHBvaW50ZXJzOjEsdGltZTo1MDAsdGhyZXNob2xkOjV9LGdldFRvdWNoQWN0aW9uOmZ1bmN0aW9uKCl7cmV0dXJuW0tiXX0scHJvY2VzczpmdW5jdGlvbihhKXt2YXIgYj10aGlzLm9wdGlvbnMsYz1hLnBvaW50ZXJzLmxlbmd0aD09PWIucG9pbnRlcnMsZD1hLmRpc3RhbmNlPGIudGhyZXNob2xkLGU9YS5kZWx0YVRpbWU+Yi50aW1lO2lmKHRoaXMuX2lucHV0PWEsIWR8fCFjfHxhLmV2ZW50VHlwZSYoUXxSKSYmIWUpdGhpcy5yZXNldCgpO2Vsc2UgaWYoYS5ldmVudFR5cGUmTyl0aGlzLnJlc2V0KCksdGhpcy5fdGltZXI9ayhmdW5jdGlvbigpe3RoaXMuc3RhdGU9VmIsdGhpcy50cnlFbWl0KCl9LGIudGltZSx0aGlzKTtlbHNlIGlmKGEuZXZlbnRUeXBlJlEpcmV0dXJuIFZiO3JldHVybiBYYn0scmVzZXQ6ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpfSxlbWl0OmZ1bmN0aW9uKGEpe3RoaXMuc3RhdGU9PT1WYiYmKGEmJmEuZXZlbnRUeXBlJlE/dGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50K1widXBcIixhKToodGhpcy5faW5wdXQudGltZVN0YW1wPWooKSx0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQsdGhpcy5faW5wdXQpKSl9fSkscChlYyxhYyx7ZGVmYXVsdHM6e2V2ZW50Olwicm90YXRlXCIsdGhyZXNob2xkOjAscG9pbnRlcnM6Mn0sZ2V0VG91Y2hBY3Rpb246ZnVuY3Rpb24oKXtyZXR1cm5bTWJdfSxhdHRyVGVzdDpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5fc3VwZXIuYXR0clRlc3QuY2FsbCh0aGlzLGEpJiYoTWF0aC5hYnMoYS5yb3RhdGlvbik+dGhpcy5vcHRpb25zLnRocmVzaG9sZHx8dGhpcy5zdGF0ZSZTYil9fSkscChmYyxhYyx7ZGVmYXVsdHM6e2V2ZW50Olwic3dpcGVcIix0aHJlc2hvbGQ6MTAsdmVsb2NpdHk6LjY1LGRpcmVjdGlvbjpYfFkscG9pbnRlcnM6MX0sZ2V0VG91Y2hBY3Rpb246ZnVuY3Rpb24oKXtyZXR1cm4gYmMucHJvdG90eXBlLmdldFRvdWNoQWN0aW9uLmNhbGwodGhpcyl9LGF0dHJUZXN0OmZ1bmN0aW9uKGEpe3ZhciBjLGI9dGhpcy5vcHRpb25zLmRpcmVjdGlvbjtyZXR1cm4gYiYoWHxZKT9jPWEudmVsb2NpdHk6YiZYP2M9YS52ZWxvY2l0eVg6YiZZJiYoYz1hLnZlbG9jaXR5WSksdGhpcy5fc3VwZXIuYXR0clRlc3QuY2FsbCh0aGlzLGEpJiZiJmEuZGlyZWN0aW9uJiZhLmRpc3RhbmNlPnRoaXMub3B0aW9ucy50aHJlc2hvbGQmJmkoYyk+dGhpcy5vcHRpb25zLnZlbG9jaXR5JiZhLmV2ZW50VHlwZSZRfSxlbWl0OmZ1bmN0aW9uKGEpe3ZhciBiPSRiKGEuZGlyZWN0aW9uKTtiJiZ0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQrYixhKSx0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQsYSl9fSkscChnYyxZYix7ZGVmYXVsdHM6e2V2ZW50OlwidGFwXCIscG9pbnRlcnM6MSx0YXBzOjEsaW50ZXJ2YWw6MzAwLHRpbWU6MjUwLHRocmVzaG9sZDoyLHBvc1RocmVzaG9sZDoxMH0sZ2V0VG91Y2hBY3Rpb246ZnVuY3Rpb24oKXtyZXR1cm5bTGJdfSxwcm9jZXNzOmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMub3B0aW9ucyxjPWEucG9pbnRlcnMubGVuZ3RoPT09Yi5wb2ludGVycyxkPWEuZGlzdGFuY2U8Yi50aHJlc2hvbGQsZT1hLmRlbHRhVGltZTxiLnRpbWU7aWYodGhpcy5yZXNldCgpLGEuZXZlbnRUeXBlJk8mJjA9PT10aGlzLmNvdW50KXJldHVybiB0aGlzLmZhaWxUaW1lb3V0KCk7aWYoZCYmZSYmYyl7aWYoYS5ldmVudFR5cGUhPVEpcmV0dXJuIHRoaXMuZmFpbFRpbWVvdXQoKTt2YXIgZj10aGlzLnBUaW1lP2EudGltZVN0YW1wLXRoaXMucFRpbWU8Yi5pbnRlcnZhbDohMCxnPSF0aGlzLnBDZW50ZXJ8fGtiKHRoaXMucENlbnRlcixhLmNlbnRlcik8Yi5wb3NUaHJlc2hvbGQ7dGhpcy5wVGltZT1hLnRpbWVTdGFtcCx0aGlzLnBDZW50ZXI9YS5jZW50ZXIsZyYmZj90aGlzLmNvdW50Kz0xOnRoaXMuY291bnQ9MSx0aGlzLl9pbnB1dD1hO3ZhciBoPXRoaXMuY291bnQlYi50YXBzO2lmKDA9PT1oKXJldHVybiB0aGlzLmhhc1JlcXVpcmVGYWlsdXJlcygpPyh0aGlzLl90aW1lcj1rKGZ1bmN0aW9uKCl7dGhpcy5zdGF0ZT1WYix0aGlzLnRyeUVtaXQoKX0sYi5pbnRlcnZhbCx0aGlzKSxTYik6VmJ9cmV0dXJuIFhifSxmYWlsVGltZW91dDpmdW5jdGlvbigpe3JldHVybiB0aGlzLl90aW1lcj1rKGZ1bmN0aW9uKCl7dGhpcy5zdGF0ZT1YYn0sdGhpcy5vcHRpb25zLmludGVydmFsLHRoaXMpLFhifSxyZXNldDpmdW5jdGlvbigpe2NsZWFyVGltZW91dCh0aGlzLl90aW1lcil9LGVtaXQ6ZnVuY3Rpb24oKXt0aGlzLnN0YXRlPT1WYiYmKHRoaXMuX2lucHV0LnRhcENvdW50PXRoaXMuY291bnQsdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50LHRoaXMuX2lucHV0KSl9fSksaGMuVkVSU0lPTj1cIjIuMC40XCIsaGMuZGVmYXVsdHM9e2RvbUV2ZW50czohMSx0b3VjaEFjdGlvbjpKYixlbmFibGU6ITAsaW5wdXRUYXJnZXQ6bnVsbCxpbnB1dENsYXNzOm51bGwscHJlc2V0OltbZWMse2VuYWJsZTohMX1dLFtjYyx7ZW5hYmxlOiExfSxbXCJyb3RhdGVcIl1dLFtmYyx7ZGlyZWN0aW9uOlh9XSxbYmMse2RpcmVjdGlvbjpYfSxbXCJzd2lwZVwiXV0sW2djXSxbZ2Mse2V2ZW50OlwiZG91YmxldGFwXCIsdGFwczoyfSxbXCJ0YXBcIl1dLFtkY11dLGNzc1Byb3BzOnt1c2VyU2VsZWN0OlwiZGVmYXVsdFwiLHRvdWNoU2VsZWN0Olwibm9uZVwiLHRvdWNoQ2FsbG91dDpcIm5vbmVcIixjb250ZW50Wm9vbWluZzpcIm5vbmVcIix1c2VyRHJhZzpcIm5vbmVcIix0YXBIaWdobGlnaHRDb2xvcjpcInJnYmEoMCwwLDAsMClcIn19O3ZhciBpYz0xLGpjPTI7a2MucHJvdG90eXBlPXtzZXQ6ZnVuY3Rpb24oYSl7cmV0dXJuIG4odGhpcy5vcHRpb25zLGEpLGEudG91Y2hBY3Rpb24mJnRoaXMudG91Y2hBY3Rpb24udXBkYXRlKCksYS5pbnB1dFRhcmdldCYmKHRoaXMuaW5wdXQuZGVzdHJveSgpLHRoaXMuaW5wdXQudGFyZ2V0PWEuaW5wdXRUYXJnZXQsdGhpcy5pbnB1dC5pbml0KCkpLHRoaXN9LHN0b3A6ZnVuY3Rpb24oYSl7dGhpcy5zZXNzaW9uLnN0b3BwZWQ9YT9qYzppY30scmVjb2duaXplOmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMuc2Vzc2lvbjtpZighYi5zdG9wcGVkKXt0aGlzLnRvdWNoQWN0aW9uLnByZXZlbnREZWZhdWx0cyhhKTt2YXIgYyxkPXRoaXMucmVjb2duaXplcnMsZT1iLmN1clJlY29nbml6ZXI7KCFlfHxlJiZlLnN0YXRlJlZiKSYmKGU9Yi5jdXJSZWNvZ25pemVyPW51bGwpO2Zvcih2YXIgZj0wO2Y8ZC5sZW5ndGg7KWM9ZFtmXSxiLnN0b3BwZWQ9PT1qY3x8ZSYmYyE9ZSYmIWMuY2FuUmVjb2duaXplV2l0aChlKT9jLnJlc2V0KCk6Yy5yZWNvZ25pemUoYSksIWUmJmMuc3RhdGUmKFNifFRifFViKSYmKGU9Yi5jdXJSZWNvZ25pemVyPWMpLGYrK319LGdldDpmdW5jdGlvbihhKXtpZihhIGluc3RhbmNlb2YgWWIpcmV0dXJuIGE7Zm9yKHZhciBiPXRoaXMucmVjb2duaXplcnMsYz0wO2M8Yi5sZW5ndGg7YysrKWlmKGJbY10ub3B0aW9ucy5ldmVudD09YSlyZXR1cm4gYltjXTtyZXR1cm4gbnVsbH0sYWRkOmZ1bmN0aW9uKGEpe2lmKGwoYSxcImFkZFwiLHRoaXMpKXJldHVybiB0aGlzO3ZhciBiPXRoaXMuZ2V0KGEub3B0aW9ucy5ldmVudCk7cmV0dXJuIGImJnRoaXMucmVtb3ZlKGIpLHRoaXMucmVjb2duaXplcnMucHVzaChhKSxhLm1hbmFnZXI9dGhpcyx0aGlzLnRvdWNoQWN0aW9uLnVwZGF0ZSgpLGF9LHJlbW92ZTpmdW5jdGlvbihhKXtpZihsKGEsXCJyZW1vdmVcIix0aGlzKSlyZXR1cm4gdGhpczt2YXIgYj10aGlzLnJlY29nbml6ZXJzO3JldHVybiBhPXRoaXMuZ2V0KGEpLGIuc3BsaWNlKHkoYixhKSwxKSx0aGlzLnRvdWNoQWN0aW9uLnVwZGF0ZSgpLHRoaXN9LG9uOmZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcy5oYW5kbGVycztyZXR1cm4gbSh4KGEpLGZ1bmN0aW9uKGEpe2NbYV09Y1thXXx8W10sY1thXS5wdXNoKGIpfSksdGhpc30sb2ZmOmZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcy5oYW5kbGVycztyZXR1cm4gbSh4KGEpLGZ1bmN0aW9uKGEpe2I/Y1thXS5zcGxpY2UoeShjW2FdLGIpLDEpOmRlbGV0ZSBjW2FdfSksdGhpc30sZW1pdDpmdW5jdGlvbihhLGIpe3RoaXMub3B0aW9ucy5kb21FdmVudHMmJm1jKGEsYik7dmFyIGM9dGhpcy5oYW5kbGVyc1thXSYmdGhpcy5oYW5kbGVyc1thXS5zbGljZSgpO2lmKGMmJmMubGVuZ3RoKXtiLnR5cGU9YSxiLnByZXZlbnREZWZhdWx0PWZ1bmN0aW9uKCl7Yi5zcmNFdmVudC5wcmV2ZW50RGVmYXVsdCgpfTtmb3IodmFyIGQ9MDtkPGMubGVuZ3RoOyljW2RdKGIpLGQrK319LGRlc3Ryb3k6ZnVuY3Rpb24oKXt0aGlzLmVsZW1lbnQmJmxjKHRoaXMsITEpLHRoaXMuaGFuZGxlcnM9e30sdGhpcy5zZXNzaW9uPXt9LHRoaXMuaW5wdXQuZGVzdHJveSgpLHRoaXMuZWxlbWVudD1udWxsfX0sbihoYyx7SU5QVVRfU1RBUlQ6TyxJTlBVVF9NT1ZFOlAsSU5QVVRfRU5EOlEsSU5QVVRfQ0FOQ0VMOlIsU1RBVEVfUE9TU0lCTEU6UmIsU1RBVEVfQkVHQU46U2IsU1RBVEVfQ0hBTkdFRDpUYixTVEFURV9FTkRFRDpVYixTVEFURV9SRUNPR05JWkVEOlZiLFNUQVRFX0NBTkNFTExFRDpXYixTVEFURV9GQUlMRUQ6WGIsRElSRUNUSU9OX05PTkU6UyxESVJFQ1RJT05fTEVGVDpULERJUkVDVElPTl9SSUdIVDpVLERJUkVDVElPTl9VUDpWLERJUkVDVElPTl9ET1dOOlcsRElSRUNUSU9OX0hPUklaT05UQUw6WCxESVJFQ1RJT05fVkVSVElDQUw6WSxESVJFQ1RJT05fQUxMOlosTWFuYWdlcjprYyxJbnB1dDphYixUb3VjaEFjdGlvbjpQYixUb3VjaElucHV0OkViLE1vdXNlSW5wdXQ6cmIsUG9pbnRlckV2ZW50SW5wdXQ6d2IsVG91Y2hNb3VzZUlucHV0OkdiLFNpbmdsZVRvdWNoSW5wdXQ6QWIsUmVjb2duaXplcjpZYixBdHRyUmVjb2duaXplcjphYyxUYXA6Z2MsUGFuOmJjLFN3aXBlOmZjLFBpbmNoOmNjLFJvdGF0ZTplYyxQcmVzczpkYyxvbjp0LG9mZjp1LGVhY2g6bSxtZXJnZTpvLGV4dGVuZDpuLGluaGVyaXQ6cCxiaW5kRm46cSxwcmVmaXhlZDpCfSksdHlwZW9mIGRlZmluZT09ZyYmZGVmaW5lLmFtZD9kZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gaGN9KTpcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1oYzphW2NdPWhjfSh3aW5kb3csZG9jdW1lbnQsXCJIYW1tZXJcIik7XG4oZnVuY3Rpb24oZmFjdG9yeSkge1xyXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xyXG4gICAgICAgIGRlZmluZShbJ2pxdWVyeScsICdoYW1tZXJqcyddLCBmYWN0b3J5KTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSwgcmVxdWlyZSgnaGFtbWVyanMnKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZhY3RvcnkoalF1ZXJ5LCBIYW1tZXIpO1xyXG4gICAgfVxyXG59KGZ1bmN0aW9uKCQsIEhhbW1lcikge1xyXG4gICAgZnVuY3Rpb24gaGFtbWVyaWZ5KGVsLCBvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyICRlbCA9ICQoZWwpO1xyXG4gICAgICAgIGlmKCEkZWwuZGF0YShcImhhbW1lclwiKSkge1xyXG4gICAgICAgICAgICAkZWwuZGF0YShcImhhbW1lclwiLCBuZXcgSGFtbWVyKCRlbFswXSwgb3B0aW9ucykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAkLmZuLmhhbW1lciA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBoYW1tZXJpZnkodGhpcywgb3B0aW9ucyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGV4dGVuZCB0aGUgZW1pdCBtZXRob2QgdG8gYWxzbyB0cmlnZ2VyIGpRdWVyeSBldmVudHNcclxuICAgIEhhbW1lci5NYW5hZ2VyLnByb3RvdHlwZS5lbWl0ID0gKGZ1bmN0aW9uKG9yaWdpbmFsRW1pdCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0eXBlLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsRW1pdC5jYWxsKHRoaXMsIHR5cGUsIGRhdGEpO1xyXG4gICAgICAgICAgICAkKHRoaXMuZWxlbWVudCkudHJpZ2dlcih7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICAgICAgZ2VzdHVyZTogZGF0YVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfSkoSGFtbWVyLk1hbmFnZXIucHJvdG90eXBlLmVtaXQpO1xyXG59KSk7XHJcblxuLy8gUmVxdWlyZWQgZm9yIE1ldGVvciBwYWNrYWdlLCB0aGUgdXNlIG9mIHdpbmRvdyBwcmV2ZW50cyBleHBvcnQgYnkgTWV0ZW9yXHJcbihmdW5jdGlvbih3aW5kb3cpe1xyXG4gIGlmKHdpbmRvdy5QYWNrYWdlKXtcclxuICAgIE1hdGVyaWFsaXplID0ge307XHJcbiAgfSBlbHNlIHtcclxuICAgIHdpbmRvdy5NYXRlcmlhbGl6ZSA9IHt9O1xyXG4gIH1cclxufSkod2luZG93KTtcclxuXHJcbmlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcgJiYgIWV4cG9ydHMubm9kZVR5cGUpIHtcclxuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gTWF0ZXJpYWxpemU7XHJcbiAgfVxyXG4gIGV4cG9ydHMuZGVmYXVsdCA9IE1hdGVyaWFsaXplO1xyXG59XHJcblxyXG4vKlxyXG4gKiByYWYuanNcclxuICogaHR0cHM6Ly9naXRodWIuY29tL25ncnltYW4vcmFmLmpzXHJcbiAqXHJcbiAqIG9yaWdpbmFsIHJlcXVlc3RBbmltYXRpb25GcmFtZSBwb2x5ZmlsbCBieSBFcmlrIE3DtmxsZXJcclxuICogaW5zcGlyZWQgZnJvbSBwYXVsX2lyaXNoIGdpc3QgYW5kIHBvc3RcclxuICpcclxuICogQ29weXJpZ2h0IChjKSAyMDEzIG5ncnltYW5cclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxyXG4gKi9cclxuKGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gIHZhciBsYXN0VGltZSA9IDAsXHJcbiAgICB2ZW5kb3JzID0gWyd3ZWJraXQnLCAnbW96J10sXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lLFxyXG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUsXHJcbiAgICBpID0gdmVuZG9ycy5sZW5ndGg7XHJcblxyXG4gIC8vIHRyeSB0byB1bi1wcmVmaXggZXhpc3RpbmcgcmFmXHJcbiAgd2hpbGUgKC0taSA+PSAwICYmICFyZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW2ldICsgJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xyXG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1tpXSArICdDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcclxuICB9XHJcblxyXG4gIC8vIHBvbHlmaWxsIHdpdGggc2V0VGltZW91dCBmYWxsYmFja1xyXG4gIC8vIGhlYXZpbHkgaW5zcGlyZWQgZnJvbSBAZGFyaXVzIGdpc3QgbW9kOiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9wYXVsaXJpc2gvMTU3OTY3MSNjb21tZW50LTgzNzk0NVxyXG4gIGlmICghcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8ICFjYW5jZWxBbmltYXRpb25GcmFtZSkge1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuICAgICAgdmFyIG5vdyA9ICtEYXRlLm5vdygpLFxyXG4gICAgICAgIG5leHRUaW1lID0gTWF0aC5tYXgobGFzdFRpbWUgKyAxNiwgbm93KTtcclxuICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY2FsbGJhY2sobGFzdFRpbWUgPSBuZXh0VGltZSk7XHJcbiAgICAgIH0sIG5leHRUaW1lIC0gbm93KTtcclxuICAgIH07XHJcblxyXG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBjbGVhclRpbWVvdXQ7XHJcbiAgfVxyXG5cclxuICAvLyBleHBvcnQgdG8gd2luZG93XHJcbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZTtcclxuICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBjYW5jZWxBbmltYXRpb25GcmFtZTtcclxufSh3aW5kb3cpKTtcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZSBhcHByb3hpbWF0ZWQgc2VsZWN0b3Igc3RyaW5nIGZvciBhIGpRdWVyeSBvYmplY3RcclxuICogQHBhcmFtIHtqUXVlcnl9IG9iaiAgalF1ZXJ5IG9iamVjdCB0byBiZSBwYXJzZWRcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbk1hdGVyaWFsaXplLm9iamVjdFNlbGVjdG9yU3RyaW5nID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgdmFyIHRhZ1N0ciA9IG9iai5wcm9wKCd0YWdOYW1lJykgfHwgJyc7XHJcbiAgdmFyIGlkU3RyID0gb2JqLmF0dHIoJ2lkJykgfHwgJyc7XHJcbiAgdmFyIGNsYXNzU3RyID0gb2JqLmF0dHIoJ2NsYXNzJykgfHwgJyc7XHJcbiAgcmV0dXJuICh0YWdTdHIgKyBpZFN0ciArIGNsYXNzU3RyKS5yZXBsYWNlKC9cXHMvZywnJyk7XHJcbn07XHJcblxyXG5cclxuLy8gVW5pcXVlIFJhbmRvbSBJRFxyXG5NYXRlcmlhbGl6ZS5ndWlkID0gKGZ1bmN0aW9uKCkge1xyXG4gIGZ1bmN0aW9uIHM0KCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXHJcbiAgICAgIC50b1N0cmluZygxNilcclxuICAgICAgLnN1YnN0cmluZygxKTtcclxuICB9XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgK1xyXG4gICAgICAgICAgIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XHJcbiAgfTtcclxufSkoKTtcclxuXHJcbi8qKlxyXG4gKiBFc2NhcGVzIGhhc2ggZnJvbSBzcGVjaWFsIGNoYXJhY3RlcnNcclxuICogQHBhcmFtIHtzdHJpbmd9IGhhc2ggIFN0cmluZyByZXR1cm5lZCBmcm9tIHRoaXMuaGFzaFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuTWF0ZXJpYWxpemUuZXNjYXBlSGFzaCA9IGZ1bmN0aW9uKGhhc2gpIHtcclxuICByZXR1cm4gaGFzaC5yZXBsYWNlKCAvKDp8XFwufFxcW3xcXF18LHw9KS9nLCBcIlxcXFwkMVwiICk7XHJcbn07XHJcblxyXG5NYXRlcmlhbGl6ZS5lbGVtZW50T3JQYXJlbnRJc0ZpeGVkID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgdmFyICRlbGVtZW50ID0gJChlbGVtZW50KTtcclxuICAgIHZhciAkY2hlY2tFbGVtZW50cyA9ICRlbGVtZW50LmFkZCgkZWxlbWVudC5wYXJlbnRzKCkpO1xyXG4gICAgdmFyIGlzRml4ZWQgPSBmYWxzZTtcclxuICAgICRjaGVja0VsZW1lbnRzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICBpZiAoJCh0aGlzKS5jc3MoXCJwb3NpdGlvblwiKSA9PT0gXCJmaXhlZFwiKSB7XHJcbiAgICAgICAgICAgIGlzRml4ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaXNGaXhlZDtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogR2V0IHRpbWUgaW4gbXNcclxuICogQGxpY2Vuc2UgaHR0cHM6Ly9yYXcuZ2l0aHViLmNvbS9qYXNoa2VuYXMvdW5kZXJzY29yZS9tYXN0ZXIvTElDRU5TRVxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqIEByZXR1cm4ge251bWJlcn1cclxuICovXHJcbnZhciBnZXRUaW1lID0gKERhdGUubm93IHx8IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbn0pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIHdoZW4gaW52b2tlZCwgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBhdCBtb3N0IG9uY2VcclxuICogZHVyaW5nIGEgZ2l2ZW4gd2luZG93IG9mIHRpbWUuIE5vcm1hbGx5LCB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uIHdpbGwgcnVuXHJcbiAqIGFzIG11Y2ggYXMgaXQgY2FuLCB3aXRob3V0IGV2ZXIgZ29pbmcgbW9yZSB0aGFuIG9uY2UgcGVyIGB3YWl0YCBkdXJhdGlvbjtcclxuICogYnV0IGlmIHlvdSdkIGxpa2UgdG8gZGlzYWJsZSB0aGUgZXhlY3V0aW9uIG9uIHRoZSBsZWFkaW5nIGVkZ2UsIHBhc3NcclxuICogYHtsZWFkaW5nOiBmYWxzZX1gLiBUbyBkaXNhYmxlIGV4ZWN1dGlvbiBvbiB0aGUgdHJhaWxpbmcgZWRnZSwgZGl0dG8uXHJcbiAqIEBsaWNlbnNlIGh0dHBzOi8vcmF3LmdpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmUvbWFzdGVyL0xJQ0VOU0VcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuY1xyXG4gKiBAcGFyYW0ge251bWJlcn0gd2FpdFxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxyXG4gKi9cclxuTWF0ZXJpYWxpemUudGhyb3R0bGUgPSBmdW5jdGlvbihmdW5jLCB3YWl0LCBvcHRpb25zKSB7XHJcbiAgdmFyIGNvbnRleHQsIGFyZ3MsIHJlc3VsdDtcclxuICB2YXIgdGltZW91dCA9IG51bGw7XHJcbiAgdmFyIHByZXZpb3VzID0gMDtcclxuICBvcHRpb25zIHx8IChvcHRpb25zID0ge30pO1xyXG4gIHZhciBsYXRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHByZXZpb3VzID0gb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSA/IDAgOiBnZXRUaW1lKCk7XHJcbiAgICB0aW1lb3V0ID0gbnVsbDtcclxuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XHJcbiAgfTtcclxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG5vdyA9IGdldFRpbWUoKTtcclxuICAgIGlmICghcHJldmlvdXMgJiYgb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSkgcHJldmlvdXMgPSBub3c7XHJcbiAgICB2YXIgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBwcmV2aW91cyk7XHJcbiAgICBjb250ZXh0ID0gdGhpcztcclxuICAgIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICBpZiAocmVtYWluaW5nIDw9IDApIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG4gICAgICB0aW1lb3V0ID0gbnVsbDtcclxuICAgICAgcHJldmlvdXMgPSBub3c7XHJcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcclxuICAgIH0gZWxzZSBpZiAoIXRpbWVvdXQgJiYgb3B0aW9ucy50cmFpbGluZyAhPT0gZmFsc2UpIHtcclxuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH07XHJcbn07XHJcblxyXG5cclxuLy8gVmVsb2NpdHkgaGFzIGNvbmZsaWN0cyB3aGVuIGxvYWRlZCB3aXRoIGpRdWVyeSwgdGhpcyB3aWxsIGNoZWNrIGZvciBpdFxyXG4vLyBGaXJzdCwgY2hlY2sgaWYgaW4gbm9Db25mbGljdCBtb2RlXHJcbnZhciBWZWw7XHJcbmlmIChqUXVlcnkpIHtcclxuICBWZWwgPSBqUXVlcnkuVmVsb2NpdHk7XHJcbn0gZWxzZSBpZiAoJCkge1xyXG4gIFZlbCA9ICQuVmVsb2NpdHk7XHJcbn0gZWxzZSB7XHJcbiAgVmVsID0gVmVsb2NpdHk7XHJcbn1cclxuXHJcbmlmIChWZWwpIHtcclxuICBNYXRlcmlhbGl6ZS5WZWwgPSBWZWw7XHJcbn0gZWxzZSB7XHJcbiAgTWF0ZXJpYWxpemUuVmVsID0gVmVsb2NpdHk7XHJcbn1cclxuXG4oZnVuY3Rpb24gKCQpIHtcclxuICAkLmZuLmNvbGxhcHNpYmxlID0gZnVuY3Rpb24ob3B0aW9ucywgbWV0aG9kUGFyYW0pIHtcclxuICAgIHZhciBkZWZhdWx0cyA9IHtcclxuICAgICAgYWNjb3JkaW9uOiB1bmRlZmluZWQsXHJcbiAgICAgIG9uT3BlbjogdW5kZWZpbmVkLFxyXG4gICAgICBvbkNsb3NlOiB1bmRlZmluZWRcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG1ldGhvZE5hbWUgPSBvcHRpb25zO1xyXG4gICAgb3B0aW9ucyA9ICQuZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKTtcclxuXHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcblxyXG4gICAgICB2YXIgJHBhbmVsX2hlYWRlcnMgPSAkKHRoaXMpLmZpbmQoJz4gbGkgPiAuY29sbGFwc2libGUtaGVhZGVyJyk7XHJcblxyXG4gICAgICB2YXIgY29sbGFwc2libGVfdHlwZSA9ICR0aGlzLmRhdGEoXCJjb2xsYXBzaWJsZVwiKTtcclxuXHJcbiAgICAgIC8qKioqKioqKioqKioqKioqXHJcbiAgICAgIEhlbHBlciBGdW5jdGlvbnNcclxuICAgICAgKioqKioqKioqKioqKioqKi9cclxuXHJcbiAgICAgIC8vIEFjY29yZGlvbiBPcGVuXHJcbiAgICAgIGZ1bmN0aW9uIGFjY29yZGlvbk9wZW4ob2JqZWN0KSB7XHJcbiAgICAgICAgJHBhbmVsX2hlYWRlcnMgPSAkdGhpcy5maW5kKCc+IGxpID4gLmNvbGxhcHNpYmxlLWhlYWRlcicpO1xyXG4gICAgICAgIGlmIChvYmplY3QuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICBvYmplY3QucGFyZW50KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIG9iamVjdC5wYXJlbnQoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvYmplY3QucGFyZW50KCkuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcclxuICAgICAgICAgIG9iamVjdC5zaWJsaW5ncygnLmNvbGxhcHNpYmxlLWJvZHknKS5zdG9wKHRydWUsZmFsc2UpLnNsaWRlRG93bih7IGR1cmF0aW9uOiAzNTAsIGVhc2luZzogXCJlYXNlT3V0UXVhcnRcIiwgcXVldWU6IGZhbHNlLCBjb21wbGV0ZTogZnVuY3Rpb24oKSB7JCh0aGlzKS5jc3MoJ2hlaWdodCcsICcnKTt9fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICBvYmplY3Quc2libGluZ3MoJy5jb2xsYXBzaWJsZS1ib2R5Jykuc3RvcCh0cnVlLGZhbHNlKS5zbGlkZVVwKHsgZHVyYXRpb246IDM1MCwgZWFzaW5nOiBcImVhc2VPdXRRdWFydFwiLCBxdWV1ZTogZmFsc2UsIGNvbXBsZXRlOiBmdW5jdGlvbigpIHskKHRoaXMpLmNzcygnaGVpZ2h0JywgJycpO319KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRwYW5lbF9oZWFkZXJzLm5vdChvYmplY3QpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIC8vIENsb3NlIHByZXZpb3VzbHkgb3BlbiBhY2NvcmRpb24gZWxlbWVudHMuXHJcbiAgICAgICAgJHBhbmVsX2hlYWRlcnMubm90KG9iamVjdCkucGFyZW50KCkuY2hpbGRyZW4oJy5jb2xsYXBzaWJsZS1ib2R5Jykuc3RvcCh0cnVlLGZhbHNlKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKCQodGhpcykuaXMoJzp2aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5zbGlkZVVwKHtcclxuICAgICAgICAgICAgICBkdXJhdGlvbjogMzUwLFxyXG4gICAgICAgICAgICAgIGVhc2luZzogXCJlYXNlT3V0UXVhcnRcIixcclxuICAgICAgICAgICAgICBxdWV1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgY29tcGxldGU6XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2hlaWdodCcsICcnKTtcclxuICAgICAgICAgICAgICAgICAgZXhlY0NhbGxiYWNrcygkKHRoaXMpLnNpYmxpbmdzKCcuY29sbGFwc2libGUtaGVhZGVyJykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gRXhwYW5kYWJsZSBPcGVuXHJcbiAgICAgIGZ1bmN0aW9uIGV4cGFuZGFibGVPcGVuKG9iamVjdCkge1xyXG4gICAgICAgIGlmIChvYmplY3QuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICBvYmplY3QucGFyZW50KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIG9iamVjdC5wYXJlbnQoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvYmplY3QucGFyZW50KCkuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcclxuICAgICAgICAgIG9iamVjdC5zaWJsaW5ncygnLmNvbGxhcHNpYmxlLWJvZHknKS5zdG9wKHRydWUsZmFsc2UpLnNsaWRlRG93bih7IGR1cmF0aW9uOiAzNTAsIGVhc2luZzogXCJlYXNlT3V0UXVhcnRcIiwgcXVldWU6IGZhbHNlLCBjb21wbGV0ZTogZnVuY3Rpb24oKSB7JCh0aGlzKS5jc3MoJ2hlaWdodCcsICcnKTt9fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgb2JqZWN0LnNpYmxpbmdzKCcuY29sbGFwc2libGUtYm9keScpLnN0b3AodHJ1ZSxmYWxzZSkuc2xpZGVVcCh7IGR1cmF0aW9uOiAzNTAsIGVhc2luZzogXCJlYXNlT3V0UXVhcnRcIiwgcXVldWU6IGZhbHNlLCBjb21wbGV0ZTogZnVuY3Rpb24oKSB7JCh0aGlzKS5jc3MoJ2hlaWdodCcsICcnKTt9fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBPcGVuIGNvbGxhcHNpYmxlLiBvYmplY3Q6IC5jb2xsYXBzaWJsZS1oZWFkZXJcclxuICAgICAgZnVuY3Rpb24gY29sbGFwc2libGVPcGVuKG9iamVjdCwgbm9Ub2dnbGUpIHtcclxuICAgICAgICBpZiAoIW5vVG9nZ2xlKSB7XHJcbiAgICAgICAgICBvYmplY3QudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYWNjb3JkaW9uIHx8IGNvbGxhcHNpYmxlX3R5cGUgPT09IFwiYWNjb3JkaW9uXCIgfHwgY29sbGFwc2libGVfdHlwZSA9PT0gdW5kZWZpbmVkKSB7IC8vIEhhbmRsZSBBY2NvcmRpb25cclxuICAgICAgICAgIGFjY29yZGlvbk9wZW4ob2JqZWN0KTtcclxuICAgICAgICB9IGVsc2UgeyAvLyBIYW5kbGUgRXhwYW5kYWJsZXNcclxuICAgICAgICAgIGV4cGFuZGFibGVPcGVuKG9iamVjdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleGVjQ2FsbGJhY2tzKG9iamVjdCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEhhbmRsZSBjYWxsYmFja3NcclxuICAgICAgZnVuY3Rpb24gZXhlY0NhbGxiYWNrcyhvYmplY3QpIHtcclxuICAgICAgICBpZiAob2JqZWN0Lmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZihvcHRpb25zLm9uT3BlbikgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBvcHRpb25zLm9uT3Blbi5jYWxsKHRoaXMsIG9iamVjdC5wYXJlbnQoKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmICh0eXBlb2Yob3B0aW9ucy5vbkNsb3NlKSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMub25DbG9zZS5jYWxsKHRoaXMsIG9iamVjdC5wYXJlbnQoKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogQ2hlY2sgaWYgb2JqZWN0IGlzIGNoaWxkcmVuIG9mIHBhbmVsIGhlYWRlclxyXG4gICAgICAgKiBAcGFyYW0gIHtPYmplY3R9ICBvYmplY3QgSnF1ZXJ5IG9iamVjdFxyXG4gICAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGl0IGlzIGNoaWxkcmVuXHJcbiAgICAgICAqL1xyXG4gICAgICBmdW5jdGlvbiBpc0NoaWxkcmVuT2ZQYW5lbEhlYWRlcihvYmplY3QpIHtcclxuXHJcbiAgICAgICAgdmFyIHBhbmVsSGVhZGVyID0gZ2V0UGFuZWxIZWFkZXIob2JqZWN0KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBhbmVsSGVhZGVyLmxlbmd0aCA+IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBHZXQgcGFuZWwgaGVhZGVyIGZyb20gYSBjaGlsZHJlbiBlbGVtZW50XHJcbiAgICAgICAqIEBwYXJhbSAge09iamVjdH0gb2JqZWN0IEpxdWVyeSBvYmplY3RcclxuICAgICAgICogQHJldHVybiB7T2JqZWN0fSBwYW5lbCBoZWFkZXIgb2JqZWN0XHJcbiAgICAgICAqL1xyXG4gICAgICBmdW5jdGlvbiBnZXRQYW5lbEhlYWRlcihvYmplY3QpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9iamVjdC5jbG9zZXN0KCdsaSA+IC5jb2xsYXBzaWJsZS1oZWFkZXInKTtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIC8vIFR1cm4gb2ZmIGFueSBleGlzdGluZyBldmVudCBoYW5kbGVyc1xyXG4gICAgICBmdW5jdGlvbiByZW1vdmVFdmVudEhhbmRsZXJzKCkge1xyXG4gICAgICAgICR0aGlzLm9mZignY2xpY2suY29sbGFwc2UnLCAnPiBsaSA+IC5jb2xsYXBzaWJsZS1oZWFkZXInKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLyoqKioqICBFbmQgSGVscGVyIEZ1bmN0aW9ucyAgKioqKiovXHJcblxyXG5cclxuICAgICAgLy8gTWV0aG9kc1xyXG4gICAgICBpZiAobWV0aG9kTmFtZSA9PT0gJ2Rlc3Ryb3knKSB7XHJcbiAgICAgICAgcmVtb3ZlRXZlbnRIYW5kbGVycygpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIGlmIChtZXRob2RQYXJhbSA+PSAwICYmXHJcbiAgICAgICAgICBtZXRob2RQYXJhbSA8ICRwYW5lbF9oZWFkZXJzLmxlbmd0aCkge1xyXG4gICAgICAgIHZhciAkY3Vycl9oZWFkZXIgPSAkcGFuZWxfaGVhZGVycy5lcShtZXRob2RQYXJhbSk7XHJcbiAgICAgICAgaWYgKCRjdXJyX2hlYWRlci5sZW5ndGggJiZcclxuICAgICAgICAgICAgKG1ldGhvZE5hbWUgPT09ICdvcGVuJyB8fFxyXG4gICAgICAgICAgICAobWV0aG9kTmFtZSA9PT0gJ2Nsb3NlJyAmJlxyXG4gICAgICAgICAgICAkY3Vycl9oZWFkZXIuaGFzQ2xhc3MoJ2FjdGl2ZScpKSkpIHtcclxuICAgICAgICAgIGNvbGxhcHNpYmxlT3BlbigkY3Vycl9oZWFkZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICByZW1vdmVFdmVudEhhbmRsZXJzKCk7XHJcblxyXG5cclxuICAgICAgLy8gQWRkIGNsaWNrIGhhbmRsZXIgdG8gb25seSBkaXJlY3QgY29sbGFwc2libGUgaGVhZGVyIGNoaWxkcmVuXHJcbiAgICAgICR0aGlzLm9uKCdjbGljay5jb2xsYXBzZScsICc+IGxpID4gLmNvbGxhcHNpYmxlLWhlYWRlcicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9ICQoZS50YXJnZXQpO1xyXG5cclxuICAgICAgICBpZiAoaXNDaGlsZHJlbk9mUGFuZWxIZWFkZXIoZWxlbWVudCkpIHtcclxuICAgICAgICAgIGVsZW1lbnQgPSBnZXRQYW5lbEhlYWRlcihlbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbGxhcHNpYmxlT3BlbihlbGVtZW50KTtcclxuICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgLy8gT3BlbiBmaXJzdCBhY3RpdmVcclxuICAgICAgaWYgKG9wdGlvbnMuYWNjb3JkaW9uIHx8IGNvbGxhcHNpYmxlX3R5cGUgPT09IFwiYWNjb3JkaW9uXCIgfHwgY29sbGFwc2libGVfdHlwZSA9PT0gdW5kZWZpbmVkKSB7IC8vIEhhbmRsZSBBY2NvcmRpb25cclxuICAgICAgICBjb2xsYXBzaWJsZU9wZW4oJHBhbmVsX2hlYWRlcnMuZmlsdGVyKCcuYWN0aXZlJykuZmlyc3QoKSwgdHJ1ZSk7XHJcblxyXG4gICAgICB9IGVsc2UgeyAvLyBIYW5kbGUgRXhwYW5kYWJsZXNcclxuICAgICAgICAkcGFuZWxfaGVhZGVycy5maWx0ZXIoJy5hY3RpdmUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgY29sbGFwc2libGVPcGVuKCQodGhpcyksIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICAgICQoJy5jb2xsYXBzaWJsZScpLmNvbGxhcHNpYmxlKCk7XHJcbiAgfSk7XHJcbn0oIGpRdWVyeSApKTtcbihmdW5jdGlvbiAoJCkge1xyXG5cclxuICAvLyBBZGQgcG9zaWJpbGl0eSB0byBzY3JvbGwgdG8gc2VsZWN0ZWQgb3B0aW9uXHJcbiAgLy8gdXNlZnVsbCBmb3Igc2VsZWN0IGZvciBleGFtcGxlXHJcbiAgJC5mbi5zY3JvbGxUbyA9IGZ1bmN0aW9uKGVsZW0pIHtcclxuICAgICQodGhpcykuc2Nyb2xsVG9wKCQodGhpcykuc2Nyb2xsVG9wKCkgLSAkKHRoaXMpLm9mZnNldCgpLnRvcCArICQoZWxlbSkub2Zmc2V0KCkudG9wKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG4gICQuZm4uZHJvcGRvd24gPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgdmFyIGRlZmF1bHRzID0ge1xyXG4gICAgICBpbkR1cmF0aW9uOiAzMDAsXHJcbiAgICAgIG91dER1cmF0aW9uOiAyMjUsXHJcbiAgICAgIGNvbnN0cmFpbldpZHRoOiB0cnVlLCAvLyBDb25zdHJhaW5zIHdpZHRoIG9mIGRyb3Bkb3duIHRvIHRoZSBhY3RpdmF0b3JcclxuICAgICAgaG92ZXI6IGZhbHNlLFxyXG4gICAgICBndXR0ZXI6IDAsIC8vIFNwYWNpbmcgZnJvbSBlZGdlXHJcbiAgICAgIGJlbG93T3JpZ2luOiBmYWxzZSxcclxuICAgICAgYWxpZ25tZW50OiAnbGVmdCcsXHJcbiAgICAgIHN0b3BQcm9wYWdhdGlvbjogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgLy8gT3BlbiBkcm9wZG93bi5cclxuICAgIGlmIChvcHRpb25zID09PSBcIm9wZW5cIikge1xyXG4gICAgICB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS50cmlnZ2VyKCdvcGVuJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2xvc2UgZHJvcGRvd24uXHJcbiAgICBpZiAob3B0aW9ucyA9PT0gXCJjbG9zZVwiKSB7XHJcbiAgICAgIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLnRyaWdnZXIoJ2Nsb3NlJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciBvcmlnaW4gPSAkKHRoaXMpO1xyXG4gICAgICB2YXIgY3Vycl9vcHRpb25zID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcclxuICAgICAgdmFyIGlzRm9jdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgLy8gRHJvcGRvd24gbWVudVxyXG4gICAgICB2YXIgYWN0aXZhdGVzID0gJChcIiNcIisgb3JpZ2luLmF0dHIoJ2RhdGEtYWN0aXZhdGVzJykpO1xyXG5cclxuICAgICAgZnVuY3Rpb24gdXBkYXRlT3B0aW9ucygpIHtcclxuICAgICAgICBpZiAob3JpZ2luLmRhdGEoJ2luZHVyYXRpb24nKSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgY3Vycl9vcHRpb25zLmluRHVyYXRpb24gPSBvcmlnaW4uZGF0YSgnaW5kdXJhdGlvbicpO1xyXG4gICAgICAgIGlmIChvcmlnaW4uZGF0YSgnb3V0ZHVyYXRpb24nKSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgY3Vycl9vcHRpb25zLm91dER1cmF0aW9uID0gb3JpZ2luLmRhdGEoJ291dGR1cmF0aW9uJyk7XHJcbiAgICAgICAgaWYgKG9yaWdpbi5kYXRhKCdjb25zdHJhaW53aWR0aCcpICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICBjdXJyX29wdGlvbnMuY29uc3RyYWluV2lkdGggPSBvcmlnaW4uZGF0YSgnY29uc3RyYWlud2lkdGgnKTtcclxuICAgICAgICBpZiAob3JpZ2luLmRhdGEoJ2hvdmVyJykgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgIGN1cnJfb3B0aW9ucy5ob3ZlciA9IG9yaWdpbi5kYXRhKCdob3ZlcicpO1xyXG4gICAgICAgIGlmIChvcmlnaW4uZGF0YSgnZ3V0dGVyJykgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgIGN1cnJfb3B0aW9ucy5ndXR0ZXIgPSBvcmlnaW4uZGF0YSgnZ3V0dGVyJyk7XHJcbiAgICAgICAgaWYgKG9yaWdpbi5kYXRhKCdiZWxvd29yaWdpbicpICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICBjdXJyX29wdGlvbnMuYmVsb3dPcmlnaW4gPSBvcmlnaW4uZGF0YSgnYmVsb3dvcmlnaW4nKTtcclxuICAgICAgICBpZiAob3JpZ2luLmRhdGEoJ2FsaWdubWVudCcpICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICBjdXJyX29wdGlvbnMuYWxpZ25tZW50ID0gb3JpZ2luLmRhdGEoJ2FsaWdubWVudCcpO1xyXG4gICAgICAgIGlmIChvcmlnaW4uZGF0YSgnc3RvcHByb3BhZ2F0aW9uJykgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgIGN1cnJfb3B0aW9ucy5zdG9wUHJvcGFnYXRpb24gPSBvcmlnaW4uZGF0YSgnc3RvcHByb3BhZ2F0aW9uJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHVwZGF0ZU9wdGlvbnMoKTtcclxuXHJcbiAgICAgIC8vIEF0dGFjaCBkcm9wZG93biB0byBpdHMgYWN0aXZhdG9yXHJcbiAgICAgIG9yaWdpbi5hZnRlcihhY3RpdmF0ZXMpO1xyXG5cclxuICAgICAgLypcclxuICAgICAgICBIZWxwZXIgZnVuY3Rpb24gdG8gcG9zaXRpb24gYW5kIHJlc2l6ZSBkcm9wZG93bi5cclxuICAgICAgICBVc2VkIGluIGhvdmVyIGFuZCBjbGljayBoYW5kbGVyLlxyXG4gICAgICAqL1xyXG4gICAgICBmdW5jdGlvbiBwbGFjZURyb3Bkb3duKGV2ZW50VHlwZSkge1xyXG4gICAgICAgIC8vIENoZWNrIGZvciBzaW11bHRhbmVvdXMgZm9jdXMgYW5kIGNsaWNrIGV2ZW50cy5cclxuICAgICAgICBpZiAoZXZlbnRUeXBlID09PSAnZm9jdXMnKSB7XHJcbiAgICAgICAgICBpc0ZvY3VzZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaHRtbCBkYXRhIGF0dHJpYnV0ZXNcclxuICAgICAgICB1cGRhdGVPcHRpb25zKCk7XHJcblxyXG4gICAgICAgIC8vIFNldCBEcm9wZG93biBzdGF0ZVxyXG4gICAgICAgIGFjdGl2YXRlcy5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgb3JpZ2luLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgdmFyIG9yaWdpbldpZHRoID0gb3JpZ2luWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xyXG5cclxuICAgICAgICAvLyBDb25zdHJhaW4gd2lkdGhcclxuICAgICAgICBpZiAoY3Vycl9vcHRpb25zLmNvbnN0cmFpbldpZHRoID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBhY3RpdmF0ZXMuY3NzKCd3aWR0aCcsIG9yaWdpbldpZHRoKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFjdGl2YXRlcy5jc3MoJ3doaXRlLXNwYWNlJywgJ25vd3JhcCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gT2Zmc2NyZWVuIGRldGVjdGlvblxyXG4gICAgICAgIHZhciB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICAgICAgdmFyIG9yaWdpbkhlaWdodCA9IG9yaWdpbi5pbm5lckhlaWdodCgpO1xyXG4gICAgICAgIHZhciBvZmZzZXRMZWZ0ID0gb3JpZ2luLm9mZnNldCgpLmxlZnQ7XHJcbiAgICAgICAgdmFyIG9mZnNldFRvcCA9IG9yaWdpbi5vZmZzZXQoKS50b3AgLSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgdmFyIGN1cnJBbGlnbm1lbnQgPSBjdXJyX29wdGlvbnMuYWxpZ25tZW50O1xyXG4gICAgICAgIHZhciBndXR0ZXJTcGFjaW5nID0gMDtcclxuICAgICAgICB2YXIgbGVmdFBvc2l0aW9uID0gMDtcclxuXHJcbiAgICAgICAgLy8gQmVsb3cgT3JpZ2luXHJcbiAgICAgICAgdmFyIHZlcnRpY2FsT2Zmc2V0ID0gMDtcclxuICAgICAgICBpZiAoY3Vycl9vcHRpb25zLmJlbG93T3JpZ2luID09PSB0cnVlKSB7XHJcbiAgICAgICAgICB2ZXJ0aWNhbE9mZnNldCA9IG9yaWdpbkhlaWdodDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciBzY3JvbGxpbmcgcG9zaXRpb25lZCBjb250YWluZXIuXHJcbiAgICAgICAgdmFyIHNjcm9sbFlPZmZzZXQgPSAwO1xyXG4gICAgICAgIHZhciBzY3JvbGxYT2Zmc2V0ID0gMDtcclxuICAgICAgICB2YXIgd3JhcHBlciA9IG9yaWdpbi5wYXJlbnQoKTtcclxuICAgICAgICBpZiAoIXdyYXBwZXIuaXMoJ2JvZHknKSkge1xyXG4gICAgICAgICAgaWYgKHdyYXBwZXJbMF0uc2Nyb2xsSGVpZ2h0ID4gd3JhcHBlclswXS5jbGllbnRIZWlnaHQpIHtcclxuICAgICAgICAgICAgc2Nyb2xsWU9mZnNldCA9IHdyYXBwZXJbMF0uc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHdyYXBwZXJbMF0uc2Nyb2xsV2lkdGggPiB3cmFwcGVyWzBdLmNsaWVudFdpZHRoKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbFhPZmZzZXQgPSB3cmFwcGVyWzBdLnNjcm9sbExlZnQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKG9mZnNldExlZnQgKyBhY3RpdmF0ZXMuaW5uZXJXaWR0aCgpID4gJCh3aW5kb3cpLndpZHRoKCkpIHtcclxuICAgICAgICAgIC8vIERyb3Bkb3duIGdvZXMgcGFzdCBzY3JlZW4gb24gcmlnaHQsIGZvcmNlIHJpZ2h0IGFsaWdubWVudFxyXG4gICAgICAgICAgY3VyckFsaWdubWVudCA9ICdyaWdodCc7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAob2Zmc2V0TGVmdCAtIGFjdGl2YXRlcy5pbm5lcldpZHRoKCkgKyBvcmlnaW4uaW5uZXJXaWR0aCgpIDwgMCkge1xyXG4gICAgICAgICAgLy8gRHJvcGRvd24gZ29lcyBwYXN0IHNjcmVlbiBvbiBsZWZ0LCBmb3JjZSBsZWZ0IGFsaWdubWVudFxyXG4gICAgICAgICAgY3VyckFsaWdubWVudCA9ICdsZWZ0JztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVmVydGljYWwgYm90dG9tIG9mZnNjcmVlbiBkZXRlY3Rpb25cclxuICAgICAgICBpZiAob2Zmc2V0VG9wICsgYWN0aXZhdGVzLmlubmVySGVpZ2h0KCkgPiB3aW5kb3dIZWlnaHQpIHtcclxuICAgICAgICAgIC8vIElmIGdvaW5nIHVwd2FyZHMgc3RpbGwgZ29lcyBvZmZzY3JlZW4sIGp1c3QgY3JvcCBoZWlnaHQgb2YgZHJvcGRvd24uXHJcbiAgICAgICAgICBpZiAob2Zmc2V0VG9wICsgb3JpZ2luSGVpZ2h0IC0gYWN0aXZhdGVzLmlubmVySGVpZ2h0KCkgPCAwKSB7XHJcbiAgICAgICAgICAgIHZhciBhZGp1c3RlZEhlaWdodCA9IHdpbmRvd0hlaWdodCAtIG9mZnNldFRvcCAtIHZlcnRpY2FsT2Zmc2V0O1xyXG4gICAgICAgICAgICBhY3RpdmF0ZXMuY3NzKCdtYXgtaGVpZ2h0JywgYWRqdXN0ZWRIZWlnaHQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gRmxvdyB1cHdhcmRzLlxyXG4gICAgICAgICAgICBpZiAoIXZlcnRpY2FsT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgdmVydGljYWxPZmZzZXQgKz0gb3JpZ2luSGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZlcnRpY2FsT2Zmc2V0IC09IGFjdGl2YXRlcy5pbm5lckhlaWdodCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSGFuZGxlIGVkZ2UgYWxpZ25tZW50XHJcbiAgICAgICAgaWYgKGN1cnJBbGlnbm1lbnQgPT09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgZ3V0dGVyU3BhY2luZyA9IGN1cnJfb3B0aW9ucy5ndXR0ZXI7XHJcbiAgICAgICAgICBsZWZ0UG9zaXRpb24gPSBvcmlnaW4ucG9zaXRpb24oKS5sZWZ0ICsgZ3V0dGVyU3BhY2luZztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY3VyckFsaWdubWVudCA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICAgICAgLy8gTWF0ZXJpYWwgaWNvbnMgZml4XHJcbiAgICAgICAgICBhY3RpdmF0ZXNcclxuICAgICAgICAgICAgLnN0b3AodHJ1ZSwgdHJ1ZSlcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICAgICAgICBsZWZ0OiAwXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgdmFyIG9mZnNldFJpZ2h0ID0gb3JpZ2luLnBvc2l0aW9uKCkubGVmdCArIG9yaWdpbldpZHRoIC0gYWN0aXZhdGVzLndpZHRoKCk7XHJcbiAgICAgICAgICBndXR0ZXJTcGFjaW5nID0gLWN1cnJfb3B0aW9ucy5ndXR0ZXI7XHJcbiAgICAgICAgICBsZWZ0UG9zaXRpb24gPSAgb2Zmc2V0UmlnaHQgKyBndXR0ZXJTcGFjaW5nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUG9zaXRpb24gZHJvcGRvd25cclxuICAgICAgICBhY3RpdmF0ZXMuY3NzKHtcclxuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgdG9wOiBvcmlnaW4ucG9zaXRpb24oKS50b3AgKyB2ZXJ0aWNhbE9mZnNldCArIHNjcm9sbFlPZmZzZXQsXHJcbiAgICAgICAgICBsZWZ0OiBsZWZ0UG9zaXRpb24gKyBzY3JvbGxYT2Zmc2V0XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFNob3cgZHJvcGRvd25cclxuICAgICAgICBhY3RpdmF0ZXNcclxuICAgICAgICAgIC5zbGlkZURvd24oe1xyXG4gICAgICAgICAgICBxdWV1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBjdXJyX29wdGlvbnMuaW5EdXJhdGlvbixcclxuICAgICAgICAgICAgZWFzaW5nOiAnZWFzZU91dEN1YmljJyxcclxuICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICQodGhpcykuY3NzKCdoZWlnaHQnLCAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuYW5pbWF0ZSgge29wYWNpdHk6IDF9LCB7cXVldWU6IGZhbHNlLCBkdXJhdGlvbjogY3Vycl9vcHRpb25zLmluRHVyYXRpb24sIGVhc2luZzogJ2Vhc2VPdXRTaW5lJ30pO1xyXG5cclxuICAgICAgICAvLyBBZGQgY2xpY2sgY2xvc2UgaGFuZGxlciB0byBkb2N1bWVudFxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2suJysgYWN0aXZhdGVzLmF0dHIoJ2lkJyksIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGhpZGVEcm9wZG93bigpO1xyXG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2NsaWNrLicrIGFjdGl2YXRlcy5hdHRyKCdpZCcpKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBoaWRlRHJvcGRvd24oKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHNpbXVsdGFuZW91cyBmb2N1cyBhbmQgY2xpY2sgZXZlbnRzLlxyXG4gICAgICAgIGlzRm9jdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIGFjdGl2YXRlcy5mYWRlT3V0KGN1cnJfb3B0aW9ucy5vdXREdXJhdGlvbik7XHJcbiAgICAgICAgYWN0aXZhdGVzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBvcmlnaW4ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZignY2xpY2suJysgYWN0aXZhdGVzLmF0dHIoJ2lkJykpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGFjdGl2YXRlcy5jc3MoJ21heC1oZWlnaHQnLCAnJyk7IH0sIGN1cnJfb3B0aW9ucy5vdXREdXJhdGlvbik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEhvdmVyXHJcbiAgICAgIGlmIChjdXJyX29wdGlvbnMuaG92ZXIpIHtcclxuICAgICAgICB2YXIgb3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIG9yaWdpbi5vZmYoJ2NsaWNrLicgKyBvcmlnaW4uYXR0cignaWQnKSk7XHJcbiAgICAgICAgLy8gSG92ZXIgaGFuZGxlciB0byBzaG93IGRyb3Bkb3duXHJcbiAgICAgICAgb3JpZ2luLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oZSl7IC8vIE1vdXNlIG92ZXJcclxuICAgICAgICAgIGlmIChvcGVuID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBwbGFjZURyb3Bkb3duKCk7XHJcbiAgICAgICAgICAgIG9wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG9yaWdpbi5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgLy8gSWYgaG92ZXIgb24gb3JpZ2luIHRoZW4gdG8gc29tZXRoaW5nIG90aGVyIHRoYW4gZHJvcGRvd24gY29udGVudCwgdGhlbiBjbG9zZVxyXG4gICAgICAgICAgdmFyIHRvRWwgPSBlLnRvRWxlbWVudCB8fCBlLnJlbGF0ZWRUYXJnZXQ7IC8vIGFkZGVkIGJyb3dzZXIgY29tcGF0aWJpbGl0eSBmb3IgdGFyZ2V0IGVsZW1lbnRcclxuICAgICAgICAgIGlmKCEkKHRvRWwpLmNsb3Nlc3QoJy5kcm9wZG93bi1jb250ZW50JykuaXMoYWN0aXZhdGVzKSkge1xyXG4gICAgICAgICAgICBhY3RpdmF0ZXMuc3RvcCh0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgaGlkZURyb3Bkb3duKCk7XHJcbiAgICAgICAgICAgIG9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYWN0aXZhdGVzLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oZSl7IC8vIE1vdXNlIG91dFxyXG4gICAgICAgICAgdmFyIHRvRWwgPSBlLnRvRWxlbWVudCB8fCBlLnJlbGF0ZWRUYXJnZXQ7XHJcbiAgICAgICAgICBpZighJCh0b0VsKS5jbG9zZXN0KCcuZHJvcGRvd24tYnV0dG9uJykuaXMob3JpZ2luKSkge1xyXG4gICAgICAgICAgICBhY3RpdmF0ZXMuc3RvcCh0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgaGlkZURyb3Bkb3duKCk7XHJcbiAgICAgICAgICAgIG9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQ2xpY2tcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBDbGljayBoYW5kbGVyIHRvIHNob3cgZHJvcGRvd25cclxuICAgICAgICBvcmlnaW4ub2ZmKCdjbGljay4nICsgb3JpZ2luLmF0dHIoJ2lkJykpO1xyXG4gICAgICAgIG9yaWdpbi5vbignY2xpY2suJytvcmlnaW4uYXR0cignaWQnKSwgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICBpZiAoIWlzRm9jdXNlZCkge1xyXG4gICAgICAgICAgICBpZiAoIG9yaWdpblswXSA9PSBlLmN1cnJlbnRUYXJnZXQgJiZcclxuICAgICAgICAgICAgICAgICAhb3JpZ2luLmhhc0NsYXNzKCdhY3RpdmUnKSAmJlxyXG4gICAgICAgICAgICAgICAgICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuZHJvcGRvd24tY29udGVudCcpLmxlbmd0aCA9PT0gMCkpIHtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIFByZXZlbnRzIGJ1dHRvbiBjbGljayBmcm9tIG1vdmluZyB3aW5kb3dcclxuICAgICAgICAgICAgICBpZiAoY3Vycl9vcHRpb25zLnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcGxhY2VEcm9wZG93bignY2xpY2snKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBJZiBvcmlnaW4gaXMgY2xpY2tlZCBhbmQgbWVudSBpcyBvcGVuLCBjbG9zZSBtZW51XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9yaWdpbi5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICBoaWRlRHJvcGRvd24oKTtcclxuICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2NsaWNrLicrIGFjdGl2YXRlcy5hdHRyKCdpZCcpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSAvLyBFbmQgZWxzZVxyXG5cclxuICAgICAgLy8gTGlzdGVuIHRvIG9wZW4gYW5kIGNsb3NlIGV2ZW50IC0gdXNlZnVsIGZvciBzZWxlY3QgY29tcG9uZW50XHJcbiAgICAgIG9yaWdpbi5vbignb3BlbicsIGZ1bmN0aW9uKGUsIGV2ZW50VHlwZSkge1xyXG4gICAgICAgIHBsYWNlRHJvcGRvd24oZXZlbnRUeXBlKTtcclxuICAgICAgfSk7XHJcbiAgICAgIG9yaWdpbi5vbignY2xvc2UnLCBoaWRlRHJvcGRvd24pO1xyXG5cclxuXHJcbiAgICB9KTtcclxuICB9OyAvLyBFbmQgZHJvcGRvd24gcGx1Z2luXHJcblxyXG4gICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgICAkKCcuZHJvcGRvd24tYnV0dG9uJykuZHJvcGRvd24oKTtcclxuICB9KTtcclxufSggalF1ZXJ5ICkpO1xyXG5cbihmdW5jdGlvbigkLCBWZWwpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGxldCBfZGVmYXVsdHMgPSB7XHJcbiAgICBvcGFjaXR5OiAwLjUsXHJcbiAgICBpbkR1cmF0aW9uOiAyNTAsXHJcbiAgICBvdXREdXJhdGlvbjogMjUwLFxyXG4gICAgcmVhZHk6IHVuZGVmaW5lZCxcclxuICAgIGNvbXBsZXRlOiB1bmRlZmluZWQsXHJcbiAgICBkaXNtaXNzaWJsZTogdHJ1ZSxcclxuICAgIHN0YXJ0aW5nVG9wOiAnNCUnLFxyXG4gICAgZW5kaW5nVG9wOiAnMTAlJ1xyXG4gIH07XHJcblxyXG5cclxuICAvKipcclxuICAgKiBAY2xhc3NcclxuICAgKlxyXG4gICAqL1xyXG4gIGNsYXNzIE1vZGFsIHtcclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0IE1vZGFsIGluc3RhbmNlIGFuZCBzZXQgdXAgb3ZlcmxheVxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge2pRdWVyeX0gJGVsXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigkZWwsIG9wdGlvbnMpIHtcclxuXHJcbiAgICAgIC8vIElmIGV4aXN0cywgZGVzdHJveSBhbmQgcmVpbml0aWFsaXplXHJcbiAgICAgIGlmICghISRlbFswXS5NX01vZGFsKSB7XHJcbiAgICAgICAgJGVsWzBdLk1fTW9kYWwuZGVzdHJveSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogVGhlIGpRdWVyeSBlbGVtZW50XHJcbiAgICAgICAqIEB0eXBlIHtqUXVlcnl9XHJcbiAgICAgICAqL1xyXG4gICAgICB0aGlzLiRlbCA9ICRlbDtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBPcHRpb25zIGZvciB0aGUgbW9kYWxcclxuICAgICAgICogQG1lbWJlciBNb2RhbCNvcHRpb25zXHJcbiAgICAgICAqIEBwcm9wIHtOdW1iZXJ9IFtvcGFjaXR5PTAuNV0gLSBPcGFjaXR5IG9mIHRoZSBtb2RhbCBvdmVybGF5XHJcbiAgICAgICAqIEBwcm9wIHtOdW1iZXJ9IFtpbkR1cmF0aW9uPTI1MF0gLSBMZW5ndGggaW4gbXMgb2YgZW50ZXIgdHJhbnNpdGlvblxyXG4gICAgICAgKiBAcHJvcCB7TnVtYmVyfSBbb3V0RHVyYXRpb249MjUwXSAtIExlbmd0aCBpbiBtcyBvZiBleGl0IHRyYW5zaXRpb25cclxuICAgICAgICogQHByb3Age0Z1bmN0aW9ufSByZWFkeSAtIENhbGxiYWNrIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIG1vZGFsIGlzIGZpbmlzaGVkIGVudGVyaW5nXHJcbiAgICAgICAqIEBwcm9wIHtGdW5jdGlvbn0gY29tcGxldGUgLSBDYWxsYmFjayBmdW5jdGlvbiBjYWxsZWQgd2hlbiBtb2RhbCBpcyBmaW5pc2hlZCBleGl0aW5nXHJcbiAgICAgICAqIEBwcm9wIHtCb29sZWFufSBbZGlzbWlzc2libGU9dHJ1ZV0gLSBBbGxvdyBtb2RhbCB0byBiZSBkaXNtaXNzZWQgYnkga2V5Ym9hcmQgb3Igb3ZlcmxheSBjbGlja1xyXG4gICAgICAgKiBAcHJvcCB7U3RyaW5nfSBbc3RhcnRpbmdUb3A9JzQlJ10gLSBzdGFydGluZ1RvcFxyXG4gICAgICAgKiBAcHJvcCB7U3RyaW5nfSBbZW5kaW5nVG9wPScxMCUnXSAtIGVuZGluZ1RvcFxyXG4gICAgICAgKi9cclxuICAgICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIE1vZGFsLmRlZmF1bHRzLCBvcHRpb25zKTtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBEZXNjcmliZXMgb3Blbi9jbG9zZSBzdGF0ZSBvZiBtb2RhbFxyXG4gICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICovXHJcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XHJcblxyXG4gICAgICB0aGlzLiRlbFswXS5NX01vZGFsID0gdGhpcztcclxuICAgICAgdGhpcy5pZCA9ICRlbC5hdHRyKCdpZCcpO1xyXG4gICAgICB0aGlzLm9wZW5pbmdUcmlnZ2VyID0gdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLiRvdmVybGF5ID0gJCgnPGRpdiBjbGFzcz1cIm1vZGFsLW92ZXJsYXlcIj48L2Rpdj4nKTtcclxuXHJcbiAgICAgIE1vZGFsLl9pbmNyZW1lbnQrKztcclxuICAgICAgTW9kYWwuX2NvdW50Kys7XHJcbiAgICAgIHRoaXMuJG92ZXJsYXlbMF0uc3R5bGUuekluZGV4ID0gMTAwMCArIE1vZGFsLl9pbmNyZW1lbnQgKiAyO1xyXG4gICAgICB0aGlzLiRlbFswXS5zdHlsZS56SW5kZXggPSAxMDAwICsgTW9kYWwuX2luY3JlbWVudCAqIDIgKyAxO1xyXG4gICAgICB0aGlzLnNldHVwRXZlbnRIYW5kbGVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XHJcbiAgICAgIHJldHVybiBfZGVmYXVsdHM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGluaXQoJGVscywgb3B0aW9ucykge1xyXG4gICAgICBsZXQgYXJyID0gW107XHJcbiAgICAgICRlbHMuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICBhcnIucHVzaChuZXcgTW9kYWwoJCh0aGlzKSwgb3B0aW9ucykpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBJbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBnZXRJbnN0YW5jZSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZWFyZG93biBjb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgdGhpcy5yZW1vdmVFdmVudEhhbmRsZXJzKCk7XHJcbiAgICAgIHRoaXMuJGVsWzBdLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKVxyXG4gICAgICBpZiAoISF0aGlzLiRvdmVybGF5WzBdLnBhcmVudE5vZGUpIHtcclxuICAgICAgICB0aGlzLiRvdmVybGF5WzBdLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy4kb3ZlcmxheVswXSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy4kZWxbMF0uTV9Nb2RhbCA9IHVuZGVmaW5lZDtcclxuICAgICAgTW9kYWwuX2NvdW50LS07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXR1cCBFdmVudCBIYW5kbGVyc1xyXG4gICAgICovXHJcbiAgICBzZXR1cEV2ZW50SGFuZGxlcnMoKSB7XHJcbiAgICAgIHRoaXMuaGFuZGxlT3ZlcmxheUNsaWNrQm91bmQgPSB0aGlzLmhhbmRsZU92ZXJsYXlDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICB0aGlzLmhhbmRsZU1vZGFsQ2xvc2VDbGlja0JvdW5kID0gdGhpcy5oYW5kbGVNb2RhbENsb3NlQ2xpY2suYmluZCh0aGlzKTtcclxuXHJcbiAgICAgIGlmIChNb2RhbC5fY291bnQgPT09IDEpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVUcmlnZ2VyQ2xpY2spO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuJG92ZXJsYXlbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU92ZXJsYXlDbGlja0JvdW5kKTtcclxuICAgICAgdGhpcy4kZWxbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU1vZGFsQ2xvc2VDbGlja0JvdW5kKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBFdmVudCBIYW5kbGVyc1xyXG4gICAgICovXHJcbiAgICByZW1vdmVFdmVudEhhbmRsZXJzKCkge1xyXG4gICAgICBpZiAoTW9kYWwuX2NvdW50ID09PSAwKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlVHJpZ2dlckNsaWNrKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLiRvdmVybGF5WzBdLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVPdmVybGF5Q2xpY2tCb3VuZCk7XHJcbiAgICAgIHRoaXMuJGVsWzBdLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVNb2RhbENsb3NlQ2xpY2tCb3VuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgVHJpZ2dlciBDbGlja1xyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBoYW5kbGVUcmlnZ2VyQ2xpY2soZSkge1xyXG4gICAgICBsZXQgJHRyaWdnZXIgPSAgJChlLnRhcmdldCkuY2xvc2VzdCgnLm1vZGFsLXRyaWdnZXInKTtcclxuICAgICAgaWYgKGUudGFyZ2V0ICYmICR0cmlnZ2VyLmxlbmd0aCkge1xyXG4gICAgICAgIGxldCBtb2RhbElkID0gJHRyaWdnZXJbMF0uZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcbiAgICAgICAgaWYgKG1vZGFsSWQpIHtcclxuICAgICAgICAgIG1vZGFsSWQgPSBtb2RhbElkLnNsaWNlKDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBtb2RhbElkID0gJHRyaWdnZXJbMF0uZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbW9kYWxJbnN0YW5jZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG1vZGFsSWQpLk1fTW9kYWw7XHJcbiAgICAgICAgaWYgKG1vZGFsSW5zdGFuY2UpIHtcclxuICAgICAgICAgIG1vZGFsSW5zdGFuY2Uub3BlbigkdHJpZ2dlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIE92ZXJsYXkgQ2xpY2tcclxuICAgICAqL1xyXG4gICAgaGFuZGxlT3ZlcmxheUNsaWNrKCkge1xyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRpc21pc3NpYmxlKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgTW9kYWwgQ2xvc2UgQ2xpY2tcclxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcclxuICAgICAqL1xyXG4gICAgaGFuZGxlTW9kYWxDbG9zZUNsaWNrKGUpIHtcclxuICAgICAgbGV0ICRjbG9zZVRyaWdnZXIgPSAgJChlLnRhcmdldCkuY2xvc2VzdCgnLm1vZGFsLWNsb3NlJyk7XHJcbiAgICAgIGlmIChlLnRhcmdldCAmJiAkY2xvc2VUcmlnZ2VyLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIEtleWRvd25cclxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcclxuICAgICAqL1xyXG4gICAgaGFuZGxlS2V5ZG93bihlKSB7XHJcbiAgICAgIC8vIEVTQyBrZXlcclxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcgJiYgdGhpcy5vcHRpb25zLmRpc21pc3NpYmxlKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbmltYXRlIGluIG1vZGFsXHJcbiAgICAgKi9cclxuICAgIGFuaW1hdGVJbigpIHtcclxuICAgICAgLy8gU2V0IGluaXRpYWwgc3R5bGVzXHJcbiAgICAgICQuZXh0ZW5kKHRoaXMuJGVsWzBdLnN0eWxlLCB7XHJcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcclxuICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgIH0pO1xyXG4gICAgICAkLmV4dGVuZCh0aGlzLiRvdmVybGF5WzBdLnN0eWxlLCB7XHJcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcclxuICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gQW5pbWF0ZSBvdmVybGF5XHJcbiAgICAgIFZlbChcclxuICAgICAgICB0aGlzLiRvdmVybGF5WzBdLFxyXG4gICAgICAgIHtvcGFjaXR5OiB0aGlzLm9wdGlvbnMub3BhY2l0eX0sXHJcbiAgICAgICAge2R1cmF0aW9uOiB0aGlzLm9wdGlvbnMuaW5EdXJhdGlvbiwgcXVldWU6IGZhbHNlLCBlYXNlOiAnZWFzZU91dEN1YmljJ31cclxuICAgICAgKTtcclxuXHJcblxyXG4gICAgICAvLyBEZWZpbmUgbW9kYWwgYW5pbWF0aW9uIG9wdGlvbnNcclxuICAgICAgbGV0IGVudGVyVmVsb2NpdHlPcHRpb25zID0ge1xyXG4gICAgICAgIGR1cmF0aW9uOiB0aGlzLm9wdGlvbnMuaW5EdXJhdGlvbixcclxuICAgICAgICBxdWV1ZTogZmFsc2UsXHJcbiAgICAgICAgZWFzZTogJ2Vhc2VPdXRDdWJpYycsXHJcbiAgICAgICAgLy8gSGFuZGxlIG1vZGFsIHJlYWR5IGNhbGxiYWNrXHJcbiAgICAgICAgY29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgIGlmICh0eXBlb2YodGhpcy5vcHRpb25zLnJlYWR5KSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMucmVhZHkuY2FsbCh0aGlzLCB0aGlzLiRlbCwgdGhpcy5vcGVuaW5nVHJpZ2dlcik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gQm90dG9tIHNoZWV0IGFuaW1hdGlvblxyXG4gICAgICBpZiAodGhpcy4kZWxbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdib3R0b20tc2hlZXQnKSkge1xyXG4gICAgICAgIFZlbChcclxuICAgICAgICAgIHRoaXMuJGVsWzBdLFxyXG4gICAgICAgICAge2JvdHRvbTogMCwgb3BhY2l0eTogMX0sXHJcbiAgICAgICAgICBlbnRlclZlbG9jaXR5T3B0aW9ucyk7XHJcblxyXG4gICAgICAvLyBOb3JtYWwgbW9kYWwgYW5pbWF0aW9uXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgVmVsLmhvb2sodGhpcy4kZWxbMF0sICdzY2FsZVgnLCAwLjcpO1xyXG4gICAgICAgIHRoaXMuJGVsWzBdLnN0eWxlLnRvcCA9IHRoaXMub3B0aW9ucy5zdGFydGluZ1RvcDtcclxuICAgICAgICBWZWwoXHJcbiAgICAgICAgICB0aGlzLiRlbFswXSxcclxuICAgICAgICAgIHt0b3A6IHRoaXMub3B0aW9ucy5lbmRpbmdUb3AsIG9wYWNpdHk6IDEsIHNjYWxlWDogMX0sXHJcbiAgICAgICAgICBlbnRlclZlbG9jaXR5T3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFuaW1hdGUgb3V0IG1vZGFsXHJcbiAgICAgKi9cclxuICAgIGFuaW1hdGVPdXQoKSB7XHJcbiAgICAgIC8vIEFuaW1hdGUgb3ZlcmxheVxyXG4gICAgICBWZWwoXHJcbiAgICAgICAgdGhpcy4kb3ZlcmxheVswXSxcclxuICAgICAgICB7IG9wYWNpdHk6IDB9LFxyXG4gICAgICAgIHtkdXJhdGlvbjogdGhpcy5vcHRpb25zLm91dER1cmF0aW9uLCBxdWV1ZTogZmFsc2UsIGVhc2U6ICdlYXNlT3V0UXVhcnQnfVxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gRGVmaW5lIG1vZGFsIGFuaW1hdGlvbiBvcHRpb25zXHJcbiAgICAgIHZhciBleGl0VmVsb2NpdHlPcHRpb25zID0ge1xyXG4gICAgICAgIGR1cmF0aW9uOiB0aGlzLm9wdGlvbnMub3V0RHVyYXRpb24sXHJcbiAgICAgICAgcXVldWU6IGZhbHNlLFxyXG4gICAgICAgIGVhc2U6ICdlYXNlT3V0Q3ViaWMnLFxyXG4gICAgICAgIC8vIEhhbmRsZSBtb2RhbCByZWFkeSBjYWxsYmFja1xyXG4gICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRlbFswXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgLy8gQ2FsbCBjb21wbGV0ZSBjYWxsYmFja1xyXG4gICAgICAgICAgaWYgKHR5cGVvZih0aGlzLm9wdGlvbnMuY29tcGxldGUpID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5jb21wbGV0ZS5jYWxsKHRoaXMsIHRoaXMuJGVsKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuJG92ZXJsYXlbMF0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLiRvdmVybGF5WzBdKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBCb3R0b20gc2hlZXQgYW5pbWF0aW9uXHJcbiAgICAgIGlmICh0aGlzLiRlbFswXS5jbGFzc0xpc3QuY29udGFpbnMoJ2JvdHRvbS1zaGVldCcpKSB7XHJcbiAgICAgICAgVmVsKFxyXG4gICAgICAgICAgdGhpcy4kZWxbMF0sXHJcbiAgICAgICAgICB7Ym90dG9tOiAnLTEwMCUnLCBvcGFjaXR5OiAwfSxcclxuICAgICAgICAgIGV4aXRWZWxvY2l0eU9wdGlvbnNcclxuICAgICAgICApO1xyXG5cclxuICAgICAgLy8gTm9ybWFsIG1vZGFsIGFuaW1hdGlvblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIFZlbChcclxuICAgICAgICAgIHRoaXMuJGVsWzBdLFxyXG4gICAgICAgICAge3RvcDogdGhpcy5vcHRpb25zLnN0YXJ0aW5nVG9wLCBvcGFjaXR5OiAwLCBzY2FsZVg6IDAuN30sXHJcbiAgICAgICAgICBleGl0VmVsb2NpdHlPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wZW4gTW9kYWxcclxuICAgICAqIEBwYXJhbSB7alF1ZXJ5fSBbJHRyaWdnZXJdXHJcbiAgICAgKi9cclxuICAgIG9wZW4oJHRyaWdnZXIpIHtcclxuICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XHJcbiAgICAgIGxldCBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG4gICAgICB0aGlzLiRlbFswXS5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodGhpcy4kb3ZlcmxheVswXSk7XHJcblxyXG4gICAgICAvLyBTZXQgb3BlbmluZyB0cmlnZ2VyLCB1bmRlZmluZWQgaW5kaWNhdGVzIG1vZGFsIHdhcyBvcGVuZWQgYnkgamF2YXNjcmlwdFxyXG4gICAgICB0aGlzLm9wZW5pbmdUcmlnZ2VyID0gISEkdHJpZ2dlciA/ICR0cmlnZ2VyIDogdW5kZWZpbmVkO1xyXG5cclxuXHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGlzbWlzc2libGUpIHtcclxuICAgICAgICB0aGlzLmhhbmRsZUtleWRvd25Cb3VuZCA9IHRoaXMuaGFuZGxlS2V5ZG93bi5iaW5kKHRoaXMpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleWRvd25Cb3VuZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuYW5pbWF0ZUluKCk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb3NlIE1vZGFsXHJcbiAgICAgKi9cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICBpZiAoIXRoaXMuaXNPcGVuKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLiRlbFswXS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcclxuXHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGlzbWlzc2libGUpIHtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlkb3duQm91bmQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmFuaW1hdGVPdXQoKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBtZW1iZXJvZiBNb2RhbFxyXG4gICAqL1xyXG4gIE1vZGFsLl9pbmNyZW1lbnQgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBAc3RhdGljXHJcbiAgICogQG1lbWJlcm9mIE1vZGFsXHJcbiAgICovXHJcbiAgTW9kYWwuX2NvdW50ID0gMDtcclxuXHJcbiAgTWF0ZXJpYWxpemUuTW9kYWwgPSBNb2RhbDtcclxuXHJcbiAgJC5mbi5tb2RhbCA9IGZ1bmN0aW9uKG1ldGhvZE9yT3B0aW9ucykge1xyXG4gICAgLy8gQ2FsbCBwbHVnaW4gbWV0aG9kIGlmIHZhbGlkIG1ldGhvZCBuYW1lIGlzIHBhc3NlZCBpblxyXG4gICAgaWYgKE1vZGFsLnByb3RvdHlwZVttZXRob2RPck9wdGlvbnNdKSB7XHJcbiAgICAgIC8vIEdldHRlciBtZXRob2RzXHJcbiAgICAgIGlmIChtZXRob2RPck9wdGlvbnMuc2xpY2UoMCwzKSA9PT0gJ2dldCcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maXJzdCgpWzBdLk1fTW9kYWxbbWV0aG9kT3JPcHRpb25zXSgpO1xyXG5cclxuICAgICAgLy8gVm9pZCBtZXRob2RzXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHRoaXMuTV9Nb2RhbFttZXRob2RPck9wdGlvbnNdKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAvLyBJbml0aWFsaXplIHBsdWdpbiBpZiBvcHRpb25zIG9yIG5vIGFyZ3VtZW50IGlzIHBhc3NlZCBpblxyXG4gICAgfSBlbHNlIGlmICggdHlwZW9mIG1ldGhvZE9yT3B0aW9ucyA9PT0gJ29iamVjdCcgfHwgISBtZXRob2RPck9wdGlvbnMgKSB7XHJcbiAgICAgIE1vZGFsLmluaXQodGhpcywgYXJndW1lbnRzWzBdKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgLy8gUmV0dXJuIGVycm9yIGlmIGFuIHVucmVjb2duaXplZCAgbWV0aG9kIG5hbWUgaXMgcGFzc2VkIGluXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkLmVycm9yKGBNZXRob2QgJHttZXRob2RPck9wdGlvbnN9IGRvZXMgbm90IGV4aXN0IG9uIGpRdWVyeS5tb2RhbGApO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG59KShqUXVlcnksIE1hdGVyaWFsaXplLlZlbCk7XHJcblxuKGZ1bmN0aW9uICgkKSB7XHJcblxyXG4gICQuZm4ubWF0ZXJpYWxib3ggPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpbml0aWFsaXplZCcpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdpbml0aWFsaXplZCcpO1xyXG5cclxuICAgICAgdmFyIG92ZXJsYXlBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdmFyIGRvbmVBbmltYXRpbmcgPSB0cnVlO1xyXG4gICAgICB2YXIgaW5EdXJhdGlvbiA9IDI3NTtcclxuICAgICAgdmFyIG91dER1cmF0aW9uID0gMjAwO1xyXG4gICAgICB2YXIgb3JpZ2luID0gJCh0aGlzKTtcclxuICAgICAgdmFyIHBsYWNlaG9sZGVyID0gJCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnbWF0ZXJpYWwtcGxhY2Vob2xkZXInKTtcclxuICAgICAgdmFyIG9yaWdpbmFsV2lkdGggPSAwO1xyXG4gICAgICB2YXIgb3JpZ2luYWxIZWlnaHQgPSAwO1xyXG4gICAgICB2YXIgYW5jZXN0b3JzQ2hhbmdlZDtcclxuICAgICAgdmFyIGFuY2VzdG9yO1xyXG4gICAgICB2YXIgb3JpZ2luSW5saW5lU3R5bGVzID0gb3JpZ2luLmF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgIG9yaWdpbi53cmFwKHBsYWNlaG9sZGVyKTtcclxuXHJcblxyXG4gICAgICAvLyBTdGFydCBjbGljayBoYW5kbGVyXHJcbiAgICAgIG9yaWdpbi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSBvcmlnaW4ucGFyZW50KCcubWF0ZXJpYWwtcGxhY2Vob2xkZXInKTtcclxuICAgICAgICB2YXIgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICB2YXIgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgIHZhciBvcmlnaW5hbFdpZHRoID0gb3JpZ2luLndpZHRoKCk7XHJcbiAgICAgICAgdmFyIG9yaWdpbmFsSGVpZ2h0ID0gb3JpZ2luLmhlaWdodCgpO1xyXG5cclxuXHJcbiAgICAgICAgLy8gSWYgYWxyZWFkeSBtb2RhbCwgcmV0dXJuIHRvIG9yaWdpbmFsXHJcbiAgICAgICAgaWYgKGRvbmVBbmltYXRpbmcgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICByZXR1cm5Ub09yaWdpbmFsKCk7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG92ZXJsYXlBY3RpdmUgJiYgZG9uZUFuaW1hdGluZz09PXRydWUpIHtcclxuICAgICAgICAgIHJldHVyblRvT3JpZ2luYWwoKTtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLyBTZXQgc3RhdGVzXHJcbiAgICAgICAgZG9uZUFuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgICAgIG9yaWdpbi5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgb3ZlcmxheUFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIFNldCBwb3NpdGlvbmluZyBmb3IgcGxhY2Vob2xkZXJcclxuICAgICAgICBwbGFjZWhvbGRlci5jc3Moe1xyXG4gICAgICAgICAgd2lkdGg6IHBsYWNlaG9sZGVyWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoLFxyXG4gICAgICAgICAgaGVpZ2h0OiBwbGFjZWhvbGRlclswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQsXHJcbiAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgIGxlZnQ6IDBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRmluZCBhbmNlc3RvciB3aXRoIG92ZXJmbG93OiBoaWRkZW47IGFuZCByZW1vdmUgaXRcclxuICAgICAgICBhbmNlc3RvcnNDaGFuZ2VkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGFuY2VzdG9yID0gcGxhY2Vob2xkZXJbMF0ucGFyZW50Tm9kZTtcclxuICAgICAgICB2YXIgY291bnQgPSAwO1xyXG4gICAgICAgIHdoaWxlIChhbmNlc3RvciAhPT0gbnVsbCAmJiAhJChhbmNlc3RvcikuaXMoZG9jdW1lbnQpKSB7XHJcbiAgICAgICAgICB2YXIgY3VyciA9ICQoYW5jZXN0b3IpO1xyXG4gICAgICAgICAgaWYgKGN1cnIuY3NzKCdvdmVyZmxvdycpICE9PSAndmlzaWJsZScpIHtcclxuICAgICAgICAgICAgY3Vyci5jc3MoJ292ZXJmbG93JywgJ3Zpc2libGUnKTtcclxuICAgICAgICAgICAgaWYgKGFuY2VzdG9yc0NoYW5nZWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgIGFuY2VzdG9yc0NoYW5nZWQgPSBjdXJyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFuY2VzdG9yc0NoYW5nZWQgPSBhbmNlc3RvcnNDaGFuZ2VkLmFkZChjdXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYW5jZXN0b3IgPSBhbmNlc3Rvci5wYXJlbnROb2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2V0IGNzcyBvbiBvcmlnaW5cclxuICAgICAgICBvcmlnaW4uY3NzKHtcclxuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgJ3otaW5kZXgnOiAxMDAwLFxyXG4gICAgICAgICAgJ3dpbGwtY2hhbmdlJzogJ2xlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5kYXRhKCd3aWR0aCcsIG9yaWdpbmFsV2lkdGgpXHJcbiAgICAgICAgLmRhdGEoJ2hlaWdodCcsIG9yaWdpbmFsSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgLy8gQWRkIG92ZXJsYXlcclxuICAgICAgICB2YXIgb3ZlcmxheSA9ICQoJzxkaXYgaWQ9XCJtYXRlcmlhbGJveC1vdmVybGF5XCI+PC9kaXY+JylcclxuICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmIChkb25lQW5pbWF0aW5nID09PSB0cnVlKVxyXG4gICAgICAgICAgICByZXR1cm5Ub09yaWdpbmFsKCk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gUHV0IGJlZm9yZSBpbiBvcmlnaW4gaW1hZ2UgdG8gcHJlc2VydmUgei1pbmRleCBsYXllcmluZy5cclxuICAgICAgICBvcmlnaW4uYmVmb3JlKG92ZXJsYXkpO1xyXG5cclxuICAgICAgICAvLyBTZXQgZGltZW5zaW9ucyBpZiBuZWVkZWRcclxuICAgICAgICB2YXIgb3ZlcmxheU9mZnNldCA9IG92ZXJsYXlbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgb3ZlcmxheS5jc3Moe1xyXG4gICAgICAgICAgd2lkdGg6IHdpbmRvd1dpZHRoLFxyXG4gICAgICAgICAgaGVpZ2h0OiB3aW5kb3dIZWlnaHQsXHJcbiAgICAgICAgICBsZWZ0OiAtMSAqIG92ZXJsYXlPZmZzZXQubGVmdCxcclxuICAgICAgICAgIHRvcDogLTEgKiBvdmVybGF5T2Zmc2V0LnRvcFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIEFuaW1hdGUgT3ZlcmxheVxyXG4gICAgICAgIG92ZXJsYXkudmVsb2NpdHkoe29wYWNpdHk6IDF9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB7ZHVyYXRpb246IGluRHVyYXRpb24sIHF1ZXVlOiBmYWxzZSwgZWFzaW5nOiAnZWFzZU91dFF1YWQnfSApO1xyXG5cclxuICAgICAgICAvLyBBZGQgYW5kIGFuaW1hdGUgY2FwdGlvbiBpZiBpdCBleGlzdHNcclxuICAgICAgICBpZiAob3JpZ2luLmRhdGEoJ2NhcHRpb24nKSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgdmFyICRwaG90b19jYXB0aW9uID0gJCgnPGRpdiBjbGFzcz1cIm1hdGVyaWFsYm94LWNhcHRpb25cIj48L2Rpdj4nKTtcclxuICAgICAgICAgICRwaG90b19jYXB0aW9uLnRleHQob3JpZ2luLmRhdGEoJ2NhcHRpb24nKSk7XHJcbiAgICAgICAgICAkKCdib2R5JykuYXBwZW5kKCRwaG90b19jYXB0aW9uKTtcclxuICAgICAgICAgICRwaG90b19jYXB0aW9uLmNzcyh7IFwiZGlzcGxheVwiOiBcImlubGluZVwiIH0pO1xyXG4gICAgICAgICAgJHBob3RvX2NhcHRpb24udmVsb2NpdHkoe29wYWNpdHk6IDF9LCB7ZHVyYXRpb246IGluRHVyYXRpb24sIHF1ZXVlOiBmYWxzZSwgZWFzaW5nOiAnZWFzZU91dFF1YWQnfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXNpemUgSW1hZ2VcclxuICAgICAgICB2YXIgcmF0aW8gPSAwO1xyXG4gICAgICAgIHZhciB3aWR0aFBlcmNlbnQgPSBvcmlnaW5hbFdpZHRoIC8gd2luZG93V2lkdGg7XHJcbiAgICAgICAgdmFyIGhlaWdodFBlcmNlbnQgPSBvcmlnaW5hbEhlaWdodCAvIHdpbmRvd0hlaWdodDtcclxuICAgICAgICB2YXIgbmV3V2lkdGggPSAwO1xyXG4gICAgICAgIHZhciBuZXdIZWlnaHQgPSAwO1xyXG5cclxuICAgICAgICBpZiAod2lkdGhQZXJjZW50ID4gaGVpZ2h0UGVyY2VudCkge1xyXG4gICAgICAgICAgcmF0aW8gPSBvcmlnaW5hbEhlaWdodCAvIG9yaWdpbmFsV2lkdGg7XHJcbiAgICAgICAgICBuZXdXaWR0aCA9IHdpbmRvd1dpZHRoICogMC45O1xyXG4gICAgICAgICAgbmV3SGVpZ2h0ID0gd2luZG93V2lkdGggKiAwLjkgKiByYXRpbztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICByYXRpbyA9IG9yaWdpbmFsV2lkdGggLyBvcmlnaW5hbEhlaWdodDtcclxuICAgICAgICAgIG5ld1dpZHRoID0gKHdpbmRvd0hlaWdodCAqIDAuOSkgKiByYXRpbztcclxuICAgICAgICAgIG5ld0hlaWdodCA9IHdpbmRvd0hlaWdodCAqIDAuOTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFuaW1hdGUgaW1hZ2UgKyBzZXQgei1pbmRleFxyXG4gICAgICAgIGlmKG9yaWdpbi5oYXNDbGFzcygncmVzcG9uc2l2ZS1pbWcnKSkge1xyXG4gICAgICAgICAgb3JpZ2luLnZlbG9jaXR5KHsnbWF4LXdpZHRoJzogbmV3V2lkdGgsICd3aWR0aCc6IG9yaWdpbmFsV2lkdGh9LCB7ZHVyYXRpb246IDAsIHF1ZXVlOiBmYWxzZSxcclxuICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgb3JpZ2luLmNzcyh7bGVmdDogMCwgdG9wOiAwfSlcclxuICAgICAgICAgICAgICAudmVsb2NpdHkoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIGhlaWdodDogbmV3SGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICB3aWR0aDogbmV3V2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgIGxlZnQ6ICQoZG9jdW1lbnQpLnNjcm9sbExlZnQoKSArIHdpbmRvd1dpZHRoLzIgLSBvcmlnaW4ucGFyZW50KCcubWF0ZXJpYWwtcGxhY2Vob2xkZXInKS5vZmZzZXQoKS5sZWZ0IC0gbmV3V2lkdGgvMixcclxuICAgICAgICAgICAgICAgICAgdG9wOiAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSArIHdpbmRvd0hlaWdodC8yIC0gb3JpZ2luLnBhcmVudCgnLm1hdGVyaWFsLXBsYWNlaG9sZGVyJykub2Zmc2V0KCkudG9wIC0gbmV3SGVpZ2h0LyAyXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjogaW5EdXJhdGlvbixcclxuICAgICAgICAgICAgICAgICAgcXVldWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICBlYXNpbmc6ICdlYXNlT3V0UXVhZCcsXHJcbiAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpe2RvbmVBbmltYXRpbmcgPSB0cnVlO31cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IC8vIEVuZCBDb21wbGV0ZVxyXG4gICAgICAgICAgfSk7IC8vIEVuZCBWZWxvY2l0eVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIG9yaWdpbi5jc3MoJ2xlZnQnLCAwKVxyXG4gICAgICAgICAgLmNzcygndG9wJywgMClcclxuICAgICAgICAgIC52ZWxvY2l0eShcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGhlaWdodDogbmV3SGVpZ2h0LFxyXG4gICAgICAgICAgICAgIHdpZHRoOiBuZXdXaWR0aCxcclxuICAgICAgICAgICAgICBsZWZ0OiAkKGRvY3VtZW50KS5zY3JvbGxMZWZ0KCkgKyB3aW5kb3dXaWR0aC8yIC0gb3JpZ2luLnBhcmVudCgnLm1hdGVyaWFsLXBsYWNlaG9sZGVyJykub2Zmc2V0KCkubGVmdCAtIG5ld1dpZHRoLzIsXHJcbiAgICAgICAgICAgICAgdG9wOiAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSArIHdpbmRvd0hlaWdodC8yIC0gb3JpZ2luLnBhcmVudCgnLm1hdGVyaWFsLXBsYWNlaG9sZGVyJykub2Zmc2V0KCkudG9wIC0gbmV3SGVpZ2h0LyAyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBkdXJhdGlvbjogaW5EdXJhdGlvbixcclxuICAgICAgICAgICAgICBxdWV1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgZWFzaW5nOiAnZWFzZU91dFF1YWQnLFxyXG4gICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpe2RvbmVBbmltYXRpbmcgPSB0cnVlO31cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApOyAvLyBFbmQgVmVsb2NpdHlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEhhbmRsZSBFeGl0IHRyaWdnZXJzXHJcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwubWF0ZXJpYWxib3gnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmIChvdmVybGF5QWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVyblRvT3JpZ2luYWwoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUubWF0ZXJpYWxib3gnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmIChvdmVybGF5QWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVyblRvT3JpZ2luYWwoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2tleXVwLm1hdGVyaWFsYm94JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgLy8gRVNDIGtleVxyXG4gICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcgJiZcclxuICAgICAgICAgICAgICBkb25lQW5pbWF0aW5nID09PSB0cnVlICYmXHJcbiAgICAgICAgICAgICAgb3ZlcmxheUFjdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm5Ub09yaWdpbmFsKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KTsgLy8gRW5kIGNsaWNrIGhhbmRsZXJcclxuXHJcblxyXG4gICAgICAvLyBUaGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIG1vZGFsZWQgaW1hZ2UgdG8gdGhlIG9yaWdpbmFsIHNwb3RcclxuICAgICAgZnVuY3Rpb24gcmV0dXJuVG9PcmlnaW5hbCgpIHtcclxuXHJcbiAgICAgICAgZG9uZUFuaW1hdGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSBvcmlnaW4ucGFyZW50KCcubWF0ZXJpYWwtcGxhY2Vob2xkZXInKTtcclxuICAgICAgICB2YXIgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICB2YXIgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgIHZhciBvcmlnaW5hbFdpZHRoID0gb3JpZ2luLmRhdGEoJ3dpZHRoJyk7XHJcbiAgICAgICAgdmFyIG9yaWdpbmFsSGVpZ2h0ID0gb3JpZ2luLmRhdGEoJ2hlaWdodCcpO1xyXG5cclxuICAgICAgICBvcmlnaW4udmVsb2NpdHkoXCJzdG9wXCIsIHRydWUpO1xyXG4gICAgICAgICQoJyNtYXRlcmlhbGJveC1vdmVybGF5JykudmVsb2NpdHkoXCJzdG9wXCIsIHRydWUpO1xyXG4gICAgICAgICQoJy5tYXRlcmlhbGJveC1jYXB0aW9uJykudmVsb2NpdHkoXCJzdG9wXCIsIHRydWUpO1xyXG5cclxuICAgICAgICAvLyBkaXNhYmxlIGV4aXQgaGFuZGxlcnNcclxuICAgICAgICAkKHdpbmRvdykub2ZmKCdzY3JvbGwubWF0ZXJpYWxib3gnKTtcclxuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2tleXVwLm1hdGVyaWFsYm94Jyk7XHJcbiAgICAgICAgJCh3aW5kb3cpLm9mZigncmVzaXplLm1hdGVyaWFsYm94Jyk7XHJcblxyXG4gICAgICAgICQoJyNtYXRlcmlhbGJveC1vdmVybGF5JykudmVsb2NpdHkoe29wYWNpdHk6IDB9LCB7XHJcbiAgICAgICAgICBkdXJhdGlvbjogb3V0RHVyYXRpb24sIC8vIERlbGF5IHByZXZlbnRzIGFuaW1hdGlvbiBvdmVybGFwcGluZ1xyXG4gICAgICAgICAgcXVldWU6IGZhbHNlLCBlYXNpbmc6ICdlYXNlT3V0UXVhZCcsXHJcbiAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIE92ZXJsYXlcclxuICAgICAgICAgICAgb3ZlcmxheUFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBSZXNpemUgSW1hZ2VcclxuICAgICAgICBvcmlnaW4udmVsb2NpdHkoXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBvcmlnaW5hbFdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IG9yaWdpbmFsSGVpZ2h0LFxyXG4gICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICB0b3A6IDBcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBvdXREdXJhdGlvbixcclxuICAgICAgICAgICAgcXVldWU6IGZhbHNlLCBlYXNpbmc6ICdlYXNlT3V0UXVhZCcsXHJcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlci5jc3Moe1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnJyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAnJyxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnJyxcclxuICAgICAgICAgICAgICAgIHRvcDogJycsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiAnJ1xyXG4gICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICBvcmlnaW4ucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICBvcmlnaW4uYXR0cignc3R5bGUnLCBvcmlnaW5JbmxpbmVTdHlsZXMpO1xyXG5cclxuICAgICAgICAgICAgICAvLyBSZW1vdmUgY2xhc3NcclxuICAgICAgICAgICAgICBvcmlnaW4ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgIGRvbmVBbmltYXRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAvLyBSZW1vdmUgb3ZlcmZsb3cgb3ZlcnJpZGVzIG9uIGFuY2VzdG9yc1xyXG4gICAgICAgICAgICAgIGlmIChhbmNlc3RvcnNDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICBhbmNlc3RvcnNDaGFuZ2VkLmNzcygnb3ZlcmZsb3cnLCAnJyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIENhcHRpb24gKyByZXNldCBjc3Mgc2V0dGluZ3Mgb24gaW1hZ2VcclxuICAgICAgICAkKCcubWF0ZXJpYWxib3gtY2FwdGlvbicpLnZlbG9jaXR5KHtvcGFjaXR5OiAwfSwge1xyXG4gICAgICAgICAgZHVyYXRpb246IG91dER1cmF0aW9uLCAvLyBEZWxheSBwcmV2ZW50cyBhbmltYXRpb24gb3ZlcmxhcHBpbmdcclxuICAgICAgICAgIHF1ZXVlOiBmYWxzZSwgZWFzaW5nOiAnZWFzZU91dFF1YWQnLFxyXG4gICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgJCgnLm1hdGVyaWFsYm94ZWQnKS5tYXRlcmlhbGJveCgpO1xyXG4gIH0pO1xyXG5cclxufSggalF1ZXJ5ICkpO1xyXG5cbihmdW5jdGlvbiAoJCkge1xyXG5cclxuICAkLmZuLnBhcmFsbGF4ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHdpbmRvd193aWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xyXG4gICAgLy8gUGFyYWxsYXggU2NyaXB0c1xyXG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpKSB7XHJcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICR0aGlzLmFkZENsYXNzKCdwYXJhbGxheCcpO1xyXG5cclxuICAgICAgZnVuY3Rpb24gdXBkYXRlUGFyYWxsYXgoaW5pdGlhbCkge1xyXG4gICAgICAgIHZhciBjb250YWluZXJfaGVpZ2h0O1xyXG4gICAgICAgIGlmICh3aW5kb3dfd2lkdGggPCA2MDEpIHtcclxuICAgICAgICAgIGNvbnRhaW5lcl9oZWlnaHQgPSAoJHRoaXMuaGVpZ2h0KCkgPiAwKSA/ICR0aGlzLmhlaWdodCgpIDogJHRoaXMuY2hpbGRyZW4oXCJpbWdcIikuaGVpZ2h0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgY29udGFpbmVyX2hlaWdodCA9ICgkdGhpcy5oZWlnaHQoKSA+IDApID8gJHRoaXMuaGVpZ2h0KCkgOiA1MDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciAkaW1nID0gJHRoaXMuY2hpbGRyZW4oXCJpbWdcIikuZmlyc3QoKTtcclxuICAgICAgICB2YXIgaW1nX2hlaWdodCA9ICRpbWcuaGVpZ2h0KCk7XHJcbiAgICAgICAgdmFyIHBhcmFsbGF4X2Rpc3QgPSBpbWdfaGVpZ2h0IC0gY29udGFpbmVyX2hlaWdodDtcclxuICAgICAgICB2YXIgYm90dG9tID0gJHRoaXMub2Zmc2V0KCkudG9wICsgY29udGFpbmVyX2hlaWdodDtcclxuICAgICAgICB2YXIgdG9wID0gJHRoaXMub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgIHZhciBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgdmFyIHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgICB2YXIgd2luZG93Qm90dG9tID0gc2Nyb2xsVG9wICsgd2luZG93SGVpZ2h0O1xyXG4gICAgICAgIHZhciBwZXJjZW50U2Nyb2xsZWQgPSAod2luZG93Qm90dG9tIC0gdG9wKSAvIChjb250YWluZXJfaGVpZ2h0ICsgd2luZG93SGVpZ2h0KTtcclxuICAgICAgICB2YXIgcGFyYWxsYXggPSBNYXRoLnJvdW5kKChwYXJhbGxheF9kaXN0ICogcGVyY2VudFNjcm9sbGVkKSk7XHJcblxyXG4gICAgICAgIGlmIChpbml0aWFsKSB7XHJcbiAgICAgICAgICAkaW1nLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKGJvdHRvbSA+IHNjcm9sbFRvcCkgJiYgKHRvcCA8IChzY3JvbGxUb3AgKyB3aW5kb3dIZWlnaHQpKSkge1xyXG4gICAgICAgICAgJGltZy5jc3MoJ3RyYW5zZm9ybScsIFwidHJhbnNsYXRlM0QoLTUwJSxcIiArIHBhcmFsbGF4ICsgXCJweCwgMClcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gV2FpdCBmb3IgaW1hZ2UgbG9hZFxyXG4gICAgICAkdGhpcy5jaGlsZHJlbihcImltZ1wiKS5vbmUoXCJsb2FkXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHVwZGF0ZVBhcmFsbGF4KHRydWUpO1xyXG4gICAgICB9KS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbXBsZXRlKSAkKHRoaXMpLnRyaWdnZXIoXCJsb2FkXCIpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2luZG93X3dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XHJcbiAgICAgICAgdXBkYXRlUGFyYWxsYXgoZmFsc2UpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2luZG93X3dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XHJcbiAgICAgICAgdXBkYXRlUGFyYWxsYXgoZmFsc2UpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgfTtcclxufSggalF1ZXJ5ICkpO1xyXG5cbihmdW5jdGlvbiAoJCkge1xyXG5cclxuICB2YXIgbWV0aG9kcyA9IHtcclxuICAgIGluaXQgOiBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICAgIHZhciBkZWZhdWx0cyA9IHtcclxuICAgICAgICBvblNob3c6IG51bGwsXHJcbiAgICAgICAgc3dpcGVhYmxlOiBmYWxzZSxcclxuICAgICAgICByZXNwb25zaXZlVGhyZXNob2xkOiBJbmZpbml0eSwgLy8gYnJlYWtwb2ludCBmb3Igc3dpcGVhYmxlXHJcbiAgICAgIH07XHJcbiAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZChkZWZhdWx0cywgb3B0aW9ucyk7XHJcbiAgICAgIHZhciBuYW1lc3BhY2UgPSBNYXRlcmlhbGl6ZS5vYmplY3RTZWxlY3RvclN0cmluZygkKHRoaXMpKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oaSkge1xyXG5cclxuICAgICAgdmFyIHVuaXF1ZU5hbWVzcGFjZSA9IG5hbWVzcGFjZStpO1xyXG5cclxuICAgICAgLy8gRm9yIGVhY2ggc2V0IG9mIHRhYnMsIHdlIHdhbnQgdG8ga2VlcCB0cmFjayBvZlxyXG4gICAgICAvLyB3aGljaCB0YWIgaXMgYWN0aXZlIGFuZCBpdHMgYXNzb2NpYXRlZCBjb250ZW50XHJcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICB3aW5kb3dfd2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcclxuXHJcbiAgICAgIHZhciAkYWN0aXZlLCAkY29udGVudCwgJGxpbmtzID0gJHRoaXMuZmluZCgnbGkudGFiIGEnKSxcclxuICAgICAgICAgICR0YWJzX3dpZHRoID0gJHRoaXMud2lkdGgoKSxcclxuICAgICAgICAgICR0YWJzX2NvbnRlbnQgPSAkKCksXHJcbiAgICAgICAgICAkdGFic193cmFwcGVyLFxyXG4gICAgICAgICAgJHRhYl93aWR0aCA9IE1hdGgubWF4KCR0YWJzX3dpZHRoLCAkdGhpc1swXS5zY3JvbGxXaWR0aCkgLyAkbGlua3MubGVuZ3RoLFxyXG4gICAgICAgICAgJGluZGljYXRvcixcclxuICAgICAgICAgIGluZGV4ID0gMCxcclxuICAgICAgICAgIHByZXZfaW5kZXggPSAwLFxyXG4gICAgICAgICAgY2xpY2tlZCA9IGZhbHNlLFxyXG4gICAgICAgICAgY2xpY2tlZFRpbWVvdXQsXHJcbiAgICAgICAgICB0cmFuc2l0aW9uID0gMzAwO1xyXG5cclxuXHJcbiAgICAgIC8vIEZpbmRzIHJpZ2h0IGF0dHJpYnV0ZSBmb3IgaW5kaWNhdG9yIGJhc2VkIG9uIGFjdGl2ZSB0YWIuXHJcbiAgICAgIC8vIGVsOiBqUXVlcnkgT2JqZWN0XHJcbiAgICAgICAgdmFyIGNhbGNSaWdodFBvcyA9IGZ1bmN0aW9uKGVsKSB7XHJcbiAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKCR0YWJzX3dpZHRoIC0gZWwucG9zaXRpb24oKS5sZWZ0IC0gZWxbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggLSAkdGhpcy5zY3JvbGxMZWZ0KCkpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gRmluZHMgbGVmdCBhdHRyaWJ1dGUgZm9yIGluZGljYXRvciBiYXNlZCBvbiBhY3RpdmUgdGFiLlxyXG4gICAgICAvLyBlbDogalF1ZXJ5IE9iamVjdFxyXG4gICAgICB2YXIgY2FsY0xlZnRQb3MgPSBmdW5jdGlvbihlbCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKGVsLnBvc2l0aW9uKCkubGVmdCArICR0aGlzLnNjcm9sbExlZnQoKSk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBBbmltYXRlcyBJbmRpY2F0b3IgdG8gYWN0aXZlIHRhYi5cclxuICAgICAgLy8gcHJldl9pbmRleDogTnVtYmVyXHJcbiAgICAgIHZhciBhbmltYXRlSW5kaWNhdG9yID0gZnVuY3Rpb24ocHJldl9pbmRleCkge1xyXG4gICAgICAgIGlmICgoaW5kZXggLSBwcmV2X2luZGV4KSA+PSAwKSB7XHJcbiAgICAgICAgICAkaW5kaWNhdG9yLnZlbG9jaXR5KHtcInJpZ2h0XCI6IGNhbGNSaWdodFBvcygkYWN0aXZlKSB9LCB7IGR1cmF0aW9uOiB0cmFuc2l0aW9uLCBxdWV1ZTogZmFsc2UsIGVhc2luZzogJ2Vhc2VPdXRRdWFkJ30pO1xyXG4gICAgICAgICAgJGluZGljYXRvci52ZWxvY2l0eSh7XCJsZWZ0XCI6IGNhbGNMZWZ0UG9zKCRhY3RpdmUpIH0sIHtkdXJhdGlvbjogdHJhbnNpdGlvbiwgcXVldWU6IGZhbHNlLCBlYXNpbmc6ICdlYXNlT3V0UXVhZCcsIGRlbGF5OiA5MH0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJGluZGljYXRvci52ZWxvY2l0eSh7XCJsZWZ0XCI6IGNhbGNMZWZ0UG9zKCRhY3RpdmUpIH0sIHsgZHVyYXRpb246IHRyYW5zaXRpb24sIHF1ZXVlOiBmYWxzZSwgZWFzaW5nOiAnZWFzZU91dFF1YWQnfSk7XHJcbiAgICAgICAgICAkaW5kaWNhdG9yLnZlbG9jaXR5KHtcInJpZ2h0XCI6IGNhbGNSaWdodFBvcygkYWN0aXZlKSB9LCB7ZHVyYXRpb246IHRyYW5zaXRpb24sIHF1ZXVlOiBmYWxzZSwgZWFzaW5nOiAnZWFzZU91dFF1YWQnLCBkZWxheTogOTB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBDaGFuZ2Ugc3dpcGVhYmxlIGFjY29yZGluZyB0byByZXNwb25zaXZlIHRocmVzaG9sZFxyXG4gICAgICBpZiAob3B0aW9ucy5zd2lwZWFibGUpIHtcclxuICAgICAgICBpZiAod2luZG93X3dpZHRoID4gb3B0aW9ucy5yZXNwb25zaXZlVGhyZXNob2xkKSB7XHJcbiAgICAgICAgICBvcHRpb25zLnN3aXBlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIC8vIElmIHRoZSBsb2NhdGlvbi5oYXNoIG1hdGNoZXMgb25lIG9mIHRoZSBsaW5rcywgdXNlIHRoYXQgYXMgdGhlIGFjdGl2ZSB0YWIuXHJcbiAgICAgICRhY3RpdmUgPSAkKCRsaW5rcy5maWx0ZXIoJ1tocmVmPVwiJytsb2NhdGlvbi5oYXNoKydcIl0nKSk7XHJcblxyXG4gICAgICAvLyBJZiBubyBtYXRjaCBpcyBmb3VuZCwgdXNlIHRoZSBmaXJzdCBsaW5rIG9yIGFueSB3aXRoIGNsYXNzICdhY3RpdmUnIGFzIHRoZSBpbml0aWFsIGFjdGl2ZSB0YWIuXHJcbiAgICAgIGlmICgkYWN0aXZlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICRhY3RpdmUgPSAkKHRoaXMpLmZpbmQoJ2xpLnRhYiBhLmFjdGl2ZScpLmZpcnN0KCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCRhY3RpdmUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgJGFjdGl2ZSA9ICQodGhpcykuZmluZCgnbGkudGFiIGEnKS5maXJzdCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkYWN0aXZlLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgaW5kZXggPSAkbGlua3MuaW5kZXgoJGFjdGl2ZSk7XHJcbiAgICAgIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgkYWN0aXZlWzBdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAkY29udGVudCA9ICQoJGFjdGl2ZVswXS5oYXNoKTtcclxuICAgICAgICAkY29udGVudC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGFwcGVuZCBpbmRpY2F0b3IgdGhlbiBzZXQgaW5kaWNhdG9yIHdpZHRoIHRvIHRhYiB3aWR0aFxyXG4gICAgICBpZiAoISR0aGlzLmZpbmQoJy5pbmRpY2F0b3InKS5sZW5ndGgpIHtcclxuICAgICAgICAkdGhpcy5hcHBlbmQoJzxsaSBjbGFzcz1cImluZGljYXRvclwiPjwvbGk+Jyk7XHJcbiAgICAgIH1cclxuICAgICAgJGluZGljYXRvciA9ICR0aGlzLmZpbmQoJy5pbmRpY2F0b3InKTtcclxuXHJcbiAgICAgIC8vIHdlIG1ha2Ugc3VyZSB0aGF0IHRoZSBpbmRpY2F0b3IgaXMgYXQgdGhlIGVuZCBvZiB0aGUgdGFic1xyXG4gICAgICAkdGhpcy5hcHBlbmQoJGluZGljYXRvcik7XHJcblxyXG4gICAgICBpZiAoJHRoaXMuaXMoXCI6dmlzaWJsZVwiKSkge1xyXG4gICAgICAgIC8vICRpbmRpY2F0b3IuY3NzKHtcInJpZ2h0XCI6ICR0YWJzX3dpZHRoIC0gKChpbmRleCArIDEpICogJHRhYl93aWR0aCl9KTtcclxuICAgICAgICAvLyAkaW5kaWNhdG9yLmNzcyh7XCJsZWZ0XCI6IGluZGV4ICogJHRhYl93aWR0aH0pO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAkaW5kaWNhdG9yLmNzcyh7XCJyaWdodFwiOiBjYWxjUmlnaHRQb3MoJGFjdGl2ZSkgfSk7XHJcbiAgICAgICAgICAkaW5kaWNhdG9yLmNzcyh7XCJsZWZ0XCI6IGNhbGNMZWZ0UG9zKCRhY3RpdmUpIH0pO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgICB9XHJcbiAgICAgICQod2luZG93KS5vZmYoJ3Jlc2l6ZS50YWJzLScrdW5pcXVlTmFtZXNwYWNlKS5vbigncmVzaXplLnRhYnMtJyt1bmlxdWVOYW1lc3BhY2UsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkdGFic193aWR0aCA9ICR0aGlzLndpZHRoKCk7XHJcbiAgICAgICAgJHRhYl93aWR0aCA9IE1hdGgubWF4KCR0YWJzX3dpZHRoLCAkdGhpc1swXS5zY3JvbGxXaWR0aCkgLyAkbGlua3MubGVuZ3RoO1xyXG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCR0YWJfd2lkdGggIT09IDAgJiYgJHRhYnNfd2lkdGggIT09IDApIHtcclxuICAgICAgICAgICRpbmRpY2F0b3IuY3NzKHtcInJpZ2h0XCI6IGNhbGNSaWdodFBvcygkYWN0aXZlKSB9KTtcclxuICAgICAgICAgICRpbmRpY2F0b3IuY3NzKHtcImxlZnRcIjogY2FsY0xlZnRQb3MoJGFjdGl2ZSkgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIEluaXRpYWxpemUgVGFicyBDb250ZW50LlxyXG4gICAgICBpZiAob3B0aW9ucy5zd2lwZWFibGUpIHtcclxuICAgICAgICAvLyBUT0RPOiBEdXBsaWNhdGUgY2FsbHMgd2l0aCBzd2lwZWFibGU/IGhhbmRsZSBtdWx0aXBsZSBkaXYgd3JhcHBpbmcuXHJcbiAgICAgICAgJGxpbmtzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgdmFyICRjdXJyX2NvbnRlbnQgPSAkKE1hdGVyaWFsaXplLmVzY2FwZUhhc2godGhpcy5oYXNoKSk7XHJcbiAgICAgICAgICAkY3Vycl9jb250ZW50LmFkZENsYXNzKCdjYXJvdXNlbC1pdGVtJyk7XHJcbiAgICAgICAgICAkdGFic19jb250ZW50ID0gJHRhYnNfY29udGVudC5hZGQoJGN1cnJfY29udGVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHRhYnNfd3JhcHBlciA9ICR0YWJzX2NvbnRlbnQud3JhcEFsbCgnPGRpdiBjbGFzcz1cInRhYnMtY29udGVudCBjYXJvdXNlbFwiPjwvZGl2PicpO1xyXG4gICAgICAgICR0YWJzX2NvbnRlbnQuY3NzKCdkaXNwbGF5JywgJycpO1xyXG4gICAgICAgICQoJy50YWJzLWNvbnRlbnQuY2Fyb3VzZWwnKS5jYXJvdXNlbCh7XHJcbiAgICAgICAgICBmdWxsV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICBub1dyYXA6IHRydWUsXHJcbiAgICAgICAgICBvbkN5Y2xlVG86IGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKCFjbGlja2VkKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHByZXZfaW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICBpbmRleCA9ICR0YWJzX3dyYXBwZXIuaW5kZXgoaXRlbSk7XHJcbiAgICAgICAgICAgICAgJGFjdGl2ZS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgJGFjdGl2ZSA9ICRsaW5rcy5lcShpbmRleCk7XHJcbiAgICAgICAgICAgICAgJGFjdGl2ZS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgYW5pbWF0ZUluZGljYXRvcihwcmV2X2luZGV4KTtcclxuICAgICAgICAgICAgICBpZiAodHlwZW9mKG9wdGlvbnMub25TaG93KSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLm9uU2hvdy5jYWxsKCR0aGlzWzBdLCAkY29udGVudCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEhpZGUgdGhlIHJlbWFpbmluZyBjb250ZW50XHJcbiAgICAgICAgJGxpbmtzLm5vdCgkYWN0aXZlKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICQoTWF0ZXJpYWxpemUuZXNjYXBlSGFzaCh0aGlzLmhhc2gpKS5oaWRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICAvLyBCaW5kIHRoZSBjbGljayBldmVudCBoYW5kbGVyXHJcbiAgICAgICR0aGlzLm9mZignY2xpY2sudGFicycpLm9uKCdjbGljay50YWJzJywgJ2EnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkuaGFzQ2xhc3MoJ2Rpc2FibGVkJykpIHtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFjdCBhcyByZWd1bGFyIGxpbmsgaWYgdGFyZ2V0IGF0dHJpYnV0ZSBpcyBzcGVjaWZpZWQuXHJcbiAgICAgICAgaWYgKCEhJCh0aGlzKS5hdHRyKFwidGFyZ2V0XCIpKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbGlja2VkID0gdHJ1ZTtcclxuICAgICAgICAkdGFic193aWR0aCA9ICR0aGlzLndpZHRoKCk7XHJcbiAgICAgICAgJHRhYl93aWR0aCA9IE1hdGgubWF4KCR0YWJzX3dpZHRoLCAkdGhpc1swXS5zY3JvbGxXaWR0aCkgLyAkbGlua3MubGVuZ3RoO1xyXG5cclxuICAgICAgICAvLyBNYWtlIHRoZSBvbGQgdGFiIGluYWN0aXZlLlxyXG4gICAgICAgICRhY3RpdmUucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHZhciAkb2xkQ29udGVudCA9ICRjb250ZW50XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgdmFyaWFibGVzIHdpdGggdGhlIG5ldyBsaW5rIGFuZCBjb250ZW50XHJcbiAgICAgICAgJGFjdGl2ZSA9ICQodGhpcyk7XHJcbiAgICAgICAgJGNvbnRlbnQgPSAkKE1hdGVyaWFsaXplLmVzY2FwZUhhc2godGhpcy5oYXNoKSk7XHJcbiAgICAgICAgJGxpbmtzID0gJHRoaXMuZmluZCgnbGkudGFiIGEnKTtcclxuICAgICAgICB2YXIgYWN0aXZlUmVjdCA9ICRhY3RpdmUucG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgLy8gTWFrZSB0aGUgdGFiIGFjdGl2ZS5cclxuICAgICAgICAkYWN0aXZlLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBwcmV2X2luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgaW5kZXggPSAkbGlua3MuaW5kZXgoJCh0aGlzKSk7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgaW5kZXggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBDaGFuZ2UgdXJsIHRvIGN1cnJlbnQgdGFiXHJcbiAgICAgICAgLy8gd2luZG93LmxvY2F0aW9uLmhhc2ggPSAkYWN0aXZlLmF0dHIoJ2hyZWYnKTtcclxuXHJcbiAgICAgICAgLy8gU3dhcCBjb250ZW50XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuc3dpcGVhYmxlKSB7XHJcbiAgICAgICAgICBpZiAoJHRhYnNfY29udGVudC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJHRhYnNfY29udGVudC5jYXJvdXNlbCgnc2V0JywgaW5kZXgsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIGlmICh0eXBlb2Yob3B0aW9ucy5vblNob3cpID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMub25TaG93LmNhbGwoJHRoaXNbMF0sICRjb250ZW50KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoJGNvbnRlbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAkY29udGVudC5zaG93KCk7XHJcbiAgICAgICAgICAgICRjb250ZW50LmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZihvcHRpb25zLm9uU2hvdykgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgIG9wdGlvbnMub25TaG93LmNhbGwodGhpcywgJGNvbnRlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKCRvbGRDb250ZW50ICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICAgICAgICAhJG9sZENvbnRlbnQuaXMoJGNvbnRlbnQpKSB7XHJcbiAgICAgICAgICAgICRvbGRDb250ZW50LmhpZGUoKTtcclxuICAgICAgICAgICAgJG9sZENvbnRlbnQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVzZXQgY2xpY2tlZCBzdGF0ZVxyXG4gICAgICAgIGNsaWNrZWRUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpeyBjbGlja2VkID0gZmFsc2U7IH0sIHRyYW5zaXRpb24pO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgaW5kaWNhdG9yXHJcbiAgICAgICAgYW5pbWF0ZUluZGljYXRvcihwcmV2X2luZGV4KTtcclxuXHJcbiAgICAgICAgLy8gUHJldmVudCB0aGUgYW5jaG9yJ3MgZGVmYXVsdCBjbGljayBhY3Rpb25cclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgfSxcclxuICAgIHNlbGVjdF90YWIgOiBmdW5jdGlvbiggaWQgKSB7XHJcbiAgICAgIHRoaXMuZmluZCgnYVtocmVmPVwiIycgKyBpZCArICdcIl0nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gICQuZm4udGFicyA9IGZ1bmN0aW9uKG1ldGhvZE9yT3B0aW9ucykge1xyXG4gICAgaWYgKCBtZXRob2RzW21ldGhvZE9yT3B0aW9uc10gKSB7XHJcbiAgICAgIHJldHVybiBtZXRob2RzWyBtZXRob2RPck9wdGlvbnMgXS5hcHBseSggdGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoIGFyZ3VtZW50cywgMSApKTtcclxuICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBtZXRob2RPck9wdGlvbnMgPT09ICdvYmplY3QnIHx8ICEgbWV0aG9kT3JPcHRpb25zICkge1xyXG4gICAgICAvLyBEZWZhdWx0IHRvIFwiaW5pdFwiXHJcbiAgICAgIHJldHVybiBtZXRob2RzLmluaXQuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJC5lcnJvciggJ01ldGhvZCAnICsgIG1ldGhvZE9yT3B0aW9ucyArICcgZG9lcyBub3QgZXhpc3Qgb24galF1ZXJ5LnRhYnMnICk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICAgICQoJ3VsLnRhYnMnKS50YWJzKCk7XHJcbiAgfSk7XHJcbn0oIGpRdWVyeSApKTtcclxuXG4oZnVuY3Rpb24gKCQpIHtcclxuICAgICQuZm4udG9vbHRpcCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgIHZhciB0aW1lb3V0ID0gbnVsbCxcclxuICAgICAgbWFyZ2luID0gNTtcclxuXHJcbiAgICAgIC8vIERlZmF1bHRzXHJcbiAgICAgIHZhciBkZWZhdWx0cyA9IHtcclxuICAgICAgICBkZWxheTogMzUwLFxyXG4gICAgICAgIHRvb2x0aXA6ICcnLFxyXG4gICAgICAgIHBvc2l0aW9uOiAnYm90dG9tJyxcclxuICAgICAgICBodG1sOiBmYWxzZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gUmVtb3ZlIHRvb2x0aXAgZnJvbSB0aGUgYWN0aXZhdG9yXHJcbiAgICAgIGlmIChvcHRpb25zID09PSBcInJlbW92ZVwiKSB7XHJcbiAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgJCgnIycgKyAkKHRoaXMpLmF0dHIoJ2RhdGEtdG9vbHRpcC1pZCcpKS5yZW1vdmUoKTtcclxuICAgICAgICAgICQodGhpcykucmVtb3ZlQXR0cignZGF0YS10b29sdGlwLWlkJyk7XHJcbiAgICAgICAgICAkKHRoaXMpLm9mZignbW91c2VlbnRlci50b29sdGlwIG1vdXNlbGVhdmUudG9vbHRpcCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHRvb2x0aXBJZCA9IE1hdGVyaWFsaXplLmd1aWQoKTtcclxuICAgICAgICB2YXIgb3JpZ2luID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgLy8gRGVzdHJveSBvbGQgdG9vbHRpcFxyXG4gICAgICAgIGlmIChvcmlnaW4uYXR0cignZGF0YS10b29sdGlwLWlkJykpIHtcclxuICAgICAgICAgICQoJyMnICsgb3JpZ2luLmF0dHIoJ2RhdGEtdG9vbHRpcC1pZCcpKS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9yaWdpbi5hdHRyKCdkYXRhLXRvb2x0aXAtaWQnLCB0b29sdGlwSWQpO1xyXG5cclxuICAgICAgICAvLyBHZXQgYXR0cmlidXRlcy5cclxuICAgICAgICB2YXIgYWxsb3dIdG1sLFxyXG4gICAgICAgICAgICB0b29sdGlwRGVsYXksXHJcbiAgICAgICAgICAgIHRvb2x0aXBQb3NpdGlvbixcclxuICAgICAgICAgICAgdG9vbHRpcFRleHQsXHJcbiAgICAgICAgICAgIHRvb2x0aXBFbCxcclxuICAgICAgICAgICAgYmFja2Ryb3A7XHJcbiAgICAgICAgdmFyIHNldEF0dHJpYnV0ZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGFsbG93SHRtbCA9IG9yaWdpbi5hdHRyKCdkYXRhLWh0bWwnKSA/IG9yaWdpbi5hdHRyKCdkYXRhLWh0bWwnKSA9PT0gJ3RydWUnIDogb3B0aW9ucy5odG1sO1xyXG4gICAgICAgICAgdG9vbHRpcERlbGF5ID0gb3JpZ2luLmF0dHIoJ2RhdGEtZGVsYXknKTtcclxuICAgICAgICAgIHRvb2x0aXBEZWxheSA9ICh0b29sdGlwRGVsYXkgPT09IHVuZGVmaW5lZCB8fCB0b29sdGlwRGVsYXkgPT09ICcnKSA/XHJcbiAgICAgICAgICAgICAgb3B0aW9ucy5kZWxheSA6IHRvb2x0aXBEZWxheTtcclxuICAgICAgICAgIHRvb2x0aXBQb3NpdGlvbiA9IG9yaWdpbi5hdHRyKCdkYXRhLXBvc2l0aW9uJyk7XHJcbiAgICAgICAgICB0b29sdGlwUG9zaXRpb24gPSAodG9vbHRpcFBvc2l0aW9uID09PSB1bmRlZmluZWQgfHwgdG9vbHRpcFBvc2l0aW9uID09PSAnJykgP1xyXG4gICAgICAgICAgICAgIG9wdGlvbnMucG9zaXRpb24gOiB0b29sdGlwUG9zaXRpb247XHJcbiAgICAgICAgICB0b29sdGlwVGV4dCA9IG9yaWdpbi5hdHRyKCdkYXRhLXRvb2x0aXAnKTtcclxuICAgICAgICAgIHRvb2x0aXBUZXh0ID0gKHRvb2x0aXBUZXh0ID09PSB1bmRlZmluZWQgfHwgdG9vbHRpcFRleHQgPT09ICcnKSA/XHJcbiAgICAgICAgICAgICAgb3B0aW9ucy50b29sdGlwIDogdG9vbHRpcFRleHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZXRBdHRyaWJ1dGVzKCk7XHJcblxyXG4gICAgICAgIHZhciByZW5kZXJUb29sdGlwRWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciB0b29sdGlwID0gJCgnPGRpdiBjbGFzcz1cIm1hdGVyaWFsLXRvb2x0aXBcIj48L2Rpdj4nKTtcclxuXHJcbiAgICAgICAgICAvLyBDcmVhdGUgVGV4dCBzcGFuXHJcbiAgICAgICAgICBpZiAoYWxsb3dIdG1sKSB7XHJcbiAgICAgICAgICAgIHRvb2x0aXBUZXh0ID0gJCgnPHNwYW4+PC9zcGFuPicpLmh0bWwodG9vbHRpcFRleHQpO1xyXG4gICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICB0b29sdGlwVGV4dCA9ICQoJzxzcGFuPjwvc3Bhbj4nKS50ZXh0KHRvb2x0aXBUZXh0KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBDcmVhdGUgdG9vbHRpcFxyXG4gICAgICAgICAgdG9vbHRpcC5hcHBlbmQodG9vbHRpcFRleHQpXHJcbiAgICAgICAgICAgIC5hcHBlbmRUbygkKCdib2R5JykpXHJcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIHRvb2x0aXBJZCk7XHJcblxyXG4gICAgICAgICAgLy8gQ3JlYXRlIGJhY2tkcm9wXHJcbiAgICAgICAgICBiYWNrZHJvcCA9ICQoJzxkaXYgY2xhc3M9XCJiYWNrZHJvcFwiPjwvZGl2PicpO1xyXG4gICAgICAgICAgYmFja2Ryb3AuYXBwZW5kVG8odG9vbHRpcCk7XHJcbiAgICAgICAgICByZXR1cm4gdG9vbHRpcDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRvb2x0aXBFbCA9IHJlbmRlclRvb2x0aXBFbCgpO1xyXG5cclxuICAgICAgICAvLyBEZXN0cm95IHByZXZpb3VzbHkgYmluZGVkIGV2ZW50c1xyXG4gICAgICAgIG9yaWdpbi5vZmYoJ21vdXNlZW50ZXIudG9vbHRpcCBtb3VzZWxlYXZlLnRvb2x0aXAnKTtcclxuICAgICAgICAvLyBNb3VzZSBJblxyXG4gICAgICAgIHZhciBzdGFydGVkID0gZmFsc2UsIHRpbWVvdXRSZWY7XHJcbiAgICAgICAgb3JpZ2luLm9uKHsnbW91c2VlbnRlci50b29sdGlwJzogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgdmFyIHNob3dUb29sdGlwID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldEF0dHJpYnV0ZXMoKTtcclxuICAgICAgICAgICAgc3RhcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRvb2x0aXBFbC52ZWxvY2l0eSgnc3RvcCcpO1xyXG4gICAgICAgICAgICBiYWNrZHJvcC52ZWxvY2l0eSgnc3RvcCcpO1xyXG4gICAgICAgICAgICB0b29sdGlwRWwuY3NzKHsgdmlzaWJpbGl0eTogJ3Zpc2libGUnLCBsZWZ0OiAnMHB4JywgdG9wOiAnMHB4JyB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRvb2x0aXAgcG9zaXRpb25pbmdcclxuICAgICAgICAgICAgdmFyIG9yaWdpbldpZHRoID0gb3JpZ2luLm91dGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgdmFyIG9yaWdpbkhlaWdodCA9IG9yaWdpbi5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICB2YXIgdG9vbHRpcEhlaWdodCA9IHRvb2x0aXBFbC5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICB2YXIgdG9vbHRpcFdpZHRoID0gdG9vbHRpcEVsLm91dGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgdmFyIHRvb2x0aXBWZXJ0aWNhbE1vdmVtZW50ID0gJzBweCc7XHJcbiAgICAgICAgICAgIHZhciB0b29sdGlwSG9yaXpvbnRhbE1vdmVtZW50ID0gJzBweCc7XHJcbiAgICAgICAgICAgIHZhciBiYWNrZHJvcE9mZnNldFdpZHRoID0gYmFja2Ryb3BbMF0ub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBiYWNrZHJvcE9mZnNldEhlaWdodCA9IGJhY2tkcm9wWzBdLm9mZnNldEhlaWdodDtcclxuICAgICAgICAgICAgdmFyIHNjYWxlWEZhY3RvciA9IDg7XHJcbiAgICAgICAgICAgIHZhciBzY2FsZVlGYWN0b3IgPSA4O1xyXG4gICAgICAgICAgICB2YXIgc2NhbGVGYWN0b3IgPSAwO1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0VG9wLCB0YXJnZXRMZWZ0LCBuZXdDb29yZGluYXRlcztcclxuXHJcbiAgICAgICAgICAgIGlmICh0b29sdGlwUG9zaXRpb24gPT09IFwidG9wXCIpIHtcclxuICAgICAgICAgICAgICAvLyBUb3AgUG9zaXRpb25cclxuICAgICAgICAgICAgICB0YXJnZXRUb3AgPSBvcmlnaW4ub2Zmc2V0KCkudG9wIC0gdG9vbHRpcEhlaWdodCAtIG1hcmdpbjtcclxuICAgICAgICAgICAgICB0YXJnZXRMZWZ0ID0gb3JpZ2luLm9mZnNldCgpLmxlZnQgKyBvcmlnaW5XaWR0aC8yIC0gdG9vbHRpcFdpZHRoLzI7XHJcbiAgICAgICAgICAgICAgbmV3Q29vcmRpbmF0ZXMgPSByZXBvc2l0aW9uV2l0aGluU2NyZWVuKHRhcmdldExlZnQsIHRhcmdldFRvcCwgdG9vbHRpcFdpZHRoLCB0b29sdGlwSGVpZ2h0KTtcclxuICAgICAgICAgICAgICB0b29sdGlwVmVydGljYWxNb3ZlbWVudCA9ICctMTBweCc7XHJcbiAgICAgICAgICAgICAgYmFja2Ryb3AuY3NzKHtcclxuICAgICAgICAgICAgICAgIGJvdHRvbTogMCxcclxuICAgICAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxNHB4IDE0cHggMCAwJyxcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybU9yaWdpbjogJzUwJSAxMDAlJyxcclxuICAgICAgICAgICAgICAgIG1hcmdpblRvcDogdG9vbHRpcEhlaWdodCxcclxuICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6ICh0b29sdGlwV2lkdGgvMikgLSAoYmFja2Ryb3BPZmZzZXRXaWR0aC8yKVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIExlZnQgUG9zaXRpb25cclxuICAgICAgICAgICAgZWxzZSBpZiAodG9vbHRpcFBvc2l0aW9uID09PSBcImxlZnRcIikge1xyXG4gICAgICAgICAgICAgIHRhcmdldFRvcCA9IG9yaWdpbi5vZmZzZXQoKS50b3AgKyBvcmlnaW5IZWlnaHQvMiAtIHRvb2x0aXBIZWlnaHQvMjtcclxuICAgICAgICAgICAgICB0YXJnZXRMZWZ0ID0gIG9yaWdpbi5vZmZzZXQoKS5sZWZ0IC0gdG9vbHRpcFdpZHRoIC0gbWFyZ2luO1xyXG4gICAgICAgICAgICAgIG5ld0Nvb3JkaW5hdGVzID0gcmVwb3NpdGlvbldpdGhpblNjcmVlbih0YXJnZXRMZWZ0LCB0YXJnZXRUb3AsIHRvb2x0aXBXaWR0aCwgdG9vbHRpcEhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICAgIHRvb2x0aXBIb3Jpem9udGFsTW92ZW1lbnQgPSAnLTEwcHgnO1xyXG4gICAgICAgICAgICAgIGJhY2tkcm9wLmNzcyh7XHJcbiAgICAgICAgICAgICAgICB0b3A6ICctN3B4JyxcclxuICAgICAgICAgICAgICAgIHJpZ2h0OiAwLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxNHB4JyxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogJzE0cHgnLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTRweCAwIDAgMTRweCcsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICc5NSUgNTAlJyxcclxuICAgICAgICAgICAgICAgIG1hcmdpblRvcDogdG9vbHRpcEhlaWdodC8yLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luTGVmdDogdG9vbHRpcFdpZHRoXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gUmlnaHQgUG9zaXRpb25cclxuICAgICAgICAgICAgZWxzZSBpZiAodG9vbHRpcFBvc2l0aW9uID09PSBcInJpZ2h0XCIpIHtcclxuICAgICAgICAgICAgICB0YXJnZXRUb3AgPSBvcmlnaW4ub2Zmc2V0KCkudG9wICsgb3JpZ2luSGVpZ2h0LzIgLSB0b29sdGlwSGVpZ2h0LzI7XHJcbiAgICAgICAgICAgICAgdGFyZ2V0TGVmdCA9IG9yaWdpbi5vZmZzZXQoKS5sZWZ0ICsgb3JpZ2luV2lkdGggKyBtYXJnaW47XHJcbiAgICAgICAgICAgICAgbmV3Q29vcmRpbmF0ZXMgPSByZXBvc2l0aW9uV2l0aGluU2NyZWVuKHRhcmdldExlZnQsIHRhcmdldFRvcCwgdG9vbHRpcFdpZHRoLCB0b29sdGlwSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgICAgdG9vbHRpcEhvcml6b250YWxNb3ZlbWVudCA9ICcrMTBweCc7XHJcbiAgICAgICAgICAgICAgYmFja2Ryb3AuY3NzKHtcclxuICAgICAgICAgICAgICAgIHRvcDogJy03cHgnLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTRweCcsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxNHB4JyxcclxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzAgMTRweCAxNHB4IDAnLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiAnNSUgNTAlJyxcclxuICAgICAgICAgICAgICAgIG1hcmdpblRvcDogdG9vbHRpcEhlaWdodC8yLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luTGVmdDogJzBweCdcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAvLyBCb3R0b20gUG9zaXRpb25cclxuICAgICAgICAgICAgICB0YXJnZXRUb3AgPSBvcmlnaW4ub2Zmc2V0KCkudG9wICsgb3JpZ2luLm91dGVySGVpZ2h0KCkgKyBtYXJnaW47XHJcbiAgICAgICAgICAgICAgdGFyZ2V0TGVmdCA9IG9yaWdpbi5vZmZzZXQoKS5sZWZ0ICsgb3JpZ2luV2lkdGgvMiAtIHRvb2x0aXBXaWR0aC8yO1xyXG4gICAgICAgICAgICAgIG5ld0Nvb3JkaW5hdGVzID0gcmVwb3NpdGlvbldpdGhpblNjcmVlbih0YXJnZXRMZWZ0LCB0YXJnZXRUb3AsIHRvb2x0aXBXaWR0aCwgdG9vbHRpcEhlaWdodCk7XHJcbiAgICAgICAgICAgICAgdG9vbHRpcFZlcnRpY2FsTW92ZW1lbnQgPSAnKzEwcHgnO1xyXG4gICAgICAgICAgICAgIGJhY2tkcm9wLmNzcyh7XHJcbiAgICAgICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luTGVmdDogKHRvb2x0aXBXaWR0aC8yKSAtIChiYWNrZHJvcE9mZnNldFdpZHRoLzIpXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNldCB0b29wdGlwIGNzcyBwbGFjZW1lbnRcclxuICAgICAgICAgICAgdG9vbHRpcEVsLmNzcyh7XHJcbiAgICAgICAgICAgICAgdG9wOiBuZXdDb29yZGluYXRlcy55LFxyXG4gICAgICAgICAgICAgIGxlZnQ6IG5ld0Nvb3JkaW5hdGVzLnhcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgU2NhbGUgdG8gZmlsbFxyXG4gICAgICAgICAgICBzY2FsZVhGYWN0b3IgPSBNYXRoLlNRUlQyICogdG9vbHRpcFdpZHRoIC8gcGFyc2VJbnQoYmFja2Ryb3BPZmZzZXRXaWR0aCk7XHJcbiAgICAgICAgICAgIHNjYWxlWUZhY3RvciA9IE1hdGguU1FSVDIgKiB0b29sdGlwSGVpZ2h0IC8gcGFyc2VJbnQoYmFja2Ryb3BPZmZzZXRIZWlnaHQpO1xyXG4gICAgICAgICAgICBzY2FsZUZhY3RvciA9IE1hdGgubWF4KHNjYWxlWEZhY3Rvciwgc2NhbGVZRmFjdG9yKTtcclxuXHJcbiAgICAgICAgICAgIHRvb2x0aXBFbC52ZWxvY2l0eSh7IHRyYW5zbGF0ZVk6IHRvb2x0aXBWZXJ0aWNhbE1vdmVtZW50LCB0cmFuc2xhdGVYOiB0b29sdGlwSG9yaXpvbnRhbE1vdmVtZW50fSwgeyBkdXJhdGlvbjogMzUwLCBxdWV1ZTogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAudmVsb2NpdHkoe29wYWNpdHk6IDF9LCB7ZHVyYXRpb246IDMwMCwgZGVsYXk6IDUwLCBxdWV1ZTogZmFsc2V9KTtcclxuICAgICAgICAgICAgYmFja2Ryb3AuY3NzKHsgdmlzaWJpbGl0eTogJ3Zpc2libGUnIH0pXHJcbiAgICAgICAgICAgICAgLnZlbG9jaXR5KHtvcGFjaXR5OjF9LHtkdXJhdGlvbjogNTUsIGRlbGF5OiAwLCBxdWV1ZTogZmFsc2V9KVxyXG4gICAgICAgICAgICAgIC52ZWxvY2l0eSh7c2NhbGVYOiBzY2FsZUZhY3Rvciwgc2NhbGVZOiBzY2FsZUZhY3Rvcn0sIHtkdXJhdGlvbjogMzAwLCBkZWxheTogMCwgcXVldWU6IGZhbHNlLCBlYXNpbmc6ICdlYXNlSW5PdXRRdWFkJ30pO1xyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICB0aW1lb3V0UmVmID0gc2V0VGltZW91dChzaG93VG9vbHRpcCwgdG9vbHRpcERlbGF5KTsgLy8gRW5kIEludGVydmFsXHJcblxyXG4gICAgICAgIC8vIE1vdXNlIE91dFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ21vdXNlbGVhdmUudG9vbHRpcCc6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAvLyBSZXNldCBTdGF0ZVxyXG4gICAgICAgICAgc3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRSZWYpO1xyXG5cclxuICAgICAgICAgIC8vIEFuaW1hdGUgYmFja1xyXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHN0YXJ0ZWQgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgICB0b29sdGlwRWwudmVsb2NpdHkoe1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMCwgdHJhbnNsYXRlWTogMCwgdHJhbnNsYXRlWDogMH0sIHsgZHVyYXRpb246IDIyNSwgcXVldWU6IGZhbHNlfSk7XHJcbiAgICAgICAgICAgICAgYmFja2Ryb3AudmVsb2NpdHkoe29wYWNpdHk6IDAsIHNjYWxlWDogMSwgc2NhbGVZOiAxfSwge1xyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246MjI1LFxyXG4gICAgICAgICAgICAgICAgcXVldWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgIGJhY2tkcm9wLmNzcyh7IHZpc2liaWxpdHk6ICdoaWRkZW4nIH0pO1xyXG4gICAgICAgICAgICAgICAgICB0b29sdGlwRWwuY3NzKHsgdmlzaWJpbGl0eTogJ2hpZGRlbicgfSk7XHJcbiAgICAgICAgICAgICAgICAgIHN0YXJ0ZWQgPSBmYWxzZTt9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sMjI1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICB2YXIgcmVwb3NpdGlvbldpdGhpblNjcmVlbiA9IGZ1bmN0aW9uKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHZhciBuZXdYID0geDtcclxuICAgIHZhciBuZXdZID0geTtcclxuXHJcbiAgICBpZiAobmV3WCA8IDApIHtcclxuICAgICAgbmV3WCA9IDQ7XHJcbiAgICB9IGVsc2UgaWYgKG5ld1ggKyB3aWR0aCA+IHdpbmRvdy5pbm5lcldpZHRoKSB7XHJcbiAgICAgIG5ld1ggLT0gbmV3WCArIHdpZHRoIC0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5ld1kgPCAwKSB7XHJcbiAgICAgIG5ld1kgPSA0O1xyXG4gICAgfSBlbHNlIGlmIChuZXdZICsgaGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0ICsgJCh3aW5kb3cpLnNjcm9sbFRvcCkge1xyXG4gICAgICBuZXdZIC09IG5ld1kgKyBoZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHt4OiBuZXdYLCB5OiBuZXdZfTtcclxuICB9O1xyXG5cclxuICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgICQoJy50b29sdGlwcGVkJykudG9vbHRpcCgpO1xyXG4gICB9KTtcclxufSggalF1ZXJ5ICkpO1xyXG5cbi8qIVxyXG4gKiBXYXZlcyB2MC42LjRcclxuICogaHR0cDovL2ZpYW4ubXkuaWQvV2F2ZXNcclxuICpcclxuICogQ29weXJpZ2h0IDIwMTQgQWxmaWFuYSBFLiBTaWJ1ZWEgYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xyXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICogaHR0cHM6Ly9naXRodWIuY29tL2ZpYW5zL1dhdmVzL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcclxuICovXHJcblxyXG47KGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciBXYXZlcyA9IFdhdmVzIHx8IHt9O1xyXG4gICAgdmFyICQkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbC5iaW5kKGRvY3VtZW50KTtcclxuXHJcbiAgICAvLyBGaW5kIGV4YWN0IHBvc2l0aW9uIG9mIGVsZW1lbnRcclxuICAgIGZ1bmN0aW9uIGlzV2luZG93KG9iaikge1xyXG4gICAgICAgIHJldHVybiBvYmogIT09IG51bGwgJiYgb2JqID09PSBvYmoud2luZG93O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFdpbmRvdyhlbGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzV2luZG93KGVsZW0pID8gZWxlbSA6IGVsZW0ubm9kZVR5cGUgPT09IDkgJiYgZWxlbS5kZWZhdWx0VmlldztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvZmZzZXQoZWxlbSkge1xyXG4gICAgICAgIHZhciBkb2NFbGVtLCB3aW4sXHJcbiAgICAgICAgICAgIGJveCA9IHt0b3A6IDAsIGxlZnQ6IDB9LFxyXG4gICAgICAgICAgICBkb2MgPSBlbGVtICYmIGVsZW0ub3duZXJEb2N1bWVudDtcclxuXHJcbiAgICAgICAgZG9jRWxlbSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QgIT09IHR5cGVvZiB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgYm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2luID0gZ2V0V2luZG93KGRvYyk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9wOiBib3gudG9wICsgd2luLnBhZ2VZT2Zmc2V0IC0gZG9jRWxlbS5jbGllbnRUb3AsXHJcbiAgICAgICAgICAgIGxlZnQ6IGJveC5sZWZ0ICsgd2luLnBhZ2VYT2Zmc2V0IC0gZG9jRWxlbS5jbGllbnRMZWZ0XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb252ZXJ0U3R5bGUob2JqKSB7XHJcbiAgICAgICAgdmFyIHN0eWxlID0gJyc7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGEgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoYSkpIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlICs9IChhICsgJzonICsgb2JqW2FdICsgJzsnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBFZmZlY3QgPSB7XHJcblxyXG4gICAgICAgIC8vIEVmZmVjdCBkZWxheVxyXG4gICAgICAgIGR1cmF0aW9uOiA3NTAsXHJcblxyXG4gICAgICAgIHNob3c6IGZ1bmN0aW9uKGUsIGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIERpc2FibGUgcmlnaHQgY2xpY2tcclxuICAgICAgICAgICAgaWYgKGUuYnV0dG9uID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBlbCA9IGVsZW1lbnQgfHwgdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSByaXBwbGVcclxuICAgICAgICAgICAgdmFyIHJpcHBsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICByaXBwbGUuY2xhc3NOYW1lID0gJ3dhdmVzLXJpcHBsZSc7XHJcbiAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKHJpcHBsZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgY2xpY2sgY29vcmRpbmF0ZSBhbmQgZWxlbWVudCB3aXRkaFxyXG4gICAgICAgICAgICB2YXIgcG9zICAgICAgICAgPSBvZmZzZXQoZWwpO1xyXG4gICAgICAgICAgICB2YXIgcmVsYXRpdmVZICAgPSAoZS5wYWdlWSAtIHBvcy50b3ApO1xyXG4gICAgICAgICAgICB2YXIgcmVsYXRpdmVYICAgPSAoZS5wYWdlWCAtIHBvcy5sZWZ0KTtcclxuICAgICAgICAgICAgdmFyIHNjYWxlICAgICAgID0gJ3NjYWxlKCcrKChlbC5jbGllbnRXaWR0aCAvIDEwMCkgKiAxMCkrJyknO1xyXG5cclxuICAgICAgICAgICAgLy8gU3VwcG9ydCBmb3IgdG91Y2ggZGV2aWNlc1xyXG4gICAgICAgICAgICBpZiAoJ3RvdWNoZXMnIGluIGUpIHtcclxuICAgICAgICAgICAgICByZWxhdGl2ZVkgICA9IChlLnRvdWNoZXNbMF0ucGFnZVkgLSBwb3MudG9wKTtcclxuICAgICAgICAgICAgICByZWxhdGl2ZVggICA9IChlLnRvdWNoZXNbMF0ucGFnZVggLSBwb3MubGVmdCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEF0dGFjaCBkYXRhIHRvIGVsZW1lbnRcclxuICAgICAgICAgICAgcmlwcGxlLnNldEF0dHJpYnV0ZSgnZGF0YS1ob2xkJywgRGF0ZS5ub3coKSk7XHJcbiAgICAgICAgICAgIHJpcHBsZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2NhbGUnLCBzY2FsZSk7XHJcbiAgICAgICAgICAgIHJpcHBsZS5zZXRBdHRyaWJ1dGUoJ2RhdGEteCcsIHJlbGF0aXZlWCk7XHJcbiAgICAgICAgICAgIHJpcHBsZS5zZXRBdHRyaWJ1dGUoJ2RhdGEteScsIHJlbGF0aXZlWSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgcmlwcGxlIHBvc2l0aW9uXHJcbiAgICAgICAgICAgIHZhciByaXBwbGVTdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgICd0b3AnOiByZWxhdGl2ZVkrJ3B4JyxcclxuICAgICAgICAgICAgICAgICdsZWZ0JzogcmVsYXRpdmVYKydweCdcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJpcHBsZS5jbGFzc05hbWUgPSByaXBwbGUuY2xhc3NOYW1lICsgJyB3YXZlcy1ub3RyYW5zaXRpb24nO1xyXG4gICAgICAgICAgICByaXBwbGUuc2V0QXR0cmlidXRlKCdzdHlsZScsIGNvbnZlcnRTdHlsZShyaXBwbGVTdHlsZSkpO1xyXG4gICAgICAgICAgICByaXBwbGUuY2xhc3NOYW1lID0gcmlwcGxlLmNsYXNzTmFtZS5yZXBsYWNlKCd3YXZlcy1ub3RyYW5zaXRpb24nLCAnJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBTY2FsZSB0aGUgcmlwcGxlXHJcbiAgICAgICAgICAgIHJpcHBsZVN0eWxlWyctd2Via2l0LXRyYW5zZm9ybSddID0gc2NhbGU7XHJcbiAgICAgICAgICAgIHJpcHBsZVN0eWxlWyctbW96LXRyYW5zZm9ybSddID0gc2NhbGU7XHJcbiAgICAgICAgICAgIHJpcHBsZVN0eWxlWyctbXMtdHJhbnNmb3JtJ10gPSBzY2FsZTtcclxuICAgICAgICAgICAgcmlwcGxlU3R5bGVbJy1vLXRyYW5zZm9ybSddID0gc2NhbGU7XHJcbiAgICAgICAgICAgIHJpcHBsZVN0eWxlLnRyYW5zZm9ybSA9IHNjYWxlO1xyXG4gICAgICAgICAgICByaXBwbGVTdHlsZS5vcGFjaXR5ICAgPSAnMSc7XHJcblxyXG4gICAgICAgICAgICByaXBwbGVTdHlsZVsnLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uJ10gPSBFZmZlY3QuZHVyYXRpb24gKyAnbXMnO1xyXG4gICAgICAgICAgICByaXBwbGVTdHlsZVsnLW1vei10cmFuc2l0aW9uLWR1cmF0aW9uJ10gICAgPSBFZmZlY3QuZHVyYXRpb24gKyAnbXMnO1xyXG4gICAgICAgICAgICByaXBwbGVTdHlsZVsnLW8tdHJhbnNpdGlvbi1kdXJhdGlvbiddICAgICAgPSBFZmZlY3QuZHVyYXRpb24gKyAnbXMnO1xyXG4gICAgICAgICAgICByaXBwbGVTdHlsZVsndHJhbnNpdGlvbi1kdXJhdGlvbiddICAgICAgICAgPSBFZmZlY3QuZHVyYXRpb24gKyAnbXMnO1xyXG5cclxuICAgICAgICAgICAgcmlwcGxlU3R5bGVbJy13ZWJraXQtdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb24nXSA9ICdjdWJpYy1iZXppZXIoMC4yNTAsIDAuNDYwLCAwLjQ1MCwgMC45NDApJztcclxuICAgICAgICAgICAgcmlwcGxlU3R5bGVbJy1tb3otdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb24nXSAgICA9ICdjdWJpYy1iZXppZXIoMC4yNTAsIDAuNDYwLCAwLjQ1MCwgMC45NDApJztcclxuICAgICAgICAgICAgcmlwcGxlU3R5bGVbJy1vLXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uJ10gICAgICA9ICdjdWJpYy1iZXppZXIoMC4yNTAsIDAuNDYwLCAwLjQ1MCwgMC45NDApJztcclxuICAgICAgICAgICAgcmlwcGxlU3R5bGVbJ3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uJ10gICAgICAgICA9ICdjdWJpYy1iZXppZXIoMC4yNTAsIDAuNDYwLCAwLjQ1MCwgMC45NDApJztcclxuXHJcbiAgICAgICAgICAgIHJpcHBsZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgY29udmVydFN0eWxlKHJpcHBsZVN0eWxlKSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGlkZTogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBUb3VjaEhhbmRsZXIudG91Y2h1cChlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBlbCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IGVsLmNsaWVudFdpZHRoICogMS40O1xyXG5cclxuICAgICAgICAgICAgLy8gR2V0IGZpcnN0IHJpcHBsZVxyXG4gICAgICAgICAgICB2YXIgcmlwcGxlID0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIHJpcHBsZXMgPSBlbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd3YXZlcy1yaXBwbGUnKTtcclxuICAgICAgICAgICAgaWYgKHJpcHBsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmlwcGxlID0gcmlwcGxlc1tyaXBwbGVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVsYXRpdmVYICAgPSByaXBwbGUuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKTtcclxuICAgICAgICAgICAgdmFyIHJlbGF0aXZlWSAgID0gcmlwcGxlLmdldEF0dHJpYnV0ZSgnZGF0YS15Jyk7XHJcbiAgICAgICAgICAgIHZhciBzY2FsZSAgICAgICA9IHJpcHBsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2NhbGUnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEdldCBkZWxheSBiZWV0d2VlbiBtb3VzZWRvd24gYW5kIG1vdXNlIGxlYXZlXHJcbiAgICAgICAgICAgIHZhciBkaWZmID0gRGF0ZS5ub3coKSAtIE51bWJlcihyaXBwbGUuZ2V0QXR0cmlidXRlKCdkYXRhLWhvbGQnKSk7XHJcbiAgICAgICAgICAgIHZhciBkZWxheSA9IDM1MCAtIGRpZmY7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGVsYXkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxheSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEZhZGUgb3V0IHJpcHBsZSBhZnRlciBkZWxheVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICd0b3AnOiByZWxhdGl2ZVkrJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAnbGVmdCc6IHJlbGF0aXZlWCsncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICdvcGFjaXR5JzogJzAnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBEdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICctd2Via2l0LXRyYW5zaXRpb24tZHVyYXRpb24nOiBFZmZlY3QuZHVyYXRpb24gKyAnbXMnLFxyXG4gICAgICAgICAgICAgICAgICAgICctbW96LXRyYW5zaXRpb24tZHVyYXRpb24nOiBFZmZlY3QuZHVyYXRpb24gKyAnbXMnLFxyXG4gICAgICAgICAgICAgICAgICAgICctby10cmFuc2l0aW9uLWR1cmF0aW9uJzogRWZmZWN0LmR1cmF0aW9uICsgJ21zJyxcclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbi1kdXJhdGlvbic6IEVmZmVjdC5kdXJhdGlvbiArICdtcycsXHJcbiAgICAgICAgICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogc2NhbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgJy1tb3otdHJhbnNmb3JtJzogc2NhbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgJy1tcy10cmFuc2Zvcm0nOiBzY2FsZSxcclxuICAgICAgICAgICAgICAgICAgICAnLW8tdHJhbnNmb3JtJzogc2NhbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RyYW5zZm9ybSc6IHNjYWxlLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICByaXBwbGUuc2V0QXR0cmlidXRlKCdzdHlsZScsIGNvbnZlcnRTdHlsZShzdHlsZSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwucmVtb3ZlQ2hpbGQocmlwcGxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIEVmZmVjdC5kdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH0sIGRlbGF5KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBMaXR0bGUgaGFjayB0byBtYWtlIDxpbnB1dD4gY2FuIHBlcmZvcm0gd2F2ZXMgZWZmZWN0XHJcbiAgICAgICAgd3JhcElucHV0OiBmdW5jdGlvbihlbGVtZW50cykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBhID0gMDsgYSA8IGVsZW1lbnRzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWwgPSBlbGVtZW50c1thXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IGVsLnBhcmVudE5vZGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGlucHV0IGFscmVhZHkgaGF2ZSBwYXJlbnQganVzdCBwYXNzIHRocm91Z2hcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2knICYmIHBhcmVudC5jbGFzc05hbWUuaW5kZXhPZignd2F2ZXMtZWZmZWN0JykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUHV0IGVsZW1lbnQgY2xhc3MgYW5kIHN0eWxlIHRvIHRoZSBzcGVjaWZpZWQgcGFyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUgKyAnIHdhdmVzLWlucHV0LXdyYXBwZXInO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudFN0eWxlID0gZWwuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWVsZW1lbnRTdHlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50U3R5bGUgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKCdzdHlsZScsIGVsZW1lbnRTdHlsZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9ICd3YXZlcy1idXR0b24taW5wdXQnO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUHV0IGVsZW1lbnQgYXMgY2hpbGRcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHdyYXBwZXIsIGVsKTtcclxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGVsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzYWJsZSBtb3VzZWRvd24gZXZlbnQgZm9yIDUwMG1zIGR1cmluZyBhbmQgYWZ0ZXIgdG91Y2hcclxuICAgICAqL1xyXG4gICAgdmFyIFRvdWNoSGFuZGxlciA9IHtcclxuICAgICAgICAvKiB1c2VzIGFuIGludGVnZXIgcmF0aGVyIHRoYW4gYm9vbCBzbyB0aGVyZSdzIG5vIGlzc3VlcyB3aXRoXHJcbiAgICAgICAgICogbmVlZGluZyB0byBjbGVhciB0aW1lb3V0cyBpZiBhbm90aGVyIHRvdWNoIGV2ZW50IG9jY3VycmVkXHJcbiAgICAgICAgICogd2l0aGluIHRoZSA1MDBtcy4gQ2Fubm90IG1vdXNldXAgYmV0d2VlbiB0b3VjaHN0YXJ0IGFuZFxyXG4gICAgICAgICAqIHRvdWNoZW5kLCBub3IgaW4gdGhlIDUwMG1zIGFmdGVyIHRvdWNoZW5kLiAqL1xyXG4gICAgICAgIHRvdWNoZXM6IDAsXHJcbiAgICAgICAgYWxsb3dFdmVudDogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB2YXIgYWxsb3cgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XHJcbiAgICAgICAgICAgICAgICBUb3VjaEhhbmRsZXIudG91Y2hlcyArPSAxOyAvL3B1c2hcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlLnR5cGUgPT09ICd0b3VjaGVuZCcgfHwgZS50eXBlID09PSAndG91Y2hjYW5jZWwnKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChUb3VjaEhhbmRsZXIudG91Y2hlcyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVG91Y2hIYW5kbGVyLnRvdWNoZXMgLT0gMTsgLy9wb3AgYWZ0ZXIgNTAwbXNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUudHlwZSA9PT0gJ21vdXNlZG93bicgJiYgVG91Y2hIYW5kbGVyLnRvdWNoZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBhbGxvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYWxsb3c7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b3VjaHVwOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIFRvdWNoSGFuZGxlci5hbGxvd0V2ZW50KGUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZWdhdGVkIGNsaWNrIGhhbmRsZXIgZm9yIC53YXZlcy1lZmZlY3QgZWxlbWVudC5cclxuICAgICAqIHJldHVybnMgbnVsbCB3aGVuIC53YXZlcy1lZmZlY3QgZWxlbWVudCBub3QgaW4gXCJjbGljayB0cmVlXCJcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0V2F2ZXNFZmZlY3RFbGVtZW50KGUpIHtcclxuICAgICAgICBpZiAoVG91Y2hIYW5kbGVyLmFsbG93RXZlbnQoZSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XHJcblxyXG4gICAgICAgIHdoaWxlICh0YXJnZXQucGFyZW50Tm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBTVkdFbGVtZW50KSAmJiB0YXJnZXQuY2xhc3NOYW1lLmluZGV4T2YoJ3dhdmVzLWVmZmVjdCcpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHRhcmdldDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJ1YmJsZSB0aGUgY2xpY2sgYW5kIHNob3cgZWZmZWN0IGlmIC53YXZlcy1lZmZlY3QgZWxlbSB3YXMgZm91bmRcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2hvd0VmZmVjdChlKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBnZXRXYXZlc0VmZmVjdEVsZW1lbnQoZSk7XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIEVmZmVjdC5zaG93KGUsIGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIEVmZmVjdC5oaWRlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgRWZmZWN0LmhpZGUsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgRWZmZWN0LmhpZGUsIGZhbHNlKTtcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgRWZmZWN0LmhpZGUsIGZhbHNlKTtcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgRWZmZWN0LmhpZGUsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgV2F2ZXMuZGlzcGxheUVmZmVjdCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgICAgICAgaWYgKCdkdXJhdGlvbicgaW4gb3B0aW9ucykge1xyXG4gICAgICAgICAgICBFZmZlY3QuZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9XcmFwIGlucHV0IGluc2lkZSA8aT4gdGFnXHJcbiAgICAgICAgRWZmZWN0LndyYXBJbnB1dCgkJCgnLndhdmVzLWVmZmVjdCcpKTtcclxuXHJcbiAgICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBzaG93RWZmZWN0LCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHNob3dFZmZlY3QsIGZhbHNlKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggV2F2ZXMgdG8gYW4gaW5wdXQgZWxlbWVudCAob3IgYW55IGVsZW1lbnQgd2hpY2ggZG9lc24ndFxyXG4gICAgICogYnViYmxlIG1vdXNldXAvbW91c2Vkb3duIGV2ZW50cykuXHJcbiAgICAgKiAgIEludGVuZGVkIHRvIGJlIHVzZWQgd2l0aCBkeW5hbWljYWxseSBsb2FkZWQgZm9ybXMvaW5wdXRzLCBvclxyXG4gICAgICogd2hlcmUgdGhlIHVzZXIgZG9lc24ndCB3YW50IGEgZGVsZWdhdGVkIGNsaWNrIGhhbmRsZXIuXHJcbiAgICAgKi9cclxuICAgIFdhdmVzLmF0dGFjaCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICAvL0ZVVFVSRTogYXV0b21hdGljYWxseSBhZGQgd2F2ZXMgY2xhc3NlcyBhbmQgYWxsb3cgdXNlcnNcclxuICAgICAgICAvLyB0byBzcGVjaWZ5IHRoZW0gd2l0aCBhbiBvcHRpb25zIHBhcmFtPyBFZy4gbGlnaHQvY2xhc3NpYy9idXR0b25cclxuICAgICAgICBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcpIHtcclxuICAgICAgICAgICAgRWZmZWN0LndyYXBJbnB1dChbZWxlbWVudF0pO1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykge1xyXG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBzaG93RWZmZWN0LCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHNob3dFZmZlY3QsIGZhbHNlKTtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LldhdmVzID0gV2F2ZXM7XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIFdhdmVzLmRpc3BsYXlFZmZlY3QoKTtcclxuICAgIH0sIGZhbHNlKTtcclxuXHJcbn0pKHdpbmRvdyk7XHJcblxuKGZ1bmN0aW9uKCQsIFZlbCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgbGV0IF9kZWZhdWx0cyA9IHtcclxuICAgIGRpc3BsYXlMZW5ndGg6IEluZmluaXR5LFxyXG4gICAgaW5EdXJhdGlvbjogMzAwLFxyXG4gICAgb3V0RHVyYXRpb246IDM3NSxcclxuICAgIGNsYXNzTmFtZTogdW5kZWZpbmVkLFxyXG4gICAgY29tcGxldGVDYWxsYmFjazogdW5kZWZpbmVkLFxyXG4gICAgYWN0aXZhdGlvblBlcmNlbnQ6IDAuOFxyXG4gIH07XHJcblxyXG4gIGNsYXNzIFRvYXN0IHtcclxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGRpc3BsYXlMZW5ndGgsIGNsYXNzTmFtZSwgY29tcGxldGVDYWxsYmFjaykge1xyXG4gICAgICBpZiAoIW1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogT3B0aW9ucyBmb3IgdGhlIHRvYXN0XHJcbiAgICAgICAqIEBtZW1iZXIgVG9hc3Qjb3B0aW9uc1xyXG4gICAgICAgKi9cclxuICAgICAgdGhpcy5vcHRpb25zID0ge1xyXG4gICAgICAgIGRpc3BsYXlMZW5ndGg6IGRpc3BsYXlMZW5ndGgsXHJcbiAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXHJcbiAgICAgICAgY29tcGxldGVDYWxsYmFjazogY29tcGxldGVDYWxsYmFja1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIFRvYXN0LmRlZmF1bHRzLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIERlc2NyaWJlcyBjdXJyZW50IHBhbiBzdGF0ZSB0b2FzdFxyXG4gICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICovXHJcbiAgICAgIHRoaXMucGFubmluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIFRpbWUgcmVtYWluaW5nIHVudGlsIHRvYXN0IGlzIHJlbW92ZWRcclxuICAgICAgICovXHJcbiAgICAgIHRoaXMudGltZVJlbWFpbmluZyA9IHRoaXMub3B0aW9ucy5kaXNwbGF5TGVuZ3RoO1xyXG5cclxuICAgICAgaWYgKFRvYXN0Ll90b2FzdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgVG9hc3QuX2NyZWF0ZUNvbnRhaW5lcigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDcmVhdGUgbmV3IHRvYXN0XHJcbiAgICAgIFRvYXN0Ll90b2FzdHMucHVzaCh0aGlzKTtcclxuICAgICAgbGV0IHRvYXN0RWxlbWVudCA9IHRoaXMuY3JlYXRlVG9hc3QoKTtcclxuICAgICAgdG9hc3RFbGVtZW50Lk1fVG9hc3QgPSB0aGlzO1xyXG4gICAgICB0aGlzLmVsID0gdG9hc3RFbGVtZW50O1xyXG4gICAgICB0aGlzLl9hbmltYXRlSW4oKTtcclxuICAgICAgdGhpcy5zZXRUaW1lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XHJcbiAgICAgIHJldHVybiBfZGVmYXVsdHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcHBlbmQgdG9hc3QgY29udGFpbmVyIGFuZCBhZGQgZXZlbnQgaGFuZGxlcnNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIF9jcmVhdGVDb250YWluZXIoKSB7XHJcbiAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAndG9hc3QtY29udGFpbmVyJyk7XHJcblxyXG4gICAgICAvLyBBZGQgZXZlbnQgaGFuZGxlclxyXG4gICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIFRvYXN0Ll9vbkRyYWdTdGFydCk7XHJcbiAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBUb2FzdC5fb25EcmFnTW92ZSk7XHJcbiAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIFRvYXN0Ll9vbkRyYWdFbmQpO1xyXG5cclxuICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIFRvYXN0Ll9vbkRyYWdTdGFydCk7XHJcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIFRvYXN0Ll9vbkRyYWdNb3ZlKTtcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIFRvYXN0Ll9vbkRyYWdFbmQpO1xyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gICAgICBUb2FzdC5fY29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIHRvYXN0IGNvbnRhaW5lciBhbmQgZXZlbnQgaGFuZGxlcnNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIF9yZW1vdmVDb250YWluZXIoKSB7XHJcbiAgICAgIC8vIEFkZCBldmVudCBoYW5kbGVyXHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIFRvYXN0Ll9vbkRyYWdNb3ZlKTtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIFRvYXN0Ll9vbkRyYWdFbmQpO1xyXG5cclxuICAgICAgVG9hc3QuX2NvbnRhaW5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKFRvYXN0Ll9jb250YWluZXIpO1xyXG4gICAgICBUb2FzdC5fY29udGFpbmVyID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJlZ2luIGRyYWcgaGFuZGxlclxyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgX29uRHJhZ1N0YXJ0KGUpIHtcclxuICAgICAgaWYgKGUudGFyZ2V0ICYmICQoZS50YXJnZXQpLmNsb3Nlc3QoJy50b2FzdCcpLmxlbmd0aCkge1xyXG4gICAgICAgIGxldCAkdG9hc3QgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcudG9hc3QnKTtcclxuICAgICAgICBsZXQgdG9hc3QgPSAkdG9hc3RbMF0uTV9Ub2FzdDtcclxuICAgICAgICB0b2FzdC5wYW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICBUb2FzdC5fZHJhZ2dlZFRvYXN0ID0gdG9hc3Q7XHJcbiAgICAgICAgdG9hc3QuZWwuY2xhc3NMaXN0LmFkZCgncGFubmluZycpO1xyXG4gICAgICAgIHRvYXN0LmVsLnN0eWxlLnRyYW5zaXRpb24gPSAnJztcclxuICAgICAgICB0b2FzdC5zdGFydGluZ1hQb3MgPSBUb2FzdC5feFBvcyhlKTtcclxuICAgICAgICB0b2FzdC50aW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB0b2FzdC54UG9zID0gVG9hc3QuX3hQb3MoZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYWcgbW92ZSBoYW5kbGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBfb25EcmFnTW92ZShlKSB7XHJcbiAgICAgIGlmICghIVRvYXN0Ll9kcmFnZ2VkVG9hc3QpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgbGV0IHRvYXN0ID0gVG9hc3QuX2RyYWdnZWRUb2FzdDtcclxuICAgICAgICB0b2FzdC5kZWx0YVggPSBNYXRoLmFicyh0b2FzdC54UG9zIC0gVG9hc3QuX3hQb3MoZSkpO1xyXG4gICAgICAgIHRvYXN0LnhQb3MgPSBUb2FzdC5feFBvcyhlKTtcclxuICAgICAgICB0b2FzdC52ZWxvY2l0eVggPSB0b2FzdC5kZWx0YVggLyAoRGF0ZS5ub3coKSAtIHRvYXN0LnRpbWUpO1xyXG4gICAgICAgIHRvYXN0LnRpbWUgPSBEYXRlLm5vdygpO1xyXG5cclxuICAgICAgICBsZXQgdG90YWxEZWx0YVggPSB0b2FzdC54UG9zIC0gdG9hc3Quc3RhcnRpbmdYUG9zO1xyXG4gICAgICAgIGxldCBhY3RpdmF0aW9uRGlzdGFuY2UgPVxyXG4gICAgICAgICAgICB0b2FzdC5lbC5vZmZzZXRXaWR0aCAqIHRvYXN0Lm9wdGlvbnMuYWN0aXZhdGlvblBlcmNlbnQ7XHJcbiAgICAgICAgdG9hc3QuZWwuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHt0b3RhbERlbHRhWH1weClgO1xyXG4gICAgICAgIHRvYXN0LmVsLnN0eWxlLm9wYWNpdHkgPSAxLU1hdGguYWJzKHRvdGFsRGVsdGFYIC8gYWN0aXZhdGlvbkRpc3RhbmNlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5kIGRyYWcgaGFuZGxlclxyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgX29uRHJhZ0VuZChlKSB7XHJcbiAgICAgIGlmICghIVRvYXN0Ll9kcmFnZ2VkVG9hc3QpIHtcclxuICAgICAgICBsZXQgdG9hc3QgPSBUb2FzdC5fZHJhZ2dlZFRvYXN0O1xyXG4gICAgICAgIHRvYXN0LnBhbm5pbmcgPSBmYWxzZTtcclxuICAgICAgICB0b2FzdC5lbC5jbGFzc0xpc3QucmVtb3ZlKCdwYW5uaW5nJyk7XHJcblxyXG4gICAgICAgIGxldCB0b3RhbERlbHRhWCA9IHRvYXN0LnhQb3MgLSB0b2FzdC5zdGFydGluZ1hQb3M7XHJcbiAgICAgICAgbGV0IGFjdGl2YXRpb25EaXN0YW5jZSA9XHJcbiAgICAgICAgICAgIHRvYXN0LmVsLm9mZnNldFdpZHRoICogdG9hc3Qub3B0aW9ucy5hY3RpdmF0aW9uUGVyY2VudDtcclxuICAgICAgICBsZXQgc2hvdWxkQmVEaXNtaXNzZWQgPSBNYXRoLmFicyh0b3RhbERlbHRhWCkgPiBhY3RpdmF0aW9uRGlzdGFuY2UgfHxcclxuICAgICAgICAgICAgdG9hc3QudmVsb2NpdHlYID4gMTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIHRvYXN0XHJcbiAgICAgICAgaWYgKHNob3VsZEJlRGlzbWlzc2VkKSB7XHJcbiAgICAgICAgICB0b2FzdC53YXNTd2lwZWQgPSB0cnVlO1xyXG4gICAgICAgICAgdG9hc3QucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgIC8vIEFuaW1hdGUgdG9hc3QgYmFjayB0byBvcmlnaW5hbCBwb3NpdGlvblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0b2FzdC5lbC5zdHlsZS50cmFuc2l0aW9uID0gJ3RyYW5zZm9ybSAuMnMsIG9wYWNpdHkgLjJzJztcclxuICAgICAgICAgIHRvYXN0LmVsLnN0eWxlLnRyYW5zZm9ybSA9ICcnO1xyXG4gICAgICAgICAgdG9hc3QuZWwuc3R5bGUub3BhY2l0eSA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBUb2FzdC5fZHJhZ2dlZFRvYXN0ID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHggcG9zaXRpb24gb2YgbW91c2Ugb3IgdG91Y2ggZXZlbnRcclxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcclxuICAgICAqL1xyXG4gICAgc3RhdGljIF94UG9zKGUpIHtcclxuICAgICAgaWYgKGUudGFyZ2V0VG91Y2hlcyAmJiAoZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA+PSAxKSkge1xyXG4gICAgICAgIHJldHVybiBlLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WDtcclxuICAgICAgfVxyXG4gICAgICAvLyBtb3VzZSBldmVudFxyXG4gICAgICByZXR1cm4gZS5jbGllbnRYO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGFsbCB0b2FzdHNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlbW92ZUFsbCgpIHtcclxuICAgICAgZm9yKGxldCB0b2FzdEluZGV4IGluIFRvYXN0Ll90b2FzdHMpIHtcclxuICAgICAgICBUb2FzdC5fdG9hc3RzW3RvYXN0SW5kZXhdLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHRvYXN0IGFuZCBhcHBlbmQgaXQgdG8gdG9hc3QgY29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVRvYXN0KCkge1xyXG4gICAgICBsZXQgdG9hc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgdG9hc3QuY2xhc3NMaXN0LmFkZCgndG9hc3QnKTtcclxuXHJcbiAgICAgIC8vIEFkZCBjdXN0b20gY2xhc3NlcyBvbnRvIHRvYXN0XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgbGV0IGNsYXNzZXMgPSB0aGlzLm9wdGlvbnMuY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgbGV0IGksIGNvdW50O1xyXG4gICAgICAgIGZvciAoaSA9IDAsIGNvdW50ID0gY2xhc3Nlcy5sZW5ndGg7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICB0b2FzdC5jbGFzc0xpc3QuYWRkKGNsYXNzZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gU2V0IGNvbnRlbnRcclxuICAgICAgaWYgKCB0eXBlb2YgSFRNTEVsZW1lbnQgPT09ICdvYmplY3QnID9cclxuICAgICAgICAgICB0aGlzLm1lc3NhZ2UgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCA6XHJcbiAgICAgICAgICAgdGhpcy5tZXNzYWdlICYmIHR5cGVvZiB0aGlzLm1lc3NhZ2UgPT09ICdvYmplY3QnICYmXHJcbiAgICAgICAgICAgdGhpcy5tZXNzYWdlICE9PSBudWxsICYmIHRoaXMubWVzc2FnZS5ub2RlVHlwZSA9PT0gMSAmJlxyXG4gICAgICAgICAgIHR5cGVvZiB0aGlzLm1lc3NhZ2Uubm9kZU5hbWU9PT0nc3RyaW5nJ1xyXG4gICAgICAgICApIHtcclxuICAgICAgICB0b2FzdC5hcHBlbmRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgaXQgaXMgalF1ZXJ5IG9iamVjdFxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMubWVzc2FnZSBpbnN0YW5jZW9mIGpRdWVyeSkge1xyXG4gICAgICAgICQodG9hc3QpLmFwcGVuZCh0aGlzLm1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAvLyBJbnNlcnQgYXMgdGV4dDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b2FzdC5pbm5lckhUTUwgPSB0aGlzLm1lc3NhZ2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEFwcGVuZCB0b2FzZnRcclxuICAgICAgVG9hc3QuX2NvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2FzdCk7XHJcbiAgICAgIHJldHVybiB0b2FzdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFuaW1hdGUgaW4gdG9hc3RcclxuICAgICAqL1xyXG4gICAgX2FuaW1hdGVJbigpIHtcclxuICAgICAgLy8gQW5pbWF0ZSB0b2FzdCBpblxyXG4gICAgICBWZWwodGhpcy5lbCwge3RvcDogMCwgIG9wYWNpdHk6IDEgfSwge1xyXG4gICAgICAgIGR1cmF0aW9uOiAzMDAsXHJcbiAgICAgICAgZWFzaW5nOiAnZWFzZU91dEN1YmljJyxcclxuICAgICAgICBxdWV1ZTogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHNldEludGVydmFsIHdoaWNoIGF1dG9tYXRpY2FsbHkgcmVtb3ZlcyB0b2FzdCB3aGVuIHRpbWVSZW1haW5pbmcgPj0gMFxyXG4gICAgICogaGFzIGJlZW4gcmVhY2hlZFxyXG4gICAgICovXHJcbiAgICBzZXRUaW1lcigpIHtcclxuICAgICAgaWYgKHRoaXMudGltZVJlbWFpbmluZyAhPT0gSW5maW5pdHkpICB7XHJcbiAgICAgICAgdGhpcy5jb3VudGVySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAvLyBJZiB0b2FzdCBpcyBub3QgYmVpbmcgZHJhZ2dlZCwgZGVjcmVhc2UgaXRzIHRpbWUgcmVtYWluaW5nXHJcbiAgICAgICAgICBpZiAoIXRoaXMucGFubmluZykge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVSZW1haW5pbmcgLT0gMjA7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gQW5pbWF0ZSB0b2FzdCBvdXRcclxuICAgICAgICAgIGlmICh0aGlzLnRpbWVSZW1haW5pbmcgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sIDIwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc21pc3MgdG9hc3Qgd2l0aCBhbmltYXRpb25cclxuICAgICAqL1xyXG4gICAgcmVtb3ZlKCkge1xyXG4gICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLmNvdW50ZXJJbnRlcnZhbCk7XHJcbiAgICAgIGxldCBhY3RpdmF0aW9uRGlzdGFuY2UgPVxyXG4gICAgICAgICAgdGhpcy5lbC5vZmZzZXRXaWR0aCAqIHRoaXMub3B0aW9ucy5hY3RpdmF0aW9uUGVyY2VudDtcclxuXHJcbiAgICAgIGlmKHRoaXMud2FzU3dpcGVkKSB7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS50cmFuc2l0aW9uID0gJ3RyYW5zZm9ybSAuMDVzLCBvcGFjaXR5IC4wNXMnO1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHthY3RpdmF0aW9uRGlzdGFuY2V9cHgpYDtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBWZWwoXHJcbiAgICAgICAgdGhpcy5lbCxcclxuICAgICAgICB7b3BhY2l0eTogMCwgbWFyZ2luVG9wOiAnLTQwcHgnfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBkdXJhdGlvbjogdGhpcy5vcHRpb25zLm91dER1cmF0aW9uLFxyXG4gICAgICAgICAgZWFzaW5nOiAnZWFzZU91dEV4cG8nLFxyXG4gICAgICAgICAgcXVldWU6IGZhbHNlLFxyXG4gICAgICAgICAgY29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgICAgLy8gQ2FsbCB0aGUgb3B0aW9uYWwgY2FsbGJhY2tcclxuICAgICAgICAgICAgaWYodHlwZW9mKHRoaXMub3B0aW9ucy5jb21wbGV0ZUNhbGxiYWNrKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5jb21wbGV0ZUNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gUmVtb3ZlIHRvYXN0IGZyb20gRE9NXHJcbiAgICAgICAgICAgIHRoaXMuZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmVsKTtcclxuICAgICAgICAgICAgVG9hc3QuX3RvYXN0cy5zcGxpY2UoVG9hc3QuX3RvYXN0cy5pbmRleE9mKHRoaXMpLCAxKTtcclxuICAgICAgICAgICAgaWYgKFRvYXN0Ll90b2FzdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgVG9hc3QuX3JlbW92ZUNvbnRhaW5lcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBtZW1iZXJvZiBUb2FzdFxyXG4gICAqIEB0eXBlIHtBcnJheS48VG9hc3Q+fVxyXG4gICAqL1xyXG4gIFRvYXN0Ll90b2FzdHMgPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBtZW1iZXJvZiBUb2FzdFxyXG4gICAqL1xyXG4gIFRvYXN0Ll9jb250YWluZXIgPSBudWxsO1xyXG5cclxuICAvKipcclxuICAgKiBAc3RhdGljXHJcbiAgICogQG1lbWJlcm9mIFRvYXN0XHJcbiAgICogQHR5cGUge1RvYXN0fVxyXG4gICAqL1xyXG4gIFRvYXN0Ll9kcmFnZ2VkVG9hc3QgPSBudWxsO1xyXG5cclxuICBNYXRlcmlhbGl6ZS5Ub2FzdCA9IFRvYXN0O1xyXG4gIE1hdGVyaWFsaXplLnRvYXN0ID0gZnVuY3Rpb24obWVzc2FnZSwgZGlzcGxheUxlbmd0aCwgY2xhc3NOYW1lLCBjb21wbGV0ZUNhbGxiYWNrKSB7XHJcbiAgICByZXR1cm4gbmV3IFRvYXN0KG1lc3NhZ2UsIGRpc3BsYXlMZW5ndGgsIGNsYXNzTmFtZSwgY29tcGxldGVDYWxsYmFjayk7XHJcbiAgfTtcclxufSkoalF1ZXJ5LCBNYXRlcmlhbGl6ZS5WZWwpO1xyXG5cbihmdW5jdGlvbiAoJCkge1xyXG5cclxuICB2YXIgbWV0aG9kcyA9IHtcclxuICAgIGluaXQgOiBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICAgIHZhciBkZWZhdWx0cyA9IHtcclxuICAgICAgICBtZW51V2lkdGg6IDMwMCxcclxuICAgICAgICBlZGdlOiAnbGVmdCcsXHJcbiAgICAgICAgY2xvc2VPbkNsaWNrOiBmYWxzZSxcclxuICAgICAgICBkcmFnZ2FibGU6IHRydWUsXHJcbiAgICAgICAgb25PcGVuOiBudWxsLFxyXG4gICAgICAgIG9uQ2xvc2U6IG51bGxcclxuICAgICAgfTtcclxuICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICQodGhpcykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgdmFyIG1lbnVJZCA9ICR0aGlzLmF0dHIoJ2RhdGEtYWN0aXZhdGVzJyk7XHJcbiAgICAgICAgdmFyIG1lbnUgPSAkKFwiI1wiKyBtZW51SWQpO1xyXG5cclxuICAgICAgICAvLyBTZXQgdG8gd2lkdGhcclxuICAgICAgICBpZiAob3B0aW9ucy5tZW51V2lkdGggIT0gMzAwKSB7XHJcbiAgICAgICAgICBtZW51LmNzcygnd2lkdGgnLCBvcHRpb25zLm1lbnVXaWR0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgVG91Y2ggQXJlYVxyXG4gICAgICAgIHZhciAkZHJhZ1RhcmdldCA9ICQoJy5kcmFnLXRhcmdldFtkYXRhLXNpZGVuYXY9XCInICsgbWVudUlkICsgJ1wiXScpO1xyXG4gICAgICAgIGlmIChvcHRpb25zLmRyYWdnYWJsZSkge1xyXG4gICAgICAgICAgLy8gUmVnZW5lcmF0ZSBkcmFnVGFyZ2V0XHJcbiAgICAgICAgICBpZiAoJGRyYWdUYXJnZXQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICRkcmFnVGFyZ2V0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICRkcmFnVGFyZ2V0ID0gJCgnPGRpdiBjbGFzcz1cImRyYWctdGFyZ2V0XCI+PC9kaXY+JykuYXR0cignZGF0YS1zaWRlbmF2JywgbWVudUlkKTtcclxuICAgICAgICAgICQoJ2JvZHknKS5hcHBlbmQoJGRyYWdUYXJnZXQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkZHJhZ1RhcmdldCA9ICQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmVkZ2UgPT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICBtZW51LmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoLTEwMCUpJyk7XHJcbiAgICAgICAgICAkZHJhZ1RhcmdldC5jc3MoeydsZWZ0JzogMH0pOyAvLyBBZGQgVG91Y2ggQXJlYVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIG1lbnUuYWRkQ2xhc3MoJ3JpZ2h0LWFsaWduZWQnKSAvLyBDaGFuZ2UgdGV4dC1hbGlnbm1lbnQgdG8gcmlnaHRcclxuICAgICAgICAgICAgLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoMTAwJSknKTtcclxuICAgICAgICAgICRkcmFnVGFyZ2V0LmNzcyh7J3JpZ2h0JzogMH0pOyAvLyBBZGQgVG91Y2ggQXJlYVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgZml4ZWQgc2lkZW5hdiwgYnJpbmcgbWVudSBvdXRcclxuICAgICAgICBpZiAobWVudS5oYXNDbGFzcygnZml4ZWQnKSkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA5OTIpIHtcclxuICAgICAgICAgICAgICBtZW51LmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoMCknKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBXaW5kb3cgcmVzaXplIHRvIHJlc2V0IG9uIGxhcmdlIHNjcmVlbnMgZml4ZWRcclxuICAgICAgICBpZiAobWVudS5oYXNDbGFzcygnZml4ZWQnKSkge1xyXG4gICAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZSggZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDk5Mikge1xyXG4gICAgICAgICAgICAgIC8vIENsb3NlIG1lbnUgaWYgd2luZG93IGlzIHJlc2l6ZWQgYmlnZ2VyIHRoYW4gOTkyIGFuZCB1c2VyIGhhcyBmaXhlZCBzaWRlbmF2XHJcbiAgICAgICAgICAgICAgaWYgKCQoJyNzaWRlbmF2LW92ZXJsYXknKS5sZW5ndGggIT09IDAgJiYgbWVudU91dCkge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlTWVudSh0cnVlKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBtZW51LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICBtZW51LmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoMCUpJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBtZW51LmNzcygnd2lkdGgnLCBvcHRpb25zLm1lbnVXaWR0aCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG1lbnVPdXQgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICBpZiAob3B0aW9ucy5lZGdlID09PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgICAgIG1lbnUuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgtMTAwJSknKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWVudS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVYKDEwMCUpJyk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYgY2xvc2VPbkNsaWNrLCB0aGVuIGFkZCBjbG9zZSBldmVudCBmb3IgYWxsIGEgdGFncyBpbiBzaWRlIHNpZGVOYXZcclxuICAgICAgICBpZiAob3B0aW9ucy5jbG9zZU9uQ2xpY2sgPT09IHRydWUpIHtcclxuICAgICAgICAgIG1lbnUub24oXCJjbGljay5pdGVtY2xpY2tcIiwgXCJhOm5vdCguY29sbGFwc2libGUtaGVhZGVyKVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZiAoISh3aW5kb3cuaW5uZXJXaWR0aCA+IDk5MiAmJiBtZW51Lmhhc0NsYXNzKCdmaXhlZCcpKSl7XHJcbiAgICAgICAgICAgICAgcmVtb3ZlTWVudSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciByZW1vdmVNZW51ID0gZnVuY3Rpb24ocmVzdG9yZU5hdikge1xyXG4gICAgICAgICAgcGFubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgbWVudU91dCA9IGZhbHNlO1xyXG4gICAgICAgICAgLy8gUmVlbmFibGUgc2Nyb2xsaW5nXHJcbiAgICAgICAgICAkKCdib2R5JykuY3NzKHtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6ICcnLFxyXG4gICAgICAgICAgICB3aWR0aDogJydcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICQoJyNzaWRlbmF2LW92ZXJsYXknKS52ZWxvY2l0eSh7b3BhY2l0eTogMH0sIHtkdXJhdGlvbjogMjAwLFxyXG4gICAgICAgICAgICAgIHF1ZXVlOiBmYWxzZSwgZWFzaW5nOiAnZWFzZU91dFF1YWQnLFxyXG4gICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSB9KTtcclxuICAgICAgICAgIGlmIChvcHRpb25zLmVkZ2UgPT09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICAvLyBSZXNldCBwaGFudG9tIGRpdlxyXG4gICAgICAgICAgICAkZHJhZ1RhcmdldC5jc3Moe3dpZHRoOiAnJywgcmlnaHQ6ICcnLCBsZWZ0OiAnMCd9KTtcclxuICAgICAgICAgICAgbWVudS52ZWxvY2l0eShcclxuICAgICAgICAgICAgICB7J3RyYW5zbGF0ZVgnOiAnLTEwMCUnfSxcclxuICAgICAgICAgICAgICB7IGR1cmF0aW9uOiAyMDAsXHJcbiAgICAgICAgICAgICAgICBxdWV1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlYXNpbmc6ICdlYXNlT3V0Q3ViaWMnLFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAocmVzdG9yZU5hdiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlc3RvcmUgRml4ZWQgc2lkZW5hdlxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnUucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBtZW51LmNzcygnd2lkdGgnLCBvcHRpb25zLm1lbnVXaWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFJlc2V0IHBoYW50b20gZGl2XHJcbiAgICAgICAgICAgICRkcmFnVGFyZ2V0LmNzcyh7d2lkdGg6ICcnLCByaWdodDogJzAnLCBsZWZ0OiAnJ30pO1xyXG4gICAgICAgICAgICBtZW51LnZlbG9jaXR5KFxyXG4gICAgICAgICAgICAgIHsndHJhbnNsYXRlWCc6ICcxMDAlJ30sXHJcbiAgICAgICAgICAgICAgeyBkdXJhdGlvbjogMjAwLFxyXG4gICAgICAgICAgICAgICAgcXVldWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZWFzaW5nOiAnZWFzZU91dEN1YmljJyxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKHJlc3RvcmVOYXYgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIEZpeGVkIHNpZGVuYXZcclxuICAgICAgICAgICAgICAgICAgICBtZW51LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVudS5jc3MoJ3dpZHRoJywgb3B0aW9ucy5tZW51V2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gQ2FsbGJhY2tcclxuICAgICAgICAgIGlmICh0eXBlb2Yob3B0aW9ucy5vbkNsb3NlKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBvcHRpb25zLm9uQ2xvc2UuY2FsbCh0aGlzLCBtZW51KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8gVG91Y2ggRXZlbnRcclxuICAgICAgICB2YXIgcGFubmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBtZW51T3V0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmRyYWdnYWJsZSkge1xyXG4gICAgICAgICAgJGRyYWdUYXJnZXQub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYgKG1lbnVPdXQpIHtcclxuICAgICAgICAgICAgICByZW1vdmVNZW51KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICRkcmFnVGFyZ2V0LmhhbW1lcih7XHJcbiAgICAgICAgICAgIHByZXZlbnRfZGVmYXVsdDogZmFsc2VcclxuICAgICAgICAgIH0pLm9uKCdwYW4nLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZS5nZXN0dXJlLnBvaW50ZXJUeXBlID09IFwidG91Y2hcIikge1xyXG5cclxuICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gZS5nZXN0dXJlLmRpcmVjdGlvbjtcclxuICAgICAgICAgICAgICB2YXIgeCA9IGUuZ2VzdHVyZS5jZW50ZXIueDtcclxuICAgICAgICAgICAgICB2YXIgeSA9IGUuZ2VzdHVyZS5jZW50ZXIueTtcclxuICAgICAgICAgICAgICB2YXIgdmVsb2NpdHlYID0gZS5nZXN0dXJlLnZlbG9jaXR5WDtcclxuXHJcbiAgICAgICAgICAgICAgLy8gVmVydGljYWwgc2Nyb2xsIGJ1Z2ZpeFxyXG4gICAgICAgICAgICAgIGlmICh4ID09PSAwICYmIHkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIC8vIERpc2FibGUgU2Nyb2xsaW5nXHJcbiAgICAgICAgICAgICAgdmFyICRib2R5ID0gJCgnYm9keScpO1xyXG4gICAgICAgICAgICAgIHZhciAkb3ZlcmxheSA9ICQoJyNzaWRlbmF2LW92ZXJsYXknKTtcclxuICAgICAgICAgICAgICB2YXIgb2xkV2lkdGggPSAkYm9keS5pbm5lcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgJGJvZHkuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAkYm9keS53aWR0aChvbGRXaWR0aCk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIElmIG92ZXJsYXkgZG9lcyBub3QgZXhpc3QsIGNyZWF0ZSBvbmUgYW5kIGlmIGl0IGlzIGNsaWNrZWQsIGNsb3NlIG1lbnVcclxuICAgICAgICAgICAgICBpZiAoJG92ZXJsYXkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAkb3ZlcmxheSA9ICQoJzxkaXYgaWQ9XCJzaWRlbmF2LW92ZXJsYXlcIj48L2Rpdj4nKTtcclxuICAgICAgICAgICAgICAgICRvdmVybGF5LmNzcygnb3BhY2l0eScsIDApLmNsaWNrKCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICByZW1vdmVNZW51KCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSdW4gJ29uT3Blbicgd2hlbiBzaWRlbmF2IGlzIG9wZW5lZCB2aWEgdG91Y2gvc3dpcGUgaWYgYXBwbGljYWJsZVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihvcHRpb25zLm9uT3BlbikgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vbk9wZW4uY2FsbCh0aGlzLCBtZW51KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkKCdib2R5JykuYXBwZW5kKCRvdmVybGF5KTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIC8vIEtlZXAgd2l0aGluIGJvdW5kYXJpZXNcclxuICAgICAgICAgICAgICBpZiAob3B0aW9ucy5lZGdlID09PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgICAgIGlmICh4ID4gb3B0aW9ucy5tZW51V2lkdGgpIHsgeCA9IG9wdGlvbnMubWVudVdpZHRoOyB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh4IDwgMCkgeyB4ID0gMDsgfVxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZWRnZSA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBMZWZ0IERpcmVjdGlvblxyXG4gICAgICAgICAgICAgICAgaWYgKHggPCAob3B0aW9ucy5tZW51V2lkdGggLyAyKSkgeyBtZW51T3V0ID0gZmFsc2U7IH1cclxuICAgICAgICAgICAgICAgIC8vIFJpZ2h0IERpcmVjdGlvblxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoeCA+PSAob3B0aW9ucy5tZW51V2lkdGggLyAyKSkgeyBtZW51T3V0ID0gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgICAgbWVudS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVYKCcgKyAoeCAtIG9wdGlvbnMubWVudVdpZHRoKSArICdweCknKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBMZWZ0IERpcmVjdGlvblxyXG4gICAgICAgICAgICAgICAgaWYgKHggPCAod2luZG93LmlubmVyV2lkdGggLSBvcHRpb25zLm1lbnVXaWR0aCAvIDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgIG1lbnVPdXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gUmlnaHQgRGlyZWN0aW9uXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh4ID49ICh3aW5kb3cuaW5uZXJXaWR0aCAtIG9wdGlvbnMubWVudVdpZHRoIC8gMikpIHtcclxuICAgICAgICAgICAgICAgICBtZW51T3V0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciByaWdodFBvcyA9ICh4IC0gb3B0aW9ucy5tZW51V2lkdGggLyAyKTtcclxuICAgICAgICAgICAgICAgIGlmIChyaWdodFBvcyA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgcmlnaHRQb3MgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG1lbnUuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgnICsgcmlnaHRQb3MgKyAncHgpJyk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgLy8gUGVyY2VudGFnZSBvdmVybGF5XHJcbiAgICAgICAgICAgICAgdmFyIG92ZXJsYXlQZXJjO1xyXG4gICAgICAgICAgICAgIGlmIChvcHRpb25zLmVkZ2UgPT09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICAgICAgb3ZlcmxheVBlcmMgPSB4IC8gb3B0aW9ucy5tZW51V2lkdGg7XHJcbiAgICAgICAgICAgICAgICAkb3ZlcmxheS52ZWxvY2l0eSh7b3BhY2l0eTogb3ZlcmxheVBlcmMgfSwge2R1cmF0aW9uOiAxMCwgcXVldWU6IGZhbHNlLCBlYXNpbmc6ICdlYXNlT3V0UXVhZCd9KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5UGVyYyA9IE1hdGguYWJzKCh4IC0gd2luZG93LmlubmVyV2lkdGgpIC8gb3B0aW9ucy5tZW51V2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgJG92ZXJsYXkudmVsb2NpdHkoe29wYWNpdHk6IG92ZXJsYXlQZXJjIH0sIHtkdXJhdGlvbjogMTAsIHF1ZXVlOiBmYWxzZSwgZWFzaW5nOiAnZWFzZU91dFF1YWQnfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfSkub24oJ3BhbmVuZCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChlLmdlc3R1cmUucG9pbnRlclR5cGUgPT0gXCJ0b3VjaFwiKSB7XHJcbiAgICAgICAgICAgICAgdmFyICRvdmVybGF5ID0gJCgnI3NpZGVuYXYtb3ZlcmxheScpO1xyXG4gICAgICAgICAgICAgIHZhciB2ZWxvY2l0eVggPSBlLmdlc3R1cmUudmVsb2NpdHlYO1xyXG4gICAgICAgICAgICAgIHZhciB4ID0gZS5nZXN0dXJlLmNlbnRlci54O1xyXG4gICAgICAgICAgICAgIHZhciBsZWZ0UG9zID0geCAtIG9wdGlvbnMubWVudVdpZHRoO1xyXG4gICAgICAgICAgICAgIHZhciByaWdodFBvcyA9IHggLSBvcHRpb25zLm1lbnVXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgaWYgKGxlZnRQb3MgPiAwICkge1xyXG4gICAgICAgICAgICAgICAgbGVmdFBvcyA9IDA7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmIChyaWdodFBvcyA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0UG9zID0gMDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcGFubmluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICBpZiAob3B0aW9ucy5lZGdlID09PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIHZlbG9jaXR5WCA8PSAwLjMgdGhlbiB0aGUgdXNlciBpcyBmbGluZ2luZyB0aGUgbWVudSBjbG9zZWQgc28gaWdub3JlIG1lbnVPdXRcclxuICAgICAgICAgICAgICAgIGlmICgobWVudU91dCAmJiB2ZWxvY2l0eVggPD0gMC4zKSB8fCB2ZWxvY2l0eVggPCAtMC41KSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIFJldHVybiBtZW51IHRvIG9wZW5cclxuICAgICAgICAgICAgICAgICAgaWYgKGxlZnRQb3MgIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBtZW51LnZlbG9jaXR5KHsndHJhbnNsYXRlWCc6IFswLCBsZWZ0UG9zXX0sIHtkdXJhdGlvbjogMzAwLCBxdWV1ZTogZmFsc2UsIGVhc2luZzogJ2Vhc2VPdXRRdWFkJ30pO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAkb3ZlcmxheS52ZWxvY2l0eSh7b3BhY2l0eTogMSB9LCB7ZHVyYXRpb246IDUwLCBxdWV1ZTogZmFsc2UsIGVhc2luZzogJ2Vhc2VPdXRRdWFkJ30pO1xyXG4gICAgICAgICAgICAgICAgICAkZHJhZ1RhcmdldC5jc3Moe3dpZHRoOiAnNTAlJywgcmlnaHQ6IDAsIGxlZnQ6ICcnfSk7XHJcbiAgICAgICAgICAgICAgICAgIG1lbnVPdXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIW1lbnVPdXQgfHwgdmVsb2NpdHlYID4gMC4zKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIEVuYWJsZSBTY3JvbGxpbmdcclxuICAgICAgICAgICAgICAgICAgJCgnYm9keScpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnJ1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgLy8gU2xpZGUgbWVudSBjbG9zZWRcclxuICAgICAgICAgICAgICAgICAgbWVudS52ZWxvY2l0eSh7J3RyYW5zbGF0ZVgnOiBbLTEgKiBvcHRpb25zLm1lbnVXaWR0aCAtIDEwLCBsZWZ0UG9zXX0sIHtkdXJhdGlvbjogMjAwLCBxdWV1ZTogZmFsc2UsIGVhc2luZzogJ2Vhc2VPdXRRdWFkJ30pO1xyXG4gICAgICAgICAgICAgICAgICAkb3ZlcmxheS52ZWxvY2l0eSh7b3BhY2l0eTogMCB9LCB7ZHVyYXRpb246IDIwMCwgcXVldWU6IGZhbHNlLCBlYXNpbmc6ICdlYXNlT3V0UXVhZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIC8vIFJ1biAnb25DbG9zZScgd2hlbiBzaWRlbmF2IGlzIGNsb3NlZCB2aWEgdG91Y2gvc3dpcGUgaWYgYXBwbGljYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihvcHRpb25zLm9uQ2xvc2UpID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMub25DbG9zZS5jYWxsKHRoaXMsIG1lbnUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfX0pO1xyXG4gICAgICAgICAgICAgICAgICAkZHJhZ1RhcmdldC5jc3Moe3dpZHRoOiAnMTBweCcsIHJpZ2h0OiAnJywgbGVmdDogMH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICgobWVudU91dCAmJiB2ZWxvY2l0eVggPj0gLTAuMykgfHwgdmVsb2NpdHlYID4gMC41KSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIFJldHVybiBtZW51IHRvIG9wZW5cclxuICAgICAgICAgICAgICAgICAgaWYgKHJpZ2h0UG9zICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVudS52ZWxvY2l0eSh7J3RyYW5zbGF0ZVgnOiBbMCwgcmlnaHRQb3NdfSwge2R1cmF0aW9uOiAzMDAsIHF1ZXVlOiBmYWxzZSwgZWFzaW5nOiAnZWFzZU91dFF1YWQnfSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICRvdmVybGF5LnZlbG9jaXR5KHtvcGFjaXR5OiAxIH0sIHtkdXJhdGlvbjogNTAsIHF1ZXVlOiBmYWxzZSwgZWFzaW5nOiAnZWFzZU91dFF1YWQnfSk7XHJcbiAgICAgICAgICAgICAgICAgICRkcmFnVGFyZ2V0LmNzcyh7d2lkdGg6ICc1MCUnLCByaWdodDogJycsIGxlZnQ6IDB9KTtcclxuICAgICAgICAgICAgICAgICAgbWVudU91dCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICghbWVudU91dCB8fCB2ZWxvY2l0eVggPCAtMC4zKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIEVuYWJsZSBTY3JvbGxpbmdcclxuICAgICAgICAgICAgICAgICAgJCgnYm9keScpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnJ1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIC8vIFNsaWRlIG1lbnUgY2xvc2VkXHJcbiAgICAgICAgICAgICAgICAgIG1lbnUudmVsb2NpdHkoeyd0cmFuc2xhdGVYJzogW29wdGlvbnMubWVudVdpZHRoICsgMTAsIHJpZ2h0UG9zXX0sIHtkdXJhdGlvbjogMjAwLCBxdWV1ZTogZmFsc2UsIGVhc2luZzogJ2Vhc2VPdXRRdWFkJ30pO1xyXG4gICAgICAgICAgICAgICAgICAkb3ZlcmxheS52ZWxvY2l0eSh7b3BhY2l0eTogMCB9LCB7ZHVyYXRpb246IDIwMCwgcXVldWU6IGZhbHNlLCBlYXNpbmc6ICdlYXNlT3V0UXVhZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIC8vIFJ1biAnb25DbG9zZScgd2hlbiBzaWRlbmF2IGlzIGNsb3NlZCB2aWEgdG91Y2gvc3dpcGUgaWYgYXBwbGljYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihvcHRpb25zLm9uQ2xvc2UpID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMub25DbG9zZS5jYWxsKHRoaXMsIG1lbnUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfX0pO1xyXG4gICAgICAgICAgICAgICAgICAkZHJhZ1RhcmdldC5jc3Moe3dpZHRoOiAnMTBweCcsIHJpZ2h0OiAwLCBsZWZ0OiAnJ30pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHRoaXMub2ZmKCdjbGljay5zaWRlbmF2Jykub24oJ2NsaWNrLnNpZGVuYXYnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmIChtZW51T3V0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIG1lbnVPdXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgcGFubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZW1vdmVNZW51KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIC8vIERpc2FibGUgU2Nyb2xsaW5nXHJcbiAgICAgICAgICAgIHZhciAkYm9keSA9ICQoJ2JvZHknKTtcclxuICAgICAgICAgICAgdmFyICRvdmVybGF5ID0gJCgnPGRpdiBpZD1cInNpZGVuYXYtb3ZlcmxheVwiPjwvZGl2PicpO1xyXG4gICAgICAgICAgICB2YXIgb2xkV2lkdGggPSAkYm9keS5pbm5lcldpZHRoKCk7XHJcbiAgICAgICAgICAgICRib2R5LmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICRib2R5LndpZHRoKG9sZFdpZHRoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFB1c2ggY3VycmVudCBkcmFnIHRhcmdldCBvbiB0b3Agb2YgRE9NIHRyZWVcclxuICAgICAgICAgICAgJCgnYm9keScpLmFwcGVuZCgkZHJhZ1RhcmdldCk7XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5lZGdlID09PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgICAkZHJhZ1RhcmdldC5jc3Moe3dpZHRoOiAnNTAlJywgcmlnaHQ6IDAsIGxlZnQ6ICcnfSk7XHJcbiAgICAgICAgICAgICAgbWVudS52ZWxvY2l0eSh7J3RyYW5zbGF0ZVgnOiBbMCwgLTEgKiBvcHRpb25zLm1lbnVXaWR0aF19LCB7ZHVyYXRpb246IDMwMCwgcXVldWU6IGZhbHNlLCBlYXNpbmc6ICdlYXNlT3V0UXVhZCd9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAkZHJhZ1RhcmdldC5jc3Moe3dpZHRoOiAnNTAlJywgcmlnaHQ6ICcnLCBsZWZ0OiAwfSk7XHJcbiAgICAgICAgICAgICAgbWVudS52ZWxvY2l0eSh7J3RyYW5zbGF0ZVgnOiBbMCwgb3B0aW9ucy5tZW51V2lkdGhdfSwge2R1cmF0aW9uOiAzMDAsIHF1ZXVlOiBmYWxzZSwgZWFzaW5nOiAnZWFzZU91dFF1YWQnfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIE92ZXJsYXkgY2xvc2Ugb24gY2xpY2tcclxuICAgICAgICAgICAgJG92ZXJsYXkuY3NzKCdvcGFjaXR5JywgMClcclxuICAgICAgICAgICAgICAuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBtZW51T3V0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBwYW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVNZW51KCk7XHJcbiAgICAgICAgICAgICAgICAkb3ZlcmxheS52ZWxvY2l0eSh7b3BhY2l0eTogMH0sIHtkdXJhdGlvbjogMzAwLCBxdWV1ZTogZmFsc2UsIGVhc2luZzogJ2Vhc2VPdXRRdWFkJyxcclxuICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwZW5kIGJvZHlcclxuICAgICAgICAgICAgJCgnYm9keScpLmFwcGVuZCgkb3ZlcmxheSk7XHJcbiAgICAgICAgICAgICRvdmVybGF5LnZlbG9jaXR5KHtvcGFjaXR5OiAxfSwge2R1cmF0aW9uOiAzMDAsIHF1ZXVlOiBmYWxzZSwgZWFzaW5nOiAnZWFzZU91dFF1YWQnLFxyXG4gICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBtZW51T3V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHBhbm5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2FsbGJhY2tcclxuICAgICAgICAgICAgaWYgKHR5cGVvZihvcHRpb25zLm9uT3BlbikgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICBvcHRpb25zLm9uT3Blbi5jYWxsKHRoaXMsIG1lbnUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcblxyXG4gICAgfSxcclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyICRvdmVybGF5ID0gJCgnI3NpZGVuYXYtb3ZlcmxheScpO1xyXG4gICAgICB2YXIgJGRyYWdUYXJnZXQgPSAkKCcuZHJhZy10YXJnZXRbZGF0YS1zaWRlbmF2PVwiJyArICQodGhpcykuYXR0cignZGF0YS1hY3RpdmF0ZXMnKSArICdcIl0nKTtcclxuICAgICAgJG92ZXJsYXkudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgJGRyYWdUYXJnZXQucmVtb3ZlKCk7XHJcbiAgICAgICQodGhpcykub2ZmKCdjbGljaycpO1xyXG4gICAgICAkb3ZlcmxheS5yZW1vdmUoKTtcclxuICAgIH0sXHJcbiAgICBzaG93IDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHRoaXMudHJpZ2dlcignY2xpY2snKTtcclxuICAgIH0sXHJcbiAgICBoaWRlIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICQoJyNzaWRlbmF2LW92ZXJsYXknKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICAkLmZuLnNpZGVOYXYgPSBmdW5jdGlvbihtZXRob2RPck9wdGlvbnMpIHtcclxuICAgIGlmICggbWV0aG9kc1ttZXRob2RPck9wdGlvbnNdICkge1xyXG4gICAgICByZXR1cm4gbWV0aG9kc1sgbWV0aG9kT3JPcHRpb25zIF0uYXBwbHkoIHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKCBhcmd1bWVudHMsIDEgKSk7XHJcbiAgICB9IGVsc2UgaWYgKCB0eXBlb2YgbWV0aG9kT3JPcHRpb25zID09PSAnb2JqZWN0JyB8fCAhIG1ldGhvZE9yT3B0aW9ucyApIHtcclxuICAgICAgLy8gRGVmYXVsdCB0byBcImluaXRcIlxyXG4gICAgICByZXR1cm4gbWV0aG9kcy5pbml0LmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQuZXJyb3IoICdNZXRob2QgJyArICBtZXRob2RPck9wdGlvbnMgKyAnIGRvZXMgbm90IGV4aXN0IG9uIGpRdWVyeS5zaWRlTmF2JyApO1xyXG4gICAgfVxyXG4gIH07IC8vIFBsdWdpbiBlbmRcclxufSggalF1ZXJ5ICkpO1xyXG5cbi8qKlxyXG4gKiBFeHRlbmQganF1ZXJ5IHdpdGggYSBzY3JvbGxzcHkgcGx1Z2luLlxyXG4gKiBUaGlzIHdhdGNoZXMgdGhlIHdpbmRvdyBzY3JvbGwgYW5kIGZpcmVzIGV2ZW50cyB3aGVuIGVsZW1lbnRzIGFyZSBzY3JvbGxlZCBpbnRvIHZpZXdwb3J0LlxyXG4gKlxyXG4gKiB0aHJvdHRsZSgpIGFuZCBnZXRUaW1lKCkgdGFrZW4gZnJvbSBVbmRlcnNjb3JlLmpzXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXNoa2VuYXMvdW5kZXJzY29yZVxyXG4gKlxyXG4gKiBAYXV0aG9yIENvcHlyaWdodCAyMDEzIEpvaG4gU21hcnRcclxuICogQGxpY2Vuc2UgaHR0cHM6Ly9yYXcuZ2l0aHViLmNvbS90aGVzbWFydC9qcXVlcnktc2Nyb2xsc3B5L21hc3Rlci9MSUNFTlNFXHJcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3RoZXNtYXJ0XHJcbiAqIEB2ZXJzaW9uIDAuMS4yXHJcbiAqL1xyXG4oZnVuY3Rpb24oJCkge1xyXG5cclxuXHR2YXIgaldpbmRvdyA9ICQod2luZG93KTtcclxuXHR2YXIgZWxlbWVudHMgPSBbXTtcclxuXHR2YXIgZWxlbWVudHNJblZpZXcgPSBbXTtcclxuXHR2YXIgaXNTcHlpbmcgPSBmYWxzZTtcclxuXHR2YXIgdGlja3MgPSAwO1xyXG5cdHZhciB1bmlxdWVfaWQgPSAxO1xyXG5cdHZhciBvZmZzZXQgPSB7XHJcblx0XHR0b3AgOiAwLFxyXG5cdFx0cmlnaHQgOiAwLFxyXG5cdFx0Ym90dG9tIDogMCxcclxuXHRcdGxlZnQgOiAwLFxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRmluZCBlbGVtZW50cyB0aGF0IGFyZSB3aXRoaW4gdGhlIGJvdW5kYXJ5XHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IHRvcFxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSByaWdodFxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBib3R0b21cclxuXHQgKiBAcGFyYW0ge251bWJlcn0gbGVmdFxyXG5cdCAqIEByZXR1cm4ge2pRdWVyeX1cdFx0QSBjb2xsZWN0aW9uIG9mIGVsZW1lbnRzXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gZmluZEVsZW1lbnRzKHRvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdCkge1xyXG5cdFx0dmFyIGhpdHMgPSAkKCk7XHJcblx0XHQkLmVhY2goZWxlbWVudHMsIGZ1bmN0aW9uKGksIGVsZW1lbnQpIHtcclxuXHRcdFx0aWYgKGVsZW1lbnQuaGVpZ2h0KCkgPiAwKSB7XHJcblx0XHRcdFx0dmFyIGVsVG9wID0gZWxlbWVudC5vZmZzZXQoKS50b3AsXHJcblx0XHRcdFx0XHRlbExlZnQgPSBlbGVtZW50Lm9mZnNldCgpLmxlZnQsXHJcblx0XHRcdFx0XHRlbFJpZ2h0ID0gZWxMZWZ0ICsgZWxlbWVudC53aWR0aCgpLFxyXG5cdFx0XHRcdFx0ZWxCb3R0b20gPSBlbFRvcCArIGVsZW1lbnQuaGVpZ2h0KCk7XHJcblxyXG5cdFx0XHRcdHZhciBpc0ludGVyc2VjdCA9ICEoZWxMZWZ0ID4gcmlnaHQgfHxcclxuXHRcdFx0XHRcdGVsUmlnaHQgPCBsZWZ0IHx8XHJcblx0XHRcdFx0XHRlbFRvcCA+IGJvdHRvbSB8fFxyXG5cdFx0XHRcdFx0ZWxCb3R0b20gPCB0b3ApO1xyXG5cclxuXHRcdFx0XHRpZiAoaXNJbnRlcnNlY3QpIHtcclxuXHRcdFx0XHRcdGhpdHMucHVzaChlbGVtZW50KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBoaXRzO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGxlZCB3aGVuIHRoZSB1c2VyIHNjcm9sbHMgdGhlIHdpbmRvd1xyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIG9uU2Nyb2xsKHNjcm9sbE9mZnNldCkge1xyXG5cdFx0Ly8gdW5pcXVlIHRpY2sgaWRcclxuXHRcdCsrdGlja3M7XHJcblxyXG5cdFx0Ly8gdmlld3BvcnQgcmVjdGFuZ2xlXHJcblx0XHR2YXIgdG9wID0galdpbmRvdy5zY3JvbGxUb3AoKSxcclxuXHRcdFx0bGVmdCA9IGpXaW5kb3cuc2Nyb2xsTGVmdCgpLFxyXG5cdFx0XHRyaWdodCA9IGxlZnQgKyBqV2luZG93LndpZHRoKCksXHJcblx0XHRcdGJvdHRvbSA9IHRvcCArIGpXaW5kb3cuaGVpZ2h0KCk7XHJcblxyXG5cdFx0Ly8gZGV0ZXJtaW5lIHdoaWNoIGVsZW1lbnRzIGFyZSBpbiB2aWV3XHJcblx0XHR2YXIgaW50ZXJzZWN0aW9ucyA9IGZpbmRFbGVtZW50cyh0b3Arb2Zmc2V0LnRvcCArIHNjcm9sbE9mZnNldCB8fCAyMDAsIHJpZ2h0K29mZnNldC5yaWdodCwgYm90dG9tK29mZnNldC5ib3R0b20sIGxlZnQrb2Zmc2V0LmxlZnQpO1xyXG5cdFx0JC5lYWNoKGludGVyc2VjdGlvbnMsIGZ1bmN0aW9uKGksIGVsZW1lbnQpIHtcclxuXHJcblx0XHRcdHZhciBsYXN0VGljayA9IGVsZW1lbnQuZGF0YSgnc2Nyb2xsU3B5OnRpY2tzJyk7XHJcblx0XHRcdGlmICh0eXBlb2YgbGFzdFRpY2sgIT0gJ251bWJlcicpIHtcclxuXHRcdFx0XHQvLyBlbnRlcmVkIGludG8gdmlld1xyXG5cdFx0XHRcdGVsZW1lbnQudHJpZ2dlckhhbmRsZXIoJ3Njcm9sbFNweTplbnRlcicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyB1cGRhdGUgdGljayBpZFxyXG5cdFx0XHRlbGVtZW50LmRhdGEoJ3Njcm9sbFNweTp0aWNrcycsIHRpY2tzKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIGRldGVybWluZSB3aGljaCBlbGVtZW50cyBhcmUgbm8gbG9uZ2VyIGluIHZpZXdcclxuXHRcdCQuZWFjaChlbGVtZW50c0luVmlldywgZnVuY3Rpb24oaSwgZWxlbWVudCkge1xyXG5cdFx0XHR2YXIgbGFzdFRpY2sgPSBlbGVtZW50LmRhdGEoJ3Njcm9sbFNweTp0aWNrcycpO1xyXG5cdFx0XHRpZiAodHlwZW9mIGxhc3RUaWNrID09ICdudW1iZXInICYmIGxhc3RUaWNrICE9PSB0aWNrcykge1xyXG5cdFx0XHRcdC8vIGV4aXRlZCBmcm9tIHZpZXdcclxuXHRcdFx0XHRlbGVtZW50LnRyaWdnZXJIYW5kbGVyKCdzY3JvbGxTcHk6ZXhpdCcpO1xyXG5cdFx0XHRcdGVsZW1lbnQuZGF0YSgnc2Nyb2xsU3B5OnRpY2tzJywgbnVsbCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIHJlbWVtYmVyIGVsZW1lbnRzIGluIHZpZXcgZm9yIG5leHQgdGlja1xyXG5cdFx0ZWxlbWVudHNJblZpZXcgPSBpbnRlcnNlY3Rpb25zO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsbGVkIHdoZW4gd2luZG93IGlzIHJlc2l6ZWRcclxuXHQqL1xyXG5cdGZ1bmN0aW9uIG9uV2luU2l6ZSgpIHtcclxuXHRcdGpXaW5kb3cudHJpZ2dlcignc2Nyb2xsU3B5OndpblNpemUnKTtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBFbmFibGVzIFNjcm9sbFNweSB1c2luZyBhIHNlbGVjdG9yXHJcblx0ICogQHBhcmFtIHtqUXVlcnl8c3RyaW5nfSBzZWxlY3RvciAgVGhlIGVsZW1lbnRzIGNvbGxlY3Rpb24sIG9yIGEgc2VsZWN0b3JcclxuXHQgKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcdE9wdGlvbmFsLlxyXG4gICAgICAgIHRocm90dGxlIDogbnVtYmVyIC0+IHNjcm9sbHNweSB0aHJvdHRsaW5nLiBEZWZhdWx0OiAxMDAgbXNcclxuICAgICAgICBvZmZzZXRUb3AgOiBudW1iZXIgLT4gb2Zmc2V0IGZyb20gdG9wLiBEZWZhdWx0OiAwXHJcbiAgICAgICAgb2Zmc2V0UmlnaHQgOiBudW1iZXIgLT4gb2Zmc2V0IGZyb20gcmlnaHQuIERlZmF1bHQ6IDBcclxuICAgICAgICBvZmZzZXRCb3R0b20gOiBudW1iZXIgLT4gb2Zmc2V0IGZyb20gYm90dG9tLiBEZWZhdWx0OiAwXHJcbiAgICAgICAgb2Zmc2V0TGVmdCA6IG51bWJlciAtPiBvZmZzZXQgZnJvbSBsZWZ0LiBEZWZhdWx0OiAwXHJcblx0XHRcdFx0YWN0aXZlQ2xhc3MgOiBzdHJpbmcgLT4gQ2xhc3MgbmFtZSB0byBiZSBhZGRlZCB0byB0aGUgYWN0aXZlIGxpbmsuIERlZmF1bHQ6IGFjdGl2ZVxyXG5cdCAqIEByZXR1cm5zIHtqUXVlcnl9XHJcblx0ICovXHJcblx0JC5zY3JvbGxTcHkgPSBmdW5jdGlvbihzZWxlY3Rvciwgb3B0aW9ucykge1xyXG5cdCAgdmFyIGRlZmF1bHRzID0ge1xyXG5cdFx0XHR0aHJvdHRsZTogMTAwLFxyXG5cdFx0XHRzY3JvbGxPZmZzZXQ6IDIwMCwgLy8gb2Zmc2V0IC0gMjAwIGFsbG93cyBlbGVtZW50cyBuZWFyIGJvdHRvbSBvZiBwYWdlIHRvIHNjcm9sbFxyXG5cdFx0XHRhY3RpdmVDbGFzczogJ2FjdGl2ZScsXHJcblx0XHRcdGdldEFjdGl2ZUVsZW1lbnQ6IGZ1bmN0aW9uKGlkKSB7XHJcblx0XHRcdFx0cmV0dXJuICdhW2hyZWY9XCIjJyArIGlkICsgJ1wiXSc7XHJcblx0XHRcdH1cclxuICAgIH07XHJcbiAgICBvcHRpb25zID0gJC5leHRlbmQoZGVmYXVsdHMsIG9wdGlvbnMpO1xyXG5cclxuXHRcdHZhciB2aXNpYmxlID0gW107XHJcblx0XHRzZWxlY3RvciA9ICQoc2VsZWN0b3IpO1xyXG5cdFx0c2VsZWN0b3IuZWFjaChmdW5jdGlvbihpLCBlbGVtZW50KSB7XHJcblx0XHRcdGVsZW1lbnRzLnB1c2goJChlbGVtZW50KSk7XHJcblx0XHRcdCQoZWxlbWVudCkuZGF0YShcInNjcm9sbFNweTppZFwiLCBpKTtcclxuXHRcdFx0Ly8gU21vb3RoIHNjcm9sbCB0byBzZWN0aW9uXHJcblx0XHQgICQoJ2FbaHJlZj1cIiMnICsgJChlbGVtZW50KS5hdHRyKCdpZCcpICsgJ1wiXScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuXHRcdCAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHQgICAgdmFyIG9mZnNldCA9ICQoTWF0ZXJpYWxpemUuZXNjYXBlSGFzaCh0aGlzLmhhc2gpKS5vZmZzZXQoKS50b3AgKyAxO1xyXG5cdCAgICBcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiBvZmZzZXQgLSBvcHRpb25zLnNjcm9sbE9mZnNldCB9LCB7ZHVyYXRpb246IDQwMCwgcXVldWU6IGZhbHNlLCBlYXNpbmc6ICdlYXNlT3V0Q3ViaWMnfSk7XHJcblx0XHQgIH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0b2Zmc2V0LnRvcCA9IG9wdGlvbnMub2Zmc2V0VG9wIHx8IDA7XHJcblx0XHRvZmZzZXQucmlnaHQgPSBvcHRpb25zLm9mZnNldFJpZ2h0IHx8IDA7XHJcblx0XHRvZmZzZXQuYm90dG9tID0gb3B0aW9ucy5vZmZzZXRCb3R0b20gfHwgMDtcclxuXHRcdG9mZnNldC5sZWZ0ID0gb3B0aW9ucy5vZmZzZXRMZWZ0IHx8IDA7XHJcblxyXG5cdFx0dmFyIHRocm90dGxlZFNjcm9sbCA9IE1hdGVyaWFsaXplLnRocm90dGxlKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRvblNjcm9sbChvcHRpb25zLnNjcm9sbE9mZnNldCk7XHJcblx0XHR9LCBvcHRpb25zLnRocm90dGxlIHx8IDEwMCk7XHJcblx0XHR2YXIgcmVhZHlTY3JvbGwgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHQkKGRvY3VtZW50KS5yZWFkeSh0aHJvdHRsZWRTY3JvbGwpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAoIWlzU3B5aW5nKSB7XHJcblx0XHRcdGpXaW5kb3cub24oJ3Njcm9sbCcsIHJlYWR5U2Nyb2xsKTtcclxuXHRcdFx0aldpbmRvdy5vbigncmVzaXplJywgcmVhZHlTY3JvbGwpO1xyXG5cdFx0XHRpc1NweWluZyA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gcGVyZm9ybSBhIHNjYW4gb25jZSwgYWZ0ZXIgY3VycmVudCBleGVjdXRpb24gY29udGV4dCwgYW5kIGFmdGVyIGRvbSBpcyByZWFkeVxyXG5cdFx0c2V0VGltZW91dChyZWFkeVNjcm9sbCwgMCk7XHJcblxyXG5cclxuXHRcdHNlbGVjdG9yLm9uKCdzY3JvbGxTcHk6ZW50ZXInLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmlzaWJsZSA9ICQuZ3JlcCh2aXNpYmxlLCBmdW5jdGlvbih2YWx1ZSkge1xyXG5cdCAgICAgIHJldHVybiB2YWx1ZS5oZWlnaHQoKSAhPSAwO1xyXG5cdCAgICB9KTtcclxuXHJcblx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XHJcblxyXG5cdFx0XHRpZiAodmlzaWJsZVswXSkge1xyXG5cdFx0XHRcdCQob3B0aW9ucy5nZXRBY3RpdmVFbGVtZW50KHZpc2libGVbMF0uYXR0cignaWQnKSkpLnJlbW92ZUNsYXNzKG9wdGlvbnMuYWN0aXZlQ2xhc3MpO1xyXG5cdFx0XHRcdGlmICgkdGhpcy5kYXRhKCdzY3JvbGxTcHk6aWQnKSA8IHZpc2libGVbMF0uZGF0YSgnc2Nyb2xsU3B5OmlkJykpIHtcclxuXHRcdFx0XHRcdHZpc2libGUudW5zaGlmdCgkKHRoaXMpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHR2aXNpYmxlLnB1c2goJCh0aGlzKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHZpc2libGUucHVzaCgkKHRoaXMpKTtcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdCQob3B0aW9ucy5nZXRBY3RpdmVFbGVtZW50KHZpc2libGVbMF0uYXR0cignaWQnKSkpLmFkZENsYXNzKG9wdGlvbnMuYWN0aXZlQ2xhc3MpO1xyXG5cdFx0fSk7XHJcblx0XHRzZWxlY3Rvci5vbignc2Nyb2xsU3B5OmV4aXQnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmlzaWJsZSA9ICQuZ3JlcCh2aXNpYmxlLCBmdW5jdGlvbih2YWx1ZSkge1xyXG5cdCAgICAgIHJldHVybiB2YWx1ZS5oZWlnaHQoKSAhPSAwO1xyXG5cdCAgICB9KTtcclxuXHJcblx0XHRcdGlmICh2aXNpYmxlWzBdKSB7XHJcblx0XHRcdFx0JChvcHRpb25zLmdldEFjdGl2ZUVsZW1lbnQodmlzaWJsZVswXS5hdHRyKCdpZCcpKSkucmVtb3ZlQ2xhc3Mob3B0aW9ucy5hY3RpdmVDbGFzcyk7XHJcblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHRcdFx0XHR2aXNpYmxlID0gJC5ncmVwKHZpc2libGUsIGZ1bmN0aW9uKHZhbHVlKSB7XHJcblx0ICAgICAgICByZXR1cm4gdmFsdWUuYXR0cignaWQnKSAhPSAkdGhpcy5hdHRyKCdpZCcpO1xyXG5cdCAgICAgIH0pO1xyXG5cdCAgICAgIGlmICh2aXNpYmxlWzBdKSB7IC8vIENoZWNrIGlmIGVtcHR5XHJcblx0XHRcdFx0XHQkKG9wdGlvbnMuZ2V0QWN0aXZlRWxlbWVudCh2aXNpYmxlWzBdLmF0dHIoJ2lkJykpKS5hZGRDbGFzcyhvcHRpb25zLmFjdGl2ZUNsYXNzKTtcclxuXHQgICAgICB9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBzZWxlY3RvcjtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBMaXN0ZW4gZm9yIHdpbmRvdyByZXNpemUgZXZlbnRzXHJcblx0ICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHRcdFx0XHRcdFx0T3B0aW9uYWwuIFNldCB7IHRocm90dGxlOiBudW1iZXIgfSB0byBjaGFuZ2UgdGhyb3R0bGluZy4gRGVmYXVsdDogMTAwIG1zXHJcblx0ICogQHJldHVybnMge2pRdWVyeX1cdFx0JCh3aW5kb3cpXHJcblx0ICovXHJcblx0JC53aW5TaXplU3B5ID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdFx0JC53aW5TaXplU3B5ID0gZnVuY3Rpb24oKSB7IHJldHVybiBqV2luZG93OyB9OyAvLyBsb2NrIGZyb20gbXVsdGlwbGUgY2FsbHNcclxuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHtcclxuXHRcdFx0dGhyb3R0bGU6IDEwMFxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBqV2luZG93Lm9uKCdyZXNpemUnLCBNYXRlcmlhbGl6ZS50aHJvdHRsZShvbldpblNpemUsIG9wdGlvbnMudGhyb3R0bGUgfHwgMTAwKSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRW5hYmxlcyBTY3JvbGxTcHkgb24gYSBjb2xsZWN0aW9uIG9mIGVsZW1lbnRzXHJcblx0ICogZS5nLiAkKCcuc2Nyb2xsU3B5Jykuc2Nyb2xsU3B5KClcclxuXHQgKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcdE9wdGlvbmFsLlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhyb3R0bGUgOiBudW1iZXIgLT4gc2Nyb2xsc3B5IHRocm90dGxpbmcuIERlZmF1bHQ6IDEwMCBtc1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b2Zmc2V0VG9wIDogbnVtYmVyIC0+IG9mZnNldCBmcm9tIHRvcC4gRGVmYXVsdDogMFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b2Zmc2V0UmlnaHQgOiBudW1iZXIgLT4gb2Zmc2V0IGZyb20gcmlnaHQuIERlZmF1bHQ6IDBcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9mZnNldEJvdHRvbSA6IG51bWJlciAtPiBvZmZzZXQgZnJvbSBib3R0b20uIERlZmF1bHQ6IDBcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9mZnNldExlZnQgOiBudW1iZXIgLT4gb2Zmc2V0IGZyb20gbGVmdC4gRGVmYXVsdDogMFxyXG5cdCAqIEByZXR1cm5zIHtqUXVlcnl9XHJcblx0ICovXHJcblx0JC5mbi5zY3JvbGxTcHkgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0XHRyZXR1cm4gJC5zY3JvbGxTcHkoJCh0aGlzKSwgb3B0aW9ucyk7XHJcblx0fTtcclxuXHJcbn0pKGpRdWVyeSk7XHJcblxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8gRnVuY3Rpb24gdG8gdXBkYXRlIGxhYmVscyBvZiB0ZXh0IGZpZWxkc1xyXG4gICAgTWF0ZXJpYWxpemUudXBkYXRlVGV4dEZpZWxkcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgaW5wdXRfc2VsZWN0b3IgPSAnaW5wdXRbdHlwZT10ZXh0XSwgaW5wdXRbdHlwZT1wYXNzd29yZF0sIGlucHV0W3R5cGU9ZW1haWxdLCBpbnB1dFt0eXBlPXVybF0sIGlucHV0W3R5cGU9dGVsXSwgaW5wdXRbdHlwZT1udW1iZXJdLCBpbnB1dFt0eXBlPXNlYXJjaF0sIHRleHRhcmVhJztcclxuICAgICAgJChpbnB1dF9zZWxlY3RvcikuZWFjaChmdW5jdGlvbihpbmRleCwgZWxlbWVudCkge1xyXG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgaWYgKCQoZWxlbWVudCkudmFsKCkubGVuZ3RoID4gMCB8fCAkKGVsZW1lbnQpLmlzKCc6Zm9jdXMnKSB8fCBlbGVtZW50LmF1dG9mb2N1cyB8fCAkdGhpcy5hdHRyKCdwbGFjZWhvbGRlcicpICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICR0aGlzLnNpYmxpbmdzKCdsYWJlbCcpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCQoZWxlbWVudClbMF0udmFsaWRpdHkpIHtcclxuICAgICAgICAgICR0aGlzLnNpYmxpbmdzKCdsYWJlbCcpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnLCAkKGVsZW1lbnQpWzBdLnZhbGlkaXR5LmJhZElucHV0ID09PSB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJHRoaXMuc2libGluZ3MoJ2xhYmVsJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFRleHQgYmFzZWQgaW5wdXRzXHJcbiAgICB2YXIgaW5wdXRfc2VsZWN0b3IgPSAnaW5wdXRbdHlwZT10ZXh0XSwgaW5wdXRbdHlwZT1wYXNzd29yZF0sIGlucHV0W3R5cGU9ZW1haWxdLCBpbnB1dFt0eXBlPXVybF0sIGlucHV0W3R5cGU9dGVsXSwgaW5wdXRbdHlwZT1udW1iZXJdLCBpbnB1dFt0eXBlPXNlYXJjaF0sIHRleHRhcmVhJztcclxuXHJcbiAgICAvLyBBZGQgYWN0aXZlIGlmIGZvcm0gYXV0byBjb21wbGV0ZVxyXG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsIGlucHV0X3NlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmKCQodGhpcykudmFsKCkubGVuZ3RoICE9PSAwIHx8ICQodGhpcykuYXR0cigncGxhY2Vob2xkZXInKSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgJCh0aGlzKS5zaWJsaW5ncygnbGFiZWwnKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgIH1cclxuICAgICAgdmFsaWRhdGVfZmllbGQoJCh0aGlzKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBBZGQgYWN0aXZlIGlmIGlucHV0IGVsZW1lbnQgaGFzIGJlZW4gcHJlLXBvcHVsYXRlZCBvbiBkb2N1bWVudCByZWFkeVxyXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAgIE1hdGVyaWFsaXplLnVwZGF0ZVRleHRGaWVsZHMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhUTUwgRE9NIEZPUk0gUkVTRVQgaGFuZGxpbmdcclxuICAgICQoZG9jdW1lbnQpLm9uKCdyZXNldCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgdmFyIGZvcm1SZXNldCA9ICQoZS50YXJnZXQpO1xyXG4gICAgICBpZiAoZm9ybVJlc2V0LmlzKCdmb3JtJykpIHtcclxuICAgICAgICBmb3JtUmVzZXQuZmluZChpbnB1dF9zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ3ZhbGlkJykucmVtb3ZlQ2xhc3MoJ2ludmFsaWQnKTtcclxuICAgICAgICBmb3JtUmVzZXQuZmluZChpbnB1dF9zZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBpZiAoJCh0aGlzKS5hdHRyKCd2YWx1ZScpID09PSAnJykge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKCdsYWJlbCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgc2VsZWN0XHJcbiAgICAgICAgZm9ybVJlc2V0LmZpbmQoJ3NlbGVjdC5pbml0aWFsaXplZCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgdmFyIHJlc2V0X3RleHQgPSBmb3JtUmVzZXQuZmluZCgnb3B0aW9uW3NlbGVjdGVkXScpLnRleHQoKTtcclxuICAgICAgICAgIGZvcm1SZXNldC5zaWJsaW5ncygnaW5wdXQuc2VsZWN0LWRyb3Bkb3duJykudmFsKHJlc2V0X3RleHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBBZGQgYWN0aXZlIHdoZW4gZWxlbWVudCBoYXMgZm9jdXNcclxuICAgICQoZG9jdW1lbnQpLm9uKCdmb2N1cycsIGlucHV0X3NlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQodGhpcykuc2libGluZ3MoJ2xhYmVsLCAucHJlZml4JykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2JsdXInLCBpbnB1dF9zZWxlY3RvciwgZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgJGlucHV0RWxlbWVudCA9ICQodGhpcyk7XHJcbiAgICAgIHZhciBzZWxlY3RvciA9IFwiLnByZWZpeFwiO1xyXG5cclxuICAgICAgaWYgKCRpbnB1dEVsZW1lbnQudmFsKCkubGVuZ3RoID09PSAwICYmICRpbnB1dEVsZW1lbnRbMF0udmFsaWRpdHkuYmFkSW5wdXQgIT09IHRydWUgJiYgJGlucHV0RWxlbWVudC5hdHRyKCdwbGFjZWhvbGRlcicpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzZWxlY3RvciArPSBcIiwgbGFiZWxcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgJGlucHV0RWxlbWVudC5zaWJsaW5ncyhzZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgdmFsaWRhdGVfZmllbGQoJGlucHV0RWxlbWVudCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cudmFsaWRhdGVfZmllbGQgPSBmdW5jdGlvbihvYmplY3QpIHtcclxuICAgICAgdmFyIGhhc0xlbmd0aCA9IG9iamVjdC5hdHRyKCdkYXRhLWxlbmd0aCcpICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgIHZhciBsZW5BdHRyID0gcGFyc2VJbnQob2JqZWN0LmF0dHIoJ2RhdGEtbGVuZ3RoJykpO1xyXG4gICAgICB2YXIgbGVuID0gb2JqZWN0LnZhbCgpLmxlbmd0aDtcclxuXHJcbiAgICAgIGlmIChvYmplY3QudmFsKCkubGVuZ3RoID09PSAwICYmIG9iamVjdFswXS52YWxpZGl0eS5iYWRJbnB1dCA9PT0gZmFsc2UgJiYgIW9iamVjdC5pcygnOnJlcXVpcmVkJykpIHtcclxuICAgICAgICBpZiAob2JqZWN0Lmhhc0NsYXNzKCd2YWxpZGF0ZScpKSB7XHJcbiAgICAgICAgICBvYmplY3QucmVtb3ZlQ2xhc3MoJ3ZhbGlkJyk7XHJcbiAgICAgICAgICBvYmplY3QucmVtb3ZlQ2xhc3MoJ2ludmFsaWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKG9iamVjdC5oYXNDbGFzcygndmFsaWRhdGUnKSkge1xyXG4gICAgICAgICAgLy8gQ2hlY2sgZm9yIGNoYXJhY3RlciBjb3VudGVyIGF0dHJpYnV0ZXNcclxuICAgICAgICAgIGlmICgob2JqZWN0LmlzKCc6dmFsaWQnKSAmJiBoYXNMZW5ndGggJiYgKGxlbiA8PSBsZW5BdHRyKSkgfHwgKG9iamVjdC5pcygnOnZhbGlkJykgJiYgIWhhc0xlbmd0aCkpIHtcclxuICAgICAgICAgICAgb2JqZWN0LnJlbW92ZUNsYXNzKCdpbnZhbGlkJyk7XHJcbiAgICAgICAgICAgIG9iamVjdC5hZGRDbGFzcygndmFsaWQnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBvYmplY3QucmVtb3ZlQ2xhc3MoJ3ZhbGlkJyk7XHJcbiAgICAgICAgICAgIG9iamVjdC5hZGRDbGFzcygnaW52YWxpZCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBSYWRpbyBhbmQgQ2hlY2tib3ggZm9jdXMgY2xhc3NcclxuICAgIHZhciByYWRpb19jaGVja2JveCA9ICdpbnB1dFt0eXBlPXJhZGlvXSwgaW5wdXRbdHlwZT1jaGVja2JveF0nO1xyXG4gICAgJChkb2N1bWVudCkub24oJ2tleXVwLnJhZGlvJywgcmFkaW9fY2hlY2tib3gsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgLy8gVEFCLCBjaGVjayBpZiB0YWJiaW5nIHRvIHJhZGlvIG9yIGNoZWNrYm94LlxyXG4gICAgICBpZiAoZS53aGljaCA9PT0gOSkge1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3RhYmJlZCcpO1xyXG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgJHRoaXMub25lKCdibHVyJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ3RhYmJlZCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gVGV4dGFyZWEgQXV0byBSZXNpemVcclxuICAgIHZhciBoaWRkZW5EaXYgPSAkKCcuaGlkZGVuZGl2JykuZmlyc3QoKTtcclxuICAgIGlmICghaGlkZGVuRGl2Lmxlbmd0aCkge1xyXG4gICAgICBoaWRkZW5EaXYgPSAkKCc8ZGl2IGNsYXNzPVwiaGlkZGVuZGl2IGNvbW1vblwiPjwvZGl2PicpO1xyXG4gICAgICAkKCdib2R5JykuYXBwZW5kKGhpZGRlbkRpdik7XHJcbiAgICB9XHJcbiAgICB2YXIgdGV4dF9hcmVhX3NlbGVjdG9yID0gJy5tYXRlcmlhbGl6ZS10ZXh0YXJlYSc7XHJcblxyXG4gICAgZnVuY3Rpb24gdGV4dGFyZWFBdXRvUmVzaXplKCR0ZXh0YXJlYSkge1xyXG4gICAgICAvLyBTZXQgZm9udCBwcm9wZXJ0aWVzIG9mIGhpZGRlbkRpdlxyXG5cclxuICAgICAgdmFyIGZvbnRGYW1pbHkgPSAkdGV4dGFyZWEuY3NzKCdmb250LWZhbWlseScpO1xyXG4gICAgICB2YXIgZm9udFNpemUgPSAkdGV4dGFyZWEuY3NzKCdmb250LXNpemUnKTtcclxuICAgICAgdmFyIGxpbmVIZWlnaHQgPSAkdGV4dGFyZWEuY3NzKCdsaW5lLWhlaWdodCcpO1xyXG4gICAgICB2YXIgcGFkZGluZyA9ICR0ZXh0YXJlYS5jc3MoJ3BhZGRpbmcnKTtcclxuXHJcbiAgICAgIGlmIChmb250U2l6ZSkgeyBoaWRkZW5EaXYuY3NzKCdmb250LXNpemUnLCBmb250U2l6ZSk7IH1cclxuICAgICAgaWYgKGZvbnRGYW1pbHkpIHsgaGlkZGVuRGl2LmNzcygnZm9udC1mYW1pbHknLCBmb250RmFtaWx5KTsgfVxyXG4gICAgICBpZiAobGluZUhlaWdodCkgeyBoaWRkZW5EaXYuY3NzKCdsaW5lLWhlaWdodCcsIGxpbmVIZWlnaHQpOyB9XHJcbiAgICAgIGlmIChwYWRkaW5nKSB7IGhpZGRlbkRpdi5jc3MoJ3BhZGRpbmcnLCBwYWRkaW5nKTsgfVxyXG5cclxuICAgICAgLy8gU2V0IG9yaWdpbmFsLWhlaWdodCwgaWYgbm9uZVxyXG4gICAgICBpZiAoISR0ZXh0YXJlYS5kYXRhKCdvcmlnaW5hbC1oZWlnaHQnKSkge1xyXG4gICAgICAgICR0ZXh0YXJlYS5kYXRhKCdvcmlnaW5hbC1oZWlnaHQnLCAkdGV4dGFyZWEuaGVpZ2h0KCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoJHRleHRhcmVhLmF0dHIoJ3dyYXAnKSA9PT0gJ29mZicpIHtcclxuICAgICAgICBoaWRkZW5EaXYuY3NzKCdvdmVyZmxvdy13cmFwJywgJ25vcm1hbCcpXHJcbiAgICAgICAgICAgICAgICAgLmNzcygnd2hpdGUtc3BhY2UnLCAncHJlJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGhpZGRlbkRpdi50ZXh0KCR0ZXh0YXJlYS52YWwoKSArICdcXG4nKTtcclxuICAgICAgdmFyIGNvbnRlbnQgPSBoaWRkZW5EaXYuaHRtbCgpLnJlcGxhY2UoL1xcbi9nLCAnPGJyPicpO1xyXG4gICAgICBoaWRkZW5EaXYuaHRtbChjb250ZW50KTtcclxuXHJcblxyXG4gICAgICAvLyBXaGVuIHRleHRhcmVhIGlzIGhpZGRlbiwgd2lkdGggZ29lcyBjcmF6eS5cclxuICAgICAgLy8gQXBwcm94aW1hdGUgd2l0aCBoYWxmIG9mIHdpbmRvdyBzaXplXHJcblxyXG4gICAgICBpZiAoJHRleHRhcmVhLmlzKCc6dmlzaWJsZScpKSB7XHJcbiAgICAgICAgaGlkZGVuRGl2LmNzcygnd2lkdGgnLCAkdGV4dGFyZWEud2lkdGgoKSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgaGlkZGVuRGl2LmNzcygnd2lkdGgnLCAkKHdpbmRvdykud2lkdGgoKS8yKTtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBSZXNpemUgaWYgdGhlIG5ldyBoZWlnaHQgaXMgZ3JlYXRlciB0aGFuIHRoZVxyXG4gICAgICAgKiBvcmlnaW5hbCBoZWlnaHQgb2YgdGhlIHRleHRhcmVhXHJcbiAgICAgICAqL1xyXG4gICAgICBpZiAoJHRleHRhcmVhLmRhdGEoJ29yaWdpbmFsLWhlaWdodCcpIDw9IGhpZGRlbkRpdi5oZWlnaHQoKSkge1xyXG4gICAgICAgICR0ZXh0YXJlYS5jc3MoJ2hlaWdodCcsIGhpZGRlbkRpdi5oZWlnaHQoKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoJHRleHRhcmVhLnZhbCgpLmxlbmd0aCA8ICR0ZXh0YXJlYS5kYXRhKCdwcmV2aW91cy1sZW5ndGgnKSkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluIGNhc2UgdGhlIG5ldyBoZWlnaHQgaXMgbGVzcyB0aGFuIG9yaWdpbmFsIGhlaWdodCwgaXRcclxuICAgICAgICAgKiBtZWFucyB0aGUgdGV4dGFyZWEgaGFzIGxlc3MgdGV4dCB0aGFuIGJlZm9yZVxyXG4gICAgICAgICAqIFNvIHdlIHNldCB0aGUgaGVpZ2h0IHRvIHRoZSBvcmlnaW5hbCBvbmVcclxuICAgICAgICAgKi9cclxuICAgICAgICAkdGV4dGFyZWEuY3NzKCdoZWlnaHQnLCAkdGV4dGFyZWEuZGF0YSgnb3JpZ2luYWwtaGVpZ2h0JykpO1xyXG4gICAgICB9XHJcbiAgICAgICR0ZXh0YXJlYS5kYXRhKCdwcmV2aW91cy1sZW5ndGgnLCAkdGV4dGFyZWEudmFsKCkubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICAkKHRleHRfYXJlYV9zZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciAkdGV4dGFyZWEgPSAkKHRoaXMpO1xyXG4gICAgICAvKipcclxuICAgICAgICogSW5zdGVhZCBvZiByZXNpemluZyB0ZXh0YXJlYSBvbiBkb2N1bWVudCBsb2FkLFxyXG4gICAgICAgKiBzdG9yZSB0aGUgb3JpZ2luYWwgaGVpZ2h0IGFuZCB0aGUgb3JpZ2luYWwgbGVuZ3RoXHJcbiAgICAgICAqL1xyXG4gICAgICAkdGV4dGFyZWEuZGF0YSgnb3JpZ2luYWwtaGVpZ2h0JywgJHRleHRhcmVhLmhlaWdodCgpKTtcclxuICAgICAgJHRleHRhcmVhLmRhdGEoJ3ByZXZpb3VzLWxlbmd0aCcsICR0ZXh0YXJlYS52YWwoKS5sZW5ndGgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnYm9keScpLm9uKCdrZXl1cCBrZXlkb3duIGF1dG9yZXNpemUnLCB0ZXh0X2FyZWFfc2VsZWN0b3IsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGV4dGFyZWFBdXRvUmVzaXplKCQodGhpcykpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRmlsZSBJbnB1dCBQYXRoXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJy5maWxlLWZpZWxkIGlucHV0W3R5cGU9XCJmaWxlXCJdJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgZmlsZV9maWVsZCA9ICQodGhpcykuY2xvc2VzdCgnLmZpbGUtZmllbGQnKTtcclxuICAgICAgdmFyIHBhdGhfaW5wdXQgPSBmaWxlX2ZpZWxkLmZpbmQoJ2lucHV0LmZpbGUtcGF0aCcpO1xyXG4gICAgICB2YXIgZmlsZXMgICAgICA9ICQodGhpcylbMF0uZmlsZXM7XHJcbiAgICAgIHZhciBmaWxlX25hbWVzID0gW107XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBmaWxlX25hbWVzLnB1c2goZmlsZXNbaV0ubmFtZSk7XHJcbiAgICAgIH1cclxuICAgICAgcGF0aF9pbnB1dC52YWwoZmlsZV9uYW1lcy5qb2luKFwiLCBcIikpO1xyXG4gICAgICBwYXRoX2lucHV0LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKipcclxuICAgICogIFJhbmdlIElucHV0ICAqXHJcbiAgICAqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIHZhciByYW5nZV90eXBlID0gJ2lucHV0W3R5cGU9cmFuZ2VdJztcclxuICAgIHZhciByYW5nZV9tb3VzZWRvd24gPSBmYWxzZTtcclxuICAgIHZhciBsZWZ0O1xyXG5cclxuICAgICQocmFuZ2VfdHlwZSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciB0aHVtYiA9ICQoJzxzcGFuIGNsYXNzPVwidGh1bWJcIj48c3BhbiBjbGFzcz1cInZhbHVlXCI+PC9zcGFuPjwvc3Bhbj4nKTtcclxuICAgICAgJCh0aGlzKS5hZnRlcih0aHVtYik7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgc2hvd1JhbmdlQnViYmxlID0gZnVuY3Rpb24odGh1bWIpIHtcclxuICAgICAgdmFyIHBhZGRpbmdMZWZ0ID0gcGFyc2VJbnQodGh1bWIucGFyZW50KCkuY3NzKCdwYWRkaW5nLWxlZnQnKSk7XHJcbiAgICAgIHZhciBtYXJnaW5MZWZ0ID0gKC03ICsgcGFkZGluZ0xlZnQpICsgJ3B4JztcclxuICAgICAgdGh1bWIudmVsb2NpdHkoeyBoZWlnaHQ6IFwiMzBweFwiLCB3aWR0aDogXCIzMHB4XCIsIHRvcDogXCItMzBweFwiLCBtYXJnaW5MZWZ0OiBtYXJnaW5MZWZ0fSwgeyBkdXJhdGlvbjogMzAwLCBlYXNpbmc6ICdlYXNlT3V0RXhwbycgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBjYWxjUmFuZ2VPZmZzZXQgPSBmdW5jdGlvbihyYW5nZSkge1xyXG4gICAgICB2YXIgd2lkdGggPSByYW5nZS53aWR0aCgpIC0gMTU7XHJcbiAgICAgIHZhciBtYXggPSBwYXJzZUZsb2F0KHJhbmdlLmF0dHIoJ21heCcpKTtcclxuICAgICAgdmFyIG1pbiA9IHBhcnNlRmxvYXQocmFuZ2UuYXR0cignbWluJykpO1xyXG4gICAgICB2YXIgcGVyY2VudCA9IChwYXJzZUZsb2F0KHJhbmdlLnZhbCgpKSAtIG1pbikgLyAobWF4IC0gbWluKTtcclxuICAgICAgcmV0dXJuIHBlcmNlbnQgKiB3aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcmFuZ2Vfd3JhcHBlciA9ICcucmFuZ2UtZmllbGQnO1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsIHJhbmdlX3R5cGUsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgdmFyIHRodW1iID0gJCh0aGlzKS5zaWJsaW5ncygnLnRodW1iJyk7XHJcbiAgICAgIHRodW1iLmZpbmQoJy52YWx1ZScpLmh0bWwoJCh0aGlzKS52YWwoKSk7XHJcblxyXG4gICAgICBpZiAoIXRodW1iLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgIHNob3dSYW5nZUJ1YmJsZSh0aHVtYik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBvZmZzZXRMZWZ0ID0gY2FsY1JhbmdlT2Zmc2V0KCQodGhpcykpO1xyXG4gICAgICB0aHVtYi5hZGRDbGFzcygnYWN0aXZlJykuY3NzKCdsZWZ0Jywgb2Zmc2V0TGVmdCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCByYW5nZV90eXBlLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIHZhciB0aHVtYiA9ICQodGhpcykuc2libGluZ3MoJy50aHVtYicpO1xyXG5cclxuICAgICAgLy8gSWYgdGh1bWIgaW5kaWNhdG9yIGRvZXMgbm90IGV4aXN0IHlldCwgY3JlYXRlIGl0XHJcbiAgICAgIGlmICh0aHVtYi5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgIHRodW1iID0gJCgnPHNwYW4gY2xhc3M9XCJ0aHVtYlwiPjxzcGFuIGNsYXNzPVwidmFsdWVcIj48L3NwYW4+PC9zcGFuPicpO1xyXG4gICAgICAgICQodGhpcykuYWZ0ZXIodGh1bWIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBTZXQgaW5kaWNhdG9yIHZhbHVlXHJcbiAgICAgIHRodW1iLmZpbmQoJy52YWx1ZScpLmh0bWwoJCh0aGlzKS52YWwoKSk7XHJcblxyXG4gICAgICByYW5nZV9tb3VzZWRvd24gPSB0cnVlO1xyXG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgIGlmICghdGh1bWIuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgc2hvd1JhbmdlQnViYmxlKHRodW1iKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGUudHlwZSAhPT0gJ2lucHV0Jykge1xyXG4gICAgICAgIHZhciBvZmZzZXRMZWZ0ID0gY2FsY1JhbmdlT2Zmc2V0KCQodGhpcykpO1xyXG4gICAgICAgIHRodW1iLmFkZENsYXNzKCdhY3RpdmUnKS5jc3MoJ2xlZnQnLCBvZmZzZXRMZWZ0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ21vdXNldXAgdG91Y2hlbmQnLCByYW5nZV93cmFwcGVyLCBmdW5jdGlvbigpIHtcclxuICAgICAgcmFuZ2VfbW91c2Vkb3duID0gZmFsc2U7XHJcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2lucHV0IG1vdXNlbW92ZSB0b3VjaG1vdmUnLCByYW5nZV93cmFwcGVyLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIHZhciB0aHVtYiA9ICQodGhpcykuY2hpbGRyZW4oJy50aHVtYicpO1xyXG4gICAgICB2YXIgbGVmdDtcclxuICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKS5maW5kKHJhbmdlX3R5cGUpO1xyXG5cclxuICAgICAgaWYgKHJhbmdlX21vdXNlZG93bikge1xyXG4gICAgICAgIGlmICghdGh1bWIuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICBzaG93UmFuZ2VCdWJibGUodGh1bWIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG9mZnNldExlZnQgPSBjYWxjUmFuZ2VPZmZzZXQoaW5wdXQpO1xyXG4gICAgICAgIHRodW1iLmFkZENsYXNzKCdhY3RpdmUnKS5jc3MoJ2xlZnQnLCBvZmZzZXRMZWZ0KTtcclxuICAgICAgICB0aHVtYi5maW5kKCcudmFsdWUnKS5odG1sKHRodW1iLnNpYmxpbmdzKHJhbmdlX3R5cGUpLnZhbCgpKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ21vdXNlb3V0IHRvdWNobGVhdmUnLCByYW5nZV93cmFwcGVyLCBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKCFyYW5nZV9tb3VzZWRvd24pIHtcclxuXHJcbiAgICAgICAgdmFyIHRodW1iID0gJCh0aGlzKS5jaGlsZHJlbignLnRodW1iJyk7XHJcbiAgICAgICAgdmFyIHBhZGRpbmdMZWZ0ID0gcGFyc2VJbnQoJCh0aGlzKS5jc3MoJ3BhZGRpbmctbGVmdCcpKTtcclxuICAgICAgICB2YXIgbWFyZ2luTGVmdCA9ICg3ICsgcGFkZGluZ0xlZnQpICsgJ3B4JztcclxuXHJcbiAgICAgICAgaWYgKHRodW1iLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgdGh1bWIudmVsb2NpdHkoeyBoZWlnaHQ6ICcwJywgd2lkdGg6ICcwJywgdG9wOiAnMTBweCcsIG1hcmdpbkxlZnQ6IG1hcmdpbkxlZnR9LCB7IGR1cmF0aW9uOiAxMDAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRodW1iLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgKiBBdXRvIGNvbXBsZXRlIHBsdWdpbiAgKlxyXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAkLmZuLmF1dG9jb21wbGV0ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgIC8vIERlZmF1bHRzXHJcbiAgICAgIHZhciBkZWZhdWx0cyA9IHtcclxuICAgICAgICBkYXRhOiB7fSxcclxuICAgICAgICBsaW1pdDogSW5maW5pdHksXHJcbiAgICAgICAgb25BdXRvY29tcGxldGU6IG51bGwsXHJcbiAgICAgICAgbWluTGVuZ3RoOiAxXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBvcHRpb25zID0gJC5leHRlbmQoZGVmYXVsdHMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKTtcclxuICAgICAgICB2YXIgZGF0YSA9IG9wdGlvbnMuZGF0YSxcclxuICAgICAgICAgICAgY291bnQgPSAwLFxyXG4gICAgICAgICAgICBhY3RpdmVJbmRleCA9IC0xLFxyXG4gICAgICAgICAgICBvbGRWYWwsXHJcbiAgICAgICAgICAgICRpbnB1dERpdiA9ICRpbnB1dC5jbG9zZXN0KCcuaW5wdXQtZmllbGQnKTsgLy8gRGl2IHRvIGFwcGVuZCBvblxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBkYXRhIGlzbid0IGVtcHR5XHJcbiAgICAgICAgaWYgKCEkLmlzRW1wdHlPYmplY3QoZGF0YSkpIHtcclxuICAgICAgICAgIHZhciAkYXV0b2NvbXBsZXRlID0gJCgnPHVsIGNsYXNzPVwiYXV0b2NvbXBsZXRlLWNvbnRlbnQgZHJvcGRvd24tY29udGVudFwiPjwvdWw+Jyk7XHJcbiAgICAgICAgICB2YXIgJG9sZEF1dG9jb21wbGV0ZTtcclxuXHJcbiAgICAgICAgICAvLyBBcHBlbmQgYXV0b2NvbXBsZXRlIGVsZW1lbnQuXHJcbiAgICAgICAgICAvLyBQcmV2ZW50IGRvdWJsZSBzdHJ1Y3R1cmUgaW5pdC5cclxuICAgICAgICAgIGlmICgkaW5wdXREaXYubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICRvbGRBdXRvY29tcGxldGUgPSAkaW5wdXREaXYuY2hpbGRyZW4oJy5hdXRvY29tcGxldGUtY29udGVudC5kcm9wZG93bi1jb250ZW50JykuZmlyc3QoKTtcclxuICAgICAgICAgICAgaWYgKCEkb2xkQXV0b2NvbXBsZXRlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICRpbnB1dERpdi5hcHBlbmQoJGF1dG9jb21wbGV0ZSk7IC8vIFNldCB1bCBpbiBib2R5XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRvbGRBdXRvY29tcGxldGUgPSAkaW5wdXQubmV4dCgnLmF1dG9jb21wbGV0ZS1jb250ZW50LmRyb3Bkb3duLWNvbnRlbnQnKTtcclxuICAgICAgICAgICAgaWYgKCEkb2xkQXV0b2NvbXBsZXRlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICRpbnB1dC5hZnRlcigkYXV0b2NvbXBsZXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCRvbGRBdXRvY29tcGxldGUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICRhdXRvY29tcGxldGUgPSAkb2xkQXV0b2NvbXBsZXRlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIEhpZ2hsaWdodCBwYXJ0aWFsIG1hdGNoLlxyXG4gICAgICAgICAgdmFyIGhpZ2hsaWdodCA9IGZ1bmN0aW9uKHN0cmluZywgJGVsKSB7XHJcbiAgICAgICAgICAgIHZhciBpbWcgPSAkZWwuZmluZCgnaW1nJyk7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaFN0YXJ0ID0gJGVsLnRleHQoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJcIiArIHN0cmluZy50b0xvd2VyQ2FzZSgpICsgXCJcIiksXHJcbiAgICAgICAgICAgICAgICBtYXRjaEVuZCA9IG1hdGNoU3RhcnQgKyBzdHJpbmcubGVuZ3RoIC0gMSxcclxuICAgICAgICAgICAgICAgIGJlZm9yZU1hdGNoID0gJGVsLnRleHQoKS5zbGljZSgwLCBtYXRjaFN0YXJ0KSxcclxuICAgICAgICAgICAgICAgIG1hdGNoVGV4dCA9ICRlbC50ZXh0KCkuc2xpY2UobWF0Y2hTdGFydCwgbWF0Y2hFbmQgKyAxKSxcclxuICAgICAgICAgICAgICAgIGFmdGVyTWF0Y2ggPSAkZWwudGV4dCgpLnNsaWNlKG1hdGNoRW5kICsgMSk7XHJcbiAgICAgICAgICAgICRlbC5odG1sKFwiPHNwYW4+XCIgKyBiZWZvcmVNYXRjaCArIFwiPHNwYW4gY2xhc3M9J2hpZ2hsaWdodCc+XCIgKyBtYXRjaFRleHQgKyBcIjwvc3Bhbj5cIiArIGFmdGVyTWF0Y2ggKyBcIjwvc3Bhbj5cIik7XHJcbiAgICAgICAgICAgIGlmIChpbWcubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgJGVsLnByZXBlbmQoaW1nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAvLyBSZXNldCBjdXJyZW50IGVsZW1lbnQgcG9zaXRpb25cclxuICAgICAgICAgIHZhciByZXNldEN1cnJlbnRFbGVtZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZUluZGV4ID0gLTE7XHJcbiAgICAgICAgICAgICRhdXRvY29tcGxldGUuZmluZCgnLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBSZW1vdmUgYXV0b2NvbXBsZXRlIGVsZW1lbnRzXHJcbiAgICAgICAgICB2YXIgcmVtb3ZlQXV0b2NvbXBsZXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRhdXRvY29tcGxldGUuZW1wdHkoKTtcclxuICAgICAgICAgICAgcmVzZXRDdXJyZW50RWxlbWVudCgpO1xyXG4gICAgICAgICAgICBvbGRWYWwgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICRpbnB1dC5vZmYoJ2JsdXIuYXV0b2NvbXBsZXRlJykub24oJ2JsdXIuYXV0b2NvbXBsZXRlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZUF1dG9jb21wbGV0ZSgpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgLy8gUGVyZm9ybSBzZWFyY2hcclxuICAgICAgICAgICRpbnB1dC5vZmYoJ2tleXVwLmF1dG9jb21wbGV0ZSBmb2N1cy5hdXRvY29tcGxldGUnKS5vbigna2V5dXAuYXV0b2NvbXBsZXRlIGZvY3VzLmF1dG9jb21wbGV0ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIC8vIFJlc2V0IGNvdW50LlxyXG4gICAgICAgICAgICBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHZhciB2YWwgPSAkaW5wdXQudmFsKCkudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIERvbid0IGNhcHR1cmUgZW50ZXIgb3IgYXJyb3cga2V5IHVzYWdlLlxyXG4gICAgICAgICAgICBpZiAoZS53aGljaCA9PT0gMTMgfHxcclxuICAgICAgICAgICAgICAgIGUud2hpY2ggPT09IDM4IHx8XHJcbiAgICAgICAgICAgICAgICBlLndoaWNoID09PSA0MCkge1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBpbnB1dCBpc24ndCBlbXB0eVxyXG4gICAgICAgICAgICBpZiAob2xkVmFsICE9PSB2YWwpIHtcclxuICAgICAgICAgICAgICByZW1vdmVBdXRvY29tcGxldGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKHZhbC5sZW5ndGggPj0gb3B0aW9ucy5taW5MZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAga2V5LnRvTG93ZXJDYXNlKCkuaW5kZXhPZih2YWwpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEJyZWFrIGlmIHBhc3QgbGltaXRcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPj0gb3B0aW9ucy5saW1pdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXV0b2NvbXBsZXRlT3B0aW9uID0gJCgnPGxpPjwvbGk+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhZGF0YVtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBhdXRvY29tcGxldGVPcHRpb24uYXBwZW5kKCc8aW1nIHNyYz1cIicrIGRhdGFba2V5XSArJ1wiIGNsYXNzPVwicmlnaHQgY2lyY2xlXCI+PHNwYW4+Jysga2V5ICsnPC9zcGFuPicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBhdXRvY29tcGxldGVPcHRpb24uYXBwZW5kKCc8c3Bhbj4nKyBrZXkgKyc8L3NwYW4+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkYXV0b2NvbXBsZXRlLmFwcGVuZChhdXRvY29tcGxldGVPcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodCh2YWwsIGF1dG9jb21wbGV0ZU9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gVXBkYXRlIG9sZFZhbFxyXG4gICAgICAgICAgICBvbGRWYWwgPSB2YWw7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkaW5wdXQub2ZmKCdrZXlkb3duLmF1dG9jb21wbGV0ZScpLm9uKCdrZXlkb3duLmF1dG9jb21wbGV0ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIC8vIEFycm93IGtleXMgYW5kIGVudGVyIGtleSB1c2FnZVxyXG4gICAgICAgICAgICB2YXIga2V5Q29kZSA9IGUud2hpY2gsXHJcbiAgICAgICAgICAgICAgICBsaUVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICBudW1JdGVtcyA9ICRhdXRvY29tcGxldGUuY2hpbGRyZW4oJ2xpJykubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgJGFjdGl2ZSA9ICRhdXRvY29tcGxldGUuY2hpbGRyZW4oJy5hY3RpdmUnKS5maXJzdCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2VsZWN0IGVsZW1lbnQgb24gRW50ZXJcclxuICAgICAgICAgICAgaWYgKGtleUNvZGUgPT09IDEzICYmIGFjdGl2ZUluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICBsaUVsZW1lbnQgPSAkYXV0b2NvbXBsZXRlLmNoaWxkcmVuKCdsaScpLmVxKGFjdGl2ZUluZGV4KTtcclxuICAgICAgICAgICAgICBpZiAobGlFbGVtZW50Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgbGlFbGVtZW50LnRyaWdnZXIoJ21vdXNlZG93bi5hdXRvY29tcGxldGUnKTtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDYXB0dXJlIHVwIGFuZCBkb3duIGtleVxyXG4gICAgICAgICAgICBpZiAoIGtleUNvZGUgPT09IDM4IHx8IGtleUNvZGUgPT09IDQwICkge1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKGtleUNvZGUgPT09IDM4ICYmXHJcbiAgICAgICAgICAgICAgICAgIGFjdGl2ZUluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlSW5kZXgtLTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGlmIChrZXlDb2RlID09PSA0MCAmJlxyXG4gICAgICAgICAgICAgICAgICBhY3RpdmVJbmRleCA8IChudW1JdGVtcyAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVJbmRleCsrO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgJGFjdGl2ZS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgaWYgKGFjdGl2ZUluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgICRhdXRvY29tcGxldGUuY2hpbGRyZW4oJ2xpJykuZXEoYWN0aXZlSW5kZXgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIC8vIFNldCBpbnB1dCB2YWx1ZVxyXG4gICAgICAgICAgJGF1dG9jb21wbGV0ZS5vZmYoJ21vdXNlZG93bi5hdXRvY29tcGxldGUgdG91Y2hzdGFydC5hdXRvY29tcGxldGUnKS5vbignbW91c2Vkb3duLmF1dG9jb21wbGV0ZSB0b3VjaHN0YXJ0LmF1dG9jb21wbGV0ZScsICdsaScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLnRleHQoKS50cmltKCk7XHJcbiAgICAgICAgICAgICRpbnB1dC52YWwodGV4dCk7XHJcbiAgICAgICAgICAgICRpbnB1dC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgICAgICAgcmVtb3ZlQXV0b2NvbXBsZXRlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBIYW5kbGUgb25BdXRvY29tcGxldGUgY2FsbGJhY2suXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Yob3B0aW9ucy5vbkF1dG9jb21wbGV0ZSkgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgIG9wdGlvbnMub25BdXRvY29tcGxldGUuY2FsbCh0aGlzLCB0ZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEVtcHR5IGRhdGFcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJGlucHV0Lm9mZigna2V5dXAuYXV0b2NvbXBsZXRlIGZvY3VzLmF1dG9jb21wbGV0ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICB9KTsgLy8gRW5kIG9mICQoZG9jdW1lbnQpLnJlYWR5XHJcblxyXG4gIC8qKioqKioqKioqKioqKioqKioqXHJcbiAgICogIFNlbGVjdCBQbHVnaW4gICpcclxuICAgKioqKioqKioqKioqKioqKioqL1xyXG4gICQuZm4ubWF0ZXJpYWxfc2VsZWN0ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAkKHRoaXMpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyICRzZWxlY3QgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgaWYgKCRzZWxlY3QuaGFzQ2xhc3MoJ2Jyb3dzZXItZGVmYXVsdCcpKSB7XHJcbiAgICAgICAgcmV0dXJuOyAvLyBDb250aW51ZSB0byBuZXh0IChyZXR1cm4gZmFsc2UgYnJlYWtzIG91dCBvZiBlbnRpcmUgbG9vcClcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIG11bHRpcGxlID0gJHNlbGVjdC5hdHRyKCdtdWx0aXBsZScpID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgbGFzdElEID0gJHNlbGVjdC5hdHRyKCdkYXRhLXNlbGVjdC1pZCcpOyAvLyBUZWFyIGRvd24gc3RydWN0dXJlIGlmIFNlbGVjdCBuZWVkcyB0byBiZSByZWJ1aWx0XHJcblxyXG4gICAgICBpZiAobGFzdElEKSB7XHJcbiAgICAgICAgJHNlbGVjdC5wYXJlbnQoKS5maW5kKCdzcGFuLmNhcmV0JykucmVtb3ZlKCk7XHJcbiAgICAgICAgJHNlbGVjdC5wYXJlbnQoKS5maW5kKCdpbnB1dCcpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAkc2VsZWN0LnVud3JhcCgpO1xyXG4gICAgICAgICQoJ3VsI3NlbGVjdC1vcHRpb25zLScrbGFzdElEKS5yZW1vdmUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gSWYgZGVzdHJveWluZyB0aGUgc2VsZWN0LCByZW1vdmUgdGhlIHNlbGVsY3QtaWQgYW5kIHJlc2V0IGl0IHRvIGl0J3MgdW5pbml0aWFsaXplZCBzdGF0ZS5cclxuICAgICAgaWYoY2FsbGJhY2sgPT09ICdkZXN0cm95Jykge1xyXG4gICAgICAgICRzZWxlY3QucmVtb3ZlQXR0cignZGF0YS1zZWxlY3QtaWQnKS5yZW1vdmVDbGFzcygnaW5pdGlhbGl6ZWQnKTtcclxuICAgICAgICAkKHdpbmRvdykub2ZmKCdjbGljay5zZWxlY3QnKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciB1bmlxdWVJRCA9IE1hdGVyaWFsaXplLmd1aWQoKTtcclxuICAgICAgJHNlbGVjdC5hdHRyKCdkYXRhLXNlbGVjdC1pZCcsIHVuaXF1ZUlEKTtcclxuICAgICAgdmFyIHdyYXBwZXIgPSAkKCc8ZGl2IGNsYXNzPVwic2VsZWN0LXdyYXBwZXJcIj48L2Rpdj4nKTtcclxuICAgICAgd3JhcHBlci5hZGRDbGFzcygkc2VsZWN0LmF0dHIoJ2NsYXNzJykpO1xyXG4gICAgICBpZiAoJHNlbGVjdC5pcygnOmRpc2FibGVkJykpXHJcbiAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICAgdmFyIG9wdGlvbnMgPSAkKCc8dWwgaWQ9XCJzZWxlY3Qtb3B0aW9ucy0nICsgdW5pcXVlSUQgKydcIiBjbGFzcz1cImRyb3Bkb3duLWNvbnRlbnQgc2VsZWN0LWRyb3Bkb3duICcgKyAobXVsdGlwbGUgPyAnbXVsdGlwbGUtc2VsZWN0LWRyb3Bkb3duJyA6ICcnKSArICdcIj48L3VsPicpLFxyXG4gICAgICAgICAgc2VsZWN0Q2hpbGRyZW4gPSAkc2VsZWN0LmNoaWxkcmVuKCdvcHRpb24sIG9wdGdyb3VwJyksXHJcbiAgICAgICAgICB2YWx1ZXNTZWxlY3RlZCA9IFtdLFxyXG4gICAgICAgICAgb3B0aW9uc0hvdmVyID0gZmFsc2U7XHJcblxyXG4gICAgICB2YXIgbGFiZWwgPSAkc2VsZWN0LmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLmh0bWwoKSB8fCAkc2VsZWN0LmZpbmQoJ29wdGlvbjpmaXJzdCcpLmh0bWwoKSB8fCBcIlwiO1xyXG5cclxuICAgICAgLy8gRnVuY3Rpb24gdGhhdCByZW5kZXJzIGFuZCBhcHBlbmRzIHRoZSBvcHRpb24gdGFraW5nIGludG9cclxuICAgICAgLy8gYWNjb3VudCB0eXBlIGFuZCBwb3NzaWJsZSBpbWFnZSBpY29uLlxyXG4gICAgICB2YXIgYXBwZW5kT3B0aW9uV2l0aEljb24gPSBmdW5jdGlvbihzZWxlY3QsIG9wdGlvbiwgdHlwZSkge1xyXG4gICAgICAgIC8vIEFkZCBkaXNhYmxlZCBhdHRyIGlmIGRpc2FibGVkXHJcbiAgICAgICAgdmFyIGRpc2FibGVkQ2xhc3MgPSAob3B0aW9uLmlzKCc6ZGlzYWJsZWQnKSkgPyAnZGlzYWJsZWQgJyA6ICcnO1xyXG4gICAgICAgIHZhciBvcHRncm91cENsYXNzID0gKHR5cGUgPT09ICdvcHRncm91cC1vcHRpb24nKSA/ICdvcHRncm91cC1vcHRpb24gJyA6ICcnO1xyXG4gICAgICAgIHZhciBtdWx0aXBsZUNoZWNrYm94ID0gbXVsdGlwbGUgPyAnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiJyArIGRpc2FibGVkQ2xhc3MgKyAnLz48bGFiZWw+PC9sYWJlbD4nIDogJyc7XHJcblxyXG4gICAgICAgIC8vIGFkZCBpY29uc1xyXG4gICAgICAgIHZhciBpY29uX3VybCA9IG9wdGlvbi5kYXRhKCdpY29uJyk7XHJcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBvcHRpb24uYXR0cignY2xhc3MnKTtcclxuICAgICAgICBpZiAoISFpY29uX3VybCkge1xyXG4gICAgICAgICAgdmFyIGNsYXNzU3RyaW5nID0gJyc7XHJcbiAgICAgICAgICBpZiAoISFjbGFzc2VzKSBjbGFzc1N0cmluZyA9ICcgY2xhc3M9XCInICsgY2xhc3NlcyArICdcIic7XHJcblxyXG4gICAgICAgICAgLy8gQ2hlY2sgZm9yIG11bHRpcGxlIHR5cGUuXHJcbiAgICAgICAgICBvcHRpb25zLmFwcGVuZCgkKCc8bGkgY2xhc3M9XCInICsgZGlzYWJsZWRDbGFzcyArIG9wdGdyb3VwQ2xhc3MgKyAnXCI+PGltZyBhbHQ9XCJcIiBzcmM9XCInICsgaWNvbl91cmwgKyAnXCInICsgY2xhc3NTdHJpbmcgKyAnPjxzcGFuPicgKyBtdWx0aXBsZUNoZWNrYm94ICsgb3B0aW9uLmh0bWwoKSArICc8L3NwYW4+PC9saT4nKSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciBtdWx0aXBsZSB0eXBlLlxyXG4gICAgICAgIG9wdGlvbnMuYXBwZW5kKCQoJzxsaSBjbGFzcz1cIicgKyBkaXNhYmxlZENsYXNzICsgb3B0Z3JvdXBDbGFzcyArICdcIj48c3Bhbj4nICsgbXVsdGlwbGVDaGVja2JveCArIG9wdGlvbi5odG1sKCkgKyAnPC9zcGFuPjwvbGk+JykpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLyogQ3JlYXRlIGRyb3Bkb3duIHN0cnVjdHVyZS4gKi9cclxuICAgICAgaWYgKHNlbGVjdENoaWxkcmVuLmxlbmd0aCkge1xyXG4gICAgICAgIHNlbGVjdENoaWxkcmVuLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBpZiAoJCh0aGlzKS5pcygnb3B0aW9uJykpIHtcclxuICAgICAgICAgICAgLy8gRGlyZWN0IGRlc2NlbmRhbnQgb3B0aW9uLlxyXG4gICAgICAgICAgICBpZiAobXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgICBhcHBlbmRPcHRpb25XaXRoSWNvbigkc2VsZWN0LCAkKHRoaXMpLCAnbXVsdGlwbGUnKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYXBwZW5kT3B0aW9uV2l0aEljb24oJHNlbGVjdCwgJCh0aGlzKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoJCh0aGlzKS5pcygnb3B0Z3JvdXAnKSkge1xyXG4gICAgICAgICAgICAvLyBPcHRncm91cC5cclxuICAgICAgICAgICAgdmFyIHNlbGVjdE9wdGlvbnMgPSAkKHRoaXMpLmNoaWxkcmVuKCdvcHRpb24nKTtcclxuICAgICAgICAgICAgb3B0aW9ucy5hcHBlbmQoJCgnPGxpIGNsYXNzPVwib3B0Z3JvdXBcIj48c3Bhbj4nICsgJCh0aGlzKS5hdHRyKCdsYWJlbCcpICsgJzwvc3Bhbj48L2xpPicpKTtcclxuXHJcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICBhcHBlbmRPcHRpb25XaXRoSWNvbigkc2VsZWN0LCAkKHRoaXMpLCAnb3B0Z3JvdXAtb3B0aW9uJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBvcHRpb25zLmZpbmQoJ2xpOm5vdCgub3B0Z3JvdXApJykuZWFjaChmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICQodGhpcykuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgIC8vIENoZWNrIGlmIG9wdGlvbiBlbGVtZW50IGlzIGRpc2FibGVkXHJcbiAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2Rpc2FibGVkJykgJiYgISQodGhpcykuaGFzQ2xhc3MoJ29wdGdyb3VwJykpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScsIHRoaXMpLnByb3AoJ2NoZWNrZWQnLCBmdW5jdGlvbihpLCB2KSB7IHJldHVybiAhdjsgfSk7XHJcbiAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0b2dnbGVFbnRyeUZyb21BcnJheSh2YWx1ZXNTZWxlY3RlZCwgaSwgJHNlbGVjdCk7XHJcbiAgICAgICAgICAgICAgJG5ld1NlbGVjdC50cmlnZ2VyKCdmb2N1cycpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIG9wdGlvbnMuZmluZCgnbGknKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgJG5ld1NlbGVjdC52YWwoJCh0aGlzKS50ZXh0KCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhY3RpdmF0ZU9wdGlvbihvcHRpb25zLCAkKHRoaXMpKTtcclxuICAgICAgICAgICAgJHNlbGVjdC5maW5kKCdvcHRpb24nKS5lcShpKS5wcm9wKCdzZWxlY3RlZCcsIHNlbGVjdGVkKTtcclxuICAgICAgICAgICAgLy8gVHJpZ2dlciBvbmNoYW5nZSgpIGV2ZW50XHJcbiAgICAgICAgICAgICRzZWxlY3QudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICd1bmRlZmluZWQnKSBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gV3JhcCBFbGVtZW50c1xyXG4gICAgICAkc2VsZWN0LndyYXAod3JhcHBlcik7XHJcbiAgICAgIC8vIEFkZCBTZWxlY3QgRGlzcGxheSBFbGVtZW50XHJcbiAgICAgIHZhciBkcm9wZG93bkljb24gPSAkKCc8c3BhbiBjbGFzcz1cImNhcmV0XCI+JiM5NjYwOzwvc3Bhbj4nKTtcclxuXHJcbiAgICAgIC8vIGVzY2FwZSBkb3VibGUgcXVvdGVzXHJcbiAgICAgIHZhciBzYW5pdGl6ZWRMYWJlbEh0bWwgPSBsYWJlbC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7Jyk7XHJcblxyXG4gICAgICB2YXIgJG5ld1NlbGVjdCA9ICQoJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duXCIgcmVhZG9ubHk9XCJ0cnVlXCIgJyArICgoJHNlbGVjdC5pcygnOmRpc2FibGVkJykpID8gJ2Rpc2FibGVkJyA6ICcnKSArICcgZGF0YS1hY3RpdmF0ZXM9XCJzZWxlY3Qtb3B0aW9ucy0nICsgdW5pcXVlSUQgKydcIiB2YWx1ZT1cIicrIHNhbml0aXplZExhYmVsSHRtbCArJ1wiLz4nKTtcclxuICAgICAgJHNlbGVjdC5iZWZvcmUoJG5ld1NlbGVjdCk7XHJcbiAgICAgICRuZXdTZWxlY3QuYmVmb3JlKGRyb3Bkb3duSWNvbik7XHJcblxyXG4gICAgICAkbmV3U2VsZWN0LmFmdGVyKG9wdGlvbnMpO1xyXG4gICAgICAvLyBDaGVjayBpZiBzZWN0aW9uIGVsZW1lbnQgaXMgZGlzYWJsZWRcclxuICAgICAgaWYgKCEkc2VsZWN0LmlzKCc6ZGlzYWJsZWQnKSkge1xyXG4gICAgICAgICRuZXdTZWxlY3QuZHJvcGRvd24oeydob3Zlcic6IGZhbHNlfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENvcHkgdGFiaW5kZXhcclxuICAgICAgaWYgKCRzZWxlY3QuYXR0cigndGFiaW5kZXgnKSkge1xyXG4gICAgICAgICQoJG5ld1NlbGVjdFswXSkuYXR0cigndGFiaW5kZXgnLCAkc2VsZWN0LmF0dHIoJ3RhYmluZGV4JykpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkc2VsZWN0LmFkZENsYXNzKCdpbml0aWFsaXplZCcpO1xyXG5cclxuICAgICAgJG5ld1NlbGVjdC5vbih7XHJcbiAgICAgICAgJ2ZvY3VzJzogZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICBpZiAoJCgndWwuc2VsZWN0LWRyb3Bkb3duJykubm90KG9wdGlvbnNbMF0pLmlzKCc6dmlzaWJsZScpKSB7XHJcbiAgICAgICAgICAgICQoJ2lucHV0LnNlbGVjdC1kcm9wZG93bicpLnRyaWdnZXIoJ2Nsb3NlJyk7XHJcbiAgICAgICAgICAgICQod2luZG93KS5vZmYoJ2NsaWNrLnNlbGVjdCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFvcHRpb25zLmlzKCc6dmlzaWJsZScpKSB7XHJcbiAgICAgICAgICAgICQodGhpcykudHJpZ2dlcignb3BlbicsIFsnZm9jdXMnXSk7XHJcbiAgICAgICAgICAgIHZhciBsYWJlbCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgICAgIGlmIChtdWx0aXBsZSAmJiBsYWJlbC5pbmRleE9mKCcsJykgPj0gMCkge1xyXG4gICAgICAgICAgICAgIGxhYmVsID0gbGFiZWwuc3BsaXQoJywnKVswXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkT3B0aW9uID0gb3B0aW9ucy5maW5kKCdsaScpLmZpbHRlcihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS50ZXh0KCkudG9Mb3dlckNhc2UoKSA9PT0gbGFiZWwudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgfSlbMF07XHJcbiAgICAgICAgICAgIGFjdGl2YXRlT3B0aW9uKG9wdGlvbnMsIHNlbGVjdGVkT3B0aW9uLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICQod2luZG93KS5vZmYoJ2NsaWNrLnNlbGVjdCcpLm9uKCdjbGljay5zZWxlY3QnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgbXVsdGlwbGUgJiYgKG9wdGlvbnNIb3ZlciB8fCAkbmV3U2VsZWN0LnRyaWdnZXIoJ2Nsb3NlJykpO1xyXG4gICAgICAgICAgICAgICQod2luZG93KS5vZmYoJ2NsaWNrLnNlbGVjdCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgICdjbGljayc6IGZ1bmN0aW9uIChlKXtcclxuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICRuZXdTZWxlY3Qub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoIW11bHRpcGxlKSB7XHJcbiAgICAgICAgICAkKHRoaXMpLnRyaWdnZXIoJ2Nsb3NlJyk7XHJcbiAgICAgICAgICAkKHdpbmRvdykub2ZmKCdjbGljay5zZWxlY3QnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgb3B0aW9ucy5maW5kKCdsaS5zZWxlY3RlZCcpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG9wdGlvbnMuaG92ZXIoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgb3B0aW9uc0hvdmVyID0gdHJ1ZTtcclxuICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG9wdGlvbnNIb3ZlciA9IGZhbHNlO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIEFkZCBpbml0aWFsIG11bHRpcGxlIHNlbGVjdGlvbnMuXHJcbiAgICAgIGlmIChtdWx0aXBsZSkge1xyXG4gICAgICAgICRzZWxlY3QuZmluZChcIm9wdGlvbjpzZWxlY3RlZDpub3QoOmRpc2FibGVkKVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuaW5kZXg7XHJcblxyXG4gICAgICAgICAgdG9nZ2xlRW50cnlGcm9tQXJyYXkodmFsdWVzU2VsZWN0ZWQsIGluZGV4LCAkc2VsZWN0KTtcclxuICAgICAgICAgIG9wdGlvbnMuZmluZChcImxpOm5vdCgub3B0Z3JvdXApXCIpLmVxKGluZGV4KS5maW5kKFwiOmNoZWNrYm94XCIpLnByb3AoXCJjaGVja2VkXCIsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogTWFrZSBvcHRpb24gYXMgc2VsZWN0ZWQgYW5kIHNjcm9sbCB0byBzZWxlY3RlZCBwb3NpdGlvblxyXG4gICAgICAgKiBAcGFyYW0ge2pRdWVyeX0gY29sbGVjdGlvbiAgU2VsZWN0IG9wdGlvbnMgalF1ZXJ5IGVsZW1lbnRcclxuICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBuZXdPcHRpb24gIGVsZW1lbnQgb2YgdGhlIG5ldyBvcHRpb25cclxuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBmaXJzdEFjdGl2YXRpb24gIElmIG9uIGZpcnN0IGFjdGl2YXRpb24gb2Ygc2VsZWN0XHJcbiAgICAgICAqL1xyXG4gICAgICB2YXIgYWN0aXZhdGVPcHRpb24gPSBmdW5jdGlvbihjb2xsZWN0aW9uLCBuZXdPcHRpb24sIGZpcnN0QWN0aXZhdGlvbikge1xyXG4gICAgICAgIGlmIChuZXdPcHRpb24pIHtcclxuICAgICAgICAgIGNvbGxlY3Rpb24uZmluZCgnbGkuc2VsZWN0ZWQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgIHZhciBvcHRpb24gPSAkKG5ld09wdGlvbik7XHJcbiAgICAgICAgICBvcHRpb24uYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICBpZiAoIW11bHRpcGxlIHx8ICEhZmlyc3RBY3RpdmF0aW9uKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuc2Nyb2xsVG8ob3B0aW9uKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBBbGxvdyB1c2VyIHRvIHNlYXJjaCBieSB0eXBpbmdcclxuICAgICAgLy8gdGhpcyBhcnJheSBpcyBjbGVhcmVkIGFmdGVyIDEgc2Vjb25kXHJcbiAgICAgIHZhciBmaWx0ZXJRdWVyeSA9IFtdLFxyXG4gICAgICAgICAgb25LZXlEb3duID0gZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIC8vIFRBQiAtIHN3aXRjaCB0byBhbm90aGVyIGlucHV0XHJcbiAgICAgICAgICAgIGlmKGUud2hpY2ggPT0gOSl7XHJcbiAgICAgICAgICAgICAgJG5ld1NlbGVjdC50cmlnZ2VyKCdjbG9zZScpO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQVJST1cgRE9XTiBXSEVOIFNFTEVDVCBJUyBDTE9TRUQgLSBvcGVuIHNlbGVjdCBvcHRpb25zXHJcbiAgICAgICAgICAgIGlmKGUud2hpY2ggPT0gNDAgJiYgIW9wdGlvbnMuaXMoJzp2aXNpYmxlJykpe1xyXG4gICAgICAgICAgICAgICRuZXdTZWxlY3QudHJpZ2dlcignb3BlbicpO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRU5URVIgV0hFTiBTRUxFQ1QgSVMgQ0xPU0VEIC0gc3VibWl0IGZvcm1cclxuICAgICAgICAgICAgaWYoZS53aGljaCA9PSAxMyAmJiAhb3B0aW9ucy5pcygnOnZpc2libGUnKSl7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBDQVNFIFdIRU4gVVNFUiBUWVBFIExFVFRFUlNcclxuICAgICAgICAgICAgdmFyIGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCkudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgICAgICAgIG5vbkxldHRlcnMgPSBbOSwxMywyNywzOCw0MF07XHJcbiAgICAgICAgICAgIGlmIChsZXR0ZXIgJiYgKG5vbkxldHRlcnMuaW5kZXhPZihlLndoaWNoKSA9PT0gLTEpKSB7XHJcbiAgICAgICAgICAgICAgZmlsdGVyUXVlcnkucHVzaChsZXR0ZXIpO1xyXG5cclxuICAgICAgICAgICAgICB2YXIgc3RyaW5nID0gZmlsdGVyUXVlcnkuam9pbignJyksXHJcbiAgICAgICAgICAgICAgICAgIG5ld09wdGlvbiA9IG9wdGlvbnMuZmluZCgnbGknKS5maWx0ZXIoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQodGhpcykudGV4dCgpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzdHJpbmcpID09PSAwO1xyXG4gICAgICAgICAgICAgICAgICB9KVswXTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKG5ld09wdGlvbikge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZhdGVPcHRpb24ob3B0aW9ucywgbmV3T3B0aW9uKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEVOVEVSIC0gc2VsZWN0IG9wdGlvbiBhbmQgY2xvc2Ugd2hlbiBzZWxlY3Qgb3B0aW9ucyBhcmUgb3BlbmVkXHJcbiAgICAgICAgICAgIGlmIChlLndoaWNoID09IDEzKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGFjdGl2ZU9wdGlvbiA9IG9wdGlvbnMuZmluZCgnbGkuc2VsZWN0ZWQ6bm90KC5kaXNhYmxlZCknKVswXTtcclxuICAgICAgICAgICAgICBpZihhY3RpdmVPcHRpb24pe1xyXG4gICAgICAgICAgICAgICAgJChhY3RpdmVPcHRpb24pLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW11bHRpcGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICRuZXdTZWxlY3QudHJpZ2dlcignY2xvc2UnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEFSUk9XIERPV04gLSBtb3ZlIHRvIG5leHQgbm90IGRpc2FibGVkIG9wdGlvblxyXG4gICAgICAgICAgICBpZiAoZS53aGljaCA9PSA0MCkge1xyXG4gICAgICAgICAgICAgIGlmIChvcHRpb25zLmZpbmQoJ2xpLnNlbGVjdGVkJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdPcHRpb24gPSBvcHRpb25zLmZpbmQoJ2xpLnNlbGVjdGVkJykubmV4dCgnbGk6bm90KC5kaXNhYmxlZCknKVswXTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3T3B0aW9uID0gb3B0aW9ucy5maW5kKCdsaTpub3QoLmRpc2FibGVkKScpWzBdO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBhY3RpdmF0ZU9wdGlvbihvcHRpb25zLCBuZXdPcHRpb24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBFU0MgLSBjbG9zZSBvcHRpb25zXHJcbiAgICAgICAgICAgIGlmIChlLndoaWNoID09IDI3KSB7XHJcbiAgICAgICAgICAgICAgJG5ld1NlbGVjdC50cmlnZ2VyKCdjbG9zZScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBUlJPVyBVUCAtIG1vdmUgdG8gcHJldmlvdXMgbm90IGRpc2FibGVkIG9wdGlvblxyXG4gICAgICAgICAgICBpZiAoZS53aGljaCA9PSAzOCkge1xyXG4gICAgICAgICAgICAgIG5ld09wdGlvbiA9IG9wdGlvbnMuZmluZCgnbGkuc2VsZWN0ZWQnKS5wcmV2KCdsaTpub3QoLmRpc2FibGVkKScpWzBdO1xyXG4gICAgICAgICAgICAgIGlmKG5ld09wdGlvbilcclxuICAgICAgICAgICAgICAgIGFjdGl2YXRlT3B0aW9uKG9wdGlvbnMsIG5ld09wdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEF1dG9tYXRpY2FseSBjbGVhbiBmaWx0ZXIgcXVlcnkgc28gdXNlciBjYW4gc2VhcmNoIGFnYWluIGJ5IHN0YXJ0aW5nIGxldHRlcnNcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpeyBmaWx0ZXJRdWVyeSA9IFtdOyB9LCAxMDAwKTtcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAkbmV3U2VsZWN0Lm9uKCdrZXlkb3duJywgb25LZXlEb3duKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRvZ2dsZUVudHJ5RnJvbUFycmF5KGVudHJpZXNBcnJheSwgZW50cnlJbmRleCwgc2VsZWN0KSB7XHJcbiAgICAgIHZhciBpbmRleCA9IGVudHJpZXNBcnJheS5pbmRleE9mKGVudHJ5SW5kZXgpLFxyXG4gICAgICAgICAgbm90QWRkZWQgPSBpbmRleCA9PT0gLTE7XHJcblxyXG4gICAgICBpZiAobm90QWRkZWQpIHtcclxuICAgICAgICBlbnRyaWVzQXJyYXkucHVzaChlbnRyeUluZGV4KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbnRyaWVzQXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2VsZWN0LnNpYmxpbmdzKCd1bC5kcm9wZG93bi1jb250ZW50JykuZmluZCgnbGk6bm90KC5vcHRncm91cCknKS5lcShlbnRyeUluZGV4KS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAvLyB1c2Ugbm90QWRkZWQgaW5zdGVhZCBvZiB0cnVlICh0byBkZXRlY3QgaWYgdGhlIG9wdGlvbiBpcyBzZWxlY3RlZCBvciBub3QpXHJcbiAgICAgIHNlbGVjdC5maW5kKCdvcHRpb24nKS5lcShlbnRyeUluZGV4KS5wcm9wKCdzZWxlY3RlZCcsIG5vdEFkZGVkKTtcclxuICAgICAgc2V0VmFsdWVUb0lucHV0KGVudHJpZXNBcnJheSwgc2VsZWN0KTtcclxuXHJcbiAgICAgIHJldHVybiBub3RBZGRlZDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRWYWx1ZVRvSW5wdXQoZW50cmllc0FycmF5LCBzZWxlY3QpIHtcclxuICAgICAgdmFyIHZhbHVlID0gJyc7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMCwgY291bnQgPSBlbnRyaWVzQXJyYXkubGVuZ3RoOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgIHZhciB0ZXh0ID0gc2VsZWN0LmZpbmQoJ29wdGlvbicpLmVxKGVudHJpZXNBcnJheVtpXSkudGV4dCgpO1xyXG5cclxuICAgICAgICBpID09PSAwID8gdmFsdWUgKz0gdGV4dCA6IHZhbHVlICs9ICcsICcgKyB0ZXh0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodmFsdWUgPT09ICcnKSB7XHJcbiAgICAgICAgdmFsdWUgPSBzZWxlY3QuZmluZCgnb3B0aW9uOmRpc2FibGVkJykuZXEoMCkudGV4dCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWxlY3Quc2libGluZ3MoJ2lucHV0LnNlbGVjdC1kcm9wZG93bicpLnZhbCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbn0oIGpRdWVyeSApKTtcclxuXG4oZnVuY3Rpb24gKCQpIHtcclxuXHJcbiAgdmFyIG1ldGhvZHMgPSB7XHJcblxyXG4gICAgaW5pdCA6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgICAgdmFyIGRlZmF1bHRzID0ge1xyXG4gICAgICAgIGluZGljYXRvcnM6IHRydWUsXHJcbiAgICAgICAgaGVpZ2h0OiA0MDAsXHJcbiAgICAgICAgdHJhbnNpdGlvbjogNTAwLFxyXG4gICAgICAgIGludGVydmFsOiA2MDAwXHJcbiAgICAgIH07XHJcbiAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZChkZWZhdWx0cywgb3B0aW9ucyk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyBGb3IgZWFjaCBzbGlkZXIsIHdlIHdhbnQgdG8ga2VlcCB0cmFjayBvZlxyXG4gICAgICAgIC8vIHdoaWNoIHNsaWRlIGlzIGFjdGl2ZSBhbmQgaXRzIGFzc29jaWF0ZWQgY29udGVudFxyXG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgdmFyICRzbGlkZXIgPSAkdGhpcy5maW5kKCd1bC5zbGlkZXMnKS5maXJzdCgpO1xyXG4gICAgICAgIHZhciAkc2xpZGVzID0gJHNsaWRlci5maW5kKCc+IGxpJyk7XHJcbiAgICAgICAgdmFyICRhY3RpdmVfaW5kZXggPSAkc2xpZGVyLmZpbmQoJy5hY3RpdmUnKS5pbmRleCgpO1xyXG4gICAgICAgIHZhciAkYWN0aXZlLCAkaW5kaWNhdG9ycywgJGludGVydmFsO1xyXG4gICAgICAgIGlmICgkYWN0aXZlX2luZGV4ICE9IC0xKSB7ICRhY3RpdmUgPSAkc2xpZGVzLmVxKCRhY3RpdmVfaW5kZXgpOyB9XHJcblxyXG4gICAgICAgIC8vIFRyYW5zaXRpb25zIHRoZSBjYXB0aW9uIGRlcGVuZGluZyBvbiBhbGlnbm1lbnRcclxuICAgICAgICBmdW5jdGlvbiBjYXB0aW9uVHJhbnNpdGlvbihjYXB0aW9uLCBkdXJhdGlvbikge1xyXG4gICAgICAgICAgaWYgKGNhcHRpb24uaGFzQ2xhc3MoXCJjZW50ZXItYWxpZ25cIikpIHtcclxuICAgICAgICAgICAgY2FwdGlvbi52ZWxvY2l0eSh7b3BhY2l0eTogMCwgdHJhbnNsYXRlWTogLTEwMH0sIHtkdXJhdGlvbjogZHVyYXRpb24sIHF1ZXVlOiBmYWxzZX0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSBpZiAoY2FwdGlvbi5oYXNDbGFzcyhcInJpZ2h0LWFsaWduXCIpKSB7XHJcbiAgICAgICAgICAgIGNhcHRpb24udmVsb2NpdHkoe29wYWNpdHk6IDAsIHRyYW5zbGF0ZVg6IDEwMH0sIHtkdXJhdGlvbjogZHVyYXRpb24sIHF1ZXVlOiBmYWxzZX0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSBpZiAoY2FwdGlvbi5oYXNDbGFzcyhcImxlZnQtYWxpZ25cIikpIHtcclxuICAgICAgICAgICAgY2FwdGlvbi52ZWxvY2l0eSh7b3BhY2l0eTogMCwgdHJhbnNsYXRlWDogLTEwMH0sIHtkdXJhdGlvbjogZHVyYXRpb24sIHF1ZXVlOiBmYWxzZX0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhpcyBmdW5jdGlvbiB3aWxsIHRyYW5zaXRpb24gdGhlIHNsaWRlIHRvIGFueSBpbmRleCBvZiB0aGUgbmV4dCBzbGlkZVxyXG4gICAgICAgIGZ1bmN0aW9uIG1vdmVUb1NsaWRlKGluZGV4KSB7XHJcbiAgICAgICAgICAvLyBXcmFwIGFyb3VuZCBpbmRpY2VzLlxyXG4gICAgICAgICAgaWYgKGluZGV4ID49ICRzbGlkZXMubGVuZ3RoKSBpbmRleCA9IDA7XHJcbiAgICAgICAgICBlbHNlIGlmIChpbmRleCA8IDApIGluZGV4ID0gJHNsaWRlcy5sZW5ndGggLTE7XHJcblxyXG4gICAgICAgICAgJGFjdGl2ZV9pbmRleCA9ICRzbGlkZXIuZmluZCgnLmFjdGl2ZScpLmluZGV4KCk7XHJcblxyXG4gICAgICAgICAgLy8gT25seSBkbyBpZiBpbmRleCBjaGFuZ2VzXHJcbiAgICAgICAgICBpZiAoJGFjdGl2ZV9pbmRleCAhPSBpbmRleCkge1xyXG4gICAgICAgICAgICAkYWN0aXZlID0gJHNsaWRlcy5lcSgkYWN0aXZlX2luZGV4KTtcclxuICAgICAgICAgICAgJGNhcHRpb24gPSAkYWN0aXZlLmZpbmQoJy5jYXB0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICAkYWN0aXZlLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgJGFjdGl2ZS52ZWxvY2l0eSh7b3BhY2l0eTogMH0sIHtkdXJhdGlvbjogb3B0aW9ucy50cmFuc2l0aW9uLCBxdWV1ZTogZmFsc2UsIGVhc2luZzogJ2Vhc2VPdXRRdWFkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXMubm90KCcuYWN0aXZlJykudmVsb2NpdHkoe29wYWNpdHk6IDAsIHRyYW5zbGF0ZVg6IDAsIHRyYW5zbGF0ZVk6IDB9LCB7ZHVyYXRpb246IDAsIHF1ZXVlOiBmYWxzZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0pO1xyXG4gICAgICAgICAgICBjYXB0aW9uVHJhbnNpdGlvbigkY2FwdGlvbiwgb3B0aW9ucy50cmFuc2l0aW9uKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgaW5kaWNhdG9yc1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5pbmRpY2F0b3JzKSB7XHJcbiAgICAgICAgICAgICAgJGluZGljYXRvcnMuZXEoJGFjdGl2ZV9pbmRleCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkc2xpZGVzLmVxKGluZGV4KS52ZWxvY2l0eSh7b3BhY2l0eTogMX0sIHtkdXJhdGlvbjogb3B0aW9ucy50cmFuc2l0aW9uLCBxdWV1ZTogZmFsc2UsIGVhc2luZzogJ2Vhc2VPdXRRdWFkJ30pO1xyXG4gICAgICAgICAgICAkc2xpZGVzLmVxKGluZGV4KS5maW5kKCcuY2FwdGlvbicpLnZlbG9jaXR5KHtvcGFjaXR5OiAxLCB0cmFuc2xhdGVYOiAwLCB0cmFuc2xhdGVZOiAwfSwge2R1cmF0aW9uOiBvcHRpb25zLnRyYW5zaXRpb24sIGRlbGF5OiBvcHRpb25zLnRyYW5zaXRpb24sIHF1ZXVlOiBmYWxzZSwgZWFzaW5nOiAnZWFzZU91dFF1YWQnfSk7XHJcbiAgICAgICAgICAgICRzbGlkZXMuZXEoaW5kZXgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgaW5kaWNhdG9yc1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5pbmRpY2F0b3JzKSB7XHJcbiAgICAgICAgICAgICAgJGluZGljYXRvcnMuZXEoaW5kZXgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2V0IGhlaWdodCBvZiBzbGlkZXJcclxuICAgICAgICAvLyBJZiBmdWxsc2NyZWVuLCBkbyBub3RoaW5nXHJcbiAgICAgICAgaWYgKCEkdGhpcy5oYXNDbGFzcygnZnVsbHNjcmVlbicpKSB7XHJcbiAgICAgICAgICBpZiAob3B0aW9ucy5pbmRpY2F0b3JzKSB7XHJcbiAgICAgICAgICAgIC8vIEFkZCBoZWlnaHQgaWYgaW5kaWNhdG9ycyBhcmUgcHJlc2VudFxyXG4gICAgICAgICAgICAkdGhpcy5oZWlnaHQob3B0aW9ucy5oZWlnaHQgKyA0MCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgJHRoaXMuaGVpZ2h0KG9wdGlvbnMuaGVpZ2h0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgICRzbGlkZXIuaGVpZ2h0KG9wdGlvbnMuaGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLyBTZXQgaW5pdGlhbCBwb3NpdGlvbnMgb2YgY2FwdGlvbnNcclxuICAgICAgICAkc2xpZGVzLmZpbmQoJy5jYXB0aW9uJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBjYXB0aW9uVHJhbnNpdGlvbigkKHRoaXMpLCAwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gTW92ZSBpbWcgc3JjIGludG8gYmFja2dyb3VuZC1pbWFnZVxyXG4gICAgICAgICRzbGlkZXMuZmluZCgnaW1nJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB2YXIgcGxhY2Vob2xkZXJCYXNlNjQgPSAnZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUJBUC8vL3dBQUFDSDVCQUVLQUFFQUxBQUFBQUFCQUFFQUFBSUNUQUVBT3c9PSc7XHJcbiAgICAgICAgICBpZiAoJCh0aGlzKS5hdHRyKCdzcmMnKSAhPT0gcGxhY2Vob2xkZXJCYXNlNjQpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAndXJsKFwiJyArICQodGhpcykuYXR0cignc3JjJykgKyAnXCIpJyApO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ3NyYycsIHBsYWNlaG9sZGVyQmFzZTY0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gZHluYW1pY2FsbHkgYWRkIGluZGljYXRvcnNcclxuICAgICAgICBpZiAob3B0aW9ucy5pbmRpY2F0b3JzKSB7XHJcbiAgICAgICAgICAkaW5kaWNhdG9ycyA9ICQoJzx1bCBjbGFzcz1cImluZGljYXRvcnNcIj48L3VsPicpO1xyXG4gICAgICAgICAgJHNsaWRlcy5lYWNoKGZ1bmN0aW9uKCBpbmRleCApIHtcclxuICAgICAgICAgICAgdmFyICRpbmRpY2F0b3IgPSAkKCc8bGkgY2xhc3M9XCJpbmRpY2F0b3ItaXRlbVwiPjwvbGk+Jyk7XHJcblxyXG4gICAgICAgICAgICAvLyBIYW5kbGUgY2xpY2tzIG9uIGluZGljYXRvcnNcclxuICAgICAgICAgICAgJGluZGljYXRvci5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgdmFyICRwYXJlbnQgPSAkc2xpZGVyLnBhcmVudCgpO1xyXG4gICAgICAgICAgICAgIHZhciBjdXJyX2luZGV4ID0gJHBhcmVudC5maW5kKCQodGhpcykpLmluZGV4KCk7XHJcbiAgICAgICAgICAgICAgbW92ZVRvU2xpZGUoY3Vycl9pbmRleCk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIHJlc2V0IGludGVydmFsXHJcbiAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCgkaW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICRpbnRlcnZhbCA9IHNldEludGVydmFsKFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgJGFjdGl2ZV9pbmRleCA9ICRzbGlkZXIuZmluZCgnLmFjdGl2ZScpLmluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICAgIGlmICgkc2xpZGVzLmxlbmd0aCA9PSAkYWN0aXZlX2luZGV4ICsgMSkgJGFjdGl2ZV9pbmRleCA9IDA7IC8vIGxvb3AgdG8gc3RhcnRcclxuICAgICAgICAgICAgICAgICAgZWxzZSAkYWN0aXZlX2luZGV4ICs9IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICBtb3ZlVG9TbGlkZSgkYWN0aXZlX2luZGV4KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCBvcHRpb25zLnRyYW5zaXRpb24gKyBvcHRpb25zLmludGVydmFsXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRpbmRpY2F0b3JzLmFwcGVuZCgkaW5kaWNhdG9yKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgJHRoaXMuYXBwZW5kKCRpbmRpY2F0b3JzKTtcclxuICAgICAgICAgICRpbmRpY2F0b3JzID0gJHRoaXMuZmluZCgndWwuaW5kaWNhdG9ycycpLmZpbmQoJ2xpLmluZGljYXRvci1pdGVtJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoJGFjdGl2ZSkge1xyXG4gICAgICAgICAgJGFjdGl2ZS5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgJHNsaWRlcy5maXJzdCgpLmFkZENsYXNzKCdhY3RpdmUnKS52ZWxvY2l0eSh7b3BhY2l0eTogMX0sIHtkdXJhdGlvbjogb3B0aW9ucy50cmFuc2l0aW9uLCBxdWV1ZTogZmFsc2UsIGVhc2luZzogJ2Vhc2VPdXRRdWFkJ30pO1xyXG5cclxuICAgICAgICAgICRhY3RpdmVfaW5kZXggPSAwO1xyXG4gICAgICAgICAgJGFjdGl2ZSA9ICRzbGlkZXMuZXEoJGFjdGl2ZV9pbmRleCk7XHJcblxyXG4gICAgICAgICAgLy8gVXBkYXRlIGluZGljYXRvcnNcclxuICAgICAgICAgIGlmIChvcHRpb25zLmluZGljYXRvcnMpIHtcclxuICAgICAgICAgICAgJGluZGljYXRvcnMuZXEoJGFjdGl2ZV9pbmRleCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRqdXN0IGhlaWdodCB0byBjdXJyZW50IHNsaWRlXHJcbiAgICAgICAgJGFjdGl2ZS5maW5kKCdpbWcnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgJGFjdGl2ZS5maW5kKCcuY2FwdGlvbicpLnZlbG9jaXR5KHtvcGFjaXR5OiAxLCB0cmFuc2xhdGVYOiAwLCB0cmFuc2xhdGVZOiAwfSwge2R1cmF0aW9uOiBvcHRpb25zLnRyYW5zaXRpb24sIHF1ZXVlOiBmYWxzZSwgZWFzaW5nOiAnZWFzZU91dFF1YWQnfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGF1dG8gc2Nyb2xsXHJcbiAgICAgICAgJGludGVydmFsID0gc2V0SW50ZXJ2YWwoXHJcbiAgICAgICAgICBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkYWN0aXZlX2luZGV4ID0gJHNsaWRlci5maW5kKCcuYWN0aXZlJykuaW5kZXgoKTtcclxuICAgICAgICAgICAgbW92ZVRvU2xpZGUoJGFjdGl2ZV9pbmRleCArIDEpO1xyXG5cclxuICAgICAgICAgIH0sIG9wdGlvbnMudHJhbnNpdGlvbiArIG9wdGlvbnMuaW50ZXJ2YWxcclxuICAgICAgICApO1xyXG5cclxuXHJcbiAgICAgICAgLy8gSGFtbWVySlMsIFN3aXBlIG5hdmlnYXRpb25cclxuXHJcbiAgICAgICAgLy8gVG91Y2ggRXZlbnRcclxuICAgICAgICB2YXIgcGFubmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBzd2lwZUxlZnQgPSBmYWxzZTtcclxuICAgICAgICB2YXIgc3dpcGVSaWdodCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAkdGhpcy5oYW1tZXIoe1xyXG4gICAgICAgICAgICBwcmV2ZW50X2RlZmF1bHQ6IGZhbHNlXHJcbiAgICAgICAgfSkub24oJ3BhbicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIGlmIChlLmdlc3R1cmUucG9pbnRlclR5cGUgPT09IFwidG91Y2hcIikge1xyXG5cclxuICAgICAgICAgICAgLy8gcmVzZXQgaW50ZXJ2YWxcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCgkaW50ZXJ2YWwpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGUuZ2VzdHVyZS5kaXJlY3Rpb247XHJcbiAgICAgICAgICAgIHZhciB4ID0gZS5nZXN0dXJlLmRlbHRhWDtcclxuICAgICAgICAgICAgdmFyIHZlbG9jaXR5WCA9IGUuZ2VzdHVyZS52ZWxvY2l0eVg7XHJcbiAgICAgICAgICAgIHZhciB2ZWxvY2l0eVkgPSBlLmdlc3R1cmUudmVsb2NpdHlZO1xyXG5cclxuICAgICAgICAgICAgJGN1cnJfc2xpZGUgPSAkc2xpZGVyLmZpbmQoJy5hY3RpdmUnKTtcclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHZlbG9jaXR5WCkgPiBNYXRoLmFicyh2ZWxvY2l0eVkpKSB7XHJcbiAgICAgICAgICAgICAgJGN1cnJfc2xpZGUudmVsb2NpdHkoeyB0cmFuc2xhdGVYOiB4XHJcbiAgICAgICAgICAgICAgICAgIH0sIHtkdXJhdGlvbjogNTAsIHF1ZXVlOiBmYWxzZSwgZWFzaW5nOiAnZWFzZU91dFF1YWQnfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFN3aXBlIExlZnRcclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gNCAmJiAoeCA+ICgkdGhpcy5pbm5lcldpZHRoKCkgLyAyKSB8fCB2ZWxvY2l0eVggPCAtMC42NSkpIHtcclxuICAgICAgICAgICAgICBzd2lwZVJpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBTd2lwZSBSaWdodFxyXG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09IDIgJiYgKHggPCAoLTEgKiAkdGhpcy5pbm5lcldpZHRoKCkgLyAyKSB8fCB2ZWxvY2l0eVggPiAwLjY1KSkge1xyXG4gICAgICAgICAgICAgIHN3aXBlTGVmdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIE1ha2UgU2xpZGUgQmVoaW5kIGFjdGl2ZSBzbGlkZSB2aXNpYmxlXHJcbiAgICAgICAgICAgIHZhciBuZXh0X3NsaWRlO1xyXG4gICAgICAgICAgICBpZiAoc3dpcGVMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgbmV4dF9zbGlkZSA9ICRjdXJyX3NsaWRlLm5leHQoKTtcclxuICAgICAgICAgICAgICBpZiAobmV4dF9zbGlkZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIG5leHRfc2xpZGUgPSAkc2xpZGVzLmZpcnN0KCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIG5leHRfc2xpZGUudmVsb2NpdHkoeyBvcGFjaXR5OiAxXHJcbiAgICAgICAgICAgICAgICAgIH0sIHtkdXJhdGlvbjogMzAwLCBxdWV1ZTogZmFsc2UsIGVhc2luZzogJ2Vhc2VPdXRRdWFkJ30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzd2lwZVJpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgbmV4dF9zbGlkZSA9ICRjdXJyX3NsaWRlLnByZXYoKTtcclxuICAgICAgICAgICAgICBpZiAobmV4dF9zbGlkZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIG5leHRfc2xpZGUgPSAkc2xpZGVzLmxhc3QoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgbmV4dF9zbGlkZS52ZWxvY2l0eSh7IG9wYWNpdHk6IDFcclxuICAgICAgICAgICAgICAgICAgfSwge2R1cmF0aW9uOiAzMDAsIHF1ZXVlOiBmYWxzZSwgZWFzaW5nOiAnZWFzZU91dFF1YWQnfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KS5vbigncGFuZW5kJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgaWYgKGUuZ2VzdHVyZS5wb2ludGVyVHlwZSA9PT0gXCJ0b3VjaFwiKSB7XHJcblxyXG4gICAgICAgICAgICAkY3Vycl9zbGlkZSA9ICRzbGlkZXIuZmluZCgnLmFjdGl2ZScpO1xyXG4gICAgICAgICAgICBwYW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGN1cnJfaW5kZXggPSAkc2xpZGVyLmZpbmQoJy5hY3RpdmUnKS5pbmRleCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFzd2lwZVJpZ2h0ICYmICFzd2lwZUxlZnQgfHwgJHNsaWRlcy5sZW5ndGggPD0xKSB7XHJcbiAgICAgICAgICAgICAgLy8gUmV0dXJuIHRvIG9yaWdpbmFsIHNwb3RcclxuICAgICAgICAgICAgICAkY3Vycl9zbGlkZS52ZWxvY2l0eSh7IHRyYW5zbGF0ZVg6IDBcclxuICAgICAgICAgICAgICAgICAgfSwge2R1cmF0aW9uOiAzMDAsIHF1ZXVlOiBmYWxzZSwgZWFzaW5nOiAnZWFzZU91dFF1YWQnfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc3dpcGVMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgbW92ZVRvU2xpZGUoY3Vycl9pbmRleCArIDEpO1xyXG4gICAgICAgICAgICAgICRjdXJyX3NsaWRlLnZlbG9jaXR5KHt0cmFuc2xhdGVYOiAtMSAqICR0aGlzLmlubmVyV2lkdGgoKSB9LCB7ZHVyYXRpb246IDMwMCwgcXVldWU6IGZhbHNlLCBlYXNpbmc6ICdlYXNlT3V0UXVhZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY3Vycl9zbGlkZS52ZWxvY2l0eSh7b3BhY2l0eTogMCwgdHJhbnNsYXRlWDogMH0sIHtkdXJhdGlvbjogMCwgcXVldWU6IGZhbHNlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc3dpcGVSaWdodCkge1xyXG4gICAgICAgICAgICAgIG1vdmVUb1NsaWRlKGN1cnJfaW5kZXggLSAxKTtcclxuICAgICAgICAgICAgICAkY3Vycl9zbGlkZS52ZWxvY2l0eSh7dHJhbnNsYXRlWDogJHRoaXMuaW5uZXJXaWR0aCgpIH0sIHtkdXJhdGlvbjogMzAwLCBxdWV1ZTogZmFsc2UsIGVhc2luZzogJ2Vhc2VPdXRRdWFkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjdXJyX3NsaWRlLnZlbG9jaXR5KHtvcGFjaXR5OiAwLCB0cmFuc2xhdGVYOiAwfSwge2R1cmF0aW9uOiAwLCBxdWV1ZTogZmFsc2V9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2lwZUxlZnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3dpcGVSaWdodCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVzdGFydCBpbnRlcnZhbFxyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKCRpbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICRpbnRlcnZhbCA9IHNldEludGVydmFsKFxyXG4gICAgICAgICAgICAgIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAkYWN0aXZlX2luZGV4ID0gJHNsaWRlci5maW5kKCcuYWN0aXZlJykuaW5kZXgoKTtcclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGVzLmxlbmd0aCA9PSAkYWN0aXZlX2luZGV4ICsgMSkgJGFjdGl2ZV9pbmRleCA9IDA7IC8vIGxvb3AgdG8gc3RhcnRcclxuICAgICAgICAgICAgICAgIGVsc2UgJGFjdGl2ZV9pbmRleCArPSAxO1xyXG5cclxuICAgICAgICAgICAgICAgIG1vdmVUb1NsaWRlKCRhY3RpdmVfaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgICB9LCBvcHRpb25zLnRyYW5zaXRpb24gKyBvcHRpb25zLmludGVydmFsXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICR0aGlzLm9uKCdzbGlkZXJQYXVzZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCgkaW50ZXJ2YWwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkdGhpcy5vbignc2xpZGVyU3RhcnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoJGludGVydmFsKTtcclxuICAgICAgICAgICRpbnRlcnZhbCA9IHNldEludGVydmFsKFxyXG4gICAgICAgICAgICBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICRhY3RpdmVfaW5kZXggPSAkc2xpZGVyLmZpbmQoJy5hY3RpdmUnKS5pbmRleCgpO1xyXG4gICAgICAgICAgICAgIGlmICgkc2xpZGVzLmxlbmd0aCA9PSAkYWN0aXZlX2luZGV4ICsgMSkgJGFjdGl2ZV9pbmRleCA9IDA7IC8vIGxvb3AgdG8gc3RhcnRcclxuICAgICAgICAgICAgICBlbHNlICRhY3RpdmVfaW5kZXggKz0gMTtcclxuXHJcbiAgICAgICAgICAgICAgbW92ZVRvU2xpZGUoJGFjdGl2ZV9pbmRleCk7XHJcblxyXG4gICAgICAgICAgICB9LCBvcHRpb25zLnRyYW5zaXRpb24gKyBvcHRpb25zLmludGVydmFsXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkdGhpcy5vbignc2xpZGVyTmV4dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgJGFjdGl2ZV9pbmRleCA9ICRzbGlkZXIuZmluZCgnLmFjdGl2ZScpLmluZGV4KCk7XHJcbiAgICAgICAgICBtb3ZlVG9TbGlkZSgkYWN0aXZlX2luZGV4ICsgMSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICR0aGlzLm9uKCdzbGlkZXJQcmV2JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAkYWN0aXZlX2luZGV4ID0gJHNsaWRlci5maW5kKCcuYWN0aXZlJykuaW5kZXgoKTtcclxuICAgICAgICAgIG1vdmVUb1NsaWRlKCRhY3RpdmVfaW5kZXggLSAxKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgfSxcclxuICAgIHBhdXNlIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICQodGhpcykudHJpZ2dlcignc2xpZGVyUGF1c2UnKTtcclxuICAgIH0sXHJcbiAgICBzdGFydCA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAkKHRoaXMpLnRyaWdnZXIoJ3NsaWRlclN0YXJ0Jyk7XHJcbiAgICB9LFxyXG4gICAgbmV4dCA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAkKHRoaXMpLnRyaWdnZXIoJ3NsaWRlck5leHQnKTtcclxuICAgIH0sXHJcbiAgICBwcmV2IDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICQodGhpcykudHJpZ2dlcignc2xpZGVyUHJldicpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICAkLmZuLnNsaWRlciA9IGZ1bmN0aW9uKG1ldGhvZE9yT3B0aW9ucykge1xyXG4gICAgaWYgKCBtZXRob2RzW21ldGhvZE9yT3B0aW9uc10gKSB7XHJcbiAgICAgIHJldHVybiBtZXRob2RzWyBtZXRob2RPck9wdGlvbnMgXS5hcHBseSggdGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoIGFyZ3VtZW50cywgMSApKTtcclxuICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBtZXRob2RPck9wdGlvbnMgPT09ICdvYmplY3QnIHx8ICEgbWV0aG9kT3JPcHRpb25zICkge1xyXG4gICAgICAvLyBEZWZhdWx0IHRvIFwiaW5pdFwiXHJcbiAgICAgIHJldHVybiBtZXRob2RzLmluaXQuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJC5lcnJvciggJ01ldGhvZCAnICsgIG1ldGhvZE9yT3B0aW9ucyArICcgZG9lcyBub3QgZXhpc3Qgb24galF1ZXJ5LnRvb2x0aXAnICk7XHJcbiAgICB9XHJcbiAgfTsgLy8gUGx1Z2luIGVuZFxyXG59KCBqUXVlcnkgKSk7XHJcblxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrLmNhcmQnLCAnLmNhcmQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBpZiAoJCh0aGlzKS5maW5kKCc+IC5jYXJkLXJldmVhbCcpLmxlbmd0aCkge1xyXG4gICAgICAgIHZhciAkY2FyZCA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5jYXJkJyk7XHJcbiAgICAgICAgaWYgKCRjYXJkLmRhdGEoJ2luaXRpYWxPdmVyZmxvdycpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICRjYXJkLmRhdGEoXHJcbiAgICAgICAgICAgICdpbml0aWFsT3ZlcmZsb3cnLFxyXG4gICAgICAgICAgICAkY2FyZC5jc3MoJ292ZXJmbG93JykgPT09IHVuZGVmaW5lZCA/ICcnIDogJGNhcmQuY3NzKCdvdmVyZmxvdycpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoJChlLnRhcmdldCkuaXMoJCgnLmNhcmQtcmV2ZWFsIC5jYXJkLXRpdGxlJykpIHx8ICQoZS50YXJnZXQpLmlzKCQoJy5jYXJkLXJldmVhbCAuY2FyZC10aXRsZSBpJykpKSB7XHJcbiAgICAgICAgICAvLyBNYWtlIFJldmVhbCBhbmltYXRlIGRvd24gYW5kIGRpc3BsYXkgbm9uZVxyXG4gICAgICAgICAgJCh0aGlzKS5maW5kKCcuY2FyZC1yZXZlYWwnKS52ZWxvY2l0eShcclxuICAgICAgICAgICAge3RyYW5zbGF0ZVk6IDB9LCB7XHJcbiAgICAgICAgICAgICAgZHVyYXRpb246IDIyNSxcclxuICAgICAgICAgICAgICBxdWV1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgZWFzaW5nOiAnZWFzZUluT3V0UXVhZCcsXHJcbiAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoeyBkaXNwbGF5OiAnbm9uZSd9KTtcclxuICAgICAgICAgICAgICAgICRjYXJkLmNzcygnb3ZlcmZsb3cnLCAkY2FyZC5kYXRhKCdpbml0aWFsT3ZlcmZsb3cnKSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICgkKGUudGFyZ2V0KS5pcygkKCcuY2FyZCAuYWN0aXZhdG9yJykpIHx8XHJcbiAgICAgICAgICAgICAgICAgJChlLnRhcmdldCkuaXMoJCgnLmNhcmQgLmFjdGl2YXRvciBpJykpICkge1xyXG4gICAgICAgICAgJGNhcmQuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICAgICQodGhpcykuZmluZCgnLmNhcmQtcmV2ZWFsJykuY3NzKHsgZGlzcGxheTogJ2Jsb2NrJ30pLnZlbG9jaXR5KFwic3RvcFwiLCBmYWxzZSkudmVsb2NpdHkoe3RyYW5zbGF0ZVk6ICctMTAwJSd9LCB7ZHVyYXRpb246IDMwMCwgcXVldWU6IGZhbHNlLCBlYXNpbmc6ICdlYXNlSW5PdXRRdWFkJ30pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIH0pO1xyXG59KCBqUXVlcnkgKSk7XHJcblxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgdmFyIG1hdGVyaWFsQ2hpcHNEZWZhdWx0cyA9IHtcclxuICAgIGRhdGE6IFtdLFxyXG4gICAgcGxhY2Vob2xkZXI6ICcnLFxyXG4gICAgc2Vjb25kYXJ5UGxhY2Vob2xkZXI6ICcnLFxyXG4gICAgYXV0b2NvbXBsZXRlT3B0aW9uczoge30sXHJcbiAgfTtcclxuXHJcbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBIYW5kbGUgcmVtb3ZhbCBvZiBzdGF0aWMgY2hpcHMuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmNoaXAgLmNsb3NlJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgIHZhciAkY2hpcHMgPSAkKHRoaXMpLmNsb3Nlc3QoJy5jaGlwcycpO1xyXG4gICAgICBpZiAoJGNoaXBzLmF0dHIoJ2RhdGEtaW5pdGlhbGl6ZWQnKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5jaGlwJykucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgJC5mbi5tYXRlcmlhbF9jaGlwID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHRoaXMuJGVsID0gJCh0aGlzKTtcclxuICAgIHRoaXMuJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XHJcbiAgICB0aGlzLlNFTFMgPSB7XHJcbiAgICAgIENISVBTOiAnLmNoaXBzJyxcclxuICAgICAgQ0hJUDogJy5jaGlwJyxcclxuICAgICAgSU5QVVQ6ICdpbnB1dCcsXHJcbiAgICAgIERFTEVURTogJy5tYXRlcmlhbC1pY29ucycsXHJcbiAgICAgIFNFTEVDVEVEX0NISVA6ICcuc2VsZWN0ZWQnLFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoJ2RhdGEnID09PSBvcHRpb25zKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLiRlbC5kYXRhKCdjaGlwcycpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBjdXJyX29wdGlvbnMgPSAkLmV4dGVuZCh7fSwgbWF0ZXJpYWxDaGlwc0RlZmF1bHRzLCBvcHRpb25zKTtcclxuICAgIHNlbGYuaGFzQXV0b2NvbXBsZXRlID0gISQuaXNFbXB0eU9iamVjdChjdXJyX29wdGlvbnMuYXV0b2NvbXBsZXRlT3B0aW9ucy5kYXRhKTtcclxuXHJcbiAgICAvLyBJbml0aWFsaXplXHJcbiAgICB0aGlzLmluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGkgPSAwO1xyXG4gICAgICB2YXIgY2hpcHM7XHJcbiAgICAgIHNlbGYuJGVsLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgJGNoaXBzID0gJCh0aGlzKTtcclxuICAgICAgICB2YXIgY2hpcElkID0gTWF0ZXJpYWxpemUuZ3VpZCgpO1xyXG4gICAgICAgIHNlbGYuY2hpcElkID0gY2hpcElkO1xyXG5cclxuICAgICAgICBpZiAoIWN1cnJfb3B0aW9ucy5kYXRhIHx8ICEoY3Vycl9vcHRpb25zLmRhdGEgaW5zdGFuY2VvZiBBcnJheSkpIHtcclxuICAgICAgICAgIGN1cnJfb3B0aW9ucy5kYXRhID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRjaGlwcy5kYXRhKCdjaGlwcycsIGN1cnJfb3B0aW9ucy5kYXRhKTtcclxuICAgICAgICAkY2hpcHMuYXR0cignZGF0YS1pbmRleCcsIGkpO1xyXG4gICAgICAgICRjaGlwcy5hdHRyKCdkYXRhLWluaXRpYWxpemVkJywgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGlmICghJGNoaXBzLmhhc0NsYXNzKHNlbGYuU0VMUy5DSElQUykpIHtcclxuICAgICAgICAgICRjaGlwcy5hZGRDbGFzcygnY2hpcHMnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYuY2hpcHMoJGNoaXBzLCBjaGlwSWQpO1xyXG4gICAgICAgIGkrKztcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuaGFuZGxlRXZlbnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBTRUxTID0gc2VsZi5TRUxTO1xyXG5cclxuICAgICAgc2VsZi4kZG9jdW1lbnQub2ZmKCdjbGljay5jaGlwcy1mb2N1cycsIFNFTFMuQ0hJUFMpLm9uKCdjbGljay5jaGlwcy1mb2N1cycsIFNFTFMuQ0hJUFMsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICQoZS50YXJnZXQpLmZpbmQoU0VMUy5JTlBVVCkuZm9jdXMoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBzZWxmLiRkb2N1bWVudC5vZmYoJ2NsaWNrLmNoaXBzLXNlbGVjdCcsIFNFTFMuQ0hJUCkub24oJ2NsaWNrLmNoaXBzLXNlbGVjdCcsIFNFTFMuQ0hJUCwgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgdmFyICRjaGlwID0gJChlLnRhcmdldCk7XHJcbiAgICAgICAgaWYgKCRjaGlwLmxlbmd0aCkge1xyXG4gICAgICAgICAgdmFyIHdhc1NlbGVjdGVkID0gJGNoaXAuaGFzQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICB2YXIgJGNoaXBzID0gJGNoaXAuY2xvc2VzdChTRUxTLkNISVBTKTtcclxuICAgICAgICAgICQoU0VMUy5DSElQKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICBpZiAoIXdhc1NlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0Q2hpcCgkY2hpcC5pbmRleCgpLCAkY2hpcHMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBzZWxmLiRkb2N1bWVudC5vZmYoJ2tleWRvd24uY2hpcHMnKS5vbigna2V5ZG93bi5jaGlwcycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5pcygnaW5wdXQsIHRleHRhcmVhJykpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGRlbGV0ZVxyXG4gICAgICAgIHZhciAkY2hpcCA9IHNlbGYuJGRvY3VtZW50LmZpbmQoU0VMUy5DSElQICsgU0VMUy5TRUxFQ1RFRF9DSElQKTtcclxuICAgICAgICB2YXIgJGNoaXBzID0gJGNoaXAuY2xvc2VzdChTRUxTLkNISVBTKTtcclxuICAgICAgICB2YXIgbGVuZ3RoID0gJGNoaXAuc2libGluZ3MoU0VMUy5DSElQKS5sZW5ndGg7XHJcbiAgICAgICAgdmFyIGluZGV4O1xyXG5cclxuICAgICAgICBpZiAoISRjaGlwLmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGUud2hpY2ggPT09IDggfHwgZS53aGljaCA9PT0gNDYpIHtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICBpbmRleCA9ICRjaGlwLmluZGV4KCk7XHJcbiAgICAgICAgICBzZWxmLmRlbGV0ZUNoaXAoaW5kZXgsICRjaGlwcyk7XHJcblxyXG4gICAgICAgICAgdmFyIHNlbGVjdEluZGV4ID0gbnVsbDtcclxuICAgICAgICAgIGlmICgoaW5kZXggKyAxKSA8IGxlbmd0aCkge1xyXG4gICAgICAgICAgICBzZWxlY3RJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gbGVuZ3RoIHx8IChpbmRleCArIDEpID09PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgc2VsZWN0SW5kZXggPSBsZW5ndGggLSAxO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChzZWxlY3RJbmRleCA8IDApIHNlbGVjdEluZGV4ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICBpZiAobnVsbCAhPT0gc2VsZWN0SW5kZXgpIHtcclxuICAgICAgICAgICAgc2VsZi5zZWxlY3RDaGlwKHNlbGVjdEluZGV4LCAkY2hpcHMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFsZW5ndGgpICRjaGlwcy5maW5kKCdpbnB1dCcpLmZvY3VzKCk7XHJcblxyXG4gICAgICAgIC8vIGxlZnRcclxuICAgICAgICB9IGVsc2UgaWYgKGUud2hpY2ggPT09IDM3KSB7XHJcbiAgICAgICAgICBpbmRleCA9ICRjaGlwLmluZGV4KCkgLSAxO1xyXG4gICAgICAgICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAkKFNFTFMuQ0hJUCkucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICBzZWxmLnNlbGVjdENoaXAoaW5kZXgsICRjaGlwcyk7XHJcblxyXG4gICAgICAgIC8vIHJpZ2h0XHJcbiAgICAgICAgfSBlbHNlIGlmIChlLndoaWNoID09PSAzOSkge1xyXG4gICAgICAgICAgaW5kZXggPSAkY2hpcC5pbmRleCgpICsgMTtcclxuICAgICAgICAgICQoU0VMUy5DSElQKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgIGlmIChpbmRleCA+IGxlbmd0aCkge1xyXG4gICAgICAgICAgICAkY2hpcHMuZmluZCgnaW5wdXQnKS5mb2N1cygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzZWxmLnNlbGVjdENoaXAoaW5kZXgsICRjaGlwcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHNlbGYuJGRvY3VtZW50Lm9mZignZm9jdXNpbi5jaGlwcycsIFNFTFMuQ0hJUFMgKyAnICcgKyBTRUxTLklOUFVUKS5vbignZm9jdXNpbi5jaGlwcycsIFNFTFMuQ0hJUFMgKyAnICcgKyBTRUxTLklOUFVULCBmdW5jdGlvbihlKXtcclxuICAgICAgICB2YXIgJGN1cnJDaGlwcyA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoU0VMUy5DSElQUyk7XHJcbiAgICAgICAgJGN1cnJDaGlwcy5hZGRDbGFzcygnZm9jdXMnKTtcclxuICAgICAgICAkY3VyckNoaXBzLnNpYmxpbmdzKCdsYWJlbCwgLnByZWZpeCcpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKFNFTFMuQ0hJUCkucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgc2VsZi4kZG9jdW1lbnQub2ZmKCdmb2N1c291dC5jaGlwcycsIFNFTFMuQ0hJUFMgKyAnICcgKyBTRUxTLklOUFVUKS5vbignZm9jdXNvdXQuY2hpcHMnLCBTRUxTLkNISVBTICsgJyAnICsgU0VMUy5JTlBVVCwgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgdmFyICRjdXJyQ2hpcHMgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KFNFTFMuQ0hJUFMpO1xyXG4gICAgICAgICRjdXJyQ2hpcHMucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBhY3RpdmUgaWYgZW1wdHlcclxuICAgICAgICBpZiAoJGN1cnJDaGlwcy5kYXRhKCdjaGlwcycpID09PSB1bmRlZmluZWQgfHwgISRjdXJyQ2hpcHMuZGF0YSgnY2hpcHMnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICRjdXJyQ2hpcHMuc2libGluZ3MoJ2xhYmVsJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkY3VyckNoaXBzLnNpYmxpbmdzKCcucHJlZml4JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHNlbGYuJGRvY3VtZW50Lm9mZigna2V5ZG93bi5jaGlwcy1hZGQnLCBTRUxTLkNISVBTICsgJyAnICsgU0VMUy5JTlBVVCkub24oJ2tleWRvd24uY2hpcHMtYWRkJywgU0VMUy5DSElQUyArICcgJyArIFNFTFMuSU5QVVQsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIHZhciAkdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcbiAgICAgICAgdmFyICRjaGlwcyA9ICR0YXJnZXQuY2xvc2VzdChTRUxTLkNISVBTKTtcclxuICAgICAgICB2YXIgY2hpcHNMZW5ndGggPSAkY2hpcHMuY2hpbGRyZW4oU0VMUy5DSElQKS5sZW5ndGg7XHJcblxyXG4gICAgICAgIC8vIGVudGVyXHJcbiAgICAgICAgaWYgKDEzID09PSBlLndoaWNoKSB7XHJcbiAgICAgICAgICAvLyBPdmVycmlkZSBlbnRlciBpZiBhdXRvY29tcGxldGluZy5cclxuICAgICAgICAgIGlmIChzZWxmLmhhc0F1dG9jb21wbGV0ZSAmJlxyXG4gICAgICAgICAgICAgICRjaGlwcy5maW5kKCcuYXV0b2NvbXBsZXRlLWNvbnRlbnQuZHJvcGRvd24tY29udGVudCcpLmxlbmd0aCAmJlxyXG4gICAgICAgICAgICAgICRjaGlwcy5maW5kKCcuYXV0b2NvbXBsZXRlLWNvbnRlbnQuZHJvcGRvd24tY29udGVudCcpLmNoaWxkcmVuKCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICBzZWxmLmFkZENoaXAoe3RhZzogJHRhcmdldC52YWwoKX0sICRjaGlwcyk7XHJcbiAgICAgICAgICAkdGFyZ2V0LnZhbCgnJyk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBkZWxldGUgb3IgbGVmdFxyXG4gICAgICAgIGlmICgoOCA9PT0gZS5rZXlDb2RlIHx8IDM3ID09PSBlLmtleUNvZGUpICYmICcnID09PSAkdGFyZ2V0LnZhbCgpICYmIGNoaXBzTGVuZ3RoKSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICBzZWxmLnNlbGVjdENoaXAoY2hpcHNMZW5ndGggLSAxLCAkY2hpcHMpO1xyXG4gICAgICAgICAgJHRhcmdldC5ibHVyKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIENsaWNrIG9uIGRlbGV0ZSBpY29uIGluIGNoaXAuXHJcbiAgICAgIHNlbGYuJGRvY3VtZW50Lm9mZignY2xpY2suY2hpcHMtZGVsZXRlJywgU0VMUy5DSElQUyArICcgJyArIFNFTFMuREVMRVRFKS5vbignY2xpY2suY2hpcHMtZGVsZXRlJywgU0VMUy5DSElQUyArICcgJyArIFNFTFMuREVMRVRFLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyICR0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuICAgICAgICB2YXIgJGNoaXBzID0gJHRhcmdldC5jbG9zZXN0KFNFTFMuQ0hJUFMpO1xyXG4gICAgICAgIHZhciAkY2hpcCA9ICR0YXJnZXQuY2xvc2VzdChTRUxTLkNISVApO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgc2VsZi5kZWxldGVDaGlwKCRjaGlwLmluZGV4KCksICRjaGlwcyk7XHJcbiAgICAgICAgJGNoaXBzLmZpbmQoJ2lucHV0JykuZm9jdXMoKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuY2hpcHMgPSBmdW5jdGlvbigkY2hpcHMsIGNoaXBJZCkge1xyXG4gICAgICAkY2hpcHMuZW1wdHkoKTtcclxuICAgICAgJGNoaXBzLmRhdGEoJ2NoaXBzJykuZm9yRWFjaChmdW5jdGlvbihlbGVtKXtcclxuICAgICAgICAkY2hpcHMuYXBwZW5kKHNlbGYucmVuZGVyQ2hpcChlbGVtKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICAkY2hpcHMuYXBwZW5kKCQoJzxpbnB1dCBpZD1cIicgKyBjaGlwSWQgKydcIiBjbGFzcz1cImlucHV0XCIgcGxhY2Vob2xkZXI9XCJcIj4nKSk7XHJcbiAgICAgIHNlbGYuc2V0UGxhY2Vob2xkZXIoJGNoaXBzKTtcclxuXHJcbiAgICAgIC8vIFNldCBmb3IgYXR0cmlidXRlIGZvciBsYWJlbFxyXG4gICAgICB2YXIgbGFiZWwgPSAkY2hpcHMubmV4dCgnbGFiZWwnKTtcclxuICAgICAgaWYgKGxhYmVsLmxlbmd0aCkge1xyXG4gICAgICAgIGxhYmVsLmF0dHIoJ2ZvcicsIGNoaXBJZCk7XHJcblxyXG4gICAgICAgIGlmICgkY2hpcHMuZGF0YSgnY2hpcHMnKSE9PSB1bmRlZmluZWQgJiYgJGNoaXBzLmRhdGEoJ2NoaXBzJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICBsYWJlbC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBTZXR1cCBhdXRvY29tcGxldGUgaWYgbmVlZGVkLlxyXG4gICAgICB2YXIgaW5wdXQgPSAkKCcjJyArIGNoaXBJZCk7XHJcbiAgICAgIGlmIChzZWxmLmhhc0F1dG9jb21wbGV0ZSkge1xyXG4gICAgICAgIGN1cnJfb3B0aW9ucy5hdXRvY29tcGxldGVPcHRpb25zLm9uQXV0b2NvbXBsZXRlID0gZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgICBzZWxmLmFkZENoaXAoe3RhZzogdmFsfSwgJGNoaXBzKTtcclxuICAgICAgICAgIGlucHV0LnZhbCgnJyk7XHJcbiAgICAgICAgICBpbnB1dC5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dC5hdXRvY29tcGxldGUoY3Vycl9vcHRpb25zLmF1dG9jb21wbGV0ZU9wdGlvbnMpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIGNoaXAgalF1ZXJ5IGVsZW1lbnQuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbVxyXG4gICAgICogQHJldHVybiB7alF1ZXJ5fVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJlbmRlckNoaXAgPSBmdW5jdGlvbihlbGVtKSB7XHJcbiAgICAgIGlmICghZWxlbS50YWcpIHJldHVybjtcclxuXHJcbiAgICAgIHZhciAkcmVuZGVyZWRDaGlwID0gJCgnPGRpdiBjbGFzcz1cImNoaXBcIj48L2Rpdj4nKTtcclxuICAgICAgJHJlbmRlcmVkQ2hpcC50ZXh0KGVsZW0udGFnKTtcclxuICAgICAgaWYgKGVsZW0uaW1hZ2UpIHtcclxuICAgICAgICAkcmVuZGVyZWRDaGlwLnByZXBlbmQoJCgnPGltZyAvPicpLmF0dHIoJ3NyYycsIGVsZW0uaW1hZ2UpKVxyXG4gICAgICB9XHJcbiAgICAgICRyZW5kZXJlZENoaXAuYXBwZW5kKCQoJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgY2xvc2VcIj5jbG9zZTwvaT4nKSk7XHJcbiAgICAgIHJldHVybiAkcmVuZGVyZWRDaGlwO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnNldFBsYWNlaG9sZGVyID0gZnVuY3Rpb24oJGNoaXBzKSB7XHJcbiAgICAgIGlmICgoJGNoaXBzLmRhdGEoJ2NoaXBzJykgIT09IHVuZGVmaW5lZCAmJiAhJGNoaXBzLmRhdGEoJ2NoaXBzJykubGVuZ3RoKSAmJiBjdXJyX29wdGlvbnMucGxhY2Vob2xkZXIpIHtcclxuICAgICAgICAkY2hpcHMuZmluZCgnaW5wdXQnKS5wcm9wKCdwbGFjZWhvbGRlcicsIGN1cnJfb3B0aW9ucy5wbGFjZWhvbGRlcik7XHJcblxyXG4gICAgICB9IGVsc2UgaWYgKCgkY2hpcHMuZGF0YSgnY2hpcHMnKSA9PT0gdW5kZWZpbmVkIHx8ICEhJGNoaXBzLmRhdGEoJ2NoaXBzJykubGVuZ3RoKSAmJiBjdXJyX29wdGlvbnMuc2Vjb25kYXJ5UGxhY2Vob2xkZXIpIHtcclxuICAgICAgICAkY2hpcHMuZmluZCgnaW5wdXQnKS5wcm9wKCdwbGFjZWhvbGRlcicsIGN1cnJfb3B0aW9ucy5zZWNvbmRhcnlQbGFjZWhvbGRlcik7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5pc1ZhbGlkID0gZnVuY3Rpb24oJGNoaXBzLCBlbGVtKSB7XHJcbiAgICAgIHZhciBjaGlwcyA9ICRjaGlwcy5kYXRhKCdjaGlwcycpO1xyXG4gICAgICB2YXIgZXhpc3RzID0gZmFsc2U7XHJcbiAgICAgIGZvciAodmFyIGk9MDsgaSA8IGNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGNoaXBzW2ldLnRhZyA9PT0gZWxlbS50YWcpIHtcclxuICAgICAgICAgICAgZXhpc3RzID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gJycgIT09IGVsZW0udGFnICYmICFleGlzdHM7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuYWRkQ2hpcCA9IGZ1bmN0aW9uKGVsZW0sICRjaGlwcykge1xyXG4gICAgICBpZiAoIXNlbGYuaXNWYWxpZCgkY2hpcHMsIGVsZW0pKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciAkcmVuZGVyZWRDaGlwID0gc2VsZi5yZW5kZXJDaGlwKGVsZW0pO1xyXG4gICAgICB2YXIgbmV3RGF0YSA9IFtdO1xyXG4gICAgICB2YXIgb2xkRGF0YSA9ICRjaGlwcy5kYXRhKCdjaGlwcycpO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9sZERhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBuZXdEYXRhLnB1c2gob2xkRGF0YVtpXSk7XHJcbiAgICAgIH1cclxuICAgICAgbmV3RGF0YS5wdXNoKGVsZW0pO1xyXG5cclxuICAgICAgJGNoaXBzLmRhdGEoJ2NoaXBzJywgbmV3RGF0YSk7XHJcbiAgICAgICRyZW5kZXJlZENoaXAuaW5zZXJ0QmVmb3JlKCRjaGlwcy5maW5kKCdpbnB1dCcpKTtcclxuICAgICAgJGNoaXBzLnRyaWdnZXIoJ2NoaXAuYWRkJywgZWxlbSk7XHJcbiAgICAgIHNlbGYuc2V0UGxhY2Vob2xkZXIoJGNoaXBzKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5kZWxldGVDaGlwID0gZnVuY3Rpb24oY2hpcEluZGV4LCAkY2hpcHMpIHtcclxuICAgICAgdmFyIGNoaXAgPSAkY2hpcHMuZGF0YSgnY2hpcHMnKVtjaGlwSW5kZXhdO1xyXG4gICAgICAkY2hpcHMuZmluZCgnLmNoaXAnKS5lcShjaGlwSW5kZXgpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgdmFyIG5ld0RhdGEgPSBbXTtcclxuICAgICAgdmFyIG9sZERhdGEgPSAkY2hpcHMuZGF0YSgnY2hpcHMnKTtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvbGREYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGkgIT09IGNoaXBJbmRleCkge1xyXG4gICAgICAgICAgbmV3RGF0YS5wdXNoKG9sZERhdGFbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgJGNoaXBzLmRhdGEoJ2NoaXBzJywgbmV3RGF0YSk7XHJcbiAgICAgICRjaGlwcy50cmlnZ2VyKCdjaGlwLmRlbGV0ZScsIGNoaXApO1xyXG4gICAgICBzZWxmLnNldFBsYWNlaG9sZGVyKCRjaGlwcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuc2VsZWN0Q2hpcCA9IGZ1bmN0aW9uKGNoaXBJbmRleCwgJGNoaXBzKSB7XHJcbiAgICAgIHZhciAkY2hpcCA9ICRjaGlwcy5maW5kKCcuY2hpcCcpLmVxKGNoaXBJbmRleCk7XHJcbiAgICAgIGlmICgkY2hpcCAmJiBmYWxzZSA9PT0gJGNoaXAuaGFzQ2xhc3MoJ3NlbGVjdGVkJykpIHtcclxuICAgICAgICAkY2hpcC5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICAgICAkY2hpcHMudHJpZ2dlcignY2hpcC5zZWxlY3QnLCAkY2hpcHMuZGF0YSgnY2hpcHMnKVtjaGlwSW5kZXhdKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmdldENoaXBzRWxlbWVudCA9IGZ1bmN0aW9uKGluZGV4LCAkY2hpcHMpIHtcclxuICAgICAgcmV0dXJuICRjaGlwcy5lcShpbmRleCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGluaXRcclxuICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgIHRoaXMuaGFuZGxlRXZlbnRzKCk7XHJcbiAgfTtcclxufSggalF1ZXJ5ICkpO1xyXG5cbihmdW5jdGlvbiAoJCkge1xyXG4gICQuZm4ucHVzaHBpbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAvLyBEZWZhdWx0c1xyXG4gICAgdmFyIGRlZmF1bHRzID0ge1xyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIGJvdHRvbTogSW5maW5pdHksXHJcbiAgICAgIG9mZnNldDogMFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBSZW1vdmUgcHVzaHBpbiBldmVudCBhbmQgY2xhc3Nlc1xyXG4gICAgaWYgKG9wdGlvbnMgPT09IFwicmVtb3ZlXCIpIHtcclxuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoaWQgPSAkKHRoaXMpLmRhdGEoJ3B1c2hwaW4taWQnKSkge1xyXG4gICAgICAgICAgJCh3aW5kb3cpLm9mZignc2Nyb2xsLicgKyBpZCk7XHJcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZURhdGEoJ3B1c2hwaW4taWQnKS5yZW1vdmVDbGFzcygncGluLXRvcCBwaW5uZWQgcGluLWJvdHRvbScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9wdGlvbnMgPSAkLmV4dGVuZChkZWZhdWx0cywgb3B0aW9ucyk7XHJcblxyXG5cclxuICAgICRpbmRleCA9IDA7XHJcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgJHVuaXF1ZUlkID0gTWF0ZXJpYWxpemUuZ3VpZCgpLFxyXG4gICAgICAgICAgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgJG9yaWdpbmFsX29mZnNldCA9ICQodGhpcykub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgZnVuY3Rpb24gcmVtb3ZlUGluQ2xhc3NlcyhvYmplY3QpIHtcclxuICAgICAgICBvYmplY3QucmVtb3ZlQ2xhc3MoJ3Bpbi10b3AnKTtcclxuICAgICAgICBvYmplY3QucmVtb3ZlQ2xhc3MoJ3Bpbm5lZCcpO1xyXG4gICAgICAgIG9iamVjdC5yZW1vdmVDbGFzcygncGluLWJvdHRvbScpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiB1cGRhdGVFbGVtZW50cyhvYmplY3RzLCBzY3JvbGxlZCkge1xyXG4gICAgICAgIG9iamVjdHMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAvLyBBZGQgcG9zaXRpb24gZml4ZWQgKGJlY2F1c2UgaXRzIGJldHdlZW4gdG9wIGFuZCBib3R0b20pXHJcbiAgICAgICAgICBpZiAob3B0aW9ucy50b3AgPD0gc2Nyb2xsZWQgJiYgb3B0aW9ucy5ib3R0b20gPj0gc2Nyb2xsZWQgJiYgISQodGhpcykuaGFzQ2xhc3MoJ3Bpbm5lZCcpKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZVBpbkNsYXNzZXMoJCh0aGlzKSk7XHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCd0b3AnLCBvcHRpb25zLm9mZnNldCk7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3Bpbm5lZCcpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIEFkZCBwaW4tdG9wICh3aGVuIHNjcm9sbGVkIHBvc2l0aW9uIGlzIGFib3ZlIHRvcClcclxuICAgICAgICAgIGlmIChzY3JvbGxlZCA8IG9wdGlvbnMudG9wICYmICEkKHRoaXMpLmhhc0NsYXNzKCdwaW4tdG9wJykpIHtcclxuICAgICAgICAgICAgcmVtb3ZlUGluQ2xhc3NlcygkKHRoaXMpKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ3RvcCcsIDApO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdwaW4tdG9wJyk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gQWRkIHBpbi1ib3R0b20gKHdoZW4gc2Nyb2xsZWQgcG9zaXRpb24gaXMgYmVsb3cgYm90dG9tKVxyXG4gICAgICAgICAgaWYgKHNjcm9sbGVkID4gb3B0aW9ucy5ib3R0b20gJiYgISQodGhpcykuaGFzQ2xhc3MoJ3Bpbi1ib3R0b20nKSkge1xyXG4gICAgICAgICAgICByZW1vdmVQaW5DbGFzc2VzKCQodGhpcykpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdwaW4tYm90dG9tJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCd0b3AnLCBvcHRpb25zLmJvdHRvbSAtICRvcmlnaW5hbF9vZmZzZXQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkKHRoaXMpLmRhdGEoJ3B1c2hwaW4taWQnLCAkdW5pcXVlSWQpO1xyXG4gICAgICB1cGRhdGVFbGVtZW50cygkdGhpcywgJCh3aW5kb3cpLnNjcm9sbFRvcCgpKTtcclxuICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwuJyArICR1bmlxdWVJZCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciAkc2Nyb2xsZWQgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyBvcHRpb25zLm9mZnNldDtcclxuICAgICAgICB1cGRhdGVFbGVtZW50cygkdGhpcywgJHNjcm9sbGVkKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH07XHJcbn0oIGpRdWVyeSApKTtcbihmdW5jdGlvbiAoJCkge1xyXG4gICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8vIGpRdWVyeSByZXZlcnNlXHJcbiAgICAkLmZuLnJldmVyc2UgPSBbXS5yZXZlcnNlO1xyXG5cclxuICAgIC8vIEhvdmVyIGJlaGF2aW91cjogbWFrZSBzdXJlIHRoaXMgZG9lc24ndCB3b3JrIG9uIC5jbGljay10by10b2dnbGUgRkFCcyFcclxuICAgICQoZG9jdW1lbnQpLm9uKCdtb3VzZWVudGVyLmZpeGVkQWN0aW9uQnRuJywgJy5maXhlZC1hY3Rpb24tYnRuOm5vdCguY2xpY2stdG8tdG9nZ2xlKTpub3QoLnRvb2xiYXIpJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICBvcGVuRkFCTWVudSgkdGhpcyk7XHJcbiAgICB9KTtcclxuICAgICQoZG9jdW1lbnQpLm9uKCdtb3VzZWxlYXZlLmZpeGVkQWN0aW9uQnRuJywgJy5maXhlZC1hY3Rpb24tYnRuOm5vdCguY2xpY2stdG8tdG9nZ2xlKTpub3QoLnRvb2xiYXIpJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICBjbG9zZUZBQk1lbnUoJHRoaXMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gVG9nZ2xlLW9uLWNsaWNrIGJlaGF2aW91ci5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljay5mYWJDbGlja1RvZ2dsZScsICcuZml4ZWQtYWN0aW9uLWJ0bi5jbGljay10by10b2dnbGUgPiBhJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICB2YXIgJG1lbnUgPSAkdGhpcy5wYXJlbnQoKTtcclxuICAgICAgaWYgKCRtZW51Lmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgIGNsb3NlRkFCTWVudSgkbWVudSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb3BlbkZBQk1lbnUoJG1lbnUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBUb29sYmFyIHRyYW5zaXRpb24gYmVoYXZpb3VyLlxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrLmZhYlRvb2xiYXInLCAnLmZpeGVkLWFjdGlvbi1idG4udG9vbGJhciA+IGEnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgIHZhciAkbWVudSA9ICR0aGlzLnBhcmVudCgpO1xyXG4gICAgICBGQUJ0b1Rvb2xiYXIoJG1lbnUpO1xyXG4gICAgfSk7XHJcblxyXG4gIH0pO1xyXG5cclxuICAkLmZuLmV4dGVuZCh7XHJcbiAgICBvcGVuRkFCOiBmdW5jdGlvbigpIHtcclxuICAgICAgb3BlbkZBQk1lbnUoJCh0aGlzKSk7XHJcbiAgICB9LFxyXG4gICAgY2xvc2VGQUI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICBjbG9zZUZBQk1lbnUoJCh0aGlzKSk7XHJcbiAgICB9LFxyXG4gICAgb3BlblRvb2xiYXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICBGQUJ0b1Rvb2xiYXIoJCh0aGlzKSk7XHJcbiAgICB9LFxyXG4gICAgY2xvc2VUb29sYmFyOiBmdW5jdGlvbigpIHtcclxuICAgICAgdG9vbGJhclRvRkFCKCQodGhpcykpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuXHJcbiAgdmFyIG9wZW5GQUJNZW51ID0gZnVuY3Rpb24gKGJ0bikge1xyXG4gICAgdmFyICR0aGlzID0gYnRuO1xyXG4gICAgaWYgKCR0aGlzLmhhc0NsYXNzKCdhY3RpdmUnKSA9PT0gZmFsc2UpIHtcclxuXHJcbiAgICAgIC8vIEdldCBkaXJlY3Rpb24gb3B0aW9uXHJcbiAgICAgIHZhciBob3Jpem9udGFsID0gJHRoaXMuaGFzQ2xhc3MoJ2hvcml6b250YWwnKTtcclxuICAgICAgdmFyIG9mZnNldFksIG9mZnNldFg7XHJcblxyXG4gICAgICBpZiAoaG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIG9mZnNldFggPSA0MDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvZmZzZXRZID0gNDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICR0aGlzLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgJHRoaXMuZmluZCgndWwgLmJ0bi1mbG9hdGluZycpLnZlbG9jaXR5KFxyXG4gICAgICAgIHsgc2NhbGVZOiBcIi40XCIsIHNjYWxlWDogXCIuNFwiLCB0cmFuc2xhdGVZOiBvZmZzZXRZICsgJ3B4JywgdHJhbnNsYXRlWDogb2Zmc2V0WCArICdweCd9LFxyXG4gICAgICAgIHsgZHVyYXRpb246IDAgfSk7XHJcblxyXG4gICAgICB2YXIgdGltZSA9IDA7XHJcbiAgICAgICR0aGlzLmZpbmQoJ3VsIC5idG4tZmxvYXRpbmcnKS5yZXZlcnNlKCkuZWFjaCggZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykudmVsb2NpdHkoXHJcbiAgICAgICAgICB7IG9wYWNpdHk6IFwiMVwiLCBzY2FsZVg6IFwiMVwiLCBzY2FsZVk6IFwiMVwiLCB0cmFuc2xhdGVZOiBcIjBcIiwgdHJhbnNsYXRlWDogJzAnfSxcclxuICAgICAgICAgIHsgZHVyYXRpb246IDgwLCBkZWxheTogdGltZSB9KTtcclxuICAgICAgICB0aW1lICs9IDQwO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICB2YXIgY2xvc2VGQUJNZW51ID0gZnVuY3Rpb24gKGJ0bikge1xyXG4gICAgdmFyICR0aGlzID0gYnRuO1xyXG4gICAgLy8gR2V0IGRpcmVjdGlvbiBvcHRpb25cclxuICAgIHZhciBob3Jpem9udGFsID0gJHRoaXMuaGFzQ2xhc3MoJ2hvcml6b250YWwnKTtcclxuICAgIHZhciBvZmZzZXRZLCBvZmZzZXRYO1xyXG5cclxuICAgIGlmIChob3Jpem9udGFsID09PSB0cnVlKSB7XHJcbiAgICAgIG9mZnNldFggPSA0MDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9mZnNldFkgPSA0MDtcclxuICAgIH1cclxuXHJcbiAgICAkdGhpcy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB2YXIgdGltZSA9IDA7XHJcbiAgICAkdGhpcy5maW5kKCd1bCAuYnRuLWZsb2F0aW5nJykudmVsb2NpdHkoXCJzdG9wXCIsIHRydWUpO1xyXG4gICAgJHRoaXMuZmluZCgndWwgLmJ0bi1mbG9hdGluZycpLnZlbG9jaXR5KFxyXG4gICAgICB7IG9wYWNpdHk6IFwiMFwiLCBzY2FsZVg6IFwiLjRcIiwgc2NhbGVZOiBcIi40XCIsIHRyYW5zbGF0ZVk6IG9mZnNldFkgKyAncHgnLCB0cmFuc2xhdGVYOiBvZmZzZXRYICsgJ3B4J30sXHJcbiAgICAgIHsgZHVyYXRpb246IDgwIH1cclxuICAgICk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYW5zZm9ybSBGQUIgaW50byB0b29sYmFyXHJcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgb2JqZWN0IGpRdWVyeSBvYmplY3RcclxuICAgKi9cclxuICB2YXIgRkFCdG9Ub29sYmFyID0gZnVuY3Rpb24oYnRuKSB7XHJcbiAgICBpZiAoYnRuLmF0dHIoJ2RhdGEtb3BlbicpID09PSBcInRydWVcIikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG9mZnNldFgsIG9mZnNldFksIHNjYWxlRmFjdG9yO1xyXG4gICAgdmFyIHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICB2YXIgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgdmFyIGJ0blJlY3QgPSBidG5bMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICB2YXIgYW5jaG9yID0gYnRuLmZpbmQoJz4gYScpLmZpcnN0KCk7XHJcbiAgICB2YXIgbWVudSA9IGJ0bi5maW5kKCc+IHVsJykuZmlyc3QoKTtcclxuICAgIHZhciBiYWNrZHJvcCA9ICQoJzxkaXYgY2xhc3M9XCJmYWItYmFja2Ryb3BcIj48L2Rpdj4nKTtcclxuICAgIHZhciBmYWJDb2xvciA9IGFuY2hvci5jc3MoJ2JhY2tncm91bmQtY29sb3InKTtcclxuICAgIGFuY2hvci5hcHBlbmQoYmFja2Ryb3ApO1xyXG5cclxuICAgIG9mZnNldFggPSBidG5SZWN0LmxlZnQgLSAod2luZG93V2lkdGggLyAyKSArIChidG5SZWN0LndpZHRoIC8gMik7XHJcbiAgICBvZmZzZXRZID0gd2luZG93SGVpZ2h0IC0gYnRuUmVjdC5ib3R0b207XHJcbiAgICBzY2FsZUZhY3RvciA9IHdpbmRvd1dpZHRoIC8gYmFja2Ryb3Aud2lkdGgoKTtcclxuICAgIGJ0bi5hdHRyKCdkYXRhLW9yaWdpbi1ib3R0b20nLCBidG5SZWN0LmJvdHRvbSk7XHJcbiAgICBidG4uYXR0cignZGF0YS1vcmlnaW4tbGVmdCcsIGJ0blJlY3QubGVmdCk7XHJcbiAgICBidG4uYXR0cignZGF0YS1vcmlnaW4td2lkdGgnLCBidG5SZWN0LndpZHRoKTtcclxuXHJcbiAgICAvLyBTZXQgaW5pdGlhbCBzdGF0ZVxyXG4gICAgYnRuLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgIGJ0bi5hdHRyKCdkYXRhLW9wZW4nLCB0cnVlKTtcclxuICAgIGJ0bi5jc3Moe1xyXG4gICAgICAndGV4dC1hbGlnbic6ICdjZW50ZXInLFxyXG4gICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICBib3R0b206IDAsXHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoJyArIG9mZnNldFggKyAncHgpJyxcclxuICAgICAgdHJhbnNpdGlvbjogJ25vbmUnXHJcbiAgICB9KTtcclxuICAgIGFuY2hvci5jc3Moe1xyXG4gICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKCcgKyAtb2Zmc2V0WSArICdweCknLFxyXG4gICAgICB0cmFuc2l0aW9uOiAnbm9uZSdcclxuICAgIH0pO1xyXG4gICAgYmFja2Ryb3AuY3NzKHtcclxuICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBmYWJDb2xvclxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGJ0bi5jc3Moe1xyXG4gICAgICAgIHRyYW5zZm9ybTogJycsXHJcbiAgICAgICAgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAuMnMgY3ViaWMtYmV6aWVyKDAuNTUwLCAwLjA4NSwgMC42ODAsIDAuNTMwKSwgYmFja2dyb3VuZC1jb2xvciAwcyBsaW5lYXIgLjJzJ1xyXG4gICAgICB9KTtcclxuICAgICAgYW5jaG9yLmNzcyh7XHJcbiAgICAgICAgb3ZlcmZsb3c6ICd2aXNpYmxlJyxcclxuICAgICAgICB0cmFuc2Zvcm06ICcnLFxyXG4gICAgICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gLjJzJ1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYnRuLmNzcyh7XHJcbiAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IGZhYkNvbG9yXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYmFja2Ryb3AuY3NzKHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKCcgKyBzY2FsZUZhY3RvciArICcpJyxcclxuICAgICAgICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gLjJzIGN1YmljLWJlemllcigwLjU1MCwgMC4wNTUsIDAuNjc1LCAwLjE5MCknXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbWVudS5maW5kKCc+IGxpID4gYScpLmNzcyh7XHJcbiAgICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFNjcm9sbCB0byBjbG9zZS5cclxuICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbC5mYWJUb29sYmFyQ2xvc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHRvb2xiYXJUb0ZBQihidG4pO1xyXG4gICAgICAgICAgJCh3aW5kb3cpLm9mZignc2Nyb2xsLmZhYlRvb2xiYXJDbG9zZScpO1xyXG4gICAgICAgICAgJChkb2N1bWVudCkub2ZmKCdjbGljay5mYWJUb29sYmFyQ2xvc2UnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrLmZhYlRvb2xiYXJDbG9zZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIGlmICghJChlLnRhcmdldCkuY2xvc2VzdChtZW51KS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdG9vbGJhclRvRkFCKGJ0bik7XHJcbiAgICAgICAgICAgICQod2luZG93KS5vZmYoJ3Njcm9sbC5mYWJUb29sYmFyQ2xvc2UnKTtcclxuICAgICAgICAgICAgJChkb2N1bWVudCkub2ZmKCdjbGljay5mYWJUb29sYmFyQ2xvc2UnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSwgMTAwKTtcclxuICAgIH0sIDApO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYW5zZm9ybSB0b29sYmFyIGJhY2sgaW50byBGQUJcclxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBvYmplY3QgalF1ZXJ5IG9iamVjdFxyXG4gICAqL1xyXG4gIHZhciB0b29sYmFyVG9GQUIgPSBmdW5jdGlvbihidG4pIHtcclxuICAgIGlmIChidG4uYXR0cignZGF0YS1vcGVuJykgIT09IFwidHJ1ZVwiKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgb2Zmc2V0WCwgb2Zmc2V0WSwgc2NhbGVGYWN0b3I7XHJcbiAgICB2YXIgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgIHZhciB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICB2YXIgYnRuV2lkdGggPSBidG4uYXR0cignZGF0YS1vcmlnaW4td2lkdGgnKTtcclxuICAgIHZhciBidG5Cb3R0b20gPSBidG4uYXR0cignZGF0YS1vcmlnaW4tYm90dG9tJyk7XHJcbiAgICB2YXIgYnRuTGVmdCA9IGJ0bi5hdHRyKCdkYXRhLW9yaWdpbi1sZWZ0Jyk7XHJcbiAgICB2YXIgYW5jaG9yID0gYnRuLmZpbmQoJz4gLmJ0bi1mbG9hdGluZycpLmZpcnN0KCk7XHJcbiAgICB2YXIgbWVudSA9IGJ0bi5maW5kKCc+IHVsJykuZmlyc3QoKTtcclxuICAgIHZhciBiYWNrZHJvcCA9IGJ0bi5maW5kKCcuZmFiLWJhY2tkcm9wJyk7XHJcbiAgICB2YXIgZmFiQ29sb3IgPSBhbmNob3IuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJyk7XHJcblxyXG4gICAgb2Zmc2V0WCA9IGJ0bkxlZnQgLSAod2luZG93V2lkdGggLyAyKSArIChidG5XaWR0aCAvIDIpO1xyXG4gICAgb2Zmc2V0WSA9IHdpbmRvd0hlaWdodCAtIGJ0bkJvdHRvbTtcclxuICAgIHNjYWxlRmFjdG9yID0gd2luZG93V2lkdGggLyBiYWNrZHJvcC53aWR0aCgpO1xyXG5cclxuXHJcbiAgICAvLyBIaWRlIGJhY2tkcm9wXHJcbiAgICBidG4ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgYnRuLmF0dHIoJ2RhdGEtb3BlbicsIGZhbHNlKTtcclxuICAgIGJ0bi5jc3Moe1xyXG4gICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICd0cmFuc3BhcmVudCcsXHJcbiAgICAgIHRyYW5zaXRpb246ICdub25lJ1xyXG4gICAgfSk7XHJcbiAgICBhbmNob3IuY3NzKHtcclxuICAgICAgdHJhbnNpdGlvbjogJ25vbmUnXHJcbiAgICB9KTtcclxuICAgIGJhY2tkcm9wLmNzcyh7XHJcbiAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDApJyxcclxuICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBmYWJDb2xvclxyXG4gICAgfSk7XHJcbiAgICBtZW51LmZpbmQoJz4gbGkgPiBhJykuY3NzKHtcclxuICAgICAgb3BhY2l0eTogJydcclxuICAgIH0pO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGJhY2tkcm9wLnJlbW92ZSgpO1xyXG5cclxuICAgICAgLy8gU2V0IGluaXRpYWwgc3RhdGUuXHJcbiAgICAgIGJ0bi5jc3Moe1xyXG4gICAgICAgICd0ZXh0LWFsaWduJzogJycsXHJcbiAgICAgICAgd2lkdGg6ICcnLFxyXG4gICAgICAgIGJvdHRvbTogJycsXHJcbiAgICAgICAgbGVmdDogJycsXHJcbiAgICAgICAgb3ZlcmZsb3c6ICcnLFxyXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJycsXHJcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoJyArIC1vZmZzZXRYICsgJ3B4LDAsMCknXHJcbiAgICAgIH0pO1xyXG4gICAgICBhbmNob3IuY3NzKHtcclxuICAgICAgICBvdmVyZmxvdzogJycsXHJcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwnICsgb2Zmc2V0WSArICdweCwwKSdcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGJ0bi5jc3Moe1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwwLDApJyxcclxuICAgICAgICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gLjJzJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFuY2hvci5jc3Moe1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwwLDApJyxcclxuICAgICAgICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gLjJzIGN1YmljLWJlemllcigwLjU1MCwgMC4wNTUsIDAuNjc1LCAwLjE5MCknXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sIDIwKTtcclxuICAgIH0sIDIwMCk7XHJcbiAgfTtcclxuXHJcblxyXG59KCBqUXVlcnkgKSk7XHJcblxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgLy8gSW1hZ2UgdHJhbnNpdGlvbiBmdW5jdGlvblxyXG4gIE1hdGVyaWFsaXplLmZhZGVJbkltYWdlID0gZnVuY3Rpb24oc2VsZWN0b3JPckVsKSB7XHJcbiAgICB2YXIgZWxlbWVudDtcclxuICAgIGlmICh0eXBlb2Yoc2VsZWN0b3JPckVsKSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgZWxlbWVudCA9ICQoc2VsZWN0b3JPckVsKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mKHNlbGVjdG9yT3JFbCkgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGVsZW1lbnQgPSBzZWxlY3Rvck9yRWw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBlbGVtZW50LmNzcyh7b3BhY2l0eTogMH0pO1xyXG4gICAgJChlbGVtZW50KS52ZWxvY2l0eSh7b3BhY2l0eTogMX0sIHtcclxuICAgICAgZHVyYXRpb246IDY1MCxcclxuICAgICAgcXVldWU6IGZhbHNlLFxyXG4gICAgICBlYXNpbmc6ICdlYXNlT3V0U2luZSdcclxuICAgIH0pO1xyXG4gICAgJChlbGVtZW50KS52ZWxvY2l0eSh7b3BhY2l0eTogMX0sIHtcclxuICAgICAgZHVyYXRpb246IDEzMDAsXHJcbiAgICAgIHF1ZXVlOiBmYWxzZSxcclxuICAgICAgZWFzaW5nOiAnc3dpbmcnLFxyXG4gICAgICBzdGVwOiBmdW5jdGlvbihub3csIGZ4KSB7XHJcbiAgICAgICAgZnguc3RhcnQgPSAxMDA7XHJcbiAgICAgICAgdmFyIGdyYXlzY2FsZV9zZXR0aW5nID0gbm93LzEwMDtcclxuICAgICAgICB2YXIgYnJpZ2h0bmVzc19zZXR0aW5nID0gMTUwIC0gKDEwMCAtIG5vdykvMS43NTtcclxuXHJcbiAgICAgICAgaWYgKGJyaWdodG5lc3Nfc2V0dGluZyA8IDEwMCkge1xyXG4gICAgICAgICAgYnJpZ2h0bmVzc19zZXR0aW5nID0gMTAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobm93ID49IDApIHtcclxuICAgICAgICAgICQodGhpcykuY3NzKHtcclxuICAgICAgICAgICAgICBcIi13ZWJraXQtZmlsdGVyXCI6IFwiZ3JheXNjYWxlKFwiK2dyYXlzY2FsZV9zZXR0aW5nK1wiKVwiICsgXCJicmlnaHRuZXNzKFwiK2JyaWdodG5lc3Nfc2V0dGluZytcIiUpXCIsXHJcbiAgICAgICAgICAgICAgXCJmaWx0ZXJcIjogXCJncmF5c2NhbGUoXCIrZ3JheXNjYWxlX3NldHRpbmcrXCIpXCIgKyBcImJyaWdodG5lc3MoXCIrYnJpZ2h0bmVzc19zZXR0aW5nK1wiJSlcIlxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAvLyBIb3Jpem9udGFsIHN0YWdnZXJlZCBsaXN0XHJcbiAgTWF0ZXJpYWxpemUuc2hvd1N0YWdnZXJlZExpc3QgPSBmdW5jdGlvbihzZWxlY3Rvck9yRWwpIHtcclxuICAgIHZhciBlbGVtZW50O1xyXG4gICAgaWYgKHR5cGVvZihzZWxlY3Rvck9yRWwpID09PSAnc3RyaW5nJykge1xyXG4gICAgICBlbGVtZW50ID0gJChzZWxlY3Rvck9yRWwpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2Yoc2VsZWN0b3JPckVsKSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgZWxlbWVudCA9IHNlbGVjdG9yT3JFbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciB0aW1lID0gMDtcclxuICAgIGVsZW1lbnQuZmluZCgnbGknKS52ZWxvY2l0eShcclxuICAgICAgICB7IHRyYW5zbGF0ZVg6IFwiLTEwMHB4XCJ9LFxyXG4gICAgICAgIHsgZHVyYXRpb246IDAgfSk7XHJcblxyXG4gICAgZWxlbWVudC5maW5kKCdsaScpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICQodGhpcykudmVsb2NpdHkoXHJcbiAgICAgICAgeyBvcGFjaXR5OiBcIjFcIiwgdHJhbnNsYXRlWDogXCIwXCJ9LFxyXG4gICAgICAgIHsgZHVyYXRpb246IDgwMCwgZGVsYXk6IHRpbWUsIGVhc2luZzogWzYwLCAxMF0gfSk7XHJcbiAgICAgIHRpbWUgKz0gMTIwO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcblxyXG4gICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gSGFyZGNvZGVkIC5zdGFnZ2VyZWQtbGlzdCBzY3JvbGxGaXJlXHJcbiAgICAvLyB2YXIgc3RhZ2dlcmVkTGlzdE9wdGlvbnMgPSBbXTtcclxuICAgIC8vICQoJ3VsLnN0YWdnZXJlZC1saXN0JykuZWFjaChmdW5jdGlvbiAoaSkge1xyXG5cclxuICAgIC8vICAgdmFyIGxhYmVsID0gJ3Njcm9sbEZpcmUtJyArIGk7XHJcbiAgICAvLyAgICQodGhpcykuYWRkQ2xhc3MobGFiZWwpO1xyXG4gICAgLy8gICBzdGFnZ2VyZWRMaXN0T3B0aW9ucy5wdXNoKFxyXG4gICAgLy8gICAgIHtzZWxlY3RvcjogJ3VsLnN0YWdnZXJlZC1saXN0LicgKyBsYWJlbCxcclxuICAgIC8vICAgICAgb2Zmc2V0OiAyMDAsXHJcbiAgICAvLyAgICAgIGNhbGxiYWNrOiAnc2hvd1N0YWdnZXJlZExpc3QoXCJ1bC5zdGFnZ2VyZWQtbGlzdC4nICsgbGFiZWwgKyAnXCIpJ30pO1xyXG4gICAgLy8gfSk7XHJcbiAgICAvLyBzY3JvbGxGaXJlKHN0YWdnZXJlZExpc3RPcHRpb25zKTtcclxuXHJcbiAgICAvLyBIYW1tZXJKUywgU3dpcGUgbmF2aWdhdGlvblxyXG5cclxuICAgIC8vIFRvdWNoIEV2ZW50XHJcbiAgICB2YXIgc3dpcGVMZWZ0ID0gZmFsc2U7XHJcbiAgICB2YXIgc3dpcGVSaWdodCA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICAvLyBEaXNtaXNzaWJsZSBDb2xsZWN0aW9uc1xyXG4gICAgJCgnLmRpc21pc3NhYmxlJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgJCh0aGlzKS5oYW1tZXIoe1xyXG4gICAgICAgIHByZXZlbnRfZGVmYXVsdDogZmFsc2VcclxuICAgICAgfSkub24oJ3BhbicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5nZXN0dXJlLnBvaW50ZXJUeXBlID09PSBcInRvdWNoXCIpIHtcclxuICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gZS5nZXN0dXJlLmRpcmVjdGlvbjtcclxuICAgICAgICAgIHZhciB4ID0gZS5nZXN0dXJlLmRlbHRhWDtcclxuICAgICAgICAgIHZhciB2ZWxvY2l0eVggPSBlLmdlc3R1cmUudmVsb2NpdHlYO1xyXG5cclxuICAgICAgICAgICR0aGlzLnZlbG9jaXR5KHsgdHJhbnNsYXRlWDogeFxyXG4gICAgICAgICAgICAgIH0sIHtkdXJhdGlvbjogNTAsIHF1ZXVlOiBmYWxzZSwgZWFzaW5nOiAnZWFzZU91dFF1YWQnfSk7XHJcblxyXG4gICAgICAgICAgLy8gU3dpcGUgTGVmdFxyXG4gICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gNCAmJiAoeCA+ICgkdGhpcy5pbm5lcldpZHRoKCkgLyAyKSB8fCB2ZWxvY2l0eVggPCAtMC43NSkpIHtcclxuICAgICAgICAgICAgc3dpcGVMZWZ0ID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBTd2lwZSBSaWdodFxyXG4gICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gMiAmJiAoeCA8ICgtMSAqICR0aGlzLmlubmVyV2lkdGgoKSAvIDIpIHx8IHZlbG9jaXR5WCA+IDAuNzUpKSB7XHJcbiAgICAgICAgICAgIHN3aXBlUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSkub24oJ3BhbmVuZCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAvLyBSZXNldCBpZiBjb2xsZWN0aW9uIGlzIG1vdmVkIGJhY2sgaW50byBvcmlnaW5hbCBwb3NpdGlvblxyXG4gICAgICAgIGlmIChNYXRoLmFicyhlLmdlc3R1cmUuZGVsdGFYKSA8ICgkKHRoaXMpLmlubmVyV2lkdGgoKSAvIDIpKSB7XHJcbiAgICAgICAgICBzd2lwZVJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICBzd2lwZUxlZnQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlLmdlc3R1cmUucG9pbnRlclR5cGUgPT09IFwidG91Y2hcIikge1xyXG4gICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgIGlmIChzd2lwZUxlZnQgfHwgc3dpcGVSaWdodCkge1xyXG4gICAgICAgICAgICB2YXIgZnVsbFdpZHRoO1xyXG4gICAgICAgICAgICBpZiAoc3dpcGVMZWZ0KSB7IGZ1bGxXaWR0aCA9ICR0aGlzLmlubmVyV2lkdGgoKTsgfVxyXG4gICAgICAgICAgICBlbHNlIHsgZnVsbFdpZHRoID0gLTEgKiAkdGhpcy5pbm5lcldpZHRoKCk7IH1cclxuXHJcbiAgICAgICAgICAgICR0aGlzLnZlbG9jaXR5KHsgdHJhbnNsYXRlWDogZnVsbFdpZHRoLFxyXG4gICAgICAgICAgICAgIH0sIHtkdXJhdGlvbjogMTAwLCBxdWV1ZTogZmFsc2UsIGVhc2luZzogJ2Vhc2VPdXRRdWFkJywgY29tcGxldGU6XHJcbiAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkdGhpcy5jc3MoJ2JvcmRlcicsICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICAkdGhpcy52ZWxvY2l0eSh7IGhlaWdodDogMCwgcGFkZGluZzogMCxcclxuICAgICAgICAgICAgICAgICAgfSwge2R1cmF0aW9uOiAyMDAsIHF1ZXVlOiBmYWxzZSwgZWFzaW5nOiAnZWFzZU91dFF1YWQnLCBjb21wbGV0ZTpcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHsgJHRoaXMucmVtb3ZlKCk7IH1cclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAkdGhpcy52ZWxvY2l0eSh7IHRyYW5zbGF0ZVg6IDAsXHJcbiAgICAgICAgICAgICAgfSwge2R1cmF0aW9uOiAxMDAsIHF1ZXVlOiBmYWxzZSwgZWFzaW5nOiAnZWFzZU91dFF1YWQnfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzd2lwZUxlZnQgPSBmYWxzZTtcclxuICAgICAgICAgIHN3aXBlUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvLyB0aW1lID0gMFxyXG4gICAgLy8gLy8gVmVydGljYWwgU3RhZ2dlcmVkIGxpc3RcclxuICAgIC8vICQoJ3VsLnN0YWdnZXJlZC1saXN0LnZlcnRpY2FsIGxpJykudmVsb2NpdHkoXHJcbiAgICAvLyAgICAgeyB0cmFuc2xhdGVZOiBcIjEwMHB4XCJ9LFxyXG4gICAgLy8gICAgIHsgZHVyYXRpb246IDAgfSk7XHJcblxyXG4gICAgLy8gJCgndWwuc3RhZ2dlcmVkLWxpc3QudmVydGljYWwgbGknKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICAkKHRoaXMpLnZlbG9jaXR5KFxyXG4gICAgLy8gICAgIHsgb3BhY2l0eTogXCIxXCIsIHRyYW5zbGF0ZVk6IFwiMFwifSxcclxuICAgIC8vICAgICB7IGR1cmF0aW9uOiA4MDAsIGRlbGF5OiB0aW1lLCBlYXNpbmc6IFs2MCwgMjVdIH0pO1xyXG4gICAgLy8gICB0aW1lICs9IDEyMDtcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIC8vIC8vIEZhZGUgaW4gYW5kIFNjYWxlXHJcbiAgICAvLyAkKCcuZmFkZS1pbi5zY2FsZScpLnZlbG9jaXR5KFxyXG4gICAgLy8gICAgIHsgc2NhbGVYOiAuNCwgc2NhbGVZOiAuNCwgdHJhbnNsYXRlWDogLTYwMH0sXHJcbiAgICAvLyAgICAgeyBkdXJhdGlvbjogMH0pO1xyXG4gICAgLy8gJCgnLmZhZGUtaW4nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICAkKHRoaXMpLnZlbG9jaXR5KFxyXG4gICAgLy8gICAgIHsgb3BhY2l0eTogXCIxXCIsIHNjYWxlWDogMSwgc2NhbGVZOiAxLCB0cmFuc2xhdGVYOiAwfSxcclxuICAgIC8vICAgICB7IGR1cmF0aW9uOiA4MDAsIGVhc2luZzogWzYwLCAxMF0gfSk7XHJcbiAgICAvLyB9KTtcclxuICB9KTtcclxufSggalF1ZXJ5ICkpO1xyXG5cbihmdW5jdGlvbigkKSB7XHJcblxyXG4gIHZhciBzY3JvbGxGaXJlRXZlbnRzSGFuZGxlZCA9IGZhbHNlO1xyXG5cclxuICAvLyBJbnB1dDogQXJyYXkgb2YgSlNPTiBvYmplY3RzIHtzZWxlY3Rvciwgb2Zmc2V0LCBjYWxsYmFja31cclxuICBNYXRlcmlhbGl6ZS5zY3JvbGxGaXJlID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgdmFyIG9uU2Nyb2xsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciB3aW5kb3dTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQgKyB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMCA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gR2V0IG9wdGlvbnMgZnJvbSBlYWNoIGxpbmVcclxuICAgICAgICB2YXIgdmFsdWUgPSBvcHRpb25zW2ldO1xyXG4gICAgICAgIHZhciBzZWxlY3RvciA9IHZhbHVlLnNlbGVjdG9yLFxyXG4gICAgICAgICAgICBvZmZzZXQgPSB2YWx1ZS5vZmZzZXQsXHJcbiAgICAgICAgICAgIGNhbGxiYWNrID0gdmFsdWUuY2FsbGJhY2s7XHJcblxyXG4gICAgICAgIHZhciBjdXJyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgICAgIGlmICggY3VycmVudEVsZW1lbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgIHZhciBlbGVtZW50T2Zmc2V0ID0gY3VycmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cclxuICAgICAgICAgIGlmICh3aW5kb3dTY3JvbGwgPiAoZWxlbWVudE9mZnNldCArIG9mZnNldCkpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLmRvbmUgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgICBpZiAodHlwZW9mKGNhbGxiYWNrKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBjdXJyZW50RWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YoY2FsbGJhY2spID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrRnVuYyA9IG5ldyBGdW5jdGlvbihjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja0Z1bmMoY3VycmVudEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB2YWx1ZS5kb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdmFyIHRocm90dGxlZFNjcm9sbCA9IE1hdGVyaWFsaXplLnRocm90dGxlKGZ1bmN0aW9uKCkge1xyXG4gICAgICBvblNjcm9sbCgpO1xyXG4gICAgfSwgb3B0aW9ucy50aHJvdHRsZSB8fCAxMDApO1xyXG5cclxuICAgIGlmICghc2Nyb2xsRmlyZUV2ZW50c0hhbmRsZWQpIHtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhyb3R0bGVkU2Nyb2xsKTtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhyb3R0bGVkU2Nyb2xsKTtcclxuICAgICAgc2Nyb2xsRmlyZUV2ZW50c0hhbmRsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHBlcmZvcm0gYSBzY2FuIG9uY2UsIGFmdGVyIGN1cnJlbnQgZXhlY3V0aW9uIGNvbnRleHQsIGFuZCBhZnRlciBkb20gaXMgcmVhZHlcclxuICAgIHNldFRpbWVvdXQodGhyb3R0bGVkU2Nyb2xsLCAwKTtcclxuICB9O1xyXG5cclxufSkoalF1ZXJ5KTtcclxuXG4vKiFcclxuICogcGlja2FkYXRlLmpzIHYzLjUuMCwgMjAxNC8wNC8xM1xyXG4gKiBCeSBBbXN1bCwgaHR0cDovL2Ftc3VsLmNhXHJcbiAqIEhvc3RlZCBvbiBodHRwOi8vYW1zdWwuZ2l0aHViLmlvL3BpY2thZGF0ZS5qc1xyXG4gKiBMaWNlbnNlZCB1bmRlciBNSVRcclxuICovXHJcblxyXG4oZnVuY3Rpb24gKCBmYWN0b3J5ICkge1xyXG5cclxuICAgIE1hdGVyaWFsaXplLlBpY2tlciA9IGZhY3RvcnkoIGpRdWVyeSApXHJcblxyXG59KGZ1bmN0aW9uKCAkICkge1xyXG5cclxudmFyICR3aW5kb3cgPSAkKCB3aW5kb3cgKVxyXG52YXIgJGRvY3VtZW50ID0gJCggZG9jdW1lbnQgKVxyXG52YXIgJGh0bWwgPSAkKCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgKVxyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgcGlja2VyIGNvbnN0cnVjdG9yIHRoYXQgY3JlYXRlcyBhIGJsYW5rIHBpY2tlci5cclxuICovXHJcbmZ1bmN0aW9uIFBpY2tlckNvbnN0cnVjdG9yKCBFTEVNRU5ULCBOQU1FLCBDT01QT05FTlQsIE9QVElPTlMgKSB7XHJcblxyXG4gICAgLy8gSWYgdGhlcmXigJlzIG5vIGVsZW1lbnQsIHJldHVybiB0aGUgcGlja2VyIGNvbnN0cnVjdG9yLlxyXG4gICAgaWYgKCAhRUxFTUVOVCApIHJldHVybiBQaWNrZXJDb25zdHJ1Y3RvclxyXG5cclxuXHJcbiAgICB2YXJcclxuICAgICAgICBJU19ERUZBVUxUX1RIRU1FID0gZmFsc2UsXHJcblxyXG5cclxuICAgICAgICAvLyBUaGUgc3RhdGUgb2YgdGhlIHBpY2tlci5cclxuICAgICAgICBTVEFURSA9IHtcclxuICAgICAgICAgICAgaWQ6IEVMRU1FTlQuaWQgfHwgJ1AnICsgTWF0aC5hYnMoIH5+KE1hdGgucmFuZG9tKCkgKiBuZXcgRGF0ZSgpKSApXHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8vIE1lcmdlIHRoZSBkZWZhdWx0cyBhbmQgb3B0aW9ucyBwYXNzZWQuXHJcbiAgICAgICAgU0VUVElOR1MgPSBDT01QT05FTlQgPyAkLmV4dGVuZCggdHJ1ZSwge30sIENPTVBPTkVOVC5kZWZhdWx0cywgT1BUSU9OUyApIDogT1BUSU9OUyB8fCB7fSxcclxuXHJcblxyXG4gICAgICAgIC8vIE1lcmdlIHRoZSBkZWZhdWx0IGNsYXNzZXMgd2l0aCB0aGUgc2V0dGluZ3MgY2xhc3Nlcy5cclxuICAgICAgICBDTEFTU0VTID0gJC5leHRlbmQoIHt9LCBQaWNrZXJDb25zdHJ1Y3Rvci5rbGFzc2VzKCksIFNFVFRJTkdTLmtsYXNzICksXHJcblxyXG5cclxuICAgICAgICAvLyBUaGUgZWxlbWVudCBub2RlIHdyYXBwZXIgaW50byBhIGpRdWVyeSBvYmplY3QuXHJcbiAgICAgICAgJEVMRU1FTlQgPSAkKCBFTEVNRU5UICksXHJcblxyXG5cclxuICAgICAgICAvLyBQc2V1ZG8gcGlja2VyIGNvbnN0cnVjdG9yLlxyXG4gICAgICAgIFBpY2tlckluc3RhbmNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXJ0KClcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gVGhlIHBpY2tlciBwcm90b3R5cGUuXHJcbiAgICAgICAgUCA9IFBpY2tlckluc3RhbmNlLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yOiBQaWNrZXJJbnN0YW5jZSxcclxuXHJcbiAgICAgICAgICAgICRub2RlOiAkRUxFTUVOVCxcclxuXHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogSW5pdGlhbGl6ZSBldmVyeXRoaW5nXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzdGFydDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgaXTigJlzIGFscmVhZHkgc3RhcnRlZCwgZG8gbm90aGluZy5cclxuICAgICAgICAgICAgICAgIGlmICggU1RBVEUgJiYgU1RBVEUuc3RhcnQgKSByZXR1cm4gUFxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHBpY2tlciBzdGF0ZXMuXHJcbiAgICAgICAgICAgICAgICBTVEFURS5tZXRob2RzID0ge31cclxuICAgICAgICAgICAgICAgIFNUQVRFLnN0YXJ0ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgU1RBVEUub3BlbiA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBTVEFURS50eXBlID0gRUxFTUVOVC50eXBlXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENvbmZpcm0gZm9jdXMgc3RhdGUsIGNvbnZlcnQgaW50byB0ZXh0IGlucHV0IHRvIHJlbW92ZSBVQSBzdHlsaW5ncyxcclxuICAgICAgICAgICAgICAgIC8vIGFuZCBzZXQgYXMgcmVhZG9ubHkgdG8gcHJldmVudCBrZXlib2FyZCBwb3B1cC5cclxuICAgICAgICAgICAgICAgIEVMRU1FTlQuYXV0b2ZvY3VzID0gRUxFTUVOVCA9PSBnZXRBY3RpdmVFbGVtZW50KClcclxuICAgICAgICAgICAgICAgIEVMRU1FTlQucmVhZE9ubHkgPSAhU0VUVElOR1MuZWRpdGFibGVcclxuICAgICAgICAgICAgICAgIEVMRU1FTlQuaWQgPSBFTEVNRU5ULmlkIHx8IFNUQVRFLmlkXHJcbiAgICAgICAgICAgICAgICBpZiAoIEVMRU1FTlQudHlwZSAhPSAndGV4dCcgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRUxFTUVOVC50eXBlID0gJ3RleHQnXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyBwaWNrZXIgY29tcG9uZW50IHdpdGggdGhlIHNldHRpbmdzLlxyXG4gICAgICAgICAgICAgICAgUC5jb21wb25lbnQgPSBuZXcgQ09NUE9ORU5UKFAsIFNFVFRJTkdTKVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgdGhlIHBpY2tlciByb290IHdpdGggYSBob2xkZXIgYW5kIHRoZW4gcHJlcGFyZSBpdC5cclxuICAgICAgICAgICAgICAgIFAuJHJvb3QgPSAkKCBQaWNrZXJDb25zdHJ1Y3Rvci5fLm5vZGUoJ2RpdicsIGNyZWF0ZVdyYXBwZWRDb21wb25lbnQoKSwgQ0xBU1NFUy5waWNrZXIsICdpZD1cIicgKyBFTEVNRU5ULmlkICsgJ19yb290XCIgdGFiaW5kZXg9XCIwXCInKSApXHJcbiAgICAgICAgICAgICAgICBwcmVwYXJlRWxlbWVudFJvb3QoKVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZeKAmXMgYSBmb3JtYXQgZm9yIHRoZSBoaWRkZW4gaW5wdXQgZWxlbWVudCwgY3JlYXRlIHRoZSBlbGVtZW50LlxyXG4gICAgICAgICAgICAgICAgaWYgKCBTRVRUSU5HUy5mb3JtYXRTdWJtaXQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlcGFyZUVsZW1lbnRIaWRkZW4oKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQcmVwYXJlIHRoZSBpbnB1dCBlbGVtZW50LlxyXG4gICAgICAgICAgICAgICAgcHJlcGFyZUVsZW1lbnQoKVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJbnNlcnQgdGhlIHJvb3QgYXMgc3BlY2lmaWVkIGluIHRoZSBzZXR0aW5ncy5cclxuICAgICAgICAgICAgICAgIGlmICggU0VUVElOR1MuY29udGFpbmVyICkgJCggU0VUVElOR1MuY29udGFpbmVyICkuYXBwZW5kKCBQLiRyb290IClcclxuICAgICAgICAgICAgICAgIGVsc2UgJEVMRU1FTlQuYmVmb3JlKCBQLiRyb290IClcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQmluZCB0aGUgZGVmYXVsdCBjb21wb25lbnQgYW5kIHNldHRpbmdzIGV2ZW50cy5cclxuICAgICAgICAgICAgICAgIFAub24oe1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBQLmNvbXBvbmVudC5vblN0YXJ0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcjogUC5jb21wb25lbnQub25SZW5kZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcDogUC5jb21wb25lbnQub25TdG9wLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW46IFAuY29tcG9uZW50Lm9uT3BlbixcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZTogUC5jb21wb25lbnQub25DbG9zZSxcclxuICAgICAgICAgICAgICAgICAgICBzZXQ6IFAuY29tcG9uZW50Lm9uU2V0XHJcbiAgICAgICAgICAgICAgICB9KS5vbih7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IFNFVFRJTkdTLm9uU3RhcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyOiBTRVRUSU5HUy5vblJlbmRlcixcclxuICAgICAgICAgICAgICAgICAgICBzdG9wOiBTRVRUSU5HUy5vblN0b3AsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbjogU0VUVElOR1Mub25PcGVuLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlOiBTRVRUSU5HUy5vbkNsb3NlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldDogU0VUVElOR1Mub25TZXRcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vIE9uY2Ugd2XigJlyZSBhbGwgc2V0LCBjaGVjayB0aGUgdGhlbWUgaW4gdXNlLlxyXG4gICAgICAgICAgICAgICAgSVNfREVGQVVMVF9USEVNRSA9IGlzVXNpbmdEZWZhdWx0VGhlbWUoIFAuJHJvb3QuY2hpbGRyZW4oKVsgMCBdIClcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGVsZW1lbnQgaGFzIGF1dG9mb2N1cywgb3BlbiB0aGUgcGlja2VyLlxyXG4gICAgICAgICAgICAgICAgaWYgKCBFTEVNRU5ULmF1dG9mb2N1cyApIHtcclxuICAgICAgICAgICAgICAgICAgICBQLm9wZW4oKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIHF1ZXVlZCB0aGUg4oCcc3RhcnTigJ0gYW5kIOKAnHJlbmRlcuKAnSBldmVudHMuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUC50cmlnZ2VyKCAnc3RhcnQnICkudHJpZ2dlciggJ3JlbmRlcicgKVxyXG4gICAgICAgICAgICB9LCAvL3N0YXJ0XHJcblxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFJlbmRlciBhIG5ldyBwaWNrZXJcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHJlbmRlcjogZnVuY3Rpb24oIGVudGlyZUNvbXBvbmVudCApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJbnNlcnQgYSBuZXcgY29tcG9uZW50IGhvbGRlciBpbiB0aGUgcm9vdCBvciBib3guXHJcbiAgICAgICAgICAgICAgICBpZiAoIGVudGlyZUNvbXBvbmVudCApIFAuJHJvb3QuaHRtbCggY3JlYXRlV3JhcHBlZENvbXBvbmVudCgpIClcclxuICAgICAgICAgICAgICAgIGVsc2UgUC4kcm9vdC5maW5kKCAnLicgKyBDTEFTU0VTLmJveCApLmh0bWwoIFAuY29tcG9uZW50Lm5vZGVzKCBTVEFURS5vcGVuICkgKVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgdGhlIHF1ZXVlZCDigJxyZW5kZXLigJ0gZXZlbnRzLlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFAudHJpZ2dlciggJ3JlbmRlcicgKVxyXG4gICAgICAgICAgICB9LCAvL3JlbmRlclxyXG5cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBEZXN0cm95IGV2ZXJ5dGhpbmdcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIGl04oCZcyBhbHJlYWR5IHN0b3BwZWQsIGRvIG5vdGhpbmcuXHJcbiAgICAgICAgICAgICAgICBpZiAoICFTVEFURS5zdGFydCApIHJldHVybiBQXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVGhlbiBjbG9zZSB0aGUgcGlja2VyLlxyXG4gICAgICAgICAgICAgICAgUC5jbG9zZSgpXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBoaWRkZW4gZmllbGQuXHJcbiAgICAgICAgICAgICAgICBpZiAoIFAuX2hpZGRlbiApIHtcclxuICAgICAgICAgICAgICAgICAgICBQLl9oaWRkZW4ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggUC5faGlkZGVuIClcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHJvb3QuXHJcbiAgICAgICAgICAgICAgICBQLiRyb290LnJlbW92ZSgpXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBpbnB1dCBjbGFzcywgcmVtb3ZlIHRoZSBzdG9yZWQgZGF0YSwgYW5kIHVuYmluZFxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIGV2ZW50cyAoYWZ0ZXIgYSB0aWNrIGZvciBJRSAtIHNlZSBgUC5jbG9zZWApLlxyXG4gICAgICAgICAgICAgICAgJEVMRU1FTlQucmVtb3ZlQ2xhc3MoIENMQVNTRVMuaW5wdXQgKS5yZW1vdmVEYXRhKCBOQU1FIClcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRFTEVNRU5ULm9mZiggJy4nICsgU1RBVEUuaWQgKVxyXG4gICAgICAgICAgICAgICAgfSwgMClcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIHRoZSBlbGVtZW50IHN0YXRlXHJcbiAgICAgICAgICAgICAgICBFTEVNRU5ULnR5cGUgPSBTVEFURS50eXBlXHJcbiAgICAgICAgICAgICAgICBFTEVNRU5ULnJlYWRPbmx5ID0gZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIHRoZSBxdWV1ZWQg4oCcc3RvcOKAnSBldmVudHMuXHJcbiAgICAgICAgICAgICAgICBQLnRyaWdnZXIoICdzdG9wJyApXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVzZXQgdGhlIHBpY2tlciBzdGF0ZXMuXHJcbiAgICAgICAgICAgICAgICBTVEFURS5tZXRob2RzID0ge31cclxuICAgICAgICAgICAgICAgIFNUQVRFLnN0YXJ0ID0gZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUFxyXG4gICAgICAgICAgICB9LCAvL3N0b3BcclxuXHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogT3BlbiB1cCB0aGUgcGlja2VyXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBvcGVuOiBmdW5jdGlvbiggZG9udEdpdmVGb2N1cyApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBpdOKAmXMgYWxyZWFkeSBvcGVuLCBkbyBub3RoaW5nLlxyXG4gICAgICAgICAgICAgICAgaWYgKCBTVEFURS5vcGVuICkgcmV0dXJuIFBcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIOKAnGFjdGl2ZeKAnSBjbGFzcy5cclxuICAgICAgICAgICAgICAgICRFTEVNRU5ULmFkZENsYXNzKCBDTEFTU0VTLmFjdGl2ZSApXHJcbiAgICAgICAgICAgICAgICBhcmlhKCBFTEVNRU5ULCAnZXhwYW5kZWQnLCB0cnVlIClcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAqIEEgRmlyZWZveCBidWcsIHdoZW4gYGh0bWxgIGhhcyBgb3ZlcmZsb3c6aGlkZGVuYCwgcmVzdWx0cyBpblxyXG4gICAgICAgICAgICAgICAgLy8gICBraWxsaW5nIHRyYW5zaXRpb25zIDooLiBTbyBhZGQgdGhlIOKAnG9wZW5lZOKAnSBzdGF0ZSBvbiB0aGUgbmV4dCB0aWNrLlxyXG4gICAgICAgICAgICAgICAgLy8gICBCdWc6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTYyNTI4OVxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUg4oCcb3BlbmVk4oCdIGNsYXNzIHRvIHRoZSBwaWNrZXIgcm9vdC5cclxuICAgICAgICAgICAgICAgICAgICBQLiRyb290LmFkZENsYXNzKCBDTEFTU0VTLm9wZW5lZCApXHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYSggUC4kcm9vdFswXSwgJ2hpZGRlbicsIGZhbHNlIClcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAwIClcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIHRvIGdpdmUgZm9jdXMsIGJpbmQgdGhlIGVsZW1lbnQgYW5kIGRvYyBldmVudHMuXHJcbiAgICAgICAgICAgICAgICBpZiAoIGRvbnRHaXZlRm9jdXMgIT09IGZhbHNlICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgaXQgYXMgb3Blbi5cclxuICAgICAgICAgICAgICAgICAgICBTVEFURS5vcGVuID0gdHJ1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IHRoZSBwYWdlIGZyb20gc2Nyb2xsaW5nLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggSVNfREVGQVVMVF9USEVNRSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGh0bWwuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3MoICdvdmVyZmxvdycsICdoaWRkZW4nICkuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3MoICdwYWRkaW5nLXJpZ2h0JywgJys9JyArIGdldFNjcm9sbGJhcldpZHRoKCkgKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUGFzcyBmb2N1cyB0byB0aGUgcm9vdCBlbGVtZW504oCZcyBqUXVlcnkgb2JqZWN0LlxyXG4gICAgICAgICAgICAgICAgICAgIC8vICogV29ya2Fyb3VuZCBmb3IgaU9TOCB0byBicmluZyB0aGUgcGlja2Vy4oCZcyByb290IGludG8gdmlldy5cclxuICAgICAgICAgICAgICAgICAgICBQLiRyb290LmVxKDApLmZvY3VzKClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQmluZCB0aGUgZG9jdW1lbnQgZXZlbnRzLlxyXG4gICAgICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbiggJ2NsaWNrLicgKyBTVEFURS5pZCArICcgZm9jdXNpbi4nICsgU1RBVEUuaWQsIGZ1bmN0aW9uKCBldmVudCApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSB0YXJnZXQgb2YgdGhlIGV2ZW50IGlzIG5vdCB0aGUgZWxlbWVudCwgY2xvc2UgdGhlIHBpY2tlciBwaWNrZXIuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICogRG9u4oCZdCB3b3JyeSBhYm91dCBjbGlja3Mgb3IgZm9jdXNpbnMgb24gdGhlIHJvb3QgYmVjYXVzZSB0aG9zZSBkb27igJl0IGJ1YmJsZSB1cC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBBbHNvLCBmb3IgRmlyZWZveCwgYSBjbGljayBvbiBhbiBgb3B0aW9uYCBlbGVtZW50IGJ1YmJsZXMgdXAgZGlyZWN0bHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICB0byB0aGUgZG9jLiBTbyBtYWtlIHN1cmUgdGhlIHRhcmdldCB3YXNuJ3QgdGhlIGRvYy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gKiBJbiBGaXJlZm94IHN0b3BQcm9wYWdhdGlvbigpIGRvZXNu4oCZdCBwcmV2ZW50IHJpZ2h0LWNsaWNrIGV2ZW50cyBmcm9tIGJ1YmJsaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHdoaWNoIGNhdXNlcyB0aGUgcGlja2VyIHRvIHVuZXhwZWN0ZWRseSBjbG9zZSB3aGVuIHJpZ2h0LWNsaWNraW5nIGl0LiBTbyBtYWtlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgc3VyZSB0aGUgZXZlbnQgd2FzbuKAmXQgYSByaWdodC1jbGljay5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB0YXJnZXQgIT0gRUxFTUVOVCAmJiB0YXJnZXQgIT0gZG9jdW1lbnQgJiYgZXZlbnQud2hpY2ggIT0gMyApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgdGFyZ2V0IHdhcyB0aGUgaG9sZGVyIHRoYXQgY292ZXJzIHRoZSBzY3JlZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBrZWVwIHRoZSBlbGVtZW50IGZvY3VzZWQgdG8gbWFpbnRhaW4gdGFiaW5kZXguXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQLmNsb3NlKCB0YXJnZXQgPT09IFAuJHJvb3QuY2hpbGRyZW4oKVswXSApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSkub24oICdrZXlkb3duLicgKyBTVEFURS5pZCwgZnVuY3Rpb24oIGV2ZW50ICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGtleWNvZGUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXljb2RlID0gZXZlbnQua2V5Q29kZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUcmFuc2xhdGUgdGhhdCB0byBhIHNlbGVjdGlvbiBjaGFuZ2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXljb2RlVG9Nb3ZlID0gUC5jb21wb25lbnQua2V5WyBrZXljb2RlIF0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gR3JhYiB0aGUgdGFyZ2V0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT24gZXNjYXBlLCBjbG9zZSB0aGUgcGlja2VyIGFuZCBnaXZlIGZvY3VzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGtleWNvZGUgPT0gMjcgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQLmNsb3NlKCB0cnVlIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZXJlIGlzIGEga2V5IG1vdmVtZW50IG9yIOKAnGVudGVy4oCdIGtleXByZXNzIG9uIHRoZSBlbGVtZW50LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICggdGFyZ2V0ID09IFAuJHJvb3RbMF0gJiYgKCBrZXljb2RlVG9Nb3ZlIHx8IGtleWNvZGUgPT0gMTMgKSApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IHRoZSBkZWZhdWx0IGFjdGlvbiB0byBzdG9wIHBhZ2UgbW92ZW1lbnQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlciB0aGUga2V5IG1vdmVtZW50IGFjdGlvbi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgga2V5Y29kZVRvTW92ZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQaWNrZXJDb25zdHJ1Y3Rvci5fLnRyaWdnZXIoIFAuY29tcG9uZW50LmtleS5nbywgUCwgWyBQaWNrZXJDb25zdHJ1Y3Rvci5fLnRyaWdnZXIoIGtleWNvZGVUb01vdmUgKSBdIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPbiDigJxlbnRlcuKAnSwgaWYgdGhlIGhpZ2hsaWdodGVkIGl0ZW0gaXNu4oCZdCBkaXNhYmxlZCwgc2V0IHRoZSB2YWx1ZSBhbmQgY2xvc2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICggIVAuJHJvb3QuZmluZCggJy4nICsgQ0xBU1NFUy5oaWdobGlnaHRlZCApLmhhc0NsYXNzKCBDTEFTU0VTLmRpc2FibGVkICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUC5zZXQoICdzZWxlY3QnLCBQLmNvbXBvbmVudC5pdGVtLmhpZ2hsaWdodCApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBTRVRUSU5HUy5jbG9zZU9uU2VsZWN0ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQLmNsb3NlKCB0cnVlIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgdGFyZ2V0IGlzIHdpdGhpbiB0aGUgcm9vdCBhbmQg4oCcZW50ZXLigJ0gaXMgcHJlc3NlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJldmVudCB0aGUgZGVmYXVsdCBhY3Rpb24gYW5kIHRyaWdnZXIgYSBjbGljayBvbiB0aGUgdGFyZ2V0IGluc3RlYWQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCAkLmNvbnRhaW5zKCBQLiRyb290WzBdLCB0YXJnZXQgKSAmJiBrZXljb2RlID09IDEzICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmNsaWNrKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVHJpZ2dlciB0aGUgcXVldWVkIOKAnG9wZW7igJ0gZXZlbnRzLlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFAudHJpZ2dlciggJ29wZW4nIClcclxuICAgICAgICAgICAgfSwgLy9vcGVuXHJcblxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIENsb3NlIHRoZSBwaWNrZXJcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGNsb3NlOiBmdW5jdGlvbiggZ2l2ZUZvY3VzICkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHdlIG5lZWQgdG8gZ2l2ZSBmb2N1cywgZG8gaXQgYmVmb3JlIGNoYW5naW5nIHN0YXRlcy5cclxuICAgICAgICAgICAgICAgIGlmICggZ2l2ZUZvY3VzICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIC4uLi5haCB5ZXMhIEl0IHdvdWxk4oCZdmUgYmVlbiBpbmNvbXBsZXRlIHdpdGhvdXQgYSBjcmF6eSB3b3JrYXJvdW5kIGZvciBJRSA6fFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBmb2N1cyBpcyB0cmlnZ2VyZWQgKmFmdGVyKiB0aGUgY2xvc2UgaGFzIGNvbXBsZXRlZCAtIGNhdXNpbmcgaXRcclxuICAgICAgICAgICAgICAgICAgICAvLyB0byBvcGVuIGFnYWluLiBTbyB1bmJpbmQgYW5kIHJlYmluZCB0aGUgZXZlbnQgYXQgdGhlIG5leHQgdGljay5cclxuICAgICAgICAgICAgICAgICAgICBQLiRyb290Lm9mZiggJ2ZvY3VzLnRvT3BlbicgKS5lcSgwKS5mb2N1cygpXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFAuJHJvb3Qub24oICdmb2N1cy50b09wZW4nLCBoYW5kbGVGb2N1c1RvT3BlbkV2ZW50IClcclxuICAgICAgICAgICAgICAgICAgICB9LCAwIClcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIOKAnGFjdGl2ZeKAnSBjbGFzcy5cclxuICAgICAgICAgICAgICAgICRFTEVNRU5ULnJlbW92ZUNsYXNzKCBDTEFTU0VTLmFjdGl2ZSApXHJcbiAgICAgICAgICAgICAgICBhcmlhKCBFTEVNRU5ULCAnZXhwYW5kZWQnLCBmYWxzZSApXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gKiBBIEZpcmVmb3ggYnVnLCB3aGVuIGBodG1sYCBoYXMgYG92ZXJmbG93OmhpZGRlbmAsIHJlc3VsdHMgaW5cclxuICAgICAgICAgICAgICAgIC8vICAga2lsbGluZyB0cmFuc2l0aW9ucyA6KC4gU28gcmVtb3ZlIHRoZSDigJxvcGVuZWTigJ0gc3RhdGUgb24gdGhlIG5leHQgdGljay5cclxuICAgICAgICAgICAgICAgIC8vICAgQnVnOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02MjUyODlcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIOKAnG9wZW5lZOKAnSBhbmQg4oCcZm9jdXNlZOKAnSBjbGFzcyBmcm9tIHRoZSBwaWNrZXIgcm9vdC5cclxuICAgICAgICAgICAgICAgICAgICBQLiRyb290LnJlbW92ZUNsYXNzKCBDTEFTU0VTLm9wZW5lZCArICcgJyArIENMQVNTRVMuZm9jdXNlZCApXHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYSggUC4kcm9vdFswXSwgJ2hpZGRlbicsIHRydWUgKVxyXG5cclxuICAgICAgICAgICAgICAgIH0sIDAgKVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIGl04oCZcyBhbHJlYWR5IGNsb3NlZCwgZG8gbm90aGluZyBtb3JlLlxyXG4gICAgICAgICAgICAgICAgaWYgKCAhU1RBVEUub3BlbiApIHJldHVybiBQXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2V0IGl0IGFzIGNsb3NlZC5cclxuICAgICAgICAgICAgICAgIFNUQVRFLm9wZW4gPSBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFsbG93IHRoZSBwYWdlIHRvIHNjcm9sbC5cclxuICAgICAgICAgICAgICAgIGlmICggSVNfREVGQVVMVF9USEVNRSApIHtcclxuICAgICAgICAgICAgICAgICAgICAkaHRtbC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzKCAnb3ZlcmZsb3cnLCAnJyApLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3MoICdwYWRkaW5nLXJpZ2h0JywgJy09JyArIGdldFNjcm9sbGJhcldpZHRoKCkgKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVuYmluZCB0aGUgZG9jdW1lbnQgZXZlbnRzLlxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9mZiggJy4nICsgU1RBVEUuaWQgKVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgdGhlIHF1ZXVlZCDigJxjbG9zZeKAnSBldmVudHMuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUC50cmlnZ2VyKCAnY2xvc2UnIClcclxuICAgICAgICAgICAgfSwgLy9jbG9zZVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDbGVhciB0aGUgdmFsdWVzXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBjbGVhcjogZnVuY3Rpb24oIG9wdGlvbnMgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUC5zZXQoICdjbGVhcicsIG51bGwsIG9wdGlvbnMgKVxyXG4gICAgICAgICAgICB9LCAvL2NsZWFyXHJcblxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFNldCBzb21ldGhpbmdcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24oIHRoaW5nLCB2YWx1ZSwgb3B0aW9ucyApIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpbmdJdGVtLCB0aGluZ1ZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaW5nSXNPYmplY3QgPSAkLmlzUGxhaW5PYmplY3QoIHRoaW5nICksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpbmdPYmplY3QgPSB0aGluZ0lzT2JqZWN0ID8gdGhpbmcgOiB7fVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBoYXZlIHVzYWJsZSBvcHRpb25zLlxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHRoaW5nSXNPYmplY3QgJiYgJC5pc1BsYWluT2JqZWN0KCB2YWx1ZSApID8gdmFsdWUgOiBvcHRpb25zIHx8IHt9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCB0aGluZyApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHRoaW5nIGlzbuKAmXQgYW4gb2JqZWN0LCBtYWtlIGl0IG9uZS5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoICF0aGluZ0lzT2JqZWN0ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGluZ09iamVjdFsgdGhpbmcgXSA9IHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBHbyB0aHJvdWdoIHRoZSB0aGluZ3Mgb2YgaXRlbXMgdG8gc2V0LlxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoIHRoaW5nSXRlbSBpbiB0aGluZ09iamVjdCApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdyYWIgdGhlIHZhbHVlIG9mIHRoZSB0aGluZy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpbmdWYWx1ZSA9IHRoaW5nT2JqZWN0WyB0aGluZ0l0ZW0gXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmlyc3QsIGlmIHRoZSBpdGVtIGV4aXN0cyBhbmQgdGhlcmXigJlzIGEgdmFsdWUsIHNldCBpdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB0aGluZ0l0ZW0gaW4gUC5jb21wb25lbnQuaXRlbSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggdGhpbmdWYWx1ZSA9PT0gdW5kZWZpbmVkICkgdGhpbmdWYWx1ZSA9IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFAuY29tcG9uZW50LnNldCggdGhpbmdJdGVtLCB0aGluZ1ZhbHVlLCBvcHRpb25zIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlbiwgY2hlY2sgdG8gdXBkYXRlIHRoZSBlbGVtZW50IHZhbHVlIGFuZCBicm9hZGNhc3QgYSBjaGFuZ2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggdGhpbmdJdGVtID09ICdzZWxlY3QnIHx8IHRoaW5nSXRlbSA9PSAnY2xlYXInICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJEVMRU1FTlQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsKCB0aGluZ0l0ZW0gPT0gJ2NsZWFyJyA/ICcnIDogUC5nZXQoIHRoaW5nSXRlbSwgU0VUVElOR1MuZm9ybWF0ICkgKS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKCAnY2hhbmdlJyApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbmRlciBhIG5ldyBwaWNrZXIuXHJcbiAgICAgICAgICAgICAgICAgICAgUC5yZW5kZXIoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFdoZW4gdGhlIG1ldGhvZCBpc27igJl0IG11dGVkLCB0cmlnZ2VyIHF1ZXVlZCDigJxzZXTigJ0gZXZlbnRzIGFuZCBwYXNzIHRoZSBgdGhpbmdPYmplY3RgLlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMubXV0ZWQgPyBQIDogUC50cmlnZ2VyKCAnc2V0JywgdGhpbmdPYmplY3QgKVxyXG4gICAgICAgICAgICB9LCAvL3NldFxyXG5cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBHZXQgc29tZXRoaW5nXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCB0aGluZywgZm9ybWF0ICkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGVyZeKAmXMgc29tZXRoaW5nIHRvIGdldC5cclxuICAgICAgICAgICAgICAgIHRoaW5nID0gdGhpbmcgfHwgJ3ZhbHVlJ1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIGEgcGlja2VyIHN0YXRlIGV4aXN0cywgcmV0dXJuIHRoYXQuXHJcbiAgICAgICAgICAgICAgICBpZiAoIFNUQVRFWyB0aGluZyBdICE9IG51bGwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFNUQVRFWyB0aGluZyBdXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBzdWJtaXNzaW9uIHZhbHVlLCBpZiB0aGF0LlxyXG4gICAgICAgICAgICAgICAgaWYgKCB0aGluZyA9PSAndmFsdWVTdWJtaXQnICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggUC5faGlkZGVuICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUC5faGlkZGVuLnZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaW5nID0gJ3ZhbHVlJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgdmFsdWUsIGlmIHRoYXQuXHJcbiAgICAgICAgICAgICAgICBpZiAoIHRoaW5nID09ICd2YWx1ZScgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEVMRU1FTlQudmFsdWVcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhIGNvbXBvbmVudCBpdGVtIGV4aXN0cywgcmV0dXJuIHRoYXQuXHJcbiAgICAgICAgICAgICAgICBpZiAoIHRoaW5nIGluIFAuY29tcG9uZW50Lml0ZW0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0eXBlb2YgZm9ybWF0ID09ICdzdHJpbmcnICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGhpbmdWYWx1ZSA9IFAuY29tcG9uZW50LmdldCggdGhpbmcgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpbmdWYWx1ZSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQaWNrZXJDb25zdHJ1Y3Rvci5fLnRyaWdnZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUC5jb21wb25lbnQuZm9ybWF0cy50b1N0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQLmNvbXBvbmVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbIGZvcm1hdCwgdGhpbmdWYWx1ZSBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogJydcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFAuY29tcG9uZW50LmdldCggdGhpbmcgKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAvL2dldFxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQmluZCBldmVudHMgb24gdGhlIHRoaW5ncy5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIG9uOiBmdW5jdGlvbiggdGhpbmcsIG1ldGhvZCwgaW50ZXJuYWwgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRoaW5nTmFtZSwgdGhpbmdNZXRob2QsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpbmdJc09iamVjdCA9ICQuaXNQbGFpbk9iamVjdCggdGhpbmcgKSxcclxuICAgICAgICAgICAgICAgICAgICB0aGluZ09iamVjdCA9IHRoaW5nSXNPYmplY3QgPyB0aGluZyA6IHt9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCB0aGluZyApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHRoaW5nIGlzbuKAmXQgYW4gb2JqZWN0LCBtYWtlIGl0IG9uZS5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoICF0aGluZ0lzT2JqZWN0ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGluZ09iamVjdFsgdGhpbmcgXSA9IG1ldGhvZFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR28gdGhyb3VnaCB0aGUgdGhpbmdzIHRvIGJpbmQgdG8uXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICggdGhpbmdOYW1lIGluIHRoaW5nT2JqZWN0ICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gR3JhYiB0aGUgbWV0aG9kIG9mIHRoZSB0aGluZy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpbmdNZXRob2QgPSB0aGluZ09iamVjdFsgdGhpbmdOYW1lIF1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIGl0IHdhcyBhbiBpbnRlcm5hbCBiaW5kaW5nLCBwcmVmaXggaXQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggaW50ZXJuYWwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGluZ05hbWUgPSAnXycgKyB0aGluZ05hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSB0aGluZyBtZXRob2RzIGNvbGxlY3Rpb24gZXhpc3RzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTVEFURS5tZXRob2RzWyB0aGluZ05hbWUgXSA9IFNUQVRFLm1ldGhvZHNbIHRoaW5nTmFtZSBdIHx8IFtdXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIG1ldGhvZCB0byB0aGUgcmVsYXRpdmUgbWV0aG9kIGNvbGxlY3Rpb24uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNUQVRFLm1ldGhvZHNbIHRoaW5nTmFtZSBdLnB1c2goIHRoaW5nTWV0aG9kIClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBcclxuICAgICAgICAgICAgfSwgLy9vblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogVW5iaW5kIGV2ZW50cyBvbiB0aGUgdGhpbmdzLlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgb2ZmOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpLCB0aGluZ05hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZXMgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBpID0gMCwgbmFtZXNDb3VudCA9IG5hbWVzLmxlbmd0aDsgaSA8IG5hbWVzQ291bnQ7IGkgKz0gMSApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGluZ05hbWUgPSBuYW1lc1tpXVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggdGhpbmdOYW1lIGluIFNUQVRFLm1ldGhvZHMgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBTVEFURS5tZXRob2RzW3RoaW5nTmFtZV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBGaXJlIG9mZiBtZXRob2QgZXZlbnRzLlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdHJpZ2dlcjogZnVuY3Rpb24oIG5hbWUsIGRhdGEgKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RyaWdnZXIgPSBmdW5jdGlvbiggbmFtZSApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0aG9kTGlzdCA9IFNUQVRFLm1ldGhvZHNbIG5hbWUgXVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggbWV0aG9kTGlzdCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kTGlzdC5tYXAoIGZ1bmN0aW9uKCBtZXRob2QgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQaWNrZXJDb25zdHJ1Y3Rvci5fLnRyaWdnZXIoIG1ldGhvZCwgUCwgWyBkYXRhIF0gKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF90cmlnZ2VyKCAnXycgKyBuYW1lIClcclxuICAgICAgICAgICAgICAgIF90cmlnZ2VyKCBuYW1lIClcclxuICAgICAgICAgICAgICAgIHJldHVybiBQXHJcbiAgICAgICAgICAgIH0gLy90cmlnZ2VyXHJcbiAgICAgICAgfSAvL1BpY2tlckluc3RhbmNlLnByb3RvdHlwZVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyYXAgdGhlIHBpY2tlciBob2xkZXIgY29tcG9uZW50cyB0b2dldGhlci5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlV3JhcHBlZENvbXBvbmVudCgpIHtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgcGlja2VyIHdyYXBwZXIgaG9sZGVyXHJcbiAgICAgICAgcmV0dXJuIFBpY2tlckNvbnN0cnVjdG9yLl8ubm9kZSggJ2RpdicsXHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBwaWNrZXIgd3JhcHBlciBub2RlXHJcbiAgICAgICAgICAgIFBpY2tlckNvbnN0cnVjdG9yLl8ubm9kZSggJ2RpdicsXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgcGlja2VyIGZyYW1lXHJcbiAgICAgICAgICAgICAgICBQaWNrZXJDb25zdHJ1Y3Rvci5fLm5vZGUoICdkaXYnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBwaWNrZXIgYm94IG5vZGVcclxuICAgICAgICAgICAgICAgICAgICBQaWNrZXJDb25zdHJ1Y3Rvci5fLm5vZGUoICdkaXYnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb21wb25lbnRzIG5vZGVzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQLmNvbXBvbmVudC5ub2RlcyggU1RBVEUub3BlbiApLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHBpY2tlciBib3ggY2xhc3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ0xBU1NFUy5ib3hcclxuICAgICAgICAgICAgICAgICAgICApLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBQaWNrZXIgd3JhcCBjbGFzc1xyXG4gICAgICAgICAgICAgICAgICAgIENMQVNTRVMud3JhcFxyXG4gICAgICAgICAgICAgICAgKSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQaWNrZXIgZnJhbWUgY2xhc3NcclxuICAgICAgICAgICAgICAgIENMQVNTRVMuZnJhbWVcclxuICAgICAgICAgICAgKSxcclxuXHJcbiAgICAgICAgICAgIC8vIFBpY2tlciBob2xkZXIgY2xhc3NcclxuICAgICAgICAgICAgQ0xBU1NFUy5ob2xkZXJcclxuICAgICAgICApIC8vZW5kcmV0dXJuXHJcbiAgICB9IC8vY3JlYXRlV3JhcHBlZENvbXBvbmVudFxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcmVwYXJlIHRoZSBpbnB1dCBlbGVtZW50IHdpdGggYWxsIGJpbmRpbmdzLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBwcmVwYXJlRWxlbWVudCgpIHtcclxuXHJcbiAgICAgICAgJEVMRU1FTlQuXHJcblxyXG4gICAgICAgICAgICAvLyBTdG9yZSB0aGUgcGlja2VyIGRhdGEgYnkgY29tcG9uZW50IG5hbWUuXHJcbiAgICAgICAgICAgIGRhdGEoTkFNRSwgUCkuXHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgdGhlIOKAnGlucHV04oCdIGNsYXNzIG5hbWUuXHJcbiAgICAgICAgICAgIGFkZENsYXNzKENMQVNTRVMuaW5wdXQpLlxyXG5cclxuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSB0YWJpbmRleC5cclxuICAgICAgICAgICAgYXR0cigndGFiaW5kZXgnLCAtMSkuXHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGVyZeKAmXMgYSBgZGF0YS12YWx1ZWAsIHVwZGF0ZSB0aGUgdmFsdWUgb2YgdGhlIGVsZW1lbnQuXHJcbiAgICAgICAgICAgIHZhbCggJEVMRU1FTlQuZGF0YSgndmFsdWUnKSA/XHJcbiAgICAgICAgICAgICAgICBQLmdldCgnc2VsZWN0JywgU0VUVElOR1MuZm9ybWF0KSA6XHJcbiAgICAgICAgICAgICAgICBFTEVNRU5ULnZhbHVlXHJcbiAgICAgICAgICAgIClcclxuXHJcblxyXG4gICAgICAgIC8vIE9ubHkgYmluZCBrZXlkb3duIGV2ZW50cyBpZiB0aGUgZWxlbWVudCBpc27igJl0IGVkaXRhYmxlLlxyXG4gICAgICAgIGlmICggIVNFVFRJTkdTLmVkaXRhYmxlICkge1xyXG5cclxuICAgICAgICAgICAgJEVMRU1FTlQuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gT24gZm9jdXMvY2xpY2ssIGZvY3VzIG9udG8gdGhlIHJvb3QgdG8gb3BlbiBpdCB1cC5cclxuICAgICAgICAgICAgICAgIG9uKCAnZm9jdXMuJyArIFNUQVRFLmlkICsgJyBjbGljay4nICsgU1RBVEUuaWQsIGZ1bmN0aW9uKCBldmVudCApIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgUC4kcm9vdC5lcSgwKS5mb2N1cygpXHJcbiAgICAgICAgICAgICAgICB9KS5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUga2V5Ym9hcmQgZXZlbnQgYmFzZWQgb24gdGhlIHBpY2tlciBiZWluZyBvcGVuZWQgb3Igbm90LlxyXG4gICAgICAgICAgICAgICAgb24oICdrZXlkb3duLicgKyBTVEFURS5pZCwgaGFuZGxlS2V5ZG93bkV2ZW50IClcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIGFyaWEgYXR0cmlidXRlcy5cclxuICAgICAgICBhcmlhKEVMRU1FTlQsIHtcclxuICAgICAgICAgICAgaGFzcG9wdXA6IHRydWUsXHJcbiAgICAgICAgICAgIGV4cGFuZGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgcmVhZG9ubHk6IGZhbHNlLFxyXG4gICAgICAgICAgICBvd25zOiBFTEVNRU5ULmlkICsgJ19yb290J1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJlcGFyZSB0aGUgcm9vdCBwaWNrZXIgZWxlbWVudCB3aXRoIGFsbCBiaW5kaW5ncy5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcHJlcGFyZUVsZW1lbnRSb290KCkge1xyXG5cclxuICAgICAgICBQLiRyb290LlxyXG5cclxuICAgICAgICAgICAgb24oe1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEZvciBpT1M4LlxyXG4gICAgICAgICAgICAgICAga2V5ZG93bjogaGFuZGxlS2V5ZG93bkV2ZW50LFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFdoZW4gc29tZXRoaW5nIHdpdGhpbiB0aGUgcm9vdCBpcyBmb2N1c2VkLCBzdG9wIGZyb20gYnViYmxpbmdcclxuICAgICAgICAgICAgICAgIC8vIHRvIHRoZSBkb2MgYW5kIHJlbW92ZSB0aGUg4oCcZm9jdXNlZOKAnSBzdGF0ZSBmcm9tIHRoZSByb290LlxyXG4gICAgICAgICAgICAgICAgZm9jdXNpbjogZnVuY3Rpb24oIGV2ZW50ICkge1xyXG4gICAgICAgICAgICAgICAgICAgIFAuJHJvb3QucmVtb3ZlQ2xhc3MoIENMQVNTRVMuZm9jdXNlZCApXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gV2hlbiBzb21ldGhpbmcgd2l0aGluIHRoZSByb290IGhvbGRlciBpcyBjbGlja2VkLCBzdG9wIGl0XHJcbiAgICAgICAgICAgICAgICAvLyBmcm9tIGJ1YmJsaW5nIHRvIHRoZSBkb2MuXHJcbiAgICAgICAgICAgICAgICAnbW91c2Vkb3duIGNsaWNrJzogZnVuY3Rpb24oIGV2ZW50ICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgdGFyZ2V0IGlzbuKAmXQgdGhlIHJvb3QgaG9sZGVyIHNvIGl0IGNhbiBidWJibGUgdXAuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0YXJnZXQgIT0gUC4kcm9vdC5jaGlsZHJlbigpWyAwIF0gKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gKiBGb3IgbW91c2Vkb3duIGV2ZW50cywgY2FuY2VsIHRoZSBkZWZhdWx0IGFjdGlvbiBpbiBvcmRlciB0b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHByZXZlbnQgY2FzZXMgd2hlcmUgZm9jdXMgaXMgc2hpZnRlZCBvbnRvIGV4dGVybmFsIGVsZW1lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgd2hlbiB1c2luZyB0aGluZ3MgbGlrZSBqUXVlcnkgbW9iaWxlIG9yIE1hZ25pZmljUG9wdXAgKHJlZjogIzI0OSAmICMxMjApLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIEFsc28sIGZvciBGaXJlZm94LCBkb27igJl0IHByZXZlbnQgYWN0aW9uIG9uIHRoZSBgb3B0aW9uYCBlbGVtZW50LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGV2ZW50LnR5cGUgPT0gJ21vdXNlZG93bicgJiYgISQoIHRhcmdldCApLmlzKCAnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEsIGJ1dHRvbiwgb3B0aW9uJyApKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlLWZvY3VzIG9udG8gdGhlIHJvb3Qgc28gdGhhdCB1c2VycyBjYW4gY2xpY2sgYXdheVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZnJvbSBlbGVtZW50cyBmb2N1c2VkIHdpdGhpbiB0aGUgcGlja2VyLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUC4kcm9vdC5lcSgwKS5mb2N1cygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLlxyXG5cclxuICAgICAgICAgICAgLy8gQWRkL3JlbW92ZSB0aGUg4oCcdGFyZ2V04oCdIGNsYXNzIG9uIGZvY3VzIGFuZCBibHVyLlxyXG4gICAgICAgICAgICBvbih7XHJcbiAgICAgICAgICAgICAgICBmb2N1czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJEVMRU1FTlQuYWRkQ2xhc3MoIENMQVNTRVMudGFyZ2V0IClcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBibHVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkRUxFTUVOVC5yZW1vdmVDbGFzcyggQ0xBU1NFUy50YXJnZXQgKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5cclxuXHJcbiAgICAgICAgICAgIC8vIE9wZW4gdGhlIHBpY2tlciBhbmQgYWRqdXN0IHRoZSByb290IOKAnGZvY3VzZWTigJ0gc3RhdGVcclxuICAgICAgICAgICAgb24oICdmb2N1cy50b09wZW4nLCBoYW5kbGVGb2N1c1RvT3BlbkV2ZW50ICkuXHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGVyZeKAmXMgYSBjbGljayBvbiBhbiBhY3Rpb25hYmxlIGVsZW1lbnQsIGNhcnJ5IG91dCB0aGUgYWN0aW9ucy5cclxuICAgICAgICAgICAgb24oICdjbGljaycsICdbZGF0YS1waWNrXSwgW2RhdGEtbmF2XSwgW2RhdGEtY2xlYXJdLCBbZGF0YS1jbG9zZV0nLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgJHRhcmdldCA9ICQoIHRoaXMgKSxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXREYXRhID0gJHRhcmdldC5kYXRhKCksXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RGlzYWJsZWQgPSAkdGFyZ2V0Lmhhc0NsYXNzKCBDTEFTU0VTLm5hdkRpc2FibGVkICkgfHwgJHRhcmdldC5oYXNDbGFzcyggQ0xBU1NFUy5kaXNhYmxlZCApLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAqIEZvciBJRSwgbm9uLWZvY3VzYWJsZSBlbGVtZW50cyBjYW4gYmUgYWN0aXZlIGVsZW1lbnRzIGFzIHdlbGxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgIChodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjg0NTYxKS5cclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVFbGVtZW50ID0gZ2V0QWN0aXZlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUVsZW1lbnQgPSBhY3RpdmVFbGVtZW50ICYmICggYWN0aXZlRWxlbWVudC50eXBlIHx8IGFjdGl2ZUVsZW1lbnQuaHJlZiApICYmIGFjdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgaXTigJlzIGRpc2FibGVkIG9yIG5vdGhpbmcgaW5zaWRlIGlzIGFjdGl2ZWx5IGZvY3VzZWQsIHJlLWZvY3VzIHRoZSBlbGVtZW50LlxyXG4gICAgICAgICAgICAgICAgaWYgKCB0YXJnZXREaXNhYmxlZCB8fCBhY3RpdmVFbGVtZW50ICYmICEkLmNvbnRhaW5zKCBQLiRyb290WzBdLCBhY3RpdmVFbGVtZW50ICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUC4kcm9vdC5lcSgwKS5mb2N1cygpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgc29tZXRoaW5nIGlzIHN1cGVyZmljaWFsbHkgY2hhbmdlZCwgdXBkYXRlIHRoZSBgaGlnaGxpZ2h0YCBiYXNlZCBvbiB0aGUgYG5hdmAuXHJcbiAgICAgICAgICAgICAgICBpZiAoICF0YXJnZXREaXNhYmxlZCAmJiB0YXJnZXREYXRhLm5hdiApIHtcclxuICAgICAgICAgICAgICAgICAgICBQLnNldCggJ2hpZ2hsaWdodCcsIFAuY29tcG9uZW50Lml0ZW0uaGlnaGxpZ2h0LCB7IG5hdjogdGFyZ2V0RGF0YS5uYXYgfSApXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgc29tZXRoaW5nIGlzIHBpY2tlZCwgc2V0IGBzZWxlY3RgIHRoZW4gY2xvc2Ugd2l0aCBmb2N1cy5cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCAhdGFyZ2V0RGlzYWJsZWQgJiYgJ3BpY2snIGluIHRhcmdldERhdGEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUC5zZXQoICdzZWxlY3QnLCB0YXJnZXREYXRhLnBpY2sgKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggU0VUVElOR1MuY2xvc2VPblNlbGVjdCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUC5jbG9zZSggdHJ1ZSApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIGEg4oCcY2xlYXLigJ0gYnV0dG9uIGlzIHByZXNzZWQsIGVtcHR5IHRoZSB2YWx1ZXMgYW5kIGNsb3NlIHdpdGggZm9jdXMuXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICggdGFyZ2V0RGF0YS5jbGVhciApIHtcclxuICAgICAgICAgICAgICAgICAgICBQLmNsZWFyKClcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIFNFVFRJTkdTLmNsb3NlT25TZWxlY3QgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFAuY2xvc2UoIHRydWUgKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICggdGFyZ2V0RGF0YS5jbG9zZSApIHtcclxuICAgICAgICAgICAgICAgICAgICBQLmNsb3NlKCB0cnVlIClcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pIC8vUC4kcm9vdFxyXG5cclxuICAgICAgICBhcmlhKCBQLiRyb290WzBdLCAnaGlkZGVuJywgdHJ1ZSApXHJcbiAgICB9XHJcblxyXG5cclxuICAgICAvKipcclxuICAgICAgKiBQcmVwYXJlIHRoZSBoaWRkZW4gaW5wdXQgZWxlbWVudCBhbG9uZyB3aXRoIGFsbCBiaW5kaW5ncy5cclxuICAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHByZXBhcmVFbGVtZW50SGlkZGVuKCkge1xyXG5cclxuICAgICAgICB2YXIgbmFtZVxyXG5cclxuICAgICAgICBpZiAoIFNFVFRJTkdTLmhpZGRlbk5hbWUgPT09IHRydWUgKSB7XHJcbiAgICAgICAgICAgIG5hbWUgPSBFTEVNRU5ULm5hbWVcclxuICAgICAgICAgICAgRUxFTUVOVC5uYW1lID0gJydcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG5hbWUgPSBbXHJcbiAgICAgICAgICAgICAgICB0eXBlb2YgU0VUVElOR1MuaGlkZGVuUHJlZml4ID09ICdzdHJpbmcnID8gU0VUVElOR1MuaGlkZGVuUHJlZml4IDogJycsXHJcbiAgICAgICAgICAgICAgICB0eXBlb2YgU0VUVElOR1MuaGlkZGVuU3VmZml4ID09ICdzdHJpbmcnID8gU0VUVElOR1MuaGlkZGVuU3VmZml4IDogJ19zdWJtaXQnXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgbmFtZSA9IG5hbWVbMF0gKyBFTEVNRU5ULm5hbWUgKyBuYW1lWzFdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBQLl9oaWRkZW4gPSAkKFxyXG4gICAgICAgICAgICAnPGlucHV0ICcgK1xyXG4gICAgICAgICAgICAndHlwZT1oaWRkZW4gJyArXHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIG5hbWUgdXNpbmcgdGhlIG9yaWdpbmFsIGlucHV04oCZcyB3aXRoIGEgcHJlZml4IGFuZCBzdWZmaXguXHJcbiAgICAgICAgICAgICduYW1lPVwiJyArIG5hbWUgKyAnXCInICtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBlbGVtZW50IGhhcyBhIHZhbHVlLCBzZXQgdGhlIGhpZGRlbiB2YWx1ZSBhcyB3ZWxsLlxyXG4gICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICAkRUxFTUVOVC5kYXRhKCd2YWx1ZScpIHx8IEVMRU1FTlQudmFsdWUgP1xyXG4gICAgICAgICAgICAgICAgICAgICcgdmFsdWU9XCInICsgUC5nZXQoJ3NlbGVjdCcsIFNFVFRJTkdTLmZvcm1hdFN1Ym1pdCkgKyAnXCInIDpcclxuICAgICAgICAgICAgICAgICAgICAnJ1xyXG4gICAgICAgICAgICApICtcclxuICAgICAgICAgICAgJz4nXHJcbiAgICAgICAgKVswXVxyXG5cclxuICAgICAgICAkRUxFTUVOVC5cclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSB2YWx1ZSBjaGFuZ2VzLCB1cGRhdGUgdGhlIGhpZGRlbiBpbnB1dCB3aXRoIHRoZSBjb3JyZWN0IGZvcm1hdC5cclxuICAgICAgICAgICAgb24oJ2NoYW5nZS4nICsgU1RBVEUuaWQsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgUC5faGlkZGVuLnZhbHVlID0gRUxFTUVOVC52YWx1ZSA/XHJcbiAgICAgICAgICAgICAgICAgICAgUC5nZXQoJ3NlbGVjdCcsIFNFVFRJTkdTLmZvcm1hdFN1Ym1pdCkgOlxyXG4gICAgICAgICAgICAgICAgICAgICcnXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAvLyBJbnNlcnQgdGhlIGhpZGRlbiBpbnB1dCBhcyBzcGVjaWZpZWQgaW4gdGhlIHNldHRpbmdzLlxyXG4gICAgICAgIGlmICggU0VUVElOR1MuY29udGFpbmVyICkgJCggU0VUVElOR1MuY29udGFpbmVyICkuYXBwZW5kKCBQLl9oaWRkZW4gKVxyXG4gICAgICAgIGVsc2UgJEVMRU1FTlQuYmVmb3JlKCBQLl9oaWRkZW4gKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBGb3IgaU9TOC5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUtleWRvd25FdmVudCggZXZlbnQgKSB7XHJcblxyXG4gICAgICAgIHZhciBrZXljb2RlID0gZXZlbnQua2V5Q29kZSxcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIG9uZSBvZiB0aGUgZGVsZXRlIGtleXMgd2FzIHByZXNzZWQuXHJcbiAgICAgICAgICAgIGlzS2V5Y29kZURlbGV0ZSA9IC9eKDh8NDYpJC8udGVzdChrZXljb2RlKVxyXG5cclxuICAgICAgICAvLyBGb3Igc29tZSByZWFzb24gSUUgY2xlYXJzIHRoZSBpbnB1dCB2YWx1ZSBvbiDigJxlc2NhcGXigJ0uXHJcbiAgICAgICAgaWYgKCBrZXljb2RlID09IDI3ICkge1xyXG4gICAgICAgICAgICBQLmNsb3NlKClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBgc3BhY2VgIG9yIGBkZWxldGVgIHdhcyBwcmVzc2VkIG9yIHRoZSBwaWNrZXIgaXMgY2xvc2VkIHdpdGggYSBrZXkgbW92ZW1lbnQuXHJcbiAgICAgICAgaWYgKCBrZXljb2RlID09IDMyIHx8IGlzS2V5Y29kZURlbGV0ZSB8fCAhU1RBVEUub3BlbiAmJiBQLmNvbXBvbmVudC5rZXlba2V5Y29kZV0gKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBQcmV2ZW50IGl0IGZyb20gbW92aW5nIHRoZSBwYWdlIGFuZCBidWJibGluZyB0byBkb2MuXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuXHJcbiAgICAgICAgICAgIC8vIElmIGBkZWxldGVgIHdhcyBwcmVzc2VkLCBjbGVhciB0aGUgdmFsdWVzIGFuZCBjbG9zZSB0aGUgcGlja2VyLlxyXG4gICAgICAgICAgICAvLyBPdGhlcndpc2Ugb3BlbiB0aGUgcGlja2VyLlxyXG4gICAgICAgICAgICBpZiAoIGlzS2V5Y29kZURlbGV0ZSApIHsgUC5jbGVhcigpLmNsb3NlKCkgfVxyXG4gICAgICAgICAgICBlbHNlIHsgUC5vcGVuKCkgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gU2VwYXJhdGVkIGZvciBJRVxyXG4gICAgZnVuY3Rpb24gaGFuZGxlRm9jdXNUb09wZW5FdmVudCggZXZlbnQgKSB7XHJcblxyXG4gICAgICAgIC8vIFN0b3AgdGhlIGV2ZW50IGZyb20gcHJvcGFnYXRpbmcgdG8gdGhlIGRvYy5cclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG5cclxuICAgICAgICAvLyBJZiBpdOKAmXMgYSBmb2N1cyBldmVudCwgYWRkIHRoZSDigJxmb2N1c2Vk4oCdIGNsYXNzIHRvIHRoZSByb290LlxyXG4gICAgICAgIGlmICggZXZlbnQudHlwZSA9PSAnZm9jdXMnICkge1xyXG4gICAgICAgICAgICBQLiRyb290LmFkZENsYXNzKCBDTEFTU0VTLmZvY3VzZWQgKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQW5kIHRoZW4gZmluYWxseSBvcGVuIHRoZSBwaWNrZXIuXHJcbiAgICAgICAgUC5vcGVuKClcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gUmV0dXJuIGEgbmV3IHBpY2tlciBpbnN0YW5jZS5cclxuICAgIHJldHVybiBuZXcgUGlja2VySW5zdGFuY2UoKVxyXG59IC8vUGlja2VyQ29uc3RydWN0b3JcclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IGNsYXNzZXMgYW5kIHByZWZpeCB0byB1c2UgZm9yIHRoZSBIVE1MIGNsYXNzZXMuXHJcbiAqL1xyXG5QaWNrZXJDb25zdHJ1Y3Rvci5rbGFzc2VzID0gZnVuY3Rpb24oIHByZWZpeCApIHtcclxuICAgIHByZWZpeCA9IHByZWZpeCB8fCAncGlja2VyJ1xyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgcGlja2VyOiBwcmVmaXgsXHJcbiAgICAgICAgb3BlbmVkOiBwcmVmaXggKyAnLS1vcGVuZWQnLFxyXG4gICAgICAgIGZvY3VzZWQ6IHByZWZpeCArICctLWZvY3VzZWQnLFxyXG5cclxuICAgICAgICBpbnB1dDogcHJlZml4ICsgJ19faW5wdXQnLFxyXG4gICAgICAgIGFjdGl2ZTogcHJlZml4ICsgJ19faW5wdXQtLWFjdGl2ZScsXHJcbiAgICAgICAgdGFyZ2V0OiBwcmVmaXggKyAnX19pbnB1dC0tdGFyZ2V0JyxcclxuXHJcbiAgICAgICAgaG9sZGVyOiBwcmVmaXggKyAnX19ob2xkZXInLFxyXG5cclxuICAgICAgICBmcmFtZTogcHJlZml4ICsgJ19fZnJhbWUnLFxyXG4gICAgICAgIHdyYXA6IHByZWZpeCArICdfX3dyYXAnLFxyXG5cclxuICAgICAgICBib3g6IHByZWZpeCArICdfX2JveCdcclxuICAgIH1cclxufSAvL1BpY2tlckNvbnN0cnVjdG9yLmtsYXNzZXNcclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHRoZSBkZWZhdWx0IHRoZW1lIGlzIGJlaW5nIHVzZWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBpc1VzaW5nRGVmYXVsdFRoZW1lKCBlbGVtZW50ICkge1xyXG5cclxuICAgIHZhciB0aGVtZSxcclxuICAgICAgICBwcm9wID0gJ3Bvc2l0aW9uJ1xyXG5cclxuICAgIC8vIEZvciBJRS5cclxuICAgIGlmICggZWxlbWVudC5jdXJyZW50U3R5bGUgKSB7XHJcbiAgICAgICAgdGhlbWUgPSBlbGVtZW50LmN1cnJlbnRTdHlsZVtwcm9wXVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEZvciBub3JtYWwgYnJvd3NlcnMuXHJcbiAgICBlbHNlIGlmICggd2luZG93LmdldENvbXB1dGVkU3R5bGUgKSB7XHJcbiAgICAgICAgdGhlbWUgPSBnZXRDb21wdXRlZFN0eWxlKCBlbGVtZW50IClbcHJvcF1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhlbWUgPT0gJ2ZpeGVkJ1xyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHdpZHRoIG9mIHRoZSBicm93c2Vy4oCZcyBzY3JvbGxiYXIuXHJcbiAqIFRha2VuIGZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9Wb2RrYUJlYXJzL1JlbW9kYWwvYmxvYi9tYXN0ZXIvc3JjL2pxdWVyeS5yZW1vZGFsLmpzXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRTY3JvbGxiYXJXaWR0aCgpIHtcclxuXHJcbiAgICBpZiAoICRodG1sLmhlaWdodCgpIDw9ICR3aW5kb3cuaGVpZ2h0KCkgKSB7XHJcbiAgICAgICAgcmV0dXJuIDBcclxuICAgIH1cclxuXHJcbiAgICB2YXIgJG91dGVyID0gJCggJzxkaXYgc3R5bGU9XCJ2aXNpYmlsaXR5OmhpZGRlbjt3aWR0aDoxMDBweFwiIC8+JyApLlxyXG4gICAgICAgIGFwcGVuZFRvKCAnYm9keScgKVxyXG5cclxuICAgIC8vIEdldCB0aGUgd2lkdGggd2l0aG91dCBzY3JvbGxiYXJzLlxyXG4gICAgdmFyIHdpZHRoV2l0aG91dFNjcm9sbCA9ICRvdXRlclswXS5vZmZzZXRXaWR0aFxyXG5cclxuICAgIC8vIEZvcmNlIGFkZGluZyBzY3JvbGxiYXJzLlxyXG4gICAgJG91dGVyLmNzcyggJ292ZXJmbG93JywgJ3Njcm9sbCcgKVxyXG5cclxuICAgIC8vIEFkZCB0aGUgaW5uZXIgZGl2LlxyXG4gICAgdmFyICRpbm5lciA9ICQoICc8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJVwiIC8+JyApLmFwcGVuZFRvKCAkb3V0ZXIgKVxyXG5cclxuICAgIC8vIEdldCB0aGUgd2lkdGggd2l0aCBzY3JvbGxiYXJzLlxyXG4gICAgdmFyIHdpZHRoV2l0aFNjcm9sbCA9ICRpbm5lclswXS5vZmZzZXRXaWR0aFxyXG5cclxuICAgIC8vIFJlbW92ZSB0aGUgZGl2cy5cclxuICAgICRvdXRlci5yZW1vdmUoKVxyXG5cclxuICAgIC8vIFJldHVybiB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSB3aWR0aHMuXHJcbiAgICByZXR1cm4gd2lkdGhXaXRob3V0U2Nyb2xsIC0gd2lkdGhXaXRoU2Nyb2xsXHJcbn1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIFBpY2tlckNvbnN0cnVjdG9yIGhlbHBlciBtZXRob2RzLlxyXG4gKi9cclxuUGlja2VyQ29uc3RydWN0b3IuXyA9IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIGdyb3VwIG9mIG5vZGVzLiBFeHBlY3RzOlxyXG4gICAgICogYFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWluOiAgICB7SW50ZWdlcn0sXHJcbiAgICAgICAgICAgIG1heDogICAge0ludGVnZXJ9LFxyXG4gICAgICAgICAgICBpOiAgICAgIHtJbnRlZ2VyfSxcclxuICAgICAgICAgICAgbm9kZTogICB7U3RyaW5nfSxcclxuICAgICAgICAgICAgaXRlbTogICB7RnVuY3Rpb259XHJcbiAgICAgICAgfVxyXG4gICAgICogYFxyXG4gICAgICovXHJcbiAgICBncm91cDogZnVuY3Rpb24oIGdyb3VwT2JqZWN0ICkge1xyXG5cclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgLy8gU2NvcGUgZm9yIHRoZSBsb29wZWQgb2JqZWN0XHJcbiAgICAgICAgICAgIGxvb3BPYmplY3RTY29wZSxcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgbm9kZXMgbGlzdFxyXG4gICAgICAgICAgICBub2Rlc0xpc3QgPSAnJyxcclxuXHJcbiAgICAgICAgICAgIC8vIFRoZSBjb3VudGVyIHN0YXJ0cyBmcm9tIHRoZSBgbWluYFxyXG4gICAgICAgICAgICBjb3VudGVyID0gUGlja2VyQ29uc3RydWN0b3IuXy50cmlnZ2VyKCBncm91cE9iamVjdC5taW4sIGdyb3VwT2JqZWN0IClcclxuXHJcblxyXG4gICAgICAgIC8vIExvb3AgZnJvbSB0aGUgYG1pbmAgdG8gYG1heGAsIGluY3JlbWVudGluZyBieSBgaWBcclxuICAgICAgICBmb3IgKCA7IGNvdW50ZXIgPD0gUGlja2VyQ29uc3RydWN0b3IuXy50cmlnZ2VyKCBncm91cE9iamVjdC5tYXgsIGdyb3VwT2JqZWN0LCBbIGNvdW50ZXIgXSApOyBjb3VudGVyICs9IGdyb3VwT2JqZWN0LmkgKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBUcmlnZ2VyIHRoZSBgaXRlbWAgZnVuY3Rpb24gd2l0aGluIHNjb3BlIG9mIHRoZSBvYmplY3RcclxuICAgICAgICAgICAgbG9vcE9iamVjdFNjb3BlID0gUGlja2VyQ29uc3RydWN0b3IuXy50cmlnZ2VyKCBncm91cE9iamVjdC5pdGVtLCBncm91cE9iamVjdCwgWyBjb3VudGVyIF0gKVxyXG5cclxuICAgICAgICAgICAgLy8gU3BsaWNlIHRoZSBzdWJncm91cCBhbmQgY3JlYXRlIG5vZGVzIG91dCBvZiB0aGUgc3ViIG5vZGVzXHJcbiAgICAgICAgICAgIG5vZGVzTGlzdCArPSBQaWNrZXJDb25zdHJ1Y3Rvci5fLm5vZGUoXHJcbiAgICAgICAgICAgICAgICBncm91cE9iamVjdC5ub2RlLFxyXG4gICAgICAgICAgICAgICAgbG9vcE9iamVjdFNjb3BlWyAwIF0sICAgLy8gdGhlIG5vZGVcclxuICAgICAgICAgICAgICAgIGxvb3BPYmplY3RTY29wZVsgMSBdLCAgIC8vIHRoZSBjbGFzc2VzXHJcbiAgICAgICAgICAgICAgICBsb29wT2JqZWN0U2NvcGVbIDIgXSAgICAvLyB0aGUgYXR0cmlidXRlc1xyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIGxpc3Qgb2Ygbm9kZXNcclxuICAgICAgICByZXR1cm4gbm9kZXNMaXN0XHJcbiAgICB9LCAvL2dyb3VwXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgZG9tIG5vZGUgc3RyaW5nXHJcbiAgICAgKi9cclxuICAgIG5vZGU6IGZ1bmN0aW9uKCB3cmFwcGVyLCBpdGVtLCBrbGFzcywgYXR0cmlidXRlICkge1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgaXRlbSBpcyBmYWxzZS15LCBqdXN0IHJldHVybiBhbiBlbXB0eSBzdHJpbmdcclxuICAgICAgICBpZiAoICFpdGVtICkgcmV0dXJuICcnXHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBpdGVtIGlzIGFuIGFycmF5LCBkbyBhIGpvaW5cclxuICAgICAgICBpdGVtID0gJC5pc0FycmF5KCBpdGVtICkgPyBpdGVtLmpvaW4oICcnICkgOiBpdGVtXHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciB0aGUgY2xhc3NcclxuICAgICAgICBrbGFzcyA9IGtsYXNzID8gJyBjbGFzcz1cIicgKyBrbGFzcyArICdcIicgOiAnJ1xyXG5cclxuICAgICAgICAvLyBDaGVjayBmb3IgYW55IGF0dHJpYnV0ZXNcclxuICAgICAgICBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGUgPyAnICcgKyBhdHRyaWJ1dGUgOiAnJ1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIHdyYXBwZWQgaXRlbVxyXG4gICAgICAgIHJldHVybiAnPCcgKyB3cmFwcGVyICsga2xhc3MgKyBhdHRyaWJ1dGUgKyAnPicgKyBpdGVtICsgJzwvJyArIHdyYXBwZXIgKyAnPidcclxuICAgIH0sIC8vbm9kZVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIExlYWQgbnVtYmVycyBiZWxvdyAxMCB3aXRoIGEgemVyby5cclxuICAgICAqL1xyXG4gICAgbGVhZDogZnVuY3Rpb24oIG51bWJlciApIHtcclxuICAgICAgICByZXR1cm4gKCBudW1iZXIgPCAxMCA/ICcwJzogJycgKSArIG51bWJlclxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmlnZ2VyIGEgZnVuY3Rpb24gb3RoZXJ3aXNlIHJldHVybiB0aGUgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIHRyaWdnZXI6IGZ1bmN0aW9uKCBjYWxsYmFjaywgc2NvcGUsIGFyZ3MgKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nID8gY2FsbGJhY2suYXBwbHkoIHNjb3BlLCBhcmdzIHx8IFtdICkgOiBjYWxsYmFja1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiB0aGUgc2Vjb25kIGNoYXJhY3RlciBpcyBhIGRpZ2l0LCBsZW5ndGggaXMgMiBvdGhlcndpc2UgMS5cclxuICAgICAqL1xyXG4gICAgZGlnaXRzOiBmdW5jdGlvbiggc3RyaW5nICkge1xyXG4gICAgICAgIHJldHVybiAoIC9cXGQvICkudGVzdCggc3RyaW5nWyAxIF0gKSA/IDIgOiAxXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlbGwgaWYgc29tZXRoaW5nIGlzIGEgZGF0ZSBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGlzRGF0ZTogZnVuY3Rpb24oIHZhbHVlICkge1xyXG4gICAgICAgIHJldHVybiB7fS50b1N0cmluZy5jYWxsKCB2YWx1ZSApLmluZGV4T2YoICdEYXRlJyApID4gLTEgJiYgdGhpcy5pc0ludGVnZXIoIHZhbHVlLmdldERhdGUoKSApXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlbGwgaWYgc29tZXRoaW5nIGlzIGFuIGludGVnZXIuXHJcbiAgICAgKi9cclxuICAgIGlzSW50ZWdlcjogZnVuY3Rpb24oIHZhbHVlICkge1xyXG4gICAgICAgIHJldHVybiB7fS50b1N0cmluZy5jYWxsKCB2YWx1ZSApLmluZGV4T2YoICdOdW1iZXInICkgPiAtMSAmJiB2YWx1ZSAlIDEgPT09IDBcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIEFSSUEgYXR0cmlidXRlIHN0cmluZ3MuXHJcbiAgICAgKi9cclxuICAgIGFyaWFBdHRyOiBhcmlhQXR0clxyXG59IC8vUGlja2VyQ29uc3RydWN0b3IuX1xyXG5cclxuXHJcblxyXG4vKipcclxuICogRXh0ZW5kIHRoZSBwaWNrZXIgd2l0aCBhIGNvbXBvbmVudCBhbmQgZGVmYXVsdHMuXHJcbiAqL1xyXG5QaWNrZXJDb25zdHJ1Y3Rvci5leHRlbmQgPSBmdW5jdGlvbiggbmFtZSwgQ29tcG9uZW50ICkge1xyXG5cclxuICAgIC8vIEV4dGVuZCBqUXVlcnkuXHJcbiAgICAkLmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggb3B0aW9ucywgYWN0aW9uICkge1xyXG5cclxuICAgICAgICAvLyBHcmFiIHRoZSBjb21wb25lbnQgZGF0YS5cclxuICAgICAgICB2YXIgY29tcG9uZW50RGF0YSA9IHRoaXMuZGF0YSggbmFtZSApXHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBwaWNrZXIgaXMgcmVxdWVzdGVkLCByZXR1cm4gdGhlIGRhdGEgb2JqZWN0LlxyXG4gICAgICAgIGlmICggb3B0aW9ucyA9PSAncGlja2VyJyApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudERhdGFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBjb21wb25lbnQgZGF0YSBleGlzdHMgYW5kIGBvcHRpb25zYCBpcyBhIHN0cmluZywgY2Fycnkgb3V0IHRoZSBhY3Rpb24uXHJcbiAgICAgICAgaWYgKCBjb21wb25lbnREYXRhICYmIHR5cGVvZiBvcHRpb25zID09ICdzdHJpbmcnICkge1xyXG4gICAgICAgICAgICByZXR1cm4gUGlja2VyQ29uc3RydWN0b3IuXy50cmlnZ2VyKCBjb21wb25lbnREYXRhWyBvcHRpb25zIF0sIGNvbXBvbmVudERhdGEsIFsgYWN0aW9uIF0gKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gT3RoZXJ3aXNlIGdvIHRocm91Z2ggZWFjaCBtYXRjaGVkIGVsZW1lbnQgYW5kIGlmIHRoZSBjb21wb25lbnRcclxuICAgICAgICAvLyBkb2VzbuKAmXQgZXhpc3QsIGNyZWF0ZSBhIG5ldyBwaWNrZXIgdXNpbmcgYHRoaXNgIGVsZW1lbnRcclxuICAgICAgICAvLyBhbmQgbWVyZ2luZyB0aGUgZGVmYXVsdHMgYW5kIG9wdGlvbnMgd2l0aCBhIGRlZXAgY29weS5cclxuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyICR0aGlzID0gJCggdGhpcyApXHJcbiAgICAgICAgICAgIGlmICggISR0aGlzLmRhdGEoIG5hbWUgKSApIHtcclxuICAgICAgICAgICAgICAgIG5ldyBQaWNrZXJDb25zdHJ1Y3RvciggdGhpcywgbmFtZSwgQ29tcG9uZW50LCBvcHRpb25zIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2V0IHRoZSBkZWZhdWx0cy5cclxuICAgICQuZm5bIG5hbWUgXS5kZWZhdWx0cyA9IENvbXBvbmVudC5kZWZhdWx0c1xyXG59IC8vUGlja2VyQ29uc3RydWN0b3IuZXh0ZW5kXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGFyaWEoZWxlbWVudCwgYXR0cmlidXRlLCB2YWx1ZSkge1xyXG4gICAgaWYgKCAkLmlzUGxhaW5PYmplY3QoYXR0cmlidXRlKSApIHtcclxuICAgICAgICBmb3IgKCB2YXIga2V5IGluIGF0dHJpYnV0ZSApIHtcclxuICAgICAgICAgICAgYXJpYVNldChlbGVtZW50LCBrZXksIGF0dHJpYnV0ZVtrZXldKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGFyaWFTZXQoZWxlbWVudCwgYXR0cmlidXRlLCB2YWx1ZSlcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBhcmlhU2V0KGVsZW1lbnQsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFxyXG4gICAgICAgIChhdHRyaWJ1dGUgPT0gJ3JvbGUnID8gJycgOiAnYXJpYS0nKSArIGF0dHJpYnV0ZSxcclxuICAgICAgICB2YWx1ZVxyXG4gICAgKVxyXG59XHJcbmZ1bmN0aW9uIGFyaWFBdHRyKGF0dHJpYnV0ZSwgZGF0YSkge1xyXG4gICAgaWYgKCAhJC5pc1BsYWluT2JqZWN0KGF0dHJpYnV0ZSkgKSB7XHJcbiAgICAgICAgYXR0cmlidXRlID0geyBhdHRyaWJ1dGU6IGRhdGEgfVxyXG4gICAgfVxyXG4gICAgZGF0YSA9ICcnXHJcbiAgICBmb3IgKCB2YXIga2V5IGluIGF0dHJpYnV0ZSApIHtcclxuICAgICAgICB2YXIgYXR0ciA9IChrZXkgPT0gJ3JvbGUnID8gJycgOiAnYXJpYS0nKSArIGtleSxcclxuICAgICAgICAgICAgYXR0clZhbCA9IGF0dHJpYnV0ZVtrZXldXHJcbiAgICAgICAgZGF0YSArPSBhdHRyVmFsID09IG51bGwgPyAnJyA6IGF0dHIgKyAnPVwiJyArIGF0dHJpYnV0ZVtrZXldICsgJ1wiJ1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGFcclxufVxyXG5cclxuLy8gSUU4IGJ1ZyB0aHJvd3MgYW4gZXJyb3IgZm9yIGFjdGl2ZUVsZW1lbnRzIHdpdGhpbiBpZnJhbWVzLlxyXG5mdW5jdGlvbiBnZXRBY3RpdmVFbGVtZW50KCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxyXG4gICAgfSBjYXRjaCAoIGVyciApIHsgfVxyXG59XHJcblxyXG5cclxuXHJcbi8vIEV4cG9zZSB0aGUgcGlja2VyIGNvbnN0cnVjdG9yLlxyXG5yZXR1cm4gUGlja2VyQ29uc3RydWN0b3JcclxuXHJcblxyXG59KSk7XHJcblxuLyohXHJcbiAqIERhdGUgcGlja2VyIGZvciBwaWNrYWRhdGUuanMgdjMuNS4wXHJcbiAqIGh0dHA6Ly9hbXN1bC5naXRodWIuaW8vcGlja2FkYXRlLmpzL2RhdGUuaHRtXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uICggZmFjdG9yeSApIHtcclxuICBmYWN0b3J5KCBNYXRlcmlhbGl6ZS5QaWNrZXIsIGpRdWVyeSApXHJcblxyXG59KGZ1bmN0aW9uKCBQaWNrZXIsICQgKSB7XHJcblxyXG5cclxuLyoqXHJcbiAqIEdsb2JhbHMgYW5kIGNvbnN0YW50c1xyXG4gKi9cclxudmFyIERBWVNfSU5fV0VFSyA9IDcsXHJcbiAgICBXRUVLU19JTl9DQUxFTkRBUiA9IDYsXHJcbiAgICBfID0gUGlja2VyLl87XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGF0ZSBwaWNrZXIgY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIERhdGVQaWNrZXIoIHBpY2tlciwgc2V0dGluZ3MgKSB7XHJcblxyXG4gICAgdmFyIGNhbGVuZGFyID0gdGhpcyxcclxuICAgICAgICBlbGVtZW50ID0gcGlja2VyLiRub2RlWyAwIF0sXHJcbiAgICAgICAgZWxlbWVudFZhbHVlID0gZWxlbWVudC52YWx1ZSxcclxuICAgICAgICBlbGVtZW50RGF0YVZhbHVlID0gcGlja2VyLiRub2RlLmRhdGEoICd2YWx1ZScgKSxcclxuICAgICAgICB2YWx1ZVN0cmluZyA9IGVsZW1lbnREYXRhVmFsdWUgfHwgZWxlbWVudFZhbHVlLFxyXG4gICAgICAgIGZvcm1hdFN0cmluZyA9IGVsZW1lbnREYXRhVmFsdWUgPyBzZXR0aW5ncy5mb3JtYXRTdWJtaXQgOiBzZXR0aW5ncy5mb3JtYXQsXHJcbiAgICAgICAgaXNSVEwgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmN1cnJlbnRTdHlsZSA/XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRm9yIElFLlxyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jdXJyZW50U3R5bGUuZGlyZWN0aW9uID09ICdydGwnIDpcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBGb3Igbm9ybWFsIGJyb3dzZXJzLlxyXG4gICAgICAgICAgICAgICAgZ2V0Q29tcHV0ZWRTdHlsZSggcGlja2VyLiRyb290WzBdICkuZGlyZWN0aW9uID09ICdydGwnXHJcbiAgICAgICAgfVxyXG5cclxuICAgIGNhbGVuZGFyLnNldHRpbmdzID0gc2V0dGluZ3NcclxuICAgIGNhbGVuZGFyLiRub2RlID0gcGlja2VyLiRub2RlXHJcblxyXG4gICAgLy8gVGhlIHF1ZXVlIG9mIG1ldGhvZHMgdGhhdCB3aWxsIGJlIHVzZWQgdG8gYnVpbGQgaXRlbSBvYmplY3RzLlxyXG4gICAgY2FsZW5kYXIucXVldWUgPSB7XHJcbiAgICAgICAgbWluOiAnbWVhc3VyZSBjcmVhdGUnLFxyXG4gICAgICAgIG1heDogJ21lYXN1cmUgY3JlYXRlJyxcclxuICAgICAgICBub3c6ICdub3cgY3JlYXRlJyxcclxuICAgICAgICBzZWxlY3Q6ICdwYXJzZSBjcmVhdGUgdmFsaWRhdGUnLFxyXG4gICAgICAgIGhpZ2hsaWdodDogJ3BhcnNlIG5hdmlnYXRlIGNyZWF0ZSB2YWxpZGF0ZScsXHJcbiAgICAgICAgdmlldzogJ3BhcnNlIGNyZWF0ZSB2YWxpZGF0ZSB2aWV3c2V0JyxcclxuICAgICAgICBkaXNhYmxlOiAnZGVhY3RpdmF0ZScsXHJcbiAgICAgICAgZW5hYmxlOiAnYWN0aXZhdGUnXHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhlIGNvbXBvbmVudCdzIGl0ZW0gb2JqZWN0LlxyXG4gICAgY2FsZW5kYXIuaXRlbSA9IHt9XHJcblxyXG4gICAgY2FsZW5kYXIuaXRlbS5jbGVhciA9IG51bGxcclxuICAgIGNhbGVuZGFyLml0ZW0uZGlzYWJsZSA9ICggc2V0dGluZ3MuZGlzYWJsZSB8fCBbXSApLnNsaWNlKCAwIClcclxuICAgIGNhbGVuZGFyLml0ZW0uZW5hYmxlID0gLShmdW5jdGlvbiggY29sbGVjdGlvbkRpc2FibGVkICkge1xyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uRGlzYWJsZWRbIDAgXSA9PT0gdHJ1ZSA/IGNvbGxlY3Rpb25EaXNhYmxlZC5zaGlmdCgpIDogLTFcclxuICAgIH0pKCBjYWxlbmRhci5pdGVtLmRpc2FibGUgKVxyXG5cclxuICAgIGNhbGVuZGFyLlxyXG4gICAgICAgIHNldCggJ21pbicsIHNldHRpbmdzLm1pbiApLlxyXG4gICAgICAgIHNldCggJ21heCcsIHNldHRpbmdzLm1heCApLlxyXG4gICAgICAgIHNldCggJ25vdycgKVxyXG5cclxuICAgIC8vIFdoZW4gdGhlcmXigJlzIGEgdmFsdWUsIHNldCB0aGUgYHNlbGVjdGAsIHdoaWNoIGluIHR1cm5cclxuICAgIC8vIGFsc28gc2V0cyB0aGUgYGhpZ2hsaWdodGAgYW5kIGB2aWV3YC5cclxuICAgIGlmICggdmFsdWVTdHJpbmcgKSB7XHJcbiAgICAgICAgY2FsZW5kYXIuc2V0KCAnc2VsZWN0JywgdmFsdWVTdHJpbmcsIHsgZm9ybWF0OiBmb3JtYXRTdHJpbmcgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiB0aGVyZeKAmXMgbm8gdmFsdWUsIGRlZmF1bHQgdG8gaGlnaGxpZ2h0aW5nIOKAnHRvZGF54oCdLlxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY2FsZW5kYXIuXHJcbiAgICAgICAgICAgIHNldCggJ3NlbGVjdCcsIG51bGwgKS5cclxuICAgICAgICAgICAgc2V0KCAnaGlnaGxpZ2h0JywgY2FsZW5kYXIuaXRlbS5ub3cgKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBUaGUga2V5Y29kZSB0byBtb3ZlbWVudCBtYXBwaW5nLlxyXG4gICAgY2FsZW5kYXIua2V5ID0ge1xyXG4gICAgICAgIDQwOiA3LCAvLyBEb3duXHJcbiAgICAgICAgMzg6IC03LCAvLyBVcFxyXG4gICAgICAgIDM5OiBmdW5jdGlvbigpIHsgcmV0dXJuIGlzUlRMKCkgPyAtMSA6IDEgfSwgLy8gUmlnaHRcclxuICAgICAgICAzNzogZnVuY3Rpb24oKSB7IHJldHVybiBpc1JUTCgpID8gMSA6IC0xIH0sIC8vIExlZnRcclxuICAgICAgICBnbzogZnVuY3Rpb24oIHRpbWVDaGFuZ2UgKSB7XHJcbiAgICAgICAgICAgIHZhciBoaWdobGlnaHRlZE9iamVjdCA9IGNhbGVuZGFyLml0ZW0uaGlnaGxpZ2h0LFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0RGF0ZSA9IG5ldyBEYXRlKCBoaWdobGlnaHRlZE9iamVjdC55ZWFyLCBoaWdobGlnaHRlZE9iamVjdC5tb250aCwgaGlnaGxpZ2h0ZWRPYmplY3QuZGF0ZSArIHRpbWVDaGFuZ2UgKVxyXG4gICAgICAgICAgICBjYWxlbmRhci5zZXQoXHJcbiAgICAgICAgICAgICAgICAnaGlnaGxpZ2h0JyxcclxuICAgICAgICAgICAgICAgIHRhcmdldERhdGUsXHJcbiAgICAgICAgICAgICAgICB7IGludGVydmFsOiB0aW1lQ2hhbmdlIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBCaW5kIHNvbWUgcGlja2VyIGV2ZW50cy5cclxuICAgIHBpY2tlci5cclxuICAgICAgICBvbiggJ3JlbmRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwaWNrZXIuJHJvb3QuZmluZCggJy4nICsgc2V0dGluZ3Mua2xhc3Muc2VsZWN0TW9udGggKS5vbiggJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy52YWx1ZVxyXG4gICAgICAgICAgICAgICAgaWYgKCB2YWx1ZSApIHtcclxuICAgICAgICAgICAgICAgICAgICBwaWNrZXIuc2V0KCAnaGlnaGxpZ2h0JywgWyBwaWNrZXIuZ2V0KCAndmlldycgKS55ZWFyLCB2YWx1ZSwgcGlja2VyLmdldCggJ2hpZ2hsaWdodCcgKS5kYXRlIF0gKVxyXG4gICAgICAgICAgICAgICAgICAgIHBpY2tlci4kcm9vdC5maW5kKCAnLicgKyBzZXR0aW5ncy5rbGFzcy5zZWxlY3RNb250aCApLnRyaWdnZXIoICdmb2N1cycgKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBwaWNrZXIuJHJvb3QuZmluZCggJy4nICsgc2V0dGluZ3Mua2xhc3Muc2VsZWN0WWVhciApLm9uKCAnY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBpZiAoIHZhbHVlICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBpY2tlci5zZXQoICdoaWdobGlnaHQnLCBbIHZhbHVlLCBwaWNrZXIuZ2V0KCAndmlldycgKS5tb250aCwgcGlja2VyLmdldCggJ2hpZ2hsaWdodCcgKS5kYXRlIF0gKVxyXG4gICAgICAgICAgICAgICAgICAgIHBpY2tlci4kcm9vdC5maW5kKCAnLicgKyBzZXR0aW5ncy5rbGFzcy5zZWxlY3RZZWFyICkudHJpZ2dlciggJ2ZvY3VzJyApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSwgMSApLlxyXG4gICAgICAgIG9uKCAnb3BlbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaW5jbHVkZVRvZGF5ID0gJydcclxuICAgICAgICAgICAgaWYgKCBjYWxlbmRhci5kaXNhYmxlZCggY2FsZW5kYXIuZ2V0KCdub3cnKSApICkge1xyXG4gICAgICAgICAgICAgICAgaW5jbHVkZVRvZGF5ID0gJzpub3QoLicgKyBzZXR0aW5ncy5rbGFzcy5idXR0b25Ub2RheSArICcpJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBpY2tlci4kcm9vdC5maW5kKCAnYnV0dG9uJyArIGluY2x1ZGVUb2RheSArICcsIHNlbGVjdCcgKS5hdHRyKCAnZGlzYWJsZWQnLCBmYWxzZSApXHJcbiAgICAgICAgfSwgMSApLlxyXG4gICAgICAgIG9uKCAnY2xvc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGlja2VyLiRyb290LmZpbmQoICdidXR0b24sIHNlbGVjdCcgKS5hdHRyKCAnZGlzYWJsZWQnLCB0cnVlIClcclxuICAgICAgICB9LCAxIClcclxuXHJcbn0gLy9EYXRlUGlja2VyXHJcblxyXG5cclxuLyoqXHJcbiAqIFNldCBhIGRhdGVwaWNrZXIgaXRlbSBvYmplY3QuXHJcbiAqL1xyXG5EYXRlUGlja2VyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiggdHlwZSwgdmFsdWUsIG9wdGlvbnMgKSB7XHJcblxyXG4gICAgdmFyIGNhbGVuZGFyID0gdGhpcyxcclxuICAgICAgICBjYWxlbmRhckl0ZW0gPSBjYWxlbmRhci5pdGVtXHJcblxyXG4gICAgLy8gSWYgdGhlIHZhbHVlIGlzIGBudWxsYCBqdXN0IHNldCBpdCBpbW1lZGlhdGVseS5cclxuICAgIGlmICggdmFsdWUgPT09IG51bGwgKSB7XHJcbiAgICAgICAgaWYgKCB0eXBlID09ICdjbGVhcicgKSB0eXBlID0gJ3NlbGVjdCdcclxuICAgICAgICBjYWxlbmRhckl0ZW1bIHR5cGUgXSA9IHZhbHVlXHJcbiAgICAgICAgcmV0dXJuIGNhbGVuZGFyXHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3RoZXJ3aXNlIGdvIHRocm91Z2ggdGhlIHF1ZXVlIG9mIG1ldGhvZHMsIGFuZCBpbnZva2UgdGhlIGZ1bmN0aW9ucy5cclxuICAgIC8vIFVwZGF0ZSB0aGlzIGFzIHRoZSB0aW1lIHVuaXQsIGFuZCBzZXQgdGhlIGZpbmFsIHZhbHVlIGFzIHRoaXMgaXRlbS5cclxuICAgIC8vICogSW4gdGhlIGNhc2Ugb2YgYGVuYWJsZWAsIGtlZXAgdGhlIHF1ZXVlIGJ1dCBzZXQgYGRpc2FibGVgIGluc3RlYWQuXHJcbiAgICAvLyAgIEFuZCBpbiB0aGUgY2FzZSBvZiBgZmxpcGAsIGtlZXAgdGhlIHF1ZXVlIGJ1dCBzZXQgYGVuYWJsZWAgaW5zdGVhZC5cclxuICAgIGNhbGVuZGFySXRlbVsgKCB0eXBlID09ICdlbmFibGUnID8gJ2Rpc2FibGUnIDogdHlwZSA9PSAnZmxpcCcgPyAnZW5hYmxlJyA6IHR5cGUgKSBdID0gY2FsZW5kYXIucXVldWVbIHR5cGUgXS5zcGxpdCggJyAnICkubWFwKCBmdW5jdGlvbiggbWV0aG9kICkge1xyXG4gICAgICAgIHZhbHVlID0gY2FsZW5kYXJbIG1ldGhvZCBdKCB0eXBlLCB2YWx1ZSwgb3B0aW9ucyApXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlXHJcbiAgICB9KS5wb3AoKVxyXG5cclxuICAgIC8vIENoZWNrIGlmIHdlIG5lZWQgdG8gY2FzY2FkZSB0aHJvdWdoIG1vcmUgdXBkYXRlcy5cclxuICAgIGlmICggdHlwZSA9PSAnc2VsZWN0JyApIHtcclxuICAgICAgICBjYWxlbmRhci5zZXQoICdoaWdobGlnaHQnLCBjYWxlbmRhckl0ZW0uc2VsZWN0LCBvcHRpb25zIClcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCB0eXBlID09ICdoaWdobGlnaHQnICkge1xyXG4gICAgICAgIGNhbGVuZGFyLnNldCggJ3ZpZXcnLCBjYWxlbmRhckl0ZW0uaGlnaGxpZ2h0LCBvcHRpb25zIClcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCB0eXBlLm1hdGNoKCAvXihmbGlwfG1pbnxtYXh8ZGlzYWJsZXxlbmFibGUpJC8gKSApIHtcclxuICAgICAgICBpZiAoIGNhbGVuZGFySXRlbS5zZWxlY3QgJiYgY2FsZW5kYXIuZGlzYWJsZWQoIGNhbGVuZGFySXRlbS5zZWxlY3QgKSApIHtcclxuICAgICAgICAgICAgY2FsZW5kYXIuc2V0KCAnc2VsZWN0JywgY2FsZW5kYXJJdGVtLnNlbGVjdCwgb3B0aW9ucyApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggY2FsZW5kYXJJdGVtLmhpZ2hsaWdodCAmJiBjYWxlbmRhci5kaXNhYmxlZCggY2FsZW5kYXJJdGVtLmhpZ2hsaWdodCApICkge1xyXG4gICAgICAgICAgICBjYWxlbmRhci5zZXQoICdoaWdobGlnaHQnLCBjYWxlbmRhckl0ZW0uaGlnaGxpZ2h0LCBvcHRpb25zIClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNhbGVuZGFyXHJcbn0gLy9EYXRlUGlja2VyLnByb3RvdHlwZS5zZXRcclxuXHJcblxyXG4vKipcclxuICogR2V0IGEgZGF0ZXBpY2tlciBpdGVtIG9iamVjdC5cclxuICovXHJcbkRhdGVQaWNrZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKCB0eXBlICkge1xyXG4gICAgcmV0dXJuIHRoaXMuaXRlbVsgdHlwZSBdXHJcbn0gLy9EYXRlUGlja2VyLnByb3RvdHlwZS5nZXRcclxuXHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgcGlja2VyIGRhdGUgb2JqZWN0LlxyXG4gKi9cclxuRGF0ZVBpY2tlci5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oIHR5cGUsIHZhbHVlLCBvcHRpb25zICkge1xyXG5cclxuICAgIHZhciBpc0luZmluaXRlVmFsdWUsXHJcbiAgICAgICAgY2FsZW5kYXIgPSB0aGlzXHJcblxyXG4gICAgLy8gSWYgdGhlcmXigJlzIG5vIHZhbHVlLCB1c2UgdGhlIHR5cGUgYXMgdGhlIHZhbHVlLlxyXG4gICAgdmFsdWUgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdHlwZSA6IHZhbHVlXHJcblxyXG5cclxuICAgIC8vIElmIGl04oCZcyBpbmZpbml0eSwgdXBkYXRlIHRoZSB2YWx1ZS5cclxuICAgIGlmICggdmFsdWUgPT0gLUluZmluaXR5IHx8IHZhbHVlID09IEluZmluaXR5ICkge1xyXG4gICAgICAgIGlzSW5maW5pdGVWYWx1ZSA9IHZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWYgaXTigJlzIGFuIG9iamVjdCwgdXNlIHRoZSBuYXRpdmUgZGF0ZSBvYmplY3QuXHJcbiAgICBlbHNlIGlmICggJC5pc1BsYWluT2JqZWN0KCB2YWx1ZSApICYmIF8uaXNJbnRlZ2VyKCB2YWx1ZS5waWNrICkgKSB7XHJcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5vYmpcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiBpdOKAmXMgYW4gYXJyYXksIGNvbnZlcnQgaXQgaW50byBhIGRhdGUgYW5kIG1ha2Ugc3VyZVxyXG4gICAgLy8gdGhhdCBpdOKAmXMgYSB2YWxpZCBkYXRlIOKAkyBvdGhlcndpc2UgZGVmYXVsdCB0byB0b2RheS5cclxuICAgIGVsc2UgaWYgKCAkLmlzQXJyYXkoIHZhbHVlICkgKSB7XHJcbiAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZSggdmFsdWVbIDAgXSwgdmFsdWVbIDEgXSwgdmFsdWVbIDIgXSApXHJcbiAgICAgICAgdmFsdWUgPSBfLmlzRGF0ZSggdmFsdWUgKSA/IHZhbHVlIDogY2FsZW5kYXIuY3JlYXRlKCkub2JqXHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWYgaXTigJlzIGEgbnVtYmVyIG9yIGRhdGUgb2JqZWN0LCBtYWtlIGEgbm9ybWFsaXplZCBkYXRlLlxyXG4gICAgZWxzZSBpZiAoIF8uaXNJbnRlZ2VyKCB2YWx1ZSApIHx8IF8uaXNEYXRlKCB2YWx1ZSApICkge1xyXG4gICAgICAgIHZhbHVlID0gY2FsZW5kYXIubm9ybWFsaXplKCBuZXcgRGF0ZSggdmFsdWUgKSwgb3B0aW9ucyApXHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWYgaXTigJlzIGEgbGl0ZXJhbCB0cnVlIG9yIGFueSBvdGhlciBjYXNlLCBzZXQgaXQgdG8gbm93LlxyXG4gICAgZWxzZSAvKmlmICggdmFsdWUgPT09IHRydWUgKSovIHtcclxuICAgICAgICB2YWx1ZSA9IGNhbGVuZGFyLm5vdyggdHlwZSwgdmFsdWUsIG9wdGlvbnMgKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybiB0aGUgY29tcGlsZWQgb2JqZWN0LlxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB5ZWFyOiBpc0luZmluaXRlVmFsdWUgfHwgdmFsdWUuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICBtb250aDogaXNJbmZpbml0ZVZhbHVlIHx8IHZhbHVlLmdldE1vbnRoKCksXHJcbiAgICAgICAgZGF0ZTogaXNJbmZpbml0ZVZhbHVlIHx8IHZhbHVlLmdldERhdGUoKSxcclxuICAgICAgICBkYXk6IGlzSW5maW5pdGVWYWx1ZSB8fCB2YWx1ZS5nZXREYXkoKSxcclxuICAgICAgICBvYmo6IGlzSW5maW5pdGVWYWx1ZSB8fCB2YWx1ZSxcclxuICAgICAgICBwaWNrOiBpc0luZmluaXRlVmFsdWUgfHwgdmFsdWUuZ2V0VGltZSgpXHJcbiAgICB9XHJcbn0gLy9EYXRlUGlja2VyLnByb3RvdHlwZS5jcmVhdGVcclxuXHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgcmFuZ2UgbGltaXQgb2JqZWN0IHVzaW5nIGFuIGFycmF5LCBkYXRlIG9iamVjdCxcclxuICogbGl0ZXJhbCDigJx0cnVl4oCdLCBvciBpbnRlZ2VyIHJlbGF0aXZlIHRvIGFub3RoZXIgdGltZS5cclxuICovXHJcbkRhdGVQaWNrZXIucHJvdG90eXBlLmNyZWF0ZVJhbmdlID0gZnVuY3Rpb24oIGZyb20sIHRvICkge1xyXG5cclxuICAgIHZhciBjYWxlbmRhciA9IHRoaXMsXHJcbiAgICAgICAgY3JlYXRlRGF0ZSA9IGZ1bmN0aW9uKCBkYXRlICkge1xyXG4gICAgICAgICAgICBpZiAoIGRhdGUgPT09IHRydWUgfHwgJC5pc0FycmF5KCBkYXRlICkgfHwgXy5pc0RhdGUoIGRhdGUgKSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYWxlbmRhci5jcmVhdGUoIGRhdGUgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRlXHJcbiAgICAgICAgfVxyXG5cclxuICAgIC8vIENyZWF0ZSBvYmplY3RzIGlmIHBvc3NpYmxlLlxyXG4gICAgaWYgKCAhXy5pc0ludGVnZXIoIGZyb20gKSApIHtcclxuICAgICAgICBmcm9tID0gY3JlYXRlRGF0ZSggZnJvbSApXHJcbiAgICB9XHJcbiAgICBpZiAoICFfLmlzSW50ZWdlciggdG8gKSApIHtcclxuICAgICAgICB0byA9IGNyZWF0ZURhdGUoIHRvIClcclxuICAgIH1cclxuXHJcbiAgICAvLyBDcmVhdGUgcmVsYXRpdmUgZGF0ZXMuXHJcbiAgICBpZiAoIF8uaXNJbnRlZ2VyKCBmcm9tICkgJiYgJC5pc1BsYWluT2JqZWN0KCB0byApICkge1xyXG4gICAgICAgIGZyb20gPSBbIHRvLnllYXIsIHRvLm1vbnRoLCB0by5kYXRlICsgZnJvbSBdO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoIF8uaXNJbnRlZ2VyKCB0byApICYmICQuaXNQbGFpbk9iamVjdCggZnJvbSApICkge1xyXG4gICAgICAgIHRvID0gWyBmcm9tLnllYXIsIGZyb20ubW9udGgsIGZyb20uZGF0ZSArIHRvIF07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBmcm9tOiBjcmVhdGVEYXRlKCBmcm9tICksXHJcbiAgICAgICAgdG86IGNyZWF0ZURhdGUoIHRvIClcclxuICAgIH1cclxufSAvL0RhdGVQaWNrZXIucHJvdG90eXBlLmNyZWF0ZVJhbmdlXHJcblxyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGEgZGF0ZSB1bml0IGZhbGxzIHdpdGhpbiBhIGRhdGUgcmFuZ2Ugb2JqZWN0LlxyXG4gKi9cclxuRGF0ZVBpY2tlci5wcm90b3R5cGUud2l0aGluUmFuZ2UgPSBmdW5jdGlvbiggcmFuZ2UsIGRhdGVVbml0ICkge1xyXG4gICAgcmFuZ2UgPSB0aGlzLmNyZWF0ZVJhbmdlKHJhbmdlLmZyb20sIHJhbmdlLnRvKVxyXG4gICAgcmV0dXJuIGRhdGVVbml0LnBpY2sgPj0gcmFuZ2UuZnJvbS5waWNrICYmIGRhdGVVbml0LnBpY2sgPD0gcmFuZ2UudG8ucGlja1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHR3byBkYXRlIHJhbmdlIG9iamVjdHMgb3ZlcmxhcC5cclxuICovXHJcbkRhdGVQaWNrZXIucHJvdG90eXBlLm92ZXJsYXBSYW5nZXMgPSBmdW5jdGlvbiggb25lLCB0d28gKSB7XHJcblxyXG4gICAgdmFyIGNhbGVuZGFyID0gdGhpc1xyXG5cclxuICAgIC8vIENvbnZlcnQgdGhlIHJhbmdlcyBpbnRvIGNvbXBhcmFibGUgZGF0ZXMuXHJcbiAgICBvbmUgPSBjYWxlbmRhci5jcmVhdGVSYW5nZSggb25lLmZyb20sIG9uZS50byApXHJcbiAgICB0d28gPSBjYWxlbmRhci5jcmVhdGVSYW5nZSggdHdvLmZyb20sIHR3by50byApXHJcblxyXG4gICAgcmV0dXJuIGNhbGVuZGFyLndpdGhpblJhbmdlKCBvbmUsIHR3by5mcm9tICkgfHwgY2FsZW5kYXIud2l0aGluUmFuZ2UoIG9uZSwgdHdvLnRvICkgfHxcclxuICAgICAgICBjYWxlbmRhci53aXRoaW5SYW5nZSggdHdvLCBvbmUuZnJvbSApIHx8IGNhbGVuZGFyLndpdGhpblJhbmdlKCB0d28sIG9uZS50byApXHJcbn1cclxuXHJcblxyXG4vKipcclxuICogR2V0IHRoZSBkYXRlIHRvZGF5LlxyXG4gKi9cclxuRGF0ZVBpY2tlci5wcm90b3R5cGUubm93ID0gZnVuY3Rpb24oIHR5cGUsIHZhbHVlLCBvcHRpb25zICkge1xyXG4gICAgdmFsdWUgPSBuZXcgRGF0ZSgpXHJcbiAgICBpZiAoIG9wdGlvbnMgJiYgb3B0aW9ucy5yZWwgKSB7XHJcbiAgICAgICAgdmFsdWUuc2V0RGF0ZSggdmFsdWUuZ2V0RGF0ZSgpICsgb3B0aW9ucy5yZWwgKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMubm9ybWFsaXplKCB2YWx1ZSwgb3B0aW9ucyApXHJcbn1cclxuXHJcblxyXG4vKipcclxuICogTmF2aWdhdGUgdG8gbmV4dC9wcmV2IG1vbnRoLlxyXG4gKi9cclxuRGF0ZVBpY2tlci5wcm90b3R5cGUubmF2aWdhdGUgPSBmdW5jdGlvbiggdHlwZSwgdmFsdWUsIG9wdGlvbnMgKSB7XHJcblxyXG4gICAgdmFyIHRhcmdldERhdGVPYmplY3QsXHJcbiAgICAgICAgdGFyZ2V0WWVhcixcclxuICAgICAgICB0YXJnZXRNb250aCxcclxuICAgICAgICB0YXJnZXREYXRlLFxyXG4gICAgICAgIGlzVGFyZ2V0QXJyYXkgPSAkLmlzQXJyYXkoIHZhbHVlICksXHJcbiAgICAgICAgaXNUYXJnZXRPYmplY3QgPSAkLmlzUGxhaW5PYmplY3QoIHZhbHVlICksXHJcbiAgICAgICAgdmlld3NldE9iamVjdCA9IHRoaXMuaXRlbS52aWV3LyosXHJcbiAgICAgICAgc2FmZXR5ID0gMTAwKi9cclxuXHJcblxyXG4gICAgaWYgKCBpc1RhcmdldEFycmF5IHx8IGlzVGFyZ2V0T2JqZWN0ICkge1xyXG5cclxuICAgICAgICBpZiAoIGlzVGFyZ2V0T2JqZWN0ICkge1xyXG4gICAgICAgICAgICB0YXJnZXRZZWFyID0gdmFsdWUueWVhclxyXG4gICAgICAgICAgICB0YXJnZXRNb250aCA9IHZhbHVlLm1vbnRoXHJcbiAgICAgICAgICAgIHRhcmdldERhdGUgPSB2YWx1ZS5kYXRlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0YXJnZXRZZWFyID0gK3ZhbHVlWzBdXHJcbiAgICAgICAgICAgIHRhcmdldE1vbnRoID0gK3ZhbHVlWzFdXHJcbiAgICAgICAgICAgIHRhcmdldERhdGUgPSArdmFsdWVbMl1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIHdl4oCZcmUgbmF2aWdhdGluZyBtb250aHMgYnV0IHRoZSB2aWV3IGlzIGluIGEgZGlmZmVyZW50XHJcbiAgICAgICAgLy8gbW9udGgsIG5hdmlnYXRlIHRvIHRoZSB2aWV34oCZcyB5ZWFyIGFuZCBtb250aC5cclxuICAgICAgICBpZiAoIG9wdGlvbnMgJiYgb3B0aW9ucy5uYXYgJiYgdmlld3NldE9iamVjdCAmJiB2aWV3c2V0T2JqZWN0Lm1vbnRoICE9PSB0YXJnZXRNb250aCApIHtcclxuICAgICAgICAgICAgdGFyZ2V0WWVhciA9IHZpZXdzZXRPYmplY3QueWVhclxyXG4gICAgICAgICAgICB0YXJnZXRNb250aCA9IHZpZXdzZXRPYmplY3QubW9udGhcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZpZ3VyZSBvdXQgdGhlIGV4cGVjdGVkIHRhcmdldCB5ZWFyIGFuZCBtb250aC5cclxuICAgICAgICB0YXJnZXREYXRlT2JqZWN0ID0gbmV3IERhdGUoIHRhcmdldFllYXIsIHRhcmdldE1vbnRoICsgKCBvcHRpb25zICYmIG9wdGlvbnMubmF2ID8gb3B0aW9ucy5uYXYgOiAwICksIDEgKVxyXG4gICAgICAgIHRhcmdldFllYXIgPSB0YXJnZXREYXRlT2JqZWN0LmdldEZ1bGxZZWFyKClcclxuICAgICAgICB0YXJnZXRNb250aCA9IHRhcmdldERhdGVPYmplY3QuZ2V0TW9udGgoKVxyXG5cclxuICAgICAgICAvLyBJZiB0aGUgbW9udGggd2XigJlyZSBnb2luZyB0byBkb2VzbuKAmXQgaGF2ZSBlbm91Z2ggZGF5cyxcclxuICAgICAgICAvLyBrZWVwIGRlY3JlYXNpbmcgdGhlIGRhdGUgdW50aWwgd2UgcmVhY2ggdGhlIG1vbnRo4oCZcyBsYXN0IGRhdGUuXHJcbiAgICAgICAgd2hpbGUgKCAvKnNhZmV0eSAmJiovIG5ldyBEYXRlKCB0YXJnZXRZZWFyLCB0YXJnZXRNb250aCwgdGFyZ2V0RGF0ZSApLmdldE1vbnRoKCkgIT09IHRhcmdldE1vbnRoICkge1xyXG4gICAgICAgICAgICB0YXJnZXREYXRlIC09IDFcclxuICAgICAgICAgICAgLypzYWZldHkgLT0gMVxyXG4gICAgICAgICAgICBpZiAoICFzYWZldHkgKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyAnRmVsbCBpbnRvIGFuIGluZmluaXRlIGxvb3Agd2hpbGUgbmF2aWdhdGluZyB0byAnICsgbmV3IERhdGUoIHRhcmdldFllYXIsIHRhcmdldE1vbnRoLCB0YXJnZXREYXRlICkgKyAnLidcclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YWx1ZSA9IFsgdGFyZ2V0WWVhciwgdGFyZ2V0TW9udGgsIHRhcmdldERhdGUgXVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2YWx1ZVxyXG59IC8vRGF0ZVBpY2tlci5wcm90b3R5cGUubmF2aWdhdGVcclxuXHJcblxyXG4vKipcclxuICogTm9ybWFsaXplIGEgZGF0ZSBieSBzZXR0aW5nIHRoZSBob3VycyB0byBtaWRuaWdodC5cclxuICovXHJcbkRhdGVQaWNrZXIucHJvdG90eXBlLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKCB2YWx1ZS8qLCBvcHRpb25zKi8gKSB7XHJcbiAgICB2YWx1ZS5zZXRIb3VycyggMCwgMCwgMCwgMCApXHJcbiAgICByZXR1cm4gdmFsdWVcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBNZWFzdXJlIHRoZSByYW5nZSBvZiBkYXRlcy5cclxuICovXHJcbkRhdGVQaWNrZXIucHJvdG90eXBlLm1lYXN1cmUgPSBmdW5jdGlvbiggdHlwZSwgdmFsdWUvKiwgb3B0aW9ucyovICkge1xyXG5cclxuICAgIHZhciBjYWxlbmRhciA9IHRoaXNcclxuXHJcbiAgICAvLyBJZiBpdOKAmXMgYW55dGhpbmcgZmFsc2UteSwgcmVtb3ZlIHRoZSBsaW1pdHMuXHJcbiAgICBpZiAoICF2YWx1ZSApIHtcclxuICAgICAgICB2YWx1ZSA9IHR5cGUgPT0gJ21pbicgPyAtSW5maW5pdHkgOiBJbmZpbml0eVxyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIGl04oCZcyBhIHN0cmluZywgcGFyc2UgaXQuXHJcbiAgICBlbHNlIGlmICggdHlwZW9mIHZhbHVlID09ICdzdHJpbmcnICkge1xyXG4gICAgICAgIHZhbHVlID0gY2FsZW5kYXIucGFyc2UoIHR5cGUsIHZhbHVlIClcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiBpdCdzIGFuIGludGVnZXIsIGdldCBhIGRhdGUgcmVsYXRpdmUgdG8gdG9kYXkuXHJcbiAgICBlbHNlIGlmICggXy5pc0ludGVnZXIoIHZhbHVlICkgKSB7XHJcbiAgICAgICAgdmFsdWUgPSBjYWxlbmRhci5ub3coIHR5cGUsIHZhbHVlLCB7IHJlbDogdmFsdWUgfSApXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlXHJcbn0gLy8vRGF0ZVBpY2tlci5wcm90b3R5cGUubWVhc3VyZVxyXG5cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSB2aWV3c2V0IG9iamVjdCBiYXNlZCBvbiBuYXZpZ2F0aW9uLlxyXG4gKi9cclxuRGF0ZVBpY2tlci5wcm90b3R5cGUudmlld3NldCA9IGZ1bmN0aW9uKCB0eXBlLCBkYXRlT2JqZWN0LyosIG9wdGlvbnMqLyApIHtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZShbIGRhdGVPYmplY3QueWVhciwgZGF0ZU9iamVjdC5tb250aCwgMSBdKVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFZhbGlkYXRlIGEgZGF0ZSBhcyBlbmFibGVkIGFuZCBzaGlmdCBpZiBuZWVkZWQuXHJcbiAqL1xyXG5EYXRlUGlja2VyLnByb3RvdHlwZS52YWxpZGF0ZSA9IGZ1bmN0aW9uKCB0eXBlLCBkYXRlT2JqZWN0LCBvcHRpb25zICkge1xyXG5cclxuICAgIHZhciBjYWxlbmRhciA9IHRoaXMsXHJcblxyXG4gICAgICAgIC8vIEtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIG9yaWdpbmFsIGRhdGUuXHJcbiAgICAgICAgb3JpZ2luYWxEYXRlT2JqZWN0ID0gZGF0ZU9iamVjdCxcclxuXHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGhhdmUgYW4gaW50ZXJ2YWwuXHJcbiAgICAgICAgaW50ZXJ2YWwgPSBvcHRpb25zICYmIG9wdGlvbnMuaW50ZXJ2YWwgPyBvcHRpb25zLmludGVydmFsIDogMSxcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGNhbGVuZGFyIGVuYWJsZWQgZGF0ZXMgYXJlIGludmVydGVkLlxyXG4gICAgICAgIGlzRmxpcHBlZEJhc2UgPSBjYWxlbmRhci5pdGVtLmVuYWJsZSA9PT0gLTEsXHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHdlIGhhdmUgYW55IGVuYWJsZWQgZGF0ZXMgYWZ0ZXIvYmVmb3JlIG5vdy5cclxuICAgICAgICBoYXNFbmFibGVkQmVmb3JlVGFyZ2V0LCBoYXNFbmFibGVkQWZ0ZXJUYXJnZXQsXHJcblxyXG4gICAgICAgIC8vIFRoZSBtaW4gJiBtYXggbGltaXRzLlxyXG4gICAgICAgIG1pbkxpbWl0T2JqZWN0ID0gY2FsZW5kYXIuaXRlbS5taW4sXHJcbiAgICAgICAgbWF4TGltaXRPYmplY3QgPSBjYWxlbmRhci5pdGVtLm1heCxcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgd2XigJl2ZSByZWFjaGVkIHRoZSBsaW1pdCBkdXJpbmcgc2hpZnRpbmcuXHJcbiAgICAgICAgcmVhY2hlZE1pbiwgcmVhY2hlZE1heCxcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGNhbGVuZGFyIGlzIGludmVydGVkIGFuZCBhdCBsZWFzdCBvbmUgd2Vla2RheSBpcyBlbmFibGVkLlxyXG4gICAgICAgIGhhc0VuYWJsZWRXZWVrZGF5cyA9IGlzRmxpcHBlZEJhc2UgJiYgY2FsZW5kYXIuaXRlbS5kaXNhYmxlLmZpbHRlciggZnVuY3Rpb24oIHZhbHVlICkge1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgdGhlcmXigJlzIGEgZGF0ZSwgY2hlY2sgd2hlcmUgaXQgaXMgcmVsYXRpdmUgdG8gdGhlIHRhcmdldC5cclxuICAgICAgICAgICAgaWYgKCAkLmlzQXJyYXkoIHZhbHVlICkgKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZVRpbWUgPSBjYWxlbmRhci5jcmVhdGUoIHZhbHVlICkucGlja1xyXG4gICAgICAgICAgICAgICAgaWYgKCBkYXRlVGltZSA8IGRhdGVPYmplY3QucGljayApIGhhc0VuYWJsZWRCZWZvcmVUYXJnZXQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICggZGF0ZVRpbWUgPiBkYXRlT2JqZWN0LnBpY2sgKSBoYXNFbmFibGVkQWZ0ZXJUYXJnZXQgPSB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJldHVybiBvbmx5IGludGVnZXJzIGZvciBlbmFibGVkIHdlZWtkYXlzLlxyXG4gICAgICAgICAgICByZXR1cm4gXy5pc0ludGVnZXIoIHZhbHVlIClcclxuICAgICAgICB9KS5sZW5ndGgvKixcclxuXHJcbiAgICAgICAgc2FmZXR5ID0gMTAwKi9cclxuXHJcblxyXG5cclxuICAgIC8vIENhc2VzIHRvIHZhbGlkYXRlIGZvcjpcclxuICAgIC8vIFsxXSBOb3QgaW52ZXJ0ZWQgYW5kIGRhdGUgZGlzYWJsZWQuXHJcbiAgICAvLyBbMl0gSW52ZXJ0ZWQgYW5kIHNvbWUgZGF0ZXMgZW5hYmxlZC5cclxuICAgIC8vIFszXSBOb3QgaW52ZXJ0ZWQgYW5kIG91dCBvZiByYW5nZS5cclxuICAgIC8vXHJcbiAgICAvLyBDYXNlcyB0byAqKm5vdCoqIHZhbGlkYXRlIGZvcjpcclxuICAgIC8vIOKAoiBOYXZpZ2F0aW5nIG1vbnRocy5cclxuICAgIC8vIOKAoiBOb3QgaW52ZXJ0ZWQgYW5kIGRhdGUgZW5hYmxlZC5cclxuICAgIC8vIOKAoiBJbnZlcnRlZCBhbmQgYWxsIGRhdGVzIGRpc2FibGVkLlxyXG4gICAgLy8g4oCiIC4uYW5kIGFueXRoaW5nIGVsc2UuXHJcbiAgICBpZiAoICFvcHRpb25zIHx8ICFvcHRpb25zLm5hdiApIGlmIChcclxuICAgICAgICAvKiAxICovICggIWlzRmxpcHBlZEJhc2UgJiYgY2FsZW5kYXIuZGlzYWJsZWQoIGRhdGVPYmplY3QgKSApIHx8XHJcbiAgICAgICAgLyogMiAqLyAoIGlzRmxpcHBlZEJhc2UgJiYgY2FsZW5kYXIuZGlzYWJsZWQoIGRhdGVPYmplY3QgKSAmJiAoIGhhc0VuYWJsZWRXZWVrZGF5cyB8fCBoYXNFbmFibGVkQmVmb3JlVGFyZ2V0IHx8IGhhc0VuYWJsZWRBZnRlclRhcmdldCApICkgfHxcclxuICAgICAgICAvKiAzICovICggIWlzRmxpcHBlZEJhc2UgJiYgKGRhdGVPYmplY3QucGljayA8PSBtaW5MaW1pdE9iamVjdC5waWNrIHx8IGRhdGVPYmplY3QucGljayA+PSBtYXhMaW1pdE9iamVjdC5waWNrKSApXHJcbiAgICApIHtcclxuXHJcblxyXG4gICAgICAgIC8vIFdoZW4gaW52ZXJ0ZWQsIGZsaXAgdGhlIGRpcmVjdGlvbiBpZiB0aGVyZSBhcmVu4oCZdCBhbnkgZW5hYmxlZCB3ZWVrZGF5c1xyXG4gICAgICAgIC8vIGFuZCB0aGVyZSBhcmUgbm8gZW5hYmxlZCBkYXRlcyBpbiB0aGUgZGlyZWN0aW9uIG9mIHRoZSBpbnRlcnZhbC5cclxuICAgICAgICBpZiAoIGlzRmxpcHBlZEJhc2UgJiYgIWhhc0VuYWJsZWRXZWVrZGF5cyAmJiAoICggIWhhc0VuYWJsZWRBZnRlclRhcmdldCAmJiBpbnRlcnZhbCA+IDAgKSB8fCAoICFoYXNFbmFibGVkQmVmb3JlVGFyZ2V0ICYmIGludGVydmFsIDwgMCApICkgKSB7XHJcbiAgICAgICAgICAgIGludGVydmFsICo9IC0xXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gS2VlcCBsb29waW5nIHVudGlsIHdlIHJlYWNoIGFuIGVuYWJsZWQgZGF0ZS5cclxuICAgICAgICB3aGlsZSAoIC8qc2FmZXR5ICYmKi8gY2FsZW5kYXIuZGlzYWJsZWQoIGRhdGVPYmplY3QgKSApIHtcclxuXHJcbiAgICAgICAgICAgIC8qc2FmZXR5IC09IDFcclxuICAgICAgICAgICAgaWYgKCAhc2FmZXR5ICkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgJ0ZlbGwgaW50byBhbiBpbmZpbml0ZSBsb29wIHdoaWxlIHZhbGlkYXRpbmcgJyArIGRhdGVPYmplY3Qub2JqICsgJy4nXHJcbiAgICAgICAgICAgIH0qL1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIElmIHdl4oCZdmUgbG9vcGVkIGludG8gdGhlIG5leHQvcHJldiBtb250aCB3aXRoIGEgbGFyZ2UgaW50ZXJ2YWwsIHJldHVybiB0byB0aGUgb3JpZ2luYWwgZGF0ZSBhbmQgZmxhdHRlbiB0aGUgaW50ZXJ2YWwuXHJcbiAgICAgICAgICAgIGlmICggTWF0aC5hYnMoIGludGVydmFsICkgPiAxICYmICggZGF0ZU9iamVjdC5tb250aCA8IG9yaWdpbmFsRGF0ZU9iamVjdC5tb250aCB8fCBkYXRlT2JqZWN0Lm1vbnRoID4gb3JpZ2luYWxEYXRlT2JqZWN0Lm1vbnRoICkgKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlT2JqZWN0ID0gb3JpZ2luYWxEYXRlT2JqZWN0XHJcbiAgICAgICAgICAgICAgICBpbnRlcnZhbCA9IGludGVydmFsID4gMCA/IDEgOiAtMVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gSWYgd2XigJl2ZSByZWFjaGVkIHRoZSBtaW4vbWF4IGxpbWl0LCByZXZlcnNlIHRoZSBkaXJlY3Rpb24sIGZsYXR0ZW4gdGhlIGludGVydmFsIGFuZCBzZXQgaXQgdG8gdGhlIGxpbWl0LlxyXG4gICAgICAgICAgICBpZiAoIGRhdGVPYmplY3QucGljayA8PSBtaW5MaW1pdE9iamVjdC5waWNrICkge1xyXG4gICAgICAgICAgICAgICAgcmVhY2hlZE1pbiA9IHRydWVcclxuICAgICAgICAgICAgICAgIGludGVydmFsID0gMVxyXG4gICAgICAgICAgICAgICAgZGF0ZU9iamVjdCA9IGNhbGVuZGFyLmNyZWF0ZShbXHJcbiAgICAgICAgICAgICAgICAgICAgbWluTGltaXRPYmplY3QueWVhcixcclxuICAgICAgICAgICAgICAgICAgICBtaW5MaW1pdE9iamVjdC5tb250aCxcclxuICAgICAgICAgICAgICAgICAgICBtaW5MaW1pdE9iamVjdC5kYXRlICsgKGRhdGVPYmplY3QucGljayA9PT0gbWluTGltaXRPYmplY3QucGljayA/IDAgOiAtMSlcclxuICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoIGRhdGVPYmplY3QucGljayA+PSBtYXhMaW1pdE9iamVjdC5waWNrICkge1xyXG4gICAgICAgICAgICAgICAgcmVhY2hlZE1heCA9IHRydWVcclxuICAgICAgICAgICAgICAgIGludGVydmFsID0gLTFcclxuICAgICAgICAgICAgICAgIGRhdGVPYmplY3QgPSBjYWxlbmRhci5jcmVhdGUoW1xyXG4gICAgICAgICAgICAgICAgICAgIG1heExpbWl0T2JqZWN0LnllYXIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4TGltaXRPYmplY3QubW9udGgsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4TGltaXRPYmplY3QuZGF0ZSArIChkYXRlT2JqZWN0LnBpY2sgPT09IG1heExpbWl0T2JqZWN0LnBpY2sgPyAwIDogMSlcclxuICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvLyBJZiB3ZeKAmXZlIHJlYWNoZWQgYm90aCBsaW1pdHMsIGp1c3QgYnJlYWsgb3V0IG9mIHRoZSBsb29wLlxyXG4gICAgICAgICAgICBpZiAoIHJlYWNoZWRNaW4gJiYgcmVhY2hlZE1heCApIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvLyBGaW5hbGx5LCBjcmVhdGUgdGhlIHNoaWZ0ZWQgZGF0ZSB1c2luZyB0aGUgaW50ZXJ2YWwgYW5kIGtlZXAgbG9vcGluZy5cclxuICAgICAgICAgICAgZGF0ZU9iamVjdCA9IGNhbGVuZGFyLmNyZWF0ZShbIGRhdGVPYmplY3QueWVhciwgZGF0ZU9iamVjdC5tb250aCwgZGF0ZU9iamVjdC5kYXRlICsgaW50ZXJ2YWwgXSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfSAvL2VuZGlmXHJcblxyXG5cclxuICAgIC8vIFJldHVybiB0aGUgZGF0ZSBvYmplY3Qgc2V0dGxlZCBvbi5cclxuICAgIHJldHVybiBkYXRlT2JqZWN0XHJcbn0gLy9EYXRlUGlja2VyLnByb3RvdHlwZS52YWxpZGF0ZVxyXG5cclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBhIGRhdGUgaXMgZGlzYWJsZWQuXHJcbiAqL1xyXG5EYXRlUGlja2VyLnByb3RvdHlwZS5kaXNhYmxlZCA9IGZ1bmN0aW9uKCBkYXRlVG9WZXJpZnkgKSB7XHJcblxyXG4gICAgdmFyXHJcbiAgICAgICAgY2FsZW5kYXIgPSB0aGlzLFxyXG5cclxuICAgICAgICAvLyBGaWx0ZXIgdGhyb3VnaCB0aGUgZGlzYWJsZWQgZGF0ZXMgdG8gY2hlY2sgaWYgdGhpcyBpcyBvbmUuXHJcbiAgICAgICAgaXNEaXNhYmxlZE1hdGNoID0gY2FsZW5kYXIuaXRlbS5kaXNhYmxlLmZpbHRlciggZnVuY3Rpb24oIGRhdGVUb0Rpc2FibGUgKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgZGF0ZSBpcyBhIG51bWJlciwgbWF0Y2ggdGhlIHdlZWtkYXkgd2l0aCAwaW5kZXggYW5kIGBmaXJzdERheWAgY2hlY2suXHJcbiAgICAgICAgICAgIGlmICggXy5pc0ludGVnZXIoIGRhdGVUb0Rpc2FibGUgKSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlVG9WZXJpZnkuZGF5ID09PSAoIGNhbGVuZGFyLnNldHRpbmdzLmZpcnN0RGF5ID8gZGF0ZVRvRGlzYWJsZSA6IGRhdGVUb0Rpc2FibGUgLSAxICkgJSA3XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIElmIGl04oCZcyBhbiBhcnJheSBvciBhIG5hdGl2ZSBKUyBkYXRlLCBjcmVhdGUgYW5kIG1hdGNoIHRoZSBleGFjdCBkYXRlLlxyXG4gICAgICAgICAgICBpZiAoICQuaXNBcnJheSggZGF0ZVRvRGlzYWJsZSApIHx8IF8uaXNEYXRlKCBkYXRlVG9EaXNhYmxlICkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZVRvVmVyaWZ5LnBpY2sgPT09IGNhbGVuZGFyLmNyZWF0ZSggZGF0ZVRvRGlzYWJsZSApLnBpY2tcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSWYgaXTigJlzIGFuIG9iamVjdCwgbWF0Y2ggYSBkYXRlIHdpdGhpbiB0aGUg4oCcZnJvbeKAnSBhbmQg4oCcdG/igJ0gcmFuZ2UuXHJcbiAgICAgICAgICAgIGlmICggJC5pc1BsYWluT2JqZWN0KCBkYXRlVG9EaXNhYmxlICkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsZW5kYXIud2l0aGluUmFuZ2UoIGRhdGVUb0Rpc2FibGUsIGRhdGVUb1ZlcmlmeSApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIC8vIElmIHRoaXMgZGF0ZSBtYXRjaGVzIGEgZGlzYWJsZWQgZGF0ZSwgY29uZmlybSBpdOKAmXMgbm90IGludmVydGVkLlxyXG4gICAgaXNEaXNhYmxlZE1hdGNoID0gaXNEaXNhYmxlZE1hdGNoLmxlbmd0aCAmJiAhaXNEaXNhYmxlZE1hdGNoLmZpbHRlcihmdW5jdGlvbiggZGF0ZVRvRGlzYWJsZSApIHtcclxuICAgICAgICByZXR1cm4gJC5pc0FycmF5KCBkYXRlVG9EaXNhYmxlICkgJiYgZGF0ZVRvRGlzYWJsZVszXSA9PSAnaW52ZXJ0ZWQnIHx8XHJcbiAgICAgICAgICAgICQuaXNQbGFpbk9iamVjdCggZGF0ZVRvRGlzYWJsZSApICYmIGRhdGVUb0Rpc2FibGUuaW52ZXJ0ZWRcclxuICAgIH0pLmxlbmd0aFxyXG5cclxuICAgIC8vIENoZWNrIHRoZSBjYWxlbmRhciDigJxlbmFibGVk4oCdIGZsYWcgYW5kIHJlc3BlY3RpdmVseSBmbGlwIHRoZVxyXG4gICAgLy8gZGlzYWJsZWQgc3RhdGUuIFRoZW4gYWxzbyBjaGVjayBpZiBpdOKAmXMgYmV5b25kIHRoZSBtaW4vbWF4IGxpbWl0cy5cclxuICAgIHJldHVybiBjYWxlbmRhci5pdGVtLmVuYWJsZSA9PT0gLTEgPyAhaXNEaXNhYmxlZE1hdGNoIDogaXNEaXNhYmxlZE1hdGNoIHx8XHJcbiAgICAgICAgZGF0ZVRvVmVyaWZ5LnBpY2sgPCBjYWxlbmRhci5pdGVtLm1pbi5waWNrIHx8XHJcbiAgICAgICAgZGF0ZVRvVmVyaWZ5LnBpY2sgPiBjYWxlbmRhci5pdGVtLm1heC5waWNrXHJcblxyXG59IC8vRGF0ZVBpY2tlci5wcm90b3R5cGUuZGlzYWJsZWRcclxuXHJcblxyXG4vKipcclxuICogUGFyc2UgYSBzdHJpbmcgaW50byBhIHVzYWJsZSB0eXBlLlxyXG4gKi9cclxuRGF0ZVBpY2tlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiggdHlwZSwgdmFsdWUsIG9wdGlvbnMgKSB7XHJcblxyXG4gICAgdmFyIGNhbGVuZGFyID0gdGhpcyxcclxuICAgICAgICBwYXJzaW5nT2JqZWN0ID0ge31cclxuXHJcbiAgICAvLyBJZiBpdOKAmXMgYWxyZWFkeSBwYXJzZWQsIHdl4oCZcmUgZ29vZC5cclxuICAgIGlmICggIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJyApIHtcclxuICAgICAgICByZXR1cm4gdmFsdWVcclxuICAgIH1cclxuXHJcbiAgICAvLyBXZSBuZWVkIGEgYC5mb3JtYXRgIHRvIHBhcnNlIHRoZSB2YWx1ZSB3aXRoLlxyXG4gICAgaWYgKCAhKCBvcHRpb25zICYmIG9wdGlvbnMuZm9ybWF0ICkgKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cclxuICAgICAgICBvcHRpb25zLmZvcm1hdCA9IGNhbGVuZGFyLnNldHRpbmdzLmZvcm1hdFxyXG4gICAgfVxyXG5cclxuICAgIC8vIENvbnZlcnQgdGhlIGZvcm1hdCBpbnRvIGFuIGFycmF5IGFuZCB0aGVuIG1hcCB0aHJvdWdoIGl0LlxyXG4gICAgY2FsZW5kYXIuZm9ybWF0cy50b0FycmF5KCBvcHRpb25zLmZvcm1hdCApLm1hcCggZnVuY3Rpb24oIGxhYmVsICkge1xyXG5cclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgLy8gR3JhYiB0aGUgZm9ybWF0dGluZyBsYWJlbC5cclxuICAgICAgICAgICAgZm9ybWF0dGluZ0xhYmVsID0gY2FsZW5kYXIuZm9ybWF0c1sgbGFiZWwgXSxcclxuXHJcbiAgICAgICAgICAgIC8vIFRoZSBmb3JtYXQgbGVuZ3RoIGlzIGZyb20gdGhlIGZvcm1hdHRpbmcgbGFiZWwgZnVuY3Rpb24gb3IgdGhlXHJcbiAgICAgICAgICAgIC8vIGxhYmVsIGxlbmd0aCB3aXRob3V0IHRoZSBlc2NhcGluZyBleGNsYW1hdGlvbiAoISkgbWFyay5cclxuICAgICAgICAgICAgZm9ybWF0TGVuZ3RoID0gZm9ybWF0dGluZ0xhYmVsID8gXy50cmlnZ2VyKCBmb3JtYXR0aW5nTGFiZWwsIGNhbGVuZGFyLCBbIHZhbHVlLCBwYXJzaW5nT2JqZWN0IF0gKSA6IGxhYmVsLnJlcGxhY2UoIC9eIS8sICcnICkubGVuZ3RoXHJcblxyXG4gICAgICAgIC8vIElmIHRoZXJlJ3MgYSBmb3JtYXQgbGFiZWwsIHNwbGl0IHRoZSB2YWx1ZSB1cCB0byB0aGUgZm9ybWF0IGxlbmd0aC5cclxuICAgICAgICAvLyBUaGVuIGFkZCBpdCB0byB0aGUgcGFyc2luZyBvYmplY3Qgd2l0aCBhcHByb3ByaWF0ZSBsYWJlbC5cclxuICAgICAgICBpZiAoIGZvcm1hdHRpbmdMYWJlbCApIHtcclxuICAgICAgICAgICAgcGFyc2luZ09iamVjdFsgbGFiZWwgXSA9IHZhbHVlLnN1YnN0ciggMCwgZm9ybWF0TGVuZ3RoIClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgdmFsdWUgYXMgdGhlIHN1YnN0cmluZyBmcm9tIGZvcm1hdCBsZW5ndGggdG8gZW5kLlxyXG4gICAgICAgIHZhbHVlID0gdmFsdWUuc3Vic3RyKCBmb3JtYXRMZW5ndGggKVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBDb21wZW5zYXRlIGZvciBtb250aCAwaW5kZXguXHJcbiAgICByZXR1cm4gW1xyXG4gICAgICAgIHBhcnNpbmdPYmplY3QueXl5eSB8fCBwYXJzaW5nT2JqZWN0Lnl5LFxyXG4gICAgICAgICsoIHBhcnNpbmdPYmplY3QubW0gfHwgcGFyc2luZ09iamVjdC5tICkgLSAxLFxyXG4gICAgICAgIHBhcnNpbmdPYmplY3QuZGQgfHwgcGFyc2luZ09iamVjdC5kXHJcbiAgICBdXHJcbn0gLy9EYXRlUGlja2VyLnByb3RvdHlwZS5wYXJzZVxyXG5cclxuXHJcbi8qKlxyXG4gKiBWYXJpb3VzIGZvcm1hdHMgdG8gZGlzcGxheSB0aGUgb2JqZWN0IGluLlxyXG4gKi9cclxuRGF0ZVBpY2tlci5wcm90b3R5cGUuZm9ybWF0cyA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAvLyBSZXR1cm4gdGhlIGxlbmd0aCBvZiB0aGUgZmlyc3Qgd29yZCBpbiBhIGNvbGxlY3Rpb24uXHJcbiAgICBmdW5jdGlvbiBnZXRXb3JkTGVuZ3RoRnJvbUNvbGxlY3Rpb24oIHN0cmluZywgY29sbGVjdGlvbiwgZGF0ZU9iamVjdCApIHtcclxuXHJcbiAgICAgICAgLy8gR3JhYiB0aGUgZmlyc3Qgd29yZCBmcm9tIHRoZSBzdHJpbmcuXHJcbiAgICAgICAgdmFyIHdvcmQgPSBzdHJpbmcubWF0Y2goIC9cXHcrLyApWyAwIF1cclxuXHJcbiAgICAgICAgLy8gSWYgdGhlcmUncyBubyBtb250aCBpbmRleCwgYWRkIGl0IHRvIHRoZSBkYXRlIG9iamVjdFxyXG4gICAgICAgIGlmICggIWRhdGVPYmplY3QubW0gJiYgIWRhdGVPYmplY3QubSApIHtcclxuICAgICAgICAgICAgZGF0ZU9iamVjdC5tID0gY29sbGVjdGlvbi5pbmRleE9mKCB3b3JkICkgKyAxXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIGxlbmd0aCBvZiB0aGUgd29yZC5cclxuICAgICAgICByZXR1cm4gd29yZC5sZW5ndGhcclxuICAgIH1cclxuXHJcbiAgICAvLyBHZXQgdGhlIGxlbmd0aCBvZiB0aGUgZmlyc3Qgd29yZCBpbiBhIHN0cmluZy5cclxuICAgIGZ1bmN0aW9uIGdldEZpcnN0V29yZExlbmd0aCggc3RyaW5nICkge1xyXG4gICAgICAgIHJldHVybiBzdHJpbmcubWF0Y2goIC9cXHcrLyApWyAwIF0ubGVuZ3RoXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgZDogZnVuY3Rpb24oIHN0cmluZywgZGF0ZU9iamVjdCApIHtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZXJlJ3Mgc3RyaW5nLCB0aGVuIGdldCB0aGUgZGlnaXRzIGxlbmd0aC5cclxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHJldHVybiB0aGUgc2VsZWN0ZWQgZGF0ZS5cclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZyA/IF8uZGlnaXRzKCBzdHJpbmcgKSA6IGRhdGVPYmplY3QuZGF0ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGQ6IGZ1bmN0aW9uKCBzdHJpbmcsIGRhdGVPYmplY3QgKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSdzIGEgc3RyaW5nLCB0aGVuIHRoZSBsZW5ndGggaXMgYWx3YXlzIDIuXHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSByZXR1cm4gdGhlIHNlbGVjdGVkIGRhdGUgd2l0aCBhIGxlYWRpbmcgemVyby5cclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZyA/IDIgOiBfLmxlYWQoIGRhdGVPYmplY3QuZGF0ZSApXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZGQ6IGZ1bmN0aW9uKCBzdHJpbmcsIGRhdGVPYmplY3QgKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSdzIGEgc3RyaW5nLCB0aGVuIGdldCB0aGUgbGVuZ3RoIG9mIHRoZSBmaXJzdCB3b3JkLlxyXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgcmV0dXJuIHRoZSBzaG9ydCBzZWxlY3RlZCB3ZWVrZGF5LlxyXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nID8gZ2V0Rmlyc3RXb3JkTGVuZ3RoKCBzdHJpbmcgKSA6IHRoaXMuc2V0dGluZ3Mud2Vla2RheXNTaG9ydFsgZGF0ZU9iamVjdC5kYXkgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGRkZDogZnVuY3Rpb24oIHN0cmluZywgZGF0ZU9iamVjdCApIHtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZXJlJ3MgYSBzdHJpbmcsIHRoZW4gZ2V0IHRoZSBsZW5ndGggb2YgdGhlIGZpcnN0IHdvcmQuXHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSByZXR1cm4gdGhlIGZ1bGwgc2VsZWN0ZWQgd2Vla2RheS5cclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZyA/IGdldEZpcnN0V29yZExlbmd0aCggc3RyaW5nICkgOiB0aGlzLnNldHRpbmdzLndlZWtkYXlzRnVsbFsgZGF0ZU9iamVjdC5kYXkgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbTogZnVuY3Rpb24oIHN0cmluZywgZGF0ZU9iamVjdCApIHtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZXJlJ3MgYSBzdHJpbmcsIHRoZW4gZ2V0IHRoZSBsZW5ndGggb2YgdGhlIGRpZ2l0c1xyXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgcmV0dXJuIHRoZSBzZWxlY3RlZCBtb250aCB3aXRoIDBpbmRleCBjb21wZW5zYXRpb24uXHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmcgPyBfLmRpZ2l0cyggc3RyaW5nICkgOiBkYXRlT2JqZWN0Lm1vbnRoICsgMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW06IGZ1bmN0aW9uKCBzdHJpbmcsIGRhdGVPYmplY3QgKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSdzIGEgc3RyaW5nLCB0aGVuIHRoZSBsZW5ndGggaXMgYWx3YXlzIDIuXHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSByZXR1cm4gdGhlIHNlbGVjdGVkIG1vbnRoIHdpdGggMGluZGV4IGFuZCBsZWFkaW5nIHplcm8uXHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmcgPyAyIDogXy5sZWFkKCBkYXRlT2JqZWN0Lm1vbnRoICsgMSApXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtbW06IGZ1bmN0aW9uKCBzdHJpbmcsIGRhdGVPYmplY3QgKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgY29sbGVjdGlvbiA9IHRoaXMuc2V0dGluZ3MubW9udGhzU2hvcnRcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZXJlJ3MgYSBzdHJpbmcsIGdldCBsZW5ndGggb2YgdGhlIHJlbGV2YW50IG1vbnRoIGZyb20gdGhlIHNob3J0XHJcbiAgICAgICAgICAgIC8vIG1vbnRocyBjb2xsZWN0aW9uLiBPdGhlcndpc2UgcmV0dXJuIHRoZSBzZWxlY3RlZCBtb250aCBmcm9tIHRoYXQgY29sbGVjdGlvbi5cclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZyA/IGdldFdvcmRMZW5ndGhGcm9tQ29sbGVjdGlvbiggc3RyaW5nLCBjb2xsZWN0aW9uLCBkYXRlT2JqZWN0ICkgOiBjb2xsZWN0aW9uWyBkYXRlT2JqZWN0Lm1vbnRoIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1tbW06IGZ1bmN0aW9uKCBzdHJpbmcsIGRhdGVPYmplY3QgKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgY29sbGVjdGlvbiA9IHRoaXMuc2V0dGluZ3MubW9udGhzRnVsbFxyXG5cclxuICAgICAgICAgICAgLy8gSWYgdGhlcmUncyBhIHN0cmluZywgZ2V0IGxlbmd0aCBvZiB0aGUgcmVsZXZhbnQgbW9udGggZnJvbSB0aGUgZnVsbFxyXG4gICAgICAgICAgICAvLyBtb250aHMgY29sbGVjdGlvbi4gT3RoZXJ3aXNlIHJldHVybiB0aGUgc2VsZWN0ZWQgbW9udGggZnJvbSB0aGF0IGNvbGxlY3Rpb24uXHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmcgPyBnZXRXb3JkTGVuZ3RoRnJvbUNvbGxlY3Rpb24oIHN0cmluZywgY29sbGVjdGlvbiwgZGF0ZU9iamVjdCApIDogY29sbGVjdGlvblsgZGF0ZU9iamVjdC5tb250aCBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB5eTogZnVuY3Rpb24oIHN0cmluZywgZGF0ZU9iamVjdCApIHtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZXJlJ3MgYSBzdHJpbmcsIHRoZW4gdGhlIGxlbmd0aCBpcyBhbHdheXMgMi5cclxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHJldHVybiB0aGUgc2VsZWN0ZWQgeWVhciBieSBzbGljaW5nIG91dCB0aGUgZmlyc3QgMiBkaWdpdHMuXHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmcgPyAyIDogKCAnJyArIGRhdGVPYmplY3QueWVhciApLnNsaWNlKCAyIClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHl5eXk6IGZ1bmN0aW9uKCBzdHJpbmcsIGRhdGVPYmplY3QgKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSdzIGEgc3RyaW5nLCB0aGVuIHRoZSBsZW5ndGggaXMgYWx3YXlzIDQuXHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSByZXR1cm4gdGhlIHNlbGVjdGVkIHllYXIuXHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmcgPyA0IDogZGF0ZU9iamVjdC55ZWFyXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGFuIGFycmF5IGJ5IHNwbGl0dGluZyB0aGUgZm9ybWF0dGluZyBzdHJpbmcgcGFzc2VkLlxyXG4gICAgICAgIHRvQXJyYXk6IGZ1bmN0aW9uKCBmb3JtYXRTdHJpbmcgKSB7IHJldHVybiBmb3JtYXRTdHJpbmcuc3BsaXQoIC8oZHsxLDR9fG17MSw0fXx5ezR9fHl5fCEuKS9nICkgfSxcclxuXHJcbiAgICAgICAgLy8gRm9ybWF0IGFuIG9iamVjdCBpbnRvIGEgc3RyaW5nIHVzaW5nIHRoZSBmb3JtYXR0aW5nIG9wdGlvbnMuXHJcbiAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICggZm9ybWF0U3RyaW5nLCBpdGVtT2JqZWN0ICkge1xyXG4gICAgICAgICAgICB2YXIgY2FsZW5kYXIgPSB0aGlzXHJcbiAgICAgICAgICAgIHJldHVybiBjYWxlbmRhci5mb3JtYXRzLnRvQXJyYXkoIGZvcm1hdFN0cmluZyApLm1hcCggZnVuY3Rpb24oIGxhYmVsICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF8udHJpZ2dlciggY2FsZW5kYXIuZm9ybWF0c1sgbGFiZWwgXSwgY2FsZW5kYXIsIFsgMCwgaXRlbU9iamVjdCBdICkgfHwgbGFiZWwucmVwbGFjZSggL14hLywgJycgKVxyXG4gICAgICAgICAgICB9KS5qb2luKCAnJyApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpIC8vRGF0ZVBpY2tlci5wcm90b3R5cGUuZm9ybWF0c1xyXG5cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHR3byBkYXRlIHVuaXRzIGFyZSB0aGUgZXhhY3QuXHJcbiAqL1xyXG5EYXRlUGlja2VyLnByb3RvdHlwZS5pc0RhdGVFeGFjdCA9IGZ1bmN0aW9uKCBvbmUsIHR3byApIHtcclxuXHJcbiAgICB2YXIgY2FsZW5kYXIgPSB0aGlzXHJcblxyXG4gICAgLy8gV2hlbiB3ZeKAmXJlIHdvcmtpbmcgd2l0aCB3ZWVrZGF5cywgZG8gYSBkaXJlY3QgY29tcGFyaXNvbi5cclxuICAgIGlmIChcclxuICAgICAgICAoIF8uaXNJbnRlZ2VyKCBvbmUgKSAmJiBfLmlzSW50ZWdlciggdHdvICkgKSB8fFxyXG4gICAgICAgICggdHlwZW9mIG9uZSA9PSAnYm9vbGVhbicgJiYgdHlwZW9mIHR3byA9PSAnYm9vbGVhbicgKVxyXG4gICAgICkge1xyXG4gICAgICAgIHJldHVybiBvbmUgPT09IHR3b1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFdoZW4gd2XigJlyZSB3b3JraW5nIHdpdGggZGF0ZSByZXByZXNlbnRhdGlvbnMsIGNvbXBhcmUgdGhlIOKAnHBpY2vigJ0gdmFsdWUuXHJcbiAgICBpZiAoXHJcbiAgICAgICAgKCBfLmlzRGF0ZSggb25lICkgfHwgJC5pc0FycmF5KCBvbmUgKSApICYmXHJcbiAgICAgICAgKCBfLmlzRGF0ZSggdHdvICkgfHwgJC5pc0FycmF5KCB0d28gKSApXHJcbiAgICApIHtcclxuICAgICAgICByZXR1cm4gY2FsZW5kYXIuY3JlYXRlKCBvbmUgKS5waWNrID09PSBjYWxlbmRhci5jcmVhdGUoIHR3byApLnBpY2tcclxuICAgIH1cclxuXHJcbiAgICAvLyBXaGVuIHdl4oCZcmUgd29ya2luZyB3aXRoIHJhbmdlIG9iamVjdHMsIGNvbXBhcmUgdGhlIOKAnGZyb23igJ0gYW5kIOKAnHRv4oCdLlxyXG4gICAgaWYgKCAkLmlzUGxhaW5PYmplY3QoIG9uZSApICYmICQuaXNQbGFpbk9iamVjdCggdHdvICkgKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGVuZGFyLmlzRGF0ZUV4YWN0KCBvbmUuZnJvbSwgdHdvLmZyb20gKSAmJiBjYWxlbmRhci5pc0RhdGVFeGFjdCggb25lLnRvLCB0d28udG8gKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHR3byBkYXRlIHVuaXRzIG92ZXJsYXAuXHJcbiAqL1xyXG5EYXRlUGlja2VyLnByb3RvdHlwZS5pc0RhdGVPdmVybGFwID0gZnVuY3Rpb24oIG9uZSwgdHdvICkge1xyXG5cclxuICAgIHZhciBjYWxlbmRhciA9IHRoaXMsXHJcbiAgICAgICAgZmlyc3REYXkgPSBjYWxlbmRhci5zZXR0aW5ncy5maXJzdERheSA/IDEgOiAwXHJcblxyXG4gICAgLy8gV2hlbiB3ZeKAmXJlIHdvcmtpbmcgd2l0aCBhIHdlZWtkYXkgaW5kZXgsIGNvbXBhcmUgdGhlIGRheXMuXHJcbiAgICBpZiAoIF8uaXNJbnRlZ2VyKCBvbmUgKSAmJiAoIF8uaXNEYXRlKCB0d28gKSB8fCAkLmlzQXJyYXkoIHR3byApICkgKSB7XHJcbiAgICAgICAgb25lID0gb25lICUgNyArIGZpcnN0RGF5XHJcbiAgICAgICAgcmV0dXJuIG9uZSA9PT0gY2FsZW5kYXIuY3JlYXRlKCB0d28gKS5kYXkgKyAxXHJcbiAgICB9XHJcbiAgICBpZiAoIF8uaXNJbnRlZ2VyKCB0d28gKSAmJiAoIF8uaXNEYXRlKCBvbmUgKSB8fCAkLmlzQXJyYXkoIG9uZSApICkgKSB7XHJcbiAgICAgICAgdHdvID0gdHdvICUgNyArIGZpcnN0RGF5XHJcbiAgICAgICAgcmV0dXJuIHR3byA9PT0gY2FsZW5kYXIuY3JlYXRlKCBvbmUgKS5kYXkgKyAxXHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2hlbiB3ZeKAmXJlIHdvcmtpbmcgd2l0aCByYW5nZSBvYmplY3RzLCBjaGVjayBpZiB0aGUgcmFuZ2VzIG92ZXJsYXAuXHJcbiAgICBpZiAoICQuaXNQbGFpbk9iamVjdCggb25lICkgJiYgJC5pc1BsYWluT2JqZWN0KCB0d28gKSApIHtcclxuICAgICAgICByZXR1cm4gY2FsZW5kYXIub3ZlcmxhcFJhbmdlcyggb25lLCB0d28gKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEZsaXAgdGhlIOKAnGVuYWJsZWTigJ0gc3RhdGUuXHJcbiAqL1xyXG5EYXRlUGlja2VyLnByb3RvdHlwZS5mbGlwRW5hYmxlID0gZnVuY3Rpb24odmFsKSB7XHJcbiAgICB2YXIgaXRlbU9iamVjdCA9IHRoaXMuaXRlbVxyXG4gICAgaXRlbU9iamVjdC5lbmFibGUgPSB2YWwgfHwgKGl0ZW1PYmplY3QuZW5hYmxlID09IC0xID8gMSA6IC0xKVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIE1hcmsgYSBjb2xsZWN0aW9uIG9mIGRhdGVzIGFzIOKAnGRpc2FibGVk4oCdLlxyXG4gKi9cclxuRGF0ZVBpY2tlci5wcm90b3R5cGUuZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uKCB0eXBlLCBkYXRlc1RvRGlzYWJsZSApIHtcclxuXHJcbiAgICB2YXIgY2FsZW5kYXIgPSB0aGlzLFxyXG4gICAgICAgIGRpc2FibGVkSXRlbXMgPSBjYWxlbmRhci5pdGVtLmRpc2FibGUuc2xpY2UoMClcclxuXHJcblxyXG4gICAgLy8gSWYgd2XigJlyZSBmbGlwcGluZywgdGhhdOKAmXMgYWxsIHdlIG5lZWQgdG8gZG8uXHJcbiAgICBpZiAoIGRhdGVzVG9EaXNhYmxlID09ICdmbGlwJyApIHtcclxuICAgICAgICBjYWxlbmRhci5mbGlwRW5hYmxlKClcclxuICAgIH1cclxuXHJcbiAgICBlbHNlIGlmICggZGF0ZXNUb0Rpc2FibGUgPT09IGZhbHNlICkge1xyXG4gICAgICAgIGNhbGVuZGFyLmZsaXBFbmFibGUoMSlcclxuICAgICAgICBkaXNhYmxlZEl0ZW1zID0gW11cclxuICAgIH1cclxuXHJcbiAgICBlbHNlIGlmICggZGF0ZXNUb0Rpc2FibGUgPT09IHRydWUgKSB7XHJcbiAgICAgICAgY2FsZW5kYXIuZmxpcEVuYWJsZSgtMSlcclxuICAgICAgICBkaXNhYmxlZEl0ZW1zID0gW11cclxuICAgIH1cclxuXHJcbiAgICAvLyBPdGhlcndpc2UgZ28gdGhyb3VnaCB0aGUgZGF0ZXMgdG8gZGlzYWJsZS5cclxuICAgIGVsc2Uge1xyXG5cclxuICAgICAgICBkYXRlc1RvRGlzYWJsZS5tYXAoZnVuY3Rpb24oIHVuaXRUb0Rpc2FibGUgKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWF0Y2hGb3VuZFxyXG5cclxuICAgICAgICAgICAgLy8gV2hlbiB3ZSBoYXZlIGRpc2FibGVkIGl0ZW1zLCBjaGVjayBmb3IgbWF0Y2hlcy5cclxuICAgICAgICAgICAgLy8gSWYgc29tZXRoaW5nIGlzIG1hdGNoZWQsIGltbWVkaWF0ZWx5IGJyZWFrIG91dC5cclxuICAgICAgICAgICAgZm9yICggdmFyIGluZGV4ID0gMDsgaW5kZXggPCBkaXNhYmxlZEl0ZW1zLmxlbmd0aDsgaW5kZXggKz0gMSApIHtcclxuICAgICAgICAgICAgICAgIGlmICggY2FsZW5kYXIuaXNEYXRlRXhhY3QoIHVuaXRUb0Rpc2FibGUsIGRpc2FibGVkSXRlbXNbaW5kZXhdICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hGb3VuZCA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBub3RoaW5nIHdhcyBmb3VuZCwgYWRkIHRoZSB2YWxpZGF0ZWQgdW5pdCB0byB0aGUgY29sbGVjdGlvbi5cclxuICAgICAgICAgICAgaWYgKCAhbWF0Y2hGb3VuZCApIHtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICBfLmlzSW50ZWdlciggdW5pdFRvRGlzYWJsZSApIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgXy5pc0RhdGUoIHVuaXRUb0Rpc2FibGUgKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICQuaXNBcnJheSggdW5pdFRvRGlzYWJsZSApIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKCAkLmlzUGxhaW5PYmplY3QoIHVuaXRUb0Rpc2FibGUgKSAmJiB1bml0VG9EaXNhYmxlLmZyb20gJiYgdW5pdFRvRGlzYWJsZS50byApXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZEl0ZW1zLnB1c2goIHVuaXRUb0Rpc2FibGUgKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm4gdGhlIHVwZGF0ZWQgY29sbGVjdGlvbi5cclxuICAgIHJldHVybiBkaXNhYmxlZEl0ZW1zXHJcbn0gLy9EYXRlUGlja2VyLnByb3RvdHlwZS5kZWFjdGl2YXRlXHJcblxyXG5cclxuLyoqXHJcbiAqIE1hcmsgYSBjb2xsZWN0aW9uIG9mIGRhdGVzIGFzIOKAnGVuYWJsZWTigJ0uXHJcbiAqL1xyXG5EYXRlUGlja2VyLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uKCB0eXBlLCBkYXRlc1RvRW5hYmxlICkge1xyXG5cclxuICAgIHZhciBjYWxlbmRhciA9IHRoaXMsXHJcbiAgICAgICAgZGlzYWJsZWRJdGVtcyA9IGNhbGVuZGFyLml0ZW0uZGlzYWJsZSxcclxuICAgICAgICBkaXNhYmxlZEl0ZW1zQ291bnQgPSBkaXNhYmxlZEl0ZW1zLmxlbmd0aFxyXG5cclxuICAgIC8vIElmIHdl4oCZcmUgZmxpcHBpbmcsIHRoYXTigJlzIGFsbCB3ZSBuZWVkIHRvIGRvLlxyXG4gICAgaWYgKCBkYXRlc1RvRW5hYmxlID09ICdmbGlwJyApIHtcclxuICAgICAgICBjYWxlbmRhci5mbGlwRW5hYmxlKClcclxuICAgIH1cclxuXHJcbiAgICBlbHNlIGlmICggZGF0ZXNUb0VuYWJsZSA9PT0gdHJ1ZSApIHtcclxuICAgICAgICBjYWxlbmRhci5mbGlwRW5hYmxlKDEpXHJcbiAgICAgICAgZGlzYWJsZWRJdGVtcyA9IFtdXHJcbiAgICB9XHJcblxyXG4gICAgZWxzZSBpZiAoIGRhdGVzVG9FbmFibGUgPT09IGZhbHNlICkge1xyXG4gICAgICAgIGNhbGVuZGFyLmZsaXBFbmFibGUoLTEpXHJcbiAgICAgICAgZGlzYWJsZWRJdGVtcyA9IFtdXHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3RoZXJ3aXNlIGdvIHRocm91Z2ggdGhlIGRpc2FibGVkIGRhdGVzLlxyXG4gICAgZWxzZSB7XHJcblxyXG4gICAgICAgIGRhdGVzVG9FbmFibGUubWFwKGZ1bmN0aW9uKCB1bml0VG9FbmFibGUgKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWF0Y2hGb3VuZCxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkVW5pdCxcclxuICAgICAgICAgICAgICAgIGluZGV4LFxyXG4gICAgICAgICAgICAgICAgaXNFeGFjdFJhbmdlXHJcblxyXG4gICAgICAgICAgICAvLyBHbyB0aHJvdWdoIHRoZSBkaXNhYmxlZCBpdGVtcyBhbmQgdHJ5IHRvIGZpbmQgYSBtYXRjaC5cclxuICAgICAgICAgICAgZm9yICggaW5kZXggPSAwOyBpbmRleCA8IGRpc2FibGVkSXRlbXNDb3VudDsgaW5kZXggKz0gMSApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZFVuaXQgPSBkaXNhYmxlZEl0ZW1zW2luZGV4XVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFdoZW4gYW4gZXhhY3QgbWF0Y2ggaXMgZm91bmQsIHJlbW92ZSBpdCBmcm9tIHRoZSBjb2xsZWN0aW9uLlxyXG4gICAgICAgICAgICAgICAgaWYgKCBjYWxlbmRhci5pc0RhdGVFeGFjdCggZGlzYWJsZWRVbml0LCB1bml0VG9FbmFibGUgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXRjaEZvdW5kID0gZGlzYWJsZWRJdGVtc1tpbmRleF0gPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNFeGFjdFJhbmdlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gV2hlbiBhbiBvdmVybGFwcGVkIG1hdGNoIGlzIGZvdW5kLCBhZGQgdGhlIOKAnGludmVydGVk4oCdIHN0YXRlIHRvIGl0LlxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIGNhbGVuZGFyLmlzRGF0ZU92ZXJsYXAoIGRpc2FibGVkVW5pdCwgdW5pdFRvRW5hYmxlICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAkLmlzUGxhaW5PYmplY3QoIHVuaXRUb0VuYWJsZSApICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bml0VG9FbmFibGUuaW52ZXJ0ZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoRm91bmQgPSB1bml0VG9FbmFibGVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoICQuaXNBcnJheSggdW5pdFRvRW5hYmxlICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoRm91bmQgPSB1bml0VG9FbmFibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAhbWF0Y2hGb3VuZFszXSApIG1hdGNoRm91bmQucHVzaCggJ2ludmVydGVkJyApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCBfLmlzRGF0ZSggdW5pdFRvRW5hYmxlICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoRm91bmQgPSBbIHVuaXRUb0VuYWJsZS5nZXRGdWxsWWVhcigpLCB1bml0VG9FbmFibGUuZ2V0TW9udGgoKSwgdW5pdFRvRW5hYmxlLmdldERhdGUoKSwgJ2ludmVydGVkJyBdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIElmIGEgbWF0Y2ggd2FzIGZvdW5kLCByZW1vdmUgYSBwcmV2aW91cyBkdXBsaWNhdGUgZW50cnkuXHJcbiAgICAgICAgICAgIGlmICggbWF0Y2hGb3VuZCApIGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBkaXNhYmxlZEl0ZW1zQ291bnQ7IGluZGV4ICs9IDEgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGNhbGVuZGFyLmlzRGF0ZUV4YWN0KCBkaXNhYmxlZEl0ZW1zW2luZGV4XSwgdW5pdFRvRW5hYmxlICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWRJdGVtc1tpbmRleF0gPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSW4gdGhlIGV2ZW50IHRoYXQgd2XigJlyZSBkZWFsaW5nIHdpdGggYW4gZXhhY3QgcmFuZ2Ugb2YgZGF0ZXMsXHJcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGVyZSBhcmUgbm8g4oCcaW52ZXJ0ZWTigJ0gZGF0ZXMgYmVjYXVzZSBvZiBpdC5cclxuICAgICAgICAgICAgaWYgKCBpc0V4YWN0UmFuZ2UgKSBmb3IgKCBpbmRleCA9IDA7IGluZGV4IDwgZGlzYWJsZWRJdGVtc0NvdW50OyBpbmRleCArPSAxICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBjYWxlbmRhci5pc0RhdGVPdmVybGFwKCBkaXNhYmxlZEl0ZW1zW2luZGV4XSwgdW5pdFRvRW5hYmxlICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWRJdGVtc1tpbmRleF0gPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSWYgc29tZXRoaW5nIGlzIHN0aWxsIG1hdGNoZWQsIGFkZCBpdCBpbnRvIHRoZSBjb2xsZWN0aW9uLlxyXG4gICAgICAgICAgICBpZiAoIG1hdGNoRm91bmQgKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZEl0ZW1zLnB1c2goIG1hdGNoRm91bmQgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm4gdGhlIHVwZGF0ZWQgY29sbGVjdGlvbi5cclxuICAgIHJldHVybiBkaXNhYmxlZEl0ZW1zLmZpbHRlcihmdW5jdGlvbiggdmFsICkgeyByZXR1cm4gdmFsICE9IG51bGwgfSlcclxufSAvL0RhdGVQaWNrZXIucHJvdG90eXBlLmFjdGl2YXRlXHJcblxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIHN0cmluZyBmb3IgdGhlIG5vZGVzIGluIHRoZSBwaWNrZXIuXHJcbiAqL1xyXG5EYXRlUGlja2VyLnByb3RvdHlwZS5ub2RlcyA9IGZ1bmN0aW9uKCBpc09wZW4gKSB7XHJcblxyXG4gICAgdmFyXHJcbiAgICAgICAgY2FsZW5kYXIgPSB0aGlzLFxyXG4gICAgICAgIHNldHRpbmdzID0gY2FsZW5kYXIuc2V0dGluZ3MsXHJcbiAgICAgICAgY2FsZW5kYXJJdGVtID0gY2FsZW5kYXIuaXRlbSxcclxuICAgICAgICBub3dPYmplY3QgPSBjYWxlbmRhckl0ZW0ubm93LFxyXG4gICAgICAgIHNlbGVjdGVkT2JqZWN0ID0gY2FsZW5kYXJJdGVtLnNlbGVjdCxcclxuICAgICAgICBoaWdobGlnaHRlZE9iamVjdCA9IGNhbGVuZGFySXRlbS5oaWdobGlnaHQsXHJcbiAgICAgICAgdmlld3NldE9iamVjdCA9IGNhbGVuZGFySXRlbS52aWV3LFxyXG4gICAgICAgIGRpc2FibGVkQ29sbGVjdGlvbiA9IGNhbGVuZGFySXRlbS5kaXNhYmxlLFxyXG4gICAgICAgIG1pbkxpbWl0T2JqZWN0ID0gY2FsZW5kYXJJdGVtLm1pbixcclxuICAgICAgICBtYXhMaW1pdE9iamVjdCA9IGNhbGVuZGFySXRlbS5tYXgsXHJcblxyXG5cclxuICAgICAgICAvLyBDcmVhdGUgdGhlIGNhbGVuZGFyIHRhYmxlIGhlYWQgdXNpbmcgYSBjb3B5IG9mIHdlZWtkYXkgbGFiZWxzIGNvbGxlY3Rpb24uXHJcbiAgICAgICAgLy8gKiBXZSBkbyBhIGNvcHkgc28gd2UgZG9uJ3QgbXV0YXRlIHRoZSBvcmlnaW5hbCBhcnJheS5cclxuICAgICAgICB0YWJsZUhlYWQgPSAoZnVuY3Rpb24oIGNvbGxlY3Rpb24sIGZ1bGxDb2xsZWN0aW9uICkge1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgdGhlIGZpcnN0IGRheSBzaG91bGQgYmUgTW9uZGF5LCBtb3ZlIFN1bmRheSB0byB0aGUgZW5kLlxyXG4gICAgICAgICAgICBpZiAoIHNldHRpbmdzLmZpcnN0RGF5ICkge1xyXG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbi5wdXNoKCBjb2xsZWN0aW9uLnNoaWZ0KCkgKVxyXG4gICAgICAgICAgICAgICAgZnVsbENvbGxlY3Rpb24ucHVzaCggZnVsbENvbGxlY3Rpb24uc2hpZnQoKSApXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhbmQgcmV0dXJuIHRoZSB0YWJsZSBoZWFkIGdyb3VwLlxyXG4gICAgICAgICAgICByZXR1cm4gXy5ub2RlKFxyXG4gICAgICAgICAgICAgICAgJ3RoZWFkJyxcclxuICAgICAgICAgICAgICAgIF8ubm9kZShcclxuICAgICAgICAgICAgICAgICAgICAndHInLFxyXG4gICAgICAgICAgICAgICAgICAgIF8uZ3JvdXAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heDogREFZU19JTl9XRUVLIC0gMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTogJ3RoJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbTogZnVuY3Rpb24oIGNvdW50ZXIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25bIGNvdW50ZXIgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5rbGFzcy53ZWVrZGF5cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc2NvcGU9Y29sIHRpdGxlPVwiJyArIGZ1bGxDb2xsZWN0aW9uWyBjb3VudGVyIF0gKyAnXCInXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApIC8vZW5kcmV0dXJuXHJcblxyXG4gICAgICAgIC8vIE1hdGVyaWFsaXplIG1vZGlmaWVkXHJcbiAgICAgICAgfSkoICggc2V0dGluZ3Muc2hvd1dlZWtkYXlzRnVsbCA/IHNldHRpbmdzLndlZWtkYXlzRnVsbCA6IHNldHRpbmdzLndlZWtkYXlzTGV0dGVyICkuc2xpY2UoIDAgKSwgc2V0dGluZ3Mud2Vla2RheXNGdWxsLnNsaWNlKCAwICkgKSwgLy90YWJsZUhlYWRcclxuXHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgbmF2IGZvciBuZXh0L3ByZXYgbW9udGguXHJcbiAgICAgICAgY3JlYXRlTW9udGhOYXYgPSBmdW5jdGlvbiggbmV4dCApIHtcclxuXHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgcmV0dXJuIHRoZSBjcmVhdGVkIG1vbnRoIHRhZy5cclxuICAgICAgICAgICAgcmV0dXJuIF8ubm9kZShcclxuICAgICAgICAgICAgICAgICdkaXYnLFxyXG4gICAgICAgICAgICAgICAgJyAnLFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3Mua2xhc3NbICduYXYnICsgKCBuZXh0ID8gJ05leHQnIDogJ1ByZXYnICkgXSArIChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIGZvY3VzZWQgbW9udGggaXMgb3V0c2lkZSB0aGUgcmFuZ2UsIGRpc2FibGVkIHRoZSBidXR0b24uXHJcbiAgICAgICAgICAgICAgICAgICAgKCBuZXh0ICYmIHZpZXdzZXRPYmplY3QueWVhciA+PSBtYXhMaW1pdE9iamVjdC55ZWFyICYmIHZpZXdzZXRPYmplY3QubW9udGggPj0gbWF4TGltaXRPYmplY3QubW9udGggKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICggIW5leHQgJiYgdmlld3NldE9iamVjdC55ZWFyIDw9IG1pbkxpbWl0T2JqZWN0LnllYXIgJiYgdmlld3NldE9iamVjdC5tb250aCA8PSBtaW5MaW1pdE9iamVjdC5tb250aCApID9cclxuICAgICAgICAgICAgICAgICAgICAnICcgKyBzZXR0aW5ncy5rbGFzcy5uYXZEaXNhYmxlZCA6ICcnXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgJ2RhdGEtbmF2PScgKyAoIG5leHQgfHwgLTEgKSArICcgJyArXHJcbiAgICAgICAgICAgICAgICBfLmFyaWFBdHRyKHtcclxuICAgICAgICAgICAgICAgICAgICByb2xlOiAnYnV0dG9uJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sczogY2FsZW5kYXIuJG5vZGVbMF0uaWQgKyAnX3RhYmxlJ1xyXG4gICAgICAgICAgICAgICAgfSkgKyAnICcgK1xyXG4gICAgICAgICAgICAgICAgJ3RpdGxlPVwiJyArIChuZXh0ID8gc2V0dGluZ3MubGFiZWxNb250aE5leHQgOiBzZXR0aW5ncy5sYWJlbE1vbnRoUHJldiApICsgJ1wiJ1xyXG4gICAgICAgICAgICApIC8vZW5kcmV0dXJuXHJcbiAgICAgICAgfSwgLy9jcmVhdGVNb250aE5hdlxyXG5cclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBtb250aCBsYWJlbC5cclxuICAgICAgICAvL01hdGVyaWFsaXplIG1vZGlmaWVkXHJcbiAgICAgICAgY3JlYXRlTW9udGhMYWJlbCA9IGZ1bmN0aW9uKG92ZXJyaWRlKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgbW9udGhzQ29sbGVjdGlvbiA9IHNldHRpbmdzLnNob3dNb250aHNTaG9ydCA/IHNldHRpbmdzLm1vbnRoc1Nob3J0IDogc2V0dGluZ3MubW9udGhzRnVsbFxyXG5cclxuICAgICAgICAgICAgIC8vIE1hdGVyaWFsaXplIG1vZGlmaWVkXHJcbiAgICAgICAgICAgIGlmIChvdmVycmlkZSA9PSBcInNob3J0X21vbnRoc1wiKSB7XHJcbiAgICAgICAgICAgICAgbW9udGhzQ29sbGVjdGlvbiA9IHNldHRpbmdzLm1vbnRoc1Nob3J0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbW9udGhzIHRvIHNlbGVjdCwgYWRkIGEgZHJvcGRvd24gbWVudS5cclxuICAgICAgICAgICAgaWYgKCBzZXR0aW5ncy5zZWxlY3RNb250aHMgICYmIG92ZXJyaWRlID09IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBfLm5vZGUoICdzZWxlY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIF8uZ3JvdXAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heDogMTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGU6ICdvcHRpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtOiBmdW5jdGlvbiggbG9vcGVkTW9udGggKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGxvb3BlZCBtb250aCBhbmQgbm8gY2xhc3Nlcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb250aHNDb2xsZWN0aW9uWyBsb29wZWRNb250aCBdLCAwLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIHZhbHVlIGFuZCBzZWxlY3RlZCBpbmRleC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmFsdWU9JyArIGxvb3BlZE1vbnRoICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoIHZpZXdzZXRPYmplY3QubW9udGggPT0gbG9vcGVkTW9udGggPyAnIHNlbGVjdGVkJyA6ICcnICkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCB2aWV3c2V0T2JqZWN0LnllYXIgPT0gbWluTGltaXRPYmplY3QueWVhciAmJiBsb29wZWRNb250aCA8IG1pbkxpbWl0T2JqZWN0Lm1vbnRoICkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICggdmlld3NldE9iamVjdC55ZWFyID09IG1heExpbWl0T2JqZWN0LnllYXIgJiYgbG9vcGVkTW9udGggPiBtYXhMaW1pdE9iamVjdC5tb250aCApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIGRpc2FibGVkJyA6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3Mua2xhc3Muc2VsZWN0TW9udGggKyAnIGJyb3dzZXItZGVmYXVsdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgKCBpc09wZW4gPyAnJyA6ICdkaXNhYmxlZCcgKSArICcgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgXy5hcmlhQXR0cih7IGNvbnRyb2xzOiBjYWxlbmRhci4kbm9kZVswXS5pZCArICdfdGFibGUnIH0pICsgJyAnICtcclxuICAgICAgICAgICAgICAgICAgICAndGl0bGU9XCInICsgc2V0dGluZ3MubGFiZWxNb250aFNlbGVjdCArICdcIidcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTWF0ZXJpYWxpemUgbW9kaWZpZWRcclxuICAgICAgICAgICAgaWYgKG92ZXJyaWRlID09IFwic2hvcnRfbW9udGhzXCIpXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRPYmplY3QgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBtb250aHNDb2xsZWN0aW9uWyBzZWxlY3RlZE9iamVjdC5tb250aCBdO1xyXG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gbW9udGhzQ29sbGVjdGlvblsgdmlld3NldE9iamVjdC5tb250aCBdO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgdGhlcmUncyBhIG5lZWQgZm9yIGEgbW9udGggc2VsZWN0b3JcclxuICAgICAgICAgICAgcmV0dXJuIF8ubm9kZSggJ2RpdicsIG1vbnRoc0NvbGxlY3Rpb25bIHZpZXdzZXRPYmplY3QubW9udGggXSwgc2V0dGluZ3Mua2xhc3MubW9udGggKVxyXG4gICAgICAgIH0sIC8vY3JlYXRlTW9udGhMYWJlbFxyXG5cclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSB5ZWFyIGxhYmVsLlxyXG4gICAgICAgIC8vIE1hdGVyaWFsaXplIG1vZGlmaWVkXHJcbiAgICAgICAgY3JlYXRlWWVhckxhYmVsID0gZnVuY3Rpb24ob3ZlcnJpZGUpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBmb2N1c2VkWWVhciA9IHZpZXdzZXRPYmplY3QueWVhcixcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHllYXJzIHNlbGVjdG9yIGlzIHNldCB0byBhIGxpdGVyYWwgXCJ0cnVlXCIsIHNldCBpdCB0byA1LiBPdGhlcndpc2VcclxuICAgICAgICAgICAgLy8gZGl2aWRlIGluIGhhbGYgdG8gZ2V0IGhhbGYgYmVmb3JlIGFuZCBoYWxmIGFmdGVyIGZvY3VzZWQgeWVhci5cclxuICAgICAgICAgICAgbnVtYmVyWWVhcnMgPSBzZXR0aW5ncy5zZWxlY3RZZWFycyA9PT0gdHJ1ZSA/IDUgOiB+figgc2V0dGluZ3Muc2VsZWN0WWVhcnMgLyAyIClcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBhcmUgeWVhcnMgdG8gc2VsZWN0LCBhZGQgYSBkcm9wZG93biBtZW51LlxyXG4gICAgICAgICAgICBpZiAoIG51bWJlclllYXJzICkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhclxyXG4gICAgICAgICAgICAgICAgICAgIG1pblllYXIgPSBtaW5MaW1pdE9iamVjdC55ZWFyLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFllYXIgPSBtYXhMaW1pdE9iamVjdC55ZWFyLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvd2VzdFllYXIgPSBmb2N1c2VkWWVhciAtIG51bWJlclllYXJzLFxyXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hlc3RZZWFyID0gZm9jdXNlZFllYXIgKyBudW1iZXJZZWFyc1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBtaW4geWVhciBpcyBncmVhdGVyIHRoYW4gdGhlIGxvd2VzdCB5ZWFyLCBpbmNyZWFzZSB0aGUgaGlnaGVzdCB5ZWFyXHJcbiAgICAgICAgICAgICAgICAvLyBieSB0aGUgZGlmZmVyZW5jZSBhbmQgc2V0IHRoZSBsb3dlc3QgeWVhciB0byB0aGUgbWluIHllYXIuXHJcbiAgICAgICAgICAgICAgICBpZiAoIG1pblllYXIgPiBsb3dlc3RZZWFyICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hlc3RZZWFyICs9IG1pblllYXIgLSBsb3dlc3RZZWFyXHJcbiAgICAgICAgICAgICAgICAgICAgbG93ZXN0WWVhciA9IG1pblllYXJcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgbWF4IHllYXIgaXMgbGVzcyB0aGFuIHRoZSBoaWdoZXN0IHllYXIsIGRlY3JlYXNlIHRoZSBsb3dlc3QgeWVhclxyXG4gICAgICAgICAgICAgICAgLy8gYnkgdGhlIGxvd2VyIG9mIHRoZSB0d286IGF2YWlsYWJsZSBhbmQgbmVlZGVkIHllYXJzLiBUaGVuIHNldCB0aGVcclxuICAgICAgICAgICAgICAgIC8vIGhpZ2hlc3QgeWVhciB0byB0aGUgbWF4IHllYXIuXHJcbiAgICAgICAgICAgICAgICBpZiAoIG1heFllYXIgPCBoaWdoZXN0WWVhciApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF2YWlsYWJsZVllYXJzID0gbG93ZXN0WWVhciAtIG1pblllYXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRlZFllYXJzID0gaGlnaGVzdFllYXIgLSBtYXhZZWFyXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxvd2VzdFllYXIgLT0gYXZhaWxhYmxlWWVhcnMgPiBuZWVkZWRZZWFycyA/IG5lZWRlZFllYXJzIDogYXZhaWxhYmxlWWVhcnNcclxuICAgICAgICAgICAgICAgICAgICBoaWdoZXN0WWVhciA9IG1heFllYXJcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIHNldHRpbmdzLnNlbGVjdFllYXJzICAmJiBvdmVycmlkZSA9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF8ubm9kZSggJ3NlbGVjdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZ3JvdXAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluOiBsb3dlc3RZZWFyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4OiBoaWdoZXN0WWVhcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlOiAnb3B0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IGZ1bmN0aW9uKCBsb29wZWRZZWFyICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgbG9vcGVkIHllYXIgYW5kIG5vIGNsYXNzZXMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvb3BlZFllYXIsIDAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIHZhbHVlIGFuZCBzZWxlY3RlZCBpbmRleC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlPScgKyBsb29wZWRZZWFyICsgKCBmb2N1c2VkWWVhciA9PSBsb29wZWRZZWFyID8gJyBzZWxlY3RlZCcgOiAnJyApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3Mua2xhc3Muc2VsZWN0WWVhciArICcgYnJvd3Nlci1kZWZhdWx0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKCBpc09wZW4gPyAnJyA6ICdkaXNhYmxlZCcgKSArICcgJyArIF8uYXJpYUF0dHIoeyBjb250cm9sczogY2FsZW5kYXIuJG5vZGVbMF0uaWQgKyAnX3RhYmxlJyB9KSArICcgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd0aXRsZT1cIicgKyBzZXR0aW5ncy5sYWJlbFllYXJTZWxlY3QgKyAnXCInXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgIC8vIE1hdGVyaWFsaXplIG1vZGlmaWVkXHJcbiAgICAgICAgICBpZiAob3ZlcnJpZGUgPT09ICdyYXcnICYmIHNlbGVjdGVkT2JqZWN0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF8ubm9kZSggJ2RpdicsIHNlbGVjdGVkT2JqZWN0LnllYXIgKVxyXG4gICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UganVzdCByZXR1cm4gdGhlIHllYXIgZm9jdXNlZFxyXG4gICAgICAgICAgICByZXR1cm4gXy5ub2RlKCAnZGl2JywgZm9jdXNlZFllYXIsIHNldHRpbmdzLmtsYXNzLnllYXIgKVxyXG4gICAgICAgIH0gLy9jcmVhdGVZZWFyTGFiZWxcclxuXHJcblxyXG4gICAgICAgIC8vIE1hdGVyaWFsaXplIG1vZGlmaWVkXHJcbiAgICAgICAgY3JlYXRlRGF5TGFiZWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZE9iamVjdCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZE9iamVjdC5kYXRlXHJcbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBub3dPYmplY3QuZGF0ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgY3JlYXRlV2Vla2RheUxhYmVsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBkaXNwbGF5X2RheTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZE9iamVjdCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgZGlzcGxheV9kYXkgPSBzZWxlY3RlZE9iamVjdC5kYXk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlfZGF5ID0gbm93T2JqZWN0LmRheTtcclxuICAgICAgICAgICAgdmFyIHdlZWtkYXkgPSBzZXR0aW5ncy53ZWVrZGF5c1Nob3J0WyBkaXNwbGF5X2RheSBdO1xyXG4gICAgICAgICAgICByZXR1cm4gd2Vla2RheVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gIC8vIENyZWF0ZSBhbmQgcmV0dXJuIHRoZSBlbnRpcmUgY2FsZW5kYXIuXHJcblxyXG5yZXR1cm4gXy5ub2RlKFxyXG4gICAgICAgIC8vIERhdGUgcHJlc2VudGF0aW9uIFZpZXdcclxuICAgICAgICAnZGl2JyxcclxuICAgICAgICAgICAgXy5ub2RlKFxyXG4gICAgICAgICAgICAgICAgLy8gRGl2IGZvciBZZWFyXHJcbiAgICAgICAgICAgICAgICAnZGl2JyxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVllYXJMYWJlbChcInJhd1wiKSAsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5rbGFzcy55ZWFyX2Rpc3BsYXlcclxuICAgICAgICAgICAgKStcclxuICAgICAgICAgICAgXy5ub2RlKFxyXG4gICAgICAgICAgICAgICAgJ3NwYW4nLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlV2Vla2RheUxhYmVsKCkgKyAnLCAnLFxyXG4gICAgICAgICAgICAgICAgXCJwaWNrZXJfX3dlZWtkYXktZGlzcGxheVwiXHJcbiAgICAgICAgICAgICkrXHJcbiAgICAgICAgICAgIF8ubm9kZShcclxuICAgICAgICAgICAgICAgIC8vIERpdiBmb3Igc2hvcnQgTW9udGhcclxuICAgICAgICAgICAgICAgICdzcGFuJyxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZU1vbnRoTGFiZWwoXCJzaG9ydF9tb250aHNcIikgKyAnICcsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5rbGFzcy5tb250aF9kaXNwbGF5XHJcbiAgICAgICAgICAgICkrXHJcbiAgICAgICAgICAgIF8ubm9kZShcclxuICAgICAgICAgICAgICAvLyBEaXYgZm9yIERheVxyXG4gICAgICAgICAgICAgICdzcGFuJyxcclxuICAgICAgICAgICAgICBjcmVhdGVEYXlMYWJlbCgpICxcclxuICAgICAgICAgICAgICBzZXR0aW5ncy5rbGFzcy5kYXlfZGlzcGxheVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgIHNldHRpbmdzLmtsYXNzLmRhdGVfZGlzcGxheVxyXG4gICAgKStcclxuICAgIC8vIENhbGVuZGFyIGNvbnRhaW5lclxyXG4gICAgXy5ub2RlKCdkaXYnLFxyXG5cdCAgICBfLm5vZGUoJ2RpdicsXHJcblx0XHRfLm5vZGUoJ2RpdicsXHJcblx0XHQoIHNldHRpbmdzLnNlbGVjdFllYXJzID8gIGNyZWF0ZU1vbnRoTGFiZWwoKSArIGNyZWF0ZVllYXJMYWJlbCgpIDogY3JlYXRlTW9udGhMYWJlbCgpICsgY3JlYXRlWWVhckxhYmVsKCkgKSArXHJcblx0XHRjcmVhdGVNb250aE5hdigpICsgY3JlYXRlTW9udGhOYXYoIDEgKSxcclxuXHRcdHNldHRpbmdzLmtsYXNzLmhlYWRlclxyXG5cdCAgICApICsgXy5ub2RlKFxyXG5cdFx0J3RhYmxlJyxcclxuXHRcdHRhYmxlSGVhZCArXHJcblx0XHRfLm5vZGUoXHJcblx0XHQgICAgJ3Rib2R5JyxcclxuXHRcdCAgICBfLmdyb3VwKHtcclxuXHRcdCAgICAgICAgbWluOiAwLFxyXG5cdFx0ICAgICAgICBtYXg6IFdFRUtTX0lOX0NBTEVOREFSIC0gMSxcclxuXHRcdCAgICAgICAgaTogMSxcclxuXHRcdCAgICAgICAgbm9kZTogJ3RyJyxcclxuXHRcdCAgICAgICAgaXRlbTogZnVuY3Rpb24oIHJvd0NvdW50ZXIgKSB7XHJcblxyXG5cdFx0ICAgICAgICAgICAgLy8gSWYgTW9uZGF5IGlzIHRoZSBmaXJzdCBkYXkgYW5kIHRoZSBtb250aCBzdGFydHMgb24gU3VuZGF5LCBzaGlmdCB0aGUgZGF0ZSBiYWNrIGEgd2Vlay5cclxuXHRcdCAgICAgICAgICAgIHZhciBzaGlmdERhdGVCeSA9IHNldHRpbmdzLmZpcnN0RGF5ICYmIGNhbGVuZGFyLmNyZWF0ZShbIHZpZXdzZXRPYmplY3QueWVhciwgdmlld3NldE9iamVjdC5tb250aCwgMSBdKS5kYXkgPT09IDAgPyAtNyA6IDBcclxuXHJcblx0XHQgICAgICAgICAgICByZXR1cm4gW1xyXG5cdFx0ICAgICAgICAgICAgICAgIF8uZ3JvdXAoe1xyXG5cdFx0ICAgICAgICAgICAgICAgICAgICBtaW46IERBWVNfSU5fV0VFSyAqIHJvd0NvdW50ZXIgLSB2aWV3c2V0T2JqZWN0LmRheSArIHNoaWZ0RGF0ZUJ5ICsgMSwgLy8gQWRkIDEgZm9yIHdlZWtkYXkgMGluZGV4XHJcblx0XHQgICAgICAgICAgICAgICAgICAgIG1heDogZnVuY3Rpb24oKSB7XHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5taW4gKyBEQVlTX0lOX1dFRUsgLSAxXHJcblx0XHQgICAgICAgICAgICAgICAgICAgIH0sXHJcblx0XHQgICAgICAgICAgICAgICAgICAgIGk6IDEsXHJcblx0XHQgICAgICAgICAgICAgICAgICAgIG5vZGU6ICd0ZCcsXHJcblx0XHQgICAgICAgICAgICAgICAgICAgIGl0ZW06IGZ1bmN0aW9uKCB0YXJnZXREYXRlICkge1xyXG5cclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvbnZlcnQgdGhlIHRpbWUgZGF0ZSBmcm9tIGEgcmVsYXRpdmUgZGF0ZSB0byBhIHRhcmdldCBkYXRlLlxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RGF0ZSA9IGNhbGVuZGFyLmNyZWF0ZShbIHZpZXdzZXRPYmplY3QueWVhciwgdmlld3NldE9iamVjdC5tb250aCwgdGFyZ2V0RGF0ZSArICggc2V0dGluZ3MuZmlyc3REYXkgPyAxIDogMCApIF0pXHJcblxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzU2VsZWN0ZWQgPSBzZWxlY3RlZE9iamVjdCAmJiBzZWxlY3RlZE9iamVjdC5waWNrID09IHRhcmdldERhdGUucGljayxcclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0hpZ2hsaWdodGVkID0gaGlnaGxpZ2h0ZWRPYmplY3QgJiYgaGlnaGxpZ2h0ZWRPYmplY3QucGljayA9PSB0YXJnZXREYXRlLnBpY2ssXHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNEaXNhYmxlZCA9IGRpc2FibGVkQ29sbGVjdGlvbiAmJiBjYWxlbmRhci5kaXNhYmxlZCggdGFyZ2V0RGF0ZSApIHx8IHRhcmdldERhdGUucGljayA8IG1pbkxpbWl0T2JqZWN0LnBpY2sgfHwgdGFyZ2V0RGF0ZS5waWNrID4gbWF4TGltaXRPYmplY3QucGljayxcclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWREYXRlID0gXy50cmlnZ2VyKCBjYWxlbmRhci5mb3JtYXRzLnRvU3RyaW5nLCBjYWxlbmRhciwgWyBzZXR0aW5ncy5mb3JtYXQsIHRhcmdldERhdGUgXSApXHJcblxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLm5vZGUoXHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXREYXRlLmRhdGUsXHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbigga2xhc3NlcyApIHtcclxuXHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIGBpbmZvY3VzYCBvciBgb3V0Zm9jdXNgIGNsYXNzZXMgYmFzZWQgb24gbW9udGggaW4gdmlldy5cclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtsYXNzZXMucHVzaCggdmlld3NldE9iamVjdC5tb250aCA9PSB0YXJnZXREYXRlLm1vbnRoID8gc2V0dGluZ3Mua2xhc3MuaW5mb2N1cyA6IHNldHRpbmdzLmtsYXNzLm91dGZvY3VzIClcclxuXHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIGB0b2RheWAgY2xhc3MgaWYgbmVlZGVkLlxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBub3dPYmplY3QucGljayA9PSB0YXJnZXREYXRlLnBpY2sgKSB7XHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2xhc3Nlcy5wdXNoKCBzZXR0aW5ncy5rbGFzcy5ub3cgKVxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgYHNlbGVjdGVkYCBjbGFzcyBpZiBzb21ldGhpbmcncyBzZWxlY3RlZCBhbmQgdGhlIHRpbWUgbWF0Y2hlcy5cclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggaXNTZWxlY3RlZCApIHtcclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrbGFzc2VzLnB1c2goIHNldHRpbmdzLmtsYXNzLnNlbGVjdGVkIClcclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIGBoaWdobGlnaHRlZGAgY2xhc3MgaWYgc29tZXRoaW5nJ3MgaGlnaGxpZ2h0ZWQgYW5kIHRoZSB0aW1lIG1hdGNoZXMuXHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGlzSGlnaGxpZ2h0ZWQgKSB7XHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2xhc3Nlcy5wdXNoKCBzZXR0aW5ncy5rbGFzcy5oaWdobGlnaHRlZCApXHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBgZGlzYWJsZWRgIGNsYXNzIGlmIHNvbWV0aGluZydzIGRpc2FibGVkIGFuZCB0aGUgb2JqZWN0IG1hdGNoZXMuXHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGlzRGlzYWJsZWQgKSB7XHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2xhc3Nlcy5wdXNoKCBzZXR0aW5ncy5rbGFzcy5kaXNhYmxlZCApXHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtsYXNzZXMuam9pbiggJyAnIClcclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoWyBzZXR0aW5ncy5rbGFzcy5kYXkgXSksXHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLXBpY2s9JyArIHRhcmdldERhdGUucGljayArICcgJyArIF8uYXJpYUF0dHIoe1xyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogJ2dyaWRjZWxsJyxcclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBmb3JtYXR0ZWREYXRlLFxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGlzU2VsZWN0ZWQgJiYgY2FsZW5kYXIuJG5vZGUudmFsKCkgPT09IGZvcm1hdHRlZERhdGUgPyB0cnVlIDogbnVsbCxcclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZWRlc2NlbmRhbnQ6IGlzSGlnaGxpZ2h0ZWQgPyB0cnVlIDogbnVsbCxcclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpc0Rpc2FibGVkID8gdHJ1ZSA6IG51bGxcclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkgKyAnICcgKyAoaXNEaXNhYmxlZCA/ICcnIDogJ3RhYmluZGV4PVwiMFwiJylcclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICcnLFxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uYXJpYUF0dHIoeyByb2xlOiAncHJlc2VudGF0aW9uJyB9KVxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgXSAvL2VuZHJldHVyblxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICB9XHJcblx0XHQgICAgICAgICAgICAgICAgfSlcclxuXHRcdCAgICAgICAgICAgIF0gLy9lbmRyZXR1cm5cclxuXHRcdCAgICAgICAgfVxyXG5cdFx0ICAgIH0pXHJcblx0XHQpLFxyXG5cdFx0c2V0dGluZ3Mua2xhc3MudGFibGUsXHJcblx0XHQnaWQ9XCInICsgY2FsZW5kYXIuJG5vZGVbMF0uaWQgKyAnX3RhYmxlJyArICdcIiAnICsgXy5hcmlhQXR0cih7XHJcblx0XHQgICAgcm9sZTogJ2dyaWQnLFxyXG5cdFx0ICAgIGNvbnRyb2xzOiBjYWxlbmRhci4kbm9kZVswXS5pZCxcclxuXHRcdCAgICByZWFkb25seTogdHJ1ZVxyXG5cdFx0fSlcclxuXHQgICAgKVxyXG5cdCAgICAsIHNldHRpbmdzLmtsYXNzLmNhbGVuZGFyX2NvbnRhaW5lcikgLy8gZW5kIGNhbGVuZGFyXHJcblxyXG5cdCAgICAgK1xyXG5cclxuXHQgICAgLy8gKiBGb3IgRmlyZWZveCBmb3JtcyB0byBzdWJtaXQsIG1ha2Ugc3VyZSB0byBzZXQgdGhlIGJ1dHRvbnPigJkgYHR5cGVgIGF0dHJpYnV0ZXMgYXMg4oCcYnV0dG9u4oCdLlxyXG5cdCAgICBfLm5vZGUoXHJcblx0XHQnZGl2JyxcclxuXHRcdF8ubm9kZSggJ2J1dHRvbicsIHNldHRpbmdzLnRvZGF5LCBcImJ0bi1mbGF0IHBpY2tlcl9fdG9kYXkgd2F2ZXMtZWZmZWN0XCIsXHJcblx0XHQgICAgJ3R5cGU9YnV0dG9uIGRhdGEtcGljaz0nICsgbm93T2JqZWN0LnBpY2sgK1xyXG5cdFx0ICAgICggaXNPcGVuICYmICFjYWxlbmRhci5kaXNhYmxlZChub3dPYmplY3QpID8gJycgOiAnIGRpc2FibGVkJyApICsgJyAnICtcclxuXHRcdCAgICBfLmFyaWFBdHRyKHsgY29udHJvbHM6IGNhbGVuZGFyLiRub2RlWzBdLmlkIH0pICkgK1xyXG5cdFx0Xy5ub2RlKCAnYnV0dG9uJywgc2V0dGluZ3MuY2xlYXIsIFwiYnRuLWZsYXQgcGlja2VyX19jbGVhciB3YXZlcy1lZmZlY3RcIixcclxuXHRcdCAgICAndHlwZT1idXR0b24gZGF0YS1jbGVhcj0xJyArXHJcblx0XHQgICAgKCBpc09wZW4gPyAnJyA6ICcgZGlzYWJsZWQnICkgKyAnICcgK1xyXG5cdFx0ICAgIF8uYXJpYUF0dHIoeyBjb250cm9sczogY2FsZW5kYXIuJG5vZGVbMF0uaWQgfSkgKSArXHJcblx0XHRfLm5vZGUoJ2J1dHRvbicsIHNldHRpbmdzLmNsb3NlLCBcImJ0bi1mbGF0IHBpY2tlcl9fY2xvc2Ugd2F2ZXMtZWZmZWN0XCIsXHJcblx0XHQgICAgJ3R5cGU9YnV0dG9uIGRhdGEtY2xvc2U9dHJ1ZSAnICtcclxuXHRcdCAgICAoIGlzT3BlbiA/ICcnIDogJyBkaXNhYmxlZCcgKSArICcgJyArXHJcblx0XHQgICAgXy5hcmlhQXR0cih7IGNvbnRyb2xzOiBjYWxlbmRhci4kbm9kZVswXS5pZCB9KSApLFxyXG5cdFx0c2V0dGluZ3Mua2xhc3MuZm9vdGVyXHJcblx0ICAgICksICdwaWNrZXJfX2NvbnRhaW5lcl9fd3JhcHBlcidcclxuXHQpIC8vZW5kcmV0dXJuXHJcbn0gLy9EYXRlUGlja2VyLnByb3RvdHlwZS5ub2Rlc1xyXG5cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIFRoZSBkYXRlIHBpY2tlciBkZWZhdWx0cy5cclxuICovXHJcbkRhdGVQaWNrZXIuZGVmYXVsdHMgPSAoZnVuY3Rpb24oIHByZWZpeCApIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG5cclxuICAgICAgICAvLyBUaGUgdGl0bGUgbGFiZWwgdG8gdXNlIGZvciB0aGUgbW9udGggbmF2IGJ1dHRvbnNcclxuICAgICAgICBsYWJlbE1vbnRoTmV4dDogJ05leHQgbW9udGgnLFxyXG4gICAgICAgIGxhYmVsTW9udGhQcmV2OiAnUHJldmlvdXMgbW9udGgnLFxyXG5cclxuICAgICAgICAvLyBUaGUgdGl0bGUgbGFiZWwgdG8gdXNlIGZvciB0aGUgZHJvcGRvd24gc2VsZWN0b3JzXHJcbiAgICAgICAgbGFiZWxNb250aFNlbGVjdDogJ1NlbGVjdCBhIG1vbnRoJyxcclxuICAgICAgICBsYWJlbFllYXJTZWxlY3Q6ICdTZWxlY3QgYSB5ZWFyJyxcclxuXHJcbiAgICAgICAgLy8gTW9udGhzIGFuZCB3ZWVrZGF5c1xyXG4gICAgICAgIG1vbnRoc0Z1bGw6IFsgJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInIF0sXHJcbiAgICAgICAgbW9udGhzU2hvcnQ6IFsgJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJyBdLFxyXG4gICAgICAgIHdlZWtkYXlzRnVsbDogWyAnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknIF0sXHJcbiAgICAgICAgd2Vla2RheXNTaG9ydDogWyAnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0JyBdLFxyXG5cclxuICAgICAgICAvLyBNYXRlcmlhbGl6ZSBtb2RpZmllZFxyXG4gICAgICAgIHdlZWtkYXlzTGV0dGVyOiBbICdTJywgJ00nLCAnVCcsICdXJywgJ1QnLCAnRicsICdTJyBdLFxyXG5cclxuICAgICAgICAvLyBUb2RheSBhbmQgY2xlYXJcclxuICAgICAgICB0b2RheTogJ1RvZGF5JyxcclxuICAgICAgICBjbGVhcjogJ0NsZWFyJyxcclxuICAgICAgICBjbG9zZTogJ09rJyxcclxuXHJcbiAgICAgICAgLy8gUGlja2VyIGNsb3NlIGJlaGF2aW9yIChQcmV2ZW50IGEgY2hhbmdlIGluIGJlaGF2aW91ciBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkpXHJcbiAgICAgICAgY2xvc2VPblNlbGVjdDogZmFsc2UsXHJcblxyXG4gICAgICAgIC8vIFRoZSBmb3JtYXQgdG8gc2hvdyBvbiB0aGUgYGlucHV0YCBlbGVtZW50XHJcbiAgICAgICAgZm9ybWF0OiAnZCBtbW1tLCB5eXl5JyxcclxuXHJcbiAgICAgICAgLy8gQ2xhc3Nlc1xyXG4gICAgICAgIGtsYXNzOiB7XHJcblxyXG4gICAgICAgICAgICB0YWJsZTogcHJlZml4ICsgJ3RhYmxlJyxcclxuXHJcbiAgICAgICAgICAgIGhlYWRlcjogcHJlZml4ICsgJ2hlYWRlcicsXHJcblxyXG5cclxuICAgICAgICAgICAgLy8gTWF0ZXJpYWxpemUgQWRkZWQga2xhc3Nlc1xyXG4gICAgICAgICAgICBkYXRlX2Rpc3BsYXk6IHByZWZpeCArICdkYXRlLWRpc3BsYXknLFxyXG4gICAgICAgICAgICBkYXlfZGlzcGxheTogcHJlZml4ICsgJ2RheS1kaXNwbGF5JyxcclxuICAgICAgICAgICAgbW9udGhfZGlzcGxheTogcHJlZml4ICsgJ21vbnRoLWRpc3BsYXknLFxyXG4gICAgICAgICAgICB5ZWFyX2Rpc3BsYXk6IHByZWZpeCArICd5ZWFyLWRpc3BsYXknLFxyXG4gICAgICAgICAgICBjYWxlbmRhcl9jb250YWluZXI6IHByZWZpeCArICdjYWxlbmRhci1jb250YWluZXInLFxyXG4gICAgICAgICAgICAvLyBlbmRcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbmF2UHJldjogcHJlZml4ICsgJ25hdi0tcHJldicsXHJcbiAgICAgICAgICAgIG5hdk5leHQ6IHByZWZpeCArICduYXYtLW5leHQnLFxyXG4gICAgICAgICAgICBuYXZEaXNhYmxlZDogcHJlZml4ICsgJ25hdi0tZGlzYWJsZWQnLFxyXG5cclxuICAgICAgICAgICAgbW9udGg6IHByZWZpeCArICdtb250aCcsXHJcbiAgICAgICAgICAgIHllYXI6IHByZWZpeCArICd5ZWFyJyxcclxuXHJcbiAgICAgICAgICAgIHNlbGVjdE1vbnRoOiBwcmVmaXggKyAnc2VsZWN0LS1tb250aCcsXHJcbiAgICAgICAgICAgIHNlbGVjdFllYXI6IHByZWZpeCArICdzZWxlY3QtLXllYXInLFxyXG5cclxuICAgICAgICAgICAgd2Vla2RheXM6IHByZWZpeCArICd3ZWVrZGF5JyxcclxuXHJcbiAgICAgICAgICAgIGRheTogcHJlZml4ICsgJ2RheScsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBwcmVmaXggKyAnZGF5LS1kaXNhYmxlZCcsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiBwcmVmaXggKyAnZGF5LS1zZWxlY3RlZCcsXHJcbiAgICAgICAgICAgIGhpZ2hsaWdodGVkOiBwcmVmaXggKyAnZGF5LS1oaWdobGlnaHRlZCcsXHJcbiAgICAgICAgICAgIG5vdzogcHJlZml4ICsgJ2RheS0tdG9kYXknLFxyXG4gICAgICAgICAgICBpbmZvY3VzOiBwcmVmaXggKyAnZGF5LS1pbmZvY3VzJyxcclxuICAgICAgICAgICAgb3V0Zm9jdXM6IHByZWZpeCArICdkYXktLW91dGZvY3VzJyxcclxuXHJcbiAgICAgICAgICAgIGZvb3RlcjogcHJlZml4ICsgJ2Zvb3RlcicsXHJcblxyXG4gICAgICAgICAgICBidXR0b25DbGVhcjogcHJlZml4ICsgJ2J1dHRvbi0tY2xlYXInLFxyXG4gICAgICAgICAgICBidXR0b25Ub2RheTogcHJlZml4ICsgJ2J1dHRvbi0tdG9kYXknLFxyXG4gICAgICAgICAgICBidXR0b25DbG9zZTogcHJlZml4ICsgJ2J1dHRvbi0tY2xvc2UnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSggUGlja2VyLmtsYXNzZXMoKS5waWNrZXIgKyAnX18nIClcclxuXHJcblxyXG5cclxuXHJcblxyXG4vKipcclxuICogRXh0ZW5kIHRoZSBwaWNrZXIgdG8gYWRkIHRoZSBkYXRlIHBpY2tlci5cclxuICovXHJcblBpY2tlci5leHRlbmQoICdwaWNrYWRhdGUnLCBEYXRlUGlja2VyIClcclxuXHJcblxyXG59KSk7XHJcblxuLyohXHJcbiAqIENsb2NrUGlja2VyIHYwLjAuNyAoaHR0cDovL3dlYXJlb3V0bWFuLmdpdGh1Yi5pby9jbG9ja3BpY2tlci8pXHJcbiAqIENvcHlyaWdodCAyMDE0IFdhbmcgU2hlbndlaS5cclxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vd2VhcmVvdXRtYW4vY2xvY2twaWNrZXIvYmxvYi9naC1wYWdlcy9MSUNFTlNFKVxyXG4gKlxyXG4gKiBGdXJ0aGVyIG1vZGlmaWVkXHJcbiAqIENvcHlyaWdodCAyMDE1IENoaW5nIFlhdyBIYW8uXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uKCQpe1xyXG5cdHZhciAkd2luID0gJCh3aW5kb3cpLFxyXG5cdFx0XHQkZG9jID0gJChkb2N1bWVudCk7XHJcblxyXG5cdC8vIENhbiBJIHVzZSBpbmxpbmUgc3ZnID9cclxuXHR2YXIgc3ZnTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxyXG5cdFx0ICBzdmdTdXBwb3J0ZWQgPSAnU1ZHQW5nbGUnIGluIHdpbmRvdyAmJiAoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCAgdmFyIHN1cHBvcnRlZCxcclxuXHRcdFx0XHRlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0XHRcdGVsLmlubmVySFRNTCA9ICc8c3ZnLz4nO1xyXG5cdFx0XHRcdHN1cHBvcnRlZCA9IChlbC5maXJzdENoaWxkICYmIGVsLmZpcnN0Q2hpbGQubmFtZXNwYWNlVVJJKSA9PSBzdmdOUztcclxuXHRcdFx0XHRlbC5pbm5lckhUTUwgPSAnJztcclxuXHRcdFx0XHRyZXR1cm4gc3VwcG9ydGVkO1xyXG5cdFx0XHR9KSgpO1xyXG5cclxuXHQvLyBDYW4gSSB1c2UgdHJhbnNpdGlvbiA/XHJcblx0dmFyIHRyYW5zaXRpb25TdXBwb3J0ZWQgPSAoZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS5zdHlsZTtcclxuXHRcdHJldHVybiAndHJhbnNpdGlvbicgaW4gc3R5bGUgfHxcclxuXHRcdFx0XHRcdCAnV2Via2l0VHJhbnNpdGlvbicgaW4gc3R5bGUgfHxcclxuXHRcdFx0XHQgICAnTW96VHJhbnNpdGlvbicgaW4gc3R5bGUgfHxcclxuXHRcdFx0XHRcdCAnbXNUcmFuc2l0aW9uJyBpbiBzdHlsZSB8fFxyXG5cdFx0XHRcdFx0ICdPVHJhbnNpdGlvbicgaW4gc3R5bGU7XHJcblx0fSkoKTtcclxuXHJcblx0Ly8gTGlzdGVuIHRvdWNoIGV2ZW50cyBpbiB0b3VjaCBzY3JlZW4gZGV2aWNlLCBpbnN0ZWFkIG9mIG1vdXNlIGV2ZW50cyBpbiBkZXNrdG9wLlxyXG5cdHZhciB0b3VjaFN1cHBvcnRlZCA9ICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyxcclxuXHRcdFx0bW91c2Vkb3duRXZlbnQgPSAnbW91c2Vkb3duJyArICggdG91Y2hTdXBwb3J0ZWQgPyAnIHRvdWNoc3RhcnQnIDogJycpLFxyXG5cdFx0XHRtb3VzZW1vdmVFdmVudCA9ICdtb3VzZW1vdmUuY2xvY2twaWNrZXInICsgKCB0b3VjaFN1cHBvcnRlZCA/ICcgdG91Y2htb3ZlLmNsb2NrcGlja2VyJyA6ICcnKSxcclxuXHRcdFx0bW91c2V1cEV2ZW50ID0gJ21vdXNldXAuY2xvY2twaWNrZXInICsgKCB0b3VjaFN1cHBvcnRlZCA/ICcgdG91Y2hlbmQuY2xvY2twaWNrZXInIDogJycpO1xyXG5cclxuXHQvLyBWaWJyYXRlIHRoZSBkZXZpY2UgaWYgc3VwcG9ydGVkXHJcblx0dmFyIHZpYnJhdGUgPSBuYXZpZ2F0b3IudmlicmF0ZSA/ICd2aWJyYXRlJyA6IG5hdmlnYXRvci53ZWJraXRWaWJyYXRlID8gJ3dlYmtpdFZpYnJhdGUnIDogbnVsbDtcclxuXHJcblx0ZnVuY3Rpb24gY3JlYXRlU3ZnRWxlbWVudChuYW1lKSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z05TLCBuYW1lKTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGxlYWRpbmdaZXJvKG51bSkge1xyXG5cdFx0cmV0dXJuIChudW0gPCAxMCA/ICcwJyA6ICcnKSArIG51bTtcclxuXHR9XHJcblxyXG5cdC8vIEdldCBhIHVuaXF1ZSBpZFxyXG5cdHZhciBpZENvdW50ZXIgPSAwO1xyXG5cdGZ1bmN0aW9uIHVuaXF1ZUlkKHByZWZpeCkge1xyXG5cdFx0dmFyIGlkID0gKytpZENvdW50ZXIgKyAnJztcclxuXHRcdHJldHVybiBwcmVmaXggPyBwcmVmaXggKyBpZCA6IGlkO1xyXG5cdH1cclxuXHJcblx0Ly8gQ2xvY2sgc2l6ZVxyXG5cdHZhciBkaWFsUmFkaXVzID0gMTM1LFxyXG5cdFx0XHRvdXRlclJhZGl1cyA9IDEwNSxcclxuXHRcdFx0Ly8gaW5uZXJSYWRpdXMgPSA4MCBvbiAxMiBob3VyIGNsb2NrXHJcblx0XHRcdGlubmVyUmFkaXVzID0gNzAsXHJcblx0XHRcdHRpY2tSYWRpdXMgPSAyMCxcclxuXHRcdFx0ZGlhbWV0ZXIgPSBkaWFsUmFkaXVzICogMixcclxuXHRcdFx0ZHVyYXRpb24gPSB0cmFuc2l0aW9uU3VwcG9ydGVkID8gMzUwIDogMTtcclxuXHJcblx0Ly8gUG9wb3ZlciB0ZW1wbGF0ZVxyXG5cdHZhciB0cGwgPSBbXHJcblx0XHQnPGRpdiBjbGFzcz1cImNsb2NrcGlja2VyIHBpY2tlclwiPicsXHJcblx0XHRcdCc8ZGl2IGNsYXNzPVwicGlja2VyX19ob2xkZXJcIj4nLFxyXG5cdFx0XHRcdCc8ZGl2IGNsYXNzPVwicGlja2VyX19mcmFtZVwiPicsXHJcblx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cInBpY2tlcl9fd3JhcFwiPicsXHJcblx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwicGlja2VyX19ib3hcIj4nLFxyXG5cdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwicGlja2VyX19kYXRlLWRpc3BsYXlcIj4nLFxyXG5cdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJjbG9ja3BpY2tlci1kaXNwbGF5XCI+JyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJjbG9ja3BpY2tlci1kaXNwbGF5LWNvbHVtblwiPicsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0JzxzcGFuIGNsYXNzPVwiY2xvY2twaWNrZXItc3Bhbi1ob3VycyB0ZXh0LXByaW1hcnlcIj48L3NwYW4+JyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQnOicsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0JzxzcGFuIGNsYXNzPVwiY2xvY2twaWNrZXItc3Bhbi1taW51dGVzXCI+PC9zcGFuPicsXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8L2Rpdj4nLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImNsb2NrcGlja2VyLWRpc3BsYXktY29sdW1uIGNsb2NrcGlja2VyLWRpc3BsYXktYW0tcG1cIj4nLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiY2xvY2twaWNrZXItc3Bhbi1hbS1wbVwiPjwvZGl2PicsXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8L2Rpdj4nLFxyXG5cdFx0XHRcdFx0XHRcdFx0JzwvZGl2PicsXHJcblx0XHRcdFx0XHRcdFx0JzwvZGl2PicsXHJcblx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJwaWNrZXJfX2NvbnRhaW5lcl9fd3JhcHBlclwiPicsXHJcblx0XHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cInBpY2tlcl9fY2FsZW5kYXItY29udGFpbmVyXCI+JyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJjbG9ja3BpY2tlci1wbGF0ZVwiPicsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJjbG9ja3BpY2tlci1jYW52YXNcIj48L2Rpdj4nLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiY2xvY2twaWNrZXItZGlhbCBjbG9ja3BpY2tlci1ob3Vyc1wiPjwvZGl2PicsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJjbG9ja3BpY2tlci1kaWFsIGNsb2NrcGlja2VyLW1pbnV0ZXMgY2xvY2twaWNrZXItZGlhbC1vdXRcIj48L2Rpdj4nLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPC9kaXY+JyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJjbG9ja3BpY2tlci1hbS1wbS1ibG9ja1wiPicsXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8L2Rpdj4nLFxyXG5cdFx0XHRcdFx0XHRcdFx0JzwvZGl2PicsXHJcblx0XHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cInBpY2tlcl9fZm9vdGVyXCI+JyxcclxuXHRcdFx0XHRcdFx0XHRcdCc8L2Rpdj4nLFxyXG5cdFx0XHRcdFx0XHRcdCc8L2Rpdj4nLFxyXG5cdFx0XHRcdFx0XHQnPC9kaXY+JyxcclxuXHRcdFx0XHRcdCc8L2Rpdj4nLFxyXG5cdFx0XHRcdCc8L2Rpdj4nLFxyXG5cdFx0XHQnPC9kaXY+JyxcclxuXHRcdCc8L2Rpdj4nXHJcblx0XS5qb2luKCcnKTtcclxuXHJcblx0Ly8gQ2xvY2tQaWNrZXJcclxuXHRmdW5jdGlvbiBDbG9ja1BpY2tlcihlbGVtZW50LCBvcHRpb25zKSB7XHJcblx0XHR2YXIgcG9wb3ZlciA9ICQodHBsKSxcclxuXHRcdFx0XHRwbGF0ZSA9IHBvcG92ZXIuZmluZCgnLmNsb2NrcGlja2VyLXBsYXRlJyksXHJcblx0XHRcdFx0aG9sZGVyID0gcG9wb3Zlci5maW5kKCcucGlja2VyX19ob2xkZXInKSxcclxuXHRcdFx0XHRob3Vyc1ZpZXcgPSBwb3BvdmVyLmZpbmQoJy5jbG9ja3BpY2tlci1ob3VycycpLFxyXG5cdFx0XHRcdG1pbnV0ZXNWaWV3ID0gcG9wb3Zlci5maW5kKCcuY2xvY2twaWNrZXItbWludXRlcycpLFxyXG5cdFx0XHRcdGFtUG1CbG9jayA9IHBvcG92ZXIuZmluZCgnLmNsb2NrcGlja2VyLWFtLXBtLWJsb2NrJyksXHJcblx0XHRcdFx0aXNJbnB1dCA9IGVsZW1lbnQucHJvcCgndGFnTmFtZScpID09PSAnSU5QVVQnLFxyXG5cdFx0XHRcdGlucHV0ID0gaXNJbnB1dCA/IGVsZW1lbnQgOiBlbGVtZW50LmZpbmQoJ2lucHV0JyksXHJcblx0XHRcdFx0bGFiZWwgPSAkKFwibGFiZWxbZm9yPVwiICsgaW5wdXQuYXR0cihcImlkXCIpICsgXCJdXCIpLFxyXG5cdFx0XHRcdHNlbGYgPSB0aGlzO1xyXG5cclxuXHRcdHRoaXMuaWQgPSB1bmlxdWVJZCgnY3AnKTtcclxuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcblx0XHR0aGlzLmhvbGRlciA9IGhvbGRlcjtcclxuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcblx0XHR0aGlzLmlzQXBwZW5kZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuaXNTaG93biA9IGZhbHNlO1xyXG5cdFx0dGhpcy5jdXJyZW50VmlldyA9ICdob3Vycyc7XHJcblx0XHR0aGlzLmlzSW5wdXQgPSBpc0lucHV0O1xyXG5cdFx0dGhpcy5pbnB1dCA9IGlucHV0O1xyXG5cdFx0dGhpcy5sYWJlbCA9IGxhYmVsO1xyXG5cdFx0dGhpcy5wb3BvdmVyID0gcG9wb3ZlcjtcclxuXHRcdHRoaXMucGxhdGUgPSBwbGF0ZTtcclxuXHRcdHRoaXMuaG91cnNWaWV3ID0gaG91cnNWaWV3O1xyXG5cdFx0dGhpcy5taW51dGVzVmlldyA9IG1pbnV0ZXNWaWV3O1xyXG5cdFx0dGhpcy5hbVBtQmxvY2sgPSBhbVBtQmxvY2s7XHJcblx0XHR0aGlzLnNwYW5Ib3VycyA9IHBvcG92ZXIuZmluZCgnLmNsb2NrcGlja2VyLXNwYW4taG91cnMnKTtcclxuXHRcdHRoaXMuc3Bhbk1pbnV0ZXMgPSBwb3BvdmVyLmZpbmQoJy5jbG9ja3BpY2tlci1zcGFuLW1pbnV0ZXMnKTtcclxuXHRcdHRoaXMuc3BhbkFtUG0gPSBwb3BvdmVyLmZpbmQoJy5jbG9ja3BpY2tlci1zcGFuLWFtLXBtJyk7XHJcblx0XHR0aGlzLmZvb3RlciA9IHBvcG92ZXIuZmluZCgnLnBpY2tlcl9fZm9vdGVyJyk7XHJcblx0XHR0aGlzLmFtT3JQbSA9IFwiUE1cIjtcclxuXHJcblx0XHQvLyBTZXR1cCBmb3IgZm9yIDEyIGhvdXIgY2xvY2sgaWYgb3B0aW9uIGlzIHNlbGVjdGVkXHJcblx0XHRpZiAob3B0aW9ucy50d2VsdmVob3VyKSB7XHJcblx0XHRcdGlmICghb3B0aW9ucy5hbXBtY2xpY2thYmxlKSB7XHJcblx0XHRcdFx0dGhpcy5zcGFuQW1QbS5lbXB0eSgpO1xyXG5cdFx0XHRcdCQoJzxkaXYgaWQ9XCJjbGljay1hbVwiPkFNPC9kaXY+JykuYXBwZW5kVG8odGhpcy5zcGFuQW1QbSk7XHJcblx0XHRcdFx0JCgnPGRpdiBpZD1cImNsaWNrLXBtXCI+UE08L2Rpdj4nKS5hcHBlbmRUbyh0aGlzLnNwYW5BbVBtKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnNwYW5BbVBtLmVtcHR5KCk7XHJcblx0XHRcdFx0JCgnPGRpdiBpZD1cImNsaWNrLWFtXCI+QU08L2Rpdj4nKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0c2VsZi5zcGFuQW1QbS5jaGlsZHJlbignI2NsaWNrLWFtJykuYWRkQ2xhc3MoXCJ0ZXh0LXByaW1hcnlcIik7XHJcblx0XHRcdFx0XHRzZWxmLnNwYW5BbVBtLmNoaWxkcmVuKCcjY2xpY2stcG0nKS5yZW1vdmVDbGFzcyhcInRleHQtcHJpbWFyeVwiKTtcclxuXHRcdFx0XHRcdHNlbGYuYW1PclBtID0gXCJBTVwiO1xyXG5cdFx0XHRcdH0pLmFwcGVuZFRvKHRoaXMuc3BhbkFtUG0pO1xyXG5cdFx0XHRcdCQoJzxkaXYgaWQ9XCJjbGljay1wbVwiPlBNPC9kaXY+Jykub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHNlbGYuc3BhbkFtUG0uY2hpbGRyZW4oJyNjbGljay1wbScpLmFkZENsYXNzKFwidGV4dC1wcmltYXJ5XCIpO1xyXG5cdFx0XHRcdFx0c2VsZi5zcGFuQW1QbS5jaGlsZHJlbignI2NsaWNrLWFtJykucmVtb3ZlQ2xhc3MoXCJ0ZXh0LXByaW1hcnlcIik7XHJcblx0XHRcdFx0XHRzZWxmLmFtT3JQbSA9ICdQTSc7XHJcblx0XHRcdFx0fSkuYXBwZW5kVG8odGhpcy5zcGFuQW1QbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBBZGQgYnV0dG9ucyB0byBmb290ZXJcclxuXHRcdCQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLWZsYXQgcGlja2VyX19jbGVhclwiIHRhYmluZGV4PVwiJyArIChvcHRpb25zLnR3ZWx2ZWhvdXI/ICczJyA6ICcxJykgKyAnXCI+JyArIG9wdGlvbnMuY2xlYXJ0ZXh0ICsgJzwvYnV0dG9uPicpLmNsaWNrKCQucHJveHkodGhpcy5jbGVhciwgdGhpcykpLmFwcGVuZFRvKHRoaXMuZm9vdGVyKTtcclxuXHRcdCQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLWZsYXQgcGlja2VyX19jbG9zZVwiIHRhYmluZGV4PVwiJyArIChvcHRpb25zLnR3ZWx2ZWhvdXI/ICczJyA6ICcxJykgKyAnXCI+JyArIG9wdGlvbnMuY2FuY2VsdGV4dCArICc8L2J1dHRvbj4nKS5jbGljaygkLnByb3h5KHRoaXMuaGlkZSwgdGhpcykpLmFwcGVuZFRvKHRoaXMuZm9vdGVyKTtcclxuXHRcdCQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLWZsYXQgcGlja2VyX19jbG9zZVwiIHRhYmluZGV4PVwiJyArIChvcHRpb25zLnR3ZWx2ZWhvdXI/ICczJyA6ICcxJykgKyAnXCI+JyArIG9wdGlvbnMuZG9uZXRleHQgKyAnPC9idXR0b24+JykuY2xpY2soJC5wcm94eSh0aGlzLmRvbmUsIHRoaXMpKS5hcHBlbmRUbyh0aGlzLmZvb3Rlcik7XHJcblxyXG5cdFx0dGhpcy5zcGFuSG91cnMuY2xpY2soJC5wcm94eSh0aGlzLnRvZ2dsZVZpZXcsIHRoaXMsICdob3VycycpKTtcclxuXHRcdHRoaXMuc3Bhbk1pbnV0ZXMuY2xpY2soJC5wcm94eSh0aGlzLnRvZ2dsZVZpZXcsIHRoaXMsICdtaW51dGVzJykpO1xyXG5cclxuXHRcdC8vIFNob3cgb3IgdG9nZ2xlXHJcblx0XHRpbnB1dC5vbignZm9jdXMuY2xvY2twaWNrZXIgY2xpY2suY2xvY2twaWNrZXInLCAkLnByb3h5KHRoaXMuc2hvdywgdGhpcykpO1xyXG5cclxuXHRcdC8vIEJ1aWxkIHRpY2tzXHJcblx0XHR2YXIgdGlja1RwbCA9ICQoJzxkaXYgY2xhc3M9XCJjbG9ja3BpY2tlci10aWNrXCI+PC9kaXY+JyksXHJcblx0XHRcdFx0aSwgdGljaywgcmFkaWFuLCByYWRpdXM7XHJcblxyXG5cdFx0Ly8gSG91cnMgdmlld1xyXG5cdFx0aWYgKG9wdGlvbnMudHdlbHZlaG91cikge1xyXG5cdFx0XHRmb3IgKGkgPSAxOyBpIDwgMTM7IGkgKz0gMSkge1xyXG5cdFx0XHRcdHRpY2sgPSB0aWNrVHBsLmNsb25lKCk7XHJcblx0XHRcdFx0cmFkaWFuID0gaSAvIDYgKiBNYXRoLlBJO1xyXG5cdFx0XHRcdHJhZGl1cyA9IG91dGVyUmFkaXVzO1xyXG5cdFx0XHRcdHRpY2suY3NzKHtcclxuXHRcdFx0XHRcdGxlZnQ6IGRpYWxSYWRpdXMgKyBNYXRoLnNpbihyYWRpYW4pICogcmFkaXVzIC0gdGlja1JhZGl1cyxcclxuXHRcdFx0XHRcdHRvcDogZGlhbFJhZGl1cyAtIE1hdGguY29zKHJhZGlhbikgKiByYWRpdXMgLSB0aWNrUmFkaXVzXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dGljay5odG1sKGkgPT09IDAgPyAnMDAnIDogaSk7XHJcblx0XHRcdFx0aG91cnNWaWV3LmFwcGVuZCh0aWNrKTtcclxuXHRcdFx0XHR0aWNrLm9uKG1vdXNlZG93bkV2ZW50LCBtb3VzZWRvd24pO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgMjQ7IGkgKz0gMSkge1xyXG5cdFx0XHRcdHRpY2sgPSB0aWNrVHBsLmNsb25lKCk7XHJcblx0XHRcdFx0cmFkaWFuID0gaSAvIDYgKiBNYXRoLlBJO1xyXG5cdFx0XHRcdHZhciBpbm5lciA9IGkgPiAwICYmIGkgPCAxMztcclxuXHRcdFx0XHRyYWRpdXMgPSBpbm5lciA/IGlubmVyUmFkaXVzIDogb3V0ZXJSYWRpdXM7XHJcblx0XHRcdFx0dGljay5jc3Moe1xyXG5cdFx0XHRcdFx0bGVmdDogZGlhbFJhZGl1cyArIE1hdGguc2luKHJhZGlhbikgKiByYWRpdXMgLSB0aWNrUmFkaXVzLFxyXG5cdFx0XHRcdFx0dG9wOiBkaWFsUmFkaXVzIC0gTWF0aC5jb3MocmFkaWFuKSAqIHJhZGl1cyAtIHRpY2tSYWRpdXNcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aWNrLmh0bWwoaSA9PT0gMCA/ICcwMCcgOiBpKTtcclxuXHRcdFx0XHRob3Vyc1ZpZXcuYXBwZW5kKHRpY2spO1xyXG5cdFx0XHRcdHRpY2sub24obW91c2Vkb3duRXZlbnQsIG1vdXNlZG93bik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBNaW51dGVzIHZpZXdcclxuXHRcdGZvciAoaSA9IDA7IGkgPCA2MDsgaSArPSA1KSB7XHJcblx0XHRcdHRpY2sgPSB0aWNrVHBsLmNsb25lKCk7XHJcblx0XHRcdHJhZGlhbiA9IGkgLyAzMCAqIE1hdGguUEk7XHJcblx0XHRcdHRpY2suY3NzKHtcclxuXHRcdFx0XHRsZWZ0OiBkaWFsUmFkaXVzICsgTWF0aC5zaW4ocmFkaWFuKSAqIG91dGVyUmFkaXVzIC0gdGlja1JhZGl1cyxcclxuXHRcdFx0XHR0b3A6IGRpYWxSYWRpdXMgLSBNYXRoLmNvcyhyYWRpYW4pICogb3V0ZXJSYWRpdXMgLSB0aWNrUmFkaXVzXHJcblx0XHRcdH0pO1xyXG5cdFx0XHR0aWNrLmh0bWwobGVhZGluZ1plcm8oaSkpO1xyXG5cdFx0XHRtaW51dGVzVmlldy5hcHBlbmQodGljayk7XHJcblx0XHRcdHRpY2sub24obW91c2Vkb3duRXZlbnQsIG1vdXNlZG93bik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ2xpY2tpbmcgb24gbWludXRlcyB2aWV3IHNwYWNlXHJcblx0XHRwbGF0ZS5vbihtb3VzZWRvd25FdmVudCwgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmNsb2NrcGlja2VyLXRpY2snKS5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRtb3VzZWRvd24oZSwgdHJ1ZSk7XHJcbiAgICAgIH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIE1vdXNlZG93biBvciB0b3VjaHN0YXJ0XHJcblx0XHRmdW5jdGlvbiBtb3VzZWRvd24oZSwgc3BhY2UpIHtcclxuXHRcdFx0dmFyIG9mZnNldCA9IHBsYXRlLm9mZnNldCgpLFxyXG5cdFx0XHRcdFx0aXNUb3VjaCA9IC9edG91Y2gvLnRlc3QoZS50eXBlKSxcclxuXHRcdFx0XHRcdHgwID0gb2Zmc2V0LmxlZnQgKyBkaWFsUmFkaXVzLFxyXG5cdFx0XHRcdFx0eTAgPSBvZmZzZXQudG9wICsgZGlhbFJhZGl1cyxcclxuXHRcdFx0XHRcdGR4ID0gKGlzVG91Y2ggPyBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXSA6IGUpLnBhZ2VYIC0geDAsXHJcblx0XHRcdFx0XHRkeSA9IChpc1RvdWNoID8gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0gOiBlKS5wYWdlWSAtIHkwLFxyXG5cdFx0XHRcdFx0eiA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSksXHJcblx0XHRcdFx0XHRtb3ZlZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0Ly8gV2hlbiBjbGlja2luZyBvbiBtaW51dGVzIHZpZXcgc3BhY2UsIGNoZWNrIHRoZSBtb3VzZSBwb3NpdGlvblxyXG5cdFx0XHRpZiAoc3BhY2UgJiYgKHogPCBvdXRlclJhZGl1cyAtIHRpY2tSYWRpdXMgfHwgeiA+IG91dGVyUmFkaXVzICsgdGlja1JhZGl1cykpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcbiAgICAgIH1cclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0Ly8gU2V0IGN1cnNvciBzdHlsZSBvZiBib2R5IGFmdGVyIDIwMG1zXHJcblx0XHRcdHZhciBtb3ZpbmdUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRzZWxmLnBvcG92ZXIuYWRkQ2xhc3MoJ2Nsb2NrcGlja2VyLW1vdmluZycpO1xyXG5cdFx0XHR9LCAyMDApO1xyXG5cclxuXHRcdFx0Ly8gQ2xvY2tcclxuXHRcdFx0c2VsZi5zZXRIYW5kKGR4LCBkeSwgIXNwYWNlLCB0cnVlKTtcclxuXHJcblx0XHRcdC8vIE1vdXNlbW92ZSBvbiBkb2N1bWVudFxyXG5cdFx0XHQkZG9jLm9mZihtb3VzZW1vdmVFdmVudCkub24obW91c2Vtb3ZlRXZlbnQsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHR2YXIgaXNUb3VjaCA9IC9edG91Y2gvLnRlc3QoZS50eXBlKSxcclxuXHRcdFx0XHRcdFx0eCA9IChpc1RvdWNoID8gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0gOiBlKS5wYWdlWCAtIHgwLFxyXG5cdFx0XHRcdFx0XHR5ID0gKGlzVG91Y2ggPyBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXSA6IGUpLnBhZ2VZIC0geTA7XHJcblx0XHRcdFx0aWYgKCEgbW92ZWQgJiYgeCA9PT0gZHggJiYgeSA9PT0gZHkpIHtcclxuXHRcdFx0XHRcdC8vIENsaWNraW5nIGluIGNocm9tZSBvbiB3aW5kb3dzIHdpbGwgdHJpZ2dlciBhIG1vdXNlbW92ZSBldmVudFxyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHRcdFx0XHRtb3ZlZCA9IHRydWU7XHJcblx0XHRcdFx0c2VsZi5zZXRIYW5kKHgsIHksIGZhbHNlLCB0cnVlKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBNb3VzZXVwIG9uIGRvY3VtZW50XHJcblx0XHRcdCRkb2Mub2ZmKG1vdXNldXBFdmVudCkub24obW91c2V1cEV2ZW50LCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0JGRvYy5vZmYobW91c2V1cEV2ZW50KTtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0dmFyIGlzVG91Y2ggPSAvXnRvdWNoLy50ZXN0KGUudHlwZSksXHJcblx0XHRcdFx0XHRcdHggPSAoaXNUb3VjaCA/IGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXSA6IGUpLnBhZ2VYIC0geDAsXHJcblx0XHRcdFx0XHRcdHkgPSAoaXNUb3VjaCA/IGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXSA6IGUpLnBhZ2VZIC0geTA7XHJcblx0XHRcdFx0aWYgKChzcGFjZSB8fCBtb3ZlZCkgJiYgeCA9PT0gZHggJiYgeSA9PT0gZHkpIHtcclxuXHRcdFx0XHRcdHNlbGYuc2V0SGFuZCh4LCB5KTtcclxuICAgICAgICB9XHJcblxyXG5cdFx0XHRcdGlmIChzZWxmLmN1cnJlbnRWaWV3ID09PSAnaG91cnMnKSB7XHJcblx0XHRcdFx0XHRzZWxmLnRvZ2dsZVZpZXcoJ21pbnV0ZXMnLCBkdXJhdGlvbiAvIDIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5hdXRvY2xvc2UpIHtcclxuXHRcdFx0XHRcdHNlbGYubWludXRlc1ZpZXcuYWRkQ2xhc3MoJ2Nsb2NrcGlja2VyLWRpYWwtb3V0Jyk7XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdHNlbGYuZG9uZSgpO1xyXG5cdFx0XHRcdFx0fSwgZHVyYXRpb24gLyAyKTtcclxuICAgICAgICB9XHJcblx0XHRcdFx0cGxhdGUucHJlcGVuZChjYW52YXMpO1xyXG5cclxuXHRcdFx0XHQvLyBSZXNldCBjdXJzb3Igc3R5bGUgb2YgYm9keVxyXG5cdFx0XHRcdGNsZWFyVGltZW91dChtb3ZpbmdUaW1lcik7XHJcblx0XHRcdFx0c2VsZi5wb3BvdmVyLnJlbW92ZUNsYXNzKCdjbG9ja3BpY2tlci1tb3ZpbmcnKTtcclxuXHJcblx0XHRcdFx0Ly8gVW5iaW5kIG1vdXNlbW92ZSBldmVudFxyXG5cdFx0XHRcdCRkb2Mub2ZmKG1vdXNlbW92ZUV2ZW50KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHN2Z1N1cHBvcnRlZCkge1xyXG5cdFx0XHQvLyBEcmF3IGNsb2NrIGhhbmRzIGFuZCBvdGhlcnNcclxuXHRcdFx0dmFyIGNhbnZhcyA9IHBvcG92ZXIuZmluZCgnLmNsb2NrcGlja2VyLWNhbnZhcycpLFxyXG5cdFx0XHRcdFx0c3ZnID0gY3JlYXRlU3ZnRWxlbWVudCgnc3ZnJyk7XHJcblx0XHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Nsb2NrcGlja2VyLXN2ZycpO1xyXG5cdFx0XHRzdmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsIGRpYW1ldGVyKTtcclxuXHRcdFx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgZGlhbWV0ZXIpO1xyXG5cdFx0XHR2YXIgZyA9IGNyZWF0ZVN2Z0VsZW1lbnQoJ2cnKTtcclxuXHRcdFx0Zy5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIGRpYWxSYWRpdXMgKyAnLCcgKyBkaWFsUmFkaXVzICsgJyknKTtcclxuXHRcdFx0dmFyIGJlYXJpbmcgPSBjcmVhdGVTdmdFbGVtZW50KCdjaXJjbGUnKTtcclxuXHRcdFx0YmVhcmluZy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Nsb2NrcGlja2VyLWNhbnZhcy1iZWFyaW5nJyk7XHJcblx0XHRcdGJlYXJpbmcuc2V0QXR0cmlidXRlKCdjeCcsIDApO1xyXG5cdFx0XHRiZWFyaW5nLnNldEF0dHJpYnV0ZSgnY3knLCAwKTtcclxuXHRcdFx0YmVhcmluZy5zZXRBdHRyaWJ1dGUoJ3InLCA0KTtcclxuXHRcdFx0dmFyIGhhbmQgPSBjcmVhdGVTdmdFbGVtZW50KCdsaW5lJyk7XHJcblx0XHRcdGhhbmQuc2V0QXR0cmlidXRlKCd4MScsIDApO1xyXG5cdFx0XHRoYW5kLnNldEF0dHJpYnV0ZSgneTEnLCAwKTtcclxuXHRcdFx0dmFyIGJnID0gY3JlYXRlU3ZnRWxlbWVudCgnY2lyY2xlJyk7XHJcblx0XHRcdGJnLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY2xvY2twaWNrZXItY2FudmFzLWJnJyk7XHJcblx0XHRcdGJnLnNldEF0dHJpYnV0ZSgncicsIHRpY2tSYWRpdXMpO1xyXG5cdFx0XHRnLmFwcGVuZENoaWxkKGhhbmQpO1xyXG5cdFx0XHRnLmFwcGVuZENoaWxkKGJnKTtcclxuXHRcdFx0Zy5hcHBlbmRDaGlsZChiZWFyaW5nKTtcclxuXHRcdFx0c3ZnLmFwcGVuZENoaWxkKGcpO1xyXG5cdFx0XHRjYW52YXMuYXBwZW5kKHN2Zyk7XHJcblxyXG5cdFx0XHR0aGlzLmhhbmQgPSBoYW5kO1xyXG5cdFx0XHR0aGlzLmJnID0gYmc7XHJcblx0XHRcdHRoaXMuYmVhcmluZyA9IGJlYXJpbmc7XHJcblx0XHRcdHRoaXMuZyA9IGc7XHJcblx0XHRcdHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJhaXNlQ2FsbGJhY2sodGhpcy5vcHRpb25zLmluaXQpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcmFpc2VDYWxsYmFjayhjYWxsYmFja0Z1bmN0aW9uKSB7XHJcblx0XHRpZiAoY2FsbGJhY2tGdW5jdGlvbiAmJiB0eXBlb2YgY2FsbGJhY2tGdW5jdGlvbiA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRjYWxsYmFja0Z1bmN0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvLyBEZWZhdWx0IG9wdGlvbnNcclxuXHRDbG9ja1BpY2tlci5ERUZBVUxUUyA9IHtcclxuXHRcdCdkZWZhdWx0JzogJycsICAgICAgICAgLy8gZGVmYXVsdCB0aW1lLCAnbm93JyBvciAnMTM6MTQnIGUuZy5cclxuXHRcdGZyb21ub3c6IDAsICAgICAgICAgICAgLy8gc2V0IGRlZmF1bHQgdGltZSB0byAqIG1pbGxpc2Vjb25kcyBmcm9tIG5vdyAodXNpbmcgd2l0aCBkZWZhdWx0ID0gJ25vdycpXHJcblx0XHRkb25ldGV4dDogJ09rJywgICAgICAvLyBkb25lIGJ1dHRvbiB0ZXh0XHJcblx0XHRjbGVhcnRleHQ6ICdDbGVhcicsXHJcblx0XHRjYW5jZWx0ZXh0OiAnQ2FuY2VsJyxcclxuXHRcdGF1dG9jbG9zZTogZmFsc2UsICAgICAgLy8gYXV0byBjbG9zZSB3aGVuIG1pbnV0ZSBpcyBzZWxlY3RlZFxyXG5cdFx0YW1wbWNsaWNrYWJsZTogdHJ1ZSwgIC8vIHNldCBhbS9wbSBidXR0b24gb24gaXRzZWxmXHJcblx0XHRkYXJrdGhlbWU6IGZhbHNlLFx0XHRcdCAvLyBzZXQgdG8gZGFyayB0aGVtZVxyXG5cdFx0dHdlbHZlaG91cjogdHJ1ZSwgICAgICAvLyBjaGFuZ2UgdG8gMTIgaG91ciBBTS9QTSBjbG9jayBmcm9tIDI0IGhvdXJcclxuXHRcdHZpYnJhdGU6IHRydWUgICAgICAgICAgLy8gdmlicmF0ZSB0aGUgZGV2aWNlIHdoZW4gZHJhZ2dpbmcgY2xvY2sgaGFuZFxyXG5cdH07XHJcblxyXG5cdC8vIFNob3cgb3IgaGlkZSBwb3BvdmVyXHJcblx0Q2xvY2tQaWNrZXIucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpc1t0aGlzLmlzU2hvd24gPyAnaGlkZScgOiAnc2hvdyddKCk7XHJcblx0fTtcclxuXHJcblx0Ly8gU2V0IHBvcG92ZXIgcG9zaXRpb25cclxuXHRDbG9ja1BpY2tlci5wcm90b3R5cGUubG9jYXRlID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgZWxlbWVudCA9IHRoaXMuZWxlbWVudCxcclxuXHRcdFx0XHRwb3BvdmVyID0gdGhpcy5wb3BvdmVyLFxyXG5cdFx0XHRcdG9mZnNldCA9IGVsZW1lbnQub2Zmc2V0KCksXHJcblx0XHRcdFx0d2lkdGggPSBlbGVtZW50Lm91dGVyV2lkdGgoKSxcclxuXHRcdFx0XHRoZWlnaHQgPSBlbGVtZW50Lm91dGVySGVpZ2h0KCksXHJcblx0XHRcdFx0YWxpZ24gPSB0aGlzLm9wdGlvbnMuYWxpZ24sXHJcblx0XHRcdFx0c2VsZiA9IHRoaXM7XHJcblxyXG5cdFx0cG9wb3Zlci5zaG93KCk7XHJcblx0fTtcclxuXHJcblx0Ly8gU2hvdyBwb3BvdmVyXHJcblx0Q2xvY2tQaWNrZXIucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbihlKXtcclxuXHRcdC8vIE5vdCBzaG93IGFnYWluXHJcblx0XHRpZiAodGhpcy5pc1Nob3duKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHJhaXNlQ2FsbGJhY2sodGhpcy5vcHRpb25zLmJlZm9yZVNob3cpO1xyXG5cdFx0JCgnOmlucHV0JykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0JCh0aGlzKS5hdHRyKCd0YWJpbmRleCcsIC0xKTtcclxuXHRcdH0pXHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHQvLyBJbml0aWFsaXplXHJcblx0XHR0aGlzLmlucHV0LmJsdXIoKTtcclxuXHRcdHRoaXMucG9wb3Zlci5hZGRDbGFzcygncGlja2VyLS1vcGVuZWQnKTtcclxuXHRcdHRoaXMuaW5wdXQuYWRkQ2xhc3MoJ3BpY2tlcl9faW5wdXQgcGlja2VyX19pbnB1dC0tYWN0aXZlJyk7XHJcblx0XHQkKGRvY3VtZW50LmJvZHkpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblx0XHQvLyBHZXQgdGhlIHRpbWVcclxuXHRcdHZhciB2YWx1ZSA9ICgodGhpcy5pbnB1dC5wcm9wKCd2YWx1ZScpIHx8IHRoaXMub3B0aW9uc1snZGVmYXVsdCddIHx8ICcnKSArICcnKS5zcGxpdCgnOicpO1xyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy50d2VsdmVob3VyICYmICEodHlwZW9mIHZhbHVlWzFdID09PSAndW5kZWZpbmVkJykpIHtcclxuXHRcdFx0aWYgKHZhbHVlWzFdLmluZGV4T2YoXCJBTVwiKSA+IDApe1xyXG5cdFx0XHRcdHRoaXMuYW1PclBtID0gJ0FNJztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmFtT3JQbSA9ICdQTSc7XHJcblx0XHRcdH1cclxuXHRcdFx0dmFsdWVbMV0gPSB2YWx1ZVsxXS5yZXBsYWNlKFwiQU1cIiwgXCJcIikucmVwbGFjZShcIlBNXCIsIFwiXCIpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHZhbHVlWzBdID09PSAnbm93Jykge1xyXG5cdFx0XHR2YXIgbm93ID0gbmV3IERhdGUoKyBuZXcgRGF0ZSgpICsgdGhpcy5vcHRpb25zLmZyb21ub3cpO1xyXG5cdFx0XHR2YWx1ZSA9IFtcclxuXHRcdFx0XHRub3cuZ2V0SG91cnMoKSxcclxuXHRcdFx0XHRub3cuZ2V0TWludXRlcygpXHJcblx0XHRcdF07XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMudHdlbHZlaG91cikge1xyXG4gICAgICAgIHRoaXMuYW1PclBtID0gdmFsdWVbMF0gPj0gMTIgJiYgdmFsdWVbMF0gPCAyNCA/ICdQTScgOiAnQU0nO1xyXG4gICAgICB9XHJcblx0XHR9XHJcblx0XHR0aGlzLmhvdXJzID0gKyB2YWx1ZVswXSB8fCAwO1xyXG5cdFx0dGhpcy5taW51dGVzID0gKyB2YWx1ZVsxXSB8fCAwO1xyXG5cdFx0dGhpcy5zcGFuSG91cnMuaHRtbCh0aGlzLmhvdXJzKTtcclxuXHRcdHRoaXMuc3Bhbk1pbnV0ZXMuaHRtbChsZWFkaW5nWmVybyh0aGlzLm1pbnV0ZXMpKTtcclxuXHRcdGlmICghdGhpcy5pc0FwcGVuZGVkKSB7XHJcblxyXG5cdFx0XHQvLyBBcHBlbmQgcG9wb3ZlciB0byBpbnB1dCBieSBkZWZhdWx0XHJcbiAgICAgIHZhciBjb250YWluZXJFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5vcHRpb25zLmNvbnRhaW5lcik7XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGFpbmVyICYmIGNvbnRhaW5lckVsKSB7XHJcbiAgICAgICAgY29udGFpbmVyRWwuYXBwZW5kQ2hpbGQodGhpcy5wb3BvdmVyWzBdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBvcG92ZXIuaW5zZXJ0QWZ0ZXIodGhpcy5pbnB1dCk7XHJcbiAgICAgIH1cclxuXHJcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMudHdlbHZlaG91cikge1xyXG5cdFx0XHRcdGlmICh0aGlzLmFtT3JQbSA9PT0gJ1BNJyl7XHJcblx0XHRcdFx0XHR0aGlzLnNwYW5BbVBtLmNoaWxkcmVuKCcjY2xpY2stcG0nKS5hZGRDbGFzcyhcInRleHQtcHJpbWFyeVwiKTtcclxuXHRcdFx0XHRcdHRoaXMuc3BhbkFtUG0uY2hpbGRyZW4oJyNjbGljay1hbScpLnJlbW92ZUNsYXNzKFwidGV4dC1wcmltYXJ5XCIpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLnNwYW5BbVBtLmNoaWxkcmVuKCcjY2xpY2stYW0nKS5hZGRDbGFzcyhcInRleHQtcHJpbWFyeVwiKTtcclxuXHRcdFx0XHRcdHRoaXMuc3BhbkFtUG0uY2hpbGRyZW4oJyNjbGljay1wbScpLnJlbW92ZUNsYXNzKFwidGV4dC1wcmltYXJ5XCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBSZXNldCBwb3NpdGlvbiB3aGVuIHJlc2l6ZVxyXG5cdFx0XHQkd2luLm9uKCdyZXNpemUuY2xvY2twaWNrZXInICsgdGhpcy5pZCwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYgKHNlbGYuaXNTaG93bikge1xyXG5cdFx0XHRcdFx0c2VsZi5sb2NhdGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHR0aGlzLmlzQXBwZW5kZWQgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Ly8gVG9nZ2xlIHRvIGhvdXJzIHZpZXdcclxuXHRcdHRoaXMudG9nZ2xlVmlldygnaG91cnMnKTtcclxuXHRcdC8vIFNldCBwb3NpdGlvblxyXG5cdFx0dGhpcy5sb2NhdGUoKTtcclxuXHRcdHRoaXMuaXNTaG93biA9IHRydWU7XHJcblx0XHQvLyBIaWRlIHdoZW4gY2xpY2tpbmcgb3IgdGFiYmluZyBvbiBhbnkgZWxlbWVudCBleGNlcHQgdGhlIGNsb2NrIGFuZCBpbnB1dFxyXG5cdFx0JGRvYy5vbignY2xpY2suY2xvY2twaWNrZXIuJyArIHRoaXMuaWQgKyAnIGZvY3VzaW4uY2xvY2twaWNrZXIuJyArIHRoaXMuaWQsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0XHRpZiAodGFyZ2V0LmNsb3Nlc3Qoc2VsZi5wb3BvdmVyLmZpbmQoJy5waWNrZXJfX3dyYXAnKSkubGVuZ3RoID09PSAwICYmIHRhcmdldC5jbG9zZXN0KHNlbGYuaW5wdXQpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdHNlbGYuaGlkZSgpO1xyXG4gICAgICB9XHJcblx0XHR9KTtcclxuXHRcdC8vIEhpZGUgd2hlbiBFU0MgaXMgcHJlc3NlZFxyXG5cdFx0JGRvYy5vbigna2V5dXAuY2xvY2twaWNrZXIuJyArIHRoaXMuaWQsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRpZiAoZS5rZXlDb2RlID09PSAyNykge1xyXG5cdFx0XHRcdHNlbGYuaGlkZSgpO1xyXG4gICAgICB9XHJcblx0XHR9KTtcclxuXHRcdHJhaXNlQ2FsbGJhY2sodGhpcy5vcHRpb25zLmFmdGVyU2hvdyk7XHJcblx0fTtcclxuXHQvLyBIaWRlIHBvcG92ZXJcclxuXHRDbG9ja1BpY2tlci5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmFpc2VDYWxsYmFjayh0aGlzLm9wdGlvbnMuYmVmb3JlSGlkZSk7XHJcblx0XHR0aGlzLmlucHV0LnJlbW92ZUNsYXNzKCdwaWNrZXJfX2lucHV0IHBpY2tlcl9faW5wdXQtLWFjdGl2ZScpO1xyXG5cdFx0dGhpcy5wb3BvdmVyLnJlbW92ZUNsYXNzKCdwaWNrZXItLW9wZW5lZCcpO1xyXG5cdFx0JChkb2N1bWVudC5ib2R5KS5jc3MoJ292ZXJmbG93JywgJ3Zpc2libGUnKTtcclxuXHRcdHRoaXMuaXNTaG93biA9IGZhbHNlO1xyXG5cdFx0JCgnOmlucHV0JykuZWFjaChmdW5jdGlvbihpbmRleCkge1xyXG5cdFx0XHQkKHRoaXMpLmF0dHIoJ3RhYmluZGV4JywgaW5kZXggKyAxKTtcclxuXHRcdH0pO1xyXG5cdFx0Ly8gVW5iaW5kaW5nIGV2ZW50cyBvbiBkb2N1bWVudFxyXG5cdFx0JGRvYy5vZmYoJ2NsaWNrLmNsb2NrcGlja2VyLicgKyB0aGlzLmlkICsgJyBmb2N1c2luLmNsb2NrcGlja2VyLicgKyB0aGlzLmlkKTtcclxuXHRcdCRkb2Mub2ZmKCdrZXl1cC5jbG9ja3BpY2tlci4nICsgdGhpcy5pZCk7XHJcblx0XHR0aGlzLnBvcG92ZXIuaGlkZSgpO1xyXG5cdFx0cmFpc2VDYWxsYmFjayh0aGlzLm9wdGlvbnMuYWZ0ZXJIaWRlKTtcclxuXHR9O1xyXG5cdC8vIFRvZ2dsZSB0byBob3VycyBvciBtaW51dGVzIHZpZXdcclxuXHRDbG9ja1BpY2tlci5wcm90b3R5cGUudG9nZ2xlVmlldyA9IGZ1bmN0aW9uKHZpZXcsIGRlbGF5KSB7XHJcblx0XHR2YXIgcmFpc2VBZnRlckhvdXJTZWxlY3QgPSBmYWxzZTtcclxuXHRcdGlmICh2aWV3ID09PSAnbWludXRlcycgJiYgJCh0aGlzLmhvdXJzVmlldykuY3NzKFwidmlzaWJpbGl0eVwiKSA9PT0gXCJ2aXNpYmxlXCIpIHtcclxuXHRcdFx0cmFpc2VDYWxsYmFjayh0aGlzLm9wdGlvbnMuYmVmb3JlSG91clNlbGVjdCk7XHJcblx0XHRcdHJhaXNlQWZ0ZXJIb3VyU2VsZWN0ID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdHZhciBpc0hvdXJzID0gdmlldyA9PT0gJ2hvdXJzJyxcclxuXHRcdFx0XHRuZXh0VmlldyA9IGlzSG91cnMgPyB0aGlzLmhvdXJzVmlldyA6IHRoaXMubWludXRlc1ZpZXcsXHJcblx0XHRcdFx0aGlkZVZpZXcgPSBpc0hvdXJzID8gdGhpcy5taW51dGVzVmlldyA6IHRoaXMuaG91cnNWaWV3O1xyXG5cdFx0dGhpcy5jdXJyZW50VmlldyA9IHZpZXc7XHJcblxyXG5cdFx0dGhpcy5zcGFuSG91cnMudG9nZ2xlQ2xhc3MoJ3RleHQtcHJpbWFyeScsIGlzSG91cnMpO1xyXG5cdFx0dGhpcy5zcGFuTWludXRlcy50b2dnbGVDbGFzcygndGV4dC1wcmltYXJ5JywgISBpc0hvdXJzKTtcclxuXHJcblx0XHQvLyBMZXQncyBtYWtlIHRyYW5zaXRpb25zXHJcblx0XHRoaWRlVmlldy5hZGRDbGFzcygnY2xvY2twaWNrZXItZGlhbC1vdXQnKTtcclxuXHRcdG5leHRWaWV3LmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJykucmVtb3ZlQ2xhc3MoJ2Nsb2NrcGlja2VyLWRpYWwtb3V0Jyk7XHJcblxyXG5cdFx0Ly8gUmVzZXQgY2xvY2sgaGFuZFxyXG5cdFx0dGhpcy5yZXNldENsb2NrKGRlbGF5KTtcclxuXHJcblx0XHQvLyBBZnRlciB0cmFuc2l0aW9ucyBlbmRlZFxyXG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMudG9nZ2xlVmlld1RpbWVyKTtcclxuXHRcdHRoaXMudG9nZ2xlVmlld1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0aGlkZVZpZXcuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG5cdFx0fSwgZHVyYXRpb24pO1xyXG5cclxuXHRcdGlmIChyYWlzZUFmdGVySG91clNlbGVjdCkge1xyXG5cdFx0XHRyYWlzZUNhbGxiYWNrKHRoaXMub3B0aW9ucy5hZnRlckhvdXJTZWxlY3QpO1xyXG4gICAgfVxyXG5cdH07XHJcblxyXG5cdC8vIFJlc2V0IGNsb2NrIGhhbmRcclxuXHRDbG9ja1BpY2tlci5wcm90b3R5cGUucmVzZXRDbG9jayA9IGZ1bmN0aW9uKGRlbGF5KSB7XHJcblx0XHR2YXIgdmlldyA9IHRoaXMuY3VycmVudFZpZXcsXHJcblx0XHRcdFx0dmFsdWUgPSB0aGlzW3ZpZXddLFxyXG5cdFx0XHRcdGlzSG91cnMgPSB2aWV3ID09PSAnaG91cnMnLFxyXG5cdFx0XHRcdHVuaXQgPSBNYXRoLlBJIC8gKGlzSG91cnMgPyA2IDogMzApLFxyXG5cdFx0XHRcdHJhZGlhbiA9IHZhbHVlICogdW5pdCxcclxuXHRcdFx0XHRyYWRpdXMgPSBpc0hvdXJzICYmIHZhbHVlID4gMCAmJiB2YWx1ZSA8IDEzID8gaW5uZXJSYWRpdXMgOiBvdXRlclJhZGl1cyxcclxuXHRcdFx0XHR4ID0gTWF0aC5zaW4ocmFkaWFuKSAqIHJhZGl1cyxcclxuXHRcdFx0XHR5ID0gLSBNYXRoLmNvcyhyYWRpYW4pICogcmFkaXVzLFxyXG5cdFx0XHRcdHNlbGYgPSB0aGlzO1xyXG5cclxuXHRcdGlmIChzdmdTdXBwb3J0ZWQgJiYgZGVsYXkpIHtcclxuXHRcdFx0c2VsZi5jYW52YXMuYWRkQ2xhc3MoJ2Nsb2NrcGlja2VyLWNhbnZhcy1vdXQnKTtcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdHNlbGYuY2FudmFzLnJlbW92ZUNsYXNzKCdjbG9ja3BpY2tlci1jYW52YXMtb3V0Jyk7XHJcblx0XHRcdFx0c2VsZi5zZXRIYW5kKHgsIHkpO1xyXG5cdFx0XHR9LCBkZWxheSk7XHJcblx0XHR9IGVsc2VcclxuXHRcdFx0dGhpcy5zZXRIYW5kKHgsIHkpO1xyXG5cdH07XHJcblxyXG5cdC8vIFNldCBjbG9jayBoYW5kIHRvICh4LCB5KVxyXG5cdENsb2NrUGlja2VyLnByb3RvdHlwZS5zZXRIYW5kID0gZnVuY3Rpb24oeCwgeSwgcm91bmRCeTUsIGRyYWdnaW5nKSB7XHJcblx0XHR2YXIgcmFkaWFuID0gTWF0aC5hdGFuMih4LCAtIHkpLFxyXG5cdFx0XHRcdGlzSG91cnMgPSB0aGlzLmN1cnJlbnRWaWV3ID09PSAnaG91cnMnLFxyXG5cdFx0XHRcdHVuaXQgPSBNYXRoLlBJIC8gKGlzSG91cnMgfHwgcm91bmRCeTU/IDYgOiAzMCksXHJcblx0XHRcdFx0eiA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5KSxcclxuXHRcdFx0XHRvcHRpb25zID0gdGhpcy5vcHRpb25zLFxyXG5cdFx0XHRcdGlubmVyID0gaXNIb3VycyAmJiB6IDwgKG91dGVyUmFkaXVzICsgaW5uZXJSYWRpdXMpIC8gMixcclxuXHRcdFx0XHRyYWRpdXMgPSBpbm5lciA/IGlubmVyUmFkaXVzIDogb3V0ZXJSYWRpdXMsXHJcblx0XHRcdFx0dmFsdWU7XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMudHdlbHZlaG91cikge1xyXG5cdFx0XHRyYWRpdXMgPSBvdXRlclJhZGl1cztcclxuICAgIH1cclxuXHJcblx0XHQvLyBSYWRpYW4gc2hvdWxkIGluIHJhbmdlIFswLCAyUEldXHJcblx0XHRpZiAocmFkaWFuIDwgMCkge1xyXG5cdFx0XHRyYWRpYW4gPSBNYXRoLlBJICogMiArIHJhZGlhbjtcclxuICAgIH1cclxuXHJcblx0XHQvLyBHZXQgdGhlIHJvdW5kIHZhbHVlXHJcblx0XHR2YWx1ZSA9IE1hdGgucm91bmQocmFkaWFuIC8gdW5pdCk7XHJcblxyXG5cdFx0Ly8gR2V0IHRoZSByb3VuZCByYWRpYW5cclxuXHRcdHJhZGlhbiA9IHZhbHVlICogdW5pdDtcclxuXHJcblx0XHQvLyBDb3JyZWN0IHRoZSBob3VycyBvciBtaW51dGVzXHJcblx0XHRpZiAob3B0aW9ucy50d2VsdmVob3VyKSB7XHJcblx0XHRcdGlmIChpc0hvdXJzKSB7XHJcblx0XHRcdFx0aWYgKHZhbHVlID09PSAwKVxyXG5cdFx0XHRcdFx0dmFsdWUgPSAxMjtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAocm91bmRCeTUpXHJcblx0XHRcdFx0XHR2YWx1ZSAqPSA1O1xyXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gNjApXHJcblx0XHRcdFx0XHR2YWx1ZSA9IDA7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmIChpc0hvdXJzKSB7XHJcblx0XHRcdFx0aWYgKHZhbHVlID09PSAxMilcclxuXHRcdFx0XHRcdHZhbHVlID0gMDtcclxuXHRcdFx0XHR2YWx1ZSA9IGlubmVyID8gKHZhbHVlID09PSAwID8gMTIgOiB2YWx1ZSkgOiB2YWx1ZSA9PT0gMCA/IDAgOiB2YWx1ZSArIDEyO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmIChyb3VuZEJ5NSlcclxuXHRcdFx0XHRcdHZhbHVlICo9IDU7XHJcblx0XHRcdFx0aWYgKHZhbHVlID09PSA2MClcclxuXHRcdFx0XHRcdHZhbHVlID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIE9uY2UgaG91cnMgb3IgbWludXRlcyBjaGFuZ2VkLCB2aWJyYXRlIHRoZSBkZXZpY2VcclxuXHRcdGlmICh0aGlzW3RoaXMuY3VycmVudFZpZXddICE9PSB2YWx1ZSkge1xyXG5cdFx0XHRpZiAodmlicmF0ZSAmJiB0aGlzLm9wdGlvbnMudmlicmF0ZSkge1xyXG5cdFx0XHRcdC8vIERvIG5vdCB2aWJyYXRlIHRvbyBmcmVxdWVudGx5XHJcblx0XHRcdFx0aWYgKCF0aGlzLnZpYnJhdGVUaW1lcikge1xyXG5cdFx0XHRcdFx0bmF2aWdhdG9yW3ZpYnJhdGVdKDEwKTtcclxuXHRcdFx0XHRcdHRoaXMudmlicmF0ZVRpbWVyID0gc2V0VGltZW91dCgkLnByb3h5KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdHRoaXMudmlicmF0ZVRpbWVyID0gbnVsbDtcclxuXHRcdFx0XHRcdH0sIHRoaXMpLCAxMDApO1xyXG5cdFx0XHRcdH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHRcdHRoaXNbdGhpcy5jdXJyZW50Vmlld10gPSB2YWx1ZTtcclxuICAgIGlmIChpc0hvdXJzKSB7XHJcbiAgICAgIHRoaXNbJ3NwYW5Ib3VycyddLmh0bWwodmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpc1snc3Bhbk1pbnV0ZXMnXS5odG1sKGxlYWRpbmdaZXJvKHZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG5cdFx0Ly8gSWYgc3ZnIGlzIG5vdCBzdXBwb3J0ZWQsIGp1c3QgYWRkIGFuIGFjdGl2ZSBjbGFzcyB0byB0aGUgdGlja1xyXG5cdFx0aWYgKCFzdmdTdXBwb3J0ZWQpIHtcclxuXHRcdFx0dGhpc1tpc0hvdXJzID8gJ2hvdXJzVmlldycgOiAnbWludXRlc1ZpZXcnXS5maW5kKCcuY2xvY2twaWNrZXItdGljaycpLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHR2YXIgdGljayA9ICQodGhpcyk7XHJcblx0XHRcdFx0dGljay50b2dnbGVDbGFzcygnYWN0aXZlJywgdmFsdWUgPT09ICsgdGljay5odG1sKCkpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFNldCBjbG9jayBoYW5kIGFuZCBvdGhlcnMnIHBvc2l0aW9uXHJcblx0XHR2YXIgY3gxID0gTWF0aC5zaW4ocmFkaWFuKSAqIChyYWRpdXMgLSB0aWNrUmFkaXVzKSxcclxuXHRcdFx0ICBjeTEgPSAtIE1hdGguY29zKHJhZGlhbikgKiAocmFkaXVzIC0gdGlja1JhZGl1cyksXHJcblx0XHQgICAgY3gyID0gTWF0aC5zaW4ocmFkaWFuKSAqIHJhZGl1cyxcclxuXHRcdFx0ICBjeTIgPSAtIE1hdGguY29zKHJhZGlhbikgKiByYWRpdXM7XHJcblx0XHR0aGlzLmhhbmQuc2V0QXR0cmlidXRlKCd4MicsIGN4MSk7XHJcblx0XHR0aGlzLmhhbmQuc2V0QXR0cmlidXRlKCd5MicsIGN5MSk7XHJcblx0XHR0aGlzLmJnLnNldEF0dHJpYnV0ZSgnY3gnLCBjeDIpO1xyXG5cdFx0dGhpcy5iZy5zZXRBdHRyaWJ1dGUoJ2N5JywgY3kyKTtcclxuXHR9O1xyXG5cclxuXHQvLyBIb3VycyBhbmQgbWludXRlcyBhcmUgc2VsZWN0ZWRcclxuXHRDbG9ja1BpY2tlci5wcm90b3R5cGUuZG9uZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmFpc2VDYWxsYmFjayh0aGlzLm9wdGlvbnMuYmVmb3JlRG9uZSk7XHJcblx0XHR0aGlzLmhpZGUoKTtcclxuXHRcdHRoaXMubGFiZWwuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuXHRcdHZhciBsYXN0ID0gdGhpcy5pbnB1dC5wcm9wKCd2YWx1ZScpLFxyXG5cdFx0XHRcdHZhbHVlID0gbGVhZGluZ1plcm8odGhpcy5ob3VycykgKyAnOicgKyBsZWFkaW5nWmVybyh0aGlzLm1pbnV0ZXMpO1xyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy50d2VsdmVob3VyKSB7XHJcblx0XHRcdHZhbHVlID0gdmFsdWUgKyB0aGlzLmFtT3JQbTtcclxuICAgIH1cclxuXHJcblx0XHR0aGlzLmlucHV0LnByb3AoJ3ZhbHVlJywgdmFsdWUpO1xyXG5cdFx0aWYgKHZhbHVlICE9PSBsYXN0KSB7XHJcblx0XHRcdHRoaXMuaW5wdXQudHJpZ2dlckhhbmRsZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHRpZiAoIXRoaXMuaXNJbnB1dCkge1xyXG5cdFx0XHRcdHRoaXMuZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgfVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLm9wdGlvbnMuYXV0b2Nsb3NlKVxyXG5cdFx0XHR0aGlzLmlucHV0LnRyaWdnZXIoJ2JsdXInKTtcclxuXHJcblx0XHRyYWlzZUNhbGxiYWNrKHRoaXMub3B0aW9ucy5hZnRlckRvbmUpO1xyXG5cdH07XHJcblxyXG5cdC8vIENsZWFyIGlucHV0IGZpZWxkXHJcblx0Q2xvY2tQaWNrZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLmhpZGUoKTtcclxuXHRcdHRoaXMubGFiZWwucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuXHRcdHZhciBsYXN0ID0gdGhpcy5pbnB1dC5wcm9wKCd2YWx1ZScpLFxyXG5cdFx0XHQgIHZhbHVlID0gJyc7XHJcblxyXG5cdFx0dGhpcy5pbnB1dC5wcm9wKCd2YWx1ZScsIHZhbHVlKTtcclxuXHRcdGlmICh2YWx1ZSAhPT0gbGFzdCkge1xyXG5cdFx0XHR0aGlzLmlucHV0LnRyaWdnZXJIYW5kbGVyKCdjaGFuZ2UnKTtcclxuXHRcdFx0aWYgKCEgdGhpcy5pc0lucHV0KSB7XHJcblx0XHRcdFx0dGhpcy5lbGVtZW50LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5hdXRvY2xvc2UpIHtcclxuXHRcdFx0dGhpcy5pbnB1dC50cmlnZ2VyKCdibHVyJyk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0Ly8gUmVtb3ZlIGNsb2NrcGlja2VyIGZyb20gaW5wdXRcclxuXHRDbG9ja1BpY2tlci5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLmVsZW1lbnQucmVtb3ZlRGF0YSgnY2xvY2twaWNrZXInKTtcclxuXHRcdHRoaXMuaW5wdXQub2ZmKCdmb2N1cy5jbG9ja3BpY2tlciBjbGljay5jbG9ja3BpY2tlcicpO1xyXG5cdFx0aWYgKHRoaXMuaXNTaG93bikge1xyXG5cdFx0XHR0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuXHRcdGlmICh0aGlzLmlzQXBwZW5kZWQpIHtcclxuXHRcdFx0JHdpbi5vZmYoJ3Jlc2l6ZS5jbG9ja3BpY2tlcicgKyB0aGlzLmlkKTtcclxuXHRcdFx0dGhpcy5wb3BvdmVyLnJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8vIEV4dGVuZHMgJC5mbi5jbG9ja3BpY2tlclxyXG5cdCQuZm4ucGlja2F0aW1lID0gZnVuY3Rpb24ob3B0aW9uKXtcclxuXHRcdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcclxuXHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcclxuXHRcdFx0XHRcdGRhdGEgPSAkdGhpcy5kYXRhKCdjbG9ja3BpY2tlcicpO1xyXG5cdFx0XHRpZiAoIWRhdGEpIHtcclxuXHRcdFx0XHR2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBDbG9ja1BpY2tlci5ERUZBVUxUUywgJHRoaXMuZGF0YSgpLCB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvbik7XHJcblx0XHRcdFx0JHRoaXMuZGF0YSgnY2xvY2twaWNrZXInLCBuZXcgQ2xvY2tQaWNrZXIoJHRoaXMsIG9wdGlvbnMpKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBNYW51YWwgb3BlcmF0c2lvbnMuIHNob3csIGhpZGUsIHJlbW92ZSwgZS5nLlxyXG5cdFx0XHRcdGlmICh0eXBlb2YgZGF0YVtvcHRpb25dID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRkYXRhW29wdGlvbl0uYXBwbHkoZGF0YSwgYXJncyk7XHJcbiAgICAgICAgfVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG59KShqUXVlcnkpO1xyXG5cbihmdW5jdGlvbiAoJCkge1xyXG5cclxuICAkLmZuLmNoYXJhY3RlckNvdW50ZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKTtcclxuICAgICAgdmFyICRjb3VudGVyRWxlbWVudCA9ICRpbnB1dC5wYXJlbnQoKS5maW5kKCdzcGFuW2NsYXNzPVwiY2hhcmFjdGVyLWNvdW50ZXJcIl0nKTtcclxuXHJcbiAgICAgIC8vIGNoYXJhY3RlciBjb3VudGVyIGhhcyBhbHJlYWR5IGJlZW4gYWRkZWQgYXBwZW5kZWQgdG8gdGhlIHBhcmVudCBjb250YWluZXJcclxuICAgICAgaWYgKCRjb3VudGVyRWxlbWVudC5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBpdEhhc0xlbmd0aEF0dHJpYnV0ZSA9ICRpbnB1dC5hdHRyKCdkYXRhLWxlbmd0aCcpICE9PSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICBpZihpdEhhc0xlbmd0aEF0dHJpYnV0ZSl7XHJcbiAgICAgICAgJGlucHV0Lm9uKCdpbnB1dCcsIHVwZGF0ZUNvdW50ZXIpO1xyXG4gICAgICAgICRpbnB1dC5vbignZm9jdXMnLCB1cGRhdGVDb3VudGVyKTtcclxuICAgICAgICAkaW5wdXQub24oJ2JsdXInLCByZW1vdmVDb3VudGVyRWxlbWVudCk7XHJcblxyXG4gICAgICAgIGFkZENvdW50ZXJFbGVtZW50KCRpbnB1dCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBmdW5jdGlvbiB1cGRhdGVDb3VudGVyKCl7XHJcbiAgICB2YXIgbWF4TGVuZ3RoICAgICA9ICskKHRoaXMpLmF0dHIoJ2RhdGEtbGVuZ3RoJyksXHJcbiAgICBhY3R1YWxMZW5ndGggICAgICA9ICskKHRoaXMpLnZhbCgpLmxlbmd0aCxcclxuICAgIGlzVmFsaWRMZW5ndGggICAgID0gYWN0dWFsTGVuZ3RoIDw9IG1heExlbmd0aDtcclxuXHJcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ3NwYW5bY2xhc3M9XCJjaGFyYWN0ZXItY291bnRlclwiXScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmh0bWwoIGFjdHVhbExlbmd0aCArICcvJyArIG1heExlbmd0aCk7XHJcblxyXG4gICAgYWRkSW5wdXRTdHlsZShpc1ZhbGlkTGVuZ3RoLCAkKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFkZENvdW50ZXJFbGVtZW50KCRpbnB1dCkge1xyXG4gICAgdmFyICRjb3VudGVyRWxlbWVudCA9ICRpbnB1dC5wYXJlbnQoKS5maW5kKCdzcGFuW2NsYXNzPVwiY2hhcmFjdGVyLWNvdW50ZXJcIl0nKTtcclxuXHJcbiAgICBpZiAoJGNvdW50ZXJFbGVtZW50Lmxlbmd0aCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgJGNvdW50ZXJFbGVtZW50ID0gJCgnPHNwYW4vPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnY2hhcmFjdGVyLWNvdW50ZXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKCdmbG9hdCcsJ3JpZ2h0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnZm9udC1zaXplJywnMTJweCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsIDEpO1xyXG5cclxuICAgICRpbnB1dC5wYXJlbnQoKS5hcHBlbmQoJGNvdW50ZXJFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbW92ZUNvdW50ZXJFbGVtZW50KCl7XHJcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ3NwYW5bY2xhc3M9XCJjaGFyYWN0ZXItY291bnRlclwiXScpLmh0bWwoJycpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkSW5wdXRTdHlsZShpc1ZhbGlkTGVuZ3RoLCAkaW5wdXQpe1xyXG4gICAgdmFyIGlucHV0SGFzSW52YWxpZENsYXNzID0gJGlucHV0Lmhhc0NsYXNzKCdpbnZhbGlkJyk7XHJcbiAgICBpZiAoaXNWYWxpZExlbmd0aCAmJiBpbnB1dEhhc0ludmFsaWRDbGFzcykge1xyXG4gICAgICAkaW5wdXQucmVtb3ZlQ2xhc3MoJ2ludmFsaWQnKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoIWlzVmFsaWRMZW5ndGggJiYgIWlucHV0SGFzSW52YWxpZENsYXNzKXtcclxuICAgICAgJGlucHV0LnJlbW92ZUNsYXNzKCd2YWxpZCcpO1xyXG4gICAgICAkaW5wdXQuYWRkQ2xhc3MoJ2ludmFsaWQnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgICAkKCdpbnB1dCwgdGV4dGFyZWEnKS5jaGFyYWN0ZXJDb3VudGVyKCk7XHJcbiAgfSk7XHJcblxyXG59KCBqUXVlcnkgKSk7XHJcblxuKGZ1bmN0aW9uICgkKSB7XHJcblxyXG4gIHZhciBtZXRob2RzID0ge1xyXG5cclxuICAgIGluaXQgOiBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICAgIHZhciBkZWZhdWx0cyA9IHtcclxuICAgICAgICBkdXJhdGlvbjogMjAwLCAvLyBtc1xyXG4gICAgICAgIGRpc3Q6IC0xMDAsIC8vIHpvb20gc2NhbGUgVE9ETzogbWFrZSB0aGlzIG1vcmUgaW50dWl0aXZlIGFzIGFuIG9wdGlvblxyXG4gICAgICAgIHNoaWZ0OiAwLCAvLyBzcGFjaW5nIGZvciBjZW50ZXIgaW1hZ2VcclxuICAgICAgICBwYWRkaW5nOiAwLCAvLyBQYWRkaW5nIGJldHdlZW4gbm9uIGNlbnRlciBpdGVtc1xyXG4gICAgICAgIGZ1bGxXaWR0aDogZmFsc2UsIC8vIENoYW5nZSB0byBmdWxsIHdpZHRoIHN0eWxlc1xyXG4gICAgICAgIGluZGljYXRvcnM6IGZhbHNlLCAvLyBUb2dnbGUgaW5kaWNhdG9yc1xyXG4gICAgICAgIG5vV3JhcDogZmFsc2UsIC8vIERvbid0IHdyYXAgYXJvdW5kIGFuZCBjeWNsZSB0aHJvdWdoIGl0ZW1zLlxyXG4gICAgICAgIG9uQ3ljbGVUbzogbnVsbCAvLyBDYWxsYmFjayBmb3Igd2hlbiBhIG5ldyBzbGlkZSBpcyBjeWNsZWQgdG8uXHJcbiAgICAgIH07XHJcbiAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZChkZWZhdWx0cywgb3B0aW9ucyk7XHJcbiAgICAgIHZhciBuYW1lc3BhY2UgPSBNYXRlcmlhbGl6ZS5vYmplY3RTZWxlY3RvclN0cmluZygkKHRoaXMpKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oaSkge1xyXG5cclxuICAgICAgICB2YXIgaW1hZ2VzLCBpdGVtX3dpZHRoLCBpdGVtX2hlaWdodCwgb2Zmc2V0LCBjZW50ZXIsIHByZXNzZWQsIGRpbSwgY291bnQsXHJcbiAgICAgICAgICAgIHJlZmVyZW5jZSwgcmVmZXJlbmNlWSwgYW1wbGl0dWRlLCB0YXJnZXQsIHZlbG9jaXR5LCBzY3JvbGxpbmcsXHJcbiAgICAgICAgICAgIHhmb3JtLCBmcmFtZSwgdGltZXN0YW1wLCB0aWNrZXIsIGRyYWdnZWQsIHZlcnRpY2FsX2RyYWdnZWQ7XHJcbiAgICAgICAgdmFyICRpbmRpY2F0b3JzID0gJCgnPHVsIGNsYXNzPVwiaW5kaWNhdG9yc1wiPjwvdWw+Jyk7XHJcbiAgICAgICAgdmFyIHNjcm9sbGluZ1RpbWVvdXQgPSBudWxsO1xyXG4gICAgICAgIHZhciBvbmVUaW1lQ2FsbGJhY2sgPSBudWxsO1xyXG5cclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZVxyXG4gICAgICAgIHZhciB2aWV3ID0gJCh0aGlzKTtcclxuICAgICAgICB2YXIgaGFzTXVsdGlwbGVTbGlkZXMgPSB2aWV3LmZpbmQoJy5jYXJvdXNlbC1pdGVtJykubGVuZ3RoID4gMTtcclxuICAgICAgICB2YXIgc2hvd0luZGljYXRvcnMgPSAodmlldy5hdHRyKCdkYXRhLWluZGljYXRvcnMnKSB8fCBvcHRpb25zLmluZGljYXRvcnMpICYmIGhhc011bHRpcGxlU2xpZGVzO1xyXG4gICAgICAgIHZhciBub1dyYXAgPSAodmlldy5hdHRyKCdkYXRhLW5vLXdyYXAnKSB8fCBvcHRpb25zLm5vV3JhcCkgfHwgIWhhc011bHRpcGxlU2xpZGVzO1xyXG4gICAgICAgIHZhciB1bmlxdWVOYW1lc3BhY2UgPSB2aWV3LmF0dHIoJ2RhdGEtbmFtZXNwYWNlJykgfHwgbmFtZXNwYWNlK2k7XHJcbiAgICAgICAgdmlldy5hdHRyKCdkYXRhLW5hbWVzcGFjZScsIHVuaXF1ZU5hbWVzcGFjZSk7XHJcblxyXG5cclxuICAgICAgICAvLyBPcHRpb25zXHJcbiAgICAgICAgdmFyIHNldENhcm91c2VsSGVpZ2h0ID0gZnVuY3Rpb24oaW1hZ2VPbmx5KSB7XHJcbiAgICAgICAgICB2YXIgZmlyc3RTbGlkZSA9IHZpZXcuZmluZCgnLmNhcm91c2VsLWl0ZW0uYWN0aXZlJykubGVuZ3RoID8gdmlldy5maW5kKCcuY2Fyb3VzZWwtaXRlbS5hY3RpdmUnKS5maXJzdCgpIDogdmlldy5maW5kKCcuY2Fyb3VzZWwtaXRlbScpLmZpcnN0KCk7XHJcbiAgICAgICAgICB2YXIgZmlyc3RJbWFnZSA9IGZpcnN0U2xpZGUuZmluZCgnaW1nJykuZmlyc3QoKTtcclxuICAgICAgICAgIGlmIChmaXJzdEltYWdlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoZmlyc3RJbWFnZVswXS5jb21wbGV0ZSkge1xyXG4gICAgICAgICAgICAgIC8vIElmIGltYWdlIHdvbid0IHRyaWdnZXIgdGhlIGxvYWQgZXZlbnRcclxuICAgICAgICAgICAgICB2YXIgaW1hZ2VIZWlnaHQgPSBmaXJzdEltYWdlLmhlaWdodCgpO1xyXG4gICAgICAgICAgICAgIGlmIChpbWFnZUhlaWdodCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHZpZXcuY3NzKCdoZWlnaHQnLCBmaXJzdEltYWdlLmhlaWdodCgpKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgaW1hZ2Ugc3RpbGwgaGFzIG5vIGhlaWdodCwgdXNlIHRoZSBuYXR1cmFsIGRpbWVuc2lvbnMgdG8gY2FsY3VsYXRlXHJcbiAgICAgICAgICAgICAgICB2YXIgbmF0dXJhbFdpZHRoID0gZmlyc3RJbWFnZVswXS5uYXR1cmFsV2lkdGg7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmF0dXJhbEhlaWdodCA9IGZpcnN0SW1hZ2VbMF0ubmF0dXJhbEhlaWdodDtcclxuICAgICAgICAgICAgICAgIHZhciBhZGp1c3RlZEhlaWdodCA9ICh2aWV3LndpZHRoKCkgLyBuYXR1cmFsV2lkdGgpICogbmF0dXJhbEhlaWdodDtcclxuICAgICAgICAgICAgICAgIHZpZXcuY3NzKCdoZWlnaHQnLCBhZGp1c3RlZEhlaWdodCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vIEdldCBoZWlnaHQgd2hlbiBpbWFnZSBpcyBsb2FkZWQgbm9ybWFsbHlcclxuICAgICAgICAgICAgICBmaXJzdEltYWdlLm9uKCdsb2FkJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHZpZXcuY3NzKCdoZWlnaHQnLCAkKHRoaXMpLmhlaWdodCgpKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmICghaW1hZ2VPbmx5KSB7XHJcbiAgICAgICAgICAgIHZhciBzbGlkZUhlaWdodCA9IGZpcnN0U2xpZGUuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIHZpZXcuY3NzKCdoZWlnaHQnLCBzbGlkZUhlaWdodCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuZnVsbFdpZHRoKSB7XHJcbiAgICAgICAgICBvcHRpb25zLmRpc3QgPSAwO1xyXG4gICAgICAgICAgc2V0Q2Fyb3VzZWxIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAvLyBPZmZzZXQgZml4ZWQgaXRlbXMgd2hlbiBpbmRpY2F0b3JzLlxyXG4gICAgICAgICAgaWYgKHNob3dJbmRpY2F0b3JzKSB7XHJcbiAgICAgICAgICAgIHZpZXcuZmluZCgnLmNhcm91c2VsLWZpeGVkLWl0ZW0nKS5hZGRDbGFzcygnd2l0aC1pbmRpY2F0b3JzJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gRG9uJ3QgZG91YmxlIGluaXRpYWxpemUuXHJcbiAgICAgICAgaWYgKHZpZXcuaGFzQ2xhc3MoJ2luaXRpYWxpemVkJykpIHtcclxuICAgICAgICAgIC8vIFJlY2FsY3VsYXRlIHZhcmlhYmxlc1xyXG4gICAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoJ3Jlc2l6ZScpO1xyXG5cclxuICAgICAgICAgIC8vIFJlZHJhdyBjYXJvdXNlbC5cclxuICAgICAgICAgIHZpZXcudHJpZ2dlcignY2Fyb3VzZWxOZXh0JywgWzAuMDAwMDAxXSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB2aWV3LmFkZENsYXNzKCdpbml0aWFsaXplZCcpO1xyXG4gICAgICAgIHByZXNzZWQgPSBmYWxzZTtcclxuICAgICAgICBvZmZzZXQgPSB0YXJnZXQgPSAwO1xyXG4gICAgICAgIGltYWdlcyA9IFtdO1xyXG4gICAgICAgIGl0ZW1fd2lkdGggPSB2aWV3LmZpbmQoJy5jYXJvdXNlbC1pdGVtJykuZmlyc3QoKS5pbm5lcldpZHRoKCk7XHJcbiAgICAgICAgaXRlbV9oZWlnaHQgPSB2aWV3LmZpbmQoJy5jYXJvdXNlbC1pdGVtJykuZmlyc3QoKS5pbm5lckhlaWdodCgpO1xyXG4gICAgICAgIGRpbSA9IGl0ZW1fd2lkdGggKiAyICsgb3B0aW9ucy5wYWRkaW5nO1xyXG5cclxuICAgICAgICB2aWV3LmZpbmQoJy5jYXJvdXNlbC1pdGVtJykuZWFjaChmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgaW1hZ2VzLnB1c2goJCh0aGlzKVswXSk7XHJcbiAgICAgICAgICBpZiAoc2hvd0luZGljYXRvcnMpIHtcclxuICAgICAgICAgICAgdmFyICRpbmRpY2F0b3IgPSAkKCc8bGkgY2xhc3M9XCJpbmRpY2F0b3ItaXRlbVwiPjwvbGk+Jyk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgYWN0aXZlIHRvIGZpcnN0IGJ5IGRlZmF1bHQuXHJcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgJGluZGljYXRvci5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEhhbmRsZSBjbGlja3Mgb24gaW5kaWNhdG9ycy5cclxuICAgICAgICAgICAgJGluZGljYXRvci5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgIHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKTtcclxuICAgICAgICAgICAgICBjeWNsZVRvKGluZGV4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRpbmRpY2F0b3JzLmFwcGVuZCgkaW5kaWNhdG9yKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHNob3dJbmRpY2F0b3JzKSB7XHJcbiAgICAgICAgICB2aWV3LmFwcGVuZCgkaW5kaWNhdG9ycyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvdW50ID0gaW1hZ2VzLmxlbmd0aDtcclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldHVwRXZlbnRzKCkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cub250b3VjaHN0YXJ0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB2aWV3Lm9uKCd0b3VjaHN0YXJ0LmNhcm91c2VsJywgdGFwKTtcclxuICAgICAgICAgICAgdmlldy5vbigndG91Y2htb3ZlLmNhcm91c2VsJywgZHJhZyk7XHJcbiAgICAgICAgICAgIHZpZXcub24oJ3RvdWNoZW5kLmNhcm91c2VsJywgcmVsZWFzZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2aWV3Lm9uKCdtb3VzZWRvd24uY2Fyb3VzZWwnLCB0YXApO1xyXG4gICAgICAgICAgdmlldy5vbignbW91c2Vtb3ZlLmNhcm91c2VsJywgZHJhZyk7XHJcbiAgICAgICAgICB2aWV3Lm9uKCdtb3VzZXVwLmNhcm91c2VsJywgcmVsZWFzZSk7XHJcbiAgICAgICAgICB2aWV3Lm9uKCdtb3VzZWxlYXZlLmNhcm91c2VsJywgcmVsZWFzZSk7XHJcbiAgICAgICAgICB2aWV3Lm9uKCdjbGljay5jYXJvdXNlbCcsIGNsaWNrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHhwb3MoZSkge1xyXG4gICAgICAgICAgLy8gdG91Y2ggZXZlbnRcclxuICAgICAgICAgIGlmIChlLnRhcmdldFRvdWNoZXMgJiYgKGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPj0gMSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGUudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRYO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIG1vdXNlIGV2ZW50XHJcbiAgICAgICAgICByZXR1cm4gZS5jbGllbnRYO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24geXBvcyhlKSB7XHJcbiAgICAgICAgICAvLyB0b3VjaCBldmVudFxyXG4gICAgICAgICAgaWYgKGUudGFyZ2V0VG91Y2hlcyAmJiAoZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA+PSAxKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gbW91c2UgZXZlbnRcclxuICAgICAgICAgIHJldHVybiBlLmNsaWVudFk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cmFwKHgpIHtcclxuICAgICAgICAgIHJldHVybiAoeCA+PSBjb3VudCkgPyAoeCAlIGNvdW50KSA6ICh4IDwgMCkgPyB3cmFwKGNvdW50ICsgKHggJSBjb3VudCkpIDogeDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNjcm9sbCh4KSB7XHJcbiAgICAgICAgICAvLyBUcmFjayBzY3JvbGxpbmcgc3RhdGVcclxuICAgICAgICAgIHNjcm9sbGluZyA9IHRydWU7XHJcbiAgICAgICAgICBpZiAoIXZpZXcuaGFzQ2xhc3MoJ3Njcm9sbGluZycpKSB7XHJcbiAgICAgICAgICAgIHZpZXcuYWRkQ2xhc3MoJ3Njcm9sbGluZycpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHNjcm9sbGluZ1RpbWVvdXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHNjcm9sbGluZ1RpbWVvdXQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc2Nyb2xsaW5nVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzY3JvbGxpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmlldy5yZW1vdmVDbGFzcygnc2Nyb2xsaW5nJyk7XHJcbiAgICAgICAgICB9LCBvcHRpb25zLmR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAvLyBTdGFydCBhY3R1YWwgc2Nyb2xsXHJcbiAgICAgICAgICB2YXIgaSwgaGFsZiwgZGVsdGEsIGRpciwgdHdlZW4sIGVsLCBhbGlnbm1lbnQsIHhUcmFuc2xhdGlvbjtcclxuICAgICAgICAgIHZhciBsYXN0Q2VudGVyID0gY2VudGVyO1xyXG5cclxuICAgICAgICAgIG9mZnNldCA9ICh0eXBlb2YgeCA9PT0gJ251bWJlcicpID8geCA6IG9mZnNldDtcclxuICAgICAgICAgIGNlbnRlciA9IE1hdGguZmxvb3IoKG9mZnNldCArIGRpbSAvIDIpIC8gZGltKTtcclxuICAgICAgICAgIGRlbHRhID0gb2Zmc2V0IC0gY2VudGVyICogZGltO1xyXG4gICAgICAgICAgZGlyID0gKGRlbHRhIDwgMCkgPyAxIDogLTE7XHJcbiAgICAgICAgICB0d2VlbiA9IC1kaXIgKiBkZWx0YSAqIDIgLyBkaW07XHJcbiAgICAgICAgICBoYWxmID0gY291bnQgPj4gMTtcclxuXHJcbiAgICAgICAgICBpZiAoIW9wdGlvbnMuZnVsbFdpZHRoKSB7XHJcbiAgICAgICAgICAgIGFsaWdubWVudCA9ICd0cmFuc2xhdGVYKCcgKyAodmlld1swXS5jbGllbnRXaWR0aCAtIGl0ZW1fd2lkdGgpIC8gMiArICdweCkgJztcclxuICAgICAgICAgICAgYWxpZ25tZW50ICs9ICd0cmFuc2xhdGVZKCcgKyAodmlld1swXS5jbGllbnRIZWlnaHQgLSBpdGVtX2hlaWdodCkgLyAyICsgJ3B4KSc7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGlnbm1lbnQgPSAndHJhbnNsYXRlWCgwKSc7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gU2V0IGluZGljYXRvciBhY3RpdmVcclxuICAgICAgICAgIGlmIChzaG93SW5kaWNhdG9ycykge1xyXG4gICAgICAgICAgICB2YXIgZGlmZiA9IChjZW50ZXIgJSBjb3VudCk7XHJcbiAgICAgICAgICAgIHZhciBhY3RpdmVJbmRpY2F0b3IgPSAkaW5kaWNhdG9ycy5maW5kKCcuaW5kaWNhdG9yLWl0ZW0uYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGlmIChhY3RpdmVJbmRpY2F0b3IuaW5kZXgoKSAhPT0gZGlmZikge1xyXG4gICAgICAgICAgICAgIGFjdGl2ZUluZGljYXRvci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgJGluZGljYXRvcnMuZmluZCgnLmluZGljYXRvci1pdGVtJykuZXEoZGlmZikuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gY2VudGVyXHJcbiAgICAgICAgICAvLyBEb24ndCBzaG93IHdyYXBwZWQgaXRlbXMuXHJcbiAgICAgICAgICBpZiAoIW5vV3JhcCB8fCAoY2VudGVyID49IDAgJiYgY2VudGVyIDwgY291bnQpKSB7XHJcbiAgICAgICAgICAgIGVsID0gaW1hZ2VzW3dyYXAoY2VudGVyKV07XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgYWN0aXZlIGNsYXNzIHRvIGNlbnRlciBpdGVtLlxyXG4gICAgICAgICAgICBpZiAoISQoZWwpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgIHZpZXcuZmluZCgnLmNhcm91c2VsLWl0ZW0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgJChlbCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsLnN0eWxlW3hmb3JtXSA9IGFsaWdubWVudCArXHJcbiAgICAgICAgICAgICAgJyB0cmFuc2xhdGVYKCcgKyAoLWRlbHRhIC8gMikgKyAncHgpJyArXHJcbiAgICAgICAgICAgICAgJyB0cmFuc2xhdGVYKCcgKyAoZGlyICogb3B0aW9ucy5zaGlmdCAqIHR3ZWVuICogaSkgKyAncHgpJyArXHJcbiAgICAgICAgICAgICAgJyB0cmFuc2xhdGVaKCcgKyAob3B0aW9ucy5kaXN0ICogdHdlZW4pICsgJ3B4KSc7XHJcbiAgICAgICAgICAgIGVsLnN0eWxlLnpJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmZ1bGxXaWR0aCkgeyB0d2VlbmVkT3BhY2l0eSA9IDE7IH1cclxuICAgICAgICAgICAgZWxzZSB7IHR3ZWVuZWRPcGFjaXR5ID0gMSAtIDAuMiAqIHR3ZWVuOyB9XHJcbiAgICAgICAgICAgIGVsLnN0eWxlLm9wYWNpdHkgPSB0d2VlbmVkT3BhY2l0eTtcclxuICAgICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZm9yIChpID0gMTsgaSA8PSBoYWxmOyArK2kpIHtcclxuICAgICAgICAgICAgLy8gcmlnaHQgc2lkZVxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5mdWxsV2lkdGgpIHtcclxuICAgICAgICAgICAgICB6VHJhbnNsYXRpb24gPSBvcHRpb25zLmRpc3Q7XHJcbiAgICAgICAgICAgICAgdHdlZW5lZE9wYWNpdHkgPSAoaSA9PT0gaGFsZiAmJiBkZWx0YSA8IDApID8gMSAtIHR3ZWVuIDogMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB6VHJhbnNsYXRpb24gPSBvcHRpb25zLmRpc3QgKiAoaSAqIDIgKyB0d2VlbiAqIGRpcik7XHJcbiAgICAgICAgICAgICAgdHdlZW5lZE9wYWNpdHkgPSAxIC0gMC4yICogKGkgKiAyICsgdHdlZW4gKiBkaXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIERvbid0IHNob3cgd3JhcHBlZCBpdGVtcy5cclxuICAgICAgICAgICAgaWYgKCFub1dyYXAgfHwgY2VudGVyICsgaSA8IGNvdW50KSB7XHJcbiAgICAgICAgICAgICAgZWwgPSBpbWFnZXNbd3JhcChjZW50ZXIgKyBpKV07XHJcbiAgICAgICAgICAgICAgZWwuc3R5bGVbeGZvcm1dID0gYWxpZ25tZW50ICtcclxuICAgICAgICAgICAgICAgICcgdHJhbnNsYXRlWCgnICsgKG9wdGlvbnMuc2hpZnQgKyAoZGltICogaSAtIGRlbHRhKSAvIDIpICsgJ3B4KScgK1xyXG4gICAgICAgICAgICAgICAgJyB0cmFuc2xhdGVaKCcgKyB6VHJhbnNsYXRpb24gKyAncHgpJztcclxuICAgICAgICAgICAgICBlbC5zdHlsZS56SW5kZXggPSAtaTtcclxuICAgICAgICAgICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gdHdlZW5lZE9wYWNpdHk7XHJcbiAgICAgICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvLyBsZWZ0IHNpZGVcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZnVsbFdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgelRyYW5zbGF0aW9uID0gb3B0aW9ucy5kaXN0O1xyXG4gICAgICAgICAgICAgIHR3ZWVuZWRPcGFjaXR5ID0gKGkgPT09IGhhbGYgJiYgZGVsdGEgPiAwKSA/IDEgLSB0d2VlbiA6IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgelRyYW5zbGF0aW9uID0gb3B0aW9ucy5kaXN0ICogKGkgKiAyIC0gdHdlZW4gKiBkaXIpO1xyXG4gICAgICAgICAgICAgIHR3ZWVuZWRPcGFjaXR5ID0gMSAtIDAuMiAqIChpICogMiAtIHR3ZWVuICogZGlyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBEb24ndCBzaG93IHdyYXBwZWQgaXRlbXMuXHJcbiAgICAgICAgICAgIGlmICghbm9XcmFwIHx8IGNlbnRlciAtIGkgPj0gMCkge1xyXG4gICAgICAgICAgICAgIGVsID0gaW1hZ2VzW3dyYXAoY2VudGVyIC0gaSldO1xyXG4gICAgICAgICAgICAgIGVsLnN0eWxlW3hmb3JtXSA9IGFsaWdubWVudCArXHJcbiAgICAgICAgICAgICAgICAnIHRyYW5zbGF0ZVgoJyArICgtb3B0aW9ucy5zaGlmdCArICgtZGltICogaSAtIGRlbHRhKSAvIDIpICsgJ3B4KScgK1xyXG4gICAgICAgICAgICAgICAgJyB0cmFuc2xhdGVaKCcgKyB6VHJhbnNsYXRpb24gKyAncHgpJztcclxuICAgICAgICAgICAgICBlbC5zdHlsZS56SW5kZXggPSAtaTtcclxuICAgICAgICAgICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gdHdlZW5lZE9wYWNpdHk7XHJcbiAgICAgICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBjZW50ZXJcclxuICAgICAgICAgIC8vIERvbid0IHNob3cgd3JhcHBlZCBpdGVtcy5cclxuICAgICAgICAgIGlmICghbm9XcmFwIHx8IChjZW50ZXIgPj0gMCAmJiBjZW50ZXIgPCBjb3VudCkpIHtcclxuICAgICAgICAgICAgZWwgPSBpbWFnZXNbd3JhcChjZW50ZXIpXTtcclxuICAgICAgICAgICAgZWwuc3R5bGVbeGZvcm1dID0gYWxpZ25tZW50ICtcclxuICAgICAgICAgICAgICAnIHRyYW5zbGF0ZVgoJyArICgtZGVsdGEgLyAyKSArICdweCknICtcclxuICAgICAgICAgICAgICAnIHRyYW5zbGF0ZVgoJyArIChkaXIgKiBvcHRpb25zLnNoaWZ0ICogdHdlZW4pICsgJ3B4KScgK1xyXG4gICAgICAgICAgICAgICcgdHJhbnNsYXRlWignICsgKG9wdGlvbnMuZGlzdCAqIHR3ZWVuKSArICdweCknO1xyXG4gICAgICAgICAgICBlbC5zdHlsZS56SW5kZXggPSAwO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5mdWxsV2lkdGgpIHsgdHdlZW5lZE9wYWNpdHkgPSAxOyB9XHJcbiAgICAgICAgICAgIGVsc2UgeyB0d2VlbmVkT3BhY2l0eSA9IDEgLSAwLjIgKiB0d2VlbjsgfVxyXG4gICAgICAgICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gdHdlZW5lZE9wYWNpdHk7XHJcbiAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIG9uQ3ljbGVUbyBjYWxsYmFja1xyXG4gICAgICAgICAgaWYgKGxhc3RDZW50ZXIgIT09IGNlbnRlciAmJlxyXG4gICAgICAgICAgICAgIHR5cGVvZihvcHRpb25zLm9uQ3ljbGVUbykgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICB2YXIgJGN1cnJfaXRlbSA9IHZpZXcuZmluZCgnLmNhcm91c2VsLWl0ZW0nKS5lcSh3cmFwKGNlbnRlcikpO1xyXG4gICAgICAgICAgICBvcHRpb25zLm9uQ3ljbGVUby5jYWxsKHRoaXMsICRjdXJyX2l0ZW0sIGRyYWdnZWQpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIE9uZSB0aW1lIGNhbGxiYWNrXHJcbiAgICAgICAgICBpZiAodHlwZW9mKG9uZVRpbWVDYWxsYmFjaykgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBvbmVUaW1lQ2FsbGJhY2suY2FsbCh0aGlzLCAkY3Vycl9pdGVtLCBkcmFnZ2VkKTtcclxuICAgICAgICAgICAgb25lVGltZUNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRyYWNrKCkge1xyXG4gICAgICAgICAgdmFyIG5vdywgZWxhcHNlZCwgZGVsdGEsIHY7XHJcblxyXG4gICAgICAgICAgbm93ID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgIGVsYXBzZWQgPSBub3cgLSB0aW1lc3RhbXA7XHJcbiAgICAgICAgICB0aW1lc3RhbXAgPSBub3c7XHJcbiAgICAgICAgICBkZWx0YSA9IG9mZnNldCAtIGZyYW1lO1xyXG4gICAgICAgICAgZnJhbWUgPSBvZmZzZXQ7XHJcblxyXG4gICAgICAgICAgdiA9IDEwMDAgKiBkZWx0YSAvICgxICsgZWxhcHNlZCk7XHJcbiAgICAgICAgICB2ZWxvY2l0eSA9IDAuOCAqIHYgKyAwLjIgKiB2ZWxvY2l0eTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGF1dG9TY3JvbGwoKSB7XHJcbiAgICAgICAgICB2YXIgZWxhcHNlZCwgZGVsdGE7XHJcblxyXG4gICAgICAgICAgaWYgKGFtcGxpdHVkZSkge1xyXG4gICAgICAgICAgICBlbGFwc2VkID0gRGF0ZS5ub3coKSAtIHRpbWVzdGFtcDtcclxuICAgICAgICAgICAgZGVsdGEgPSBhbXBsaXR1ZGUgKiBNYXRoLmV4cCgtZWxhcHNlZCAvIG9wdGlvbnMuZHVyYXRpb24pO1xyXG4gICAgICAgICAgICBpZiAoZGVsdGEgPiAyIHx8IGRlbHRhIDwgLTIpIHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbCh0YXJnZXQgLSBkZWx0YSk7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYXV0b1Njcm9sbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGwodGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2xpY2soZSkge1xyXG4gICAgICAgICAgLy8gRGlzYWJsZSBjbGlja3MgaWYgY2Fyb3VzZWwgd2FzIGRyYWdnZWQuXHJcbiAgICAgICAgICBpZiAoZHJhZ2dlZCkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICB9IGVsc2UgaWYgKCFvcHRpb25zLmZ1bGxXaWR0aCkge1xyXG4gICAgICAgICAgICB2YXIgY2xpY2tlZEluZGV4ID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLmNhcm91c2VsLWl0ZW0nKS5pbmRleCgpO1xyXG4gICAgICAgICAgICB2YXIgZGlmZiA9IHdyYXAoY2VudGVyKSAtIGNsaWNrZWRJbmRleDtcclxuXHJcbiAgICAgICAgICAgIC8vIERpc2FibGUgY2xpY2tzIGlmIGNhcm91c2VsIHdhcyBzaGlmdGVkIGJ5IGNsaWNrXHJcbiAgICAgICAgICAgIGlmIChkaWZmICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3ljbGVUbyhjbGlja2VkSW5kZXgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY3ljbGVUbyhuKSB7XHJcbiAgICAgICAgICB2YXIgZGlmZiA9IChjZW50ZXIgJSBjb3VudCkgLSBuO1xyXG5cclxuICAgICAgICAgIC8vIEFjY291bnQgZm9yIHdyYXBhcm91bmQuXHJcbiAgICAgICAgICBpZiAoIW5vV3JhcCkge1xyXG4gICAgICAgICAgICBpZiAoZGlmZiA8IDApIHtcclxuICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGlmZiArIGNvdW50KSA8IE1hdGguYWJzKGRpZmYpKSB7IGRpZmYgKz0gY291bnQ7IH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlmZiA+IDApIHtcclxuICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGlmZiAtIGNvdW50KSA8IGRpZmYpIHsgZGlmZiAtPSBjb3VudDsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gQ2FsbCBwcmV2IG9yIG5leHQgYWNjb3JkaW5nbHkuXHJcbiAgICAgICAgICBpZiAoZGlmZiA8IDApIHtcclxuICAgICAgICAgICAgdmlldy50cmlnZ2VyKCdjYXJvdXNlbE5leHQnLCBbTWF0aC5hYnMoZGlmZildKTtcclxuXHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGRpZmYgPiAwKSB7XHJcbiAgICAgICAgICAgIHZpZXcudHJpZ2dlcignY2Fyb3VzZWxQcmV2JywgW2RpZmZdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRhcChlKSB7XHJcbiAgICAgICAgICAvLyBGaXhlcyBmaXJlZm94IGRyYWdnYWJsZSBpbWFnZSBidWdcclxuICAgICAgICAgIGlmIChlLnR5cGUgPT09ICdtb3VzZWRvd24nICYmICQoZS50YXJnZXQpLmlzKCdpbWcnKSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgICAgIGRyYWdnZWQgPSBmYWxzZTtcclxuICAgICAgICAgIHZlcnRpY2FsX2RyYWdnZWQgPSBmYWxzZTtcclxuICAgICAgICAgIHJlZmVyZW5jZSA9IHhwb3MoZSk7XHJcbiAgICAgICAgICByZWZlcmVuY2VZID0geXBvcyhlKTtcclxuXHJcbiAgICAgICAgICB2ZWxvY2l0eSA9IGFtcGxpdHVkZSA9IDA7XHJcbiAgICAgICAgICBmcmFtZSA9IG9mZnNldDtcclxuICAgICAgICAgIHRpbWVzdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICBjbGVhckludGVydmFsKHRpY2tlcik7XHJcbiAgICAgICAgICB0aWNrZXIgPSBzZXRJbnRlcnZhbCh0cmFjaywgMTAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRyYWcoZSkge1xyXG4gICAgICAgICAgdmFyIHgsIGRlbHRhLCBkZWx0YVk7XHJcbiAgICAgICAgICBpZiAocHJlc3NlZCkge1xyXG4gICAgICAgICAgICB4ID0geHBvcyhlKTtcclxuICAgICAgICAgICAgeSA9IHlwb3MoZSk7XHJcbiAgICAgICAgICAgIGRlbHRhID0gcmVmZXJlbmNlIC0geDtcclxuICAgICAgICAgICAgZGVsdGFZID0gTWF0aC5hYnMocmVmZXJlbmNlWSAtIHkpO1xyXG4gICAgICAgICAgICBpZiAoZGVsdGFZIDwgMzAgJiYgIXZlcnRpY2FsX2RyYWdnZWQpIHtcclxuICAgICAgICAgICAgICAvLyBJZiB2ZXJ0aWNhbCBzY3JvbGxpbmcgZG9uJ3QgYWxsb3cgZHJhZ2dpbmcuXHJcbiAgICAgICAgICAgICAgaWYgKGRlbHRhID4gMiB8fCBkZWx0YSA8IC0yKSB7XHJcbiAgICAgICAgICAgICAgICBkcmFnZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJlZmVyZW5jZSA9IHg7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGwob2Zmc2V0ICsgZGVsdGEpO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZHJhZ2dlZCkge1xyXG4gICAgICAgICAgICAgIC8vIElmIGRyYWdnaW5nIGRvbid0IGFsbG93IHZlcnRpY2FsIHNjcm9sbC5cclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vIFZlcnRpY2FsIHNjcm9sbGluZy5cclxuICAgICAgICAgICAgICB2ZXJ0aWNhbF9kcmFnZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChkcmFnZ2VkKSB7XHJcbiAgICAgICAgICAgIC8vIElmIGRyYWdnaW5nIGRvbid0IGFsbG93IHZlcnRpY2FsIHNjcm9sbC5cclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWxlYXNlKGUpIHtcclxuICAgICAgICAgIGlmIChwcmVzc2VkKSB7XHJcbiAgICAgICAgICAgIHByZXNzZWQgPSBmYWxzZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjbGVhckludGVydmFsKHRpY2tlcik7XHJcbiAgICAgICAgICB0YXJnZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgICBpZiAodmVsb2NpdHkgPiAxMCB8fCB2ZWxvY2l0eSA8IC0xMCkge1xyXG4gICAgICAgICAgICBhbXBsaXR1ZGUgPSAwLjkgKiB2ZWxvY2l0eTtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gb2Zmc2V0ICsgYW1wbGl0dWRlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGFyZ2V0ID0gTWF0aC5yb3VuZCh0YXJnZXQgLyBkaW0pICogZGltO1xyXG5cclxuICAgICAgICAgIC8vIE5vIHdyYXAgb2YgaXRlbXMuXHJcbiAgICAgICAgICBpZiAobm9XcmFwKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPj0gZGltICogKGNvdW50IC0gMSkpIHtcclxuICAgICAgICAgICAgICB0YXJnZXQgPSBkaW0gKiAoY291bnQgLSAxKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgdGFyZ2V0ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYW1wbGl0dWRlID0gdGFyZ2V0IC0gb2Zmc2V0O1xyXG4gICAgICAgICAgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhdXRvU2Nyb2xsKTtcclxuXHJcbiAgICAgICAgICBpZiAoZHJhZ2dlZCkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB4Zm9ybSA9ICd0cmFuc2Zvcm0nO1xyXG4gICAgICAgIFsnd2Via2l0JywgJ01veicsICdPJywgJ21zJ10uZXZlcnkoZnVuY3Rpb24gKHByZWZpeCkge1xyXG4gICAgICAgICAgdmFyIGUgPSBwcmVmaXggKyAnVHJhbnNmb3JtJztcclxuICAgICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQuYm9keS5zdHlsZVtlXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgeGZvcm0gPSBlO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIHZhciB0aHJvdHRsZWRSZXNpemUgPSBNYXRlcmlhbGl6ZS50aHJvdHRsZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmIChvcHRpb25zLmZ1bGxXaWR0aCkge1xyXG4gICAgICAgICAgICBpdGVtX3dpZHRoID0gdmlldy5maW5kKCcuY2Fyb3VzZWwtaXRlbScpLmZpcnN0KCkuaW5uZXJXaWR0aCgpO1xyXG4gICAgICAgICAgICB2YXIgaW1hZ2VIZWlnaHQgPSB2aWV3LmZpbmQoJy5jYXJvdXNlbC1pdGVtLmFjdGl2ZScpLmhlaWdodCgpO1xyXG4gICAgICAgICAgICBkaW0gPSBpdGVtX3dpZHRoICogMiArIG9wdGlvbnMucGFkZGluZztcclxuICAgICAgICAgICAgb2Zmc2V0ID0gY2VudGVyICogMiAqIGl0ZW1fd2lkdGg7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IG9mZnNldDtcclxuICAgICAgICAgICAgc2V0Q2Fyb3VzZWxIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzY3JvbGwoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgICQod2luZG93KVxyXG4gICAgICAgICAgLm9mZigncmVzaXplLmNhcm91c2VsLScrdW5pcXVlTmFtZXNwYWNlKVxyXG4gICAgICAgICAgLm9uKCdyZXNpemUuY2Fyb3VzZWwtJyt1bmlxdWVOYW1lc3BhY2UsIHRocm90dGxlZFJlc2l6ZSk7XHJcblxyXG4gICAgICAgIHNldHVwRXZlbnRzKCk7XHJcbiAgICAgICAgc2Nyb2xsKG9mZnNldCk7XHJcblxyXG4gICAgICAgICQodGhpcykub24oJ2Nhcm91c2VsTmV4dCcsIGZ1bmN0aW9uKGUsIG4sIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICBpZiAobiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIG4gPSAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHR5cGVvZihjYWxsYmFjaykgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBvbmVUaW1lQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0YXJnZXQgPSAoZGltICogTWF0aC5yb3VuZChvZmZzZXQgLyBkaW0pKSArIChkaW0gKiBuKTtcclxuICAgICAgICAgIGlmIChvZmZzZXQgIT09IHRhcmdldCkge1xyXG4gICAgICAgICAgICBhbXBsaXR1ZGUgPSB0YXJnZXQgLSBvZmZzZXQ7XHJcbiAgICAgICAgICAgIHRpbWVzdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhdXRvU2Nyb2xsKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5vbignY2Fyb3VzZWxQcmV2JywgZnVuY3Rpb24oZSwgbiwgY2FsbGJhY2spIHtcclxuICAgICAgICAgIGlmIChuID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbiA9IDE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodHlwZW9mKGNhbGxiYWNrKSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIG9uZVRpbWVDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRhcmdldCA9IChkaW0gKiBNYXRoLnJvdW5kKG9mZnNldCAvIGRpbSkpIC0gKGRpbSAqIG4pO1xyXG4gICAgICAgICAgaWYgKG9mZnNldCAhPT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGFtcGxpdHVkZSA9IHRhcmdldCAtIG9mZnNldDtcclxuICAgICAgICAgICAgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGF1dG9TY3JvbGwpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKHRoaXMpLm9uKCdjYXJvdXNlbFNldCcsIGZ1bmN0aW9uKGUsIG4sIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICBpZiAobiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIG4gPSAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHR5cGVvZihjYWxsYmFjaykgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBvbmVUaW1lQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjeWNsZVRvKG4pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgbmV4dCA6IGZ1bmN0aW9uKG4sIGNhbGxiYWNrKSB7XHJcbiAgICAgICQodGhpcykudHJpZ2dlcignY2Fyb3VzZWxOZXh0JywgW24sIGNhbGxiYWNrXSk7XHJcbiAgICB9LFxyXG4gICAgcHJldiA6IGZ1bmN0aW9uKG4sIGNhbGxiYWNrKSB7XHJcbiAgICAgICQodGhpcykudHJpZ2dlcignY2Fyb3VzZWxQcmV2JywgW24sIGNhbGxiYWNrXSk7XHJcbiAgICB9LFxyXG4gICAgc2V0IDogZnVuY3Rpb24obiwgY2FsbGJhY2spIHtcclxuICAgICAgJCh0aGlzKS50cmlnZ2VyKCdjYXJvdXNlbFNldCcsIFtuLCBjYWxsYmFja10pO1xyXG4gICAgfSxcclxuICAgIGRlc3Ryb3kgOiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHVuaXF1ZU5hbWVzcGFjZSA9ICQodGhpcykuYXR0cignZGF0YS1uYW1lc3BhY2UnKTtcclxuICAgICAgJCh0aGlzKS5yZW1vdmVBdHRyKCdkYXRhLW5hbWVzcGFjZScpO1xyXG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpbml0aWFsaXplZCcpO1xyXG4gICAgICAkKHRoaXMpLmZpbmQoJy5pbmRpY2F0b3JzJykucmVtb3ZlKCk7XHJcblxyXG4gICAgICAvLyBSZW1vdmUgZXZlbnQgaGFuZGxlcnNcclxuICAgICAgJCh0aGlzKS5vZmYoJ2Nhcm91c2VsTmV4dCBjYXJvdXNlbFByZXYgY2Fyb3VzZWxTZXQnKTtcclxuICAgICAgJCh3aW5kb3cpLm9mZigncmVzaXplLmNhcm91c2VsLScrdW5pcXVlTmFtZXNwYWNlKTtcclxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cub250b3VjaHN0YXJ0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICQodGhpcykub2ZmKCd0b3VjaHN0YXJ0LmNhcm91c2VsIHRvdWNobW92ZS5jYXJvdXNlbCB0b3VjaGVuZC5jYXJvdXNlbCcpO1xyXG4gICAgICB9XHJcbiAgICAgICQodGhpcykub2ZmKCdtb3VzZWRvd24uY2Fyb3VzZWwgbW91c2Vtb3ZlLmNhcm91c2VsIG1vdXNldXAuY2Fyb3VzZWwgbW91c2VsZWF2ZS5jYXJvdXNlbCBjbGljay5jYXJvdXNlbCcpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICAgICQuZm4uY2Fyb3VzZWwgPSBmdW5jdGlvbihtZXRob2RPck9wdGlvbnMpIHtcclxuICAgICAgaWYgKCBtZXRob2RzW21ldGhvZE9yT3B0aW9uc10gKSB7XHJcbiAgICAgICAgcmV0dXJuIG1ldGhvZHNbIG1ldGhvZE9yT3B0aW9ucyBdLmFwcGx5KCB0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCggYXJndW1lbnRzLCAxICkpO1xyXG4gICAgICB9IGVsc2UgaWYgKCB0eXBlb2YgbWV0aG9kT3JPcHRpb25zID09PSAnb2JqZWN0JyB8fCAhIG1ldGhvZE9yT3B0aW9ucyApIHtcclxuICAgICAgICAvLyBEZWZhdWx0IHRvIFwiaW5pdFwiXHJcbiAgICAgICAgcmV0dXJuIG1ldGhvZHMuaW5pdC5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJC5lcnJvciggJ01ldGhvZCAnICsgIG1ldGhvZE9yT3B0aW9ucyArICcgZG9lcyBub3QgZXhpc3Qgb24galF1ZXJ5LmNhcm91c2VsJyApO1xyXG4gICAgICB9XHJcbiAgICB9OyAvLyBQbHVnaW4gZW5kXHJcbn0oIGpRdWVyeSApKTtcclxuXG4oZnVuY3Rpb24gKCQpIHtcclxuXHJcbiAgdmFyIG1ldGhvZHMgPSB7XHJcbiAgaW5pdDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgb3JpZ2luID0gJCgnIycrJCh0aGlzKS5hdHRyKCdkYXRhLWFjdGl2YXRlcycpKTtcclxuICAgIHZhciBzY3JlZW4gPSAkKCdib2R5Jyk7XHJcblxyXG4gICAgLy8gQ3JlYXRpbmcgdGFwIHRhcmdldFxyXG4gICAgdmFyIHRhcFRhcmdldEVsID0gJCh0aGlzKTtcclxuICAgIHZhciB0YXBUYXJnZXRXcmFwcGVyID0gdGFwVGFyZ2V0RWwucGFyZW50KCcudGFwLXRhcmdldC13cmFwcGVyJyk7XHJcbiAgICB2YXIgdGFwVGFyZ2V0V2F2ZSA9IHRhcFRhcmdldFdyYXBwZXIuZmluZCgnLnRhcC10YXJnZXQtd2F2ZScpO1xyXG4gICAgdmFyIHRhcFRhcmdldE9yaWdpbkVsID0gdGFwVGFyZ2V0V3JhcHBlci5maW5kKCcudGFwLXRhcmdldC1vcmlnaW4nKTtcclxuICAgIHZhciB0YXBUYXJnZXRDb250ZW50RWwgPSB0YXBUYXJnZXRFbC5maW5kKCcudGFwLXRhcmdldC1jb250ZW50Jyk7XHJcblxyXG4gICAgLy8gQ3JlYXRpbmcgd3JhcHBlclxyXG4gICAgaWYgKCF0YXBUYXJnZXRXcmFwcGVyLmxlbmd0aCkge1xyXG4gICAgICB0YXBUYXJnZXRXcmFwcGVyID0gdGFwVGFyZ2V0RWwud3JhcCgkKCc8ZGl2IGNsYXNzPVwidGFwLXRhcmdldC13cmFwcGVyXCI+PC9kaXY+JykpLnBhcmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENyZWF0aW5nIGNvbnRlbnRcclxuICAgIGlmICghdGFwVGFyZ2V0Q29udGVudEVsLmxlbmd0aCkge1xyXG4gICAgICB0YXBUYXJnZXRDb250ZW50RWwgPSAkKCc8ZGl2IGNsYXNzPVwidGFwLXRhcmdldC1jb250ZW50XCI+PC9kaXY+Jyk7XHJcbiAgICAgIHRhcFRhcmdldEVsLmFwcGVuZCh0YXBUYXJnZXRDb250ZW50RWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENyZWF0aW5nIGZvcmVncm91bmQgd2F2ZVxyXG4gICAgaWYgKCF0YXBUYXJnZXRXYXZlLmxlbmd0aCkge1xyXG4gICAgICB0YXBUYXJnZXRXYXZlID0gJCgnPGRpdiBjbGFzcz1cInRhcC10YXJnZXQtd2F2ZVwiPjwvZGl2PicpO1xyXG5cclxuICAgICAgLy8gQ3JlYXRpbmcgb3JpZ2luXHJcbiAgICAgIGlmICghdGFwVGFyZ2V0T3JpZ2luRWwubGVuZ3RoKSB7XHJcbiAgICAgICAgdGFwVGFyZ2V0T3JpZ2luRWwgPSBvcmlnaW4uY2xvbmUodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgdGFwVGFyZ2V0T3JpZ2luRWwuYWRkQ2xhc3MoJ3RhcC10YXJnZXQtb3JpZ2luJyk7XHJcbiAgICAgICAgdGFwVGFyZ2V0T3JpZ2luRWwucmVtb3ZlQXR0cignaWQnKTtcclxuICAgICAgICB0YXBUYXJnZXRPcmlnaW5FbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgIHRhcFRhcmdldFdhdmUuYXBwZW5kKHRhcFRhcmdldE9yaWdpbkVsKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGFwVGFyZ2V0V3JhcHBlci5hcHBlbmQodGFwVGFyZ2V0V2F2ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3BlblxyXG4gICAgdmFyIG9wZW5UYXBUYXJnZXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKHRhcFRhcmdldFdyYXBwZXIuaXMoJy5vcGVuJykpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEFkZGluZyBvcGVuIGNsYXNzXHJcbiAgICAgIHRhcFRhcmdldFdyYXBwZXIuYWRkQ2xhc3MoJ29wZW4nKTtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGFwVGFyZ2V0T3JpZ2luRWwub2ZmKCdjbGljay50YXBUYXJnZXQnKS5vbignY2xpY2sudGFwVGFyZ2V0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgY2xvc2VUYXBUYXJnZXQoKTtcclxuICAgICAgICAgIHRhcFRhcmdldE9yaWdpbkVsLm9mZignY2xpY2sudGFwVGFyZ2V0Jyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZignY2xpY2sudGFwVGFyZ2V0Jykub24oJ2NsaWNrLnRhcFRhcmdldCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIGNsb3NlVGFwVGFyZ2V0KCk7XHJcbiAgICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2NsaWNrLnRhcFRhcmdldCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgdGhyb3R0bGVkQ2FsYyA9IE1hdGVyaWFsaXplLnRocm90dGxlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgY2FsY3VsYXRlVGFwVGFyZ2V0KCk7XHJcbiAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICAkKHdpbmRvdykub2ZmKCdyZXNpemUudGFwVGFyZ2V0Jykub24oJ3Jlc2l6ZS50YXBUYXJnZXQnLCB0aHJvdHRsZWRDYWxjKTtcclxuICAgICAgfSwgMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENsb3NlXHJcbiAgICB2YXIgY2xvc2VUYXBUYXJnZXQgPSBmdW5jdGlvbigpe1xyXG4gICAgICBpZiAoIXRhcFRhcmdldFdyYXBwZXIuaXMoJy5vcGVuJykpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRhcFRhcmdldFdyYXBwZXIucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgdGFwVGFyZ2V0T3JpZ2luRWwub2ZmKCdjbGljay50YXBUYXJnZXQnKVxyXG4gICAgICAkKGRvY3VtZW50KS5vZmYoJ2NsaWNrLnRhcFRhcmdldCcpO1xyXG4gICAgICAkKHdpbmRvdykub2ZmKCdyZXNpemUudGFwVGFyZ2V0Jyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFByZSBjYWxjdWxhdGVcclxuICAgIHZhciBjYWxjdWxhdGVUYXBUYXJnZXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgLy8gRWxlbWVudCBvciBwYXJlbnQgaXMgZml4ZWQgcG9zaXRpb24/XHJcbiAgICAgIHZhciBpc0ZpeGVkID0gb3JpZ2luLmNzcygncG9zaXRpb24nKSA9PT0gJ2ZpeGVkJztcclxuICAgICAgaWYgKCFpc0ZpeGVkKSB7XHJcbiAgICAgICAgdmFyIHBhcmVudHMgPSBvcmlnaW4ucGFyZW50cygpO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBwYXJlbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpc0ZpeGVkID0gJChwYXJlbnRzW2ldKS5jc3MoJ3Bvc2l0aW9uJykgPT0gJ2ZpeGVkJztcclxuICAgICAgICAgIGlmIChpc0ZpeGVkKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRpbmcgb3JpZ2luXHJcbiAgICAgIHZhciBvcmlnaW5XaWR0aCA9IG9yaWdpbi5vdXRlcldpZHRoKCk7XHJcbiAgICAgIHZhciBvcmlnaW5IZWlnaHQgPSBvcmlnaW4ub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgdmFyIG9yaWdpblRvcCA9IGlzRml4ZWQgPyBvcmlnaW4ub2Zmc2V0KCkudG9wIC0gJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgOiBvcmlnaW4ub2Zmc2V0KCkudG9wO1xyXG4gICAgICB2YXIgb3JpZ2luTGVmdCA9IGlzRml4ZWQgPyBvcmlnaW4ub2Zmc2V0KCkubGVmdCAtICQoZG9jdW1lbnQpLnNjcm9sbExlZnQoKSA6IG9yaWdpbi5vZmZzZXQoKS5sZWZ0O1xyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRpbmcgc2NyZWVuXHJcbiAgICAgIHZhciB3aW5kb3dXaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xyXG4gICAgICB2YXIgd2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG4gICAgICB2YXIgY2VudGVyWCA9IHdpbmRvd1dpZHRoIC8gMjtcclxuICAgICAgdmFyIGNlbnRlclkgPSB3aW5kb3dIZWlnaHQgLyAyO1xyXG4gICAgICB2YXIgaXNMZWZ0ID0gb3JpZ2luTGVmdCA8PSBjZW50ZXJYO1xyXG4gICAgICB2YXIgaXNSaWdodCA9IG9yaWdpbkxlZnQgPiBjZW50ZXJYO1xyXG4gICAgICB2YXIgaXNUb3AgPSBvcmlnaW5Ub3AgPD0gY2VudGVyWTtcclxuICAgICAgdmFyIGlzQm90dG9tID0gb3JpZ2luVG9wID4gY2VudGVyWTtcclxuICAgICAgdmFyIGlzQ2VudGVyWCA9IG9yaWdpbkxlZnQgPj0gd2luZG93V2lkdGgqMC4yNSAmJiBvcmlnaW5MZWZ0IDw9IHdpbmRvd1dpZHRoKjAuNzU7XHJcbiAgICAgIHZhciBpc0NlbnRlclkgPSBvcmlnaW5Ub3AgPj0gd2luZG93SGVpZ2h0KjAuMjUgJiYgb3JpZ2luVG9wIDw9IHdpbmRvd0hlaWdodCowLjc1O1xyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRpbmcgdGFwIHRhcmdldFxyXG4gICAgICB2YXIgdGFwVGFyZ2V0V2lkdGggPSB0YXBUYXJnZXRFbC5vdXRlcldpZHRoKCk7XHJcbiAgICAgIHZhciB0YXBUYXJnZXRIZWlnaHQgPSB0YXBUYXJnZXRFbC5vdXRlckhlaWdodCgpO1xyXG4gICAgICB2YXIgdGFwVGFyZ2V0VG9wID0gb3JpZ2luVG9wICsgb3JpZ2luSGVpZ2h0LzIgLSB0YXBUYXJnZXRIZWlnaHQvMjtcclxuICAgICAgdmFyIHRhcFRhcmdldExlZnQgPSBvcmlnaW5MZWZ0ICsgb3JpZ2luV2lkdGgvMiAtIHRhcFRhcmdldFdpZHRoLzI7XHJcbiAgICAgIHZhciB0YXBUYXJnZXRQb3NpdGlvbiA9IGlzRml4ZWQgPyAnZml4ZWQnIDogJ2Fic29sdXRlJztcclxuXHJcbiAgICAgIC8vIENhbGN1bGF0aW5nIGNvbnRlbnRcclxuICAgICAgdmFyIHRhcFRhcmdldFRleHRXaWR0aCA9IGlzQ2VudGVyWCA/IHRhcFRhcmdldFdpZHRoIDogdGFwVGFyZ2V0V2lkdGgvMiArIG9yaWdpbldpZHRoO1xyXG4gICAgICB2YXIgdGFwVGFyZ2V0VGV4dEhlaWdodCA9IHRhcFRhcmdldEhlaWdodC8yO1xyXG4gICAgICB2YXIgdGFwVGFyZ2V0VGV4dFRvcCA9IGlzVG9wID8gdGFwVGFyZ2V0SGVpZ2h0LzIgOiAwO1xyXG4gICAgICB2YXIgdGFwVGFyZ2V0VGV4dEJvdHRvbSA9IDA7XHJcbiAgICAgIHZhciB0YXBUYXJnZXRUZXh0TGVmdCA9IGlzTGVmdCAmJiAhaXNDZW50ZXJYID8gdGFwVGFyZ2V0V2lkdGgvMiAtIG9yaWdpbldpZHRoIDogMDtcclxuICAgICAgdmFyIHRhcFRhcmdldFRleHRSaWdodCA9IDA7XHJcbiAgICAgIHZhciB0YXBUYXJnZXRUZXh0UGFkZGluZyA9IG9yaWdpbldpZHRoO1xyXG4gICAgICB2YXIgdGFwVGFyZ2V0VGV4dEFsaWduID0gaXNCb3R0b20gPyAnYm90dG9tJyA6ICd0b3AnO1xyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRpbmcgd2F2ZVxyXG4gICAgICB2YXIgdGFwVGFyZ2V0V2F2ZVdpZHRoID0gb3JpZ2luV2lkdGggPiBvcmlnaW5IZWlnaHQgPyBvcmlnaW5XaWR0aCoyIDogb3JpZ2luV2lkdGgqMjtcclxuICAgICAgdmFyIHRhcFRhcmdldFdhdmVIZWlnaHQgPSB0YXBUYXJnZXRXYXZlV2lkdGg7XHJcbiAgICAgIHZhciB0YXBUYXJnZXRXYXZlVG9wID0gdGFwVGFyZ2V0SGVpZ2h0LzIgLSB0YXBUYXJnZXRXYXZlSGVpZ2h0LzI7XHJcbiAgICAgIHZhciB0YXBUYXJnZXRXYXZlTGVmdCA9IHRhcFRhcmdldFdpZHRoLzIgLSB0YXBUYXJnZXRXYXZlV2lkdGgvMjtcclxuXHJcbiAgICAgIC8vIFNldHRpbmcgdGFwIHRhcmdldFxyXG4gICAgICB2YXIgdGFwVGFyZ2V0V3JhcHBlckNzc09iaiA9IHt9O1xyXG4gICAgICB0YXBUYXJnZXRXcmFwcGVyQ3NzT2JqLnRvcCA9IGlzVG9wID8gdGFwVGFyZ2V0VG9wIDogJyc7XHJcbiAgICAgIHRhcFRhcmdldFdyYXBwZXJDc3NPYmoucmlnaHQgPSBpc1JpZ2h0ID8gd2luZG93V2lkdGggLSB0YXBUYXJnZXRMZWZ0IC0gdGFwVGFyZ2V0V2lkdGggOiAnJztcclxuICAgICAgdGFwVGFyZ2V0V3JhcHBlckNzc09iai5ib3R0b20gPSBpc0JvdHRvbSA/IHdpbmRvd0hlaWdodCAtIHRhcFRhcmdldFRvcCAtIHRhcFRhcmdldEhlaWdodCA6ICcnO1xyXG4gICAgICB0YXBUYXJnZXRXcmFwcGVyQ3NzT2JqLmxlZnQgPSBpc0xlZnQgPyB0YXBUYXJnZXRMZWZ0IDogJyc7XHJcbiAgICAgIHRhcFRhcmdldFdyYXBwZXJDc3NPYmoucG9zaXRpb24gPSB0YXBUYXJnZXRQb3NpdGlvbjtcclxuICAgICAgdGFwVGFyZ2V0V3JhcHBlci5jc3ModGFwVGFyZ2V0V3JhcHBlckNzc09iaik7XHJcblxyXG4gICAgICAvLyBTZXR0aW5nIGNvbnRlbnRcclxuICAgICAgdGFwVGFyZ2V0Q29udGVudEVsLmNzcyh7XHJcbiAgICAgICAgd2lkdGg6IHRhcFRhcmdldFRleHRXaWR0aCxcclxuICAgICAgICBoZWlnaHQ6IHRhcFRhcmdldFRleHRIZWlnaHQsXHJcbiAgICAgICAgdG9wOiB0YXBUYXJnZXRUZXh0VG9wLFxyXG4gICAgICAgIHJpZ2h0OiB0YXBUYXJnZXRUZXh0UmlnaHQsXHJcbiAgICAgICAgYm90dG9tOiB0YXBUYXJnZXRUZXh0Qm90dG9tLFxyXG4gICAgICAgIGxlZnQ6IHRhcFRhcmdldFRleHRMZWZ0LFxyXG4gICAgICAgIHBhZGRpbmc6IHRhcFRhcmdldFRleHRQYWRkaW5nLFxyXG4gICAgICAgIHZlcnRpY2FsQWxpZ246IHRhcFRhcmdldFRleHRBbGlnblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIFNldHRpbmcgd2F2ZVxyXG4gICAgICB0YXBUYXJnZXRXYXZlLmNzcyh7XHJcbiAgICAgICAgdG9wOiB0YXBUYXJnZXRXYXZlVG9wLFxyXG4gICAgICAgIGxlZnQ6IHRhcFRhcmdldFdhdmVMZWZ0LFxyXG4gICAgICAgIHdpZHRoOiB0YXBUYXJnZXRXYXZlV2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiB0YXBUYXJnZXRXYXZlSGVpZ2h0XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zID09ICdvcGVuJykge1xyXG4gICAgICBjYWxjdWxhdGVUYXBUYXJnZXQoKTtcclxuICAgICAgb3BlblRhcFRhcmdldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zID09ICdjbG9zZScpXHJcbiAgICAgIGNsb3NlVGFwVGFyZ2V0KCk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIG9wZW46IGZ1bmN0aW9uKCkge30sXHJcbiAgY2xvc2U6IGZ1bmN0aW9uKCkge31cclxuICB9O1xyXG5cclxuICAkLmZuLnRhcFRhcmdldCA9IGZ1bmN0aW9uKG1ldGhvZE9yT3B0aW9ucykge1xyXG4gIGlmIChtZXRob2RzW21ldGhvZE9yT3B0aW9uc10gfHwgdHlwZW9mIG1ldGhvZE9yT3B0aW9ucyA9PT0gJ29iamVjdCcpXHJcbiAgICByZXR1cm4gbWV0aG9kcy5pbml0LmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcclxuXHJcbiAgJC5lcnJvciggJ01ldGhvZCAnICsgIG1ldGhvZE9yT3B0aW9ucyArICcgZG9lcyBub3QgZXhpc3Qgb24galF1ZXJ5LnRhcC10YXJnZXQnICk7XHJcbiAgfTtcclxuXHJcbn0oIGpRdWVyeSApKTtcclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
