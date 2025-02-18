import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  AvatarGroup,
  Avatar,
  Box,
} from '@mui/material';
import one from '../assests/3.png';
import two from '../assests/1.png';
import three from '../assests/4.png';
import four from '../assests/2.png';
import p2 from '../assests/profiles/p2.png';
import p3 from '../assests/profiles/p3.png';
import p4 from '../assests/profiles/p4.png';
import p5 from '../assests/profiles/p5.png';
import p6 from '../assests/profiles/p6.png';
import p7 from '../assests/profiles/p7.png';
import p8 from '../assests/profiles/p8.png';
import p9 from '../assests/profiles/p9.png';
import p10 from '../assests/profiles/p10.png';
import p11 from '../assests/profiles/p11.png';
import p12 from '../assests/profiles/p12.png';

import i1 from '../assests/profiles/i1.png';
import i2 from '../assests/profiles/i2.png';
import i3 from '../assests/profiles/i3.png';
import { IoCalendarOutline } from 'react-icons/io5';
import TotalCasesChart from './TotalCasesChart';
import PortfolioChart from './PortfolioChart';
import ChannelsChart from './ChannelsChart';
import NewCustomerChannelsChart from './NewCustomerChannelsChart';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import userAvtar from '../assests/profile.png';
import upload from '../assests/upload.png';
import calendar from '../assests/calendar.png';
import { HiOutlineRefresh } from 'react-icons/hi';
import filter from '../assests/filter.png';
import refresh from '../assests/refresh-button.png';
import edit from '../assests/edit.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Loader from './SpinLoader'; // Import the Loader component
import '../Styles/SpinLoader.css'; // Import your CSS styles
import dayjs from 'dayjs';
const steps = [
  'Fetching Data',
  'Updating NAV Values',
  'Identifying Shares',
  'Updating New Profile Values',
  'Calculating LTV',
  'Calculating Margin Breach',
  'Updating Dashboard',
];
const Dashboard = () => {
  //my changes
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  //my changes
  const [cardData, setcardData] = useState({
    fund: 10,
    additional: 6,
    partial: 8,
    completed: 30,
  });
  const [portfoliodata, setportfoliodata] = useState({
    breached: 75,
    under: 10,
    within: 15,
  });
  const [branchdata, setbranchdata] = useState({
    pb: 75,
    saket: 30,
    green: 50,
    pitam: 20,
    noida: 60,
  });
  const [channeldata, setchanneldata] = useState({
    shares: 80,
    fund: 35,
  });
  const [channeldata1, setchanneldata1] = useState({
    shares: 58,
    fund: 37,
  });
  // const [collateraldata,setcollateraldata] = useState([]);
  // const [partialSeldata,setpartialSeldata] = useState([]);
  // const [completedSelldata,setcompletedSelldata] = useState([]);
  const refreshPage = () => {
    //loader code

    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      setcardData({
        fund: 8,
        additional: 4,
        partial: 7,
        completed: 32,
      });
      setportfoliodata({
        breached: 70,
        under: 15,
        within: 20,
      });
      setbranchdata({
        pb: 80,
        saket: 40,
        green: 65,
        pitam: 30,
        noida: 55,
      });
      setchanneldata({
        shares: 90,
        fund: 50,
      });
    }, 15000);
  };
  const dispatch = useDispatch();
  const dispatchAction = (
    funddata,
    collateraldata,
    partialSeldata,
    completedSelldata,
    portfolioHealthdata,
    firstNotice,
    secondNotice,
    marginUnderReview
  ) => {
    dispatch({
      type: 'fundAction',
      payload: funddata,
    });
    dispatch({
      type: 'collateralAction',
      payload: collateraldata,
    });
    dispatch({
      type: 'partialSellAction',
      payload: partialSeldata,
    });
    dispatch({
      type: 'completedSellAction',
      payload: completedSelldata,
    });
    dispatch({
      type: 'portfolioHealthAction',
      payload: portfolioHealthdata,
    });
    dispatch({
      type: 'firstNotice',
      payload: firstNotice,
    });
    dispatch({
      type: 'secondNotice',
      payload: secondNotice,
    });
    dispatch({
      type: 'marginUnderReview',
      payload: marginUnderReview,
    });
  };
  useEffect(() => {
    //chetan loader
    if (loading) {
      let stepIndex = 0;
      const interval = 15000 / steps.length; // Total 5 seconds divided by number of steps

      const intervalId = setInterval(() => {
        setCurrentStep(stepIndex);
        stepIndex += 1;
        if (stepIndex >= steps.length) {
          clearInterval(intervalId);
        }
      }, interval);

      return () => clearInterval(intervalId);
    }
    //chetan loader

    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          'https://csgrlosdemo.newgensoftware.net:8443/lasportalbackendservices/?status=FUND_DEPOSITED'
        );
        console.log(data);
        var data1 = data;
        data1.map((e, i) => (e['id'] = i + 1));
      } catch (error) {
        console.log(error);
      }
      try {
        const { data } = await axios.get(
          'https://csgrlosdemo.newgensoftware.net:8443/lasportalbackendservices/?status=ADDITIONAL_COLLATERAL_DEPOSITED'
        );
        console.log(data);
        var data2 = data;
        data2.map((e, i) => (e['id'] = i + 1));
      } catch (error) {
        console.log(error);
      }
      try {
        const { data } = await axios.get(
          'https://csgrlosdemo.newgensoftware.net:8443/lasportalbackendservices/?status=PARTIAL_SELL'
        );
        console.log(data);
        var data3 = data;
        data3.map((e, i) => (e['id'] = i + 1));
      } catch (error) {
        console.log(error);
      }
      try {
        const { data } = await axios.get(
          'https://csgrlosdemo.newgensoftware.net:8443/lasportalbackendservices/?status=FULL_SELL'
        );
        console.log(data);
        var data4 = data;
        data4.map((e, i) => (e['id'] = i + 1));
      } catch (error) {
        console.log(error);
      }
      try {
        const { data } = await axios.get(
          'https://csgrlosdemo.newgensoftware.net:8443/lasportalbackendservices/?status=MARGIN_BREACHED'
        );
        console.log(data);
        var data5 = data;
        data5.map((e, i) => (e['id'] = i + 1));
      } catch (error) {
        console.log(error);
      }
      try {
        const { data } = await axios.get(
          'https://csgrlosdemo.newgensoftware.net:8443/lasportalbackendservices/?status=FIRST_NOTICE_INITIATED'
        );
        console.log(data);
        var data6 = data;
        data6.map((e, i) => (e['id'] = i + 1));
      } catch (error) {
        console.log(error);
      }
      try {
        const { data } = await axios.get(
          'https://csgrlosdemo.newgensoftware.net:8443/lasportalbackendservices/?status=SECOND_NOTICE_INITIATED'
        );
        console.log(data);
        var data7 = data;
        data7.map((e, i) => (e['id'] = i + 1));
      } catch (error) {
        console.log(error);
      }
      try {
        const { data } = await axios.get(
          'https://csgrlosdemo.newgensoftware.net:8443/lasportalbackendservices/?status=MARGIN_UDER_REVIEW'
        );
        console.log(data);
        var data8 = data;
        data8.map((e, i) => (e['id'] = i + 1));
      } catch (error) {
        console.log(error);
      }

      dispatchAction(data1, data2, data3, data4, data5, data6, data7, data8);
    };
    fetchData();
  }, [loading]);

  return (
    <>
      <Grid container spacing={2} bgcolor={'#f9f9f9'} pr={2}>
        <Grid item xs={12} md={12}>
          <Box>
            <CardContent className='dashboardHeader'>
              <Typography
                variant='h6'
                component='h6'
                fontFamily={'Epilogue'}
                fontWeight={'800'}
              >
                Dashboard
              </Typography>
              <Stack direction={'row'} gap={[1, 2]}>
                <button
                  style={{
                    padding: '5px 5px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '130px',
                    backgroundColor: '#4B7BEC',
                    color: 'white',
                    border: '1px solid #4B7BEC',
                    borderRadius: '5px',
                  }}
                >
                  <IoCalendarOutline color='white' size={'22px'} />
                  <p>{dayjs().format('MMMM DD, YYYY')}</p>
                </button>
                <button
                  style={{
                    padding: '5px 5px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#4B7BEC',
                    color: 'white',
                    border: '1px solid #4B7BEC',
                    borderRadius: '5px',
                  }}
                  onClick={refreshPage}
                >
                  <HiOutlineRefresh color='white' size={'22px'} />
                  {/* <img src={refresh} alt="upload" width={20} height={20} onClick={refreshPage} /> */}
                </button>
                <button style={{ padding: '2px 5px' }}>
                  <img
                    src={upload}
                    alt='upload'
                    width={20}
                    height={20}
                    onClick={() =>
                      document.getElementById('hiddenUpload').click()
                    }
                  />
                  <input type='file' name='uploadexcel' id='hiddenUpload' />
                </button>
                <button style={{ padding: '2px 5px' }}>
                  <img src={filter} alt='filter' width={20} height={20} />
                </button>
                <button style={{ padding: '2px 5px' }}>
                  <img src={edit} alt='edit' width={20} height={20} />
                </button>
              </Stack>
            </CardContent>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Link
            to={'/dashboard/fundDeposited'}
            style={{ textDecoration: 'none' }}
          >
            <Card variant='outlined'>
              <CardContent
                className='datatiles'
                style={{ backgroundColor: '#F1F5FE' }}
              >
                <Stack>
                  <Stack direction={'row'} gap={2}>
                    <img src={one} alt='' width={'40px'} height={'40px'} />
                    <Typography
                      variant='subtitle1'
                      component='subtitle1'
                      fontFamily={'Inter'}
                      fontWeight={'700'}
                      color={'primary'}
                    >
                      Fund Deposited
                    </Typography>
                  </Stack>
                  <Typography
                    variant='h5'
                    component='h5'
                    align='center'
                    fontFamily={'Inter'}
                    fontWeight={'700'}
                  >
                    {cardData.fund}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={6} md={3} className='datatiles'>
          <Link to={'/dashboard/collateral'} style={{ textDecoration: 'none' }}>
            <Card variant='outlined' style={{ backgroundColor: '#F1F5FE' }}>
              <CardContent>
                <Stack>
                  <Stack direction={'row'} gap={2}>
                    <img src={two} alt='' width={'40px'} height={'40px'} />
                    <Typography
                      variant='subtitle1'
                      component='subtitle1'
                      fontFamily={'Inter'}
                      fontWeight={'700'}
                      color={'primary'}
                    >
                      Additional Collateral
                    </Typography>
                  </Stack>
                  <Typography
                    variant='h5'
                    component='h5'
                    align='center'
                    fontFamily={'Inter'}
                    fontWeight={'700'}
                  >
                    {cardData.additional}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={6} md={3} className='datatiles'>
          <Link
            to={'/dashboard/partialSell'}
            style={{ textDecoration: 'none' }}
          >
            <Card variant='outlined' style={{ backgroundColor: '#F1F5FE' }}>
              <CardContent>
                <Stack>
                  <Stack direction={'row'} gap={2}>
                    <img src={three} alt='' width={'40px'} height={'40px'} />
                    <Typography
                      variant='subtitle1'
                      component='subtitle1'
                      fontFamily={'Inter'}
                      fontWeight={'700'}
                      color={'primary'}
                    >
                      Partial Sell
                    </Typography>
                  </Stack>
                  <Typography
                    variant='h5'
                    component='h5'
                    align='center'
                    fontFamily={'Inter'}
                    fontWeight={'700'}
                  >
                    {cardData.partial}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={6} md={3} className='datatiles'>
          <Link
            to={'/dashboard/completedSell'}
            style={{ textDecoration: 'none' }}
          >
            <Card variant='outlined' style={{ backgroundColor: '#F1F5FE' }}>
              <CardContent>
                <Stack>
                  <Stack direction={'row'} gap={2}>
                    <img src={four} alt='' width={'40px'} height={'40px'} />
                    <Typography
                      variant='subtitle1'
                      component='subtitle1'
                      fontFamily={'Inter'}
                      fontWeight={'700'}
                      color={'primary'}
                    >
                      Completed Sell
                    </Typography>
                  </Stack>
                  <Typography
                    variant='h5'
                    component='h5'
                    align='center'
                    fontFamily={'Inter'}
                    fontWeight={'700'}
                  >
                    {cardData.completed}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <Link to={'/portfolioHealth'} style={{ textDecoration: 'none' }}>
            <Card>
              <CardContent>
                <PortfolioChart portfoliodata={portfoliodata} />
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <Link to={'/totalCaseTable'} style={{ textDecoration: 'none' }}>
            <Card>
              <CardContent>
                <TotalCasesChart
                  barSize={'30'}
                  tick={false}
                  branchdata={branchdata}
                />
              </CardContent>
            </Card>
          </Link>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container xs={12} md={12} spacing={2}>
            <Grid item xs={12} md={12}>
              <Card>
                <CardContent>
                  <ChannelsChart channeldata={channeldata} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card>
                <CardContent>
                  <NewCustomerChannelsChart channeldata={channeldata1} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container xs={12} md={12} spacing={2}>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Stack direction={'column'}>
                    <Typography
                      variant='subtitle1'
                      component='subtitle1'
                      fontFamily={'Epilogue'}
                      fontWeight={'500'}
                      color={'#FF5151'}
                    >
                      Customer 360
                    </Typography>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                      <img src={userAvtar} alt='avtar' width={50} height={50} />
                      <button
                        style={{
                          backgroundColor: '#fd7e14',
                          color: 'white',
                          border: 'none',
                          height: '40px',
                          borderRadius: '5px',
                          width: '70%',
                          marginTop: '5px',
                          fontFamily: 'Inter',
                          fontWeight: '600',
                        }}
                        onClick={() =>
                          window.open(
                            'https://hnbdemo.newgensoftware.net/LASMonitoring/#/customer'
                          )
                        }
                      >
                        Search Customer
                      </button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <div>
                <Stack direction={'column'} gap={1} height={'130px'}>
                  <Link
                    to={'/dashboard/secondNotice'}
                    style={{ textDecoration: 'none' }}
                  >
                    <Card>
                      <CardContent style={{ backgroundColor: '#FFD8D4' }}>
                        <Stack
                          direction={'row'}
                          gap={2}
                          alignItems={'center'}
                          mt={-1}
                          mb={-1}
                        >
                          <div
                            className='numberCircle'
                            style={{ background: '#FF5151' }}
                          >
                            <p>2</p>
                          </div>
                          <Typography
                            variant='subtitle1'
                            component='subtitle1'
                            fontFamily={'Inter'}
                            fontWeight={'400'}
                            color={'#FF5151'}
                          >
                            Second Notice
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Link>
                  <Link
                    to={'/dashboard/firstNotice'}
                    style={{ textDecoration: 'none' }}
                  >
                    <Card>
                      <CardContent style={{ backgroundColor: '#F1F5FE' }}>
                        <Stack
                          direction={'row'}
                          gap={2}
                          alignItems={'center'}
                          mt={-1}
                          mb={-1}
                        >
                          <div
                            className='numberCircle'
                            style={{ background: 'blue' }}
                          >
                            <p>1</p>
                          </div>
                          <Typography
                            variant='subtitle1'
                            component='subtitle1'
                            fontFamily={'Inter'}
                            fontWeight={'400'}
                            color={'#4B7BEC'}
                          >
                            First Notice
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Link>
                </Stack>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography
                    variant='subtitle1'
                    component='subtitle1'
                    fontFamily={'Epilogue'}
                    fontWeight={'700'}
                  >
                    Highlighted Profiles
                  </Typography>
                  <Grid container xs={12} spacing={1}>
                    <Grid item xs={12}>
                      <Link
                        to={'/dashboard/secondNotice'}
                        style={{ textDecoration: 'none' }}
                      >
                        <Card sx={{ border: '1px solid #4B7BEC' }}>
                          <CardContent style={{ backgroundColor: '#F1F5FE' }}>
                            <Stack
                              direction={'row'}
                              justifyContent={'space-between'}
                              height={40}
                            >
                              <Stack direction={'column'} alignItems={'center'}>
                                <div
                                  style={{
                                    backgroundColor: '#DE3B40',
                                    borderRadius: '5px',
                                    marginTop: '-12px',
                                    alignSelf: 'start',
                                  }}
                                >
                                  <Typography
                                    pl={1}
                                    pr={1}
                                    fontFamily={'Inter'}
                                    color={'white'}
                                    fontSize={'12px'}
                                    fontWeight={'700'}
                                  >
                                    {' '}
                                    Due in 3 Days{' '}
                                  </Typography>
                                </div>
                                <Typography
                                  variant='subtitle1'
                                  component='subtitle1'
                                  fontFamily={'Inter'}
                                  fontWeight={'700'}
                                >
                                  Cases with 3 Days Deadline
                                </Typography>
                                <Typography
                                  variant='h5'
                                  component='h5'
                                  fontWeight={'700'}
                                >
                                  9
                                </Typography>
                              </Stack>
                              <img
                                src={i1}
                                alt='alert'
                                width={40}
                                height={40}
                              />
                              <AvatarGroup max={4}>
                                <Avatar alt='Travis Howard' src={p2} />
                                <Avatar alt='Cindy Baker' src={p3} />
                                <Avatar alt='Agnes Walker' src={p4} />
                                <Avatar alt='Trevor Henderson' src={p5} />
                              </AvatarGroup>
                              <MoreVertOutlinedIcon
                                style={{ marginTop: '10px' }}
                              />
                            </Stack>
                          </CardContent>
                        </Card>
                      </Link>
                    </Grid>
                    <Grid item xs={12}>
                      <Link
                        to={'/dashboard/firstNotice'}
                        style={{ textDecoration: 'none' }}
                      >
                        <Card>
                          <CardContent style={{ backgroundColor: '#F5F9F5' }}>
                            <Stack
                              direction={'row'}
                              justifyContent={'space-between'}
                              height={40}
                            >
                              <Stack direction={'column'} alignItems={'center'}>
                                <Typography
                                  variant='subtitle1'
                                  component='subtitle1'
                                  fontFamily={'Inter'}
                                  fontWeight={'700'}
                                >
                                  Cases with 5days Deadline
                                </Typography>
                                <Typography
                                  variant='h5'
                                  component='h5'
                                  fontWeight={'700'}
                                >
                                  16
                                </Typography>
                              </Stack>
                              <img
                                src={i2}
                                alt='denger'
                                width={40}
                                height={40}
                              />
                              <AvatarGroup max={4}>
                                {/* <Avatar alt="Travis Howard" src={p2} /> */}
                                <Avatar alt='Cindy Baker' src={p6} />
                                <Avatar alt='Agnes Walker' src={p7} />
                                {/* <Avatar alt="Trevor Henderson" src='' /> */}
                              </AvatarGroup>
                              <Stack></Stack>
                              <MoreVertOutlinedIcon
                                style={{ marginTop: '10px' }}
                              />
                            </Stack>
                          </CardContent>
                        </Card>
                      </Link>
                    </Grid>
                    <Grid item xs={12}>
                      <Link
                        to={'/dashboard/marginUnderReview'}
                        style={{ textDecoration: 'none' }}
                      >
                        <Card>
                          <CardContent style={{ backgroundColor: '#FFF9EE' }}>
                            <Stack
                              direction={'row'}
                              justifyContent={'space-between'}
                              height={40}
                            >
                              <Stack></Stack>
                              <Stack direction={'column'} alignItems={'center'}>
                                <Typography
                                  variant='subtitle1'
                                  component='subtitle1'
                                  fontFamily={'Inter'}
                                  fontWeight={'700'}
                                >
                                  Margin Under Review
                                </Typography>
                                <Typography
                                  variant='h5'
                                  component='h5'
                                  fontWeight={'700'}
                                >
                                  12
                                </Typography>
                              </Stack>
                              <Stack></Stack>
                              <img
                                src={i3}
                                alt='alert'
                                width={40}
                                height={40}
                              />
                              <AvatarGroup max={4}>
                                <Avatar alt='Travis Howard' src={p8} />
                                <Avatar alt='Cindy Baker' src={p9} />
                                <Avatar alt='Agnes Walker' src={p10} />
                                <Avatar alt='Trevor Henderson' src={p11} />
                              </AvatarGroup>
                              <MoreVertOutlinedIcon
                                style={{ marginTop: '10px' }}
                              />
                            </Stack>
                          </CardContent>
                        </Card>
                      </Link>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Loader open={loading} steps={steps} currentStep={currentStep} />
    </>
  );
};

export default Dashboard;