<template>

	<fieldset class="form">
		<legend>Login</legend>
		<input type="text" v-model="user.name" placeholder="Username">
		<input type="password" v-model="user.pass" placeholder="Password">
		<div v-if="!success">
			Wrong username or password.
		</div>
		<div class="row inline">
			<a id="register" class="button" v-link="{ path: '/user/register' }">Register</a>
			<a v-on:click="submit" class="button">Submit</a>
		</div>

	</fieldset>
</template>


<script>

export default {
	methods: {  
		async submit(){
			let success = await this.$user.login(this.user)
			console.log(success)
			if(success){
				this.$router.go({ name: "programs" })
			}else{
				this.success = false
			}
			console.log(this.$parent)
		}
	},
	data() {
		return {
			user: {
				name: "",
				pass: ""
			},
			success: true
		}
	}
}

</script>

<style>
.row {
	display: flex;
	justify-content: space-around;
}
.inline > * {
	padding: 5px 15px;
}
</style>