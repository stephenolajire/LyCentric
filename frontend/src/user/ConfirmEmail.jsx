// ConfirmEmail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../constant/api';

const ConfirmEmail = () => {
  const { uid, token } = useParams(); // Get uid and token from URL
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying your account...');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to send the uid and token to the backend
    const verifyEmail = async () => {
      try {
        const response = await api.get(`verify_email/${uid}/${token}`);
        
        // If successful, navigate to the verified page
        if (response.status === 200) {
          setMessage('Your account has been successfully verified!');
          navigate('/verified');
        }
      } catch (error) {
        // Handle errors (e.g., invalid or expired token)
        if (error.response && error.response.data) {
          setError(error.response.data.message);
        } else {
          setError('Something went wrong. Please try again later.');
        }
      }
    };

    verifyEmail();
  }, [uid, token]);

  return (
    <div>
        <h1>Hello</h1>
      {error ? <p style={{ color: 'red' }}>{error}</p> : <p>{message}</p>}
    </div>
  );
};

export default ConfirmEmail;
