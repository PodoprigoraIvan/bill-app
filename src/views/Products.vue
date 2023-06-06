<script>

export default {
    data() {
        return {
            newName: "",
            editingId: 0
        }
    },

    computed: {
        persons(){
            return this.$store.state.persons;
        },
        products(){
            return this.$store.state.products;
        }
    },

    methods: {

        onSelectChange(event, productId){
            this.$store.dispatch('editProductPayer', {id: productId, payerId: event.target.value});
        },

        editPrice(productId, price){
            this.$store.dispatch('editProductPrice', {id: productId, price});
        },

        editName(productId, name){
            this.$store.dispatch('editProductName', {id: productId, name});
        }
    }

}
    
</script>

<template>
    <h1>Добавление блюд</h1>

    <p>Добавить блюдо 
        <button type="button" class="btn btn-secondary" @click="add()">
            <i class="bi bi-plus-circle"></i>
        </button>
    </p>

    <li v-for="product in products" :key="product.id">
        <p>Название: <input v-model="product.name" @input="editName(product.id, $event.target.value)"></p>
        <p>Цена: <input type="number" v-model="product.price" @input="editPrice(product.id, $event.target.value)"></p>
        <p>Кто оплатил: 
            <select v-model="product.payerId" @change="onSelectChange($event, product.id)">
                <option v-for="{name, id} in persons" :value="id">{{name}}</option>
            </select>
        </p>
    </li>
    
</template>

<style scoped lang="sass">

li
        list-style: none

</style>