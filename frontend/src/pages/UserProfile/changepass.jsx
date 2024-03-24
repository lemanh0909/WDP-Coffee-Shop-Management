// ChangePassword.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './UserProfilenew.css'; // Import CSS file

const ChangePassword = ({ onClose, onSuccess, accessToken  }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e, accessToken) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    try {
        const response = await axios.patch(
          `http://localhost:5000/api/v1/auth/password`,
          {
            oldPassword,
            password: newPassword,
          },
          {
            headers: {
              'Authorization': `Bearer ${accessToken}` // Thêm token vào header
            }
          }
        );

      if (response.data.success) {
        setSuccess('Change Password Success');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        onSuccess(); 
        onClose(); 
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Error');
    }
  };

  return (
    <div className="ChangePassword"> {/* Thêm class name ChangePassword */}
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      
      <form onSubmit={handleSubmit} className='mt-3'>
  
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Repeat Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div>
            <button type="button" className="close mr-10" onClick={onClose}>Close</button>
        <button type="submit">Save</button>
        </div>
        
      </form>
    </div>
  );
};

export default ChangePassword;
