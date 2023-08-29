import { Box, Input, Button, Text, ButtonGroup } from "@chakra-ui/react";
import "../index.css";

export default function Navigation() {
  return (
    <Box display={"flex"} justifyContent={"space-evenly"} shadow={"md"} p={"10px"}>
      <Text fontSize={"2xl"} fontWeight={"bold"} bg={'#383280'} px={'15px'} color={'white'} borderRadius={'md'}>
        myTix
      </Text>
      <Input size={"md"} placeholder="Search an event..." w={"md"} shadow={"sm"} />
      <ButtonGroup>
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
