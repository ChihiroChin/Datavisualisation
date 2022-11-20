// https://d3js.org/d3-dsv/ v3.0.1 Copyright 2013-2021 Mike Bostock
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).d3=e.d3||{})}(this,(function(e){"use strict";var t={},r={};function n(e){return new Function("d","return {"+e.map((function(e,t){return JSON.stringify(e)+": d["+t+'] || ""'})).join(",")+"}")}function o(e){var t=Object.create(null),r=[];return e.forEach((function(e){for(var n in e)n in t||r.push(t[n]=n)})),r}function a(e,t){var r=e+"",n=r.length;return n<t?new Array(t-n+1).join(0)+r:r}function u(e){var t,r=e.getUTCHours(),n=e.getUTCMinutes(),o=e.getUTCSeconds(),u=e.getUTCMilliseconds();return isNaN(e)?"Invalid Date":((t=e.getUTCFullYear())<0?"-"+a(-t,6):t>9999?"+"+a(t,6):a(t,4))+"-"+a(e.getUTCMonth()+1,2)+"-"+a(e.getUTCDate(),2)+(u?"T"+a(r,2)+":"+a(n,2)+":"+a(o,2)+"."+a(u,3)+"Z":o?"T"+a(r,2)+":"+a(n,2)+":"+a(o,2)+"Z":n||r?"T"+a(r,2)+":"+a(n,2)+"Z":"")}function i(e){var a=new RegExp('["'+e+"\n\r]"),i=e.charCodeAt(0);function f(e,n){var o,a=[],u=e.length,f=0,s=0,c=u<=0,l=!1;function d(){if(c)return r;if(l)return l=!1,t;var n,o,a=f;if(34===e.charCodeAt(a)){for(;f++<u&&34!==e.charCodeAt(f)||34===e.charCodeAt(++f););return(n=f)>=u?c=!0:10===(o=e.charCodeAt(f++))?l=!0:13===o&&(l=!0,10===e.charCodeAt(f)&&++f),e.slice(a+1,n-1).replace(/""/g,'"')}for(;f<u;){if(10===(o=e.charCodeAt(n=f++)))l=!0;else if(13===o)l=!0,10===e.charCodeAt(f)&&++f;else if(o!==i)continue;return e.slice(a,n)}return c=!0,e.slice(a,u)}for(10===e.charCodeAt(u-1)&&--u,13===e.charCodeAt(u-1)&&--u;(o=d())!==r;){for(var m=[];o!==t&&o!==r;)m.push(o),o=d();n&&null==(m=n(m,s++))||a.push(m)}return a}function s(t,r){return t.map((function(t){return r.map((function(e){return l(t[e])})).join(e)}))}function c(t){return t.map(l).join(e)}function l(e){return null==e?"":e instanceof Date?u(e):a.test(e+="")?'"'+e.replace(/"/g,'""')+'"':e}return{parse:function(e,t){var r,o,a=f(e,(function(e,a){if(r)return r(e,a-1);o=e,r=t?function(e,t){var r=n(e);return function(n,o){return t(r(n),o,e)}}(e,t):n(e)}));return a.columns=o||[],a},parseRows:f,format:function(t,r){return null==r&&(r=o(t)),[r.map(l).join(e)].concat(s(t,r)).join("\n")},formatBody:function(e,t){return null==t&&(t=o(e)),s(e,t).join("\n")},formatRows:function(e){return e.map(c).join("\n")},formatRow:c,formatValue:l}}var f=i(","),s=f.parse,c=f.parseRows,l=f.format,d=f.formatBody,m=f.formatRows,v=f.formatRow,p=f.formatValue,h=i("\t"),w=h.parse,g=h.parseRows,C=h.format,T=h.formatBody,R=h.formatRows,y=h.formatRow,F=h.formatValue;const j=new Date("2019-01-01T00:00").getHours()||new Date("2019-07-01T00:00").getHours();e.autoType=function(e){for(var t in e){var r,n,o=e[t].trim();if(o)if("true"===o)o=!0;else if("false"===o)o=!1;else if("NaN"===o)o=NaN;else if(isNaN(r=+o)){if(!(n=o.match(/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/)))continue;j&&n[4]&&!n[7]&&(o=o.replace(/-/g,"/").replace(/T/," ")),o=new Date(o)}else o=r;else o=null;e[t]=o}return e},e.csvFormat=l,e.csvFormatBody=d,e.csvFormatRow=v,e.csvFormatRows=m,e.csvFormatValue=p,e.csvParse=s,e.csvParseRows=c,e.dsvFormat=i,e.tsvFormat=C,e.tsvFormatBody=T,e.tsvFormatRow=y,e.tsvFormatRows=R,e.tsvFormatValue=F,e.tsvParse=w,e.tsvParseRows=g,Object.defineProperty(e,"__esModule",{value:!0})}));
