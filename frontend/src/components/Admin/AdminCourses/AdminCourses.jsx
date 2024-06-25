import {
    Box,
    Button,
    Grid,
    Heading,
    HStack,
    Image,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
  import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
  import cursor from '../../../assets/images/cursor.png';
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/actions/admin';
import { getAllCourses, getCourseLectures } from '../../../redux/actions/course';
  import Sidebar from '../Sidebar';
import CourseModal from './CourseModal';
  
  const AdminCourses = () => {
    const [courseId,setCourseId] = useState("")
    const [courseTitle,setCourseTitle] = useState("")
    const {isOpen,onOpen,onClose} = useDisclosure()
    const dispatch = useDispatch()
    const {courses,lectures,isLoading : lectureLoading} = useSelector(state=>state.course)
    const {isLoading,error,message} = useSelector(state=>state.admin)
    // const courses = [
    //   {
    //     _id: 'abcgdsjdgsdgskjgcs',
    //     title: 'React Course',
    //     category: 'Web Development',
    //     poster: {
    //         url : "https://www.webhopers.in/uploads/1/web-development-course-in-panchkula.png"
    //     },
    //     createdBy: "Kavya R",
    //     views : 204,
    //     numOfLectures : 12
    //   },
    // ];
  
    const courseDetailsHandler = async (courseId,courseTitle) => {
      await dispatch(getCourseLectures(courseId))      
      onOpen();
      setCourseId(courseId)
      setCourseTitle(courseTitle)
    };
    const deleteCourseHandler = courseId => {
      dispatch(deleteCourse(courseId))
    };
    const deleteLectureHandler = async(courseId,lectureId) =>{
        await dispatch(deleteLecture(courseId,lectureId))
        dispatch(getCourseLectures(courseId))
    }
    const addLectureHandler = async(e,courseId,title,description,video) =>{
      e.preventDefault();
      const myForm = new FormData();
      myForm.append("title",title)
      myForm.append("description",description)
      myForm.append("file",video)
      await dispatch(addLecture(courseId,myForm))
      dispatch(getCourseLectures(courseId))
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
      dispatch(getAllCourses())
    },[dispatch,error,message])
    return (
      <Grid
        minH="100vh"
        templateColumns={['1fr', '5fr 1fr']}
        css={{
          cursor: `url(${cursor}),default`,
        }}
      >
        <Box p={['0', '8']} overflowX={'auto'}>
          <Heading textAlign={['center', 'left']} my="16">
            All Courses
          </Heading>
          <TableContainer w={['100vw', '100vw']}>
            <Table variant="simple" size="sm">
              <TableCaption>All Available Courses In The Database</TableCaption>
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Poster</Th>
                  <Th>Title</Th>
                  <Th>Category</Th>
                  <Th>Creator</Th>
                  <Th isNumeric>Views</Th>
                  <Th isNumeric>Lectures</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {courses.map(course => (
                  <TableRow
                    key={course._id}
                    course={course}
                    courseDetailsHandler={courseDetailsHandler}
                    deleteCourseHandler={deleteCourseHandler}
                    isLoading = {isLoading}
                    lectureLoading={lectureLoading}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <CourseModal isOpen={isOpen} onClose={onClose} courseId={courseId} 
          courseTitle={courseTitle}
          deleteLectureHandler={deleteLectureHandler}
          addLectureHandler={addLectureHandler}
          lectures={lectures}
          isLoading={isLoading}
          lectureLoading={lectureLoading}
         />
         
        </Box>
        <Sidebar />
      </Grid>
    );
  };

export default AdminCourses;

function TableRow({ course, courseDetailsHandler, deleteCourseHandler,isLoading,lectureLoading }) {
    return (
      <Tr>
        <Td>#{course._id}</Td>
        <Td>
            <Image src={course.poster.url}/>
        </Td>
        <Td>{course.title}</Td>
        <Td textTransform={"upperCase"}>{course.category}</Td>
        <Td>{course.createdBy}</Td>
        <Td isNumeric>{course.views}</Td>
        <Td isNumeric>{course.numOfLectures}</Td>
        <Td isNumeric>
          <HStack justifyContent={'flex-end'}>
            <Button
              onClick={() => courseDetailsHandler(course._id,course.title)}
              isLoading={lectureLoading}
              variant="outline"
              color="purple.500"
            >
              View Lectures
            </Button>
            <Button
              onClick={() => deleteCourseHandler(course._id)}
              isLoading={isLoading}
              color="purple.600"
            >
              <RiDeleteBin7Fill />
            </Button>
          </HStack>
        </Td>
      </Tr>
    );
  }
  
