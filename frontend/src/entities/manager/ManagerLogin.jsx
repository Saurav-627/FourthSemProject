import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  PinInput,
  PinInputField,
  useDisclosure,
  Center,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ManagerLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const submitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const login = async (e) => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/manager/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );
        const data = await response.json();
        console.log(response, "dsaad");
        console.log(data, "asudiu");

        if (data.message === "Login Successful") {
          console.log(data.token);
          toast({
            title: "Login Successful.",
            description: "Login Successful",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          localStorage.setItem("manager", data.hospital._id);
          navigate("/manager");
        }
        if (data.message === "Invalid Credentials") {
          toast({
            title: "Invalid Credintials.",
            description: "Unable to login",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (err) {
        console.log(err);
        toast({
          title: "Invalid Credintials.",
          description: "Unable to login",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setIsSubmitting(false);
      }
    };
    login();
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Welcome Manager
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          w={"400px"}
          as="form"
          onSubmit={submitHandler}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="md"
                type="submit"
                bg={"purple.400"}
                color={"white"}
                _hover={{
                  bg: "purple.500",
                }}
                isLoading={isSubmitting}
              >
                Sign In
              </Button>
            </Stack>
            <Divider border={"2px solid gray.200"} />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
