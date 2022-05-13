import axios from 'axios';
import storage from './storage';
const host = process.env.REACT_APP_API_URL;

const client = {
  get: (path) => {
    const url = `${host}${path}`;
    const headers = {
      Authorization: `Bearer ${storage.loadStorage().token}`,
    };

    return axios.get(url, { headers });
  },

  post: (path, data, withToken = true) => {
    const url = `${host}${path}`;
    const token = storage.loadStorage().token;
    let headers = {};
    if (withToken) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return axios.post(url, data, { headers });
  },

  put: (path, data) => {
    const url = `${host}${path}`;
    const headers = {
      Authorization: `Bearer ${storage.loadStorage().token}`,
    };
    return axios.put(url, data, { headers });
  },

  patch: (path, data, withToken = true) => {
    const url = `${host}${path}`;
    const token = storage.loadStorage().token;
    let headers = {};
    if (withToken) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return axios.patch(url, data, { headers });
  },

  delete: (path,withToken = true) => {
    const url = `${host}${path}`;
    const token = storage.loadStorage().token;
    let headers = {};
    if (withToken) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return axios.delete(url, {headers});
  }
};

export default client;
