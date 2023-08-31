import { Box, Button, Divider, Flex, Image, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import api from "../api"
import { IoTicketSharp } from "react-icons/io5";


function TransactionStep1() {
    const [events, setEvents] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        api.get(`/events/${id}`).then((res) => {
            setEvents([res.data])
        });
    }, []);

    const [quantityGold, setQuantityGold] = useState(0);
    const [quantityPlatinum, setQuantityPlatinum] = useState(0);
    const [quantityDiamond, setQuantityDiamond] = useState(0);

    const handleDecrement = (ticketType) => {
        switch (ticketType) {
            case 'Gold':
                setQuantityGold(Math.max(0, quantityGold - 1));
                break;
            case 'Platinum':
                setQuantityPlatinum(Math.max(0, quantityPlatinum - 1));
                break;
            case 'Diamond':
                setQuantityDiamond(Math.max(0, quantityDiamond - 1));
                break;
            default:
                break;
        }
    };

    const handleIncrement = (ticketType) => {
        switch (ticketType) {
            case 'Gold':
                setQuantityGold(quantityGold + 1);
                break;
            case 'Platinum':
                setQuantityPlatinum(quantityPlatinum + 1);
                break;
            case 'Diamond':
                setQuantityDiamond(quantityDiamond + 1);
                break;
            default:
                break;
        }
    };

    const getQuantity = (ticketType) => {
        switch (ticketType) {
            case 'Gold':
                return quantityGold;
            case 'Platinum':
                return quantityPlatinum;
            case 'Diamond':
                return quantityDiamond;
            default:
                return 0;
        }
    };

    const calculateTotalPrice = (ticketType, price) => {
        switch (ticketType) {
            case 'Gold':
                return quantityGold * price;
            case 'Platinum':
                return quantityPlatinum * price;
            case 'Diamond':
                return quantityDiamond * price;
            default:
                return 0;
        }
    };


    const calculatedEvents = events.map((event) => {
        const ticketPriceGold = event.ticket_types.Gold || 0;
        const ticketPricePlatinum = event.ticket_types.Platinum || 0;
        const ticketPriceDiamond = event.ticket_types.Diamond || 0;

        const totalPriceGold = quantityGold * ticketPriceGold;
        const totalPricePlatinum = quantityPlatinum * ticketPricePlatinum;
        const totalPriceDiamond = quantityDiamond * ticketPriceDiamond;
        const grandTotal = totalPriceGold + totalPricePlatinum + totalPriceDiamond;

        return {
            ...event,
            totalPriceGold,
            totalPricePlatinum,
            totalPriceDiamond,
            grandTotal,
        };
    });

    return (
        <>
            <Box display={"flex"} flexDirection="column" bgColor="#EDEDED" ml={40} mr={40} mt={2} borderTopRadius={10}>
                <Text display="flex" justifyContent="flex-start" ml={4} mt={4}>
                    PILIH KATEGORI
                </Text>
                <Box mx={4} mt={3}>
                    <Divider borderColor="blackAlpha.300" />
                </Box>
                {events.map(event => (
                    <>
                        <Image src={event.images} mx={20} mt={4} borderRadius={15} />
                        <Flex mx={4}>
                            <Table variant="simple" colorScheme="blackAlpha">
                                <Thead>
                                    <Tr>
                                        <Th>Jenis Kategori</Th>
                                        <Th textAlign="center">Harga per tiket</Th>
                                        <Th textAlign="center">Kuantitas</Th>
                                        <Th textAlign="center" width="200px">Jumlah</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {Object.entries(event.ticket_types).map(([ticketType, price]) => (
                                        <Tr key={ticketType}>
                                            <Td>
                                                <Flex direction={"row"} alignItems={"center"} gap={3}>
                                                    <IoTicketSharp size={"20px"} />
                                                    <Flex direction={"column"}>
                                                        <Text fontSize="sm" fontWeight="bold" colorScheme="blackAlpha">
                                                            {ticketType}
                                                        </Text>
                                                        <Text fontSize={"xs"}>
                                                            Harga belum termasuk pajak PPn 10%
                                                        </Text>
                                                    </Flex>
                                                </Flex>
                                            </Td>
                                            <Td textAlign="center">
                                                <Text fontSize="xs" colorScheme="blackAlpha">
                                                    {price.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })}
                                                </Text>
                                            </Td>
                                            <Td textAlign="center">
                                                <Flex gap={1} alignItems="center" justifyContent="center">
                                                    <Button bg={"#331F69"} color="white" size="xs" onClick={() => handleDecrement(ticketType)}>
                                                        -
                                                    </Button>
                                                    <Text fontSize="xs">{getQuantity(ticketType)}</Text>
                                                    <Button bg={"#331F69"} color="white" size="xs" onClick={() => handleIncrement(ticketType)}>
                                                        +
                                                    </Button>
                                                </Flex>
                                            </Td>
                                            <Td textAlign="center">
                                                <Text fontSize="xs">
                                                    {calculateTotalPrice(ticketType, price).toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })}
                                                </Text>
                                            </Td>
                                        </Tr>
                                    ))}
                                    <Tr>
                                        <Td colSpan={3} textAlign="center">
                                            Total
                                        </Td>
                                        <Td textAlign="center">
                                            <Text fontWeight="bold">
                                                {calculatedEvents[0].grandTotal.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })}
                                            </Text>
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </Flex>
                    </>
                ))}
            </Box>
        </>
    )
}
export default TransactionStep1;