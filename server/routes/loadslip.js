const router = require('express').Router();
const multer = require('multer'); // Import multer for file uploads
const path = require('path');
const SlipModel = require('../models/image');

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload
const upload = multer({
    storage: storage
}).single('file');

// Route to handle file upload
router.post('/upload-image', async (req, res) => {
    try {
        upload(req, res, async function(err) {
            if (err) {
                return res.status(400).json({ error: 'Failed to upload image' });
            }
            
            // ตรวจสอบและบันทึกไฟล์สลิปลงในฐานข้อมูล
            const { filename } = req.file;

            // บันทึกข้อมูลสลิปลงในฐานข้อมูล
            const newSlip = new SlipModel({
                slipImage: filename
            });
            await newSlip.save();

            // ส่งข้อความสำเร็จกลับไปยังไคลเอนต์
            return res.status(200).json({ message: 'Slip uploaded successfully' });
        });
    } catch (error) {
        console.error('Error uploading slip:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
