const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema(
  {
    agentName: { type: String, required: true, index: true },
    producer: { type: String },
    csr: { type: String },
    agencyId: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Agent', AgentSchema);
