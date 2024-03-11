const router = require('express').Router();
const MT4DataModel = require('../models/Mt4Data');
const CommissionModel = require('../models/commission');

router.get('/mt4data', async (req, res) => {
    try {
        const currentDate = new Date(); 
        const currentMonth = currentDate.getMonth() + 1; 
        const currentYear = currentDate.getFullYear(); 
        const currentMonthFormatted = `${currentYear}-${currentMonth < 10 ? '0' : ''}${currentMonth}`;

        const mt4Data = await MT4DataModel.find({ datetime: { $gte: new Date(currentYear, currentMonth - 1, 1), $lt: new Date(currentYear, currentMonth, 1) } });

        res.json(mt4Data);
    } catch (error) {
        console.error('Error fetching MT4 data:', error);
        res.status(500).json({ error: 'Error fetching MT4 data' });
    }
});


module.exports = router;

