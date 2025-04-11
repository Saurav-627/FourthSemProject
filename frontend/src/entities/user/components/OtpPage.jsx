// import { Center, Heading } from "@chakra-ui/react";
// import {
//   Button,
//   FormControl,
//   Flex,
//   Input,
//   Stack,
//   useColorModeValue,
//   HStack,
//   PinInput,
//   PinInputField,
//   useToast,
//   Link,
//   Text,
// } from "@chakra-ui/react";
// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function VerifyEmailForm() {
//   const navigate = useNavigate();
//   const toast = useToast();
//   const [otp, setOtp] = useState("");
//   const [invalidOtp, setInvalidOtp] = useState(null);
//   const [error, setError] = useState(null);
//   const state = useLocation();
//   const value = state.state.phone;
//   const [disable, setDisable] = useState(false);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/user/login",
//         {
//           phone: value,
//           otp: otp,
//         }
//       );
//       const data = await response.data;
//       console.log(data);
//       //   if (data.message === "SUCCESS") {
//       //     localStorage.setItem("phone", value);
//       //     localStorage.setItem("user", JSON.stringify(data.user));
//       //     navigate("/", { replace: true });
//       //     setError(false);
//       //   } else {
//       //     setError(true);
//       //   }
//       // } catch (err) {
//       //   setInvalidOtp(true);
//       //   console.log(err);
//       // }
//       if (data.message === "CREATE") {
//         navigate("/signup", { state: { phone: state.phone } });
//       } else if (data.message === "SUCCESS") {
//         navigate("/", { state: { user: data.user } });
//       } else {
//         toast({
//           title: "Error",
//           description: "Something went wrong",
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//         });
//       }
//     } catch (err) {
//       toast({
//         title: "Invalid OTP",
//         description: "The OTP you entered is incorrect",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   /* for 5 mins 3000 to 300000 */

//   useEffect(() => {
//     if (disable) {
//       const intervalId = setInterval(() => {
//         setDisable(false);
//       }, 3000);
//       return () => clearTimeout(intervalId);
//     }
//   }, [disable]);

//   const sendOtp = async (value) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/user/sendOTP",
//         {
//           phone: value,
//         }
//       );
//       const data = await response.data;
//       console.log(data.otp);
//       setDisable(true);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     if (error !== null) {
//       if (!error) {
//         toast({
//           title: "Login Successful",
//           description: "Welcome to the app",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//           position: "top-right",
//         });
//         navigate("/", { state: { phone: value }, replace: true });
//       } else {
//         toast({
//           title: "Register your Account",
//           description: "Please provide your details",
//           status: "info",
//           duration: 3000,
//           isClosable: true,
//           position: "top-right",
//         });
//         navigate("/signup", { state: { phone: value } });
//       }
//     }
//   }, [error]);

//   useEffect(() => {
//     if (invalidOtp !== null) {
//       if (invalidOtp) {
//         toast({
//           title: "Invalid Otp",
//           description: "Please check your phone for otp",
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//           position: "top-right",
//         });
//       }
//     }
//   }, [invalidOtp]);

//   return (
//     <Flex
//       h={"600px"}
//       align={"center"}
//       justify={"center"}
//       bg={useColorModeValue("gray.50", "gray.800")}
//     >
//       <Stack
//         spacing={4}
//         w={"full"}
//         maxW={"sm"}
//         bg={useColorModeValue("white", "gray.700")}
//         rounded={"xl"}
//         boxShadow={"md"}
//         shadow={useColorModeValue("base", "dark-lg")}
//         p={6}
//       >
//         <Center>
//           <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
//             Verify Your Account
//           </Heading>
//         </Center>
//         <Center
//           fontSize={{ base: "sm", sm: "md" }}
//           color={useColorModeValue("gray.800", "gray.400")}
//         >
//           We have sent code to your device
//         </Center>
//         <Center
//           fontSize={{ base: "sm", sm: "md" }}
//           fontWeight="bold"
//           color={useColorModeValue("gray.800", "gray.400")}
//         >
//           {state.phone}
//         </Center>
//         <form onSubmit={submitHandler}>
//           <FormControl>
//             <Center as={Flex} flexDirection={"column"} gap={5}>
//               <HStack>
//                 {/* <Input
//                   type="text"
//                   onChange={(e) => {
//                     setOtp(e.target.value);
//                   }}
//                 /> */}
//                 <PinInput
//                   onChange={(pin) => {
//                     setOtp(pin);
//                   }}
//                   autoFocus={true}
//                 >
//                   <PinInputField />
//                   <PinInputField />
//                   <PinInputField />
//                   <PinInputField />
//                 </PinInput>
//               </HStack>
//             </Center>
//           </FormControl>
//           <Stack spacing={6} mt={7}>
//             <Button
//               type="submit"
//               bg={"#814CF5"}
//               color={"white"}
//               _hover={{
//                 bg: "purple.600",
//               }}
//             >
//               Verify
//             </Button>
//             <Flex justifyContent={"center"}>
//               {disable ? (
//                 <Text>Your OTP will expire in 5 min</Text>
//               ) : (
//                 <Link
//                   onClick={() => {
//                     sendOtp(value);
//                   }}
//                 >
//                   Didn't received OTP?
//                 </Link>
//               )}
//             </Flex>
//           </Stack>
//         </form>
//       </Stack>
//     </Flex>
//   );
// }

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
        "http://localhost:3000/api/user/login",
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
        "http://localhost:3000/api/user/sendOTP",
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
