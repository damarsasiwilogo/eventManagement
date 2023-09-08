import React, { useEffect } from "react";
import { Box, Flex, Text, Select, Center, ButtonGroup, useToast } from "@chakra-ui/react";
import { Formik, Form, Field, useFormikContext } from "formik";
import { ErrorMessage } from "formik";
import { Input, Button, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import * as Yup from "yup";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setFormData, setDiscountedTotalPricesByReff, setDiscountedTotalPricesByCoupon, setDiscountedTotalPrices, setEventName } from "../slices/transactionSlices"; // Import the Redux action
import { useState } from "react";
import PaymentMethod from "./PaymentMethod";
import api from "../api";

function TransactionStep2({ onNext, onPrevious }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const formData = useSelector((state) => state.transaction.formData);
  const profile = useSelector((state) => state.users.profile);
  const totalPrices = useSelector((state) => state.transaction.totalPrices); // Access form data from Redux store
  const [events, setEvents] = useState([]);
  const toast = useToast();
  const [referralMessage, setReferralMessage] = useState("");
  const [couponMessage, setCouponMessage] = useState("");

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

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const years = Array.from({ length: 64 }, (_, i) => (2013 - i).toString());

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    telepon: Yup.string()
      .required("Phone number is required")
      .min(8, "Phone number must be at least 8 digits")
      .matches(/^[0-9]+$/, "Phone number must contain only numbers"),
    date: Yup.string().required("Date is required"),
    month: Yup.string().required("Month is required"),
    year: Yup.string().required("Year is required"),
  });

  const handleFormDataChange = (fieldName, value) => {
    const updatedFormData = { ...formData, [fieldName]: value };
    dispatch(setFormData(updatedFormData));
     // Dispatch the Redux action to update form data
  };

  return (
    <>
      <Formik
        initialValues={formData} // Initialize form values with data from Redux store
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={async () => {
          return true;
        }}
      >
        <>
          <Box display={"flex"} flexDirection="column" ml={40} mr={40} mt={2} borderRadius={10}>
            {/* Event details display here */}

            {events.map((event) => {
              dispatch(setEventName(event.name))// Automatically dispatch event.name
              return (
                <Flex justifyContent={"flex-end"} mx={10} mt={4} key={event.id}>
                  <Text fontWeight={"bold"}>{event.name}</Text>
                </Flex>
              );
            })}
            <Flex mt={4} ml={10} flexDirection={"column"} mb={30}>
              <Form>
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                      <FormLabel htmlFor="name">
                        Name{" "}
                        {formData.name ? null : (
                          <Text as="span" color="red">
                            *
                          </Text>
                        )}
                      </FormLabel>
                      <Input
                        {...field}
                        id="name"
                        placeholder="Enter your name"
                        w={400}
                        value={formData.name}
                        onChange={(e) => {
                          handleFormDataChange("name", e.target.value); // Update form data in Redux store
                          // validateTransactionForm({ ...formData, name: e.target.value }); // Validate the entire form
                        }} // Update form data in Redux store
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl mt={2} isInvalid={form.errors.email && form.touched.email}>
                      <FormLabel htmlFor="email">
                        Email{" "}
                        {formData.email ? null : (
                          <Text as="span" color="red">
                            *
                          </Text>
                        )}
                      </FormLabel>
                      <Input
                        {...field}
                        id="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        w={400}
                        onChange={(e) => {
                          handleFormDataChange("email", e.target.value); // Update form data in Redux store
                          // validateTransactionForm({ ...formData, email: e.target.value }); // Validate the entire form
                        }} // Update form data in Redux store
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
                        Telepon{" "}
                        {formData.telepon ? null : (
                          <Text as="span" color="red">
                            *
                          </Text>
                        )}
                      </FormLabel>
                      <Input
                        {...field}
                        id="telepon"
                        placeholder="Enter your number"
                        w={200}
                        type="tel"
                        value={formData.telepon}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(/\D/g, "");
                          handleFormDataChange("telepon", numericValue); // Update form data in Redux store
                          // validateTransactionForm({ ...formData, telepon: numericValue }); // Validate the entire form
                        }} // Update form data in Redux store
                      />
                      <FormErrorMessage>{form.errors.telepon}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Flex w={400}>
                  <FormControl mt={2}>
                    <FormLabel>
                      Tanggal Lahir{" "}
                      {formData.date && formData.month && formData.year ? null : (
                        <Text as="span" color="red">
                          *
                        </Text>
                      )}
                    </FormLabel>
                    <Flex gap={2}>
                      <Field name="date">
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.date && form.touched.date}>
                            <Select
                              {...field}
                              placeholder="Date"
                              value={formData.date}
                              onChange={(e) => {
                                handleFormDataChange("date", e.target.value); // Update form data in Redux store
                                // validateTransactionForm({ ...formData, date: e.target.value }); // Validate the entire form
                              }}
                            >
                              {Array.from({ length: 31 }, (_, i) => (
                                <option key={i + 1} value={(i + 1).toString().padStart(2, "0")}>
                                  {(i + 1).toString().padStart(2, "0")}
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
                              onChange={(e) => {
                                handleFormDataChange("month", e.target.value); // Update form data in Redux store
                                // validateTransactionForm({ ...formData, month: e.target.value }); // Validate the entire form
                              }}
                            >
                              {months.map((month, index) => (
                                <option key={index} value={(index + 1).toString().padStart(2, "0")}>
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
                              onChange={(e) => {
                                handleFormDataChange("year", e.target.value); // Update form data in Redux store
                                // validateTransactionForm({ ...formData, year: e.target.value }); // Validate the entire form
                              }}
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
                  initialValues={{ reffCode: "" }}
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
                            setFieldValue("reffCode", newReffCode);

                            // Call the API and validation logic here
                            if (newReffCode) {
                              // Define a function to fetch user data based on the reffCode
                              try {
                                const response = await api.get(`/users`);
                                const { data } = response;
                                const matchedReffCode = data.filter((user) => user.reffcode === newReffCode);

                                // Check if the entered reffCode matches the user's own reffCode
                                if (matchedReffCode.length > 0 && newReffCode === profile.reffcode) {
                                  // Set the message
                                  setReferralMessage("Referral code is valid, but you cannot use your own code");
                                  dispatch(setDiscountedTotalPricesByReff(0));
                                  dispatch(setDiscountedTotalPrices());
                                } else if (matchedReffCode.length > 0 && newReffCode !== profile.reffcode) {
                                  setReferralMessage("You got 5% ticket discount");
                                  dispatch(setDiscountedTotalPricesByReff(totalPrices * 0.05));
                                  dispatch(setDiscountedTotalPrices());
                                } else {
                                  setReferralMessage("Invalid referral code");
                                  dispatch(setDiscountedTotalPricesByReff(0));
                                  dispatch(setDiscountedTotalPrices());
                                }
                              } catch (error) {
                                console.error("Error fetching user data:", error);
                              }
                            } else {
                              // Handle the case when the input is cleared
                              setReferralMessage("");
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
                <Formik
                  initialValues={{ couponCode: "" }}
                  // Validation schema using Yup
                  validationSchema={Yup.object().shape({
                    couponCode: Yup.string().notRequired(), // Use 'notRequired' to make it optional
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
                        <FormLabel htmlFor="couponCode">Coupon Code</FormLabel>
                        <Input
                          type="text"
                          id="couponCode"
                          name="couponCode"
                          width={300}
                          placeholder="Enter coupon code"
                          onChange={async (e) => {
                            const newCouponCode = e.target.value;

                            // Update the form values as the input changes
                            setFieldValue("couponCode", newCouponCode);

                            if (newCouponCode) {
                              try {
                                const response = await api.get(`/couponcode`);
                                const couponsData = response.data;
                                const matchedCouponCode = couponsData.some((coupon) => coupon.code === newCouponCode);

                                if (matchedCouponCode) {
                                  // Assuming setCouponMessage is a state setter function
                                  const matchedCoupon = couponsData.find((coupon) => coupon.code === newCouponCode);
                                  if (matchedCoupon) {
                                    setCouponMessage(`You got ${matchedCoupon.discount * 100}% ticket discount`);
                                    dispatch(setDiscountedTotalPricesByCoupon(totalPrices * matchedCoupon.discount));
                                    dispatch(setDiscountedTotalPrices());
                                  }
                                } else {
                                  setCouponMessage("Invalid coupon code");
                                  dispatch(setDiscountedTotalPricesByCoupon(0));
                                  dispatch(setDiscountedTotalPrices());
                                }
                              } catch (error) {
                                setCouponMessage("Error fetching coupon data");
                              }
                            } else {
                              // Handle the case when the input is cleared
                              setCouponMessage("");
                            }
                          }}
                        />
                        <ErrorMessage name="couponCode" component="div" className="error-message" />
                      </FormControl>
                      {couponMessage && (
                        <Text mt={2} color="red.500">
                          {couponMessage}
                        </Text>
                      )}
                    </Form>
                  )}
                </Formik>
                <Box display={"flex"} justifyContent="flex-start" h={"10vh"} mt={5} mb={5}>
                  <Button bg={"#F7F7F7"} color={"#2e4583"} size="sm" mr={4} mt={5} w={"90px"} onClick={onPrevious}>
                    Kembali
                  </Button>
                </Box>
              </Form>
            </Flex>
          </Box>
          <PaymentMethod onNext={onNext} />
        </>
      </Formik>
    </>
  );
}

export default TransactionStep2;
