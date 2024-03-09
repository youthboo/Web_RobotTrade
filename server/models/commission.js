const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema({
    userLogin: String, // เพิ่มฟิลด์ userLogin
    payment: Number,
   
});

const CommissionModel = mongoose.model('Commission', commissionSchema);

module.exports = CommissionModel;
