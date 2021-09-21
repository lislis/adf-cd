<template>
  <div>
    <form @submit.prevent="createChat">
      <label for="chat-name">Chat hinzufügen</label>
      <div>
        <input type="text" name="" id="chat-name" :placeholder="randoName" v-model="givenName" />
        <button type="submit">Hinzufügen</button>
      </div>
    </form>
  </div>
</template>
<script>
  import { genRandomHex } from '@/util'

export default {
  name: 'AddChat',
  props: [ 'group' ],
  data() {
    return {
      isLoading: false,
      randoName: '',
      givenName: '',
    }
  },
  created() {
    this.isLoading = false
    this.randoName = this.randomName()
  },
  methods: {
    randomName() {
      return genRandomHex(16);
    },
    createChat() {
      this.isLoading = true
      let name = this.givenName !== '' ? this.givenName : this.randoName
      this.$http.plain.post('/chats', { name: name, group: this.group._id })
        .then(response => {
          if (response.status === 200) {
            this.isLoading = false
            this.givenName = ''
            this.randoName = this.randomName()
          }
        }).catch(e => {
          this.isLoading = false;
          console.log(e)
        })
    }
  }
}
</script>
