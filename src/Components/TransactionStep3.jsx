import { Flex, Box } from "@chakra-ui/react";
import { useSelector } from 'react-redux';

const TransactionStep3 = () => {
    // Access ticket quantities and grand total from Redux store
    const ticketQuantities = useSelector((state) => state.transaction.ticketQuantities);
    const totalPrices = useSelector((state) => state.transaction.totalPrices);
    const formData = useSelector((state) => state.transaction.formData);
    const { name, email, telepon, identitas, date, month, year } = formData;



    // Filter tiket yang memiliki jumlah lebih dari 0
    const selectedTickets = Object.keys(ticketQuantities).filter((ticketType) => ticketQuantities[ticketType] > 0);

    return (
        <>
            <Box display={"flex"} flexDirection="column" bgColor="#EDEDED" ml={40} mr={40} mt={2} borderTopRadius={10}>

                <div>
                    <p>Name: {name}</p>
                    <p>Email: {email}</p>
                    <p>Telepon: {telepon}</p>
                    <p>Identitas: {identitas}</p>
                    <p>Date: {date}</p>
                    <p>Month: {month}</p>
                    <p>Year: {year}</p>
                    {/* Display ticket quantities and grand total */}
                    {selectedTickets.map((ticketType) => (
                        <p key={ticketType}>
                            {ticketType}: {ticketQuantities[ticketType]}
                        </p>
                    ))}
                    <p>GrandTotal: {totalPrices}</p>
                    {/* ... other JSX ... */}
                </div>

            </Box>
        </>
    );
}

export default TransactionStep3;