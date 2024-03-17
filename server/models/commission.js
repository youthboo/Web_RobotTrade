const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema({
    userLogin: { type: String, required: true },
    payment: { type: Number, required: true, min: 0 },
    amountReceived: { type: Number, default: 0 }, 
    status: { type: String, default: "Pending" }, 
    date: { type: Date, default: Date.now },
    email: { type: String },
});

const CommissionModel = mongoose.model('Commission', commissionSchema);

module.exports = CommissionModel;
