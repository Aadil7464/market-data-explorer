import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getMetadata = () => api.get('/metadata');

export const getFilteredData = (filters) => api.post('/filter', filters);

export const getDataPreview = (limit = 100, offset = 0) =>
  api.get(`/data-preview?limit=${limit}&offset=${offset}`);

export default api;