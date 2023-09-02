import { Box, Button, Text, Progress, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Flex, Image } from "@chakra-ui/react";
import { useParams } from "react-router";
import React, { useState } from "react";
import { useEffect } from "react";
import api from "../api"
import TransactionStep1 from "../Components/TransactionStep1";
import TransactionStep2 from "../Components/TransactionStep2";
import TransactionStep3 from "../Components/TransactionStep3";
import TransactionStep4 from "../Components/TransactionStep4";
import { useNavigate } from "react-router-dom";


function Transaction({ event }) {
    const { id } = useParams();
    const [events, setEvents] = useState([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [remainingTime, setRemainingTime] = useState(15 * 60); // Waktu dalam detik (15 menit)
    const [isTimeUpModalOpen, setIsTimeUpModalOpen] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const interval = setInterval(() => {
            if (remainingTime > 0) {
                setRemainingTime(remainingTime - 1);
            } else {
                clearInterval(interval);
                openTimeUpModal(); // Buka modal saat waktu habis
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [remainingTime]);

    useEffect(() => {
        api.get(`/events/${id}`).then((res) => {
            setEvents([res.data])
        });
    }, []);

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <TransactionStep1 onNext={handleNext} />;
            case 2:
                return <TransactionStep2 onNext={handleNext} />;
            case 3:
                return <TransactionStep3 onNext={handleNext} />;
            case 4:
                return <TransactionStep4 />;
            default:
                return null;
        }
    };

    const calculateProgress = () => {
        switch (currentStep) {
            case 1:
                return 25;
            case 2:
                return 50;
            case 3:
                return 75;
            case 4:
                return 100;
            default:
                return 0;
        }
    };

    const stepTexts = [
        "Pilih Kategori",
        "Informasi Personal",
        "Konfirmasi",
        "Bayar"
    ];

    const buttonProgress = () => {
        switch (currentStep) {
            case 1:
                return "Checkout";
            case 2:
                return "Konfirmasi";
            case 3:
                return "Konfirmasi";
            case 4:
                return "Bayar";
            default:
                return 0;
        }
    };

    const openTimeUpModal = () => {
        setIsTimeUpModalOpen(true);
    };

    const closeTimeUpModal = () => {
        setIsTimeUpModalOpen(false);
    };


    return (
        <>
            <Box display={"flex"} justifyContent="flex-start" bg={"#331F69"} alignItems={"center"} h={"10vh"}>
                <Text fontSize={"2xl"} fontWeight={"bold"} px={"15px"} color={"white"} ml={10}>
                    myTix
                </Text>
            </Box>
            <Box display={"flex"} flexDirection="column" justifyContent="center" bgColor="#EDEDED" alignItems={"center"} h={"10vh"} ml={40} mr={40} mt={2} borderRadius={10}>
                <Flex direction={"column"} justifyContent={"center"} alignItems={"center"} mt={5}>
                    <Text fontSize={"md"} fontWeight={"bold"} mt={10} my={-2}>
                        WAKTU TERSISA
                    </Text>
                    <Text fontSize={"4xl"} fontWeight={"bold"} mb={2} color={"red"}>
                        {(Math.floor(remainingTime / 60)).toString().padStart(2, "0")} : {(remainingTime % 60).toString().padStart(2, "0")}
                    </Text>
                </Flex>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" h="5vh" ml={60} mr={60}>
                {stepTexts.map((text, index) => (
                    <Text
                        key={index}
                        fontSize="lg"
                        fontWeight={index === currentStep - 1 ? "bold" : "normal"}
                    >
                        {text}
                    </Text>
                ))}
            </Box>
            {/* Progress Bar */}
            <Box display="flex" flexDir="column" justifyContent="center" ml={40} mr={40} borderRadius={10}>
                <Progress mx="4px" value={calculateProgress()} size="sm" colorScheme="facebook" borderRadius={10} hasStripe />
            </Box>

            {renderStep()}

            <Box display={"flex"} bgColor="#EDEDED" justifyContent={"flex-end"} h={"10vh"} ml={40} mr={40} mb={5} borderBottomRadius={10}>
                {currentStep > 1 && (
                    <Button
                        bg={"#F7F7F7"}
                        color={"#2e4583"}
                        size="sm"
                        mr={4}
                        mt={5}
                        w={"90px"}
                        onClick={handlePrevious}
                    >
                        Kembali
                    </Button>
                )}
                <Button
                    colorScheme="facebook"
                    color={"white"}
                    _hover={{ bg: "#24105c" }}
                    size="sm"
                    mr={20}
                    mt={5}
                    w={"90px"}
                    onClick={handleNext}>
                    {buttonProgress()}
                </Button>

            </Box>
            <Modal isOpen={isTimeUpModalOpen} onClose={closeTimeUpModal} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Warning</ModalHeader>
                    <ModalBody>
                        Waktu telah habis. Silakan kembali ke halaman utama.
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={() => {
                            closeTimeUpModal();
                            navigate('/');
                        }}>
                            OK
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default Transaction;
