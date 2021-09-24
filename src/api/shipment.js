import api from 'api';

export default {
  getShipmentList() {
    return api.get('/shipments');
  },
  createShipment(payload) {
    return api.post('/shipments', payload);
  },
};
