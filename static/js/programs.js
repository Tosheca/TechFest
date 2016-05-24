import http from "axios"

export default class Programs {
	constructor(){
	}

	async getList(){
		let res = await http.get("/api/user/programs")
		let programs = res.data.map(i => new Program(i))
		return programs
	}

	async get(id){
		let res =  await http.get("/api/user/program/" + id)
		let program = new Program(res.data)
		
		return program

	}

	async create({ name }){
		let res = await http.post("/api/user/programs", { name })
		if(res.data.res){
			let program = new Program(res.data.res)
			return program
		}else{
			return null
		}
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

class Program {
	constructor({_id, name, graphs, created, modified}){
		this.id =  _id
		this.name = name
		this.graphs = graphs
		this.created = created
		this.modified = modified
	}

	async addGraph(graph){
		console.log(this.id)
		let res =  await http.post("/api/user/program/" + this.id + "/graph", graph)

		return res.data
	}

	async remove(){
		let res =  await http.delete("/api/user/program/" + this.id)
		return res.data
	}

}