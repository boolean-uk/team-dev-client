import axios from 'axios'
const host = process.env.REACT_APP_API_URL
const tokenKey = process.env.REACT_APP_USER_TOKEN

const client = {
  get: (path) => {
    const url = `${host}${path}`
    const headers = {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    }

    return axios.get(url, { headers })
  },

<<<<<<< HEAD
  post: (path, data, withToken = true) => {
    const url = `${host}${path}`
    const token = localStorage.getItem(tokenKey)
    let headers = {}
=======
  post: (path, data, withToken=true) => {
    const url = `${host}${path}`;
    const token = localStorage.getItem(tokenKey);
    let headers = {};
>>>>>>> 9daeac41cc42b781378b9962ad1a09d3dbff86f0
    if (withToken) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return axios.post(url, data, { headers })
  },

  put: (path, data) => {
    const url = `${host}${path}`
    const headers = {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    }
    return axios.put(url, data, { headers })
  },

  patch: (path, data, withToken = true) => {
    const url = `${host}${path}`
    const token = localStorage.getItem(tokenKey)
    let headers = {}
    if (withToken) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return axios.patch(url, data, { headers })
  },
}

export default client
