<template>
  <div>
    <form @submit.prevent="createGroup">
      <label for="group-name">Starte eine Gruppe</label>
      <div>
        <input type="text" name="" id="group-name" :placeholder="randoName" v-model="givenName" />
        <button type="submit">Start</button>
      </div>
    </form>
  </div>
</template>
<script>
  import { genRandomHex } from '@/util'

export default {
  name: 'GroupStart',
  data() {
    return {
      isLoading: false,
      randoName: '',
      givenName: '',
    }
  },
  created() {
    this.isLoading = false
    this.randoName = this.randomName()
  },
  methods: {
    randomName() {
      return genRandomHex(16);
    },
    createGroup() {
      this.isLoading = true
      let name = this.givenName !== '' ? this.givenName : this.randoName
      this.$http.plain.post('/groups', { name: name })
        .then(response => {
          if (response.status === 200) {
            let id = response.data._id
            this.$router.push({ path: `/groups/${id}`})
            this.isLoading = false
          }
        }).catch(e => {
          this.isLoading = false;
          console.log(e)
        })
    }
  }
}
</script>
