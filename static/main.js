import Vue from 'vue'
import App from './components/App.vue'

import Login from './components/Login.vue'
import Register from './components/Register.vue'

import AllPrograms from './components/AllPrograms.vue'
import CurrentProgram from './components/CurrentProgram.vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

let router = new VueRouter()

router.map({
    '/': {
        component: Login
    },
    '/register': {
        component: Register
    },
    '/currentprogram': {
    	component: CurrentProgram
    },
    '/allprograms': {
    	component: AllPrograms
    }
})

router.start(App, '#app')