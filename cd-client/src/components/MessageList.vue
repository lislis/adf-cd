<template>
<section>
  <ul>
    <li v-for="msg in msgs"
        :key="msg._id"
        :class="leftOrRight(msg)">
      <div class="bubble">
        <div>{{ msg.message }}</div>
        <div>{{ createdAt(msg.created_date) }}</div>
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
      let date = new Date(d);
      return date.toLocaleTimeString('de-DE');
    },
    leftOrRight(m) {
      return m.isOwnMessage ? 'right' : 'left'
    }
  }
}
</script>
