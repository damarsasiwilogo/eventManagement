import myTixLogo from "../images/logo_mytix.png";
import { useEffect, useState } from "react";
import {
  Box,
  Input,
  Menu,
  MenuItem,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  MenuButton,
  MenuList,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Heading,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  InputRightElement,
  Center,
  Link,
  chakra,
  ModalHeader,
  ModalFooter,
} from "@chakra-ui/react";
import api from "../api.js";
import "../index.css";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import CreateForm from "./CreateForm";
import { login } from "../slices/userSlices";
import { logout } from "../slices/userSlices";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../slices/userSlices";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CMdEmail = chakra(MdEmail);

export default function Navibar(props) {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isOpen: showPassword, onToggle: onTogglePassword } = useDisclosure();
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  const profile = useSelector((state) => state.users.profile);

  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (props.needLogin && !isLoggedIn) {
      navigate("/");
    }
  }, [props.needLogin, navigate, isLoggedIn]);

  // declare Regist
  const [activeModal, setActiveModal] = useState(null); //declare pop out success or error register

  // Handle Input Section
  useEffect(() => {
    api.get("/events").then((res) => {
      setEvents(res.data);
    });
  }, []);

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
    setTimeout(() => {
      setIsFocused(false);
    }, 500);
  };

  const handleClickInput = (id) => {
    if (isLoggedIn) {
      navigate(`/Transaction/${id}`);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModals = () => {
    setIsModalOpen(false);
  };

  // Suggestion component
  const Suggestions = ({ suggestions }) => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <Box mt={2} bg="white" borderRadius="md" boxShadow="md" position="absolute" width="100%" p={"10px"} zIndex={5}>
        <Menu>
          {suggestions.map((event) => (
            <MenuItem
              key={event.id}
              className="name"
              _hover={{ bg: "#EDEDED" }}
              onClick={() => {
                handleClickInput(event.id);
              }}>
              {event.name}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  };
  // End Of Handle Input

  // declaring open and close modal to be called
  const openModal = (modal) => {
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // MODAL SETUP
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
  // END OF MODAL SETUP

  return (
    <>
      {isLoggedIn ? (
        <Box bg={"#331F69"} px={4}>
          <Flex h={16} alignItems="center" justifyContent={{ lg: "space-evenly" }}>
            <IconButton size="md" icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} aria-label="Open Menu" display={{ lg: "none" }} onClick={isOpen ? onClose : onOpen} />
            <HStack spacing={8}>
              <a href="/">
                <Image src={myTixLogo} w={"150px"} h={"45px"} />
              </a>
            </HStack>
            <HStack as="nav" spacing={4} display={{ base: "none", lg: "flex" }}>
              <div style={{ position: "relative" }}>
                <Input
                  size={"md"}
                  placeholder="Search an event..."
                  w={{ md: "sm", lg: "lg" }}
                  shadow={"sm"}
                  bg={"white"}
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={handleSearchInputFocus}
                  onBlur={handleSearchInputBlur}
                />
                <Suggestions suggestions={isFocused ? suggestions : []} />
              </div>
            </HStack>

            <Flex alignItems="center" className="right-button" display={{ base: "none", lg: "flex" }}>
              <Button size={"sm"} bg="#331F69" color={"white"} _hover={{ bg: "#24105c" }} className="btn-nav-discover" mr={2}>
                <a href="#discover">DISCOVER</a>
              </Button>
              <Flex mr={10} gap={2} alignItems={"center"} zIndex={5}>
                <Menu>
                  <MenuButton as={Button} rightIcon={<FaChevronDown />} rounded="full" variant="outline" color={"white"} colorScheme="white" _hover={{ bgColor: "black", color: "white" }} zIndex={5}>
                    {profile.username}
                  </MenuButton>
                  <MenuList>
                    <Flex justifyContent={"center"} p={2} mx={4} flexDir={"column"} alignItems={"center"} borderRadius={10} bg={"#331F69"} color={"white"} boxShadow={"md"}>
                      <Text fontWeight={"bold"}> Refferal Code</Text>
                      <Text> {profile.reffcode}</Text>
                    </Flex>
                    <CreateForm />
                    <MenuItem
                          onClick={() => {
                            navigate("/MyTickets");
                          }}>
                          MyTickets
                        </MenuItem>
                    <MenuItem
                      onClick={() => {
                        dispatch(logout());
                      }}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Flex>
          </Flex>

          {/* JGN DIGANTI2 */}
          {isOpen ? (
            <Box pb={4} display={{ lg: "none" }}>
              <Stack as="nav" spacing={4}>
                <div style={{ position: "relative" }}>
                  <Input size={"md"} placeholder="Search an event..." w={"100%"} shadow={"sm"} bg={"white"} value={searchQuery} onChange={handleSearchInputChange} onFocus={handleSearchInputFocus} onBlur={handleSearchInputBlur} />
                  <Suggestions suggestions={isFocused ? suggestions : []} />
                </div>
                <Stack>
                  <Button size={"sm"} bg="#331F69" color={"white"} _hover={{ bg: "#24105c" }} className="btn-nav-discover">
                    <a href="#discover">DISCOVER</a>
                  </Button>
                  <Flex mr={10} gap={2} alignItems={"center"} zIndex={5}>
                    <Menu>
                      <MenuButton as={Button} rightIcon={<FaChevronDown />} rounded="full" variant="outline" color={"white"} colorScheme="white" _hover={{ bgColor: "black", color: "white" }} zIndex={5}>
                        {profile.username}
                      </MenuButton>
                      <MenuList>
                        <Flex justifyContent={"center"} p={2} mx={4} flexDir={"column"} alignItems={"center"} borderRadius={10} bg={"#331F69"} color={"white"} boxShadow={"md"}>
                          <Text fontWeight={"bold"}> Refferal Code</Text>
                          <Text> {profile.reffcode}</Text>
                        </Flex>
                        <CreateForm />
                        <MenuItem
                          onClick={() => {
                            navigate("/MyTickets");
                          }}>
                          MyTickets
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            dispatch(logout());
                          }}>
                          Logout
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                </Stack>
              </Stack>
            </Box>
          ) : null}
        </Box>
      ) : (
        <Box bg={"#331F69"} px={4}>
          <Flex h={16} alignItems="center" justifyContent={{ base: "normal", lg: "space-evenly" }}>
            <IconButton size="md" icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} aria-label="Open Menu" display={{ lg: "none" }} onClick={isOpen ? onClose : onOpen} />
            <HStack spacing={8}>
              <a href="/">
                <Image src={myTixLogo} w={"150px"} h={"45px"} />
              </a>
            </HStack>
            <HStack as="nav" spacing={4} display={{ base: "none", lg: "flex" }}>
              <div style={{ position: "relative" }}>
                <Input
                  size={"md"}
                  placeholder="Search an event..."
                  w={{ md: "sm", lg: "lg" }}
                  shadow={"sm"}
                  bg={"white"}
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={handleSearchInputFocus}
                  onBlur={handleSearchInputBlur}
                />
                <Suggestions suggestions={isFocused ? suggestions : []} />
              </div>
            </HStack>

            <Flex alignItems="center" className="right-button" display={{ base: "none", lg: "flex" }}>
              <Button size={"sm"} bg="#331F69" color={"white"} _hover={{ bg: "#24105c" }} className="btn-nav-discover" mr={2}>
                <a href="#discover">DISCOVER</a>
              </Button>
              <Button size={"sm"} bg={"#3E60C1"} color={"white"} className="btn-nav" onClick={() => openModal("login")} mr={2}>
                LOGIN
              </Button>
              <Button size={"sm"} bg={"#F7F7F7"} color={"#2e4583"} onClick={() => openModal("register")}>
                REGISTER
              </Button>
            </Flex>
          </Flex>

          {/* JGN DIGANTI2 */}
          {isOpen ? (
            <Box pb={4} display={{ lg: "none" }}>
              <Stack as="nav" spacing={4}>
                <div style={{ position: "relative" }}>
                  <Input size={"md"} placeholder="Search an event..." w={{ base: "100%" }} shadow={"sm"} bg={"white"} value={searchQuery} onChange={handleSearchInputChange} onFocus={handleSearchInputFocus} onBlur={handleSearchInputBlur} />
                  <Suggestions suggestions={isFocused ? suggestions : []} />
                </div>
                <Stack>
                  <Button size={"sm"} bg="#331F69" color={"white"} _hover={{ bg: "#24105c" }} className="btn-nav-discover">
                    <a href="#discover">DISCOVER</a>
                  </Button>
                  <Button size={"sm"} bg={"#3E60C1"} color={"white"} className="btn-nav" onClick={() => openModal("login")}>
                    LOGIN
                  </Button>
                  <Button size={"sm"} bg={"#F7F7F7"} color={"#2e4583"} onClick={() => openModal("register")}>
                    REGISTER
                  </Button>
                </Stack>
              </Stack>
            </Box>
          ) : null}
        </Box>
      )}

      <Modal isOpen={activeModal === "login"} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent bg="ghostwhite" size="xl">
          <ModalCloseButton />
          <ModalBody>
            <Flex minH={"1vh"} align={"center"} justify={"center"} bg={useColorModeValue("whiteAlpha.50", "whiteAlpha.800")}>
              <Flex flexDirection="column" width="40vh" height="50vh" backgroundColor="transparent" justifyContent="center" alignItems="center">
                <Stack flexDir="column" mb="1" justifyContent="center" alignItems="center">
                  <Avatar bg="blue.700" />
                  <Heading color="blue.600">Welcome</Heading>
                  <Box minW={{ base: "90%", md: "468px" }}>
                    <Stack spacing={4} p="2rem" backgroundColor="transparent">
                      <Formik initialValues={{ username: "", password: "" }} validationSchema={loginSchema} onSubmit={handleLogin}>
                        {({ isSubmitting }) => (
                          <Form>
                            <Field name="username">
                              {({ field, form }) => (
                                <FormControl isInvalid={form.errors.username && form.touched.username} isDisabled={isSubmitting}>
                                  <FormLabel>Username</FormLabel>
                                  <InputGroup>
                                    <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
                                    <Input type="text" {...field} placeholder="Username" />
                                  </InputGroup>
                                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                            <Field name="password">
                              {({ field, form }) => (
                                <FormControl isInvalid={form.errors.password && form.touched.password} isDisabled={isSubmitting}>
                                  <FormLabel>Password</FormLabel>
                                  <InputGroup>
                                    <InputLeftElement pointerEvents="none" color="gray.300" children={<CFaLock color="gray.300" />} />
                                    <Input type={showPassword ? "text" : "password"} {...field} placeholder="Password" />
                                    <InputRightElement h="full">
                                      <Button variant="ghost" onClick={onTogglePassword}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                      </Button>
                                    </InputRightElement>
                                  </InputGroup>
                                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                            <Stack pt={3}>
                              <Button isLoading={isSubmitting} loadingText="Logging In" boxShadow={"md"} type="submit" colorScheme="red">
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
                        <Link color="blue.500" onClick={() => openModal("register")}>
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
      <Modal isOpen={activeModal === "register"} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent bg="ghostwhite" size="xl">
          <ModalCloseButton />
          <ModalBody>
            <Flex minH={"65vh"} align={"center"} justify={"center"} backgroundColor="ghostwhite">
              <Flex flexDirection="column" width="70vh" height="50vh" justifyContent="center" alignItems="center">
                <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
                  <Avatar bg="blue.700" />
                  <Heading color="blue.600">Sign Up</Heading>
                  <Box minW={{ base: "90%", md: "468px" }}>
                    <Stack spacing={4} p="2rem" backgroundColor="transparent">
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
                                <FormControl isInvalid={form.errors.username && form.touched.username} isDisabled={isSubmitting}>
                                  <FormLabel>Username</FormLabel>
                                  <InputGroup>
                                    <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
                                    <Input type="text" {...field} placeholder="Username" />
                                  </InputGroup>
                                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                            <Field name="email">
                              {({ field, form }) => (
                                <FormControl isInvalid={form.errors.email && form.touched.email} isDisabled={isSubmitting}>
                                  <FormLabel>Email</FormLabel>
                                  <InputGroup>
                                    <InputLeftElement pointerEvents="none" children={<CMdEmail color="gray.300" />} />
                                    <Input {...field} placeholder="Email" />
                                  </InputGroup>
                                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                            <Field name="password">
                              {({ field, form }) => (
                                <FormControl isInvalid={form.errors.password && form.touched.password} isDisabled={isSubmitting}>
                                  <FormLabel>Password</FormLabel>
                                  <InputGroup>
                                    <InputLeftElement pointerEvents="none" children={<CFaLock color="gray.300" />} />
                                    <Input {...field} placeholder="Password" type={showPassword ? "text" : "password"} />
                                    <InputRightElement h="full">
                                      <Button variant="ghost" onClick={onTogglePassword}>
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
                                <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword} isDisabled={isSubmitting}>
                                  <FormLabel>Confirm Password</FormLabel>
                                  <InputGroup>
                                    <InputLeftElement pointerEvents="none" children={<CFaLock color="gray.300" />} />
                                    <Input {...field} placeholder="Confirm password" type={showPassword ? "text" : "password"} />
                                    <InputRightElement h="full">
                                      <Button variant="ghost" onClick={onTogglePassword}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                      </Button>
                                    </InputRightElement>
                                  </InputGroup>
                                  <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                            <Stack pt={3}>
                              <Button isLoading={isSubmitting} loadingText="Registering" boxShadow={"md"} type="submit" colorScheme="blue">
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
                        <Link color={"blue.400"} onClick={() => openModal("login")}>
                          Login
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

      {/* Pop up login alert */}
      <Modal isOpen={isModalOpen} onClose={closeModal} isCentered blockScrollOnMount={true} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Warning</ModalHeader>
          <ModalBody>Kamu belum login!</ModalBody>
          <ModalFooter>
            <Button colorScheme="facebook" color={"white"} _hover={{ bg: "#24105c" }} onClick={closeModals}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <main>{props.children}</main>
    </>
  );
}
