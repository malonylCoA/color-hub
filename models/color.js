const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColorSchema = new Schema ({
    name: String, 
    hex: String
});

module.exports = mongoose.model('Color', ColorSchema)