<template>
<div class="chat" id="thischatwindow">
  <ChatInfo :chat="chat" />
  <MessageList :msgs="messages" :isTwoPerson="isTwoPerson"></MessageList>
  <AddMessage :chat="chat"></AddMessage>
</div>
</template>

<script>
  import { genRandomHex } from '@/util'

export default {
  name: 'Chat',
  components: {},
  beforeCreate() {
    this.$options.components.ChatInfo = require('@/components/ChatInfo.vue').default;
    this.$options.components.MessageList = require('@/components/MessageList.vue').default;
    this.$options.components.AddMessage = require('@/components/AddMessage.vue').default;
  },
  created() {
    this.$http.plain.get(`/chats/${this.$route.params.chatid}/messages`)
      .then(response => {
        this.$store.commit('addChat', response.data[0]);
        this.$store.commit('bulkAddMessages', response.data[1]);
        this.$store.commit('bulkAddPeople', response.data[2]);

        if (response.data[2].length < 2) {
          this.refillPeopleOfChat(response.data[2].length);
        }
      })
      .catch(e => { console.log(e) })
  },
  methods: {
    refillPeopleOfChat(length) {
      [...Array(2 - length).keys()].forEach(x => {
        this.$http.plain.post('/persons/', { name: genRandomHex(12),
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
    chat() {
      return this.$store.getters.getChatById(this.$route.params.chatid);
    },
    messages() {
      return this.$store.getters.getMessagesByChatId(this.$route.params.chatid);
    },
    isTwoPerson() {
      return this.$store.getters.getPeopleByChatId(this.$route.params.chatid).length <= 2;
    }
  }
}
</script>
