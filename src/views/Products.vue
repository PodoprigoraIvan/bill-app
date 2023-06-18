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
        if (this.persons.length > 0) {
            this.newProductPayerId = this.persons[0].id;
        }
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
    <div v-if="persons.length > 1">
        <button type="button" class="btn btn-secondary centered" @click="add()">
            Добавить блюдо
            <i class="bi bi-plus-circle"></i>
        </button>
        <TransitionGroup name="list" tag="ul" appear>
            <li v-for="product in products" :key="product.id">
                <div class="name-and-price">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">Название</span>
                        </div>
                        <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="product.name" @input="editName(product.id, $event.target.value)">
                    </div>

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">Цена</span>
                        </div>
                        <input type="number" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" min="1" v-model="product.price" @input="editPrice(product.id, $event.target.value)">
                    </div>
                </div>

                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Кто оплатил</span>
                    </div>
                    <select class="form-select" v-model="product.payerId" @change="onSelectChange($event.target.value, product.id)">
                        <option v-for="{name, id} in persons" :value="id">{{name}}</option>
                    </select>
                </div>
                <div class="input-group-prepend">
                    <span class="input-group-text">Кто ел:</span>
                </div>
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
        </TransitionGroup>
    </div>

    <p v-else class="warningMessage">Сначала добавьте нескольких <router-link to="/persons">людей</router-link></p>
    
</template>

<style scoped lang="sass">

li
    list-style: none
    margin-top: 10px
    padding: 10px
    border-radius: 5px

label
    margin-right: 8px

.name-and-price
    display: flex
    justify-content: space-between

.input-group
    width: 24vw

span
    width: 7vw

p
    font-size: 1.3rem

.btn
    margin-top: 10px

</style>