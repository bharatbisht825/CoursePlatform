import React from 'react';
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import vg from '../../assets/images/bg.png';
import introVideo from '../../assets/videos/intro.mp4';
import './home.css';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import { DiAws } from 'react-icons/di';
const Home = () => {
  return (
    <section className="homeContainer">
      <div className="container">
        <Stack
          direction={['column', 'row']}
          height="100%"
          justifyContent={['center', 'space-between']}
          spacing={['16', '56']}
          alignItems="center"
        >
          {/* <div>1</div>
                <div>2</div> */}
          <VStack
            width={'full'}
            alignItems={['center', 'flex-start']}
            spacing="8"
          >
            <Heading size={'2xl'} textAlign={['center', 'left']}>
              LEARN FROM THE EXPERTS
            </Heading>
            <Text
              fontSize={'2xl'}
              fontFamily="cursive"
              textAlign={['center', 'left']}
            >
              Get valuable content at reasonable price
            </Text>
            <Link to="/courses">
              <Button size={'lg'} colorScheme="yellow">
                Explore Now
              </Button>
            </Link>
          </VStack>
          <Image
            className="vector-graphics"
            boxSize={'md'}
            src={vg}
            objectFit="contain"
          />
        </Stack>
      </div>
      <Box padding={'8'} bgColor={'blackAlpha.700'}>
        <Heading textAlign={'center'} fontFamily="body" color={'yellow.400'}>
          Our Brands
        </Heading>
        <HStack
          className="brandsBanner"
          justifyContent="space-evenly"
          marginTop="4"
        >
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>
      <div className="container2">
        <video
          autoPlay
          controls
          src={introVideo}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
        ></video>
      </div>
    </section>
  );
};

export default Home;
