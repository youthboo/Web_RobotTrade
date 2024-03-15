require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const genQrRoutes = require('./routes/payment')
const mt4DataRoutes = require('./routes/mt4data');
const commissionRoutes = require('./routes/commissionPay')
const slipRoutes = require('./routes/loadslip')
const admincheckRoutes = require('./routes/admin')
const checkRoutes = require('./routes/checkout')
const cron = require('node-cron');
const axios = require('axios');

// กำหนดคำสั่งที่ต้องการให้ cron job ทำงานทุกสิ้นเดือน
cron.schedule('0 0 1 * *', async () => {
    try {
        // ส่งคำสั่งให้เก็บข้อมูล commission ทุกสิ้นเดือน
        await saveCommissionData();
    } catch (error) {
        console.error('Error saving commission data:', error);
    }
});

async function saveCommissionData() {
    try {
        const response = await axios.get('http://localhost:5555/api/mt4data');
        const mt4Data = response.data;

        // คำนวณค่าคอมมิชันและบันทึกลงในตาราง commission
        for (const data of mt4Data) {
            const totalProfit = data.profit; 
            const commissionAmount = totalProfit * 0.1; 

            const commissionData = {
                userLogin: data.userLogin,
                commissionPayment: commissionAmount,
                datetime: new Date() // ใช้เวลาปัจจุบันเป็นเวลาของคอมมิชัน
            };

            await saveCommissionToDatabase(commissionData);
        }

        console.log('Commission data saved successfully');
    } catch (error) {
        console.error('Error saving commission data:', error);
    }
}

async function saveCommissionToDatabase(commission) {
    try {
        commission.date = new Date();
        // ส่งข้อมูล commission ไปบันทึกลงใน MongoDB ผ่าน API
        await axios.post('http://localhost:5555/api/commission', commission);
    } catch (error) {
        console.error('Error saving commission to database:', error);
    }
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use(express.static('uploads'))

//routes
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/Payment', genQrRoutes);
app.use('/api', mt4DataRoutes); // เพิ่มเส้นทางสำหรับข้อมูล MT4 
app.use('/api', commissionRoutes)
app.use('/api', slipRoutes)
app.use('/api', admincheckRoutes)
app.use('/api', checkRoutes)

app.get("/",(req,res)=>{
    res.download("botmodel.mq4")
})

app.set('view engine', 'ejs');

const port = process.env.PORT || 5555;


app.listen(port,() => console.log("Listening on port..."))
