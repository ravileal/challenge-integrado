const { Schema, model } = require('mongoose');

const university = new Schema({
    name: { type: String, required: true },
    state: { type: String, required: true },
    state_code: String,
    country: { type: String, required: true },
    country_code: String,
    web_pages: [String],
    domains: [String],
    createdAt: Date,
    updatedAt: Date,
});
university.index({ name: 1, state: 1, country: 1 }, { unique: true });

module.exports = model('University', university);
