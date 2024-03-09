const router = require('express').Router();
const CommissionModel = require('../Models/commission');

// รับข้อมูล commissionPayment
router.post('/commission', async (req, res) => {
    try {
        const { userLogin, commissionPayment } = req.body;
        // ตรวจสอบข้อมูลที่รับเข้ามา
        if (!userLogin || !commissionPayment || isNaN(commissionPayment)) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        // เก็บ commissionPayment และ userLogin หรือ port ลงในฐานข้อมูล
        const commission = new CommissionModel({ userLogin: userLogin, payment: commissionPayment });
        await commission.save();

        res.status(201).send('Commission payment saved successfully');
    } catch (error) {
        console.error('Error saving commission payment:', error);
        res.status(500).send('Internal Server Error');
    }
});

// ดึงข้อมูล commission
router.get('/commission', async (req, res) => {
    try {
        const commissions = await CommissionModel.find();
        res.status(200).json(commissions);
    } catch (error) {
        console.error('Error fetching commissions:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

