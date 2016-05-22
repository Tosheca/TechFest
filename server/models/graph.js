var mongoose = require("mongoose")
var Schema = mongoose.Schema
let EdgeSchema = new Schema({
	value: Number,
	props: [
		{
			key: { type: String },
			value: { type: Schema.Types.Mixed }
		}
	]
})

let VertexSchema = new Schema({
	left : { type: Schema.Types.ObjectId, ref: 'Edge' },
	right : { type: Schema.Types.ObjectId, ref: 'Edge' }	
})


var EdgeModel = mongoose.model("Edge", EdgeSchema)
var VertexModel = mongoose.model("Vertex", VertexSchema)

var GraphSchema = new Schema({
	edges: [ EdgeSchema ],
	vertices: [ VertexSchema ]
})



GraphSchema.pre('save', function(next) {
	if (!this.isModified('edges') || !this.isModified('vertices')) return next()
	next()
})

var GraphModel = mongoose.model("Graph", GraphSchema)

module.exports = {Graph: GraphModel, Edge: EdgeModel, Vertex: VertexModel}