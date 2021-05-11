import axios from 'axios';

const baseURL = 'https://plantmanager-api-wheat.vercel.app/api/plants';

export const Endpoints = {
  LIST_ENVIRONMENTS: 'environments',
  LIST_WATER_FREQUENCIES: 'plants_water_frequencies',
  LIST_PLANTS: 'list'
}

const client = axios.create({
  baseURL
});

const api = {
  listPlants: async (page: Number): Promise<any> => {
    return new Promise((resolve, reject) => {
      const uri = Endpoints.LIST_PLANTS + `?_page=${page}&_limit=6`;
      client.get(uri).then((response) => {
        resolve(response.data);
        })
        .catch((err) => {
          console.log(`Error on ${baseURL}/${uri}`);
          reject(err);
        })
    });

  },
  listEnvironments: async (): Promise<any> => {
    const uri = Endpoints.LIST_ENVIRONMENTS + '?_sort=title&_order=asc';
    
    return new Promise((resolve, reject) => {
      client.get(uri)
        .then((response) => resolve(response.data))
        .catch((err) => {
          console.log(`Error on ${baseURL}/${uri}`);
          reject(err);
        })
    });

  }
}


export default api;