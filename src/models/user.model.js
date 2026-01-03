const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    dob: { type: Date },
    address: { type: String },
    phone: { type: String },
    state: { type: String },
    zip: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    gender: { type: String },
    userType: { type: String },
    city: { type: String },
    isPrimary: { type: Boolean },
    applicantId: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
