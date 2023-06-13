<script>

export default {
    data() {
        return {
            newProductName: "",
            newProductPrice: "",
            newProductPayerId:"",
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

    mounted(){
        if (this.persons.length > 0)
            this.newProductPayerId = this.persons[0].id;
    },

    methods: {
        add(){
            this.$store.dispatch('addProduct', {name: "", price: "1", payerId: this.persons[0].id});
        },

        remove(id){
            this.$store.dispatch('removeProduct', {id});
        },

        onSelectChange(payerId, productId){
            this.$store.dispatch('editProductPayer', {id: productId, payerId: payerId});
        },

        onCheckBoxChange(productId, consumerId, checked){
            if (checked)
                this.$store.dispatch('addConsumerToProduct', {id: productId, consumerId: consumerId});
            else
                this.$store.dispatch('deleteConsumerFromProduct', {id: productId, consumerId: consumerId});
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
    <div v-if="persons.length > 0">
        <p>Добавить блюдо 
            <button type="button" class="btn btn-secondary" @click="add()">
                <i class="bi bi-plus-circle"></i>
            </button>
        </p>

        <li v-for="product in products" :key="product.id">
            <p>Название: <input v-model="product.name" @input="editName(product.id, $event.target.value)"></p>
            <p>Цена: <input type="number" min="1" v-model="product.price" @input="editPrice(product.id, $event.target.value)"></p>
            <p>Кто оплатил: 
                <select v-model="product.payerId" @change="onSelectChange($event.target.value, product.id)">
                    <option v-for="{name, id} in persons" :value="id">{{name}}</option>
                </select>
            </p>
            <p>Кто ел:</p>
            <div class="consumers">
                <label v-for="person in persons" class="btn btn-outline-primary">
                    <input 
                        :checked="product.consumersIds.find(id => id === person.id)"
                        @change="onCheckBoxChange(product.id, person.id, $event.target.checked)"
                        type="checkbox" autocomplete="off"> 
                        {{person.name}}
                </label>
            </div>
            <button type="button" class="btn btn-secondary" @click="remove(product.id)">
                <i class="bi bi-trash"></i>
            </button>
        </li>
    </div>

    <p v-else class="noPeopleMessage">Сначала добавьте <router-link to="/persons">людей</router-link></p>
    
</template>

<style scoped lang="sass">

#newProduct
    margin-bottom: 5vh

li
    list-style: none

label
    margin-right: 10px

.noPeopleMessage
    border-radius: 3vh
    background-color: #DA4545
    font-size: large
    color: white
    padding: 3vh

a
    color: #A7CDAC

</style>