import { createApp } from "./src/runtime-canvas";
import App from "./src/App.js";
import { getRootContainer } from "./src/game.js";
// 需要根组件 
// 需要根容器
// canvas->pixi.js
// setup canvas;
createApp(App).mount(getRootContainer());