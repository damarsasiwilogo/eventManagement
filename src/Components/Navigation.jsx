import { Box, Input, Button, Text, ButtonGroup } from "@chakra-ui/react";
import "../index.css";

export default function Navigation() {
  return (
    <Box display={"flex"} justifyContent={"space-evenly"} bg={"#331F69"} alignItems={"center"} h={"10vh"}>
      <Text fontSize={"2xl"} fontWeight={"bold"} px={"15px"} color={"white"} borderRadius={"md"}>
        myTix
      </Text>
      <Input size={"md"} placeholder="Search an event..." w={"md"} shadow={"sm"} bg={"white"} />
      <ButtonGroup>
        <Button bg={"#331F69"} color={"white"} className="btn-nav-discover">
          DISCOVER
        </Button>
        <Button bg={"#3E60C1"} color={"white"} className="btn-nav">
          LOGIN
        </Button>
        <Button bg={"#F7F7F7"} color={"#2e4583"}>
          REGISTER
        </Button>
      </ButtonGroup>
    </Box>
  );
}
