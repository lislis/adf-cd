import { plainAxiosInstance } from '@/backend/axios'
import { store } from './store'

const genRandomHex = (size) => {
  return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
};

const messageContainsUrl = async (msg, personId, chatId) => {
  const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g;

  Array.from(msg.matchAll(re)).map((m) => {
    if (m) {
      console.log('looking for', m[0])
      plainAxiosInstance.post('/messages/linkexpand', { link: m[0], personId, chatId })
        .then(response => {
          if (response.success !== false) {
            store.commit('addMessage', response.data);
            console.log('this came back', response.data);
          } else {
            console.log('something went wrong');
          }
         // debugger

        }).catch(e => console.log('error parsing link', e));
    }
    return true;
  });
}

export { genRandomHex, messageContainsUrl };
