import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profile';

const ResetPassword = () => {
    const {token} = useParams();
    const [password,setPassword] = useState("")

    const {isLoading,message,error} = useSelector(state=>state.profile)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const submitHandler = (e) =>{
      e.preventDefault();
      dispatch(resetPassword(token,password))
    }

    useEffect(() => {
      if(error){
        toast.error(error)
        dispatch({type:"clearError"})
      }
      if(message){
        toast.success(message)
        dispatch({type:"clearMessage"})
        navigate("/login")
      }
    }, [dispatch,message,error])
    return (
      <Container h="95vh">
        <VStack height="full" justifyContent={"center"}>
          <Heading>Reset your password</Heading>
          <form onSubmit={submitHandler} style={{width:"100%"}}>
          <Box my={'4'}>
              <Input
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Enter your new password"
                type="password"
                focusBorderColor="yellow.500"
              />
            </Box>
            <Button isLoading={isLoading} width ="full" type="submit" colorScheme="yellow">Reset password</Button>
  
          </form>
  
        </VStack>
      </Container>
    )
}

export default ResetPassword
