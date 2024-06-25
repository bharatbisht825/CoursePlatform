import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { contactUs } from '../../redux/actions/other'

const Contact = ({user}) => {
    const [name,setName] = useState(user?user.name : "")
    const [email,setEmail] = useState(user?user.email : "")
    const [message,setMessage] = useState("")
    const {isLoading,message:contactMessage,error} = useSelector(state=>state.other)
    const dispatch = useDispatch()

    const submitHandler = (e) =>{
      e.preventDefault()
      dispatch(contactUs(name,email,message))
    }

    useEffect(() => {
      if(contactMessage){
        toast.success(contactMessage)
        dispatch({type:"clearMessage"})
      }
      if(error){
        toast.error(error)
        dispatch({type:"clearError"})
      }
    }, [dispatch,error,contactMessage])
    
  return (
    <Container h="95vh">
    <VStack h="full" justifyContent={"center"}>
        <Heading>Contact Us</Heading>
        <form onSubmit={submitHandler} style={{ width: '100%' }}>
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
            <FormLabel htmlFor="message">Message</FormLabel>

            <Textarea
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              placeholder="Enter your message..."
              focusBorderColor="yellow.500"
            />
          </Box>
         
          <Button my="4" w="full" colorScheme="yellow" type="submit" isLoading={isLoading}>
            Send
          </Button>
          <Box my="4" textAlign={"center"}>
            Would you like to request for a course ?
            <Link to="/request">
              <Button variant="link" colorScheme={'yellow'}>
                Click
              </Button>{''}
              here
            </Link>
          </Box>
        </form>
    </VStack>
      
    </Container>
  )
}

export default Contact
