import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const submitHandler = async (value) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/sendOTP`,
        {
          phone: value,
        }
      );
      const data = await response.data;

      if (data.message === "USER_EXISTS") {
        // Registered user, navigate to main page
        localStorage.setItem("phone", value);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast({
          title: "Login Successful",
          description: "Welcome back!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        navigate("/", { replace: true, state: { user: data.user } });
      } else if (data.message === "OTP_SENT") {
        // New user, navigate to OTP page
        console.log(data.otp); // For testing, remove in production
        toast({
          title: "OTP Sent",
          description: "Please check your phone for the OTP",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        navigate("/otp", { state: { phone: value } });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to process request",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return <LoginForm submitHandler={submitHandler} />;
};

export default Login;