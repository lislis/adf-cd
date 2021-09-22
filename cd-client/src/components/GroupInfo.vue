<template>
  <div class="px-1">
    <section class="mb-3 mt-1">
      <p class="small-title">Gruppe</p>
      <h2 class="title">{{ group.name }}</h2>
      <p class="small date">Erstellt <time :datetime="group.created_date">{{ createdAt }}</time></p>
    </section>
  </div>
</template>
<script>
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
      let opt = { year: 'numeric', month: 'short', day: 'numeric' };
      let date = new Date(this.group.created_date);
      return `${date.toLocaleDateString('de-DE', opt)} ${date.toLocaleTimeString('de-DE')}`;
    }
  }
}
</script>
