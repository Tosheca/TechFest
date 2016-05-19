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
app.use(jwt({ secret: secret, passthrough: true }));

router.post('/api/register', function *() {
	let {username, password, confirmPassword} = this.request.body

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
	}
	else {
		this.body = "These passwords do not match!"
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
	}
	
})

router.get('/api/hello', function *() {
	User.find().remove().exec()

	this.body = "Hello world"
})

app.use(bodyParser());
app.use(router.routes())
app.use(serve("../static/out"))

app.listen(3000)