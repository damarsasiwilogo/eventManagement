import React from 'react';
import { Box, Button, ChakraProvider, Container, Flex, Heading, Text } from '@chakra-ui/react';

function App() {
    return (
        <ChakraProvider>
            <Flex>
                {/* Sidebar */}
                <Box
                    as="nav"
                    w="200px"
                    minH="100vh"
                    color="white"
                    p={4}
                    position="fixed"
                    bg="#331F69"
                >
                    <Text display="flex" justifyContent="center" fontSize="2xl" fontWeight="bold" px="15px" color="white" borderRadius="md">
                        myTix
                    </Text>
                    <Flex flexDirection="column" mt={4}>
                        <Button variant="ghost" color="white" _hover={{ bg: "#24105c" }}>Dashboard</Button>
                        <Button variant="ghost" color="white" _hover={{ bg: "#24105c" }}>Event List</Button>
                        <Button variant="ghost" color="white" _hover={{ bg: "#24105c" }}>Attendee</Button>
                        <Button variant="ghost" color="white" _hover={{ bg: "#24105c" }}>Transaction</Button>
                        <Button variant="ghost" color="white" _hover={{ bg: "#24105c" }}>Statistics</Button>
                        {/* Add more buttons as needed */}
                    </Flex>
                </Box>

                {/* Main Content */}
                <Container maxW="6xl" ml="220px" mt="16px">
                    <Heading mb={4}>Dashboard</Heading>
                    <Flex direction="row" gap={4}>
                        <Flex direction="column" gap={4}>
                            <Box bgColor = "gray.100" h="200px" w="200px">
                                test 1
                            </Box>
                            <Box bgColor = "gray.100" h="200px" w="200px">
                                test 2
                            </Box>
                        </Flex>
                        <Flex direction = "column" gap = {4}>
                            <Box bgColor = "gray.100" h="200px" w="200px">
                                test 3
                            </Box>
                            <Box bgColor = "gray.100" h="200px" w="200px">
                                test 4
                            </Box>
                        </Flex>
                    </Flex>
                </Container>
            </Flex>
        </ChakraProvider>
    );
}

export default App;
