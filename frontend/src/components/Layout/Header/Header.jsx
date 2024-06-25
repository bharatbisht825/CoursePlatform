import React from 'react';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user';

const LinkButton = ({ url, title,onClose }) => {
  return (
    <Link onClick={onClose} to={url}>
      <Button variant="ghost">{title}</Button>
    </Link>
  );
};
const Header = ({isAuthenticated=false,user}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const isAuthenticated = false;
  // const user = {
  //   role: 'admin',
  // };
  const dispatch = useDispatch()
  const logoutHandler = () => {
    onClose();
    dispatch(logout())
  };
  return (
    <>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        colorScheme={'yellow'}
        width="12"
        height="12"
        zIndex="overlay"
        rounded="full"
        position="fixed"
        top="6"
        left="6"
      >
        <RiMenu5Fill />
      </Button>

      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay backdropFilter={'blur(1px)'} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>COURSE BUNDLER</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} alignItems={'flex-start'}>
              <LinkButton onClose= {onClose} url="/" title="Home" />
              <LinkButton onClose= {onClose} url="/about" title="About" />
              <LinkButton onClose= {onClose} url="/courses" title="Explore All Courses" />
              <LinkButton onClose= {onClose} url="/request" title="Request A Course" />
              <LinkButton onClose= {onClose} url="/contact" title="Contact Us" />
            </VStack>
            <HStack
              justifyContent={'space-evenly'}
              position="absolute"
              bottom="2rem"
              width="80%"
            >
              {isAuthenticated ? (
                <>
                  <VStack>
                    <HStack>
                      <Link onClick = {onClose} to="/profile">
                        <Button colorScheme={'yellow'} variant="ghost">
                          Profile
                        </Button>
                      </Link>

                      <Button variant="ghost" onClick={logoutHandler}>
                        <RiLogoutBoxLine />
                        Logout
                      </Button>
                    </HStack>
                    {user && user.role === 'admin' && (
                      <Link onClick = {onClose} to="/admin/dashboard">
                        <Button colorScheme={'purple'} variant={'ghost'}>
                          <RiDashboardFill style={{ margin: '4px' }} />
                          DashBoard
                        </Button>
                      </Link>
                    )}
                  </VStack>
                </>
              ) : (
                <>
                  <Link onClick = {onClose} to="/login">
                    <Button colorScheme={'yellow'}>Login</Button>
                  </Link>
                  <Text fontFamily="cursive" fontSize={'md'}>
                    OR
                  </Text>
                  <Link onClick = {onClose} to="/signup">
                    <Button colorScheme={'yellow'} rounded="md">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
