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

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function Navigation() {
	const [showPassword, setShowPassword] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
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
						onClick={openModal}>
						LOGIN
					</Button>
					<Button
						bg={"#F7F7F7"}
						color={"#2e4583"}>
						REGISTER
					</Button>
				</ButtonGroup>
			</Box>
			<Modal
				isOpen={isModalOpen}
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
														<InputRightElement width="4.5rem">
															<Button
																h="1.75rem"
																size="sm"
																onClick={handleShowClick}>
																{showPassword ? "Hide" : "Show"}
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
										href="#">
										Sign Up
									</Link>
								</Box>
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
