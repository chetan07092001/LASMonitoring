import {HashRouter as Router,Routes,Route} from 'react-router-dom';
import NavBar from './components/SideNavBar';
import Dashboard from './components/Dashboard';
import './Styles/sidenav.css';
import './Styles/dashboard.css';
import TotalCasesChart from './components/TotalCasesChart';
import Header from './components/Header';
import FundDeposited from './components/MarginBreachedTable';
import OtherCard from './components/OtherCard';
//import SearchBar from './components/SearchBar';
import CustomerSearchBar from './components/CustomerSearchBar'
import Login from './components/LogIn';
import { Alert, Grid, Typography } from '@mui/material';
import CustomerDetails from './components/CustomerDetails';
import CustomerTab from './components/CustomerTab';
import CustomerHeader from './components/CustomerHeader';
import GenerateReport from './components/GenerateReport';
import TotalCaseTable from './components/TotalCaseTable';
import CustomerPage from './CustomerPage';
import { useState } from 'react';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<AuthenticatedRoutes />} />
        
      </Routes>
    </Router>
  );
}

function AuthenticatedRoutes() {
  return (
    <Grid container spacing={1}>
        <Grid item xs={3} md={2}>        
          <NavBar />
        </Grid>
        <Grid item xs={9} md={10}>
          <Grid item xs={12} md={12}>         
            <Header/>
          </Grid>
          <Grid item xs={12} md={12}> 
            <Routes >
              <Route path="/dashboard" element={<Dashboard />} />
              
              <Route path="/customer" element={<CustomerPage />} />
              <Route path="/settings" element={<></>} />
              <Route path="/genratereport" element={<GenerateReport/>} />
              <Route path="/newCustomers/:id" element={<OtherCard />} />
              <Route path="/portfolioHealth" element={<FundDeposited />} />
              <Route path="/dashboard/:id" element={<OtherCard />} />
              <Route path="/totalCaseTable" element={<TotalCaseTable/>} />
              
            </Routes>
          </Grid>
        </Grid>
    </Grid>
  );
}




export default App;
