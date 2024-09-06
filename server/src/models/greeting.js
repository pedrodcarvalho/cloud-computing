const mongoose = require('mongoose');

const greetingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  greeting: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  id: {
    type: String,
  },
  username: {
    type: String,
    ref: 'User',
  },
});

module.exports = mongoose.model('Greeting', greetingSchema);
