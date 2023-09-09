import { FormErrorMessage, MenuItem, Radio, RadioGroup, Stack, useDisclosure } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, Input, FormLabel, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import api from "../api";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

export default function CreateForm() {
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventsData, setEventsData] = useState([]);

  const toast = useToast();

  // API Call
  useEffect(() => {
    api
      .get("/events")
      .then((res) => {
        setEventsData(res.data);
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

  const handleSubmit = (values) => {
    const newEvent = {
      name: values.name,
      type: values.type,
      date: values.date,
      time: values.time,
      location: values.location,
      description: values.description,
      images: values.images,
      ticket_types: values.ticket_types,
    };

    api.post("/events", newEvent).then((res) => {
      // set events menjadi array lamanya, dan data barunya
      setEventsData([...eventsData, res.data]);
    });

  };

  const validationScehma = yup.object().shape({
    name: yup.string().required().min(3, "minimum character is 3"),
    location: yup.string().required(),
    description: yup.string().required().min(5, "minimum character is 5"),
    images: yup.string().required(),
  });


  return (
    <>
      <MenuItem onClick={onOpen}>Create Event</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={{ name: "", type: selectedType, date: selectedDate, time: selectedTime, location: selectedLocation, description: "", images: "", ticket_types: { Diamond: 0, Platinum: 0, Gold: 0 } }}
              onSubmit={(values) => {
                // Lakukan pemrosesan formulir seperti menyimpan data ke server
                handleSubmit(values);
      
                // Setelah pemrosesan berhasil, tutup modal
                onClose();
              }} validationSchema={validationScehma}>
              {(forms) => (
                <Form>
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel>Event Name</FormLabel>
                        <Input placeholder="Event Name" {...field} />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field>
                    {({ form }) => (
                      <FormControl>
                        <FormLabel>Event Type</FormLabel>
                        <RadioGroup
                          onChange={(value) => {
                            setSelectedType(value);
                            form.setFieldValue("type", value);
                          }}
                          value={selectedType}>
                          <Stack direction={"row"}>
                            <Radio value="music">Music</Radio>
                            <Radio value="webinar">Webinar</Radio>
                            <Radio value="sports">Sports</Radio>
                          </Stack>
                        </RadioGroup>
                      </FormControl>
                    )}
                  </Field>

                  <Field>
                    {({ form }) => (
                      <FormControl mt={4}>
                        <FormLabel>Date & Time</FormLabel>
                        <Input
                          placeholder="Select date and time"
                          type="datetime-local"
                          onChange={(e) => {
                            const dateTimeValue = e.target.value;
                            //Split nilai datetime-local menjadi date dan time
                            const [date, time] = dateTimeValue.split("T");
                            setSelectedDate(date);
                            setSelectedTime(time);
                            form.setFieldValue("date", date);
                            form.setFieldValue("time", time);
                          }}
                        />
                      </FormControl>
                    )}
                  </Field>

                  <Field name="location">
                    {({ form }) => (
                      <FormControl mt={4}>
                        <FormLabel>Location</FormLabel>
                        <RadioGroup
                          onChange={(value) => {
                            setSelectedLocation(value);
                            form.setFieldValue("location", value);
                          }}
                          value={selectedLocation}
                          w={"50%"}>
                          <Stack direction={"row"}>
                            <Radio value="online">Online</Radio>
                            <Radio value="jakarta">Jakarta</Radio>
                            <Radio value="bekasi">Bekasi</Radio>
                            <Radio value="surabaya">Surabaya</Radio>
                          </Stack>
                        </RadioGroup>
                        <RadioGroup
                          onChange={(value) => {
                            setSelectedLocation(value);
                            form.setFieldValue("location", value);
                          }}
                          value={selectedLocation}
                          w={"50%"}>
                          <Stack direction={"row"}>
                            <Radio value="lombok">Lombok</Radio>
                            <Radio value="bali">Bali</Radio>
                            <Radio value="lampung">Lampung</Radio>
                            <Radio value="malaysia">Malaysia</Radio>
                          </Stack>
                        </RadioGroup>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="images">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.images && form.touched.images} mt={4}>
                        <FormLabel>Image Link</FormLabel>
                        <Input placeholder="Image" {...field} />
                        <FormErrorMessage>{form.errors.images}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="description">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.description && form.touched.description} mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Input placeholder="Description" {...field} />
                        <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="ticket_types.Diamond">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.ticket_types?.Diamond && form.touched.ticket_types?.Diamond} mt={4}>
                        <FormLabel>Diamond Ticket Price</FormLabel>
                        <Input placeholder="Diamond Ticket" type="number" {...field} />
                        <FormErrorMessage>{form.errors.ticket_types?.Diamond}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="ticket_types.Platinum">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.ticket_types?.Platinum && form.touched.ticket_types?.Platinum} mt={4}>
                        <FormLabel>Platinum Ticket Price</FormLabel>
                        <Input placeholder="Platinum Ticket" type="number" {...field} />
                        <FormErrorMessage>{form.errors.ticket_types?.Platinum}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="ticket_types.Gold">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.ticket_types?.Gold && form.touched.ticket_types?.Gold} mt={4}>
                        <FormLabel>Gold Ticket Price</FormLabel>
                        <Input placeholder="Gold Ticket" type="number" {...field} />
                        <FormErrorMessage>{form.errors.ticket_types?.Gold}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <ModalFooter>
                    <Button isLoading={forms.isSubmitting} type="submit" colorScheme="blue" mr={3}>
                      Submit
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
