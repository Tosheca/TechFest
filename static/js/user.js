import http from "axios" 
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
			if(this.status.exp < Date.now){
				this.logedin = false
				localStorage["token"] = ""
			}
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



	logout(){
		localStorage["token"] = ""
		http.defaults.headers.common['Authorization'] = null
		this.logedin = false

	}

	async reauth(){
		try{
			let response = await http.post("/api/reauth")

			if(response.data.token != null){
				this.setToken(response.data.token)
				this.logedin = true
			}
			
			this.logedin = false
		}catch(error){
			console.log(error)
		}
	}

	async login({name, pass}){
		try{
			let response = await http.post("/api/login", {name, pass})
			console.log("Success: ", response.data)

			if(response.data.token != null){
				this.setToken(response.data.token)
				this.logedin = true	
				return true
			}else{
				localStorage["token"] = ""
				return false
			}

		}catch(error){
			console.log("Unsuccessfull: ", error)
		}
		return false
	}

	async register({name, pass, passrep, email}){
		try{
			let response = await http.post("/api/register", {name, pass, passrep, email})
			console.log("Success: ", response)
			return response.data
		}catch(error){
			console.log("Unsuccessfull: ", error)
		}
	}

	check(){
		return this.logedin
	}
}