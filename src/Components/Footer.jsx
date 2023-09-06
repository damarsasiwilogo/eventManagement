import { Box, Flex, Heading, Img, Stack, Text } from "@chakra-ui/react";
import myTixLogo from "../images/logo_mytix.png";
import ddt from "../images/ddt.png";
function Footer() {
  return (
    <Box id="footer" h={"80px"} bgColor={"#331F69"} color={"whiteAlpha.500"} display={"flex"} w={"100%"} justifyContent={"space-evenly"} alignItems={"center"} overflow={"hidden"} mt={"15px"}>
      <Img src={myTixLogo} w={"140px"} h={"45px"}></Img>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Img src={ddt} w={"46px"} h={"40px"}></Img>
        <Heading mb={1} color={"white"} fontSize={"2xl"}>Depok Dev Team</Heading>
      </Flex>
      <Box w={"200px"}>
        <Stack spacing={"5"} display={"flex"} flexDir={"row"} color={"white"}>
          <Text id="text-link">
            <a href="https://www.linkedin.com/in/anggaratriputra/">Anggara</a>
          </Text>
          <Text id="text-link">
            <a href="https://www.linkedin.com/in/damarsasiwilogo/">Damar</a>
          </Text>
          <Text id="text-link">
            <a href="https://www.linkedin.com/in/fauzarizky/">Rizky</a>
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}

export default Footer;
