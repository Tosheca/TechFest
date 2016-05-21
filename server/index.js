var mongoose = require("mongoose")
var koa = require("koa")
var jwt = require('koa-jwt');
var bodyParser = require('koa-bodyparser');
var router = require('koa-router')();
var serve = require('koa-static');

var User = require("./models/user.js")

const crypto = require('crypto');
const secret = "illuminati"

mongoose.connect('mongodb://localhost/test');

var app = koa()
app.use(jwt( { secret: secret, passthrough: true } ));

router.post('/api/register', function *() {
	let { name, email, pass } = this.request.body
	
	console.log({name, email})
	
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

router.post('/api/login', function *() {
	let { name, pass } = this.request.body

	var Users = yield User.find( { name: name, pass: crypto.createHash('sha256').update(pass).digest("base64") } ).exec()

	if (Users.length == 0) {
		this.body = "Your username and/or password is incorrect!"
	}
	else {
		this.body = { message: "You are logged in successfully.", token: jwt.sign( { name }, secret) }
	}
	
})

router.get('/api/hello', function *() {
	console.log(this.state)
	this.body = this.state
})

app.use(bodyParser());
app.use(router.routes())
app.use(serve("../static/out"))

app.listen(3000)