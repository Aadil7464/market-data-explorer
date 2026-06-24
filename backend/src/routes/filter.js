const express = require('express');
const router = express.Router();
const pythonClient = require('../services/pythonClient');

router.post('/', async (req, res) => {
  try {
    const { expiry, strike, instrument } = req.body;
    const response = await pythonClient.post('/filter', { expiry, strike, instrument });
    res.json(response.data);
  } catch (error) {
    console.error('Filter error:', error.message);
    res.status(500).json({ error: 'Failed to apply filters' });
  }
});

module.exports = router;