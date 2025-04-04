const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    country_code: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    otp: { type: String, required: false },
    otp_expires: { type: Date, required: false },
    otp_verified: { type: Boolean, required: true, default: false },
    active: { type: Boolean, required: true, default:false },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare passwords
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
