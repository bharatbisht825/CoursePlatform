import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../../redux/actions/course';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import Loader from '../Layout/Loader/Loader';

const Course = ({
  title,
  description,
  views,
  imageSrc,
  creator,
  id,
  lectureCount,
  addToPlayListHandler,
  isLoading
}) => {
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
      <Heading
        size={'sm'}
        textAlign={['center', 'left']}
        maxW="200px"
        fontFamily={'sans-serif'}
        noOfLines={3}
      >
        {title}
      </Heading>
      <Text fontFamily={"cursive"} noOfLines={2}>{description}</Text>
      <HStack fontSize="sm">
        <Text  fontWeight={'bold'} textTransform={"uppercase"} noOfLines={2}>
          Creator -
        </Text>

        <Text fontFamily={'cursive'} noOfLines={2} textTransform="capitalize">
          {creator}
        </Text>
      </HStack>
      <Heading size="xs" textTransform="uppercase">Lectures - {lectureCount}</Heading>
      <Heading size="xs" textTransform="uppercase">Views - {views}</Heading>
      <Stack direction={['column', 'row']} alignItems="center">
        <Link to={`/course/${id}`}>
          <Button colorScheme={'yellow'}>Watch Now</Button>
        </Link>
        <Button
         isLoading={isLoading}
          variant={'ghost'}
          colorScheme={'yellow'}
          onClick={() => addToPlayListHandler(id)}
        >
          Add to playlist
        </Button>
      </Stack>
    </VStack>
  );
};
const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const addToPlayListHandler = async courseId => {
    await dispatch(addToPlaylist(courseId))
    dispatch(loadUser())
  };
  const categories = [
    'All Courses',
    'Web Development',
    'Artificial Intelligence',
    'Data Structures and Algorithms',
    'App Development',
    'Data Science',
    'Game Development',
  ];
  const { isLoading, courses, error,message } = useSelector(state => state.course);
  useEffect(() => {
    dispatch(getAllCourses(keyword, category));
    if (error) {
      toast.error(error);
      setTimeout(()=>{
        dispatch({type:"clearError"})
      },1000)
    }
    if (message) {
      toast.success(message);
      setTimeout(()=>{
        dispatch({type:"clearMessage"})
      },1000)
    }
  }, [category, keyword, dispatch, error,message]);
  return (
    <Container minH={'95vh'} maxW={'container.lg'} paddingY={8}>
      <Heading m={8}>All Courses</Heading>
      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder=" Search a course..."
        type="text"
        focusBorderColor="yellow.500"
      />
      <HStack
        overflowX={'auto'}
        paddingY={8}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW={'60'}>
            <Text>{item}</Text>
          </Button>
        ))}
      </HStack>
      {
        isLoading ? <Loader /> : <Stack
        direction={['column', 'row']}
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
        flexWrap="wrap"
      >
        { courses && courses.length>0 ? (
          courses.map(course => (
            <Course
              key={course._id}
              title={course.title}
              description={course.description}
              views={course.views}
              imageSrc={course.poster.url}
              creator={course.createdBy}
              id={course._id}
              lectureCount={course.numOfLectures}
              addToPlayListHandler={addToPlayListHandler}
              isLoading={isLoading}
            />
          ))
        ) : (
          <Heading>Courses Not Found</Heading>
        )}
      </Stack>
      }
    </Container>
  );
};

export default Courses;
