import { Box, Flex, Heading, Img, Stack, Text } from "@chakra-ui/react";
import myTixLogo from "../images/logo_mytix.png";
import ddt from "../images/ddt.png";
function Footer() {
  return (
    
    <Box id="footer" h={"80px"} bgColor={"#331F69"} color={"whiteAlpha.500"} display={"flex"} w={"100%"} justifyContent={"space-evenly"} alignItems={"center"} overflow={"hidden"} mt={"15px"}>
      <Img src={myTixLogo} w={{base: "100px", sm: "100px", md: "140px" }} h={{ base: "30px" ,sm: "32px", md: "45px" }}></Img>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Img src={ddt} w={{base: "20px", sm: "35px", md: "46px" }} h={{base: "20px", sm: "35px", md: "46px" }}></Img>
        <Heading color={"white"} w={{base: '50px', sm: "100px", md: "200px"}} fontSize={{base: "10px", sm: "12px", md: "2xl" }}>
          Depok Dev Team
        </Heading>
      </Flex>
      <Box w={"100px"}>
        <Stack spacing={{base: 0, md: 5}} display={"flex"} flexDir={{base: "column", sm:"column", md: 'row'}} color={"white"} alignItems={'center'}>
          <a href="https://www.linkedin.com/in/anggaratriputra/">
            <Text id="text-link"fontSize={{ base: "10px", sm: "15px", md: "17px" }}>Anggara</Text>
          </a>
          <a href="https://www.linkedin.com/in/damarsasiwilogo/">
            <Text id="text-link" fontSize={{ base: "10px", sm: "15px", md: "17px" }}>Damar</Text>
          </a>
          <a href="https://www.linkedin.com/in/fauzarizky/">
            <Text id="text-link" fontSize={{ base: "10px", sm: "15px", md: "17px" }}>Rizky</Text>
          </a>
        </Stack>
      </Box>
    </Box>
  );
}

export default Footer;
