import { Flex, Box, Text, useToast, Heading, Image, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { IoTicketSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import mytixQr from "../images/mytixqr.png";


const TransactionStep3 = () => {
  const [events, setEvents] = useState([]);
  const { id } = useParams();
  const ticketQuantities = useSelector((state) => state.transaction.ticketQuantities);
  const discountCoupon = useSelector((state) => state.transaction.discountedTotalPricesByCoupon);
  const discountReff = useSelector((state) => state.transaction.discountedTotalPricesByReff);
  const discountedTotalPrices = useSelector((state) => state.transaction.discountedTotalPrices);
  const paymentMethod = useSelector((state) => state.transaction.paymentMethod);
  const formData = useSelector((state) => state.transaction.formData);
  const { name, email, telepon } = formData;
  const selectedTickets = Object.keys(ticketQuantities).filter((ticketType) => ticketQuantities[ticketType] > 0);
  const toast = useToast();
  const potonganHarga = discountCoupon + discountReff;
  const virtualAccBCA = "8800" + telepon;
  const virtualAccMandiri = "9002" + telepon;
  const virtualAccBNI = "1001" + telepon;
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
      phonenumber : formData.telepon,
      paymentmethod : paymentMethod,
      eventname: eventName,
      ticket : ticketQuantities,
      prices : discountedTotalPrices,
      diskon : discountCoupon + discountReff,
      status : "Waiting for payment",
      timestamp: currentTimestamp,
    };

    api.post("/purchasedticket", body);
    toast({
      title: "Ticket has been booked, please complete your transaction",
      description: "Redirecting you to homepage",
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
    <>
      <Box display={"flex"} flexDirection="column" ml={10} mr={10} mt={2} h={"50vh"} borderTopRadius={10}>
        {events.map((event) => (
          <Flex justifyContent={"space-between"} mx={10} mt={4} mb={4}>
            {paymentMethod === "Credit Card" ? (
              <Text fontWeight={"bold"} color={"white"} bg={"green"} p={2} borderRadius={20} boxShadow={"dark-lg"}>
                {" "}
                Waiting for credit card confirmation
              </Text>
            ) : (
              <Text fontWeight={"bold"} color={"white"} bg={"green"} p={2} borderRadius={20} boxShadow={"dark-lg"}>
                {" "}
                Waiting for payment
              </Text>
            )}
            <Text fontWeight={"bold"}>{event.name}</Text>
          </Flex>
        ))}
        <Flex bgColor={"#331F69"} alignItems={"center"} boxShadow={"2xl"} borderRadius={15} >
          <Flex direction={"row"} gap={2} p={10} m={4}>
            <Flex direction={"column"} justifyContent={"center"}>
              <Text fontWeight={"bold"} fontSize={"lg"} color="white">
                Nama
              </Text>
              <Text fontWeight={"bold"} fontSize={"lg"} color="white">
                Email
              </Text>
              <Text fontWeight={"bold"} fontSize={"lg"} color="white">
                Telepon
              </Text>
              <Text fontWeight={"bold"} fontSize={"lg"} color="white">
                Payment Method
              </Text>
            </Flex>
            <Flex direction={"column"} justifyContent={"center"}>
              <Text fontWeight={"bold"} fontSize={"lg"} color="white">
                :
              </Text>
              <Text fontWeight={"bold"} fontSize={"lg"} color="white">
                :
              </Text>
              <Text fontWeight={"bold"} fontSize={"lg"} color="white">
                :
              </Text>
              <Text fontWeight={"bold"} fontSize={"lg"} color="white">
                :
              </Text>
            </Flex>
            <Flex direction={"column"} justifyContent={"center"}>
              <Text fontSize={"lg"} color="white">
                {name}
              </Text>
              <Text fontSize={"lg"} color="white">
                {email}
              </Text>
              <Text fontSize={"lg"} color="white">
                {telepon}
              </Text>
              <Text fontSize={"lg"} color="white">
                {paymentMethod}
              </Text>
            </Flex>
          </Flex>

          <Flex justifyContent="flex-start" gap="15" ml={10} direction={"row"}>
            <Flex alignItems={"center"}>
              <IoTicketSharp color="white" size={"35px"} />
            </Flex>
            <Flex flexDirection={"column"} justifyContent={"center"}>
              <Flex flexDirection={"column"}>
                {selectedTickets.map((ticketType) => (
                  <Text color={"white"} key={ticketType}>
                    {ticketQuantities[ticketType]} {ticketType} Tickets
                  </Text>
                ))}
              </Flex>
              <Flex flexDirection={"column"}>
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
              <Flex direction={"column"}>
                {paymentMethod === "Virtual Account BCA" && (
                  <Text color={"white"} fontWeight={"bold"}>
                    {" "}
                    Virtual Account : {virtualAccBCA}
                  </Text>
                )}
                {paymentMethod === "Virtual Account Livin' By Mandiri" && (
                  <Text color={"white"} fontWeight={"bold"}>
                    {" "}
                    Virtual Account{virtualAccMandiri}
                  </Text>
                )}
                {paymentMethod === "Virtual Account BNI" && (
                  <Text color={"white"} fontWeight={"bold"}>
                    {" "}
                    VirtualAccount{virtualAccBNI}
                  </Text>
                )}
              </Flex>
            </Flex>
            <Flex ml="140px">
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
        <Button onClick={handlePurchase} mt={4} colorScheme="red" borderRadius={15} boxShadow={"lg"}>Konfirmasi</Button>
      </Box>
    </>
  );
};

export default TransactionStep3;
