import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signUp } from '../../redux/actions/user';

export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  height: '100%',
  width: '110%',
  border: 'none',
  color: '#ECC94B',
  backgroundColor: 'white',
};
const fileUploadStyle = {
  '&::file-selector-button': fileUploadCss,
};

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('file', image);
    dispatch(signUp(myForm));
  };

  return (
    <Container minH={'100vh'}>
      <VStack h="full" justifyContent={'center'}>
        <Heading my="4">Sign Up</Heading>
        <form onSubmit={submitHandler} style={{ width: '100%' }}>
          <Box my="4" display={'flex'} justifyContent={'center'}>
            <Avatar src={imagePrev} size="2xl" />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="Enter your name"
              type="text"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
              type="email"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              type="password"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="chooseAvatar">Choose Avatar</FormLabel>
            <Input
              id="chooseAvatar"
              accept="image/*"
              required
              type="file"
              focusBorderColor="yellow.500"
              css={fileUploadStyle}
              onChange={changeImageHandler}
            />
          </Box>
          <Button my="4" colorScheme="yellow" type="submit">
            Sign Up
          </Button>
          <Box my="4">
            Already Signed Up ?{' '}
            <Link to="/login">
              <Button variant="link" colorScheme={'yellow'}>
                Login
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default SignUp;
