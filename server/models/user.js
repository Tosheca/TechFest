var mongoose = require("mongoose")
var Schema = mongoose.Schema
var crypto = require('crypto');

var UserSchema = new Schema({
	name: { type: String, index: { unique: true }, required: true },
	pass: { type: String, required: true },
	email: { type: String, required: false },

})

UserSchema.pre('save', function(next) {
	// only hashes the password if it has been modified (or is new)
	if (!this.isModified('pass')) return next();

	this.pass = crypto.createHash('sha256').update(this.pass).digest("base64")
	next();
});

var UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel