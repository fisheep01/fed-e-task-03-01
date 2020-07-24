let _Vue = null
export default class VueRouter {
  static install (Vue) {
    // 1、判断当前插件是否已经安装
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    // 2、把 vue 构造函数记录到全局变量
    _Vue = Vue
    // 3、把创建 vue 实例时候传入的 router 对象注入到 vue 实例上
    // 混入
    _Vue.mixin({
      beforeCreate () {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }
  constructor (options) {
    this.options = options
    this.routeMap = {}
    this.data = _Vue.observable({
      current: '/'
    })
  }
  init () {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }
  createRouteMap () {
    // 遍历所有的路由规则，把路由规则解析成键值对的形式，存储到 routeMap 中
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }
  initComponents (Vue) {
    const self = this
    Vue.component(
      'router-link', {
        props: {
          to: String
        },
        render (h) {
          return h('a', {
            attrs: {
              href: '#' + this.to
            },
            on: {
              click: this.clickHandler
            }
          }, [this.$slots.default])
        },
        methods: {
          clickHandler (e) {
            window.location.hash = '#' + this.to
            this.$router.data.current = this.to
            e.preventDefault()
          }
        }
        // template: '<a :href="to"><slot></slot></a>'
      }
    )

    Vue.component('router-view', {
      render (h) {
        const conmponent = self.routeMap[self.data.current]
        return h(conmponent)
      }
    })
  }

  initEvent () {
    window.addEventListener('load', this.hashChange.bind(this))
    window.addEventListener('hashchange', this.hashChange.bind(this))
  }
  hashChange () {
    if (!window.location.hash) {
      window.location.hash = '#/'
    }
    this.data.current = window.location.hash.substr(1)
  }
}
