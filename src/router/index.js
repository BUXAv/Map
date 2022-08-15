import Vue from 'vue'

import VueRouter from 'vue-router'
import map from '../components/Map.vue'
import MapNow from '../components/MapNow.vue'
import MapYesterDay from '../components/MapYesterDay.vue'

Vue.use(VueRouter)
export default new VueRouter({
    mode:'history',
    routes:[
        {path:'/',
        name:'Map',
        component:map
    },
        {path:'/now',
        name:'MapNow',
        component:MapNow
    },
        {path:'/yesterday',
        name:'MapYesterDay',
        component:MapYesterDay
    },
    ]
})