<template>
	<fieldset class="form">
		<legend>Register</legend>
		<validator name="validation">
		 
			<input type="text" v-model="user.name" placeholder="Username" @modified="onUsernameModified" v-validate:usernamevalidation="{ minlength: 8 , maxlength: 16}">
			<div v-if="usernameModified == true">
    			<span class="validation" v-if="$validation.usernamevalidation.minlength">Your username is too short.</span>
    			<span class="validation" v-if="$validation.usernamevalidation.maxlength">Your username is too long.</span>
    		</div>
			<input type="text" v-model="user.email" placeholder="E-mail">
			<input type="password" v-model="user.pass" placeholder="Password" @modified="onPasswordModified" v-validate:passwordvalidation="{ minlength: 8 , maxlength: 16}">
			<div v-if="passwordModified == true">
				<span class="validation" v-if="$validation.passwordvalidation.minlength">Your password is too short.</span>
    			<span class="validation" v-if="$validation.passwordvalidation.maxlength">Your password is too long.</span>
    		</div>
			<input type="password" v-model="user.passrep" placeholder="Confirm Password"
			
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
			},
			onUsernameModified(){
				console.log("modified")
				this.usernameModified = true
			},
			onPasswordModified(){
				console.log("modified")
				this.passwordModified = true
			}
		},
		data() {
			return {
	 			user: {
	 				name: "",
	 				email: "",
	 				pass: "",
	 				passrep: ""
	 			},
	 			usernameModified: false,
	 			passwordModified: false 
	 			
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