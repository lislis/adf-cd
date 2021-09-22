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
     data() {
         return {
             chat: {},
             messages: []
         }
     },
     created() {
         this.$http.plain.get(`/chats/${this.$route.params.chatid}/messages`)
             .then(response => {
                 this.chat = response.data[0];
                 this.messages = response.data[1];
             })
             .catch(e => { console.log(e) })
     },
     methods: {

     }
 }
</script>
