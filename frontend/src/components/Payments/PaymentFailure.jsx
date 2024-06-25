import { Button, Container, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const PaymentFailure = () => {
  return (
    <Container h="90vh">
      <VStack justifyContent="center" h="full" spacing="4">
        <RiErrorWarningFill size="5rem" color="red" />
        <Heading textTransform={'uppercase'}>Payment Failed</Heading>
        <Link to="/subscribe">
          <Button variant="ghost" colorScheme="green">
            Try Again
          </Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default PaymentFailure;
