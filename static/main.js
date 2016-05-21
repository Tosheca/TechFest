import Vue from 'vue'
import App from './components/App.vue'

import Login from './components/Login.vue'
import Register from './components/Register.vue'
import UserComponent from "./components/User.vue"

import VueRouter from 'vue-router'
import VueValidator from 'vue-validator'

import User from './js/user.js'

var user = new User();

Vue.use(VueRouter)
Vue.use(VueValidator)
Vue.use(user)


let router = new VueRouter()

router.map({
	'/user': {
		component: UserComponent,
		subRoutes: {
			'/login': {
				component: Login,
			},
			'/register': {
				component: Register
			}
		}
	},
	'/' : {
		auth: true,
		component: r => {

		}
	}
})

router.alias({
	"/user/": "/user/login"
})

router.beforeEach(function ({ from, to, next, redirect }) {
	if (to.auth === true) {
		if(from.component == null){
			redirect("/user/")
		}
		console.log(to)
		// return a Promise that resolves to true or false
		return user.check()
	} else {
		next()
	}
})

router.start(App, '#app')
