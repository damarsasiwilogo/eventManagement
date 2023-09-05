
import { Flex, Box, Text, Select } from "@chakra-ui/react";
import { useSelector } from 'react-redux';
import { IoTicketSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik, Form, Field } from 'formik';
import { Input, Button, FormControl, FormLabel, FormErrorMessage, useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { setCreditCardData } from '../slices/transactionSlices';
import api from "../api"
import * as Yup from 'yup';


function TransactionStep4() {
    const [events, setEvents] = useState([]);
    const dispatch = useDispatch();
    const { id } = useParams();
    const ticketQuantities = useSelector((state) => state.transaction.ticketQuantities);
    const discountedTotalPrices = useSelector((state) => state.transaction.discountedTotalPrices);
    const selectedTickets = Object.keys(ticketQuantities).filter((ticketType) => ticketQuantities[ticketType] > 0);
    const creditCardData = useSelector((state) => state.transaction.creditCardData);
    const toast = useToast()

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

    const validationSchema = Yup.object().shape({

        noHp: Yup.string().required('Phone number is required').min(8, 'Phone number must be at least 8 characters'),
        cardHolder: Yup.string().required("Card holder name is required"),
        cardNumber: Yup.string().required('Card number is required').min(16, "Credit card number must be 16 digits").matches(/^[0-9]+$/, 'Credit card number must contain only numbers'),
        cardMonth: Yup.string().required('Month is required'),
        cardYear: Yup.string().required('Year is required'),
        cvvNumber: Yup.string().required('CVV number is required').min(3, "cvv number must be 3 digits").matches(/^[0-9]+$/, 'CVV number must contain only numbers'),
    });

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December',
    ];

    const years = Array.from({ length: 10 }, (_, i) => (2023 + i).toString());

    const handleCreditCardDataChange = (fieldName, value) => {
        const updatedCreditCardData = { ...creditCardData, [fieldName]: value };
        dispatch(setCreditCardData(updatedCreditCardData)); // Dispatch the Redux action to update form data
    };

    return (
        <>

            <Box display={"flex"} flexDirection="column" bgColor="#EDEDED" ml={40} mr={40} mt={2} borderTopRadius={10}>
                {events.map(event => (
                    <Flex justifyContent={"flex-end"} mx={10} mt={4}>
                        <Text fontWeight={"bold"}>
                            {event.name}
                        </Text>
                    </Flex>
                ))}
                <Flex justifyContent="flex-start" gap="15" direction={"row"} ml={10}>
                    <Flex alignItems={"center"} >
                        <IoTicketSharp color="black" size={"35px"} />
                    </Flex>
                    <Flex flexDirection={"column"} justifyContent={"center"}>
                        <Flex flexDirection={"column"}>
                            {selectedTickets.map((ticketType) => (
                                <Text color={"black"} key={ticketType}>
                                    {ticketQuantities[ticketType]} {ticketType} Tickets
                                </Text>

                            ))}
                        </Flex>
                        <Flex flexDirection={"column"}>
                            <Text color={"black"} fontWeight={"Bold"}>Total harga yang harus dibayar : {discountedTotalPrices.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                maximumFractionDigits: 0
                            })}
                            </Text>
                            <Text fontSize={"xs"} color="black"> Harga sudah termasuk PPn 10% </Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex mt={10} ml={10} flexDirection={"column"} mb={30}>
                    <Formik
                        initialValues={creditCardData} // Initialize form values with data from Redux store
                        validationSchema={validationSchema}
                        enableReinitialize={true}


                    >
                        <Form>
                            <Field name="cardNumber">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.cardNumber && form.touched.cardNumber}>
                                        <FormLabel htmlFor="cardNumber">
                                            Card Number{creditCardData.cardNumber ? null : <Text as="span" color="red">*</Text>}
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            id="cardNumber"
                                            placeholder="Enter Credit Card Number"
                                            w={400}
                                            value={creditCardData.cardNumber}
                                            inputMode="numeric"
                                            onChange={(e) => handleCreditCardDataChange('cardNumber', e.target.value)} // Update form data in Redux store
                                        />
                                        <FormErrorMessage>{form.errors.cardNumber}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="cardHolder">
                                {({ field, form }) => (
                                    <FormControl mt={2} isInvalid={form.errors.cardHolder && form.touched.cardHolder}>
                                        <FormLabel htmlFor="cardHolder">
                                            Card Holder {creditCardData.cardHolder ? null : <Text as="span" color="red">*</Text>}
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            id="cardHolder"
                                            placeholder="Enter Credit Card Holder Name"
                                            w={400}
                                            value={creditCardData.cardHolder}
                                            onChange={(e) => handleCreditCardDataChange('cardHolder', e.target.value)} // Update form data in Redux store
                                        />
                                        <FormErrorMessage>{form.errors.cardHolder}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Flex w={400}>
                                <FormControl mt={2}>
                                    <FormLabel>
                                        Expiration Date {creditCardData.cardMonth && creditCardData.cardYear ? null : <Text as="span" color="red">*</Text>}
                                    </FormLabel>
                                    <Flex gap={2}>
                                        <Field name="cardMonth">
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.cardMonth && form.touched.cardMonth}>
                                                    <Select
                                                        {...field}

                                                        placeholder="Month"
                                                        value={creditCardData.cardMonth}
                                                        onChange={(e) => handleCreditCardDataChange('cardMonth', e.target.value)}
                                                    >
                                                        {months.map((month, index) => (
                                                            <option key={index} value={(index + 1).toString().padStart(2, '0')}>
                                                                {month}
                                                            </option>
                                                        ))}
                                                    </Select>
                                                    <FormErrorMessage>{form.errors.cardMonth}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="cardYear">
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.cardYear && form.touched.cardYear}>
                                                    <Select
                                                        {...field}

                                                        placeholder="Year"
                                                        value={creditCardData.cardYear}
                                                        onChange={(e) => handleCreditCardDataChange('cardYear', e.target.value)}
                                                    >
                                                        {years.map((year) => (
                                                            <option key={year} value={year}>
                                                                {year}
                                                            </option>
                                                        ))}
                                                    </Select>
                                                    <FormErrorMessage>{form.errors.cardYear}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Flex>
                                    <Field name="cvvNumber">
                                        {({ field, form }) => (
                                            <FormControl mt={2} isInvalid={form.errors.cvvNumber && form.touched.cvvNumber}>
                                                <FormLabel htmlFor="cvvNumber">
                                                    CVV {creditCardData.cvvNumber ? null : <Text as="span" color="red">*</Text>}
                                                </FormLabel>
                                                <Input
                                                    {...field}
                                                    id="cvvNumber"
                                                    placeholder="CVV"
                                                    w={20}
                                                    value={creditCardData.cvvNumber}
                                                    inputMode="numeric"
                                                    onChange={(e) => handleCreditCardDataChange('cvvNumber', e.target.value)} // Update form data in Redux store
                                                />
                                                <FormErrorMessage>{form.errors.cvvNumber}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                </FormControl>
                            </Flex>


                        </Form>
                    </Formik>
                </Flex>

            </Box>
        </>
    );
}

export default TransactionStep4;