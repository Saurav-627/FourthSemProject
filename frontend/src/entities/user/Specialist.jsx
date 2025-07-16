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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
    status: "Pending",
  });
  const [userBookings, setUserBookings] = useState([]);

  let data = {};

  const phone = localStorage.getItem("phone");
  const toast = useToast();

  const fetchUserBookings = async () => {
    if (phone) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/user/getUserBookings/${phone}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        setUserBookings(data.bookings || []);
        console.log("User bookings updated:", data.bookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    }
  };

  useEffect(() => {
    const getSpecialist = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/manager/getSpecialityDoctors`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              hospital: state.state.hospital,
              specialist: state.state.specialist,
            }),
          }
        );
        const data = await response.json();
        setSpecialist(data.doctors || []);
        console.log("Specialists loaded:", data.doctors);
      } catch (err) {
        console.error("Error fetching specialists:", err);
      }
    };

    getSpecialist();
    fetchUserBookings();
  }, []);

  const saveHistory = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/addHistory`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();
      if (res.message === "History Created") {
        toast({
          title: "Appointment Booked",
          description: "Your appointment has been booked.",
          status: "success",
          duration: 3000,
        });
        await fetchUserBookings(); // Refresh bookings
      } else {
        toast({
          title: "Booking Failed",
          description:
            res.message || "You may need to cancel an existing booking.",
          status: "error",
          duration: 3000,
        });
      }
    } catch (err) {
      console.error("Error saving history:", err);
      toast({
        title: "Booking Failed",
        description: "Something went wrong.",
        status: "error",
        duration: 3000,
      });
    }
  };

  let config = {
    publicKey: "test_public_key_61510e6c87904f95b1fe226b5b0612ca",
    productIdentity: "1234567890",
    productName: "Drogon",
    productUrl: "http://gameofthrones.com/buy/Dragons",
    eventHandler: {
      onSuccess(payload) {
        console.log("Payment success:", payload);
        setIsPaid(true);
        saveHistory();
      },
      onError(error) {
        console.log("Payment error:", error);
      },
      onClose() {
        console.log("Payment widget closed");
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

  const PayWithKhalti = async (fees) => {
    try {
      const token = Math.floor(10 + Math.random() * 9000);
      data = {
        ...data,
        token,
      }
      await checkout.show({ amount: parseInt(fees) * 100 });
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const checkSeats = async (fees, doctorId, time) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/checkStatus/${doctorId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ time }),
        }
      );
      const data = await response.json();
      if (data.message === "Seats Available") {
        toast({
          title: "Seats Available",
          description: `${data.limit} seats remaining out of ${data.originalLimit}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        PayWithKhalti(fees);
      } else {
        toast({
          title: "Seats Not Available",
          description: `No seats remaining (0/${data.originalLimit})`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error("Error checking seats:", err);
    }
  };

  const cancelAppointment = async (doctor_id, phone, status, alloted) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/updateHistory`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ doctor_id, phone, status, alloted }),
        }
      );
      const data = await response.json();
      if (data.message === "History Updated") {
        toast({
          title: "Appointment Cancelled",
          description: "Your appointment has been cancelled.",
          status: "success",
          duration: 3000,
        });
        await fetchUserBookings(); // Refresh bookings
      } else {
        toast({
          title: "Cancellation Failed",
          description: "Appointment might already be cancelled or not found.",
          status: "error",
          duration: 3000,
        });
      }
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      toast({
        title: "Server Error",
        description: "Some error with server",
        status: "error",
        duration: 3000,
      });
    }
  };

  const canCancel = (available, doctorId) => {
    if (available.time === "00:00-00:00") return false;
    const booking = userBookings.find(
      (b) => b.doctor_id.toString() === doctorId && b.alloted === available.time
    );
    console.log("Checking canCancel:", { available, doctorId, booking });
    if (!booking) return false;
    return booking.status === "Pending"; // Only enable for Pending
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
        <Flex boxShadow={"lg"} px={10} py={5} key={item._id}>
          <Modal
            blockScrollOnMount={false}
            isOpen={isOpen}
            onClose={onClose}
            size={"4xl"}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <Flex
                  gap={10}
                  justifyContent={"center"}
                  alignItems={"center"}
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
                    <Button
                      variant={"outline"}
                      border={"2px solid purple"}
                      color={"purple"}
                      borderRadius={"none"}
                      _hover={{ bg: "purple.500", color: "white" }}
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
          <Flex direction={"column"} justifyContent={"center"} gap={2}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Available Date</Th>
                  <Th>Available Time</Th>
                  <Th textAlign={"center"}>Quota</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {item.available.map((available) => {
                  const bookingCount = userBookings.filter(
                    (b) =>
                      b.doctor_id.toString() === item._id &&
                      b.alloted === available.time &&
                      b.status !== "Cancelled"
                  ).length;
                  return (
                    <Tr key={available.id}>
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
                          _hover={{ bg: "purple.500" }}
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
                                phone,
                                doctor_id: item._id,
                                price: item.fees,
                                doctor_name: item.name,
                                alloted: available.time,
                                hospital: item.hospital,
                              };
                              checkSeats(item.fees, item._id, available.time);
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
                      <Td textAlign={"center"}>
                        {`${bookingCount}/${available.limit}`}
                      </Td>
                      <Td>
                        <Button
                          onClick={() =>
                            cancelAppointment(
                              item._id,
                              phone,
                              "Cancelled",
                              available.time
                            )
                          }
                          isDisabled={!canCancel(available, item._id)}
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
