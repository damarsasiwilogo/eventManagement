import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	FormControl,
	Input,
	FormLabel,
} from "@chakra-ui/react";

export default function Form() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	// const initialRef = useRef(null);
	// const finalRef = useRef(null);
	return (
		<>
			<Button onClick={onOpen}>Create Event</Button>
			<Modal
				isOpen={isOpen}
				onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create Event</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Event Name</FormLabel>
							<Input placeholder="Event Name" />
						</FormControl>

            <FormControl mt={4}>
              <FormLabel>Date & Time</FormLabel>
              <Input placeholder="Select date and time" type="datetime-local" />
            </FormControl>

            
            <FormControl mt={4}>
              <FormLabel>Location</FormLabel>
              <Input placeholder="Location" />
            </FormControl>

						<FormControl mt={4}>
							<FormLabel>Location</FormLabel>
							<Input placeholder="Location" />
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Description</FormLabel>
							<Input
								placeholder="Description"
								h={"50px"}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={onClose}>
							Save
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
