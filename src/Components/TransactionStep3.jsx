import { Flex, Box, Text, useToast, Heading, Image, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { IoTicketSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import mytixQr from "../images/mytixqr.png";

const TransactionStep3 = ({onPrevious}) => {
  const [events, setEvents] = useState([]);
  const { id } = useParams();
  const ticketQuantities = useSelector((state) => state.transaction.ticketQuantities);
  const discountCoupon = useSelector((state) => state.transaction.discountedTotalPricesByCoupon);
  const discountReff = useSelector((state) => state.transaction.discountedTotalPricesByReff);
  const discountedTotalPrices = useSelector((state) => state.transaction.discountedTotalPrices);
  const paymentMethod = useSelector((state) => state.transaction.paymentMethod);
  const vaNumber = useSelector((state) => state.transaction.vaNumber);
  const formData = useSelector((state) => state.transaction.formData);
  const { name, email, telepon } = formData;
  const selectedTickets = Object.keys(ticketQuantities).filter((ticketType) => ticketQuantities[ticketType] > 0);
  const toast = useToast();
  const potonganHarga = discountCoupon + discountReff;
  const profile = useSelector((state) => state.users.profile);
  const eventName = useSelector((state) => state.transaction.eventName);
  const navigate = useNavigate();

  const handlePurchase = () => {
    try {
      const currentTimestamp = Date.now();
      const body = {
        username: profile.username,
        name: formData.name,
        email: formData.email,
        phonenumber: formData.telepon,
        paymentmethod: paymentMethod + formData.telepon,
        eventname: eventName,
        ticket: ticketQuantities,
        prices: discountedTotalPrices,
        diskon: discountCoupon + discountReff,
        status: "Waiting for payment",
        timestamp: currentTimestamp,
      };

      api.post("/purchasedticket", body);
      toast({
        title: "Ticket has been booked, please complete your transaction",
        description: "Redirecting you to your tickets page",
        status: "success",
        duration: 6000,
        isClosable: true,
        onCloseComplete: () => {
          navigate("/");
        },
      });
    } catch (error) {
      // Handle other errors if needed
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    api
      .get(`/events/${id}`)
      .then((res) => {
        setEvents([res.data]);
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

  return (
    <Box height={{ base: "72vh" }}>
      <Box display={"flex"} flexDirection="column" ml={{ lg: 10 }} mr={{ lg: 10 }} mt={2} h={"50vh"} borderTopRadius={10}>
        {events.map((event) => (
          <Flex justifyContent={"space-between"} alignItems={{base: "center"}} gap={{ base: 14 }} mx={{ lg: 10 }} mt={4} mb={{base:2 ,lg:4}}>
            {paymentMethod === "Credit Card" ? (
              <Text textAlign={{base: "center"}} ml={{ base: 4 }} w={{base: "140px", lg: "320px"}} fontSize={{ base: "10px", lg: "16px" }} fontWeight={"bold"} color={"white"} bg={"green"} p={2} borderRadius={20} boxShadow={"dark-lg"}>
                {" "}
                Waiting for credit card confirmation
              </Text>
            ) : (
              <Text textAlign={{base: "center"}} ml={{ base: 4 }} w={{base: "140px", lg: "200px"}} fontSize={{ base: "10px", lg: "16px" }} fontWeight={"bold"} color={"white"} bg={"green"} p={2} borderRadius={20} boxShadow={"dark-lg"}>
                {" "}
                Waiting for payment
              </Text>
            )}
            <Text fontWeight={"bold"}  fontSize={{ base: "10px", lg: "16px" }}>{event.name}</Text>
          </Flex>
        ))}
        <Flex bgColor={"#331F69"} alignItems={{lg: "center"}} direction={{ base: "column", md: "column", lg: "row" }} boxShadow={"2xl"} borderRadius={15}>
          <Flex direction={"row"} gap={2} p={{ base: "2px", md: "4px", lg: "12px" }} m={{base:4, lg: 4}}>
            <Flex direction={"column"} justifyContent={"center"}>
              <Text fontWeight={"bold"} fontSize={{ base: "12px", md: "16px", lg: "18px" }} color="white">
                Nama
              </Text>
              <Text fontWeight={"bold"} fontSize={{ base: "12px", md: "16px", lg: "18px" }} color="white">
                Email
              </Text>
              <Text fontWeight={"bold"} fontSize={{ base: "12px", md: "16px", lg: "18px" }} color="white">
                Telepon
              </Text>
              <Text fontWeight={"bold"} fontSize={{ base: "12px", md: "16px", lg: "18px" }} color="white">
                Payment
              </Text>
            </Flex>
            <Flex direction={"column"} justifyContent={"center"}>
              <Text fontWeight={"bold"} fontSize={{ base: "12px", md: "16px", lg: "18px" }} color="white">
                :
              </Text>
              <Text fontWeight={"bold"} fontSize={{ base: "12px", md: "16px", lg: "18px" }} color="white">
                :
              </Text>
              <Text fontWeight={"bold"} fontSize={{ base: "12px", md: "16px", lg: "18px" }} color="white">
                :
              </Text>
              <Text fontWeight={"bold"} fontSize={{ base: "12px", md: "16px", lg: "18px" }} color="white">
                :
              </Text>
            </Flex>
            <Flex direction={"column"} justifyContent={"center"}>
              <Text fontSize={{ base: "12px", md: "16px", lg: "18px" }} color="white">
                {name}
              </Text>
              <Text fontSize={{ base: "12px", md: "16px", lg: "18px" }} color="white">
                {email}
              </Text>
              <Text fontSize={{ base: "12px", md: "16px", lg: "18px" }} color="white">
                {telepon}
              </Text>
              <Text fontSize={{ base: "12px", md: "16px", lg: "18px" }} color="white">
                {(paymentMethod === "GOPAY") 
                || (paymentMethod === "OVO") 
                || (paymentMethod === "DANA") || (paymentMethod === "Credit Card") ? (paymentMethod) : (paymentMethod + telepon)}
              </Text>
            </Flex>
          </Flex>

          <Flex justifyContent="flex-start" gap="15" ml={{ base: "0px", md: "16px", lg: "70px" }} direction={{ base: "column", md: "column", lg: "row" }}>
            <Flex alignItems={"center"} justifyContent={{ base: "center", md: "center" }}>
              <IoTicketSharp color="white" size={"35px"} />
            </Flex>
            <Flex flexDirection={"column"} justifyContent={{ base: "center" }}>
              <Flex flexDirection={"column"} justifyContent={{ base: "center" }} alignItems={{ base: "center" }}>
                {selectedTickets.map((ticketType) => (
                  <Text color={"white"} key={ticketType}>
                    {ticketQuantities[ticketType]} {ticketType} Tickets
                  </Text>
                ))}
              </Flex>
              <Flex flexDirection={"column"} alignItems={{ base: "center" }}>
                <Text color={"white"} fontWeight={"Bold"}>
                  Grand Total : {""}
                  {discountedTotalPrices.toLocaleString("id-ID", {
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
                    {potonganHarga.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    })}
                  </b>
                  {""} dari diskon.
                </Text>
              </Flex>
            </Flex>
            <Flex ml={{ lg: "200px" }} justifyContent={{ base: "center" }} mb={{ base: "30px" }}>
              {(paymentMethod === "GOPAY" || paymentMethod === "OVO" || paymentMethod === "DANA") && (
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
        <Flex gap={2} justifyContent={{ base: "center", lg: "flex-end" }} alignItems={"center"}>
          <Button bg={"#F7F7F7"} color={"#2e4583"} width={40} padding={{ base: "8px" }} onClick={onPrevious} mt={4} borderRadius={15} boxShadow={"lg"}>
            Kembali
          </Button>
          <Button width={40} padding={{ base: "8px" }} onClick={handlePurchase} mt={4} colorScheme="red" borderRadius={15} boxShadow={"lg"}>
            Konfirmasi
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default TransactionStep3;
