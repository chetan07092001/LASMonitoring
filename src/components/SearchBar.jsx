import * as React from 'react';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MicNoneIcon from '@mui/icons-material/MicNone';

export default function SearchBar({ searchValue }) {
  const [search, setSearch] = React.useState('');

  const handleSearchClick = () => {
    const currentUrl = window.location.href;
    const newUrl = `https://hnbdemo.newgensoftware.net/LASMonitoring/#/customer`;
    if (currentUrl === newUrl) {
      window.history.pushState(null, '', newUrl);
    } else {
      window.open(newUrl, '_blank');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      background: '#fff',
      border: '1px solid #d0e4f7',
      borderRadius: '10px',
      padding: '4px 6px 4px 14px',
      boxShadow: '0 1px 6px rgba(37,99,168,0.07)',
      gap: 4,
      width: '100%',
      boxSizing: 'border-box',
    }}>
      <SearchIcon style={{ color: '#9aabb8', fontSize: 18, flexShrink: 0 }} />
      <InputBase
        sx={{
          flex: 1,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          color: '#1a3a5c',
          '& input::placeholder': {
            color: '#9aabb8',
            opacity: 1,
          },
        }}
        placeholder="Search customer..."
        value={search}
        name="customer"
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Mic button */}
      <IconButton
        size="small"
        aria-label="voice search"
        style={{ color: '#9aabb8', padding: 6 }}
      >
        <MicNoneIcon style={{ fontSize: 18 }} />
      </IconButton>
      {/* Divider */}
      <div style={{ width: 1, height: 22, background: '#e4edf8', margin: '0 2px' }} />
      {/* Search button */}
      <button
        type="button"
        aria-label="search"
        onClick={handleSearchClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a4a82 0%, #2563a8 100%)',
          border: 'none',
          borderRadius: '7px',
          padding: '6px 14px',
          cursor: 'pointer',
          gap: 5,
          color: 'white',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '12px',
          fontWeight: 600,
          boxShadow: '0 2px 6px rgba(37,99,168,0.2)',
          whiteSpace: 'nowrap',
        }}
      >
        <SearchIcon style={{ fontSize: 15 }} />
        Search
      </button>
    </div>
  );
}
