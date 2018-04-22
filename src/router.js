import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const asyncComponent = name => async resolve => resolve(await import (`./page/${name}.vue`));

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'index',
            path: '/',
            component: asyncComponent('index')
        },
        {
            name: 'basicInfo',
            path: '/basic-info',
            component: asyncComponent('basicInfo')
        },
        {
            name: 'answer',
            path: '/answer',
            component: asyncComponent('answer')
        },
        {
            name: 'interact',
            path: '/interact',
            component: asyncComponent('interact')
        }
    ]
})

export default router
