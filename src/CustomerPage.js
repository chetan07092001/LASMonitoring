import { useState } from 'react';
import { Alert, Grid, Typography } from '@mui/material';
import CustomerHeader from './components/CustomerHeader';
import CustomerDetails from './components/CustomerDetails';
import CustomerTab from './components/CustomerTab';

function CustomerPage() {
  const [customerDetail, setCustomerDetail] = useState(false);
  const [norecord, setNorecord] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchValue = async (num) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://csgrlosdemo.newgensoftware.net:8443/ABCD/lan/${num.trim()}`
      );
      if (response.ok) {
        const data = await response.json();
        setCustomerData(data);
        if (data && data.length > 0) {
          setCustomerDetail(true);
          setNorecord(false);
        } else {
          setCustomerDetail(false);
          setNorecord(true);
        }
      } else {
        setCustomerDetail(false);
        setNorecord(true);
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
      setCustomerDetail(false);
      setNorecord(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomerHeader searchValue={searchValue} />
      {loading && (
        <Typography align="center" sx={{ marginTop: 2 }}>
          Loading...
        </Typography>
      )}
      {customerDetail && <CustomerDetails data={customerData} />}
      {norecord && (
        <Alert severity="error" sx={{ width: '250px', margin: 'auto', marginTop: 2 }}>
          No Customer Found!!
        </Alert>
      )}
    </>
  );
}

export default CustomerPage;
