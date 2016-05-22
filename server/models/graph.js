/*
	Very bad code ahead, not recommended for faint-hearted people
*/

var mongoose = require("mongoose")
var Schema = mongoose.Schema
let EdgeSchema = new Schema({
	value: Number,
	props: [
		{
			key: { type: String },
			value: { type: Schema.Types.Mixed } // Unique id in the graph
		}
	]
})

let VertexSchema = new Schema({
	left : { 
		value: Number,
		object: { type: Schema.Types.ObjectId, ref: 'Edge'}
	},
	right : { 
		value: Number, 
		object: { type: Schema.Types.ObjectId, ref: 'Edge'} 
	}
}, { collection: "vertices"})


var EdgeModel = mongoose.model("Edge", EdgeSchema)
var VertexModel = mongoose.model("Vertex", VertexSchema)

var GraphSchema = new Schema({
	edges: [ { type: Schema.Types.ObjectId, ref: 'Edge' } ],
	vertices: [ { type: Schema.Types.ObjectId, ref: 'Vertex' } ] //TODO: 
})

GraphSchema.pre('save', function(next) {
	if (!this.isModified('edges') || !this.isModified('vertices')) return next()
	next()
})

GraphSchema.methods.addEdge = (left ,right) => {
	let edge = new EdgeModel({
		left: { 
			value: left.value,
			object: left.id
		},
		right: { 
			value: right.value,
			object: right.id
		} 
	})

	edge.save()
	this.edges.push(edge)

}

GraphSchema.methods.addVertex = (props, value) => {
	if(value == null){
		// the length is equal to the value of the next index, which is the value of the last item + 1, thus used insted for optimisation
		value = this.vertices.length 
	}

	let vertex = new VertexModel({
		value: value,
		props: props
	})

	vertex.save()
	this.vertices.push(vertex)
}

var GraphModel = mongoose.model("Graph", GraphSchema)

/*

EdgeModel.find({}).exec().then(e => {
	let v = [
		new VertexModel({ 
			left: { 
				value: e[0].value,
				object: e[0].id
			},
			right: { 
				value: e[2].value,
				object: e[2].id
			} 
		}),
		new VertexModel({ 
			left: { 
				value: e[1].value,
				object: e[1].id
			},
			right: { 
				value: e[5].value,
				object: e[5].id
			} 
		}),
		new VertexModel({ 
			left: { 
				value: e[2].value,
				object: e[2].id
			},
			right: { 
				value: e[5].value,
				object: e[5].id
			} 
		}),
		new VertexModel({ 
			left: { 
				value: e[5].value,
				object: e[5].id
			},
			right: { 
				value: e[1].value,
				object: e[1].id
			} 
		}),
		new VertexModel({ 
			left: { 
				value: e[2].value,
				object: e[2].id
			},
			right: { 
				value: e[4].value,
				object: e[4].id
			} 
		})
	]

	v.map(s => s.save())
})
var graph = new GraphModel()

EdgeModel.find({}).exec().then(r => {
	r.forEach(e => {
		console.log(e.value, e.props)
		graph.edges.push(e.id)
	})
	graph.save()
})

VertexModel.find({}).populate("left.object right.object").exec().then(r => {
	r.forEach(i => {
		console.log(i.left.value, i.right.value)
		graph.vertices.push(i.id)

	})
	graph.save()
})
*/

GraphModel.findOne({}).populate("vertices edges").then(r => {
	var out = {}
	out.vertices = r.vertices.map(i => [ i.left.value, i.right.value ] )
	out.edges = r.edges.map(i => i.value)
	console.log(out)
})

module.exports = {Graph: GraphModel, Edge: EdgeModel, Vertex: VertexModel}