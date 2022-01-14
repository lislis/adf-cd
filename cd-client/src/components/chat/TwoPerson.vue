<template>
<div class="mt-1 p-1">
  <div class="mt-1 p-1">
  <div>
    <div class="composer">
      <div class="composer--send">
          <div  v-if="isLoading"><Loading /></div>
          <button v-else type="button" class="adf-btn--cream adf-btn--round"
                  @click="createMessage(false)">
            <span class="a11y-hidden">Hinzufügen</span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#374754" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </span>
          </button>
        </div>
      <div class="composer--compose">
        <div class="composer--message">
          <EmojiPicker @pick-emoji="pickUpEmoji" />
          <label for="msg-name" class="a11y-hidden">Text hinzufügen</label>
          <input type="text" name="" id="msg-name" v-model="msg" class="" />
        </div>
      </div>
      <div class="composer--send">
          <div  v-if="isLoading"><Loading /></div>
          <button v-else type="button" class="adf-btn--blue adf-btn--round"
                  @click="createMessage(true)">
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
  </div>
  </div>
  </div>
</template>
<script>
import Loading from '@/components/Loading'
import EmojiPicker from '@/components/EmojiPicker'

export default {
  name: "Two Person Chat",
  props: ['chat'],
  components: { Loading, EmojiPicker },
  data() {
    return {
      isLoading: false,
      msg: '',
      currentlyWriting: null
    }
  },
  created() {
    this.isLoading = false
    if (this.person.length < 2) {
      this.refillPeopleOfChat();
    }
  },
  methods: {
    createMessage(itMe) {
      if (this.msg !== '') {
        let person = this.person.find(x => x.isOwnMessage == itMe);
        this.isLoading = true
        this.$http.plain.post('/messages', { message: this.msg,
                                             chat: this.chat._id,
                                             person: person._id,
                                             isOwnMessage: itMe})
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
    },
    pickUpEmoji(emoji) {
      this.msg = this.msg + emoji;
    },
    refillPeopleOfChat() {
      [...Array(2 - this.person.length).keys()].forEach(x => {
        this.$http.plain.post('/persons/', { name: `Person ${x + 1}`,
                                             isOwnMessage: (x === 1) ? true : false,
                                             chat: this.chat._id })
          .then(response => {
            if (response.status == 200) {
              this.$store.commit('addPerson', response.data)
            }
          }).catch(e => {
            console.log(e);
          })
      })
    }
  },
  computed: {
    person() {
      return this.$store.getters.getPeopleByChatId(this.chat._id)
    },
  }
}
</script>
