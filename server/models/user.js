var mongoose = require("mongoose")
var Schema = mongoose.Schema
var crypto = require('crypto')
//var { isEmail } = require('validator');

var Program = require("./program.js")

var UserSchema = new Schema({
	name: { type: String, index: { unique: true }, required: true },
	pass: { type: String, index: { unique: false }, required: true },
	email: { type: String, index: { unique: true }, required: true/*, validate: [ isEmail, 'invalid email'] */},
	programs: { type: [ Program.schema ] }
})

function hash(text){
	return crypto.createHash('sha256').update(text).digest("base64")
}

UserSchema.pre('save', function(next) {
	// only hashes the password if it has been modified (or is new)
	if (!this.isModified('pass')) return next()


	this.pass = hash(hash(this.pass) + this.name)
	next()
})

UserSchema.methods.checkPassword = function(pass){
	return this.pass == hash(hash(pass) + this.name)
}

var UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel