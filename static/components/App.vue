<template>

<div id="app">
	

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
		color: white;

		padding: 10px;
		display: inline-block;
		width: 80px;
		text-decoration: none;
	}

	nav div > a:hover {
		background-color: #4077bf;
	}

	ul li {
		text-align: center;
		list-style: none;
	}
</style>