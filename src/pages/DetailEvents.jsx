import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import api from "../api.js";
import { useParams } from "react-router-dom";
import { Box, Center, Heading, SimpleGrid } from "@chakra-ui/react";
import Navigation from "../Components/Navigation.jsx";

export default function DetailEvents() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    api.get("/events").then((res) => {
      setEvents(res.data);
    });
  }, []);

  const type = useParams().type;
  const filterdEvents = events.filter((event) => event.type === type);

  return (
    <Box>
      <Navigation />
      <Box>
      {/* {filterdEvents.map((event) => (
        <Heading key={event.type}>{event.type.toUpperCase()}</Heading>
      ))} */}
        {/* Title */}
        <Center w={"100%"} h={"90vh"} flexDirection={"column"}>
          {/* List Event */}
          <SimpleGrid columns={3} spacing={5}>
            {filterdEvents.map((event) => (
              <Box key={event.id} w={"250px"} h={"150px"} borderRadius={"10px"} bgImage={event.images} bgSize={"cover"} className="box-shadow" />
            ))}
          </SimpleGrid>
        </Center>
      </Box>
    </Box>
  );
}
