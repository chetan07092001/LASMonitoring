import { Grid, Typography, Stack, Card, Box, CardContent, AvatarGroup, Avatar, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { CiMail } from "react-icons/ci";
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import p2 from '../assests/profiles/p2.png';
import p3 from '../assests/profiles/p3.png';
import p4 from '../assests/profiles/p4.png';
import p5 from '../assests/profiles/p5.png';
import FundTable from './FundTable';
import SearchBar from './SearchBar';
import MailingApi,{ sendEmail } from './MailingApi';



const OtherCard = () => {
  const [data, setData] = useState([]);
  const [cardLabel, setCardLabel] = useState('');
  const [sendLabel,setsendLabel] = useState('');
  const [selectedRow, setSelectedRow] = useState([]);
  const { fund, collateral, partialSell, completedSell, firstNotice, secondNotice, marginUnderReview } = useSelector((state) => state.portfolioSummary);
  const params = useParams();

  const updateRowSelectedData = (data)=>{
    console.log(data);
    setSelectedRow(data);
  }


  useEffect(() => {
    switch (params.id) {
      case 'fundDeposited':
        setData(fund);
        setCardLabel('Fund Deposited');
        setsendLabel('Send Email For Acknowledgement')
        break;
        case 'newDisbursal':
          setData(fund);
          setCardLabel('Welcome');
          setsendLabel('Send Email For New Customers')
          break;
        
      case 'collateral':
        setData(collateral);
        setCardLabel('Additional Collateral');
        setsendLabel('Send Email For Acknowledgement')
        break;
      case 'partialSell':
        setData(partialSell);
        setCardLabel('Partial Sell');
        setsendLabel('Send Email For Acknowledgement')
        break;
      case 'completedSell':
      //  setData(completedSell);
        setData(firstNotice);
        setCardLabel('Completed Sell');
        setsendLabel('Send Email For Acknowledgement')
        break;
      case 'firstNotice':
        setData(firstNotice);
        setCardLabel('First Notice');
        setsendLabel('Send Email For Notice')
        break;
      case 'secondNotice':
        setData(secondNotice);
        setCardLabel('Second Notice');
        setsendLabel('Send Email For Notice')
        break;
      case 'marginUnderReview':
        setData(marginUnderReview);
        setCardLabel('Margin Under Review');
        setsendLabel('Send Email For Acknowledgement')
        break;
      default:
        break;
    }
  }, [params.id]);


  const handleSendEmail = () => {
    let mailSubject = '';
    let mailBody = '';

    selectedRow.forEach((value,index)=>{
      var a=value-1;
      const customerName = data[a].customerName;
      const totalPledgeValue =  data[a].totalPledgeValue;
      const marginAvailable =  data[a].marginAvailable;
      const marginAvailablePercentage=data[a].marginAvailablePercentage;
    switch (params.id) {


      case 'fundDeposited':
        mailSubject = 'Confirmation: Funds Deposit Received';
        mailBody = `
        <p>Dear ${customerName},</p>
        <p>We hope this message finds you well. We are pleased to inform you that we have received your funds deposit.</p>
        <ul>
          <li>Total Pledge Value: ${totalPledgeValue}</li>
          <li>Current Value: ${marginAvailable}</li>
          <li>Margin Category: ${marginAvailablePercentage}</li>
          <li>Additional Funds Deposited – 50000</li>
        </ul>
        <p>Thank you for your cooperation in maintaining the stability of your portfolio. If you have any further questions or require additional assistance, please do not hesitate to contact our support team.</p>
        <p>Best regards,<br>Newgen</p>`;
        break;
      case 'collateral':
        mailSubject = 'Confirmation: Additional Collateral Received';
        mailBody = `<p>Dear ${customerName},</p>
        <p>We hope this message finds you well. We are pleased to inform you that we have received your additional collateral. Your prompt response is appreciated, and your portfolio has been updated accordingly.</p>
        <ul>
          <li>Total Pledge Value: ${totalPledgeValue}</li>
          <li>Current Value: ${marginAvailable}</li>
          <li>Margin Breach Category: ${marginAvailablePercentage}</li>
          <li>Additional Collateral Received – [Amount]</li>
        </ul>
        <p>Thank you for your cooperation in maintaining the stability of your portfolio. If you have any further questions or require additional assistance, please do not hesitate to contact our support team.</p>
        <p>Best regards,<br>Newgen</p>
        `;
        break;
        case 'newDisbursal':
          mailSubject = 'Welcome to the Loan Against Share (LAS) Portal';
          mailBody = `
            <p>Dear ${customerName},</p>
            <p>We are excited to welcome you to the Loan Against Share (LAS) Portal. As a valued customer, you now have access to a wide range of services designed to help you leverage your portfolio and manage your financial needs with ease.</p>
            <p>Through our portal, you can:</p>
            <ul>
              <li>View and manage your pledged shares and collateral</li>
              <li>Monitor your loan details and margin status</li>
              <li>Request additional credit against your portfolio</li>
              <li>Access real-time market updates and personalized insights</li>
            </ul>
            <p>Your journey with us begins now, and we are here to assist you at every step. Should you have any questions or need assistance, please do not hesitate to reach out to our support team.</p>
            <p>Thank you for choosing us as your financial partner. We look forward to helping you achieve your financial goals.</p>
            <p>Best regards,<br>Newgen</p>
          `;
          break;
        
      case 'partialSell':
        mailSubject = 'Important Update: Partial Sale of Shares Due to Margin Breach';
        mailBody = `<p>Dear ${customerName},</p>
        <p>We hope this message finds you well. We regret to inform you that, as we have not received the required additional collateral or funds within the specified timeframe, we have proceeded with selling a fraction of your shares to cover the breached margin.</p>
        <ul>
          <li>Total Pledge Value:${totalPledgeValue}</li>
          <li>Current Value: [Current Value]</li>
          <li>Margin Breach Category: 25-40%</li>
          <li>Amount to Sold: [Amount]</li>
        </ul>
        <p>We understand that this situation is not ideal and are here to support you. If you have any questions or need further assistance, please contact our support team.</p>
        <p>Thank you for your understanding and prompt attention to this matter.</p>
        <p>Best regards,<br>Newgen</p>
        `;
        break;
      case 'completedSell':
        mailSubject = 'Completed Sell to be done';
        mailBody = `<p>Dear ${customerName},</p>
        <p>We hope this message finds you well. We regret to inform you that, as we have not received the required additional collateral or funds within the specified timeframe, we have been compelled to sell your entire portfolio to cover the breached margin.</p>
        <ul>
          <li>Total Pledge Value: ${totalPledgeValue}</li>
          <li>Current Value: ${marginAvailable}</li>
          <li>Margin Breach Category: Below 25%</li>
          <li>Amount Sold: [Amount]</li>
        </ul>
        <p>We understand that this is a significant matter and are here to offer any support you may need during this time. If you have any questions or require further assistance, please contact our support team.</p>
        <p>Thank you for your understanding and prompt attention to this matter.</p>
        <p>Best regards,<br>Newgen</p>
        `;
        break;
      case 'firstNotice':
        mailSubject = 'Important Notice: Margin Call Breach';
        mailBody = `<p>Dear ${customerName},</p>
        <p>We hope this message finds you well. We would like to bring to your attention a margin breach of 40-50% in your account. It is essential that you take immediate action to address this issue and maintain the stability of your portfolio.</p>
        <ul>
          <li>Total Pledge Value: ${totalPledgeValue}</li>
          <li>Current Value: ${marginAvailable}</li>
          <li>Margin Breach Category: 40-50%</li>
          <li>Amount Required: 10,000</li>
        </ul>
        <p>Please deposit the required additional funds or collateral within the next 24 hours to rectify this breach. Failure to do so may result in partial or complete liquidation of your assets to cover the margin call.</p>
        <p>Thank you for your prompt attention to this matter. If you have any questions or need further assistance, please contact our support team.</p>
        <p>Best regards,<br>Newgen</p>
        `;
        break;
      case 'secondNotice':
        mailSubject = 'Urgent Notice: Immediate Action Required for Margin Call Breach';
        mailBody = `<p>Dear ${customerName},</p>
        <p>We hope this message finds you well. This is a follow-up notice regarding the margin breach of over 50% in your account. Immediate action is required to address this critical issue and prevent potential liquidation of your assets.</p>
        <ul>
          <li>Total Pledge Value: ${totalPledgeValue}</li>
          <li>Current Value: ${marginAvailable}</li>
          <li>Margin Breach Category: Over 50%</li>
          <li>Amount Required: 10,000</li>
        </ul>
        <p>Please deposit the required additional funds or collateral within the next 24 hours to rectify this breach. Failure to do so will result in partial or complete liquidation of your assets to cover the margin call.</p>
        <p>We understand the urgency of this matter and are here to offer any support you may need. Please contact our support team immediately to discuss your options.</p>
        <p>Thank you for your prompt attention to this matter.</p>
        <p>Best regards,<br>Newgen</p>
        `;
        break;
      case 'marginUnderReview':
        mailSubject = 'Notice: Portfolio Under Review Due to Margin Breach';
        mailBody = `<p>Dear ${customerName},</p>
        <p>We hope this message finds you well. We are writing to inform you that your portfolio is currently under review due to a margin breach. Our team is closely monitoring the situation to ensure the stability of your account.</p>
        <ul>
          <li>Total Pledge Value: ${totalPledgeValue}</li>
          <li>Current Value: ${marginAvailable}</li>
          <li>Margin Breach Category: 35%</li>
          <li>Additional Funds/Collateral Required: 10,000</li>
        </ul>
        <p>We kindly request that you deposit the required additional funds or collateral within the next 24 hours to rectify this breach. Your prompt action will help maintain the stability of your portfolio.</p>
        <p>Thank you for your cooperation. If you have any questions or need further assistance, please contact our support team.</p>
        <p>Best regards,<br>Newgen</p>
        `;
        break;
      default:
        break;
    }
    
    sendEmail(mailSubject, mailBody);
    
  })
  };

  return (
    <Grid container spacing={2} bgcolor={'#f9f9f9'} pr={2}>
      <MailingApi />
      <Grid item xs={4} md={3} className='datatiles'>
        <Box>
          <Stack direction={'column'} alignItems={'center'}>
            <Typography variant="h4" component="h4" fontFamily={'Epilogue'} fontWeight={'900'} textAlign={'center'} pt={5}>Quick<br />Actions</Typography>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={4} md={6}>
        <Box alignItems={'center'} mt={8}>
          <SearchBar />
        </Box>
      </Grid>
      <Grid item xs={4} md={3} className='datatiles'>
        <Card variant="outlined">
          <CardContent>
            <Stack direction={'column'} alignItems={'center'}>
              <Stack direction={'row'} gap={2}>
                <Typography variant="subtitle1" component="subtitle1" fontFamily={'Epilogue'} fontWeight={'700'}>{cardLabel}</Typography>
              </Stack>
              <AvatarGroup max={4}>
                <Avatar alt="Travis Howard" src={p2} />
                <Avatar alt="Cindy Baker" src={p3} />
                <Avatar alt="Agnes Walker" src={p4} />
                <Avatar alt="Trevor Henderson" src={p5} />
              </AvatarGroup>
              <CiMail size={40} color="blue" onClick={handleSendEmail} style={{ cursor: 'pointer' }} />
              <Typography variant="subtitle1" component="subtitle1" fontFamily={'Inter'} fontSize={'12px'}>{sendLabel}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={12}>
        <Card>
          <CardContent>
            <FundTable tabledata={data} updateRowSelectedData={updateRowSelectedData}/>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={11} md={11}></Grid>
      <Grid item xs={1} md={1}>
        <Button variant="contained" color="primary" component={Link} to="/dashboard">Back</Button>
      </Grid>
      <Grid item xs={12} md={12}></Grid>
    </Grid>
  );
};

export default OtherCard;

