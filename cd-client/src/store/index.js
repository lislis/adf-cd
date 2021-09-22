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
    emptyState(state) {
      state.groups = [];
      state.chats = [];
      state.messages = [];
    },
    addGroup(state, group) {
      if (state.groups.filter(x => x._id === group._id).length === 0) {
        state.groups.push(group)
      }
    },
    addChat(state, chat) {
      if (state.chats.filter(x => x._id === chat._id).length === 0) {
        state.chats.push(chat)
      }
    },
    bulkAddChats(state, chats) {
      chats.forEach(c => {
        if (state.chats.filter(x => x._id === c._id).length === 0) {
          state.chats.push(c)
        }
      })
    },
    addMessage(state, msg) {
      if (state.messages.filter(x => x._id === msg._id).length === 0) {
        state.messages.push(msg)
      }
    },
    bulkAddMessages(state, msgs) {
      msgs.forEach(m => {
        if (state.messages.filter(x => x._id === m._id).length === 0) {
          state.messages.push(m)
        }
      })
    }
  },
  getters: {
    getChatsByGroupId: (state) => (groupId) => {
      return state.chats.filter(c => c.group === groupId)
    },
    getMessagesByChatId: (state) => (chatId) => {
      return state.messages.filter(c => c.chat === chatId)
    },
    getGroupById: (state) => (groupId) => {
      return state.groups.find(x => x._id === groupId)
    }
  },
  plugins: [createPersistedState()]
})
