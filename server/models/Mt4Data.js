const mongoose = require('mongoose');

// สร้าง Schema สำหรับข้อมูล MT4
const mt4DataSchema = new mongoose.Schema({
    balance: Number,
    equity: Number,
    profit: Number,
    symbol: String,
    userLogin: String,
    order: {
        ticket: String,
        profit: Number
    }
});

// สร้าง Model จาก Schema ของข้อมูล MT4
const MT4DataModel = mongoose.model('MT4Data', mt4DataSchema);

module.exports = MT4DataModel;  