// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource'
import App from './App'

import 'assets/scss/app.scss'

Vue.config.debug = true

Vue.use(VueResource)

new Vue({
    template: '<App/>',
    components: {App},
    router
}).$mount('#app')

// router.push('/goods')
