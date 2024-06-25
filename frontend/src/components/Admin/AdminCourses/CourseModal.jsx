import {
  Box,
  Button,
  Grid,
  Heading,
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
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { fileUploadCss } from '../../Auth/SignUp';

const CourseModal = ({
  isOpen,
  onClose,
  courseId,
  deleteLectureHandler,
  courseTitle,
  addLectureHandler,
  lectures = [],
  isLoading,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState('');
  const changeVideoHandler = e => {
    const videoFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(videoFile);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(videoFile);
    };
  };
  const closeHandler = () => {
    setTitle('');
    setDescription('');
    setVideo('');
    setVideoPrev('');
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeHandler}
      size="full"
      scrollBehavior="outside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p="16">
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box px={['0', '16']}>
              <Box my="5">
                <Heading>{courseTitle}</Heading>
                <Heading size="sm" opacity="0.4">
                  #{courseId}
                </Heading>
              </Box>
              <Heading size="lg">Lectures</Heading>
              {lectures.length > 0 ? (
                lectures.map((lecture, i) => (
                  <VideoCard
                    key={i}
                    title={lecture.title}
                    description={lecture.description}
                    num={i + 1}
                    lectureId={lecture._id}
                    courseId={courseId}
                    isLoading={isLoading}
                    deleteLectureHandler={deleteLectureHandler}
                  />
                ))
              ) : (
                <Text mt="2">No lectures have been added in this course</Text>
              )}
            </Box>

            <Box>
              <form
                onSubmit={e =>
                  addLectureHandler(e, courseId, title, description, video)
                }
              >
                <VStack spacing={'4'}>
                  <Heading textTransform={'uppercase'} size="md">
                    Add Lecture
                  </Heading>
                  <Input
                    value={title}
                    placeholder="Lecture Title"
                    focusBorderColor="purple.300"
                    onChange={e => setTitle(e.target.value)}
                  />
                  <Input
                    value={description}
                    placeholder="Lecture Description"
                    focusBorderColor="purple.300"
                    onChange={e => setDescription(e.target.value)}
                  />
                  <Input
                    required
                    type={'file'}
                    accept="video/mp4"
                    focusBorderColor="purple.500"
                    css={{
                      '&::file-selector-button': {
                        ...fileUploadCss,
                        color: 'purple',
                      },
                    }}
                    onChange={changeVideoHandler}
                  />
                  {videoPrev && (
                    <video
                      src={videoPrev}
                      controls
                      controlsList="nodownload"
                    ></video>
                  )}
                  <Button
                    isLoading={isLoading}
                    w="full"
                    colorScheme={'purple'}
                    type="submit"
                  >
                    Add
                  </Button>
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeHandler}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseModal;

function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteLectureHandler,
  isLoading,
}) {
  return (
    <Stack
      direction={['column', 'row']}
      my="8"
      borderRadius="lg"
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        <Heading size="sm">
          #{num} {title}
        </Heading>
        <Text>{description}</Text>
      </Box>
      <Button
        color="purple.600"
        isLoading={isLoading}
        onClick={() => deleteLectureHandler(courseId, lectureId)}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}
