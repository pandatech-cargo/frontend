import api from 'api';

export default {
  getShipmentList() {
    return api.get('/shipments');
  },
};
