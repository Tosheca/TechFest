<template>
	<fieldset class="form">
		<legend>Register</legend>
		<validator name="validation">
		 
			<input type="text" v-model="user.name" placeholder="Username" v-validate:usernamevalidation="{ minlength: 8 , maxlength: 16}">
			<div v-if="this.user.name != ''">
    			<span class="validation" v-if="$validation.usernamevalidation.minlength">Your username is too short.</span>
    			<span class="validation" v-if="$validation.usernamevalidation.maxlength">Your username is too long.</span>
    		</div>
			<input type="text" v-model="user.email" placeholder="E-mail">
			<input type="password" v-model="user.pass" placeholder="Password" v-validate:passwordvalidation="{ minlength: 8 , maxlength: 16}">
			<div v-if="this.user.pass != ''">
				<span class="validation" v-if="$validation.passwordvalidation.minlength">Your password is too short.</span>
    			<span class="validation" v-if="$validation.passwordvalidation.maxlength">Your password is too long.</span>
    		</div>
			<input type="password" v-model="user.passrep" placeholder="Confirm Password" v-validate:passwordrepvalidation="{ minlength: 8 , maxlength: 16}">
				<span class="validation" v-if="this.user.pass != this.user.passrep">Passwords don't match.</span>
			
		</validator>
		<div class="row inline">
			<a class="button" v-link="{ path: '/user/' }">Back</a>
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
.validation{
	padding-left: 10px;
	font-size: 90%;
	font-family: arial;
	color: red;
	text-shadow: 0 0 1px #666;

}
</style>