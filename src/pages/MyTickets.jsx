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

  const virtualAccNumbers = purchasedTicket.map((ticket) => {
    const phoneNumber = ticket.phonenumber;
    const bankCode = getBankCode(ticket.paymentmethod); // Replace this with your logic to get the bank code

    if (phoneNumber && bankCode) {
      const virtualAccNumber = bankCode + phoneNumber;
      return virtualAccNumber;
    }

    return null; // Handle cases where phoneNumber or bankCode is missing
  });

  // Define a function to get bank code based on the payment method
  function getBankCode(paymentMethod) {
    switch (paymentMethod) {
      case "Virtual Account BCA":
        return "8800";
      case "Virtual Account Mandiri":
        return "9002";
      case "Virtual Account BNI":
        return "1001";
      default:
        return null; // Handle unsupported payment methods
    }
  }

  return (
    <Navibar>
      <Box minH={"90vh"}>
      <Flex flexDirection="column" justifyContent="center" alignItems="center" ml={10} mr={10}>
      <Text p={{ base: '2px', md: '4px', lg: '10px' }} fontSize={{ base: '25px', md: '30px', lg: '36px' }} fontWeight={"bold"}> My Tickets</Text>

      {purchasedTicket
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .reverse()
        .map((data) => (
          <Box
          key={data.id}
          display="flex"
          flexDirection="column"
          ml={8}
          mr={8}
          mt={2}
          h={{ base: '640px', md: '800px', lg: '280px' }}
          width={{ base: '390px', md: '500px', lg: '1200px' }}
          boxShadow="lg"
          p={4}
          borderRadius="md"
          borderWidth="1px"
          borderColor="gray.300"
        >
          <Flex alignItems={"center"} justifyContent={"space-between"} p={2} bg={"green"} color={"white"}>
            <Text> {data.status} </Text>
            <Text> {data.eventname}</Text>
          </Flex>
          <Flex bgColor={"#331F69"} alignItems={"center"} boxShadow={"2xl"} direction={{base: "column", md: "column", lg: "row"}}>
            <Flex direction={"row"} gap={2} p = {{ base: '2px', md: '4px', lg: '10px' }} m={4}>
              <Flex direction={"column"} justifyContent={"center"}>
                <Text fontWeight={"bold"} fontSize={{ base: '14px', md: '16px', lg: '18px' }} color="white">
                  Purchase Date 
                </Text>
                <Text fontWeight={"bold"}  fontSize={{ base: '14px', md: '16px', lg: '18px' }} color="white">
                  Nama
                </Text>
                <Text fontWeight={"bold"}  fontSize={{ base: '14px', md: '16px', lg: '18px' }} color="white">
                  Email
                </Text>
                <Text fontWeight={"bold"}  fontSize={{ base: '14px', md: '16px', lg: '18px' }} color="white">
                  Telepon
                </Text>
                <Text fontWeight={"bold"}  fontSize={{ base: '14px', md: '16px', lg: '18px' }} color="white">
                  Payment Method
                </Text>
              </Flex>
              <Flex direction={"column"} justifyContent={"center"}>
                <Text fontWeight={"bold"}  fontSize={{ base: '14px', md: '16px', lg: '18px' }} color="white">
                  :
                </Text>
                <Text fontWeight={"bold"}  fontSize={{ base: '14px', md: '16px', lg: '18px' }} color="white">
                  :
                </Text>
                <Text fontWeight={"bold"}  fontSize={{ base: '14px', md: '16px', lg: '18px' }}color="white">
                  :
                </Text>
                <Text fontWeight={"bold"}  fontSize={{ base: '14px', md: '16px', lg: '18px' }} color="white">
                  :
                </Text>
                <Text fontWeight={"bold"} fontSize={{ base: '14px', md: '16px', lg: '18px' }} color="white">
                  :
                </Text>
              </Flex>
              <Flex direction={"column"} justifyContent={"center"}>
                <Text  fontSize={{ base: '14px', md: '16px', lg: '18px' }} color="white">
                {new Date(data.timestamp).toLocaleString()}
                </Text>
                <Text  fontSize={{ base: '14px', md: '16px', lg: '18px' }} color="white">
                  {data.name}
                </Text>
                <Text  fontSize={{ base: '14px', md: '16px', lg: '18px' }} color="white">
                  {data.email}
                </Text>
                <Text  fontSize={{ base: '14px', md: '16px', lg: '18px' }} color="white">
                  {data.phonenumber}
                </Text>
                <Text  fontSize={{ base: '14px', md: '16px', lg: '18px' }} color="white">
                  {data.paymentmethod}
                </Text>
              </Flex>
            </Flex>

            <Flex justifyContent="flex-start" gap="15" ml={{ base: '0px', md: '16px', lg: '70px' }} direction={{ base: "column", md: 'column', lg: 'row' }}>
              <Flex alignItems={"center"} justifyContent={{ base: "center", md: 'center'}}>
                <IoTicketSharp color="white" size={"35px"} />
              </Flex>
              <Flex flexDirection={"column"} justifyContent={"center"} alignItems={{ base: "center", md: 'center'}}>
                <Flex flexDirection={"column"} justifyContent={{base: "center"}}>
                  {Object.keys(data.ticket).map(
                    (ticketType) =>
                      data.ticket[ticketType] > 0 && (
                        <Text color={"white"} key={ticketType}>
                          {data.ticket[ticketType]} {ticketType} {data.ticket[ticketType] > 1 ? "Tickets" : "Ticket"}
                        </Text>
                      )
                  )}
                </Flex>

                <Flex flexDirection={"column"} alignItems = {{base: "center"}}>
                  <Text color={"white"} fontWeight={"Bold"}>
                    Grand Total :{" "}
                    {data.prices.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    })}
                  </Text>
                  <Text fontSize={"xs"} color="white">
                    Harga sudah termasuk PPn 10%
                  </Text>
                  <Text fontSize={"xs"} color="white">
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
                {(data.paymentmethod === "Virtual Account BCA" || data.paymentmethod === "Virtual Account Livin' By Mandiri" || data.paymentmethod === "Virtual Account BNI") && (
                  <Flex direction={"column"}>
                    {purchasedTicket
                      .filter((ticket) => !["GOPAY", "OVO", "DANA"].includes(ticket.paymentmethod))
                      .map((ticket, index) => (
                        <Text color={"white"} key={index}>
                          {ticket.paymentmethod} : <b>{virtualAccNumbers[index]}</b>
                        </Text>
                      ))}
                  </Flex>
                )}
              </Flex>
              <Flex ml={{lg: "200px"}} justifyContent={{base: "center"}} mb={{base: "30px"}}>
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
        <Button
          h={10}
          w={10}
          key={index}
          variant="outline"
          colorScheme="facebook"
          _hover={{bg: "tomato", color: "white"}}
          onClick={() => handleClickPage(index + 1)}
          m="1"
          fontWeight={currentPage === index + 1 ? 'bold' : 'normal'} 
        >
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
