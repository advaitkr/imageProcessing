const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    requestId: String,
    serialNumber: String,
    productName: String,
    inputImageUrls: [String],
    outputImageUrls: [String],
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', imageSchema);
