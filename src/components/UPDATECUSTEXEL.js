// UPDATECUSTEXEL.js
import axios from 'axios';

export const fetchUpdateCustExel = async (currentSec,drainingPower,outstanding,currentOverdue,additionalCollateral,margin,actionTaken,noOfBreach,cif) => {
  const data ={
  "currentSec": currentSec,                
  "drainingPower": drainingPower,            
  "outstanding": outstanding,              
  "currentOverdue": currentOverdue,          
  "additionalCollateral": additionalCollateral,      
  "margin": margin,                      
  "actionTaken": actionTaken,        
  "noOfBreach": noOfBreach                    
}

  try {
    const res = await axios.put(`https://csgrlosdemo.newgensoftware.net:8443/ABCD/update/cif/${cif}`, data);
    return res.data; // Return the response data
  } catch (err) {
    throw new Error(`Error fetching data for CIF: ${err.message}`);
  }
};