<template>
	<fieldset class="form">
		<legend>LOG-IN</legend>
		<input type="text" v-model="username" placeholder="Username">
		<input type="text" v-model="password" placeholder="Password">
		<div class="row inline">
			<a v-link="{ path: '/register' }">Register</a>
			<a v-on:click="submit" class="button">Submit</a>
			
		</div>

	</div>
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
	.row {
		display: flex;
		justify-content: space-around;
	}

	.inline > * {
		padding: 5px 15px;
	}
</style>