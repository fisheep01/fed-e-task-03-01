import {
  h,
  init
} from "snabbdom";

let patch = init([]);
let vnode = h("div#container.cls", [
  h('h1', 'hello snabbdom'),
  h('p', 'this is p')
]);
let app = document.querySelector("#app");

patch(app, vnode)