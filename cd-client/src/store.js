import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'


export const store = createStore({
  state() {
    return {
      groups: [],
      chats: [],
      messages: []
    }
  },
  mutations: {
    addGroup(state, group) {
      if (state.groups.indexOf(group) === -1) {
        state.groups.push(group)
      }
    },
    addChat(state, chat) {
      if (state.chats.indexOf(chat) === -1) {
        state.chats.push(chat)
      }
    },
    addMessage(state, msg) {
      if (state.messages.indexOf(msg) === -1) {
        state.messages.push(msg)
      }
    },
    bulkAddMessages(state, msgs) {
      msgs.forEach(m => {
        if (state.messages.indexOf(m) === -1) {
          state.messages.push(m)
        }
      })
    }
  },
  getters: {
    getChatsByGroup: (state) => (groupId) => {
      return state.chats.filter(c => c.group === groupId)
    },
    getMessagesByChat: (state) => (chatId) => {
      return state.messages.filter(c => c.chat === chatId)
    }

  },
  plugins: [createPersistedState()]
})
