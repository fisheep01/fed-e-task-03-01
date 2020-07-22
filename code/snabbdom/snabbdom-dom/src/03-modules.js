import {
  h,
  init
} from "snabbdom";

import style from 'snabbdom/modules/style'
import evnetlisteners from 'snabbdom/modules/eventlisteners'

let patch = init([style, evnetlisteners])

let vnode = h('div', {
    style: {
      backgroundColor: 'red'
    },
    on: {
      click: enentHandler
    }
  },
  [
    h('h1', 'hello snabbdom'),
    h('p', 'this is p')
  ])

let app = document.querySelector("#app");

patch(app, vnode)

function enentHandler() {
  alert('haha')
}