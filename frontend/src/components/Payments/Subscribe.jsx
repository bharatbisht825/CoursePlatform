import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubscription } from '../../redux/actions/subscription';
import { server } from '../../redux/store';
import logo from '../../assets/images/logo.png';

const Subscribe = ({ user }) => {
  const [key, setKey] = useState('');
  const dispatch = useDispatch();
  const { isLoading, error, subscriptionId } = useSelector(
    state => state.subscription
  );
  const { error: courseError } = useSelector(state => state.course);

  const subscriptionHandler = async () => {
    const { data } = await axios.get(`${server}/getrazorpaykey`);
    setKey(data.key);
    dispatch(createSubscription());
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name: 'CourseBundler',
          description: 'Get access to all premium content',
          image: logo,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },
          notes: {
            address: 'Course Bundler @ Youtube',
          },
          theme: {
            color: '#FFC800',
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
  }, [
    dispatch,
    error,
    user.name,
    user.email,
    key,
    subscriptionId,
    courseError,
  ]);

  return (
    <Container minH="95vh" p="16">
      <Heading my="4" textAlign={'center'}>
        Welcome
      </Heading>
      <VStack
        boxShadow={'lg'}
        borderRadius={'lg'}
        alignItems="stretch"
        spacing="0"
      >
        <Box bg="yellow.400" p="4" css={{ borderRadius: '8px 8px 0 0' }}>
          <Text
            fontWeight={'bold'}
            textAlign="center"
            fontSize="sm"
            fontFamily={'cursive'}
          >
            Pro Pack - ₹299.00
          </Text>
        </Box>
        <Box p="4">
          <VStack textAlign={'center'} px="8" mt="4" spacing="8">
            <Text fontFamily={'cursive'}>
              Join pro pack and get access to all content
            </Text>
            <Heading size="md">₹299 Only</Heading>
          </VStack>
          <Button
            my="8"
            width="full"
            colorScheme={'yellow'}
            isLoading={isLoading}
            onClick={subscriptionHandler}
          >
            Buy Now
          </Button>
        </Box>
        <Box bg="blackAlpha.600" p="4" css={{ borderRadius: '0 0 8px 8px' }}>
          <Heading color="white" textTransform={'uppercase'} size="sm">
            100% refund at cancellation
          </Heading>
          <Text fontSize={'xs'} color="white">
            *Terms &amp; Conditions apply
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
