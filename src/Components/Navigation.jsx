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
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import "../index.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useState } from "react";
import Regist from "../pages/Regist";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function Navigation() {
	const [showPassword, setShowPassword] = useState(false);
	const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);
	const [isModalOpenRegister, setIsModalOpenRegister] = useState(false);

	const openModalLogin = () => {
		setIsModalOpenLogin(true);
	};

	const closeModalLogin = () => {
		setIsModalOpenLogin(false);
	};

	const openModalRegister = () => {
		setIsModalOpenRegister(true);
	};

	const closeModalRegister = () => {
		setIsModalOpenRegister(false);
	};

	const handleShowClick = () => setShowPassword(!showPassword);

	return (
		<>
			<Box
				display={"flex"}
				justifyContent={"space-evenly"}
				bg={"#331F69"}
				alignItems={"center"}
				h={"10vh"}>
				<Text
					fontSize={"2xl"}
					fontWeight={"bold"}
					px={"15px"}
					color={"white"}
					borderRadius={"md"}>
					<a href={"/"}>myTix</a>
				</Text>
				<Input
					size={"md"}
					placeholder="Search an event..."
					w={"md"}
					shadow={"sm"}
					bg={"white"}
				/>
				<ButtonGroup>
					<Button
						bgColor="#331F69"
						color={"white"}
						_hover={{ bg: "#24105c" }}
						className="btn-nav-discover">
						<a href="#discover">DISCOVER</a>
					</Button>
					<Button
						bg={"#3E60C1"}
						color={"white"}
						className="btn-nav"
						onClick={openModalLogin}>
						LOGIN
					</Button>
					<Button
						bg={"#F7F7F7"}
						color={"#2e4583"}
						onClick={openModalRegister}>
						REGISTER
					</Button>
				</ButtonGroup>
			</Box>
			<Modal
				isOpen={isModalOpenLogin}
				onClose={closeModalLogin}
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
							<Flex
								flexDirection="column"
								width="50wh"
								height="50vh"
								backgroundColor="transparent"
								justifyContent="center"
								alignItems="center">
								<Stack
									flexDir="column"
									mb="2"
									justifyContent="center"
									alignItems="center">
									<Avatar bg="blue.700" />
									<Heading color="blue.600">Welcome</Heading>
									<Box minW={{ base: "90%", md: "468px" }}>
										<form>
											<Stack
												spacing={4}
												p="2rem"
												backgroundColor="transparent">
												<FormControl>
													<InputGroup>
														<InputLeftElement
															pointerEvents="none"
															children={<CFaUserAlt color="gray.300" />}
														/>
														<Input
															type="email"
															placeholder="email address"
														/>
													</InputGroup>
												</FormControl>
												<FormControl>
													<InputGroup>
														<InputLeftElement
															pointerEvents="none"
															color="gray.300"
															children={<CFaLock color="gray.300" />}
														/>
														<Input
															type={showPassword ? "text" : "password"}
															placeholder="Password"
														/>
														<InputRightElement h={"full"}>
															<Button
																variant={"ghost"}
																onClick={() =>
																	setShowPassword(
																		(showPassword) => !showPassword
																	)
																}>
																{showPassword ? <ViewIcon /> : <ViewOffIcon />}
															</Button>
														</InputRightElement>
													</InputGroup>
													<FormHelperText textAlign="right">
														<Link>forgot password?</Link>
													</FormHelperText>
												</FormControl>
												<Button
													borderRadius={0}
													type="submit"
													variant="solid"
													colorScheme="blue"
													width="full">
													Login
												</Button>
											</Stack>
										</form>
									</Box>
								</Stack>
								<Box>
									New to us?{" "}
									<Link
										color="blue.500"
										onClick={openModalRegister}>
										Sign Up
									</Link>
								</Box>
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
			<Modal
				isOpen={isModalOpenRegister}
				onClose={closeModalRegister}
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
								maxW={"lg"}
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
										<HStack>
											<Box>
												<FormControl
													id="firstName"
													isRequired>
													<FormLabel>First Name</FormLabel>
													<Input type="text" />
												</FormControl>
											</Box>
											<Box>
												<FormControl id="lastName">
													<FormLabel>Last Name</FormLabel>
													<Input type="text" />
												</FormControl>
											</Box>
										</HStack>
										<FormControl
											id="email"
											isRequired>
											<FormLabel>Email address</FormLabel>
											<Input type="email" />
										</FormControl>
										<FormControl
											id="password"
											isRequired>
											<FormLabel>Password</FormLabel>
											<InputGroup>
												<Input type={showPassword ? "text" : "password"} />
												<InputRightElement h={"full"}>
													<Button
														variant={"ghost"}
														onClick={() =>
															setShowPassword((showPassword) => !showPassword)
														}>
														{showPassword ? <ViewIcon /> : <ViewOffIcon />}
													</Button>
												</InputRightElement>
											</InputGroup>
										</FormControl>
										<Stack
											spacing={10}
											pt={2}>
											<Button
												loadingText="Submitting"
												size="lg"
												bg={"blue.400"}
												color={"white"}
												_hover={{ bg: "blue.500" }}>
												Sign up
											</Button>
										</Stack>
										<Stack pt={6}>
											<Text align={"center"}>
												Already a user?{" "}
												<Link
													color={"blue.400"}
													onClick={openModalLogin}>
													Login
												</Link>
											</Text>
										</Stack>
									</Stack>
								</Box>
							</Stack>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
