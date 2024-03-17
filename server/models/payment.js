const mongoose = require('mongoose');

// กำหนดโครงสร้างของข้อมูล Payment
const paymentSchema = new mongoose.Schema({
  email: { type: String }, 
  status: { type: String, required: true }, 
  amount: { type: Number, required: true },
  amountReceived: { type: Number, required: true },
  currency: { type: String, required: true }, 
  timestamp: { type: Date, default: Date.now }
});

// สร้างโมเดล Payment จาก schema ที่กำหนด
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
