import { Box, Input, Button, Text } from '@chakra-ui/react'

export default function Navigation() {
  return (
    <Box display={'flex'} flexDirection={'row'}>
        <Text>myTix</Text>
        <Input size={'md'} placeholder='Search an event...'/>
        <Button bg={'#FFD700'} color={'#917800'}>LOGIN</Button>
        <Button bg={'#F7F7F7'} color={'#333333'}>REGISTER</Button>
    </Box>
  )
}
