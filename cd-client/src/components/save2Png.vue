<template>
<button type="button" @click="exportPng" class="">
  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <path fill="#e1e1e1" d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm32-48h224V288l-23.5-23.5c-4.7-4.7-12.3-4.7-17 0L176 352l-39.5-39.5c-4.7-4.7-12.3-4.7-17 0L80 352v64zm48-240c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"></path>
  </svg>
  <span class="a11y-hidden">Export als Bild</span></button>
</template>
<script>
import * as html2image from 'html-to-image'
import * as download from 'downloadjs'

export default {
  name: "Save2Png",
  props: ['chat'],
  data() {
    return {

    }
  },
  methods: {
    exportPng() {
      html2image.toPng(document.querySelector('#thischatwindow'))
        .then((dataUrl) => {
          download(dataUrl, `adf-cd-${this.chat.name}.png`)
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
