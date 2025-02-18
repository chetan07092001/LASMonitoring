import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography } from '@mui/material';
import '../Styles/SpinLoader.css'; // Ensure this file contains the necessary styles
import SpinningCircle from '../assests/SpinningCircle.gif';
import SpinnerNew from '../assests/SpinnerNew.gif';

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const Loader = ({ open, steps, currentStep }) => (
  <Modal open={open} aria-labelledby="loading-modal-title">
    <Box sx={modalStyle}>
      <div className="loader-content">
        <img src={SpinnerNew} alt="Loading" className="loader-image" />
        <div className="steps-container">
          <Typography id="loading-modal-title" variant="h6" component="h2" className="loader-title">
            Calculating...
          </Typography>
          <ul className="steps-list">
            {steps.map((step, index) => (
              <li key={index} className={index === currentStep ? 'active' : ''}>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Box>
  </Modal>
);

Loader.propTypes = {
  open: PropTypes.bool.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentStep: PropTypes.number.isRequired,
};

export default Loader;
