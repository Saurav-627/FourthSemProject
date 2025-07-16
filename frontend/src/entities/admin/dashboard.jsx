import { Stat, StatLabel, StatNumber, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [stats, setStats] = useState([]);
  const fetchAllStats = async () => {
    try {
      const data = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/allStats`);
      const response = await data.json();
      console.log(response.data.forumsData);
      setStats(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllStats();
  }, []);

  return (
    <Flex overflow={"hidden"} height={"40vh"} alignItems={"center"} direction={"column"}>
      <Flex
        gap={5}
        height={"100px"}
        justifyContent={"center"}
        alignItems={"center"}
        p={10}
        marginTop={10}
      >
        <Stat
          display={"flex"}
          bg={"white"}
          p={5}
          w={"700px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <StatLabel fontSize={"18px"}>Total Users</StatLabel>
          <StatNumber>{stats.userCount}</StatNumber>
        </Stat>

        <Stat
          display={"flex"}
          bg={"white"}
          p={5}
          w={"700px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <StatLabel fontSize={"18px"}>Total Doctors</StatLabel>
          <StatNumber>{stats.doctorCount}</StatNumber>
        </Stat>
      </Flex>
      <Flex
        gap={5}
        height={"100px"}
        justifyContent={"center"}
        alignItems={"center"}
        p={10}
        marginTop={10}
      >
        <Stat
          display={"flex"}
          bg={"white"}
          p={5}
          w={"700px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <StatLabel fontSize={"18px"}>Total Hospital</StatLabel>
          <StatNumber>{stats.managerCount}</StatNumber>
        </Stat>
      </Flex>
    </Flex>
  );
};

export default AdminDashboard;
