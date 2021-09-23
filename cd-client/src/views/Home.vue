<template>
<div class="home">
  <HeaderComp />
  <GroupStart />
  <LocalGroups />
</div>
</template>

<script>
import HeaderComp from '@/components/HeaderComp'
import GroupStart from '@/components/GroupStart'
import LocalGroups from '@/components/LocalGroups'

export default {
  name: 'Home',
  components: {
    GroupStart,
    HeaderComp,
    LocalGroups
  }
}
</script>
