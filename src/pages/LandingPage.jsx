import { Box, Center, Heading } from "@chakra-ui/react";
import React from "react";
import Navigation from "../Components/Navigation";
import Form from "../Components/Form";
import eventsJson from "../events.json";
import { useState } from "react";

export default function Landingpage() {
  const [events, setEvents] = useState(eventsJson);

  return (
    <Box h={'200vh'}>
      <Navigation />
      <Form />
      <Box>
        <Center w={"100%"} h={"45vh"}>
          <Box bg={"navy"} w={"50%"} h={"100%"} marginTop={"60px"} borderRadius={"10px"}></Box>
        </Center>
      </Box>

      <Box display={"flex"}>
        <Center w={"100%"} h={"45vh"}>
          <Box bg={"navy"} w={"30%"} h={"60%"} margin={"10px"} borderRadius={"10px"}></Box>
          <Box bg={"navy"} w={"30%"} h={"60%"} margin={"10px"} borderRadius={"10px"}></Box>
          <Box bg={"navy"} w={"30%"} h={"60%"} margin={"10px"} borderRadius={"10px"}></Box>
        </Center>
      </Box>

      <Box h={"90vh"} overflowY={"scroll"} w={"50vh"} marginStart={'35px'}>
        <Center display={'flex'} flexDirection={'column'}>
          {events.map((event) => (
            <Box key={event.id}>
                <Box w={"300px"} h={"200px"} margin={'10px'} padding={"25px"} color={"white"} display={"flex"} alignItems={"center"} justifyContent={"center"} borderRadius={'10px'} bgImage={event.images} bgSize={'contain'} bgRepeat={'no-repeat'} bgPos={'center'}>
                  {/* <Heading fontSize={"sm"}>{event.name}</Heading> */}
                </Box>
            </Box>
          ))}
        </Center>
      </Box>
    </Box>
  );
}
