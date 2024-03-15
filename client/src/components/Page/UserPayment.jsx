import React, { useState } from 'react';
import './UserPayment.css'
import Navbar from "../Navbar";
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51Otn4m1ObdAUbr0ZbfkEXGlUulBwVCPevy47Lwnbkh5KtQMlYyAxhuaN69myWapVx56qcp5LozDubVVAE8EXvLFO00EusqAFqZ');

function UserPayment() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      if (!email) {
        throw new Error('Email is required');
      }
      
      // ส่งคำขอ GET เพื่อขอข้อมูลการจ่ายเงินด้วยอีเมล
      const response = await fetch(`http://localhost:5555/api/get-payment?email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      // เช็คสถานะของการตอบสนอง
      if (!response.ok) {
        throw new Error('Failed to fetch payment data');
      }
      
      const { payment } = await response.json();
  
      // สร้าง PaymentIntent โดยใช้ค่า payment ที่ดึงมา
      const paymentIntentResponse = await fetch('http://localhost:5555/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, payment }),
      });
  
      if (!paymentIntentResponse.ok) {
        throw new Error('Failed to create PaymentIntent');
      }
  
      const { client_secret } = await paymentIntentResponse.json();
  
      // ยืนยันการชำระเงินด้วย PaymentIntent ที่สร้างขึ้น
      const stripe = await stripePromise;
      const { error } = await stripe.confirmPromptPayPayment(client_secret, {
        payment_method: {
          billing_details: { email },
        },
      });
  
      if (error) {
        console.error('Payment confirmation error:', error);
      } else {
        console.log('Payment confirmed successfully!');
      }
    } catch (error) {
      console.error('Error confirming payment:', error);
    }
};

  

  return (
    <div className="Payment">
      <Navbar/>
      <form id="payment-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div id="error-message" role="alert"></div>
        <button id="submit-button" type="submit">Pay</button>
      </form>
    </div>
  );
}

export default UserPayment;
