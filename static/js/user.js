import http from "axios" 
window.h = http
// random function found on the web 
// TODO: if problems rewrite
function getContent(token) {
	let segments = token.split(".")
	
	if (!segments instanceof Array || segments.length !== 3) {
		throw new Error("Invalid token")
	}
	
	var claims = segments[1];
	return JSON.parse(decodeURIComponent(escape(window.atob(claims))));
}

export default class User {
	constructor(){
		http.interceptors.response.use((response) => {
			return response
		}, (error) => {
			return new Promise((resolve, reject) => {
				if(error.status == 401){
					this.logout()
					console.log("Logout: Session expired")
				}else{
					console.log("Broke")
				}
			})
		})


		this.logedin = localStorage["token"] != "" && localStorage["token"] != null
		if(this.logedin){
			this.status = getContent(localStorage["token"])
		}
		this.setToken()
	}

	setToken(token){
		if(token){
			localStorage["token"] = token		
			this.status = getContent(token)
		}
		http.defaults.headers.common['Authorization'] = "BEARER "  + localStorage["token"]

	}

	install(Vue, options){
		Vue.user = this
		Vue.prototype.$user = this
	}

	login({name, pass}){
		http.post("/api/login", {name, pass}).then(response => {
			console.log("Succes: ", response.data)
			if(response.data.token != null){
				this.setToken(response.data.token)
				this.logedin = true	
			}else{
				localStorage["token"] = ""
			}
		}).catch((e) => {
			console.log("Unsuccesfull: ", e)
		})
	}

	logout(){
		localStorage["token"] = ""
		http.defaults.headers.common['Authorization'] = null

	}

	register({name, pass, passrep, email}){
		http.post("/api/register", {name, pass, passrep, email}).then(response => {
			console.log("Success: ", response)
		}).catch((e) => {
			console.log("Unsuccesfull: ", e)
		})
	}

	check(){
		console.log(this.logedin)
		return true
		return this.logedin
	}
}