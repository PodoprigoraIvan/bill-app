<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <navigation>
		<router-link type="button" class="btn btn-primary" to="/">Главная</router-link>
		<router-link type="button" class="btn btn-primary" to="/persons">Добавить людей</router-link>
		<router-link type="button" class="btn btn-primary" to="/products">Добавить блюда</router-link>
    <router-link type="button" class="btn btn-primary" to="/result">Итоговый рассчет</router-link>
	</navigation>
	<main>
		<router-view></router-view>
	</main>
</template>

<style scoped lang="sass">
  navigation
    display: inline-block
    width: 60vw
    background-color: #C1CFF5
    border-radius: 3vh
    margin-left: 1vh
    margin-top: 1vh
  a
    margin-left: 4vh
    margin-top: 2vw
    margin-bottom: 2vw
  main
    padding: 1vw

</style>
