const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema(
  {
    accountName: { type: String, required: true },
    accountType: { type: String },
    hasActivePolicy: { type: Boolean },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Account', AccountSchema);