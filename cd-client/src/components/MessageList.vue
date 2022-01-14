<template>
<section class="p-1 mt-1 msg-list">
  <ul>
    <li v-for="msg in msgs"
        :key="msg._id"
        :class="leftOrRight(msg)" class="my-05">
      <Bubble :msg="msg" />
    </li>
  </ul>
</section>
</template>
<script>
  import Bubble from '@/components/message/Bubble.vue'

export default {
  name: 'MessageList',
  props: ['msgs'],
  components: { Bubble },
  methods: {

    leftOrRight(m) {
      return m.isOwnMessage ? 'right' : 'left'
    }
  }
}
</script>
