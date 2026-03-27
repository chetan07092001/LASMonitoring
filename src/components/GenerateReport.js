import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { saveAs } from 'file-saver';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Loader from './SpinLoader';
import '../Styles/SpinLoader.css'; 
import { fetchLMSData } from './LMSSECURITYAPI';
import {fetchUpdateCustExel} from './UPDATECUSTEXEL';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const steps = [
  'Fetching Data',
  'Updating NAV Values',
  'Identifying Shares',
  'Updating New Profile Values',
  'Calculating LTV',
  'Calculating Margin Breach',
  'Updating Dashboard'
];

/**
 * @author Chetan Jadhav
 * Sends formatted Excel data to the LMS API.
 * @param {Array<Object>} formattedExcelData - data parsed from excel.
 */
async function sendExcelDataToLMS(formattedExcelData){
  if(formattedExcelData) {
    console.log("Sending data to LMS:", formattedExcelData);
    for(let i of formattedExcelData){
      if(i["CIF"] && i["Asset ID"]){
        await fetchLMSData(
          i["Account Number"],
          i["ISIN Number"],
          i["Current Share Value"],
          i["Total Shares"],
          i["Current Share Value(NAV)"],
          i["Margin Allowed"],
          i["Asset ID"]
        );
      }
    }
  }
}

/**
 * @author Chetan Jadhav
 * Sends formatted Excel data to the LAS API.
 * @param {Array<Object>} formattedExcelData -data parsed from the excel.
 */
async function sendExcelDataToLAS(formattedExcelData){
  if(formattedExcelData) {
    console.log("Sending data to LAS:", formattedExcelData);
    for(let i of formattedExcelData){
      if(i["CIF"]){
        await fetchUpdateCustExel(
          i["Current Share Sum"],
          i["Drawing Power"],
          i["Outstanding Balance"],
          i["Current Overdue"],
          i["Additional Collateral"],
          i["Margin"],
          i["Action Taken"],
          i["Count of Breach"],
          i["CIF"]
        );
      }
    }
  }
}

export default function ExcelToDataGrid() {
  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  //loader story for las
  useEffect(() => {
    if (loading) {
      let stepIndex = 0;
      const interval = 15000 / steps.length;

      const intervalId = setInterval(() => {
        setCurrentStep(stepIndex);
        stepIndex += 1;
        if (stepIndex >= steps.length) {
          clearInterval(intervalId);
        }
      }, interval);

      return () => clearInterval(intervalId);
    }
  }, [loading]);

  /**
   * @author Chetan Jadhav
   * @param {Event} e - The file input change event.
   */
  const handleFileChange = async (e) => {
    setLoading(true); 
    const file = e.target.files[0]; 

    if (file) {
      const reader = new FileReader(); 
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result); 
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0]; 
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, cellDates: true });

        const headers = jsonData.shift(); 
        const formattedData = jsonData.map((row, index) =>
          row.reduce((acc, val, colIndex) => {
            let processedVal = val;
            if (headers[colIndex] === 'Sanction Date' || headers[colIndex] === 'End date') {
             
              if (val instanceof Date) {
                processedVal = val.toLocaleDateString('en-GB'); 
              }
              
              else if (typeof val === 'number') {
                
                const excelDate = new Date(Math.round((val - 25569) * 86400 * 1000));
                processedVal = excelDate.toLocaleDateString('en-GB'); 
              }
              
              else if (typeof val === 'string') {
                const parsedDate = new Date(val);
                if (!isNaN(parsedDate.getTime())) {
                  processedVal = parsedDate.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
                } else {
                  processedVal = val;
                }
              }
            }
            acc[headers[colIndex]] = processedVal;
            return acc;
          }, { id: index + 1 })
        );
        setTimeout(() => {
          setExcelData(formattedData);
          setLoading(false); 
          sendExcelDataToLAS(formattedData); 
          sendExcelDataToLMS(formattedData);
        }, 15000);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  
  const handleButtonClick = () => {
    document.getElementById('upload-excel').click();
  };

  
  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: EXCEL_TYPE }); 
    saveAs(data, 'download.xlsx');
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton>
          <ArrowForwardIcon />
        </IconButton>
        <Typography variant="h4">
          Generate Report
        </Typography>
      </Box>
      <Button variant="contained" onClick={handleButtonClick} style={{ marginRight: '10px' }}>
        Upload Data
      </Button>
      <Button variant="contained" color="secondary" onClick={handleDownload} disabled={excelData.length === 0}>
        Download Report
      </Button>
      <input
        type="file"
        id="upload-excel"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      {/* Loader component to show progress */}
      <Loader open={loading} steps={steps} currentStep={currentStep} />
      <div style={{ height: 'calc(100vh - 150px)', width: '100%', marginTop: '20px' }}>
        <DataGrid
          rows={excelData}
          columns={
            excelData.length > 0
              ? Object.keys(excelData[0])
                .filter(header => header !== 'id') 
                .map(header => ({ field: header, headerName: header, width: 150 }))
              : []
          }
          components={{ Toolbar: GridToolbar }}
          pageSize={5}
          getRowId={(row) => row.id} 
        />
      </div>
    </Box>
  );
}
