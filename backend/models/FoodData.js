const mongoose = require('mongoose');

const foodDataSchema = new mongoose.Schema({
    CategoryName: { type: String, required: true },
    name: { type: String, required: true },
    img: { type: String, required: true },
    options: { type: Array, required: true },
    description: { type: String, required: true },
});

const foodData = mongoose.model('foodData', foodDataSchema);

module.exports = foodData;
