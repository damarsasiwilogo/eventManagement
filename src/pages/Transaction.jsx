import { Box, Divider, Flex, Image, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import React from "react"

function Transaction() {
    return (
        <>
            <Box display={"flex"} justifyContent="flex-start" bg={"#331F69"} alignItems={"center"} h={"10vh"}>
                <Text fontSize={"2xl"} fontWeight={"bold"} px={"15px"} color={"white"} ml={10}>
                    myTix
                </Text>
            </Box>
            <Box display={"flex"} justifyContent="center" alignItems={"center"} h={"30vh"} ml={40} mr={40} mt={5} bgImage="url('https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/tgroupbanner/20230716041255.png')" bgRepeat="no-repeat" bgSize="cover" bgPos="center" borderRadius={10}>
            </Box>
            <Box display={"flex"} justifyContent="center" bgColor="#EDEDED" alignItems={"center"} h={"10vh"} ml={40} mr={40} mt={2} borderRadius={10}>
                WAKTU TERSISA
            </Box>
            <Box display={"flex"} flexDirection="column" bgColor="#EDEDED" ml={40} mr={40} mt={2} mb={4} borderRadius={10}>
                <Text display="flex" justifyContent="flex-start" ml={4} mt={4}>
                    PILIH KATEGORI
                </Text>
                <Box mx={4} mt={3}>
                    <Divider borderColor="blackAlpha.300" />
                </Box>
                <Image src="https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/seating_chart/20230716041429.png"
                    mx={20} mt={4}></Image>
                <Flex mx={4}>
                    <Table variant="simple" colorScheme="blackAlpha">
                        <Thead>
                            <Tr>
                                <Th>Jenis Kategori</Th>
                                <Th textAlign="center">Harga per tiket</Th>
                                <Th textAlign="center">Kuantitas</Th>
                                <Th textAlign="center">Jumlah</Th>
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
                                <Td textAlign="center"> counter </Td>
                                <Td textAlign="center"> jumlah </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Flex>
            </Box >
        </>
    )
}


export default Transaction