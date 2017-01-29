// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import goods from 'components/goods/goods.vue'
import sellers from 'components/sellers/sellers.vue'
import ratings from 'components/ratings/ratings.vue'

import 'assets/scss/app.scss'

Vue.config.debug = true

Vue.use(VueRouter)

Vue.use(VueResource)

const routes = [
    // {path: '/', redirect: '/goods'},
    {path: '/goods', component: goods, alias: '/'},
    {path: '/sellers', component: sellers},
    {path: '/ratings', component: ratings}
]

const router = new VueRouter({
    routes,
    linkActiveClass: 'active',
    mode: 'history'
})

new Vue(Vue.util.extend({router}, App)).$mount('#app')

// router.push('/goods')
