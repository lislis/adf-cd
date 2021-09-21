<template>
<section>
  <h2>Chats in dieser Gruppe</h2>
  <ul>
    <li v-for="chat in chats"
        :key="chat._id">
      <router-link :to='{ name: "Chat", params: {chatid: chat._id }}'>{{ chat.name}}</router-link><span>{{ createdAt(chat.created_date) }}</span>
    </li>
  </ul>
</section>
</template>
<script>

export default {
  name: 'ChatList',
  props: ['chats'],
  data() {
    return {

    }
  },
  created() {

  },
  methods: {
    createdAt(d) {
      let opt = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      let date = new Date(d);
      return date.toLocaleDateString('de-DE', opt);
    }
  }
}
</script>
