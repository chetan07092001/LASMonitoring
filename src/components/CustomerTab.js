// CustomerTab.js
import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, IconButton, CircularProgress, Backdrop } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import LoanInfo from './LoanInfo';
import SellShares from './SellShares';
import TestComponent from './TestComponent';
import { fetchLMSData } from './LMSSECURITYAPI';
import axios from 'axios';
import CustomerPage from '../CustomerPage';
import CustomerSearchBar from '../components/CustomerSearchBar'

export default function CustomerTab({data}) {
  console.log(data);
  const [value, setValue] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loanData, setLoanData] = useState(null);
  const [highlightMargin, setHighlightMargin] = useState(false);
  const [moveActionTakeMargin, setMoveActionTakeMargin] = useState(false);
 
  
  

  const updatedLoanData = {
    accountNumber: "DL240707106556",
    cif: "CT00062364",
    pledgeValue: "INR 1,10,298",
    branch: "Navi Nerul",
    sanctionedAmount: " INR 55,149",
    securityValue: "INR 1,00,353",
    allowedMargin: "50%",
    drawingPower: "INR 50,176.50",
    outstanding: "INR 55,149",
    overdue: "0",
    collateralRequired: "0",
    marginBreached: "50%",
    actionTaken: "N.A",
    marginBreaches: "2"
  };

  const setStaticLoanData = () => {
    setLoanData({
      accountNumber: "DL240707106556",
      cif: "CT00062364",
      pledgeValue: "INR 1,00,000",
      branch: "Navi Nerul",
      sanctionedAmount: "INR 50,000",
      securityValue: "INR 90,055",
      allowedMargin: "50%",
      drawingPower: "INR 45,028",
      outstanding: "INR 50,000",
      overdue: "INR 4,972",
      collateralRequired: "INR 9,944",
      marginBreached: "44.50%",
      actionTaken: "Email initiated for 5 day deadline",
      marginBreaches: "2",
    });
  };
  
  const fetchInitialLoanData = async (data) => {
    console.log("Inside fetchInitialLoanData accountNumber is "+data);
    setLoading(true); // Show loader
    try {
      const response = await axios.get(
        `https://csgrlosdemo.newgensoftware.net:8443/ABCD/lan/${data[0].lan}`
      );
      
      console.log("API response:", response.data); // Log response for debugging
  
      if (Array.isArray(response.data) && response.data.length > 0) {
        const customerData = response.data[0]; // Assuming the API returns an array
        setLoanData({
          accountNumber: customerData.lan || "DL240707106556",
          cif: customerData.cif || "CT00062364",
          pledgeValue: `INR ${customerData.totalPledge || "1,00,000"}`,
          branch: customerData.branch || "Navi Nerul",
          sanctionedAmount: `INR ${customerData.sanction || "50,000"}`,
          securityValue: `INR ${customerData.currentSec || "90,055"}`,
          allowedMargin: `${customerData.allowedMargin || "50"}%`,
          drawingPower: `INR ${customerData.drainingPower || "45,028"}`,
          outstanding: `INR ${customerData.outstanding || "50,000"}`,
          overdue: `INR ${customerData.currentOverdue || "4,972"}`,
          collateralRequired: `INR ${customerData.additionalCollateral || "9,944"}`,
          marginBreached: `${customerData.margin || "44.50"}%`,
          actionTaken: customerData.actionTaken || "Email initiated for 5 day deadline",
          marginBreaches: customerData.noOfBreach || "2",
        });
      } else {
        console.warn("API returned unexpected data:", response.data);
        setStaticLoanData(); // Fallback to static data
      }
    } catch (error) {
      console.error("Error fetching initial loan data:", error);
      setStaticLoanData(); // Fallback to static data on error
    } finally {
      setLoading(false); // Hide loader
    }
  };
  
 

  useEffect(() => {
    if (data) {
      fetchInitialLoanData(data); // Fetch data when accountNumber changes
    }
  }, [data]); // Re-fetch data when accountNumber changes

  

  const isinCodes = ["INE094A01015", "INE901A01013", "INE133A01011", "INE192A01025","INE192A01026","INE192A01028","INE192A01031","INE1234H095313"];
  const shareCurrValue = ["510","1010","4139","2760","2","4","5","85330"];
  const shareQty = ["25","93","19","8","2","4","5","1400"];
  const currNAV = ["4156","1169","4327","3252","4","16","25","60.95"];
  const marginAllowed = ["40","30","20","35","40","13","18","24"];
  const assetId=["1260","1261","1262","1263","0","22222","2323","0"];

  const handleRefresh = async () => {
    setMoveActionTakeMargin(true);
    setLoading(true); // Start loader

    try {
      //Call fetchLMSData for each isinCode and log the result
      for (let i = 0;i<8;i++) {
        let code = isinCodes[i];
        let shareVal = shareCurrValue[i];
        let currShareQty = shareQty[i];
        let currAssetNav = currNAV[i]; 
        let AssIDone= assetId[i];
        let currAssetMarginAllowed = marginAllowed[i]; 
        const response = await fetchLMSData("DL240707106556",code,shareVal,currShareQty,currAssetNav,currAssetMarginAllowed,AssIDone);
        console.log(`Response for ISIN ${code} and ${shareVal}:`, response);
      }

      // const response = await fetchLMSData("DL240707106535","INE112A01024","60","500","1231");
      // console.log(response);
      
      // Simulate data update after API calls
      setLoanData(updatedLoanData);
      setHighlightMargin(true);
      setRefresh((prev) => !prev); // Toggle refresh state
    } catch (error) {
      console.error("Error during API calls:", error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setMoveActionTakeMargin(true);
  };

  return (
    <Box sx={{ width: '100%' }}> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Loan Info" />
          <Tab label="Sell Shares" />
          <Tab label="Activity Log" />
        </Tabs>
        <IconButton onClick={handleRefresh} aria-label="refresh" style={{ marginRight: '54px' }}>
          <RefreshIcon />
        </IconButton>
      </Box>
      {/* Loader Overlay */}
      <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress size={60} thickness={4.5} color="inherit" />
      </Backdrop>

      {value === 0 && loanData && ( <LoanInfo loanData={loanData} highlightMargin={highlightMargin} moveActionTakeMargin={moveActionTakeMargin} />)}
      {value === 1 && <SellShares refresh={refresh} />}
      {value === 2 && <TestComponent />}
    </Box>
  );
}