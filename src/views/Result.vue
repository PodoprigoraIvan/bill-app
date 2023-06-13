<script>

export default {
    data() {
        return {
            debts: {},
            debtsFinalList: [],
            readyToGetResult: false
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
        if (this.persons.length > 1 && this.products.length > 0){
            this.readyToGetResult = true;
            this.persons.forEach(person => {
                this.debts[person.id] = {};
                let curObj = this.debts[person.id];
                this.persons.forEach(person => {
                    curObj[person.id] = 0;
                });
            });
            this.products.forEach(product => {
                product.consumersIds.forEach(consumerId => {
                    this.debts[product.payerId][consumerId] += product.price / product.consumersIds.length;
                    this.debts[consumerId][product.payerId] -= product.price / product.consumersIds.length;
                });
            });
            for (let payerId in this.debts) {
                let values = this.debts[payerId];
                let debtorsList = [];
                for (let debtorId in values) {
                    if (+values[debtorId] > 0){
                        debtorsList.push({
                            name: this.persons.find(person => person.id === +debtorId).name,
                            summ: values[debtorId]
                        });
                    }
                }
                console.log("LIST1:",debtorsList);
                if (debtorsList.length > 0) {
                    this.debtsFinalList.push({
                        name: this.persons.find(person => person.id === +payerId).name,
                        debtorsList: debtorsList
                    });
                    console.log("LIST:",this.debtsFinalList);
                }
                
            }
        }
    },

    methods: {
        
    }

}
    
</script>

<template>
    <h1>Итог</h1>
    <div v-if="readyToGetResult">
        <div v-for="{name, debtorsList} in debtsFinalList">
            <p><b>{{name}}</b> должен получить от людей:</p>
            <p v-for="{name, summ} in debtorsList">{{ name }} - {{summ.toFixed(2)}} у.е.</p>
        </div>
    </div>
    <p v-else class="CantGetResultMessage">Сначала добавьте как минимум двух <router-link to="/persons">людей</router-link> и как минимум одно <router-link to="/products">блюдо</router-link></p>
</template>

<style scoped lang="sass">

.CantGetResultMessage
    border-radius: 3vh
    background-color: #DA4545
    font-size: large
    color: white
    padding: 3vh

a
    color: #A7CDAC

</style>