<template>

<div id="app">
	<input v-model="newUsername" v-on:keyup.enter="addUser" placeholder="username">
	<input v-model="newPassword" v-on:keyup.enter="addUser" placeholder="password">
  	<ul>
    <li v-for="user in users">
      <span>{{ user.name }}:{{user.pass}}</span>
      <button v-on:click="removeUser($index)">X</button>
    </li>
  	</ul>
  	

</div>

</template>


<script>

export default {

	methods: {
    	
      	addUser: function() {
      		var name = this.newUsername.trim()
      		var pass = this.newPassword.trim()

      		if (name != "" && pass != ""){

      			this.users.push({name: name, pass: pass})
      			this.newUsername = ""
      			this.newPassword = ""
      		}

     	 },

     	removeUser: function(index) {
      		this.users.splice(index, 1)
   		}
    
  	},

	data() {
		return {
			newUsername: "", 
			newPassword: "",
			users: [],   
		}
	}
}
</script>

<style>

	#app{
		text-align: center;
	}


</style>