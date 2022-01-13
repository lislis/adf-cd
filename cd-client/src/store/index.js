import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export const store = createStore({
  state() {
    return {
      groups: [],
      chats: [],
      messages: [],
      people: []
    }
  },
  mutations: {
    emptyState(state) {
      state.groups = [];
      state.chats = [];
      state.messages = [];
      state.people = [];
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
    },
    bulkAddPeople(state, ppl) {
      ppl.forEach(p => {
        if (state.people.filter(x => x._id === p._id).length === 0) {
          state.people.push(p)
        }
      })
    },
    addPerson(state, person) {
      if (state.people.filter(x => x._id === person._id).length === 0) {
        state.people.push(person)
      }
    },
    removePerson(state, person) {
      state.people.splice(state.people.indexOf(person), 1)
    },
    updatePerson(state, person) {
      let index = state.people.findIndex(p => p._id === person._id);

      state.people = [
        ...state.people.slice(0, index),
        person,
        ...state.people.slice(index + 1)
      ];
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
    },
    getChatById: (state) => (chatId) => {
      return state.chats.find(x => x._id === chatId)
    },
    getPeopleByChatId: (state) => (chatId) => {
      return state.people.filter(x => x.chat === chatId)
    },
    getPersonById: (state) => (id) => {
      return state.people.find(x => x._id === id)
    }
  },
  plugins: [createPersistedState()]
})
