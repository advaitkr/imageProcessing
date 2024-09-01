const mongoose = require('mongoose');

const processingStatusSchema = new mongoose.Schema({
    requestId: String,
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProcessingStatus', processingStatusSchema);
