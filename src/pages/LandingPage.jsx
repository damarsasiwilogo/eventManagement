import { Box, Center, Container } from "@chakra-ui/react";
import React from "react";
import Navigation from "../Components/Navigation";

export default function Landingpage() {
  return (
    <>
      <Navigation />
      <Box>
        <Center w={"100%"} h={"45vh"}>
          <Box bg={'navy'} w={'50%'} h={'100%'} marginTop={'60px'} borderRadius={'10px'}></Box>
        </Center>
      </Box>
      
      <Box display={"flex"}>
        <Center w={"100%"} h={"45vh"} >
          <Box bg={'navy'} w={'30%'} h={'60%'} margin={'10px'} borderRadius={'10px'}></Box>
          <Box bg={'navy'} w={'30%'} h={'60%'} margin={'10px'} borderRadius={'10px'}></Box>
          <Box bg={'navy'} w={'30%'} h={'60%'} margin={'10px'} borderRadius={'10px'}></Box>
        </Center>
      </Box>
    </>
  );
}
