const router = require("express").Router();
const axios = require("axios");
const User = require("../model/User");
require("dotenv").config();
const Otp = require("../model/Otp");
const verifyOtp = require("../controllers/verifyOtp");
const History = require("../model/History");
const Doctor = require("../model/Doctor");
const { ObjectId } = require("mongodb");

// router.post("/sendOTP", async (req, res) => {
//   const { phone } = req.body;
//   const otp = Math.floor(1000 + Math.random() * 9000);
//   const message = `Your OTP is ${otp}`;
//   const url = `https://sms.aakashsms.com/sms/v3/send`;
//   const body = {
//     auth_token: process.env.SMS,
//     to: phone,
//     text: message,
//   };
//   try {
//     // const response = await axios.post(url, body);
//     // const data = await response.data;
//     // console.log(data);
//     const newOtp = new Otp({
//       phone: phone,
//       otp: otp,
//       expireAt: Date.now() + 300000,
//     });
//     await newOtp.save();
//     res.status(200).json({ otp: otp });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

router.post("/sendOTP", async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ phone });
    if (user) {
      // User is registered, allow direct login
      return res.status(200).json({ message: "USER_EXISTS", user });
    }

    // User is not registered, send OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    const message = `Your OTP is ${otp}`;
    const url = `https://sms.aakashsms.com/sms/v3/send`;
    const body = {
      auth_token: process.env.SMS,
      to: phone,
      text: message,
    };

    // Uncomment when SMS service is active
    /*
    const response = await axios.post(url, body);
    const data = await response.data;
    console.log(data);
    */

    const newOtp = new Otp({
      phone,
      otp,
      expireAt: Date.now() + 300000, // 5 minutes
    });
    await newOtp.save();
    return res.status(200).json({ message: "OTP_SENT", otp }); // Return OTP for testing
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
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

// router.post("/login", async (req, res) => {
//   const { phone, otp } = req.body;
//   if (!phone || !otp) {
//     return res.status(400).json({ message: "Please fill all the fields" });
//   }

//   const isOtpValid = await verifyOtp(otp, phone);
//   console.log(isOtpValid);
//   if (!isOtpValid) {
//     return res.status(400).json({ message: "Invalid OTP" });
//   }
//   const user = await User.findOne({ phone: phone });

//   if (!user) {
//     return res.json({ message: "CREATE" });
//   }
//   return res.json({ message: "SUCCESS", user: user });
// });

router.post("/login", async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    const isOtpValid = await verifyOtp(otp, phone);
    if (!isOtpValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(200).json({ message: "CREATE" }); // New user, proceed to signup
    }

    return res.status(200).json({ message: "SUCCESS", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/data/:phone", async (req, res) => {
  const { phone } = req.params;
  const user = await User.findOne({ phone: phone });

  if (!user) {
    return res.status(400).json({ message: "User Not Found" });
  }
  return res.status(200).json({ user: user });
});

// router.post("/addHistory", async (req, res) => {
//   const { phone, doctor_id, price, token, doctor_name, alloted, hospital } =
//     req.body;

//   console.log(req.body);
//   if (
//     !phone ||
//     !doctor_id ||
//     !price ||
//     !token ||
//     !doctor_name ||
//     !alloted ||
//     !hospital
//   ) {
//     return res.status(400).json({ message: "Please fill all the fields" });
//   }

//   const existing = await History.findOne({ phone, doctor_id, alloted, status: { $ne: "Cancelled" } });
//   if (existing) {
//     return res.status(400).json({ message: "Appointment Already Booked" });
//   }

//   try {
//     const history = new History({
//       phone: phone,
//       doctor_id: doctor_id,
//       price: price,
//       token: token,
//       alloted: alloted,
//       doctor: doctor_name,
//       hospital: hospital,
//       status: "Pending",
//     });
//     await history.save();
//     res.status(200).send({ message: "History Created" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });

// router.post("/checkStatus/:doctor_id", async (req, res) => {
//   const { doctor_id } = req.params;
//   const { time } = req.body; // Expect time in the body

//   try {
//     // Fetch doctor data
//     const doctor = await Doctor.findOne({ _id: ObjectId(doctor_id) });
//     if (!doctor) {
//       return res.status(400).json({ message: "Doctor not found" });
//     }

//     // Find the specific slot
//     const slot = doctor.available.find((s) => s.time === time);
//     if (!slot) {
//       return res.status(400).json({ message: "Slot not found" });
//     }

//     // Fetch history for this doctor and time slot
//     const history = await History.find({
//       doctor_id: doctor_id,
//       alloted: time,
//       status: { $in: ["Pending", "Approved"] } // Only count active bookings
//     });

//     const bookingCount = history.length;

//     if (bookingCount >= slot.limit) {
//       return res.status(400).json({
//         message: "No seats left",
//         limit: slot.limit,
//         currentBookings: bookingCount
//       });
//     }

//     return res.status(200).json({
//       message: "Seats Available",
//       limit: slot.limit,
//       currentBookings: bookingCount
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

router.post("/checkStatus/:doctor_id", async (req, res) => {
  const { doctor_id } = req.params;
  const { time } = req.body;

  try {
    const doctor = await Doctor.findOne({ _id: ObjectId(doctor_id) });
    if (!doctor) {
      return res.status(400).json({ message: "Doctor not found" });
    }

    const slot = doctor.available.find((s) => s.time === time);
    if (!slot) {
      return res.status(400).json({ message: "Slot not found" });
    }

    if (slot.limit <= 0) {
      return res.status(400).json({
        message: "No seats left",
        limit: slot.limit,
        originalLimit: slot.originalLimit,
      });
    }

    return res.status(200).json({
      message: "Seats Available",
      limit: slot.limit,
      originalLimit: slot.originalLimit,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/addHistory", async (req, res) => {
  const { phone, doctor_id, doctor_name, token, price, alloted, hospital } =
    req.body;

  try {
    const doctor1 = await Doctor.findOne({ _id: ObjectId(doctor_id) });
    const slot = doctor1.available.find((s) => s.time === alloted);
    if (slot.limit <= 0) {
      return res.status(400).json({ message: "No seats left" });
    }
    console.log(req.body);

    const existing = await History.findOne({
      phone,
      doctor_id,
      alloted,
      status: { $ne: "Cancelled" },
    });
    if (existing) {
      return res.status(400).json({ message: "Appointment Already Booked" });
    }
    console.log("saurav", doctor_name);
    

    const history = new History({
      phone: phone,
      doctor_id: doctor_id,
      doctor: doctor_name,
      price: price,
      token: token,
      alloted: alloted,
      hospital: hospital,
      status: "Pending",
    });
    await history.save();

    // Decrease the limit
    slot.limit -= 1;
    await doctor1.save();

    res.status(200).json({ message: "History Created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
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
  const { doctor_id, phone, status, alloted } = req.body;

  try {
    const history = await History.findOne({
      doctor_id,
      phone,
      alloted,
      status: { $ne: "Cancelled" },
    });
    if (!history) {
      return res
        .status(400)
        .json({ message: "History not found or already cancelled" });
    }

    history.status = status;
    await history.save();

    // Increase limit if cancelled
    if (status === "Cancelled") {
      const doctor = await Doctor.findOne({ _id: ObjectId(doctor_id) });
      const slot = doctor.available.find((s) => s.time === alloted);
      if (slot.limit < slot.originalLimit) {
        slot.limit += 1;
        await doctor.save();
      }
    }

    res.status(200).json({ message: "History Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getUserBookings/:phone", async (req, res) => {
  const { phone } = req.params;
  try {
    const bookings = await History.find({ phone });
    res.status(200).json({ message: "Bookings Fetched", bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
