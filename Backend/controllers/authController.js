const User = require("../models/User");
const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const { sendOTPEmail } = require("./emailController/emailController");

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, countryCode, mobile, password, address } =
      req.body;

    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "User already exists", errCode: "1" });

    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += Math.floor(Math.random() * 10);
    }

    const mailResp = sendOTPEmail(otp, email);
    if (mailResp.ststus === 500) {
      return res.status(500).json({ message: "Error sending OTP", errCode: 3 });
    }

    user = new User({
      name,
      email,
      country_code: countryCode,
      mobile,
      password,
      address,
      otp,
      otp_expires: new Date(new Date().getTime() + 5 * 60000),
      otp_verified: false,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Server Error" });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Server Error" });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    logger.info("Verifying OTP for " + email);
    if (!email.includes("@") || otp.length !== 6) {
      logger.error("Invalid Input");
      return res
        .status(400)
        .json({ message: "Invalid Input Error", errCode: 0 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      logger.error({ message: "User not found" });
      return res.status(400).json({ message: "User not found", errCode: 1 });
    }

    if (new Date() > user.otp_expires) {
      logger.error({ message: `OTP Expired for ${email}` });
      return res.status(400).json({ message: "OTP Expired.", errCode: 2 });
    }

    if (user.otp !== otp) {
      logger.error({ message: `Incorrect OTP entered by ${email}` });
      return res.status(400).json({ message: "Incorrect OTP.", errCode: 3 });
    }
    user.otp_verified = true;
    user.active = true;
    await user.save();
    logger.info({ message: `OPT Successfully verified for ${email}` });
    return res.status(200).json({ message: "OTP Verified" });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: "Server Error", errCode: 4 });
  }
};

exports.resendOPT = async (req, res) => {
  const { email } = req.body;
  logger.info(`Regenerating OTP for ${email}`);
  if (!email.includes("@")) {
    logger.error("Invalid Input");
    return res.status(400).json({ message: "Invalid Input Error", errCode: 0 });
  }
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  const user = await user.findOne({ email });
  if (!user) {
    logger.error({ message: "User not found" });
    return res.status(400).json({ message: "User not found", errCode: 1 });
  }

  const mailResp = sendOTPEmail(otp, email);
  if (mailResp.ststus === 500) {
    return res.status(500).json({ message: "Error sending OTP", errCode: 3 });
  } else {
    user.otp = otp;
    user.otp_expires = new Date(new Date().getTime() + 5 * 60000);
    user.active = false;
    user.otp_verified = false;
    user.save();

    logger.info({ message: `OTP regenerated for ${email}` });
    return res.status(200).json({ message: "OTP regenerated" });
  }
};

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  logger.info(`Generating OTP for ${email}'s password change`);
  if (!email.includes("@")) {
    logger.error("Invalid Input");
    return res.status(400).json({ message: "Invalid Input Error", errCode: 0 });
  }
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  const user = await User.findOne({ email });
  if (!user) {
    logger.error({ message: "User not found" });
    return res.status(400).json({ message: "User not found", errCode: 1 });
  }

  const mailResp = sendOTPEmail(otp, email);
  if (mailResp.ststus === 500) {
    return res.status(500).json({ message: "Error sending OTP", errCode: 3 });
  } else {
    user.otp = otp;
    user.otp_expires = new Date(new Date().getTime() + 5 * 60000);
    user.active = false;
    user.otp_verified = false;
    user.save();

    logger.info({
      message: `OTP generated for ${email}'s password reset process`,
    });
    return res
      .status(200)
      .json({ message: "OTP generated password reset process" });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword, otp } = req.body;
  logger.info(`Started process to change password for ${email}`);

  if (!email.includes("@") || otp.length !== 6) {
    logger.error("Invalid Input");
    return res.status(400).json({ message: "Invalid Input Error", errCode: 0 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    logger.error(`User not found for ${email}`);
    return res.status(400).json({ message: "User not found", errCode: 1 });
  }

  if (new Date() > user.otp_expires) {
    logger.error(`OTP exired for ${email}`);
    return res.status(400).json({ message: "OTP Expired", errCode: 2 });
  }

  if (otp !== user.otp) {
    logger.error(`Invalid OTP for ${email}`);
    return res.status(400).json({ message: "Invalid OTP", errCode: 3 });
  } else {
    user.password = newPassword;
    user.otp_verified = true;
    user.otp = undefined;
    user.otp_expires = undefined;
    user.active = true;

    user.save();
    logger.info(`Password Successfully changed for ${email}`);
    return res.status(200).json({ message: "Password Successfully changed" });
  }
};

exports.requestProfile = async (req, res) => {
  const id = req.params.id;

  logger.info(`Requesting profile for ${id}`);
  // if (!email.includes("@")) {
  //   logger.error("Invalid Input");
  //   return res.status(400).json({ message: "Invalid Input Error", errCode: 0 });
  // }

  const user = await User.findOne({ _id : id });
  console.log(user);
  
  if (!user) {
    logger.error(`User not found for ${id}`);
    return res.status(400).json({ message: "User not found", errCode: 1 });
  }
  logger.info(`Profile Successfully sent for ${id}`);
  res.send({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    address: user.address,
    country_code: user.country_code,
  });
};
