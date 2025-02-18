import React from 'react';
import { Grid } from '@mui/material';
import { Email, Home, AttachMoney, AccountBalance, Error, Warning, Done, Security, TrendingUp, Report } from '@mui/icons-material';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function LoanInfo({loanData, highlightMargin,MoveACtionTakeMargin}) {
  const iconStyle = { color: 'blue', marginRight: '8px' };
  const iconStyle1 = { color: 'red', marginRight: '245px' };
  const marginColorStyle = highlightMargin ? { color: 'yellow', marginRight: '245px' } : { color: 'red', marginRight: '245px' };
  const MoveACtionTakeStyle=MoveACtionTakeMargin ? { marginLeft: 'auto',marginRight:'239px' } : { marginLeft: 'auto',marginRight:'239px' };
  const labelStyle = { marginLeft: 'auto',marginRight:'245px' };
  const listItemStyle = { marginBottom: '21px',marginLeft:'16px' }; // Added spacing between each line
  const klistItem1Style={marginBottom: '21px',marginTop:'14px',marginLeft:'16px'}
  const labellight={color:'#6E7787'}

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', ...klistItem1Style }}>
        <InfoOutlinedIcon style={iconStyle} />
        <div style={labellight}>Loan Account Number</div>
        <div style={labelStyle}>{loanData.accountNumber}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', ...listItemStyle }}>
        <AlternateEmailOutlinedIcon style={iconStyle} />
        <div style={labellight}>Total Pledge Value</div>
        <div style={labelStyle}>{loanData.pledgeValue}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', ...listItemStyle }}>
        <HomeOutlinedIcon style={iconStyle} />
        <div style={labellight}>Branch</div>
        <div style={labelStyle}>Navi Nerul</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', ...listItemStyle }}>
        <CurrencyRupeeIcon style={iconStyle} />
        <div style={labellight}>Sanctioned Amount</div>
        <div style={labelStyle}>{loanData.sanctionedAmount}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', ...listItemStyle }}>
        <Security style={iconStyle} />
        <div style={labellight}>Current Security Value</div>
        <div style={labelStyle}>{loanData.securityValue}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', ...listItemStyle }}>
        <ErrorOutlineOutlinedIcon style={iconStyle} />
        <div style={labellight}>Allowed Margin</div>
        <div style={labelStyle}>{loanData.allowedMargin}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', ...listItemStyle }}>
        <CurrencyRupeeIcon style={iconStyle} />
        <div style={labellight}>Drawing Power</div>
        <div style={labelStyle}>{loanData.drawingPower}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', ...listItemStyle }}>
        <WarningAmberOutlinedIcon style={iconStyle} />
        <div style={labellight}>Outstanding</div>
        <div style={labelStyle}>{loanData.outstanding}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', ...listItemStyle }}>
        <ReportOutlinedIcon style={iconStyle} />
        <div style={labellight}>Current Overdue</div>
        <div style={labelStyle}>{loanData.overdue}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', ...listItemStyle }}>
        <CurrencyRupeeIcon style={iconStyle} />
        <div style={labellight}>Additional Collateral Required</div>
        <div style={labelStyle}>{loanData.collateralRequired}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', ...listItemStyle }}>
        <ErrorOutlineOutlinedIcon style={iconStyle} />
        <div style={labellight}>Margin </div>
        <div style={{ marginLeft: 'auto', ...marginColorStyle }}>{loanData.marginBreached}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', ...listItemStyle }}>
        <MarkEmailReadOutlinedIcon style={iconStyle} />
        <div style={labellight}>Action Taken</div>
        <div style={{ marginLeft: 'auto', ...MoveACtionTakeStyle }}>{loanData.actionTaken}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', ...listItemStyle }}>
        <WarningAmberOutlinedIcon style={iconStyle} />
        <div style={labellight}>No. of Margin Breaches</div>
        <div style={labelStyle}>{loanData.marginBreaches}</div>
      </div>
    </div>
  );
}

export default LoanInfo;
