import { Grid,Typography,Stack,Card,Box,CardContent,AvatarGroup,Avatar, Button } from '@mui/material'
import React,{useEffect, useState} from 'react'
import { GoAlert } from "react-icons/go";
import { FaRegThumbsDown } from "react-icons/fa";
import { AiOutlineAlert } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import p2 from '../assests/profiles/p2.png'
import p3 from '../assests/profiles/p3.png'
import p4 from '../assests/profiles/p4.png'
import p5 from '../assests/profiles/p5.png'
import p6 from '../assests/profiles/p6.png'
import p7 from '../assests/profiles/p7.png'
import p8 from '../assests/profiles/p8.png'
import p9 from '../assests/profiles/p9.png'
import p10 from '../assests/profiles/p10.png'
import p11 from '../assests/profiles/p11.png'
import p12 from '../assests/profiles/p12.png'
import BreachedChart from './BreachedChart';
import FundTable from './FundTable';
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import MailingApi,{ sendEmail } from './MailingApi';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LoanChart from './LoanChart';
const FundDeposited = () => {
    const [data,setData]=useState([]);
    const {portfolioHealth} = useSelector((state)=>state.portfolioSummary);
    const [selectedRow, setSelectedRow] = useState([]);
    const [alignment, setAlignment] = React.useState('b');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    const filterByMarginAvailablePercentage = (data, condition) => {
        switch (condition) {
          case 'Margin Below 25%':
            return data.filter(item => item.marginAvailablePercentage < 25);
          case 'Margin 26-40%':
            return data.filter(item => item.marginAvailablePercentage >= 26 && item.marginAvailablePercentage <= 40);
          case 'Margin 41-50%':
            return data.filter(item => item.marginAvailablePercentage >= 41 && item.marginAvailablePercentage <= 50);
          case 'Below 3 Lakh':
            return data.filter(item => item.sanctionAmount < 300000);
          case 'Between 3-5 Lakh':
            return data.filter(item => item.sanctionAmount >= 300000 && item.sanctionAmount <= 500000);
          case 'Above 5 Lakh':
            return data.filter(item => item.sanctionAmount >= 500000);
          default:
            return data;
        }
      };
    const updateRowSelectedData = (data)=>{
        // console.log(data);
        setSelectedRow(data);
      }
      const handleClick = (value)=>{
        console.log(value);
        setData(filterByMarginAvailablePercentage(portfolioHealth,value.name));
    }

      const handleoneSendEmail = () => {
        selectedRow.forEach((value,index)=>{
          var a=value-1;
            const customerName = data[a].customerName;
            const totalPledgeValue =  data[a].totalPledgeValue;
            const marginAvailable =  data[a].marginAvailable;
        let mailSubject = 'Immediate Action Required: Margin Breach Notification';
        let mailBody = `<p>Dear ${customerName},</p>
        <p>We hope this message finds you well. We regret to inform you that your portfolio has experienced a margin breach below 25%. Below are the details of your current portfolio status:</p>
        <ul>
          <li>Total Pledge Value: ${totalPledgeValue}</li>
          <li>Current Value: ${marginAvailable}</li>
          <li>Margin Breach Category: Below 25%</li>
        </ul>
        <p>Due to the severity of this breach, we are required to take immediate action to mitigate the risk. As a result, we will be selling a portion of your shares to cover the breached margin.</p>
        <p>We understand that this is an urgent matter and are here to support you through this process. If you have any questions or require further information, please feel free to reach us.</p>
        <p>Thank you for your prompt attention.</p>
        <p>Best regards,<br>Newgen</p>
        `;
        sendEmail(mailSubject, mailBody);
    })
      };
      const handletwoSendEmail = () => {
        selectedRow.forEach((value,index)=>{
          var a=value-1;
            const customerName = data[a].customerName;
            const totalPledgeValue =  data[a].totalPledgeValue;
            const marginAvailable =  data[a].marginAvailable;
        let mailSubject = 'Urgent: Margin Breach Notification';
        let mailBody = `<p>Dear ${customerName},</p>
        <p>We hope this message finds you well. We are writing to inform you that your portfolio has experienced a margin breach in the 25-40% range. Below are the details of your current portfolio status:</p>
        <ul>
          <li>Total Pledge Value: ${totalPledgeValue}</li>
          
          <li>Margin Breach Category: 25-40%</li>
          <li>Current Margin: ${marginAvailable}</li>
        </ul>
        <p>To address this breach and avoid potential liquidation of your assets, please submit additional collateral or deposit funds within the next 3 days.</p>
        <p>Use the URL to submit additional collateral/funds: <a href="https://tytlmsdemo.newgensoftware.net//LASPortal">https://tytlmsdemo.newgensoftware.net//LASPortal</a></p>
        <p>Taking prompt action is crucial to maintaining the integrity of your portfolio.</p>
        <p>Thank you for your urgent attention to this matter.</p>
        <p>Best regards,</p>
        `;
        sendEmail(mailSubject, mailBody);
    })
      };
      const handlethreeSendEmail = () => {
        selectedRow.forEach((value,index)=>{
          var a=value-1;
            const customerName = data[a].customerName;
            const totalPledgeValue =  data[a].totalPledgeValue;
            const marginAvailable =  data[a].marginAvailable;
        let mailSubject = 'Immediate Attention Required: Margin Breach Notification';
        let mailBody = `<p>Dear ${customerName},</p>
        <p>We hope this message finds you well. We are writing to inform you that your portfolio has experienced a margin breach in the 40-50% range. Below are the details of your current portfolio status:</p>
        <ul>
          <li>Total Pledge Value: ${totalPledgeValue}</li>
      
          
          <li>Current Margin: ${marginAvailable}</li>
        </ul>
        <p>In order to rectify this breach and avoid any potential liquidation of your assets, we kindly request that you submit additional collateral or deposit funds within the next 5 days. Use the URL to submit additional collateral/funds: <a href="https://tytlmsdemo.newgensoftware.net//LASPortal">https://tytlmsdemo.newgensoftware.net//LASPortal</a></p>
        <p>Please take prompt action to ensure your portfolio remains compliant with our margin requirements. Should you have any questions or need assistance, feel free to contact our support team.</p>
        <p>Thank you for your immediate attention to this matter.</p>
        <p>Best regards,<br>Newgen</p>
        `;
        sendEmail(mailSubject, mailBody);
    })
      };
    const params =useParams();
    useEffect(()=>{
        setData(portfolioHealth)
},[params.id])
  return (
    <Grid container spacing={2} bgcolor={'#f9f9f9'} pr={2}>
            <Grid item xs={6} md={3} className='datatiles'>
                    <Box >
                        <CardContent>
                            <Stack direction={'column'} alignItems={'center'}>
                            <Typography variant="h5" component="h5" fontFamily={'Epilogue'} fontWeight={'900'} textAlign={'center'} mb={2} mt={2}>Quick Actions</Typography>
                                <SearchBar/>
                            </Stack>
                        </CardContent>
                    </Box>
         </Grid>
          <Grid item xs={6} md={3} className='datatiles'>
                <Card variant="outlined">
                    <CardContent>
                        <Stack direction={'column'} alignItems={'center'}>
                            <Stack direction={'row'} gap={2}>
                            <GoAlert size={25} color="red"/>
                            <Typography variant="subtitle1" component="subtitle1" fontFamily={'Epilogue'} fontWeight={'700'}>Margin Below 25</Typography>
                            </Stack>
                            <AvatarGroup max={5}>
                                <Avatar alt="Travis Howard" src={p2} />
                                <Avatar alt="Cindy Baker" src={p3} />
                                <Avatar alt="Agnes Walker" src={p4} />
                                <Avatar alt="Trevor Henderson" src={p5} />
                                <Avatar alt="Trevor Henderson" src={p6} />
                                </AvatarGroup>
                            <CiMail size={40} color="blue" onClick={handleoneSendEmail} />
                            <Typography variant="subtitle1" component="subtitle1" fontFamily={'Inter'} fontSize={'12px'}>Send Email For Sell</Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
          <Grid item xs={6} md={3} className='datatiles'>
                <Card variant="outlined">
                    <CardContent>
                        <Stack direction={'column'} alignItems={'center'}>
                            <Stack direction={'row'} gap={2}>
                            <FaRegThumbsDown size={25} color="red"/>
                            <Typography variant="subtitle1" component="subtitle1" fontFamily={'Epilogue'} fontWeight={'700'}>Margin Below 26-40%</Typography>
                            </Stack>
                            <AvatarGroup max={4}>
                                <Avatar alt="Travis Howard" src={p7} />
                                <Avatar alt="Cindy Baker" src={p8} />
                                <Avatar alt="Agnes Walker" src={p9} />
                                </AvatarGroup>
                            <CiMail size={40} color="blue" onClick={handletwoSendEmail}  />
                            <Typography variant="subtitle1" component="subtitle1" fontFamily={'Inter'} fontSize={'12px'}>Send Email For 3 day Intimation</Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
          <Grid item xs={6} md={3} className='datatiles'>
                <Card variant="outlined">
                    <CardContent>
                        <Stack direction={'column'} alignItems={'center'}>
                            <Stack direction={'row'} gap={2}>
                            <AiOutlineAlert size={25} color="red"/>
                            <Typography variant="subtitle1" component="subtitle1" fontFamily={'Epilogue'} fontWeight={'700'}>Margin Below 41-50%</Typography>
                            </Stack>
                            <AvatarGroup max={4}>
                                <Avatar alt="Travis Howard" src={p10} />
                                <Avatar alt="Cindy Baker" src={p11} />
                                <Avatar alt="Agnes Walker" src={p12} />
                                <Avatar alt="Trevor Henderson" src={p3} />
                                </AvatarGroup>
                            <CiMail size={40} color="blue" onClick={handlethreeSendEmail} />
                            <Typography variant="subtitle1" component="subtitle1" fontFamily={'Inter'} fontSize={'12px'}>Send Email For 5 day Intimation</Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={3} >
                <Card >
                    <CardContent>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                        size='small'
                        sx={{marginLeft:'35px',marginBottom:'10px'}}
                        
                        >
                        <ToggleButton value="b">Percentage</ToggleButton>
                        <ToggleButton value="l">Amount</ToggleButton>
                        </ToggleButtonGroup>
                        {alignment=='b'?<BreachedChart handleClick={handleClick}/>:<LoanChart handleClick={handleClick}/>}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={9}>
                <Card >
                    <CardContent>
                       <FundTable tabledata={data} updateRowSelectedData={updateRowSelectedData}/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={11} md={11}>
            </Grid>
            <Grid item xs={1} md={1}>
                <Button variant="contained"
                color="primary"
                component={Link}
                to="/dashboard" >Back</Button>
            </Grid>
            <Grid item xs={12} md={12}>
                </Grid>
    </Grid>
  )
}

export default FundDeposited;