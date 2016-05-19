var mongoose = require("mongoose")
var koa = require("koa")
var router = require('koa-router')();

mongoose.connect('mongodb://localhost/test');

var app = koa()

var User = mongoose.model("User", {
	name: String, password: String
})

router.get('/', function *() {
	var a = new User({
		name: "Ivan",
		password: "123"
	})

	a.save()

	var b = new User({
		name: "Aleks",
		password: "1234"
	})

	b.save()

	var c = new User({
		name: "Teo",
		password: "12345"
	})

	c.save()

	this.body = "Hello world"
})

app.use(router.routes())
app.listen(3000)