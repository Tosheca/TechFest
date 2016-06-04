<template>

<div id="home">

<div id="pics">
	<img id="logo" src="/logo.png"></img>
	<img id="pic1" src="/csharp.png"></img>
	<img id="pic2" src="/graph.png"></img>


</div>

<div id="content">
	<p id="text">Visurithm e Интернет приложение създадено, с цел да улесни работата на ученици, студенти, преподаватели, програмисти и др. при решаване на теоретични и практически задачи, свързани с различни видове алгоритми. 
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
#logo {
	z-index: 1;
}
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
	position: fixed;
	padding-top: 0;
	display: block;
	height: auto; 
    width: auto; 
    left: 21%;
    right: 21%;
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


