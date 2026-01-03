const mongoose = require('mongoose');

const ScheduledMessageSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    scheduledAt: { type: Date, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ScheduledMessage', ScheduledMessageSchema);
