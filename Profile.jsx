import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; // Update with your CSS filename

const Profile = ({ userId }) => {
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`/api/auth/profile?userId=${userId}`);
        setUserData(res.data);
      } catch (error) {
        setMessage(error.response.data.msg || 'An error occurred');
      }
    };

    fetchUserData();
  }, [userId]); // Fetch data whenever userId changes

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {message && <p>{message}</p>}
      <div className="profile-info">
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
      </div>
    </div>
  );
};

export default Profile;
