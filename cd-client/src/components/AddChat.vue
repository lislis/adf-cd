<template>
  <div class="px-1 mb-3">
    <form @submit.prevent="createChat">
      <label for="chat-name" class="small-title">Chat hinzufügen</label>
      <div>
        <input type="text" name="" id="chat-name" :placeholder="randoName" v-model="givenName" />
        <Loading v-if="isLoading" />
        <button v-else type="submit" class="adf-btn adf-btn--primary mt-1">Hinzufügen</button>
      </div>
    </form>
  </div>
</template>
<script>
  import Loading from '@/components/Loading'
  import { genRandomHex } from '@/util'

export default {
  name: 'AddChat',
  props: [ 'group' ],
  components: { Loading },
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
            this.$store.commit('addChat', response.data)
          }
        }).catch(e => {
          this.isLoading = false;
          console.log(e)
        })
    }
  }
}
</script>
