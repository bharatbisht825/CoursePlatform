import {
  Avatar,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromPlaylist, updateProfilePicture } from '../../redux/actions/profile';
import { cancelSubscription } from '../../redux/actions/subscription';
import { loadUser } from '../../redux/actions/user';
import { fileUploadCss } from '../Auth/SignUp';

const Profile = ({user}) => {
  // const user = {
  //   name: 'Kavya',
  //   email: 'kavya@gmail.com',
  //   createdAt: new Date().toISOString(),
  //   role: 'user',
  //   subscription: {
  //     status: 'active',
  //   },
  //   playlist: [
  //     {
  //       course: 'abcdef',
  //       poster:
  //         'https://www.webhopers.in/uploads/1/web-development-course-in-panchkula.png',
  //     },
  //   ],
  // };

  const removeFromPlaylistHandler = async (id) => {
    await dispatch(removeFromPlaylist(id))
    dispatch(loadUser())
  };

  const {isLoading,message,error} = useSelector(state=>state.profile)
  const {isLoading:subscriptionLoading,message:subscriptionMessage,error:errorMessage} = useSelector(state=>state.subscription)

  const dispatch = useDispatch()
  const updateImageSubmitHandler = async(e,image) =>{
       e.preventDefault();
       const myForm = new FormData();
       myForm.append("file",image)
       await dispatch(updateProfilePicture(myForm))
       dispatch(loadUser())
  }

  const cancelSubscriptionHandler = () =>{
   dispatch(cancelSubscription())
  }

  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch({type:"clearError"})
    }
    if(message){
      toast.success(message)
      setTimeout(()=>{
        dispatch({type:"clearMessage"})
      },1000)
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch({type:"clearError"})
    }
    if(subscriptionMessage){
      toast.success(subscriptionMessage)
      dispatch(loadUser())
      setTimeout(()=>{
        dispatch({type:"clearMessage"})
      },1000)
    }
  }, [dispatch,message,error,errorMessage,subscriptionMessage])

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Container minH="95vh" maxW={'container.lg'} py="8">
      <Heading m="8" textTransform="uppercase">
        Profile
      </Heading>
      <Stack
        justifyContent="flex-start"
        alignItems="center"
        direction={['column', 'row']}
        spacing={['8', '16']}
        p="8"
      >
        <VStack>
          <Avatar boxSize="48" src={user.avatar.url}/>
          <Button onClick={onOpen} colorScheme="yellow" variant="ghost">
            Change Photo
          </Button>
        </VStack>
        <VStack spacing="4" alignItems={['center', 'flex-start']}>
          <HStack>
            <Text fontWeight="bold">Name</Text>
            <Text>{user.name}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="bold">Email</Text>
            <Text>{user.email}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="bold">Created At</Text>
            <Text>{user.createdAt.split('T')[0]}</Text>
          </HStack>
          {user.role !== 'admin' && (
            <HStack>
              <Text fontWeight="bold">Subscription</Text>
              {user.subscription && user.subscription.status === 'active' ? (
                <Button variant="unstyled" color={'yellow.500'} onClick={cancelSubscriptionHandler} isLoading={subscriptionLoading}>
                  Cancel Subscription
                </Button>
              ) : (
                <Link to="/subscribe">
                  <Button colorScheme={'yellow'}>Subscribe</Button>
                </Link>
              )}
            </HStack>
          )}
          <Stack alignItems="center" direction={['column', 'row']}>
            <Link to="/updateprofile">
              <Button>Update Profile</Button>
            </Link>
            <Link to="/changepassword">
              <Button>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>
      <Heading size="md" my="8">
        Playlist
      </Heading>
      {user.playlist.length>0 && (
        <Stack
          alignItems="center"
          p="4"
          flexWrap="wrap"
          direction={['column', 'row']}
        >
          {user.playlist.length>0 && user.playlist.map(playlistItem => (
            <VStack w="48" m="2" key={playlistItem.course}>
              <Image
                boxSize="full"
                src={playlistItem.poster}
                objectFit="contain"
              />
              <HStack>
                <Link to={`/course/${playlistItem.course}`}>
                  <Button variant="ghost" colorScheme="yellow">
                    Watch Now
                  </Button>
                </Link>
                <Button
                isLoading={isLoading}
                  variant="ghost"
                  color="red"
                  onClick={() => removeFromPlaylistHandler(playlistItem.course)}
                >
                  <RiDeleteBin7Fill />
                </Button>
              </HStack>
            </VStack>
          ))}
        </Stack>
      )}
      <ChangePhotoModal isLoading={isLoading} isOpen={isOpen} onClose={onClose} updateImageSubmitHandler={updateImageSubmitHandler} />
    </Container>
  );
};
export default Profile;

function ChangePhotoModal({ isOpen, onClose, updateImageSubmitHandler,isLoading }) {
  const [image, setImage] = useState('');
  const [imageprev, setImagePrev] = useState('');
  const updateImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };

  };

  const closeHandler = () =>{
    onClose();
    setImagePrev("");
    setImage("")
  }
  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalHeader>Update profile photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={(e)=>updateImageSubmitHandler(e,image)}>
              <VStack spacing={'8'}>
                {imageprev && <Avatar src={imageprev} boxSize="48" />}
                <Input
                  required
                  type="file"
                  css={{
                    '&::file-selector-button': fileUploadCss,
                  }}
                  onChange={updateImageHandler}
                />
                <Button w="full" colorScheme="yellow" type="submit" isLoading={isLoading}>
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button mr="3" onClick={closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
