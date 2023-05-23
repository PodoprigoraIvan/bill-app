<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <navigation>
		<router-link type="button" class="btn btn-primary" to="/">Home</router-link>
		<router-link to="/about">About</router-link>
		<router-link to="/persons">Persons</router-link>
		<router-link to="/products">Products</router-link>
	</navigation>
	<main>
		<router-view></router-view>
	</main>
</template>

<style scoped lang="sass">
  navigation
    margin: 10vh
  a
    margin: 10vh
</style>
