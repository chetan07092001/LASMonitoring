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
    <Box sx={{ padding: 2, bgcolor: '#EEF2F7', minHeight: '100vh' }}>

      {/* Page header */}
      <Box sx={{
        background: 'linear-gradient(90deg, #0d2d54 0%, #1a4a82 100%)',
        borderRadius: '16px',
        px: 3, py: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 18px rgba(13,45,84,0.18)',
        mb: 2,
      }}>
        <div>
          <Typography
            sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '20px', color: 'white', lineHeight: 1.2 }}
          >
            Generate Report
          </Typography>
          <Typography
            sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.55)', mt: 0.3 }}
          >
            Loan Against Securities — Upload & Export
          </Typography>
        </div>

        {/* Action buttons */}
        <Box display="flex" gap={1}>
          <button
            onClick={handleButtonClick}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '8px',
              padding: '9px 18px',
              color: 'white',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px', fontWeight: 600,
              cursor: 'pointer', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >
            ↑ Upload Data
          </button>
          <button
            onClick={handleDownload}
            disabled={excelData.length === 0}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: excelData.length === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '9px 18px',
              color: excelData.length === 0 ? 'rgba(255,255,255,0.35)' : 'white',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px', fontWeight: 600,
              cursor: excelData.length === 0 ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { if (excelData.length > 0) e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
            onMouseLeave={e => { if (excelData.length > 0) e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
          >
            ↓ Download Report
          </button>
        </Box>
      </Box>

      <input
        type="file"
        id="upload-excel"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Loader */}
      <Loader open={loading} steps={steps} currentStep={currentStep} />

      {/* Empty state */}
      {excelData.length === 0 && !loading && (
        <Box sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: 'white', borderRadius: '16px', border: '1px solid #e4edf8',
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          py: 10, px: 4, mt: 2,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'linear-gradient(135deg, #eef2f7, #d0e4f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 16, fontSize: 28,
          }}>📂</div>
          <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '18px', color: '#1a3a5c', mb: 1 }}>
            No Data Loaded
          </Typography>
          <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#6b7d96', mb: 3, textAlign: 'center' }}>
            Upload an Excel file (.xlsx or .xls) to preview and process your data.
          </Typography>
          <button
            onClick={handleButtonClick}
            style={{
              background: 'linear-gradient(135deg, #1a4a82 0%, #2563a8 100%)',
              color: 'white', border: 'none', borderRadius: '8px',
              padding: '10px 24px',
              fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 600,
              cursor: 'pointer', boxShadow: '0 2px 8px rgba(37,99,168,0.2)',
            }}
          >
            ↑ Upload Excel File
          </button>
        </Box>
      )}

      {/* Data grid */}
      {excelData.length > 0 && (
        <Box sx={{
          background: 'white', borderRadius: '16px',
          border: '1px solid #e4edf8', boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          overflow: 'hidden', mt: 2,
        }}>
          {/* Table header bar */}
          <Box sx={{
            px: 3, py: 1.5,
            borderBottom: '1px solid #e4edf8',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', color: '#1a3a5c' }}>
              Report Preview
            </Typography>
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#6b7d96' }}>
              {excelData.length} rows loaded
            </Typography>
          </Box>

          <div style={{ height: 'calc(100vh - 260px)', width: '100%' }}>
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
              sx={{
                border: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '12px',
                color: '#1a3a5c',
                '& .MuiDataGrid-columnHeaders': {
                  background: 'linear-gradient(90deg, #0d2d54 0%, #1a4a82 100%)',
                },
                '& .MuiDataGrid-columnHeader': {
                  backgroundColor: 'transparent !important',
                  color: 'rgba(255,255,255,0.9)',
                },
                '& .MuiDataGrid-scrollbarFiller--header': {
                  backgroundColor: '#1a4a82 !important',
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600, fontSize: '12px',
                  color: 'rgba(255,255,255,0.9)', letterSpacing: '0.3px',
                },
                '& .MuiDataGrid-columnSeparator': { color: 'rgba(255,255,255,0.15)' },
                '& .MuiDataGrid-sortIcon, & .MuiDataGrid-menuIconButton, & .MuiDataGrid-iconButtonContainer button': {
                  color: 'rgba(255,255,255,0.7)',
                },
                '& .MuiDataGrid-columnHeaders .MuiCheckbox-root': { color: 'rgba(255,255,255,0.7)' },
                '& .MuiDataGrid-row': {
                  borderBottom: '1px solid #f0f4fa',
                  '&:hover': { backgroundColor: '#f5f8fc' },
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: 'none', fontFamily: "'DM Sans', sans-serif",
                  fontSize: '12px', color: '#1a3a5c',
                },
                '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': { outline: 'none' },
                '& .MuiDataGrid-footerContainer': {
                  borderTop: '1px solid #e4edf8', background: '#f8fafd',
                },
                '& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                  fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#6b7d96',
                },
                '& .MuiDataGrid-toolbarContainer': {
                  borderBottom: '1px solid #e4edf8',
                  padding: '8px 16px',
                  background: '#f8fafd',
                },
                '& .MuiButton-root': {
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '12px', color: '#2563a8',
                },
              }}
            />
          </div>
        </Box>
      )}
    </Box>
  );
}
