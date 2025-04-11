const Otp = require("../model/Otp");

const verifyOtp = async (otp, phone) => {
  const getOtp = await Otp.findOne({ phone, otp });
  if (!getOtp) return false;
  if (getOtp.expireAt < Date.now()){
    await Otp.deleteOne({ _id: getOtp._id }); 
    return false
  };
  await Otp.deleteOne({ _id: getOtp._id });
  return true;
};

module.exports = verifyOtp;
