import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WhatsAppIntegration = forwardRef((props, ref) => {
  const [mobileNumber, setMobileNumber] = useState('9352877854');
  const [whatsappMessage, setWhatsappMessage] = useState('Hi Chetan this side!');
  const [resultWhatsapp, setResultWhatsapp] = useState('');

  useImperativeHandle(ref, () => ({
    sendWhatsAppMessage
  }));

  const sendWhatsAppMessage = async () => {
    const url = 'https://csgrlosdemo.newgensoftware.net:8443/whatsappapi/api/whatsapp/send';

    // Encode data for application/x-www-form-urlencoded
    const data = new URLSearchParams({
      mobileNumber: mobileNumber,
      message: whatsappMessage,
    }).toString();

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.text();
      setResultWhatsapp(result);

      // Show success toast notification
      toast.success('WhatsApp message sent successfully!');
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);

      // Show error toast notification
      toast.error('Error sending WhatsApp message. Please try again later.');
    }
  };

  return (
    <div>
      {/* Toast container to display notifications */}
      <ToastContainer />
    </div>
  );
});

export default WhatsAppIntegration;
