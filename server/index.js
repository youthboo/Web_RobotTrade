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
const webhookRoutes = require('./routes/webhook')
const cron = require('node-cron');
const axios = require('axios');
const { User } = require('./models/user')

cron.schedule('31 21 17 * *', async () => {
    try {
        console.log('Cron job started at', new Date());
        await saveCommissionData();
    } catch (error) {
        console.error('Error saving commission data:', error);
    }
});

async function saveCommissionData() {
    try {
        const response = await axios.get('http://localhost:5555/api/mt4user');
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

            // ค้นหาผู้ใช้โดยใช้ userLogin จาก User model
            const user = await User.findOne({ port: userLogin });

            if (user && user.email) {
                const commissionData = {
                    userLogin: userLogin,
                    commissionPayment: commissionAmount,
                    datetime: new Date(),
                    email: user.email // เพิ่ม email ของผู้ใช้ในข้อมูล commission
                };

                // เก็บข้อมูล commission ลงในฐานข้อมูล
                await saveCommissionToDatabase(commissionData);
            } else {
                console.log(`Email not found for userLogin: ${userLogin}`);
            }
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
app.use(cors())
app.use('/api', webhookRoutes)
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'))
app.use(express.json())

//routes
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/Payment', genQrRoutes);
app.use('/api', mt4DataRoutes); 
app.use('/api', commissionRoutes)
app.use('/api', slipRoutes)
app.use('/api', admincheckRoutes)
app.use('/api', checkRoutes)
app.use('/api', profileRoutes)

app.get("/gold",(req,res)=>{
    res.download("bot_gold.mq4")
})

app.get("/eurusd",(req,res)=>{
    res.download("bot_eurusd.mq4")
})

app.get("/usdjpy",(req,res)=>{
    res.download("bot_usdjpy.mq4")
})



const port = process.env.PORT || 5555;
app.listen(port,() => console.log("Listening on port..."))
