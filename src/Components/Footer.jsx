import { Box, Heading, Img, Stack, Text } from "@chakra-ui/react";
import myTixLogo from "../images/logo_mytix.png";
function Footer () {
    return (
    <Box id="footer" h={"80px"} bgColor={"#331F69"} color={"whiteAlpha.500"} display={"flex"} w={"100%"} justifyContent={"space-evenly"} alignItems={"center"} overflow={"hidden"} mt={"15px"}>
          <Img src={myTixLogo} w={"140px"} h={"45px"}></Img>
          <Heading fontSize={"2xl"}>Depok Dev Team</Heading>
          <Box w={"200px"}>
            <Stack spacing={'5'} display={"flex"} flexDir={"row"}>
              <Text id="text-link"><a href="https://www.linkedin.com/in/anggaratriputra/">Anggara</a></Text>
              <Text id="text-link"><a href="https://www.linkedin.com/in/damarsasiwilogo/">Damar</a></Text>
              <Text id="text-link"><a href="https://www.linkedin.com/in/fauzarizky/">Rizky</a></Text>
            </Stack>
          </Box>
        </Box>
    )
}

export default Footer;