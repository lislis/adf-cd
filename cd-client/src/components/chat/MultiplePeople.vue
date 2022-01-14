<template>
<div class="mt-1 p-1">
  <div>
    <div class="composer px-1">
      <div class="composer--compose">
        <div class="composer--message">
          <EmojiPicker @pick-emoji="pickUpEmoji" />
          <label for="msg-name" class="a11y-hidden">Text hinzufügen</label>
          <input type="text" name="" id="msg-name" v-model="msg" class="" />
        </div>
      </div>
      <div class="composer--send d-flex">
        <div  v-if="isLoading"><Loading /></div>
        <template v-else>
          <button type="button"
                  @click="createMessageByPerson"
                  v-if="currentlyWriting"
                  class="composer--send--inner">
            <Avatar :name="currentlyWriting.name" inline="true" size="44" />
            <span class="a11y-hidden">Posten als {{currentlyWriting.name}}</span>
          </button>
        </template>
        <div class="people-choice-plane" :class="{'is-open': isOpen}">
            <ul>
              <li class="people-choice-item"
                  v-for="p in people"
                  :key="p._id"
                  @click="chooseWriting(p)">
                <Avatar :name="p.name" size="30" inline="true" />
                <span class="a11y-hidden">Posten als {{p.name}}</span>
                {{p.name}}
              </li>
            </ul>
          </div>
        <button type="button" @click="toggleChoicePlane">CH</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Loading from '@/components/Loading'
import EmojiPicker from '@/components/EmojiPicker'
import Avatar from 'vue3-avatar'

export default {
  name: 'AddMessage',
  props: [ 'chat' ],
  components: { Loading, EmojiPicker, Avatar },
  data() {
    return {
      isLoading: false,
      msg: '',
      currentlyWriting: null,
      isOpen: false
    }
  },
  created() {
    this.isLoading = false
    this.currentlyWriting = this.people[0]
  },
  methods: {
    createMessageByPerson() {
      if (this.msg !== '') {
        this.isLoading = true
        this.$http.plain.post('/messages', { message: this.msg,
                                             chat: this.chat._id,
                                             person: this.currentlyWriting._id,
                                             isOwnMessage: this.currentlyWriting.isOwnMessage })
          .then(response => {
            if (response.status === 200) {
              this.isLoading = false
              this.msg = ''
              this.$store.commit('addMessage', response.data)
            }
        }).catch(e => {
          this.isLoading = false;
          console.log(e)
        })
      }
    },
    pickUpEmoji(emoji) {
      this.msg = this.msg + emoji;
    },
    chooseWriting(p) {
      this.currentlyWriting = p
      this.isOpen = false;
    },
    isCurrent(p) {
      return p._id == this.currentlyWriting
    },
    toggleChoicePlane() {
      this.isOpen = !this.isOpen
    }
  },
  computed: {
    people() {
      return this.$store.getters.getPeopleByChatId(this.chat._id);
    }
  }
}
</script>
