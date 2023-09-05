
import { Box, Button, Center, Flex, Heading, Image, Img, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navigation from "../Components/Navigation";
import Form from "../Components/CreateForm";
import { useState } from "react";
import "../index.css";
import api from "../api.js";
import music from "../images/music.png";
import sports from "../images/sports.jpeg";
import webinar from "../images/webinar.jpg";
import { useNavigate } from "react-router-dom";
import HeroSlider, { Slide } from "hero-slider";
import Footer from "../Components/Footer";
import { login } from "../slices/userSlices";
import { useSelector } from "react-redux";

export default function Landingpage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setselectedEvent] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [filterLocation, setFilterLocation] = useState(null);
  const filteredEvents = filterLocation ? events.filter((event) => event.location === filterLocation) : events;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const locations = ["All", "Online", "Jakarta", "Bekasi", "Surabaya", "Lombok", "Bali", "Lampung", "Malaysia"];

  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  


  useEffect(() => {
    api.get("/events").then((res) => {
      setEvents(res.data);
    }).catch((err) => {
      toast({
        title:"Something wrong",
        description: err.message,
        status: "error",
        isClosable: true
      })
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

    if(isLoggedIn) {
      navigate(`/Transaction/${selectedEvent.id}`);
    } else {
      setIsModalOpen(true);
    }

    window.scrollTo(0, 0);
  };
  const closeModal = () => {
    setIsModalOpen(false);
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
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <HeroSlider
          height={"34vh"}
          width={"75vw"}
          autoplay
          controller={{
            initialSlide: 1,
            slidingDuration: 200,
            slidingDelay: 100,
          }}
          style={{ borderRadius: 10 }} 
          
        >
          <Slide
            background={{
              backgroundImageSrc: "https://images.tokopedia.net/img/cache/1208/NsjrJu/2023/8/31/71a46224-e23c-46c7-83e8-99379cf2c770.jpg.webp?ect=4g", 
            }} 
            />
           <Slide
            background={{
              backgroundImageSrc: "https://images.tokopedia.net/img/cache/1208/NsjrJu/2023/9/2/9017d1d3-3635-4370-b917-13e73de51487.jpg.webp?ect=4g",
            }}
            />
             <Slide
            background={{
              backgroundImageSrc: "https://images.tokopedia.net/img/cache/1208/NsjrJu/2023/9/4/5ee226f1-68aa-47e9-8513-1b32b474f439.jpg.webp?ect=4g",
            }}
            />
             <Slide
            background={{
              backgroundImageSrc: "https://images.tokopedia.net/img/cache/1208/NsjrJu/2023/8/29/9ccc3b04-36ac-4a2c-914d-515f67b6f8e0.jpg.webp?ect=4g",
            }}
            />
          </HeroSlider>
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
          <Box id="left-box" h={"83vh"} overflowY={"scroll"} w={"30vw"} overflowX={"hidden"} >
            <Center display={"flex"} flexDirection={"column"}>
              {filteredEvents.map((event) => (
                <Box key={event.id} onClick={() => handleclick(event)}>
                  <Box
                    w={"400px"}
                    h={"200px"}
                    margin={"10px"}
                    padding={"10px"}
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
          <Box id="right-box" ms={"20px"} mt={2}>
            {selectedEvent && ( // Tampilkan hanya jika ada event yang dipilih
              <Box w={"41vw"}>
                <Img src={selectedEvent.images} w={"600px"} h={"300px"} borderRadius={"10px"} ></Img>
                <Heading margin={"10px 0"}>{selectedEvent.name}</Heading>
                <Text>Date: {selectedEvent.date}</Text>
                <Text>Time: {selectedEvent.time}</Text>
                <Text fontSize={"sm"} w={"600px"}>
                  {selectedEvent.description}
                </Text>
                <Text>{selectedEvent.ticketPrice}</Text>
                <Button bgColor={"#3E60C1"} mt={6} color={"white"} className="btn-nav" onClick={handleClickBuyTicket}>
                  BUY TIKET
                </Button>
              </Box>
            )}
          </Box>
        </Box>
        <Modal isOpen={isModalOpen} onClose={closeModal} isCentered blockScrollOnMount={true}
                    closeOnOverlayClick={false}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Warning</ModalHeader>
                        <ModalBody>
                            Kamu belum login!
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme="facebook"
                                color={"white"}
                                _hover={{ bg: "#24105c" }}
                                onClick={closeModal}>
                                OK
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

        <Footer/>
      </Box>
    </Box>
  );
}
