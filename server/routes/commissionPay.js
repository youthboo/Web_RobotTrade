const router = require('express').Router();
const CommissionModel = require('../models/commission');

router.post('/commission', async (req, res) => {
    try {
        const { userLogin, commissionPayment, datetime, email } = req.body;
        
        if (!userLogin || !commissionPayment || isNaN(commissionPayment) || !datetime || !email) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const month = new Date(datetime).getMonth() + 1;
        let commission = await CommissionModel.findOne({ userLogin, month });
        
        if (commission) {
            commission.payment = commissionPayment;
            commission.email = email; // เพิ่ม email ที่รับมาจาก request
            await commission.save();
        } else {
            // ถ้ายังไม่มี commission ในฐานข้อมูล ให้สร้างข้อมูลใหม่
            commission = new CommissionModel({ userLogin, payment: commissionPayment, month, email });
            await commission.save();
        }

        res.status(201).send('Commission payment saved successfully');
    } catch (error) {
        console.error('Error saving commission payment:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/commission', async (req, res) => {
    try {
        const { userLogin, commissionPayment, email } = req.body;
        if (!userLogin || !commissionPayment || isNaN(commissionPayment) || !email) {
            return res.status(400).json({ error: 'Invalid input data' });
        }
        let commission = await CommissionModel.findOne({ userLogin });
        if (commission) {
            commission.payment = commissionPayment;
            commission.email = email; // เพิ่ม email ที่รับมาจาก request
            await commission.save();
            return res.status(200).json({ message: 'Commission payment updated successfully' });
        } else {
            commission = new CommissionModel({ userLogin, payment: commissionPayment, email });
            await commission.save();
            return res.status(201).json({ message: 'Commission payment saved successfully' });
        }
    } catch (error) {
        console.error('Error updating/saving commission payment:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
