import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = ({ amount, userLogin }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            console.error(error);
            return;
        }

        const response = await axios.post('http://localhost:5555/api/payment', {
            amount,
            userLogin,
            payment_method_id: paymentMethod.id,
        });

        console.log(response.data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay ${amount}
            </button>
        </form>
    );
};

export default PaymentForm;
