const router = require('express').Router();
const MT4DataModel = require('../models/Mt4Data');

// Endpoint เรียกข้อมูล MT4Data
router.get('/mt4data', async (req, res) => {
    try {
        const mt4Data = await MT4DataModel.find();
        res.json(mt4Data);
    } catch (error) {
        console.error('Error fetching MT4 data:', error);
        res.status(500).json({ error: 'Error fetching MT4 data' });
    }
});



module.exports = router;
