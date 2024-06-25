import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { Link, useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {

  const reference = useSearchParams()[0].get("reference")
  return (
    <Container h="95vh" p="16"> 
      <Heading textAlign={"center"} my="4">You have Pro Pack</Heading>
      <VStack boxShadow="lg" borderRadius="lg" alignItems="center" pb="8" spacing="0">
       <Box w="full" p="4" bg="yellow.400" css={{borderRadius:"8px 8px 0 0"}}>
        <Text textAlign={"center"} size="md" fontFamily="cursive" fontWeight="bold">Payment Success</Text>

       </Box>
       <Box p="4">
        <VStack textAlign={"center"} px="8" mt="4" spacing="8">
         <Text size="sm" fontFamily={"cursive"}>Congratulations, you're a pro member now. You have access to all the premium content.</Text>
        <Heading size="4xl" color="green">
            <RiCheckboxCircleFill />
        </Heading>
        </VStack>
       </Box>
       <Link to="/profile">
        <Button variant="ghost" colorScheme="yellow">Go to profile</Button>
       </Link>
       <Heading size="xs">Reference : {reference}</Heading>
      </VStack>
    </Container>
  )
}

export default PaymentSuccess
