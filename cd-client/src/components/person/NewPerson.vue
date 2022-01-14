<template>
<div class="mt-1">
  <button @click="toggleForm" type="button" :class="{ 'is-rot-half': isOpen }">
    <span class="a11y-hidden">Neue Person hinzufügen</span>
    <svg aria-hidden="true" focusable="false" width="35" height="35" viewBox="0 0 512 512"><path fill="#e1e1e1" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path></svg>
  </button>
  <form v-if="isOpen" @submit.prevent="addPersonToChat" class="p-2 d-flex ai-center">
    <label><span class="a11y-hidden">Name der neuen Person</span>
      <input v-model="name" type="text" name="tn-name" /></label>
    <button type="submit">
      <span class="a11y-hidden">Okay</span>
      <svg aria-hidden="true" focusable="false" width="35" height="35" viewBox="0 0 512 512"><path fill="#c9a900" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
    </button>
  </form>
</div>
</template>
<script>
  import { genRandomHex } from '@/util'

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
            this.isLoading = false
            this.name = ''
            this.avatar = ''
            this.$store.commit('addPerson', response.data)
            this.isOpen = false
          }
        }).catch(e => {
          this.isLoading = false;
          console.log(e);
        })
    },

  }
}
</script>
