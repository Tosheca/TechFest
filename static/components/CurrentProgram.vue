<template>

<h1>Current program: {{program.name}}</h1>
<nav>
	<div>
		<a v-on:click="submit">Submit</a>
	</div>
</nav>

<div id="network"  v-el:vis-container></div>

<span>{{clicked}}</span>

</template>


<script>

import vis from "vis"
var options = {
    nodes: {
        scaling: {
            min: 16,
            max: 32
        }
    },
    edges: {
        color: "#777",
        smooth: false
    },
    physics: {
        barnesHut: {
            gravitationalConstant: -30000
        },
        stabilization: {
            iterations: 3000
        }
    }
}

export default {
	methods: {  
		submit(){
			this.clicked = "smth1"
		}
	},
	route: {
		async data({ next }) {
			let program = await this.$programs.getId(this.$route.params.id)
			console.log(program)
			next({ program })
		},
		async activate(){
			let nodes = new vis.DataSet([
				{id:1, value: 1},
				{id:2, value: 12},
				{id:3, value: 3}
			])

			let edges = new vis.DataSet([
				{id:1, from:1, to: 2},
				{id:2, from:1, to: 3},
				{id:3, from:2, to: 3}
			])

			window.d = { nodes, edges }
			this.graph = { nodes, edges }
			this.network = new vis.Network(this.$els.visContainer, { nodes, edges }, options)
			
			window.n = this.network
		}
	},
	data() {
		return {
 			graph: {
 				nodes: [],
 				edges: []
 			},
 			network: {},
			clicked: ""
		}
	}
}

</script>

<style>
	#network {
		height: 80vh
	}	

	.vis-network {
		height: 80vh

	}

	.vis-network canvas {
		height: 80vh
	}
</style>