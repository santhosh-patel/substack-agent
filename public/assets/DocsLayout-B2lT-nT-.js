const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/rehype-highlight-CsfONlRn.js","assets/rolldown-runtime-QTnfLwEv.js","assets/lib-DX30Qe9a.js","assets/atom-one-dark-B-oHczHB.css"])))=>i.map(i=>d[i]);
import{n as e,r as t,t as n}from"./rolldown-runtime-QTnfLwEv.js";import{a as r,c as i,i as a,n as o,o as s,r as c,s as l,t as u}from"./index-Dd6UD7yP.js";import{a as d,n as f,t as p}from"./lib-DX30Qe9a.js";function m(e,t){let n=t||{};return(e[e.length-1]===``?[...e,``]:e).join((n.padRight?` `:``)+`,`+(n.padLeft===!1?``:` `)).trim()}var h=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,g=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,_={};function v(e,t){return((t||_).jsx?g:h).test(e)}var y=/[ \t\n\f\r]/g;function b(e){return typeof e==`object`?e.type===`text`&&x(e.value):x(e)}function x(e){return e.replace(y,``)===``}var S=class{constructor(e,t,n){this.normal=t,this.property=e,n&&(this.space=n)}};S.prototype.normal={},S.prototype.property={},S.prototype.space=void 0;function C(e,t){let n={},r={};for(let t of e)Object.assign(n,t.property),Object.assign(r,t.normal);return new S(n,r,t)}function w(e){return e.toLowerCase()}var T=class{constructor(e,t){this.attribute=t,this.property=e}};T.prototype.attribute=``,T.prototype.booleanish=!1,T.prototype.boolean=!1,T.prototype.commaOrSpaceSeparated=!1,T.prototype.commaSeparated=!1,T.prototype.defined=!1,T.prototype.mustUseProperty=!1,T.prototype.number=!1,T.prototype.overloadedBoolean=!1,T.prototype.property=``,T.prototype.spaceSeparated=!1,T.prototype.space=void 0;var E=e({boolean:()=>D,booleanish:()=>O,commaOrSpaceSeparated:()=>M,commaSeparated:()=>j,number:()=>k,overloadedBoolean:()=>te,spaceSeparated:()=>A}),ee=0,D=N(),O=N(),te=N(),k=N(),A=N(),j=N(),M=N();function N(){return 2**++ee}var P=Object.keys(E),F=class extends T{constructor(e,t,n,r){let i=-1;if(super(e,t),ne(this,`space`,r),typeof n==`number`)for(;++i<P.length;){let e=P[i];ne(this,P[i],(n&E[e])===E[e])}}};F.prototype.defined=!0;function ne(e,t,n){n&&(e[t]=n)}function re(e){let t={},n={};for(let[r,i]of Object.entries(e.properties)){let a=new F(r,e.transform(e.attributes||{},r),i,e.space);e.mustUseProperty&&e.mustUseProperty.includes(r)&&(a.mustUseProperty=!0),t[r]=a,n[w(r)]=r,n[w(a.attribute)]=r}return new S(t,n,e.space)}var ie=re({properties:{ariaActiveDescendant:null,ariaAtomic:O,ariaAutoComplete:null,ariaBusy:O,ariaChecked:O,ariaColCount:k,ariaColIndex:k,ariaColSpan:k,ariaControls:A,ariaCurrent:null,ariaDescribedBy:A,ariaDetails:null,ariaDisabled:O,ariaDropEffect:A,ariaErrorMessage:null,ariaExpanded:O,ariaFlowTo:A,ariaGrabbed:O,ariaHasPopup:null,ariaHidden:O,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:A,ariaLevel:k,ariaLive:null,ariaModal:O,ariaMultiLine:O,ariaMultiSelectable:O,ariaOrientation:null,ariaOwns:A,ariaPlaceholder:null,ariaPosInSet:k,ariaPressed:O,ariaReadOnly:O,ariaRelevant:null,ariaRequired:O,ariaRoleDescription:A,ariaRowCount:k,ariaRowIndex:k,ariaRowSpan:k,ariaSelected:O,ariaSetSize:k,ariaSort:null,ariaValueMax:k,ariaValueMin:k,ariaValueNow:k,ariaValueText:null,role:null},transform(e,t){return t===`role`?t:`aria-`+t.slice(4).toLowerCase()}});function ae(e,t){return t in e?e[t]:t}function oe(e,t){return ae(e,t.toLowerCase())}var se=re({attributes:{acceptcharset:`accept-charset`,classname:`class`,htmlfor:`for`,httpequiv:`http-equiv`},mustUseProperty:[`checked`,`multiple`,`muted`,`selected`],properties:{abbr:null,accept:j,acceptCharset:A,accessKey:A,action:null,allow:null,allowFullScreen:D,allowPaymentRequest:D,allowUserMedia:D,alpha:D,alt:null,as:null,async:D,autoCapitalize:null,autoComplete:A,autoFocus:D,autoPlay:D,blocking:A,capture:null,charSet:null,checked:D,cite:null,className:A,closedBy:null,colorSpace:null,cols:k,colSpan:k,command:null,commandFor:null,content:null,contentEditable:O,controls:D,controlsList:A,coords:k|j,crossOrigin:null,data:null,dateTime:null,decoding:null,default:D,defer:D,dir:null,dirName:null,disabled:D,download:te,draggable:O,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:D,formTarget:null,headers:A,height:k,hidden:te,high:k,href:null,hrefLang:null,htmlFor:A,httpEquiv:A,id:null,imageSizes:null,imageSrcSet:null,inert:D,inputMode:null,integrity:null,is:null,isMap:D,itemId:null,itemProp:A,itemRef:A,itemScope:D,itemType:A,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:D,low:k,manifest:null,max:null,maxLength:k,media:null,method:null,min:null,minLength:k,multiple:D,muted:D,name:null,nonce:null,noModule:D,noValidate:D,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:D,optimum:k,pattern:null,ping:A,placeholder:null,playsInline:D,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:D,referrerPolicy:null,rel:A,required:D,reversed:D,rows:k,rowSpan:k,sandbox:A,scope:null,scoped:D,seamless:D,selected:D,shadowRootClonable:D,shadowRootCustomElementRegistry:D,shadowRootDelegatesFocus:D,shadowRootMode:null,shadowRootSerializable:D,shape:null,size:k,sizes:null,slot:null,span:k,spellCheck:O,src:null,srcDoc:null,srcLang:null,srcSet:null,start:k,step:null,style:null,tabIndex:k,target:null,title:null,translate:null,type:null,typeMustMatch:D,useMap:null,value:O,width:k,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:A,axis:null,background:null,bgColor:null,border:k,borderColor:null,bottomMargin:k,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:D,declare:D,event:null,face:null,frame:null,frameBorder:null,hSpace:k,leftMargin:k,link:null,longDesc:null,lowSrc:null,marginHeight:k,marginWidth:k,noResize:D,noHref:D,noShade:D,noWrap:D,object:null,profile:null,prompt:null,rev:null,rightMargin:k,rules:null,scheme:null,scrolling:O,standby:null,summary:null,text:null,topMargin:k,valueType:null,version:null,vAlign:null,vLink:null,vSpace:k,allowTransparency:null,autoCorrect:null,autoSave:null,credentialless:D,disablePictureInPicture:D,disableRemotePlayback:D,exportParts:j,part:A,prefix:null,property:null,results:k,security:null,unselectable:null},space:`html`,transform:oe}),ce=re({attributes:{accentHeight:`accent-height`,alignmentBaseline:`alignment-baseline`,arabicForm:`arabic-form`,baselineShift:`baseline-shift`,capHeight:`cap-height`,className:`class`,clipPath:`clip-path`,clipRule:`clip-rule`,colorInterpolation:`color-interpolation`,colorInterpolationFilters:`color-interpolation-filters`,colorProfile:`color-profile`,colorRendering:`color-rendering`,crossOrigin:`crossorigin`,dataType:`datatype`,dominantBaseline:`dominant-baseline`,enableBackground:`enable-background`,fillOpacity:`fill-opacity`,fillRule:`fill-rule`,floodColor:`flood-color`,floodOpacity:`flood-opacity`,fontFamily:`font-family`,fontSize:`font-size`,fontSizeAdjust:`font-size-adjust`,fontStretch:`font-stretch`,fontStyle:`font-style`,fontVariant:`font-variant`,fontWeight:`font-weight`,glyphName:`glyph-name`,glyphOrientationHorizontal:`glyph-orientation-horizontal`,glyphOrientationVertical:`glyph-orientation-vertical`,hrefLang:`hreflang`,horizAdvX:`horiz-adv-x`,horizOriginX:`horiz-origin-x`,horizOriginY:`horiz-origin-y`,imageRendering:`image-rendering`,letterSpacing:`letter-spacing`,lightingColor:`lighting-color`,markerEnd:`marker-end`,markerMid:`marker-mid`,markerStart:`marker-start`,maskType:`mask-type`,navDown:`nav-down`,navDownLeft:`nav-down-left`,navDownRight:`nav-down-right`,navLeft:`nav-left`,navNext:`nav-next`,navPrev:`nav-prev`,navRight:`nav-right`,navUp:`nav-up`,navUpLeft:`nav-up-left`,navUpRight:`nav-up-right`,onAbort:`onabort`,onActivate:`onactivate`,onAfterPrint:`onafterprint`,onBeforePrint:`onbeforeprint`,onBegin:`onbegin`,onCancel:`oncancel`,onCanPlay:`oncanplay`,onCanPlayThrough:`oncanplaythrough`,onChange:`onchange`,onClick:`onclick`,onClose:`onclose`,onCopy:`oncopy`,onCueChange:`oncuechange`,onCut:`oncut`,onDblClick:`ondblclick`,onDrag:`ondrag`,onDragEnd:`ondragend`,onDragEnter:`ondragenter`,onDragExit:`ondragexit`,onDragLeave:`ondragleave`,onDragOver:`ondragover`,onDragStart:`ondragstart`,onDrop:`ondrop`,onDurationChange:`ondurationchange`,onEmptied:`onemptied`,onEnd:`onend`,onEnded:`onended`,onError:`onerror`,onFocus:`onfocus`,onFocusIn:`onfocusin`,onFocusOut:`onfocusout`,onHashChange:`onhashchange`,onInput:`oninput`,onInvalid:`oninvalid`,onKeyDown:`onkeydown`,onKeyPress:`onkeypress`,onKeyUp:`onkeyup`,onLoad:`onload`,onLoadedData:`onloadeddata`,onLoadedMetadata:`onloadedmetadata`,onLoadStart:`onloadstart`,onMessage:`onmessage`,onMouseDown:`onmousedown`,onMouseEnter:`onmouseenter`,onMouseLeave:`onmouseleave`,onMouseMove:`onmousemove`,onMouseOut:`onmouseout`,onMouseOver:`onmouseover`,onMouseUp:`onmouseup`,onMouseWheel:`onmousewheel`,onOffline:`onoffline`,onOnline:`ononline`,onPageHide:`onpagehide`,onPageShow:`onpageshow`,onPaste:`onpaste`,onPause:`onpause`,onPlay:`onplay`,onPlaying:`onplaying`,onPopState:`onpopstate`,onProgress:`onprogress`,onRateChange:`onratechange`,onRepeat:`onrepeat`,onReset:`onreset`,onResize:`onresize`,onScroll:`onscroll`,onSeeked:`onseeked`,onSeeking:`onseeking`,onSelect:`onselect`,onShow:`onshow`,onStalled:`onstalled`,onStorage:`onstorage`,onSubmit:`onsubmit`,onSuspend:`onsuspend`,onTimeUpdate:`ontimeupdate`,onToggle:`ontoggle`,onUnload:`onunload`,onVolumeChange:`onvolumechange`,onWaiting:`onwaiting`,onZoom:`onzoom`,overlinePosition:`overline-position`,overlineThickness:`overline-thickness`,paintOrder:`paint-order`,panose1:`panose-1`,pointerEvents:`pointer-events`,referrerPolicy:`referrerpolicy`,renderingIntent:`rendering-intent`,shapeRendering:`shape-rendering`,stopColor:`stop-color`,stopOpacity:`stop-opacity`,strikethroughPosition:`strikethrough-position`,strikethroughThickness:`strikethrough-thickness`,strokeDashArray:`stroke-dasharray`,strokeDashOffset:`stroke-dashoffset`,strokeLineCap:`stroke-linecap`,strokeLineJoin:`stroke-linejoin`,strokeMiterLimit:`stroke-miterlimit`,strokeOpacity:`stroke-opacity`,strokeWidth:`stroke-width`,tabIndex:`tabindex`,textAnchor:`text-anchor`,textDecoration:`text-decoration`,textRendering:`text-rendering`,transformOrigin:`transform-origin`,typeOf:`typeof`,underlinePosition:`underline-position`,underlineThickness:`underline-thickness`,unicodeBidi:`unicode-bidi`,unicodeRange:`unicode-range`,unitsPerEm:`units-per-em`,vAlphabetic:`v-alphabetic`,vHanging:`v-hanging`,vIdeographic:`v-ideographic`,vMathematical:`v-mathematical`,vectorEffect:`vector-effect`,vertAdvY:`vert-adv-y`,vertOriginX:`vert-origin-x`,vertOriginY:`vert-origin-y`,wordSpacing:`word-spacing`,writingMode:`writing-mode`,xHeight:`x-height`,playbackOrder:`playbackorder`,timelineBegin:`timelinebegin`},properties:{about:M,accentHeight:k,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:k,amplitude:k,arabicForm:null,ascent:k,attributeName:null,attributeType:null,azimuth:k,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:k,by:null,calcMode:null,capHeight:k,className:A,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:k,diffuseConstant:k,direction:null,display:null,dur:null,divisor:k,dominantBaseline:null,download:D,dx:null,dy:null,edgeMode:null,editable:null,elevation:k,enableBackground:null,end:null,event:null,exponent:k,externalResourcesRequired:null,fill:null,fillOpacity:k,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:j,g2:j,glyphName:j,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:k,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:k,horizOriginX:k,horizOriginY:k,id:null,ideographic:k,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:k,k,k1:k,k2:k,k3:k,k4:k,kernelMatrix:M,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:k,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskType:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:k,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:k,overlineThickness:k,paintOrder:null,panose1:null,path:null,pathLength:k,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:A,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:k,pointsAtY:k,pointsAtZ:k,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:M,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:M,rev:M,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:M,requiredFeatures:M,requiredFonts:M,requiredFormats:M,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:k,specularExponent:k,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:k,strikethroughThickness:k,string:null,stroke:null,strokeDashArray:M,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:k,strokeOpacity:k,strokeWidth:null,style:null,surfaceScale:k,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:M,tabIndex:k,tableValues:null,target:null,targetX:k,targetY:k,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:M,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:k,underlineThickness:k,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:k,values:null,vAlphabetic:k,vMathematical:k,vectorEffect:null,vHanging:k,vIdeographic:k,version:null,vertAdvY:k,vertOriginX:k,vertOriginY:k,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:k,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:`svg`,transform:ae}),le=re({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:`xlink`,transform(e,t){return`xlink:`+t.slice(5).toLowerCase()}}),ue=re({attributes:{xmlnsxlink:`xmlns:xlink`},properties:{xmlnsXLink:null,xmlns:null},space:`xmlns`,transform:oe}),de=re({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:`xml`,transform(e,t){return`xml:`+t.slice(3).toLowerCase()}}),fe={classId:`classID`,dataType:`datatype`,itemId:`itemID`,strokeDashArray:`strokeDasharray`,strokeDashOffset:`strokeDashoffset`,strokeLineCap:`strokeLinecap`,strokeLineJoin:`strokeLinejoin`,strokeMiterLimit:`strokeMiterlimit`,typeOf:`typeof`,xLinkActuate:`xlinkActuate`,xLinkArcRole:`xlinkArcrole`,xLinkHref:`xlinkHref`,xLinkRole:`xlinkRole`,xLinkShow:`xlinkShow`,xLinkTitle:`xlinkTitle`,xLinkType:`xlinkType`,xmlnsXLink:`xmlnsXlink`},pe=/[A-Z]/g,me=/-[a-z]/g,he=/^data[-\w.:]+$/i;function ge(e,t){let n=w(t),r=t,i=T;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&n.slice(0,4)===`data`&&he.test(t)){if(t.charAt(4)===`-`){let e=t.slice(5).replace(me,ve);r=`data`+e.charAt(0).toUpperCase()+e.slice(1)}else{let e=t.slice(4);if(!me.test(e)){let n=e.replace(pe,_e);n.charAt(0)!==`-`&&(n=`-`+n),t=`data`+n}}i=F}return new i(r,t)}function _e(e){return`-`+e.toLowerCase()}function ve(e){return e.charAt(1).toUpperCase()}var ye=C([ie,se,le,ue,de],`html`),be=C([ie,ce,le,ue,de],`svg`);function xe(e){return e.join(` `).trim()}var Se=n(((e,t)=>{var n=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,r=/\n/g,i=/^\s*/,a=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,o=/^:\s*/,s=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,c=/^[;\s]*/,l=/^\s+|\s+$/g;function u(e,t){if(typeof e!=`string`)throw TypeError(`First argument must be a string`);if(!e)return[];t||={};var l=1,u=1;function f(e){var t=e.match(r);t&&(l+=t.length);var n=e.lastIndexOf(`
`);u=~n?e.length-n:u+e.length}function p(){var e={line:l,column:u};return function(t){return t.position=new m(e),_(),t}}function m(e){this.start=e,this.end={line:l,column:u},this.source=t.source}m.prototype.content=e;function h(n){var r=Error(t.source+`:`+l+`:`+u+`: `+n);if(r.reason=n,r.filename=t.source,r.line=l,r.column=u,r.source=e,!t.silent)throw r}function g(t){var n=t.exec(e);if(n){var r=n[0];return f(r),e=e.slice(r.length),n}}function _(){g(i)}function v(e){var t;for(e||=[];t=y();)t!==!1&&e.push(t);return e}function y(){var t=p();if(!(e.charAt(0)!=`/`||e.charAt(1)!=`*`)){for(var n=2;e.charAt(n)!=``&&(e.charAt(n)!=`*`||e.charAt(n+1)!=`/`);)++n;if(n+=2,e.charAt(n-1)===``)return h(`End of comment missing`);var r=e.slice(2,n-2);return u+=2,f(r),e=e.slice(n),u+=2,t({type:`comment`,comment:r})}}function b(){var e=p(),t=g(a);if(t){if(y(),!g(o))return h(`property missing ':'`);var r=g(s),i=e({type:`declaration`,property:d(t[0].replace(n,``)),value:r?d(r[0].replace(n,``)):``});return g(c),i}}function x(){var e=[];v(e);for(var t;t=b();)t!==!1&&(e.push(t),v(e));return e}return _(),x()}function d(e){return e?e.replace(l,``):``}t.exports=u})),Ce=n((e=>{var t=e&&e.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.default=r;var n=t(Se());function r(e,t){let r=null;if(!e||typeof e!=`string`)return r;let i=(0,n.default)(e),a=typeof t==`function`;return i.forEach(e=>{if(e.type!==`declaration`)return;let{property:n,value:i}=e;a?t(n,i,e):i&&(r||={},r[n]=i)}),r}})),we=n((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.camelCase=void 0;var t=/^--[a-zA-Z0-9_-]+$/,n=/-([a-z])/g,r=/^[^-]+$/,i=/^-(webkit|moz|ms|o|khtml)-/,a=/^-(ms)-/,o=function(e){return!e||r.test(e)||t.test(e)},s=function(e,t){return t.toUpperCase()},c=function(e,t){return`${t}-`};e.camelCase=function(e,t){return t===void 0&&(t={}),o(e)?e:(e=e.toLowerCase(),e=t.reactCompat?e.replace(a,c):e.replace(i,c),e.replace(n,s))}})),Te=n(((e,t)=>{var n=(e&&e.__importDefault||function(e){return e&&e.__esModule?e:{default:e}})(Ce()),r=we();function i(e,t){var i={};return!e||typeof e!=`string`||(0,n.default)(e,function(e,n){e&&n&&(i[(0,r.camelCase)(e,t)]=n)}),i}i.default=i,t.exports=i})),Ee=Oe(`end`),De=Oe(`start`);function Oe(e){return t;function t(t){let n=t&&t.position&&t.position[e]||{};if(typeof n.line==`number`&&n.line>0&&typeof n.column==`number`&&n.column>0)return{line:n.line,column:n.column,offset:typeof n.offset==`number`&&n.offset>-1?n.offset:void 0}}}function ke(e){let t=De(e),n=Ee(e);if(t&&n)return{start:t,end:n}}function Ae(e){return!e||typeof e!=`object`?``:`position`in e||`type`in e?Me(e.position):`start`in e||`end`in e?Me(e):`line`in e||`column`in e?je(e):``}function je(e){return Ne(e&&e.line)+`:`+Ne(e&&e.column)}function Me(e){return je(e&&e.start)+`-`+je(e&&e.end)}function Ne(e){return e&&typeof e==`number`?e:1}var I=class extends Error{constructor(e,t,n){super(),typeof t==`string`&&(n=t,t=void 0);let r=``,i={},a=!1;if(t&&(i=`line`in t&&`column`in t||`start`in t&&`end`in t?{place:t}:`type`in t?{ancestors:[t],place:t.position}:{...t}),typeof e==`string`?r=e:!i.cause&&e&&(a=!0,r=e.message,i.cause=e),!i.ruleId&&!i.source&&typeof n==`string`){let e=n.indexOf(`:`);e===-1?i.ruleId=n:(i.source=n.slice(0,e),i.ruleId=n.slice(e+1))}if(!i.place&&i.ancestors&&i.ancestors){let e=i.ancestors[i.ancestors.length-1];e&&(i.place=e.position)}let o=i.place&&`start`in i.place?i.place.start:i.place;this.ancestors=i.ancestors||void 0,this.cause=i.cause||void 0,this.column=o?o.column:void 0,this.fatal=void 0,this.file=``,this.message=r,this.line=o?o.line:void 0,this.name=Ae(i.place)||`1:1`,this.place=i.place||void 0,this.reason=this.message,this.ruleId=i.ruleId||void 0,this.source=i.source||void 0,this.stack=a&&i.cause&&typeof i.cause.stack==`string`?i.cause.stack:``,this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}};I.prototype.file=``,I.prototype.name=``,I.prototype.reason=``,I.prototype.message=``,I.prototype.stack=``,I.prototype.column=void 0,I.prototype.line=void 0,I.prototype.ancestors=void 0,I.prototype.cause=void 0,I.prototype.fatal=void 0,I.prototype.place=void 0,I.prototype.ruleId=void 0,I.prototype.source=void 0;var Pe=t(Te(),1),Fe={}.hasOwnProperty,Ie=new Map,Le=/[A-Z]/g,Re=new Set([`table`,`tbody`,`thead`,`tfoot`,`tr`]),ze=new Set([`td`,`th`]);function Be(e,t){if(!t||t.Fragment===void 0)throw TypeError("Expected `Fragment` in options");let n=t.filePath||void 0,r;if(t.development){if(typeof t.jsxDEV!=`function`)throw TypeError("Expected `jsxDEV` in options when `development: true`");r=Ze(n,t.jsxDEV)}else{if(typeof t.jsx!=`function`)throw TypeError("Expected `jsx` in production options");if(typeof t.jsxs!=`function`)throw TypeError("Expected `jsxs` in production options");r=Xe(n,t.jsx,t.jsxs)}let i={Fragment:t.Fragment,ancestors:[],components:t.components||{},create:r,elementAttributeNameCase:t.elementAttributeNameCase||`react`,evaluater:t.createEvaluater?t.createEvaluater():void 0,filePath:n,ignoreInvalidStyle:t.ignoreInvalidStyle||!1,passKeys:t.passKeys!==!1,passNode:t.passNode||!1,schema:t.space===`svg`?be:ye,stylePropertyNameCase:t.stylePropertyNameCase||`dom`,tableCellAlignToStyle:t.tableCellAlignToStyle!==!1},a=Ve(i,e,void 0);return a&&typeof a!=`string`?a:i.create(e,i.Fragment,{children:a||void 0},void 0)}function Ve(e,t,n){if(t.type===`element`)return He(e,t,n);if(t.type===`mdxFlowExpression`||t.type===`mdxTextExpression`)return Ue(e,t);if(t.type===`mdxJsxFlowElement`||t.type===`mdxJsxTextElement`)return Ge(e,t,n);if(t.type===`mdxjsEsm`)return We(e,t);if(t.type===`root`)return Ke(e,t,n);if(t.type===`text`)return qe(e,t)}function He(e,t,n){let r=e.schema,i=r;t.tagName.toLowerCase()===`svg`&&r.space===`html`&&(i=be,e.schema=i),e.ancestors.push(t);let a=rt(e,t.tagName,!1),o=Qe(e,t),s=et(e,t);return Re.has(t.tagName)&&(s=s.filter(function(e){return typeof e!=`string`||!b(e)})),Je(e,o,a,t),Ye(o,s),e.ancestors.pop(),e.schema=r,e.create(t,a,o,n)}function Ue(e,t){if(t.data&&t.data.estree&&e.evaluater){let n=t.data.estree.body[0];return n.type,e.evaluater.evaluateExpression(n.expression)}it(e,t.position)}function We(e,t){if(t.data&&t.data.estree&&e.evaluater)return e.evaluater.evaluateProgram(t.data.estree);it(e,t.position)}function Ge(e,t,n){let r=e.schema,i=r;t.name===`svg`&&r.space===`html`&&(i=be,e.schema=i),e.ancestors.push(t);let a=t.name===null?e.Fragment:rt(e,t.name,!0),o=$e(e,t),s=et(e,t);return Je(e,o,a,t),Ye(o,s),e.ancestors.pop(),e.schema=r,e.create(t,a,o,n)}function Ke(e,t,n){let r={};return Ye(r,et(e,t)),e.create(t,e.Fragment,r,n)}function qe(e,t){return t.value}function Je(e,t,n,r){typeof n!=`string`&&n!==e.Fragment&&e.passNode&&(t.node=r)}function Ye(e,t){if(t.length>0){let n=t.length>1?t:t[0];n&&(e.children=n)}}function Xe(e,t,n){return r;function r(e,r,i,a){let o=Array.isArray(i.children)?n:t;return a?o(r,i,a):o(r,i)}}function Ze(e,t){return n;function n(n,r,i,a){let o=Array.isArray(i.children),s=De(n);return t(r,i,a,o,{columnNumber:s?s.column-1:void 0,fileName:e,lineNumber:s?s.line:void 0},void 0)}}function Qe(e,t){let n={},r,i;for(i in t.properties)if(i!==`children`&&Fe.call(t.properties,i)){let a=tt(e,i,t.properties[i]);if(a){let[i,o]=a;e.tableCellAlignToStyle&&i===`align`&&typeof o==`string`&&ze.has(t.tagName)?r=o:n[i]=o}}if(r){let t=n.style||={};t[e.stylePropertyNameCase===`css`?`text-align`:`textAlign`]=r}return n}function $e(e,t){let n={};for(let r of t.attributes)if(r.type===`mdxJsxExpressionAttribute`)if(r.data&&r.data.estree&&e.evaluater){let t=r.data.estree.body[0];t.type;let i=t.expression;i.type;let a=i.properties[0];a.type,Object.assign(n,e.evaluater.evaluateExpression(a.argument))}else it(e,t.position);else{let i=r.name,a;if(r.value&&typeof r.value==`object`)if(r.value.data&&r.value.data.estree&&e.evaluater){let t=r.value.data.estree.body[0];t.type,a=e.evaluater.evaluateExpression(t.expression)}else it(e,t.position);else a=r.value===null||r.value;n[i]=a}return n}function et(e,t){let n=[],r=-1,i=e.passKeys?new Map:Ie;for(;++r<t.children.length;){let a=t.children[r],o;if(e.passKeys){let e=a.type===`element`?a.tagName:a.type===`mdxJsxFlowElement`||a.type===`mdxJsxTextElement`?a.name:void 0;if(e){let t=i.get(e)||0;o=e+`-`+t,i.set(e,t+1)}}let s=Ve(e,a,o);s!==void 0&&n.push(s)}return n}function tt(e,t,n){let r=ge(e.schema,t);if(!(n==null||typeof n==`number`&&Number.isNaN(n))){if(Array.isArray(n)&&(n=r.commaSeparated?m(n):xe(n)),r.property===`style`){let t=typeof n==`object`?n:nt(e,String(n));return e.stylePropertyNameCase===`css`&&(t=at(t)),[`style`,t]}return[e.elementAttributeNameCase===`react`&&r.space?fe[r.property]||r.property:r.attribute,n]}}function nt(e,t){try{return(0,Pe.default)(t,{reactCompat:!0})}catch(t){if(e.ignoreInvalidStyle)return{};let n=t,r=new I("Cannot parse `style` attribute",{ancestors:e.ancestors,cause:n,ruleId:`style`,source:`hast-util-to-jsx-runtime`});throw r.file=e.filePath||void 0,r.url=`https://github.com/syntax-tree/hast-util-to-jsx-runtime#cannot-parse-style-attribute`,r}}function rt(e,t,n){let r;if(!n)r={type:`Literal`,value:t};else if(t.includes(`.`)){let e=t.split(`.`),n=-1,i;for(;++n<e.length;){let t=v(e[n])?{type:`Identifier`,name:e[n]}:{type:`Literal`,value:e[n]};i=i?{type:`MemberExpression`,object:i,property:t,computed:!!(n&&t.type===`Literal`),optional:!1}:t}r=i}else r=v(t)&&!/^[a-z]/.test(t)?{type:`Identifier`,name:t}:{type:`Literal`,value:t};if(r.type===`Literal`){let t=r.value;return Fe.call(e.components,t)?e.components[t]:t}if(e.evaluater)return e.evaluater.evaluateExpression(r);it(e)}function it(e,t){let n=new I("Cannot handle MDX estrees without `createEvaluater`",{ancestors:e.ancestors,place:t,ruleId:`mdx-estree`,source:`hast-util-to-jsx-runtime`});throw n.file=e.filePath||void 0,n.url=`https://github.com/syntax-tree/hast-util-to-jsx-runtime#cannot-handle-mdx-estrees-without-createevaluater`,n}function at(e){let t={},n;for(n in e)Fe.call(e,n)&&(t[ot(n)]=e[n]);return t}function ot(e){let t=e.replace(Le,st);return t.slice(0,3)===`ms-`&&(t=`-`+t),t}function st(e){return`-`+e.toLowerCase()}var ct={action:[`form`],cite:[`blockquote`,`del`,`ins`,`q`],data:[`object`],formAction:[`button`,`input`],href:[`a`,`area`,`base`,`link`],icon:[`menuitem`],itemId:null,manifest:[`html`],ping:[`a`,`area`],poster:[`video`],src:[`audio`,`embed`,`iframe`,`img`,`input`,`script`,`source`,`track`,`video`]},lt={};function ut(e,t){let n=t||lt;return dt(e,typeof n.includeImageAlt!=`boolean`||n.includeImageAlt,typeof n.includeHtml!=`boolean`||n.includeHtml)}function dt(e,t,n){if(pt(e)){if(`value`in e)return e.type===`html`&&!n?``:e.value;if(t&&`alt`in e&&e.alt)return e.alt;if(`children`in e)return ft(e.children,t,n)}return Array.isArray(e)?ft(e,t,n):``}function ft(e,t,n){let r=[],i=-1;for(;++i<e.length;)r[i]=dt(e[i],t,n);return r.join(``)}function pt(e){return!!(e&&typeof e==`object`)}var mt=document.createElement(`i`);function ht(e){let t=`&`+e+`;`;mt.innerHTML=t;let n=mt.textContent;return n.charCodeAt(n.length-1)===59&&e!==`semi`?!1:n!==t&&n}function L(e,t,n,r){let i=e.length,a=0,o;if(t=t<0?-t>i?0:i+t:t>i?i:t,n=n>0?n:0,r.length<1e4)o=Array.from(r),o.unshift(t,n),e.splice(...o);else for(n&&e.splice(t,n);a<r.length;)o=r.slice(a,a+1e4),o.unshift(t,0),e.splice(...o),a+=1e4,t+=1e4}function R(e,t){return e.length>0?(L(e,e.length,0,t),e):t}var gt={}.hasOwnProperty;function _t(e){let t={},n=-1;for(;++n<e.length;)vt(t,e[n]);return t}function vt(e,t){let n;for(n in t){let r=(gt.call(e,n)?e[n]:void 0)||(e[n]={}),i=t[n],a;if(i)for(a in i){gt.call(r,a)||(r[a]=[]);let e=i[a];yt(r[a],Array.isArray(e)?e:e?[e]:[])}}}function yt(e,t){let n=-1,r=[];for(;++n<t.length;)(t[n].add===`after`?e:r).push(t[n]);L(e,0,0,r)}function bt(e,t){let n=Number.parseInt(e,t);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)==65535||(n&65535)==65534||n>1114111?`�`:String.fromCodePoint(n)}function z(e){return e.replace(/[\t\n\r ]+/g,` `).replace(/^ | $/g,``).toLowerCase().toUpperCase()}var B=G(/[A-Za-z]/),V=G(/[\dA-Za-z]/),xt=G(/[#-'*+\--9=?A-Z^-~]/);function St(e){return e!==null&&(e<32||e===127)}var Ct=G(/\d/),wt=G(/[\dA-Fa-f]/),Tt=G(/[!-/:-@[-`{-~]/);function H(e){return e!==null&&e<-2}function U(e){return e!==null&&(e<0||e===32)}function W(e){return e===-2||e===-1||e===32}var Et=G(/\p{P}|\p{S}/u),Dt=G(/\s/);function G(e){return t;function t(t){return t!==null&&t>-1&&e.test(String.fromCharCode(t))}}function Ot(e){let t=[],n=-1,r=0,i=0;for(;++n<e.length;){let a=e.charCodeAt(n),o=``;if(a===37&&V(e.charCodeAt(n+1))&&V(e.charCodeAt(n+2)))i=2;else if(a<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a))||(o=String.fromCharCode(a));else if(a>55295&&a<57344){let t=e.charCodeAt(n+1);a<56320&&t>56319&&t<57344?(o=String.fromCharCode(a,t),i=1):o=`�`}else o=String.fromCharCode(a);o&&=(t.push(e.slice(r,n),encodeURIComponent(o)),r=n+i+1,``),i&&=(n+=i,0)}return t.join(``)+e.slice(r)}function K(e,t,n,r){let i=r?r-1:1/0,a=0;return o;function o(r){return W(r)?(e.enter(n),s(r)):t(r)}function s(r){return W(r)&&a++<i?(e.consume(r),s):(e.exit(n),t(r))}}var kt={tokenize:At};function At(e){let t=e.attempt(this.parser.constructs.contentInitial,r,i),n;return t;function r(n){if(n===null){e.consume(n);return}return e.enter(`lineEnding`),e.consume(n),e.exit(`lineEnding`),K(e,t,`linePrefix`)}function i(t){return e.enter(`paragraph`),a(t)}function a(t){let r=e.enter(`chunkText`,{contentType:`text`,previous:n});return n&&(n.next=r),n=r,o(t)}function o(t){if(t===null){e.exit(`chunkText`),e.exit(`paragraph`),e.consume(t);return}return H(t)?(e.consume(t),e.exit(`chunkText`),a):(e.consume(t),o)}}var jt={tokenize:Nt},Mt={tokenize:Pt};function Nt(e){let t=this,n=[],r=0,i,a,o;return s;function s(i){if(r<n.length){let a=n[r];return t.containerState=a[1],e.attempt(a[0].continuation,c,l)(i)}return l(i)}function c(e){if(r++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,i&&v();let n=t.events.length,a=n,o;for(;a--;)if(t.events[a][0]===`exit`&&t.events[a][1].type===`chunkFlow`){o=t.events[a][1].end;break}_(r);let s=n;for(;s<t.events.length;)t.events[s][1].end={...o},s++;return L(t.events,a+1,0,t.events.slice(n)),t.events.length=s,l(e)}return s(e)}function l(a){if(r===n.length){if(!i)return f(a);if(i.currentConstruct&&i.currentConstruct.concrete)return m(a);t.interrupt=!!(i.currentConstruct&&!i._gfmTableDynamicInterruptHack)}return t.containerState={},e.check(Mt,u,d)(a)}function u(e){return i&&v(),_(r),f(e)}function d(e){return t.parser.lazy[t.now().line]=r!==n.length,o=t.now().offset,m(e)}function f(n){return t.containerState={},e.attempt(Mt,p,m)(n)}function p(e){return r++,n.push([t.currentConstruct,t.containerState]),f(e)}function m(n){if(n===null){i&&v(),_(0),e.consume(n);return}return i||=t.parser.flow(t.now()),e.enter(`chunkFlow`,{_tokenizer:i,contentType:`flow`,previous:a}),h(n)}function h(n){if(n===null){g(e.exit(`chunkFlow`),!0),_(0),e.consume(n);return}return H(n)?(e.consume(n),g(e.exit(`chunkFlow`)),r=0,t.interrupt=void 0,s):(e.consume(n),h)}function g(e,n){let s=t.sliceStream(e);if(n&&s.push(null),e.previous=a,a&&(a.next=e),a=e,i.defineSkip(e.start),i.write(s),t.parser.lazy[e.start.line]){let e=i.events.length;for(;e--;)if(i.events[e][1].start.offset<o&&(!i.events[e][1].end||i.events[e][1].end.offset>o))return;let n=t.events.length,a=n,s,c;for(;a--;)if(t.events[a][0]===`exit`&&t.events[a][1].type===`chunkFlow`){if(s){c=t.events[a][1].end;break}s=!0}for(_(r),e=n;e<t.events.length;)t.events[e][1].end={...c},e++;L(t.events,a+1,0,t.events.slice(n)),t.events.length=e}}function _(r){let i=n.length;for(;i-->r;){let r=n[i];t.containerState=r[1],r[0].exit.call(t,e)}n.length=r}function v(){i.write([null]),a=void 0,i=void 0,t.containerState._closeFlow=void 0}}function Pt(e,t,n){return K(e,e.attempt(this.parser.constructs.document,t,n),`linePrefix`,this.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)}function Ft(e){if(e===null||U(e)||Dt(e))return 1;if(Et(e))return 2}function It(e,t,n){let r=[],i=-1;for(;++i<e.length;){let a=e[i].resolveAll;a&&!r.includes(a)&&(t=a(t,n),r.push(a))}return t}var Lt={name:`attention`,resolveAll:Rt,tokenize:zt};function Rt(e,t){let n=-1,r,i,a,o,s,c,l,u;for(;++n<e.length;)if(e[n][0]===`enter`&&e[n][1].type===`attentionSequence`&&e[n][1]._close){for(r=n;r--;)if(e[r][0]===`exit`&&e[r][1].type===`attentionSequence`&&e[r][1]._open&&t.sliceSerialize(e[r][1]).charCodeAt(0)===t.sliceSerialize(e[n][1]).charCodeAt(0)){if((e[r][1]._close||e[n][1]._open)&&(e[n][1].end.offset-e[n][1].start.offset)%3&&!((e[r][1].end.offset-e[r][1].start.offset+e[n][1].end.offset-e[n][1].start.offset)%3))continue;c=e[r][1].end.offset-e[r][1].start.offset>1&&e[n][1].end.offset-e[n][1].start.offset>1?2:1;let d={...e[r][1].end},f={...e[n][1].start};Bt(d,-c),Bt(f,c),o={type:c>1?`strongSequence`:`emphasisSequence`,start:d,end:{...e[r][1].end}},s={type:c>1?`strongSequence`:`emphasisSequence`,start:{...e[n][1].start},end:f},a={type:c>1?`strongText`:`emphasisText`,start:{...e[r][1].end},end:{...e[n][1].start}},i={type:c>1?`strong`:`emphasis`,start:{...o.start},end:{...s.end}},e[r][1].end={...o.start},e[n][1].start={...s.end},l=[],e[r][1].end.offset-e[r][1].start.offset&&(l=R(l,[[`enter`,e[r][1],t],[`exit`,e[r][1],t]])),l=R(l,[[`enter`,i,t],[`enter`,o,t],[`exit`,o,t],[`enter`,a,t]]),l=R(l,It(t.parser.constructs.insideSpan.null,e.slice(r+1,n),t)),l=R(l,[[`exit`,a,t],[`enter`,s,t],[`exit`,s,t],[`exit`,i,t]]),e[n][1].end.offset-e[n][1].start.offset?(u=2,l=R(l,[[`enter`,e[n][1],t],[`exit`,e[n][1],t]])):u=0,L(e,r-1,n-r+3,l),n=r+l.length-u-2;break}}for(n=-1;++n<e.length;)e[n][1].type===`attentionSequence`&&(e[n][1].type=`data`);return e}function zt(e,t){let n=this.parser.constructs.attentionMarkers.null,r=this.previous,i=Ft(r),a;return o;function o(t){return a=t,e.enter(`attentionSequence`),s(t)}function s(o){if(o===a)return e.consume(o),s;let c=e.exit(`attentionSequence`),l=Ft(o),u=!l||l===2&&i||n.includes(o),d=!i||i===2&&l||n.includes(r);return c._open=!!(a===42?u:u&&(i||!d)),c._close=!!(a===42?d:d&&(l||!u)),t(o)}}function Bt(e,t){e.column+=t,e.offset+=t,e._bufferIndex+=t}var Vt={name:`autolink`,tokenize:Ht};function Ht(e,t,n){let r=0;return i;function i(t){return e.enter(`autolink`),e.enter(`autolinkMarker`),e.consume(t),e.exit(`autolinkMarker`),e.enter(`autolinkProtocol`),a}function a(t){return B(t)?(e.consume(t),o):t===64?n(t):l(t)}function o(e){return e===43||e===45||e===46||V(e)?(r=1,s(e)):l(e)}function s(t){return t===58?(e.consume(t),r=0,c):(t===43||t===45||t===46||V(t))&&r++<32?(e.consume(t),s):(r=0,l(t))}function c(r){return r===62?(e.exit(`autolinkProtocol`),e.enter(`autolinkMarker`),e.consume(r),e.exit(`autolinkMarker`),e.exit(`autolink`),t):r===null||r===32||r===60||St(r)?n(r):(e.consume(r),c)}function l(t){return t===64?(e.consume(t),u):xt(t)?(e.consume(t),l):n(t)}function u(e){return V(e)?d(e):n(e)}function d(n){return n===46?(e.consume(n),r=0,u):n===62?(e.exit(`autolinkProtocol`).type=`autolinkEmail`,e.enter(`autolinkMarker`),e.consume(n),e.exit(`autolinkMarker`),e.exit(`autolink`),t):f(n)}function f(t){if((t===45||V(t))&&r++<63){let n=t===45?f:d;return e.consume(t),n}return n(t)}}var Ut={partial:!0,tokenize:Wt};function Wt(e,t,n){return r;function r(t){return W(t)?K(e,i,`linePrefix`)(t):i(t)}function i(e){return e===null||H(e)?t(e):n(e)}}var Gt={continuation:{tokenize:qt},exit:Jt,name:`blockQuote`,tokenize:Kt};function Kt(e,t,n){let r=this;return i;function i(t){if(t===62){let n=r.containerState;return n.open||=(e.enter(`blockQuote`,{_container:!0}),!0),e.enter(`blockQuotePrefix`),e.enter(`blockQuoteMarker`),e.consume(t),e.exit(`blockQuoteMarker`),a}return n(t)}function a(n){return W(n)?(e.enter(`blockQuotePrefixWhitespace`),e.consume(n),e.exit(`blockQuotePrefixWhitespace`),e.exit(`blockQuotePrefix`),t):(e.exit(`blockQuotePrefix`),t(n))}}function qt(e,t,n){let r=this;return i;function i(t){return W(t)?K(e,a,`linePrefix`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)(t):a(t)}function a(r){return e.attempt(Gt,t,n)(r)}}function Jt(e){e.exit(`blockQuote`)}var Yt={name:`characterEscape`,tokenize:Xt};function Xt(e,t,n){return r;function r(t){return e.enter(`characterEscape`),e.enter(`escapeMarker`),e.consume(t),e.exit(`escapeMarker`),i}function i(r){return Tt(r)?(e.enter(`characterEscapeValue`),e.consume(r),e.exit(`characterEscapeValue`),e.exit(`characterEscape`),t):n(r)}}var Zt={name:`characterReference`,tokenize:Qt};function Qt(e,t,n){let r=this,i=0,a,o;return s;function s(t){return e.enter(`characterReference`),e.enter(`characterReferenceMarker`),e.consume(t),e.exit(`characterReferenceMarker`),c}function c(t){return t===35?(e.enter(`characterReferenceMarkerNumeric`),e.consume(t),e.exit(`characterReferenceMarkerNumeric`),l):(e.enter(`characterReferenceValue`),a=31,o=V,u(t))}function l(t){return t===88||t===120?(e.enter(`characterReferenceMarkerHexadecimal`),e.consume(t),e.exit(`characterReferenceMarkerHexadecimal`),e.enter(`characterReferenceValue`),a=6,o=wt,u):(e.enter(`characterReferenceValue`),a=7,o=Ct,u(t))}function u(s){if(s===59&&i){let i=e.exit(`characterReferenceValue`);return o===V&&!ht(r.sliceSerialize(i))?n(s):(e.enter(`characterReferenceMarker`),e.consume(s),e.exit(`characterReferenceMarker`),e.exit(`characterReference`),t)}return o(s)&&i++<a?(e.consume(s),u):n(s)}}var $t={partial:!0,tokenize:nn},en={concrete:!0,name:`codeFenced`,tokenize:tn};function tn(e,t,n){let r=this,i={partial:!0,tokenize:x},a=0,o=0,s;return c;function c(e){return l(e)}function l(t){let n=r.events[r.events.length-1];return a=n&&n[1].type===`linePrefix`?n[2].sliceSerialize(n[1],!0).length:0,s=t,e.enter(`codeFenced`),e.enter(`codeFencedFence`),e.enter(`codeFencedFenceSequence`),u(t)}function u(t){return t===s?(o++,e.consume(t),u):o<3?n(t):(e.exit(`codeFencedFenceSequence`),W(t)?K(e,d,`whitespace`)(t):d(t))}function d(n){return n===null||H(n)?(e.exit(`codeFencedFence`),r.interrupt?t(n):e.check($t,h,b)(n)):(e.enter(`codeFencedFenceInfo`),e.enter(`chunkString`,{contentType:`string`}),f(n))}function f(t){return t===null||H(t)?(e.exit(`chunkString`),e.exit(`codeFencedFenceInfo`),d(t)):W(t)?(e.exit(`chunkString`),e.exit(`codeFencedFenceInfo`),K(e,p,`whitespace`)(t)):t===96&&t===s?n(t):(e.consume(t),f)}function p(t){return t===null||H(t)?d(t):(e.enter(`codeFencedFenceMeta`),e.enter(`chunkString`,{contentType:`string`}),m(t))}function m(t){return t===null||H(t)?(e.exit(`chunkString`),e.exit(`codeFencedFenceMeta`),d(t)):t===96&&t===s?n(t):(e.consume(t),m)}function h(t){return e.attempt(i,b,g)(t)}function g(t){return e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),_}function _(t){return a>0&&W(t)?K(e,v,`linePrefix`,a+1)(t):v(t)}function v(t){return t===null||H(t)?e.check($t,h,b)(t):(e.enter(`codeFlowValue`),y(t))}function y(t){return t===null||H(t)?(e.exit(`codeFlowValue`),v(t)):(e.consume(t),y)}function b(n){return e.exit(`codeFenced`),t(n)}function x(e,t,n){let i=0;return a;function a(t){return e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),c}function c(t){return e.enter(`codeFencedFence`),W(t)?K(e,l,`linePrefix`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)(t):l(t)}function l(t){return t===s?(e.enter(`codeFencedFenceSequence`),u(t)):n(t)}function u(t){return t===s?(i++,e.consume(t),u):i>=o?(e.exit(`codeFencedFenceSequence`),W(t)?K(e,d,`whitespace`)(t):d(t)):n(t)}function d(r){return r===null||H(r)?(e.exit(`codeFencedFence`),t(r)):n(r)}}}function nn(e,t,n){let r=this;return i;function i(t){return t===null?n(t):(e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),a)}function a(e){return r.parser.lazy[r.now().line]?n(e):t(e)}}var rn={name:`codeIndented`,tokenize:on},an={partial:!0,tokenize:sn};function on(e,t,n){let r=this;return i;function i(t){return e.enter(`codeIndented`),K(e,a,`linePrefix`,5)(t)}function a(e){let t=r.events[r.events.length-1];return t&&t[1].type===`linePrefix`&&t[2].sliceSerialize(t[1],!0).length>=4?o(e):n(e)}function o(t){return t===null?c(t):H(t)?e.attempt(an,o,c)(t):(e.enter(`codeFlowValue`),s(t))}function s(t){return t===null||H(t)?(e.exit(`codeFlowValue`),o(t)):(e.consume(t),s)}function c(n){return e.exit(`codeIndented`),t(n)}}function sn(e,t,n){let r=this;return i;function i(t){return r.parser.lazy[r.now().line]?n(t):H(t)?(e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),i):K(e,a,`linePrefix`,5)(t)}function a(e){let a=r.events[r.events.length-1];return a&&a[1].type===`linePrefix`&&a[2].sliceSerialize(a[1],!0).length>=4?t(e):H(e)?i(e):n(e)}}var cn={name:`codeText`,previous:un,resolve:ln,tokenize:dn};function ln(e){let t=e.length-4,n=3,r,i;if((e[n][1].type===`lineEnding`||e[n][1].type===`space`)&&(e[t][1].type===`lineEnding`||e[t][1].type===`space`)){for(r=n;++r<t;)if(e[r][1].type===`codeTextData`){e[n][1].type=`codeTextPadding`,e[t][1].type=`codeTextPadding`,n+=2,t-=2;break}}for(r=n-1,t++;++r<=t;)i===void 0?r!==t&&e[r][1].type!==`lineEnding`&&(i=r):(r===t||e[r][1].type===`lineEnding`)&&(e[i][1].type=`codeTextData`,r!==i+2&&(e[i][1].end=e[r-1][1].end,e.splice(i+2,r-i-2),t-=r-i-2,r=i+2),i=void 0);return e}function un(e){return e!==96||this.events[this.events.length-1][1].type===`characterEscape`}function dn(e,t,n){let r=0,i,a;return o;function o(t){return e.enter(`codeText`),e.enter(`codeTextSequence`),s(t)}function s(t){return t===96?(e.consume(t),r++,s):(e.exit(`codeTextSequence`),c(t))}function c(t){return t===null?n(t):t===32?(e.enter(`space`),e.consume(t),e.exit(`space`),c):t===96?(a=e.enter(`codeTextSequence`),i=0,u(t)):H(t)?(e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),c):(e.enter(`codeTextData`),l(t))}function l(t){return t===null||t===32||t===96||H(t)?(e.exit(`codeTextData`),c(t)):(e.consume(t),l)}function u(n){return n===96?(e.consume(n),i++,u):i===r?(e.exit(`codeTextSequence`),e.exit(`codeText`),t(n)):(a.type=`codeTextData`,l(n))}}var fn=class{constructor(e){this.left=e?[...e]:[],this.right=[]}get(e){if(e<0||e>=this.left.length+this.right.length)throw RangeError("Cannot access index `"+e+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return e<this.left.length?this.left[e]:this.right[this.right.length-e+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(e,t){let n=t??1/0;return n<this.left.length?this.left.slice(e,n):e>this.left.length?this.right.slice(this.right.length-n+this.left.length,this.right.length-e+this.left.length).reverse():this.left.slice(e).concat(this.right.slice(this.right.length-n+this.left.length).reverse())}splice(e,t,n){let r=t||0;this.setCursor(Math.trunc(e));let i=this.right.splice(this.right.length-r,1/0);return n&&pn(this.left,n),i.reverse()}pop(){return this.setCursor(1/0),this.left.pop()}push(e){this.setCursor(1/0),this.left.push(e)}pushMany(e){this.setCursor(1/0),pn(this.left,e)}unshift(e){this.setCursor(0),this.right.push(e)}unshiftMany(e){this.setCursor(0),pn(this.right,e.reverse())}setCursor(e){if(!(e===this.left.length||e>this.left.length&&this.right.length===0||e<0&&this.left.length===0))if(e<this.left.length){let t=this.left.splice(e,1/0);pn(this.right,t.reverse())}else{let t=this.right.splice(this.left.length+this.right.length-e,1/0);pn(this.left,t.reverse())}}};function pn(e,t){let n=0;if(t.length<1e4)e.push(...t);else for(;n<t.length;)e.push(...t.slice(n,n+1e4)),n+=1e4}function mn(e){let t={},n=-1,r,i,a,o,s,c,l,u=new fn(e);for(;++n<u.length;){for(;n in t;)n=t[n];if(r=u.get(n),n&&r[1].type===`chunkFlow`&&u.get(n-1)[1].type===`listItemPrefix`&&(c=r[1]._tokenizer.events,a=0,a<c.length&&c[a][1].type===`lineEndingBlank`&&(a+=2),a<c.length&&c[a][1].type===`content`))for(;++a<c.length&&c[a][1].type!==`content`;)c[a][1].type===`chunkText`&&(c[a][1]._isInFirstContentOfListItem=!0,a++);if(r[0]===`enter`)r[1].contentType&&(Object.assign(t,hn(u,n)),n=t[n],l=!0);else if(r[1]._container){for(a=n,i=void 0;a--;)if(o=u.get(a),o[1].type===`lineEnding`||o[1].type===`lineEndingBlank`)o[0]===`enter`&&(i&&(u.get(i)[1].type=`lineEndingBlank`),o[1].type=`lineEnding`,i=a);else if(!(o[1].type===`linePrefix`||o[1].type===`listItemIndent`))break;i&&(r[1].end={...u.get(i)[1].start},s=u.slice(i,n),s.unshift(r),u.splice(i,n-i+1,s))}}return L(e,0,1/0,u.slice(0)),!l}function hn(e,t){let n=e.get(t)[1],r=e.get(t)[2],i=t-1,a=[],o=n._tokenizer;o||(o=r.parser[n.contentType](n.start),n._contentTypeTextTrailing&&(o._contentTypeTextTrailing=!0));let s=o.events,c=[],l={},u,d,f=-1,p=n,m=0,h=0,g=[h];for(;p;){for(;e.get(++i)[1]!==p;);a.push(i),p._tokenizer||(u=r.sliceStream(p),p.next||u.push(null),d&&o.defineSkip(p.start),p._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=!0),o.write(u),p._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=void 0)),d=p,p=p.next}for(p=n;++f<s.length;)s[f][0]===`exit`&&s[f-1][0]===`enter`&&s[f][1].type===s[f-1][1].type&&s[f][1].start.line!==s[f][1].end.line&&(h=f+1,g.push(h),p._tokenizer=void 0,p.previous=void 0,p=p.next);for(o.events=[],p?(p._tokenizer=void 0,p.previous=void 0):g.pop(),f=g.length;f--;){let t=s.slice(g[f],g[f+1]),n=a.pop();c.push([n,n+t.length-1]),e.splice(n,2,t)}for(c.reverse(),f=-1;++f<c.length;)l[m+c[f][0]]=m+c[f][1],m+=c[f][1]-c[f][0]-1;return l}var gn={resolve:vn,tokenize:yn},_n={partial:!0,tokenize:bn};function vn(e){return mn(e),e}function yn(e,t){let n;return r;function r(t){return e.enter(`content`),n=e.enter(`chunkContent`,{contentType:`content`}),i(t)}function i(t){return t===null?a(t):H(t)?e.check(_n,o,a)(t):(e.consume(t),i)}function a(n){return e.exit(`chunkContent`),e.exit(`content`),t(n)}function o(t){return e.consume(t),e.exit(`chunkContent`),n.next=e.enter(`chunkContent`,{contentType:`content`,previous:n}),n=n.next,i}}function bn(e,t,n){let r=this;return i;function i(t){return e.exit(`chunkContent`),e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),K(e,a,`linePrefix`)}function a(i){if(i===null||H(i))return n(i);let a=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes(`codeIndented`)&&a&&a[1].type===`linePrefix`&&a[2].sliceSerialize(a[1],!0).length>=4?t(i):e.interrupt(r.parser.constructs.flow,n,t)(i)}}function xn(e,t,n,r,i,a,o,s,c){let l=c||1/0,u=0;return d;function d(t){return t===60?(e.enter(r),e.enter(i),e.enter(a),e.consume(t),e.exit(a),f):t===null||t===32||t===41||St(t)?n(t):(e.enter(r),e.enter(o),e.enter(s),e.enter(`chunkString`,{contentType:`string`}),h(t))}function f(n){return n===62?(e.enter(a),e.consume(n),e.exit(a),e.exit(i),e.exit(r),t):(e.enter(s),e.enter(`chunkString`,{contentType:`string`}),p(n))}function p(t){return t===62?(e.exit(`chunkString`),e.exit(s),f(t)):t===null||t===60||H(t)?n(t):(e.consume(t),t===92?m:p)}function m(t){return t===60||t===62||t===92?(e.consume(t),p):p(t)}function h(i){return!u&&(i===null||i===41||U(i))?(e.exit(`chunkString`),e.exit(s),e.exit(o),e.exit(r),t(i)):u<l&&i===40?(e.consume(i),u++,h):i===41?(e.consume(i),u--,h):i===null||i===32||i===40||St(i)?n(i):(e.consume(i),i===92?g:h)}function g(t){return t===40||t===41||t===92?(e.consume(t),h):h(t)}}function Sn(e,t,n,r,i,a){let o=this,s=0,c;return l;function l(t){return e.enter(r),e.enter(i),e.consume(t),e.exit(i),e.enter(a),u}function u(l){return s>999||l===null||l===91||l===93&&!c||l===94&&!s&&`_hiddenFootnoteSupport`in o.parser.constructs?n(l):l===93?(e.exit(a),e.enter(i),e.consume(l),e.exit(i),e.exit(r),t):H(l)?(e.enter(`lineEnding`),e.consume(l),e.exit(`lineEnding`),u):(e.enter(`chunkString`,{contentType:`string`}),d(l))}function d(t){return t===null||t===91||t===93||H(t)||s++>999?(e.exit(`chunkString`),u(t)):(e.consume(t),c||=!W(t),t===92?f:d)}function f(t){return t===91||t===92||t===93?(e.consume(t),s++,d):d(t)}}function Cn(e,t,n,r,i,a){let o;return s;function s(t){return t===34||t===39||t===40?(e.enter(r),e.enter(i),e.consume(t),e.exit(i),o=t===40?41:t,c):n(t)}function c(n){return n===o?(e.enter(i),e.consume(n),e.exit(i),e.exit(r),t):(e.enter(a),l(n))}function l(t){return t===o?(e.exit(a),c(o)):t===null?n(t):H(t)?(e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),K(e,l,`linePrefix`)):(e.enter(`chunkString`,{contentType:`string`}),u(t))}function u(t){return t===o||t===null||H(t)?(e.exit(`chunkString`),l(t)):(e.consume(t),t===92?d:u)}function d(t){return t===o||t===92?(e.consume(t),u):u(t)}}function wn(e,t){let n;return r;function r(i){return H(i)?(e.enter(`lineEnding`),e.consume(i),e.exit(`lineEnding`),n=!0,r):W(i)?K(e,r,n?`linePrefix`:`lineSuffix`)(i):t(i)}}var Tn={name:`definition`,tokenize:Dn},En={partial:!0,tokenize:On};function Dn(e,t,n){let r=this,i;return a;function a(t){return e.enter(`definition`),o(t)}function o(t){return Sn.call(r,e,s,n,`definitionLabel`,`definitionLabelMarker`,`definitionLabelString`)(t)}function s(t){return i=z(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),t===58?(e.enter(`definitionMarker`),e.consume(t),e.exit(`definitionMarker`),c):n(t)}function c(t){return U(t)?wn(e,l)(t):l(t)}function l(t){return xn(e,u,n,`definitionDestination`,`definitionDestinationLiteral`,`definitionDestinationLiteralMarker`,`definitionDestinationRaw`,`definitionDestinationString`)(t)}function u(t){return e.attempt(En,d,d)(t)}function d(t){return W(t)?K(e,f,`whitespace`)(t):f(t)}function f(a){return a===null||H(a)?(e.exit(`definition`),r.parser.defined.push(i),t(a)):n(a)}}function On(e,t,n){return r;function r(t){return U(t)?wn(e,i)(t):n(t)}function i(t){return Cn(e,a,n,`definitionTitle`,`definitionTitleMarker`,`definitionTitleString`)(t)}function a(t){return W(t)?K(e,o,`whitespace`)(t):o(t)}function o(e){return e===null||H(e)?t(e):n(e)}}var kn={name:`hardBreakEscape`,tokenize:An};function An(e,t,n){return r;function r(t){return e.enter(`hardBreakEscape`),e.consume(t),i}function i(r){return H(r)?(e.exit(`hardBreakEscape`),t(r)):n(r)}}var jn={name:`headingAtx`,resolve:Mn,tokenize:Nn};function Mn(e,t){let n=e.length-2,r=3,i,a;return e[r][1].type===`whitespace`&&(r+=2),n-2>r&&e[n][1].type===`whitespace`&&(n-=2),e[n][1].type===`atxHeadingSequence`&&(r===n-1||n-4>r&&e[n-2][1].type===`whitespace`)&&(n-=r+1===n?2:4),n>r&&(i={type:`atxHeadingText`,start:e[r][1].start,end:e[n][1].end},a={type:`chunkText`,start:e[r][1].start,end:e[n][1].end,contentType:`text`},L(e,r,n-r+1,[[`enter`,i,t],[`enter`,a,t],[`exit`,a,t],[`exit`,i,t]])),e}function Nn(e,t,n){let r=0;return i;function i(t){return e.enter(`atxHeading`),a(t)}function a(t){return e.enter(`atxHeadingSequence`),o(t)}function o(t){return t===35&&r++<6?(e.consume(t),o):t===null||U(t)?(e.exit(`atxHeadingSequence`),s(t)):n(t)}function s(n){return n===35?(e.enter(`atxHeadingSequence`),c(n)):n===null||H(n)?(e.exit(`atxHeading`),t(n)):W(n)?K(e,s,`whitespace`)(n):(e.enter(`atxHeadingText`),l(n))}function c(t){return t===35?(e.consume(t),c):(e.exit(`atxHeadingSequence`),s(t))}function l(t){return t===null||t===35||U(t)?(e.exit(`atxHeadingText`),s(t)):(e.consume(t),l)}}var Pn=`address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul`.split(`.`),Fn=[`pre`,`script`,`style`,`textarea`],In={concrete:!0,name:`htmlFlow`,resolveTo:zn,tokenize:Bn},Ln={partial:!0,tokenize:Hn},Rn={partial:!0,tokenize:Vn};function zn(e){let t=e.length;for(;t--&&!(e[t][0]===`enter`&&e[t][1].type===`htmlFlow`););return t>1&&e[t-2][1].type===`linePrefix`&&(e[t][1].start=e[t-2][1].start,e[t+1][1].start=e[t-2][1].start,e.splice(t-2,2)),e}function Bn(e,t,n){let r=this,i,a,o,s,c;return l;function l(e){return u(e)}function u(t){return e.enter(`htmlFlow`),e.enter(`htmlFlowData`),e.consume(t),d}function d(s){return s===33?(e.consume(s),f):s===47?(e.consume(s),a=!0,h):s===63?(e.consume(s),i=3,r.interrupt?t:P):B(s)?(e.consume(s),o=String.fromCharCode(s),g):n(s)}function f(a){return a===45?(e.consume(a),i=2,p):a===91?(e.consume(a),i=5,s=0,m):B(a)?(e.consume(a),i=4,r.interrupt?t:P):n(a)}function p(i){return i===45?(e.consume(i),r.interrupt?t:P):n(i)}function m(i){return i===`CDATA[`.charCodeAt(s++)?(e.consume(i),s===6?r.interrupt?t:D:m):n(i)}function h(t){return B(t)?(e.consume(t),o=String.fromCharCode(t),g):n(t)}function g(s){if(s===null||s===47||s===62||U(s)){let c=s===47,l=o.toLowerCase();return!c&&!a&&Fn.includes(l)?(i=1,r.interrupt?t(s):D(s)):Pn.includes(o.toLowerCase())?(i=6,c?(e.consume(s),_):r.interrupt?t(s):D(s)):(i=7,r.interrupt&&!r.parser.lazy[r.now().line]?n(s):a?v(s):y(s))}return s===45||V(s)?(e.consume(s),o+=String.fromCharCode(s),g):n(s)}function _(i){return i===62?(e.consume(i),r.interrupt?t:D):n(i)}function v(t){return W(t)?(e.consume(t),v):E(t)}function y(t){return t===47?(e.consume(t),E):t===58||t===95||B(t)?(e.consume(t),b):W(t)?(e.consume(t),y):E(t)}function b(t){return t===45||t===46||t===58||t===95||V(t)?(e.consume(t),b):x(t)}function x(t){return t===61?(e.consume(t),S):W(t)?(e.consume(t),x):y(t)}function S(t){return t===null||t===60||t===61||t===62||t===96?n(t):t===34||t===39?(e.consume(t),c=t,C):W(t)?(e.consume(t),S):w(t)}function C(t){return t===c?(e.consume(t),c=null,T):t===null||H(t)?n(t):(e.consume(t),C)}function w(t){return t===null||t===34||t===39||t===47||t===60||t===61||t===62||t===96||U(t)?x(t):(e.consume(t),w)}function T(e){return e===47||e===62||W(e)?y(e):n(e)}function E(t){return t===62?(e.consume(t),ee):n(t)}function ee(t){return t===null||H(t)?D(t):W(t)?(e.consume(t),ee):n(t)}function D(t){return t===45&&i===2?(e.consume(t),A):t===60&&i===1?(e.consume(t),j):t===62&&i===4?(e.consume(t),F):t===63&&i===3?(e.consume(t),P):t===93&&i===5?(e.consume(t),N):H(t)&&(i===6||i===7)?(e.exit(`htmlFlowData`),e.check(Ln,ne,O)(t)):t===null||H(t)?(e.exit(`htmlFlowData`),O(t)):(e.consume(t),D)}function O(t){return e.check(Rn,te,ne)(t)}function te(t){return e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),k}function k(t){return t===null||H(t)?O(t):(e.enter(`htmlFlowData`),D(t))}function A(t){return t===45?(e.consume(t),P):D(t)}function j(t){return t===47?(e.consume(t),o=``,M):D(t)}function M(t){if(t===62){let n=o.toLowerCase();return Fn.includes(n)?(e.consume(t),F):D(t)}return B(t)&&o.length<8?(e.consume(t),o+=String.fromCharCode(t),M):D(t)}function N(t){return t===93?(e.consume(t),P):D(t)}function P(t){return t===62?(e.consume(t),F):t===45&&i===2?(e.consume(t),P):D(t)}function F(t){return t===null||H(t)?(e.exit(`htmlFlowData`),ne(t)):(e.consume(t),F)}function ne(n){return e.exit(`htmlFlow`),t(n)}}function Vn(e,t,n){let r=this;return i;function i(t){return H(t)?(e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),a):n(t)}function a(e){return r.parser.lazy[r.now().line]?n(e):t(e)}}function Hn(e,t,n){return r;function r(r){return e.enter(`lineEnding`),e.consume(r),e.exit(`lineEnding`),e.attempt(Ut,t,n)}}var Un={name:`htmlText`,tokenize:Wn};function Wn(e,t,n){let r=this,i,a,o;return s;function s(t){return e.enter(`htmlText`),e.enter(`htmlTextData`),e.consume(t),c}function c(t){return t===33?(e.consume(t),l):t===47?(e.consume(t),x):t===63?(e.consume(t),y):B(t)?(e.consume(t),w):n(t)}function l(t){return t===45?(e.consume(t),u):t===91?(e.consume(t),a=0,m):B(t)?(e.consume(t),v):n(t)}function u(t){return t===45?(e.consume(t),p):n(t)}function d(t){return t===null?n(t):t===45?(e.consume(t),f):H(t)?(o=d,j(t)):(e.consume(t),d)}function f(t){return t===45?(e.consume(t),p):d(t)}function p(e){return e===62?A(e):e===45?f(e):d(e)}function m(t){return t===`CDATA[`.charCodeAt(a++)?(e.consume(t),a===6?h:m):n(t)}function h(t){return t===null?n(t):t===93?(e.consume(t),g):H(t)?(o=h,j(t)):(e.consume(t),h)}function g(t){return t===93?(e.consume(t),_):h(t)}function _(t){return t===62?A(t):t===93?(e.consume(t),_):h(t)}function v(t){return t===null||t===62?A(t):H(t)?(o=v,j(t)):(e.consume(t),v)}function y(t){return t===null?n(t):t===63?(e.consume(t),b):H(t)?(o=y,j(t)):(e.consume(t),y)}function b(e){return e===62?A(e):y(e)}function x(t){return B(t)?(e.consume(t),S):n(t)}function S(t){return t===45||V(t)?(e.consume(t),S):C(t)}function C(t){return H(t)?(o=C,j(t)):W(t)?(e.consume(t),C):A(t)}function w(t){return t===45||V(t)?(e.consume(t),w):t===47||t===62||U(t)?T(t):n(t)}function T(t){return t===47?(e.consume(t),A):t===58||t===95||B(t)?(e.consume(t),E):H(t)?(o=T,j(t)):W(t)?(e.consume(t),T):A(t)}function E(t){return t===45||t===46||t===58||t===95||V(t)?(e.consume(t),E):ee(t)}function ee(t){return t===61?(e.consume(t),D):H(t)?(o=ee,j(t)):W(t)?(e.consume(t),ee):T(t)}function D(t){return t===null||t===60||t===61||t===62||t===96?n(t):t===34||t===39?(e.consume(t),i=t,O):H(t)?(o=D,j(t)):W(t)?(e.consume(t),D):(e.consume(t),te)}function O(t){return t===i?(e.consume(t),i=void 0,k):t===null?n(t):H(t)?(o=O,j(t)):(e.consume(t),O)}function te(t){return t===null||t===34||t===39||t===60||t===61||t===96?n(t):t===47||t===62||U(t)?T(t):(e.consume(t),te)}function k(e){return e===47||e===62||U(e)?T(e):n(e)}function A(r){return r===62?(e.consume(r),e.exit(`htmlTextData`),e.exit(`htmlText`),t):n(r)}function j(t){return e.exit(`htmlTextData`),e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),M}function M(t){return W(t)?K(e,N,`linePrefix`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)(t):N(t)}function N(t){return e.enter(`htmlTextData`),o(t)}}var Gn={name:`labelEnd`,resolveAll:Yn,resolveTo:Xn,tokenize:Zn},Kn={tokenize:Qn},qn={tokenize:$n},Jn={tokenize:er};function Yn(e){let t=-1,n=[];for(;++t<e.length;){let r=e[t][1];if(n.push(e[t]),r.type===`labelImage`||r.type===`labelLink`||r.type===`labelEnd`){let e=r.type===`labelImage`?4:2;r.type=`data`,t+=e}}return e.length!==n.length&&L(e,0,e.length,n),e}function Xn(e,t){let n=e.length,r=0,i,a,o,s;for(;n--;)if(i=e[n][1],a){if(i.type===`link`||i.type===`labelLink`&&i._inactive)break;e[n][0]===`enter`&&i.type===`labelLink`&&(i._inactive=!0)}else if(o){if(e[n][0]===`enter`&&(i.type===`labelImage`||i.type===`labelLink`)&&!i._balanced&&(a=n,i.type!==`labelLink`)){r=2;break}}else i.type===`labelEnd`&&(o=n);let c={type:e[a][1].type===`labelLink`?`link`:`image`,start:{...e[a][1].start},end:{...e[e.length-1][1].end}},l={type:`label`,start:{...e[a][1].start},end:{...e[o][1].end}},u={type:`labelText`,start:{...e[a+r+2][1].end},end:{...e[o-2][1].start}};return s=[[`enter`,c,t],[`enter`,l,t]],s=R(s,e.slice(a+1,a+r+3)),s=R(s,[[`enter`,u,t]]),s=R(s,It(t.parser.constructs.insideSpan.null,e.slice(a+r+4,o-3),t)),s=R(s,[[`exit`,u,t],e[o-2],e[o-1],[`exit`,l,t]]),s=R(s,e.slice(o+1)),s=R(s,[[`exit`,c,t]]),L(e,a,e.length,s),e}function Zn(e,t,n){let r=this,i=r.events.length,a,o;for(;i--;)if((r.events[i][1].type===`labelImage`||r.events[i][1].type===`labelLink`)&&!r.events[i][1]._balanced){a=r.events[i][1];break}return s;function s(t){return a?a._inactive?d(t):(o=r.parser.defined.includes(z(r.sliceSerialize({start:a.end,end:r.now()}))),e.enter(`labelEnd`),e.enter(`labelMarker`),e.consume(t),e.exit(`labelMarker`),e.exit(`labelEnd`),c):n(t)}function c(t){return t===40?e.attempt(Kn,u,o?u:d)(t):t===91?e.attempt(qn,u,o?l:d)(t):o?u(t):d(t)}function l(t){return e.attempt(Jn,u,d)(t)}function u(e){return t(e)}function d(e){return a._balanced=!0,n(e)}}function Qn(e,t,n){return r;function r(t){return e.enter(`resource`),e.enter(`resourceMarker`),e.consume(t),e.exit(`resourceMarker`),i}function i(t){return U(t)?wn(e,a)(t):a(t)}function a(t){return t===41?u(t):xn(e,o,s,`resourceDestination`,`resourceDestinationLiteral`,`resourceDestinationLiteralMarker`,`resourceDestinationRaw`,`resourceDestinationString`,32)(t)}function o(t){return U(t)?wn(e,c)(t):u(t)}function s(e){return n(e)}function c(t){return t===34||t===39||t===40?Cn(e,l,n,`resourceTitle`,`resourceTitleMarker`,`resourceTitleString`)(t):u(t)}function l(t){return U(t)?wn(e,u)(t):u(t)}function u(r){return r===41?(e.enter(`resourceMarker`),e.consume(r),e.exit(`resourceMarker`),e.exit(`resource`),t):n(r)}}function $n(e,t,n){let r=this;return i;function i(t){return Sn.call(r,e,a,o,`reference`,`referenceMarker`,`referenceString`)(t)}function a(e){return r.parser.defined.includes(z(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?t(e):n(e)}function o(e){return n(e)}}function er(e,t,n){return r;function r(t){return e.enter(`reference`),e.enter(`referenceMarker`),e.consume(t),e.exit(`referenceMarker`),i}function i(r){return r===93?(e.enter(`referenceMarker`),e.consume(r),e.exit(`referenceMarker`),e.exit(`reference`),t):n(r)}}var tr={name:`labelStartImage`,resolveAll:Gn.resolveAll,tokenize:nr};function nr(e,t,n){let r=this;return i;function i(t){return e.enter(`labelImage`),e.enter(`labelImageMarker`),e.consume(t),e.exit(`labelImageMarker`),a}function a(t){return t===91?(e.enter(`labelMarker`),e.consume(t),e.exit(`labelMarker`),e.exit(`labelImage`),o):n(t)}function o(e){return e===94&&`_hiddenFootnoteSupport`in r.parser.constructs?n(e):t(e)}}var rr={name:`labelStartLink`,resolveAll:Gn.resolveAll,tokenize:ir};function ir(e,t,n){let r=this;return i;function i(t){return e.enter(`labelLink`),e.enter(`labelMarker`),e.consume(t),e.exit(`labelMarker`),e.exit(`labelLink`),a}function a(e){return e===94&&`_hiddenFootnoteSupport`in r.parser.constructs?n(e):t(e)}}var ar={name:`lineEnding`,tokenize:or};function or(e,t){return n;function n(n){return e.enter(`lineEnding`),e.consume(n),e.exit(`lineEnding`),K(e,t,`linePrefix`)}}var sr={name:`thematicBreak`,tokenize:cr};function cr(e,t,n){let r=0,i;return a;function a(t){return e.enter(`thematicBreak`),o(t)}function o(e){return i=e,s(e)}function s(a){return a===i?(e.enter(`thematicBreakSequence`),c(a)):r>=3&&(a===null||H(a))?(e.exit(`thematicBreak`),t(a)):n(a)}function c(t){return t===i?(e.consume(t),r++,c):(e.exit(`thematicBreakSequence`),W(t)?K(e,s,`whitespace`)(t):s(t))}}var q={continuation:{tokenize:fr},exit:mr,name:`list`,tokenize:dr},lr={partial:!0,tokenize:hr},ur={partial:!0,tokenize:pr};function dr(e,t,n){let r=this,i=r.events[r.events.length-1],a=i&&i[1].type===`linePrefix`?i[2].sliceSerialize(i[1],!0).length:0,o=0;return s;function s(t){let i=r.containerState.type||(t===42||t===43||t===45?`listUnordered`:`listOrdered`);if(i===`listUnordered`?!r.containerState.marker||t===r.containerState.marker:Ct(t)){if(r.containerState.type||(r.containerState.type=i,e.enter(i,{_container:!0})),i===`listUnordered`)return e.enter(`listItemPrefix`),t===42||t===45?e.check(sr,n,l)(t):l(t);if(!r.interrupt||t===49)return e.enter(`listItemPrefix`),e.enter(`listItemValue`),c(t)}return n(t)}function c(t){return Ct(t)&&++o<10?(e.consume(t),c):(!r.interrupt||o<2)&&(r.containerState.marker?t===r.containerState.marker:t===41||t===46)?(e.exit(`listItemValue`),l(t)):n(t)}function l(t){return e.enter(`listItemMarker`),e.consume(t),e.exit(`listItemMarker`),r.containerState.marker=r.containerState.marker||t,e.check(Ut,r.interrupt?n:u,e.attempt(lr,f,d))}function u(e){return r.containerState.initialBlankLine=!0,a++,f(e)}function d(t){return W(t)?(e.enter(`listItemPrefixWhitespace`),e.consume(t),e.exit(`listItemPrefixWhitespace`),f):n(t)}function f(n){return r.containerState.size=a+r.sliceSerialize(e.exit(`listItemPrefix`),!0).length,t(n)}}function fr(e,t,n){let r=this;return r.containerState._closeFlow=void 0,e.check(Ut,i,a);function i(n){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,K(e,t,`listItemIndent`,r.containerState.size+1)(n)}function a(n){return r.containerState.furtherBlankLines||!W(n)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,o(n)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,e.attempt(ur,t,o)(n))}function o(i){return r.containerState._closeFlow=!0,r.interrupt=void 0,K(e,e.attempt(q,t,n),`linePrefix`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)(i)}}function pr(e,t,n){let r=this;return K(e,i,`listItemIndent`,r.containerState.size+1);function i(e){let i=r.events[r.events.length-1];return i&&i[1].type===`listItemIndent`&&i[2].sliceSerialize(i[1],!0).length===r.containerState.size?t(e):n(e)}}function mr(e){e.exit(this.containerState.type)}function hr(e,t,n){let r=this;return K(e,i,`listItemPrefixWhitespace`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:5);function i(e){let i=r.events[r.events.length-1];return!W(e)&&i&&i[1].type===`listItemPrefixWhitespace`?t(e):n(e)}}var gr={name:`setextUnderline`,resolveTo:_r,tokenize:vr};function _r(e,t){let n=e.length,r,i,a;for(;n--;)if(e[n][0]===`enter`){if(e[n][1].type===`content`){r=n;break}e[n][1].type===`paragraph`&&(i=n)}else e[n][1].type===`content`&&e.splice(n,1),!a&&e[n][1].type===`definition`&&(a=n);let o={type:`setextHeading`,start:{...e[r][1].start},end:{...e[e.length-1][1].end}};return e[i][1].type=`setextHeadingText`,a?(e.splice(i,0,[`enter`,o,t]),e.splice(a+1,0,[`exit`,e[r][1],t]),e[r][1].end={...e[a][1].end}):e[r][1]=o,e.push([`exit`,o,t]),e}function vr(e,t,n){let r=this,i;return a;function a(t){let a=r.events.length,s;for(;a--;)if(r.events[a][1].type!==`lineEnding`&&r.events[a][1].type!==`linePrefix`&&r.events[a][1].type!==`content`){s=r.events[a][1].type===`paragraph`;break}return!r.parser.lazy[r.now().line]&&(r.interrupt||s)?(e.enter(`setextHeadingLine`),i=t,o(t)):n(t)}function o(t){return e.enter(`setextHeadingLineSequence`),s(t)}function s(t){return t===i?(e.consume(t),s):(e.exit(`setextHeadingLineSequence`),W(t)?K(e,c,`lineSuffix`)(t):c(t))}function c(r){return r===null||H(r)?(e.exit(`setextHeadingLine`),t(r)):n(r)}}var yr={tokenize:br};function br(e){let t=this,n=e.attempt(Ut,r,e.attempt(this.parser.constructs.flowInitial,i,K(e,e.attempt(this.parser.constructs.flow,i,e.attempt(gn,i)),`linePrefix`)));return n;function r(r){if(r===null){e.consume(r);return}return e.enter(`lineEndingBlank`),e.consume(r),e.exit(`lineEndingBlank`),t.currentConstruct=void 0,n}function i(r){if(r===null){e.consume(r);return}return e.enter(`lineEnding`),e.consume(r),e.exit(`lineEnding`),t.currentConstruct=void 0,n}}var xr={resolveAll:Tr()},Sr=wr(`string`),Cr=wr(`text`);function wr(e){return{resolveAll:Tr(e===`text`?Er:void 0),tokenize:t};function t(t){let n=this,r=this.parser.constructs[e],i=t.attempt(r,a,o);return a;function a(e){return c(e)?i(e):o(e)}function o(e){if(e===null){t.consume(e);return}return t.enter(`data`),t.consume(e),s}function s(e){return c(e)?(t.exit(`data`),i(e)):(t.consume(e),s)}function c(e){if(e===null)return!0;let t=r[e],i=-1;if(t)for(;++i<t.length;){let e=t[i];if(!e.previous||e.previous.call(n,n.previous))return!0}return!1}}}function Tr(e){return t;function t(t,n){let r=-1,i;for(;++r<=t.length;)i===void 0?t[r]&&t[r][1].type===`data`&&(i=r,r++):(!t[r]||t[r][1].type!==`data`)&&(r!==i+2&&(t[i][1].end=t[r-1][1].end,t.splice(i+2,r-i-2),r=i+2),i=void 0);return e?e(t,n):t}}function Er(e,t){let n=0;for(;++n<=e.length;)if((n===e.length||e[n][1].type===`lineEnding`)&&e[n-1][1].type===`data`){let r=e[n-1][1],i=t.sliceStream(r),a=i.length,o=-1,s=0,c;for(;a--;){let e=i[a];if(typeof e==`string`){for(o=e.length;e.charCodeAt(o-1)===32;)s++,o--;if(o)break;o=-1}else if(e===-2)c=!0,s++;else if(e!==-1){a++;break}}if(t._contentTypeTextTrailing&&n===e.length&&(s=0),s){let i={type:n===e.length||c||s<2?`lineSuffix`:`hardBreakTrailing`,start:{_bufferIndex:a?o:r.start._bufferIndex+o,_index:r.start._index+a,line:r.end.line,column:r.end.column-s,offset:r.end.offset-s},end:{...r.end}};r.end={...i.start},r.start.offset===r.end.offset?Object.assign(r,i):(e.splice(n,0,[`enter`,i,t],[`exit`,i,t]),n+=2)}n++}return e}var Dr=e({attentionMarkers:()=>Fr,contentInitial:()=>kr,disable:()=>Ir,document:()=>Or,flow:()=>jr,flowInitial:()=>Ar,insideSpan:()=>Pr,string:()=>Mr,text:()=>Nr}),Or={42:q,43:q,45:q,48:q,49:q,50:q,51:q,52:q,53:q,54:q,55:q,56:q,57:q,62:Gt},kr={91:Tn},Ar={[-2]:rn,[-1]:rn,32:rn},jr={35:jn,42:sr,45:[gr,sr],60:In,61:gr,95:sr,96:en,126:en},Mr={38:Zt,92:Yt},Nr={[-5]:ar,[-4]:ar,[-3]:ar,33:tr,38:Zt,42:Lt,60:[Vt,Un],91:rr,92:[kn,Yt],93:Gn,95:Lt,96:cn},Pr={null:[Lt,xr]},Fr={null:[42,95]},Ir={null:[]};function Lr(e,t,n){let r={_bufferIndex:-1,_index:0,line:n&&n.line||1,column:n&&n.column||1,offset:n&&n.offset||0},i={},a=[],o=[],s=[],c={attempt:C(x),check:C(S),consume:v,enter:y,exit:b,interrupt:C(S,{interrupt:!0})},l={code:null,containerState:{},defineSkip:h,events:[],now:m,parser:e,previous:null,sliceSerialize:f,sliceStream:p,write:d},u=t.tokenize.call(l,c);return t.resolveAll&&a.push(t),l;function d(e){return o=R(o,e),g(),o[o.length-1]===null?(w(t,0),l.events=It(a,l.events,l),l.events):[]}function f(e,t){return zr(p(e),t)}function p(e){return Rr(o,e)}function m(){let{_bufferIndex:e,_index:t,line:n,column:i,offset:a}=r;return{_bufferIndex:e,_index:t,line:n,column:i,offset:a}}function h(e){i[e.line]=e.column,E()}function g(){let e;for(;r._index<o.length;){let t=o[r._index];if(typeof t==`string`)for(e=r._index,r._bufferIndex<0&&(r._bufferIndex=0);r._index===e&&r._bufferIndex<t.length;)_(t.charCodeAt(r._bufferIndex));else _(t)}}function _(e){u=u(e)}function v(e){H(e)?(r.line++,r.column=1,r.offset+=e===-3?2:1,E()):e!==-1&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===o[r._index].length&&(r._bufferIndex=-1,r._index++)),l.previous=e}function y(e,t){let n=t||{};return n.type=e,n.start=m(),l.events.push([`enter`,n,l]),s.push(n),n}function b(e){let t=s.pop();return t.end=m(),l.events.push([`exit`,t,l]),t}function x(e,t){w(e,t.from)}function S(e,t){t.restore()}function C(e,t){return n;function n(n,r,i){let a,o,s,u;return Array.isArray(n)?f(n):`tokenize`in n?f([n]):d(n);function d(e){return t;function t(t){let n=t!==null&&e[t],r=t!==null&&e.null;return f([...Array.isArray(n)?n:n?[n]:[],...Array.isArray(r)?r:r?[r]:[]])(t)}}function f(e){return a=e,o=0,e.length===0?i:p(e[o])}function p(e){return n;function n(n){return u=T(),s=e,e.partial||(l.currentConstruct=e),e.name&&l.parser.constructs.disable.null.includes(e.name)?h(n):e.tokenize.call(t?Object.assign(Object.create(l),t):l,c,m,h)(n)}}function m(t){return e(s,u),r}function h(e){return u.restore(),++o<a.length?p(a[o]):i}}}function w(e,t){e.resolveAll&&!a.includes(e)&&a.push(e),e.resolve&&L(l.events,t,l.events.length-t,e.resolve(l.events.slice(t),l)),e.resolveTo&&(l.events=e.resolveTo(l.events,l))}function T(){let e=m(),t=l.previous,n=l.currentConstruct,i=l.events.length,a=Array.from(s);return{from:i,restore:o};function o(){r=e,l.previous=t,l.currentConstruct=n,l.events.length=i,s=a,E()}}function E(){r.line in i&&r.column<2&&(r.column=i[r.line],r.offset+=i[r.line]-1)}}function Rr(e,t){let n=t.start._index,r=t.start._bufferIndex,i=t.end._index,a=t.end._bufferIndex,o;if(n===i)o=[e[n].slice(r,a)];else{if(o=e.slice(n,i),r>-1){let e=o[0];typeof e==`string`?o[0]=e.slice(r):o.shift()}a>0&&o.push(e[i].slice(0,a))}return o}function zr(e,t){let n=-1,r=[],i;for(;++n<e.length;){let a=e[n],o;if(typeof a==`string`)o=a;else switch(a){case-5:o=`\r`;break;case-4:o=`
`;break;case-3:o=`\r
`;break;case-2:o=t?` `:`	`;break;case-1:if(!t&&i)continue;o=` `;break;default:o=String.fromCharCode(a)}i=a===-2,r.push(o)}return r.join(``)}function Br(e){let t={constructs:_t([Dr,...(e||{}).extensions||[]]),content:n(kt),defined:[],document:n(jt),flow:n(yr),lazy:{},string:n(Sr),text:n(Cr)};return t;function n(e){return n;function n(n){return Lr(t,e,n)}}}function Vr(e){for(;!mn(e););return e}var Hr=/[\0\t\n\r]/g;function Ur(){let e=1,t=``,n=!0,r;return i;function i(i,a,o){let s=[],c,l,u,d,f;for(i=t+(typeof i==`string`?i.toString():new TextDecoder(a||void 0).decode(i)),u=0,t=``,n&&=(i.charCodeAt(0)===65279&&u++,void 0);u<i.length;){if(Hr.lastIndex=u,c=Hr.exec(i),d=c&&c.index!==void 0?c.index:i.length,f=i.charCodeAt(d),!c){t=i.slice(u);break}if(f===10&&u===d&&r)s.push(-3),r=void 0;else switch(r&&=(s.push(-5),void 0),u<d&&(s.push(i.slice(u,d)),e+=d-u),f){case 0:s.push(65533),e++;break;case 9:for(l=Math.ceil(e/4)*4,s.push(-2);e++<l;)s.push(-1);break;case 10:s.push(-4),e=1;break;default:r=!0,e=1}u=d+1}return o&&(r&&s.push(-5),t&&s.push(t),s.push(null)),s}}var Wr=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function Gr(e){return e.replace(Wr,Kr)}function Kr(e,t,n){if(t)return t;if(n.charCodeAt(0)===35){let e=n.charCodeAt(1),t=e===120||e===88;return bt(n.slice(t?2:1),t?16:10)}return ht(n)||e}var qr={}.hasOwnProperty;function Jr(e,t,n){return t&&typeof t==`object`&&(n=t,t=void 0),Yr(n)(Vr(Br(n).document().write(Ur()(e,t,!0))))}function Yr(e){let t={transforms:[],canContainEols:[`emphasis`,`fragment`,`heading`,`paragraph`,`strong`],enter:{autolink:a(ye),autolinkProtocol:T,autolinkEmail:T,atxHeading:a(he),blockQuote:a(ue),characterEscape:T,characterReference:T,codeFenced:a(de),codeFencedFenceInfo:o,codeFencedFenceMeta:o,codeIndented:a(de,o),codeText:a(fe,o),codeTextData:T,data:T,codeFlowValue:T,definition:a(pe),definitionDestinationString:o,definitionLabelString:o,definitionTitleString:o,emphasis:a(me),hardBreakEscape:a(ge),hardBreakTrailing:a(ge),htmlFlow:a(_e,o),htmlFlowData:T,htmlText:a(_e,o),htmlTextData:T,image:a(ve),label:o,link:a(ye),listItem:a(xe),listItemValue:f,listOrdered:a(be,d),listUnordered:a(be),paragraph:a(Se),reference:re,referenceString:o,resourceDestinationString:o,resourceTitleString:o,setextHeading:a(he),strong:a(Ce),thematicBreak:a(Te)},exit:{atxHeading:c(),atxHeadingSequence:x,autolink:c(),autolinkEmail:le,autolinkProtocol:ce,blockQuote:c(),characterEscapeValue:E,characterReferenceMarkerHexadecimal:ae,characterReferenceMarkerNumeric:ae,characterReferenceValue:oe,characterReference:se,codeFenced:c(g),codeFencedFence:h,codeFencedFenceInfo:p,codeFencedFenceMeta:m,codeFlowValue:E,codeIndented:c(_),codeText:c(k),codeTextData:E,data:E,definition:c(),definitionDestinationString:b,definitionLabelString:v,definitionTitleString:y,emphasis:c(),hardBreakEscape:c(D),hardBreakTrailing:c(D),htmlFlow:c(O),htmlFlowData:E,htmlText:c(te),htmlTextData:E,image:c(j),label:N,labelText:M,lineEnding:ee,link:c(A),listItem:c(),listOrdered:c(),listUnordered:c(),paragraph:c(),referenceString:ie,resourceDestinationString:P,resourceTitleString:F,resource:ne,setextHeading:c(w),setextHeadingLineSequence:C,setextHeadingText:S,strong:c(),thematicBreak:c()}};Xr(t,(e||{}).mdastExtensions||[]);let n={};return r;function r(e){let r={type:`root`,children:[]},a={stack:[r],tokenStack:[],config:t,enter:s,exit:l,buffer:o,resume:u,data:n},c=[],d=-1;for(;++d<e.length;)(e[d][1].type===`listOrdered`||e[d][1].type===`listUnordered`)&&(e[d][0]===`enter`?c.push(d):d=i(e,c.pop(),d));for(d=-1;++d<e.length;){let n=t[e[d][0]];qr.call(n,e[d][1].type)&&n[e[d][1].type].call(Object.assign({sliceSerialize:e[d][2].sliceSerialize},a),e[d][1])}if(a.tokenStack.length>0){let e=a.tokenStack[a.tokenStack.length-1];(e[1]||Qr).call(a,void 0,e[0])}for(r.position={start:J(e.length>0?e[0][1].start:{line:1,column:1,offset:0}),end:J(e.length>0?e[e.length-2][1].end:{line:1,column:1,offset:0})},d=-1;++d<t.transforms.length;)r=t.transforms[d](r)||r;return r}function i(e,t,n){let r=t-1,i=-1,a=!1,o,s,c,l;for(;++r<=n;){let t=e[r];switch(t[1].type){case`listUnordered`:case`listOrdered`:case`blockQuote`:t[0]===`enter`?i++:i--,l=void 0;break;case`lineEndingBlank`:t[0]===`enter`&&(o&&!l&&!i&&!c&&(c=r),l=void 0);break;case`linePrefix`:case`listItemValue`:case`listItemMarker`:case`listItemPrefix`:case`listItemPrefixWhitespace`:break;default:l=void 0}if(!i&&t[0]===`enter`&&t[1].type===`listItemPrefix`||i===-1&&t[0]===`exit`&&(t[1].type===`listUnordered`||t[1].type===`listOrdered`)){if(o){let i=r;for(s=void 0;i--;){let t=e[i];if(t[1].type===`lineEnding`||t[1].type===`lineEndingBlank`){if(t[0]===`exit`)continue;s&&(e[s][1].type=`lineEndingBlank`,a=!0),t[1].type=`lineEnding`,s=i}else if(!(t[1].type===`linePrefix`||t[1].type===`blockQuotePrefix`||t[1].type===`blockQuotePrefixWhitespace`||t[1].type===`blockQuoteMarker`||t[1].type===`listItemIndent`))break}c&&(!s||c<s)&&(o._spread=!0),o.end=Object.assign({},s?e[s][1].start:t[1].end),e.splice(s||r,0,[`exit`,o,t[2]]),r++,n++}if(t[1].type===`listItemPrefix`){let i={type:`listItem`,_spread:!1,start:Object.assign({},t[1].start),end:void 0};o=i,e.splice(r,0,[`enter`,i,t[2]]),r++,n++,c=void 0,l=!0}}}return e[t][1]._spread=a,n}function a(e,t){return n;function n(n){s.call(this,e(n),n),t&&t.call(this,n)}}function o(){this.stack.push({type:`fragment`,children:[]})}function s(e,t,n){this.stack[this.stack.length-1].children.push(e),this.stack.push(e),this.tokenStack.push([t,n||void 0]),e.position={start:J(t.start),end:void 0}}function c(e){return t;function t(t){e&&e.call(this,t),l.call(this,t)}}function l(e,t){let n=this.stack.pop(),r=this.tokenStack.pop();if(r)r[0].type!==e.type&&(t?t.call(this,e,r[0]):(r[1]||Qr).call(this,e,r[0]));else throw Error("Cannot close `"+e.type+"` ("+Ae({start:e.start,end:e.end})+`): it’s not open`);n.position.end=J(e.end)}function u(){return ut(this.stack.pop())}function d(){this.data.expectingFirstListItemValue=!0}function f(e){if(this.data.expectingFirstListItemValue){let t=this.stack[this.stack.length-2];t.start=Number.parseInt(this.sliceSerialize(e),10),this.data.expectingFirstListItemValue=void 0}}function p(){let e=this.resume(),t=this.stack[this.stack.length-1];t.lang=e}function m(){let e=this.resume(),t=this.stack[this.stack.length-1];t.meta=e}function h(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function g(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,``),this.data.flowCodeInside=void 0}function _(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e.replace(/(\r?\n|\r)$/g,``)}function v(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=z(this.sliceSerialize(e)).toLowerCase()}function y(){let e=this.resume(),t=this.stack[this.stack.length-1];t.title=e}function b(){let e=this.resume(),t=this.stack[this.stack.length-1];t.url=e}function x(e){let t=this.stack[this.stack.length-1];t.depth||=this.sliceSerialize(e).length}function S(){this.data.setextHeadingSlurpLineEnding=!0}function C(e){let t=this.stack[this.stack.length-1];t.depth=this.sliceSerialize(e).codePointAt(0)===61?1:2}function w(){this.data.setextHeadingSlurpLineEnding=void 0}function T(e){let t=this.stack[this.stack.length-1].children,n=t[t.length-1];(!n||n.type!==`text`)&&(n=we(),n.position={start:J(e.start),end:void 0},t.push(n)),this.stack.push(n)}function E(e){let t=this.stack.pop();t.value+=this.sliceSerialize(e),t.position.end=J(e.end)}function ee(e){let n=this.stack[this.stack.length-1];if(this.data.atHardBreak){let t=n.children[n.children.length-1];t.position.end=J(e.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes(n.type)&&(T.call(this,e),E.call(this,e))}function D(){this.data.atHardBreak=!0}function O(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e}function te(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e}function k(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e}function A(){let e=this.stack[this.stack.length-1];if(this.data.inReference){let t=this.data.referenceType||`shortcut`;e.type+=`Reference`,e.referenceType=t,delete e.url,delete e.title}else delete e.identifier,delete e.label;this.data.referenceType=void 0}function j(){let e=this.stack[this.stack.length-1];if(this.data.inReference){let t=this.data.referenceType||`shortcut`;e.type+=`Reference`,e.referenceType=t,delete e.url,delete e.title}else delete e.identifier,delete e.label;this.data.referenceType=void 0}function M(e){let t=this.sliceSerialize(e),n=this.stack[this.stack.length-2];n.label=Gr(t),n.identifier=z(t).toLowerCase()}function N(){let e=this.stack[this.stack.length-1],t=this.resume(),n=this.stack[this.stack.length-1];this.data.inReference=!0,n.type===`link`?n.children=e.children:n.alt=t}function P(){let e=this.resume(),t=this.stack[this.stack.length-1];t.url=e}function F(){let e=this.resume(),t=this.stack[this.stack.length-1];t.title=e}function ne(){this.data.inReference=void 0}function re(){this.data.referenceType=`collapsed`}function ie(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=z(this.sliceSerialize(e)).toLowerCase(),this.data.referenceType=`full`}function ae(e){this.data.characterReferenceType=e.type}function oe(e){let t=this.sliceSerialize(e),n=this.data.characterReferenceType,r;n?(r=bt(t,n===`characterReferenceMarkerNumeric`?10:16),this.data.characterReferenceType=void 0):r=ht(t);let i=this.stack[this.stack.length-1];i.value+=r}function se(e){let t=this.stack.pop();t.position.end=J(e.end)}function ce(e){E.call(this,e);let t=this.stack[this.stack.length-1];t.url=this.sliceSerialize(e)}function le(e){E.call(this,e);let t=this.stack[this.stack.length-1];t.url=`mailto:`+this.sliceSerialize(e)}function ue(){return{type:`blockquote`,children:[]}}function de(){return{type:`code`,lang:null,meta:null,value:``}}function fe(){return{type:`inlineCode`,value:``}}function pe(){return{type:`definition`,identifier:``,label:null,title:null,url:``}}function me(){return{type:`emphasis`,children:[]}}function he(){return{type:`heading`,depth:0,children:[]}}function ge(){return{type:`break`}}function _e(){return{type:`html`,value:``}}function ve(){return{type:`image`,title:null,url:``,alt:null}}function ye(){return{type:`link`,title:null,url:``,children:[]}}function be(e){return{type:`list`,ordered:e.type===`listOrdered`,start:null,spread:e._spread,children:[]}}function xe(e){return{type:`listItem`,spread:e._spread,checked:null,children:[]}}function Se(){return{type:`paragraph`,children:[]}}function Ce(){return{type:`strong`,children:[]}}function we(){return{type:`text`,value:``}}function Te(){return{type:`thematicBreak`}}}function J(e){return{line:e.line,column:e.column,offset:e.offset}}function Xr(e,t){let n=-1;for(;++n<t.length;){let r=t[n];Array.isArray(r)?Xr(e,r):Zr(e,r)}}function Zr(e,t){let n;for(n in t)if(qr.call(t,n))switch(n){case`canContainEols`:{let r=t[n];r&&e[n].push(...r);break}case`transforms`:{let r=t[n];r&&e[n].push(...r);break}case`enter`:case`exit`:{let r=t[n];r&&Object.assign(e[n],r);break}}}function Qr(e,t){throw Error(e?"Cannot close `"+e.type+"` ("+Ae({start:e.start,end:e.end})+"): a different token (`"+t.type+"`, "+Ae({start:t.start,end:t.end})+`) is open`:"Cannot close document, a token (`"+t.type+"`, "+Ae({start:t.start,end:t.end})+`) is still open`)}function $r(e){let t=this;t.parser=n;function n(n){return Jr(n,{...t.data(`settings`),...e,extensions:t.data(`micromarkExtensions`)||[],mdastExtensions:t.data(`fromMarkdownExtensions`)||[]})}}function ei(e,t){let n={type:`element`,tagName:`blockquote`,properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)}function ti(e,t){let n={type:`element`,tagName:`br`,properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:`text`,value:`
`}]}function ni(e,t){let n=t.value?t.value+`
`:``,r={},i=t.lang?t.lang.split(/\s+/):[];i.length>0&&(r.className=[`language-`+i[0]]);let a={type:`element`,tagName:`code`,properties:r,children:[{type:`text`,value:n}]};return t.meta&&(a.data={meta:t.meta}),e.patch(t,a),a=e.applyData(t,a),a={type:`element`,tagName:`pre`,properties:{},children:[a]},e.patch(t,a),a}function ri(e,t){let n={type:`element`,tagName:`del`,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function ii(e,t){let n={type:`element`,tagName:`em`,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function ai(e,t){let n=typeof e.options.clobberPrefix==`string`?e.options.clobberPrefix:`user-content-`,r=String(t.identifier).toUpperCase(),i=Ot(r.toLowerCase()),a=e.footnoteOrder.indexOf(r),o,s=e.footnoteCounts.get(r);s===void 0?(s=0,e.footnoteOrder.push(r),o=e.footnoteOrder.length):o=a+1,s+=1,e.footnoteCounts.set(r,s);let c={type:`element`,tagName:`a`,properties:{href:`#`+n+`fn-`+i,id:n+`fnref-`+i+(s>1?`-`+s:``),dataFootnoteRef:!0,ariaDescribedBy:[`footnote-label`]},children:[{type:`text`,value:String(o)}]};e.patch(t,c);let l={type:`element`,tagName:`sup`,properties:{},children:[c]};return e.patch(t,l),e.applyData(t,l)}function oi(e,t){let n={type:`element`,tagName:`h`+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function si(e,t){if(e.options.allowDangerousHtml){let n={type:`raw`,value:t.value};return e.patch(t,n),e.applyData(t,n)}}function ci(e,t){let n=t.referenceType,r=`]`;if(n===`collapsed`?r+=`[]`:n===`full`&&(r+=`[`+(t.label||t.identifier)+`]`),t.type===`imageReference`)return[{type:`text`,value:`![`+t.alt+r}];let i=e.all(t),a=i[0];a&&a.type===`text`?a.value=`[`+a.value:i.unshift({type:`text`,value:`[`});let o=i[i.length-1];return o&&o.type===`text`?o.value+=r:i.push({type:`text`,value:r}),i}function li(e,t){let n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return ci(e,t);let i={src:Ot(r.url||``),alt:t.alt};r.title!==null&&r.title!==void 0&&(i.title=r.title);let a={type:`element`,tagName:`img`,properties:i,children:[]};return e.patch(t,a),e.applyData(t,a)}function ui(e,t){let n={src:Ot(t.url)};t.alt!==null&&t.alt!==void 0&&(n.alt=t.alt),t.title!==null&&t.title!==void 0&&(n.title=t.title);let r={type:`element`,tagName:`img`,properties:n,children:[]};return e.patch(t,r),e.applyData(t,r)}function di(e,t){let n={type:`text`,value:t.value.replace(/\r?\n|\r/g,` `)};e.patch(t,n);let r={type:`element`,tagName:`code`,properties:{},children:[n]};return e.patch(t,r),e.applyData(t,r)}function fi(e,t){let n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return ci(e,t);let i={href:Ot(r.url||``)};r.title!==null&&r.title!==void 0&&(i.title=r.title);let a={type:`element`,tagName:`a`,properties:i,children:e.all(t)};return e.patch(t,a),e.applyData(t,a)}function pi(e,t){let n={href:Ot(t.url)};t.title!==null&&t.title!==void 0&&(n.title=t.title);let r={type:`element`,tagName:`a`,properties:n,children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function mi(e,t,n){let r=e.all(t),i=n?hi(n):gi(t),a={},o=[];if(typeof t.checked==`boolean`){let e=r[0],n;e&&e.type===`element`&&e.tagName===`p`?n=e:(n={type:`element`,tagName:`p`,properties:{},children:[]},r.unshift(n)),n.children.length>0&&n.children.unshift({type:`text`,value:` `}),n.children.unshift({type:`element`,tagName:`input`,properties:{type:`checkbox`,checked:t.checked,disabled:!0},children:[]}),a.className=[`task-list-item`]}let s=-1;for(;++s<r.length;){let e=r[s];(i||s!==0||e.type!==`element`||e.tagName!==`p`)&&o.push({type:`text`,value:`
`}),e.type===`element`&&e.tagName===`p`&&!i?o.push(...e.children):o.push(e)}let c=r[r.length-1];c&&(i||c.type!==`element`||c.tagName!==`p`)&&o.push({type:`text`,value:`
`});let l={type:`element`,tagName:`li`,properties:a,children:o};return e.patch(t,l),e.applyData(t,l)}function hi(e){let t=!1;if(e.type===`list`){t=e.spread||!1;let n=e.children,r=-1;for(;!t&&++r<n.length;)t=gi(n[r])}return t}function gi(e){return e.spread??e.children.length>1}function _i(e,t){let n={},r=e.all(t),i=-1;for(typeof t.start==`number`&&t.start!==1&&(n.start=t.start);++i<r.length;){let e=r[i];if(e.type===`element`&&e.tagName===`li`&&e.properties&&Array.isArray(e.properties.className)&&e.properties.className.includes(`task-list-item`)){n.className=[`contains-task-list`];break}}let a={type:`element`,tagName:t.ordered?`ol`:`ul`,properties:n,children:e.wrap(r,!0)};return e.patch(t,a),e.applyData(t,a)}function vi(e,t){let n={type:`element`,tagName:`p`,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function yi(e,t){let n={type:`root`,children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)}function bi(e,t){let n={type:`element`,tagName:`strong`,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function xi(e,t){let n=e.all(t),r=n.shift(),i=[];if(r){let n={type:`element`,tagName:`thead`,properties:{},children:e.wrap([r],!0)};e.patch(t.children[0],n),i.push(n)}if(n.length>0){let r={type:`element`,tagName:`tbody`,properties:{},children:e.wrap(n,!0)},a=De(t.children[1]),o=Ee(t.children[t.children.length-1]);a&&o&&(r.position={start:a,end:o}),i.push(r)}let a={type:`element`,tagName:`table`,properties:{},children:e.wrap(i,!0)};return e.patch(t,a),e.applyData(t,a)}function Si(e,t,n){let r=n?n.children:void 0,i=(r?r.indexOf(t):1)===0?`th`:`td`,a=n&&n.type===`table`?n.align:void 0,o=a?a.length:t.children.length,s=-1,c=[];for(;++s<o;){let n=t.children[s],r={},o=a?a[s]:void 0;o&&(r.align=o);let l={type:`element`,tagName:i,properties:r,children:[]};n&&(l.children=e.all(n),e.patch(n,l),l=e.applyData(n,l)),c.push(l)}let l={type:`element`,tagName:`tr`,properties:{},children:e.wrap(c,!0)};return e.patch(t,l),e.applyData(t,l)}function Ci(e,t){let n={type:`element`,tagName:`td`,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}var wi=9,Ti=32;function Ei(e){let t=String(e),n=/\r?\n|\r/g,r=n.exec(t),i=0,a=[];for(;r;)a.push(Di(t.slice(i,r.index),i>0,!0),r[0]),i=r.index+r[0].length,r=n.exec(t);return a.push(Di(t.slice(i),i>0,!1)),a.join(``)}function Di(e,t,n){let r=0,i=e.length;if(t){let t=e.codePointAt(r);for(;t===wi||t===Ti;)r++,t=e.codePointAt(r)}if(n){let t=e.codePointAt(i-1);for(;t===wi||t===Ti;)i--,t=e.codePointAt(i-1)}return i>r?e.slice(r,i):``}function Oi(e,t){let n={type:`text`,value:Ei(String(t.value))};return e.patch(t,n),e.applyData(t,n)}function ki(e,t){let n={type:`element`,tagName:`hr`,properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)}var Ai={blockquote:ei,break:ti,code:ni,delete:ri,emphasis:ii,footnoteReference:ai,heading:oi,html:si,imageReference:li,image:ui,inlineCode:di,linkReference:fi,link:pi,listItem:mi,list:_i,paragraph:vi,root:yi,strong:bi,table:xi,tableCell:Ci,tableRow:Si,text:Oi,thematicBreak:ki,toml:ji,yaml:ji,definition:ji,footnoteDefinition:ji};function ji(){}var Mi=typeof self==`object`?self:globalThis,Ni=(e,t)=>{switch(e){case`Function`:case`SharedWorker`:case`Worker`:case`eval`:case`setInterval`:case`setTimeout`:throw TypeError(`unable to deserialize `+e)}return new Mi[e](t)},Pi=(e,t)=>{let n=(t,n)=>(e.set(n,t),t),r=i=>{if(e.has(i))return e.get(i);let[a,o]=t[i];switch(a){case 0:case-1:return n(o,i);case 1:{let e=n([],i);for(let t of o)e.push(r(t));return e}case 2:{let e=n({},i);for(let[t,n]of o)e[r(t)]=r(n);return e}case 3:return n(new Date(o),i);case 4:{let{source:e,flags:t}=o;return n(new RegExp(e,t),i)}case 5:{let e=n(new Map,i);for(let[t,n]of o)e.set(r(t),r(n));return e}case 6:{let e=n(new Set,i);for(let t of o)e.add(r(t));return e}case 7:{let{name:e,message:t}=o;return n(typeof Mi[e]==`function`?Ni(e,t):Error(t),i)}case 8:return n(BigInt(o),i);case`BigInt`:return n(Object(BigInt(o)),i);case`ArrayBuffer`:return n(new Uint8Array(o).buffer,o);case`DataView`:{let{buffer:e}=new Uint8Array(o);return n(new DataView(e),o)}}return n(Ni(a,o),i)};return r},Fi=e=>Pi(new Map,e)(0),Ii=``,{toString:Li}={},{keys:Ri}=Object,zi=e=>{let t=typeof e;if(t!==`object`||!e)return[0,t];let n=Li.call(e).slice(8,-1);switch(n){case`Array`:return[1,Ii];case`Object`:return[2,Ii];case`Date`:return[3,Ii];case`RegExp`:return[4,Ii];case`Map`:return[5,Ii];case`Set`:return[6,Ii];case`DataView`:return[1,n]}return n.includes(`Array`)?[1,n]:e instanceof Error?[7,e.name||`Error`]:[2,n]},Bi=([e,t])=>e===0&&(t===`function`||t===`symbol`),Vi=(e,t,n,r)=>{let i=(e,t)=>{let i=r.push(e)-1;return n.set(t,i),i},a=r=>{if(n.has(r))return n.get(r);let[o,s]=zi(r);switch(o){case 0:{let t=r;switch(s){case`bigint`:o=8,t=r.toString();break;case`function`:case`symbol`:if(e)throw TypeError(`unable to serialize `+s);t=null;break;case`undefined`:return i([-1],r)}return i([o,t],r)}case 1:{if(s){let e=r;return s===`DataView`?e=new Uint8Array(r.buffer):s===`ArrayBuffer`&&(e=new Uint8Array(r)),i([s,[...e]],r)}let e=[],t=i([o,e],r);for(let t of r)e.push(a(t));return t}case 2:{if(s)switch(s){case`BigInt`:return i([s,r.toString()],r);case`Boolean`:case`Number`:case`String`:return i([s,r.valueOf()],r)}if(t&&`toJSON`in r)return a(r.toJSON());let n=[],c=i([o,n],r);for(let t of Ri(r))(e||!Bi(zi(r[t])))&&n.push([a(t),a(r[t])]);return c}case 3:return i([o,isNaN(r.getTime())?Ii:r.toISOString()],r);case 4:{let{source:e,flags:t}=r;return i([o,{source:e,flags:t}],r)}case 5:{let t=[],n=i([o,t],r);for(let[n,i]of r)(e||!(Bi(zi(n))||Bi(zi(i))))&&t.push([a(n),a(i)]);return n}case 6:{let t=[],n=i([o,t],r);for(let n of r)(e||!Bi(zi(n)))&&t.push(a(n));return n}}let{message:c}=r;return i([o,{name:s,message:c}],r)};return a},Hi=(e,{json:t,lossy:n}={})=>{let r=[];return Vi(!(t||n),!!t,new Map,r)(e),r},Ui=typeof structuredClone==`function`?(e,t)=>t&&(`json`in t||`lossy`in t)?Fi(Hi(e,t)):structuredClone(e):(e,t)=>Fi(Hi(e,t));function Wi(e,t){let n=[{type:`text`,value:`↩`}];return t>1&&n.push({type:`element`,tagName:`sup`,properties:{},children:[{type:`text`,value:String(t)}]}),n}function Gi(e,t){return`Back to reference `+(e+1)+(t>1?`-`+t:``)}function Ki(e){let t=typeof e.options.clobberPrefix==`string`?e.options.clobberPrefix:`user-content-`,n=e.options.footnoteBackContent||Wi,r=e.options.footnoteBackLabel||Gi,i=e.options.footnoteLabel||`Footnotes`,a=e.options.footnoteLabelTagName||`h2`,o=e.options.footnoteLabelProperties||{className:[`sr-only`]},s=[],c=-1;for(;++c<e.footnoteOrder.length;){let i=e.footnoteById.get(e.footnoteOrder[c]);if(!i)continue;let a=e.all(i),o=String(i.identifier).toUpperCase(),l=Ot(o.toLowerCase()),u=0,d=[],f=e.footnoteCounts.get(o);for(;f!==void 0&&++u<=f;){d.length>0&&d.push({type:`text`,value:` `});let e=typeof n==`string`?n:n(c,u);typeof e==`string`&&(e={type:`text`,value:e}),d.push({type:`element`,tagName:`a`,properties:{href:`#`+t+`fnref-`+l+(u>1?`-`+u:``),dataFootnoteBackref:``,ariaLabel:typeof r==`string`?r:r(c,u),className:[`data-footnote-backref`]},children:Array.isArray(e)?e:[e]})}let p=a[a.length-1];if(p&&p.type===`element`&&p.tagName===`p`){let e=p.children[p.children.length-1];e&&e.type===`text`?e.value+=` `:p.children.push({type:`text`,value:` `}),p.children.push(...d)}else a.push(...d);let m={type:`element`,tagName:`li`,properties:{id:t+`fn-`+l},children:e.wrap(a,!0)};e.patch(i,m),s.push(m)}if(s.length!==0)return{type:`element`,tagName:`section`,properties:{dataFootnotes:!0,className:[`footnotes`]},children:[{type:`element`,tagName:a,properties:{...Ui(o),id:`footnote-label`},children:[{type:`text`,value:i}]},{type:`text`,value:`
`},{type:`element`,tagName:`ol`,properties:{},children:e.wrap(s,!0)},{type:`text`,value:`
`}]}}var qi={}.hasOwnProperty,Ji={};function Yi(e,t){let n=t||Ji,r=new Map,i=new Map,a={all:s,applyData:Zi,definitionById:r,footnoteById:i,footnoteCounts:new Map,footnoteOrder:[],handlers:{...Ai,...n.handlers},one:o,options:n,patch:Xi,wrap:$i};return p(e,function(e){if(e.type===`definition`||e.type===`footnoteDefinition`){let t=e.type===`definition`?r:i,n=String(e.identifier).toUpperCase();t.has(n)||t.set(n,e)}}),a;function o(e,t){let n=e.type,r=a.handlers[n];if(qi.call(a.handlers,n)&&r)return r(a,e,t);if(a.options.passThrough&&a.options.passThrough.includes(n)){if(`children`in e){let{children:t,...n}=e,r=Ui(n);return r.children=a.all(e),r}return Ui(e)}return(a.options.unknownHandler||Qi)(a,e,t)}function s(e){let t=[];if(`children`in e){let n=e.children,r=-1;for(;++r<n.length;){let i=a.one(n[r],e);if(i){if(r&&n[r-1].type===`break`&&(!Array.isArray(i)&&i.type===`text`&&(i.value=ea(i.value)),!Array.isArray(i)&&i.type===`element`)){let e=i.children[0];e&&e.type===`text`&&(e.value=ea(e.value))}Array.isArray(i)?t.push(...i):t.push(i)}}}return t}}function Xi(e,t){e.position&&(t.position=ke(e))}function Zi(e,t){let n=t;if(e&&e.data){let t=e.data.hName,r=e.data.hChildren,i=e.data.hProperties;typeof t==`string`&&(n.type===`element`?n.tagName=t:n={type:`element`,tagName:t,properties:{},children:`children`in n?n.children:[n]}),n.type===`element`&&i&&Object.assign(n.properties,Ui(i)),`children`in n&&n.children&&r!=null&&(n.children=r)}return n}function Qi(e,t){let n=t.data||{},r=`value`in t&&!(qi.call(n,`hProperties`)||qi.call(n,`hChildren`))?{type:`text`,value:t.value}:{type:`element`,tagName:`div`,properties:{},children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function $i(e,t){let n=[],r=-1;for(t&&n.push({type:`text`,value:`
`});++r<e.length;)r&&n.push({type:`text`,value:`
`}),n.push(e[r]);return t&&e.length>0&&n.push({type:`text`,value:`
`}),n}function ea(e){let t=0,n=e.charCodeAt(t);for(;n===9||n===32;)t++,n=e.charCodeAt(t);return e.slice(t)}function ta(e,t){let n=Yi(e,t),r=n.one(e,void 0),i=Ki(n),a=Array.isArray(r)?{type:`root`,children:r}:r||{type:`root`,children:[]};return i&&(`children`in a,a.children.push({type:`text`,value:`
`},i)),a}function na(e,t){return e&&`run`in e?async function(n,r){let i=ta(n,{file:r,...t});await e.run(i,r)}:function(n,r){return ta(n,{file:r,...e||t})}}function ra(e){if(e)throw e}var ia=n(((e,t)=>{var n=Object.prototype.hasOwnProperty,r=Object.prototype.toString,i=Object.defineProperty,a=Object.getOwnPropertyDescriptor,o=function(e){return typeof Array.isArray==`function`?Array.isArray(e):r.call(e)===`[object Array]`},s=function(e){if(!e||r.call(e)!==`[object Object]`)return!1;var t=n.call(e,`constructor`),i=e.constructor&&e.constructor.prototype&&n.call(e.constructor.prototype,`isPrototypeOf`);if(e.constructor&&!t&&!i)return!1;for(var a in e);return a===void 0||n.call(e,a)},c=function(e,t){i&&t.name===`__proto__`?i(e,t.name,{enumerable:!0,configurable:!0,value:t.newValue,writable:!0}):e[t.name]=t.newValue},l=function(e,t){if(t===`__proto__`){if(!n.call(e,t))return;if(a)return a(e,t).value}return e[t]};t.exports=function e(){var t,n,r,i,a,u,d=arguments[0],f=1,p=arguments.length,m=!1;for(typeof d==`boolean`&&(m=d,d=arguments[1]||{},f=2),(d==null||typeof d!=`object`&&typeof d!=`function`)&&(d={});f<p;++f)if(t=arguments[f],t!=null)for(n in t)r=l(d,n),i=l(t,n),d!==i&&(m&&i&&(s(i)||(a=o(i)))?(a?(a=!1,u=r&&o(r)?r:[]):u=r&&s(r)?r:{},c(d,{name:n,newValue:e(m,u,i)})):i!==void 0&&c(d,{name:n,newValue:i}));return d}}));function aa(e){if(typeof e!=`object`||!e)return!1;let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function oa(){let e=[],t={run:n,use:r};return t;function n(...t){let n=-1,r=t.pop();if(typeof r!=`function`)throw TypeError(`Expected function as last argument, not `+r);i(null,...t);function i(a,...o){let s=e[++n],c=-1;if(a){r(a);return}for(;++c<t.length;)(o[c]===null||o[c]===void 0)&&(o[c]=t[c]);t=o,s?sa(s,i)(...o):r(null,...o)}}function r(n){if(typeof n!=`function`)throw TypeError("Expected `middelware` to be a function, not "+n);return e.push(n),t}}function sa(e,t){let n;return r;function r(...t){let r=e.length>t.length,o;r&&t.push(i);try{o=e.apply(this,t)}catch(e){let t=e;if(r&&n)throw t;return i(t)}r||(o&&o.then&&typeof o.then==`function`?o.then(a,i):o instanceof Error?i(o):a(o))}function i(e,...r){n||(n=!0,t(e,...r))}function a(e){i(null,e)}}var Y={basename:ca,dirname:la,extname:ua,join:da,sep:`/`};function ca(e,t){if(t!==void 0&&typeof t!=`string`)throw TypeError(`"ext" argument must be a string`);ma(e);let n=0,r=-1,i=e.length,a;if(t===void 0||t.length===0||t.length>e.length){for(;i--;)if(e.codePointAt(i)===47){if(a){n=i+1;break}}else r<0&&(a=!0,r=i+1);return r<0?``:e.slice(n,r)}if(t===e)return``;let o=-1,s=t.length-1;for(;i--;)if(e.codePointAt(i)===47){if(a){n=i+1;break}}else o<0&&(a=!0,o=i+1),s>-1&&(e.codePointAt(i)===t.codePointAt(s--)?s<0&&(r=i):(s=-1,r=o));return n===r?r=o:r<0&&(r=e.length),e.slice(n,r)}function la(e){if(ma(e),e.length===0)return`.`;let t=-1,n=e.length,r;for(;--n;)if(e.codePointAt(n)===47){if(r){t=n;break}}else r||=!0;return t<0?e.codePointAt(0)===47?`/`:`.`:t===1&&e.codePointAt(0)===47?`//`:e.slice(0,t)}function ua(e){ma(e);let t=e.length,n=-1,r=0,i=-1,a=0,o;for(;t--;){let s=e.codePointAt(t);if(s===47){if(o){r=t+1;break}continue}n<0&&(o=!0,n=t+1),s===46?i<0?i=t:a!==1&&(a=1):i>-1&&(a=-1)}return i<0||n<0||a===0||a===1&&i===n-1&&i===r+1?``:e.slice(i,n)}function da(...e){let t=-1,n;for(;++t<e.length;)ma(e[t]),e[t]&&(n=n===void 0?e[t]:n+`/`+e[t]);return n===void 0?`.`:fa(n)}function fa(e){ma(e);let t=e.codePointAt(0)===47,n=pa(e,!t);return n.length===0&&!t&&(n=`.`),n.length>0&&e.codePointAt(e.length-1)===47&&(n+=`/`),t?`/`+n:n}function pa(e,t){let n=``,r=0,i=-1,a=0,o=-1,s,c;for(;++o<=e.length;){if(o<e.length)s=e.codePointAt(o);else if(s===47)break;else s=47;if(s===47){if(!(i===o-1||a===1))if(i!==o-1&&a===2){if(n.length<2||r!==2||n.codePointAt(n.length-1)!==46||n.codePointAt(n.length-2)!==46){if(n.length>2){if(c=n.lastIndexOf(`/`),c!==n.length-1){c<0?(n=``,r=0):(n=n.slice(0,c),r=n.length-1-n.lastIndexOf(`/`)),i=o,a=0;continue}}else if(n.length>0){n=``,r=0,i=o,a=0;continue}}t&&(n=n.length>0?n+`/..`:`..`,r=2)}else n.length>0?n+=`/`+e.slice(i+1,o):n=e.slice(i+1,o),r=o-i-1;i=o,a=0}else s===46&&a>-1?a++:a=-1}return n}function ma(e){if(typeof e!=`string`)throw TypeError(`Path must be a string. Received `+JSON.stringify(e))}var ha={cwd:ga};function ga(){return`/`}function _a(e){return!!(typeof e==`object`&&e&&`href`in e&&e.href&&`protocol`in e&&e.protocol&&e.auth===void 0)}function va(e){if(typeof e==`string`)e=new URL(e);else if(!_a(e)){let t=TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw t.code=`ERR_INVALID_ARG_TYPE`,t}if(e.protocol!==`file:`){let e=TypeError(`The URL must be of scheme file`);throw e.code=`ERR_INVALID_URL_SCHEME`,e}return ya(e)}function ya(e){if(e.hostname!==``){let e=TypeError(`File URL host must be "localhost" or empty on darwin`);throw e.code=`ERR_INVALID_FILE_URL_HOST`,e}let t=e.pathname,n=-1;for(;++n<t.length;)if(t.codePointAt(n)===37&&t.codePointAt(n+1)===50){let e=t.codePointAt(n+2);if(e===70||e===102){let e=TypeError(`File URL path must not include encoded / characters`);throw e.code=`ERR_INVALID_FILE_URL_PATH`,e}}return decodeURIComponent(t)}var ba=[`history`,`path`,`basename`,`stem`,`extname`,`dirname`],xa=class{constructor(e){let t;t=e?_a(e)?{path:e}:typeof e==`string`||Ta(e)?{value:e}:e:{},this.cwd=`cwd`in t?``:ha.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let n=-1;for(;++n<ba.length;){let e=ba[n];e in t&&t[e]!==void 0&&t[e]!==null&&(this[e]=e===`history`?[...t[e]]:t[e])}let r;for(r in t)ba.includes(r)||(this[r]=t[r])}get basename(){return typeof this.path==`string`?Y.basename(this.path):void 0}set basename(e){Ca(e,`basename`),Sa(e,`basename`),this.path=Y.join(this.dirname||``,e)}get dirname(){return typeof this.path==`string`?Y.dirname(this.path):void 0}set dirname(e){wa(this.basename,`dirname`),this.path=Y.join(e||``,this.basename)}get extname(){return typeof this.path==`string`?Y.extname(this.path):void 0}set extname(e){if(Sa(e,`extname`),wa(this.dirname,`extname`),e){if(e.codePointAt(0)!==46)throw Error("`extname` must start with `.`");if(e.includes(`.`,1))throw Error("`extname` cannot contain multiple dots")}this.path=Y.join(this.dirname,this.stem+(e||``))}get path(){return this.history[this.history.length-1]}set path(e){_a(e)&&(e=va(e)),Ca(e,`path`),this.path!==e&&this.history.push(e)}get stem(){return typeof this.path==`string`?Y.basename(this.path,this.extname):void 0}set stem(e){Ca(e,`stem`),Sa(e,`stem`),this.path=Y.join(this.dirname||``,e+(this.extname||``))}fail(e,t,n){let r=this.message(e,t,n);throw r.fatal=!0,r}info(e,t,n){let r=this.message(e,t,n);return r.fatal=void 0,r}message(e,t,n){let r=new I(e,t,n);return this.path&&(r.name=this.path+`:`+r.name,r.file=this.path),r.fatal=!1,this.messages.push(r),r}toString(e){return this.value===void 0?``:typeof this.value==`string`?this.value:new TextDecoder(e||void 0).decode(this.value)}};function Sa(e,t){if(e&&e.includes(Y.sep))throw Error("`"+t+"` cannot be a path: did not expect `"+Y.sep+"`")}function Ca(e,t){if(!e)throw Error("`"+t+"` cannot be empty")}function wa(e,t){if(!e)throw Error("Setting `"+t+"` requires `path` to be set too")}function Ta(e){return!!(e&&typeof e==`object`&&`byteLength`in e&&`byteOffset`in e)}var Ea=(function(e){let t=this.constructor.prototype,n=t[e],r=function(){return n.apply(r,arguments)};return Object.setPrototypeOf(r,t),r}),Da=t(ia(),1),Oa={}.hasOwnProperty,ka=new class e extends Ea{constructor(){super(`copy`),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=oa()}copy(){let t=new e,n=-1;for(;++n<this.attachers.length;){let e=this.attachers[n];t.use(...e)}return t.data((0,Da.default)(!0,{},this.namespace)),t}data(e,t){return typeof e==`string`?arguments.length===2?(Ma(`data`,this.frozen),this.namespace[e]=t,this):Oa.call(this.namespace,e)&&this.namespace[e]||void 0:e?(Ma(`data`,this.frozen),this.namespace=e,this):this.namespace}freeze(){if(this.frozen)return this;let e=this;for(;++this.freezeIndex<this.attachers.length;){let[t,...n]=this.attachers[this.freezeIndex];if(n[0]===!1)continue;n[0]===!0&&(n[0]=void 0);let r=t.call(e,...n);typeof r==`function`&&this.transformers.use(r)}return this.frozen=!0,this.freezeIndex=1/0,this}parse(e){this.freeze();let t=Fa(e),n=this.parser||this.Parser;return Aa(`parse`,n),n(String(t),t)}process(e,t){let n=this;return this.freeze(),Aa(`process`,this.parser||this.Parser),ja(`process`,this.compiler||this.Compiler),t?r(void 0,t):new Promise(r);function r(r,i){let a=Fa(e),o=n.parse(a);n.run(o,a,function(e,t,r){if(e||!t||!r)return s(e);let i=t,a=n.stringify(i,r);La(a)?r.value=a:r.result=a,s(e,r)});function s(e,n){e||!n?i(e):r?r(n):t(void 0,n)}}}processSync(e){let t=!1,n;return this.freeze(),Aa(`processSync`,this.parser||this.Parser),ja(`processSync`,this.compiler||this.Compiler),this.process(e,r),Pa(`processSync`,`process`,t),n;function r(e,r){t=!0,ra(e),n=r}}run(e,t,n){Na(e),this.freeze();let r=this.transformers;return!n&&typeof t==`function`&&(n=t,t=void 0),n?i(void 0,n):new Promise(i);function i(i,a){let o=Fa(t);r.run(e,o,s);function s(t,r,o){let s=r||e;t?a(t):i?i(s):n(void 0,s,o)}}}runSync(e,t){let n=!1,r;return this.run(e,t,i),Pa(`runSync`,`run`,n),r;function i(e,t){ra(e),r=t,n=!0}}stringify(e,t){this.freeze();let n=Fa(t),r=this.compiler||this.Compiler;return ja(`stringify`,r),Na(e),r(e,n)}use(e,...t){let n=this.attachers,r=this.namespace;if(Ma(`use`,this.frozen),e!=null)if(typeof e==`function`)s(e,t);else if(typeof e==`object`)Array.isArray(e)?o(e):a(e);else throw TypeError("Expected usable value, not `"+e+"`");return this;function i(e){if(typeof e==`function`)s(e,[]);else if(typeof e==`object`)if(Array.isArray(e)){let[t,...n]=e;s(t,n)}else a(e);else throw TypeError("Expected usable value, not `"+e+"`")}function a(e){if(!(`plugins`in e)&&!(`settings`in e))throw Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");o(e.plugins),e.settings&&(r.settings=(0,Da.default)(!0,r.settings,e.settings))}function o(e){let t=-1;if(e!=null)if(Array.isArray(e))for(;++t<e.length;){let n=e[t];i(n)}else throw TypeError("Expected a list of plugins, not `"+e+"`")}function s(e,t){let r=-1,i=-1;for(;++r<n.length;)if(n[r][0]===e){i=r;break}if(i===-1)n.push([e,...t]);else if(t.length>0){let[r,...a]=t,o=n[i][1];aa(o)&&aa(r)&&(r=(0,Da.default)(!0,o,r)),n[i]=[e,r,...a]}}}}().freeze();function Aa(e,t){if(typeof t!=`function`)throw TypeError("Cannot `"+e+"` without `parser`")}function ja(e,t){if(typeof t!=`function`)throw TypeError("Cannot `"+e+"` without `compiler`")}function Ma(e,t){if(t)throw Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function Na(e){if(!aa(e)||typeof e.type!=`string`)throw TypeError("Expected node, got `"+e+"`")}function Pa(e,t,n){if(!n)throw Error("`"+e+"` finished async. Use `"+t+"` instead")}function Fa(e){return Ia(e)?e:new xa(e)}function Ia(e){return!!(e&&typeof e==`object`&&`message`in e&&`messages`in e)}function La(e){return typeof e==`string`||Ra(e)}function Ra(e){return!!(e&&typeof e==`object`&&`byteLength`in e&&`byteOffset`in e)}var X=a(),za=t(i(),1),Ba=[],Va={allowDangerousHtml:!0},Ha=/^(https?|ircs?|mailto|xmpp)$/i,Ua=[{from:`astPlugins`,id:`remove-buggy-html-in-markdown-parser`},{from:`allowDangerousHtml`,id:`remove-buggy-html-in-markdown-parser`},{from:`allowNode`,id:`replace-allownode-allowedtypes-and-disallowedtypes`,to:`allowElement`},{from:`allowedTypes`,id:`replace-allownode-allowedtypes-and-disallowedtypes`,to:`allowedElements`},{from:`className`,id:`remove-classname`},{from:`disallowedTypes`,id:`replace-allownode-allowedtypes-and-disallowedtypes`,to:`disallowedElements`},{from:`escapeHtml`,id:`remove-buggy-html-in-markdown-parser`},{from:`includeElementIndex`,id:`#remove-includeelementindex`},{from:`includeNodeIndex`,id:`change-includenodeindex-to-includeelementindex`},{from:`linkTarget`,id:`remove-linktarget`},{from:`plugins`,id:`change-plugins-to-remarkplugins`,to:`remarkPlugins`},{from:`rawSourcePos`,id:`#remove-rawsourcepos`},{from:`renderers`,id:`change-renderers-to-components`,to:`components`},{from:`source`,id:`change-source-to-children`,to:`children`},{from:`sourcePos`,id:`#remove-sourcepos`},{from:`transformImageUri`,id:`#add-urltransform`,to:`urlTransform`},{from:`transformLinkUri`,id:`#add-urltransform`,to:`urlTransform`}];function Wa(e){let t=Ga(e),n=Ka(e);return qa(t.runSync(t.parse(n),n),e)}function Ga(e){let t=e.rehypePlugins||Ba,n=e.remarkPlugins||Ba,r=e.remarkRehypeOptions?{...e.remarkRehypeOptions,...Va}:Va;return ka().use($r).use(n).use(na,r).use(t)}function Ka(e){let t=e.children||``,n=new xa;return typeof t==`string`?n.value=t:``+t,n}function qa(e,t){let n=t.allowedElements,r=t.allowElement,i=t.components,a=t.disallowedElements,o=t.skipHtml,s=t.unwrapDisallowed,c=t.urlTransform||Ja;for(let e of Ua)Object.hasOwn(t,e.from)&&``+e.from+(e.to?"use `"+e.to+"` instead":`remove it`)+e.id;return p(e,l),Be(e,{Fragment:X.Fragment,components:i,ignoreInvalidStyle:!0,jsx:X.jsx,jsxs:X.jsxs,passKeys:!0,passNode:!0});function l(e,t,i){if(e.type===`raw`&&i&&typeof t==`number`)return o?i.children.splice(t,1):i.children[t]={type:`text`,value:e.value},t;if(e.type===`element`){let t;for(t in ct)if(Object.hasOwn(ct,t)&&Object.hasOwn(e.properties,t)){let n=e.properties[t],r=ct[t];(r===null||r.includes(e.tagName))&&(e.properties[t]=c(String(n||``),t,e))}}if(e.type===`element`){let o=n?!n.includes(e.tagName):a?a.includes(e.tagName):!1;if(!o&&r&&typeof t==`number`&&(o=!r(e,t,i)),o&&i&&typeof t==`number`)return s&&e.children?i.children.splice(t,1,...e.children):i.children.splice(t,1),t}}}function Ja(e){let t=e.indexOf(`:`),n=e.indexOf(`?`),r=e.indexOf(`#`),i=e.indexOf(`/`);return t===-1||i!==-1&&t>i||n!==-1&&t>n||r!==-1&&t>r||Ha.test(e.slice(0,t))?e:``}function Ya(e,t){let n=String(e);if(typeof t!=`string`)throw TypeError(`Expected character`);let r=0,i=n.indexOf(t);for(;i!==-1;)r++,i=n.indexOf(t,i+t.length);return r}function Xa(e){if(typeof e!=`string`)throw TypeError(`Expected a string`);return e.replace(/[|\\{}()[\]^$+*?.]/g,`\\$&`).replace(/-/g,`\\x2d`)}function Za(e,t,n){let r=d((n||{}).ignore||[]),i=Qa(t),a=-1;for(;++a<i.length;)f(e,`text`,o);function o(e,t){let n=-1,i;for(;++n<t.length;){let e=t[n],a=i?i.children:void 0;if(r(e,a?a.indexOf(e):void 0,i))return;i=e}if(i)return s(e,t)}function s(e,t){let n=t[t.length-1],r=i[a][0],o=i[a][1],s=0,c=n.children.indexOf(e),l=!1,u=[];r.lastIndex=0;let d=r.exec(e.value);for(;d;){let n=d.index,i={index:d.index,input:d.input,stack:[...t,e]},a=o(...d,i);if(typeof a==`string`&&(a=a.length>0?{type:`text`,value:a}:void 0),a===!1?r.lastIndex=n+1:(s!==n&&u.push({type:`text`,value:e.value.slice(s,n)}),Array.isArray(a)?u.push(...a):a&&u.push(a),s=n+d[0].length,l=!0),!r.global)break;d=r.exec(e.value)}return l?(s<e.value.length&&u.push({type:`text`,value:e.value.slice(s)}),n.children.splice(c,1,...u)):u=[e],c+u.length}}function Qa(e){let t=[];if(!Array.isArray(e))throw TypeError(`Expected find and replace tuple or list of tuples`);let n=!e[0]||Array.isArray(e[0])?e:[e],r=-1;for(;++r<n.length;){let e=n[r];t.push([$a(e[0]),eo(e[1])])}return t}function $a(e){return typeof e==`string`?new RegExp(Xa(e),`g`):e}function eo(e){return typeof e==`function`?e:function(){return e}}var to=`phrasing`,no=[`autolink`,`link`,`image`,`label`];function ro(){return{transforms:[fo],enter:{literalAutolink:ao,literalAutolinkEmail:oo,literalAutolinkHttp:oo,literalAutolinkWww:oo},exit:{literalAutolink:uo,literalAutolinkEmail:lo,literalAutolinkHttp:so,literalAutolinkWww:co}}}function io(){return{unsafe:[{character:`@`,before:`[+\\-.\\w]`,after:`[\\-.\\w]`,inConstruct:to,notInConstruct:no},{character:`.`,before:`[Ww]`,after:`[\\-.\\w]`,inConstruct:to,notInConstruct:no},{character:`:`,before:`[ps]`,after:`\\/`,inConstruct:to,notInConstruct:no}]}}function ao(e){this.enter({type:`link`,title:null,url:``,children:[]},e)}function oo(e){this.config.enter.autolinkProtocol.call(this,e)}function so(e){this.config.exit.autolinkProtocol.call(this,e)}function co(e){this.config.exit.data.call(this,e);let t=this.stack[this.stack.length-1];t.type,t.url=`http://`+this.sliceSerialize(e)}function lo(e){this.config.exit.autolinkEmail.call(this,e)}function uo(e){this.exit(e)}function fo(e){Za(e,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,po],[/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu,mo]],{ignore:[`link`,`linkReference`]})}function po(e,t,n,r,i){let a=``;if(!_o(i)||(/^w/i.test(t)&&(n=t+n,t=``,a=`http://`),!ho(n)))return!1;let o=go(n+r);if(!o[0])return!1;let s={type:`link`,title:null,url:a+t+o[0],children:[{type:`text`,value:t+o[0]}]};return o[1]?[s,{type:`text`,value:o[1]}]:s}function mo(e,t,n,r){return!_o(r,!0)||/[-\d_]$/.test(n)?!1:{type:`link`,title:null,url:`mailto:`+t+`@`+n,children:[{type:`text`,value:t+`@`+n}]}}function ho(e){let t=e.split(`.`);return!(t.length<2||t[t.length-1]&&(/_/.test(t[t.length-1])||!/[a-zA-Z\d]/.test(t[t.length-1]))||t[t.length-2]&&(/_/.test(t[t.length-2])||!/[a-zA-Z\d]/.test(t[t.length-2])))}function go(e){let t=/[!"&'),.:;<>?\]}]+$/.exec(e);if(!t)return[e,void 0];e=e.slice(0,t.index);let n=t[0],r=n.indexOf(`)`),i=Ya(e,`(`),a=Ya(e,`)`);for(;r!==-1&&i>a;)e+=n.slice(0,r+1),n=n.slice(r+1),r=n.indexOf(`)`),a++;return[e,n]}function _o(e,t){let n=e.input.charCodeAt(e.index-1);return(e.index===0||Dt(n)||Et(n))&&(!t||n!==47)}Do.peek=Eo;function vo(){this.buffer()}function yo(e){this.enter({type:`footnoteReference`,identifier:``,label:``},e)}function bo(){this.buffer()}function xo(e){this.enter({type:`footnoteDefinition`,identifier:``,label:``,children:[]},e)}function So(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.identifier=z(this.sliceSerialize(e)).toLowerCase(),n.label=t}function Co(e){this.exit(e)}function wo(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.identifier=z(this.sliceSerialize(e)).toLowerCase(),n.label=t}function To(e){this.exit(e)}function Eo(){return`[`}function Do(e,t,n,r){let i=n.createTracker(r),a=i.move(`[^`),o=n.enter(`footnoteReference`),s=n.enter(`reference`);return a+=i.move(n.safe(n.associationId(e),{after:`]`,before:a})),s(),o(),a+=i.move(`]`),a}function Oo(){return{enter:{gfmFootnoteCallString:vo,gfmFootnoteCall:yo,gfmFootnoteDefinitionLabelString:bo,gfmFootnoteDefinition:xo},exit:{gfmFootnoteCallString:So,gfmFootnoteCall:Co,gfmFootnoteDefinitionLabelString:wo,gfmFootnoteDefinition:To}}}function ko(e){let t=!1;return e&&e.firstLineBlank&&(t=!0),{handlers:{footnoteDefinition:n,footnoteReference:Do},unsafe:[{character:`[`,inConstruct:[`label`,`phrasing`,`reference`]}]};function n(e,n,r,i){let a=r.createTracker(i),o=a.move(`[^`),s=r.enter(`footnoteDefinition`),c=r.enter(`label`);return o+=a.move(r.safe(r.associationId(e),{before:o,after:`]`})),c(),o+=a.move(`]:`),e.children&&e.children.length>0&&(a.shift(4),o+=a.move((t?`
`:` `)+r.indentLines(r.containerFlow(e,a.current()),t?jo:Ao))),s(),o}}function Ao(e,t,n){return t===0?e:jo(e,t,n)}function jo(e,t,n){return(n?``:`    `)+e}var Mo=[`autolink`,`destinationLiteral`,`destinationRaw`,`reference`,`titleQuote`,`titleApostrophe`];Lo.peek=Ro;function No(){return{canContainEols:[`delete`],enter:{strikethrough:Fo},exit:{strikethrough:Io}}}function Po(){return{unsafe:[{character:`~`,inConstruct:`phrasing`,notInConstruct:Mo}],handlers:{delete:Lo}}}function Fo(e){this.enter({type:`delete`,children:[]},e)}function Io(e){this.exit(e)}function Lo(e,t,n,r){let i=n.createTracker(r),a=n.enter(`strikethrough`),o=i.move(`~~`);return o+=n.containerPhrasing(e,{...i.current(),before:o,after:`~`}),o+=i.move(`~~`),a(),o}function Ro(){return`~`}function zo(e){return e.length}function Bo(e,t){let n=t||{},r=(n.align||[]).concat(),i=n.stringLength||zo,a=[],o=[],s=[],c=[],l=0,u=-1;for(;++u<e.length;){let t=[],r=[],a=-1;for(e[u].length>l&&(l=e[u].length);++a<e[u].length;){let o=Vo(e[u][a]);if(n.alignDelimiters!==!1){let e=i(o);r[a]=e,(c[a]===void 0||e>c[a])&&(c[a]=e)}t.push(o)}o[u]=t,s[u]=r}let d=-1;if(typeof r==`object`&&`length`in r)for(;++d<l;)a[d]=Ho(r[d]);else{let e=Ho(r);for(;++d<l;)a[d]=e}d=-1;let f=[],p=[];for(;++d<l;){let e=a[d],t=``,r=``;e===99?(t=`:`,r=`:`):e===108?t=`:`:e===114&&(r=`:`);let i=n.alignDelimiters===!1?1:Math.max(1,c[d]-t.length-r.length),o=t+`-`.repeat(i)+r;n.alignDelimiters!==!1&&(i=t.length+i+r.length,i>c[d]&&(c[d]=i),p[d]=i),f[d]=o}o.splice(1,0,f),s.splice(1,0,p),u=-1;let m=[];for(;++u<o.length;){let e=o[u],t=s[u];d=-1;let r=[];for(;++d<l;){let i=e[d]||``,o=``,s=``;if(n.alignDelimiters!==!1){let e=c[d]-(t[d]||0),n=a[d];n===114?o=` `.repeat(e):n===99?e%2?(o=` `.repeat(e/2+.5),s=` `.repeat(e/2-.5)):(o=` `.repeat(e/2),s=o):s=` `.repeat(e)}n.delimiterStart!==!1&&!d&&r.push(`|`),n.padding!==!1&&!(n.alignDelimiters===!1&&i===``)&&(n.delimiterStart!==!1||d)&&r.push(` `),n.alignDelimiters!==!1&&r.push(o),r.push(i),n.alignDelimiters!==!1&&r.push(s),n.padding!==!1&&r.push(` `),(n.delimiterEnd!==!1||d!==l-1)&&r.push(`|`)}m.push(n.delimiterEnd===!1?r.join(``).replace(/ +$/,``):r.join(``))}return m.join(`
`)}function Vo(e){return e==null?``:String(e)}function Ho(e){let t=typeof e==`string`?e.codePointAt(0):0;return t===67||t===99?99:t===76||t===108?108:t===82||t===114?114:0}function Uo(e,t,n,r){let i=n.enter(`blockquote`),a=n.createTracker(r);a.move(`> `),a.shift(2);let o=n.indentLines(n.containerFlow(e,a.current()),Wo);return i(),o}function Wo(e,t,n){return`>`+(n?``:` `)+e}function Go(e,t){return Ko(e,t.inConstruct,!0)&&!Ko(e,t.notInConstruct,!1)}function Ko(e,t,n){if(typeof t==`string`&&(t=[t]),!t||t.length===0)return n;let r=-1;for(;++r<t.length;)if(e.includes(t[r]))return!0;return!1}function qo(e,t,n,r){let i=-1;for(;++i<n.unsafe.length;)if(n.unsafe[i].character===`
`&&Go(n.stack,n.unsafe[i]))return/[ \t]/.test(r.before)?``:` `;return`\\
`}function Jo(e,t){let n=String(e),r=n.indexOf(t),i=r,a=0,o=0;if(typeof t!=`string`)throw TypeError(`Expected substring`);for(;r!==-1;)r===i?++a>o&&(o=a):a=1,i=r+t.length,r=n.indexOf(t,i);return o}function Yo(e,t){return!!(t.options.fences===!1&&e.value&&!e.lang&&/[^ \r\n]/.test(e.value)&&!/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value))}function Xo(e){let t=e.options.fence||"`";if(t!=="`"&&t!==`~`)throw Error("Cannot serialize code with `"+t+"` for `options.fence`, expected `` ` `` or `~`");return t}function Zo(e,t,n,r){let i=Xo(n),a=e.value||``,o=i==="`"?`GraveAccent`:`Tilde`;if(Yo(e,n)){let e=n.enter(`codeIndented`),t=n.indentLines(a,Qo);return e(),t}let s=n.createTracker(r),c=i.repeat(Math.max(Jo(a,i)+1,3)),l=n.enter(`codeFenced`),u=s.move(c);if(e.lang){let t=n.enter(`codeFencedLang${o}`);u+=s.move(n.safe(e.lang,{before:u,after:` `,encode:["`"],...s.current()})),t()}if(e.lang&&e.meta){let t=n.enter(`codeFencedMeta${o}`);u+=s.move(` `),u+=s.move(n.safe(e.meta,{before:u,after:`
`,encode:["`"],...s.current()})),t()}return u+=s.move(`
`),a&&(u+=s.move(a+`
`)),u+=s.move(c),l(),u}function Qo(e,t,n){return(n?``:`    `)+e}function $o(e){let t=e.options.quote||`"`;if(t!==`"`&&t!==`'`)throw Error("Cannot serialize title with `"+t+"` for `options.quote`, expected `\"`, or `'`");return t}function es(e,t,n,r){let i=$o(n),a=i===`"`?`Quote`:`Apostrophe`,o=n.enter(`definition`),s=n.enter(`label`),c=n.createTracker(r),l=c.move(`[`);return l+=c.move(n.safe(n.associationId(e),{before:l,after:`]`,...c.current()})),l+=c.move(`]: `),s(),!e.url||/[\0- \u007F]/.test(e.url)?(s=n.enter(`destinationLiteral`),l+=c.move(`<`),l+=c.move(n.safe(e.url,{before:l,after:`>`,...c.current()})),l+=c.move(`>`)):(s=n.enter(`destinationRaw`),l+=c.move(n.safe(e.url,{before:l,after:e.title?` `:`
`,...c.current()}))),s(),e.title&&(s=n.enter(`title${a}`),l+=c.move(` `+i),l+=c.move(n.safe(e.title,{before:l,after:i,...c.current()})),l+=c.move(i),s()),o(),l}function ts(e){let t=e.options.emphasis||`*`;if(t!==`*`&&t!==`_`)throw Error("Cannot serialize emphasis with `"+t+"` for `options.emphasis`, expected `*`, or `_`");return t}function ns(e){return`&#x`+e.toString(16).toUpperCase()+`;`}function rs(e,t,n){let r=Ft(e),i=Ft(t);return r===void 0?i===void 0?n===`_`?{inside:!0,outside:!0}:{inside:!1,outside:!1}:i===1?{inside:!0,outside:!0}:{inside:!1,outside:!0}:r===1?i===void 0?{inside:!1,outside:!1}:i===1?{inside:!0,outside:!0}:{inside:!1,outside:!1}:i===void 0?{inside:!1,outside:!1}:i===1?{inside:!0,outside:!1}:{inside:!1,outside:!1}}is.peek=as;function is(e,t,n,r){let i=ts(n),a=n.enter(`emphasis`),o=n.createTracker(r),s=o.move(i),c=o.move(n.containerPhrasing(e,{after:i,before:s,...o.current()})),l=c.charCodeAt(0),u=rs(r.before.charCodeAt(r.before.length-1),l,i);u.inside&&(c=ns(l)+c.slice(1));let d=c.charCodeAt(c.length-1),f=rs(r.after.charCodeAt(0),d,i);f.inside&&(c=c.slice(0,-1)+ns(d));let p=o.move(i);return a(),n.attentionEncodeSurroundingInfo={after:f.outside,before:u.outside},s+c+p}function as(e,t,n){return n.options.emphasis||`*`}function os(e,t){let n=!1;return p(e,function(e){if(`value`in e&&/\r?\n|\r/.test(e.value)||e.type===`break`)return n=!0,!1}),!!((!e.depth||e.depth<3)&&ut(e)&&(t.options.setext||n))}function ss(e,t,n,r){let i=Math.max(Math.min(6,e.depth||1),1),a=n.createTracker(r);if(os(e,n)){let t=n.enter(`headingSetext`),r=n.enter(`phrasing`),o=n.containerPhrasing(e,{...a.current(),before:`
`,after:`
`});return r(),t(),o+`
`+(i===1?`=`:`-`).repeat(o.length-(Math.max(o.lastIndexOf(`\r`),o.lastIndexOf(`
`))+1))}let o=`#`.repeat(i),s=n.enter(`headingAtx`),c=n.enter(`phrasing`);a.move(o+` `);let l=n.containerPhrasing(e,{before:`# `,after:`
`,...a.current()});return/^[\t ]/.test(l)&&(l=ns(l.charCodeAt(0))+l.slice(1)),l=l?o+` `+l:o,n.options.closeAtx&&(l+=` `+o),c(),s(),l}cs.peek=ls;function cs(e){return e.value||``}function ls(){return`<`}us.peek=ds;function us(e,t,n,r){let i=$o(n),a=i===`"`?`Quote`:`Apostrophe`,o=n.enter(`image`),s=n.enter(`label`),c=n.createTracker(r),l=c.move(`![`);return l+=c.move(n.safe(e.alt,{before:l,after:`]`,...c.current()})),l+=c.move(`](`),s(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(s=n.enter(`destinationLiteral`),l+=c.move(`<`),l+=c.move(n.safe(e.url,{before:l,after:`>`,...c.current()})),l+=c.move(`>`)):(s=n.enter(`destinationRaw`),l+=c.move(n.safe(e.url,{before:l,after:e.title?` `:`)`,...c.current()}))),s(),e.title&&(s=n.enter(`title${a}`),l+=c.move(` `+i),l+=c.move(n.safe(e.title,{before:l,after:i,...c.current()})),l+=c.move(i),s()),l+=c.move(`)`),o(),l}function ds(){return`!`}fs.peek=ps;function fs(e,t,n,r){let i=e.referenceType,a=n.enter(`imageReference`),o=n.enter(`label`),s=n.createTracker(r),c=s.move(`![`),l=n.safe(e.alt,{before:c,after:`]`,...s.current()});c+=s.move(l+`][`),o();let u=n.stack;n.stack=[],o=n.enter(`reference`);let d=n.safe(n.associationId(e),{before:c,after:`]`,...s.current()});return o(),n.stack=u,a(),i===`full`||!l||l!==d?c+=s.move(d+`]`):i===`shortcut`?c=c.slice(0,-1):c+=s.move(`]`),c}function ps(){return`!`}ms.peek=hs;function ms(e,t,n){let r=e.value||``,i="`",a=-1;for(;RegExp("(^|[^`])"+i+"([^`]|$)").test(r);)i+="`";for(/[^ \r\n]/.test(r)&&(/^[ \r\n]/.test(r)&&/[ \r\n]$/.test(r)||/^`|`$/.test(r))&&(r=` `+r+` `);++a<n.unsafe.length;){let e=n.unsafe[a],t=n.compilePattern(e),i;if(e.atBreak)for(;i=t.exec(r);){let e=i.index;r.charCodeAt(e)===10&&r.charCodeAt(e-1)===13&&e--,r=r.slice(0,e)+` `+r.slice(i.index+1)}}return i+r+i}function hs(){return"`"}function gs(e,t){let n=ut(e);return!!(!t.options.resourceLink&&e.url&&!e.title&&e.children&&e.children.length===1&&e.children[0].type===`text`&&(n===e.url||`mailto:`+n===e.url)&&/^[a-z][a-z+.-]+:/i.test(e.url)&&!/[\0- <>\u007F]/.test(e.url))}_s.peek=vs;function _s(e,t,n,r){let i=$o(n),a=i===`"`?`Quote`:`Apostrophe`,o=n.createTracker(r),s,c;if(gs(e,n)){let t=n.stack;n.stack=[],s=n.enter(`autolink`);let r=o.move(`<`);return r+=o.move(n.containerPhrasing(e,{before:r,after:`>`,...o.current()})),r+=o.move(`>`),s(),n.stack=t,r}s=n.enter(`link`),c=n.enter(`label`);let l=o.move(`[`);return l+=o.move(n.containerPhrasing(e,{before:l,after:`](`,...o.current()})),l+=o.move(`](`),c(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(c=n.enter(`destinationLiteral`),l+=o.move(`<`),l+=o.move(n.safe(e.url,{before:l,after:`>`,...o.current()})),l+=o.move(`>`)):(c=n.enter(`destinationRaw`),l+=o.move(n.safe(e.url,{before:l,after:e.title?` `:`)`,...o.current()}))),c(),e.title&&(c=n.enter(`title${a}`),l+=o.move(` `+i),l+=o.move(n.safe(e.title,{before:l,after:i,...o.current()})),l+=o.move(i),c()),l+=o.move(`)`),s(),l}function vs(e,t,n){return gs(e,n)?`<`:`[`}ys.peek=bs;function ys(e,t,n,r){let i=e.referenceType,a=n.enter(`linkReference`),o=n.enter(`label`),s=n.createTracker(r),c=s.move(`[`),l=n.containerPhrasing(e,{before:c,after:`]`,...s.current()});c+=s.move(l+`][`),o();let u=n.stack;n.stack=[],o=n.enter(`reference`);let d=n.safe(n.associationId(e),{before:c,after:`]`,...s.current()});return o(),n.stack=u,a(),i===`full`||!l||l!==d?c+=s.move(d+`]`):i===`shortcut`?c=c.slice(0,-1):c+=s.move(`]`),c}function bs(){return`[`}function xs(e){let t=e.options.bullet||`*`;if(t!==`*`&&t!==`+`&&t!==`-`)throw Error("Cannot serialize items with `"+t+"` for `options.bullet`, expected `*`, `+`, or `-`");return t}function Ss(e){let t=xs(e),n=e.options.bulletOther;if(!n)return t===`*`?`-`:`*`;if(n!==`*`&&n!==`+`&&n!==`-`)throw Error("Cannot serialize items with `"+n+"` for `options.bulletOther`, expected `*`, `+`, or `-`");if(n===t)throw Error("Expected `bullet` (`"+t+"`) and `bulletOther` (`"+n+"`) to be different");return n}function Cs(e){let t=e.options.bulletOrdered||`.`;if(t!==`.`&&t!==`)`)throw Error("Cannot serialize items with `"+t+"` for `options.bulletOrdered`, expected `.` or `)`");return t}function ws(e){let t=e.options.rule||`*`;if(t!==`*`&&t!==`-`&&t!==`_`)throw Error("Cannot serialize rules with `"+t+"` for `options.rule`, expected `*`, `-`, or `_`");return t}function Ts(e,t,n,r){let i=n.enter(`list`),a=n.bulletCurrent,o=e.ordered?Cs(n):xs(n),s=e.ordered?o===`.`?`)`:`.`:Ss(n),c=t&&n.bulletLastUsed?o===n.bulletLastUsed:!1;if(!e.ordered){let t=e.children?e.children[0]:void 0;if((o===`*`||o===`-`)&&t&&(!t.children||!t.children[0])&&n.stack[n.stack.length-1]===`list`&&n.stack[n.stack.length-2]===`listItem`&&n.stack[n.stack.length-3]===`list`&&n.stack[n.stack.length-4]===`listItem`&&n.indexStack[n.indexStack.length-1]===0&&n.indexStack[n.indexStack.length-2]===0&&n.indexStack[n.indexStack.length-3]===0&&(c=!0),ws(n)===o&&t){let t=-1;for(;++t<e.children.length;){let n=e.children[t];if(n&&n.type===`listItem`&&n.children&&n.children[0]&&n.children[0].type===`thematicBreak`){c=!0;break}}}}c&&(o=s),n.bulletCurrent=o;let l=n.containerFlow(e,r);return n.bulletLastUsed=o,n.bulletCurrent=a,i(),l}function Es(e){let t=e.options.listItemIndent||`one`;if(t!==`tab`&&t!==`one`&&t!==`mixed`)throw Error("Cannot serialize items with `"+t+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return t}function Ds(e,t,n,r){let i=Es(n),a=n.bulletCurrent||xs(n);t&&t.type===`list`&&t.ordered&&(a=(typeof t.start==`number`&&t.start>-1?t.start:1)+(n.options.incrementListMarker===!1?0:t.children.indexOf(e))+a);let o=a.length+1;(i===`tab`||i===`mixed`&&(t&&t.type===`list`&&t.spread||e.spread))&&(o=Math.ceil(o/4)*4);let s=n.createTracker(r);s.move(a+` `.repeat(o-a.length)),s.shift(o);let c=n.enter(`listItem`),l=n.indentLines(n.containerFlow(e,s.current()),u);return c(),l;function u(e,t,n){return t?(n?``:` `.repeat(o))+e:(n?a:a+` `.repeat(o-a.length))+e}}function Os(e,t,n,r){let i=n.enter(`paragraph`),a=n.enter(`phrasing`),o=n.containerPhrasing(e,r);return a(),i(),o}var ks=d([`break`,`delete`,`emphasis`,`footnote`,`footnoteReference`,`image`,`imageReference`,`inlineCode`,`inlineMath`,`link`,`linkReference`,`mdxJsxTextElement`,`mdxTextExpression`,`strong`,`text`,`textDirective`]);function As(e,t,n,r){return(e.children.some(function(e){return ks(e)})?n.containerPhrasing:n.containerFlow).call(n,e,r)}function js(e){let t=e.options.strong||`*`;if(t!==`*`&&t!==`_`)throw Error("Cannot serialize strong with `"+t+"` for `options.strong`, expected `*`, or `_`");return t}Ms.peek=Ns;function Ms(e,t,n,r){let i=js(n),a=n.enter(`strong`),o=n.createTracker(r),s=o.move(i+i),c=o.move(n.containerPhrasing(e,{after:i,before:s,...o.current()})),l=c.charCodeAt(0),u=rs(r.before.charCodeAt(r.before.length-1),l,i);u.inside&&(c=ns(l)+c.slice(1));let d=c.charCodeAt(c.length-1),f=rs(r.after.charCodeAt(0),d,i);f.inside&&(c=c.slice(0,-1)+ns(d));let p=o.move(i+i);return a(),n.attentionEncodeSurroundingInfo={after:f.outside,before:u.outside},s+c+p}function Ns(e,t,n){return n.options.strong||`*`}function Ps(e,t,n,r){return n.safe(e.value,r)}function Fs(e){let t=e.options.ruleRepetition||3;if(t<3)throw Error("Cannot serialize rules with repetition `"+t+"` for `options.ruleRepetition`, expected `3` or more");return t}function Is(e,t,n){let r=(ws(n)+(n.options.ruleSpaces?` `:``)).repeat(Fs(n));return n.options.ruleSpaces?r.slice(0,-1):r}var Ls={blockquote:Uo,break:qo,code:Zo,definition:es,emphasis:is,hardBreak:qo,heading:ss,html:cs,image:us,imageReference:fs,inlineCode:ms,link:_s,linkReference:ys,list:Ts,listItem:Ds,paragraph:Os,root:As,strong:Ms,text:Ps,thematicBreak:Is};function Rs(){return{enter:{table:zs,tableData:Us,tableHeader:Us,tableRow:Vs},exit:{codeText:Ws,table:Bs,tableData:Hs,tableHeader:Hs,tableRow:Hs}}}function zs(e){let t=e._align;this.enter({type:`table`,align:t.map(function(e){return e===`none`?null:e}),children:[]},e),this.data.inTable=!0}function Bs(e){this.exit(e),this.data.inTable=void 0}function Vs(e){this.enter({type:`tableRow`,children:[]},e)}function Hs(e){this.exit(e)}function Us(e){this.enter({type:`tableCell`,children:[]},e)}function Ws(e){let t=this.resume();this.data.inTable&&(t=t.replace(/\\([\\|])/g,Gs));let n=this.stack[this.stack.length-1];n.type,n.value=t,this.exit(e)}function Gs(e,t){return t===`|`?t:e}function Ks(e){let t=e||{},n=t.tableCellPadding,r=t.tablePipeAlign,i=t.stringLength,a=n?` `:`|`;return{unsafe:[{character:`\r`,inConstruct:`tableCell`},{character:`
`,inConstruct:`tableCell`},{atBreak:!0,character:`|`,after:`[	 :-]`},{character:`|`,inConstruct:`tableCell`},{atBreak:!0,character:`:`,after:`-`},{atBreak:!0,character:`-`,after:`[:|-]`}],handlers:{inlineCode:f,table:o,tableCell:c,tableRow:s}};function o(e,t,n,r){return l(u(e,n,r),e.align)}function s(e,t,n,r){let i=l([d(e,n,r)]);return i.slice(0,i.indexOf(`
`))}function c(e,t,n,r){let i=n.enter(`tableCell`),o=n.enter(`phrasing`),s=n.containerPhrasing(e,{...r,before:a,after:a});return o(),i(),s}function l(e,t){return Bo(e,{align:t,alignDelimiters:r,padding:n,stringLength:i})}function u(e,t,n){let r=e.children,i=-1,a=[],o=t.enter(`table`);for(;++i<r.length;)a[i]=d(r[i],t,n);return o(),a}function d(e,t,n){let r=e.children,i=-1,a=[],o=t.enter(`tableRow`);for(;++i<r.length;)a[i]=c(r[i],e,t,n);return o(),a}function f(e,t,n){let r=Ls.inlineCode(e,t,n);return n.stack.includes(`tableCell`)&&(r=r.replace(/\|/g,`\\$&`)),r}}function qs(){return{exit:{taskListCheckValueChecked:Ys,taskListCheckValueUnchecked:Ys,paragraph:Xs}}}function Js(){return{unsafe:[{atBreak:!0,character:`-`,after:`[:|-]`}],handlers:{listItem:Zs}}}function Ys(e){let t=this.stack[this.stack.length-2];t.type,t.checked=e.type===`taskListCheckValueChecked`}function Xs(e){let t=this.stack[this.stack.length-2];if(t&&t.type===`listItem`&&typeof t.checked==`boolean`){let e=this.stack[this.stack.length-1];e.type;let n=e.children[0];if(n&&n.type===`text`){let r=t.children,i=-1,a;for(;++i<r.length;){let e=r[i];if(e.type===`paragraph`){a=e;break}}a===e&&(n.value=n.value.slice(1),n.value.length===0?e.children.shift():e.position&&n.position&&typeof n.position.start.offset==`number`&&(n.position.start.column++,n.position.start.offset++,e.position.start=Object.assign({},n.position.start)))}}this.exit(e)}function Zs(e,t,n,r){let i=e.children[0],a=typeof e.checked==`boolean`&&i&&i.type===`paragraph`,o=`[`+(e.checked?`x`:` `)+`] `,s=n.createTracker(r);a&&s.move(o);let c=Ls.listItem(e,t,n,{...r,...s.current()});return a&&(c=c.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,l)),c;function l(e){return e+o}}function Qs(){return[ro(),Oo(),No(),Rs(),qs()]}function $s(e){return{extensions:[io(),ko(e),Po(),Ks(e),Js()]}}var ec={tokenize:fc,partial:!0},tc={tokenize:pc,partial:!0},nc={tokenize:mc,partial:!0},rc={tokenize:hc,partial:!0},ic={tokenize:gc,partial:!0},ac={name:`wwwAutolink`,tokenize:uc,previous:_c},oc={name:`protocolAutolink`,tokenize:dc,previous:vc},Z={name:`emailAutolink`,tokenize:lc,previous:yc},Q={};function sc(){return{text:Q}}for(var cc=48;cc<123;)Q[cc]=Z,cc++,cc===58?cc=65:cc===91&&(cc=97);Q[43]=Z,Q[45]=Z,Q[46]=Z,Q[95]=Z,Q[72]=[Z,oc],Q[104]=[Z,oc],Q[87]=[Z,ac],Q[119]=[Z,ac];function lc(e,t,n){let r=this,i,a;return o;function o(t){return!bc(t)||!yc.call(r,r.previous)||xc(r.events)?n(t):(e.enter(`literalAutolink`),e.enter(`literalAutolinkEmail`),s(t))}function s(t){return bc(t)?(e.consume(t),s):t===64?(e.consume(t),c):n(t)}function c(t){return t===46?e.check(ic,u,l)(t):t===45||t===95||V(t)?(a=!0,e.consume(t),c):u(t)}function l(t){return e.consume(t),i=!0,c}function u(o){return a&&i&&B(r.previous)?(e.exit(`literalAutolinkEmail`),e.exit(`literalAutolink`),t(o)):n(o)}}function uc(e,t,n){let r=this;return i;function i(t){return t!==87&&t!==119||!_c.call(r,r.previous)||xc(r.events)?n(t):(e.enter(`literalAutolink`),e.enter(`literalAutolinkWww`),e.check(ec,e.attempt(tc,e.attempt(nc,a),n),n)(t))}function a(n){return e.exit(`literalAutolinkWww`),e.exit(`literalAutolink`),t(n)}}function dc(e,t,n){let r=this,i=``,a=!1;return o;function o(t){return(t===72||t===104)&&vc.call(r,r.previous)&&!xc(r.events)?(e.enter(`literalAutolink`),e.enter(`literalAutolinkHttp`),i+=String.fromCodePoint(t),e.consume(t),s):n(t)}function s(t){if(B(t)&&i.length<5)return i+=String.fromCodePoint(t),e.consume(t),s;if(t===58){let n=i.toLowerCase();if(n===`http`||n===`https`)return e.consume(t),c}return n(t)}function c(t){return t===47?(e.consume(t),a?l:(a=!0,c)):n(t)}function l(t){return t===null||St(t)||U(t)||Dt(t)||Et(t)?n(t):e.attempt(tc,e.attempt(nc,u),n)(t)}function u(n){return e.exit(`literalAutolinkHttp`),e.exit(`literalAutolink`),t(n)}}function fc(e,t,n){let r=0;return i;function i(t){return(t===87||t===119)&&r<3?(r++,e.consume(t),i):t===46&&r===3?(e.consume(t),a):n(t)}function a(e){return e===null?n(e):t(e)}}function pc(e,t,n){let r,i,a;return o;function o(t){return t===46||t===95?e.check(rc,c,s)(t):t===null||U(t)||Dt(t)||t!==45&&Et(t)?c(t):(a=!0,e.consume(t),o)}function s(t){return t===95?r=!0:(i=r,r=void 0),e.consume(t),o}function c(e){return i||r||!a?n(e):t(e)}}function mc(e,t){let n=0,r=0;return i;function i(o){return o===40?(n++,e.consume(o),i):o===41&&r<n?a(o):o===33||o===34||o===38||o===39||o===41||o===42||o===44||o===46||o===58||o===59||o===60||o===63||o===93||o===95||o===126?e.check(rc,t,a)(o):o===null||U(o)||Dt(o)?t(o):(e.consume(o),i)}function a(t){return t===41&&r++,e.consume(t),i}}function hc(e,t,n){return r;function r(o){return o===33||o===34||o===39||o===41||o===42||o===44||o===46||o===58||o===59||o===63||o===95||o===126?(e.consume(o),r):o===38?(e.consume(o),a):o===93?(e.consume(o),i):o===60||o===null||U(o)||Dt(o)?t(o):n(o)}function i(e){return e===null||e===40||e===91||U(e)||Dt(e)?t(e):r(e)}function a(e){return B(e)?o(e):n(e)}function o(t){return t===59?(e.consume(t),r):B(t)?(e.consume(t),o):n(t)}}function gc(e,t,n){return r;function r(t){return e.consume(t),i}function i(e){return V(e)?n(e):t(e)}}function _c(e){return e===null||e===40||e===42||e===95||e===91||e===93||e===126||U(e)}function vc(e){return!B(e)}function yc(e){return!(e===47||bc(e))}function bc(e){return e===43||e===45||e===46||e===95||V(e)}function xc(e){let t=e.length,n=!1;for(;t--;){let r=e[t][1];if((r.type===`labelLink`||r.type===`labelImage`)&&!r._balanced){n=!0;break}if(r._gfmAutolinkLiteralWalkedInto){n=!1;break}}return e.length>0&&!n&&(e[e.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),n}var Sc={tokenize:Ac,partial:!0};function Cc(){return{document:{91:{name:`gfmFootnoteDefinition`,tokenize:Dc,continuation:{tokenize:Oc},exit:kc}},text:{91:{name:`gfmFootnoteCall`,tokenize:Ec},93:{name:`gfmPotentialFootnoteCall`,add:`after`,tokenize:wc,resolveTo:Tc}}}}function wc(e,t,n){let r=this,i=r.events.length,a=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),o;for(;i--;){let e=r.events[i][1];if(e.type===`labelImage`){o=e;break}if(e.type===`gfmFootnoteCall`||e.type===`labelLink`||e.type===`label`||e.type===`image`||e.type===`link`)break}return s;function s(i){if(!o||!o._balanced)return n(i);let s=z(r.sliceSerialize({start:o.end,end:r.now()}));return s.codePointAt(0)!==94||!a.includes(s.slice(1))?n(i):(e.enter(`gfmFootnoteCallLabelMarker`),e.consume(i),e.exit(`gfmFootnoteCallLabelMarker`),t(i))}}function Tc(e,t){let n=e.length;for(;n--;)if(e[n][1].type===`labelImage`&&e[n][0]===`enter`){e[n][1];break}e[n+1][1].type=`data`,e[n+3][1].type=`gfmFootnoteCallLabelMarker`;let r={type:`gfmFootnoteCall`,start:Object.assign({},e[n+3][1].start),end:Object.assign({},e[e.length-1][1].end)},i={type:`gfmFootnoteCallMarker`,start:Object.assign({},e[n+3][1].end),end:Object.assign({},e[n+3][1].end)};i.end.column++,i.end.offset++,i.end._bufferIndex++;let a={type:`gfmFootnoteCallString`,start:Object.assign({},i.end),end:Object.assign({},e[e.length-1][1].start)},o={type:`chunkString`,contentType:`string`,start:Object.assign({},a.start),end:Object.assign({},a.end)},s=[e[n+1],e[n+2],[`enter`,r,t],e[n+3],e[n+4],[`enter`,i,t],[`exit`,i,t],[`enter`,a,t],[`enter`,o,t],[`exit`,o,t],[`exit`,a,t],e[e.length-2],e[e.length-1],[`exit`,r,t]];return e.splice(n,e.length-n+1,...s),e}function Ec(e,t,n){let r=this,i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),a=0,o;return s;function s(t){return e.enter(`gfmFootnoteCall`),e.enter(`gfmFootnoteCallLabelMarker`),e.consume(t),e.exit(`gfmFootnoteCallLabelMarker`),c}function c(t){return t===94?(e.enter(`gfmFootnoteCallMarker`),e.consume(t),e.exit(`gfmFootnoteCallMarker`),e.enter(`gfmFootnoteCallString`),e.enter(`chunkString`).contentType=`string`,l):n(t)}function l(s){if(a>999||s===93&&!o||s===null||s===91||U(s))return n(s);if(s===93){e.exit(`chunkString`);let a=e.exit(`gfmFootnoteCallString`);return i.includes(z(r.sliceSerialize(a)))?(e.enter(`gfmFootnoteCallLabelMarker`),e.consume(s),e.exit(`gfmFootnoteCallLabelMarker`),e.exit(`gfmFootnoteCall`),t):n(s)}return U(s)||(o=!0),a++,e.consume(s),s===92?u:l}function u(t){return t===91||t===92||t===93?(e.consume(t),a++,l):l(t)}}function Dc(e,t,n){let r=this,i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),a,o=0,s;return c;function c(t){return e.enter(`gfmFootnoteDefinition`)._container=!0,e.enter(`gfmFootnoteDefinitionLabel`),e.enter(`gfmFootnoteDefinitionLabelMarker`),e.consume(t),e.exit(`gfmFootnoteDefinitionLabelMarker`),l}function l(t){return t===94?(e.enter(`gfmFootnoteDefinitionMarker`),e.consume(t),e.exit(`gfmFootnoteDefinitionMarker`),e.enter(`gfmFootnoteDefinitionLabelString`),e.enter(`chunkString`).contentType=`string`,u):n(t)}function u(t){if(o>999||t===93&&!s||t===null||t===91||U(t))return n(t);if(t===93){e.exit(`chunkString`);let n=e.exit(`gfmFootnoteDefinitionLabelString`);return a=z(r.sliceSerialize(n)),e.enter(`gfmFootnoteDefinitionLabelMarker`),e.consume(t),e.exit(`gfmFootnoteDefinitionLabelMarker`),e.exit(`gfmFootnoteDefinitionLabel`),f}return U(t)||(s=!0),o++,e.consume(t),t===92?d:u}function d(t){return t===91||t===92||t===93?(e.consume(t),o++,u):u(t)}function f(t){return t===58?(e.enter(`definitionMarker`),e.consume(t),e.exit(`definitionMarker`),i.includes(a)||i.push(a),K(e,p,`gfmFootnoteDefinitionWhitespace`)):n(t)}function p(e){return t(e)}}function Oc(e,t,n){return e.check(Ut,t,e.attempt(Sc,t,n))}function kc(e){e.exit(`gfmFootnoteDefinition`)}function Ac(e,t,n){let r=this;return K(e,i,`gfmFootnoteDefinitionIndent`,5);function i(e){let i=r.events[r.events.length-1];return i&&i[1].type===`gfmFootnoteDefinitionIndent`&&i[2].sliceSerialize(i[1],!0).length===4?t(e):n(e)}}function jc(e){let t=(e||{}).singleTilde,n={name:`strikethrough`,tokenize:i,resolveAll:r};return t??=!0,{text:{126:n},insideSpan:{null:[n]},attentionMarkers:{null:[126]}};function r(e,t){let n=-1;for(;++n<e.length;)if(e[n][0]===`enter`&&e[n][1].type===`strikethroughSequenceTemporary`&&e[n][1]._close){let r=n;for(;r--;)if(e[r][0]===`exit`&&e[r][1].type===`strikethroughSequenceTemporary`&&e[r][1]._open&&e[n][1].end.offset-e[n][1].start.offset===e[r][1].end.offset-e[r][1].start.offset){e[n][1].type=`strikethroughSequence`,e[r][1].type=`strikethroughSequence`;let i={type:`strikethrough`,start:Object.assign({},e[r][1].start),end:Object.assign({},e[n][1].end)},a={type:`strikethroughText`,start:Object.assign({},e[r][1].end),end:Object.assign({},e[n][1].start)},o=[[`enter`,i,t],[`enter`,e[r][1],t],[`exit`,e[r][1],t],[`enter`,a,t]],s=t.parser.constructs.insideSpan.null;s&&L(o,o.length,0,It(s,e.slice(r+1,n),t)),L(o,o.length,0,[[`exit`,a,t],[`enter`,e[n][1],t],[`exit`,e[n][1],t],[`exit`,i,t]]),L(e,r-1,n-r+3,o),n=r+o.length-2;break}}for(n=-1;++n<e.length;)e[n][1].type===`strikethroughSequenceTemporary`&&(e[n][1].type=`data`);return e}function i(e,n,r){let i=this.previous,a=this.events,o=0;return s;function s(t){return i===126&&a[a.length-1][1].type!==`characterEscape`?r(t):(e.enter(`strikethroughSequenceTemporary`),c(t))}function c(a){let s=Ft(i);if(a===126)return o>1?r(a):(e.consume(a),o++,c);if(o<2&&!t)return r(a);let l=e.exit(`strikethroughSequenceTemporary`),u=Ft(a);return l._open=!u||u===2&&!!s,l._close=!s||s===2&&!!u,n(a)}}}var Mc=class{constructor(){this.map=[]}add(e,t,n){Nc(this,e,t,n)}consume(e){if(this.map.sort(function(e,t){return e[0]-t[0]}),this.map.length===0)return;let t=this.map.length,n=[];for(;t>0;)--t,n.push(e.slice(this.map[t][0]+this.map[t][1]),this.map[t][2]),e.length=this.map[t][0];n.push(e.slice()),e.length=0;let r=n.pop();for(;r;){for(let t of r)e.push(t);r=n.pop()}this.map.length=0}};function Nc(e,t,n,r){let i=0;if(!(n===0&&r.length===0)){for(;i<e.map.length;){if(e.map[i][0]===t){e.map[i][1]+=n,e.map[i][2].push(...r);return}i+=1}e.map.push([t,n,r])}}function Pc(e,t){let n=!1,r=[];for(;t<e.length;){let i=e[t];if(n){if(i[0]===`enter`)i[1].type===`tableContent`&&r.push(e[t+1][1].type===`tableDelimiterMarker`?`left`:`none`);else if(i[1].type===`tableContent`){if(e[t-1][1].type===`tableDelimiterMarker`){let e=r.length-1;r[e]=r[e]===`left`?`center`:`right`}}else if(i[1].type===`tableDelimiterRow`)break}else i[0]===`enter`&&i[1].type===`tableDelimiterRow`&&(n=!0);t+=1}return r}function Fc(){return{flow:{null:{name:`table`,tokenize:Ic,resolveAll:Lc}}}}function Ic(e,t,n){let r=this,i=0,a=0,o;return s;function s(e){let t=r.events.length-1;for(;t>-1;){let e=r.events[t][1].type;if(e===`lineEnding`||e===`linePrefix`)t--;else break}let i=t>-1?r.events[t][1].type:null,a=i===`tableHead`||i===`tableRow`?S:c;return a===S&&r.parser.lazy[r.now().line]?n(e):a(e)}function c(t){return e.enter(`tableHead`),e.enter(`tableRow`),l(t)}function l(e){return e===124?u(e):(o=!0,a+=1,u(e))}function u(t){return t===null?n(t):H(t)?a>1?(a=0,r.interrupt=!0,e.exit(`tableRow`),e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),p):n(t):W(t)?K(e,u,`whitespace`)(t):(a+=1,o&&(o=!1,i+=1),t===124?(e.enter(`tableCellDivider`),e.consume(t),e.exit(`tableCellDivider`),o=!0,u):(e.enter(`data`),d(t)))}function d(t){return t===null||t===124||U(t)?(e.exit(`data`),u(t)):(e.consume(t),t===92?f:d)}function f(t){return t===92||t===124?(e.consume(t),d):d(t)}function p(t){return r.interrupt=!1,r.parser.lazy[r.now().line]?n(t):(e.enter(`tableDelimiterRow`),o=!1,W(t)?K(e,m,`linePrefix`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)(t):m(t))}function m(t){return t===45||t===58?g(t):t===124?(o=!0,e.enter(`tableCellDivider`),e.consume(t),e.exit(`tableCellDivider`),h):x(t)}function h(t){return W(t)?K(e,g,`whitespace`)(t):g(t)}function g(t){return t===58?(a+=1,o=!0,e.enter(`tableDelimiterMarker`),e.consume(t),e.exit(`tableDelimiterMarker`),_):t===45?(a+=1,_(t)):t===null||H(t)?b(t):x(t)}function _(t){return t===45?(e.enter(`tableDelimiterFiller`),v(t)):x(t)}function v(t){return t===45?(e.consume(t),v):t===58?(o=!0,e.exit(`tableDelimiterFiller`),e.enter(`tableDelimiterMarker`),e.consume(t),e.exit(`tableDelimiterMarker`),y):(e.exit(`tableDelimiterFiller`),y(t))}function y(t){return W(t)?K(e,b,`whitespace`)(t):b(t)}function b(n){return n===124?m(n):n===null||H(n)?!o||i!==a?x(n):(e.exit(`tableDelimiterRow`),e.exit(`tableHead`),t(n)):x(n)}function x(e){return n(e)}function S(t){return e.enter(`tableRow`),C(t)}function C(n){return n===124?(e.enter(`tableCellDivider`),e.consume(n),e.exit(`tableCellDivider`),C):n===null||H(n)?(e.exit(`tableRow`),t(n)):W(n)?K(e,C,`whitespace`)(n):(e.enter(`data`),w(n))}function w(t){return t===null||t===124||U(t)?(e.exit(`data`),C(t)):(e.consume(t),t===92?T:w)}function T(t){return t===92||t===124?(e.consume(t),w):w(t)}}function Lc(e,t){let n=-1,r=!0,i=0,a=[0,0,0,0],o=[0,0,0,0],s=!1,c=0,l,u,d,f=new Mc;for(;++n<e.length;){let p=e[n],m=p[1];p[0]===`enter`?m.type===`tableHead`?(s=!1,c!==0&&(zc(f,t,c,l,u),u=void 0,c=0),l={type:`table`,start:Object.assign({},m.start),end:Object.assign({},m.end)},f.add(n,0,[[`enter`,l,t]])):m.type===`tableRow`||m.type===`tableDelimiterRow`?(r=!0,d=void 0,a=[0,0,0,0],o=[0,n+1,0,0],s&&(s=!1,u={type:`tableBody`,start:Object.assign({},m.start),end:Object.assign({},m.end)},f.add(n,0,[[`enter`,u,t]])),i=m.type===`tableDelimiterRow`?2:u?3:1):i&&(m.type===`data`||m.type===`tableDelimiterMarker`||m.type===`tableDelimiterFiller`)?(r=!1,o[2]===0&&(a[1]!==0&&(o[0]=o[1],d=Rc(f,t,a,i,void 0,d),a=[0,0,0,0]),o[2]=n)):m.type===`tableCellDivider`&&(r?r=!1:(a[1]!==0&&(o[0]=o[1],d=Rc(f,t,a,i,void 0,d)),a=o,o=[a[1],n,0,0])):m.type===`tableHead`?(s=!0,c=n):m.type===`tableRow`||m.type===`tableDelimiterRow`?(c=n,a[1]===0?o[1]!==0&&(d=Rc(f,t,o,i,n,d)):(o[0]=o[1],d=Rc(f,t,a,i,n,d)),i=0):i&&(m.type===`data`||m.type===`tableDelimiterMarker`||m.type===`tableDelimiterFiller`)&&(o[3]=n)}for(c!==0&&zc(f,t,c,l,u),f.consume(t.events),n=-1;++n<t.events.length;){let e=t.events[n];e[0]===`enter`&&e[1].type===`table`&&(e[1]._align=Pc(t.events,n))}return e}function Rc(e,t,n,r,i,a){let o=r===1?`tableHeader`:r===2?`tableDelimiter`:`tableData`;n[0]!==0&&(a.end=Object.assign({},Bc(t.events,n[0])),e.add(n[0],0,[[`exit`,a,t]]));let s=Bc(t.events,n[1]);if(a={type:o,start:Object.assign({},s),end:Object.assign({},s)},e.add(n[1],0,[[`enter`,a,t]]),n[2]!==0){let i=Bc(t.events,n[2]),a=Bc(t.events,n[3]),o={type:`tableContent`,start:Object.assign({},i),end:Object.assign({},a)};if(e.add(n[2],0,[[`enter`,o,t]]),r!==2){let r=t.events[n[2]],i=t.events[n[3]];if(r[1].end=Object.assign({},i[1].end),r[1].type=`chunkText`,r[1].contentType=`text`,n[3]>n[2]+1){let t=n[2]+1,r=n[3]-n[2]-1;e.add(t,r,[])}}e.add(n[3]+1,0,[[`exit`,o,t]])}return i!==void 0&&(a.end=Object.assign({},Bc(t.events,i)),e.add(i,0,[[`exit`,a,t]]),a=void 0),a}function zc(e,t,n,r,i){let a=[],o=Bc(t.events,n);i&&(i.end=Object.assign({},o),a.push([`exit`,i,t])),r.end=Object.assign({},o),a.push([`exit`,r,t]),e.add(n+1,0,a)}function Bc(e,t){let n=e[t],r=n[0]===`enter`?`start`:`end`;return n[1][r]}var Vc={name:`tasklistCheck`,tokenize:Uc};function Hc(){return{text:{91:Vc}}}function Uc(e,t,n){let r=this;return i;function i(t){return r.previous!==null||!r._gfmTasklistFirstContentOfListItem?n(t):(e.enter(`taskListCheck`),e.enter(`taskListCheckMarker`),e.consume(t),e.exit(`taskListCheckMarker`),a)}function a(t){return U(t)?(e.enter(`taskListCheckValueUnchecked`),e.consume(t),e.exit(`taskListCheckValueUnchecked`),o):t===88||t===120?(e.enter(`taskListCheckValueChecked`),e.consume(t),e.exit(`taskListCheckValueChecked`),o):n(t)}function o(t){return t===93?(e.enter(`taskListCheckMarker`),e.consume(t),e.exit(`taskListCheckMarker`),e.exit(`taskListCheck`),s):n(t)}function s(r){return H(r)?t(r):W(r)?e.check({tokenize:Wc},t,n)(r):n(r)}}function Wc(e,t,n){return K(e,r,`whitespace`);function r(e){return e===null?n(e):t(e)}}function Gc(e){return _t([sc(),Cc(),jc(e),Fc(),Hc()])}var Kc={};function qc(e){let t=this,n=e||Kc,r=t.data(),i=r.micromarkExtensions||=[],a=r.fromMarkdownExtensions||=[],o=r.toMarkdownExtensions||=[];i.push(Gc(n)),a.push(Qs()),o.push($s(n))}var Jc=`https://github.com/santhosh-patel/substack-agent/edit/main/docs`,Yc=[{title:`Introduction`,items:[{title:`Overview`,path:``,file:`index.md`,modes:[],description:`Start here — choose a deployment mode and follow the right learning path.`}]},{title:`Getting Started`,items:[{title:`Install`,path:`getting-started/install`,file:`getting-started/install.md`,modes:[],description:"Clone, configure `.env`, and run the local server or MCP."},{title:`Session Cookie`,path:`getting-started/session-cookie`,file:`getting-started/session-cookie.md`,modes:[`Local Dashboard`,`MCP`],description:"How to extract and rotate your Substack `connect.sid` cookie safely."},{title:`Environment Variables`,path:`getting-started/environment-variables`,file:`getting-started/environment-variables.md`,modes:[],description:`Reference for all server env vars — required, optional, and production-only.`},{title:`First Publish`,path:`getting-started/first-publish`,file:`getting-started/first-publish.md`,modes:[`Local Dashboard`],description:`Step-by-step walkthrough: connect, generate, and save your first draft.`}]},{title:`Local Dashboard`,items:[{title:`Overview`,path:`dashboard/overview`,file:`dashboard/overview.md`,modes:[`Local Dashboard`],description:`Playground architecture, tabs, and when to use the dashboard vs the Tools API.`},{title:`Settings`,path:`dashboard/settings`,file:`dashboard/settings.md`,modes:[`Local Dashboard`],description:`Substack session, AI providers, system prompts, and connection testing.`},{title:`Newsletters`,path:`dashboard/newsletters`,file:`dashboard/newsletters.md`,modes:[`Local Dashboard`],description:`AI-assisted newsletter compose, preview, draft, and publish.`},{title:`Notes`,path:`dashboard/notes`,file:`dashboard/notes.md`,modes:[`Local Dashboard`],description:`Short Substack notes with optional link cards.`},{title:`Comments`,path:`dashboard/comments`,file:`dashboard/comments.md`,modes:[`Local Dashboard`],description:`Keyword-based comment automation on target accounts.`},{title:`Scheduler`,path:`dashboard/scheduler`,file:`dashboard/scheduler.md`,modes:[`Local Dashboard`],description:`Queue newsletters and notes for one-off or recurring publish times.`},{title:`History`,path:`dashboard/history`,file:`dashboard/history.md`,modes:[`Local Dashboard`],description:`Unified history of publishes, notes, comments, and Substack archive.`}]},{title:`MCP Server`,items:[{title:`Setup`,path:`mcp/setup`,file:`mcp/setup.md`,modes:[`MCP`],description:`Local stdio MCP for Claude Desktop and Cursor.`},{title:`Remote MCP (HTTP)`,path:`mcp/remote`,file:`mcp/remote.md`,modes:[`MCP`,`Tools API`],description:"Connect MCP clients to your deployed domain at `/api/mcp`."},{title:`Tools Reference`,path:`mcp/tools`,file:`mcp/tools.md`,modes:[`MCP`],description:`All 9 MCP tools with parameters and examples.`},{title:`Limitations`,path:`mcp/limitations`,file:`mcp/limitations.md`,modes:[`MCP`],description:`Session auth, scheduling, and platform constraints.`}]},{title:`Tools API`,items:[{title:`Overview`,path:`api/overview`,file:`api/overview.md`,modes:[`Tools API`],description:`REST endpoints for n8n, GPTs, and custom automations at your domain.`},{title:`Endpoints`,path:`api/endpoints`,file:`api/endpoints.md`,modes:[`Tools API`],description:`Complete route list with curl examples.`},{title:`OpenAPI`,path:`api/openapi`,file:`api/openapi.md`,modes:[`Tools API`],description:`Import the spec into GPT Actions, Postman, or n8n.`},{title:`Dashboard API`,path:`api/dashboard-api`,file:`api/dashboard-api.md`,modes:[`Local Dashboard`],description:"Unauthenticated `/api/*` routes used by the playground UI."}]},{title:`Deployment`,items:[{title:`Deployment Modes`,path:`deployment/modes`,file:`deployment/modes.md`,modes:[],description:`Compare local dashboard, Tools API, stdio MCP, and remote MCP.`},{title:`Deploy Tools API`,path:`deployment/deploy`,file:`deployment/deploy.md`,modes:[`Tools API`],description:`Deploy anywhere: Docker, Railway, Render, Fly, or any Node host.`},{title:`Vercel (optional)`,path:`deployment/vercel`,file:`deployment/vercel.md`,modes:[`Tools API`],description:`Serverless deploy notes and ephemeral storage limits.`},{title:`Scheduler & Cron`,path:`deployment/scheduler-cron`,file:`deployment/scheduler-cron.md`,modes:[`Local Dashboard`],description:`Local worker, manual triggers, and external cron setup.`}]},{title:`Integrations`,items:[{title:`Claude Desktop`,path:`integrations/claude-desktop`,file:`integrations/claude-desktop.md`,modes:[`MCP`],description:"Configure stdio MCP in `claude_desktop_config.json`."},{title:`Cursor`,path:`integrations/cursor`,file:`integrations/cursor.md`,modes:[`MCP`],description:`Local stdio or remote HTTP MCP in Cursor settings.`},{title:`n8n`,path:`integrations/n8n`,file:`integrations/n8n.md`,modes:[`Tools API`],description:"HTTP Request nodes against `/api/tools/*`."},{title:`Custom GPT`,path:`integrations/custom-gpt`,file:`integrations/custom-gpt.md`,modes:[`Tools API`],description:`OpenAPI Actions pointing at your deployment.`}]},{title:`Operations`,items:[{title:`Security`,path:`security`,file:`security.md`,modes:[],description:`Auth model, cookie handling, and production hardening.`},{title:`Troubleshooting`,path:`troubleshooting`,file:`troubleshooting.md`,modes:[],description:`Symptom → cause → fix for common failures.`},{title:`Changelog`,path:`changelog`,file:`changelog.md`,modes:[],description:`Release history for Substack Agent.`}]}],$=Yc.flatMap(e=>e.items.map(t=>({...t,section:e.title})));function Xc(e){let t=e.replace(/^\/docs\/?/,``).replace(/\/$/,``);return $.find(e=>e.path===t)??$[0]}function Zc(e){let t=e.replace(/^\/docs\/?/,``).replace(/\/$/,``),n=$.findIndex(e=>e.path===t);return n===-1?{prev:null,next:$[1]??null}:{prev:n>0?$[n-1]:null,next:n<$.length-1?$[n+1]:null}}function Qc(e){return e?`/docs/${e}`:`/docs`}var $c=Object.assign({"../../../docs/api/dashboard-api.md":`# Dashboard API Reference

Routes under \`/api/*\` used by the playground UI.

> **Warning:** These routes have **no authentication**. Intended for local \`npm run dev\` only. Do not expose publicly with a live Substack session.

## Connection

| Method | Path | Description |
|--------|------|-------------|
| GET | \`/api/config\` | Deployment mode, env flags (no secrets) |
| POST | \`/api/connect\` | Establish Substack session |
| GET | \`/api/profile\` | Connected profile info |
| POST | \`/api/disconnect\` | Clear session |

## Content

| Method | Path | Description |
|--------|------|-------------|
| POST | \`/api/generate\` | AI newsletter generation |
| POST | \`/api/publish\` | Publish newsletter |
| GET | \`/api/newsletters\` | List archive |
| POST | \`/api/notes/generate\` | AI note generation |
| POST | \`/api/notes/publish\` | Publish note |
| GET | \`/api/notes\` | List notes |

## Automation

| Method | Path | Description |
|--------|------|-------------|
| POST | \`/api/comments/automate\` | Run comment automation |
| GET | \`/api/comments\` | Comment automation log |
| GET | \`/api/publications/history\` | Server publication history |

## Scheduler

| Method | Path | Description |
|--------|------|-------------|
| GET | \`/api/schedule\` | List schedules |
| POST | \`/api/schedule\` | Create schedule |
| DELETE | \`/api/schedule/:id\` | Delete schedule |
| POST | \`/api/schedule/:id/toggle\` | Pause/resume |
| POST | \`/api/schedule/:id/run-now\` | Run immediately |
| POST | \`/api/schedule/:id/retry\` | Retry failed job |

## Cron

| Method | Path | Description |
|--------|------|-------------|
| GET/POST | \`/api/cron/process-schedules\` | Process due schedules |

## Testing

| Method | Path | Description |
|--------|------|-------------|
| POST | \`/api/test/substack\` | Validate session cookie |
| POST | \`/api/test/ai-key\` | Validate AI provider key |

## Production alternative

Use [Tools API](/docs/api/overview) with Bearer auth for deployed integrations.
`,"../../../docs/api/endpoints.md":`# Tools API Endpoints

All routes require \`Authorization: Bearer <API_SECRET>\` in production. Base path: \`/api/tools\`.

## Health & status

| Method | Path | Description |
|--------|------|-------------|
| GET | \`/api/tools/health\` | Version, Substack connection status, publication hostname |

\`\`\`bash
curl -s "https://your-domain/api/tools/health" \\
  -H "Authorization: Bearer $API_SECRET"
\`\`\`

## Publishing

| Method | Path | Description |
|--------|------|-------------|
| POST | \`/api/tools/publish-newsletter\` | Create draft or publish newsletter (Markdown body) |
| POST | \`/api/tools/publish-note\` | Publish a short note |
| POST | \`/api/tools/comment\` | Post a comment on a specific post |
| POST | \`/api/tools/automate-comments\` | Scan target account + keyword; AI comments on matches |

### Publish newsletter

\`\`\`bash
curl -X POST "https://your-domain/api/tools/publish-newsletter" \\
  -H "Authorization: Bearer $API_SECRET" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Hello from API",
    "subtitle": "Optional teaser",
    "body": "## Markdown body\\n\\nParagraph text.",
    "isDraft": true
  }'
\`\`\`

| Field | Required | Notes |
|-------|----------|-------|
| \`title\` | Yes | Newsletter title |
| \`body\` | Yes | Markdown content |
| \`subtitle\` | No | Teaser line |
| \`isDraft\` | No | \`true\` (default) = draft; \`false\` = publish + email |

## Query

| Method | Path | Description |
|--------|------|-------------|
| GET | \`/api/tools/list-newsletters\` | Recent newsletter archive |
| GET | \`/api/tools/list-notes\` | Recent notes |
| GET | \`/api/tools/list-comments\` | Comments posted via automation (local log) |

## Scheduling

| Method | Path | Description |
|--------|------|-------------|
| POST | \`/api/tools/schedule-post\` | Queue a newsletter or note |
| GET | \`/api/tools/list-schedules\` | List pending/completed queue |

> **Note:** Schedule storage is durable on local \`npm run dev\`; on Vercel it is ephemeral — see [Scheduler & Cron](/docs/deployment/scheduler-cron).

### Schedule post

\`\`\`bash
curl -X POST "https://your-domain/api/tools/schedule-post" \\
  -H "Authorization: Bearer $API_SECRET" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Weekly digest",
    "body": "Markdown or plain text",
    "scheduledAt": "2026-08-01T12:00:00Z",
    "postType": "newsletter",
    "recurrence": "once",
    "isDraft": true
  }'
\`\`\`

## HTTP status codes

| Status | Typical cause |
|--------|---------------|
| 401 | Missing Bearer token or session expired (\`SESSION_EXPIRED\`) |
| 403 | Invalid \`API_SECRET\` |
| 400 | Missing required JSON fields |
| 503 | \`API_SECRET\` not configured in production |
| 500 | Substack API error — check cookie and publication URL |

## MCP parity

Every Tools API action has an equivalent MCP tool — see [MCP tools reference](/docs/mcp/tools).

## Related

- [Tools API overview](/docs/api/overview)
- [OpenAPI guide](/docs/api/openapi)
- [Deploy](/docs/deployment/deploy)
- [Troubleshooting](/docs/troubleshooting)
`,"../../../docs/api/openapi.md":`# OpenAPI

Substack Agent exposes an OpenAPI 3.1 spec for AI agent discovery.

## Spec URL

[/openapi.json](/openapi.json)

## Using with Custom GPTs

1. Deploy Substack Agent to any Node host with \`API_SECRET\`, \`SUBSTACK_SID\`, and \`SUBSTACK_PUB_URL\` set — see [Deploy the Tools API](/docs/deployment/deploy)
2. In GPT Actions, import schema from \`https://your-domain/openapi.json\`
3. Set authentication: **Bearer** with your \`API_SECRET\`

See [Custom GPT integration](/docs/integrations/custom-gpt).

## Documented operations

| Operation | Path |
|-----------|------|
| publishNewsletter | POST \`/api/tools/publish-newsletter\` |
| publishNote | POST \`/api/tools/publish-note\` |
| postComment | POST \`/api/tools/comment\` |
| automateComments | POST \`/api/tools/automate-comments\` |
| listNewsletters | GET \`/api/tools/list-newsletters\` |
| listNotes | GET \`/api/tools/list-notes\` |
| listComments | GET \`/api/tools/list-comments\` |
| schedulePost | POST \`/api/tools/schedule-post\` |
| listSchedules | GET \`/api/tools/list-schedules\` |

## AI plugin manifest

Also available at \`/.well-known/ai-plugin.json\` for ChatGPT plugin-style integrations.

## Next steps

- [Tools API overview](/docs/api/overview)
- [Endpoints](/docs/api/endpoints)
`,"../../../docs/api/overview.md":`# Tools API Overview

The **Tools API** is a Bearer-protected REST surface at \`/api/tools/*\` for external agents — n8n, Custom GPT Actions, Zapier, cron jobs, and custom backends. Deploy it on **any Node host** and point clients at **your domain**.

## When to use it

| Use Tools API | Use Dashboard \`/api/*\` instead |
|---------------|-------------------------------|
| Production automations | Local playground UI only |
| n8n / GPT / webhooks | Manual testing in browser |
| Bearer auth required | Trusted localhost dev |

## Base URL

| Environment | Base URL |
|-------------|----------|
| Local | \`http://localhost:3456\` |
| Production | \`https://your-domain\` |

All routes are under \`/api/tools/\`.

## Authentication

\`\`\`http
Authorization: Bearer <API_SECRET>
\`\`\`

| Environment | Behavior |
|-------------|----------|
| **Production** (\`NODE_ENV=production\`) | \`API_SECRET\` **required** — missing/invalid token → 401/403 |
| **Local dev** | If \`API_SECRET\` is unset, auth is skipped for easier testing |

Set \`API_SECRET\` in production even on private networks.

## Health check

Verify deploy and Substack session **before** wiring automations:

\`\`\`bash
curl -s "https://your-domain/api/tools/health" \\
  -H "Authorization: Bearer $API_SECRET"
\`\`\`

\`\`\`json
{
  "success": true,
  "data": {
    "version": "1.1.0",
    "connected": true,
    "publication": "yourname.substack.com"
  }
}
\`\`\`

| Field | Meaning |
|-------|---------|
| \`connected\` | Server can reach Substack with current \`SUBSTACK_SID\` |
| \`publication\` | Resolved hostname when connected |

If \`connected\` is \`false\`, refresh [session cookie](/docs/getting-started/session-cookie) in host env vars.

## Response format

**Success:**

\`\`\`json
{
  "success": true,
  "data": { }
}
\`\`\`

**Error:**

\`\`\`json
{
  "success": false,
  "error": "Human-readable message",
  "code": "SESSION_EXPIRED"
}
\`\`\`

| Code | Meaning | Action |
|------|---------|--------|
| \`SESSION_EXPIRED\` | Substack cookie invalid | Update \`SUBSTACK_SID\` |
| \`NOT_CONNECTED\` | No session configured | Set env vars and redeploy |

## Auto-connect

Unlike the playground, Tools API routes **do not** require \`POST /api/connect\`. The server uses \`SUBSTACK_SID\` and \`SUBSTACK_PUB_URL\` from environment on each request.

## Remote MCP (alternative)

Need MCP tool-calling instead of REST? Use **\`/api/mcp\`** with the same Bearer token — see [Remote MCP](/docs/mcp/remote).

## OpenAPI

Machine-readable spec (import into GPT Actions, Postman, n8n):

- Local: [http://localhost:3456/openapi.json](/openapi.json)
- Deployed: \`https://your-domain/openapi.json\`

## Related

- [Endpoints reference](/docs/api/endpoints)
- [Deploy guide](/docs/deployment/deploy)
- [OpenAPI import](/docs/api/openapi)
- [Security](/docs/security)
`,"../../../docs/changelog.md":"# Changelog\n\nAll notable changes to **Substack Agent** are documented in this file.\n\n- **Format:** [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)\n- **Versioning:** [Semantic Versioning](https://semver.org/spec/v2.0.0.html) (`1.0.x` patches, `1.x.0` minors)\n- **Mirror:** [`docs/changelog.md`](docs/changelog.md) must stay identical (enforced by `npm run ci:static`)\n\n## How entries are organized\n\nEach release uses standard Keep a Changelog sections (`Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`).\n\nWithin a section, bullets are grouped by **area** (subheading) and written for engineers:\n\n| Area | Scope |\n|------|--------|\n| **Playground** | `public/playground.html`, `public/js/`, `public/styles.css` |\n| **API / MCP** | `src/routes/`, `src/mcp/`, OpenAPI, Tools API |\n| **Landing / Docs** | `landing-page/`, `docs/`, `public/index.html` |\n| **CI / Build** | `.github/workflows/`, `scripts/`, `package.json` engines |\n| **Tooling** | Maintainer scripts (`scripts/wire-playground.mjs`, etc.) |\n\nBullets cite files, routes, env keys, or runtime behavior where useful. User-facing impact is implied by the technical change.\n\n---\n\n## [1.1.0] — 2026-07-25\n\n> Release engineering, changelog structure, and contributor workflow documentation.\n\n### Added\n\n#### CI / Build — Release tags\n- **Annotated git tags** `v1.0.0` … `v1.0.6` on `main` — monotonic on git history; enables GitHub compare URLs in the changelog footer (`compare/v1.0.5...v1.0.6`, etc.).\n- **`release/1.0.6` branch** — maintenance branch pointing at `v1.0.6` for hotfixes.\n\n| Tag | Commit | Scope |\n|-----|--------|--------|\n| `v1.0.0` | `e23b5a5` | MCP server, Tools API, playground |\n| `v1.0.1` | `35088e4` | `/docs`, onboarding, scheduling API |\n| `v1.0.2` | `9fc5a6f` | Remote MCP HTTP, `public/js/` ES modules |\n| `v1.0.3` | `bcb4752` | CI static checks, docs search |\n| `v1.0.4` | `10b8abe` | Node 20.19+, landing asset sync |\n| `v1.0.5` | `d8fd1b5` | Playground tooltips, reconnect, sidebar UX |\n| `v1.0.6` | `bb7567c` | Security callout, fullscreen preview, JS bundle fixes |\n\n#### Maintainer docs\n- **`CONTRIBUTING.md` rewrite** — fork/upstream workflow, branch naming (`feat/`, `fix/`, `bug/`, `docs/`, `chore/`, etc.), PR steps from fork, issue templates (bug vs feature), changelog rules, semver release/tag process for maintainers.\n\n### Changed\n\n#### Maintainer docs\n- **Changelog format** — area-scoped subheadings, technical bullets, compare-link footer; preamble documents structure and mirror requirement (`CHANGELOG.md` ↔ `docs/changelog.md`).\n- **Package version** — `1.1.0` in `package.json`, `APP_VERSION` (`src/routes/tools.ts`), MCP server metadata (`src/mcp/create-server.ts`), `public/openapi.json`.\n\n### Fixed\n\n#### CI / Build\n- **`vite: not found` on `npm run build`** — root `npm ci` did not install `landing-page/` deps; added root `postinstall` (`npm ci --prefix landing-page`) and `npx vite build` in `landing-page/package.json`.\n\n---\n\n## [1.0.6] — 2026-07-25\n\n> Playground module load reliability, Settings sidebar UX, and newsletter preview fullscreen.\n\n### Added\n\n#### Playground — Settings\n- **`dismissSecurityCallout()`** — exported on `window` via `public/js/main.js` (`WINDOW_EXPORTS`); hides `#securityCallout` and persists `localStorage` key `security_callout_dismissed_v1`.\n- **`initSecurityCallout()`** — restores hidden state on load; runs before `await PG.loadConfigFromBackend()` so UI init is not blocked by `/api/config`.\n- **Scrollable Settings body** — `aside.card .card-body` uses `flex: 1; min-height: 0; overflow-y: auto` so `#settingsPanel` content scrolls inside the sticky sidebar max-height.\n\n#### Playground — Newsletters compose\n- **Fullscreen Substack preview** — `#substackPreviewWrap` clone into `#previewFullscreenOverlay`; `openPreviewFullscreen()` / `closePreviewFullscreen()` in `public/js/publish.js`; expand control in `.editor-pane-header--actions`; Escape closes when overlay is visible; fullscreen typography via `.substack-preview-wrap--fullscreen` (~680px reading column).\n\n### Fixed\n\n#### Playground — JavaScript bundle\n- **Nav tabs and sidebar toggle dead** — root cause: duplicate `import PG` / `const` alias blocks in `public/js/{tabs,history,publish,notes,comments,models,scheduler-core,scheduler-polling}.js` from running `scripts/wire-playground.mjs` twice → `SyntaxError: Identifier 'PG' has already been declared` → `main.js` never attached `window.switchTab`, `window.toggleSidebar`, etc.\n- **Name collisions in wired modules** — removed `const` re-exports that shadowed local functions (e.g. `updatePreviewMetadata` in `publish.js`, scheduler helpers in `scheduler-core.js` / `scheduler-polling.js`).\n\n#### Playground — Settings\n- **Security notice × button inert** — dismiss listener was registered only after `await PG.loadConfigFromBackend()`; replaced with `onclick=\"dismissSecurityCallout()\"` on `#securityCalloutDismiss`.\n\n#### Tooling\n- **`scripts/wire-playground.mjs`** — idempotent re-run: `stripExistingWire()` removes prior import/assign footer; `FILE_DEPS` filtered with `!fnExports.includes(dep)`; deps list trimmed for symbols defined in-file (`updatePreviewMetadata`, scheduler formatters, polling log helpers).\n\n---\n\n## [1.0.5] — 2026-07-25\n\n> Playground chrome, tooltips, reconnect flow, and web-search control styling.\n\n### Added\n\n#### Playground\n- **`title` / `aria-label` tooltips** on nav tabs, settings fields, compose/scheduler/history controls, and dynamically rendered queue/history actions.\n- **Reconnect profile card** — `#connectionBadge` click/keydown calls `openSidebarAndFocusSid()` when `.is-actionable`; focuses `#sid` and surfaces reconnect toast.\n\n### Changed\n\n#### Playground — Layout & chrome\n- **`#sidebarToggle`** — Lucide `settings` icon; `syncSidebarToggleUi()` updates `aria-expanded` and title for collapsed state.\n- **Web search** — checkbox replaced with themed `.feature-toggle` in compose (`#webSearchToggle`) and scheduler (`#schedWebSearchToggle`).\n- **Theme** — removed light/dark toggle; `document.body.classList.remove('light-theme')` on init (dark-only playground).\n\n### Fixed\n\n#### Playground — Settings sidebar\n- **`#sidebarClose` / `toggleSidebar()`** — panel collapse via `.main-grid.sidebar-collapsed` and `localStorage.sidebar_collapsed`; close button styles restored (`.btn-sidebar-close`).\n\n---\n\n## [1.0.4] — 2026-07-24\n\n> Node 20.19+ baseline, CI hardening, landing/docs routing fixes, asset sync.\n\n### Added\n\n#### Landing / Docs\n- **Navbar docs link** (desktop); marketing hash links use absolute `/#section` so `/docs` → home anchors work.\n- **`/docs` error boundary** — render failures show recoverable UI instead of blank page.\n- **Hash scroll** on `/` for `/#features`, `/#integrations`, etc.\n\n#### CI / Build\n- **GitHub Actions** — `lint-build` (Node 20.19 + 22), `api-smoke` (Node 22).\n- **`npm run ci:static`** — validates docs nav ↔ markdown files, OpenAPI ↔ tool route names, required `public/` assets, `.env.example` keys, `CHANGELOG.md` ↔ `docs/changelog.md` parity.\n- **`npm run test:smoke`** — credential-free HTTP smoke against running server.\n- **Dependabot** — root `npm`, `landing-page/npm`, GitHub Actions.\n- **`scripts/sync-landing-dist.mjs`** — copies Vite `landing-page/dist` into `public/` (replaces fragile shell globs).\n\n### Changed\n\n#### CI / Build\n- **`engines.node`:** `^20.19.0 || >=22.12.0` (Vite 8 requirement).\n- **`npm run build:landing`** — `npm run build --prefix landing-page && node scripts/sync-landing-dist.mjs`.\n- **CI job names** — `lint-build`, `api-smoke`; descriptive step titles.\n- **`.env` loading** — does not overwrite env vars already set in the process environment.\n- **`PORT`** — configurable via `process.env.PORT` (default `3456`).\n- **API smoke** — skips credential-gated cases when secrets absent instead of failing the job.\n\n#### Landing / Playground\n- **Hero showcase** — inner panes only (removed nested Mac window chrome).\n- **Playground app header** — removed logo image; responsive icon tabs (`.nav-btn-label`), wrapping `.app-header`.\n\n### Fixed\n\n#### Landing / Docs\n- **`DocsPageContent`** crash — `rehypePlugins is not defined`.\n- **Favicon 404** — `favicon.svg` / `icons.svg` copied into `public/` on landing build.\n\n#### CI / Build\n- **Stale hashed chunks** in `public/assets/` after rebuilds (sync script replaces output cleanly).\n- **GHA failures** on Node 18 / pre-20.19 (engine + matrix alignment).\n\n---\n\n## [1.0.3] — 2026\n\n> Docs search, CI expansion, Tools API session errors.\n\n### Added\n\n#### CI\n- **GitHub Actions** — build, `npm run test:auth`, API smoke tests.\n\n#### Docs\n- **Full-text search**, lazy `/docs` route, code-split syntax highlighting.\n\n#### API\n- **Session error payloads** on Tools API — `SESSION_EXPIRED` and explicit cookie-refresh messaging.\n\n#### Playground\n- **Connection test** — `testSubstackSession()` surfaces cookie-expiry toasts on 401/session errors.\n\n#### Landing\n- **Integrations copy** — toast feedback on clipboard actions.\n\n### Changed\n\n#### Maintainer docs\n- **`CONTRIBUTING.md`** — documents syncing `CHANGELOG.md` and `docs/changelog.md` on release.\n\n---\n\n## [1.0.2] — 2026\n\n> Remote MCP HTTP transport, playground ES module split, deploy docs.\n\n### Added\n\n#### API / MCP\n- **Remote MCP** — Streamable HTTP at `POST /api/mcp` (Bearer auth).\n- **Shared handlers** — `src/mcp/tools.ts` used by stdio MCP and HTTP transport.\n- **`GET /api/tools/health`** — deploy smoke endpoint.\n\n#### Playground\n- **ES module split** — `public/js/` (`main.js`, `pg.js` namespace, feature modules); `scripts/wire-playground.mjs` for cross-module wiring.\n\n#### Docs\n- **Docker / PaaS** — Railway, Render, Fly deploy guides; `npm start`.\n- **Connection modes diagram**; remote MCP documentation.\n\n### Changed\n\n#### Product copy\n- Deploy-anywhere messaging (Tools API on any host; Vercel optional).\n\n#### Playground\n- **Deployment banners** — dashboard `/api/*` vs Bearer Tools API vs Vercel scheduler ephemeral storage.\n\n#### Styles\n- **macOS code windows** — unified `shared/mac-window.css` across landing, docs, playground.\n\n#### Deploy\n- **Removed Vercel crons** from `vercel.json`; external cron documented for production scheduling.\n\n---\n\n## [1.0.1] — 2026\n\n> In-app docs site, REST scheduling API, playground onboarding, landing refresh.\n\n### Added\n\n#### Docs\n- **Documentation site** at `/docs` (served from built landing app).\n\n#### API\n- **`POST /api/tools/schedule-post`**\n- **`GET /api/tools/list-schedules`**\n\n#### Playground\n- **Onboarding checklist** — `#onboardingChecklist`, `localStorage` key `onboarding_checklist_v1`.\n- **Cookie extraction guide** — `<details class=\"cookie-guide\">` with link to `/docs/getting-started/session-cookie`.\n- **Vercel deployment warnings** — `#deploymentBanner`, `#schedulerDeployBanner`.\n\n#### Landing\n- Product sections: deployment modes, use cases, comparison, deploy CTA.\n- **FAQ accordion**; responsive CSS rewrite.\n- **macOS-style code window cards** across landing, docs, playground.\n- GitHub stars in trust bar; OpenAPI link in tools grid.\n\n### Changed\n\n#### Product / UX\n- Deploy messaging — any-host Tools API; agents use your domain (Vercel optional).\n- Removed simulated playground modal; CTAs route to `/playground`.\n- Hero showcase status relabeled **Example**.\n- **`list_comments`** documented as automation log output.\n\n#### Security docs\n- Updated for browser `localStorage` session/API key persistence.\n\n### Fixed\n\n#### Playground\n- **Note publish** gated on `PG.isConnected` / session state.\n\n#### Landing\n- Footer brand link; anchor scroll offset for fixed header.\n\n---\n\n## [1.0.0] — Initial release\n\n### Added\n\n#### MCP\n- Stdio MCP server with Substack publishing tools (`npm run mcp`).\n\n#### API\n- Local REST **Tools API** under `/api/tools/*`.\n\n#### Playground\n- Web dashboard at `/playground` — AI newsletter/note generation, comment automation, scheduler UI, history.\n\n#### Core\n- AI providers: Groq, Gemini, OpenAI, OpenRouter.\n- Substack session via `connect.sid` cookie; publication URL configuration.\n\n---\n\n[1.1.0]: https://github.com/santhosh-patel/substack-agent/compare/v1.0.6...v1.1.0\n[1.0.6]: https://github.com/santhosh-patel/substack-agent/compare/v1.0.5...v1.0.6\n[1.0.5]: https://github.com/santhosh-patel/substack-agent/compare/v1.0.4...v1.0.5\n[1.0.4]: https://github.com/santhosh-patel/substack-agent/compare/v1.0.3...v1.0.4\n[1.0.3]: https://github.com/santhosh-patel/substack-agent/compare/v1.0.2...v1.0.3\n[1.0.2]: https://github.com/santhosh-patel/substack-agent/compare/v1.0.1...v1.0.2\n[1.0.1]: https://github.com/santhosh-patel/substack-agent/compare/v1.0.0...v1.0.1\n","../../../docs/dashboard/comments.md":`# Comments Automation

Scan a **target Substack account's** recent posts and automatically post AI-generated comments when a **keyword** matches.

## Before you start

- [Connect](/docs/dashboard/settings) to Substack
- Configure an **AI provider key** in Settings
- Understand Substack's community guidelines — use automation responsibly

## Parameters

| Field | Description | Example |
|-------|-------------|---------|
| **Target account** | \`@slug\`, profile URL, or numeric ID | \`@techwriter\` |
| **Keyword** | Match phrase in post title/body | \`AI agents\` |
| **Instructions** | Optional tone/style for generated comments | "Friendly, concise, add one insight" |

## Run automation

1. Open the **Comments** tab
2. Fill target, keyword, and optional instructions
3. Click **Run Automation**
4. Watch the **console** for scan progress, matches, and errors

## Stop behavior

**Stop** cancels the browser HTTP request. The server may finish processing the current batch — refresh logs if unsure.

## Where comments are logged

Successful automation comments append to \`src/data/comments_history.json\` and appear in the **History** tab.

## API equivalents

| Surface | Route / tool |
|---------|--------------|
| Dashboard | \`POST /api/comments/automate\` |
| Tools API | \`POST /api/tools/automate-comments\` |
| MCP | \`automate_comments\` |

## Tips

- Start with a narrow keyword to avoid spammy matches
- Test with a small target account before broad automation
- Refresh \`connect.sid\` if comments fail with auth errors

## Related

- [Troubleshooting](/docs/troubleshooting)
- [MCP tools — automate_comments](/docs/mcp/tools)
`,"../../../docs/dashboard/history.md":`# History

The **History** tab is a unified view of what Substack Agent and Substack know about your recent activity.

## Data sources

| Source | Where it lives | What it shows |
|--------|----------------|---------------|
| **Browser drafts** | Newsletters tab panel | Last ~15 publishes stored in \`localStorage\` |
| **App history** | Server after Fetch | Actions logged by Substack Agent |
| **Substack archive** | Fetched from API | Your publication's recent posts |

The Newsletters tab bottom panel is **client-only** for quick reference. History tab merges server + archive data.

## Using the History tab

1. **Connect** to Substack in Settings
2. Click **Fetch History**
3. **Filter** by type: newsletter, note, comment
4. **Search** by title or body text
5. **Sort** by date
6. **Reuse** an item to pre-fill editors (where supported)

## API routes

| Route | Purpose |
|-------|---------|
| \`GET /api/publications/history\` | Server-side publication log |
| \`GET /api/newsletters\` | Substack archive fetch |

## Vercel note

History persistence on serverless hosts may be limited — local \`npm run dev\` gives the most reliable History experience.

## Related

- [Newsletters](/docs/dashboard/newsletters)
- [Comments](/docs/dashboard/comments)
`,"../../../docs/dashboard/newsletters.md":`# Newsletters

Compose and publish newsletter posts from the **Newsletters** tab.

## Generate with AI

1. Enter a **topic** or writing angle
2. Toggle **Enable web search for generation** (optional)
3. Click **Generate**
4. Review auto-filled title, subtitle, and markdown body

Requires a configured AI provider in [Settings](/docs/dashboard/settings).

## Edit and preview

- **Markdown** editor on the left
- **Substack-style preview** on the right (updates live)

## Publish

| Option | Behavior |
|--------|----------|
| Save as draft | Creates draft on Substack |
| Publish live | Emails subscribers |

Requires active Substack connection.

## Publish history

The bottom panel shows **browser drafts** stored in \`localStorage\` (separate from the History tab server data).

## API equivalent

- Dashboard: \`POST /api/generate\`, \`POST /api/publish\`
- Tools API: \`POST /api/tools/publish-newsletter\`
- MCP: \`publish_newsletter\`

## Next steps

- [History](/docs/dashboard/history)
- [Scheduler](/docs/dashboard/scheduler)
`,"../../../docs/dashboard/notes.md":`# Notes

Publish short **Substack Notes** — the feed-style updates on Substack — from the **Notes** tab.

## Workflow

1. Enter a **topic** (optional) → **Generate** for AI draft
2. Edit the note body (keep it concise — Notes are short-form)
3. Optionally add a **link URL** for a link card in the preview
4. Click **Publish Note**

## Requirements

| Requirement | Why |
|-------------|-----|
| Substack **connected** | Publish is blocked until session is valid |
| AI key (for Generate) | Provider configured in [Settings](/docs/dashboard/settings) |

## Preview

The right panel shows a **feed-style preview** that updates as you type the link URL and body.

## Fetch recent notes

**Fetch Notes** loads your latest notes from Substack into the list below the editor — useful for checking what you have already posted.

## API equivalents

| Surface | Route / tool |
|---------|--------------|
| Dashboard | \`POST /api/notes/generate\`, \`POST /api/notes/publish\`, \`GET /api/notes\` |
| Tools API | \`POST /api/tools/publish-note\`, \`GET /api/tools/list-notes\` |
| MCP | \`publish_note\`, \`list_notes\` |

## Tips

- Notes work well for quick updates; use **Newsletters** for long-form Markdown
- Link cards require a valid absolute URL (\`https://...\`)

## Related

- [Newsletters](/docs/dashboard/newsletters)
- [First publish](/docs/getting-started/first-publish)
`,"../../../docs/dashboard/overview.md":`# Dashboard Overview

The **playground** at \`/playground\` is a full local web dashboard for AI-assisted Substack publishing. It is the recommended way to learn Substack Agent before automating via the Tools API or MCP.

## Architecture

\`\`\`
┌──────────────┐     fetch /api/*      ┌─────────────────┐
│   Browser    │ ────────────────────► │ Express :3456   │
│  playground  │   (no Bearer auth)    │                 │
└──────────────┘                       └────────┬────────┘
                                                  │ connect.sid
                                                  ▼
                                         ┌─────────────────┐
                                         │    Substack     │
                                         └─────────────────┘
\`\`\`

The dashboard is **not** a production API surface. External systems should use [\`/api/tools/*\`](/docs/api/overview) or [\`/api/mcp\`](/docs/mcp/remote) with Bearer auth.

## Tabs

| Tab | What it does | Deep dive |
|-----|--------------|-----------|
| **Newsletters** | AI topic → Markdown → draft/publish | [Newsletters](/docs/dashboard/newsletters) |
| **Comments** | Keyword automation on target accounts | [Comments](/docs/dashboard/comments) |
| **Notes** | Short posts + link cards | [Notes](/docs/dashboard/notes) |
| **Scheduler** | Queue future / recurring publishes | [Scheduler](/docs/dashboard/scheduler) |
| **History** | Archive + app activity | [History](/docs/dashboard/history) |

Settings live in the **collapsible sidebar** — [Settings guide](/docs/dashboard/settings).

## Getting started

1. Run \`npm run dev\`
2. Open [http://localhost:3456/playground](http://localhost:3456/playground)
3. Complete the **onboarding checklist** (top of page):
   - Paste \`connect.sid\` → **Test** → **Connect**
   - Add AI provider key → **Test API Key**
4. Publish from **Newsletters** — [First publish walkthrough](/docs/getting-started/first-publish)

## Deployment banners

When the server detects Vercel or production config, banners explain:

- **Dashboard vs Tools API** — playground uses unauthenticated routes; automations should use Bearer-protected endpoints
- **Scheduler limits** — ephemeral storage on serverless hosts
- **Server SID** — warn if env cookie is configured on a public deploy

## Authentication model

| Route | Auth | Purpose |
|-------|------|---------|
| \`/api/connect\`, \`/api/publish\`, … | None | Playground only |
| \`/api/tools/*\` | Bearer | Production agents |
| \`/api/mcp\` | Bearer | Remote MCP |

See [Security](/docs/security) before exposing the playground publicly.

## Storage

| Data | Where |
|------|-------|
| Session cookie, AI keys | Browser \`localStorage\` (settings sidebar) |
| Schedules (local dev) | \`src/data/schedules.json\` |
| Comment automation log | \`src/data/comments_history.json\` |
| Publish history panel | Browser \`localStorage\` |

## Related

- [Settings](/docs/dashboard/settings)
- [Dashboard API routes](/docs/api/dashboard-api)
- [Deployment modes](/docs/deployment/modes)
`,"../../../docs/dashboard/scheduler.md":`# Scheduler

Queue **newsletters** and **notes** for future publishing with optional recurrence. Best experienced on **local \`npm run dev\`** where storage is persistent.

## Overview

\`\`\`
Create schedule → JSON queue → worker/cron → publish at due time
\`\`\`

| Component | Local dev | Vercel |
|-----------|-----------|--------|
| Storage | \`src/data/schedules.json\` | Ephemeral \`/tmp\` |
| Worker | 60s background poll | Manual / external cron |
| Create UI | Enabled | Disabled (banner) |

## Post types

| Type | Fields |
|------|--------|
| **Newsletter** | Title, subtitle, Markdown body |
| **Note** | Body, optional link URL |

## Recurrence

| Pattern | Use case |
|---------|----------|
| Once | Single future publish |
| Daily | Same time every day |
| Twice daily | Two times per day |
| Alternate days | Every other day |
| Weekly | Same weekday |

Use the **date/time picker** or quick presets (30 min, 1 hour, tomorrow 9 AM).

## AI research mode

Enable **web search** on a schedule to let AI research a topic at run time and generate content. Store an API key with the job or rely on server env vars.

**Presets:** Brief, Builder, Default, Reaction — starting points for \`schedBody\` guidelines.

## Queue management

| Action | Description |
|--------|-------------|
| **Trigger Queue Check** | Manually process due jobs now |
| **Run now** | Publish a specific queued item immediately |
| **Pause / Resume** | Temporarily skip a job |
| **Retry** | Re-run a failed job |
| **Inspector logs** | View worker output; copy for debugging |

Browser **polling** (every 60s on Scheduler tab) also calls \`/api/cron/process-schedules\`.

## Cron endpoint

\`\`\`http
GET|POST /api/cron/process-schedules
Authorization: Bearer $CRON_SECRET
\`\`\`

See [Scheduler & Cron](/docs/deployment/scheduler-cron) for external cron setup. This repo does **not** ship Vercel cron in \`vercel.json\`.

## API equivalents

| Surface | Route / tool |
|---------|--------------|
| Dashboard | \`/api/schedule/*\` |
| Tools API | \`POST /api/tools/schedule-post\`, \`GET /api/tools/list-schedules\` |
| MCP | \`schedule_post\`, \`list_schedules\` |

## Related

- [Deployment: Scheduler & Cron](/docs/deployment/scheduler-cron)
- [Newsletters](/docs/dashboard/newsletters)
- [Notes](/docs/dashboard/notes)
`,"../../../docs/dashboard/settings.md":`# Settings

The settings sidebar controls Substack connection, AI providers, and writing prompts. Open it from the **gear icon** or it auto-expands on first visit when no session is configured.

## Substack account

| Field | Description |
|-------|-------------|
| **Session cookie** | Your \`connect.sid\` value — [extraction guide](/docs/getting-started/session-cookie) |
| **Publication URL** | e.g. \`yourname.substack.com\` (with or without \`https://\`) |

### Connection buttons

| Button | Behavior |
|--------|----------|
| **Test** | Validates cookie with Substack without changing UI state heavily |
| **Connect** | Establishes server session (\`POST /api/connect\`); enables publish actions |
| **Disconnect** | Clears server session and cookie field |

If you see a **“refresh your connect.sid”** toast, extract a new cookie from DevTools — sessions expire after logout or time.

## AI provider

| Provider | Typical models |
|----------|----------------|
| Groq | Llama 3.x |
| Gemini | Gemini 2.x |
| OpenAI | GPT-4o mini, etc. |
| OpenRouter | Multi-model gateway |

**Workflow:** Select provider → choose model → paste API key → **Test API Key** → **Save API Key**.

Keys are stored in browser **\`localStorage\`** per provider unless the server has keys in \`.env\` (then model select may work without saving locally).

## System prompt

Customize AI instructions for **Newsletters** and **Notes** tabs. Changes save automatically. **Reset** restores the server default from \`/api/config\`.

## Security

- Cookies and keys in \`localStorage\` are visible to anyone with access to your browser profile
- Connect sends the cookie to **your** Substack Agent server only
- Do not use the dashboard on untrusted shared machines without clearing site data afterward

Full model: [Security](/docs/security).

## Deployment-aware banners

On Vercel or production hosts, banners at the top of the playground explain dashboard vs Tools API boundaries and scheduler limits.

## Related

- [First publish](/docs/getting-started/first-publish)
- [Dashboard overview](/docs/dashboard/overview)
- [Environment variables](/docs/getting-started/environment-variables)
`,"../../../docs/deployment/deploy.md":`# Deploy the Tools API

Host the **Tools API** on any Node platform — Vercel, Railway, a VPS, or your own server. Then use **your domain** with agents, automations, and MCP-style tool clients (n8n, custom GPTs, webhooks).

For Claude Desktop and Cursor locally, use stdio MCP (\`npm run mcp\`). For deployed instances, connect remote MCP clients to **\`https://your-domain/api/mcp\`** with Bearer auth — see [Remote MCP](../mcp/remote.md).

## Required environment variables

| Variable | Required | Notes |
|----------|----------|-------|
| \`SUBSTACK_SID\` | Yes | Session cookie — see [Session cookie](/docs/getting-started/session-cookie) |
| \`SUBSTACK_PUB_URL\` | Yes | e.g. \`yourname.substack.com\` |
| \`API_SECRET\` | Yes | Bearer token for \`/api/tools/*\` in production |

Optional: \`GROQ_API_KEY\`, \`GEMINI_API_KEY\`, \`OPENAI_API_KEY\`, \`OPENROUTER_API_KEY\`, \`CRON_SECRET\`

## Run on any Node host

1. Clone the repo and install dependencies (see [Install](/docs/getting-started/install)).
2. Set the environment variables on your host.
3. Build and start with Node 18+:

\`\`\`bash
npm install
npm run build
NODE_ENV=production npm start
\`\`\`

For local development with hot reload, use \`npm run dev\` instead.

## Verify deployment

Replace \`your-domain\` with your deployment URL:

\`\`\`bash
curl -s "https://your-domain/api/tools/health" \\
  -H "Authorization: Bearer $API_SECRET"
\`\`\`

Expected response:

\`\`\`json
{
  "success": true,
  "data": {
    "version": "1.1.0",
    "connected": true,
    "publication": "yourname.substack.com"
  }
}
\`\`\`

If \`connected\` is \`false\`, check \`SUBSTACK_SID\` and \`SUBSTACK_PUB_URL\` in your host environment.

## Call your Tools API

\`\`\`bash
curl -X POST "https://your-domain/api/tools/publish-newsletter" \\
  -H "Authorization: Bearer $API_SECRET" \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Hello","body":"Markdown body","isDraft":true}'
\`\`\`

- **OpenAPI spec:** \`https://your-domain/openapi.json\`
- **Auth:** \`Authorization: Bearer <API_SECRET>\`
- **Base path:** \`/api/tools/*\`

Use your domain with n8n, Custom GPT Actions, Zapier HTTP nodes, or any OpenAPI-aware agent.

## Docker

\`\`\`bash
docker build -t substack-agent .
docker run -p 3456:3456 \\
  -e NODE_ENV=production \\
  -e SUBSTACK_SID=... \\
  -e SUBSTACK_PUB_URL=yourname.substack.com \\
  -e API_SECRET=... \\
  substack-agent
\`\`\`

## Railway / Render / Fly

General steps (no one-click buttons):

1. Connect this GitHub repo to your platform.
2. Set build command: \`npm run build\`
3. Set start command: \`npm start\`
4. Add env vars: \`SUBSTACK_SID\`, \`SUBSTACK_PUB_URL\`, \`API_SECRET\`, \`NODE_ENV=production\`
5. Run the health check curl above against your assigned domain.

## Public dashboard risk

If \`SUBSTACK_SID\` is in server env and your deployment is public, unauthenticated \`/api/*\` dashboard routes can control your Substack account. For production integrations, use **Tools API** routes with Bearer auth only. See [Security](/docs/security).

## Optional: Vercel

Vercel is one supported host. Scheduler and history are limited on serverless — see [Deploy to Vercel](/docs/deployment/vercel) and [Scheduler & Cron](/docs/deployment/scheduler-cron).

## Next steps

- [Tools API overview](/docs/api/overview)
- [OpenAPI](/docs/api/openapi)
- [n8n integration](/docs/integrations/n8n)
- [Custom GPT](/docs/integrations/custom-gpt)
`,"../../../docs/deployment/modes.md":`# Deployment Modes

Substack Agent ships as **four complementary surfaces**. Most teams use one primary mode and optionally add others.

## At a glance

| Mode | Entry point | Auth | Works on Vercel | Best for |
|------|-------------|------|-----------------|----------|
| **Local Dashboard** | \`/playground\` | None (localhost) | Partial UI | AI compose, scheduler, history |
| **Tools API** | \`/api/tools/*\` | Bearer \`API_SECRET\` | Yes | n8n, GPTs, webhooks |
| **Local MCP** | \`npm run mcp\` | Env in client | No (stdio) | Claude Desktop, Cursor local |
| **Remote MCP** | \`/api/mcp\` | Bearer \`API_SECRET\` | Yes* | Cursor remote, cloud MCP clients |

\\* Stateless Streamable HTTP — suitable for serverless; session lives in server env vars.

## Decision guide

**Use the Local Dashboard when:**

- You want a visual editor, live Markdown preview, and onboarding checklist
- You need the **scheduler** with local JSON storage and background polling
- You are developing or testing on \`localhost:3456\`

**Use the Tools API when:**

- An external system (n8n, Zapier, Custom GPT) calls HTTP endpoints
- You need **Bearer auth** and a stable OpenAPI contract
- You deploy to **any Node host** at your domain

**Use Local MCP when:**

- Claude Desktop or Cursor runs on your machine
- You want native tool-calling in chat (stdio transport)
- You prefer not to expose an HTTP MCP endpoint

**Use Remote MCP when:**

- Your Substack Agent instance is **already deployed**
- Your MCP client supports HTTP (\`https://your-domain/api/mcp\`)
- You want the same 9 tools without running stdio locally

## Local Dashboard

\`\`\`
Browser → /api/* (no Bearer) → Express → Substack
\`\`\`

- Full playground: Newsletters, Notes, Comments, Scheduler, History
- Scheduler uses \`src/data/schedules.json\` + 60s worker when running \`npm run dev\`
- **Not for public production** — \`/api/*\` has no auth layer

See [Dashboard overview](/docs/dashboard/overview) and [Security](/docs/security).

## Tools API

\`\`\`
Agent → Authorization: Bearer → /api/tools/* → Substack
\`\`\`

- Auto-connects via server \`SUBSTACK_SID\` — no \`/connect\` step
- Consistent JSON: \`{ success, data?, error?, code? }\`
- Health: \`GET /api/tools/health\`

See [Tools API overview](/docs/api/overview) and [Deploy](/docs/deployment/deploy).

## MCP (local stdio)

\`\`\`
Claude/Cursor → stdio → npm run mcp → Substack
\`\`\`

- 9 tools — [full reference](/docs/mcp/tools)
- Configure in \`claude_desktop_config.json\` or Cursor MCP settings
- Reads \`SUBSTACK_SID\` from the MCP env block

See [MCP setup](/docs/mcp/setup).

## Remote MCP (HTTP)

\`\`\`
MCP client → Bearer → /api/mcp → same tools as stdio
\`\`\`

- Same tool handlers as local MCP (\`src/mcp/tools.ts\`)
- Requires \`API_SECRET\` + \`SUBSTACK_SID\` on the host

See [Remote MCP](/docs/mcp/remote).

## Vercel and serverless notes

| Feature | Local \`npm run dev\` | Vercel / serverless |
|---------|---------------------|---------------------|
| Tools API | Yes | Yes |
| Remote MCP | Yes | Yes |
| Playground UI | Yes | Yes (with warnings) |
| Scheduler storage | Persistent JSON | Ephemeral \`/tmp\` |
| Background worker | 60s polling | Manual / external cron |

Details: [Vercel (optional)](/docs/deployment/vercel), [Scheduler & Cron](/docs/deployment/scheduler-cron).

## Next steps

- [Deploy the Tools API](/docs/deployment/deploy)
- [Install locally](/docs/getting-started/install)
- [MCP setup](/docs/mcp/setup)
`,"../../../docs/deployment/scheduler-cron.md":`# Scheduler and Cron

The scheduler queues newsletters and notes for future publishing with optional recurrence.

## Local (recommended)

When running \`npm run dev\`:

- Schedules stored in \`src/data/schedules.json\`
- Background worker polls every **60 seconds**
- Full create/edit/run/retry in playground **Scheduler** tab

## Vercel limitations

On Vercel:

- Schedule data stored in **ephemeral \`/tmp\`** — lost on cold starts and redeploys
- No persistent background worker — relies on Vercel Cron + browser polling
- Playground shows a warning banner when \`deploymentMode === 'vercel'\`

## Vercel Cron setup

This repo does **not** ship a \`crons\` block in \`vercel.json\` — many Vercel plans reject cron config at deploy time. If your plan supports Vercel Cron, add it in the Vercel dashboard or your own \`vercel.json\` override:

\`\`\`json
{
  "crons": [{
    "path": "/api/cron/process-schedules",
    "schedule": "*/5 * * * *"
  }]
}
\`\`\`

Alternatively use an **external cron** (GitHub Actions, cron-job.org, Railway cron, etc.) to \`POST\` the endpoint below on your schedule.

Set \`CRON_SECRET\` (or reuse \`API_SECRET\`) in Vercel env. Cron requests must include:

\`\`\`
Authorization: Bearer <CRON_SECRET>
\`\`\`

Or pass \`?secret=<CRON_SECRET>\` as query param.

## Manual trigger

In playground Scheduler tab: **Trigger Queue Check** or call:

\`\`\`bash
curl -X POST http://localhost:3456/api/cron/process-schedules \\
  -H "Authorization: Bearer $CRON_SECRET"
\`\`\`

## Next steps

- [Scheduler tab guide](/docs/dashboard/scheduler)
- [Deployment modes](/docs/deployment/modes)
`,"../../../docs/deployment/vercel.md":`# Deploy to Vercel (optional)

Vercel is one way to host the **Tools API**. For a platform-agnostic guide, see [Deploy the Tools API](/docs/deployment/deploy).

Deploy the **Tools API** for production integrations. The playground UI can be served statically but **scheduler and history are limited** on serverless.

## One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/santhosh-patel/substack-agent)

## Required environment variables

| Variable | Required | Notes |
|----------|----------|-------|
| \`SUBSTACK_SID\` | Yes | Session cookie |
| \`SUBSTACK_PUB_URL\` | Yes | e.g. \`yourname.substack.com\` |
| \`API_SECRET\` | Yes | Bearer token for \`/api/tools/*\` |

Optional: \`GROQ_API_KEY\`, \`GEMINI_API_KEY\`, \`OPENAI_API_KEY\`, \`OPENROUTER_API_KEY\`, \`CRON_SECRET\`

## Manual deploy

\`\`\`bash
vercel
\`\`\`

Set env vars in the Vercel dashboard under **Settings → Environment Variables**.

## Public dashboard risk

If \`SUBSTACK_SID\` is in Vercel env and your deployment is public, unauthenticated \`/api/*\` dashboard routes can control your Substack account. Restrict access or use Tools API only for production.

## What works on Vercel

| Feature | Status |
|---------|--------|
| Tools API (\`/api/tools/*\`) | Full support |
| Playground UI (static) | Served, but limited backend |
| Scheduler | Ephemeral storage — see [Scheduler & Cron](/docs/deployment/scheduler-cron) |
| MCP server | Not supported (local stdio only) |

## Next steps

- [Deploy the Tools API](/docs/deployment/deploy)
- [Tools API overview](/docs/api/overview)
- [Scheduler & Cron](/docs/deployment/scheduler-cron)
`,"../../../docs/getting-started/environment-variables.md":"# Environment Variables\n\nReference for server configuration. Copy `.env.example` to `.env` for local development.\n\n## Required (all modes)\n\n| Variable | Description | Example |\n|----------|-------------|---------|\n| `SUBSTACK_SID` | `connect.sid` cookie value | See [Session cookie](/docs/getting-started/session-cookie) |\n| `SUBSTACK_PUB_URL` | Publication hostname | `yourname.substack.com` |\n\nAlso accepted: `PUBLICATION_URL` (alias for pub URL).\n\n## Production (Tools API & Remote MCP)\n\n| Variable | Description |\n|----------|-------------|\n| `API_SECRET` | Bearer token for `/api/tools/*` and `/api/mcp` — **required when `NODE_ENV=production`** |\n| `NODE_ENV` | Set to `production` on hosted deploys |\n\nWithout `API_SECRET` in production, tool routes return **503**.\n\n## AI providers (optional)\n\nUsed when playground or automation does not receive a key in the request body.\n\n| Variable | Provider |\n|----------|----------|\n| `GROQ_API_KEY` | Groq |\n| `GEMINI_API_KEY` | Google Gemini |\n| `OPENAI_API_KEY` | OpenAI |\n| `OPENROUTER_API_KEY` | OpenRouter |\n\nPlayground keys can also live in browser `localStorage` via Settings.\n\n## Scheduler & cron\n\n| Variable | Description |\n|----------|-------------|\n| `CRON_SECRET` | Auth for `GET/POST /api/cron/process-schedules` (falls back to `API_SECRET`) |\n\nUsed by playground polling, manual queue check, and external cron jobs — [Scheduler & Cron](/docs/deployment/scheduler-cron).\n\n## Platform-specific\n\n| Variable | Description |\n|----------|-------------|\n| `VERCEL` | Set automatically on Vercel — enables deployment mode banners |\n| `VERCEL_URL` | Used for default tools API URL hint in playground config |\n| `TOOLS_API_BASE_URL` | Optional override shown in deploy banners |\n\n## What `/api/config` exposes\n\nThe playground fetches `/api/config` for **non-secret flags only**:\n\n- `hasSubstackSid`, `hasGroqApiKey`, etc. (booleans)\n- `deploymentMode`, `publicationUrl`, default prompts\n\nNever exposes raw cookies or API keys to the browser.\n\n## Local vs deployed checklist\n\n| Variable | Local dev | Production deploy |\n|----------|-----------|-------------------|\n| `SUBSTACK_SID` | `.env` | Host env |\n| `SUBSTACK_PUB_URL` | `.env` | Host env |\n| `API_SECRET` | Optional | **Required** |\n| `NODE_ENV` | unset | `production` |\n\n## Related\n\n- [Security](/docs/security)\n- [Deploy the Tools API](/docs/deployment/deploy)\n- [Deployment modes](/docs/deployment/modes)\n","../../../docs/getting-started/first-publish.md":`# First Publish

Publish your first newsletter **draft** from the playground in about five minutes.

## Prerequisites

- [Installed](/docs/getting-started/install) and \`npm run dev\` running
- [Session cookie](/docs/getting-started/session-cookie) extracted from DevTools
- (Optional) AI provider key for **Generate**

## Step-by-step

### 1. Open the playground

[http://localhost:3456/playground](http://localhost:3456/playground)

### 2. Complete onboarding

The checklist at the top tracks progress:

1. Paste **\`connect.sid\`** in Settings sidebar → **Test** → **Connect**
2. Select AI provider → paste key → **Test API Key**
3. Publish your first draft (this guide)

### 3. Generate or write content

**Option A — AI generate:**

1. Go to **Newsletters**
2. Enter a topic (e.g. "Weekly update on AI tooling")
3. Optionally enable **web search**
4. Click **Generate**

**Option B — manual:**

Type title, subtitle, and Markdown body directly in the editor.

### 4. Review preview

The right panel shows a **Substack-style preview**. Edit the Markdown on the left — preview updates live.

### 5. Publish as draft

1. Enable **Save as draft** (recommended for first run)
2. Click **Publish**
3. Confirm success toast — draft appears on Substack

## Draft vs live

| Mode | Checkbox | Result |
|------|----------|--------|
| **Draft** | Save as draft **on** | Saved to Substack; not emailed |
| **Live** | Save as draft **off** | Published and emailed to subscribers |

Start with drafts until you trust the workflow.

## After your first publish

- Check Substack's editor for the draft URL
- Explore [Scheduler](/docs/dashboard/scheduler) for timed publishes
- Try [MCP setup](/docs/mcp/setup) for Claude/Cursor

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Publish disabled | Connect Substack first |
| Generate fails | Add/test AI key in Settings |
| 401 / session error | Refresh \`connect.sid\` — [Troubleshooting](/docs/troubleshooting) |

## Related

- [Newsletters guide](/docs/dashboard/newsletters)
- [Settings](/docs/dashboard/settings)
`,"../../../docs/getting-started/install.md":`# Install

Get Substack Agent running locally in a few minutes.

## Prerequisites

- **Node.js 20.19+** or **22.12+** and npm (required by Vite 8)
- A **Substack account** you can log into in a browser
- (Optional) AI provider API key for generation features

## 1. Clone and install

\`\`\`bash
git clone https://github.com/santhosh-patel/substack-agent.git
cd substack-agent
npm install
cp .env.example .env
\`\`\`

## 2. Configure environment

Edit \`.env\` — minimum required:

\`\`\`env
SUBSTACK_SID=your-connect-sid-cookie
SUBSTACK_PUB_URL=yourname.substack.com
\`\`\`

How to get \`SUBSTACK_SID\`: [Session cookie guide](/docs/getting-started/session-cookie).

Full reference: [Environment variables](/docs/getting-started/environment-variables).

## 3. Start the server

**Development (hot reload):**

\`\`\`bash
npm run dev
\`\`\`

**Production-style local run:**

\`\`\`bash
npm run build
API_SECRET=your-secret NODE_ENV=production npm start
\`\`\`

## 4. Open the app

| URL | Purpose |
|-----|---------|
| [http://localhost:3456/playground](http://localhost:3456/playground) | Web dashboard |
| [http://localhost:3456/](http://localhost:3456/) | Landing page |
| [http://localhost:3456/docs](http://localhost:3456/docs) | Documentation |
| [http://localhost:3456/openapi.json](http://localhost:3456/openapi.json) | OpenAPI spec |

> Landing page assets come from \`npm run build:landing\`. After doc or marketing changes, run that command to refresh \`public/\`.

## Commands reference

| Command | Purpose |
|---------|---------|
| \`npm run dev\` | Local server with scheduler worker (port 3456) |
| \`npm start\` | Production server (\`tsx src/server.ts\`) |
| \`npm run mcp\` | MCP stdio server for Claude / Cursor |
| \`npm run build\` | Build landing + docs bundle into \`public/\` |
| \`npm run test:api\` | Smoke-test dashboard API (server must be running) |
| \`npm run test:auth\` | Test Bearer auth on tools routes |

## Docker (optional)

\`\`\`bash
docker build -t substack-agent .
docker run -p 3456:3456 \\
  -e NODE_ENV=production \\
  -e SUBSTACK_SID=... \\
  -e SUBSTACK_PUB_URL=yourname.substack.com \\
  -e API_SECRET=... \\
  substack-agent
\`\`\`

See [Deploy the Tools API](/docs/deployment/deploy) for hosted deployment.

## Next steps

1. [Session cookie](/docs/getting-started/session-cookie)
2. [First publish](/docs/getting-started/first-publish)
3. [Deployment modes](/docs/deployment/modes) — if you plan to host the Tools API
`,"../../../docs/getting-started/session-cookie.md":`# Session Cookie

Substack Agent authenticates using your browser **\`connect.sid\`** session cookie. Treat it like a password — it grants full access to your Substack account.

## Extract connect.sid

1. Log in at [substack.com](https://substack.com)
2. Open **DevTools** (F12 or right-click → Inspect)
3. Go to **Application** → **Cookies** → \`https://substack.com\`
4. Find **\`connect.sid\`** and copy its value
5. Paste into playground **Settings** or \`.env\` as \`SUBSTACK_SID\`

## Where the cookie is stored

| Location | Used when |
|----------|-----------|
| Playground settings | Saved in browser \`localStorage\` |
| \`.env\` file | Local server / MCP / API auto-connect |
| Host environment variables | Deployed server auto-connect |

When you click **Connect** in the playground, the cookie is sent to **your Substack Agent server** (\`POST /api/connect\`).

## Security

- Never commit cookies to git or share them publicly
- Rotate immediately if exposed (log out of Substack, log back in)
- Clear browser site data on shared machines
- See [Security](/docs/security) for the full model

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Connection fails / 401 | Cookie expired — extract a fresh one |
| Auto-connect fails on load | Update saved cookie in settings |

## Next steps

- [Environment variables](/docs/getting-started/environment-variables)
- [First publish](/docs/getting-started/first-publish)
`,"../../../docs/index.md":`# Substack Agent Documentation

Substack has **no official publishing API**. Substack Agent bridges that gap using your browser session cookie and exposes your publication to AI assistants, automations, and a local web dashboard.

> **New here?** Pick a path below, then follow the linked guide — most users are running in under 10 minutes.

## Choose your path

| I want to… | Start here | Command / URL |
|------------|------------|---------------|
| **Use the web UI** — compose with AI, schedule posts, view history | [Install](/docs/getting-started/install) → [First publish](/docs/getting-started/first-publish) | \`npm run dev\` → \`/playground\` |
| **Automate via HTTP** — n8n, Custom GPTs, webhooks | [Tools API overview](/docs/api/overview) → [Deploy](/docs/deployment/deploy) | \`https://your-domain/api/tools/*\` |
| **Use Claude / Cursor locally** — chat-native tools | [MCP setup](/docs/mcp/setup) | \`npm run mcp\` (stdio) |
| **Use MCP on your domain** — remote agents | [Remote MCP](/docs/mcp/remote) | \`https://your-domain/api/mcp\` |

## How the pieces fit together

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│  Clients                                                    │
│  • Playground UI    • n8n / GPTs    • Claude / Cursor       │
└────────────┬────────────────┬─────────────────┬─────────────┘
             │                │                 │
             ▼                ▼                 ▼
     /api/* (no auth)  /api/tools/*      /api/mcp
                        Bearer auth       Bearer auth
             │                │                 │
             └────────────────┴─────────────────┘
                              │
                    Substack Agent server
                              │
                              ▼
                    Substack (session API)
\`\`\`

| Surface | Auth | Best for |
|---------|------|----------|
| **Playground** \`/playground\` | None (local trust) | Hands-on publishing, scheduler, AI compose |
| **Tools API** \`/api/tools/*\` | \`Bearer API_SECRET\` | Production automations at your domain |
| **Remote MCP** \`/api/mcp\` | \`Bearer API_SECRET\` | MCP clients against a deployed host |
| **Local MCP** stdio | Env vars in client config | Claude Desktop, Cursor on your machine |

## Learning paths

### Path A — Local publisher (recommended first)

1. [Install](/docs/getting-started/install)
2. [Session cookie](/docs/getting-started/session-cookie)
3. [First publish](/docs/getting-started/first-publish)
4. Explore [Newsletters](/docs/dashboard/newsletters), [Scheduler](/docs/dashboard/scheduler), [History](/docs/dashboard/history)

### Path B — Production automation

1. [Deployment modes](/docs/deployment/modes) — confirm Tools API fits your use case
2. [Environment variables](/docs/getting-started/environment-variables) — set \`API_SECRET\`, \`SUBSTACK_SID\`
3. [Deploy the Tools API](/docs/deployment/deploy) — verify with \`/api/tools/health\`
4. [Endpoints](/docs/api/endpoints) or [OpenAPI](/docs/api/openapi) — wire n8n or Custom GPT

### Path C — AI assistant (MCP)

1. [MCP setup](/docs/mcp/setup) for local stdio, **or** [Remote MCP](/docs/mcp/remote) for deployed
2. [Tools reference](/docs/mcp/tools) — all 9 tools
3. [Claude Desktop](/docs/integrations/claude-desktop) or [Cursor](/docs/integrations/cursor)

## What you can automate

- **Newsletters** — draft or publish with Markdown body
- **Notes** — short posts with optional link cards
- **Comments** — post on a thread or automate by keyword on a target account
- **Scheduling** — one-off or recurring queue (local server recommended)
- **Read** — list newsletters, notes, and automation comment history

## Quick reference

| Resource | Link |
|----------|------|
| Open playground | [/playground](/playground) |
| OpenAPI spec | [/openapi.json](/openapi.json) |
| Health check | \`GET /api/tools/health\` (Bearer auth) |
| Security model | [Security](/docs/security) |
| Something broken? | [Troubleshooting](/docs/troubleshooting) |
| GitHub | [santhosh-patel/substack-agent](https://github.com/santhosh-patel/substack-agent) |

## Prerequisites

- **Node.js 20.19+** or **22.12+** and npm
- A **Substack account** you control
- A fresh **\`connect.sid\`** cookie ([guide](/docs/getting-started/session-cookie))
- For AI features: an API key from Groq, Gemini, OpenAI, or OpenRouter
`,"../../../docs/integrations/claude-desktop.md":`# Claude Desktop Integration

Connect Substack Agent to Claude Desktop via MCP.

## Config file location

| OS | Path |
|----|------|
| macOS | \`~/Library/Application Support/Claude/claude_desktop_config.json\` |
| Windows | \`%APPDATA%\\Claude\\claude_desktop_config.json\` |

## Configuration

\`\`\`json
{
  "mcpServers": {
    "substack": {
      "command": "npx",
      "args": ["tsx", "/absolute/path/to/substack-agent/src/mcp-server.ts"],
      "env": {
        "SUBSTACK_SID": "your-connect-sid",
        "SUBSTACK_PUB_URL": "yourname.substack.com",
        "GROQ_API_KEY": "optional-for-automate_comments"
      }
    }
  }
}
\`\`\`

Use absolute paths. Restart Claude Desktop after saving.

## Verify

Ask Claude: "What Substack tools do you have?" — you should see 9 tools.

## Example prompts

- "Publish a draft newsletter titled Weekly Update with body about AI agents"
- "List my recent newsletters"
- "Post a note about our new feature launch"

## Next steps

- [MCP tools reference](/docs/mcp/tools)
- [Session cookie](/docs/getting-started/session-cookie)
`,"../../../docs/integrations/cursor.md":`# Cursor Integration

Use Substack Agent tools inside Cursor via **local stdio MCP** or **remote HTTP MCP** on your deployed domain.

## Option A — Local stdio (recommended for development)

1. Open **Cursor Settings** → **MCP**
2. Add a server entry:

\`\`\`json
{
  "mcpServers": {
    "substack": {
      "command": "npx",
      "args": ["tsx", "/absolute/path/to/substack-agent/src/mcp-server.ts"],
      "env": {
        "SUBSTACK_SID": "your-connect-sid",
        "SUBSTACK_PUB_URL": "yourname.substack.com"
      }
    }
  }
}
\`\`\`

3. Restart Cursor or reload MCP servers

Use an **absolute path** to \`src/mcp-server.ts\` on your machine.

## Option B — Remote MCP (deployed instance)

If Substack Agent runs at your domain with \`API_SECRET\` and \`SUBSTACK_SID\`:

\`\`\`json
{
  "mcpServers": {
    "substack-remote": {
      "url": "https://your-domain/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_SECRET"
      }
    }
  }
}
\`\`\`

Full guide: [Remote MCP](/docs/mcp/remote).

## Usage in chat

Ask Cursor Agent to call tools explicitly:

- "Use \`publish_newsletter\` to draft a post about…"
- "Call \`list_schedules\` to show my queue"
- "Post a note with \`publish_note\`"

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Tools not listed | Restart Cursor; verify absolute path (stdio) or URL + Bearer (remote) |
| Auth errors | Refresh \`SUBSTACK_SID\` — [Session cookie](/docs/getting-started/session-cookie) |
| Stdio crash | Run \`npm run mcp\` in terminal to read stderr |

## Related

- [MCP setup](/docs/mcp/setup)
- [Tools reference](/docs/mcp/tools)
- [Troubleshooting](/docs/troubleshooting)
`,"../../../docs/integrations/custom-gpt.md":`# Custom GPT Integration

Use Substack Agent as a Custom GPT Action via OpenAPI.

## Steps

1. **Deploy** Substack Agent to any Node host with \`API_SECRET\`, \`SUBSTACK_SID\`, and \`SUBSTACK_PUB_URL\` — see [Deploy the Tools API](/docs/deployment/deploy)
2. Open **ChatGPT** → **Explore GPTs** → **Create**
3. In **Actions** → **Import from URL**:
   \`\`\`
   https://your-domain/openapi.json
   \`\`\`
4. Set **Authentication** → **API Key** → **Bearer** → paste your \`API_SECRET\`
5. Save and test

## Example GPT instructions

\`\`\`
You can publish to Substack using the publishNewsletter action.
Always confirm title and draft/live status with the user before publishing.
\`\`\`

## Available actions

All operations in [OpenAPI spec](/openapi.json): publish, note, comment, automate, list, schedule.

## Next steps

- [OpenAPI guide](/docs/api/openapi)
- [Tools API overview](/docs/api/overview)
`,"../../../docs/integrations/n8n.md":`# n8n Integration

Call Substack Agent Tools API from n8n workflows.

## Prerequisites

- Deployed Substack Agent on any Node host (or local tunnel)
- \`API_SECRET\` configured
- \`SUBSTACK_SID\` and \`SUBSTACK_PUB_URL\` in deployment env

## HTTP Request node

| Setting | Value |
|---------|-------|
| Method | POST |
| URL | \`https://your-domain/api/tools/publish-newsletter\` |
| Authentication | Header Auth |
| Header Name | \`Authorization\` |
| Header Value | \`Bearer YOUR_API_SECRET\` |
| Body | JSON |

## Example body

\`\`\`json
{
  "title": "Automated Weekly Digest",
  "body": "## This week\\n\\nContent from your workflow...",
  "isDraft": false
}
\`\`\`

## Other endpoints

See [Tools API Endpoints](/docs/api/endpoints) for publish-note, automate-comments, schedule-post, etc.

## Next steps

- [Deploy the Tools API](/docs/deployment/deploy)
- [OpenAPI](/docs/api/openapi)
`,"../../../docs/mcp/limitations.md":`# MCP Limitations

Understand what MCP can and cannot do before building on it.

## Transport options

| Transport | Where | Notes |
|-----------|-------|-------|
| **Stdio** | Local machine | Claude Desktop, Cursor — \`npm run mcp\` |
| **HTTP** | Deployed domain | \`/api/mcp\` — [Remote MCP](/docs/mcp/remote) |

Stdio and HTTP expose the **same 9 tools** from \`src/mcp/tools.ts\`.

## Session & auth

- All tools require a valid **\`SUBSTACK_SID\`** on the server (stdio env block or host env for HTTP)
- Remote MCP also requires **\`API_SECRET\`** (Bearer header)
- Cookies expire — refresh periodically; Tools API returns \`SESSION_EXPIRED\` when stale

## Scheduling

- \`schedule_post\` uses the same queue as the dashboard scheduler
- **Local dev:** persistent \`src/data/schedules.json\` + background worker
- **Vercel / serverless:** ephemeral storage — schedules may disappear on cold start
- Prefer local \`npm run dev\` or external cron for reliable scheduling

## \`list_comments\` scope

Returns the **automation log** (\`comments_history.json\`) — comments posted through Substack Agent — not every comment on your Substack account.

## \`automate_comments\` and AI keys

When calling from MCP, provide \`provider\`, \`model\`, and \`apiKey\` in tool arguments, **or** set provider keys in server environment (\`GROQ_API_KEY\`, etc.).

## Remote MCP on serverless

- Uses **stateless** Streamable HTTP (new connection per request batch)
- Suitable for Vercel; no long-lived stdio process
- Long-running automations may hit platform timeouts — prefer Tools API or local MCP for heavy workloads

## When to use Tools API instead

| Prefer Tools API | Prefer MCP |
|------------------|------------|
| n8n, Custom GPT, simple webhooks | Native chat tool-calling |
| OpenAPI import | Claude Desktop / Cursor UX |
| Stateless HTTP only | Already using MCP clients |

## Related

- [Tools API overview](/docs/api/overview)
- [Deployment modes](/docs/deployment/modes)
- [Troubleshooting](/docs/troubleshooting)
`,"../../../docs/mcp/remote.md":`# Remote MCP over HTTP

Connect MCP clients to your deployed Substack Agent instance at **\`https://your-domain/api/mcp\`** using Bearer authentication (same \`API_SECRET\` as the Tools API).

## When to use remote MCP

| Setup | Transport | Best for |
|-------|-----------|----------|
| Claude Desktop / Cursor (local) | stdio (\`npm run mcp\`) | Development on your machine |
| Cursor / Claude remote / cloud agents | HTTP at \`/api/mcp\` | Production deploy on your domain |

Local stdio MCP and remote HTTP MCP expose the **same tools** (\`publish_newsletter\`, \`list_notes\`, etc.).

## Prerequisites

1. Deploy the app to any Node host (see [Deploy Tools API](../deployment/deploy.md)).
2. Set environment variables:
   - \`API_SECRET\` — Bearer token for \`/api/mcp\` and \`/api/tools/*\`
   - \`SUBSTACK_SID\` — your \`connect.sid\` session cookie
   - \`SUBSTACK_PUB_URL\` — e.g. \`yourname.substack.com\`
3. Verify health: \`curl -H "Authorization: Bearer $API_SECRET" https://your-domain/api/tools/health\`

## Cursor configuration

Add to \`.cursor/mcp.json\` (or Cursor MCP settings):

\`\`\`json
{
  "mcpServers": {
    "substack-remote": {
      "url": "https://your-domain/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_SECRET"
      }
    }
  }
}
\`\`\`

Replace \`your-domain\` and \`YOUR_API_SECRET\` with your values.

## Claude Desktop (remote)

Claude Desktop primarily supports stdio MCP locally. For a deployed instance, use:

- **Cursor** or another client with Streamable HTTP MCP support, or
- **Tools API** / OpenAPI integrations for GPTs and n8n

## Authentication

All requests to \`/api/mcp\` require:

\`\`\`
Authorization: Bearer <API_SECRET>
\`\`\`

Without a valid Bearer token, the server returns \`401 Unauthorized\`.

## Transport

This endpoint implements the MCP **Streamable HTTP** transport (GET + POST). It runs in **stateless** mode — suitable for serverless (Vercel) and long-running Node hosts.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| \`401 Unauthorized\` | Check \`API_SECRET\` matches your deploy env |
| \`503\` / connection errors | Refresh \`SUBSTACK_SID\` — Substack sessions expire |
| Tool call fails | Test \`/api/tools/health\` first; verify \`connected: true\` |

## Related

- [MCP setup (local stdio)](setup.md)
- [Tools API overview](../api/overview.md)
- [Deploy anywhere](../deployment/deploy.md)
`,"../../../docs/mcp/setup.md":`# MCP Setup

Run the MCP server locally for Claude Desktop, Cursor, and other stdio-compatible clients.

## Install

\`\`\`bash
git clone https://github.com/santhosh-patel/substack-agent.git
cd substack-agent && npm install
\`\`\`

## Claude Desktop

Edit \`claude_desktop_config.json\`:

\`\`\`json
{
  "mcpServers": {
    "substack": {
      "command": "npx",
      "args": ["tsx", "/absolute/path/to/substack-agent/src/mcp-server.ts"],
      "env": {
        "SUBSTACK_SID": "your-connect-sid-cookie",
        "SUBSTACK_PUB_URL": "yourname.substack.com"
      }
    }
  }
}
\`\`\`

Restart Claude Desktop. You should see 9 Substack tools available.

## Cursor

Add the same \`mcpServers\` entry in Cursor MCP settings (stdio transport).

## Remote MCP (deployed)

If the app runs on your domain with \`API_SECRET\` and \`SUBSTACK_SID\`, point MCP clients at **\`https://your-domain/api/mcp\`** with Bearer auth. See [Remote MCP over HTTP](/docs/mcp/remote).

## Run manually

\`\`\`bash
npm run mcp
\`\`\`

Server uses stdio — no HTTP port.

## Environment variables

Same as \`.env.example\`. MCP reads \`SUBSTACK_SID\` and \`SUBSTACK_PUB_URL\` from the config env block.

## Next steps

- [Remote MCP (HTTP)](/docs/mcp/remote)
- [Tools reference](/docs/mcp/tools)
- [Limitations](/docs/mcp/limitations)
- [Claude Desktop cookbook](/docs/integrations/claude-desktop)
`,"../../../docs/mcp/tools.md":`# MCP Tools Reference

All 9 tools exposed by \`src/mcp-server.ts\`.

## publish_newsletter

Publish or draft a newsletter.

\`\`\`json
{
  "title": "Weekly Digest",
  "subtitle": "Optional subtitle",
  "body": "# Markdown content",
  "isDraft": false
}
\`\`\`

## publish_note

Post a short note.

\`\`\`json
{
  "body": "Quick update for readers",
  "link": "https://example.com/optional-link"
}
\`\`\`

## post_comment

Comment on a specific post.

\`\`\`json
{
  "postUrl": "https://example.substack.com/p/post-slug",
  "body": "Great insights!"
}
\`\`\`

## automate_comments

Scan a target account and AI-reply to keyword-matching posts.

\`\`\`json
{
  "targetAccount": "@tech_insights",
  "keyword": "AI agents",
  "provider": "groq",
  "model": "llama-3.3-70b-versatile"
}
\`\`\`

## list_newsletters

Returns recent newsletter archive posts (no parameters).

## list_notes

Returns recent notes from your publication (no parameters).

## list_comments

Returns **local automation comment log** — not Substack's full comment inbox.

## schedule_post

Queue a post for future publishing.

\`\`\`json
{
  "title": "Scheduled Post",
  "body": "Markdown body",
  "scheduledAt": "2026-08-01T14:00:00Z",
  "recurrence": "weekly",
  "postType": "newsletter",
  "isDraft": true
}
\`\`\`

## list_schedules

Returns all scheduled posts with status and recurrence metadata.

## REST API equivalents

See [Tools API Endpoints](/docs/api/endpoints) for HTTP versions of these operations.

## Next steps

- [Limitations](/docs/mcp/limitations)
`,"../../../docs/security.md":`# Security

## Session cookie

Your \`connect.sid\` cookie is equivalent to your Substack password. Protect it accordingly.

## Browser storage (playground)

The dashboard at \`/playground\` stores in \`localStorage\`:

- \`connect.sid\` and publication URL (\`substack_settings\`)
- AI API keys per provider (\`substack_apikey_*\`)
- Theme, sidebar, and prompt preferences

Anyone with access to your browser profile can read these values.

## API authentication model

| Route prefix | Auth | Purpose |
|--------------|------|---------|
| \`/api/tools/*\` | Bearer \`API_SECRET\` (required in production) | External agents, n8n, GPTs |
| \`/api/mcp\` | Bearer \`API_SECRET\` (required in production) | Remote MCP over HTTP |
| \`/api/*\` (dashboard) | **None** | Local playground only |

The playground is a **local dashboard** — it calls unauthenticated \`/api/*\` routes for connect, publish, and scheduler UI. When you deploy publicly, treat the dashboard as trusted-local-only; point production automations at **\`/api/tools/*\`** or **\`/api/mcp\`** with Bearer auth instead.

## Reporting vulnerabilities

Do **not** file public GitHub issues for security vulnerabilities. Email the repository owner with description, reproduction steps, and impact assessment.

## Contributor practices

- Never commit \`.env\`, cookies, or API keys
- Set \`API_SECRET\` on all production deployments
- Rotate \`connect.sid\` if exposed
- Do not commit \`src/data/comments_history.json\`

## Related

- [Session cookie guide](/docs/getting-started/session-cookie)
- [Deploy the Tools API](/docs/deployment/deploy)
- [Vercel-specific notes](/docs/deployment/vercel)
`,"../../../docs/superpowers/plans/2026-07-24-deploy-anywhere-tools-api.md":`# Deploy-Anywhere Tools API Messaging Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (\`- [ ]\`) syntax for tracking.

**Goal:** Reframe landing + README so the Tools API is “deploy anywhere, use your domain,” with no Vercel-required CTA.

**Architecture:** Copy and CTA updates only across existing React landing components and README/CHANGELOG. No new deploy buttons, no remote MCP transport, no playground/SECURITY scheduler-banner changes.

**Tech Stack:** React (landing-page Vite app), static README Markdown, \`npm run build:landing\` to sync into \`public/\`.

**Spec:** \`docs/superpowers/specs/2026-07-24-deploy-anywhere-tools-api-design.md\`

## Global Constraints

- Do **not** claim remote/hosted MCP over HTTP; MCP remains local stdio (\`npm run mcp\`).
- Soft wording allowed: use your domain with agents, automations, and MCP-style tool clients.
- Vercel may appear only as an optional example host.
- No new one-click deploy buttons (Vercel, Railway, Render, Fly, etc.).
- Do not edit playground Vercel banners in \`public/app.js\` or scheduler caveats in \`SECURITY.md\` / README “Scheduler on Vercel”.
- There is no \`npm start\` script; use \`npm run dev\` for Node-host run instructions.
- Repo URL: \`https://github.com/santhosh-patel/substack-agent\`

## File map

| File | Responsibility |
|------|----------------|
| \`landing-page/src/components/DeployCTA.jsx\` | Deploy section CTA (docs primary, GitHub secondary) |
| \`landing-page/src/components/DeploymentModes.jsx\` | Three-mode cards; Tools API + MCP wording |
| \`landing-page/src/components/UseCases.jsx\` | Automation use-case copy |
| \`landing-page/src/components/Integrations.jsx\` | REST method subtitle + highlights |
| \`landing-page/src/components/HowItWorks.jsx\` | Step 03 launch copy |
| \`landing-page/src/components/FAQ.jsx\` | Free/OSS, cookie, n8n answers |
| \`landing-page/src/components/TrustBar.jsx\` | Replace Vercel pill with OpenAPI |
| \`README.md\` | HTTP API blurb, Deploy section, deployment modes table |
| \`CHANGELOG.md\` | One Changed line |
| \`public/\` (via build) | Built landing output |

---

### Task 1: Redesign Deploy CTA

**Files:**
- Modify: \`landing-page/src/components/DeployCTA.jsx\`
- Test: grep verification (no automated unit tests for marketing copy)

**Interfaces:**
- Consumes: existing \`DeployCTA.css\` classes (\`.deploy-actions\`, \`.btn-accent\`, \`.btn-outline\`)
- Produces: primary docs link + secondary GitHub link; no Vercel clone URL

- [ ] **Step 1: Replace \`DeployCTA.jsx\` content**

Overwrite \`landing-page/src/components/DeployCTA.jsx\` with:

\`\`\`jsx
import './DeployCTA.css';

const envVars = ['SUBSTACK_SID', 'SUBSTACK_PUB_URL', 'API_SECRET'];

export default function DeployCTA() {
  return (
    <section className="deploy-cta" id="deploy">
      <div className="container">
        <div className="deploy-card animate-in">
          <span className="section-badge">Deploy</span>
          <h2 className="section-title">Deploy the Tools API anywhere</h2>
          <p className="deploy-subtitle">
            Host the OpenAPI tools endpoints on any Node host. Then use your domain with agents, automations, and MCP-style tool clients (n8n, custom GPTs, webhooks). Keep local <code>npm run mcp</code> / <code>npm run dev</code> for Claude Desktop and the full dashboard.
          </p>

          <div className="deploy-env-checklist">
            <span className="deploy-env-label">Required environment variables:</span>
            <ul>
              {envVars.map((v) => (
                <li key={v}><code>{v}</code></li>
              ))}
            </ul>
          </div>

          <div className="deploy-actions">
            <a
              href="https://github.com/santhosh-patel/substack-agent#deploy"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent btn-lg"
            >
              Deployment docs
            </a>
            <a
              href="https://github.com/santhosh-patel/substack-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
\`\`\`

- [ ] **Step 2: Verify CTA has no Vercel button**

Run:

\`\`\`bash
rg -n "Deploy to Vercel|vercel.com/new/clone" "landing-page/src/components/DeployCTA.jsx"
\`\`\`

Expected: no matches.

- [ ] **Step 3: Commit**

\`\`\`bash
git add landing-page/src/components/DeployCTA.jsx
git commit -m "$(cat <<'EOF'
Update Deploy CTA for deploy-anywhere Tools API.

EOF
)"
\`\`\`

---

### Task 2: Update DeploymentModes, HowItWorks, UseCases

**Files:**
- Modify: \`landing-page/src/components/DeploymentModes.jsx\`
- Modify: \`landing-page/src/components/HowItWorks.jsx\`
- Modify: \`landing-page/src/components/UseCases.jsx\`

**Interfaces:**
- Consumes: existing component CSS and section structure
- Produces: copy aligned with any-host + local MCP

- [ ] **Step 1: Update \`DeploymentModes.jsx\` mode data**

In \`modes\` array, set the \`api\` and \`mcp\` entries to:

\`\`\`js
  {
    id: 'api',
    title: 'Deployed Tools API',
    command: 'any Node host + API_SECRET',
    bestFor: 'n8n, GPTs, webhooks, production automations',
    limits: 'Stateless tool calls only. Bearer auth required in production. Point clients at your domain.',
    cta: { label: 'View OpenAPI', href: '/openapi.json' },
  },
  {
    id: 'mcp',
    title: 'Local MCP Server',
    command: 'npm run mcp',
    bestFor: 'Claude Desktop, Cursor, chat-native workflows',
    limits: 'Stdio transport. Runs locally alongside your MCP client.',
    cta: { label: 'GitHub Setup', href: 'https://github.com/santhosh-patel/substack-agent#2-mcp-server' },
  },
\`\`\`

Leave the \`local\` mode unchanged.

- [ ] **Step 2: Update \`HowItWorks.jsx\` step 03**

Replace the step \`03\` object with:

\`\`\`js
  {
    step: '03',
    title: 'Launch & Connect',
    desc: 'Start the MCP server locally, or deploy the Tools API to any Node host and use your domain for HTTP tool clients.',
    code: 'npm run mcp        # For Claude / Cursor\\nnpm run dev        # For Dashboard / Tools API',
  },
\`\`\`

- [ ] **Step 3: Update \`UseCases.jsx\` Automation Engineer case**

Replace the Automation Engineer \`desc\` with:

\`\`\`js
    desc: 'Deploy the REST tools API anywhere and wire n8n, Zapier, or custom GPTs to your domain with Bearer auth.',
\`\`\`

- [ ] **Step 4: Verify required phrases**

Run:

\`\`\`bash
rg -n "any Node host|your domain|not hosted on Vercel|Deploy the REST tools API to Vercel" \\
  landing-page/src/components/DeploymentModes.jsx \\
  landing-page/src/components/HowItWorks.jsx \\
  landing-page/src/components/UseCases.jsx
\`\`\`

Expected:
- Matches for \`any Node host\` and \`your domain\`
- No match for \`not hosted on Vercel\`
- No match for \`Deploy the REST tools API to Vercel\`

- [ ] **Step 5: Commit**

\`\`\`bash
git add landing-page/src/components/DeploymentModes.jsx \\
  landing-page/src/components/HowItWorks.jsx \\
  landing-page/src/components/UseCases.jsx
git commit -m "$(cat <<'EOF'
Reframe deployment modes and use cases as any-host.

EOF
)"
\`\`\`

---

### Task 3: Update Integrations, FAQ, TrustBar

**Files:**
- Modify: \`landing-page/src/components/Integrations.jsx\`
- Modify: \`landing-page/src/components/FAQ.jsx\`
- Modify: \`landing-page/src/components/TrustBar.jsx\`

**Interfaces:**
- Consumes: existing tabs/FAQ accordion/trust pills UI
- Produces: Vercel-optional / OpenAPI-forward copy

- [ ] **Step 1: Update REST method in \`Integrations.jsx\`**

In the \`api\` method object, set:

\`\`\`js
    subtitle: 'Deployable on any Node host for n8n, GPTs & custom workflows',
    desc: 'Fully typed OpenAPI 3.0 endpoints. Call \`/api/tools/*\` on your domain from n8n, custom GPTs, Zapier, or backend webhooks.',
    highlights: ['Any Host', 'OpenAPI Schema', 'n8n & Zapier', 'Bearer Auth'],
\`\`\`

Leave \`code\` and other methods unchanged.

- [ ] **Step 2: Update FAQ answers in \`FAQ.jsx\`**

Replace these three answer strings only:

\`\`\`js
    a: 'Yes. It is published under the MIT license. You can deploy it locally, host it on any Node host (for example Vercel), or include it in proprietary agent pipelines without restrictions.',
\`\`\`

\`\`\`js
    a: 'Your connect.sid cookie is equivalent to your Substack password. In the playground, it is saved in browser localStorage and sent to your Substack Agent server when you connect. In MCP/API mode, store it in .env or your host environment variables only. Never share it publicly — rotate immediately if exposed.',
\`\`\`

\`\`\`js
    a: 'Yes. Deploy the REST API endpoints to any Node host and point HTTP Request nodes at your domain with Bearer authorization.',
\`\`\`

(These correspond to the free/OSS, cookie safety, and n8n/Zapier FAQ entries.)

- [ ] **Step 3: Update \`TrustBar.jsx\` integrations list**

Replace:

\`\`\`js
  { name: 'Vercel' },
\`\`\`

with:

\`\`\`js
  { name: 'OpenAPI' },
\`\`\`

- [ ] **Step 4: Verify**

Run:

\`\`\`bash
rg -n "Vercel Ready|Deployable on Vercel|Deploy the REST API endpoints to Vercel|name: 'Vercel'" \\
  landing-page/src/components/Integrations.jsx \\
  landing-page/src/components/FAQ.jsx \\
  landing-page/src/components/TrustBar.jsx
\`\`\`

Expected: no matches.

Also:

\`\`\`bash
rg -n "Any Host|any Node host|OpenAPI" \\
  landing-page/src/components/Integrations.jsx \\
  landing-page/src/components/FAQ.jsx \\
  landing-page/src/components/TrustBar.jsx
\`\`\`

Expected: matches in all three files.

- [ ] **Step 5: Commit**

\`\`\`bash
git add landing-page/src/components/Integrations.jsx \\
  landing-page/src/components/FAQ.jsx \\
  landing-page/src/components/TrustBar.jsx
git commit -m "$(cat <<'EOF'
De-emphasize Vercel in integrations, FAQ, and trust bar.

EOF
)"
\`\`\`

---

### Task 4: Rewrite README deploy story

**Files:**
- Modify: \`README.md\`

**Interfaces:**
- Consumes: existing \`#deploy\` heading (keep so CTA links still resolve)
- Produces: any-host Deploy section; Tools API row not Vercel-only; Scheduler on Vercel subsection unchanged

- [ ] **Step 1: Update HTTP API blurb**

In \`README.md\` under \`### 3. HTTP API\`, replace:

\`\`\`markdown
Deploy to Vercel (or any Node host) and call OpenAPI-defined endpoints. Any tool that speaks HTTP can publish to Substack on your behalf.
\`\`\`

with:

\`\`\`markdown
Deploy to any Node host and call OpenAPI-defined endpoints at your domain. Use that URL with agents, automations, and MCP-style tool clients. Any tool that speaks HTTP can publish to Substack on your behalf.
\`\`\`

- [ ] **Step 2: Replace the Deploy section**

Replace the entire \`## Deploy\` section (from \`## Deploy\` through the blank line before \`## Security model\`) with the following content (write it exactly into \`README.md\`):

~~~~markdown
## Deploy

Host the Tools API on any Node platform (Vercel, Railway, a VPS, etc.).

1. Set these environment variables on your host:

\`\`\`env
SUBSTACK_SID=
SUBSTACK_PUB_URL=
API_SECRET=
\`\`\`

2. Run the server on your host with Node 18+ (locally: \`npm run dev\`). Example optional path: deploy this repo with the Vercel CLI (\`vercel\`) if that is your preferred host.

3. Call your Tools API:

\`\`\`bash
curl -X POST "https://your-domain/api/tools/publish-newsletter" \\
  -H "Authorization: Bearer $API_SECRET" \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Hello","body":"Markdown body","isDraft":true}'
\`\`\`

OpenAPI spec: \`https://your-domain/openapi.json\` (also in [\`public/openapi.json\`](public/openapi.json)).

Use your domain with agents, automations, and MCP-style tool clients (n8n, custom GPTs, webhooks). Claude Desktop and Cursor continue to use the local MCP server via \`npm run mcp\`.
~~~~

Keep the \`#deploy\` heading text as \`## Deploy\` so existing anchors work.

- [ ] **Step 3: Update deployment modes table Tools API row**

Replace the table with:

\`\`\`markdown
| Mode | Command | Works on Vercel | Notes |
|------|---------|-----------------|-------|
| **Local dashboard** | \`npm run dev\` | Partial | Full scheduler, history, AI compose at \`http://localhost:3456/playground\` |
| **Tools API** | any Node host + \`API_SECRET\` | Yes | Stateless \`/api/tools/*\` for n8n, GPTs, webhooks — point clients at your domain |
| **MCP server** | \`npm run mcp\` | No (local stdio) | Claude Desktop / Cursor integration |
\`\`\`

Do **not** edit the \`### Scheduler on Vercel\` subsection.

- [ ] **Step 4: Verify**

Run:

\`\`\`bash
rg -n "^## Deploy$|your-domain|any Node host|npm run mcp" README.md
rg -n "Scheduler on Vercel" README.md
rg -n "^\\\`\\\`\\\`bash$|^vercel$" README.md
\`\`\`

Expected:
- \`## Deploy\`, \`your-domain\`, \`any Node host\`, \`npm run mcp\` present
- \`Scheduler on Vercel\` still present
- Standalone Deploy section is no longer only a bare \`vercel\` command as the whole guide (a mention of \`vercel\` as optional example is fine)

- [ ] **Step 5: Commit**

\`\`\`bash
git add README.md
git commit -m "$(cat <<'EOF'
Document any-host Tools API deploy and domain usage.

EOF
)"
\`\`\`

---

### Task 5: CHANGELOG, rebuild landing, final verification

**Files:**
- Modify: \`CHANGELOG.md\`
- Modify: \`public/index.html\` and \`public/assets/*\` (via \`npm run build:landing\`)

**Interfaces:**
- Consumes: all landing JSX changes from Tasks 1–3
- Produces: built static landing reflecting deploy-anywhere copy

- [ ] **Step 1: Add CHANGELOG Changed line**

Under \`## [2.0.0] — 2026\` → \`### Changed\`, add:

\`\`\`markdown
- Deploy messaging reframed as any-host Tools API; use your domain with agents and automations (Vercel optional)
\`\`\`

- [ ] **Step 2: Rebuild landing into \`public/\`**

Run:

\`\`\`bash
npm run build:landing
\`\`\`

Expected: build succeeds; \`public/index.html\` and assets updated.

- [ ] **Step 3: Final verification grep**

Run from repo root:

\`\`\`bash
rg -n "Deploy the Tools API to Vercel|Deploy to Vercel|vercel.com/new/clone|Vercel Ready|Deployable on Vercel" \\
  landing-page/src README.md CHANGELOG.md
\`\`\`

Expected: no matches in \`landing-page/src\` or \`CHANGELOG.md\`. README may mention Vercel only as an optional example / scheduler caveat (not as a required CTA).

Also confirm soft domain wording exists:

\`\`\`bash
rg -n "MCP-style tool clients|your domain" landing-page/src/components/DeployCTA.jsx README.md
\`\`\`

Expected: matches in both files.

Confirm non-goals untouched:

\`\`\`bash
rg -n "deploymentMode === 'vercel'|Scheduler on Vercel" public/app.js README.md SECURITY.md
\`\`\`

Expected: still present (do not remove).

- [ ] **Step 4: Commit**

\`\`\`bash
git add CHANGELOG.md public/index.html public/assets
git commit -m "$(cat <<'EOF'
Ship deploy-anywhere landing build and changelog note.

EOF
)"
\`\`\`

---

## Spec coverage checklist

| Spec requirement | Task |
|------------------|------|
| Deploy CTA headline/subtitle/actions | Task 1 |
| DeploymentModes / UseCases / HowItWorks | Task 2 |
| Integrations / FAQ / TrustBar | Task 3 |
| README HTTP API + Deploy + modes table | Task 4 |
| CHANGELOG Changed line | Task 5 |
| Soft MCP-style domain wording | Tasks 1, 4 |
| No remote MCP / no new deploy buttons | Global + Tasks 1–5 |
| Keep Scheduler on Vercel / playground banners | Tasks 4–5 verification |
`,"../../../docs/superpowers/specs/2026-07-24-deploy-anywhere-tools-api-design.md":`# Deploy-Anywhere Tools API Messaging

**Date:** 2026-07-24  
**Status:** Approved for implementation planning

## Goal

Reframe Substack Agent’s Tools API deploy story as **host anywhere**, then **use your domain** with agents, automations, and MCP-style tool clients. Remove the implication that Vercel is required. Vercel may appear only as an optional example host.

Do **not** claim remote/hosted MCP over HTTP. MCP remains local stdio (\`npm run mcp\`). Soft wording is allowed: use your domain with agents, automations, and MCP-style tool clients.

## Non-goals

- No new one-click deploy buttons (Vercel, Railway, Render, Fly, etc.)
- No remote MCP / SSE / HTTP MCP transport implementation
- No changes to playground Vercel deployment-mode banners or scheduler caveats in \`SECURITY.md\` / README “Scheduler on Vercel” (those stay as factual Vercel limits)

## Deploy CTA (\`DeployCTA.jsx\`)

| Element | Spec |
|---------|------|
| Headline | Deploy the Tools API anywhere |
| Subtitle | Host the OpenAPI tools endpoints on any Node host. Then use your domain with agents, automations, and MCP-style tool clients (n8n, custom GPTs, webhooks). Keep local \`npm run mcp\` / \`npm run dev\` for Claude Desktop and the full dashboard. |
| Env checklist | Unchanged: \`SUBSTACK_SID\`, \`SUBSTACK_PUB_URL\`, \`API_SECRET\` |
| Primary CTA | **Deployment docs** → GitHub README \`#deploy\` |
| Secondary CTA | **GitHub** → repository root |
| Removed | Deploy to Vercel button and clone URL |

## Landing copy map

| Component | Change |
|-----------|--------|
| \`DeploymentModes.jsx\` | Tools API command: \`any Node host + API_SECRET\`. MCP limits: keep local stdio; remove “not hosted on Vercel.” |
| \`UseCases.jsx\` | Automation case: deploy Tools API anywhere; wire n8n/Zapier/GPTs via your domain + Bearer auth. |
| \`Integrations.jsx\` | REST subtitle: any Node host. Highlight \`Any Host\` instead of \`Vercel Ready\`. |
| \`HowItWorks.jsx\` | Step 03: launch MCP locally or deploy Tools API and use your domain for HTTP tool clients. |
| \`FAQ.jsx\` | Free/OSS, cookie storage, and n8n answers: any host / your deployment URL; Vercel only as optional example. |
| \`TrustBar.jsx\` | Replace \`Vercel\` pill with \`OpenAPI\`. |

## README

### HTTP API blurb

Lead with any Node host (not “Deploy to Vercel”).

### Deploy section

Replace the Vercel-only \`vercel\` snippet with an any-host guide:

1. Set \`SUBSTACK_SID\`, \`SUBSTACK_PUB_URL\`, \`API_SECRET\` in the host environment.
2. Run on any Node host (\`npm start\` / platform of choice; Vercel optional example).
3. Call \`https://your-domain/api/tools/*\` with \`Authorization: Bearer <API_SECRET>\`; OpenAPI at \`/openapi.json\`.
4. Soft note: use that domain with agents, automations, and MCP-style tool clients. Claude Desktop / Cursor continue to use local \`npm run mcp\`.

### Deployment modes table

Tools API row: not Vercel-only. Keep the separate “Scheduler on Vercel” subsection as an optional host-specific caveat.

## CHANGELOG

Add one **Changed** line for deploy-anywhere messaging (landing + README).

## Success criteria

- No landing CTA implies Vercel is required.
- Users can find docs + GitHub as the path to deploy and use their own domain.
- MCP is still described as local; domain usage is for HTTP/OpenAPI-style clients with soft MCP-style wording only.
- Factual Vercel scheduler/ephemeral-storage warnings remain where they already exist.
`,"../../../docs/troubleshooting.md":`# Troubleshooting

Symptom → cause → fix. If you are stuck after these steps, [open a GitHub issue](https://github.com/santhosh-patel/substack-agent/issues) (no secrets in the report).

## Connection & session

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| "Not connected" in playground | No valid session | Paste fresh \`connect.sid\` → **Test** → **Connect** |
| 401 on **Connect** | Expired cookie | Re-extract from DevTools — [Session cookie](/docs/getting-started/session-cookie) |
| Auto-reconnect warning on load | Saved cookie invalid | Update cookie in settings; dismiss checklist when done |
| Toast: "refresh your connect.sid" | Substack session expired | Same as above — cookies expire after logout or time |
| Tools API \`SESSION_EXPIRED\` | Host env cookie stale | Update \`SUBSTACK_SID\` on server; redeploy |
| Health \`connected: false\` | SID or pub URL wrong | Verify \`SUBSTACK_SID\` + \`SUBSTACK_PUB_URL\` in host env |

## AI generation

| Symptom | Fix |
|---------|-----|
| "Please enter API key" | Add key in [Settings](/docs/dashboard/settings) or \`.env\` |
| Provider / model error | Click **Test API Key**; confirm model name for provider |
| Web search fails | Disable web search toggle or switch provider |
| Scheduled research post fails | Ensure API key saved with schedule or in \`.env\` |

## Publish

| Symptom | Fix |
|---------|-----|
| Publish button disabled | Connect Substack first |
| Note publish blocked | Connection required (by design) |
| Empty newsletter body | Add Markdown before publish |
| Substack API error | Refresh cookie; check publication URL matches your account |

## Scheduler

| Symptom | Fix |
|---------|-----|
| Jobs stuck pending (Vercel) | Use local \`npm run dev\` or external cron — [Scheduler & Cron](/docs/deployment/scheduler-cron) |
| Queue lost after deploy | Expected on Vercel \`/tmp\` — run locally for durable queue |
| Create disabled on Vercel | By design — see playground banner |
| Manual queue check does nothing | No due posts yet; check scheduled time timezone |

## Tools API & deploy

| Symptom | Fix |
|---------|-----|
| 401 Unauthorized | Add \`Authorization: Bearer $API_SECRET\` |
| 403 Forbidden | Wrong token — match host \`API_SECRET\` |
| 503 on tools routes | Set \`API_SECRET\` when \`NODE_ENV=production\` |
| 500 on Vercel | Check function logs; verify env vars |
| Health returns 200 without auth locally | Dev mode — set \`API_SECRET\` + \`NODE_ENV=production\` to test auth |

## MCP

| Symptom | Fix |
|---------|-----|
| Tools not in Claude/Cursor | Restart client; use **absolute path** in config — [MCP setup](/docs/mcp/setup) |
| Stdio errors | Run \`npm run mcp\` manually; read stderr |
| Remote MCP 401 | Bearer header must match \`API_SECRET\` — [Remote MCP](/docs/mcp/remote) |
| Remote MCP connection drops | Verify health endpoint; refresh \`SUBSTACK_SID\` on host |

## Vercel deploy

| Symptom | Fix |
|---------|-----|
| Deploy fails on cron config | Repo no longer ships \`crons\` in \`vercel.json\` — add cron in dashboard if your plan supports it |
| Playground works but scheduler empty | Ephemeral storage — expected |

## Diagnostic commands

\`\`\`bash
# Local server responding
curl -s http://localhost:3456/api/config | head

# Auth + session (production)
curl -s http://localhost:3456/api/tools/health \\
  -H "Authorization: Bearer $API_SECRET"

# Auth tests
API_SECRET=your-secret NODE_ENV=production npm start
npm run test:auth
\`\`\`

## Related

- [Security](/docs/security)
- [Environment variables](/docs/getting-started/environment-variables)
- [Deployment modes](/docs/deployment/modes)
`});function el(e){let t=e.match(/docs\/(.+\.md)$/);return t?t[1]:null}var tl=Object.fromEntries(Object.entries($c).map(([e,t])=>[el(e),t]).filter(([e])=>e));function nl(e){return tl[e]??null}function rl(){return Object.entries(tl).map(([e,t])=>({file:e,body:typeof t==`string`?t:``}))}function il(){let e=s(),[t,n]=(0,za.useState)(!1),[i,a]=(0,za.useState)(``),o=(0,za.useMemo)(()=>{let e=Object.fromEntries(rl().map(e=>[e.file,e.body]));return $.map(t=>({...t,body:e[t.file]||``}))},[]),l=Xc(e.pathname),{prev:d,next:f}=Zc(e.pathname),p=(0,za.useMemo)(()=>{let e=i.trim().toLowerCase();if(!e)return Yc;let t=new Set(o.filter(t=>t.title.toLowerCase().includes(e)||t.section.toLowerCase().includes(e)||t.body.toLowerCase().includes(e)).map(e=>e.file));return Yc.map(n=>({...n,items:n.items.filter(r=>r.title.toLowerCase().includes(e)||n.title.toLowerCase().includes(e)||t.has(r.file))})).filter(e=>e.items.length>0)},[i,o]);return(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(`a`,{href:`#docs-content`,className:`skip-link`,children:`Skip to content`}),(0,X.jsx)(c,{}),(0,X.jsxs)(`div`,{className:`docs-shell`,children:[(0,X.jsx)(`button`,{type:`button`,className:`docs-sidebar-toggle`,onClick:()=>n(!t),"aria-expanded":t,children:t?`Close menu`:`Docs menu`}),t&&(0,X.jsx)(`div`,{className:`docs-sidebar-backdrop`,onClick:()=>n(!1)}),(0,X.jsxs)(`aside`,{className:`docs-sidebar ${t?`is-open`:``}`,children:[(0,X.jsxs)(`div`,{className:`docs-sidebar-header`,children:[(0,X.jsx)(r,{to:`/docs`,className:`docs-home-link`,onClick:()=>n(!1),children:`Documentation`}),(0,X.jsx)(`input`,{type:`search`,className:`docs-search`,placeholder:`Search docs…`,value:i,onChange:e=>a(e.target.value),"aria-label":`Search documentation`})]}),(0,X.jsx)(`nav`,{className:`docs-nav`,"aria-label":`Documentation`,children:p.map(e=>(0,X.jsxs)(`div`,{className:`docs-nav-section`,children:[(0,X.jsx)(`div`,{className:`docs-nav-section-title`,children:e.title}),(0,X.jsx)(`ul`,{children:e.items.map(e=>(0,X.jsx)(`li`,{children:(0,X.jsx)(r,{to:Qc(e.path),className:l.path===e.path?`is-active`:``,onClick:()=>n(!1),children:e.title})},e.path))})]},e.title))})]}),(0,X.jsxs)(`main`,{className:`docs-main`,id:`docs-content`,children:[(0,X.jsx)(sl,{page:l}),(0,X.jsxs)(`div`,{className:`docs-pager`,children:[d?(0,X.jsxs)(r,{to:Qc(d.path),className:`docs-pager-link docs-pager-prev`,children:[(0,X.jsx)(`span`,{className:`docs-pager-label`,children:`Previous`}),(0,X.jsx)(`span`,{className:`docs-pager-title`,children:d.title})]}):(0,X.jsx)(`span`,{}),f?(0,X.jsxs)(r,{to:Qc(f.path),className:`docs-pager-link docs-pager-next`,children:[(0,X.jsx)(`span`,{className:`docs-pager-label`,children:`Next`}),(0,X.jsx)(`span`,{className:`docs-pager-title`,children:f.title})]}):(0,X.jsx)(`span`,{})]})]})]}),(0,X.jsx)(u,{})]})}function al(e){return(typeof e==`string`?e:Array.isArray(e)?e.map(e=>typeof e==`string`?e:``).join(``):String(e??``)).toLowerCase().replace(/[^\w\s-]/g,``).replace(/\s+/g,`-`).replace(/-+/g,`-`).trim()}function ol(e){return e?[...e.matchAll(/^## (.+)$/gm)].map(e=>({id:al(e[1]),text:e[1]})):[]}function sl({page:e}){let[t,n]=(0,za.useState)([]),i=nl(e.file),a=`${Jc}/${e.file}`,s=(0,za.useMemo)(()=>ol(i),[i]);return(0,za.useEffect)(()=>{let e=!1;return Promise.all([l(()=>import(`./rehype-highlight-CsfONlRn.js`),__vite__mapDeps([0,1,2])),l(()=>Promise.resolve({}),__vite__mapDeps([3]))]).then(([t])=>{e||n([t.default])}).catch(()=>{}),()=>{e=!0}},[]),i?(0,X.jsxs)(`article`,{className:`docs-article`,children:[(0,X.jsxs)(`div`,{className:`docs-meta`,children:[(0,X.jsxs)(`nav`,{className:`docs-breadcrumb`,"aria-label":`Breadcrumb`,children:[(0,X.jsx)(r,{to:`/docs`,children:`Docs`}),e.section&&e.section!==`Introduction`&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(`span`,{"aria-hidden":`true`,children:` / `}),(0,X.jsx)(`span`,{children:e.section})]}),(0,X.jsx)(`span`,{"aria-hidden":`true`,children:` / `}),(0,X.jsx)(`span`,{children:e.title})]}),e.modes?.length>0&&(0,X.jsx)(`div`,{className:`docs-mode-badges`,children:e.modes.map(e=>(0,X.jsx)(`span`,{className:`docs-mode-badge`,children:e},e))}),(0,X.jsx)(`a`,{href:a,className:`docs-edit-link`,target:`_blank`,rel:`noopener noreferrer`,children:`Edit on GitHub`})]}),e.description&&(0,X.jsx)(`p`,{className:`docs-lead`,children:e.description}),(0,X.jsxs)(`div`,{className:`docs-article-layout${s.length>=3?` has-toc`:``}`,children:[(0,X.jsx)(`div`,{className:`docs-markdown`,children:(0,X.jsx)(Wa,{remarkPlugins:[qc],rehypePlugins:t,components:{h2({children:e,...t}){return(0,X.jsx)(`h2`,{id:al(e),...t,children:e})},h3({children:e,...t}){return(0,X.jsx)(`h3`,{id:al(e),...t,children:e})},pre({children:e,...t}){return(0,X.jsx)(o,{className:`mac-window-docs`,children:(0,X.jsx)(`pre`,{...t,children:e})})}},children:i})}),s.length>=3&&(0,X.jsxs)(`nav`,{className:`docs-toc`,"aria-label":`On this page`,children:[(0,X.jsx)(`div`,{className:`docs-toc-title`,children:`On this page`}),(0,X.jsx)(`ul`,{children:s.map(e=>(0,X.jsx)(`li`,{children:(0,X.jsx)(`a`,{href:`#${e.id}`,children:e.text})},e.id))})]})]})]}):(0,X.jsxs)(`div`,{className:`docs-article`,children:[(0,X.jsx)(`h1`,{children:`Page not found`}),(0,X.jsxs)(`p`,{children:[`The documentation file `,(0,X.jsx)(`code`,{children:e.file}),` could not be loaded.`]}),(0,X.jsx)(r,{to:`/docs`,children:`Back to docs home`})]})}export{il as default};