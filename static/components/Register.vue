<template>
	<fieldset class="form">
		<legend>Register</legend>
		<input type="text" v-model="username" placeholder="Username">
		<input type="text" v-model="email" placeholder="E-mail">
		<input type="text" v-model="password" placeholder="Password">
		<input type="text" v-model="passwordRepeat" placeholder="Confirm Password">
		
		<div class="row inline">
			<a v-link="{ path: '/' }">Back</a>
			<a v-on:click="submit" class="button">Submit</a>
		</div>

	</div>
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