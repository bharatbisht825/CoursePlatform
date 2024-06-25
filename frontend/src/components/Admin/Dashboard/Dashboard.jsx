import {
  Box,
  Grid,
  Heading,
  HStack,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import cursor from '../../../assets/images/cursor.png';
import { getDashboardStats } from '../../../redux/actions/admin';
import Sidebar from '../Sidebar';
import { DoughnutChart, LineChart } from './Chart';
import Loader from '../../Layout/Loader/Loader';

const DataBox = ({ title, qty, qtyPercentage, profit }) => {
  return (
    <Box
      w={['full', '20%']}
      boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
      p="8"
      borderRadius="lg"
    >
      <Text>{title}</Text>
      <HStack spacing="6">
        <Text fontWeight={'bold'} fontSize="2xl">
          {qty}
        </Text>
        <HStack>
          <Text>{`${qtyPercentage}%`}</Text>
          {profit ? (
            <RiArrowUpLine color="green" />
          ) : (
            <RiArrowDownLine color="red" />
          )}
        </HStack>
      </HStack>
      <Text opacity={0.6}>Since Last Month</Text>
    </Box>
  );
};
const Bar = ({ title, value, profit }) => {
  return (
    <Box py="4" px={['0', '20']}>
      <Heading size="sm" mb="2">
        {title}
      </Heading>
      <HStack w="full" alignItems={'center'}>
        <Text>{profit ? '0' : -value}%</Text>
        <Progress w="full" colorScheme="purple" value={profit ? value : 0} />
        <Text>{value > 100 ? value : 100}%</Text>
      </HStack>
    </Box>
  );
};
const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    stats,
    usersCount,
    viewsCount,
    subscriptionCount,
    usersPercentage,
    subscriptionPercentage,
    viewsPercentage,
    subscriptionProfit,
    usersProfit,
    viewsProfit,
  } = useSelector(state => state.admin);
  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);
  return (
    <Grid
      minH="100vh"
      templateColumns={['1fr', '5fr 1fr']}
      css={{
        cursor: `url(${cursor}),default`,
      }}
    >
      {
        isLoading || !stats ? <Loader color="purple.500"/> : <Box boxSizing="border-box" py="16" px={['4', '0']}>
        <Text textAlign="center" opacity={0.5}>{`Last change was on ${
          String(new Date(stats[11].createdAt)).split('G')[0]
        }`}</Text>
        <Heading ml={['0', '16']} mb="16" textAlign={['center', 'left']}>
          Dashboard
        </Heading>
        <Stack
          minH={'24'}
          direction={['column', 'row']}
          justifyContent="space-evenly"
        >
          <DataBox title="Views" qty={viewsCount} qtyPercentage={viewsPercentage} profit={viewsProfit} />
          <DataBox title="Users" qty={usersCount} qtyPercentage={usersPercentage} profit={usersProfit} />
          <DataBox
            title="Subscription"
            qty={subscriptionCount}
            qtyPercentage={subscriptionPercentage}
            profit={subscriptionProfit}
          />
        </Stack>
        <Box
          m={['0', '16']}
          p={['0', '16']}
          borderRadius="lg"
          boxShadow="2px 0 10px rgba(107,70,193,0.5)"
          mt={['4', '16']}
        >
          <Heading
            ml={['0', '16']}
            pt={['8', '0']}
            size="md"
            textAlign={['center', 'left']}
          >
            Views Graph
          </Heading>
          {/* line graph over here */}
          <LineChart views={stats.map((stat)=>stat.views)} />
        </Box>
        <Grid templateColumns={['1fr', '2fr 1fr']}>
          <Box p="4">
            <Heading
              size="md"
              textAlign={['center', 'left']}
              my="16"
              ml={['0', '16']}
            >
              Progress Bar
            </Heading>
            <Box>
              <Bar profit={viewsProfit} title="Views" value={viewsPercentage} />
              <Bar profit={usersProfit} title="Users" value={usersPercentage} />
              <Bar profit={subscriptionProfit} title="Subscription" value={subscriptionPercentage} />
            </Box>
          </Box>
          <Box p={['0', '16']} py="4" boxSizing={'border-box'}>
            <Heading size="md" textAlign={'center'} mb="4">
              Users
            </Heading>
            {/* donut graph */}
            <DoughnutChart subscriptionData={[subscriptionCount,usersCount-subscriptionCount]} />
          </Box>
        </Grid>
      </Box>
      }
      <Sidebar />
    </Grid>
  );
};

export default Dashboard;
