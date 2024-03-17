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

// GET a single commission record by ID
router.get('/admincheck/:id', async (req, res) => {
    try {
        const commissionRecord = await Commission.findById(req.params.id);
        if (!commissionRecord) {
            return res.status(404).json({ message: 'Commission record not found' });
        }
        res.json(commissionRecord);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// UPDATE a commission record by ID
router.put('/admincheck/:id', async (req, res) => {
    try {
        const commissionRecord = await Commission.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(commissionRecord);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE a commission record by ID
router.delete('/admincheck/:id', async (req, res) => {
    try {
        const deletedCommission = await Commission.findByIdAndDelete(req.params.id);
        if (!deletedCommission) {
            return res.status(404).json({ message: 'Commission record not found' });
        }
        res.json({ message: 'Commission record deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
  
