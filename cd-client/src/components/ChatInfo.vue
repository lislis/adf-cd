<template>
<div class="header chat-header">
  <div class="arrow arrow-left">
    <router-link :to='{ name: "Group", params: { groupid: chat.group }}'>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve" class="arrow-left arrow white">
        <polygon points="8.081,242.227 82.05,314.593 199.145,194.882 199.145,490 306.14,490 306.14,210.504 407.949,314.593 481.919,242.227 245.004,0"/>
      </svg>
    </router-link>
  </div>
  <div class="chat-contact px-1">
    <Avatar :name="chat.name" />
    <div class="px-1">
      <h1>{{ chat.name }}</h1>
      <p class="fw-normal chat-contact-list">{{ peopleInChat }}</p>
    </div>
  </div>
  <div class="d-flex">
    <Save2Png v-if="chat" :chat="chat"/>

    <Settings />
  </div>
</div>
</template>
<script>
import Avatar from 'vue3-avatar'
import Settings from '@/components/chat/Settings'
import Save2Png from '@/components/save2Png'

export default {
  name: 'ChatInfo',
  props: ['chat', 'people'],
  components: { Settings, Save2Png, Avatar },
  data() {
    return {

    }
  },
  created() {
  },
  computed: {
    peopleInChat() {
      return this.$store.getters.getPeopleByChatId(this.$route.params.chatid)
        .map(x => x.name)
        .join(', ')
    }
  }
}
</script>
