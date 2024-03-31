const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const FileModel = require('../models/FileModel');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Controller function for uploading file
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { currencyPair, description } = req.body;

    const newFile = new FileModel({
      fileName: req.file.originalname,
      filePath: req.file.path,
      currencyPair: currencyPair,
      description: description
    });

    await newFile.save();

    res.status(201).json({ 
      message: 'File uploaded successfully', 
      fileName: newFile.fileName, 
      filePath: newFile.filePath,
      currencyPair: newFile.currencyPair,
      description: newFile.description
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/download/:currencyPair', async (req, res) => {
  try {
      const currencyPair = req.params.currencyPair;
      // ค้นหาไฟล์ที่มีคู่สกุลเงินตรงกับที่ระบุ และเรียงลำดับตามวันที่ล่าสุด
      const file = await FileModel.findOne({ currencyPair: currencyPair }).sort({ createdAt: -1 });

      if (!file) {
          return res.status(404).json({ error: 'File not found' });
      }

      const fileName = file.fileName;
      const filePath = file.filePath;

      res.download(filePath, fileName, (err) => {
          if (err) {
              console.error('Error downloading file:', err);
              res.status(500).json({ error: 'Internal server error' });
          } else {
              console.log('File downloaded successfully');
          }
      });
  } catch (error) {
      console.error('Error downloading file:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
  
module.exports = router;