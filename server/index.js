require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const genQrRoutes = require('./routes/payment')
const mt4DataRoutes = require('./routes/mt4data');


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())

//routes
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/Payment', genQrRoutes);
app.use('/api', mt4DataRoutes); // เพิ่มเส้นทางสำหรับข้อมูล MT4 

app.get("/",(req,res)=>{
    res.download("botmodel.mq4")
})

const port = process.env.PORT || 5555;


app.listen(port,() => console.log("Listening on port..."))
