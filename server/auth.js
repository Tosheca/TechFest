var router = require('koa-router')()


var User = require("./models/user.js")
var Program = require("./models/program.js")

router.use("*", function *(next) {
	if(this.state.user){
		yield next
	}
})

router.get('/user/program/:id/graph', function *() {
	let program = yield Program.findByID(this.id)
	this.body = program.graph
})

router.post('/user/program/:id/graph/addVertex', function *() {
	let program = yield Program.findByID(this.id)
	let { ops } = this.body
	program.addVertex(ops)
	this.body = { message: "Vertex added" }
})

router.post('/user/program/:id/graph/addEdge', function *() {
	let program = yield Program.findByID(this.id)
	let { ops } = this.body
	program.addEdge(ops)
	program.save()
	this.body = program.graph
})

router.post('/user/programs', function *() {
	var { name } = this.request.body

	var user = yield User.findOne({id: this.state.id })
	console.log(user)
	let program = new Program({ name })
	program.save()
	user.programs.push(program.id)
	user.save()
	
	this.body = { state: "ok", message: "Success"}
})

router.get('/user/programs', function *() {
	var user = yield User.findById(this.state.id, {lean: true}).populate("programs")
	this.body = user.programs
})

module.exports = router