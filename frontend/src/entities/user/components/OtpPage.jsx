import { Center, Heading } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  Flex,
  Stack,
  useColorModeValue,
  HStack,
  PinInput,
  PinInputField,
  useToast,
  Link,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyEmailForm() {
  const navigate = useNavigate();
  const toast = useToast();
  const { state } = useLocation();
  const phone = state?.phone; // Get phone from state
  const [otp, setOtp] = useState("");
  const [disableResend, setDisableResend] = useState(true);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds

  // Handle OTP submission
  const submitHandler = async (e) => {
    e.preventDefault();
    if (otp.length !== 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 4-digit OTP",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/login`,
        {
          phone,
          otp,
        }
      );
      const data = await response.data;

      if (data.message === "CREATE") {
        toast({
          title: "OTP Verified",
          description: "Please complete your registration",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        navigate("/signup", { state: { phone } });
      } else if (data.message === "SUCCESS") {
        localStorage.setItem("phone", phone);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast({
          title: "Login Successful",
          description: "Welcome to the app",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        navigate("/", { replace: true, state: { user: data.user } });
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
      toast({
        title: "Invalid OTP",
        description: "The OTP you entered is incorrect or expired",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  // Handle OTP resend
  const sendOtp = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/sendOTP`,
        {
          phone,
        }
      );
      const data = await response.data;

      if (data.message === "OTP_SENT") {
        console.log(data.otp); // For testing, remove in production
        toast({
          title: "OTP Resent",
          description: "A new OTP has been sent to your phone",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        setDisableResend(true);
        setTimer(300); // Reset timer to 5 minutes
      } else {
        toast({
          title: "Error",
          description: "Failed to resend OTP",
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
        description: "Failed to resend OTP",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  // Timer for resend button
  useEffect(() => {
    if (disableResend && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (timer <= 0) {
      setDisableResend(false);
    }
  }, [disableResend, timer]);

  // Redirect if phone is missing
  useEffect(() => {
    if (!phone) {
      toast({
        title: "Error",
        description: "Phone number is missing",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/login");
    }
  }, [phone, navigate, toast]);

  return (
    <Flex
      h={"600px"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"sm"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"md"}
        shadow={useColorModeValue("base", "dark-lg")}
        p={6}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Verify Your Account
          </Heading>
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          We have sent a code to your device
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          fontWeight="bold"
          color={useColorModeValue("gray.800", "gray.400")}
        >
          {phone}
        </Center>
        <form onSubmit={submitHandler}>
          <FormControl>
            <Center as={Flex} flexDirection={"column"} gap={5}>
              <HStack>
                <PinInput
                  value={otp}
                  onChange={(pin) => setOtp(pin)}
                  autoFocus={true}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </Center>
          </FormControl>
          <Stack spacing={6} mt={7}>
            <Button
              type="submit"
              bg={"#814CF5"}
              color={"white"}
              _hover={{
                bg: "purple.600",
              }}
            >
              Verify
            </Button>
            <Flex justifyContent={"center"}>
              {disableResend ? (
                <Text>Resend OTP in {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}</Text>
              ) : (
                <Link onClick={sendOtp}>Didn't receive OTP? Resend</Link>
              )}
            </Flex>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}
