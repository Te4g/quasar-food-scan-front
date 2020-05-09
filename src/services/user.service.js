import axios from 'axios';
import authHeader from './auth-header';
import { LocalStorage } from 'quasar'

const API_URL = 'https://gaetan-rouseyrol.dev/api';

class UserService {
  getPantries() {
    return axios.get(API_URL + '/pantries');
  }

  getUserInfo() {
    return axios.get(API_URL + '/users/me.json', { headers: authHeader() }).then(
      response => {
      if (response.data) {
        LocalStorage.set('user.data', JSON.stringify(response.data));
      }
      console.log(LocalStorage.getItem('user.data'))
      return response.data;
    });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
