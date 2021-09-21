<template>
  <div>
    <header>
      <h1>{{ chat.name }}</h1>
      <p>Erstellt <time :datetime="chat.created_date">{{ createdAt }}</time></p>
    </header>
  </div>
</template>
<script>
export default {
  name: 'ChatInfo',
  props: ['chat'],
  data() {
    return {

    }
  },
  created() {

  },
  methods: {

  },
  computed: {
    createdAt() {
      let opt = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      let date = new Date(this.chat.created_date);
      return date.toLocaleDateString('de-DE', opt);
    }
  }
}
</script>
