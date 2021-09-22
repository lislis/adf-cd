<template>
<section class="p-1 mt-1">
  <ul>
    <li v-for="msg in msgs"
        :key="msg._id"
        :class="leftOrRight(msg)" class="my-05">
      <div class="bubble">
        <div class="msg-content">{{ msg.message }}</div>
        <div class="date small">
          <time :datetime="msg.created_date">{{ createdAt(msg.created_date) }}</time></div>
      </div>
    </li>
  </ul>
</section>
</template>
<script>

export default {
  name: 'MessageList',
  props: ['msgs'],
  data() {
    return {

    }
  },
  created() {

  },
  methods: {
    createdAt(d) {
      let opt = { hour: '2-digit', minute: '2-digit' };
      let date = new Date(d);
      return date.toLocaleTimeString('de-DE', opt);
    },
    leftOrRight(m) {
      return m.isOwnMessage ? 'right' : 'left'
    }
  }
}
</script>
