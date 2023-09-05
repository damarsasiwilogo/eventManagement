import { Flex, Box, Text, useToast } from "@chakra-ui/react";
import { useSelector } from 'react-redux';
import { IoTicketSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api"


const TransactionStep3 = () => {
    const [events, setEvents] = useState([]);
    const { id } = useParams();
    const ticketQuantities = useSelector((state) => state.transaction.ticketQuantities);
    const totalPrices = useSelector((state) => state.transaction.totalPrices);
    const formData = useSelector((state) => state.transaction.formData);
    const { name, email, telepon, identitas, date, month, year } = formData;

    const selectedTickets = Object.keys(ticketQuantities).filter((ticketType) => ticketQuantities[ticketType] > 0);
    const toast = useToast()

    useEffect(() => {
        api.get(`/events/${id}`).then((res) => {
            setEvents([res.data])
        }).catch((err) => {
            toast({
              title:"Something wrong",
              description: err.message,
              status: "error",
              isClosable: true
            })
          });
    }, []);


    return (
        <>
            <Box display={"flex"} flexDirection="column" bgColor="#EDEDED" ml={40} mr={40} mt={2} borderTopRadius={10}>
                {events.map(event => (
                    <Flex justifyContent={"space-between"}  mx={10} mt={4}>
                        <Text fontWeight={"bold"}> Personal Information
                        </Text>
                        <Text fontWeight={"bold"}>
                            {event.name}
                        </Text>
                    </Flex>
                ))}
                
                <Flex direction={"row"} bgColor={"#331F69"} gap={2} p={10} m={4} mb={10} borderRadius={15}>
                    <Flex direction={"column"}>
                        <Text fontWeight={"bold"} fontSize={"lg"} color="white">Nama</Text>
                        <Text fontWeight={"bold"} fontSize={"lg"} color="white">Email</Text>
                        <Text fontWeight={"bold"} fontSize={"lg"} color="white">Telepon</Text>
                        <Text fontWeight={"bold"} fontSize={"lg"} color="white">No. Identitas</Text>
                    </Flex>
                    <Flex direction={"column"}>
                        <Text fontWeight={"bold"} fontSize={"lg"} color="white">:</Text>
                        <Text fontWeight={"bold"} fontSize={"lg"} color="white">:</Text>
                        <Text fontWeight={"bold"} fontSize={"lg"} color="white">:</Text>
                        <Text fontWeight={"bold"} fontSize={"lg"} color="white">:</Text>
                    </Flex>
                    <Flex direction={"column"}>
                        <Text fontSize={"lg"} color="white">{name} </Text>
                        <Text fontSize={"lg"} color="white"> {email} </Text>
                        <Text fontSize={"lg"} color="white"> {telepon}</Text>
                        <Text fontSize={"lg"} color="white">{identitas} </Text>
                    </Flex>
                    <Flex justifyContent="flex-end" gap="15" direction={"row"} ml={350}>
                        <Flex alignItems={"center"} >
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
                                <Text color={"white"} fontWeight={"Bold"}>Grand Total : {totalPrices.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    maximumFractionDigits: 0
                                })}
                                </Text>
                                <Text fontSize={"xs"} color="white"> Harga sudah termasuk PPn 10% </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>

            </Box>
        </>
    );
}

export default TransactionStep3;