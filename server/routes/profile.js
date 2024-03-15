const router = require('express').Router();
const MT4DataModel = require('../models/Mt4Data');
const { User } = require('../models/user');

router.get('/mt4user', async (req, res) => {
    try {
        const mt4data = await MT4DataModel.find();
        const users = await User.find();

        const combinedData = mt4data.map(data => {
            const user = users.find(user => user.port === data.userLogin); // ค้นหาผู้ใช้ที่มี port เหมือนกับ userLogin
            if (user) {
                return {
                    userLogin: data.userLogin,
                    email: user.email,
                    balance: data.balance,
                    equity: data.equity,
                    profit: data.profit,
                    symbol: data.symbol,
                    order: {
                        ticket: data.order.ticket,
                        profit: data.order.profit
                    },
                    datetime: data.datetime
                };
            } else {
                return {
                    userLogin: data.userLogin,
                    email: 'Email not found', // ถ้าไม่พบข้อมูลผู้ใช้
                    balance: data.balance,
                    equity: data.equity,
                    profit: data.profit,
                    symbol: data.symbol,
                    order: {
                        ticket: data.order.ticket,
                        profit: data.order.profit
                    },
                    datetime: data.datetime
                };
            }
        });

        res.json(combinedData);
    } catch (error) {
        console.error('Error fetching and combining data:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
