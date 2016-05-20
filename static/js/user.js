import http from "http" 

export default class User {
	constructor(){
		axios.interceptors.response.use(function (response) {
			return response;
		}, function (error) {
			return new Promise((resolve, reject) => {
				if(error.status = 401){
					this.logout()
				}
			});
		});
	}

	install(Vue, options){
		Vue.user = this
		Vue.prototype.$user = this
	}

	login(name, pass){

	}

	logout(){

	}

	register({name, pass, passrep}){
		if(pass == passrep){

		}else{
			
		}
	}

	check(){

	}
}