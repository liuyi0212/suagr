import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const asyncComponent = name => async resolve => resolve(await import (`./page/${name}.vue`));

const router = new VueRouter({
    // mode: 'history',
    routes: [
        {
            name: 'index',
            path: '/',
            component: asyncComponent('index'),
            meta: {
              keepAlive: false
           }
        },
        {
            name: 'basicInfo',
            path: '/basic-info',
            meta: {
               keepAlive: true
            },
            component: asyncComponent('basicInfo')
        },
        {
            name: 'answer',
            path: '/answer',
            component: asyncComponent('answer'),
            meta: {
               keepAlive: false
            }
        },
        {
            name: 'guide',
            path: '/guide',
            component: asyncComponent('guide'),
            meta: {
               keepAlive: false
            }
        },
        {
            name: 'interact',
            path: '/interact',
            component: asyncComponent('interact'),
            meta: {
               keepAlive: false
            }
        },
        {
            name: 'district',
            path: '/district',
            component: asyncComponent('district'),
            meta: {
               keepAlive: false
            }
        },
        {
            name: 'consulthidtory',
            path: '/consulthidtory',
            component: asyncComponent('consulthidtory'),
            meta: {
               keepAlive: false
            } 
        }
    ]
})

export default router
