import React from 'react'
import { Stack, Typography } from '@mui/material'
import newgen from '../assests/Logo.png'
import { IoCallOutline } from "react-icons/io5";
import { BiMessageDetail } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";

const Header = () => {
  return (
    <div style={{
      background: 'linear-gradient(90deg, #0d2d54 0%, #1a4a82 100%)',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      boxShadow: '0 2px 12px rgba(13,45,84,0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      marginBottom: '20px',
      width: '101.1%',
      marginLeft: '-12px',
    }}>
      {/* Logo */}
      <img
        src={"https://newgensoft.com/wp-content/uploads/2023/12/Logo-High.png"}
        alt="newgen"
        height={64}
        // style={{ filter: 'brightness(0) invert(1)', opacity: 0.92 }}
      />

      {/* Right actions */}
      <Stack direction={'row'} alignItems={'center'} gap={1}>
        {[
          { icon: <IoCallOutline size={18} />, label: 'Call' },
          { icon: <BiMessageDetail size={18} />, label: 'Messages' },
          { icon: <IoMdNotificationsOutline size={20} />, label: 'Notifications' },
        ].map(({ icon, label }) => (
          <button
            key={label}
            title={label}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '8px',
              padding: '7px 9px',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.85)',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            {icon}
          </button>
        ))}

        {/* Avatar */}
        <div style={{
          width: 34, height: 34,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          border: '2px solid rgba(255,255,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginLeft: 4,
          cursor: 'pointer',
        }}>
          <Typography
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1,
            }}
          >
            AS
          </Typography>
        </div>
      </Stack>
    </div>
  )
}

export default Header
