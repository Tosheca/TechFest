<template>
	Login
	<button v-on:click="submit">Submit</button>
</template>

<script>
	export default {
		methods: {  
			submit(){
				console.log(this.$parent)
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