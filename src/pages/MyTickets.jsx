import { Box, Flex, Image, Text, useToast } from "@chakra-ui/react";
import { IoTicketSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import mytixQr from "../images/mytixqr.png";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Button } from "@chakra-ui/react";
import Navibar from "../Components/Navibar";
import Footer from "../Components/Footer";
function MyTickets() {
  const [purchasedTicket, setPurchasedTicket] = useState([]);
  const profile = useSelector((state) => state.users.profile);
  const navigate = useNavigate();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [remainingTimes, setRemainingTimes] = useState([]);

  const itemsPerPage = 3; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(purchasedTicket.length / itemsPerPage);

  const handleClickPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/purchasedticket?q=${profile.username}`);
        const { data } = res;
        const getTicketByUserName = data.filter((ticket) => ticket.username === profile.username);
        if (getTicketByUserName.length === 0) {
          setIsModalOpen(true); // Show the modal
        } else {
          // Store the response in state when tickets are found
          setPurchasedTicket(data);
        }
      } catch (err) {
        toast({
          title: "Something went wrong",
          description: err.message,
          status: "error",
          isClosable: true,
        });
      }
    };
    fetchData();
  }, [profile, navigate, toast]);

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    navigate("/"); // Navigate to "/"
  };

  const calculateRemainingTime = (purchaseTimestamp) => {
    const purchaseTime = new Date(purchaseTimestamp).getTime(); // Purchase timestamp from JSON
    const currentTime = new Date().getTime(); // Current timestamp

    // Calculate the time remaining in seconds (24 hours = 24 * 60 * 60 seconds)
    const timeRemaining = Math.max(0, Math.floor((purchaseTime + 24 * 60 * 60 * 1000 - currentTime) / 1000));

    if (timeRemaining === 0) {
      return "Payment Canceled"; // Handle expired events
    }

    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };
  useEffect(() => {
    // Create an interval to update remaining time every second
    const intervalId = setInterval(() => {
      // Update remaining time for each ticket
      setRemainingTimes((prevRemainingTimes) =>
        prevRemainingTimes.map((remaining) => {
          if (remaining === "Event has ended") {
            return remaining;
          }

          // Parse remaining time
          const [hours, minutes, seconds] = remaining.split(":").map(Number);

          // Calculate total remaining seconds
          const totalSeconds = hours * 3600 + minutes * 60 + seconds - 1;

          if (totalSeconds <= 0) {
            return "Event has ended"; // Handle expired events
          }

          // Calculate new hours, minutes, and seconds
          const newHours = Math.floor(totalSeconds / 3600);
          const newMinutes = Math.floor((totalSeconds % 3600) / 60);
          const newSeconds = totalSeconds % 60;

          return `${newHours}:${newMinutes}:${newSeconds}`;
        })
      );
    }, 1000); // Update every second

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, []);

  const sortedPurchasedTicket = purchasedTicket.slice().sort((a, b) => b.timestamp - a.timestamp);

  return (
    <Navibar>
      <Box minH={"90vh"}>
        <Flex flexDirection="column" justifyContent="center" alignItems="center" ml={10} mr={10}>
          <Text p={{ base: "2px", md: "4px", lg: "10px" }} fontSize={{ base: "25px", md: "30px", lg: "36px" }} fontWeight={"bold"}>
            {" "}
            My Tickets
          </Text>

          {sortedPurchasedTicket.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((data) => (
            <Box
              key={data.id}
              display="flex"
              flexDirection="column"
              ml={8}
              mr={8}
              mt={2}
              h={{ base: "600px", md: "800px", lg: "280px" }}
              width={{ base: "360px", md: "500px", lg: "1200px" }}
              boxShadow="lg"
              p={4}
              borderRadius="md"
              borderWidth="1px"
              borderColor="gray.300"
            >
              <Flex alignItems={"center"} justifyContent={"space-between"} gap={6} p={2} bgColor={calculateRemainingTime(data.timestamp) === "Payment Canceled" ? "red" : "green"} color={"white"}>
                <Text mt={1} bg={"tomato"} fontWeight="bold" fontSize={{base:"12px", lg: "14px"}} borderRadius={15} paddingX={2} paddingY={1}>
                  {" "}
                  {calculateRemainingTime(data.timestamp)}
                </Text>
                <Text fontSize={{base:"12px", lg: "20px"}}textAlign={"center"}> {calculateRemainingTime(data.timestamp) !== "Payment Canceled" ? data.status : "Ticket are canceled"} </Text>
                <Text fontSize={{base:"12px", lg: "20px"}}> {data.eventname} </Text>
              </Flex>
              <Flex h={{base: "536px"}} bgColor={calculateRemainingTime(data.timestamp) === "Payment Canceled" ? "grey" : "#331F69"} alignItems="center" boxShadow="2xl" direction={{ base: "column", md: "column", lg: "row" }}>
                <Flex direction={"row"} gap={2} p={{ base: "2px", md: "4px", lg: "10px" }} m={4}>
                  <Flex direction={"column"} justifyContent={"center"}>
                    <Text fontWeight={"bold"} fontSize={{ base: "10px", md: "16px", lg: "18px" }} color="white">
                      Purchase Date
                    </Text>
                    <Text fontWeight={"bold"} fontSize={{ base: "10px", md: "16px", lg: "18px" }} color="white">
                      Nama
                    </Text>
                    <Text fontWeight={"bold"} fontSize={{ base: "10px", md: "16px", lg: "18px" }} color="white">
                      Email
                    </Text>
                    <Text fontWeight={"bold"} fontSize={{ base: "10px", md: "16px", lg: "18px" }} color="white">
                      Telepon
                    </Text>
                    <Text fontWeight={"bold"} fontSize={{ base: "10px", md: "16px", lg: "18px" }} color="white">
                      Payment Method
                    </Text>
                  </Flex>
                  <Flex direction={"column"} justifyContent={"center"}>
                    <Text fontWeight={"bold"} fontSize={{ base: "10px", md: "16px", lg: "18px" }} color="white">
                      :
                    </Text>
                    <Text fontWeight={"bold"} fontSize={{ base: "10px", md: "16px", lg: "18px" }} color="white">
                      :
                    </Text>
                    <Text fontWeight={"bold"} fontSize={{ base: "10px", md: "16px", lg: "18px" }} color="white">
                      :
                    </Text>
                    <Text fontWeight={"bold"} fontSize={{ base: "10px", md: "16px", lg: "18px" }} color="white">
                      :
                    </Text>
                    <Text fontWeight={"bold"} fontSize={{ base: "10px", md: "16px", lg: "18px" }} color="white">
                      :
                    </Text>
                  </Flex>
                  <Flex direction={"column"} justifyContent={"center"}>
                    <Text fontSize={{ base: "10px", md: "16px", lg: "18px" }} color="white">
                      {new Date(data.timestamp).toLocaleString()}
                    </Text>
                    <Text fontSize={{ base: "10px", md: "16px", lg: "18px" }} color="white">
                      {data.name}
                    </Text>
                    <Text fontSize={{ base: "10px", md: "16px", lg: "18px" }} color="white">
                      {data.email}
                    </Text>
                    <Text fontSize={{ base: "10px", md: "16px", lg: "18px" }} color="white">
                      {data.phonenumber}
                    </Text>
                    <Text fontSize={{ base: "10px", md: "16px", lg: "18px" }} color="white">
                      {data.paymentmethod}
                    </Text>
                  </Flex>
                </Flex>

                <Flex justifyContent="flex-start" gap="15" ml={{ base: "0px", md: "16px", lg: "70px" }} direction={{ base: "column", md: "column", lg: "row" }}>
                  <Flex alignItems={"center"} justifyContent={{ base: "center", md: "center" }}>
                    <IoTicketSharp color="white" size={"35px"} />
                  </Flex>
                  <Flex flexDirection={"column"} justifyContent={"center"} alignItems={{ base: "center", md: "center" }}>
                    <Flex flexDirection={"column"} justifyContent={{ base: "center" }}>
                      {Object.keys(data.ticket).map(
                        (ticketType) =>
                          data.ticket[ticketType] > 0 && (
                            <Text fontSize={{base:"12px"}} color={"white"} key={ticketType}>
                              {data.ticket[ticketType]} {ticketType} {data.ticket[ticketType] > 1 ? "Tickets" : "Ticket"}
                            </Text>
                          )
                      )}
                    </Flex>

                    <Flex flexDirection={"column"} alignItems={{ base: "center" }}>
                      <Text fontSize={{base:"12px"}} color={"white"} fontWeight={"Bold"}>
                        Grand Total :{" "}
                        {data.prices.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: 0,
                        })}
                      </Text>
                      <Text fontSize={{base:"10px", lg: "xs"}} color="white">
                        Harga sudah termasuk PPn 10%
                      </Text>
                      <Text fontSize={{base:"10px", lg: "xs"}} color="white">
                        dan potongan {""}
                        <b>
                          {data.diskon.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            maximumFractionDigits: 0,
                          })}
                        </b>
                        {""} dari diskon.
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex ml={{ lg: "200px" }} justifyContent={{ base: "center" }} mb={{ base: "10px" }}>
                    {(data.paymentmethod === "GOPAY" || data.paymentmethod === "OVO" || data.paymentmethod === "DANA") && (
                      <Flex direction={"column"} justifyContent={"center"} alignItems={"center"}>
                        <Text color={"white"} fontWeight={"bold"}>
                          SCAN THIS QR CODE
                        </Text>
                        <Image maxW="150px" maxH="150px" src={mytixQr} />
                      </Flex>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Flex>
        <Flex justifyContent={"flex-end"} alignItems={"center"} mr={40} mt={4}>
          <Text mr={2}> Pages</Text>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button h={10} w={10} key={index} variant="outline" colorScheme="facebook" _hover={{ bg: "tomato", color: "white" }} onClick={() => handleClickPage(index + 1)} m="1" fontWeight={currentPage === index + 1 ? "bold" : "normal"}>
              {index + 1}
            </Button>
          ))}
        </Flex>
        <Modal isOpen={isModalOpen} onClose={closeModal} isCentered blockScrollOnMount={true} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Warning</ModalHeader>
            <ModalBody>Kamu belum melakukan pembelian tiket apapun!</ModalBody>
            <ModalFooter>
              <Button colorScheme="facebook" color={"white"} _hover={{ bg: "#24105c" }} onClick={closeModal}>
                OK
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <Footer />
    </Navibar>
  );
}
export default MyTickets;
