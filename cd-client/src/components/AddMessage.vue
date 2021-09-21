<template>
<div>
  <form @submit.prevent="createMessage">
    <div>
      <label>is me<input type="radio" name="who" value="true" checked v-model="itMe" /></label>
      <label>is other<input type="radio" name="who" value="false"  v-model="itMe" /></label>
    </div>
    <label for="msg-name">Text hinzufügen</label>
    <div>
      <input type="text" name="" id="msg-name" v-model="msg" />
      <button type="submit">Hinzufügen</button>
    </div>
  </form>
</div>
</template>
<script>
export default {
  name: 'AddMessage',
  props: [ 'chat' ],
  data() {
    return {
      isLoading: false,
      msg: '',
      itMe: true,
    }
  },
  created() {
    this.isLoading = false
  },
  methods: {
    createMessage() {
      this.isLoading = true
      if (this.msg !== '') {
        this.$http.plain.post('/messages', { message: this.msg,
                                             chat: this.chat._id,
                                             isOwnMessage: this.itMe})
          .then(response => {
          if (response.status === 200) {
            this.isLoading = false
            this.msg = ''
          }
        }).catch(e => {
          this.isLoading = false;
          console.log(e)
        })
      }
    }
  }
}
</script>
