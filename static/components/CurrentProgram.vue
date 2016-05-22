<template>

<h1>Current program view</h1>
<nav>
	<div>
		<a v-on:click="submit()">Submit</a>
		</div>
</nav>

<span>{{clicked}}</span>

</template>


<script>

export default {
	methods: {  
		submit(){

			clicked = "smth1"
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
