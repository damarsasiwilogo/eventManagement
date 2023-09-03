import { Box, Button, Divider, Flex, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, Tbody, Td, Text, Th, Thead, Tr, Center } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import api from "../api"
import { IoTicketSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setTicketQuantities, setTotalPrices } from '../slices/transactionSlices';
import { resetTransaction } from '../slices/transactionSlices';



function TransactionStep1() {
    const [events, setEvents] = useState([]);

    const { id } = useParams();

    const MAX_QUANTITY = 5; // Maximum allowed quantity
    const [quantityGold, setQuantityGold] = useState(0);
    const [quantityPlatinum, setQuantityPlatinum] = useState(0);
    const [quantityDiamond, setQuantityDiamond] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const totalQuantity = quantityGold + quantityPlatinum + quantityDiamond;
    const dispatch = useDispatch();
    const ticketQuantities = useSelector((state) => state.transaction.ticketQuantities);

    useEffect(() => {
        api.get(`/events/${id}`).then((res) => {
            setEvents([res.data])
        });
    }, []);



    const handleDecrement = (ticketType) => {
        switch (ticketType) {
            case 'Gold':
                setQuantityGold(Math.max(0, quantityGold - 1));
                dispatch(
                    setTicketQuantities({
                        ...ticketQuantities,
                        Gold: Math.max(0, ticketQuantities.Gold - 1),
                    })
                );
                break;
            case 'Platinum':
                setQuantityPlatinum(Math.max(0, quantityPlatinum - 1));
                dispatch(
                    setTicketQuantities({
                        ...ticketQuantities,
                        Platinum: Math.max(0, ticketQuantities.Platinum - 1),
                    })
                );
                break;
            case 'Diamond':
                setQuantityDiamond(Math.max(0, quantityDiamond - 1));
                dispatch(
                    setTicketQuantities({
                        ...ticketQuantities,
                        Diamond: Math.max(0, ticketQuantities.Diamond - 1),
                    })
                );
                break;
            default:
                break;
        }



    };

    const handleIncrement = (ticketType) => {
        switch (ticketType) {
            case 'Gold':
                if (quantityGold <= MAX_QUANTITY) {
                    setQuantityGold(quantityGold + 1);
                    dispatch(
                        setTicketQuantities({
                            ...ticketQuantities,
                            Gold: quantityGold + 1,
                        })
                    );
                }
                break;
            case 'Platinum':
                if (quantityPlatinum <= MAX_QUANTITY) {
                    setQuantityPlatinum(quantityPlatinum + 1);
                    dispatch(
                        setTicketQuantities({
                            ...ticketQuantities,
                            Platinum: quantityPlatinum + 1,
                        })
                    );
                }
                break;
            case 'Diamond':
                if (quantityDiamond <= MAX_QUANTITY) {
                    setQuantityDiamond(quantityDiamond + 1);
                    dispatch(
                        setTicketQuantities({
                            ...ticketQuantities,
                            Diamond: quantityDiamond + 1,
                        })
                    );
                }
                break;
        }


        // Add an effect to reset quantities and show a popup when exceeding the maximum
        if (
            quantityGold >= MAX_QUANTITY ||
            quantityPlatinum >= MAX_QUANTITY ||
            quantityDiamond >= MAX_QUANTITY ||
            totalQuantity >= MAX_QUANTITY
        ) {
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setQuantityGold(0);
        setQuantityPlatinum(0);
        setQuantityDiamond(0);
        dispatch(resetTransaction());
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

    const calculateGrandTotal = (ticketTypes) => {
        let grandTotal = 0;
        for (const [ticketType, price] of Object.entries(ticketTypes)) {
            grandTotal += calculateTotalPrice(ticketType, price);
        }

        dispatch(setTotalPrices(grandTotal));
        return grandTotal;
    };


    return (
        <>
            <Box display={"flex"} flexDirection="column" bgColor="#EDEDED" ml={40} mr={40} mt={2} borderTopRadius={10}>

                {events.map(event => (
                    <>
                        <Image src={event.images} mx={20} mt={4} borderRadius={15} />
                        <Flex mx={100}>
                            <Table variant="simple" colorScheme="blackAlpha">
                                <Thead>
                                    <Tr>
                                        <Th width="300px">
                                            <Text fontSize={"sm"}>
                                                Jenis Kategori
                                            </Text>
                                        </Th>
                                        <Th textAlign="center">
                                            <Text fontSize={"sm"}>
                                                Harga per tiket
                                            </Text>
                                        </Th>
                                        <Th textAlign="center">
                                            <Text fontSize={"sm"}>
                                                Kuantitas
                                            </Text>
                                        </Th>
                                        <Th textAlign="center" width="200px">
                                            <Text fontSize={"sm"}>
                                                Jumlah
                                            </Text>
                                        </Th>
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
                                                        <Text fontSize={"xs"}>
                                                            {event.date}
                                                        </Text>
                                                        <Text fontSize={"xs"}>
                                                            {event.time}
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
                                                    <Button colorScheme="facebook"
                                                        color={"white"}
                                                        _hover={{ bg: "#24105c" }} size="xs" onClick={() => handleDecrement(ticketType)}>
                                                        -
                                                    </Button>
                                                    <Text fontSize="xs">{getQuantity(ticketType)}</Text>
                                                    <Button colorScheme="facebook"
                                                        color={"white"}
                                                        _hover={{ bg: "#24105c" }} size="xs" onClick={() => handleIncrement(ticketType)}>
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
                                                {calculateGrandTotal(event.ticket_types).toLocaleString("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                    maximumFractionDigits: 0
                                                })}
                                            </Text>
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </Flex>
                    </>
                ))}
                <Modal isOpen={isModalOpen} onClose={closeModal} isCentered blockScrollOnMount={true}
                    closeOnOverlayClick={false}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Warning</ModalHeader>
                        <ModalBody>
                            Kamu telah mencapai batas jumlah pembelian tiket!
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
            </Box>
        </>
    )
}
export default TransactionStep1;