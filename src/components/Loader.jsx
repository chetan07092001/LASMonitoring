import React from 'react'
import '../Styles/Loader.css'
import { Link } from 'react-router-dom'
const Loader = () => {
  return (
    <div className='loader'>
      <div></div>
      <p>Loading ...</p>
      <Link to={'/dashboard'}>Dashboard</Link>
    </div>
    
  )
}

export default Loader
