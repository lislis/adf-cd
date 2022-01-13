<template>
<li class="mb-1">
  <Avatar inline="true" :name="person.name" class="mr-1"></Avatar>
  <form v-if="isEdit" @submit.prevent="updatePerson(person._id)">
    <input autofocus type="text" name="name" v-model="editPerson.name" @blur="updatePerson(person._id)" />
    <Loading v-if="isLoading" />
    <template v-else>
      <button type="submit">EDIT</button>
    </template>
  </form>
  <template v-else>
    <span @dblclick="toggleEdit">{{ person.name }}</span>
    <Loading v-if="isLoading" />
    <template v-else>
      <button v-if="!person.isOwnMessage" @click="rmPerson(person._id)">RM</button>
    </template>
  </template>
</li>
</template>
<script>
  import Loading from '@/components/Loading'
  import Avatar from "vue3-avatar";

export default {
  name: "PersonListItem",
  props: ['person'],
  components: { Loading, Avatar },
  data() {
    return {
      isLoading: false,
      isEdit: false,
      editPerson: {}
    }
  },
  methods: {
    rmPerson(pid) {
      let id = pid;
      this.isLoading = true;
      let person = this.$store.getters.getPersonById(id);
      this.$http.plain.delete(`/persons/${pid}`)
        .then(response => {
          if (response.status == 200) {
            this.isLoading = false;
            this.$store.commit('removePerson', person);
          }
        }).catch(e => {
          this.isLoading = false;
          console.log(e);
        })
    },
    toggleEdit() {
      this.editPerson = this.person;
      this.isEdit = !this.isEdit;
    },
    updatePerson(pid) {
      this.isLoading = true;
      this.$http.plain.put(`/persons/${pid}`, this.editPerson)
        .then(response => {
          if (response.status == 200) {
            this.isLoading = false;
            this.isEdit = false;
            this.$store.commit('updatePerson', this.editPerson);
          }
        }).catch(e => {
          this.isEdit = false;
          this.isLoading = false;
          console.log(e);
        })
    }
  }
}
</script>
