import React, { useEffect, useReducer } from "react";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";

import {
  Flex,
  IconButton,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  SimpleGrid,
  chakra,
  ButtonGroup,
  Badge,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  HStack,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const AppointTable = () => {
  // const data = [
  //   {
  //     name: "Daggy",
  //     created: "7 years ",
  //     speciality: "Cardiology",
  //   },
  //   {
  //     name: "Anubra",
  //     created: "10 years",
  //     speciality: "Neurology",
  //   },
  //   {
  //     name: "Josef",
  //     created: "20 years",
  //     speciality: "Gastroenterology",
  //   },
  //   {
  //     name: "Sage",
  //     created: "5 years",
  //     speciality: "Neurology",
  //   },
  // ];
  // const [flag, setFlag] = useState(false);
  // const speciality = [
  //   {
  //     id: 1,
  //     name: "Cardiology",
  //     description:
  //       "Cardiology is a branch of medicine dealing with disorders of the heart as well as parts of the circulatory system.",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 2,
  //     name: "Neurology",
  //     description:
  //       "Neurology is a branch of medicine dealing with disorders of the nervous system.",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 3,
  //     name: "Gastroenterology",
  //     description:
  //       "Gastroenterology is a branch of medicine focused on the digestive system and its disorders.",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 4,
  //     name: "Dermatology",
  //     description:
  //       "Dermatology is a branch of medicine dealing with the skin, nails, hair and its diseases.",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 5,
  //     name: "Oncology",
  //     description: "Oncology is a branch of medicine that deals with cancer.",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 6,
  //     name: "Ophthalmology",
  //     description:
  //       "Ophthalmology is a branch of medicine and surgery which deals with the anatomy, physiology and diseases of the eye.",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 7,
  //     name: "Orthopedics",
  //     description:
  //       "Orthopedics is a branch of surgery concerned with conditions involving the musculoskeletal system.",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 8,
  //     name: "Urology",
  //     descption:
  //       "Urology is a branch of medicine that deals with the urinary tracts of males and females, and the reproductive system of males.",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 9,
  //     name: "Pediatrics",
  //     description: "Pediatrics is a branch of medicine dealing with children.",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 10,
  //     name: "Psychiatry",
  //     description:
  //       "Psychiatry is the medical specialty devoted to the diagnosis, prevention, study, and treatment of mental disorders.",
  //     image:
  //       " https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 11,
  //     name: "Gynecology",
  //     description: "",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 12,
  //     name: "Endocrinology",
  //     description:
  //       "Endocrinology is a branch of medicine dealing with the endocrine system, its diseases, and its specific secretions known as hormones.",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  // ];
  const id = localStorage.getItem("manager");
  const [specialityData, setSpecialityData] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  const [temp, setTemp] = useState([]);

  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("white", "gray.800");
  const bg3 = useColorModeValue("gray.100", "gray.700");

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const ReducerFunction = (state, action) => {
    switch (action.type) {
      case "startTime":
        return { ...state, startTime: action.value };
      case "endTime":
        return { ...state, endTime: action.value };
      case "date":
        return { ...state, date: action.value };
      case "limit":
        return { ...state, limit: action.value };
      case "id":
        return { ...state, id: action.value, doctor: action.doctor };
      case "clear":
        return { ...state, id: "", startTime: "", endTime: "", date: "" };
      default:
        return state;
    }
  };

  const [editData, setEditData] = useReducer(ReducerFunction, {
    id: "",
    startTime: "",
    endTime: "",
    date: "",
    doctor: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/manager/getDoctors/${id}`)
        .then((res) => res.json())
        .then((res) => {
          setSpecialityData(res.doctors);
          setTemp(res.doctors);
        });
    };
    fetchData();
  }, [editData]);

  useEffect(() => {
    const getSpecialityData = async () => {
      await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/manager/getHospitalSpeciality/${id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSpeciality(data.speciality);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getSpecialityData();
  }, []);

  const saveSchedule = async () => {
    const validatedLimit = Math.min(Number(editData.limit) || 1, 30);
    const data = {
      id: editData.id,
      time: editData.startTime + "-" + editData.endTime,
      date: editData.date,
      limit: validatedLimit,
      doctor: editData.doctor,
    };
    console.log(data);

    onEditClose();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/manager/editSchedule`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        setEditData({ type: "clear" });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [search, setSearch] = useState(null);
  const onChangeHandler = (text) => {
    setSpecialityData(
      temp.filter((item) =>
        item.speciality.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const onSearchHandler = (text) => {
    setSpecialityData((data) => {
      if (text.length === 0 && !search) {
        return temp;
      }
      return temp.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
    });
  };
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isEditOpen}
        onClose={onEditClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Scheduling</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HStack>
              <FormControl>
                <FormLabel> Start Time </FormLabel>
                <Input
                  type={"time"}
                  onChange={(e) =>
                    setEditData({
                      type: "startTime",
                      value: e.target.value,
                    })
                  }
                  value={editData.startTime}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>End Time</FormLabel>
                <Input
                  type={"time"}
                  onChange={(e) =>
                    setEditData({
                      type: "endTime",
                      value: e.target.value,
                    })
                  }
                  value={editData.endTime}
                />
              </FormControl>
            </HStack>
            <HStack>
              <FormControl mt={4}>
                <FormLabel>Start Date</FormLabel>
                <Input
                  type={"date"}
                  onChange={(e) =>
                    setEditData({
                      type: "date",
                      value: e.target.value,
                    })
                  }
                  value={editData.date}
                />
              </FormControl>
            </HStack>
            <FormControl mt={4}>
              <FormLabel>Booking Limit</FormLabel>
              <Input
                type={"number"}
                min={1}
                max={30}
                onChange={(e) => {
                  const value = Math.min(Number(e.target.value), 30); // Cap input at 30
                  setEditData({ type: "limit", value: value.toString() });
                }}
                value={editData.limit}
                placeholder="Enter max bookings (1-30)"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={saveSchedule}>
              Save
            </Button>
            <Button onClick={onEditClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex
        w="full"
        bg="#edf3f8"
        _dark={{
          bg: "#3e3e3e",
        }}
        alignItems="center"
        justifyContent="center"
        direction={"column"}
      >
        <Flex my={50} w={"full"} justifyContent={"space-between"} gap={5}>
          <Flex w={"full"} gap={2}>
            <Flex w={"250px"}>
              <Select
                placeholder="Select option"
                bg={"white"}
                onChange={(e) => {
                  onChangeHandler(e.currentTarget.value);
                }}
              >
                {speciality.map((item) => {
                  return (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </Select>
            </Flex>
            <Flex w={"700px"}>
              <InputGroup bg={"white"} rounded={"md"}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon />}
                />
                <Input
                  type="text"
                  placeholder="Search"
                  focusBorderColor="#8c81ea"
                  onChange={(e) => onSearchHandler(e.target.value)}
                />
              </InputGroup>
            </Flex>
          </Flex>
        </Flex>
        <Stack
          direction={{
            base: "column",
          }}
          w="full"
          bg={{
            md: bg,
          }}
          shadow="lg"
        >
          <SimpleGrid
            spacingY={3}
            columns={{
              base: 1,
              md: 3,
            }}
            w={{
              base: 120,
              md: "full",
            }}
            textTransform="uppercase"
            bg={bg3}
            py={{
              base: 1,
              md: 3,
            }}
            px={{
              base: 2,
              md: 10,
            }}
            fontSize="md"
            fontWeight="bold"
          >
            <span>Doctors</span>
            <span>Speciality</span>
            <span>Availability</span>

            {/* <chakra.span
              textAlign={{
                md: "right",
              }}
            >
              Actions
            </chakra.span> */}
          </SimpleGrid>
          {specialityData.map((token, tid) => {
            return (
              <Flex
                direction={{
                  base: "row",
                  md: "column",
                }}
                bg={bg2}
                key={tid}
              >
                <SimpleGrid
                  spacingY={3}
                  columns={{
                    base: 1,
                    md: 3,
                  }}
                  w="full"
                  py={2}
                  px={10}
                  borderBottomWidth="1px"
                  alignItems={"center"}
                >
                  <span>{token.name}</span>
                  <span>{token.speciality}</span>
                  <chakra.span
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                  >
                    <Stack justifyContent={"center"}>
                      <Flex
                        borderColor={"gray.400"}
                        py={2}
                        alignItems={"center"}
                        gap={2}
                      >
                        <Badge>{token.available[0].time}</Badge>
                        <Badge>{token.available[0].date}</Badge>
                        <Badge>{token.available[0]?.limit}</Badge>
                        <IconButton
                          colorScheme="green"
                          icon={<AiFillEdit />}
                          aria-label="Edit"
                          size={"sm"}
                          onClick={() => {
                            console.log(token._id);
                            setEditData({
                              type: "id",
                              value: token.available[0].id,
                              doctor: token._id,
                            });
                            onEditOpen();
                          }}
                        />
                      </Flex>
                      <Flex
                        borderColor={"gray.400"}
                        py={2}
                        alignItems={"center"}
                        gap={2}
                      >
                        <Badge>{token.available[1].time}</Badge>
                        <Badge>{token.available[1].date}</Badge>
                        <Badge>{token.available[1]?.limit}</Badge>
                        <IconButton
                          colorScheme="green"
                          icon={<AiFillEdit />}
                          aria-label="Edit"
                          size={"sm"}
                          onClick={() => {
                            setEditData({
                              type: "id",
                              value: token.available[1].id,
                              doctor: token._id,
                            });
                            onEditOpen();
                          }}
                        />
                      </Flex>
                      <Flex
                        borderColor={"gray.400"}
                        py={2}
                        alignItems={"center"}
                        gap={2}
                      >
                        <Badge>{token.available[2].time}</Badge>
                        <Badge>{token.available[2].date}</Badge>
                        <Badge>{token.available[2]?.limit}</Badge>
                        <IconButton
                          colorScheme="green"
                          icon={<AiFillEdit />}
                          aria-label="Edit"
                          size={"sm"}
                          onClick={() => {
                            setEditData({
                              type: "id",
                              value: token.available[2].id,
                              doctor: token._id,
                            });
                            onEditOpen();
                          }}
                        />
                      </Flex>
                    </Stack>
                  </chakra.span>

                  {/* <Flex alignItems={"center"}>
                    <Stack>
                      <Flex
                        borderBottom={"1px solid"}
                        borderColor={"gray.400"}
                        py={2}
                      >
                        <Badge>2022-10-12</Badge>
                      </Flex>
                      <Flex
                        borderBottom={"1px solid"}
                        borderColor={"gray.400"}
                        py={2}
                      >
                        <Badge>2022-10-12</Badge>
                      </Flex>
                      <Flex
                        borderBottom={"1px solid"}
                        borderColor={"gray.400"}
                        py={2}
                      >
                        <Badge>2022-10-12</Badge>
                      </Flex>
                    </Stack>
                  </Flex> */}
                  {/* <Flex
                    justify={{
                      md: "end",
                    }}
                  >
                    <ButtonGroup variant="solid" size="sm" spacing={3}>
                      <Button bg={"#8c81ea"} color={"white"}>
                        Save
                      </Button>
                    </ButtonGroup>
                  </Flex> */}
                </SimpleGrid>
              </Flex>
            );
          })}
        </Stack>
      </Flex>
    </>
  );
};

export default AppointTable;
