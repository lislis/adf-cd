<template>
<li class="mb-1 d-flex ai-center">
  <Avatar inline="true" :name="person.name" class="mr-05"></Avatar>
  <form v-if="isEdit" @submit.prevent="updatePerson(person._id)" class="d-flex p-1">
    <input autofocus type="text" name="name" v-model="editPerson.name" @blur="updatePerson(person._id)" />
    <Loading v-if="isLoading" />
    <template v-else>
      <button type="submit">
        <span class="a11y-hidden">Änderung speichern</span>
        <svg aria-hidden="true" focusable="false" width="35" height="35" viewBox="0 0 512 512"><path fill="#c9a900" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
      </button>
    </template>
  </form>
  <template v-else>
    <span @dblclick="toggleEdit" class="settings-name">{{ person.name }}</span>
    <Loading v-if="isLoading" />
    <template v-else>
      <button v-if="!person.isOwnMessage" @click="rmPerson(person._id)" class="settings-rm">
        <span class="a11y-hidden">Person löschen</span>
        <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 448 512"><path fill="#c9a900" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>
      </button>
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
