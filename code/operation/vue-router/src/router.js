import Vue from "vue";
import VueRouter from "./router/index";
import Home from "./views/Home.vue";
// 1、注册路有插件
// Vue.use 是用来注册插件，他会调用传入对象的 install 方法，如果是函数就直接调用函数
Vue.use(VueRouter);

// 路由规则
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    // 嵌套路由
    {
        path: "/about",
        name: "About",
        // 开启 props 会把 URL 中的参数传递给组件
        // 在组件中通过 props 来接收 URL 参数
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "./views/About.vue")
    }
];

// 创建 router 对象
const router = new VueRouter({
    routes
});

export default router;