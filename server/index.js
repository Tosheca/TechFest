if ( global.v8debug) {
	global.v8debug.Debug.setBreakOnException()
}

var mongoose = require("mongoose")

var koa = require("koa")
var jwt = require('koa-jwt')
var bodyParser = require('koa-bodyparser')
var router = require('koa-router')({ prefix: '/api' })
var serve = require('koa-static')

var secret = "illuminati"


var User = require("./models/user.js")

mongoose.connect('mongodb://localhost/test')

var app = koa()
app.use(jwt( { secret: secret, passthrough: true } ))

router.post('/register', function *() {
	let { name, email, pass } = this.request.body
	
	console.log("Register: ", {name, email})
	
	let user = new User({
		name: name,
		email: email,
		pass: pass
	})

	try {
		yield user.save()
		this.body = "Success"
	}
	catch(error) {
		this.body = error.message
	}

})

router.post('/login', function *() {
	let { name, pass } = this.request.body
	let user
	
	user = yield User.findOne( { name: name } ).exec()
	
	let resp = { message: "Your username and/or password is incorrect!" }

	if (user != null) {
		if(user.checkPassword(pass)){
			resp = { message: "You are logged in successfully.", token: jwt.sign({ name: name, id: user.id }, secret) }
		}
	}

	this.body = resp
	
})

router.get('/status', function *() {
	let { id } = this.state
	let r = yield User.findOne({ id })
	console.log(r)
	this.body = r

})

router.use(require("./auth.js").routes())

app.use(bodyParser())
app.use(serve("../static/out"))
app.use(router.routes())

app.listen(3000)