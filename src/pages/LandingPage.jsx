import { Box, Button, Center, Heading, Img, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navigation from "../Components/Navigation";
import Form from "../Components/Form";
import eventsJson from "../events.json";
import { useState } from "react";
import "../index.css";
import music from "../images/music.png";
import sports from "../images/sports.jpeg";
import webinar from "../images/webinar.jpg";

export default function Landingpage() {
  const [events, setEvents] = useState(eventsJson);
  const [selectedEvent, setselectedEvent] = useState(null);
  const cards = [music, sports, webinar]

  // saat halaman pertama kali diload langsung muncul data paling atas
  useEffect(() => {
    if (events.length > 0) {
      setselectedEvent(events[0]);
    }
  }, [events]);

  function handleclick(event) {
    setselectedEvent(event);
  }

  return (
    <Box h={"200vh"}>
      {/* <Form/> */}
      <Navigation />
      <Box>
        <Center w={"100%"} h={"45vh"}>
          <Box bgImage={sports} bgSize={'cover'} w={"50%"} h={"100%"} marginTop={"60px"} borderRadius={"10px"}></Box>
        </Center>
      </Box>

      <Box display={"flex"}>
        <Center w={"100%"} h={"45vh"}>
          <Box bg={"navy"} w={"400px"} h={"60%"} margin={"10px"} borderRadius={"10px"} bgImage={music} bgSize={'cover'} display={'flex'} justifyContent={'center'} alignItems={'center'} className="box-shadow"><Heading color={"white"} fontWeight={'extrabold'} fontSize={'70px'} bg={'blackAlpha.700'} w={"400px"} display={"flex"} justifyContent={'center'}>MUSIC</Heading></Box>
          <Box bg={"navy"} w={"400px"} h={"60%"} margin={"10px"} borderRadius={"10px"} bgImage={webinar} bgSize={'cover'} display={'flex'} justifyContent={'center'} alignItems={'center'} className="box-shadow"><Heading color={"white"} fontWeight={'extrabold'} fontSize={'70px'} bg={'blackAlpha.700'} w={"400px"} display={"flex"} justifyContent={'center'}>SEMINAR</Heading></Box>
          <Box bg={"navy"} w={"400px"} h={"60%"} margin={"10px"} borderRadius={"10px"} bgImage={sports} bgSize={'cover'} display={'flex'} justifyContent={'center'} alignItems={'center'} className="box-shadow"><Heading color={"white"} fontWeight={'extrabold'} fontSize={'70px'} bg={'blackAlpha.700'} w={"400px"} display={"flex"} justifyContent={'center'}>SPORTS</Heading></Box>
        </Center>
      </Box>

      <Box display={"flex"} justifyContent={"center"}>
        <Box h={"95vh"} overflowY={"scroll"} w={"30vw"} id="left-box">
          <Center display={"flex"} flexDirection={"column"}>
            {events.map((event) => (
              <Box key={event.id} onClick={() => handleclick(event)}>
                <Box
                  w={"300px"}
                  h={"200px"}
                  margin={"10px"}
                  padding={"25px"}
                  color={"white"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={"10px"}
                  bgImage={event.images}
                  bgSize={"cover"}
                  bgRepeat={"no-repeat"}
                  bgPos={"center"}
                ></Box>
              </Box>
            ))}
          </Center>
        </Box>

        <Box id="right-box" w={"50wv"} ms={"30px"}>
          {selectedEvent && ( // Tampilkan hanya jika ada event yang dipilih
            <Box w={"50vw"}>
              <Img src={selectedEvent.images} w={"600px"} h={"300px"} borderRadius={"10px"}></Img>
              <Heading margin={"10px 0"}>{selectedEvent.name}</Heading>
              <Text>Date: {selectedEvent.date}</Text>
              <Text>Time: {selectedEvent.time}</Text>
              <Text margin={"10px 0"}>{selectedEvent.description}</Text>
              <Text>{selectedEvent.ticketPrice}</Text>
              <Button bgColor={"#3E60C1"} color={"white"} className="btn-nav">
                BUY TIKET
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
