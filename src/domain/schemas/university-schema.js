const { Schema, model } = require('mongoose');

const university = new Schema({
    name: { type: String, required: true },
    state: String,
    state_code: String,
    country: String,
    country_code: String,
    web_pages: [String],
    domains: [String],
    createdAt: Date,
    updatedAt: Date,
});
university.index({ name: 1, state: 1, country: 1 }, { unique: true });

module.exports = model('University', university);
