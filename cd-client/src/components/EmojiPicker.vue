<template>
<div class="emojipicker">
  <button class="emojibtn"
          type="button"
          :title="Emoji"
          :aria-label="Emoji"
          @click.prevent="toggleDisplay">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 496 512">
      <path fill="#374754" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"></path>
    </svg>

    </button>

    <div class="dialog" v-if="isopen">
      <div class="groupnav">
        <span v-for="group in emojiGroups"
              :key="group.group"
              @click="pickGroup(group)"
              class="groupnav__item">{{group.description}}</span>
      </div>
      <div v-for="group in emojiData"
           :key="group.group">
        <div class="emoji-group" v-if="activeGroup == group.group">
          <span v-for="(e, i) in group.emojiList"
                :key="i"
                v-html="e.unicode"
                class="emoji"
                @click="pickEmoji(e.unicode)"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
 import emojigroups from '../data/emojigroups.json';
 import emojidata from '../data/emoji.json';

 export default {
   name: "EmojiPicker",
   data() {
     return {
       isopen: false,
       activeGroup: 0
     }
   },
   methods: {
     toggleDisplay() {
       this.isopen = !this.isopen;
     },
     pickEmoji(evt) {
       this.$emit('pick-emoji', evt);
     },
     pickGroup(g) {
       this.activeGroup = g.group;
     }
   },
   computed: {
     emojiData() {
       return emojidata;
     },
     emojiGroups() {
       return emojigroups;
     }
   }
 }
</script>
<style scoped>
 .emojipicker {
   position: relative;
   top: 0.45rem;
   margin-right: 0.3em;
   z-index: 10;
 }
 .dialog {
   position: absolute;
   bottom: 5rem;
   right: 0;
   left: -2.7rem;
   min-height: 20rem;
   width: 22rem;

   background-color: white;
   border-radius: 4px;
   padding: 1rem;
   white-space: wrap;
 }
 .emojibtn {
   border: none;
   background-color: transparent;
   line-height: 1.7;
   font-size: 2rem;
   cursor: pointer;
   border-radius: 18px;
 }

 .emoji {
   display: inline-block;
   padding: 7px;
   font-size: 1.3rem;
   transition: background 100ms ease-in-out;
   cursor: pointer;
   border-radius: 4px;
   line-height: 1;
 }

 .emoji:hover,
 .emoji:active,
 .emoji:focus {
   background-color: var(--cream);
 }

 .emoji-group {
   height: 20rem;
   overflow-y: scroll;
   scrollbar-width: none;
 }

 .emoji-group::-webkit-scrollbar{
   width: 0;
 }


 .groupnav {
   display: flex;
   justify-content: space-between;
   padding-bottom: 4px;
   margin-bottom: 4px;
   border-bottom: solid 2px var(--cream);
 }

 .groupnav__item {
   padding: 5px;
   line-height: 1;
   border-radius: 4px;
   font-size: 1.1rem;
   cursor: pointer;
 }

 .groupnav__item:hover,
 .groupnav__item:active,
 .groupnav__item:focus  {
   background-color: var(--cream);
 }
</style>
