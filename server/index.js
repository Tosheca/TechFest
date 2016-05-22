if ( global.v8debug) {
	global.v8debug.Debug.setBreakOnException()
}

var mongoose = require("mongoose")

var koa = require("koa")
var jwt = require('koa-jwt')
var bodyParser = require('koa-bodyparser')
var router = require('koa-router')({ prefix: '/api' })
var serve = require('koa-static')

var socketio = require('socket.io')

var secret = "illuminati"


const crypto = require('crypto');
const secret = "illuminati"


var User = require("./models/user.js")

mongoose.connect('mongodb://localhost/test')

var app = koa()

app.use(jwt({ secret: secret, passthrough: true }));

router.post('/api/register', function *() {
	let {username, password, confirmPassword} = this.request.body


app.use(jwt( { secret: secret, passthrough: true } ))

router.post('/register', function *() {
	let { name, email, pass } = this.request.body
	
	console.log("Register: ", {name, email})

	let user = new User({
		name: username,
		password: password
	})

	try {
		yield user.save()
		this.body = "Success"
	}
	catch(error) {
		this.body = error.message
	}

})


router.post('/api/login', function *() {
	let {username, password} = this.request.body

	var Users = yield User.find( { name: username, password: crypto.createHash('sha256').update(password).digest("base64") } ).exec()

	if (Users.length == 0) {
		this.body = "Your username and/or password is incorrect!"
	}
	else {
		this.body = "You are logged in successfully."

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

<<<<<<< HEAD
router.get('/api/hello', function *() {
	User.find().remove().exec()

	this.body = "Hello world"
=======
router.get('/status', function *() {
	let { id } = this.state
	let r = yield User.findOne({ id })
	console.log(r)
	this.body = r

>>>>>>> 062bd57f35ed498dca64cd3cb55ce9d6c3037a49
})

router.use(require("./auth.js").routes())

app.use(bodyParser())
app.use(serve("../static/out"))
app.use(router.routes())

var server = require('http').Server(app.callback())
var io = socketio(server)

app.context.io = io 

server.listen(3000)
