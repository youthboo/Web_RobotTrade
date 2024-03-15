const router = require('express').Router();
const CommissionModel = require('../models/commission');

router.post('/commission', async (req, res) => {
    try {
        const { userLogin, commissionPayment, datetime } = req.body;
        if (!userLogin || !commissionPayment || isNaN(commissionPayment) || !datetime) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const month = new Date(datetime).getMonth() + 1;
        let commission = await CommissionModel.findOne({ userLogin, month });
        
        if (commission) {
            commission.payment = commissionPayment;
            await commission.save();
        } else {
            // ถ้ายังไม่มี commission ในฐานข้อมูล ให้สร้างข้อมูลใหม่
            commission = new CommissionModel({ userLogin, payment: commissionPayment, month });
            await commission.save();
        }

        res.status(201).send('Commission payment saved successfully');
    } catch (error) {
        console.error('Error saving commission payment:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/commission', async (req, res) => {
    try {
        const { userPort } = req.query;
        if (userPort) {
            const commission = await CommissionModel.findOne({ userLogin: userPort });
            if (commission) {
                return res.status(200).json(commission);
            } else {
                return res.status(404).json({ error: 'Commission not found for the specified userPort' });
            }
        } else {
            // ถ้าไม่มี userPort ถูกส่งมา ให้ดึงข้อมูล commission ทั้งหมด
            const commissions = await CommissionModel.find();
            return res.status(200).json(commissions);
        }
    } catch (error) {
        console.error('Error fetching commissions:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/commission', async (req, res) => {
    try {
        const { userLogin, commissionPayment } = req.body;
        if (!userLogin || !commissionPayment || isNaN(commissionPayment)) {
            return res.status(400).json({ error: 'Invalid input data' });
        }
        let commission = await CommissionModel.findOne({ userLogin });
        if (commission) {
            commission.payment = commissionPayment;
            await commission.save();
            return res.status(200).json({ message: 'Commission payment updated successfully' });
        } else {
            commission = new CommissionModel({ userLogin, payment: commissionPayment });
            await commission.save();
            return res.status(201).json({ message: 'Commission payment saved successfully' });
        }
    } catch (error) {
        console.error('Error updating/saving commission payment:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
