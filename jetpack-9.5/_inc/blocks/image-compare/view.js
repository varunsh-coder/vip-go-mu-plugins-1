!function(t,e){for(var i in e)t[i]=e[i]}(window,function(t){var e={};function i(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=418)}({234:function(t,e,i){"use strict";i.r(e);var n=i(55),r=i.n(n);i(235);r()((function(){var t={sliders:[],OPTIMIZATION_ACCEPTED:1,OPTIMIZATION_WAS_CONSTRAINED:2};function e(t,e){var i=this;this.image=new Image,this.loaded=!1,this.image.onload=function(){i.loaded=!0,e._onLoaded()},this.image.src=t.src,this.image.alt=t.alt||"",this.label=t.label||!1}function i(t,e){t&&t.classList.add(e)}function n(t,e){t&&t.classList.remove(e)}function r(t){return{width:parseInt(window.getComputedStyle(t).width,10),height:parseInt(window.getComputedStyle(t).height,10)}}function o(t,e){var i,n;if("string"==typeof e||"number"==typeof e)i=parseInt(e,10);else{var r=t.getBoundingClientRect(),o={top:r.top+document.body.scrollTop+document.documentElement.scrollTop,left:r.left+document.body.scrollLeft+document.documentElement.scrollLeft},s=t.offsetWidth;i=(((n=e).pageX?n.pageX:n.touches?n.touches[0].pageX:n.clientX+document.body.scrollLeft+document.documentElement.scrollLeft)-o.left)/s*100}return i}function s(t,e){var i,n;if("string"==typeof e||"number"==typeof e)i=parseInt(e,10);else{var r=t.getBoundingClientRect(),o={top:r.top+document.body.scrollTop+document.documentElement.scrollTop,left:r.left+document.body.scrollLeft+document.documentElement.scrollLeft},s=t.offsetHeight;i=(((n=e).pageY?n.pageY:n.touches?n.touches[0].pageY:n.clientY+document.body.scrollTop+document.documentElement.scrollTop)-o.top)/s*100}return i}var a={animate:!0,showLabels:!0,makeResponsive:!0};function l(t,i,n){var r,o;for(r in this.selector=t,this.options={animate:!0,showLabels:!0,makeResponsive:!0,startingPosition:"50%",mode:"horizontal",callback:null},this.options)r in n&&(this.options[r]=r in a?"string"!=typeof(o=n[r])?Boolean(o):!("false"===o||""===o):n[r]);2===i.length&&(this.imgBefore=new e(i[0],this),this.imgAfter=new e(i[1],this))}l.prototype={updateSlider:function(t,e){var r;r=(r="vertical"===this.options.mode?s(this.slider,t):o(this.slider,t)).toFixed(2)+"%";var a=parseFloat(r),l=100-a+"%";a>0&&a<100&&(n(this.handle,"transition"),n(this.rightImage,"transition"),n(this.leftImage,"transition"),this.options.animate&&e&&(i(this.handle,"transition"),i(this.leftImage,"transition"),i(this.rightImage,"transition")),"vertical"===this.options.mode?(this.handle.style.top=r,this.leftImage.style.height=r,this.rightImage.style.height=l):(this.handle.style.left=r,this.leftImage.style.width=r,this.rightImage.style.width=l),this.sliderPosition=r)},getPosition:function(){return this.sliderPosition},displayLabel:function(t,e){var i=document.createElement("div");i.className="jx-label",i.setAttribute("tabindex",0),function(t,e){document.body.textContent?t.textContent=e:t.innerText=e}(i,e),t.appendChild(i)},setStartingPosition:function(t){this.options.startingPosition=t},calculateDims:function(t,e){var i,n=(i=this.imgBefore.image,{width:i.naturalWidth,height:i.naturalHeight,aspect:function(){return this.width/this.height}}).aspect();return t?e=t/n:e&&(t=e*n),{width:t,height:e,ratio:n}},responsivizeIframe:function(t){return t.height<window.innerHeight?t.ratio>=1&&(this.wrapper.style.paddingTop=parseInt((window.innerHeight-t.height)/2)+"px"):t.height>window.innerHeight&&(t=this.calculateDims(0,window.innerHeight),this.wrapper.style.paddingLeft=parseInt((window.innerWidth-t.width)/2)+"px"),t},setWrapperDimensions:function(){var t=r(this.wrapper).width,e=r(this.wrapper).height,i=this.calculateDims(t,e);window.location===window.parent.location||this.options.makeResponsive||(i=this.responsivizeIframe(i)),this.wrapper.style.height=parseInt(i.height)+"px",this.wrapper.style.width=parseInt(i.width)+"px"},optimizeWrapper:function(e){var i=t.OPTIMIZATION_ACCEPTED;return this.imgBefore.image.naturalWidth>=e&&this.imgAfter.image.naturalWidth>=e?(this.wrapper.style.width=e+"px",i=t.OPTIMIZATION_WAS_CONSTRAINED):this.imgAfter.image.naturalWidth<e?this.wrapper.style.width=this.imgAfter.image.naturalWidth+"px":this.wrapper.style.width=this.imgBefore.image.naturalWidth+"px",this.setWrapperDimensions(),i},_onLoaded:function(){if(this.imgBefore&&!0===this.imgBefore.loaded&&this.imgAfter&&!0===this.imgAfter.loaded){var t;if(this.wrapper=document.querySelector(this.selector),!this.wrapper)return;i(this.wrapper,"juxtapose"),this.wrapper.style.width=this.imgBefore.image.naturalWidth,this.setWrapperDimensions(),this.slider=document.createElement("div"),this.slider.className="jx-slider",this.wrapper.appendChild(this.slider),"horizontal"!==this.options.mode&&i(this.slider,this.options.mode),this.handle=document.createElement("div"),this.handle.className="jx-handle",this.rightImage=document.createElement("div"),this.rightImage.className="jx-image jx-right",this.rightImage.appendChild(this.imgAfter.image),this.leftImage=document.createElement("div"),this.leftImage.className="jx-image jx-left",this.leftImage.appendChild(this.imgBefore.image),this.slider.appendChild(this.handle),this.slider.appendChild(this.leftImage),this.slider.appendChild(this.rightImage),this.leftArrow=document.createElement("div"),this.rightArrow=document.createElement("div"),this.control=document.createElement("div"),this.controller=document.createElement("div"),this.leftArrow.className="jx-arrow jx-left",this.rightArrow.className="jx-arrow jx-right",this.control.className="jx-control",this.controller.className="jx-controller",this.controller.setAttribute("tabindex",0),this.controller.setAttribute("role","slider"),this.controller.setAttribute("aria-valuenow",50),this.controller.setAttribute("aria-valuemin",0),this.controller.setAttribute("aria-valuemax",100),this.controller.setAttribute("aria-label",(null===(t=window.imageCompareHandle)||void 0===t?void 0:t.msg)||"Slide to compare images"),this.handle.appendChild(this.leftArrow),this.handle.appendChild(this.control),this.handle.appendChild(this.rightArrow),this.control.appendChild(this.controller),this._init()}},_init:function(){this.updateSlider(this.options.startingPosition,!1),!0===this.options.showLabels&&(this.imgBefore.label&&this.displayLabel(this.leftImage,this.imgBefore.label),this.imgAfter.label&&this.displayLabel(this.rightImage,this.imgAfter.label));var e=this;window.addEventListener("resize",(function(){e.setWrapperDimensions()})),this.slider.addEventListener("mousedown",(function(t){t.preventDefault(),e.updateSlider(t,!0);var i=!0;this.addEventListener("mousemove",(function(t){t.preventDefault(),i&&e.updateSlider(t,!1)})),this.addEventListener("mouseup",(function(t){t.preventDefault(),t.stopPropagation(),i=!1}))})),this.slider.addEventListener("touchstart",(function(t){t.preventDefault(),t.stopPropagation(),e.updateSlider(t,!0),this.addEventListener("touchmove",(function(t){t.preventDefault(),t.stopPropagation(),e.updateSlider(t,!1)}))})),this.handle.addEventListener("keydown",(function(t){var i=t.which||t.keyCode,n=parseFloat(this.style.left);if(37===i){n-=1;var r=parseFloat(this.style.left)-1;e.updateSlider(r,!1),e.controller.setAttribute("aria-valuenow",n)}if(39===i){n+=1;var o=parseFloat(this.style.left)+1;e.updateSlider(o,!1),e.controller.setAttribute("aria-valuenow",n)}})),this.leftImage.addEventListener("keydown",(function(t){var i=t.which||t.keyCode;13!==i&&32!==i||(e.updateSlider("90%",!0),e.controller.setAttribute("aria-valuenow",91))})),this.rightImage.addEventListener("keydown",(function(t){var i=t.which||t.keyCode;13!==i&&32!==i||(e.updateSlider("10%",!0),e.controller.setAttribute("aria-valuenow",10))})),t.sliders.push(this),this.options.callback&&"function"==typeof this.options.callback&&this.options.callback(this)}},t.makeSlider=function(e,n){void 0===n&&(n=t.sliders.length);var r=e,o=r.querySelectorAll("img");if(!(o.length<2)){var s={};r.getAttribute("data-animate")&&(s.animate=r.getAttribute("data-animate")),r.getAttribute("data-showlabels")&&(s.showLabels=r.getAttribute("data-showlabels")),r.getAttribute("data-startingposition")&&(s.startingPosition=r.getAttribute("data-startingposition")),r.getAttribute("data-mode")&&(s.mode=r.getAttribute("data-mode")),r.getAttribute("data-makeresponsive")&&(s.mode=r.getAttribute("data-makeresponsive"));var a="juxtapose-"+n;i(e,a);var l="."+a;r.innerHTML?r.innerHTML="":r.innerText="";new t.JXSlider(l,[{src:o[0].src,label:o[0].getAttribute("data-label"),alt:o[0].alt},{src:o[1].src,label:o[1].getAttribute("data-label"),alt:o[1].alt}],s)}},t.scanPage=function(){for(var e=document.querySelectorAll(".juxtapose"),i=0;i<e.length;i++)t.makeSlider(e[i],i)},t.JXSlider=l,window.juxtapose=t,t.scanPage()}))},235:function(t,e,i){},418:function(t,e,i){i(53),t.exports=i(234)},47:function(t,e,i){"object"==typeof window&&window.Jetpack_Block_Assets_Base_Url&&window.Jetpack_Block_Assets_Base_Url.url&&(i.p=window.Jetpack_Block_Assets_Base_Url.url)},53:function(t,e,i){"use strict";i.r(e);i(47)},55:function(t,e){!function(){t.exports=this.wp.domReady}()}}));