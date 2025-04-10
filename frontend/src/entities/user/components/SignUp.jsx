// import { useState } from "react";
// import {
//   Button,
//   Checkbox,
//   Flex,
//   FormControl,
//   FormLabel,
//   Heading,
//   Input,
//   Link,
//   Stack,
//   Image,
//   Box,
//   useColorModeValue,
//   HStack,
//   Text,
//   useToast,
// } from "@chakra-ui/react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// export default function SignUp() {
//   const navigate = useNavigate();
//   const state = useLocation();
//   const [first, setFirst] = useState("");
//   const [last, setLast] = useState("");
//   const [city, setCity] = useState("");
//   const [age, setAge] = useState("");
//   const [email, setEmail] = useState("");
//   const toast = useToast();
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     console.log(first, last, city, age, email);
//     const name = first + " " + last;
//     const phone = state.state.phone;
//     console.log(phone);
//     const payload = {
//       phone,
//       name,
//       city,
//       age,
//       email,
//     };

//     try {
//       console.log(payload);
//       const response = await axios.post(
//         "http://localhost:3000/api/user/register",
//         {
//           phone: payload.phone,
//           name: payload.name,
//           city: payload.city,
//           age: payload.age,
//           email: payload.email,
//         }
//       );
//       const data = await response.data;
//       if (data) {
//         toast({
//           title: "Account Created.",
//           description: "We've created your account for you.",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//         });

//         navigate("/login");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <Stack maxH={"100vh"} direction={{ base: "column", md: "row" }}>
//       <Flex p={8} flex={1} align={"center"} justify={"center"}>
//         <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
//           <Stack display={"flex"} align={"center"}>
//             <Text fontSize={"30px"} fontWeight={"400"}>
//               Get Started
//             </Text>
//             <Text fontSize={"18px"} fontWeight={"300"}>
//               Seems like you dont have an account
//             </Text>
//           </Stack>
//           <Box
//             rounded={"lg"}
//             bg={useColorModeValue("white", "gray.700")}
//             boxShadow={"lg"}
//             p={8}
//           >
//             <form onSubmit={submitHandler}>
//               <Stack spacing={4}>
//                 <HStack>
//                   <Box>
//                     <FormControl id="firstName" isRequired>
//                       <FormLabel>First Name</FormLabel>
//                       <Input
//                         type="text"
//                         onChange={(e) => {
//                           setFirst(e.target.value);
//                         }}
//                         required
//                       />
//                     </FormControl>
//                   </Box>
//                   <Box>
//                     <FormControl id="lastName">
//                       <FormLabel>Last Name</FormLabel>
//                       <Input
//                         type="text"
//                         onChange={(e) => {
//                           setLast(e.target.value);
//                         }}
//                         required
//                       />
//                     </FormControl>
//                   </Box>
//                 </HStack>

//                 <HStack>
//                   <Box>
//                     <FormControl id="City" isRequired>
//                       <FormLabel>City</FormLabel>
//                       <Input
//                         type="text"
//                         onChange={(e) => {
//                           setCity(e.target.value);
//                         }}
//                         required
//                       />
//                     </FormControl>
//                   </Box>
//                   <Box>
//                     <FormControl id="bloodGroup">
//                       <FormLabel>Age</FormLabel>
//                       <Input
//                         type="number"
//                         onChange={(e) => {
//                           setAge(e.target.value);
//                         }}
//                         required
//                       />
//                     </FormControl>
//                   </Box>
//                 </HStack>
//                 <FormControl id="email" isRequired>
//                   <FormLabel>Email address</FormLabel>
//                   <Input
//                     type="email"
//                     onChange={(e) => {
//                       setEmail(e.target.value);
//                     }}
//                     required
//                   />
//                 </FormControl>
//                 <Stack spacing={10} pt={2}>
//                   <Button
//                     type="submit"
//                     loadingText="Submitting"
//                     size="lg"
//                     background={"#8c81ea"}
//                     color={"white"}
//                     _hover={{
//                       bg: "purple.600",
//                     }}
//                   >
//                     Sign up
//                   </Button>
//                 </Stack>
//               </Stack>
//             </form>
//           </Box>
//         </Stack>
//       </Flex>
//     </Stack>
//   );
// }

import { useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Box,
  useColorModeValue,
  HStack,
  Text,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const state = useLocation();
  const toast = useToast();

  const [formData, setFormData] = useState({
    first: "",
    last: "",
    city: "",
    age: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let newErrors = {};

    // Name validation - only letters, 2-50 characters
    if (!formData.first || !/^[A-Za-z]{2,50}$/.test(formData.first)) {
      newErrors.first = "First name must be 2-50 letters only";
    }

    if (!formData.last || !/^[A-Za-z]{2,50}$/.test(formData.last)) {
      newErrors.last = "Last name must be 2-50 letters only";
    }

    if (!formData.city || !/^[A-Za-z\s]{2,50}$/.test(formData.city)) {
      newErrors.city = "City must be 2-50 letters only";
    }


    // Stricter email validation
    if (
      !formData.email ||
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const name = `${formData.first} ${formData.last}`;
      const phone = state.state.phone;
      const payload = {
        phone,
        name,
        city: formData.city,
        age: formData.age,
        email: formData.email,
      };

      const response = await axios.post(
        "http://localhost:3000/api/user/register",
        payload
      );

      if (response.data) {
        toast({
          title: "Account Created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Stack maxH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack display={"flex"} align={"center"}>
            <Text fontSize={"30px"} fontWeight={"400"}>
              Get Started
            </Text>
            <Text fontSize={"18px"} fontWeight={"300"}>
              Seems like you dont have an account
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={submitHandler}>
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl isInvalid={!!errors.first} isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        type="text"
                        name="first"
                        value={formData.first}
                        onChange={handleChange}
                      />
                      <FormErrorMessage>{errors.first}</FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl isInvalid={!!errors.last} isRequired>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        type="text"
                        name="last"
                        value={formData.last}
                        onChange={handleChange}
                      />
                      <FormErrorMessage>{errors.last}</FormErrorMessage>
                    </FormControl>
                  </Box>
                </HStack>

                <HStack>
                  <Box>
                    <FormControl isInvalid={!!errors.city} isRequired>
                      <FormLabel>City</FormLabel>
                      <Input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                      <FormErrorMessage>{errors.city}</FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl isRequired>
                      <FormLabel>Age</FormLabel>
                      <Input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl isInvalid={!!errors.email} isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Submitting"
                    size="lg"
                    background={"#8c81ea"}
                    color={"white"}
                    _hover={{
                      bg: "purple.600",
                    }}
                  >
                    Sign up
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </Stack>
  );
}
