import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lucasrobertodev.com.br/api/wallet',
});

export default api;
