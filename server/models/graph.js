var mongoose = require("mongoose")
var Schema = mongoose.Schema

var GraphSchema = new Schema({
	edges: { type: [ { type: String, index: {unique: true, dropDups: true} } ], required: true },
	ribs: { type: [ { type: String, index: {unique: true, dropDups: true} } ], required: true }
})

GraphSchema.pre('save', function(next) {
	if (!this.isModified('edges') || !this.isModified('ribs')) return next();
	next();
});

var GraphModel = mongoose.model("Graph", GraphSchema)

module.exports = GraphModel