<template>

<div id="app">
	<h1>Hello {{name}}</h1>
	<input v-model="name">
</div>

</template>


<script>

export default {
	data() {
		return {
			name: "TechFest"
		}
	}
}
</script>

<style>
	#app{
		text-align: center;
	}

</style>