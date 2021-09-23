<template>
<div class="chat" id="thischatwindow">
  <ChatInfo :chat="chat" />
  <MessageList :msgs="messages"></MessageList>
  <AddMessage :chat="chat"></AddMessage>
</div>
</template>

<script>
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
        this.$store.commit('addChat', response.data[1]);
        this.$store.commit('bulkAddMessages', response.data[1]);
      })
      .catch(e => { console.log(e) })
  },
  methods: {

  },
  computed: {
    chat() {
      return this.$store.getters.getChatById(this.$route.params.chatid);
    },
    messages() {
      return this.$store.getters.getMessagesByChatId(this.$route.params.chatid);
    }
  }
}
</script>
