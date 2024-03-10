const express = require('express');
const router = express.Router();
const CommissionModel = require('../models/commission');
const SlipModel = require('../models/image');

router.get('/admincheck', async (req, res) => {
    try {
        const commissions = await CommissionModel.find();
        const slips = await SlipModel.find();

        // รวมข้อมูลที่มี userLogin (หรือ portNumber) เป็นข้อมูลร่วมกัน
        const combinedData = commissions.map(commission => {
            const slip = slips.find(slip => slip.portNumber === commission.userLogin);
            return {
                userLogin: commission.userLogin,
                commissionPayment: commission.payment,
                slipImage: slip ? slip.slipImage : '',
                uploadDateTime: slip ? slip.uploadDateTime : null
            };
        });

        res.json(combinedData);
    } catch (error) {
        console.error('Error fetching and combining data:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
