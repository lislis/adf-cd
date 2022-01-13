<template>
<div>
  <button @click="toggleForm" type="button">NEW</button>
  <form v-if="isOpen" @submit.prevent="addPersonToChat">
    <label><span>Name</span>
      <input v-model="name" type="text" name="tn-name" /></label>
    <button type="submit">Hinzufügen</button>
  </form>
</div>
</template>
<script>
export default {
  name: "NewPerson",
  data() {
    return {
      isOpen: false,
      isLoading: false,
      name: ""
    }
  },
  methods: {
    toggleForm() {
      this.isOpen = !this.isOpen;
    },
    addPersonToChat() {
      this.isLoading = true;
      let name = this.name !== '' ? this.name : genRandomHex(16);
      this.$http.plain.post('/persons/', { name: name,
                                           isOwnMessage: false,
                                           chat: this.$route.params.chatid })
        .then(response => {
          if (response.status == 200) {
            let id = response.data._id;
            this.isLoading = false
            this.name = ''
            this.avatar = ''
            this.$store.commit('addPerson', response.data)
          }
        }).catch(e => {
          this.isLoading = false;
          console.log(e);
        })
    },

  }
}
</script>
