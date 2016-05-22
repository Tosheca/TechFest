var mongoose = require("mongoose")
var Schema = mongoose.Schema
<<<<<<< HEAD

var UserSchema = new Schema({
	name: { type: String, index: { unique: true }, required: true },
	password: { type: String, required: true }
=======
var crypto = require('crypto')
//var { isEmail } = require('validator');

var Program = require("./program.js")

var UserSchema = new Schema({
	name: { type: String, index: { unique: true }, required: true },
	pass: { type: String, index: { unique: false }, required: true },
	email: { type: String, index: { unique: true }, required: true/*, validate: [ isEmail, 'invalid email'] */},
	programs: { type: [ Program.schema ] }
>>>>>>> 062bd57f35ed498dca64cd3cb55ce9d6c3037a49
})

function hash(text){
	return crypto.createHash('sha256').update(text).digest("base64")
}

UserSchema.pre('save', function(next) {
	// only hashes the password if it has been modified (or is new)
<<<<<<< HEAD
	if (!this.isModified('password')) return next();

	user.password = crypto.createHash('sha256').update(this.password).digest("base64")
	next();
});
=======
	if (!this.isModified('pass')) return next()


	this.pass = hash(hash(this.pass) + this.name)
	next()
})

UserSchema.methods.checkPassword = function(pass){
	return this.pass == hash(hash(pass) + this.name)
}
>>>>>>> 062bd57f35ed498dca64cd3cb55ce9d6c3037a49

var UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel

