import api from './index';

export default {
  getAllTrucks(params) {
    return api.get('trucks', { params });
  },
  getTruck(id) {
    return api.get(`trucks/${id}`);
  },
  updateTruckStatus(id, action) {
    return api.patch(`trucks/${id}/${action}`);
  },
  getAllDrivers() {
    return api.get('trucks');
  },
  updateDriverStatus(id, action) {
    return api.patch(`trucks/${id}/${action}`);
  },
};
