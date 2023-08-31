import { Box, Button, Divider, Flex, Image, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useState } from "react";


function TransactionStep1() {
    const [quantityFestivalA, setQuantityFestivalA] = useState(0);
    const [quantityFestivalB, setQuantityFestivalB] = useState(0);
    const ticketPriceFestivalA = 950000;
    const ticketPriceFestivalB = 850000;

    const totalFestivalA = quantityFestivalA * ticketPriceFestivalA;
    const totalFestivalB = quantityFestivalB * ticketPriceFestivalB;
    const grandTotal = totalFestivalA + totalFestivalB;

    return (
        <>

            <Box display={"flex"} flexDirection="column" bgColor="#EDEDED" ml={40} mr={40} mt={2} borderTopRadius={10}>
                <Text display="flex" justifyContent="flex-start" ml={4} mt={4}>
                    PILIH KATEGORI
                </Text>
                <Box mx={4} mt={3}>
                    <Divider borderColor="blackAlpha.300" />
                </Box>
                <Image src="https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/seating_chart/20230716041429.png" mx={20} mt={4} />
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
                            <Tr>
                                <Td>
                                    <Text fontSize="xs" colorScheme="blackAlpha">
                                        FESTIVAL A <br />
                                        Standing <br />
                                        Harga tiket belum termasuk biaya platform dan pajak daerah
                                    </Text>
                                </Td>
                                <Td textAlign="center">
                                    <Text fontSize="xs" colorScheme="blackAlpha">
                                        Rp. 950.000
                                    </Text>
                                </Td>
                                <Td textAlign="center">
                                    <Flex gap={1} alignItems="center" justifyContent="center">
                                        <Button bg={"#331F69"} color="white" size="xs" onClick={() => setQuantityFestivalA(Math.max(0, quantityFestivalA - 1))}>
                                            -
                                        </Button>
                                        <Text fontSize="xs">{quantityFestivalA}</Text>
                                        <Button bg={"#331F69"} color="white" size="xs" onClick={() => setQuantityFestivalA(quantityFestivalA + 1)}>
                                            +
                                        </Button>
                                    </Flex>
                                </Td>
                                <Td textAlign="center">
                                    <Text fontSize="xs"> Rp. {totalFestivalA.toLocaleString()} </Text>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <Text fontSize="xs" colorScheme="blackAlpha">
                                        FESTIVAL B <br />
                                        Standing <br />
                                        Harga tiket belum termasuk biaya platform dan pajak daerah
                                    </Text>
                                </Td>
                                <Td textAlign="center">
                                    <Text fontSize="xs" colorScheme="blackAlpha">
                                        Rp. 850.000
                                    </Text>
                                </Td>
                                <Td textAlign="center">
                                    <Flex gap={1} alignItems="center" justifyContent="center">
                                        <Button bg={"#331F69"} color="white" size="xs" onClick={() => setQuantityFestivalB(Math.max(0, quantityFestivalB - 1))}>
                                            -
                                        </Button>
                                        <Text fontSize="xs"> {quantityFestivalB} </Text>
                                        <Button bg={"#331F69"} color="white" size="xs" onClick={() => setQuantityFestivalB(quantityFestivalB + 1)}>
                                            +
                                        </Button>
                                    </Flex>
                                </Td>
                                <Td textAlign="center">
                                    <Text fontSize="xs"> Rp. {totalFestivalB.toLocaleString()} </Text>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td colSpan={3} textAlign="center">
                                    Total
                                </Td>
                                <Td textAlign="center">
                                    <Text fontWeight="bold">
                                        Rp. {grandTotal.toLocaleString()}
                                    </Text>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Flex>
            </Box>
        </>
    )
}

export default TransactionStep1;