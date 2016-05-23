<template>
<h1>All programs view</h1>
<h3>My programs</h3>
<nav v-for="program in allPrograms" style="width:100px;">

<div><a type="button" id="list" v-link="{ path: '/currentprogram' }">{{program.programName}}</a></div>

</nav>
</template>
<script>

export default {
	methods: {  
		
	},
	data() {
		return {
 
 			allPrograms: [{programName: "First"}, {programName: "Second"}, {programName: "Third"}]
		}
	}
}

</script>
-->
<style>
 h1, h3, nav{
 	text-align: center;
}
#list {
width: ;
	box-shadow: 0 0 5px #666;
	color: white;
	text-decoration: none;
	background-color: lightblue;
}
#list:hover{
	box-shadow: 0 0 10px #FFF;
}
#list:active{
	box-shadow: 0 0 0 #666;
}
#list:visited {
	color: white;
}
</style>