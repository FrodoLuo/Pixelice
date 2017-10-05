import axios from 'axios';

export function post(url, data, options) {
  return axios.post(url, data, options);
}

export function get(url, data, options) {
  return axios.get(url, data, options);
}

export default function (options) {
  return axios(options);
}
