var mongoose = require("mongoose")
var Schema = mongoose.Schema

var crypto = require('crypto')
var { isEmail } = require('validator')

var UserSchema = new Schema({
	name: { type: String, index: { unique: true }, required: true },
	pass: { type: String, index: { unique: false }, required: true },
	email: { type: String, validate: [ (value) => { let res = isEmail(value); console.log(res); return res }, "Email not valid" ], index: { unique: true }, required: true },
	programs: { type: [ { type: Schema.Types.ObjectId, ref: 'Program'} ] }

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

