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
import FundTable from './FundTable';
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import MailingApi,{ sendEmail } from './MailingApi';
import TotalCasesChart from './TotalCasesChart';

const TotalCaseTable = () => {
    const [data,setData]=useState([]);
    const {portfolioHealth} = useSelector((state)=>state.portfolioSummary);
    const [selectedRow, setSelectedRow] = useState([]);
    const [branchdata,setbranchdata] = useState({
            'pb':80,
            'saket':40,
            'green':65,
            'pitam':30,
            'noida':55
    });
    const filterByBranch = (data, branchType) => {
        return data.filter(item => item.branch === branchType);
      };
    const updateRowSelectedData = (data)=>{
        // console.log(data);
        setSelectedRow(data);
      }
    const handleClick = (value)=>{
        console.log(value);
        setData(filterByBranch(portfolioHealth,value.name));
    }
    const params =useParams();
    useEffect(()=>{
        setData(portfolioHealth)
    },[params.id])

      const handleoneSendEmail = () => {
        selectedRow.forEach((value,index)=>{
            const customerName = data[value].customerName;
            const totalPledgeValue =  data[value].totalPledgeValue;
            const marginAvailable =  data[value].marginAvailable;
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
            const customerName = data[value].customerName;
            const totalPledgeValue =  data[value].totalPledgeValue;
            const marginAvailable =  data[value].marginAvailable;
        let mailSubject = 'Urgent: Margin Breach Notification';
        let mailBody = `<p>Dear ${customerName},</p>
        <p>We hope this message finds you well. We are writing to inform you that your portfolio has experienced a margin breach in the 25-40% range. Below are the details of your current portfolio status:</p>
        <ul>
          <li>Total Pledge Value: ${totalPledgeValue}</li>
          <li>Current Value: [Current Value]</li>
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
            const customerName = data[value].customerName;
            const totalPledgeValue =  data[value].totalPledgeValue;
            const marginAvailable =  data[value].marginAvailable;
        let mailSubject = 'Immediate Attention Required: Margin Breach Notification';
        let mailBody = `<p>Dear ${customerName},</p>
        <p>We hope this message finds you well. We are writing to inform you that your portfolio has experienced a margin breach in the 40-50% range. Below are the details of your current portfolio status:</p>
        <ul>
          <li>Total Pledge Value: ${totalPledgeValue}</li>
          <li>Current Value: [Current Value]</li>
          <li>Margin Breach Category: 40-50%</li>
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
    
  return (
    <Grid container spacing={2} bgcolor={'#f9f9f9'} pr={2}>
            {/* <Grid item xs={6} md={2} className='datatiles'>
                    <Box >
                        <CardContent>
                            <Stack direction={'column'} alignItems={'center'}>
                            <Typography variant="h5" component="h5" fontFamily={'Epilogue'} fontWeight={'900'} textAlign={'center'} mb={2} mt={2}>Quick Actions</Typography>
                                <SearchBar/>
                            </Stack>
                        </CardContent>
                    </Box>
            </Grid> */}
            <Grid item xs={6} md={12} className='datatiles'>
            <Card >
                    <CardContent>
                        <TotalCasesChart barSize={'70'} handleClick={handleClick} tick={true} branchdata={branchdata}/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={12}>
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

export default TotalCaseTable;