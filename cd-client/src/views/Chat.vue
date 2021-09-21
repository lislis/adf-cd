<template>
    <div class="chat" id="thischatwindow">
        <ChatInfo :chat="chat" />
        <MessageList :msgs="messages"></MessageList>
        <AddMessage :chat="chat"></AddMessage>
        <button type="button" @click="exportPDF">Export</button>
    </div>
</template>

<script>
 import * as html2image from 'html-to-image'
 import * as download from 'downloadjs'

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
     components: {

     },
     methods: {
         exportPDF() {
             html2image.toPng(document.querySelector('#thischatwindow'))
                       .then((dataUrl) => {
                           download(dataUrl, 'test.png')
                       })
         }
     }
 }
</script>
