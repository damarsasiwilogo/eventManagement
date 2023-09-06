// BACKUP SEBELUM DI KOPU NAKO

// import {
// 	Avatar,
// 	Box,
// 	Button,
// 	Flex,
// 	FormControl,
// 	FormLabel,
// 	Heading,
// 	HStack,
// 	Input,
// 	InputGroup,
// 	InputLeftElement,
// 	InputRightElement,
// 	chakra,
// 	Link,
// 	Stack,
// 	Text,
// 	Modal,
// 	ModalOverlay,
// 	ModalContent,
// 	ModalBody,
// 	ModalCloseButton,
// 	useColorModeValue,
// 	ButtonGroup,
// 	FormHelperText,
// 	Image,
// 	useToast,
// 	FormErrorMessage,
// } from "@chakra-ui/react";
// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import "../index.css";
// import { FaUserAlt, FaLock } from "react-icons/fa";
// import { useState, useEffect } from "react";
// import Regist from "../pages/Regist";
// import api from "../api";
// import { List, ListItem } from "@chakra-ui/react";
// import myTixLogo from "../images/logo_mytix.png";
// import { useDispatch } from "react-redux";
// import { add } from "../slices/userSlices";
// import { Formik, Form, Field } from "formik";

// const CFaUserAlt = chakra(FaUserAlt);
// const CFaLock = chakra(FaLock);

// export default function Navigation() {
// 	// declare Regist
// 	const [showPassword, setShowPassword] = useState(false);
// 	const [activeModal, setActiveModal] = useState(null);
// 	//declare pop out success or error register
// 	const toast = useToast();
// 	const dispatch = useDispatch();

// 	const [events, setEvents] = useState([]);
// 	const [searchQuery, setSearchQuery] = useState("");
// 	const [filteredEvents, setFilteredEvents] = useState([]);
// 	const [suggestions, setSuggestions] = useState([]);
// 	const [isFocused, setIsFocused] = useState(false);

// 	// connect db.json when new user submit on register modal
// 	const handleSubmit = (values, forms) => {
// 		api
// 			.post("/users", values)
// 			.then((res) => {
// 				dispatch(add(res.data));
// 				toast({
// 					title: "Account is created",
// 					description: "New account is successfully created",
// 					status: "success",
// 					duration: 5000,
// 					isClosable: true,
// 				});
// 			})
// 			.catch((error) => {
// 				toast({
// 					title: "Error creating an account",
// 					description: error.message,
// 					status: "error",
// 					duration: 5000,
// 					isClosable: true,
// 				});
// 			})
// 			.finally(() => {
// 				forms.resetform();
// 			});
// 	};

// 	// handle Input section
// 	useEffect(() => {
// 		api.get("/events").then((res) => {
// 			setEvents(res.data);
// 		}).catch((err) => {
//             toast({
//               title:"Something wrong",
//               description: err.message,
//               status: "error",
//               isClosable: true
//             })
//           });
// 	}, []);

// 	useEffect(() => {
// 		const filtered = events.filter((event) =>
// 			event.name.toLowerCase().includes(searchQuery.toLowerCase())
// 		);
// 		setFilteredEvents(filtered);
// 	}, [searchQuery, events]);

// 	const handleSearchInputChange = (event) => {
// 		const input = event.target.value;
// 		setSearchQuery(input);

// 		// Filter suggestions berdasarkan input
// 		const filtered = events.filter((event) =>
// 			event.name.toLowerCase().includes(input.toLowerCase())
// 		);

// 		setSuggestions(filtered);
// 	};

// 	const handleSearchInputFocus = () => {
// 		setIsFocused(true);
// 	};

// 	const handleSearchInputBlur = () => {
// 		setIsFocused(false);
// 	};

// 	// Suggestion component
// 	const Suggestions = ({ suggestions }) => {
// 		if (suggestions.length === 0) {
// 			return null;
// 		}

// 		return (
// 			<Box
// 				mt={2}
// 				bg="white"
// 				borderRadius="md"
// 				boxShadow="md"
// 				position="absolute"
// 				width="100%"
// 				p={"10px"}
// 				zIndex={5}>
// 				<List>
// 					{suggestions.map((event) => (
// 						<ListItem
// 							key={event.id}
// 							className="name">
// 							{event.name}
// 						</ListItem>
// 					))}
// 				</List>
// 			</Box>
// 		);
// 	};
// 	// end of handle Input section

// 	// declaring open and close modal to be called
// 	const openModal = (modal) => {
// 		setActiveModal(modal);
// 	};

// 	const closeModal = () => {
// 		setActiveModal(null);
// 	};

// 	// declare to show or hide the text in password input
// 	// jadinya dipakeee JANGAN DIHAPUS
// 	const handleShowClick = () => setShowPassword(!showPassword);

// 	return (
// 		<>
// 			<Box
// 				display={"flex"}
// 				justifyContent={"space-evenly"}
// 				bg={"#331F69"}
// 				alignItems={"center"}
// 				h={"10vh"}
// 				w={"100%"}>
// 				<a href="/">
// 					<Image
// 						src={myTixLogo}
// 						w={"150px"}
// 						h={"45px"}
// 					/>
// 				</a>
// 				<div style={{ position: "relative" }}>
// 					<Input
// 						size={"md"}
// 						placeholder="Search an event..."
// 						w={"md"}
// 						shadow={"sm"}
// 						bg={"white"}
// 						value={searchQuery}
// 						onChange={handleSearchInputChange}
// 						onFocus={handleSearchInputFocus}
// 						onBlur={handleSearchInputBlur}
// 					/>
// 					<Suggestions suggestions={isFocused ? suggestions : []} />
// 				</div>
// 				<ButtonGroup>
// 					<Button
// 						bgColor="#331F69"
// 						color={"white"}
// 						_hover={{ bg: "#24105c" }}
// 						className="btn-nav-discover">
// 						<a href="#discover">DISCOVER</a>
// 					</Button>
// 					<Button
// 						bg={"#3E60C1"}
// 						color={"white"}
// 						className="btn-nav"
// 						onClick={() => openModal("login")}>
// 						LOGIN
// 					</Button>
// 					<Button
// 						bg={"#F7F7F7"}
// 						color={"#2e4583"}
// 						onClick={() => openModal("register")}>
// 						REGISTER
// 					</Button>
// 				</ButtonGroup>
// 			</Box>
// 			<Modal
// 				isOpen={activeModal === "login"}
// 				onClose={closeModal}
// 				isCentered>
// 				<ModalOverlay />
// 				<ModalContent
// 					bg="ghostwhite"
// 					size="xl">
// 					<ModalCloseButton />
// 					<ModalBody>
// 						<Flex
// 							minH={"10vh"}
// 							align={"center"}
// 							justify={"center"}
// 							bg={useColorModeValue("whiteAlpha.50", "whiteAlpha.800")}>
// 							<Flex
// 								flexDirection="column"
// 								width="50wh"
// 								height="50vh"
// 								backgroundColor="transparent"
// 								justifyContent="center"
// 								alignItems="center">
// 								<Stack
// 									flexDir="column"
// 									mb="2"
// 									justifyContent="center"
// 									alignItems="center">
// 									<Avatar bg="blue.700" />
// 									<Heading color="blue.600">Welcome</Heading>
// 									<Box minW={{ base: "90%", md: "468px" }}>
// 										<form>
// 											<Stack
// 												spacing={4}
// 												p="2rem"
// 												backgroundColor="transparent">
// 												<FormControl>
// 													<InputGroup>
// 														<InputLeftElement
// 															pointerEvents="none"
// 															children={<CFaUserAlt color="gray.300" />}
// 														/>
// 														<Input
// 															type="email"
// 															placeholder="email address"
// 														/>
// 													</InputGroup>
// 												</FormControl>
// 												<FormControl>
// 													<InputGroup>
// 														<InputLeftElement
// 															pointerEvents="none"
// 															color="gray.300"
// 															children={<CFaLock color="gray.300" />}
// 														/>
// 														<Input
// 															type={showPassword ? "text" : "password"}
// 															placeholder="Password"
// 														/>
// 														<InputRightElement h={"full"}>
// 															<Button
// 																variant={"ghost"}
// 																onClick={handleShowClick}>
// 																{showPassword ? <ViewIcon /> : <ViewOffIcon />}
// 															</Button>
// 														</InputRightElement>
// 													</InputGroup>
// 													<FormHelperText textAlign="right">
// 														<Link>forgot password?</Link>
// 													</FormHelperText>
// 												</FormControl>
// 												<Button
// 													borderRadius={0}
// 													type="submit"
// 													variant="solid"
// 													colorScheme="blue"
// 													width="full">
// 													Login
// 												</Button>
// 											</Stack>
// 										</form>
// 									</Box>
// 								</Stack>
// 								<Box>
// 									New to us?{" "}
// 									<Link
// 										color="blue.500"
// 										onClick={() => openModal("register")}>
// 										Sign Up
// 									</Link>
// 								</Box>
// 							</Flex>
// 						</Flex>
// 					</ModalBody>
// 				</ModalContent>
// 			</Modal>
// 			<Modal
// 				isOpen={activeModal === "register"}
// 				onClose={closeModal}
// 				isCentered>
// 				<ModalOverlay />
// 				<ModalContent
// 					bg="ghostwhite"
// 					size="xl">
// 					<ModalCloseButton />
// 					<ModalBody>
// 						<Flex
// 							minH={"10vh"}
// 							align={"center"}
// 							justify={"center"}
// 							bg={useColorModeValue("whiteAlpha.50", "whiteAlpha.800")}>
// 							<Stack
// 								spacing={3}
// 								mx={"auto"}
// 								maxW={"lg"}
// 								py={12}
// 								px={6}>
// 								<Stack
// 									align={"center"}
// 									flexDir="column"
// 									mb="2"
// 									justifyContent="center"
// 									alignItems="center">
// 									<Avatar bg="blue.700" />
// 									<Heading color="blue.600">Sign Up</Heading>
// 								</Stack>
// 								<Box
// 									rounded={"lg"}
// 									bg="ghostwhite"
// 									p={8}>
// 									<Stack spacing={4}>
// 										<Formik
// 											initialValues={{
// 												firstName: "",
// 												lastName: "",
// 												email: "",
// 												password: "",
// 											}}
// 											onSubmit={handleSubmit}>
// 											{({ isSubmitting }) => (
// 												<Form>
// 													<HStack>
// 														<Box>
// 															<Field name="firstName">
// 																{({ field, form }) => (
// 																	<FormControl
// 																		id="firstName"
// 																		isRequired
// 																		isInvalid={
// 																			form.errors.firstName &&
// 																			form.touched.firstName
// 																		}
// 																		isDisabled={isSubmitting}>
// 																		<FormLabel>First Name</FormLabel>
// 																		<Input
// 																			type="text"
// 																			{...field}
// 																		/>
// 																		<FormErrorMessage>
// 																			{form.errors.firstName}
// 																		</FormErrorMessage>
// 																	</FormControl>
// 																)}
// 															</Field>
// 														</Box>
// 														<Box>
// 															<Field name="lastName">
// 																{({ field, form }) => (
// 																	<FormControl
// 																		id="lastName"
// 																		isInvalid={
// 																			form.errors.lastName &&
// 																			form.touched.lastName
// 																		}
// 																		isDisabled={isSubmitting}>
// 																		<FormLabel>Last Name</FormLabel>
// 																		<Input
// 																			type="text"
// 																			{...field}
// 																		/>
// 																		<FormErrorMessage>
// 																			{form.errors.lastName}
// 																		</FormErrorMessage>
// 																	</FormControl>
// 																)}
// 															</Field>
// 														</Box>
// 													</HStack>
// 													<Field name="email">
// 														{({ field, form }) => (
// 															<FormControl
// 																id="email"
// 																isRequired
// 																isInvalid={
// 																	form.errors.email && form.touched.email
// 																}
// 																isDisabled={isSubmitting}>
// 																<FormLabel>Email address</FormLabel>
// 																<Input
// 																	type="email"
// 																	{...field}
// 																/>
// 																<FormErrorMessage>
// 																	{form.errors.email}
// 																</FormErrorMessage>
// 															</FormControl>
// 														)}
// 													</Field>
// 													<Field name="password">
// 														{({ field, form }) => (
// 															<FormControl
// 																id="password"
// 																isRequired
// 																isInvalid={
// 																	form.errors.password && form.touched.password
// 																}
// 																isDisabled={isSubmitting}>
// 																<FormLabel>Password</FormLabel>
// 																<InputGroup>
// 																	<Input
// 																		{...field}
// 																		type={showPassword ? "text" : "password"}
// 																	/>
// 																	<InputRightElement h={"full"}>
// 																		<Button
// 																			variant={"ghost"}
// 																			onClick={handleShowClick}>
// 																			{showPassword ? (
// 																				<ViewIcon />
// 																			) : (
// 																				<ViewOffIcon />
// 																			)}
// 																		</Button>
// 																	</InputRightElement>
// 																</InputGroup>
// 																<FormErrorMessage>
// 																	{form.errors.password}
// 																</FormErrorMessage>
// 															</FormControl>
// 														)}
// 													</Field>
// 													<Stack
// 														spacing={10}
// 														pt={2}>
// 														<Button
// 															isLoading={isSubmitting}
// 															loadingText="Submitting"
// 															size="lg"
// 															bg={"blue.400"}
// 															color={"white"}
// 															_hover={{ bg: "blue.500" }}>
// 															Sign up
// 														</Button>
// 													</Stack>
// 													<Stack pt={6}>
// 														<Text align={"center"}>
// 															Already a user?{" "}
// 															<Link
// 																color={"blue.400"}
// 																onClick={() => openModal("login")}>
// 																Login
// 															</Link>
// 														</Text>
// 													</Stack>
// 												</Form>
// 											)}
// 										</Formik>
// 									</Stack>
// 								</Box>
// 							</Stack>
// 						</Flex>
// 					</ModalBody>
// 				</ModalContent>
// 			</Modal>
// 		</>
// 	);
// }

import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  chakra,
  Link,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  ButtonGroup,
  FormHelperText,
  Image,
  useToast,
  FormErrorMessage,
  VStack,
  Center,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { RiSpeakLine } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "../index.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useState, useEffect } from "react";
import api from "../api";
import { List, ListItem } from "@chakra-ui/react";
import myTixLogo from "../images/logo_mytix.png";
import { useDispatch } from "react-redux";
import { add } from "../slices/userSlices";
import { Formik, Form, Field } from "formik";
import { useDisclosure } from "@chakra-ui/react";
import { login } from "../slices/userSlices";
import { logout } from "../slices/userSlices";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaChevronDown } from "react-icons/fa";
import CreateForm from "./CreateForm";

import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function Navigation(props) {
  // declare Regist
  const [activeModal, setActiveModal] = useState(null);
  //declare pop out success or error register
  const toast = useToast();
  const dispatch = useDispatch();

  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const { isOpen: showPassword, onToggle: onTogglePassword } = useDisclosure();
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  const profile = useSelector((state) => state.users.profile);

  const navigate = useNavigate();

  useEffect(() => {
    if (props.needLogin && !isLoggedIn) {
      navigate("/");
    }
  }, [props.needLogin, navigate, isLoggedIn]);

  // connect db.json when new user submit on register modal
  const handleSubmit = async (values, forms) => {
    try {
      const res = await api.get("/users");
      const { data } = res;
      const existingUsername = data.some((user) => user.username === values.username);
      const existingEmail = data.some((user) => user.email === values.email);

      if (existingUsername) {
        forms.setFieldError("username", "username already used");
        toast({
          title: "Username already registered",
          description: "Username is already taken",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      if (existingEmail) {
        forms.setFieldError("email", "email already used");
        toast({
          title: "Email already registered",
          description: "Email is already registered",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      const body = {
        username: values.username,
        email: values.email,
        password: values.password,
        reffcode: "mytix" + values.username,
      };

      const response = await api.post("/users", body);
      dispatch(add(response.data));

      toast({
        title: "Account has been created",
        description: "Redirecting you to login page",
        status: "success",
        duration: 5000,
        isClosable: true,
        onCloseComplete: () => {
          closeModal();
        },
      });

      forms.resetForm();
    } catch (error) {
      toast({
        title: "Error creating an account",
        description: error.message,
        status: error,
        duration: 5000,
        isClosable: true,
      });
      // Handle other errors if needed
      console.error("Error:", error);
    }
  };

  //connect db.json when registered user submit on login modal
  const handleLogin = (values, forms) => {
    api
      .get(`/users?q=${values.username}`)
      .then((res) => {
        const { data } = res;
        const filteredUser = data
          .filter((user) => {
            return user.username === values.username;
          })
          .filter((user) => user.password === values.password);
        if (filteredUser.length === 0) {
          toast({
            status: "error",
            title: "Login failed",
            description: "incorrect username or password",
            isClosable: true,
            duration: 5000,
          });
          forms.setSubmitting(false);
          return;
        }
        const [userProfile] = filteredUser;
        dispatch(login(userProfile));

        toast({
          status: "success",
          title: "Login is success",
          isClosable: true,
          duration: 1000,
          onCloseComplete: () => {
            forms.resetForm();
            closeModal();
          },
        });
      })
      .catch((error) => {
        toast({
          status: "error",
          title: "Something wrong",
          description: error.message,
          isClosable: true,
          duration: 5000,
        });
        forms.resetForm();
      });
  };
  // handle Input section
  useEffect(() => {
    api.get("/events").then((res) => {
      setEvents(res.data);
    });
  }, []);

  useEffect(() => {
    const filtered = events.filter((event) => event.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredEvents(filtered);
  }, [searchQuery, events]);

  const handleSearchInputChange = (event) => {
    const input = event.target.value;
    setSearchQuery(input);

    // Filter suggestions berdasarkan input
    const filtered = events.filter((event) => event.name.toLowerCase().includes(input.toLowerCase()));

    setSuggestions(filtered);
  };

  const handleSearchInputFocus = () => {
    setIsFocused(true);
  };

  const handleSearchInputBlur = () => {
    setIsFocused(false);
  };

  const loginSchema = yup.object().shape({
    username: yup.string().required("username can't be empty").min(6, "minimum characters is 6"),
    password: yup.string().required("password can't be empty"),
  });

  const registerSchema = yup.object().shape({
    username: yup.string().required("name can't be empty").min(6, "minimum characters is 6"),
    email: yup.string().required("email can't be empty").email("email value is not email format"),
    password: yup.string().required("password can't be empty").min(6, "minimum characters is 6").minLowercase(1, "value must contain lowercase").minUppercase(1, "value must contain uppercase").minNumbers(1, "value must contain number"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  // Suggestion component
  const Suggestions = ({ suggestions }) => {
    if (suggestions.length === 0) {
      return null;
    }

    return (
      <Box
        mt={2}
        bg="white"
        borderRadius="md"
        boxShadow="md"
        position="absolute"
        width="100%"
        p={"10px"}
        zIndex={5}>
        <Menu>
          {suggestions.map((event) => (
            <MenuItem
              key={event.id}
              className="name"
              onClick={() => {
                navigate(`/events/${event.id}`);
              }}>
              {event.name}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  };
  // end of handle Input section

  // declaring open and close modal to be called
  const openModal = (modal) => {
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // declare to show or hide the text in password input
  // jadinya dipakeee JANGAN DIHAPUS
  // const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-evenly"}
        bg={"#331F69"}
        alignItems={"center"}
        h={"10vh"}
        w={"100%"}>
        <a href="/">
          <Image
            src={myTixLogo}
            w={"150px"}
            h={"45px"}
          />
        </a>
        <div style={{ position: "relative" }}>
          <Input
            size={"md"}
            placeholder="Search an event..."
            w={"md"}
            shadow={"sm"}
            bg={"white"}
            value={searchQuery}
            onChange={handleSearchInputChange}
            onFocus={handleSearchInputFocus}
            onBlur={handleSearchInputBlur}
          />
          <Suggestions suggestions={isFocused ? suggestions : []} />
        </div>

        {isLoggedIn ? (
          <>
            <Button
              display="flex"
              justifyContent="flex-end"
              mr={0}
              bg="#331F69"
              color={"white"}
              _hover={{ bg: "#24105c" }}
              className="btn-nav-discover">
              <a href="#discover">DISCOVER</a>
            </Button>
            <Flex
              mr={10}
              gap={2}
              alignItems={"center"}
              zIndex={5}>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<FaChevronDown />}
                  rounded="full"
                  variant="outline"
                  color={"white"}
                  colorScheme="white"
                  _hover={{ bgColor: "black", color: "white" }}
                  zIndex={5}>
                  {profile.username}
                </MenuButton>
                <MenuList>
                  <Flex
                    justifyContent={"center"}
                    p={2}
                    mx={4}
                    flexDir={"column"}
                    alignItems={"center"}
                    borderRadius={10}
                    bg={"#331F69"}
                    color={"white"}
                    boxShadow={"md"}>
                    <Text fontWeight={"bold"}> Refferal Code</Text>
                    <Text> {profile.reffcode}</Text>
                  </Flex>
                  <CreateForm />
                  <MenuItem
                    onClick={() => {
                      dispatch(logout());
                    }}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </>
        ) : (
          <Flex
            gap={2}
            justifyContent={"flex-end"}
            alignItems={"center"}>
            <Button
              display="flex"
              justifyContent="flex-end"
              mr={0}
              bg="#331F69"
              color={"white"}
              _hover={{ bg: "#24105c" }}
              className="btn-nav-discover">
              <a href="#discover">DISCOVER</a>
            </Button>
            <Button
              bg={"#3E60C1"}
              color={"white"}
              className="btn-nav"
              onClick={() => openModal("login")}>
              LOGIN
            </Button>
            <Button
              bg={"#F7F7F7"}
              color={"#2e4583"}
              onClick={() => openModal("register")}>
              REGISTER
            </Button>
          </Flex>
        )}
      </Box>
      <Modal
        isOpen={activeModal === "login"}
        onClose={closeModal}
        isCentered>
        <ModalOverlay />
        <ModalContent
          bg="ghostwhite"
          size="xl">
          <ModalCloseButton />
          <ModalBody>
            <Flex
              minH={"1vh"}
              align={"center"}
              justify={"center"}
              bg={useColorModeValue("whiteAlpha.50", "whiteAlpha.800")}>
              <Flex
                flexDirection="column"
                width="40vh"
                height="50vh"
                backgroundColor="transparent"
                justifyContent="center"
                alignItems="center">
                <Stack
                  flexDir="column"
                  mb="1"
                  justifyContent="center"
                  alignItems="center">
                  <Avatar bg="blue.700" />
                  <Heading color="blue.600">Welcome</Heading>
                  <Box minW={{ base: "90%", md: "468px" }}>
                    <Stack
                      spacing={4}
                      p="2rem"
                      backgroundColor="transparent">
                      <Formik
                        initialValues={{ username: "", password: "" }}
                        validationSchema={loginSchema}
                        onSubmit={handleLogin}>
                        {({ isSubmitting }) => (
                          <Form>
                            <Field name="username">
                              {({ field, form }) => (
                                <FormControl
                                  isInvalid={form.errors.username && form.touched.username}
                                  isDisabled={isSubmitting}>
                                  <FormLabel>Username</FormLabel>
                                  <InputGroup>
                                    <InputLeftElement
                                      pointerEvents="none"
                                      children={<CFaUserAlt color="gray.300" />}
                                    />
                                    <Input
                                      type="text"
                                      {...field}
                                      placeholder="Username"
                                    />
                                  </InputGroup>
                                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                            <Field name="password">
                              {({ field, form }) => (
                                <FormControl
                                  isInvalid={form.errors.password && form.touched.password}
                                  isDisabled={isSubmitting}>
                                  <FormLabel>Password</FormLabel>
                                  <InputGroup>
                                    <InputLeftElement
                                      pointerEvents="none"
                                      color="gray.300"
                                      children={<CFaLock color="gray.300" />}
                                    />
                                    <Input
                                      type={showPassword ? "text" : "password"}
                                      {...field}
                                      placeholder="Password"
                                    />
                                    <InputRightElement h="full">
                                      <Button
                                        variant="ghost"
                                        onClick={onTogglePassword}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                      </Button>
                                    </InputRightElement>
                                  </InputGroup>
                                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                            <Stack pt={3}>
                              <Button
                                isLoading={isSubmitting}
                                type="submit"
                                colorScheme="red"
                                variant="solid">
                                Login
                              </Button>
                            </Stack>
                          </Form>
                        )}
                      </Formik>
                    </Stack>
                    <Center>
                      <Box>
                        New to us?{" "}
                        <Link
                          color="blue.500"
                          onClick={() => openModal("register")}>
                          Sign Up
                        </Link>
                      </Box>
                    </Center>
                  </Box>
                </Stack>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={activeModal === "register"}
        onClose={closeModal}
        isCentered>
        <ModalOverlay />
        <ModalContent
          bg="ghostwhite"
          size="xl">
          <ModalCloseButton />
          <ModalBody>
            <Flex
              minH={"10vh"}
              align={"center"}
              justify={"center"}
              bg={useColorModeValue("whiteAlpha.50", "whiteAlpha.800")}>
              <Stack
                spacing={3}
                mx={"auto"}
                maxW={"md"}
                py={12}
                px={6}>
                <Stack
                  align={"center"}
                  flexDir="column"
                  mb="2"
                  justifyContent="center"
                  alignItems="center">
                  <Avatar bg="blue.700" />
                  <Heading color="blue.600">Sign Up</Heading>
                </Stack>
                <Box
                  rounded={"lg"}
                  bg="ghostwhite"
                  p={8}>
                  <Stack spacing={4}>
                    <Formik
                      initialValues={{
                        username: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                      }}
                      validationSchema={registerSchema}
                      onSubmit={handleSubmit}>
                      {({ isSubmitting }) => (
                        <Form>
                          <Field name="username">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={form.errors.username && form.touched.username}
                                isDisabled={isSubmitting}>
                                <FormLabel>Username</FormLabel>
                                <Input
                                  type="text"
                                  {...field}
                                  placeholder="Username"
                                />
                                <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="email">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={form.errors.email && form.touched.email}
                                isDisabled={isSubmitting}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                  {...field}
                                  placeholder="Email"
                                />
                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="password">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={form.errors.password && form.touched.password}
                                isDisabled={isSubmitting}>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                  <Input
                                    {...field}
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                  />
                                  <InputRightElement h="full">
                                    <Button
                                      variant="ghost"
                                      onClick={onTogglePassword}>
                                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                  </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="confirmPassword">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}
                                isDisabled={isSubmitting}>
                                <FormLabel>Confirm Password</FormLabel>
                                <InputGroup>
                                  <Input
                                    {...field}
                                    placeholder="Confirm password"
                                    type={showPassword ? "text" : "password"}
                                  />
                                  <InputRightElement h="full">
                                    <Button
                                      variant="ghost"
                                      onClick={onTogglePassword}>
                                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                  </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Stack pt={3}>
                            <Button
                              isLoading={isSubmitting}
                              loadingText="Submitting"
                              bg="blue.400"
                              color="white"
                              type="submit"
                              boxShadow={"md"}
                              _hover={{ bg: "blue.500" }}>
                              Register
                            </Button>
                          </Stack>
                        </Form>
                      )}
                    </Formik>
                  </Stack>
                  <Center>
                    <Box>
                      Already a user?{" "}
                      <Link
                        color={"blue.400"}
                        onClick={() => openModal("login")}>
                        Login
                      </Link>
                    </Box>
                  </Center>
                </Box>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <main>{props.children}</main>
    </>
  );
}
