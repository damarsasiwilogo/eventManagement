import React from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  Container,
  Flex,
  Heading,
} from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <Flex>
        {/* Sidebar */}
        <Box
          as="nav"
          bg="blue.600"
          w="250px"
          minH="100vh"
          color="white"
          p={4}
          position="fixed"
        >
          <Button>Dashboard</Button>
          <Button>Analytics</Button>
          <Button>Settings</Button>
          {/* Add more buttons as needed */}
        </Box>

        {/* Main Content */}
        <Container maxW="6xl" ml="250px" mt="100px">
          <Heading mb={4}>Dashboard</Heading>
          {/* Add your dashboard content here */}
        </Container>
      </Flex>
    </ChakraProvider>
  );
}

export default App;