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
const profileRoutes = require('./routes/profile')
const cron = require('node-cron');
const axios = require('axios');

cron.schedule('14 23 15 * *', async () => {
    try {
        console.log('Cron job started at', new Date());
        await saveCommissionData();
    } catch (error) {
        console.error('Error saving commission data:', error);
    }
});

async function saveCommissionData() {
    try {
        const response = await axios.get('http://localhost:5555/api/mt4data');
        const mt4Data = response.data;

        const commissionMap = new Map(); // เก็บ commission ตาม userLogin
        for (const data of mt4Data) {
            const userLogin = data.userLogin;
            const totalProfit = data.profit;

            if (commissionMap.has(userLogin)) {
                // เพิ่มค่า profit เข้ากับ userLogin ที่มีอยู่แล้ว
                commissionMap.set(userLogin, commissionMap.get(userLogin) + totalProfit);
            } else {
                // เพิ่ม userLogin ใหม่และกำหนดค่า profit เริ่มต้น
                commissionMap.set(userLogin, totalProfit);
            }
        }

        // บันทึก commission ลงในฐานข้อมูล
        for (const [userLogin, totalProfit] of commissionMap) {
            const commissionAmount = totalProfit * 0.1;

            const commissionData = {
                userLogin: userLogin,
                commissionPayment: commissionAmount,
                datetime: new Date()
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
app.use('/api', profileRoutes)

app.get("/",(req,res)=>{
    res.download("botmodel.mq4")
})

app.set('view engine', 'ejs');

const port = process.env.PORT || 5555;


app.listen(port,() => console.log("Listening on port..."))
