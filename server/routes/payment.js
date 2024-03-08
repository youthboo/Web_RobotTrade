const express = require('express');
const router = express.Router();
const generatePayload = require('promptpay-qr');
const qrcode = require('qrcode');
const fs = require('fs');

router.use(express.json());

// Define a route with a dynamic amount parameter
router.post('/', (req, res) => {
  const mobileNumber = '091-705-2627'; // const IDCardNumber = '0-0000-00000-00-0';
  // Extract the amount from the request body
  const amount = parseFloat(req.body.amount) || 0;
  // Generate payload based on the mobile number and amount
  const payload = generatePayload(mobileNumber, { amount });
  // Convert to SVG QR Code
  const options = { type: 'svg', color: { dark: '#000', light: '#fff' } };
  
    qrcode.toString(payload, options, (err, svg) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      // Save SVG to a file or send it as a response
      // For now, let's send it as a response
    res.type('svg');
    res.send(svg);
  });
});

module.exports = router;
