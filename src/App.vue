<script setup>
</script>

<template>
    <navigation>
        <router-link type="button" class="btn btn-primary" to="/">Информация о приложении</router-link>
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
    display: flex
    justify-content: space-between
    width: 50vw
    background-color: #C1CFF5
    border-radius: 5px
    margin: 1vh auto 1vh auto
    padding: 10px

main
    width: 50vw
    margin-left: auto
    margin-right: auto

a
    margin: 0.5vw
    font-size: 1.3vw

</style>
