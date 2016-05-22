import Vue from 'vue'
import App from './components/App.vue'

import Login from './components/Login.vue'
import Register from './components/Register.vue'

import UserComponent from "./components/User.vue"

import VueRouter from 'vue-router'
import VueValidator from 'vue-validator'

import AllPrograms from './components/AllPrograms.vue'
import CurrentProgram from './components/CurrentProgram.vue'

import User from "./js/user.js"

let user = new User()

Vue.use(VueRouter)

Vue.use(VueValidator)
Vue.use(user)

let router = new VueRouter()

router.map({
	'/user': {
		component: UserComponent,
		subRoutes: {
			'/login': {
				component: Login
			},
			'/register': {
				component: Register
			}
		}
	},
	'/currentprogram': {
		component: CurrentProgram,
		auth: true
	},
	'/allprograms': {
		component: AllPrograms,
		auth: true
	},
	'/' : {
		component: function(callback) {

		},
		auth: true
	}
})

router.alias({
	"/user/": "/user/login"
})

router.beforeEach(function ({ from, to, next, redirect }) {
	console.log(from, to, next, redirect)
	if (to.auth === true) {
		if(user.check()){
			next()
			return true
		}

		if(from.component == null){
			redirect("/user/")
		}
		return false


	} else {
		next()
	}
})

router.start(App, '#app')