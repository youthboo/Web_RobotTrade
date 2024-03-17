const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51Otn4m1ObdAUbr0ZsG9q5WjdiRnCbA422WFxnmbnWMTxRm52vhQ8MgoYtHWZgqUXdFzABLsTdNmSBaO7wGenZV4b00BSrVjkG3');

router.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
    const payload = req.body;
    const sig = req.headers['stripe-signature'];
    const endpointSecret = 'whsec_IM3bZl1CafAFKm94cUMTwLwp1FWX0KOj';
    console.log("Raw body:", req.body);

    let event;
    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        
        console.log("Event type:", event.type);
        console.log("Event data:", event.data.object);
        console.log("Event ID:", event.data.object.id);

        switch (event.type) {
            case 'charge.succeeded':
            console.log('Charge succeeded:', event.data.object.id);
            try {
                const CommissionModel = require('../models/commission');
                const commissionData = {
                    email: event.data.object.billing_details.email,
                    payment: parseFloat(((event.data.object.amount/100)/35.).toFixed(3)),
                    date: new Date(),
                };

                const commissionRecord = await CommissionModel.findOne({ email: commissionData.email, statusPayment: { $ne: 'succeeded' } });

                if (commissionRecord) {
                    commissionRecord.amountReceived = parseFloat(((event.data.object.amount_captured/100)/35.).toFixed(3));
                    commissionRecord.statusPayment = event.data.object.status;

                    const updatedCommission = await commissionRecord.save();
                    console.log('Commission record updated:', updatedCommission);
                } else {
                    console.log('No commission record found for email:', commissionData.email);
                }
            } catch (error) {
                console.error('Error updating Commission record:', error);
            }
            break;
            case 'charge.expired':
                console.log('Charge expired:', event.data.object.id);
                break;
            case 'charge.failed':
                console.log('Charge failed:', event.data.object.id);
                break;
            case 'charge.pending':
                console.log('Charge pending:', event.data.object.id);
                break;
            case 'payment_intent.created':
                console.log('PaymentIntent created:', event.data.object.id);
                break;
            
            default:
              console.log(`Unhandled event type: ${event.type}`);
          }

    } catch (error) {
        console.error("Error:", error.message);
        return res.status(400).json({ success: false });
    }

    return res.status(200).json({ success: true });
});

module.exports = router;
