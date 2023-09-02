import React, { useEffect } from 'react';
import { Box, Flex, Text, Select } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { Input, Button, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import * as Yup from 'yup';
import { useParams } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../slices/transactionSlices'; // Import the Redux action

function TransactionStep2() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const formData = useSelector((state) => state.transaction.formData); // Access form data from Redux store

  
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

    const handleFormDataChange = (fieldName, value) => {
        const updatedFormData = { ...formData, [fieldName]: value };
        dispatch(setFormData(updatedFormData)); // Dispatch the Redux action to update form data
    };

   
    return (
        <>
            <Box display={"flex"} flexDirection="column" bgColor="#EDEDED" ml={40} mr={40} mt={2} borderTopRadius={10}>
                {/* Event details display here */}
                <Flex justifyContent={"flex-start"} mx={4}>
                    <Text fontWeight={"bold"}>
                        Event Name
                    </Text>
                </Flex>
                <Flex justifyContent={"flex-start"} mt={4} ml={4}>
                    <Formik
                        initialValues={formData} // Initialize form values with data from Redux store
                        validationSchema={validationSchema}
                        enableReinitialize={true}

                    >
                        <Form>
                            <Field name="name">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                                        <FormLabel htmlFor="name">Name</FormLabel>
                                        <Input
                                            {...field}
                                            id="name"
                                            placeholder="Enter your name"
                                            w={400}
                                            value={formData.name} 
                                            onChange={(e) => handleFormDataChange('name', e.target.value)} // Update form data in Redux store
                                        />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="email">
                                {({ field, form }) => (
                                    <FormControl mt={2} isInvalid={form.errors.email && form.touched.email}>
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <Input
                                            {...field}
                                            id="email"
                                            placeholder="Enter your email"
                                            value={formData.email} 
                                            w={400}
                                            onChange={(e) => handleFormDataChange('email', e.target.value)} // Update form data in Redux store
                                        />
                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="telepon">
                                {({ field, form }) => (
                                    <FormControl mt={2} isInvalid={form.errors.telepon && form.touched.telepon}>
                                        <FormLabel htmlFor="telepon">Telepon</FormLabel>
                                        <Input
                                            {...field}
                                            id="telepon"
                                            placeholder="Enter your number"
                                            w={200}
                                            value={formData.telepon} 
                                            onChange={(e) => handleFormDataChange('telepon', e.target.value)} // Update form data in Redux store
                                        />
                                        <FormErrorMessage>{form.errors.telepon}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="identitas">
                                {({ field, form }) => (
                                    <FormControl mt={2} isInvalid={form.errors.identitas && form.touched.identitas}>
                                        <FormLabel htmlFor="tel">Identitas (KTP/SIM/Paspor)</FormLabel>
                                        <Input
                                            {...field}
                                            id="identitas"
                                            placeholder="Enter your identity number"
                                            w={300}
                                            value={formData.identitas} 
                                            onChange={(e) => handleFormDataChange('identitas', e.target.value)} // Update form data in Redux store
                                        />
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
                                                    <Select
                                                        {...field}
                                                        placeholder="Date"
                                                        value={formData.date} 
                                                        onChange={(e) => handleFormDataChange('date', e.target.value)}
                                                    >
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
                                                    <Select
                                                        {...field}
                                                        placeholder="Month"
                                                        value={formData.month} 
                                                        onChange={(e) => handleFormDataChange('month', e.target.value)}
                                                    >
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
                                                    <Select
                                                        {...field}
                                                        placeholder="Year"
                                                        value={formData.year} 
                                                        onChange={(e) => handleFormDataChange('year', e.target.value)}
                                                    >
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

export default TransactionStep2;

