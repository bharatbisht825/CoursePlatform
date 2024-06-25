import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../redux/actions/profile'

const ChangePassword = () => {

    const [oldPassword,setOldPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")

    const dispatch = useDispatch()
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(changePassword(oldPassword,newPassword))
    }

    const {isLoading,message,error} = useSelector(state=>state.profile)

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
    <Container py="16" minH={"95vh"}>
      <form onSubmit={submitHandler}>
        <Heading my="16" textAlign="center">Change Password</Heading>
        <VStack spacing="8">
        <Input required type="password" placeholder="Enter you old password" 
        value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}
        focusBorderColor="yellow.500"/>
        <Input required type="password" placeholder="Enter you new password" 
        value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}
        focusBorderColor="yellow.500"/>
        <Button width="full" isLoading={isLoading} type="submit" colorScheme="yellow">Update Password</Button>
        </VStack>
        
      </form>
    </Container>
  )
}

export default ChangePassword
