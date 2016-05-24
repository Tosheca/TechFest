var router = require('koa-router')()


var User = require("./models/user.js")
var Program = require("./models/program.js")

router.use(function *(next) {
	if(this.state.user){
		console.log("Auth:", this.state.user.name)

		yield next
	}else{
		this.status = 401
		this.body = { "message": "no auth", state: "noauth" }
	}
})

router.get('/user/program/:id/graph', function *() {
	let program = yield Program.findById(this.id)
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
	let program = new Program({ name })
	program.save()
	user.programs.push(program.id)
	user.save()
	
	this.body = { state: "ok", message: "Success", res: program}
})

router.get('/user/programs', function *() {
	var user = yield User.findById(this.state.user.id).populate("programs")
	this.body = user.programs
})



module.exports = router