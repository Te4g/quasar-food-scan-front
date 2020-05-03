import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://gaetan-rouseyrol.dev/api';

class UserService {
  getPantries() {
    return axios.get(API_URL + '/pantries');
  }

  getUserBoard() {
    return axios.get(API_URL + '/users', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
