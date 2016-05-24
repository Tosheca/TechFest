<template>

<nav id="hud">
<h1 id="currentl">Current program: {{program.name}}</h1>
</nav>
<nav>
	<a v-on:click="submit">Submit</a>
	<a v-on:click="order">Order</a>
	<a v-on:click="step">Step</a>
	<a v-on:click="continue">Continue</a>
	<a v-on:click="addEdge">AddEdge</a>
	<a v-on:click="addVertex">addVertex</a>
	<a v-on:click="remove">Remove</a>
	<a v-on:click="smooth">Curve</a>

</nav>

<div id="network"  v-el:vis-container></div>

</template>


<script>

import vis from "vis"
//import io from "socket.io-client"

//var socket = io("/")
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
            gravitationalConstant: -10000
        },
        stabilization: {
            iterations: 3000
        }
    }
}

let state = {

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
			console.log("Remove")
		},
		smooth(){
			options.edges.smooth = !options.edges.smooth
			state.network.setOptions(options)
		}

	},
	route: {
		async data({ next }) {
			let program = await this.$programs.get(this.$route.params.id)
			console.log(program.graphs[0])

			if(program.graphs[0] != null){
				if(program.graphs[0].edges.length > 0 && program.graphs[0].vertices.length > 0){
					state.graph.nodes.clear()
					state.graph.edges.clear()

					state.graph.nodes.add(program.graphs[0].vertices.map(e => {e.label = e.id; return e}))
					state.graph.edges.add(program.graphs[0].edges)
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



#hud{
	font-family: arial;
	cursor: default;
	height: 65px;
	background-color: #63b4cf;
	display: flex;
    align-content: center;
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
}
	#network {
		height: calc(90vh - 65px);
	}	
	.vis-network, canvas {
		height: 100vh
	}
	.vis-network canvas:focus {
		outline: none;
	}
	.vis-network canvas:active {
		outline: none;
	}

</style>