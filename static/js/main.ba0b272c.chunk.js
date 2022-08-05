(this["webpackJsonpreact-snake"]=this["webpackJsonpreact-snake"]||[]).push([[0],{55:function(e,t,n){},56:function(e,t,n){"use strict";n.r(t);var i,r,a=n(0),o=n.n(a),c=n(25),s=n.n(c),u=n(3),l=n(6),d=n(2),h=n(8),j=n(9),b=n(15),f=n.n(b),v=function(){function e(){Object(h.a)(this,e)}return Object(j.a)(e,[{key:"list",value:function(){return f.a.get("/React-snake/resources/maps/maplist.json").then((function(e){return e.data}))}},{key:"load",value:function(e){return f.a.get("/React-snake/resources/maps/".concat(e,".json")).then((function(e){return e.data}))}}]),e}(),p=n(1),O=function(){return Object(p.jsxs)("ul",{children:[Object(p.jsx)("li",{children:Object(p.jsx)(l.b,{to:"game",children:"Play"})}),Object(p.jsx)("li",{children:Object(p.jsx)(l.b,{to:"map-editor",children:"Map editor"})})]})},k=o.a.createContext({}),m=function(){var e=Object(a.useState)(new v),t=Object(u.a)(e,1)[0],n=Object(a.useState)(),i=Object(u.a)(n,2),r=i[0],o=i[1],c=Object(a.useState)(!1),s=Object(u.a)(c,2),d=s[0],h=s[1],j=Object(a.useState)(1),b=Object(u.a)(j,2),f=b[0],O=b[1],k=Object(a.useState)(),m=Object(u.a)(k,2),g=m[0],x=m[1];return Object(a.useEffect)((function(){d||t.list().then((function(e){o(e),x(e[0])})).then((function(){return h(!0)}))})),Object(p.jsxs)("ul",{children:[Object(p.jsxs)("li",{children:[Object(p.jsx)("label",{htmlFor:"speed",children:"Speed:"}),Object(p.jsx)("input",{id:"speed",type:"number",onChange:function(e){var t=parseInt(e.target.value);t>=1&&t<=10&&O(t)},value:f})]}),Object(p.jsxs)("li",{children:[Object(p.jsx)("label",{htmlFor:"map",children:"Map:"}),d?Object(p.jsx)("select",{id:"map",onChange:function(e){x(String(e.currentTarget.value))},children:null===r||void 0===r?void 0:r.map((function(e){return Object(p.jsx)("option",{selected:g===e,value:e,children:e},e)}))}):"Loading map list.."]}),Object(p.jsx)("li",{children:Object(p.jsx)(l.b,{to:"play/".concat(g,"/").concat(f),children:"Play"})})]})},g=n(12);!function(e){e[e.Top=0]="Top",e[e.Down=1]="Down",e[e.Left=2]="Left",e[e.Right=3]="Right"}(i||(i={})),function(e){e[e.Empty=0]="Empty",e[e.Floor=1]="Floor",e[e.Wall=2]="Wall",e[e.Snake=3]="Snake",e[e.Food=4]="Food"}(r||(r={}));var x=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5;Object(h.a)(this,e),this._map=void 0,this.speed=void 0,this.foodLocation=void 0,this.snakeTiles=void 0,this.score=0,this.tickNumber=0,this.error=!1,this.errorCause=void 0,this.prevDirection=void 0,this.eatingAudio=new Audio("/React-snake/resources/audio/eating.wav"),this.deathAudio=new Audio("/React-snake/resources/audio/death.mp3"),this._map=t,this.prevDirection=t.startDirection,this.foodLocation=e.generateFoodLocation(t.tiles),this.snakeTiles=[Object(g.a)({},t.startLocation)],this.speed=n,this.eatingAudio.load(),this.deathAudio.load()}return Object(j.a)(e,[{key:"getMap",value:function(){return this._map}},{key:"tick",value:function(t){var n=this;return new Promise((function(i,r){try{var a=e.isValidDirection(n.prevDirection,t),o=void 0!==t&&a?t:n.prevDirection,c=n.handleTick(o);n.prevDirection=o,i(c)}catch(s){n.error=!0,n.errorCause=s.message,n.deathAudio.play(),r(s)}}))}},{key:"reset",value:function(){return this.snakeTiles=[Object(g.a)({},this._map.startLocation)],this.prevDirection=this._map.startDirection,this.foodLocation=e.generateFoodLocation(this._map.tiles),this.score=0,this.tickNumber=0,this.error=!1,this.errorCause=void 0,Promise.resolve(this.getGameMeta())}},{key:"getErrorCause",value:function(){return this.errorCause}},{key:"getScore",value:function(){return this.score}},{key:"getTickNumber",value:function(){return this.tickNumber}},{key:"hasError",value:function(){return this.error}},{key:"handleTick",value:function(t){var n=this.snakeTiles[this.snakeTiles.length-1],r=Object(g.a)({},n);switch(t){case i.Top:r.X-=1;break;case i.Down:r.X+=1;break;case i.Left:r.Y-=1;break;case i.Right:r.Y+=1}return this.validate(r),this.snakeTiles.push(r),this.foodLocation.X===r.X&&this.foodLocation.Y===r.Y?(this.eatingAudio.play(),this.foodLocation=e.generateFoodLocation(this._map.tiles),this.score+=this.speed):this.snakeTiles.shift(),this.getGameMeta()}},{key:"getGameMeta",value:function(){return{snakeTiles:this.snakeTiles,foodLocation:this.foodLocation,nextTickIn:25*(11-this.speed)}}},{key:"validate",value:function(e){if(!this._map.tiles[e.X][e.Y])throw Error("Player out of field");if(![r.Floor,r.Food].includes(this._map.tiles[e.X][e.Y]))throw Error("Player crashed");if(this.snakeTiles.filter((function(t){return t.X===e.X&&t.Y===e.Y})).length>0)throw Error("The player ate himself")}}],[{key:"generateFoodLocation",value:function(t){for(var n=-1;;){var i=e.randomIndex(t.length);if(void 0!==t[i]&&t[i].includes(r.Floor)){n=i;break}}for(var a=-1;;){var o=e.randomIndex(t[n].length);if(void 0!==t[n][o]&&t[n][o]===r.Floor){a=o;break}}return{X:n,Y:a}}},{key:"randomIndex",value:function(e){return Math.floor(Math.random()*e)}},{key:"isValidDirection",value:function(e,t){switch(t){case i.Left:if(e===i.Right)return!1;break;case i.Top:if(e===i.Down)return!1;break;case i.Right:if(e===i.Left)return!1;break;case i.Down:if(e===i.Top)return!1}return!0}}]),e}(),y=function(){function e(){Object(h.a)(this,e)}return Object(j.a)(e,[{key:"getMap",value:function(){return{}}},{key:"tick",value:function(e){return Promise.resolve({tiles:[],snakeTiles:[],foodLocation:{X:1,Y:1},nextTickIn:50})}},{key:"reset",value:function(){return Promise.resolve({tiles:[],snakeTiles:[],foodLocation:{X:1,Y:1},nextTickIn:50})}},{key:"getErrorCause",value:function(){}},{key:"getScore",value:function(){return 0}},{key:"getTickNumber",value:function(){return 0}},{key:"hasError",value:function(){return!1}}]),e}(),T=o.a.createContext(new y),L=(n(55),function(e){var t=e.gameMap,n=e.gameMeta;return Object(p.jsxs)("div",{id:"game-field-presenter",style:{position:"relative"},children:[t.tiles.map((function(e,n){return Object(p.jsxs)(o.a.Fragment,{children:[e.map((function(e,i){return Object(p.jsx)("div",{className:"tile tile-".concat(t.tiles[n][i])},"".concat(n,"-").concat(i))})),Object(p.jsx)("div",{})]})})),Object(p.jsx)("div",{style:{position:"absolute",top:20*n.foodLocation.X,left:20*n.foodLocation.Y},className:"tile tile-".concat(r.Food)}),n.snakeTiles.map((function(e){return Object(p.jsx)("div",{style:{position:"absolute",top:20*e.X,left:20*e.Y},className:"tile tile-".concat(r.Snake)},"snake-".concat(e.X,"-").concat(e.Y))}))]})}),w=function(){var e=Object(a.useContext)(T),t=Object(a.useState)(),n=Object(u.a)(t,2),r=n[0],o=n[1],c=Object(a.useState)(!0),s=Object(u.a)(c,2),l=s[0],d=s[1],h=Object(a.useState)(),j=Object(u.a)(h,2),b=j[0],f=j[1],v=Object(a.useState)(!1),O=Object(u.a)(v,2),k=O[0],m=O[1],g=Object(a.useCallback)((function(){e.reset().then((function(e){return o(e)})),d(!0),f(void 0),m(!1)}),[e]);return Object(a.useEffect)((function(){document.addEventListener("keydown",(function(e){var t=void 0;switch(e.code){case"ArrowLeft":t=i.Left;break;case"ArrowUp":t=i.Top;break;case"ArrowRight":t=i.Right;break;case"ArrowDown":t=i.Down;break;case"Space":g()}void 0!==t&&f(t)}))}),[g]),Object(a.useEffect)((function(){l&&!k&&(m(!0),e.tick(b).then((function(e){return setTimeout((function(){return o(e)}),e.nextTickIn)})).then((function(){return m(!1)})).catch((function(){d(!1)})))}),[r]),Object(p.jsxs)("div",{id:"game",children:[Object(p.jsxs)("h1",{children:["Score: ",e.getScore()]}),e.hasError()&&Object(p.jsxs)("h1",{children:["Error: ",e.getErrorCause()]}),r&&Object(p.jsx)(L,{gameMap:e.getMap(),gameMeta:r}),Object(p.jsx)("button",{onClick:function(){return g()},disabled:l,children:"Restart"})]})},S=function(){var e=Object(d.g)(),t=Object(a.useContext)(k),n=Object(a.useState)(),i=Object(u.a)(n,2),r=i[0],o=i[1];return Object(a.useEffect)((function(){r||t.load(e.map).then((function(t){return o(new x(t,parseInt(e.speed)))}))})),Object(p.jsx)("div",{id:"game-container",children:r&&Object(p.jsx)(T.Provider,{value:r,children:Object(p.jsx)(w,{})})})},F=function(){var e=Object(a.useState)(new v),t=Object(u.a)(e,1)[0];return Object(p.jsx)(l.a,{children:Object(p.jsx)(k.Provider,{value:t,children:Object(p.jsx)(d.c,{children:Object(p.jsxs)(d.a,{path:"/React-snake/",children:[Object(p.jsx)(d.a,{index:!0,element:Object(p.jsx)(O,{})}),Object(p.jsxs)(d.a,{path:"game",children:[Object(p.jsx)(d.a,{index:!0,element:Object(p.jsx)(m,{})}),Object(p.jsx)(d.a,{path:"play/:map/:speed",element:Object(p.jsx)(S,{})})]}),Object(p.jsx)(d.a,{path:"map-editor",element:"<MapEditor/>"})]})})})})};var E=function(){return Object(p.jsx)("div",{className:"App",children:Object(p.jsx)(F,{})})},C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,57)).then((function(t){var n=t.getCLS,i=t.getFID,r=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),i(e),r(e),a(e),o(e)}))};s.a.render(Object(p.jsx)(o.a.StrictMode,{children:Object(p.jsx)(E,{})}),document.getElementById("root")),C()}},[[56,1,2]]]);
//# sourceMappingURL=main.ba0b272c.chunk.js.map