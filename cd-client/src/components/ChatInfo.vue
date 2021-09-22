<template>
<div class="header chat-header">
  <div class="arrow arrow-left">
    <router-link :to='{ name: "Group", params: { groupid: chat.group }}'>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve" class="arrow-left arrow white">
      <polygon points="8.081,242.227 82.05,314.593 199.145,194.882 199.145,490 306.14,490 306.14,210.504 407.949,314.593 481.919,242.227 245.004,0"/>
    </svg>
    </router-link>
  </div>
  <div class="chat-contact px-1">
    <img src="" class="profile-pic" alt="profile-pic" />
    <div class="px-1">
      <h1>{{ chat.name }}</h1>
      <p class="fw-normal">online</p>
    </div>
  </div>
  <div>
    <button type="button" @click="exportPng" class="icon export-png">Export als Bild</button>
  </div>
</div>
</template>
<script>
  import * as html2image from 'html-to-image'
  import * as download from 'downloadjs'

export default {
  name: 'ChatInfo',
  props: ['chat'],
  data() {
    return {

    }
  },
  created() {

  },
  methods: {
   exportPng() {
     html2image.toPng(document.querySelector('#thischatwindow'))
       .then((dataUrl) => {
         download(dataUrl, 'test.png')
       })
   }
  },
  computed: {
    createdAt() {
      let opt = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      let date = new Date(this.chat.created_date);
      return date.toLocaleDateString('de-DE', opt);
    }
  }
}
</script>
