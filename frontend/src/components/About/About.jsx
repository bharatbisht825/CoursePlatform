import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import introVideo from '../../assets/videos/intro.mp4';
import termsAndConditions from '../../assets/docs/termsAndCondition';

const Founder = () => {
  return (
    <Stack direction={['column', 'row']} padding={'8'} spacing={['4', '16']}>
      <VStack>
        <Avatar boxSize={['40', '48']} />
        <Text opacity={0.7}>Co-Founder</Text>
      </VStack>
      <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
        <Heading textAlign={['center', 'left']} size={['md', 'xl']}>
          Jeetu Bangari
        </Heading>
        <Text textAlign={['center', 'left']}>
          Hi, we are passionate full-stack developers. Our mission is to provide
          quality content at a reasonable price.
        </Text>
      </VStack>
    </Stack>
  );
};

const VideoPlayer = () => {
  return (
    <Box>
      <video
        autoPlay
        loop
        muted
        controls
        src={introVideo}
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
      ></video>
    </Box>
  );
};

const TermsAndConditions = ({ termsAndConditions }) => {
  return (
    <Box textAlign={['center', 'left']}>
      <Heading size="md" my="4">
        Terms &amp; Conditions
      </Heading>
      <Box h="sm" p="4" overflowY={'scroll'}>
        <Text fontFamily="heading" letterSpacing={'widest'}>
          {termsAndConditions}
        </Text>
        <Heading size="xs" my="4">
          Refund is only applicable for cancellation within 7 days
        </Heading>
      </Box>
    </Box>
  );
};
const About = () => {
  return (
    <Container maxW={'container.lg'} padding="16" boxShadow={'lg'}>
      <Heading textAlign={['center', 'left']}>About Us</Heading>
      <Founder />
      <Stack m="8" direction={['column', 'row']} alignItems="center">
        <Text fontFamily={'cursive'} m="8" textAlign={['center', 'left']}>
          We are a video streaming platform with some premium courses available
          only for premium users
        </Text>
        <Link to="/subscribe">
          <Button colorScheme="yellow" variant="ghost">
            Checkout Our Plan
          </Button>
        </Link>
      </Stack>
      <VideoPlayer />
      <TermsAndConditions termsAndConditions={termsAndConditions} />
      <HStack my="4" p="4">
        <RiSecurePaymentFill />
        <Heading
          textTransform={'uppercase'}
          fontFamily="sans-serif"
          size={'xs'}
        >
          Payment is secured by Razorpay
        </Heading>
      </HStack>
    </Container>
  );
};

export default About;
