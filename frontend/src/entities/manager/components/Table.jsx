// import React, { useEffect } from "react";
// import { useState } from "react";

// import {
//   Flex,
//   IconButton,
//   Button,
//   Stack,
//   Icon,
//   useColorModeValue,
//   SimpleGrid,
//   chakra,
//   ButtonGroup,
//   Badge,
//   InputGroup,
//   InputLeftElement,
//   Input,
//   Select,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   useDisclosure,
//   ModalBody,
//   ModalCloseButton,
//   FormControl,
//   FormLabel,
//   HStack,
//   Text,
//   useToast,
// } from "@chakra-ui/react";
// import { AiFillEdit } from "react-icons/ai";
// import { BsFillTrashFill } from "react-icons/bs";
// import { SearchIcon } from "@chakra-ui/icons";
// import { BiImageAdd } from "react-icons/bi";

// const TableDoctor = () => {
//   const toast = useToast();
//   const id = localStorage.getItem("manager");
//   console.log(id);
//   const bg = useColorModeValue("white", "gray.800");
//   const bg2 = useColorModeValue("white", "gray.800");
//   const bg3 = useColorModeValue("gray.100", "gray.700");
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const {
//     isOpen: isEditOpen,
//     onOpen: onEditOpen,
//     onClose: onEditClose,
//   } = useDisclosure();
//   const [search, setSearch] = useState(null);
//   const [fullNames, setFullNames] = useState("");
//   const [phone, setPhone] = useState("");
//   const [nmc, setNmc] = useState("");
//   const [experience, setExperience] = useState("");
//   const [special, setSpeciality] = useState("");
//   const [qualification, setQualification] = useState("");
//   const [specialityData, setSpecialityData] = useState([]);
//   const [temp, setTemp] = useState([]);
//   const [doctor, setDoctor] = useState(null);
//   const [doctorData, setDoctorData] = useState(null);
//   const [specailityHospital, setSpecialityHospital] = useState([]);
//   const [fees, setFees] = useState("");
//   const [background, setBackground] = useState("");
//   const [image, setImage] = useState("");

//   useEffect(() => {
//     const getSpecialityData = async () => {
//       await fetch(`http://localhost:3000/api/manager/getDoctors/${id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data);
//           setSpecialityData(data.doctors);
//           setTemp(data.doctors);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     };

//     getSpecialityData();
//   }, [doctor]);

//   useEffect(() => {
//     const getSpecialityData = async () => {
//       await fetch(
//         `http://localhost:3000/api/manager/getHospitalSpeciality/${id}`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data);
//           setSpecialityHospital(data.speciality);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     };
//     getSpecialityData();
//   }, []);

//   const onChangeHandler = (text) => {
//     setSearch(text);
//     if (text === "") {
//       setDoctor((doctor) => !doctor);
//     }
//     setSpecialityData(
//       temp.filter((speciality) =>
//         speciality.speciality.toLowerCase().includes(text.toLowerCase())
//       )
//     );
//   };

//   const getDoctorData = async (doctorId) => {
//     console.log(doctorId);
//     try {
//       const doctor = await fetch(
//         `http://localhost:3000/api/manager/getDoctor/${doctorId}`
//       );
//       const doctorData = await doctor.json();
//       setDoctorData(doctorData.doctor);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const uploadImage = async (requestConfig, formdata) => {
//     const response = await fetch(requestConfig.url, requestConfig);
//     const data = await response.json();
//     return data.secure_url;
//   };

//   const editDoctor = async (doctorId) => {
//     const formData = new FormData();
//     formData.append("file", image);
//     formData.append("upload_preset", "lef6u6wv");
//     const requestConfig = {
//       url: `https://api.cloudinary.com/v1_1/ddrleopwg/image/upload`,
//       method: "POST",
//       body: formData,
//     };
//     const data = await uploadImage(requestConfig, formData);
//     const doctor = {
//       hospital: id,
//       name: doctorData.name,
//       phone: doctorData.phone,
//       nmc: doctorData.nmc,
//       experience: `${doctorData.experience.split(" ")[0]} years`,
//       speciality: doctorData.speciality,
//       qualification: doctorData.qualification,
//       fees: doctorData.fees,
//       image: data,
//     };

//     try {
//       await fetch(
//         `http://localhost:3000/api/manager/updateDoctor/${doctorId}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(doctor),
//         }
//       );
//       toast({
//         title: "Doctor Updated",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });
//       setDoctor((doctor) => !doctor);
//     } catch (err) {
//       console.log(err);
//       toast({
//         title: "Doctor Not Updated",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   const deleteDoctor = async (doctorId) => {
//     try {
//       await fetch(
//         `http://localhost:3000/api/manager/deleteDoctor/${doctorId}`,
//         {
//           method: "DELETE",
//         }
//       );
//       toast({
//         title: "Doctor Deleted",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });
//       setDoctor((doctor) => !doctor);
//     } catch (err) {
//       console.log(err);
//       toast({
//         title: "Failed to Delete Doctor",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   const addDoctor = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("file", image);
//       formData.append("upload_preset", "lef6u6wv");
//       const requestConfig = {
//         url: `https://api.cloudinary.com/v1_1/ddrleopwg/image/upload`,
//         method: "POST",
//         body: formData,
//       };
//       const data = await uploadImage(requestConfig, formData);
//       const doctor = {
//         hospital: id,
//         name: `Dr. ${fullNames}`,
//         phone: phone,
//         nmc: nmc,
//         experience: `${experience} years`,
//         speciality: special,
//         qualification: qualification,
//         image: data,
//         fees: fees,
//         available: [
//           {
//             id: 1,
//           },
//           {
//             id: 2,
//           },
//           {
//             id: 3,
//           },
//         ],
//       };
//       const response = await fetch(
//         "http://localhost:3000/api/manager/createDoctor/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(doctor),
//         }
//       );
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData?.msg || "Failed to add doctor");
//       }

//       const result = await response.json();

//       onClose();
//       setDoctor((prev) => !prev);

//       toast({
//         title: "Doctor Added.",
//         description: "Doctor has been added successfully.",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });
//     } catch (err) {
//       console.error("Add Doctor Error:", err);
//       toast({
//         title: "Doctor addition failed.",
//         description: err?.message || "Something went wrong.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   const onSearchHandler = (text) => {
//     if (text.length === 0) {
//       setDoctor((doctor) => !doctor);
//     } else {
//       const newData = specialityData.filter((hospital) => {
//         return hospital.name.toLowerCase().includes(text.toLowerCase());
//       });
//       setSpecialityData(newData);
//     }
//   };
//   return (
//     <>
//       <Modal
//         isOpen={isOpen}
//         onClose={onClose}
//         size={"xl"}
//         onCloseComplete={() => {
//           setBackground("");
//           setImage("");
//         }}
//       >
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader
//             display={"flex"}
//             justifyContent={"center"}
//             my={5}
//             borderBottom={"1px solid "}
//             borderColor={"gray.200"}
//           >
//             <Text fontSize={"25px"} textTransform={"uppercase"}>
//               Add Doctor
//             </Text>
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={6} display={"flex"} flexDirection={"column"} gap={5}>
//             <HStack w={"full"} justifyContent={"center"}>
//               <Flex
//                 w={"120px"}
//                 height={"120px"}
//                 bg={"gray"}
//                 rounded={"full"}
//                 justifyContent={"end"}
//                 alignItems={"end"}
//                 bgPos={"center"}
//                 bgSize={"cover"}
//                 bgImage={background ? `url(${background})` : ``}
//               >
//                 <Flex
//                   position={"relative"}
//                   width={"full"}
//                   height={"full"}
//                   rounded={"full"}
//                   bg={"rgba(0,0,0,0.2)"}
//                   justifyContent={"center"}
//                   alignItems={"center"}
//                   transition={"all 0.3s ease-in-out"}
//                   opacity={"0"}
//                   _hover={{
//                     opacity: "1",
//                     bg: background
//                       ? "rgba(255,255, 255, 0.2)"
//                       : "rgba(0,0,0,0.2)",
//                     transition: "all 0.3s ease-in-out",
//                   }}
//                   cursor={"pointer"}
//                 >
//                   <BiImageAdd size={"28px"} />
//                   <Input
//                     type={"file"}
//                     position={"absolute"}
//                     height={"100%"}
//                     width={"100%"}
//                     opacity={"0"}
//                     onChange={(e) => {
//                       const file = e.target.files[0];
//                       const fullPath = URL.createObjectURL(file);
//                       setBackground(fullPath);
//                       setImage(file);
//                     }}
//                   />
//                 </Flex>
//               </Flex>
//             </HStack>

//             <HStack>
//               <FormControl isRequired>
//                 <FormLabel>Full Name</FormLabel>
//                 <Input
//                   onChange={(e) => {
//                     setFullNames(e.target.value);
//                   }}
//                   placeholder="Enter full name"
//                 />
//               </FormControl>

//               <FormControl mt={4} isRequired>
//                 <FormLabel>Phone Number</FormLabel>
//                 <Input
//                   placeholder="Enter your number"
//                   onChange={(e) => {
//                     setPhone(e.target.value);
//                   }}
//                 />
//               </FormControl>
//             </HStack>
//             <HStack>
//               <FormControl isRequired>
//                 <FormLabel> NMC Number</FormLabel>
//                 <Input
//                   onChange={(e) => {
//                     setNmc(e.target.value);
//                   }}
//                   placeholder="Enter your NMC no"
//                 />
//               </FormControl>

//               <FormControl mt={4} isRequired>
//                 <FormLabel>Experience Year</FormLabel>
//                 <Input
//                   placeholder="Enter your experienced year"
//                   onChange={(e) => {
//                     setExperience(e.target.value);
//                   }}
//                 />
//               </FormControl>
//             </HStack>
//             <HStack>
//               <FormControl isRequired>
//                 <FormLabel>Speciality</FormLabel>
//                 <Select
//                   placeholder="Select option"
//                   bg={"white"}
//                   onChange={(e) => {
//                     setSpeciality(e.target.value);
//                   }}
//                 >
//                   {specailityHospital.map((item) => {
//                     console.log(item);
//                     return (
//                       <option key={item._id} value={item.name}>
//                         {item.name}
//                       </option>
//                     );
//                   })}
//                 </Select>
//               </FormControl>

//               <FormControl mt={4} isRequired>
//                 <FormLabel>Qualification</FormLabel>
//                 <Input
//                   placeholder="Enter your qualification"
//                   onChange={(e) => {
//                     setQualification(e.target.value);
//                   }}
//                 />
//               </FormControl>
//             </HStack>
//             <HStack>
//               <FormControl mt={4} isRequired>
//                 <FormLabel>Fees</FormLabel>
//                 <Input
//                   placeholder="Enter Fees"
//                   onChange={(e) => {
//                     setFees(e.target.value);
//                   }}
//                 />
//               </FormControl>
//             </HStack>
//           </ModalBody>

//           <ModalFooter
//             borderTop={"1px solid"}
//             borderColor={"gray.200"}
//             display={"flex"}
//             justifyContent={"end"}
//           >
//             <Button
//               bg={"red.400"}
//               color={"white"}
//               onClick={onClose}
//               _hover={{
//                 bg: "red.500",
//               }}
//               mr={3}
//             >
//               Cancel
//             </Button>
//             <Button
//               bg={"green.600"}
//               color={"white"}
//               _hover={{
//                 bg: "green.500",
//               }}
//               colorScheme="blue"
//               onClick={() => {
//                 addDoctor();
//                 onClose();
//               }}
//             >
//               Add Doctor
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//       <Modal isOpen={isEditOpen} onClose={onEditClose} size={"xl"}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader
//             display={"flex"}
//             justifyContent={"center"}
//             my={5}
//             borderBottom={"1px solid "}
//             borderColor={"gray.200"}
//           >
//             <Text fontSize={"25px"} textTransform={"uppercase"}>
//               Edit Doctor
//             </Text>
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={6} display={"flex"} flexDirection={"column"} gap={5}>
//             <HStack w={"full"} justifyContent={"center"}>
//               <Flex
//                 w={"120px"}
//                 height={"120px"}
//                 bg={"gray"}
//                 rounded={"full"}
//                 justifyContent={"end"}
//                 alignItems={"end"}
//                 bgPos={"center"}
//                 bgSize={"cover"}
//                 bgImage={
//                   background
//                     ? `url(${background})`
//                     : `url(${doctorData?.image})`
//                 }
//               >
//                 <Flex
//                   position={"relative"}
//                   width={"full"}
//                   height={"full"}
//                   rounded={"full"}
//                   bg={"rgba(0,0,0,0.2)"}
//                   justifyContent={"center"}
//                   alignItems={"center"}
//                   transition={"all 0.3s ease-in-out"}
//                   opacity={"0"}
//                   _hover={{
//                     opacity: "1",
//                     bg: background
//                       ? "rgba(255,255, 255, 0.2)"
//                       : "rgba(0,0,0,0.2)",
//                     transition: "all 0.3s ease-in-out",
//                   }}
//                   cursor={"pointer"}
//                 >
//                   <BiImageAdd size={"28px"} />
//                   <Input
//                     type={"file"}
//                     position={"absolute"}
//                     height={"100%"}
//                     width={"100%"}
//                     opacity={"0"}
//                     onChange={(e) => {
//                       const file = e.target.files[0];
//                       const fullPath = URL.createObjectURL(file);
//                       setBackground(fullPath);
//                       setImage(file);
//                     }}
//                   />
//                 </Flex>
//               </Flex>
//             </HStack>
//             <HStack>
//               <FormControl isRequired>
//                 <FormLabel>Full Name</FormLabel>
//                 <Input
//                   onChange={(e) => {
//                     setDoctorData(() => {
//                       return {
//                         ...doctorData,
//                         name: e.target.value,
//                       };
//                     });
//                   }}
//                   placeholder="Enter full name"
//                   value={doctorData?.name}
//                 />
//               </FormControl>

//               <FormControl mt={4} isRequired>
//                 <FormLabel>Phone Number</FormLabel>
//                 <Input
//                   placeholder="Enter your number"
//                   onChange={(e) => {
//                     setDoctorData(() => {
//                       return {
//                         ...doctorData,
//                         phone: e.target.value,
//                       };
//                     });
//                   }}
//                   value={doctorData?.phone}
//                 />
//               </FormControl>
//             </HStack>
//             <HStack>
//               <FormControl isRequired>
//                 <FormLabel> NMC Number</FormLabel>
//                 <Input
//                   onChange={(e) => {
//                     setDoctorData(() => {
//                       return {
//                         ...doctorData,
//                         NMC: e.target.value,
//                       };
//                     });
//                   }}
//                   placeholder="Enter your NMC no"
//                   value={doctorData?.NMC}
//                 />
//               </FormControl>

//               <FormControl mt={4} isRequired>
//                 <FormLabel>Experience Year</FormLabel>
//                 <Input
//                   placeholder="Enter your experienced year"
//                   onChange={(e) => {
//                     setDoctorData(() => {
//                       return {
//                         ...doctorData,
//                         experience: e.target.value,
//                       };
//                     });
//                   }}
//                   value={doctorData?.experience.split(" ")[0]}
//                 />
//               </FormControl>
//             </HStack>
//             <HStack>
//               <FormControl isRequired>
//                 <FormLabel>Speciality</FormLabel>
//                 <Select
//                   placeholder="Select option"
//                   bg={"white"}
//                   onChange={(e) => {
//                     setDoctorData(() => {
//                       return {
//                         ...doctorData,
//                         speciality: e.target.value,
//                       };
//                     });
//                   }}
//                   value={doctorData?.speciality}
//                 >
//                   {specailityHospital.map((item) => {
//                     return (
//                       <option key={item.name} value={item.name}>
//                         {item.name}
//                       </option>
//                     );
//                   })}
//                 </Select>
//               </FormControl>

//               <FormControl mt={4} isRequired>
//                 <FormLabel>Qualification</FormLabel>
//                 <Input
//                   placeholder="Enter your qualification"
//                   onChange={(e) => {
//                     setDoctorData(() => {
//                       return {
//                         ...doctorData,
//                         qualification: e.target.value,
//                       };
//                     });
//                   }}
//                   value={doctorData?.qualification}
//                 />
//               </FormControl>
//             </HStack>
//             <HStack>
//               <FormControl mt={4} isRequired>
//                 <FormLabel>Fees</FormLabel>
//                 <Input
//                   placeholder="Enter your qualification"
//                   onChange={(e) => {
//                     setDoctorData(() => {
//                       return {
//                         ...doctorData,
//                         fees: e.target.value,
//                       };
//                     });
//                   }}
//                   value={doctorData?.fees}
//                 />
//               </FormControl>
//             </HStack>
//           </ModalBody>

//           <ModalFooter
//             borderTop={"1px solid"}
//             borderColor={"gray.200"}
//             display={"flex"}
//             justifyContent={"end"}
//           >
//             <Button
//               bg={"red.400"}
//               color={"white"}
//               onClick={onEditClose}
//               _hover={{
//                 bg: "red.500",
//               }}
//               mr={3}
//             >
//               Cancel
//             </Button>
//             <Button
//               bg={"green.600"}
//               color={"white"}
//               _hover={{
//                 bg: "green.500",
//               }}
//               colorScheme="blue"
//               onClick={() => {
//                 editDoctor(doctorData._id);
//                 onEditClose();
//               }}
//             >
//               Save Doctor
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//       <Flex
//         w="full"
//         bg="#edf3f8"
//         _dark={{
//           bg: "#3e3e3e",
//         }}
//         alignItems="center"
//         justifyContent="center"
//         direction={"column"}
//       >
//         <Flex
//           my={50}
//           w={"full"}
//           justifyContent={"space-between"}
//           wrap={"wrap"}
//           gap={5}
//         >
//           <Flex gap={2}>
//             <Flex w={"250px"}>
//               <Select
//                 placeholder="Select option"
//                 bg={"white"}
//                 onChange={(e) => {
//                   onChangeHandler(e.currentTarget.value);
//                 }}
//               >
//                 {specailityHospital.map((item) => {
//                   return (
//                     <option key={item.id} value={item.name}>
//                       {item.name}
//                     </option>
//                   );
//                 })}
//               </Select>
//             </Flex>
//             <Flex w={"700px"}>
//               <InputGroup bg={"white"} rounded={"md"}>
//                 <InputLeftElement
//                   pointerEvents="none"
//                   children={<SearchIcon />}
//                 />
//                 <Input
//                   type="text"
//                   placeholder="Search"
//                   focusBorderColor="#8c81ea"
//                   onChange={(e) => onSearchHandler(e.target.value)}
//                 />
//               </InputGroup>
//             </Flex>
//           </Flex>
//           <Button
//             bg={"#8c81ea"}
//             color={"white"}
//             _hover={{
//               bg: "purple.600",
//             }}
//             onClick={onOpen}
//           >
//             Add Doctor
//           </Button>
//         </Flex>
//         <Stack
//           direction={{
//             base: "column",
//           }}
//           w="full"
//           bg={{
//             md: bg,
//           }}
//           shadow="lg"
//         >
//           <SimpleGrid
//             spacingY={3}
//             columns={{
//               base: 1,
//               md: 4,
//             }}
//             w={{
//               base: 120,
//               md: "full",
//             }}
//             textTransform="uppercase"
//             bg={bg3}
//             py={{
//               base: 1,
//               md: 4,
//             }}
//             px={{
//               base: 2,
//               md: 10,
//             }}
//             fontSize="md"
//             fontWeight="bold"
//           >
//             <span>Name</span>
//             <span>Speciality</span>
//             <span>Experience</span>

//             <chakra.span
//               textAlign={{
//                 md: "right",
//               }}
//             >
//               Actions
//             </chakra.span>
//           </SimpleGrid>
//           {specialityData !== null ? (
//             specialityData.map((token, tid) => {
//               return (
//                 <Flex
//                   direction={{
//                     base: "row",
//                     md: "column",
//                   }}
//                   bg={bg2}
//                   key={tid}
//                 >
//                   <SimpleGrid
//                     spacingY={3}
//                     columns={{
//                       base: 1,
//                       md: 4,
//                     }}
//                     w="full"
//                     py={2}
//                     px={10}
//                     borderBottomWidth="1px"
//                   >
//                     <span>{token.name}</span>
//                     <span>{token.speciality}</span>
//                     <chakra.span
//                       textOverflow="ellipsis"
//                       overflow="hidden"
//                       whiteSpace="nowrap"
//                     >
//                       {token.experience}
//                     </chakra.span>

//                     <Flex
//                       justify={{
//                         md: "end",
//                       }}
//                     >
//                       <ButtonGroup variant="solid" size="sm" spacing={3}>
//                         <IconButton
//                           colorScheme="green"
//                           icon={<AiFillEdit />}
//                           aria-label="Edit"
//                           onClick={() => {
//                             getDoctorData(token._id);
//                             onEditOpen();
//                           }}
//                         />
//                         <IconButton
//                           colorScheme="red"
//                           variant="outline"
//                           icon={<BsFillTrashFill />}
//                           aria-label="Delete"
//                           onClick={() => {
//                             deleteDoctor(token._id);
//                           }}
//                         />
//                       </ButtonGroup>
//                     </Flex>
//                   </SimpleGrid>
//                 </Flex>
//               );
//             })
//           ) : (
//             <> No Doctor Data</>
//           )}
//         </Stack>
//       </Flex>
//     </>
//   );
// };

// export default TableDoctor;

import React, { useEffect, useState } from "react";
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
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { SearchIcon } from "@chakra-ui/icons";
import { BiImageAdd } from "react-icons/bi";

const TableDoctor = () => {
  const toast = useToast();
  const id = localStorage.getItem("manager");
  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("white", "gray.800");
  const bg3 = useColorModeValue("gray.100", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const [formData, setFormData] = useState({
    fullNames: "",
    phone: "",
    nmc: "",
    experience: "",
    special: "",
    qualification: "",
    fees: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [search, setSearch] = useState(null);
  const [specialityData, setSpecialityData] = useState([]);
  const [temp, setTemp] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [doctorData, setDoctorData] = useState(null);
  const [specailityHospital, setSpecialityHospital] = useState([]);
  const [background, setBackground] = useState("");
  const [image, setImage] = useState("");

  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullNames || !/^[A-Za-z\s]{2,50}$/.test(formData.fullNames)) {
      newErrors.fullNames = "Name must be 2-50 letters only";
    }

    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be exactly 10 digits";
    }

    if (!formData.nmc || !/^\d{3,10}$/.test(formData.nmc)) {
      newErrors.nmc = "NMC number must be 3-10 digits";
    }

    if (!formData.experience || !/^\d{1,2}$/.test(formData.experience) || formData.experience > 50) {
      newErrors.experience = "Experience must be a number between 0-50";
    }

    if (!formData.special) {
      newErrors.special = "Speciality is required";
    }

    if (!formData.qualification || formData.qualification.length < 2) {
      newErrors.qualification = "Qualification must be at least 2 characters";
    }

    if (!formData.fees || !/^\d+$/.test(formData.fees) || formData.fees <= 0) {
      newErrors.fees = "Fees must be a positive number";
    }

    if (!image) {
      newErrors.image = "Image is required";
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

  useEffect(() => {
    const getSpecialityData = async () => {
      await fetch(`http://localhost:3000/api/manager/getDoctors/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setSpecialityData(data.doctors);
          setTemp(data.doctors);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getSpecialityData();
  }, [doctor, id]);

  useEffect(() => {
    const getSpecialityData = async () => {
      await fetch(`http://localhost:3000/api/manager/getHospitalSpeciality/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setSpecialityHospital(data.speciality);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getSpecialityData();
  }, [id]);

  const getDoctorData = async (doctorId) => {
    try {
      const doctor = await fetch(`http://localhost:3000/api/manager/getDoctor/${doctorId}`);
      const doctorData = await doctor.json();
      setDoctorData(doctorData.doctor);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async (requestConfig) => {
    const response = await fetch(requestConfig.url, requestConfig);
    const data = await response.json();
    return data.secure_url;
  };

  const editDoctor = async (doctorId) => {
    try {
      let imageUrl = doctorData.image;
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "lef6u6wv");
        const requestConfig = {
          url: `https://api.cloudinary.com/v1_1/ddrleopwg/image/upload`,
          method: "POST",
          body: formData,
        };
        imageUrl = await uploadImage(requestConfig);
      }

      const doctor = {
        hospital: id,
        name: doctorData.name,
        phone: doctorData.phone,
        nmc: doctorData.nmc,
        experience: `${doctorData.experience.split(" ")[0]} years`,
        speciality: doctorData.speciality,
        qualification: doctorData.qualification,
        fees: doctorData.fees,
        image: imageUrl,
      };

      await fetch(`http://localhost:3000/api/manager/updateDoctor/${doctorId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctor),
      });
      
      toast({
        title: "Doctor Updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setDoctor((doctor) => !doctor);
      setBackground("");
      setImage("");
    } catch (err) {
      console.log(err);
      toast({
        title: "Doctor Not Updated",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const deleteDoctor = async (doctorId) => {
    try {
      await fetch(`http://localhost:3000/api/manager/deleteDoctor/${doctorId}`, {
        method: "DELETE",
      });
      toast({
        title: "Doctor Deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setDoctor((doctor) => !doctor);
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to Delete Doctor",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const addDoctor = async () => {
    setIsSubmitting(true);
    
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", image);
      formDataUpload.append("upload_preset", "lef6u6wv");
      const requestConfig = {
        url: `https://api.cloudinary.com/v1_1/ddrleopwg/image/upload`,
        method: "POST",
        body: formDataUpload,
      };
      const imageUrl = await uploadImage(requestConfig);

      const doctor = {
        hospital: id,
        name: `Dr. ${formData.fullNames}`,
        phone: formData.phone,
        nmc: formData.nmc,
        experience: `${formData.experience} years`,
        speciality: formData.special,
        qualification: formData.qualification,
        image: imageUrl,
        fees: formData.fees,
        available: [{ id: 1 }, { id: 2 }, { id: 3 }],
      };

      const response = await fetch("http://localhost:3000/api/manager/createDoctor/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctor),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.msg || "Failed to add doctor");
      }

      onClose();
      setDoctor((prev) => !prev);
      setFormData({
        fullNames: "",
        phone: "",
        nmc: "",
        experience: "",
        special: "",
        qualification: "",
        fees: "",
      });
      setBackground("");
      setImage("");

      toast({
        title: "Doctor Added.",
        description: "Doctor has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Add Doctor Error:", err);
      toast({
        title: "Doctor addition failed.",
        description: err?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSearchHandler = (text) => {
    setSearch(text);
    if (text.length === 0) {
      setSpecialityData(temp);
    } else {
      const newData = temp.filter((doctor) =>
        doctor.name.toLowerCase().includes(text.toLowerCase())
      );
      setSpecialityData(newData);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"} onCloseComplete={() => {
        setFormData({
          fullNames: "",
          phone: "",
          nmc: "",
          experience: "",
          special: "",
          qualification: "",
          fees: "",
        });
        setBackground("");
        setImage("");
        setErrors({});
      }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} justifyContent={"center"} my={5} borderBottom={"1px solid "} borderColor={"gray.200"}>
            <Text fontSize={"25px"} textTransform={"uppercase"}>Add Doctor</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} display={"flex"} flexDirection={"column"} gap={5}>
            <HStack w={"full"} justifyContent={"center"}>
              <FormControl isRequired isInvalid={!!errors.image} display={"flex"} alignItems={"center"} flexDirection={"column"}>
                <Flex
                  w={"120px"}
                  height={"120px"}
                  bg={"gray"}
                  rounded={"full"}
                  justifyContent={"end"}
                  alignItems={"end"}
                  bgPos={"center"}
                  bgSize={"cover"}
                  bgImage={background ? `url(${background})` : ``}
                >
                  <Flex
                    position={"relative"}
                    width={"full"}
                    height={"full"}
                    rounded={"full"}
                    bg={"rgba(0,0,0,0.2)"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    transition={"all 0.3s ease-in-out"}
                    opacity={"0"}
                    _hover={{
                      opacity: "1",
                      bg: background ? "rgba(255,255, 255, 0.2)" : "rgba(0,0,0,0.2)",
                      transition: "all 0.3s ease-in-out",
                    }}
                    cursor={"pointer"}
                  >
                    <BiImageAdd size={"28px"} />
                    <Input
                      type={"file"}
                      position={"absolute"}
                      height={"100%"}
                      width={"100%"}
                      opacity={"0"}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const fullPath = URL.createObjectURL(file);
                        setBackground(fullPath);
                        setImage(file);
                        if (errors.image) {
                          setErrors((prev) => ({ ...prev, image: "" }));
                        }
                      }}
                      accept="image/*"
                    />
                  </Flex>
                </Flex>
                <FormErrorMessage>{errors.image}</FormErrorMessage>
              </FormControl>
            </HStack>
            <HStack>
              <FormControl isRequired isInvalid={!!errors.fullNames}>
                <FormLabel>Full Name</FormLabel>
                <Input name="fullNames" value={formData.fullNames} onChange={handleChange} placeholder="Enter full name" />
                <FormErrorMessage>{errors.fullNames}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.phone}>
                <FormLabel>Phone Number</FormLabel>
                <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your number" />
                <FormErrorMessage>{errors.phone}</FormErrorMessage>
              </FormControl>
            </HStack>
            <HStack>
              <FormControl isRequired isInvalid={!!errors.nmc}>
                <FormLabel>NMC Number</FormLabel>
                <Input name="nmc" value={formData.nmc} onChange={handleChange} placeholder="Enter your NMC no" />
                <FormErrorMessage>{errors.nmc}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.experience}>
                <FormLabel>Experience Year</FormLabel>
                <Input name="experience" value={formData.experience} onChange={handleChange} placeholder="Enter your experienced year" />
                <FormErrorMessage>{errors.experience}</FormErrorMessage>
              </FormControl>
            </HStack>
            <HStack>
              <FormControl isRequired isInvalid={!!errors.special}>
                <FormLabel>Speciality</FormLabel>
                <Select
                  placeholder="Select option"
                  bg={"white"}
                  name="special"
                  value={formData.special}
                  onChange={handleChange}
                >
                  {specailityHospital.map((item) => (
                    <option key={item._id} value={item.name}>{item.name}</option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.special}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.qualification}>
                <FormLabel>Qualification</FormLabel>
                <Input name="qualification" value={formData.qualification} onChange={handleChange} placeholder="Enter your qualification" />
                <FormErrorMessage>{errors.qualification}</FormErrorMessage>
              </FormControl>
            </HStack>
            <HStack>
              <FormControl isRequired isInvalid={!!errors.fees}>
                <FormLabel>Fees</FormLabel>
                <Input name="fees" value={formData.fees} onChange={handleChange} placeholder="Enter Fees" />
                <FormErrorMessage>{errors.fees}</FormErrorMessage>
              </FormControl>
            </HStack>
          </ModalBody>
          <ModalFooter borderTop={"1px solid"} borderColor={"gray.200"} display={"flex"} justifyContent={"end"}>
            <Button bg={"red.400"} color={"white"} onClick={onClose} _hover={{ bg: "red.500" }} mr={3}>Cancel</Button>
            <Button
              bg={"green.600"}
              color={"white"}
              _hover={{ bg: "green.500" }}
              isLoading={isSubmitting}
              onClick={addDoctor}
            >
              Add Doctor
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isEditOpen} onClose={onEditClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} justifyContent={"center"} my={5} borderBottom={"1px solid "} borderColor={"gray.200"}>
            <Text fontSize={"25px"} textTransform={"uppercase"}>Edit Doctor</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} display={"flex"} flexDirection={"column"} gap={5}>
            <HStack w={"full"} justifyContent={"center"}>
              <Flex
                w={"120px"}
                height={"120px"}
                bg={"gray"}
                rounded={"full"}
                justifyContent={"end"}
                alignItems={"end"}
                bgPos={"center"}
                bgSize={"cover"}
                bgImage={background ? `url(${background})` : `url(${doctorData?.image})`}
              >
                <Flex
                  position={"relative"}
                  width={"full"}
                  height={"full"}
                  rounded={"full"}
                  bg={"rgba(0,0,0,0.2)"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  transition={"all 0.3s ease-in-out"}
                  opacity={"0"}
                  _hover={{
                    opacity: "1",
                    bg: background ? "rgba(255,255, 255, 0.2)" : "rgba(0,0,0,0.2)",
                    transition: "all 0.3s ease-in-out",
                  }}
                  cursor={"pointer"}
                >
                  <BiImageAdd size={"28px"} />
                  <Input
                    type={"file"}
                    position={"absolute"}
                    height={"100%"}
                    width={"100%"}
                    opacity={"0"}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const fullPath = URL.createObjectURL(file);
                      setBackground(fullPath);
                      setImage(file);
                    }}
                  />
                </Flex>
              </Flex>
            </HStack>
            <HStack>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input onChange={(e) => setDoctorData({ ...doctorData, name: e.target.value })} placeholder="Enter full name" value={doctorData?.name} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input onChange={(e) => setDoctorData({ ...doctorData, phone: e.target.value })} placeholder="Enter your number" value={doctorData?.phone} />
              </FormControl>
            </HStack>
            <HStack>
              <FormControl isRequired>
                <FormLabel>NMC Number</FormLabel>
                <Input onChange={(e) => setDoctorData({ ...doctorData, nmc: e.target.value })} placeholder="Enter your NMC no" value={doctorData?.nmc} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Experience Year</FormLabel>
                <Input onChange={(e) => setDoctorData({ ...doctorData, experience: e.target.value })} placeholder="Enter your experienced year" value={doctorData?.experience.split(" ")[0]} />
              </FormControl>
            </HStack>
            <HStack>
              <FormControl isRequired>
                <FormLabel>Speciality</FormLabel>
                <Select
                  placeholder="Select option"
                  bg={"white"}
                  onChange={(e) => setDoctorData({ ...doctorData, speciality: e.target.value })}
                  value={doctorData?.speciality}
                >
                  {specailityHospital.map((item) => (
                    <option key={item.name} value={item.name}>{item.name}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Qualification</FormLabel>
                <Input onChange={(e) => setDoctorData({ ...doctorData, qualification: e.target.value })} placeholder="Enter your qualification" value={doctorData?.qualification} />
              </FormControl>
            </HStack>
            <HStack>
              <FormControl isRequired>
                <FormLabel>Fees</FormLabel>
                <Input onChange={(e) => setDoctorData({ ...doctorData, fees: e.target.value })} placeholder="Enter your qualification" value={doctorData?.fees} />
              </FormControl>
            </HStack>
          </ModalBody>
          <ModalFooter borderTop={"1px solid"} borderColor={"gray.200"} display={"flex"} justifyContent={"end"}>
            <Button bg={"red.400"} color={"white"} onClick={onEditClose} _hover={{ bg: "red.500" }} mr={3}>Cancel</Button>
            <Button bg={"green.600"} color={"white"} _hover={{ bg: "green.500" }} onClick={() => { editDoctor(doctorData._id); onEditClose(); }}>Save Doctor</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex w="full" bg="#edf3f8" _dark={{ bg: "#3e3e3e" }} alignItems="center" justifyContent="center" direction={"column"}>
        <Flex my={50} w={"full"} justifyContent={"space-between"} wrap={"wrap"} gap={5}>
          <Flex gap={2}>
            <Flex w={"250px"}>
              <Select
                placeholder="Select option"
                bg={"white"}
                onChange={(e) => {
                  const text = e.currentTarget.value;
                  if (text === "") {
                    setSpecialityData(temp);
                  } else {
                    setSpecialityData(temp.filter((item) => item.speciality.toLowerCase().includes(text.toLowerCase())));
                  }
                }}
              >
                {specailityHospital.map((item) => (
                  <option key={item.id} value={item.name}>{item.name}</option>
                ))}
              </Select>
            </Flex>
            <Flex w={"700px"}>
              <InputGroup bg={"white"} rounded={"md"}>
                <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
                <Input type="text" placeholder="Search" focusBorderColor="#8c81ea" onChange={(e) => onSearchHandler(e.target.value)} />
              </InputGroup>
            </Flex>
          </Flex>
          <Button bg={"#8c81ea"} color={"white"} _hover={{ bg: "purple.600" }} onClick={onOpen}>Add Doctor</Button>
        </Flex>
        <Stack direction={{ base: "column" }} w="full" bg={{ md: bg }} shadow="lg">
          <SimpleGrid
            spacingY={3}
            columns={{ base: 1, md: 4 }}
            w={{ base: 120, md: "full" }}
            textTransform="uppercase"
            bg={bg3}
            py={{ base: 1, md: 4 }}
            px={{ base: 2, md: 10 }}
            fontSize="md"
            fontWeight="bold"
          >
            <span>Name</span>
            <span>Speciality</span>
            <span>Experience</span>
            <chakra.span textAlign={{ md: "right" }}>Actions</chakra.span>
          </SimpleGrid>
          {specialityData && specialityData.length > 0 ? (
            specialityData.map((token, tid) => (
              <Flex direction={{ base: "row", md: "column" }} bg={bg2} key={tid}>
                <SimpleGrid
                  spacingY={3}
                  columns={{ base: 1, md: 4 }}
                  w="full"
                  py={2}
                  px={10}
                  borderBottomWidth="1px"
                >
                  <span>{token.name}</span>
                  <span>{token.speciality}</span>
                  <chakra.span textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">{token.experience}</chakra.span>
                  <Flex justify={{ md: "end" }}>
                    <ButtonGroup variant="solid" size="sm" spacing={3}>
                      <IconButton colorScheme="green" icon={<AiFillEdit />} aria-label="Edit" onClick={() => { getDoctorData(token._id); onEditOpen(); }} />
                      <IconButton colorScheme="red" variant="outline" icon={<BsFillTrashFill />} aria-label="Delete" onClick={() => deleteDoctor(token._id)} />
                    </ButtonGroup>
                  </Flex>
                </SimpleGrid>
              </Flex>
            ))
          ) : (
            <>No Doctor Data</>
          )}
        </Stack>
      </Flex>
    </>
  );
};

export default TableDoctor;
