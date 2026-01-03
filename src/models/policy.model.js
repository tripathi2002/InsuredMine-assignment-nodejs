const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema(
  {
    policyNumber: { type: String, required: true, index: true },
    policyStartDate: { type: Date },
    policyEndDate: { type: Date },
    policyType: { type: String },
    policyMode: { type: String },
    premiumAmount: { type: Number },
    premiumWritten: { type: Number },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LOB',
      required: true
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Carrier',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Policy', PolicySchema);
