import React from 'react'
import { Card, CardContent, Stack,Typography} from '@mui/material'
import newgen from '../assests/Logo.png'
import { IoCallOutline } from "react-icons/io5";
import { BiMessageDetail } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
const Header = () => {
  return (
    <div style={{height:'100px',marginLeft:'-14px'}}>
        <Card>
            <CardContent className='mainHeader' style={{height:'75px'}}>
                <img src={newgen} alt="newgen"  height={40}/>
                <Stack direction={'row'} gap={[1,2]}>
                    <IoCallOutline size={25}/>
                   <BiMessageDetail size={25}/>
                   <IoMdNotificationsOutline size={25}/>
                </Stack>
            </CardContent>
        </Card>
    </div>
  )
}

export default Header
