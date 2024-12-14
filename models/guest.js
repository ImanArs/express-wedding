const mongoose = require('mongoose')

const guestSchema = new mongoose.Schema({
  createdAt: {type: String, default: new Date().toLocaleDateString(), required: true },
  name: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, default: '' },
  confirmed: { type: Boolean, default: false },
  is_plus_one: { type: Boolean, default: false },
  plus_one_id: { type: String, default: '' },
  seat_id: { type: String, default: '' },
  event_id: { type: String, default: '674c3d66c8640470627f4a28' },
  status: { type: String, default: '' }
});

module.exports = mongoose.model('Guests', guestSchema);
