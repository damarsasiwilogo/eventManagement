import { Box, Button, Center, Heading, Img, Text, filter } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navigation from "../Components/Navigation";
import Form from "../Components/Form";
import { useState } from "react";
import "../index.css";
import api from "../api.js";
import music from "../images/music.png";
import sports from "../images/sports.jpeg";
import webinar from "../images/webinar.jpg";

export default function Landingpage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setselectedEvent] = useState(null);
  const [filterLocation, setFilterLocation] = useState(null);

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

  const filteredEvents = filterLocation ? events.filter((event) => event.location === filterLocation) : events;
  const locations = ["All", "Online", "Jakarta", "Bekasi", "Surabaya", "Lombok", "Bali", "Lampung", "Malaysia"];

  return (
    <Box h={"200vh"}>
      {/* <Form/> */}
      <Navigation />
      <Box>
        <Center w={"100%"} h={"45vh"}>
          <Box bgImage={sports} bgSize={"cover"} w={"50%"} h={"100%"} marginTop={"60px"} borderRadius={"10px"}></Box>
        </Center>
      </Box>

      <Box display={"flex"}>
        <Center w={"100%"} h={"45vh"}>
          <Box bg={"navy"} w={"400px"} h={"60%"} margin={"10px"} borderRadius={"10px"} bgImage={music} bgSize={"cover"} display={"flex"} justifyContent={"center"} alignItems={"center"} className="box-shadow">
            <Heading color={"white"} fontWeight={"extrabold"} fontSize={"50px"} bg={"blackAlpha.700"} w={"400px"} display={"flex"} justifyContent={"center"}>
              MUSIC
            </Heading>
          </Box>
          <Box bg={"navy"} w={"400px"} h={"60%"} margin={"10px"} borderRadius={"10px"} bgImage={webinar} bgSize={"cover"} display={"flex"} justifyContent={"center"} alignItems={"center"} className="box-shadow">
            <Heading color={"white"} fontWeight={"extrabold"} fontSize={"50px"} bg={"blackAlpha.700"} w={"400px"} display={"flex"} justifyContent={"center"}>
              SEMINAR
            </Heading>
          </Box>
          <Box bg={"navy"} w={"400px"} h={"60%"} margin={"10px"} borderRadius={"10px"} bgImage={sports} bgSize={"cover"} display={"flex"} justifyContent={"center"} alignItems={"center"} className="box-shadow">
            <Heading color={"white"} fontWeight={"extrabold"} fontSize={"50px"} bg={"blackAlpha.700"} w={"400px"} display={"flex"} justifyContent={"center"}>
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
        <Box display={"flex"} justifyContent={"center"} mt={"10px"}>
          <Box h={"90vh"} overflowY={"scroll"} w={"30vw"} id="left-box">
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
          <Box id="right-box" w={"50wv"} ms={"30px"}>
            {selectedEvent && ( // Tampilkan hanya jika ada event yang dipilih
              <Box w={"50vw"}>
                <Img src={selectedEvent.images} w={"600px"} h={"300px"} borderRadius={"10px"}></Img>
                <Heading margin={"10px 0"}>{selectedEvent.name}</Heading>
                <Text>Date: {selectedEvent.date}</Text>
                <Text>Time: {selectedEvent.time}</Text>
                <Text margin={"10px 0"} fontSize={"sm"}>
                  {selectedEvent.description}
                </Text>
                <Text>{selectedEvent.ticketPrice}</Text>
                <Button bgColor={"#3E60C1"} color={"white"} className="btn-nav">
                  BUY TIKET
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
