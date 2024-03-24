const mongoose = require('mongoose');

// Define schema for file
const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  currencyPair: {
    type: String, 
    required: true
  },
  description: {
    type: String, // เพิ่มฟิลด์ explain ประเภทข้อมูลเป็น String
    required: false // ตั้งค่าให้ไม่บังคับ
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

// Create model for file
const FileModel = mongoose.model('File', fileSchema);

module.exports = FileModel;
