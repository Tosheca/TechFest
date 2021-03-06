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
import Programs from "./js/programs.js"

import Home from "./components/Home.vue"

let user = new User()
let programs = new Programs()


Vue.use(VueRouter)

Vue.use(VueValidator)
Vue.use(user)
Vue.use(programs)

let router = new VueRouter()

router.map({
	'/user': {
		component: UserComponent,
		name: "user",
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
	'/program/:id': {
		name: "program",
		component: CurrentProgram,
		auth: true
	},
	'/allprograms': {
		name: "programs",
		component: AllPrograms,
		auth: true
	},
	'/' : {
		component: Home,
		auth: false
	}
})

router.alias({
	"/user/": "/user/login"
})

router.beforeEach(function ({ from, to, next, redirect }) {
	if (to.auth === true) {
		if(user.check()){
			return true
		}

		if(from.component == null){
			redirect("/user/")
		}

		return false


	} else {
		if(user.check()){
			if(from.component == null){
				redirect({ name: "programs" })
			}
			return false
		}else{
			return true			
		}
	}
})

router.start(App, '#app')