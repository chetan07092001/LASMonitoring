
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const MailingApi = () => {
  return (
    <div>
      {/* Toast container to display notifications */}
      <ToastContainer />
    </div>
  ); // This component doesn't render anything, just encapsulates the email sending logic
};

export const sendEmail = (mailSubject, mailBody) => {
  const url = 'https://csgrlosdemo.newgensoftware.net:8443/lasportalbackendservices/sendMail';

  const body = {
    mailBody: mailBody,

    mailTo: 'sangal.rajesh837@gmail.com',
   //mailTo: 'chetankjadhav2001@gmail.com',
    mailSubject: mailSubject
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(response => response.text())  // Assuming the response is text, adjust if JSON
    .then(data => {
      console.log('Email sent successfully:', data);
      toast.success('Email sent successfully!');
      
    })
    .catch(error => {
      console.error('Error sending email:', error);
      toast.error('Error sending email');
    });
};

export default MailingApi;
