import { Box, Button, Divider, Flex, Image, Table, Tbody, Td, Text, Th, Thead, Tr, Progress } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import TransactionStep1 from "../Components/TransactionStep1";
import TransactionStep2 from "../Components/TransactionStep2";
import TransactionStep3 from "../Components/TransactionStep3";
import TransactionStep4 from "../Components/TransactionStep4";


function Transaction() {
    const [currentStep, setCurrentStep] = useState(1);
    const [remainingTime, setRemainingTime] = useState(15 * 60); // Waktu dalam detik (15 menit)

    useEffect(() => {
        const interval = setInterval(() => {
            if (remainingTime > 0) {
                setRemainingTime(remainingTime - 1);
            } else {
                clearInterval(interval);
                // Waktu habis, lakukan pengaturan ulang atau merender ulang komponen
                // Misalnya: setCurrentStep(1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [remainingTime]);

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
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


    return (
        <>
            <Box display={"flex"} justifyContent="flex-start" bg={"#331F69"} alignItems={"center"} h={"10vh"}>
                <Text fontSize={"2xl"} fontWeight={"bold"} px={"15px"} color={"white"} ml={10}>
                    myTix
                </Text>
            </Box>
            <Box display={"flex"} justifyContent="center" alignItems={"center"} h={"30vh"} ml={40} mr={40} mt={5} bgImage="url('https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/tgroupbanner/20230716041255.png')" bgRepeat="no-repeat" bgSize="cover" bgPos="center" borderRadius={10}>
            </Box>
            <Box display={"flex"} flexDirection="column" justifyContent="center" bgColor="#EDEDED" alignItems={"center"} h={"10vh"} ml={40} mr={40} mt={2} borderRadius={10}>
                <Text fontSize={"md"} fontWeight={"bold"} mt={2}>
                    WAKTU TERSISA
                </Text>
                <Text fontSize={"4xl"} fontWeight={"bold"} mb={2} color={"red"}>
                    {Math.floor(remainingTime / 60)} : {(remainingTime % 60).toString().padStart(2, "0")}
                </Text>
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
                <Progress mx="4px" value={calculateProgress()} size="md" colorScheme="facebook" borderRadius={10} />
            </Box>

            {renderStep()}
            <Box display={"flex"} bgColor="#EDEDED" justifyContent="flex-end" h={"10vh"} ml={40} mr={40} mb={5} borderBottomRadius={10}>
                <Button colorScheme="whatsapp" size="sm" mr={20} mt={5} onClick={handleNext}>
                {buttonProgress()}
                </Button>
            </Box>
        </>
    )
}
export default Transaction;
