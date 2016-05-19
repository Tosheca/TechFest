var mongoose = require("mongoose")

var koa = require("koa")
var bodyParser = require('koa-bodyparser');
var router = require('koa-router')();
var serve = require('koa-static');

const crypto = require('crypto');

mongoose.connect('mongodb://localhost/test');

var app = koa()

var User = mongoose.model("User", {
	name: { type: String, index: { unique: true }, required: true },
	password: { type: String, required: true }
})

router.post('/api/register', function *() {
	let {username, password} = this.request.body

	let user = new User({
		name: username,
		password: crypto.createHash('sha256').update(password).digest("base64")
	})

	try {
		yield user.save()
		this.body = "Success"
	}
	catch(error) {
		this.body = error.message
	}
})

router.post('/', function *() {
	let {username, password} = this.request.body
})

router.get('/api/hello', function *() {
	User.find().remove().exec()

	this.body = "Hello world"
})

app.use(bodyParser());
app.use(router.routes())
app.use(serve("../static/out"))

app.listen(3000)