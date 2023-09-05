import React, { useEffect } from 'react';
import { Box, Flex, Text, Select, Center, ButtonGroup, useToast } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { ErrorMessage } from 'formik';
import { Input, Button, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import * as Yup from 'yup';
import { useParams } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, setTotalPrices, setDiscountedTotalPrices } from '../slices/transactionSlices'; // Import the Redux action
import { useState } from 'react';
import api from "../api"

function TransactionStep2({ onNext, onPrevious }) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const formData = useSelector((state) => state.transaction.formData);
    const profile = useSelector((state) => state.users.profile);
    const totalPrices = useSelector((state) => state.transaction.totalPrices);// Access form data from Redux store
    const discountedTotalPrices = useSelector((state) => state.transaction.discountedTotalPrices);// Access form data from Redux store
    const [events, setEvents] = useState([])
    const toast = useToast()
    const [isReffCodeValid, setIsReffCodeValid] = useState(false);
    const [referralMessage, setReferralMessage] = useState('');
    useEffect(() => {
        api.get(`/events/${id}`).then((res) => {
            setEvents([res.data])
        }).catch((err) => {
            toast({
                title: "Something wrong",
                description: err.message,
                status: "error",
                isClosable: true
            })
        });
    }, []);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December',
    ];

    const years = Array.from({ length: 64 }, (_, i) => (2013 - i).toString());

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        telepon: Yup.string().required('Phone number is required').min(8, 'Phone number must be at least 8 characters').matches(/^[0-9]+$/, 'Phone number must contain only numbers'),
        identitas: Yup.string().required('Identity number is required').matches(/^[0-9]+$/, 'Identity number must contain only numbers'),
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
            <Box display={"flex"} flexDirection="column" bgColor="#EDEDED" ml={40} mr={40} mt={2} borderRadius={10}>
                {/* Event details display here */}
                {events.map(event => (
                    <Flex justifyContent={"flex-end"} mx={10} mt={4}>
                        <Text fontWeight={"bold"}>
                            {event.name}
                        </Text>
                    </Flex>
                ))}
                <Flex mt={4} ml={10} flexDirection={"column"} mb={30}>
                    <Formik
                        initialValues={formData} // Initialize form values with data from Redux store
                        validationSchema={validationSchema}
                        enableReinitialize={true}
                        onSubmit={onNext}

                    >
                        <Form>
                            <Field name="name">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                                        <FormLabel htmlFor="name">
                                            Name {formData.name ? null : <Text as="span" color="red">*</Text>}
                                        </FormLabel>
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
                                        <FormLabel htmlFor="email">
                                            Email {formData.email ? null : <Text as="span" color="red">*</Text>}
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            id="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            w={400}
                                            onChange={(e) => handleFormDataChange('email', e.target.value)} // Update form data in Redux store
                                        />
                                        <Text fontSize={"xs"}> E-ticket akan dikirimkan melalui email</Text>
                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="telepon">
                                {({ field, form }) => (
                                    <FormControl mt={2} isInvalid={form.errors.telepon && form.touched.telepon}>
                                        <FormLabel htmlFor="telepon">
                                            Telepon {formData.telepon ? null : <Text as="span" color="red">*</Text>}
                                        </FormLabel>
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
                                        <FormLabel htmlFor="identitas">
                                            Identitas (KTP/SIM/Paspor) {formData.identitas ? null : <Text as="span" color="red">*</Text>}
                                        </FormLabel>
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
                            <Flex w={400}>
                                <FormControl mt={2}>
                                    <FormLabel>
                                        Tanggal Lahir {formData.date && formData.month && formData.year ? null : <Text as="span" color="red">*</Text>}
                                    </FormLabel>
                                    <Flex gap={2}>
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
                                    </Flex>

                                </FormControl>
                            </Flex>
                            <Formik
                                initialValues={{ reffCode: '' }}
                                // Validation schema using Yup
                                validationSchema={Yup.object().shape({
                                    reffCode: Yup.string().notRequired(), // Use 'notRequired' to make it optional
                                })}
                                onSubmit={(values, { setSubmitting }) => {
                                    // Your form submission logic here
                                    // values contains the form values, including reffCode
                                    // You can handle the submission and API call here if needed
                                    setSubmitting(false);
                                }}
                            >
                                {({ isSubmitting, isValid, dirty, values, setFieldValue }) => (
                                    <Form>
                                        <FormControl mt={2}>
                                            <FormLabel htmlFor="reffCode">Referral Code</FormLabel>
                                            <Input
                                                type="text"
                                                id="reffCode"
                                                name="reffCode"
                                                width={300}
                                                placeholder="Enter referral code"
                                                onChange={async (e) => {
                                                    const newReffCode = e.target.value;

                                                    // Update the form values as the input changes
                                                    setFieldValue('reffCode', newReffCode);

                                                    // Call the API and validation logic here
                                                    if (newReffCode) {
                                                        // Define a function to fetch user data based on the reffCode
                                                        try {
                                                            const response = await api.get(`/users`);
                                                            const { data } = response;
                                                            const matchedReffCode = data.filter(
                                                                (user) => user.reffcode === newReffCode
                                                            );
                                                            
                                                            // Check if the entered reffCode matches the user's own reffCode
                                                            if (matchedReffCode.length > 0 && newReffCode === profile.reffcode) {
                                                                // Set the message
                                                                setReferralMessage(
                                                                    'Referral code is valid, but you cannot use your own code'
                                                                    
                                                                );
                                                                dispatch(setDiscountedTotalPrices(totalPrices))
                                                            } else if (matchedReffCode.length > 0 && newReffCode !== profile.reffcode ){ 
                                                                setReferralMessage('You got 5% ticket discount');
                                                                dispatch(setDiscountedTotalPrices(totalPrices * 0.95))
                                                            } else  {
                                                                setReferralMessage("Invalid referral code")
                                                                dispatch(setDiscountedTotalPrices(totalPrices))
                                                            }
                                                        } catch (error) {
                                                            console.error('Error fetching user data:', error);
                                                        }
                                                    } else {
                                                        // Handle the case when the input is cleared
                                                        setReferralMessage('');
                                                    }
                                                }}
                                            />
                                            <ErrorMessage name="reffCode" component="div" className="error-message" />
                                        </FormControl>
                                        {referralMessage && (
                                            <Text mt={2} color="red.500">
                                                {referralMessage}
                                            </Text>
                                        )}                        
                                    </Form>
                                )}
                            </Formik>
                            <Box
                                display={"flex"}
                                bgColor="#EDEDED"
                                justifyContent="flex-end"
                                h={"10vh"}
                                mt={20}
                                mb={5}
                            >
                                <Button
                                    bg={"#F7F7F7"}
                                    color={"#2e4583"}
                                    size="sm"
                                    mr={4}
                                    mt={5}
                                    w={"90px"}
                                    onClick={onPrevious}
                                >
                                    Kembali
                                </Button>

                                <Button
                                    colorScheme="facebook"
                                    color={"white"}
                                    _hover={{ bg: "#24105c" }}
                                    size="sm"
                                    mr={20}
                                    mt={5}
                                    w={"90px"}
                                    type='submit'
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Form>
                    </Formik>

                </Flex>
            </Box >
        </>
    );
}

export default TransactionStep2;

