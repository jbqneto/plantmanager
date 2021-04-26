import axios from 'axios';

export const Endpoints = {
  LIST_ENVIRONMENTS: 'plants_environments',
  LIST_WATER_FREQUENCIES: 'plants_water_frequencies',
  LIST_PLANTS: 'plants'
}

const api = axios.create({
  baseURL: 'http://192.168.15.8:3333'
})

export default api;