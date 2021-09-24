import api from './index';

export default {
  login(payload) {
    return api.post(`/admins/login`, payload);
  },
  logout(access_token) {
    return api.delete(`/admins/logout`, { data: { access_token } });
  },
};
