import { Box, Button, Flex, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import api from "../api";
import { IoTicketSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setTicketQuantities, setTotalPrices, setDiscountedTotalPrices } from "../slices/transactionSlices";
import { resetTransaction } from "../slices/transactionSlices";
import { useToast } from "@chakra-ui/react";

function TransactionStep1() {
  const [events, setEvents] = useState([]);
  const { id } = useParams();
  const MAX_QUANTITY = 5; // Maximum allowed quantity
  const [quantityGold, setQuantityGold] = useState(0);
  const [quantityPlatinum, setQuantityPlatinum] = useState(0);
  const [quantityDiamond, setQuantityDiamond] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalQuantity = quantityGold + quantityPlatinum + quantityDiamond;
  const dispatch = useDispatch();
  const ticketQuantities = useSelector((state) => state.transaction.ticketQuantities);
  const toast = useToast();

  // melakukan fetch json pada awal component transactionstep1 di render
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

  //function to handle decrement count of ticket
  const handleDecrement = (ticketType) => {
    switch (ticketType) {
      case "Gold":
        setQuantityGold(Math.max(0, quantityGold - 1));
        dispatch(
          setTicketQuantities({
            ...ticketQuantities,
            Gold: Math.max(0, ticketQuantities.Gold - 1),
          })
        );
        break;
      case "Platinum":
        setQuantityPlatinum(Math.max(0, quantityPlatinum - 1));
        dispatch(
          setTicketQuantities({
            ...ticketQuantities,
            Platinum: Math.max(0, ticketQuantities.Platinum - 1),
          })
        );
        break;
      case "Diamond":
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

  //function to handle increment count of ticket
  const handleIncrement = (ticketType) => {
    switch (ticketType) {
      case "Gold":
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
      case "Platinum":
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
      case "Diamond":
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
    if (quantityGold >= MAX_QUANTITY || quantityPlatinum >= MAX_QUANTITY || quantityDiamond >= MAX_QUANTITY || totalQuantity >= MAX_QUANTITY) {
      setIsModalOpen(true);
    }
  };

  //function closeModal
  const closeModal = () => {
    setIsModalOpen(false);
    setQuantityGold(0);
    setQuantityPlatinum(0);
    setQuantityDiamond(0);
    dispatch(resetTransaction());
  };

  //function untuk mengambil quantity dari masing masing tiket
  const getQuantity = (ticketType) => {
    switch (ticketType) {
      case "Gold":
        return quantityGold;
      case "Platinum":
        return quantityPlatinum;
      case "Diamond":
        return quantityDiamond;
      default:
        return 0;
    }
  };

  // function untuk melakukan kalkulasi harga pertiket
  const calculateTotalPrice = (ticketType, price) => {
    switch (ticketType) {
      case "Gold":
        return quantityGold * price;
      case "Platinum":
        return quantityPlatinum * price;
      case "Diamond":
        return quantityDiamond * price;
      default:
        return 0;
    }
  };

  //function untuk melakukan kalkulasi total harga seluruh tiket
  const calculateGrandTotal = (ticketTypes) => {
    let grandTotal = 0;
    for (const [ticketType, price] of Object.entries(ticketTypes)) {
      grandTotal += calculateTotalPrice(ticketType, price);
    }

    //store redux totalPrice 
    dispatch(setTotalPrices(grandTotal));
    dispatch(setDiscountedTotalPrices(grandTotal));
    return grandTotal;
  };

  return (
    <Box>
      <Box display={"flex"} alignItems={{ lg: "center" }} flexDirection="column" ml={{ lg: "40" }} mr={{ lg: "40" }} mt={2} borderTopRadius={10}>
        {events.map((event) => (
          <>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Image src={event.images} h={{ base: "180px", lg: "376px" }} w={{ base: "340px", lg: "800px" }} mx={{ base: "4", lg: "20" }} mt={4} borderRadius={15} />
          </Flex>
            <Flex mx={{ lg: "100" }} mt={{ base: 4 }} overflowX={"auto"}>
              <Table variant="simple" colorScheme="blackAlpha" size={{ base: "sm" }}>
                <Thead>
                  <Tr>
                    <Th width={{ lg: "300px" }}>
                      <Text fontSize={{ base: "xs", lg: "sm" }}>Jenis Kategori</Text>
                    </Th>
                    <Th textAlign="center">
                      <Text fontSize={{ base: "xs", lg: "sm" }}>Harga per tiket</Text>
                    </Th>
                    <Th textAlign="center">
                      <Text fontSize={{ base: "xs", lg: "sm" }}>Kuantitas</Text>
                    </Th>
                    <Th textAlign="center" width="200px">
                      <Text fontSize={{ base: "xs", lg: "sm" }}>Jumlah</Text>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Object.entries(event.ticket_types).map(([ticketType, price]) => (
                    <Tr key={ticketType}>
                      <Td>
                        <Flex direction={{ base: "column", lg: "row" }} alignItems={"center"} gap={3}>
                          <IoTicketSharp size={"20px"} />
                          <Flex direction={"column"}>
                            <Text fontSize="sm" fontWeight="bold" colorScheme="blackAlpha">
                              {ticketType}
                            </Text>
                            <Text fontSize={"xs"}>Harga sudah termasuk pajak PPn 10%</Text>
                            <Text fontSize={"xs"}>{event.date}</Text>
                            <Text fontSize={"xs"}>{event.time}</Text>
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
                          <Button colorScheme="facebook" color={"white"} _hover={{ bg: "#24105c" }} size="xs" onClick={() => handleDecrement(ticketType)}>
                            -
                          </Button>
                          <Text fontSize="xs">{getQuantity(ticketType)}</Text>
                          <Button colorScheme="facebook" color={"white"} _hover={{ bg: "#24105c" }} size="xs" onClick={() => handleIncrement(ticketType)}>
                            +
                          </Button>
                        </Flex>
                      </Td>
                      <Td textAlign="center">
                        <Text fontSize="xs">{calculateTotalPrice(ticketType, price).toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })}</Text>
                      </Td>
                    </Tr>
                  ))}
                  <Tr>
                    <Td colSpan={3} textAlign="center">
                      Total
                    </Td>
                    <Td textAlign={{ lg: "center" }}>
                      <Text fontWeight="bold">
                        {calculateGrandTotal(event.ticket_types).toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: 0,
                        })}
                      </Text>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Flex>
          </>
        ))}
        <Modal isOpen={isModalOpen} onClose={closeModal} isCentered blockScrollOnMount={true} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Warning</ModalHeader>
            <ModalBody>Kamu telah mencapai batas jumlah pembelian tiket!</ModalBody>
            <ModalFooter>
              <Button colorScheme="facebook" color={"white"} _hover={{ bg: "#24105c" }} onClick={closeModal}>
                OK
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}
export default TransactionStep1;
