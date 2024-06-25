import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import cursor from '../../../assets/images/cursor.png';
import { deleteUser, getAllUsers, updateUserRole } from '../../../redux/actions/admin';
import Sidebar from '../Sidebar';
import toast from 'react-hot-toast';

const Users = () => {
  // const users = [
  //   {
  //     _id: 'abcgdsjdgsdgskjgcs',
  //     name: 'Kavya',
  //     email: 'kavya@gmail.com',
  //     role: 'Admin',
  //     subscription: {
  //       status: 'active',
  //     },
  //   },
  // ];
 const {users,isLoading,error,message} = useSelector(state=>state.admin)
  const dispatch = useDispatch()
  const updateHandler = id => {
    dispatch(updateUserRole(id))
  };
  const deleteUserHandler = id => {
    dispatch(deleteUser(id))
  };

  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch({type:"clearError"})
    }
    if(message){
      toast.success(message)
      dispatch({type:"clearMessage"})
    }
    dispatch(getAllUsers())
  },[dispatch,message,error])

  return (
    <Grid
      minH="100vh"
      templateColumns={['1fr', '5fr 1fr']}
      css={{
        cursor: `url(${cursor}),default`,
      }}
    >
     
      <Box p={['0', '16']} overflowX={'auto'}>
      <Heading textAlign={['center', 'left']} my="16">
        All Users
      </Heading>
      <TableContainer w={['100vw', '100vw']}>
        <Table variant="simple" size="sm">
          <TableCaption>All Available Users In The Database</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Subscription</Th>
              <Th isNumeric>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users && users.map(user => (
              <TableRow
                key={user._id}
                user={user}
                updateHandler={updateHandler}
                deleteUserHandler={deleteUserHandler}
                isLoading={isLoading}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
      <Sidebar />
    </Grid>
  );
};

export default Users;

function TableRow({ user, updateHandler, deleteUserHandler,isLoading }) {
  return (
    <Tr>
      <Td>#{user._id}</Td>
      <Td>{user.name}</Td>
      <Td>{user.email}</Td>
      <Td>{user.role}</Td>
      <Td>{user.subscription && user.subscription.status === 'active' ? 'Active' : 'Not Active'}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => updateHandler(user._id)}
            variant="outline"
            color="purple.500"
            isLoading={isLoading}
          >
            Change Role
          </Button>
          <Button
            onClick={() => deleteUserHandler(user._id)}
            color="purple.600"
            isLoading={isLoading}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
