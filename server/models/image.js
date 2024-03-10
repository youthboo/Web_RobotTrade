const mongoose = require('mongoose');

const slipSchema = new mongoose.Schema({
    slipImage: String,
    uploadDateTime: { type: Date, default: Date.now }, // เพิ่มฟิลด์ uploadDateTime สำหรับเก็บวันที่เวลา โดยมีค่าเริ่มต้นเป็นวันที่และเวลาปัจจุบัน
    portNumber: String // เพิ่มฟิลด์ portNumber สำหรับเก็บเลข portnumber
});

const SlipModel = mongoose.model('Slip', slipSchema);

module.exports = SlipModel;
