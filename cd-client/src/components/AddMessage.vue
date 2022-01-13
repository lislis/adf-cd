<template>
<div class="mt-1 p-1">
  <TwoPersonChat v-if="people.length <= 2"
                 :chat="chat"/>
  <MultPeopleChat v-else :chat="chat">

  </MultPeopleChat>
</div>
</template>
<script>
import TwoPersonChat from '@/components/chat/TwoPerson'
import MultPeopleChat from '@/components/chat/MultiplePeople'

export default {
  name: 'AddMessage',
  props: [ 'chat' ],
  components: { TwoPersonChat, MultPeopleChat },
  computed: {
    people() {
      return this.$store.getters.getPeopleByChatId(this.chat._id);
    }
  }
}
</script>
