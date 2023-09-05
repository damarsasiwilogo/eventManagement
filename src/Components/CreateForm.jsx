import { Radio, RadioGroup, Stack, useDisclosure } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, Input, FormLabel } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";

export default function CreateForm() {
  const [value, setValue] = useState(null);
  const [location, setLocation] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <>
      <Button onClick={onOpen}>Create Event</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Event Name</FormLabel>
              <Input placeholder="Event Name" />
            </FormControl>

            <FormControl>
              <FormLabel>Event Type</FormLabel>
              <RadioGroup onChange={setValue} value={value}>
                <Stack direction={"row"}>
                  <Radio value="music">Music</Radio>
                  <Radio value="webinar">Webinar</Radio>
                  <Radio value="sports">Sports</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Date & Time</FormLabel>
              <Input placeholder="Select date and time" type="datetime-local" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Location</FormLabel>
              <RadioGroup onChange={setLocation} value={location} w={"50%"}>
                <Stack direction={"row"}>
                  <Radio value="online">Online</Radio>
                  <Radio value="jakarta">Jakarta</Radio>
                  <Radio value="bekasi">Bekasi</Radio>
                  <Radio value="surabaya">Surabaya</Radio>
                </Stack>
              </RadioGroup>
              <RadioGroup onChange={setLocation} value={location} w={"50%"}>
                <Stack direction={"row"}>
                  <Radio value="lombok">Lombok</Radio>
                  <Radio value="bali">Bali</Radio>
                  <Radio value="lampung">Lampung</Radio>
                  <Radio value="malaysia">Malaysia</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input placeholder="Description" h={"50px"} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
