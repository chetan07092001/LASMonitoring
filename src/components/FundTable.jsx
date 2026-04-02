import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const fmtDate = (val) => {
  if (!val) return '';
  const d = new Date(val);
  if (isNaN(d)) return val;
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
};

const fmtCurrency = (val) => {
  if (val === null || val === undefined || val === '') return '';
  const num = Number(val);
  if (isNaN(num)) return val;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
};

const columns = [
    { field: 'id', headerName: 'S. NO', width: 70 },
    { field: 'cifId', headerName: 'CIF', width: 70 },
    { field: 'customerName', headerName: 'Customer Name', width: 140 },
    { field: 'securityType', headerName: 'Security Type', width: 130 },
    { field: 'marginAvailablePercentage', headerName: 'Margin %', width: 100 },
    { field: 'branch', headerName: 'Branch', width: 120 },
    { field: 'state', headerName: 'State', width: 110 },
    { field: 'sanctionAmount', headerName: 'Sanction Amount', width: 140, valueFormatter: (value) => fmtCurrency(value) },
    { field: 'tenure', headerName: 'Tenure', width: 80 },
    { field: 'sanctionDate', headerName: 'Sanction Date', width: 120, valueFormatter: (value) => fmtDate(value) },
    { field: 'endDate', headerName: 'End Date', width: 120, valueFormatter: (value) => fmtDate(value) },
    { field: 'totalPledgeValue', headerName: 'Total Pledge Value', width: 150, valueFormatter: (value) => fmtCurrency(value) },
    { field: 'marginUsed', headerName: 'Margin Used', width: 120, valueFormatter: (value) => fmtCurrency(value) },
    { field: 'marginAvailable', headerName: 'Margin Available', width: 130, valueFormatter: (value) => fmtCurrency(value) },
    { field: 'fundDeposited', headerName: 'Fund Deposited', width: 130, valueFormatter: (value) => fmtCurrency(value) },
    { field: 'additionalCollateralDeposited', headerName: 'Additional Collateral', width: 150, valueFormatter: (value) => fmtCurrency(value) },
    { field: 'currentStatus', headerName: 'Status', width: 120,
      renderCell: (params) => {
        const val = (params.value || '').toString().toLowerCase();
        const isActive = val.includes('active') || val.includes('complete');
        const isWarning = val.includes('breach') || val.includes('overdue');
        const bg = isActive ? '#e8f7ee' : isWarning ? '#fdf2f2' : '#f0f6ff';
        const color = isActive ? '#27ae60' : isWarning ? '#C0392B' : '#2563a8';
        const border = isActive ? '#c8ebd4' : isWarning ? '#fcd0cc' : '#d0e4f7';
        return (
          <span style={{
            display: 'inline-block', padding: '2px 10px', borderRadius: '6px',
            background: bg, color, border: `1px solid ${border}`,
            fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600,
          }}>
            {params.value}
          </span>
        );
      }
    },
    {
      field: 'action', headerName: 'Action', sortable: false, width: 100,
      renderCell: () => (
        <Button
          variant="contained"
          size="small"
          style={{
            background: 'linear-gradient(135deg, #1a4a82 0%, #2563a8 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'none',
            padding: '3px 14px',
            boxShadow: '0 2px 6px rgba(37,99,168,0.2)',
          }}
        >
          View
        </Button>
      ),
    },
];

const FundTable = ({ tabledata, updateRowSelectedData }) => {
  return (
    <div style={{
      height: 465,
      width: '100%',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid #e4edf8',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    }}>
      <DataGrid
        rowHeight={38}
        rows={tabledata}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
        }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
        onRowSelectionModelChange={(rowSelectedModel) => updateRowSelectedData(rowSelectedModel)}
        sx={{
          border: 'none',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          color: '#1a3a5c',
          // Header
          '& .MuiDataGrid-columnHeaders': {
            background: 'linear-gradient(90deg, #0d2d54 0%, #1a4a82 100%)',
            borderRadius: 0,
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: '12px',
            color: 'rgba(31, 27, 27, 0.9)',
            letterSpacing: '0.3px',
          },
          '& .MuiDataGrid-columnHeader': {
            color: 'rgba(255,255,255,0.9)',
          },
          '& .MuiDataGrid-columnSeparator': {
            color: 'rgba(255,255,255,0.15)',
          },
          '& .MuiCheckbox-root': {
            color: 'rgba(255,255,255,0.7)',
          },
          '& .MuiDataGrid-columnHeaders .MuiCheckbox-root': {
            color: 'rgba(255,255,255,0.7)',
          },
          // Rows
          '& .MuiDataGrid-row': {
            borderBottom: '1px solid #f0f4fa',
            '&:hover': { backgroundColor: '#f5f8fc' },
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: '#eef5ff !important',
            '&:hover': { backgroundColor: '#e4eefb !important' },
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '12px',
            color: '#1a3a5c',
          },
          '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
            outline: 'none',
          },
          // Footer / pagination
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid #e4edf8',
            background: '#f8fafd',
          },
          '& .MuiTablePagination-root': {
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '12px',
            color: '#6b7d96',
          },
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '12px',
            color: '#6b7d96',
          },
          '& .MuiDataGrid-row .MuiCheckbox-root': {
            color: '#9aabb8',
          },
          '& .MuiDataGrid-row.Mui-selected .MuiCheckbox-root': {
            color: '#2563a8',
          },
        }}
      />
    </div>
  );
};

export default FundTable;