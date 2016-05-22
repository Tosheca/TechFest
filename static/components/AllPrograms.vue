<template>

<h1>All programs view</h1>
<h3>My programs</h3>
<nav v-for="program in allPrograms" style="width:100px;">

<div><a v-link="{ path: '/currentprogram' }">{{program.programName}}</a></div>

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

<style>

</style>