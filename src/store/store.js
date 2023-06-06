import { Store } from 'vuex'

export default new Store({
	state: {
        persons : [],
        products: [{id: 0, name: "баклан", payerId: 1, price: 100, consumersIds: [1,2]}]
    },

    mutations: {
        addPerson(state, {name}) {
            let id = 0;
            let personsSize = state.persons.length;
            if (personsSize != 0) id = state.persons[personsSize - 1].id + 1;
            state.persons.push({id, name});
        },
        addProduct(state, {name, price, payerId}) {
            let id = 0;
            let productsSize = state.products.length;
            if (productsSize != 0) id = state.products[productsSize - 1].id + 1;
            state.products.push({id: id, name: name, payerId: payerId, price: price, consumersIds: []});
        },
        editPersonName(state, {id, name}){
            let foundedPerson = state.persons.find(person => person.id === id);
            if (foundedPerson != undefined) foundedPerson.name = name;
        },
        editProductName(state, {id, name}){
            let foundedProduct = state.products.find(product => product.id === id);
            if (foundedProduct != undefined) foundedProduct.name = name;
        },
        editProductPrice(state, {id, price}){
            let foundedProduct = state.products.find(product => product.id === id);
            if (foundedProduct != undefined) foundedProduct.price = price;
        },
        editProductPayer(state, {id, payerId}){
            let foundedProduct = state.products.find(product => product.id === id);
            if (foundedProduct != undefined) foundedProduct.payerId = payerId;
        },
        editProductConsumersIds(state, {id, consumersIds}){
            let foundedProduct = state.products.find(product => product.id === id);
            if (foundedProduct != undefined) foundedProduct.consumersIds = consumersIds;
        },
        removeProduct(state, {id}){
            state.products = state.products.filter(product => product.id !== id);
        },
        removePerson(state, {id}){
            state.persons = state.persons.filter(person => person.id !== id);
            state.products.forEach(product => {
                if (product.payerId == id) product.payerId = state.persons[0].id;
                product.consumersIds = product.consumersIds.filter(consumerId => consumerId != id);
            });
        }
    },
    
    actions: {
        addPerson({ commit }, payload) {
          commit('addPerson', payload);
        },
        addProduct({ commit }, payload) {
            commit('addProduct', payload);
        },
        editPersonName({ commit }, payload) {
          commit('editPersonName', payload);
        },
        editProductName({ commit }, payload) {
            commit('editProductName', payload);
        },
        editProductPrice({ commit }, payload) {
            commit('editProductPrice', payload);
        },
        editProductPayer({ commit }, payload) {
            commit('editProductPayer', payload);
        },
        editProductConsumersIds({ commit }, payload) {
            commit('editProductConsumersIds', payload);
        },
        removeProduct({ commit }, payload) {
            commit('removeProduct', payload);
        },
        removePerson({ commit }, payload) {
          commit('removePerson', payload);
        }
    }

})