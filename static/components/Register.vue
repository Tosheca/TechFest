<template>
Register
<button v-on:click="submit">Submit</button>

</template>


<script>
	export default {
		methods: {  
			submit(){
				this.$user.register(this.user)
			}
		},
		data() {
			return {
				user: {
					name: "",
					email: "",
					pass: "",
					passrep: ""
				}
			}
		}
	}
}

</script>

<style>

</style>