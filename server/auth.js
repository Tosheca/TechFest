var router = require('koa-router')()


var User = require("./models/user.js")
var Program = require("./models/program.js")

router.use(function *(next) {
	if(this.state.user){
		yield next
	}else{
		this.status = 401
		this.body = { "message": "no auth", state: "noauth" }
	}
})

router.get('/user/program/:id/graph', function *() {
	let program = yield Program.findById(this.params.id)
	this.body = program.graph
})

router.post('/user/program/:id/graph', function *() {
	let program = yield Program.findById(this.params.id)
	let {edges, vertices} = this.request.body
	
	program.graphs.push({edges, vertices})
	
	try{
		yield program.save()
		//console.log(program.graphs, edges, vertices)

	}catch(error){
		console.log("Can't add graph: ", error)
	}
	this.body = program.graph
})

router.get('/user/program/:id', function *() {
	let program = yield Program.findById(this.params.id)
	this.body = program
})

router.delete('/user/program/:id', function *() {
	try{
		yield Program.findById(this.params.id).remove()
	}catch(error){
		console.log(error)
		this.body = { message: error.message, state: "fucked up" }
		return -1
	}
	this.body = { message: "Program removed", state: "ok" }
})

router.post('/user/program/:id/graph/addVertex', function *() {
	let program = yield Program.findById(this.id)
	let { ops } = this.body
	program.addVertex(ops)
	this.body = { message: "Vertex added" }
})

router.post('/user/program/:id/graph/addEdge', function *() {
	let program = yield Program.findById(this.id)
	let { ops } = this.body
	program.addEdge(ops)
	program.save()
	this.body = program.graph
})

router.post('/user/programs', function *() {
	var { name } = this.request.body
	var user = yield User.findById(this.state.user.id)
	let program = new Program({ name: name, graphs: [] })
	user.programs.push(program.id)
	try{
		yield program.save()
		yield user.save()
	}catch(error){
		console.log(error.message)
		this.body = { state: "fucked up", message: error.message}
		return -1
	}
	this.body = { state: "ok", message: "Success", res: program}
})

router.get('/user/programs', function *() {
	var user = yield User.findById(this.state.user.id).populate("programs","_id created modified name", null, { sort: { "created": -1 } })
	this.body = user.programs
})



module.exports = router