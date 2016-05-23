var mongoose = require("mongoose")

var koa = require("koa")
var jwt = require('koa-jwt')
var bodyParser = require('koa-bodyparser')
var router = require('koa-router')({ prefix: '/api' })
var serve = require('koa-static')
var cors = require('koa-cors');

var socketio = require('socket.io')
var User = require("./models/user.js")
var socket = require("./socket.js")

var secret = "illuminati"


mongoose.connect('mongodb://localhost/test')

var app = koa()

app.use(jwt( { secret: secret, passthrough: true } ))

router.post('/register', function *() {
	let { name, email, pass } = this.request.body
	
	console.log("Register: ", {name, email})

	let user = new User({ name, email, pass })

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
			resp = { message: "You are logged in successfully.", token: jwt.sign({ name: name, id: user.id }, secret, { expiresIn: "2 hours" }) }
		}

	}
	this.body = resp
	
})

router.post('/reauth', function*(){
	let { id, name } = this.state
	let user = yield User.findOne({ id })
	let resp = { message: "Can't reauth!" }

	if(user != null){
		resp = { message: "You cheked successfully.", token: jwt.sign({ name: name, id: user.id }, secret, secret, { expiresIn: "2 hours" }) }
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

app.use(cors())
app.use(bodyParser())
app.use(serve("../static/out"))
app.use(router.routes())

let  server = require('http').Server(app.callback())
let io = socketio(server)

socket(io)

app.context.io = io 

server.listen(3000)


console.log("Running")