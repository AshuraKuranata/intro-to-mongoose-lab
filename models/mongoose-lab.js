// Data storage to hold
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    isCool: Boolean,
})

const customer = mongoose.model('Customer', customerSchema);

module.exports = customer