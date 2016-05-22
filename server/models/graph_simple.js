var mongoose = require("mongoose")
var Schema = mongoose.Schema


var GraphSchema = new Schema({
	edges: [  { left: Number, right: Number } ],
	vertices: [ 
		{ 
			value: Number, 
			props: [
				{ 
					key: String, 
					value: Schema.Types.Mixed 
				}
			] 
		}
	] 
})

GraphSchema.pre('save', function(next) {
	if (!this.isModified('edges') || !this.isModified('vertices')) return next()
	next()
})

GraphSchema.methods.addEdge = (edge) => {
	this.edges.push({left: edge[0],right: edge[1]})
}

GraphSchema.methods.addVertex = (props, value) => {
	if(value == null){
		// the length is equal to the value of the next index, which is the value of the last item + 1, thus used insted for optimisation
		value = this.vertices.length 
	}
	this.vertices.push({ value, props })
}

var GraphModel = mongoose.model("Graph", GraphSchema)

GraphModel.findOne({}).populate("vertices edges").then(r => {
	var out = {}
	out.vertices = r.vertices.map(i => [ i.left.value, i.right.value ] )
	out.edges = r.edges.map(i => i.value)
	console.log(out)
})

module.exports = {Graph: GraphModel}