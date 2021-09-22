<template>
<div class="home">
  <HeaderComp />
  <GroupStart />

  <section>
    Groups in localstorage
  </section>
</div>
</template>

<script>
import HeaderComp from '@/components/HeaderComp'
import GroupStart from '@/components/GroupStart'

export default {
  name: 'Home',
  components: {
    GroupStart,
    HeaderComp
  }
}
</script>
