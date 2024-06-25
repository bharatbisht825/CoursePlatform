import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';

const UpdateProfile = ({user}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const submitHandler = async(e) => {
    e.preventDefault();
    await dispatch(updateProfile(name,email))
  
    await dispatch(loadUser()) 
    
    navigate("/profile") 
  }

  const {isLoading} = useSelector(state=>state.profile)

  return (
    <Container py="16" minH={'95vh'}>
      <form onSubmit={submitHandler}>
        <Heading my="16" textAlign="center">
          Update Profile
        </Heading>
        <VStack spacing="8">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            focusBorderColor="yellow.500"
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            focusBorderColor="yellow.500"
          />
          <Button width="full" isLoading={isLoading} type="submit" colorScheme="yellow">
            Update profile
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
