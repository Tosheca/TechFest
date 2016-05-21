var mongoose = require("mongoose")
var Schema = mongoose.Schema

var GraphSchema = new Schema({
	edges: { type: [ { name: String } ], index: { unique: true }, required: true },
	ribs: { type: [ { name: String } ], index: { unique: true }, required: true }
})

GraphSchema.pre('save', function(next) {
	if (!this.isModified('edges') || !this.isModified('ribs')) return next();
	
	this.save(callback)

	next();
});

var GraphModel = mongoose.model("Graph", GraphSchema)

module.exports = GraphModel