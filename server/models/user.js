var mongoose = require("mongoose")
var Schema = mongoose.Schema

var UserSchema = new Schema({
	name: { type: String, index: { unique: true }, required: true },
	password: { type: String, required: true }
})

UserSchema.pre('save', function(next) {
	// only hash the password if it has been modified (or is new)
	if (!this.isModified('password')) return next();

	user.password = crypto.createHash('sha256').update(this.password).digest("base64")
	next();

});

var UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel

