import {
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
import { login } from '../../redux/actions/user';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()

  const submitHandler = (e) =>{
    e.preventDefault();
    dispatch(login(email,password))
  }
  return (
    <Container h={'95vh'}>
      <VStack h="full" justifyContent={'center'} spacing={'16'}>
        <Heading>Welcome to Course Bundler</Heading>
        <form style={{ width: '100%' }} onSubmit={submitHandler}>
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
          <Box>
            <Link to="/forgotpassword">
              <Button fontSize="sm" variant="link">
                Forgot password?
              </Button>
            </Link>
          </Box>
          <Button my="4" colorScheme="yellow" type="submit">
            Login
          </Button>
          <Box my="4">
            New User ?{' '}
            <Link to="/signup">
              <Button variant="link" colorScheme={'yellow'}>
                Sign Up
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Login;
