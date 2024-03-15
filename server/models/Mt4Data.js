const mongoose = require('mongoose');

const mt4DataSchema = new mongoose.Schema({
    balance: Number,
    equity: Number,
    profit: Number,
    symbol: String,
    userLogin: String,
    order: {
        ticket: String,
        profit: Number
    },
    datetime: Date, // เพิ่มฟิลด์วันที่และเวลาใน Schema
    
});

// สร้าง Model จาก Schema ของข้อมูล MT4
const MT4DataModel = mongoose.model('MT4Data', mt4DataSchema);

module.exports = MT4DataModel;
