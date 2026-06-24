const axios = require('axios');
const FormData = require('form-data');

const PYTHON_URL = process.env.PYTHON_URL || 'http://localhost:8000';

const pythonClient = axios.create({
  baseURL: PYTHON_URL,
  timeout: 30000,
});

module.exports = pythonClient;