<template>
<div class="mt-1 p-1">
  <form @submit.prevent="createMessage">
    <div class="composer">
      <div class="composer--compose">
        <div class="composer--radio">
          <label class="isLeft">
            <input type="radio" name="who" value="true" checked v-model="itMe" class="a11y-hidden" />
            <svg class="checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>

            <svg class="unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
            <span>Person A</span>
          </label>
          <label class="isRight">
            <input type="radio" name="who" value="false" v-model="itMe"  class="a11y-hidden" />
            <svg class="checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
            <svg class="unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
            <span>Person B</span>
          </label>
        </div>
        <div class="composer--message">
          <label for="msg-name" class="a11y-hidden">Text hinzufügen</label>
          <input type="text" name="" id="msg-name" v-model="msg" class="" />
        </div>
      </div>
      <div class="composer--send">
          <div  v-if="isLoading"><Loading /></div>
          <button v-else type="submit" class="btn--primary btn--round">
            <span class="a11y-hidden">Hinzufügen</span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#e1e1e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </span>
          </button>
        </div>
    </div>
  </form>
</div>
</template>
<script>
  import Loading from '@/components/Loading'

export default {
  name: 'AddMessage',
  props: [ 'chat' ],
  components: { Loading },
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
            this.$store.commit('addMessage', response.data)
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
