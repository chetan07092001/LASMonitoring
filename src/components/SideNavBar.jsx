
import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assests/avtar.png'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import '../Styles/sidenav.css';

const navItems = [
  { label: 'Dashboard',        icon: DashboardOutlinedIcon,    to: '/dashboard' },
  { label: 'Customers',        icon: PeopleOutlinedIcon,        to: '/customer' },
  { label: 'Settings',         icon: SettingsOutlinedIcon,      to: '/settings' },
  { label: 'Generate Report',  icon: DescriptionOutlinedIcon,   to: '/genratereport' },
  { label: 'New Customers',    icon: PersonAddOutlinedIcon,     to: '/newCustomers/newDisbursal' },
  { label: 'Security Dashboard', icon: SecurityOutlinedIcon,   to: '/securityPortfolio' },
];

const NavBar = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <nav style={{position: "fixed"}}>
      {/* User profile section */}
      <div className="userdetail">
        <div className="avatarRing">
          <img src={avatar} alt="avatar" width={64} height={64} style={{ borderRadius: '50%', objectFit: 'cover' }} />
        </div>
        <label htmlFor="username" id="username">Annie Smith</label>
        <p className="role">Manager</p>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 16px 16px' }} />

      {/* Nav items */}
      <div className="navbuttons">
        {navItems.map(({ label, icon: Icon, to }, index) => (
          <Link key={label} to={to} style={{ textDecoration: 'none' }}>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
              sx={{
                borderRadius: '10px',
                mx: 1,
                mb: 0.5,
                py: 1,
                '&.Mui-selected': {
                  background: 'rgba(255,255,255,0.15) !important',
                  '&:hover': { background: 'rgba(255,255,255,0.2) !important' },
                },
                '&:hover': { background: 'rgba(255,255,255,0.08)' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 38 }}>
                <Icon sx={{ fontSize: 20, color: selectedIndex === index ? 'white' : 'rgba(255,255,255,0.55)' }} />
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: selectedIndex === index ? 600 : 400,
                  color: selectedIndex === index ? 'white' : 'rgba(255,255,255,0.65)',
                }}
              />
              {selectedIndex === index && (
                <div style={{ width: 3, height: 20, borderRadius: 2, background: 'rgba(255,255,255,0.7)' }} />
              )}
            </ListItemButton>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
