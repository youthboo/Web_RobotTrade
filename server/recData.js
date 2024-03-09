const zmq = require('zeromq');
const mongoose = require('mongoose');
const MT4DataModel = require('./models/Mt4Data');
require('dotenv').config();

async function startListening() {
    // เชื่อมต่อ MongoDB
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

        const data = JSON.parse(msg.toString());

        // เก็บข้อมูลใน MongoDB
        try {
            const newData = new MT4DataModel(data);
            await newData.save();
            console.log("Data saved to MongoDB:", newData);
        } catch (error) {
            console.error("Error saving data to MongoDB:", error);
        }

        // ตอบกลับด้วยข้อความว่าง
        socket.send("");
    }
}

startListening().catch(console.error); 