import {
    Button,
  Container,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import cursor from '../../../assets/images/cursor.png';
import { createCourse } from '../../../redux/actions/admin';
import { fileUploadCss } from '../../Auth/SignUp';
import Sidebar from '../Sidebar';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const dispatch = useDispatch()

  const {isLoading,message,error} = useSelector(state=>state.admin)

  const categories = [
    'Web Development',
    'Artificial Intelligence',
    'Data Structures and Algorithms',
    'App Development',
    'Data Science',
    'Game Development',
  ];

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = (e) =>{
   e.preventDefault();
   const myForm = new FormData();
   myForm.append("title",title)
   myForm.append("description",description)
   myForm.append("createdBy",createdBy)
   myForm.append("category",category)
   myForm.append("file",image)
   dispatch(createCourse(myForm))

  }

  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch({type:"clearError"})
    }
    if(message){
      toast.success(message)
      dispatch({type:"clearMessage"})
    }
  },[dispatch,message,error])
  return (
    <Grid
      minH="100vh"
      templateColumns={['1fr', '5fr 1fr']}
      css={{
        cursor: `url(${cursor}),default`,
      }}
    >
      <Container py="16">
        <form onSubmit={submitHandler}>
          <Heading textAlign={'center'} mb="8" mt="4">
            Create Course
          </Heading>
          <VStack spacing="8" m="auto">
            <Input
              required
              type="text"
              placeholder="Course Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              focusBorderColor="purple.300"
            />
            <Input
              required
              type="text"
              placeholder="Course Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              focusBorderColor="purple.300"
            />
            <Input
              required
              type="text"
              placeholder="Creator Name"
              value={createdBy}
              onChange={e => setCreatedBy(e.target.value)}
              focusBorderColor="purple.300"
            />
            <Select
              required
              focusBorderColor="purple.300"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Category</option>
              {categories.map(item => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Input
              accept="image/*"
              required
              type="file"
              focusBorderColor="purple.500"
              css={{
                '&::file-selector-button': {
                  ...fileUploadCss,
                  color: 'purple',
                },
              }}
              onChange={changeImageHandler}
            />
            {imagePrev && (
              <Image src={imagePrev} boxSize="64" objectFit="contain" />
            )}
            <Button w="full" colorScheme="purple" type="submit" isLoading={isLoading}>Create</Button>
          </VStack>
        </form>
      </Container>
      <Sidebar />
    </Grid>
  );
};

export default CreateCourse;
