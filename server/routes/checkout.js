const router = require('express').Router();
const stripe = require('stripe')('sk_test_51Otn4m1ObdAUbr0ZsG9q5WjdiRnCbA422WFxnmbnWMTxRm52vhQ8MgoYtHWZgqUXdFzABLsTdNmSBaO7wGenZV4b00BSrVjkG3');
const CommissionModel = require('../models/commission'); 
require('dotenv').config();

router.post('/create-payment-intent', async (req, res) => {
    try {
        const { email } = req.body;
        const commissionData = await CommissionModel.findOne({ email }).sort({date: -1}); // เพิ่ม .sort({date: -1}) เพื่อเรียงลำดับข้อมูลตามวันที่ล่าสุดก่อน
        if (!commissionData) {
            return res.status(400).json({ error: 'Commission data not found for the provided email' });
        }

        const paymentInThb = commissionData.payment * 35;
        const intent = await stripe.paymentIntents.create({
            payment_method_types: ['promptpay'],
            amount: Math.round(paymentInThb * 100), 
            currency: 'thb',
        });

        res.json({ client_secret: intent.client_secret, commission: commissionData });
    } catch (err) {
        console.error('Error creating PaymentIntent:', err.message);
        res.status(500).json({ error: 'Failed to create PaymentIntent' });
    }
});

router.get('/get-payment', async (req, res) => {
    try {
        const email = req.query.email; 

        if (!email) {
            return res.status(400).json({ error: 'Email parameter is required' });
        }

        const commissionData = await CommissionModel.findOne({ email }); 
        if (!commissionData) {
            return res.status(404).json({ error: 'No payment data found for this email' });
        }

        res.json({ payment: commissionData.payment });
    } catch (err) {
        console.error('Error fetching payment data:', err.message);
        res.status(500).json({ error: 'Failed to fetch payment data' });
    }
});

module.exports = router;
