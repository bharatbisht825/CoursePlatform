import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/course';
import Loader from '../Layout/Loader/Loader';
const CoursePage = ({ user }) => {
  const [lectureNumber, setLectureNumber] = useState(0);

  const { isLoading, lectures } = useSelector(state => state.course);
  // const lectures = [
  //   {
  //     _id: 'abcdefgh',
  //     title: 'Sample Title 1 ',
  //     description: 'This is sample description 1 ',
  //     video: {
  //       url: introVideo,
  //     },
  //   },
  //   {
  //     _id: 'abcdefgi',
  //     title: 'Sample Title 2',
  //     description: 'This is sample description 2',
  //     video: {
  //       url: introVideo,
  //     },
  //   },
  //   {
  //     _id: 'abcdefgj',
  //     title: 'Sample Title 3',
  //     description: 'This is sample description 3',
  //     video: {
  //       url: introVideo,
  //     },
  //   },
  // ];
  const dispatch = useDispatch();
  const { id } = useParams();
  
  useEffect(() => {
    dispatch(getCourseLectures(id));
  }, [dispatch, id]);

  if (
    user.role !== 'admin' &&
    (!user.subscription || user.subscription.status !== 'active')
  ) {
    return <Navigate to="/subscribe" />;
  }

  return isLoading ? (
    <Loader />
  ) : (
    <Grid minH="95vh" templateColumns={['1fr', '3fr 1fr']}>
      {lectures && lectures.length > 0 ? (
        <>
          <Box>
            <video
              width="100%"
              controls
              src={lectures[lectureNumber].video.url}
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
            ></video>
            <Heading m="4">
              #{lectureNumber + 1} {lectures[lectureNumber].title}
            </Heading>
            <Heading m="4" size="md">Description</Heading>
            <Text m={'4'} fontFamily="cursive" size="md">
              {lectures[lectureNumber].description}
            </Text>
          </Box>
          <VStack fontFamily={'cursive'}>
            <Heading size="lg" color="yellow.400">
              Lectures
            </Heading>
            {lectures.map((item, index) => (
              <button
                onClick={() => setLectureNumber(index)}
                key={item._id}
                style={{
                  width: '100%',
                  padding: '1rem',
                  margin: 0,
                  borderBottom: '1px solid rgba(0,0,0,0.2)',
                }}
              >
                <Text noOfLines={1}>
                  #{index + 1} {item.title}
                </Text>
              </button>
            ))}
          </VStack>
        </>
      ) : (
        <Heading>No Lectures Found</Heading>
      )}
    </Grid>
  );
};

export default CoursePage;
