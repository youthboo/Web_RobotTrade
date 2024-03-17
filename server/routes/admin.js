const express = require('express');
const router = express.Router();
const Commission = require('../models/commission'); // Import Commission model

router.get('/admincheck', async (req, res) => {
    try {
      const commissionRecords = await Commission.find().sort({ date: -1 });
      res.json(commissionRecords);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router;
