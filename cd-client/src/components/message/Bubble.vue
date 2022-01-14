<template>
<div class="d-flex ai-end" :class="{'fd-rreverse': msg.isOwnMessage}">
  <Avatar :name="person.name" size="35" inline="true" />
  <div class="bubble">
    <div v-if="!msg.isOwnMessage"><small>{{ person.name }}</small></div>
    <div class="msg-content">{{ msg.message }}</div>
    <div class="date small">
      <time :datetime="msg.created_date">{{ createdAt }}</time></div>
  </div>
</div>
</template>
<script>
  import Avatar from 'vue3-avatar'

export default {
  name: "Bubble",
  props: ['msg'],
  components: { Avatar },
  methods: {

  },
  computed: {
    person() {
      return this.$store.getters.getPersonById(this.msg.person) || { name: '' }
    },
    createdAt() {
      let opt = { hour: '2-digit', minute: '2-digit' };
      let date = new Date(this.msg.created_date);
      return date.toLocaleTimeString('de-DE', opt);
    },
  }
}
</script>
