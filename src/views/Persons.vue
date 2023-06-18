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
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <button class="btn btn-outline-secondary" type="button" @click="add()">
                <i class="bi bi-plus-circle"></i>
            </button>
        </div>
        <input v-model="newName" v-on:keyup.enter="add" maxlength="25" type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1">
    </div>
    <TransitionGroup name="list" tag="ul" appear>
        <li v-for="{id, name} in persons" :key="id">
            <p class="personName">{{name}}</p>
            <button type="button" class="btn btn-secondary list-btn" @click="editOpen(id, name)">
                <i class="bi bi-pencil"></i>
            </button>

            <button type="button" class="btn btn-secondary list-btn" @click="remove(id)">
                <i class="bi bi-trash"></i>
            </button>
        </li>
    </TransitionGroup>
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
    padding: 5px
    width: 100%
    display: flex
    margin-bottom: 3px
    border-radius: 5px

.list-btn
    margin-left: 3px

.personName
    width: 60vw    

</style>