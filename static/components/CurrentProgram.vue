<template>

<nav id="hud">
<h1 id="currentl">Current program: {{program.name}}</h1>
<button id="logout2" class="button" v-on:click="back">My programs</button>
</nav>
<nav id="hud2">
	<a class="button" id="submit" v-on:click="submit">Submit</a>
	<a class="button" id="clear" v-on:click="clear">Clear</a>
	<a class="button" id="save" v-on:click="save">Save</a>
<!-- 	<a class="button" id="order" v-on:click="order">Order</a>
	<a class="button" id="step" v-on:click="step">Step</a>
	<a class="button" id="continue" v-on:click="continue">Continue</a>
 -->	<a class="button" id="addedge" v-on:click="addEdge">Add Edge</a>
	<a class="button" id="addvertex" v-on:click="addVertex">Add Vertex</a>
	<a class="button" id="remove" v-on:click="remove">Remove</a>
	<a class="button" id="curve" v-on:click="smooth">Curve</a>

</nav>

<div id="network"  v-el:vis-container></div>

</template>


<script>

import vis from "vis"
//import io from "socket.io-client"

//var socket = io("/")


let state = {

}

var options = {
    nodes: {
        scaling: {
            min: 16,
            max: 32
        }
    },
    edges: {
        smooth: false
    },
    physics: {
        barnesHut: {
            gravitationalConstant: -5000
        },
        stabilization: {
            iterations: 3000
        }
    },
    manipulation: {
		addNode: function(node, callback) {
			node.id =  (state.graph.nodes.max("id") || { id: 0 }).id  + 1

			node.label = node.id
			callback(node)
		}
	}
}

export default {
	methods: {  
		submit(){
			state.graph.nodes.update({ id: 1, color: "red", size: 100})
		},
		order(){
			console.log("Order")

		},
		step(){
			console.log("Step")

		},
		continue(){
			console.log("Continue")

		},
		addEdge(){
			state.network.addEdgeMode()
		},
		addVertex(){
			state.network.addNodeMode()
		
		},
		remove(){
			let node = state.network.getSelectedNodes()[0]
			state.graph.nodes.remove(node)
		},
		smooth(){
			options.edges.smooth = !options.edges.smooth
			state.network.setOptions(options)
		},
		back(){
			this.$router.go({ name: "programs" })
		},
		clear(){
			state.graph.edges.clear()
			state.graph.nodes.clear()

		},
		save(){
			let graph = {
				vertices: state.graph.nodes.get(),
				edges: state.graph.edges.get()
			}
			this.program.addGraph(graph)
		}

	},
	route: {
		async data({ next }) {
			let program = await this.$programs.get(this.$route.params.id)
			console.log(program.graphs)

			if(program.graphs.length != 0){
				if(program.graphs[program.graphs.length - 1].edges.length > 0 && program.graphs[program.graphs.length-1].vertices.length > 0){
					console.log(program.graphs)
					state.graph.nodes.clear()
					state.graph.edges.clear()

					state.graph.nodes.add(program.graphs[program.graphs.length - 1].vertices.map(e => {e.label = e.id; return e}))
					state.graph.edges.add(program.graphs[program.graphs.length - 1].edges)
				}
			}

			next({ program })
		},
		async activate(){
			state = {} // needed because had problems with the tracked vue state. //TODO: find a way to fix it

			let nodes = new vis.DataSet([
				{id:1, value: 1},
				{id:2, value: 12, color: "#FF0000"},
				{id:3, value: 3, shape: 'star'}
			])

			let edges = new vis.DataSet([
				{id:1, from:1, to: 2},
				{id:2, from:1, to: 3},
				{id:3, from:2, to: 3}
			])

	// console.log(this.program)
	// 		let nodes = new vis.DataSet(this.program.graphs[0].edges)
	// 		let edges = new vis.DataSet(this.program.graphs[0].edges)

			state.graph = { nodes, edges }
			state.network = new vis.Network(this.$els.visContainer, { nodes, edges }, options)
window.s = state
			
		}
	},
	computed: {

	},
	data() {
		return {

 			program: {
 				name: "",
 				graphs: [
 					{
 						nodes: [],
 						edges: []
 					}
 				]
 			},
 			network: {},
		}
	}
}

</script>

<style>
#logout2{
	margin-left: auto;
	width: 10%;
	color: lightblue;
	font-size: 1.5em;
	background-color: #63b4cf;
	transition: all 0.2s ease-in;

}
#logout2:hover{
	color: white;
	box-shadow: 0 0 60px #666;
}
#logout2:active{
	box-shadow: inset 0 0 10px #666;
	
}
#logout2:focus{
	outline: none;
}


#hud{
	font-family: arial;
	cursor: default;
	height: 65px;
	background-color: #63b4cf;
	display: flex;
    align-content: center;
    transition: all 0.2s ease-in;
}
#currentl{
	margin-top: auto;
	margin-bottom: auto;
    text-shadow: 0 0 5px #666;
    padding-top: 0;
    padding-bottom: 0; 
    padding-left: 2vw;
    font-size: 2.7em;
    color: white;
    font-weight: bold;
    line-height: 64px;
    text-align: left;
    transition: all 0.2s ease-in;
}
	#network {
		height: calc(100vh - 115px);
	}	
	.vis-network, canvas {
		height: 92vh;
	}
	.vis-network canvas:focus {
		outline: none;
	}
	.vis-network canvas:active {
		outline: none;
	}
#hud2{
	
	margin-right: 0vw;
	font-family: arial;
	cursor: default;
	height: 50px;
	background-color: #3691b0;
	display: flex;
    justify-content: flex-start;
    transition: all 0.2s ease-in;
    z-index: 1;
    padding: 5px;
    box-sizing: border-box;
}

#hud2 .button{
	background-color: #3691b0;
	text-align: center;
	color: white;
	font-size: 1.5em;
	transition: all 0.2s ease-in;
	line-height: 30px;
	flex: 0 0 8vw;
	margin-left: 10px;
}

#hud2 .button:hover{
	color: #666;
	transition: all 0.2s ease-in;
}

#hud2 .button:active{
	box-shadow: inset 0 0 10px #666;
	transition: all 0.2s ease-in;
}

</style>