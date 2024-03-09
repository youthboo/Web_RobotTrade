const mongoose = require('mongoose');

const slipSchema = new mongoose.Schema({
    userLogin: String,
    slipImage: String
});

const SlipModel = mongoose.model('Slip', slipSchema);

module.exports = SlipModel;
