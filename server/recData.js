const zmq = require('zeromq');
const mongoose = require('mongoose');
const MT4DataModel = require('./models/Mt4Data');
require('dotenv').config();

async function startListening() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));

    // เปิดการเชื่อมต่อ ZeroMQ socket
    const socket = new zmq.Reply();
    await socket.bind("tcp://*:8000");
    console.log("Listening for messages from MT4...");

    // รอรับข้อมูลจาก MT4
    for await (const [msg] of socket) {
        if (msg.length === 0) {
            console.log("No message received from MT4");
            continue; 
        }

        try {
            const data = JSON.parse(msg.toString());
            data.datetime = new Date(); // เพิ่มข้อมูลเวลา
            const newData = new MT4DataModel(data);
            await newData.save();
            console.log("Data saved to MongoDB:", newData);
        } catch (error) {
            console.error("Error processing received JSON:", error);
            // จัดการข้อผิดพลาดที่เกิดขึ้นในการแปลง JSON หรือการเก็บข้อมูล
            // เช่น แสดงข้อความแจ้งเตือนหรือบันทึกข้อผิดพลาดไปยังฐานข้อมูลหรือไฟล์ข้อความ
        }

        // ตอบกลับด้วยข้อความว่าง
        socket.send("");
    }
}

startListening().catch(console.error);

