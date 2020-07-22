import { h, init } from "snabbdom";

let patch = init([]);
let vnode = h("div#container.cls", "hello world");
let app = document.querySelector("#app");

let oldVnode = patch(app, vnode);

vnode = h("div", "hello snabbdom");
patch(oldVnode, vnode);
