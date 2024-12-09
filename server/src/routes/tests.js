const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ message: 'API is healthy' });
});

router.post('/test', (req, res) => {
  res.status(201).json({ message: 'Test data created', data: req.body });
});

module.exports = router;
