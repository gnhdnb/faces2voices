(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{208:function(e,t,o){var content=o(214);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(70).default)("630268f6",content,!0,{sourceMap:!1})},211:function(e,t,o){var content=o(222);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(70).default)("b58dfbe4",content,!0,{sourceMap:!1})},212:function(e,t,o){var content=o(224);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(70).default)("5b08262a",content,!0,{sourceMap:!1})},213:function(e,t,o){"use strict";o(208)},214:function(e,t,o){var r=o(69)(!1);r.push([e.i,'a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:"";content:none}table{border-collapse:collapse;border-spacing:0}@font-face{font-family:"Verdana-Regular";font-display:swap;src:url(https://faces2voices.live/fonts/Verdana_Regular.ttf) format("truetype")}@font-face{font-family:"Verdana-Italic";font-display:swap;src:url(https://faces2voices.live/fonts/Verdana_Italic.ttf) format("truetype")}@font-face{font-family:"Verdana-Bold";font-display:swap;src:url(https://faces2voices.live/fonts/Verdana_Bold.ttf) format("truetype")}@font-face{font-family:"Verdana-Bold-Italic";font-display:swap;src:url(https://faces2voices.live/fonts/Verdana_Bold_Italic.ttf) format("truetype")}.mt-40{margin-top:40px}.mt-20{margin-top:20px}.mb-40{margin-bottom:40px}.mb-30{margin-bottom:30px}.mb-20{margin-bottom:20px}.mb-10{margin-bottom:10px}.icon{display:block;height:30px;width:30px}@-webkit-keyframes glowing{0%{background-color:#f21e2b;box-shadow:0 0 3px #f21e2b}50%{background-color:#ff3f4c;box-shadow:0 0 10px #ff3f4c}to{background-color:#f21e2b;box-shadow:0 0 3px #f21e2b}}@keyframes glowing{0%{background-color:#f21e2b;box-shadow:0 0 3px #f21e2b}50%{background-color:#ff3f4c;box-shadow:0 0 10px #ff3f4c}to{background-color:#f21e2b;box-shadow:0 0 3px #f21e2b}}.player__wrapper{border:1px solid #121212;border-radius:27px;height:40px;max-width:300px;width:100%;padding:17px 20px;box-sizing:border-box;display:flex;justify-content:space-between;align-items:center}.player__controls{cursor:pointer;position:relative}.player__slot-wrapper{font-family:"Verdana-Bold-Italic";font-size:16px;line-height:22px}@media (max-width:767px){.player__slot-wrapper{font-size:calc(10.86667px + .35417vw)}}@media (min-width:767px){.player__slot-wrapper{font-size:calc(12px + .20833vw)}}.volume-container{cursor:pointer;position:relative;z-index:2}.volume-container .volume-button{height:26px;display:flex;align-items:center}.volume-container .volume-button .volume{transform:scale(.7)}.volume-container .volume-slider{position:absolute;left:-3px;top:5px;z-index:-1;width:0;height:15px;background:transparent;border:1px solid transparent;transition:.25s}.volume-container .volume-slider .volume-percentage{background:#fff;height:100%;width:50%}.volume-container:hover .volume-slider{left:-123px;width:120px;border-color:#000;background-color:#000}',""]),e.exports=r},216:function(e,t,o){"use strict";o.r(t);var r=o(215),n={props:{id:{type:String,required:!0},source:{type:String,default:""},disabled:{type:Boolean,default:!1},loop:{type:Boolean,default:!1}},data:function(){return{play:!1,muted:!1,showLoader:!1,first:!0,time:0}},methods:{start:function(){var e=this,t=this;r.d.resume().then((function(){t.first?(t.showLoader=!0,t.player=new r.b(t.source,(function(){t.player.volume.value=0,t.player.onstop=function(){t.play=!1,t.time=0},t.showLoader=!1;var o=e.$refs.volumeSlider;o.addEventListener("click",(function(e){var r=window.getComputedStyle(o).width,n=e.offsetX/parseInt(r);if(t.$refs.volumePercentage.style.width=100*n+"%",-10===(n=100*n/5-10))return t.mute();t.player.volume.value=n,t.muted=!1,t.player.mute=!1}),!1),t.first=!1,t.toggle()})).toDestination()):t.toggle()}))},toggle:function(){var e=this;if(e.disabled)return!1;e.play?(clearInterval(e.interval),e.player.stop()):(e.player.start(),e.interval=setInterval((function(){e.time+=100}),100)),e.play=!e.play},mute:function(){var e=this;if(e.first)return!1;e.muted=!e.muted,e.player.mute=!e.player.mute}}},l=(o(213),o(33)),component=Object(l.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{ref:"player",staticClass:"player__wrapper"},[o("div",{staticClass:"player__controls",style:{cursor:e.disabled?"not-allowed":"pointer"}},[e.showLoader?o("loader",{attrs:{id:"player"}}):o("svg-icon",{staticStyle:{height:"18px",width:"20px"},attrs:{name:e.play?"pause":"play"},on:{click:e.start}})],1),e._v(" "),o("div",{staticClass:"player__slot-wrapper"},[e._t("default")],2),e._v(" "),o("div",{staticClass:"volume-container"},[o("div",{staticClass:"volume-button",on:{click:e.mute}},[o("svg-icon",{staticStyle:{height:"18px",width:"20px"},attrs:{name:e.muted?"muted_speaker":"speaker"}})],1),e._v(" "),o("div",{ref:"volumeSlider",staticClass:"volume-slider"},[o("div",{ref:"volumePercentage",staticClass:"volume-percentage"})])])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Loader:o(204).default})},221:function(e,t,o){"use strict";o(211)},222:function(e,t,o){var r=o(69)(!1);r.push([e.i,'a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:"";content:none}table{border-collapse:collapse;border-spacing:0}@font-face{font-family:"Verdana-Regular";font-display:swap;src:url(https://faces2voices.live/fonts/Verdana_Regular.ttf) format("truetype")}@font-face{font-family:"Verdana-Italic";font-display:swap;src:url(https://faces2voices.live/fonts/Verdana_Italic.ttf) format("truetype")}@font-face{font-family:"Verdana-Bold";font-display:swap;src:url(https://faces2voices.live/fonts/Verdana_Bold.ttf) format("truetype")}@font-face{font-family:"Verdana-Bold-Italic";font-display:swap;src:url(https://faces2voices.live/fonts/Verdana_Bold_Italic.ttf) format("truetype")}.mt-40{margin-top:40px}.mt-20{margin-top:20px}.mb-40{margin-bottom:40px}.mb-30{margin-bottom:30px}.mb-20{margin-bottom:20px}.mb-10{margin-bottom:10px}.icon{display:block;height:30px;width:30px}@-webkit-keyframes glowing{0%{background-color:#f21e2b;box-shadow:0 0 3px #f21e2b}50%{background-color:#ff3f4c;box-shadow:0 0 10px #ff3f4c}to{background-color:#f21e2b;box-shadow:0 0 3px #f21e2b}}@keyframes glowing{0%{background-color:#f21e2b;box-shadow:0 0 3px #f21e2b}50%{background-color:#ff3f4c;box-shadow:0 0 10px #ff3f4c}to{background-color:#f21e2b;box-shadow:0 0 3px #f21e2b}}.player__wrapper{border:1px solid #121212;border-radius:27px;height:40px;max-width:300px;width:100%;padding:17px 20px;box-sizing:border-box;display:flex;justify-content:space-between;align-items:center}.player__controls{cursor:pointer;position:relative}.player__slot-wrapper{font-family:"Verdana-Bold-Italic";font-size:16px;line-height:22px}@media (max-width:767px){.player__slot-wrapper{font-size:calc(10.86667px + .35417vw)}}@media (min-width:767px){.player__slot-wrapper{font-size:calc(12px + .20833vw)}}.volume-container{cursor:pointer;position:relative;z-index:2}.volume-container .volume-button{height:26px;display:flex;align-items:center}.volume-container .volume-button .volume{transform:scale(.7)}.volume-container .volume-slider{position:absolute;left:-3px;top:5px;z-index:-1;width:0;height:15px;background:transparent;border:1px solid transparent;transition:.25s}.volume-container .volume-slider .volume-percentage{background:#fff;height:100%;width:50%}.volume-container:hover .volume-slider{left:-123px;width:120px;border-color:#000;background-color:#000}#live{position:absolute;display:block;height:8px;width:8px;top:3px;right:-11px;border-radius:50%;background:#f21e2b;-webkit-animation:glowing 1s infinite;animation:glowing 1s infinite}',""]),e.exports=r},223:function(e,t,o){"use strict";o(212)},224:function(e,t,o){var r=o(69)(!1);r.push([e.i,'a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:"";content:none}table{border-collapse:collapse;border-spacing:0}@font-face{font-family:"Verdana-Regular";font-display:swap;src:url(https://faces2voices.live/fonts/Verdana_Regular.ttf) format("truetype")}@font-face{font-family:"Verdana-Italic";font-display:swap;src:url(https://faces2voices.live/fonts/Verdana_Italic.ttf) format("truetype")}@font-face{font-family:"Verdana-Bold";font-display:swap;src:url(https://faces2voices.live/fonts/Verdana_Bold.ttf) format("truetype")}@font-face{font-family:"Verdana-Bold-Italic";font-display:swap;src:url(https://faces2voices.live/fonts/Verdana_Bold_Italic.ttf) format("truetype")}.mt-40{margin-top:40px}.mt-20{margin-top:20px}.mb-40{margin-bottom:40px}.mb-30{margin-bottom:30px}.mb-20{margin-bottom:20px}.mb-10{margin-bottom:10px}.icon{display:block;height:30px;width:30px}@-webkit-keyframes glowing{0%{background-color:#f21e2b;box-shadow:0 0 3px #f21e2b}50%{background-color:#ff3f4c;box-shadow:0 0 10px #ff3f4c}to{background-color:#f21e2b;box-shadow:0 0 3px #f21e2b}}@keyframes glowing{0%{background-color:#f21e2b;box-shadow:0 0 3px #f21e2b}50%{background-color:#ff3f4c;box-shadow:0 0 10px #ff3f4c}to{background-color:#f21e2b;box-shadow:0 0 3px #f21e2b}}.participant__wrapper{max-width:623px;width:100%;display:flex;align-items:center;flex-direction:column}.participant__spectrogram{width:100%;max-width:100%;display:block;border:0;border-radius:17px}',""]),e.exports=r},232:function(e,t,o){var content=o(251);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(70).default)("255c3334",content,!0,{sourceMap:!1})},236:function(e,t,o){"use strict";o.r(t);o(26),o(22),o(23),o(42),o(43);var r=o(15),n=o(44);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,o)}return t}var c={data:function(){return{imgURI:"",voiceURI:""}},computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},Object(n.b)({getValue:"GET_VALUE_FROM_LOCALSTORAGE"})),mounted:function(){var e=this.getValue("imgURI");e&&(this.imgURI=e);var t=this.getValue("voiceURI");t&&(this.voiceURI=t)}},d=c,f=(o(223),o(33)),component=Object(f.a)(d,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"participant__wrapper"},[e.imgURI&&e.imgURI.length?o("img",{staticClass:"participant__spectrogram mb-10",attrs:{src:e.imgURI}}):e._e(),e._v(" "),e.voiceURI&&e.voiceURI.length?o("player",{attrs:{id:"participant",source:e.voiceURI}},[o("div",{staticStyle:{position:"relative"}},[e._v("Your voice")])]):e._e()],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Player:o(216).default})},238:function(e,t,o){"use strict";o.r(t);o(12),o(36),o(16),o(22),o(37),o(34),o(35);var r=o(215);function n(e,t){var o="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!o){if(Array.isArray(e)||(o=function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);"Object"===o&&e.constructor&&(o=e.constructor.name);if("Map"===o||"Set"===o)return Array.from(e);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return l(e,t)}(e))||t&&e&&"number"==typeof e.length){o&&(e=o);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,c=!0,d=!1;return{s:function(){o=o.call(e)},n:function(){var e=o.next();return c=e.done,e},e:function(e){d=!0,n=e},f:function(){try{c||null==o.return||o.return()}finally{if(d)throw n}}}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,o=new Array(t);i<t;i++)o[i]=e[i];return o}var c={props:{id:{type:String,required:!0},source:{type:String,default:""},disabled:{type:Boolean,default:!1}},data:function(){return{status:"stoped",muted:!1,showLoader:!1,first:!0,crossFade:{},players:[],currentPlayer:0,nextPlayer:1,duration:0,leftDuration:0,loop:1,downloaded:!1}},methods:{start:function(){console.log("button pressed");var e=this;if(e.disabled)return!1;r.d._context.resume().then((function(){r.d.on("statechange",(function(e){console.log("statechange")})),e.first?(e.showLoader=!0,e.crossFade=(new r.a).toDestination(),e.toneAudioBuffers=new r.c,e.players.push(new r.b),e.players.push(new r.b),e.crossFade.fade.value=.5,e.players[0].mute=e.muted,e.players[1].mute=e.muted,e.players[0].onstop=function(){console.log("".concat(new Date,"Player 0 stoped, current ").concat(e.currentPlayer,", next: ").concat(e.nextPlayer))},e.players[1].onstop=function(){console.log("".concat(new Date," Player 1 stoped, current ").concat(e.currentPlayer,", next: ").concat(e.nextPlayer))},e.players[0].connect(e.crossFade.a),e.players[1].connect(e.crossFade.b),e.initVolumeSlider(),e.download("".concat(e.source,"?t=").concat((new Date).getTime()),0,0).then((function(t){e.showLoader=!1;var o=Math.floor(1e3*e.players[0].buffer.duration);e.duration=o,e.leftDuration=o,e.first=!1,e.toggle()})).catch((function(e){console.log("".concat(new Date,". ERROR: ").concat(e.message))}))):e.toggle()})).catch((function(e){console.log(e),console.log("Tone context error")}))},download:function(e,t,o){console.log("download");var r=this;return new Promise((function(n,l){r.toneAudioBuffers.has(t)&&(console.log("".concat(new Date," Buffer with name ").concat(t," exist, disposing")),r.toneAudioBuffers.get(t).dispose()),console.log("".concat(new Date," start download from ").concat(e)),r.toneAudioBuffers.add(t,e,(function(){return console.log("".concat(new Date," status: success, buf/plr: ").concat(t,"/").concat(o)),r.players[o].buffer=r.toneAudioBuffers.get(t),n("OK")}),(function(e){return l(e||{message:"Error when downloading"})}))}))},play:function(){console.log("play");var e=this;e.startTimestamp=(new Date).getTime(),console.log(e.leftDuration),console.log(e.duration);var t=e.leftDuration-3e4>0?e.leftDuration-3e4:0;console.log("".concat(new Date,".Starting next player in ").concat(t)),e.startSecondPlayerTimeout=setTimeout((function(){console.log("".concat(new Date,". Start next player")),e.downloaded||(console.log("".concat(new Date,". Not downloaded, use old buffer")),e.players[e.nextPlayer].buffer=e.toneAudioBuffers.get(e.currentPlayer));var i=e.currentPlayer;e.currentPlayer=e.nextPlayer,e.nextPlayer=i;var t=Math.floor(1e3*e.players[e.currentPlayer].buffer.duration);e.duration=t,e.leftDuration=t,e.downloaded=!1,e.loop+=1,e.play()}),t);var o=e.duration-e.leftDuration<1e4?1e4-e.duration+e.leftDuration:0;console.log("".concat(new Date,".Download started in: ").concat(o)),e.downloadTimeout=setTimeout((function(){e.download("".concat(e.source,"?t=").concat((new Date).getTime()),e.nextPlayer,e.nextPlayer).then((function(){e.downloaded=!0})).catch((function(t){e.downloaded=!1,console.log(t)}))}),o),console.log("".concat(new Date,". Start player ").concat(e.currentPlayer)),console.log("".concat(new Date," isLoaded:").concat(e.players[e.currentPlayer].loaded)),e.startPlayer(e.currentPlayer,e.duration-e.leftDuration,e.leftDuration)},startPlayer:function(e,t,o){console.log("startPlayer event");this.players[e].start(0,t/1e3,o/1e3),console.log("".concat(new Date," isLoaded:").concat(this.players[e].loaded))},stop:function(){console.log("stop event");var e=this;clearTimeout(e.downloadTimeout),clearTimeout(e.startSecondPlayerTimeout),e.stopTimestamp=(new Date).getTime(),e.leftDuration-=e.stopTimestamp-e.startTimestamp;var t,o=n(e.players);try{for(o.s();!(t=o.n()).done;){var r=t.value;"started"===r.state&&(r.stop(),console.log("Player stoped by stop event"))}}catch(e){o.e(e)}finally{o.f()}},toggle:function(){var e=this;console.log("".concat(new Date," toggle event. cur: ").concat(e.status,", switch to: ").concat("stoped"===e.status?"play":"stoped")),e.status="stoped"===e.status?"play":"stoped","play"===e.status?e.play():e.stop()},mute:function(){var e=this;if(e.first)return!1;e.muted=!e.muted,e.players[0].mute=!e.players[0].mute,e.players[1].mute=!e.players[1].mute},initVolumeSlider:function(){var e=this,t=this,o=this.$refs.volumeSlider;o.addEventListener("click",(function(r){var n=window.getComputedStyle(o).width,l=r.offsetX/parseInt(n);if(e.$refs.volumePercentage.style.width=100*l+"%",-10===(l=100*l/5-10))return t.mute();t.players[0].volume.value=l,t.players[1].volume.value=l,t.muted=!1,t.players[0].mute=!1,t.players[1].mute=!1}),!1)}}},d=(o(221),o(33)),component=Object(d.a)(c,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{ref:"player",staticClass:"player__wrapper",staticStyle:{width:"500px"}},[o("div",{staticClass:"player__controls",style:{cursor:e.disabled?"not-allowed":"pointer"}},[e.showLoader?o("loader",{attrs:{id:"player"}}):o("svg-icon",{staticStyle:{height:"18px",width:"20px"},attrs:{name:"stoped"==e.status?"play":"pause"},on:{click:e.start}})],1),e._v(" "),o("div",{staticClass:"player__slot-wrapper"},[e.showLoader?e._e():o("div",{staticStyle:{position:"relative",cursor:"pointer"},on:{click:e.start}},[e._v("\n      Live"),o("span",{attrs:{id:"live"}})])]),e._v(" "),o("div",{staticClass:"volume-container"},[o("div",{staticClass:"volume-button",on:{click:e.mute}},[o("svg-icon",{staticStyle:{height:"18px",width:"20px"},attrs:{name:e.muted?"muted_speaker":"speaker"}})],1),e._v(" "),o("div",{ref:"volumeSlider",staticClass:"volume-slider"},[o("div",{ref:"volumePercentage",staticClass:"volume-percentage"})])])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Loader:o(204).default})},250:function(e,t,o){"use strict";o(232)},251:function(e,t,o){var r=o(69)(!1);r.push([e.i,'a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:"";content:none}table{border-collapse:collapse;border-spacing:0}@font-face{font-family:"Verdana-Regular";font-display:swap;src:url(https://faces2voices.live/fonts/Verdana_Regular.ttf) format("truetype")}@font-face{font-family:"Verdana-Italic";font-display:swap;src:url(https://faces2voices.live/fonts/Verdana_Italic.ttf) format("truetype")}@font-face{font-family:"Verdana-Bold";font-display:swap;src:url(https://faces2voices.live/fonts/Verdana_Bold.ttf) format("truetype")}@font-face{font-family:"Verdana-Bold-Italic";font-display:swap;src:url(https://faces2voices.live/fonts/Verdana_Bold_Italic.ttf) format("truetype")}.mt-40{margin-top:40px}.mt-20{margin-top:20px}.mb-40{margin-bottom:40px}.mb-30{margin-bottom:30px}.mb-20{margin-bottom:20px}.mb-10{margin-bottom:10px}.icon{display:block;height:30px;width:30px}@-webkit-keyframes glowing{0%{background-color:#f21e2b;box-shadow:0 0 3px #f21e2b}50%{background-color:#ff3f4c;box-shadow:0 0 10px #ff3f4c}to{background-color:#f21e2b;box-shadow:0 0 3px #f21e2b}}@keyframes glowing{0%{background-color:#f21e2b;box-shadow:0 0 3px #f21e2b}50%{background-color:#ff3f4c;box-shadow:0 0 10px #ff3f4c}to{background-color:#f21e2b;box-shadow:0 0 3px #f21e2b}}.page__wrapper{display:flex;flex-direction:column;align-items:center;padding:0 20px}.title{line-height:58px;font-family:"Verdana-Bold-Italic";color:none;-webkit-text-fill-color:#fff;-webkit-text-stroke-width:1px;-webkit-text-stroke-color:#121212;text-align:center;display:block}@media (max-width:767px){.title{font-size:calc(17.2px + 2.125vw)}}@media (min-width:767px){.title{font-size:calc(24px + 1.25vw)}}.description{max-width:609px;width:100%;font-family:"Verdana-Regular";text-align:justify;line-height:17px;color:#000}@media (max-width:767px){.description{font-size:calc(8.86667px + .35417vw)}}@media (min-width:767px){.description{font-size:calc(10px + .20833vw)}}#title{font-style:italic;font-weight:700;max-width:609px;width:100%;font-family:"Verdana-Regular";text-align:center;line-height:17px;color:#000}@media (max-width:767px){#title{font-size:calc(8.86667px + .35417vw)}}@media (min-width:767px){#title{font-size:calc(10px + .20833vw)}}.comeback{font-style:italic;max-width:609px;width:100%;font-family:"Verdana-Regular";text-align:center;line-height:17px;color:#000}@media (max-width:767px){.comeback{font-size:calc(8.86667px + .35417vw)}}@media (min-width:767px){.comeback{font-size:calc(10px + .20833vw)}}#authors{font-family:"Verdana-Regular";font-style:normal;font-weight:400;line-height:22px}@media (max-width:767px){#authors{font-size:calc(8.86667px + .35417vw)}}@media (min-width:767px){#authors{font-size:calc(10px + .20833vw)}}.links{color:#121212}#developer{font-family:"Verdana-Regular";line-height:17px}@media (max-width:767px){#developer{font-size:calc(8.86667px + .35417vw)}}@media (min-width:767px){#developer{font-size:calc(10px + .20833vw)}}#inspired{font-family:"Verdana-Regular";font-style:normal;font-weight:400;line-height:22px;color:#121212}@media (max-width:767px){#inspired{font-size:calc(8.86667px + .35417vw)}}@media (min-width:767px){#inspired{font-size:calc(10px + .20833vw)}}',""]),e.exports=r},263:function(e,t,o){"use strict";o.r(t);o(26),o(22),o(23),o(42),o(43);var r=o(15),n=o(262),l=o(267),c=o(44);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,o)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var m={data:function(){return{uuid:""}},computed:f(f({},Object(c.b)({getValue:"GET_VALUE_FROM_LOCALSTORAGE"})),Object(c.d)({participant:function(e){return e.participant}})),mounted:function(){var e=this.getValue("uuid");if(Object(n.a)(e))this.uuid=e;else{var t=Object(l.a)();this.setValue({id:"uuid",payload:t}),this.uuid=t}this.getValue("participant")?this.isParticipant(!0):(this.isParticipant(!1),this.setValue({id:"participant",payload:!1}))},methods:f({},Object(c.c)({setValue:"SET_VALUE_TO_LOCALSTORAGE",isParticipant:"SET_PARTICIPANT_VALUE"}))},h=(o(250),o(33)),component=Object(h.a)(m,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"page__wrapper"},[o("p",{staticClass:"title mt-20 mb-10"},[e._v("Faces2Voices")]),e._v(" "),o("live-player",{staticClass:"mb-20",attrs:{id:"stream",source:"https://faces2voices.blob.core.windows.net/imagesandspecs/audio.mp3",disabled:!1,loop:!0}}),e._v(" "),o("p",{staticClass:"description mb-10"},[e._v("\n    Faces2Voices is an online interactive installation which uses facial\n    recognition technology and AI-synthesized sound to create a generative\n    music composition based on imaginary voices of online visitors. The\n    composition is evolving in time depending on the contributions of people\n    involved.\n  ")]),e._v(" "),o("p",{staticClass:"description mb-10"},[e._v("\n    Lots of governments use surveillance technology as a way to control the\n    spread of COVID-19. At the same moment many citizens are ready to give up\n    some privacy for the common good. But how can we define what level of\n    privacy should we give up and how much data do governments really need to\n    respond effectively?\n  ")]),e._v(" "),o("p",{staticClass:"description mb-20"},[e._v("\n    You can contribute to the project by giving access to the camera of your\n    device. AI will recognise your face, synthesize your imaginary voice and\n    add it to the live stream.\n  ")]),e._v(" "),e.participant?o("participant",{staticClass:"mb-10"}):o("camera",{staticClass:"mb-10"}),e._v(" "),o("p",{attrs:{id:"title"}},[e._v("Privacy statement")]),e._v(" "),o("p",{staticClass:"description mb-20"},[e._v("\n    We are implementing a responsible data policy. The project doesn't store\n    or share personal data of participants, but only save and use fictional\n    voice synthesiser metadata.\n  ")]),e._v(" "),e._m(0),e._v(" "),e._m(1),e._v(" "),e._m(2)],1)}),[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",{staticClass:"mb-10",attrs:{id:"authors"}},[e._v("\n    Faces2Voices is a project by\n    "),o("a",{staticClass:"links",attrs:{target:"_blank",href:"http://nikonole.com/"}},[e._v("\n      Helena Nikonole")]),e._v("\n    and\n    "),o("a",{staticClass:"links",attrs:{href:"https://gnhdnb.github.io",target:"_blank"}},[e._v("Nikita Prudnikov")])])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",{staticClass:"mb-10",attrs:{id:"inspired"}},[e._v("\n    we reflected on\n    "),o("a",{staticClass:"mb-20 links",attrs:{target:"_blank",href:"https://arxiv.org/pdf/1905.09773.pdf"}},[e._v("\n      Speech2Face\n    ")])])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",{staticClass:"mb-10",attrs:{id:"developer"}},[e._v("\n    designed by\n    "),o("a",{staticClass:"links",attrs:{href:"https://reverse-studio.web.app/faces2voices"}},[o("u",[e._v("Nikita Morozov")])])])}],!1,null,null,null);t.default=component.exports;installComponents(component,{LivePlayer:o(238).default,Camera:o(225).default,Participant:o(236).default})}}]);