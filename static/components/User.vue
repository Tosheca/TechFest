<template>
<div>
	<div id="left"><!-- logo -->
		<a v-link="{ path: '/' }">
		<img id="logon" src="/logo2.png"/>
		</a>
	</div>
	<div id="right">
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
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
		methids: {
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
@media screen and (min-width: 1000px) {
	#logon {
		position: fixed;
		height: auto;;
	    width: auto;
	    margin-top:8vh;
	    margin-left: 3vw;
	    max-width: 100vh; 
	    max-height: 100vw;
	    transition: all 0.3s ease-in-out;
	    z-index: 2;
	}
	#right {
		border-left: 65vh solid transparent;
		border-right: 0vh solid transparent;
		border-bottom: 100vh solid lightblue;
		height: 0;
		width: 37%;
		z-index: 0;
		position: fixed;
		right: 0px;
		transition: all 0.2s ease-in-out;
	}

	#right .content {
		display: flex;
		align-items: center;
		height: 100vh;
	}

	#right .content .form {
		display: flex;
		flex-direction: column;

		border-color: white;
		border-style: solid;
		transition: all 0.4s ease-in-out;
		border-radius: 0px;

	}
	
	#right .content .form legend {
		color: white;
		text-align: center;
		font-size: 1.5em;
	}
	
	input[type=text],input[type=password] {
		font-size: 15px;
		background: white; 
		border: 1px double #DDD; 
		box-shadow: inset 0 0 5px #333; 
		color: #666; 
		outline: none; 
		height: 25px; 
		width: 350px; 
		text-align: left;
		display: block; 
		margin: 10px auto 10px auto;
		padding-left: 10px;
	}

	.button {
		border: none;
		background-color: white;
		padding: 5px 15px;
		text-decoration: none;

		color: #6f93c3;
		transition: all 0.2s ease-in;
		box-shadow: 0 0 0px #666;
		cursor: pointer;
		width: 20%;
		text-align: center;
	}

	.button:hover{
		background-color: white;
		color: #666;
		box-shadow: 0 0 8px #666;
	}

	.button:active {
		background: lightblue;
		transition: all 0.2s ease-in;
	}
} 

@media screen and (max-width: 1099px){
	#logon {
		position: fixed;
		height: auto;;
	    width: auto;
	    margin-top: -5vh;
	    max-width: 0;
	    max-height: 0;
	    z-index: -1;
	    transition: all 0.2s ease-in-out;
	}
	#right {
		border-left: 65vh solid transparent;
		border-right: 0vh solid transparent;
		border-bottom: 100vh solid lightblue;
		height: 0;
		width: 37%;
		z-index: 0;
		position: fixed;
		right: 0px;
		width: 100vw;
		transition: all 0.2s;

	}
	#right .content {
		display: flex;
		align-items: center;
		height: 100vh
	}

	#right .content .form {
		
		flex-direction: column;
		border-color: white;
		border-style: solid;
		transition: all 0.2s ease-in-out;
		border-radius: 0px;
		margin-left: auto;
		margin-right: auto;

	}

	#right .content .form legend {
		color: white;
		text-align: center;
		font-size: 1.5em;
	}

	input[type=text],input[type=password] {
		font-size: 15px;
		background: white; 
		border: 1px double #DDD; 
		box-shadow: inset 0 0 5px #333; 
		color: #666; 
		outline: none; 
		height: 25px; 
		width: 350px; 
		text-align: left;
		display: block; 
		margin: 10px auto 10px auto;
		padding-left: 10px;
	}

	.button {
		border: none;
		background-color: white;
		padding: 5px 15px;
		text-decoration: none;

		color: lightblue;
		transition: all 0.2s ease-in;
		box-shadow: 0 0 0px #666;
		cursor: pointer;
		width: 20%;
		text-align: center;
	}

	.button:hover{
		background-color: white;
		color: #666;
		box-shadow: 0 0 8px #666;
	}
	
	.button:active {
		background: lightblue;
		transition: all 0.2s ease-in;
	}

}
</style>