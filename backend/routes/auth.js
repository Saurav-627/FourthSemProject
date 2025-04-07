const router = require("express").Router();
const axios = require("axios");
const User = require("../model/User");
require("dotenv").config();
const Otp = require("../model/Otp");
const verifyOtp = require("../controllers/verifyOtp");
const History = require("../model/History");
const Doctor = require("../model/Doctor");

router.post("/sendOTP", async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000);
  const message = `Your OTP is ${otp}`;
  const url = `https://sms.aakashsms.com/sms/v3/send`;
  const body = {
    auth_token: process.env.SMS,
    to: phone,
    text: message,
  };
  try {
    // const response = await axios.post(url, body);
    // const data = await response.data;
    // console.log(data);
    const newOtp = new Otp({
      phone: phone,
      otp: otp,
      expireAt: Date.now() + 300000,
    });
    await newOtp.save();
    res.status(200).json({ otp: otp });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/register", async (req, res) => {
  const { phone, name, city, age } = req.body;
  if (!phone || !name || !city || !age) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const newUser = new User({
    phone: phone,
    name: name,
    city: city,
    age: age,
  });
  try {
    await newUser.save();
    res.status(200).json({ message: "User Created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/updateData", async (req, res) => {
  const { phone, name, emergencyContact, blood, image, address } = req.body;
  if (!name || !emergencyContact || !blood || !phone || !image || !address) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  try {
    const user = await User.findOne({ phone: phone });
    if (!user) return res.status(400).json({ message: "User Not Found" });
    user.name = name;
    user.emergencyContact = emergencyContact;
    user.blood = blood;
    user.profile = image;
    user.address = address;

    await user.save();
    res.status(200).json({ message: "User Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const isOtpValid = await verifyOtp(otp, phone);
  console.log(isOtpValid);
  if (!isOtpValid) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  const user = await User.findOne({ phone: phone });

  if (!user) {
    return res.json({ message: "CREATE" });
  }
  return res.json({ message: "SUCCESS", user: user });
});

router.get("/data/:phone", async (req, res) => {
  const { phone } = req.params;
  const user = await User.findOne({ phone: phone });

  if (!user) {
    return res.status(400).json({ message: "User Not Found" });
  }
  return res.status(200).json({ user: user });
});

router.post("/addHistory", async (req, res) => {
  const { phone, doctor_id, price, token, doctor_name, alloted, hospital } =
    req.body;

  console.log(req.body);
  if (
    !phone ||
    !doctor_id ||
    !price ||
    !token ||
    !doctor_name ||
    !alloted ||
    !hospital
  ) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const hist = await History.findOne({
    doctor_id: doctor_id,
    phone: phone,
    status: "Pending",
  });

  if (hist)
    return res.status(400).send({ message: "Appointment Already Booked" });

  try {
    const history = new History({
      phone: phone,
      doctor_id: doctor_id,
      price: price,
      token: token,
      alloted: alloted,
      doctor: doctor_name,
      hospital: hospital,
      status: "Pending",
    });
    await history.save();
    res.status(200).send({ message: "History Created" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/checkStatus/:doctor_id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const history = await History.find({ doctor_id: id });
  if (!history) {
    return res.status(200).send({ message: "No History Found" });
  }
  const length = history.length;
  if (length >= 20) {
    return res.status(400).send({ message: "No seats left" });
  }
  return res.status(200).send({ message: "Seats Available" });
});

router.get("/getHistory/:phone", async (req, res) => {
  const { phone } = req.params;
  const history = await History.find({ phone: phone });
  if (!history) {
    return res.status(400).json({ message: "History Not Found" });
  }
  return res.status(200).json({ history: history });
});

router.patch("/updateHistory", async (req, res) => {
  const { phone, doctor_id, status } = req.body;
  if (!phone || !doctor_id || !status) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  try {
    const history = await History.findOne({
      phone: phone,
      doctor_id: doctor_id,
      status: "Pending",
    });
    if (!history) return res.status(400).json({ message: "History Not Found" });
    if (history.status === "Cancelled")
      return res.status(400).send({ message: "Already Cancelled" });
    history.status = status;

    await history.save();
    res.status(200).json({ message: "History Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
