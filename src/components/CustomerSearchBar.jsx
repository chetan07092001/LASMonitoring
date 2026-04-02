import * as React from 'react';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MicNoneIcon from '@mui/icons-material/MicNone';

export default function SearchBar({ searchValue }) {
  const [search, setSearch] = React.useState('');

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(255,255,255,0.12)',
      border: '1px solid rgba(255,255,255,0.25)',
      borderRadius: '8px',
      padding: '4px 6px 4px 12px',
      gap: 4,
      minWidth: 260,
    }}>
      <SearchIcon style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, flexShrink: 0 }} />
      <InputBase
        sx={{
          flex: 1,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          color: 'white',
          '& input::placeholder': {
            color: 'rgba(255,255,255,0.45)',
            opacity: 1,
          },
        }}
        placeholder="Search by LAN / CIF"
        value={search}
        name="customer"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && searchValue(search)}
      />
      <IconButton
        size="small"
        aria-label="voice search"
        style={{ color: 'rgba(255,255,255,0.45)', padding: 5 }}
      >
        <MicNoneIcon style={{ fontSize: 17 }} />
      </IconButton>
      {/* Divider */}
      <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.2)', margin: '0 2px' }} />
      {/* Search button */}
      <button
        type="button"
        aria-label="search"
        onClick={() => searchValue(search)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
          background: 'rgba(255,255,255,0.18)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '6px',
          padding: '5px 12px',
          cursor: 'pointer',
          color: 'white',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '12px',
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.28)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
      >
        <SearchIcon style={{ fontSize: 14 }} />
        Search
      </button>
    </div>
  );
}