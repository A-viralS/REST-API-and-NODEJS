// models/url.js

const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,  // Make sure 'redirectURL' is defined properly
        required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
}, { timestamps: true });

const URL = mongoose.model('url', URLSchema);
module.exports = URL;
