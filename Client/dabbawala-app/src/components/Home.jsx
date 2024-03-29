import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

function Home() {
  const [visibleMeals, setVisibleMeals] = useState(10);
  const [dabbas, setDabbas] = useState([]);
  const [visibleLocations, setVisibleLocations] = useState(10);

  const meals = Array.from({ length: 10 }, (_, i) => `Meal ${i + 1}`);
  const locations = Array.from({ length: 4 }, (_, i) => `Location ${i + 1}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://s55-divyam-capstone-dabbawala.onrender.com/dabba');
        setDabbas(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // corrected code after review
        alert('error fetching data:', error)
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <nav>
        <div className='nav-cont'>
          <img src="https://img.hotimg.com/dabbawala-logo.png" alt="logo" id='logo' />
          <input type="text" placeholder='  Search...' id='search' />
          <a href=""><img src="https://img.hotimg.com/sign-up.png" alt="Signup" className='usercred' /></a>
          <a href=""><img src="https://img.hotimg.com/login718385d45bd21300.png" className='usercred' alt="login" /></a>
          <a href=""><img src="https://img.hotimg.com/shopping-cart-1.png" alt="cart" id='cart' /></a>
        </div>
      </nav>
      <div className='about'>
        <div className='info'>
          <i>
            <h1 className='lines'>Bringing Home to Your Doorstep</h1>
            <br />
            <p className='lines'>Welcome to Dabbawala, where efficiency meets comfort.</p>
            <p className='lines'> Inspired by Maharashtra's dabbawalas,</p>
            <p className='lines'>we bring wholesome meals to your doorstep, </p>
            <p className='lines'>ensuring every bite is a taste of home.</p>
          </i>
        </div>
        <img src="https://img.hotimg.com/Indian_Illustration-removebg-preview.png" alt="dabbawala" id='dabbawala' />
      </div>
      <div className='categories'>
        <div className='menu'>
          <h2 id='cat-1'>Popular categories</h2>
          <div className='fav'>
            {meals.slice(0, visibleMeals).map((meal, index) => (
              <div className="meal" key={index}>{meal}</div>
            ))}
          </div>
        </div>

        <h2 id='cat-2'>Choose your Dabba</h2>
        <div className='choose_dabba'>
          {dabbas.map((dabba) => (
            <div className='dabba' key={dabba._id}>
             
              <img src={dabba.Img} alt={dabba.Name} id='img'/>
            
            
              <p>{dabba.Name}</p>
              <p>Price: {dabba.Price}</p>
              
            <div className='items'>
            <p>Items:</p> 
            {dabba.items.map((item, index) => (
                   <i><p>{item},</p></i>
                ))}
            </div>
               
            
              
            </div>
          ))}
        </div>

        <h2 id='cat-3'>Nearby locations</h2>
        <div className='locations'>
          {locations.slice(0, visibleLocations).map((location, index) => (
            <div className='location' key={index}>{location}</div>
          ))}
        </div>
      </div>

      <footer>
        &copy;2024 Dabbawala.Inc
      </footer>
    </>
  );
}

export default Home;
