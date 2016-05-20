import Vue from 'vue'
import App from './components/App.vue'

import Login from './components/Login.vue'
import Register from './components/Register.vue'

import VueRouter from 'vue-router'

import User from './js/user.js'

Vue.use(VueRouter)

let router = new VueRouter()

router.map({
	'/login': {
		component: {
			template: `<router-view></router-view>`
		},
		subRoutes: {
			'/' : {
				component: Login
			},
			'/register': {
				component: Register
			}
		}
	},
})

router.start(App, '#app')