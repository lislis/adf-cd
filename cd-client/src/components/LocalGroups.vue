<template>
<section class="p-1" v-if="groups.length > 0">
  <h2 class="small-title">Bisherige Gruppen</h2>
  <ul class="mt-1">
    <li v-for="group in groups"
        :key="group._id"
        class="fw-bold">
      <router-link :to='{ name: "Group", params: {groupid: group._id }}' class="chat-item py-1">
        <div><span>{{ group.name}}</span><br>
          <span class="date small">Erstellt <time>{{ createdAt(group) }}</time></span>
        </div>

        <span class="visible-on-hover">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve" class="arrow-right arrow primary">
            <polygon points="8.081,242.227 82.05,314.593 199.145,194.882 199.145,490 306.14,490 306.14,210.504 407.949,314.593 481.919,242.227 245.004,0"/>
          </svg>

        </span>
      </router-link>
    </li>
  </ul>
</section>
</template>
<script>
export default {
  name: 'LocalGroups',
  data() {
    return {

    }
  },
  created() {

  },
  methods: {
    createdAt(g) {
      let opt = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      let date = new Date(g.created_date);
      return date.toLocaleDateString('de-DE', opt);
    }
  },
  computed: {
    groups() {
      return this.$store.state.groups
    }
  }
}
</script>
