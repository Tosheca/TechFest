import Vue from 'vue'
import App from './components/App.vue'

import Login from './components/Login.vue'
import Register from './components/Register.vue'

import UserComponent from "./components/User.vue"

import VueRouter from 'vue-router'
import VueValidator from 'vue-validator'

import AllPrograms from './components/AllPrograms.vue'
import CurrentProgram from './components/CurrentProgram.vue'


Vue.use(VueRouter)

Vue.use(VueValidator)
Vue.use(user)



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