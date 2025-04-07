import {
  Avatar,
  Button,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Divider,
  IconButton,
  Thead,
  Table,
  Tr,
  Th,
  Tbody,
  Td,
  useToast,
  Box,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";

import KhaltiCheckout from "khalti-checkout-web";

const Specialist = () => {
  const state = useLocation();
  const [specialist, setSpecialist] = useState([]);
  const navigate = useNavigate();
  const [isPaid, setIsPaid] = useState(false);
  const [doctor, setDoctor] = useState({
    name: "",
    speciality: "",
    hospital: "",
    experience: "",
    fees: "",
  });
  const [appointment, setAppointment] = useState({
    phone: "",
    doctor_id: "",
    doctor_name: "",
    price: "",
    alloted: "",
    hospital: "",
  });

  let data = {};
  const phone = localStorage.getItem("phone");
  const toast = useToast();

  const saveHistory = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/user/addHistory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();
      if (res.message === "History Created") {
        toast({
          title: "Appointment Booked",
          description:
            "Your appointment has been booked. Please check your profile for more details",
          status: "success",
          duration: 3000,
        });
      } else {
        toast({
          title: "Appointment Already Booked",
          description: "Your need to cancel before booking again",
          status: "error",
          duration: 3000,
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Appointment Booked Failed",
        description: "Something went wrong. Please try again later",
        status: "error",
        duration: 3000,
      });
    }
  };

  let config = {
    // replace this key with yours
    publicKey: "test_public_key_61510e6c87904f95b1fe226b5b0612ca",
    productIdentity: "1234567890",
    productName: "Drogon",
    productUrl: "http://gameofthrones.com/buy/Dragons",
    eventHandler: {
      onSuccess(payload) {
        console.log("dalidhl", payload);

        // hit merchant api for initiating verfication
        setIsPaid(true);
        saveHistory();
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  let checkout = new KhaltiCheckout(config);
  async function PayWithKhalti(fees) {
    // minimum transaction amount must be 10, i.e 1000 in paisa.
    try {
      const token = Math.floor(10 + Math.random() * 9000);
      data = {
        ...data,
        token,
      };
      await checkout.show({ amount: parseInt(fees) * 100 });
    } catch (err) {
      console.log(err);
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getSpecialist = async () => {
      const response = await fetch(
        `http://localhost:3000/api/manager/getSpecialityDoctors`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hospital: state.state.hospital,
            specialist: state.state.specialist,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSpecialist(data.doctors);
        });
      console.log(response, "diuashdiua");
    };
    getSpecialist();
  }, []);

  const cancelAppointment = async (doctor_id, phone, status) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/updateHistory`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            doctor_id,
            phone,
            status,
          }),
        }
      );
      const data = await response.json();
      if (data.message === "History Updated") {
        toast({
          title: "Appointement has been cancelled",
          description:
            "Your appointment has been cancelled. Please check your profile for more details",
          status: "success",
          duration: 3000,
        });
      } else {
        toast({
          title: "Appointment already Cancelled",
          description:
            "Your appointment is already cancelled. Please check your profile for more details",
          status: "error",
          duration: 3000,
        });
      }
    } catch (err) {
      toast({
        title: "Server Error",
        description: "Some error with server",
        status: "error",
        duration: 3000,
      });
    }
  };

  const checkSeats = async (fees) => {
    const response = await fetch(
      `http://localhost:3000/api/user/checkStatus/${doctor}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.message === "Seats Available") {
      toast({
        title: "Seats Available",
        description: "You can book your appointment",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      PayWithKhalti(fees);
    } else {
      toast({
        title: "Seats Not Available",
        description: "You cannot book your appointment",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      direction={"column"}
      w={"full"}
      alignItems={"center"}
      overflow={"hidden"}
      gap={20}
      my={20}
    >
      {specialist.length === 0 && (
        <Flex
          height={"400px"}
          justifyContent={"center"}
          alignItems={"center"}
          fontWeight={"600"}
          color={"gray.400"}
          fontSize={"18px"}
        >
          No Specialist Found
        </Flex>
      )}
      {specialist.map((item) => (
        <Flex
          // w={"70%"}
          // justifyContent={"space-between"}
          boxShadow={"lg"}
          px={10}
          py={5}
        >
          <Modal
            blockScrollOnMount={false}
            isOpen={isOpen}
            onClose={onClose}
            size={"4xl"}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              {/* Doctor Profile Card ModalBox */}
              <ModalBody>
                <Flex
                  gap={10}
                  // w={"full"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  // borderRight={"1px solid"}
                  borderColor={"gray.200"}
                  pr={"50px"}
                  p={"12"}
                >
                  <Avatar
                    size={"2xl"}
                    src={
                      doctor.image ? doctor.image : "https://bit.ly/broken-link"
                    }
                  />
                  <Flex direction={"column"}>
                    <Text fontSize={"lg"} fontWeight={"500"}>
                      {doctor.name}
                    </Text>
                    <Text fontSize={"md"} fontWeight={"400"} color={"gray.600"}>
                      {doctor.speciality}
                    </Text>
                    <Text fontSize={"md"} fontWeight={"400"} color={"gray.600"}>
                      Experience: {doctor.experience}
                    </Text>
                    <Text fontSize={"md"} fontWeight={"400"} color={"gray.600"}>
                      Qualification: {doctor.qualification}
                    </Text>
                    <Flex></Flex>
                    <Button
                      variant={"outline"}
                      border={"2px solid purple"}
                      color={"purple"}
                      borderRadius={"none"}
                      _hover={{
                        bg: "purple.500",
                        color: "white",
                      }}
                      colorScheme={"purple.400"}
                      fontSize={"14px"}
                      h={"30px"}
                      mt={"3"}
                      disabled={true}
                    >
                      Fees : Rs {doctor.fees}
                    </Button>
                  </Flex>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>

          <Flex alignItems={"center"} gap={10}>
            <Avatar
              size={"2xl"}
              src={item.image ? item.image : "https://bit.ly/broken-link"}
              onClick={() => {
                console.log(item);
                setDoctor(item);
                onOpen();
              }}
            />
            <Flex direction={"column"} gap={2}>
              <Text fontSize={"lg"} fontWeight={"500"}>
                {item.name}
              </Text>
              <Text fontSize={"md"} fontWeight={"400"} color={"gray.600"}>
                {item.speciality}
              </Text>
              <Text fontSize={"md"} fontWeight={"400"} color={"gray.600"}>
                Experience: {item.experience}
              </Text>
              <Text fontSize={"md"} fontWeight={"400"} color={"gray.600"}>
                Qualification: {item.qualification}
              </Text>
              <Flex direction={"column"} gap={5}>
                <Button
                  variant={"outline"}
                  colorScheme={"purple.400"}
                  fontSize={"14px"}
                  h={"30px"}
                  mt={"3"}
                  onClick={() => {
                    setDoctor(item);
                    onOpen();
                  }}
                >
                  View Profile
                </Button>
              </Flex>
            </Flex>
          </Flex>
          <Flex direction={"column"} justifyContent={"center"} gap={2}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Available Date</Th>
                  <Th>Available Time</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>

              <Tbody>
                {item.available.map((available) => {
                  return (
                    <Tr>
                      <Td>
                        <Button
                          w={"120px"}
                          bg={"gray.100"}
                          color={"black"}
                          disabled
                        >
                          {available.date}
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          w={"120px"}
                          bg={"purple.400"}
                          color={"white"}
                          _hover={{
                            bg: "purple.500",
                          }}
                          onClick={() => {
                            const time = available.time.split("-");
                            if (time[0] === "00:00" && time[1] === "00:00") {
                              toast({
                                title: "Validate Date Unavailable",
                                status: "error",
                                duration: 3000,
                                isClosable: true,
                              });
                              return;
                            }
                            if (phone) {
                              data = {
                                phone: phone,
                                doctor_id: item._id,
                                price: item.fees,
                                doctor_name: item.name,
                                alloted: available.time,
                                hospital: item.hospital,
                              };

                              checkSeats(item.fees);
                            } else {
                              toast({
                                title: "Please Login to continue",
                                status: "error",
                                duration: 3000,
                                isClosable: true,
                              });
                              navigate("/login");
                            }
                          }}
                        >
                          {available.time}
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          onClick={() => {
                            cancelAppointment(item._id, phone, "Cancelled");
                          }}
                          isDisabled={available.time === "00:00-00:00"}
                        >
                          Cancel Appointment
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
export default Specialist;
