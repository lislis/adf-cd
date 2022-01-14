<template>
<div class="chat-settings">
  <button type="button" @click="togglePlane" :class="{ 'is-rot': isOpen }">
    <span class="a11y-hidden">Menü toggeln</span>
    <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 192 512" width="24" height="24"><path fill="#e1e1e1" d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"></path></svg>
  </button>
  <div class="settings-plane" :class="{ 'is-open': isOpen }">
    <section>
      <h3 class="my-05">Teilnehmer*innen</h3>
      <p class="mb-3"><small>Doppelklick um Namen zu ändern</small></p>
      <ul v-if="people.length > 0" class="mb-3">
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
