<template>
  <div>
    <header>
      <h1>{{ group.name }}</h1>
      <p>Erstellt <time :datetime="group.created_date">{{ createdAt }}</time></p>
    </header>
  </div>
</template>
<script>
import { genRandomHex } from '@/util'

export default {
  name: 'GroupInfo',
  props: ['group'],
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
      let date = new Date(this.group.created_date);
      return date.toLocaleDateString('de-DE', opt);
    }
  }
}
</script>
