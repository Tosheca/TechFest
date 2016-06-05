<template> c

<div id="home">

<div id="pics">
	<img id="logo" src="/logo.png"></img>
	<img id="pic1" src="/csharp.png"></img>
	<img id="pic2" src="/graph.png"></img>


</div>

<div id="content">
	<p id="text">Visurithm is a Web application created in order to facilitate the workflow of students, teachers and programmers, in solving theoretical and practical problems associated with different types of algorithms. It connects with the user's algorithm using, provided by us, a C# Library (for now) and visualises it.
	</p>
	<div id="button_div">
	<a class="buttonss" id="signin" v-link="{ path: '/user/register' }">Sign Up</a>		
	<a class="buttonss" id="signup" v-link="{ path: '/user/' }">Sign In</a>
	</div>
</div>



</div>

</template>

<style>
@keyframes slideshow {
	0% {opacity: 1;}
	10%{opacity: 1;}
	20%{opacity: 1;}
	30%{opacity: 0;}
	40%{opacity: 0;}
	60%{opacity: 0;}
	70%{opacity: 0;}
	80%{opacity: 1;}
	90%{opacity: 1;}
	100%{opacity: 1;}
}
#pic1{
	width: auto;
	height: 99vh;
	max-width: 101vw;
	max-height: 100vh;
	z-index: 0;
	position: fixed;
	top: 0;
	opacity: 1;
	}
#pic2{
	width: auto;
	height: 100vh;
	max-width: 102vw;
	max-height: 100vh;
	z-index: 0;
	position: fixed;
	top: 0;
	animation: slideshow 12s infinite;
}
#button_div{
	display: flex;
	justify-content: center;
}
.buttonss {
	font-family: arial;
	display: block;
	font-size: 200%;
	height: 15%;
	border: none;
	margin-left: 20px;
	background-color: white;
	padding: 5px 5px;
	text-decoration: none;
	color: #6f93c3;
	transition: all 0.2s ease-in;
	box-shadow: 0 0 0px #666;
	cursor: pointer;
	width: 25%;
	text-align: center;
	white-space: nowrap;
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
	position: fixed;
	display: block;
	height: auto; 
    width: auto; 
    left: calc(50% - (192px*2.5));
    right: calc(50% - (192px*2.5));
    top: calc(35% - (108px*2.5));
    top: calc(35% - (108px*2.5));
    /*Design made by Viktor Velev.*/
    margin-top: -5vh;
    max-width: calc(192px * 5); 
    max-height: calc(108px * 5);
    z-index: 1;

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
	height: 315px;
	width: auto;
	margin-top: -5vh;
}
#text{
	text-shadow: 0 0 5px #666;
	font-size: 130%;
	display: block;
	color: white;
	padding-top: 1vw;
	padding-right: 15vw;
	padding-left: 15vw;
	overflow: inherit;
	transition: all 0.3s ease-in-out;
}
@media screen and (max-width: 750px){
	#text{
		font-size: 100%;
	}
	#pic1, #pic2 {

	}
}
@media screen and (max-height: 700px){
	#text{
		font-size: 100%;
	}
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


