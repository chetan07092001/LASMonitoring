import * as React from 'react';

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Button, TextField, Dialog, DialogContent
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function createData(sno, isin, company, currentValue, totalShares, total, numToSell, sellValue) {
  return { id: sno, sno, isin, company, currentValue, totalShares, total, numToSell, sellValue };
}

const initialRows = [
  createData(1, 'INE002A01018', 'RELIANCE', 510, 70, 35700, 0, 0),
  createData(2, 'INE081A01012', 'TCS', 1010, 6, 5050, 0, 0),
  createData(3, 'INE152A01029', 'INFY', 4139, 5, 20695, 0, 0),
  createData(4, 'INE112A01023', 'KOTAKBANK', 2760, 10, 27600, 0, 0),
];

const updatedRows = [
  createData(1, 'INE002A01018', 'RELIANCE', 510, 25, 12750, 0, 0),
  createData(2, 'INE081A01012', 'TCS', 1010, 93, 93930, 0, 0),
  createData(3, 'INE152A01029', 'INFY', 4139, 19, 78641, 0, 0),
  createData(4, 'INE112A01023', 'KOTAKBANK', 2760, 8, 22080, 0, 0),
];

export default function SellShares({ refresh }) {
  const [rows, setRows] = React.useState(initialRows);
  const [totalSellValue, setTotalSellValue] = React.useState(0);
  const [additionalCollateral, setAdditionalCollateral] = React.useState(89045);
  const [additionalCollateral1, setAdditionalCollateral1] = React.useState(9944);
  const [portfolioValue, setPortfolioValue] = React.useState(90055);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleNumToSellChange = (id, value) => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === id) {
          const numToSell = Math.min(value, row.totalShares);
          const sellValue = numToSell * row.currentValue;
          return { ...row, numToSell, sellValue };
        }
        return row;
      })
    );
  };

  React.useEffect(() => {
    const newTotalSellValue = rows.reduce((acc, row) => acc + row.sellValue, 0);
    setTotalSellValue(newTotalSellValue);
  }, [rows]);

  React.useEffect(() => {
    const totalPortfolioValue = rows.reduce((acc, row) => acc + row.total, 0);
    const additionalCollateralRequired = Math.max(totalPortfolioValue - totalSellValue, 0);
    setAdditionalCollateral(additionalCollateralRequired);
  }, [rows, totalSellValue]);

  React.useEffect(() => {
    setRows(refresh ? updatedRows : initialRows);
    if (refresh) {
      setPortfolioValue(207401);
      setAdditionalCollateral(0);
      setAdditionalCollateral1(0);
      setRows(updatedRows);
    } else {
      setPortfolioValue(90055);
      setAdditionalCollateral(89045);
      setAdditionalCollateral1(9944);
      setRows(initialRows);
    }
  }, [refresh]);

  const handleSellClick = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="sell shares table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#4B7BEC', color: 'white' }}>S.No</TableCell>
              <TableCell sx={{ backgroundColor: '#4B7BEC', color: 'white' }}>ISIN Number</TableCell>
              <TableCell sx={{ backgroundColor: '#4B7BEC', color: 'white' }}>Company</TableCell>
              <TableCell sx={{ backgroundColor: '#4B7BEC', color: 'white' }}>Current Share Value</TableCell>
              <TableCell sx={{ backgroundColor: '#4B7BEC', color: 'white' }}>Total Shares</TableCell>
              <TableCell sx={{ backgroundColor: '#4B7BEC', color: 'white' }}>Total</TableCell>
              <TableCell sx={{ backgroundColor: '#4B7BEC', color: 'white', width: '200px' }}>No. of shares to be sold</TableCell>
              <TableCell sx={{ backgroundColor: '#4B7BEC', color: 'white' }}>Sell Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.sno}>
                <TableCell component="th" scope="row">{row.sno}</TableCell>
                <TableCell>{row.isin}</TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell>{row.currentValue}</TableCell>
                <TableCell>{row.totalShares}</TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={row.numToSell}
                    onChange={(e) => handleNumToSellChange(row.id, parseInt(e.target.value))}
                    inputProps={{ min: 0, max: row.totalShares }}
                    sx={{ width: '90px' }}
                  />
                </TableCell>
                <TableCell>{row.sellValue}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2} />
              <TableCell align="right" colSpan={2}>Portfolio Value:</TableCell>
              <TableCell colSpan={1} align="left">INR {portfolioValue}</TableCell>
              <TableCell align="center" colSpan={2}>Total Sell Value:</TableCell>
              <TableCell colSpan={1} align="left">INR {totalSellValue}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 2, p: 1, border: '1px solid #ccc', borderRadius: 1, textAlign: 'center', backgroundColor: 'blue', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontSize: '14px' }}>Additional Collateral required:</Typography>
          <Typography variant="h8" color="white" sx={{ paddingTop: '15px', marginRight: '246px' }}>INR {additionalCollateral1}</Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontSize: '14px' }}>Total Sell Value:</Typography>
          <Typography variant="h8" color="white" sx={{ paddingTop: '15px', marginRight: '246px' }}>INR {totalSellValue}</Typography>
        </div>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleSellClick}>SELL</Button>
      </Box>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogContent sx={{ textAlign: 'center' }}>
          <CheckCircleOutlineIcon sx={{ fontSize: 40, color: 'blue' }} />
          <Typography variant="h6">Order has been placed.</Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
