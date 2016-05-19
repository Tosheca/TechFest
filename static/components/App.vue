<template>

<div id="app">
	<nav>
		<div class="right">
			<a v-link="{ path: '/' }">Home</a>

		</div>
		<div class="left">
			<a v-link="{ path: '/register' }">Register</a>
			<a v-link="{ path: '/login' }">Login</a>
		</div>

	</nav>
	<input v-model="username" v-on:keyup.enter="addUser(username, password)" placeholder="username">
	<input v-model="password" v-on:keyup.enter="addUser(username, password)" placeholder="password">


		<ul>
		<li v-for="user in users">
			<span>{{ user.name }} : {{user.pass}}</span>
			<button v-on:click="removeUser($index)">X</button>
		</li>
		</ul>

		

</div>

<router-view></router-view>


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
	#app {
		text-align: center;

	}

	ul {
		display: flex;

		justify-content: center;
		flex-direction: column;

	}

	nav {
		display: flex;

		width: 100vw;
		background-color: #3467af;
		
		justify-content: space-between;
	}

	nav div > a {
		padding: 10px;
		display: inline-block;
	}

	nav div > a:hover {
		background-color: red;
	}

	ul li {
		text-align: center;
		list-style: none;
	}
</style>