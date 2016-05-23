<template>
<h1>All programs view</h1>
<h3>My programs</h3>


<nav v-for="program in programs">

<div><a v-link="{ name: 'program', params: { id: program._id } }">{{program.name}}, when: {{program.created}}, id: {{program._id}}</a></div>

</nav>
<button id="button1" v-on:click="add">Create program</button>
<input id="text-create" type="text" v-model="name">

</template>
<script>
// console.log(list)
export default {
	methods: {  
		async add() {
			let res = await this.$programs.create({name: this.name})
			let list = await this.$programs.getList()
			this.programs = list
			console.log(res)
		}
	},
	route: {
		async data({ next }) {
			let list = await this.$programs.getList()
			next({programs: list})
		}
	},
	data() {
		return {
			programs: [],
			name: ""
		}
	}
}

</script>
<style>
 h1, h3, nav{
 	text-align: center;
}
#button1 {
	width: 100px;
	color: lightblue;
}
</style>