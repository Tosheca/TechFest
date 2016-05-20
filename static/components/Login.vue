<template>
	<fieldset class="form">
		<legend>Login</legend>
		<input type="text" v-model="user.name" placeholder="Username">
		<input type="password" v-model="user.pass" placeholder="Password">
		<div class="row inline">
			<a v-link="{ path: '/user/register' }">Register</a>
			<a v-on:click="submit" class="button">Submit</a>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {  
			submit(){
				this.$user.login(this.user)
				console.log(this.$parent)
			}
		},
		data() {
			return {
	 	 		user: {
	 				name: "",
	 				pass: ""
	 			}
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