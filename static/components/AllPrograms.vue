<template>
<div id="up">
<h1>All programs view</h1>
<h3>My programs</h3>



<button id="create" class="button" v-on:click="add">Create program</button>
<br>
<button id="logout" class="button" v-on:click="logout">Logout</button>
<br>
<input id="text-create" type="text" v-model="name">
<div v-for="program in programs">
	<div>
		<a id="programl" v-link="{ name: 'program', params: { id: program._id } }">{{program.name}}, when: {{program.created}}, id: {{program._id}}</a>
		<button class="button" id="X">X</button>
	</div>
</div>
</template>

<script>
// console.log(list)
export default {
	methods: {  
		logout() {
   			this.$user.logout()
   			console.log("logout")
  		},
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
h3, h1 {
			font: 2em arial, serif;
            text-align: center;
            color: transparent;
            background: linear-gradient(#eee, #333);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 1px white;
            transition: text-shadow 0.3s;
            cursor: default;
}
h3:hover,h1:hover {
	 text-shadow: 0 0 2px white;
            color: black;
}
#up {
	margin-top: -25px;
	height: 100vh;
	width: 100vw;
	background-color: lightblue;
}
#create, #logout{
	display: block;
	margin: auto;
	text-align: center;
}
#create:focus, #logout:focus, #X:focus{
	outline: none;
}
#X{
	margin: auto;
	display: block;
	width: auto;
}
#programl{
	text-align: center;
	display: block;
	margin: auto;
}
</style>