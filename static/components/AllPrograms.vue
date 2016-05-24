<template>
<div id="up">
<nav id="top">

<h3>My programs</h3> 
<p class="UI">Welcome, {{username}}</p>
<button id="logout" class="button" v-on:click="logout">Logout</button>
</nav>
<nav id="nav2">  
<button id="create" class="button" v-on:click="add">Create a program</button>
<input id="text-create" type="text" maxlength="18" v-model="name">
</nav>


<div v-for="program in programs" class="programs" track-by="_id">
<div class="program">
	<a id="programl" v-link="{ name: 'program', params: { id: program._id } }"> 
	<span class="name">{{program.name}}<span>, 
	<span class="when">{{program.created}}</span></a>
	<button class="button close" v-on:click="remove(program._id, $index)">X</button>
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
			console.log(res)
			this.programs.push(res.res)

		},
		async remove(id, index){
			try{
				let res = await this.$programs.remove(id)
				this.programs.splice(index, 1)
			}catch(error){

			}
			//let list = await this.$programs.getList()
			
		}
	},
	route: {
		async data({ next }) {
			let list = await this.$programs.getList()
			next({programs: list, username:  this.$user.status.name})
		}
	},
	data() {
		return {
			programs: [
				{ _id: "" }
			],
			name: "",
			username: ""
		}
	}
}

</script>
<style> 
.name{
	columns: 2;
}
#app{
	height: 100%;
	width: 100%;
	transition: all 0.1s ease-in;
}
.programs{
	background-color: lightblue;
	padding-top: 1vh;
	padding-bottom: 1vh;
	transition: all 0.2s ease-in;
}
.UI{
	color: white;
	font-size: 1.5em;
	margin-left: auto;
	margin-top: auto;
	margin-bottom: auto;
	margin-right: 1%;
}
#full {

	display: block;
	background-attachment: scroll;
	position: absolute;
	color: lightblue;
	height: 100%;
	width: 100% ;
}
#top {
	font-family: arial;
	cursor: default;
	height: 6.5vh;
	background-color: #63b4cf;
	display: flex;
    justify-content: center;
    align-content: center;
}
#programl{
	color: white;
	text-decoration: none;
	text-align: center;
	display: flex;
	margin: auto;
}
.program {
	background-color: #63b4cf;
	font-family: arial;
	padding: 5px;
	width: 25vw;
	display: flex;
	margin: auto;
    justify-content: center;
    transition: all 0.15s ease-in;
}
.program:hover{
	background-color: #666;
	box-shadow: 0 0 15px #666;
}
.program:active{
	box-shadow: 0 0 0 #666;
}
#nav2 {
	padding-top: 50px;
    display: flex;
    justify-content: center;
    align-content: center;
}
h3 {
	margin-top: -0.5vh;
	text-align: left;
    margin-bottom: 0px;
    margin-left: 0px;
    margin-right: 0px;
    text-shadow: 0 0 5px #666;
    padding-top: 0;
    padding-bottom: 0; 
    padding-left: 2vw;
    font-size: 3em;
    color: white;
    font-weight: bold;
    line-height: 64px;
}
#up {
	height: 100vh;
	width: 100vw;
	background-color: lightblue;
}
#create {
	width: 250px;
	font-size: 1.2em;
	height: 40px;
	display: block;
	box-sizing: border-box;
	text-align: center;
}
#create:focus, #logout:focus, #X:focus{
	outline: none;
}
.close {
	height: 25px;
	width: 25px;
	padding: 7px;
	font-size: 1em;
	line-height: 5px;
	text-align: center;
	margin: auto;
	display: flex;
	width: auto;
	border-radius: 25px;
}
.close:hover{

	color: red;
	box-shadow: 0 0 2px red;
}
#text-create{
	font-size: 1.2em;
	height: 40px;
	margin-left: 10px;
	margin-right: 10px;
	margin-top: 0px;
	margin-bottom: 0px;
	display: flex;
	box-shadow: none;
	box-sizing: border-box;
	transition: all 0.25s ease-in;
}
input#text-create:focus {
    box-shadow: inset 0 0 5px #333;
}
#logout{
	width: 7%;
	color: lightblue;
	font-size: 1.5em;
	background-color: #63b4cf;
}
#logout:hover{
	color: white;
	box-shadow: 0 0 60px #666;
}
</style>