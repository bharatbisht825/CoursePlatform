import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../redux/actions/profile';

const ForgotPassword = () => {
    const [email,setEmail] = useState("")

    const {isLoading,message,error} = useSelector(state=>state.profile)
    const dispatch = useDispatch();

    const submitHandler = (e) =>{
      e.preventDefault();
      dispatch(forgotPassword(email))
    }

    useEffect(() => {
      if(error){
        toast.error(error)
        dispatch({type:"clearError"})
      }
      if(message){
        toast.success(message)
        dispatch({type:"clearMessage"})
      }
    }, [dispatch,message,error])
  return (
    <Container h="95vh">
      <VStack height="full" justifyContent={"center"}>
        <Heading>Recover your password</Heading>
        <form onSubmit={submitHandler} style={{width:"100%"}}>
        <Box my={'4'}>
            <Input
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
              type="email"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Button isLoading={isLoading} width ="full" type="submit" colorScheme="yellow">Send reset link</Button>

        </form>

      </VStack>
    </Container>
  )
}

export default ForgotPassword
