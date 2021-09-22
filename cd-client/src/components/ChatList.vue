<template>
<section class="px-1 mb-3">
  <h2 class="small-title">Chats in dieser Gruppe</h2>
  <ul v-if="chats.length > 0" class="">
    <li v-for="chat in chats"
        :key="chat._id"
        class="fw-bold">
      <router-link :to='{ name: "Chat", params: {chatid: chat._id }}' class="chat-item py-1">
        <div><span>{{ chat.name}}</span><br>
          <span class="date small">{{ createdAt(chat.created_date) }}</span>
        </div>

        <span class="visible-on-hover">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve" class="icon arrow-right arrow primary">
            <title>arrow</title>
            <polygon points="8.081,242.227 82.05,314.593 199.145,194.882 199.145,490 306.14,490 306.14,210.504 407.949,314.593 481.919,242.227 245.004,0"/>
          </svg>

        </span>
      </router-link>
    </li>
  </ul>
  <div v-else>
    <p class="small p-2 bg--cream">Noch keine Chats in dieser Gruppe</p>
  </div>
</section>
</template>
<script>

export default {
  name: 'ChatList',
  props: ['chats'],
  methods: {
    createdAt(d) {
      let opt = { year: 'numeric', month: 'short', day: 'numeric' };
      let date = new Date(d);
      return `${date.toLocaleDateString('de-DE', opt)} ${date.toLocaleTimeString('de-DE')}`;
    }
  }
}
</script>
