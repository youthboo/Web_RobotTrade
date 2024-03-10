const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema({
    userLogin: String,
    payment: Number,
    month: String // เพิ่มฟิลด์เก็บข้อมูลเดือน
});

const CommissionModel = mongoose.model('Commission', commissionSchema);

module.exports = CommissionModel;
