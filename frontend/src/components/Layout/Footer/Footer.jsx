import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  TiSocialYoutubeCircular,
  TiSocialInstagramCircular,
} from 'react-icons/ti';
import { DiGithub } from 'react-icons/di';

const Footer = () => {
  return (
    <Box padding={'4'} bg="blackAlpha.900" minH={'10vh'}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width="full">
          <Heading color={'white'}>All Rights Reserved</Heading>
          <Heading fontFamily={'body'} size="sm" color={'yellow.400'}>
            @Jeetu Bangari
          </Heading>
        </VStack>
        <HStack
          spacing={['2', '10']}
          justifyContent="center"
          color="white"
          fontSize="50"
        >
          <a href="https://youtube.com" target="blank" rel="noreferrer">
            <TiSocialYoutubeCircular />
          </a>

          <a href="https://www.instagram.com" target="blank" rel="noreferrer">
            <TiSocialInstagramCircular />
          </a>
          <a
            href="https://github.com/jeetu1603"
            target="blank"
            rel="noreferrer"
          >
            <DiGithub />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
