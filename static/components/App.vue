<template>



<div id="app">
	<router-view></router-view>


	<!-- <nav>
		<div class="right">
			<a v-link="{ path: '/' }">Home</a>
		</div>

		<div class="left">
			<a v-link="{ path: '/login' }">Login</a>
		</div>
	</nav> -->

	<!-- 


		<ul>
			<li v-for="user in users">
				<span>{{ user.name }} : {{user.pass}}</span>
				<button v-on:click="removeUser($index)">X</button>
			</li>
		</ul>
-->
</div>




</template>


<script>

export default {

	methods: {
			addUser: function(name, pass) {
				var name = name.trim()
				var pass = pass.trim()

				if (name != "" && pass != ""){
					this.users.push({name, pass})
					this.username = ""
					this.password = ""
				}
			 },

			removeUser: function(index) {
				this.users.splice(index, 1)
			}
		},

	data() {
		return {
			username: "", 
			password: "",
			users: [],   
		}
	}
}
</script>

<style>

</style>