
import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assests/avtar.png'
import customer from '../assests/sidebaricon/customer.png'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ListTwoToneIcon from '@mui/icons-material/ListTwoTone';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
const NavBar = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <nav >
        <div className="userdetail">
            <img src={avatar} alt="avtar" width={'100px'} height={'100px'}/>
            <label htmlFor="username" id='username' >Neha Sharma</label>
            <p className="role">Manager</p>
        </div>
        <div className="navbuttons">
            <Link to={'/dashboard'}  style={{ textDecoration: 'none',color:'black' }}>
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                        >
                        <ListItemIcon>
                            <DashboardOutlinedIcon sx={selectedIndex===0?{color:'white' }:''}/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard"  sx={{marginLeft:'-20px'}}/>
                    </ListItemButton>
            </Link>
            <Link to={'/customer'} style={{ textDecoration: 'none',color:'black' }}>
            <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                        >
                        <ListItemIcon>
                            <ListTwoToneIcon sx={selectedIndex===1?{color:'white' }:''}/>
                        </ListItemIcon>
                        <ListItemText primary="Customers" sx={{marginLeft:'-20px'}}/>
                    </ListItemButton>
            </Link>
            
            <Link to={'/settings'} style={{ textDecoration: 'none',color:'black' }}>
            <ListItemButton
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                        >
                        <ListItemIcon>
                            <SettingsOutlinedIcon sx={selectedIndex===2?{color:'white' }:''}/>
                        </ListItemIcon>
                        <ListItemText primary="Settings" sx={{marginLeft:'-20px'}}/>
                    </ListItemButton>
            </Link>
            <Link to={'/genratereport'} style={{ textDecoration: 'none',color:'black' }}>
            <ListItemButton
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3)}
                        >
                        <ListItemIcon>
                            <DescriptionOutlinedIcon sx={selectedIndex===3?{color:'white' }:''}/>
                        </ListItemIcon>
                        <ListItemText primary="Generate Report" sx={{marginLeft:'-20px'}}/>
                    </ListItemButton>
            </Link>
            <Link to={'/newCustomers/newDisbursal'} style={{ textDecoration: 'none',color:'black' }} >
                    <ListItemButton
                        selected={selectedIndex === 4}
                        onClick={(event) => handleListItemClick(event, 4)}
                        >
                        <ListItemIcon>
                            <ListTwoToneIcon sx={selectedIndex===4?{color:'white' }:''}/>
                        </ListItemIcon>
                        <ListItemText primary="New Customers" sx={{marginLeft:'-20px'}}/>
                    </ListItemButton>
            </Link>
        </div>
    </nav>
  )
}

export default NavBar
