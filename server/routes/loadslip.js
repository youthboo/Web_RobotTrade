const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const SlipModel = require('../models/image');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single('file');

router.post('/upload-image', async (req, res) => {
    try {
        upload(req, res, async function(err) {
            if (err) {
                return res.status(400).json({ error: 'Failed to upload image' });
            }
            
            // รับข้อมูล portNumber และ uploadDateTime จาก FormData
            const { filename } = req.file;
            const { portNumber, uploadDateTime } = req.body;

            // บันทึกข้อมูลลงในฐานข้อมูล
            const newSlip = new SlipModel({
                slipImage: filename,
                portNumber, 
                uploadDateTime,
            });
            await newSlip.save();

            return res.status(200).json({ message: 'Slip uploaded successfully' });
        });
    } catch (error) {
        console.error('Error uploading slip:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/images', async (req, res) => {
    try {
        const images = await SlipModel.find({}, 'slipImage portNumber uploadDateTime'); // เลือก slipImage และ portNumber
        res.json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
