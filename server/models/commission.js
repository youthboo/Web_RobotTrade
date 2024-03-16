const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema({
    userLogin: { type: String, required: true },
    payment: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now },
    email: { type: String },
    paymentStatus: { type: String, default: 'Pending' } // เพิ่มฟิลด์ paymentStatus
});

const CommissionModel = mongoose.model('Commission', commissionSchema);

module.exports = CommissionModel;
