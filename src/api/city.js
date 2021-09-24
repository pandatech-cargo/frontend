import api from 'api';

export default {
  getCityList() {
    return api.get('/cities');
  },
};
