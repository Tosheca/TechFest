<template>

<h1>Current program: {{program.name}}</h1>
<nav>
	<div>
		<a v-on:click="submit">Submit</a>
	</div>
</nav>

<span>{{clicked}}</span>

</template>


<script>

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
		}
	},
	data() {
		return {
 
			clicked: ""
		}
	}
}

</script>

<style>
