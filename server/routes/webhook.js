const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); // เพิ่มบรรทัด
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
            case 'payment_intent.succeeded':
                console.log('PaymentIntent succeeded:', event.data.object.id);
                break;

            case 'charge.succeeded':
                console.log('Charge succeeded:', event.data.object.id);
                try {
                    const Payment = require('../models/payment');
                    const paymentData = {
                        email: event.data.object.billing_details.email,
                        status: event.data.object.status,
                        amount: event.data.object.amount,
                        amountReceived: event.data.object.amount_captured,
                        currency: event.data.object.currency,
                    };
                    // Create Payment record in the database
                    const newPayment = await Payment.create(paymentData);
                    console.log('Payment created:', newPayment);
                } catch (error) {
                    console.error('Error creating Payment:', error);
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
