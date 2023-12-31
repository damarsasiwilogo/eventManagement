import { Box, Button, Text, Progress, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Flex, Image, useToast } from "@chakra-ui/react";
import { useParams } from "react-router";
import React, { useState } from "react";
import { useEffect } from "react";
import api from "../api";
import TransactionStep1 from "../Components/TransactionStep1";
import TransactionStep2 from "../Components/TransactionStep2";
import TransactionStep3 from "../Components/TransactionStep3";
import { useNavigate } from "react-router-dom";
import { resetTransaction } from "../slices/transactionSlices";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch
import { Spinner, Center } from "@chakra-ui/react";
import Footer from "../Components/Footer";
import Navigation from "../Components/Navigation";


function Transaction() {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [currentStep, setCurrentStep] = useState(1); // deklarasikan state transaction berada di step 1
  const [remainingTime, setRemainingTime] = useState(15 * 60); // Waktu dalam detik (15 menit)
  const [isTimeUpModalOpen, setIsTimeUpModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ticketQuantities = useSelector((state) => state.transaction.ticketQuantities);
  const toast = useToast();
  const [isButtonVisible, setButtonVisibility] = useState(true);

  //membuat setiap interval setiap 1000ms/1 detik akan mengurangi state remaining time  - 1detik
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


  //fetching data from json
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

  //ketika pertama kali merender TransactionStep1 akan mereset redux transaction. 
  useEffect(() => {
    // Reset the Redux store when rendering TransactionStep1
    dispatch(resetTransaction());
  }, [dispatch]);

  //function untuk menghandle tombol konfirmasi yang akan merender transaction step selanjutnya
  const handleNext = async () => {
    if (!isConfirmationModalOpen) {
      setIsLoading(true);
      // Set loading to true before transitioning
      // Simulate a delay for loading effect (you can replace this with actual data fetching)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCurrentStep(currentStep + 1);
      setIsLoading(false); // Set loading to false after transitioning
      setButtonVisibility(true);
    }
  };

  //function untuk meghandle tombol kembali

  const handlePrevious = async () => {
    if (currentStep == 2) {
      setIsLoading(true); // Set loading to true before transitioning
      // Simulate a delay for loading effect (you can replace this with actual data fetching)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCurrentStep(currentStep - 1);
      setIsLoading(false);
      dispatch(resetTransaction());
    }
    if (currentStep > 2) {
      setIsLoading(true); // Set loading to true before transitioning
      // Simulate a delay for loading effect (you can replace this with actual data fetching)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCurrentStep(currentStep - 1);
      setIsLoading(false);
    }
  };

  // 3 transaction step akan di bungkus dengan function renderstep
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <TransactionStep1 onNext={handleNext} isLoading={isLoading} />;
      case 2:
        return (
          <Flex>
            <TransactionStep2 onNext={handleNext} onPrevious={handlePrevious} isLoading={isLoading} />
          </Flex>
        );
      case 3:
        return <TransactionStep3 onNext={handleNext} onPrevious={handlePrevious} isLoading={isLoading} />;
      default:
        return null;
    }
  };

  //untuk set value progressbar berdasarkan step

  const calculateProgress = () => {
    switch (currentStep) {
      case 1:
        return 25;
      case 2:
        return 50;
      case 3:
        return 100;
      default:
        return 0;
    }
  };

  const stepTexts = ["Pilih Kategori", "Informasi Personal", "Pembayaran"];
  const openTimeUpModal = () => {
    setIsTimeUpModalOpen(true);
  };

  const closeTimeUpModal = () => {
    setIsTimeUpModalOpen(false);
  };

  //function untuk untuk memberikan peringatan ketika tidak ada tiket yang dipilih namun melakukan checkout

  const handleConfirmation = () => {
    if (ticketQuantities.Gold === 0 && ticketQuantities.Platinum === 0 && ticketQuantities.Diamond === 0) {
      setIsConfirmationModalOpen(true);
    } else {
      handleNext();
      setButtonVisibility(false);
    }
  };

  const closeModal = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <>
      <Navigation needLogin>
        <Box>
          <Box display={"flex"} flexDirection="column" justifyContent="center" bgColor="white" alignItems={"center"} h={"10vh"} ml={{ lg: "40" }} mr={{ lg: "40" }} mt={2} borderRadius={10}>
            <Flex direction={"column"} ml={{ lg: "18px" }} justifyContent={"center"} alignItems={"center"} mt={5}>
              <Text fontSize={{ base: "md" }} fontWeight={"bold"} mt={10} my={1}>
                WAKTU TERSISA
              </Text>
              <Text fontSize={{ base: "xl", md: "xl", lg: "3xl" }} fontWeight={"bold"} mb={2} color={"red"}>
                {Math.floor(remainingTime / 60)
                  .toString()
                  .padStart(2, "0")}{" "}
                : {(remainingTime % 60).toString().padStart(2, "0")}
              </Text>
            </Flex>
          </Box>
          <Box display="flex" justifyContent="space-around" gap={2} alignItems="center" h="5vh">
            {stepTexts.map((text, index) => (
              <Text key={index} fontSize={{base: "14px", lg: "lg"}} fontWeight={index === currentStep - 1 ? "bold" : "normal"}>
                {text}
              </Text>
            ))}
          </Box>
          {/* Progress Bar */}
          <Box display="flex" flexDir="column" justifyContent="center" ml={{ lg: "40" }} mr={{ lg: "40" }} borderRadius={10}>
            <Progress mx="4px" value={calculateProgress()} size="sm" colorScheme="facebook" borderRadius={10} hasStripe />
          </Box>

          {isLoading ? (
            <Center h="80vh" mx={40}>
              <Spinner size="xl" thickness="6px" color="#331F69" />
            </Center>
          ) : (
            renderStep()
          )}
          <Flex justifyContent={{ base: "center", md: "center", lg: "flex-end" }} mr={{ lg: "80" }}>
            {currentStep == 1 && isButtonVisible &&(
              <Box display={"flex"} justifyContent={{ base: "center", lg: "flex-end" }} w={{ base: "20vw" }} h={"10vh"} mb={5} borderBottomRadius={10}>
                  <Button
                    colorScheme="facebook"
                    color="white"
                    _hover={{ bg: "#24105c" }}
                    size="sm"
                    mr={{ lg: "10" }}
                    mt={5}
                    w="90px"
                    onClick={() => {
                      handleConfirmation();
                    }}
                  >
                    Checkout
                  </Button>
              </Box>
            )}
          </Flex>

          <Modal isOpen={isTimeUpModalOpen} onClose={closeTimeUpModal} isCentered blockScrollOnMount={true} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Warning</ModalHeader>
              <ModalBody>Waktu telah habis. Silakan kembali ke halaman utama.</ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    closeTimeUpModal();
                    navigate("/");
                  }}
                >
                  OK
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Modal isOpen={isConfirmationModalOpen} onClose={closeModal} isCentered blockScrollOnMount={true} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirmation</ModalHeader>
              <ModalBody>Kamu belum memilih tiket</ModalBody>
              <ModalFooter>
                <Button colorScheme="facebook" color="white" _hover={{ bg: "#24105c" }} onClick={closeModal}>
                  OK
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        <Footer />
      </Navigation>
    </>
  );
}
export default Transaction;
