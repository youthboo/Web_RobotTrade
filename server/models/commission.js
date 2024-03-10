const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema({
    userLogin: String,
    payment: Number,
});

const CommissionModel = mongoose.model('Commission', commissionSchema);

module.exports = CommissionModel;
