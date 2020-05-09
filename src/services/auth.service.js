import axios from 'axios';
import { LocalStorage } from 'quasar'

const API_URL = 'https://gaetan-rouseyrol.dev';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + '/api/login_check', {
        'email': user.email,
        'password': user.password
      })
      .then(response => {
        if (response.data.token) {
          LocalStorage.set('user', JSON.stringify(response.data));
        }

        return response.data;
      })
      .catch(error => prompt(error.message))
  }

  logout() {
    LocalStorage.remove('user');
    LocalStorage.remove('user.data');
  }

  register(user) {
    return axios.post(API_URL + '/register', {
      name: user.name,
      email: user.email,
      password: user.password
    }).then(
      response => console.log(response),
      error => console.log(error.message)
    );
  }
}

export default new AuthService();
