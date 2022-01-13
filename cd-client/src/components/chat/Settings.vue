<template>
<div class="chat-settings">
  <button type="button" @click="togglePlane">BTN</button>
  <div class="settings-plane" :class="{ 'is-open': isOpen }">
    <section>
      <h3>Teilnehmer*innen</h3>
      <ul v-if="people.length > 0">
        <PersonListItem  v-for="person in people" :key="person._id" :person="person" />
      </ul>
      <NewPersonForm />
    </section>
  </div>
</div>
</template>
<script>
  import PersonListItem from '@/components/person/ListItem.vue'
  import NewPersonForm from '@/components/person/NewPerson.vue'
  import { genRandomHex } from '@/util'

export default {
  name: 'ChatSettings',
  props: [],
  components: { PersonListItem, NewPersonForm },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    togglePlane() {
      this.isOpen = !this.isOpen;
    },
  },
  computed: {
    people() {
      return this.$store.getters.getPeopleByChatId(this.$route.params.chatid)
    }
  }
}
</script>
