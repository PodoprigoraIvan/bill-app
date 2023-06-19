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

    mounted() {
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
                    this.debts[product.payerId][consumerId] -= product.price / product.consumersIds.length;
                    this.debts[consumerId][product.payerId] += product.price / product.consumersIds.length;
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
                if (debtorsList.length > 0) {
                    this.debtsFinalList.push({
                        name: this.persons.find(person => person.id === +payerId).name,
                        debtorsList: debtorsList
                    });
                }
            }
        }
    },
}
    
</script>

<template>
    <h1>Итог</h1>
    
    <p class="no-debtors-msg" v-if="debtsFinalList.length === 0 && readyToGetResult">Так уж вышло, что никто никому ничего не должен!</p>
    <transition name="results" appear>
    <div v-if="readyToGetResult">
        <div class="debtors-info" v-for="{name, debtorsList} in debtsFinalList">
            <p class="debtor-name"><b>{{name}}</b> должен следующим людям соответстенно:</p>
            <li v-for="{name, summ} in debtorsList"><p><b>{{ name }}</b> - {{summ.toFixed(2)}}</p></li>
        </div>
    </div>
    </transition>
    <p v-if="!readyToGetResult" class="warningMessage">Сначала добавьте как минимум двух <router-link to="/persons">людей</router-link> и как минимум одно <router-link to="/products">блюдо</router-link></p>
</template>

<style scoped lang="sass">

.results-enter-active, .results-leave-active
    transition: all 0.6s ease

.results-enter-from, .results-leave-to
    opacity: 0
    transform: translateY(50px)

.debtor-name
    margin-top: 15px
    text-align: center

.debtors-info
    background-color: #b9c8ff
    padding: 0 5px 5px 5px
    border-radius: 10px

p, li
    font-size: 1.3rem

.no-debtors-msg
    text-align: center
    background-color: lightgreen
    padding: 10px
    border-radius: 10px

li
    list-style: none
    padding: 10px
    border-radius: 10px
    margin-bottom: 3px

</style>