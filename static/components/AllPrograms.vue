<template>
<div id="up">
<nav id="top">

<h3>My programs</h3> 
<p class="UI">Welcome, {{username}}</p>
<button id="logout" class="button" v-on:click="logout">Logout</button>
</nav>
<nav id="nav2">  
<button id="create" class="button" v-on:click="add">Create a program</button>
<input id="text-create" type="text" maxlength="27" v-model="name" placeholder="Program name">
</nav>


<div class="programs">
<div class="program"  v-for="program in programs" track-by="id">
	<a class="programl" v-link="{ name: 'program', params: { id: program.id } }"> 
	<span class="name">{{program.name}}</span>
	<span class="when">{{fomrtedDate(program.created)}}</span></a>
	<button class="button close" v-on:click="remove(program.id, $index)">X</button>
</div>
</div>


</template>

<script>

import moment from "moment"
// console.log(list)
export default {
	methods: {  
		logout() {
			this.$user.logout()
			this.$router.go({ name: "user" })

			console.log("logout")
		},
		async add() {
			let program = await this.$programs.create({name: this.name})
			console.log(program)
			if(program){
				this.programs.unshift(program)
				this.name = ""
			}else{

			}
		},
		async remove(id, index){
			try{
				let res = await this.$programs.remove(id)
				this.programs.splice(index, 1)
			}catch(error){

			}
			//let list = await this.$programs.getList()
			
		},
		fomrtedDate(date){
			return moment(new Date(date)).fromNow()
		}
	},
	route: {
		async data({ next }) {
			let list = await this.$programs.getList()
			console.log(list)
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
	flex: 5;
}

.when{
	flex: 2.1;
	text-align: right;
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
	height: 65px;
	background-color: #63b4cf;
	display: flex;
	justify-content: center;
	align-content: center;
}

.programl{
	color: white;
	text-decoration: none;
	text-align: left;
	display: flex;
	width: 93%;
}
.program { /*result*/
	background-color: #63b4cf;
	font-family: arial;
	padding: 5px;
	width: 591.3px;
	display: flex;
	margin-top: 1vh;
	margin-bottom: auto;
	margin-right: auto;
	margin-left: auto;
	padding-right: 15px;
	justify-content: center;
	transition: all 0.15s ease-in;
	
	line-height: 40px;
    padding-left: 15px;
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
	padding: 7px;
	font-size: 1em;
	line-height: 5px;
	text-align: center;
	margin: auto;
	display: flex;
	width: auto;
	border-radius: 25px;
	flex: 0 0 25px;
	margin-left: 17px;
}
.close:hover{
	background-color: #cc0000;
	color: white;
	box-shadow: 0 0 2px red;
}
.close:active{
	outline: none;
}
#text-create{
	font-size: 1.2em;
	height: 40px;
	margin-left: 10px;
	margin-right: 0px;
	margin-top: 0px;
	margin-bottom: 0px;
	display: flex;
	box-shadow: none;
	box-sizing: border-box;
	transition: all 0.25s ease-in;
	width: 360px;
}
input#text-create:focus {
	box-shadow: inset 0 0 5px #333;
}
#logout{
	color: lightblue;
	font-size: 130%;
	background-color: #63b4cf;
	flex: 0 0 100px;
}
#logout:hover{
	color: white;
	box-shadow: 0 0 60px #666;
}
</style>