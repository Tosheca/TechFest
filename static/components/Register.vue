<template>
	<fieldset class="form">
		<legend>Register</legend>
		<input type="text" v-model="user.name" placeholder="Username">
		<input type="text" v-model="user.email" placeholder="E-mail">
		<input type="password" v-model="user.pass" placeholder="Password">
		<input type="password" v-model="user.passrep" placeholder="Confirm Password">
		
		<div class="row inline">
			<a v-link="{ path: '/user/' }">Back</a>
			<a v-on:click="submit" class="button">Submit</a>
		</div>

	</div>
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
</script>

<style>
</style>