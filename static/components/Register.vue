<template>
Register
<button v-on:click="submit">Submit</button>

</template>


<script>

export default {
	methods: {  
		submit(){
			this.$parent.addUser("Hello", "World")
		}
	},
	data() {
		return {
 
		}
	}
}

</script>

<style>

</style>