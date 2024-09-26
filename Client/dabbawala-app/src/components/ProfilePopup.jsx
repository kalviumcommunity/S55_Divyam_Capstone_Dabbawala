// ProfilePopup.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; // Add CSS for styling

const ProfilePopup = ({ username, onClose }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${username}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>x</button>
        <h2>Hi {userData.username}!</h2>
        {/* Display user data */}
        <p><strong>Username:</strong> {userData.username}</p>
        {/* Add more user information here */}
      </div>
    </div>
  );
};

export default ProfilePopup;
