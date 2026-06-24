const express = require('express');
const router = express.Router();
const pythonClient = require('../services/pythonClient');
const FormData = require('form-data');

router.post('/', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const file = req.files.file;
    if (!file.name.endsWith('.feather')) {
      return res.status(400).json({ error: 'Only .feather files are allowed' });
    }

    const form = new FormData();
    form.append('file', file.data, { filename: file.name });

    try {
      const response = await pythonClient.post('/upload', form, {
        headers: form.getHeaders(),
        timeout: 60000,
      });
      res.json(response.data);
    } catch (pythonError) {
      console.error('Python service error:', pythonError.response?.data || pythonError.message);
      const errorMsg = pythonError.response?.data?.detail || pythonError.message || 'Failed to process file';
      res.status(500).json({ error: `File processing failed: ${errorMsg}` });
    }
  } catch (error) {
    console.error('Upload error:', error.message);
    res.status(500).json({ error: 'Upload failed: ' + error.message });
  }
});

module.exports = router;