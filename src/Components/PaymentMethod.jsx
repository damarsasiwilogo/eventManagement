import { Flex, Box, Text, Select, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { IoTicketSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik, Form, Field, useFormikContext } from "formik";
import { Input, Button, FormControl, FormLabel, FormErrorMessage, useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import creditCardLogo from "../images/creditcard.png";
import { setCreditCardData, setPaymentMethod, setEventName } from "../slices/transactionSlices";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import { BsBank2, BsFillCreditCardFill, BsFillWalletFill } from "react-icons/bs";
import api from "../api";
import * as Yup from "yup";
import { Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from "@chakra-ui/react";

function PaymentMethod({ onNext }) {
  const formikBuyerInfo = useFormikContext();
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const ticketQuantities = useSelector((state) => state.transaction.ticketQuantities);
  const discountedTotalPrices = useSelector((state) => state.transaction.discountedTotalPrices);
  const discountCoupon = useSelector((state) => state.transaction.discountedTotalPricesByCoupon);
  const discountReff = useSelector((state) => state.transaction.discountedTotalPricesByReff);
  const selectedTickets = Object.keys(ticketQuantities).filter((ticketType) => ticketQuantities[ticketType] > 0);
  const creditCardData = useSelector((state) => state.transaction.creditCardData);
  const toast = useToast();
  const potonganHarga = discountCoupon + discountReff;
  const formData = useSelector((state) => state.transaction.formData);
  const virtualAccBCA = "8800" + formData.telepon;
  const virtualAccMandiri = "9002" + formData.telepon;
  const virtualAccBNI = "1001" + formData.telepon;
  const paymentMethodBCA = "Virtual Account BCA 8800";
  const paymentMethodMandiri = "Virtual Account Livin' By Mandiri 9002";
  const paymentMethodBNI = "Virtual Account BNI 1001";

  const handleButtonClick = async (values) => {
    // Call the onFormValidation function to trigger form validation
    const formStatus = await formikBuyerInfo.submitForm();
    // Call onNext only if validation is successful (isTransactionFormValid is true)
    if (formStatus) {
      onNext();
    } else {
      toast({
        title: "Form Validation Error",
        description: "Please fill in all required fields correctly.",
        status: "error",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    api
      .get(`/events/${id}`)
      .then((res) => {
        setEvents([res.data]);
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

  const validationSchema = Yup.object().shape({
    cardNumber: Yup.string()
      .required("Card number is required")
      .min(19, "Credit card number must be 16 digits")
      .max(19, "Credit card number must be 16 digits")
      .matches(/^([0-9]|\s)+$/, "Credit card number must contain only numbers"),
    cardMonth: Yup.string().required("Month is required"),
    cardYear: Yup.string().required("Year is required"),
    cvvNumber: Yup.string()
      .required("CVV number is required")
      .min(3, "CVV number must be 3 digits")
      .max(3, "CVV number must be 3 digits")
      .matches(/^[0-9]+$/, "CVV number must contain only numbers"),
  });

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const years = Array.from({ length: 10 }, (_, i) => (2023 + i).toString());

  const formatCreditCardNumber = (inputValue) => {
    // Remove any non-digit characters from the input
    const cleanedValue = inputValue.replace(/\D/g, "");

    // Split the cleaned value into groups of four characters
    const groups = cleanedValue.match(/.{1,4}/g);

    // Join the groups with spaces and return
    return groups ? groups.join(" ") : "";
  };

  const handleCreditCardDataChange = (fieldName, value) => {
    // Check if the field is "cardNumber" and apply formatting
    const formattedValue = fieldName === "cardNumber" ? formatCreditCardNumber(value) : value;

    const updatedCreditCardData = { ...creditCardData, [fieldName]: formattedValue };
    dispatch(setCreditCardData(updatedCreditCardData));
  };
  return (
    <>
      <Box display={"flex"} borderRadius={10} alignItems="center" bg="#331F69" padding={{ lg: "10" }} py={{ base: "4" }} mt={{ lg: "6" }} flexDirection="column" w={{ md: "100vw", lg: "35vw" }}>
        <Flex justifyContent={{base: "center"}} gap="15" direction={"row"} mb={5}>
          <Flex alignItems={"center"}>
            <IoTicketSharp color="white" size={"35px"} />
          </Flex>
          <Flex flexDirection={"column"} justifyContent={"center"}>
            <Flex flexDirection={"column"}>
              {selectedTickets.map((ticketType) => (
                <Text color={"white"} key={ticketType}>
                  {ticketQuantities[ticketType]} {ticketType} Tickets
                </Text>
              ))}
            </Flex>
            <Flex flexDirection={"column"}>
              <Text color={"white"} fontWeight={"Bold"}>
                Total harga yang harus dibayar :{" "}
                {discountedTotalPrices.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                })}
              </Text>
              <Text fontSize={"xs"} color="white">
                {" "}
                Harga sudah termasuk PPn 10%{" "}
              </Text>
              <Text fontSize={"xs"} color="white">
                dan potongan {""}
                <b>
                  {potonganHarga.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  })}
                </b>
                {""} dari diskon.
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Accordion
          w={{ base: "98vw", lg: "34vw" }}
          bg="#331F69"
          allowToggle
          onChange={(index) => {
            if (index == 0) {
              dispatch(setPaymentMethod("Credit Card"));
            } else if (index == 1) {
              dispatch(setPaymentMethod(""));
            } else {
              dispatch(setPaymentMethod(""));
            }
          }}
        >
          <AccordionItem>
            <h2>
              <AccordionButton bgColor="white" _hover={{ bgColor: "tomato", color: "white" }} _expanded={{ bg: "tomato", color: "white" }}>
                {/* Credit Card Icon */}
                <Box as="span" textAlign="left">
                  <BsFillCreditCardFill size={24} /> {/* Adjust the size as needed */}
                </Box>
                {/* Credit Card Text */}
                <Box as="span" ml={4} flex="1" textAlign="left">
                  <Text fontWeight={"bold"}>Credit Card</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Flex bg="white" p={4} borderRadius={10} justifyContent="center" alignItems="flex-start" flexDirection={"column"} mb={4}>
                <Formik
                  initialValues={creditCardData} // Initialize form values with data from Redux store
                  validationSchema={validationSchema}
                  enableReinitialize={true}
                  onSubmit={handleButtonClick}
                >
                  <Form>
                    <Field name="cardNumber">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.cardNumber && form.touched.cardNumber}>
                          <FormLabel htmlFor="cardNumber">
                            Card Number
                            {creditCardData.cardNumber ? null : (
                              <Text as="span" color="red">
                                *
                              </Text>
                            )}
                          </FormLabel>
                          <Input
                            {...field}
                            id="cardNumber"
                            placeholder="Enter card number (ex 1111 4242 3333 5555)"
                            w={{ base: "305px", lg: "350px" }}
                            value={creditCardData.cardNumber}
                            inputMode="numeric" // Allow only numeric input
                            onChange={(e) => {
                              // Filter out non-numeric characters
                              const numericValue = e.target.value.replace(/\D/g, "");
                              handleCreditCardDataChange("cardNumber", numericValue);
                            }}
                          />
                          <FormErrorMessage>{form.errors.cardNumber}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="cardHolder">
                      {({ field, form }) => (
                        <FormControl mt={2} isInvalid={form.errors.cardHolder && form.touched.cardHolder}>
                          <FormLabel htmlFor="cardHolder">
                            Card Holder{" "}
                            {creditCardData.cardHolder ? null : (
                              <Text as="span" color="red">
                                *
                              </Text>
                            )}
                          </FormLabel>
                          <Input
                            {...field}
                            id="cardHolder"
                            placeholder="Enter card holder name"
                            w={{ base: "305px", lg: "350px" }}
                            value={creditCardData.cardHolder}
                            onChange={(e) => handleCreditCardDataChange("cardHolder", e.target.value)} // Update form data in Redux store
                          />
                          <FormErrorMessage>{form.errors.cardHolder}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Flex w={{ base: "305px", lg: "350px" }}>
                      <FormControl mt={2}>
                        <FormLabel>
                          Expiration Date{" "}
                          {creditCardData.cardMonth && creditCardData.cardYear ? null : (
                            <Text as="span" color="red">
                              *
                            </Text>
                          )}
                        </FormLabel>
                        <Flex gap={2}>
                          <Field name="cardMonth">
                            {({ field, form }) => (
                              <FormControl isInvalid={form.errors.cardMonth && form.touched.cardMonth}>
                                <Select {...field} placeholder="Month" value={creditCardData.cardMonth} onChange={(e) => handleCreditCardDataChange("cardMonth", e.target.value)}>
                                  {months.map((month, index) => (
                                    <option key={index} value={(index + 1).toString().padStart(2, "0")}>
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
                                <Select {...field} placeholder="Year" value={creditCardData.cardYear} onChange={(e) => handleCreditCardDataChange("cardYear", e.target.value)}>
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
                        <Flex alignItems={"center"} justifyContent={"space-between"}>
                          <Field name="cvvNumber">
                            {({ field, form }) => (
                              <FormControl mt={2} isInvalid={form.errors.cvvNumber && form.touched.cvvNumber}>
                                <FormLabel htmlFor="cvvNumber">
                                  CVV{" "}
                                  {creditCardData.cvvNumber ? null : (
                                    <Text as="span" color="red">
                                      *
                                    </Text>
                                  )}
                                </FormLabel>
                                <Input
                                  {...field}
                                  id="cvvNumber"
                                  placeholder="CVV"
                                  w={20}
                                  value={creditCardData.cvvNumber}
                                  inputMode="numeric"
                                  onChange={(e) => {
                                    // Filter out non-numeric characters
                                    const numericValue = e.target.value.replace(/\D/g, "");
                                    handleCreditCardDataChange("cvvNumber", numericValue);
                                  }} // Update form data in Redux store
                                />
                                <FormErrorMessage>{form.errors.cvvNumber}</FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Image h="50px" w="200px" src={creditCardLogo} />
                        </Flex>
                      </FormControl>
                    </Flex>
                    <Button colorScheme="facebook" color={"white"} _hover={{ bg: "tomato" }} size="sm" mr={20} mt={5} w={"90px"} type="submit">
                      Bayar
                    </Button>
                  </Form>
                </Formik>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton bgColor="white" _hover={{ bgColor: "tomato", color: "white" }} _expanded={{ bg: "tomato", color: "white" }}>
              <Box as="span" textAlign="left">
                  <BsBank2 size={24} /> 
                </Box>
                <Box as="span" ml={4} flex="1" textAlign="left">
                  <Text fontWeight={"bold"}>Bank Virtual Account</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} color={"white"}>
              <Accordion
                w={{ base: "94vw", lg: "33vw" }}
                allowToggle
                onChange={(index) => {
                  if (index === 0) {
                    dispatch(setPaymentMethod(paymentMethodBCA));
                  } else if (index === 1) {
                    dispatch(setPaymentMethod(paymentMethodMandiri));
                  } else if (index === 2) {
                    dispatch(setPaymentMethod(paymentMethodBNI));
                  }
                }}
              >
                <AccordionItem>
                  <h2>
                    <AccordionButton bgColor="white" color={"black"} _hover={{ bgColor: "tomato", color: "white" }} _expanded={{ bg: "#F7F7F7", color: "#2e4583" }}>
                     
                <Box as="span" textAlign="left">
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" w={"40px"} /> {/* Adjust the size as needed */}
                </Box>
               
                <Box as="span" ml={4} flex="1" textAlign="left">
                  <Text fontWeight={"bold"}>BCA</Text>
                </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} color={"white"}>
                    <Flex direction={"column"}>
                      <Stepper orientation="vertical" height={"200"} gap="0">
                        <Step>
                          <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                          </StepIndicator>

                          <Box flexShrink="0" mt={1}>
                            <StepDescription>
                              <Text color={"white"}>
                                Login ke <b>M-BCA.</b>
                              </Text>
                            </StepDescription>
                          </Box>

                          <StepSeparator />
                        </Step>
                        <Step>
                          <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                          </StepIndicator>

                          <Box flexShrink="0" mt={1}>
                            <StepDescription>
                              <Text color={"white"}>
                                Pilih <b>M-TRANSFER {">"} TRANSFER BCA VIRTUAL ACCOUNT.</b>
                              </Text>
                            </StepDescription>
                          </Box>

                          <StepSeparator />
                        </Step>
                        <Step>
                          <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                          </StepIndicator>

                          <Box flexShrink="0" mt="1">
                            <StepDescription>
                              <Text color={"white"}>
                                Masukkan <b>kode {virtualAccBCA}.</b>
                              </Text>
                            </StepDescription>
                          </Box>

                          <StepSeparator />
                        </Step>
                        <Step>
                          <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                          </StepIndicator>

                          <Box flexShrink="0" mt={1}>
                            <StepDescription>
                              <Text color={"white"}>Lakukan proses pembayaran hingga selesai.</Text>
                            </StepDescription>
                          </Box>

                          <StepSeparator />
                        </Step>
                      </Stepper>
                      <Button colorScheme="facebook" color={"white"} _hover={{ bg: "tomato" }} size="sm" mr={20} mt={5} w={"90px"} onClick={handleButtonClick}>
                        Bayar
                      </Button>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton bgColor="white" color={"black"} _hover={{ bgColor: "tomato", color: "white" }} _expanded={{ bg: "#F7F7F7", color: "#2e4583" }}>
                    <Box as="span" textAlign="left">
                  <Image src="https://i.imgur.com/0fnJBe0.png" w={"40px"} /> {/* Adjust the size as needed */}
                </Box>
               
                <Box as="span" ml={4} flex="1" textAlign="left">
                  <Text fontWeight={"bold"}>Livin' by Mandiri</Text>
                </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} color={"white"}>
                    <Flex direction={"column"}>
                      <Stepper orientation="vertical" height={"200"} gap="0">
                        <Step>
                          <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                          </StepIndicator>

                          <Box flexShrink="0" mt={1}>
                            <StepDescription>
                              <Text color={"white"}>
                                Login ke <b>Livin' by Mandiri.</b>
                              </Text>
                            </StepDescription>
                          </Box>

                          <StepSeparator />
                        </Step>
                        <Step>
                          <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                          </StepIndicator>

                          <Box flexShrink="0" mt={1}>
                            <StepDescription>
                              <Text color={"white"}>
                                Pilih <b>BAYAR {">"} TRANSFER VIRTUAL ACCOUNT.</b>
                              </Text>
                            </StepDescription>
                          </Box>

                          <StepSeparator />
                        </Step>
                        <Step>
                          <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                          </StepIndicator>

                          <Box flexShrink="0" mt="1">
                            <StepDescription>
                              <Text color={"white"}>
                                Masukkan <b>kode {virtualAccMandiri}.</b>
                              </Text>
                            </StepDescription>
                          </Box>

                          <StepSeparator />
                        </Step>
                        <Step>
                          <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                          </StepIndicator>

                          <Box flexShrink="0" mt={1}>
                            <StepDescription>
                              <Text color={"white"}>Lakukan proses pembayaran hingga selesai.</Text>
                            </StepDescription>
                          </Box>

                          <StepSeparator />
                        </Step>
                      </Stepper>
                      <Button colorScheme="facebook" color={"white"} _hover={{ bg: "tomato" }} size="sm" mr={20} mt={5} w={"90px"} onClick={handleButtonClick}>
                        Bayar
                      </Button>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton bgColor="white" color={"black"} _hover={{ bgColor: "tomato", color: "white" }} _expanded={{ bg: "#F7F7F7", color: "#2e4583" }}>
                    <Box as="span" textAlign="left">
                  <Image src="https://upload.wikimedia.org/wikipedia/id/5/55/BNI_logo.svg" w={"40px"} /> {/* Adjust the size as needed */}
                </Box>
               
                <Box as="span" ml={4} flex="1" textAlign="left">
                  <Text fontWeight={"bold"}>BNI</Text>
                </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} color={"white"}>
                    <Flex direction={"column"}>
                      <Stepper orientation="vertical" height={"200"} gap="0">
                        <Step>
                          <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                          </StepIndicator>

                          <Box flexShrink="0" mt={1}>
                            <StepDescription>
                              <Text color={"white"}>
                                Login ke <b>BNI Mobile Banking.</b>
                              </Text>
                            </StepDescription>
                          </Box>

                          <StepSeparator />
                        </Step>
                        <Step>
                          <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                          </StepIndicator>

                          <Box flexShrink="0" mt={1}>
                            <StepDescription>
                              <Text color={"white"}>
                                Pilih <b>PEMBELIAN {">"} VIRTUAL ACCOUNT.</b>
                              </Text>
                            </StepDescription>
                          </Box>

                          <StepSeparator />
                        </Step>
                        <Step>
                          <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                          </StepIndicator>

                          <Box flexShrink="0" mt="1">
                            <StepDescription>
                              <Text color={"white"}>
                                Masukkan <b>kode {virtualAccBNI}.</b>
                              </Text>
                            </StepDescription>
                          </Box>

                          <StepSeparator />
                        </Step>
                        <Step>
                          <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                          </StepIndicator>

                          <Box flexShrink="0" mt={1}>
                            <StepDescription>
                              <Text color={"white"}>Lakukan proses pembayaran hingga selesai.</Text>
                            </StepDescription>
                          </Box>

                          <StepSeparator />
                        </Step>
                      </Stepper>
                      <Button colorScheme="facebook" color={"white"} _hover={{ bg: "tomato" }} size="sm" mr={20} mt={5} w={"90px"} onClick={handleButtonClick}>
                        Bayar
                      </Button>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton bgColor="white" _hover={{ bgColor: "tomato", color: "white" }} _expanded={{ bg: "tomato", color: "white" }}>
              <Box as="span" textAlign="left">
                  <BsFillWalletFill size={24} /> {/* Adjust the size as needed */}
                </Box>
                {/* Credit Card Text */}
                <Box as="span" ml={4} flex="1" textAlign="left">
                  <Text fontWeight={"bold"}>E-Wallet</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} color={"white"}>
              <Accordion
                w={{ base: "94vw", lg: "33vw" }}
                allowToggle
                onChange={(index) => {
                  if (index === 0) {
                    dispatch(setPaymentMethod("GOPAY"));
                  } else if (index === 1) {
                    dispatch(setPaymentMethod("OVO"));
                  } else if (index === 2) {
                    dispatch(setPaymentMethod("DANA"));
                  }
                }}
              >
                <AccordionItem>
                  <h2>
                    <AccordionButton bgColor="white" color={"black"} _hover={{ bgColor: "tomato", color: "white" }} _expanded={{ bg: "#F7F7F7", color: "#2e4583" }}>
                    <Box as="span" textAlign="left">
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg" w={"40px"} /> {/* Adjust the size as needed */}
                </Box>
               
                <Box as="span" ml={4} flex="1" textAlign="left">
                  <Text fontWeight={"bold"}>GOPAY</Text>
                </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} color={"white"}>
                    <Flex direction={"column"}>
                      <Stepper orientation="vertical" height={"130"} gap="0">
                        <Step>
                          <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                          </StepIndicator>

                          <Box flexShrink="0" mt={1.5}>
                            <StepDescription>
                              <Text color={"white"}>
                                Masuk ke aplikasi <b>GOJEK.</b>
                              </Text>
                            </StepDescription>
                          </Box>

                          <StepSeparator />
                        </Step>
                        <Step>
                          <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                          </StepIndicator>

                          <Box flexShrink="0" mt={1.5}>
                            <StepDescription>
                              <Text color={"white"}>
                                Pilih <b>BAYAR {">"} SCAN QR CODE</b>
                              </Text>
                            </StepDescription>
                          </Box>

                          <StepSeparator />
                        </Step>
                        <Step>
                          <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                          </StepIndicator>

                          <Box flexShrink="0" mt={1.5}>
                            <StepDescription>
                              <Text color={"white"}>Lakukan proses pembayaran hingga selesai.</Text>
                            </StepDescription>
                          </Box>
                          <StepSeparator />
                        </Step>
                      </Stepper>
                      <Button colorScheme="facebook" color={"white"} _hover={{ bg: "tomato" }} size="sm" mr={20} mt={5} w={"90px"} onClick={handleButtonClick}>
                        Bayar
                      </Button>
                      <Text fontStyle={"italic"} fontSize={"xs"} color={"white"}>
                        {" "}
                        *QR Code akan muncul setelah klik bayar
                      </Text>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton bgColor="white" color={"black"} _hover={{ bgColor: "tomato", color: "white" }} _expanded={{ bg: "#F7F7F7", color: "#2e4583" }}>
                    <Box as="span" textAlign="left">
                  <Image src="https://i.pinimg.com/originals/1a/62/aa/1a62aa1c175a7bb8ce2aaeb1aef6b2c4.png" w={"40px"} /> {/* Adjust the size as needed */}
                </Box>
               
                <Box as="span" ml={4} flex="1" textAlign="left">
                  <Text fontWeight={"bold"}>OVO</Text>
                </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} color={"white"}>
                    <Flex direction={"column"}>
                      <Stepper orientation="vertical" height={"130"} gap="0">
                        <Step>
                          <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                          </StepIndicator>

                          <Box flexShrink="0" mt={1}>
                            <StepDescription>
                              <Text color={"white"}>
                                Masuk ke aplikasi <b>OVO</b>
                              </Text>
                            </StepDescription>
                          </Box>

                          <StepSeparator />
                        </Step>
                        <Step>
                          <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                          </StepIndicator>

                          <Box flexShrink="0" mt={1}>
                            <StepDescription>
                              <Text color={"white"}>
                                Pilih <b>PAY QRIS {">"} SCAN QR CODE.</b>
                              </Text>
                            </StepDescription>
                          </Box>

                          <StepSeparator />
                        </Step>
                        <Step>
                          <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                          </StepIndicator>

                          <Box flexShrink="0" mt={1}>
                            <StepDescription>
                              <Text color={"white"}>Lakukan proses pembayaran hingga selesai.</Text>
                            </StepDescription>
                          </Box>

                          <StepSeparator />
                        </Step>
                      </Stepper>
                      <Button colorScheme="facebook" color={"white"} _hover={{ bg: "tomato" }} size="sm" mr={20} mt={5} w={"90px"} onClick={handleButtonClick}>
                        Bayar
                      </Button>
                      <Text fontStyle={"italic"} fontSize={"xs"} color={"white"}>
                        {" "}
                        *QR Code akan muncul setelah klik bayar
                      </Text>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton bgColor="white" color={"black"} _hover={{ bgColor: "tomato", color: "white" }} _expanded={{ bg: "#F7F7F7", color: "#2e4583" }}>
                    <Box as="span" textAlign="left">
                  <Image src="https://cdn.5minvideo.id/images/logo/Logo-Dana-Png.png" w={"40px"} /> {/* Adjust the size as needed */}
                </Box>
               
                <Box as="span" ml={4} flex="1" textAlign="left">
                  <Text fontWeight={"bold"}>DANA</Text>
                </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} color={"white"}>
                    <Flex direction={"column"}>
                      <Stepper orientation="vertical" height={"130"} gap="0">
                        <Step>
                          <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                          </StepIndicator>

                          <Box flexShrink="0" mt={1}>
                            <StepDescription>
                              <Text color={"white"}>
                                Masuk ke aplikasi <b>DANA</b>
                              </Text>
                            </StepDescription>
                          </Box>

                          <StepSeparator />
                        </Step>
                        <Step>
                          <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                          </StepIndicator>

                          <Box flexShrink="0" mt={1}>
                            <StepDescription>
                              <Text color={"white"}>
                                Pilih <b>SCAN QR {">"} SCAN QR CODE.</b>
                              </Text>
                            </StepDescription>
                          </Box>

                          <StepSeparator />
                        </Step>
                        <Step>
                          <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                          </StepIndicator>
                          <Box flexShrink="0" mt={1}>
                            <StepDescription>
                              <Text color={"white"}>Lakukan proses pembayaran hingga selesai.</Text>
                            </StepDescription>
                          </Box>
                          <StepSeparator />
                        </Step>
                      </Stepper>
                      <Button colorScheme="facebook" color={"white"} _hover={{ bg: "tomato" }} size="sm" mr={20} mt={5} w={"90px"} onClick={handleButtonClick}>
                        Bayar
                      </Button>
                      <Text fontStyle={"italic"} fontSize={"xs"} color={"white"}>
                        {" "}
                        *QR Code akan muncul setelah klik bayar
                      </Text>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
}

export default PaymentMethod;
