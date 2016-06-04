var mongoose = require("mongoose")
var Schema = mongoose.Schema


var GraphSchema = new Schema({
	edges: [  
		{ 
			_id: false,
			from: Number, 
			to: Number 
		} 
	],
	vertices: [ 
		{
			_id: false,
			id: Number, 
			props: [ Schema.Types.Mixed ] 
		}
	],
	story: [ Number ]
})

/*
GraphSchema.pre('save', function(next) {
	if (!this.isModified('edges') || !this.isModified('vertices')) return next()
	next()
})
*/

GraphSchema.methods.addEdge = function(edge){
	this.edges.push({left: edge[0],right: edge[1]})
}

GraphSchema.methods.addVertex = function(props, id){
	if(id == null){
		// the length is equal to the value of the next index, which is the value of the last item + 1, thus used insted for optimisation
		id = this.vertices.length 
	}
	this.vertices.push({ id, props })
}

var GraphModel = mongoose.model("Graph", GraphSchema)


var graph = new GraphModel()

// console.log(graph)

// graph.addEdge([ 5, 6 ])

// graph.save().then(() => {
// 	GraphModel.find({}).then(r => {
// 		console.log(r)
// 		r.forEach(e => {
// 			var out = {}
// 			out.vertices = e.vertices.map(i => [ i.left.value, i.right.value ] )
// 			out.edges = e.edges.map(i => i.value)
// 			console.log(out.vertices, out.edges)
// 		})
// 	})

// })
module.exports = {Graph: GraphModel}