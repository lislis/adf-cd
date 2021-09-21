<template>
<div class="group">
  <GroupInfo :group="group" />
  <ChatList :chats="chats"></ChatList>
  <AddChat :group="group"></AddChat>
</div>
</template>

<script>
export default {
  name: 'Group',
  components: {},
  beforeCreate() {
    this.$options.components.GroupInfo = require('@/components/GroupInfo.vue').default;
    this.$options.components.ChatList = require('@/components/ChatList.vue').default;
    this.$options.components.AddChat = require('@/components/AddChat.vue').default;
  },
  data() {
    return {
      group: {},
      chats: []
    }
  },
  created() {
    this.$http.plain.get(`/groups/${this.$route.params.groupid}/chats`)
      .then(response => {
        this.group = response.data[0];
        this.chats = response.data[1];
      })
      .catch(e => { console.log(e) })
  },
  components: {

  }
}
</script>
