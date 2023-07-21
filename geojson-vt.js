!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).geojsonvt=t()}(this,(function(){"use strict";function e(n,i,r,o){for(var l,a=o,s=r-i>>1,u=r-i,f=n[i],g=n[i+1],m=n[r],h=n[r+1],p=i+3;p<r;p+=3){var d=t(n[p],n[p+1],f,g,m,h);if(d>a)l=p,a=d;else if(d===a){var c=Math.abs(p-s);c<u&&(l=p,u=c)}}a>o&&(l-i>3&&e(n,i,l,o),n[l+2]=a,r-l>3&&e(n,l,r,o))}function t(e,t,n,i,r,o){var l=r-n,a=o-i;if(0!==l||0!==a){var s=((e-n)*l+(t-i)*a)/(l*l+a*a);s>1?(n=r,i=o):s>0&&(n+=l*s,i+=a*s)}return(l=e-n)*l+(a=t-i)*a}function n(e,t,n,r){var o={id:null==e?null:e,type:t,geometry:n,tags:r,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0};if("Point"===t||"MultiPoint"===t||"LineString"===t)i(o,n);else if("Polygon"===t)i(o,n[0]);else if("MultiLineString"===t)for(var l=0,a=n;l<a.length;l+=1){i(o,a[l])}else if("MultiPolygon"===t)for(var s=0,u=n;s<u.length;s+=1){i(o,u[s][0])}return o}function i(e,t){for(var n=0;n<t.length;n+=3)e.minX=Math.min(e.minX,t[n]),e.minY=Math.min(e.minY,t[n+1]),e.maxX=Math.max(e.maxX,t[n]),e.maxY=Math.max(e.maxY,t[n+1])}function r(e,t,i,s){if(t.geometry){var u=t.geometry.coordinates,f=t.geometry.type,g=Math.pow(i.tolerance/((1<<i.maxZoom)*i.extent),2),m=[],h=t.id;if(i.promoteId?h=t.properties[i.promoteId]:i.generateId&&(h=s||0),"Point"===f)o(u,m);else if("MultiPoint"===f)for(var p=0,d=u;p<d.length;p+=1){o(d[p],m)}else if("LineString"===f)l(u,m,g,!1);else if("MultiLineString"===f){if(i.lineMetrics){for(var c=0,v=u;c<v.length;c+=1){l(v[c],m=[],g,!1),e.push(n(h,"LineString",m,t.properties))}return}a(u,m,g,!1)}else if("Polygon"===f)a(u,m,g,!0);else{if("MultiPolygon"!==f){if("GeometryCollection"===f){for(var x=0,M=t.geometry.geometries;x<M.length;x+=1){r(e,{id:h,geometry:M[x],properties:t.properties},i,s)}return}throw new Error("Input data is not a valid GeoJSON object.")}for(var y=0,P=u;y<P.length;y+=1){var S=[];a(P[y],S,g,!0),m.push(S)}}e.push(n(h,f,m,t.properties))}}function o(e,t){t.push(s(e[0]),u(e[1]),0)}function l(t,n,i,r){for(var o,l,a=0,f=0;f<t.length;f++){var g=s(t[f][0]),m=u(t[f][1]);n.push(g,m,0),f>0&&(a+=r?(o*m-g*l)/2:Math.sqrt(Math.pow(g-o,2)+Math.pow(m-l,2))),o=g,l=m}var h=n.length-3;n[2]=1,e(n,0,h,i),n[h+2]=1,n.size=Math.abs(a),n.start=0,n.end=n.size}function a(e,t,n,i){for(var r=0;r<e.length;r++){var o=[];l(e[r],o,n,i),t.push(o)}}function s(e){return e/360+.5}function u(e){var t=Math.sin(e*Math.PI/180),n=.5-.25*Math.log((1+t)/(1-t))/Math.PI;return n<0?0:n>1?1:n}function f(e,t,i,r,o,l,a,s){if(r/=t,l>=(i/=t)&&a<r)return e;if(a<i||l>=r)return null;for(var u=[],f=0,h=e;f<h.length;f+=1){var d=h[f],c=d.geometry,v=d.type,x=0===o?d.minX:d.minY,M=0===o?d.maxX:d.maxY;if(x>=i&&M<r)u.push(d);else if(!(M<i||x>=r)){var y=[];if("Point"===v||"MultiPoint"===v)g(c,y,i,r,o);else if("LineString"===v)m(c,y,i,r,o,!1,s.lineMetrics);else if("MultiLineString"===v)p(c,y,i,r,o,!1);else if("Polygon"===v)p(c,y,i,r,o,!0);else if("MultiPolygon"===v)for(var P=0,S=c;P<S.length;P+=1){var Y=[];p(S[P],Y,i,r,o,!0),Y.length&&y.push(Y)}if(y.length){if(s.lineMetrics&&"LineString"===v){for(var X=0,L=y;X<L.length;X+=1){var b=L[X];u.push(n(d.id,v,b,d.tags))}continue}"LineString"!==v&&"MultiLineString"!==v||(1===y.length?(v="LineString",y=y[0]):v="MultiLineString"),"Point"!==v&&"MultiPoint"!==v||(v=3===y.length?"Point":"MultiPoint"),u.push(n(d.id,v,y,d.tags))}}}return u.length?u:null}function g(e,t,n,i,r){for(var o=0;o<e.length;o+=3){var l=e[o+r];l>=n&&l<=i&&d(t,e[o],e[o+1],e[o+2])}}function m(e,t,n,i,r,o,l){for(var a,s,u=h(e),f=0===r?c:v,g=e.start,m=0;m<e.length-3;m+=3){var p=e[m],x=e[m+1],M=e[m+2],y=e[m+3],P=e[m+4],S=0===r?p:x,Y=0===r?y:P,X=!1;l&&(a=Math.sqrt(Math.pow(p-y,2)+Math.pow(x-P,2))),S<n?Y>n&&(s=f(u,p,x,y,P,n),l&&(u.start=g+a*s)):S>i?Y<i&&(s=f(u,p,x,y,P,i),l&&(u.start=g+a*s)):d(u,p,x,M),Y<n&&S>=n&&(s=f(u,p,x,y,P,n),X=!0),Y>i&&S<=i&&(s=f(u,p,x,y,P,i),X=!0),!o&&X&&(l&&(u.end=g+a*s),t.push(u),u=h(e)),l&&(g+=a)}var L=e.length-3,b=e[L],w=e[L+1],z=e[L+2],I=0===r?b:w;I>=n&&I<=i&&d(u,b,w,z),L=u.length-3,o&&L>=3&&(u[L]!==u[0]||u[L+1]!==u[1])&&d(u,u[0],u[1],u[2]),u.length&&t.push(u)}function h(e){var t=[];return t.size=e.size,t.start=e.start,t.end=e.end,t}function p(e,t,n,i,r,o){for(var l=0,a=e;l<a.length;l+=1){m(a[l],t,n,i,r,o,!1)}}function d(e,t,n,i){e.push(t,n,i)}function c(e,t,n,i,r,o){var l=(o-t)/(i-t);return d(e,o,n+(r-n)*l,1),l}function v(e,t,n,i,r,o){var l=(o-n)/(r-n);return d(e,t+(i-t)*l,o,1),l}function x(e,t){for(var i=[],r=0;r<e.length;r++){var o=e[r],l=o.type,a=void 0;if("Point"===l||"MultiPoint"===l||"LineString"===l)a=M(o.geometry,t);else if("MultiLineString"===l||"Polygon"===l){a=[];for(var s=0,u=o.geometry;s<u.length;s+=1){var f=u[s];a.push(M(f,t))}}else if("MultiPolygon"===l){a=[];for(var g=0,m=o.geometry;g<m.length;g+=1){for(var h=[],p=0,d=m[g];p<d.length;p+=1){var c=d[p];h.push(M(c,t))}a.push(h)}}i.push(n(o.id,l,a,o.tags))}return i}function M(e,t){var n=[];n.size=e.size,void 0!==e.start&&(n.start=e.start,n.end=e.end);for(var i=0;i<e.length;i+=3)n.push(e[i]+t,e[i+1],e[i+2]);return n}function y(e,t){if(e.transformed)return e;for(var n=1<<e.z,i=e.x,r=e.y,o=0,l=e.features;o<l.length;o+=1){var a=l[o],s=a.geometry,u=a.type;if(a.geometry=[],1===u)for(var f=0;f<s.length;f+=2)a.geometry.push(P(s[f],s[f+1],t,n,i,r));else for(var g=0;g<s.length;g++){for(var m=[],h=0;h<s[g].length;h+=2)m.push(P(s[g][h],s[g][h+1],t,n,i,r));a.geometry.push(m)}}return e.transformed=!0,e}function P(e,t,n,i,r,o){return[Math.round(n*(e*i-r)),Math.round(n*(t*i-o))]}function S(e,t,n,i,r){for(var o=t===r.maxZoom?0:r.tolerance/((1<<t)*r.extent),l={features:[],numPoints:0,numSimplified:0,numFeatures:e.length,source:null,x:n,y:i,z:t,transformed:!1,minX:2,minY:1,maxX:-1,maxY:0},a=0,s=e;a<s.length;a+=1){Y(l,s[a],o,r)}return l}function Y(e,t,n,i){var r=t.geometry,o=t.type,l=[];if(e.minX=Math.min(e.minX,t.minX),e.minY=Math.min(e.minY,t.minY),e.maxX=Math.max(e.maxX,t.maxX),e.maxY=Math.max(e.maxY,t.maxY),"Point"===o||"MultiPoint"===o)for(var a=0;a<r.length;a+=3)l.push(r[a],r[a+1]),e.numPoints++,e.numSimplified++;else if("LineString"===o)X(l,r,e,n,!1,!1);else if("MultiLineString"===o||"Polygon"===o)for(var s=0;s<r.length;s++)X(l,r[s],e,n,"Polygon"===o,0===s);else if("MultiPolygon"===o)for(var u=0;u<r.length;u++)for(var f=r[u],g=0;g<f.length;g++)X(l,f[g],e,n,!0,0===g);if(l.length){var m=t.tags||null;if("LineString"===o&&i.lineMetrics){for(var h in m={},t.tags)m[h]=t.tags[h];m.mapbox_clip_start=r.start/r.size,m.mapbox_clip_end=r.end/r.size}var p={geometry:l,type:"Polygon"===o||"MultiPolygon"===o?3:"LineString"===o||"MultiLineString"===o?2:1,tags:m};null!==t.id&&(p.id=t.id),e.features.push(p)}}function X(e,t,n,i,r,o){var l=i*i;if(i>0&&t.size<(r?l:i))n.numPoints+=t.length/3;else{for(var a=[],s=0;s<t.length;s+=3)(0===i||t[s+2]>l)&&(n.numSimplified++,a.push(t[s],t[s+1])),n.numPoints++;r&&function(e,t){for(var n=0,i=0,r=e.length,o=r-2;i<r;o=i,i+=2)n+=(e[i]-e[o])*(e[i+1]+e[o+1]);if(n>0===t)for(var l=0,a=e.length;l<a/2;l+=2){var s=e[l],u=e[l+1];e[l]=e[a-2-l],e[l+1]=e[a-1-l],e[a-2-l]=s,e[a-1-l]=u}}(a,o),e.push(a)}}var L={maxZoom:14,indexMaxZoom:5,indexMaxPoints:1e5,tolerance:3,extent:4096,buffer:64,lineMetrics:!1,promoteId:null,generateId:!1,debug:0,dynamicCache:!0},b=function(e,t){var n=(t=this.options=function(e,t){for(var n in t)e[n]=t[n];return e}(Object.create(L),t)).debug;if(n&&console.time("preprocess data"),t.maxZoom<0||t.maxZoom>24)throw new Error("maxZoom should be in the 0-24 range");if(t.promoteId&&t.generateId)throw new Error("promoteId and generateId cannot be used together.");var i=function(e,t){var n=[];if("FeatureCollection"===e.type)for(var i=0;i<e.features.length;i++)r(n,e.features[i],t,i);else"Feature"===e.type?r(n,e,t):r(n,{geometry:e},t);return n}(e,t);this.tiles={},n&&(console.timeEnd("preprocess data"),console.log("index: maxZoom: %d, maxPoints: %d",t.indexMaxZoom,t.indexMaxPoints),console.time("generate tiles"),this.stats={},this.total=0),i=function(e,t){var n=t.buffer/t.extent,i=e,r=f(e,1,-1-n,n,0,-1,2,t),o=f(e,1,1-n,2+n,0,-1,2,t);return(r||o)&&(i=f(e,1,-n,1+n,0,-1,2,t)||[],r&&(i=x(r,1).concat(i)),o&&(i=i.concat(x(o,-1)))),i}(i,t),i.length&&this.splitTile(i,0,0,0,void 0,void 0,void 0,!0),n&&(i.length&&console.log("features: %d, points: %d",this.tiles[0].numFeatures,this.tiles[0].numPoints),console.timeEnd("generate tiles"),console.log("tiles generated:",this.total,JSON.stringify(this.stats)))};function w(e,t,n){return 32*((1<<e)*n+t)+e}return b.prototype.splitTile=function(e,t,n,i,r,o,l,a){for(var s=[e,t,n,i],u=this.options,g=u.debug,m=a||u.dynamicCache?this.tiles:{};s.length;){i=s.pop(),n=s.pop(),t=s.pop(),e=s.pop();var h=1<<t,p=w(t,n,i),d=m[p];if(!d&&(g>1&&console.time("creation"),d=m[p]=S(e,t,n,i,u),g)){g>1&&(console.log("tile z%d-%d-%d (features: %d, points: %d, simplified: %d)",t,n,i,d.numFeatures,d.numPoints,d.numSimplified),console.timeEnd("creation"));var c="z"+t;this.stats[c]=(this.stats[c]||0)+1,this.total++}if(d.source=e,null==r){if(t===u.indexMaxZoom||d.numPoints<=u.indexMaxPoints)continue}else{if(t===u.maxZoom||t===r)continue;if(null!=r){var v=r-t;if(n!==o>>v||i!==l>>v)continue}}if(d.source=null,0!==e.length){g>1&&console.time("clipping");var x=.5*u.buffer/u.extent,M=.5-x,y=.5+x,P=1+x,Y=null,X=null,L=null,b=null,z=f(e,h,n-x,n+y,0,d.minX,d.maxX,u),I=f(e,h,n+M,n+P,0,d.minX,d.maxX,u);e=null,z&&(Y=f(z,h,i-x,i+y,1,d.minY,d.maxY,u),X=f(z,h,i+M,i+P,1,d.minY,d.maxY,u),z=null),I&&(L=f(I,h,i-x,i+y,1,d.minY,d.maxY,u),b=f(I,h,i+M,i+P,1,d.minY,d.maxY,u),I=null),g>1&&console.timeEnd("clipping"),s.push(Y||[],t+1,2*n,2*i),s.push(X||[],t+1,2*n,2*i+1),s.push(L||[],t+1,2*n+1,2*i),s.push(b||[],t+1,2*n+1,2*i+1)}}return m},b.prototype.getTile=function(e,t,n){e=+e,t=+t,n=+n;var i=this.options,r=i.extent,o=i.debug;if(e<0||e>24)return null;var l=1<<e,a=w(e,t=t+l&l-1,n);if(this.tiles[a])return y(this.tiles[a],r);o>1&&console.log("drilling down to z%d-%d-%d",e,t,n);for(var s,u=e,f=t,g=n;!s&&u>0;)u--,f>>=1,g>>=1,s=this.tiles[w(u,f,g)];if(!s||!s.source)return null;o>1&&(console.log("found parent tile z%d-%d-%d",u,f,g),console.time("drilling down"));var m=this.splitTile(s.source,u,f,g,e,t,n);return o>1&&console.timeEnd("drilling down"),m[a]?y(m[a],r):null},function(e,t){return new b(e,t)}}));
