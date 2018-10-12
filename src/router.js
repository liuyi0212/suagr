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
            name: 'guide',
            path: '/guide',
            component: asyncComponent('guide')
        },
        {
            name: 'interact',
            path: '/interact',
            component: asyncComponent('interact')
        },
        {
            name: 'district',
            path: '/district',
            component: asyncComponent('district')  
        }
    ]
})

export default router
