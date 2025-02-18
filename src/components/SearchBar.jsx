import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MicNoneIcon from '@mui/icons-material/MicNone';

export default function SearchBar({searchValue}) {
  const [search, setSearch] = React.useState('');

  const handleSearchClick = () => {
    const currentUrl = window.location.href;
    const newUrl = `https://hnbdemo.newgensoftware.net/LASMonitoring/#/customer`;
    //const newUrl = `http://127.0.0.1:3000/#/customer`;

    if (currentUrl === newUrl) {
      
      window.history.pushState(null, '', newUrl);
    } else {
      
      window.open(newUrl, '_blank');
    }
  };

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Customer"
        value={search}
        name='customer'
        onChange={(e) => setSearch(e.target.value)}
      />
      <IconButton type="button" sx={{ p: '10px'}} aria-label="search">
        <MicNoneIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px'}} aria-label="directions" onClick={handleSearchClick}>
        <SearchIcon color='primary'/>
      </IconButton>
    </Paper>
  );
}
