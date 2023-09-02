import { Box, Flex, Text, Select } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Input, Button, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import * as Yup from 'yup';
import { useParams } from "react-router";
import { useState, useEffect } from 'react';
import api from "../api"



function Register() {
    const [events, setEvents] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        api.get(`/events/${id}`).then((res) => {
            setEvents([res.data])
        });
    }, []);


    // const [users, setUsers] = useState([]);
    // const handleSubmit= (values, action) => {
    //     const newUsers = {
    //       name: values.name,
    //       email: values.email,
    //       password: values.password,
    //     }
    //     api.post("/users", newUsers).then((res) => {
    //       setUsers([...users, res.data])
    //       action.resetForm()
    //     })
    //   }
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December',
    ];

    const years = Array.from({ length: 64 }, (_, i) => (2013 - i).toString());

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        telepon: Yup.string().required('Phone number is required').min(8, 'Phone number must be at least 8 characters'),
        identitas: Yup.string().required('Identity number is required'),
        date: Yup.string().required('Date is required'),
        month: Yup.string().required('Month is required'),
        year: Yup.string().required('Year is required'),

    });


    return (
        <>

            <Box display={"flex"} flexDirection="column" bgColor="#EDEDED" ml={40} mr={40} mt={2} borderTopRadius={10}>
                {events.map(event => (
                    <Flex justifyContent={"flex-end"} mx={4}>
                        <Text fontWeight={"bold"}>
                            {event.name}
                        </Text>
                    </Flex>
                ))}
                <Flex justifyContent={"flex-start"} mt={4} ml={4}>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            telepon: '',
                            identitas: '',
                            date: '',
                            month: '',
                            year: '',
                        }}
                        validationSchema={validationSchema}
                    >
                        <Form>
                            <Field name="name">
                                {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.name && form.touched.name}>
                                            <FormLabel htmlFor="name">Name</FormLabel>
                                            <Input {...field} id="name" placeholder="Enter your name" w={400} />
                                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                        </FormControl>
                                )}
                            </Field>
                            <Field name="email">
                                {({ field, form }) => (
                                    <FormControl mt={2} isInvalid={form.errors.email && form.touched.email}>
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <Input {...field} id="email" placeholder="Enter your email" w={400} />
                                        <Text fontSize={"sm"} ml={4}>E-ticket akan dikirimkan melalui email.</Text>
                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="telepon">
                                {({ field, form }) => (
                                    <FormControl mt={2} isInvalid={form.errors.telepon && form.touched.telepon}>
                                        <FormLabel htmlFor="telepon">Telepon</FormLabel>
                                        <Input {...field} id="telepon" placeholder="Enter your number" w={200} />
                                        <FormErrorMessage>{form.errors.telepon}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="identitas">
                                {({ field, form }) => (
                                    <FormControl mt={2} isInvalid={form.errors.identitas && form.touched.identitas}>
                                        <FormLabel htmlFor="tel">Identitas (KTP/SIM/Paspor)</FormLabel>
                                        <Input {...field} id="identitas" placeholder="Enter your identity number" w={300} />
                                        <FormErrorMessage>{form.errors.identitas}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <FormControl mt={2}>
                                <FormLabel>Tanggal Lahir</FormLabel>
                                <Flex gap={2}>
                                    <Box flex="1">
                                        <Field name="date">
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.date && form.touched.date}>
                                                    <Select {...field} placeholder="Date">
                                                        {Array.from({ length: 31 }, (_, i) => (
                                                            <option key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
                                                                {(i + 1).toString().padStart(2, '0')}
                                                            </option>
                                                        ))}
                                                    </Select>
                                                    <FormErrorMessage>{form.errors.date}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Box>

                                    <Box flex="1">
                                        <Field name="month">
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.month && form.touched.month}>
                                                    <Select {...field} placeholder="Month">
                                                        {months.map((month, index) => (
                                                            <option key={index} value={(index + 1).toString().padStart(2, '0')}>
                                                                {month}
                                                            </option>
                                                        ))}
                                                    </Select>
                                                    <FormErrorMessage>{form.errors.month}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Box>

                                    <Box flex="1">
                                        <Field name="year">
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.year && form.touched.year}>
                                                    <Select {...field} placeholder="Year">
                                                        {years.map((year) => (
                                                            <option key={year} value={year}>
                                                                {year}
                                                            </option>
                                                        ))}
                                                    </Select>
                                                    <FormErrorMessage>{form.errors.year}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Box>
                                </Flex>
                            </FormControl>
                        </Form>
                    </Formik>
                </Flex>
            </Box>
        </>
    );
}

export default Register;
