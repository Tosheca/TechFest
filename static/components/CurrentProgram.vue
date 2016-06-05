<template>

<nav id="hud">
<h1 id="currentl">Current program: {{program.name}}</h1>
<button id="logout2" class="button" v-on:click="back">My programs</button>
</nav>
<nav id="hud2">
	<!-- <a class="button" id="submit" v-on:click="submit">Submit</a> -->
	<a class="button" id="clear" @click="clear">Clear</a>
	<a class="button" id="save" @click="save">Save</a>
<!-- 	<a class="button" id="order" v-on:click="order">Order</a>
	<a class="button" id="step" v-on:click="step">Step</a>
	<a class="button" id="continue" v-on:click="continue">Continue</a>
 -->	
	<a class="button" id="addedge" @click="addEdge">Add Edge</a>
	<a class="button" id="addvertex" @click="addVertex">Add Vertex</a>
	<a class="button" id="remove" @click="remove">Remove</a>
	<a class="button" id="curve" @click="smooth">Curve</a>
	
</nav>

<div id="network"  v-el:vis-container></div>
<nav id="controls">
	<div id="parent_step">
	<div class="stepcontrols" id="playpause" v-on:click="pp" v-bind:class="play"></div>
	<div class="stepcontrols" id="stepbackward" v-on:click="step_backword"></div>
	<div class="stepcontrols" id="stepforward" v-on:click="step_forward"></div>
	</div>
</nav>

</template>

<script>

import vis from "vis"
import socket from "socket.io-client"

function pad(s, size) {
	while (s.length < size) s = "0" + s;
	return s;
}

var io
window.io = io

let state = {

}

let maxLevel

var options = {
	nodes: {
		size: 60,
		scaling: {
			min: 16,
			max: 42
		}
	},
	edges: {
		smooth: false
	},
	physics: {
		solver: "barnesHut",
		barnesHut: {
			gravitationalConstant: -5000
		},
		forceAtlas2Based:{
			gravitationalConstant: -200,
			avoidOverlap: 1
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
			let selectedEdges = state.network.getSelectedEdges()

			state.graph.nodes.remove(node)
			selectedEdges.forEach((edge) => state.graph.edges.remove(edge))
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
		},
		pp(){
			this.play.active = !this.play.active
		},
		step_backword(){
			let story = this.program.graphs[this.program.graphs.length - 1].story
			if(this.step != 0){
				this.step -= 1
			}

			let step = story[this.step]
			step.color = "#97C2FC"
			state.graph.nodes.update(step)
		},
		step_forward(){
			let story = this.program.graphs[this.program.graphs.length - 1].story
			//let maxLevel = 4
			console.log("maxlvl: ", maxLevel)
			let step = story[this.step]
			console.log(step)
			if(maxLevel != undefined){
				let color = ( (step.props.level) / maxLevel )
				console.log(color, maxLevel)
				step.color = "#"+ pad((color * 255).toString(16), 2) + "2255"
				console.log(step.color)
			}else{
				step.color = "red"
			}
			state.graph.nodes.update(step)
			if(this.step != story.length){
				this.step += 1
			}
		}

	},
	route: {
		async data({ next }) {
			let program = await this.$programs.get(this.$route.params.id)
			

			console.log("maxlvl: ", maxLevel)
			if(program.graphs.length != 0){
				if(program.graphs[program.graphs.length - 1].edges.length > 0 && program.graphs[program.graphs.length-1].vertices.length > 0){


					console.log(program.graphs)
					state.graph.nodes.clear()
					state.graph.edges.clear()

					state.graph.nodes.add(program.graphs[program.graphs.length - 1].vertices.map(e => {e.label = e.id; return e}))
					state.graph.edges.add(program.graphs[program.graphs.length - 1].edges.map(e => {e.label = e.weight; return e}))

					maxLevel = program.graphs[program.graphs.length - 1].story.map(e => e.props.level).reduce((a,b) => a > b ? a : b)
					
				}
			}
			io = socket("/")
			window.io = io
			io.on("story", (data) => {
				console.log("Story: ", data)
				maxLevel = data.map(e => e.props.level).reduce((a,b) => a > b ? a : b)
				this.story = data
			})
			
			io.on("graph", (data) => {
				console.log("Story: ", data)
				
				state.graph.nodes.clear()
				state.graph.edges.clear()

				state.graph.nodes.add(data.vertices.map(e => {e.label = e.id; return e}))
				state.graph.edges.add(data.edges.map(e => {e.label = e.weight; return e}))

				this.story = data
			})

			io.on("connect", (arg) => {
				console.log("Connected: ", arg)
				io.emit("open", {id: program.id})
			})




			next({ program })
		},
		async activate(){
			state = {} // needed because had problems with the tracked vue state. //TODO: find a way to fix it

			let nodes = new vis.DataSet([
				{id:1, value: 1, label: 1},
				{id:2, value: 1, label: 2},
				{id:3, value: 3, label: 3}
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
			
		},
		
		deactivate(){
			io.disconnect()
		}

	},
	computed: {

	},
	data() {
		return {
			play: {
				'active': false
			},
			program: {
				name: "",
				graphs: [
					{
						nodes: [],
						edges: []
					}
				],
				story: []
			},
			network: {},
			step: 0
		}
	}
}

</script>

<style>
#logout2{
	padding: 0px;
	margin-left: auto;
	width: 140px;
	color: lightblue;
	font-size: 140%;
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
	white-space: nowrap;
}
#currentl{
	display: flex;
	margin-top: auto;
	margin-bottom: auto;
	text-shadow: 0 0 5px #666;
	padding-top: 0;
	padding-bottom: 0; 
	padding-left: 2vw;
	font-size: 230%;
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
	padding: 5px;
	box-sizing: border-box;
}

#hud2 .button{
	background-color: #3691b0;
	text-align: center;
	color: white;
	font-size: 130%;
	transition: all 0.2s ease-in;
	line-height: 30px;
	flex: 0 0 8vw;
	margin-left: 10px;
	white-space: nowrap;
}

#hud2 .button:hover{
	color: #666;
	transition: all 0.2s ease-in;
}

#hud2 .button:active{
	box-shadow: inset 0 0 10px #666;
	transition: all 0.2s ease-in;
}
#controls {
	transform: scale(0.7);
	/*padding-left: 50px;*/
	position: fixed;
	left: calc(50% - 100px);
	width: auto;
	bottom: 10px;
	display: flex;
	margin: auto;

}

#controls > * {
	/*display: inline-block;*/
}
#parent_step{
	display: flex;
	width: auto;
	height: 60px;
}
.stepcontrols {
	position: relative;
	width: 50px;
	height: 50px;
}
#playpause{
	height: 0;
	width: 0;
	transform: rotate(calc(360deg + 90deg));
	border-left: 30px solid transparent;
	border-right: 30px solid transparent;
	border-bottom: 45px solid #3691b0;
	margin-right: 15px;
	transition: transform 0.2s ease-in-out;
}
#playpause.active{
	height: 50px;
	transform: none;
	width: 10px;
	border-right: 10px solid #3691b0;
	border-left: 10px solid #3691b0;
	border-bottom: none;
	margin: 0px 30px 0px 15px;
}
#stepforward {
	margin-left: auto;
	border-right: 10px solid #3691b0; 
	border-bottom: 10px solid #3691b0;
	width: 30px; height: 30px;
	transform: rotate(-45deg);
}
#stepbackward {
	margin-left: auto;
	border-right: 10px solid #3691b0; 
	border-bottom: 10px solid #3691b0;
	width: 30px; height: 30px;
	transform: rotate(135deg);

}
#stepforward, #stepbackward {
	transition: all 0.2s ease-in-out;
	height: 31.5px;
}
#stepforward:active {
	transform: rotate(315deg);
}
#stepbackward:active{
	transform: rotate(calc(315deg + 180deg));
}



@media screen and (max-width: 750px) {
	#hud2 .button{
		background-color: #3691b0;
		text-align: center;
		color: white;
		font-size: 110%;
		transition: all 0.2s ease-in;
		line-height: 30px;
		flex: 0 0 5vw;
		margin-left: 10px;
		white-space: nowrap;
	}
		#currentl{
		display: flex;
		margin-top: auto;
		margin-bottom: auto;
		text-shadow: 0 0 5px #666;
		padding-top: 0;
		padding-bottom: 0; 
		padding-left: 2vw;
		font-size: 160%;
		color: white;
		font-weight: bold;
		line-height: 64px;
		text-align: left;
		transition: all 0.2s ease-in;
}
}
</style>