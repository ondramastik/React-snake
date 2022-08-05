(this["webpackJsonpreact-snake"]=this["webpackJsonpreact-snake"]||[]).push([[0],{26:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var o,i,a=n(0),r=n.n(a),s=n(21),c=n.n(s),u=n(3),l=n(8),h=n(5),f=n(6);!function(e){e[e.Top=0]="Top",e[e.Down=1]="Down",e[e.Left=2]="Left",e[e.Right=3]="Right"}(o||(o={})),function(e){e[e.Empty=0]="Empty",e[e.Floor=1]="Floor",e[e.Wall=2]="Wall",e[e.Snake=3]="Snake",e[e.Food=4]="Food"}(i||(i={}));var d=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5;Object(h.a)(this,e),this._map=void 0,this.foodLocation=void 0,this.snakeTiles=void 0,this.score=0,this.tickNumber=0,this.error=!1,this.errorCause=void 0,this.speed=void 0,this.eatingAudio=new Audio("/React-snake/resources/audio/eating.wav"),this.deathAudio=new Audio("/React-snake/resources/audio/death.mp3"),this._map=t,this.foodLocation=e.generateFoodLocation(t.tiles),this.snakeTiles=[Object(l.a)({},t.startLocation)],this.speed=n}return Object(f.a)(e,[{key:"getMap",value:function(){return this._map}},{key:"tick",value:function(e){var t=this;return new Promise((function(n,o){try{n(t.handleTick(void 0!==e?e:t._map.startDirection))}catch(i){t.error=!0,t.errorCause=i.message,t.deathAudio.play(),o(i)}}))}},{key:"reset",value:function(){return this.snakeTiles=[Object(l.a)({},this._map.startLocation)],this.foodLocation=e.generateFoodLocation(this._map.tiles),this.score=0,this.tickNumber=0,this.error=!1,this.errorCause=void 0,Promise.resolve(this.getGameMeta())}},{key:"getErrorCause",value:function(){return this.errorCause}},{key:"getScore",value:function(){return this.score}},{key:"getTickNumber",value:function(){return this.tickNumber}},{key:"hasError",value:function(){return this.error}},{key:"handleTick",value:function(t){var n=this.snakeTiles[this.snakeTiles.length-1],i=Object(l.a)({},n);switch(t){case o.Top:i.X-=1;break;case o.Down:i.X+=1;break;case o.Left:i.Y-=1;break;case o.Right:i.Y+=1}return this.validate(i),this.snakeTiles.push(i),this.foodLocation.X===i.X&&this.foodLocation.Y===i.Y?(this.eatingAudio.play(),this.foodLocation=e.generateFoodLocation(this._map.tiles),this.score+=this.speed):this.snakeTiles.shift(),this.getGameMeta()}},{key:"getGameMeta",value:function(){return{snakeTiles:this.snakeTiles,foodLocation:this.foodLocation,nextTickIn:25*(11-this.speed)}}},{key:"validate",value:function(e){if(!this._map.tiles[e.X][e.Y])throw Error("Player out of field");if(![i.Floor,i.Food].includes(this._map.tiles[e.X][e.Y]))throw Error("Player crashed");if(this.snakeTiles.filter((function(t){return t.X===e.X&&t.Y===e.Y})).length>0)throw Error("The player ate himself")}}],[{key:"generateFoodLocation",value:function(t){for(var n=-1;;){var o=e.randomIndex(t.length);if(console.log(t[o]),void 0!==t[o]&&t[o].includes(i.Floor)){n=o;break}}for(var a=-1;;){var r=e.randomIndex(t[n].length);if(console.log(t[n][r]),void 0!==t[n][r]&&t[n][r]===i.Floor){a=r;break}}return{X:n,Y:a}}},{key:"randomIndex",value:function(e){return Math.floor(Math.random()*e)}}]),e}(),k=function(){function e(){Object(h.a)(this,e)}return Object(f.a)(e,[{key:"getMap",value:function(){return{}}},{key:"tick",value:function(e){return Promise.resolve({tiles:[],snakeTiles:[],foodLocation:{X:1,Y:1},nextTickIn:50})}},{key:"reset",value:function(){return Promise.resolve({tiles:[],snakeTiles:[],foodLocation:{X:1,Y:1},nextTickIn:50})}},{key:"getErrorCause",value:function(){}},{key:"getScore",value:function(){return 0}},{key:"getTickNumber",value:function(){return 0}},{key:"hasError",value:function(){return!1}}]),e}(),b=r.a.createContext(new k),v=(n(26),n(1)),j=function(e){var t=e.gameMap,n=e.gameMeta;return Object(v.jsxs)("div",{id:"game-field-presenter",style:{position:"relative"},children:[t.tiles.map((function(e,n){return Object(v.jsxs)(r.a.Fragment,{children:[e.map((function(e,o){return Object(v.jsx)("div",{className:"tile tile-".concat(t.tiles[n][o])},"".concat(n,"-").concat(o))})),Object(v.jsx)("div",{})]})})),Object(v.jsx)("div",{style:{position:"absolute",top:20*n.foodLocation.X,left:20*n.foodLocation.Y},className:"tile tile-".concat(i.Food)}),n.snakeTiles.map((function(e){return Object(v.jsx)("div",{style:{position:"absolute",top:20*e.X,left:20*e.Y},className:"tile tile-".concat(i.Snake)},"snake-".concat(e.X,"-").concat(e.Y))}))]})},p=function(){var e=Object(a.useContext)(b),t=Object(a.useState)(),n=Object(u.a)(t,2),i=n[0],r=n[1],s=Object(a.useState)(!0),c=Object(u.a)(s,2),l=c[0],h=c[1],f=Object(a.useState)(),d=Object(u.a)(f,2),k=d[0],p=d[1],g=Object(a.useState)(!1),m=Object(u.a)(g,2),O=m[0],y=m[1],T=Object(a.useCallback)((function(){e.reset().then((function(e){return r(e)})),h(!0),p(void 0),y(!1)}),[e]);Object(a.useCallback)((function(e,t){switch(t){case o.Left:if(e===o.Right)return!1;break;case o.Top:if(e===o.Down)return!1;break;case o.Right:if(e===o.Left)return!1;break;case o.Down:if(e===o.Top)return!1}return!0}),[]);return Object(a.useEffect)((function(){document.addEventListener("keydown",(function(e){var t=void 0;switch(e.code){case"ArrowLeft":t=o.Left;break;case"ArrowUp":t=o.Top;break;case"ArrowRight":t=o.Right;break;case"ArrowDown":t=o.Down;break;case"Space":console.log("Space"),T()}void 0!==t&&p(t)}))}),[T]),Object(a.useEffect)((function(){l&&!O&&(y(!0),e.tick(k).then((function(e){return setTimeout((function(){return r(e)}),e.nextTickIn)})).then((function(){return y(!1)})).catch((function(){h(!1)})))}),[i]),Object(v.jsxs)("div",{id:"game",children:[Object(v.jsxs)("h1",{children:["Score: ",e.getScore()]}),e.hasError()&&Object(v.jsxs)("h1",{children:["Error: ",e.getErrorCause()]}),i&&Object(v.jsx)(j,{gameMap:e.getMap(),gameMeta:i}),Object(v.jsx)("button",{onClick:function(){return T()},disabled:l,children:"Restart"})]})},g=r.a.createContext({}),m=n(11),O=n.n(m),y=function(){function e(){Object(h.a)(this,e)}return Object(f.a)(e,[{key:"list",value:function(){return O.a.get("/React-snake/resources/maps/maplist.json").then((function(e){return e.data}))}},{key:"load",value:function(e){return O.a.get("/React-snake/resources/maps/".concat(e,".json")).then((function(e){return e.data}))}}]),e}();var T=function(){var e=Object(a.useState)(new y),t=Object(u.a)(e,1)[0],n=Object(a.useState)(),i=Object(u.a)(n,2),r=i[0],s=i[1];return Object(a.useEffect)((function(){r||t.load("map1").then((function(e){return s(new d({tiles:e,startLocation:{X:1,Y:1},startDirection:o.Down}))}))})),Object(v.jsx)("div",{className:"App",children:r&&Object(v.jsx)(b.Provider,{value:r,children:Object(v.jsx)(g.Provider,{value:t,children:Object(v.jsx)(p,{})})})})},L=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,53)).then((function(t){var n=t.getCLS,o=t.getFID,i=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),o(e),i(e),a(e),r(e)}))};c.a.render(Object(v.jsx)(r.a.StrictMode,{children:Object(v.jsx)(T,{})}),document.getElementById("root")),L()}},[[52,1,2]]]);
//# sourceMappingURL=main.c166ecfe.chunk.js.map