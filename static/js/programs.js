import http from "axios"

export default class Programs {
	constructor(){
	}

	async getList(){
		let res = await http.get("/api/user/programs")
		return res.data
	}

	async get(id){
		let res =  await http.get("/api/user/program/" + id)
		return res.data

	}

	async create({ name }){
		let res = await http.post("/api/user/programs", { name })
		return res.data
	}

	async remove(id){
		let res =  await http.delete("/api/user/program/" + id)
		return res.data
	}

	install(Vue, options){
		Vue.programs = this
		Vue.prototype.$programs = this
	}
}