import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../App.css'



function Location() {
  const [locationData, setLocationData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://s55-divyam-capstone-dabbawala.onrender.com/location/${id}`);
        setLocationData(response.data);
      } catch (error) {
        console.error('Error fetching location data', error);
        alert('Error fetching location data', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className='location-grid'>
    <img src={locationData.img} alt=""  className='loc-img'/>
      <div className='loc-page'>
        <div className='loc-cont'>
        <img src="https://img.hotimg.com/Designer__1_-removebg-preview-1.png" alt="" id='head-img'/>
        <i><h1 id='title'>{locationData.name}</h1></i>
        
        <p id='loc-info'>{locationData.info}</p>
        <button onClick={()=>navigate('/')} id='back-btn'>BACK</button>
        </div>
        
      </div>
    </div>
  );
}

export default Location;
