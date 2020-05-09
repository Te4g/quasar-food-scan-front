import { LocalStorage } from 'quasar'

export default function authHeader() {
  let user = JSON.parse(LocalStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
}
