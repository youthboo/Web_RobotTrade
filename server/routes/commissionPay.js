const router = require('express').Router();
const CommissionModel = require('../models/commission');

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

// ดึงข้อมูล commission โดย userLogin
router.get('/commission', async (req, res) => {
    try {
        const { userPort } = req.query;
        // ถ้ามี userPort ถูกส่งมาจาก client
        if (userPort) {
            const commission = await CommissionModel.findOne({ userLogin: userPort });
            // ถ้าพบ commission ที่ตรงกับ userPort ที่ส่งมา ให้ส่งข้อมูล commission นั้นกลับไป
            if (commission) {
                return res.status(200).json(commission);
            } else {
                // ถ้าไม่พบ commission ให้ส่งข้อความว่าไม่พบข้อมูลกลับไป
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

module.exports = router;
