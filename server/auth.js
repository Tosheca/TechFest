var router = require('koa-router')()

var User = require("./models/user.js")
var Program = require("./models/program.js")

router.use("*", function *(next) {
	if(this.state.user){
		yield next
	}
})

router.post('/user/programs', function *() {
	var { name } = this.request.body

	var user = yield User.findOne({id: this.state.id })
	console.log(user)
	debugger;
	user.programs.push({ name: name })
	user.save()

	this.body = { state: "ok", message: "Success"}
})

router.get('/user/programs', function *() {
	var user = yield User.findById(this.state.id)
	this.body = user
})

module.exports = router