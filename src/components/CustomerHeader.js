
import React from 'react';
import SearchBar from './CustomerSearchBar';

const CustomerHeader = ({ searchValue }) => {
  return (
    <div style={{
      background: 'linear-gradient(90deg, #0d2d54 0%, #1a4a82 100%)',
      borderRadius: '16px',
      padding: '14px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      boxShadow: '0 4px 18px rgba(13,45,84,0.18)',
      flexWrap: 'wrap',
      marginBottom: '16px',
    }}>
      {/* Title */}
      <div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '20px',
          color: 'white',
          lineHeight: 1.2,
        }}>
          Customer Details
        </div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '12px',
          color: 'rgba(255,255,255,0.55)',
          marginTop: 2,
        }}>
          Loan Against Securities — Customer View
        </div>
      </div>

      {/* Search + Edit */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <SearchBar searchValue={searchValue} />
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(255,255,255,0.12)',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '8px',
          padding: '9px 18px',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif",
          whiteSpace: 'nowrap',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
        >
          ✎ Edit
        </button>
      </div>
    </div>
  );
};

export default CustomerHeader;
