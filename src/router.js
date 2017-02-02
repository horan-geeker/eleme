/**
 * Created by hejunwei on 2/2/17.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/goods'
    },
    {
        path: '/goods',
        component: require('./components/goods/goods.vue'),
        alias: '/'
    },
    {
        path: '/sellers',
        component: require('./components/sellers/sellers.vue')
    },
    {
        path: '/ratings',
        component: require('./components/ratings/ratings.vue')
    }
]

const router = new VueRouter({
    routes,
    base: '/',
    linkActiveClass: 'active',
    mode: 'history'
})

module.exports = router
