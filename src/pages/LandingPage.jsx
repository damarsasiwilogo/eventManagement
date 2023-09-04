import { Box, Button, Center, Flex, Heading, Img, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navigation from "../Components/Navigation";
import Form from "../Components/Form";
import { useState } from "react";
import "../index.css";
import api from "../api.js";
import music from "../images/music.png";
import sports from "../images/sports.jpeg";
import webinar from "../images/webinar.jpg";
import { useNavigate } from "react-router-dom";
import HeroSlider, { Slide } from "hero-slider";
import myTixLogo from "../images/logo_mytix.png";

export default function Landingpage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setselectedEvent] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [filterLocation, setFilterLocation] = useState(null);
  const filteredEvents = filterLocation ? events.filter((event) => event.location === filterLocation) : events;
  const locations = ["All", "Online", "Jakarta", "Bekasi", "Surabaya", "Lombok", "Bali", "Lampung", "Malaysia"];

  useEffect(() => {
    api.get("/events").then((res) => {
      setEvents(res.data);
    });
  }, []);

  // saat halaman pertama kali diload langsung muncul data paling pertama
  useEffect(() => {
    if (filterLocation) {
      const filteredEvents = events.find((event) => event.location === filterLocation);
      setselectedEvent(filteredEvents);
    } else {
      // Render event pertama saat lokasi filter null
      setselectedEvent(events[0]);
    }
  }, [filterLocation, events]); // akan melakukan perubahan jika state filterloc & events berubah

  // Fungsi akan memperbarui state detail event dengan data dari event yang diklik.
  function handleclick(event) {
    setselectedEvent(event);
  }

  // Fungsi ini akan memperbarui state filter dengan lokasi yang dipilih.
  function handleFilter(location) {
    setFilterLocation(location);
    setselectedEvent(null); // Clear selected event when applying filter
  }

  const navigate = useNavigate();
  const handleClickBuyTicket = () => {
    navigate(`/Transaction/${selectedEvent.id}`);

    window.scrollTo(0, 0);
  };

  function handleclickBox(event) {
    const type = event.currentTarget.querySelector(".heading").textContent.toLowerCase();
    setFilterType(type);
  }

  return (
    <Box h={"200vh"}>
      <Navigation />
      {/* <Form/> */}
      {/* Image Slider */}
      <Box marginTop={"10px"} display={"flex"} justifyContent={"center"}>
        <HeroSlider
          height={"45vh"}
          width={"70vw"}
          autoplay
          controller={{
            initialSlide: 1,
            slidingDuration: 200,
            slidingDelay: 100,
          }}
        >
          {events.map((event) => {
            if (filterType === null || event.type.toLowerCase() === filterType) {
              return (
                <>
                  <Slide
                    background={{
                      backgroundImageSrc: event.images,
                    }}
                  />
                </>
              );
            }
          })}
        </HeroSlider>
        {/* End Of Image Slider */}
      </Box>

      <Box display={"flex"} className="box-type">
        <Center w={"100%"} h={"45vh"}>
          <Box bg={"navy"} w={"400px"} h={"80%"} margin={"10px"} borderRadius={"10px"} bgImage={music} bgSize={"cover"} display={"flex"} justifyContent={"center"} alignItems={"center"} className="box-shadow " onClick={handleclickBox}>
            <Heading color={"white"} fontWeight={"extrabold"} fontSize={"50px"} bg={"blackAlpha.700"} w={"400px"} display={"flex"} justifyContent={"center"} className="heading">
              MUSIC
            </Heading>
          </Box>
          <Box bg={"navy"} w={"400px"} h={"80%"} margin={"10px"} borderRadius={"10px"} bgImage={webinar} bgSize={"cover"} display={"flex"} justifyContent={"center"} alignItems={"center"} className="box-shadow" onClick={handleclickBox}>
            <Heading color={"white"} fontWeight={"extrabold"} fontSize={"50px"} bg={"blackAlpha.700"} w={"400px"} display={"flex"} justifyContent={"center"} className="heading">
              WEBINAR
            </Heading>
          </Box>

          <Box bg={"navy"} w={"400px"} h={"80%"} margin={"10px"} borderRadius={"10px"} bgImage={sports} bgSize={"cover"} display={"flex"} justifyContent={"center"} alignItems={"center"} className="box-shadow" onClick={handleclickBox}>
            <Heading color={"white"} fontWeight={"extrabold"} fontSize={"50px"} bg={"blackAlpha.700"} w={"400px"} display={"flex"} justifyContent={"center"} className="heading">
              SPORTS
            </Heading>
          </Box>
        </Center>
      </Box>

      <Box id="discover">
        <Box>
          {/* filter list */}
          <Center>
            <ul style={{ listStyleType: "none", padding: 0, display: "flex" }}>
              {locations.map((location) => (
                <li
                  key={location}
                  style={{
                    margin: "5px",
                    padding: "5px 10px",
                    backgroundColor: filterLocation === location ? "#331F69" : "transparent",
                    color: filterLocation === location ? "white" : "black",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                  onClick={() => handleFilter(location === "All" ? null : location)}
                >
                  {location}
                </li>
              ))}
            </ul>
          </Center>
        </Box>

        {/* List event yang ada */}
        <Box display={"flex"} justifyContent={"center"} mt={"5px"}>
          <Box id="left-box" h={"90vh"} overflowY={"scroll"} w={"30vw"}>
            <Center display={"flex"} flexDirection={"column"}>
              {filteredEvents.map((event) => (
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

          {/* Tampilan detail event */}
          <Box id="right-box" ms={"30px"}>
            {selectedEvent && ( // Tampilkan hanya jika ada event yang dipilih
              <Box w={"50vw"}>
                <Img src={selectedEvent.images} w={"600px"} h={"300px"} borderRadius={"10px"}></Img>
                <Heading margin={"10px 0"}>{selectedEvent.name}</Heading>
                <Text>Date: {selectedEvent.date}</Text>
                <Text>Time: {selectedEvent.time}</Text>
                <Text fontSize={"sm"} w={"600px"}>
                  {selectedEvent.description}
                </Text>
                <Text>{selectedEvent.ticketPrice}</Text>
                <Button bgColor={"#3E60C1"} color={"white"} className="btn-nav" onClick={handleClickBuyTicket}>
                  BUY TIKET
                </Button>
              </Box>
            )}
          </Box>
        </Box>

        <Box id="footer" h={"80px"} bgColor={"#331F69"} color={"whiteAlpha.500"} display={"flex"} w={"100%"} justifyContent={"space-evenly"} alignItems={"center"} overflow={"hidden"} mt={"10px"}>
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
      </Box>
    </Box>
  );
}
