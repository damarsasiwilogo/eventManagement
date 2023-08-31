import React, { useState } from "react";
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
	InputRightElement,
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
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function Regist() {
	const [showPassword, setShowPassword] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

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
					myTix
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
						DISCOVER
					</Button>
					<Button bg={"#3E60C1"} color={"white"} className="btn-nav">
						LOGIN
					</Button>
					<Button bg={"#F7F7F7"} color={"#2e4583"} onClick={openModal}>
						REGISTER
					</Button>
				</ButtonGroup>
			</Box>
			<Modal isOpen={isModalOpen} onClose={closeModal} isCentered>
				<ModalOverlay />
				<ModalContent bg="white" size="xl">
					<ModalCloseButton />
					<ModalBody>
						<Flex
							minH={"10vh"}
							align={"center"}
							justify={"center"}
							bg={useColorModeValue("whiteAlpha.50", "whiteAlpha.800")}>
							<Stack spacing={3} mx={"auto"} maxW={"lg"} py={12} px={6}>
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
									bg={useColorModeValue("white", "gray.700")}
									boxShadow={"lg"}
									p={8}>
									<Stack spacing={4}>
										<HStack>
											<Box>
												<FormControl id="firstName" isRequired>
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
										<FormControl id="email" isRequired>
											<FormLabel>Email address</FormLabel>
											<Input type="email" />
										</FormControl>
										<FormControl id="password" isRequired>
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
										<Stack spacing={10} pt={2}>
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
												Already a user? <Link color={"blue.400"}>Login</Link>
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

export default Regist;
