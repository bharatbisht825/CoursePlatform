import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { courseRequest } from '../../redux/actions/other'

const Request = ({user}) => {
    const [name,setName] = useState(user?user.name : "")
    const [email,setEmail] = useState(user?user.email : "")
    const [course,setCourse] = useState("")
    const {isLoading,message:courseMessage,error} = useSelector(state=>state.other)
    const dispatch = useDispatch()

    const submitHandler = (e) =>{
      e.preventDefault()
      dispatch(courseRequest(name,email,course))
    }

    useEffect(() => {
      if(courseMessage){
        toast.success(courseMessage)
        dispatch({type:"clearMessage"})
      }
      if(error){
        toast.error(error)
        dispatch({type:"clearError"})
      }
    }, [dispatch,error,courseMessage])
  return (
    <Container h="95vh">
    <VStack h="full" justifyContent={"center"}>
        <Heading>Request New Course</Heading>
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
            <FormLabel htmlFor="course">Course</FormLabel>

            <Textarea
              id="course"
              value={course}
              onChange={e => setCourse(e.target.value)}
              required
              placeholder="Enter the course details..."
              focusBorderColor="yellow.500"
            />
          </Box>
         
          <Button my="4" w="full" colorScheme="yellow" type="submit" isLoading={isLoading}>
            Send
          </Button>
          <Box my="4" textAlign={"center"}>
            <Link to="/courses">
              <Button variant="link" colorScheme={'yellow'}>
                Click
              </Button>{''}
              here to see all the available courses !!!
            </Link>
          </Box>
        </form>
    </VStack>
      
    </Container>
  )
}

export default Request
