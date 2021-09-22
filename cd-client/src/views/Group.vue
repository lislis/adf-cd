<template>
<div class="group">
  <HeaderComp />
  <GroupInfo :group="group" />
  <ChatList :chats="chats"></ChatList>
  <AddChat :group="group"></AddChat>
</div>
</template>

<script>
  import HeaderComp from '@/components/HeaderComp'

export default {
  name: 'Group',
  components: { HeaderComp },
  beforeCreate() {
    this.$options.components.GroupInfo = require('@/components/GroupInfo.vue').default;
    this.$options.components.ChatList = require('@/components/ChatList.vue').default;
    this.$options.components.AddChat = require('@/components/AddChat.vue').default;
  },
  created() {
    //this.$store.commit('emptyState')
    this.$http.plain.get(`/groups/${this.$route.params.groupid}/chats`)
      .then(response => {
        this.$store.commit('addGroup', response.data[0]);
        this.$store.commit('bulkAddChats', response.data[1]);
      })
      .catch(e => { console.log(e) })
  },
  computed: {
    group() {
      return this.$store.getters.getGroupById(this.$route.params.groupid);
    },
    chats() {
      return this.$store.getters.getChatsByGroupId(this.$route.params.groupid);
    }
  }
}
</script>
