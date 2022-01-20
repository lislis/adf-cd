<template>
<div class="d-flex ai-end" :class="{'fd-rreverse': person.isOwnMessage}">
  <Avatar :name="person.name" v-if="!isTwoPerson" size="35" inline="true" />
  <div class="bubble">
    <div v-if="!person.isOwnMessage && !isTwoPerson" class="small">{{ person.name }}</div>
    <div class="msg-content my-02" v-html="msg.message"></div>
    <div class="date small">
      <time :datetime="msg.created_date">{{ createdAt }}</time></div>
  </div>
</div>
</template>
<script>
  import Avatar from 'vue3-avatar'

export default {
  name: "Bubble",
  props: ['msg', 'isTwoPerson'],
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
