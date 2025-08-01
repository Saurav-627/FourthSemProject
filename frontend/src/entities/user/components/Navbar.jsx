import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Image,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import logo from "../../../assets/logo.png";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Outlet, useNavigate, Link as ToLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";
import io from "socket.io-client";
import { useToast } from "@chakra-ui/react";

const roomId = 6969 + localStorage.getItem("phone");

export default function Navbar(props) {
  const { isOpen, onToggle } = useDisclosure();
  const phone = localStorage.getItem("phone");
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const toast = useToast();

  const [notifications, setNotifications] = useState([]);
  const fetchUser = async (phoneNumber) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/data/${phoneNumber}`
      );
      const data = await response.json();
      setUserData(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (phone) {
      fetchUser(phone);
    }
  }, [phone, props.updated]);

  return (
    <>
      <Box>
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Image
              src={logo}
              w={"180px"}
              height={"80px"}
              cursor={"pointer"}
              onClick={() => {
                navigate("/");
              }}
            />

            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            direction={"row"}
            alignItems={"center"}
          >
            {/* <Menu>
              {phone !== null ? (
                <Flex as={MenuButton}>
                  <IconButton
                    icon={<FiBell />}
                    size={"md"}
                    bg={"purple.400"}
                    color={"white"}
                    _hover={{
                      bg: "purple.500",
                      _hover: {
                        bg: "purple.600",
                      },
                    }}
                  />
                </Flex>
              ) : (
                <></>
              )}
              <MenuList py={"5"}>
                {notifications.length === 0 && (
                  <Flex w={"full"} justifyContent={"center"}>
                    No Notification{" "}
                  </Flex>
                )}
                {notifications.map((not, index) => {
                  return (
                    <>
                      <Flex direction={"column"} px={7}>
                        <Text fontSize={"lg"} fontWeight={600} ml={2}>
                          {not.user_name}
                        </Text>
                        <Text fontSize={"lg"} fontWeight={600} ml={2}>
                          Commented on your post
                        </Text>
                      </Flex>

                      {index !== notifications.length - 1 && <MenuDivider />}
                    </>
                  );
                })}
              </MenuList>
            </Menu> */}

            {phone === null && (
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"17px"}
                fontWeight={600}
                color={"white"}
                bg={useColorModeValue("#A785E4")}
                letterSpacing={"wide"}
                _hover={{
                  bg: "purple.600",
                }}
                width={"130px"}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Get Started
              </Button>
            )}
            {phone !== null && (
              <Flex alignItems={"center"} gap={2} px={5}>
                <Menu isLazy>
                  <Flex alignItems={"center"} gap={2}>
                    <Avatar
                      as={MenuButton}
                      size={"md"}
                      src={userData.profile}
                    />
                    <Text fontSize={"md"} fontWeight={600}>
                      Hi,{userData.name ? userData.name.split(" ")[0] : "User"}
                    </Text>
                  </Flex>
                  <MenuList>
                    {/* MenuItems are not rendered unless Menu is open */}
                    <MenuItem
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      My Account{" "}
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        localStorage.removeItem("phone");
                        localStorage.removeItem("user");
                        window.location.href = "/";
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            )}
          </Stack>
        </Flex>

        {/* <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse> */}
      </Box>
      <Outlet />
    </>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4} alignItems={"center"}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                as={ToLink}
                p={2}
                to={navItem.href && navItem.href}
                fontSize={"16px"}
                letterSpacing={"wide"}
                fontWeight={700}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

// const MobileNav = () => {
//   return (
//     <Stack
//       bg={useColorModeValue("white", "gray.800")}
//       p={4}
//       display={{ md: "none" }}
//     >
//       {NAV_ITEMS.map((navItem) => (
//         <MobileNavItem key={navItem.label} {...navItem} />
//       ))}
//     </Stack>
//   );
// };

// const MobileNavItem = ({ label, children, href }) => {
//   const { isOpen, onToggle } = useDisclosure();

//   return (
//     <Stack spacing={4} onClick={children && onToggle}>
//       <Flex
//         py={2}
//         as={Link}
//         href={href ?? "#"}
//         justify={"space-between"}
//         align={"center"}
//         _hover={{
//           textDecoration: "none",
//         }}
//       >
//         <Text
//           fontWeight={600}
//           color={useColorModeValue("gray.600", "gray.200")}
//         >
//           {label}
//         </Text>
//         {children && (
//           <Icon
//             as={ChevronDownIcon}
//             transition={"all .25s ease-in-out"}
//             transform={isOpen ? "rotate(180deg)" : ""}
//             w={6}
//             h={6}
//           />
//         )}
//       </Flex>

//       <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
//         <Stack
//           mt={2}
//           pl={4}
//           borderLeft={1}
//           borderStyle={"solid"}
//           borderColor={useColorModeValue("gray.200", "gray.700")}
//           align={"start"}
//         >
//           {children &&
//             children.map((child) => (
//               <Link key={child.label} py={2} href={child.href}>
//                 {child.label}
//               </Link>
//             ))}
//         </Stack>
//       </Collapse>
//     </Stack>
//   );
// };

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Find Hospital",
    href: "/find",
  },
];
