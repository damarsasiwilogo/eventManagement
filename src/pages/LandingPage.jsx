import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Heading,
  Image,
  Img,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import "../index.css";
import api from "../api.js";
import music from "../images/music.png";
import sports from "../images/sports.jpeg";
import webinar from "../images/webinar-2.jpeg";
import { useNavigate } from "react-router-dom";
import HeroSlider, { Slide } from "hero-slider";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";
import Navibar from "../Components/Navibar";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function Landingpage({ openModal }) {
  const [events, setEvents] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [selectedEvent, setselectedEvent] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [filterLocation, setFilterLocation] = useState(null);
  const filteredEvents = filterLocation ? events.filter((event) => event.location === filterLocation) : events;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const locations = ["All", "Online", "Jakarta", "Bekasi", "Surabaya", "Lombok", "Bali", "Lampung", "Malaysia"];

  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

  const toast = useToast();

  useEffect(() => {
    api
      .get("/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        toast({
          title: "Something wrong",
          description: err.message,
          status: "error",
          isClosable: true,
        });
      });
  }, []);
  useEffect(() => {
    api
      .get("/couponcode")
      .then((response) => {
        setCoupons(response.data);
      })
      .catch((err) => {
        toast({
          title: "Something wrong",
          description: err.message,
          status: "error",
          isClosable: true,
        });
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
    if (isLoggedIn) {
      navigate(`/Transaction/${selectedEvent.id}`);
    } else {
      setIsModalOpen(true);
    }
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
      <Navibar>
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
            }}>
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

        <Box display={"flex"} className="box-type" h={"45vh"} flexDirection={{ base: "column", md: "column", lg: "row" }} justifyContent={"center"} alignItems={"center"} padding="10px">
          <Box
            bg={"navy"}
            width={{ base: "300px", sm: "450px", md: "700px" }}
            h={"80%"}
            margin={"10px"}
            borderRadius={"10px"}
            bgImage={music}
            bgSize={"contain"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            className="box-shadow "
            onClick={handleclickBox}>
            <Heading color={"white"} fontWeight={"extrabold"} fontSize={"50px"} bg={"blackAlpha.700"} w={"100%"} display={"flex"} justifyContent={"center"} className="heading">
              MUSIC
            </Heading>
          </Box>
          <Box
            bg={"navy"}
            width={{ base: "300px", sm: "450px", md: "700px" }}
            h={"80%"}
            margin={"10px"}
            borderRadius={"10px"}
            bgImage={webinar}
            bgSize={"contain"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            className="box-shadow"
            onClick={handleclickBox}>
            <Heading color={"white"} fontWeight={"extrabold"} fontSize={"50px"} bg={"blackAlpha.700"} w={"100%"} display={"flex"} justifyContent={"center"} className="heading">
              WEBINAR
            </Heading>
          </Box>

          <Box
            bg={"navy"}
            width={{ base: "300px", sm: "450px", md: "700px" }}
            h={"80%"}
            margin={"10px"}
            borderRadius={"10px"}
            bgImage={sports}
            bgSize={"contain"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            className="box-shadow"
            onClick={handleclickBox}>
            <Heading color={"white"} fontWeight={"extrabold"} fontSize={"50px"} bg={"blackAlpha.700"} w={"100%"} display={"flex"} justifyContent={"center"} className="heading">
              SPORTS
            </Heading>
          </Box>
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
            style={{ borderRadius: 10 }}>
            {coupons.map((coupon) => {
              return (
                <>
                  <Slide
                    background={{
                      backgroundImageSrc: coupon.images,
                    }}
                  />
                </>
              );
            })}
          </HeroSlider>
        </Box>

        <Box id="discover">
          <Box w={"100%"}>
            {/* Filter List for small screen */}
            <Box display={{ base: "flex", md: "none" }} m={'15px'}>
              <Menu>
                <MenuButton as={Button} variant="link" cursor="pointer" minW={0}>
                  <Text>
                    <ChevronDownIcon />
                    Location
                  </Text>
                </MenuButton>
                <MenuList>
                  {locations.map((location) => (
                    <MenuItem onClick={() => handleFilter(location === "All" ? null : location)}>{location}</MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Box>

            {/* filter list for desktop */}
            <Box display={{ base: "none", md: "flex" }} justifyContent={'center'}>
              <ul style={{ listStyleType: "none", padding: 0, display: "flex", justifyContent: "center" }}>
                {locations.map((location) => (
                  <li key={location} onClick={() => handleFilter(location === "All" ? null : location)}>
                    <Text
                      fontSize={{ base: "10px", sm: "12px", md: "15px", lg: "20px" }}
                      margin={{ base: "10px 0px 0px 0px", sm: "10px 5px", md: "15px", lg: "20px" }}
                      padding={"0 5px"}
                      style={{
                        backgroundColor: filterLocation === location ? "#331F69" : "transparent",
                        color: filterLocation === location ? "white" : "black",
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}>
                      {location}
                    </Text>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>

          {/* List event yang ada */}
          <Box display={{ base: "none", sm: "none", md: "flex" }} justifyContent={"center"} mt={"5px"}>
            <Box id="left-box" h={"83vh"} overflowY={"scroll"} w={"30vw"} overflowX={"hidden"}>
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
                      bgPos={"center"}></Box>
                  </Box>
                ))}
              </Center>
            </Box>

            {/* Tampilan detail event */}
            <Box id="right-box" ms={"20px"} mt={2}>
              {selectedEvent && ( // Tampilkan hanya jika ada event yang dipilih
                <Box w={"41vw"}>
                  <Img src={selectedEvent.images} w={"600px"} h={"300px"} borderRadius={"10px"}></Img>
                  <Heading margin={"10px 0"}>{selectedEvent.name}</Heading>
                  <Text>Date: {selectedEvent.date}</Text>
                  <Text>Time: {selectedEvent.time}</Text>
                  <Text fontSize={"sm"} w={{md: "400px", lg:"500px"}}>
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

          {/*Display For Small Screen */}
          <Box display={{ base: "flex", sm: "flex", md: "none" }} justifyContent={"center"} mt={"5px"} flexDirection={"column"}>
            <SimpleGrid spacing={4} columns={{ base: 1, sm: 2 }} padding={"0 15px"}>
              {filteredEvents.map((event) => (
                <Card maxW="sm">
                  <CardBody>
                    <Image src={event.images} alt={event.name} borderRadius="lg" />
                    <Stack mt="6" spacing="3">
                      <Heading size="md">{event.name}</Heading>
                      <Text>{event.date}</Text>
                      <Text>{event.time}</Text>
                      <Text>{event.description}</Text>
                      <Text>{event.ticketPrice}</Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <Button variant="solid" colorScheme="blue" onClick={handleClickBuyTicket}>
                      BUY TIKET
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </SimpleGrid>
          </Box>

          <Modal isOpen={isModalOpen} onClose={closeModal} isCentered blockScrollOnMount={true} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Warning</ModalHeader>
              <ModalBody>Kamu belum login!</ModalBody>
              <ModalFooter>
                <Button colorScheme="facebook" color={"white"} _hover={{ bg: "#24105c" }} onClick={closeModal}>
                  OK
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Footer />
        </Box>
      </Navibar>
    </Box>
  );
}
