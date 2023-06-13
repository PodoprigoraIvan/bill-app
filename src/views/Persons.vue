<script>

export default {
    data() {
        return {
            editName: "",
            newName: "",
            editingId: 0
        }
    },

    computed: {
        persons(){
            return this.$store.state.persons;
        } 
    },

    methods: {
        add(){
            if (this.newName != "") {
                this.$store.dispatch('addPerson', {name: this.newName});
                this.newName = "";
            }
        },

        remove(id){
            this.$store.dispatch('removePerson', {id});
        },

        editOpen(id, name){
            this.editName = name;
            document.getElementById("editDialog").showModal();
            //this.$el.querySelector('#editDialog').showModal();
            this.editingId = id;
        },

        editClose(){
            if (this.editName != "")
                this.$store.dispatch('editPersonName', {id: this.editingId, name: this.editName});
            document.getElementById("editDialog").close();
        }
    }

}
    
</script>

<template>
    <h1>Добавление людей</h1>
    <input v-model="newName" v-on:keyup.enter="add" maxlength="25" />
    <button type="button" class="btn btn-secondary" @click="add()">
        <i class="bi bi-plus-circle"></i>
    </button>
    <li v-for="{id, name} in persons" :key="id">
        <p class="personName">{{name}}</p>
        <button type="button" class="btn btn-secondary" @click="editOpen(id, name)">
            <i class="bi bi-pencil"></i>
        </button>

        <button type="button" class="btn btn-secondary" @click="remove(id)">
            <i class="bi bi-trash"></i>
        </button>
    </li>

    <dialog id="editDialog">
        <p>Изменить имя</p>
        <input v-model="editName" maxlength="25" />
        <button type="button" class="btn btn-secondary" @click="editClose()">
            <i class="bi bi-check-square"></i>
        </button>    
    </dialog>
</template>

<style scoped lang="sass">
    i
        font-size: 15px
    li
        list-style: none
        margin-top: 1vh
        width: 100%
        display: flex
    
    .btn
        margin-left: 3px

    .personName
        width: 60vw

</style>