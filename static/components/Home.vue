<template>

<div id="home">

<div id="pics">

	<img id="logo" src="/logo.png"></img>

</div>

<div id="content">
	<p id="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
	cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
	proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
	<div id="button_div">
	<a class="buttonss" id="signin" v-link="{ path: '/user/register' }">Sign Up</a>		
	<a class="buttonss" id="signup" v-link="{ path: '/user/' }">Sign In</a>
	</div>
</div>



</div>

</template>

<style>
#button_div{
	display: flex;
	justify-content: center;
}
.buttonss {
	font-family: arial;
	display: block;
	font-size: 150%;
	height: 5vh;
	border: none;
	margin-left: 10px;
	background-color: white;
	padding: 5px 5px;
	text-decoration: none;
	color: #6f93c3;
	transition: all 0.2s ease-in;
	box-shadow: 0 0 0px #666;
	cursor: pointer;
	width: 20%;
	text-align: center;
	}
.buttonss:hover{
	background-color: white;
	color: #666;
	box-shadow: 0 0 8px #666;
	}

.buttonss:active {
	background: lightblue;
	transition: all 0.2s ease-in;
}
#signin, #signup {
	margin-top: 10px;
	display:block;
	text-align: center;
}
#logo {
	padding-top: 0;
	display: flex;
	height: auto; 
    width: auto; 
    margin-left: auto;
    margin-right: auto;
    margin-top: -5vh;
    max-width: calc(192px * 4); 
    max-height: calc(108px * 4);
}
#home {
	width: auto;
	height: auto;
}
#pics {
	width: auto;
	height: 70vh;
}
#content {
	position: fixed;
	background-color: #76bdd5;
	height: 35vh;
	width: auto;
}
#text{
	text-shadow: 0 0 1px #666;
	font-size: 1.3em;
	display: block;
	color: white;
	padding-top: 1vw;
	padding-right: 10vw;
	padding-left: 10vw;

}
</style>
<script>
export default {

	methods: {
			
	},
	data() {
		return {

		}
	}
}
</script>


