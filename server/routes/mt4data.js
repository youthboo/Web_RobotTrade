const router = require('express').Router();
const MT4DataModel = require('../models/Mt4Data');

router.get('/mt4data', async (req, res) => {
    try {
        const currentDate = new Date(); // สร้างวันที่ปัจจุบัน
        const currentMonth = currentDate.getMonth() + 1; // หาเดือนปัจจุบัน
        const currentYear = currentDate.getFullYear(); // หาปีปัจจุบัน

        // แปลงค่าเดือนปัจจุบันให้อยู่ในรูปแบบ YYYY-MM เพื่อใช้ในการค้นหา
        const currentMonthFormatted = `${currentYear}-${currentMonth < 10 ? '0' : ''}${currentMonth}`;

        // ค้นหาข้อมูลที่มีฟิลด์ datetime ในเดือนปัจจุบัน
        const mt4Data = await MT4DataModel.find({ datetime: { $gte: new Date(currentYear, currentMonth - 1, 1), $lt: new Date(currentYear, currentMonth, 1) } });

        res.json(mt4Data);
    } catch (error) {
        console.error('Error fetching MT4 data:', error);
        res.status(500).json({ error: 'Error fetching MT4 data' });
    }
});



module.exports = router;
