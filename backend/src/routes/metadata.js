const express = require('express');
const router = express.Router();
const pythonClient = require('../services/pythonClient');

router.get('/', async (req, res) => {
  try {
    const response = await pythonClient.get('/metadata');
    res.json(response.data);
  } catch (error) {
    console.error('Metadata error:', error.message);
    res.status(500).json({ error: 'Failed to fetch metadata' });
  }
});

module.exports = router;