<template>
Login
<button v-on:click="submit" v-link="{ path: '/allprograms' }">Submit</button>
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