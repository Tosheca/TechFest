<template>

<div id="app">
	
<router-view></router-view>

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