import axios from 'axios';
import { tokenManager } from '../utils/tokenManager';

export const api = axios.create({
  baseURL: 'http://3.39.220.56:8080',
});

export const apiWithHeader = axios.create({
  baseURL: 'http://3.39.220.56:8080',
  headers: {
    Authorization: "Bearer " +  tokenManager.getAccess()
  }
});
