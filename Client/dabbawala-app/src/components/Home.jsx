import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Home() {
  const [items, setItems] = useState([]);
  const [dabbas, setDabbas] = useState([]);
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  const loginInfo = sessionStorage.getItem("login");
  const [dabbaStatus, setDabbaStatus] = useState(false);
  const [itemStatus, setItemStatus] = useState(false);
  const [locationStatus, setLocationStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://s55-divyam-capstone-dabbawala.onrender.com/dabba"
        );
        setDabbas(response.data);
        setDabbaStatus(true);
      } catch (error) {
        console.error("Error fetching data:", error);

        // alert('error fetching data:', error)
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://s55-divyam-capstone-dabbawala.onrender.com/item"
        );
        setItems(response.data);
        setItemStatus(true);
      } catch (error) {
        console.error("Error fetching items", error);
        // alert('error fetching items', error)
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://s55-divyam-capstone-dabbawala.onrender.com/location"
        );
        setLocations(response.data);
        setLocationStatus(true);
      } catch (error) {
        console.error("Error fetching items", error);
        // alert('error fetching items', error)
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("login");
    navigate("/");
  };

  const handleLocationClick = (id) => {
    sessionStorage.setItem("selectedLocation", id);
    navigate(`/location/${id}`);
  };

  return (
    <>
      <nav>
        <div className="nav-cont">
          <img
            src="https://img.hotimg.com/Designer__2_-removebg-preview.png"
            alt="logo"
            id="logo"
          />
          <input type="text" placeholder="  Search..." id="search" />
          {loginInfo === "true" ? (
            <>
              <Link to="/cart">
                <img
                  src="https://img.hotimg.com/shopping-cart-1.png"
                  alt="cart"
                  id="cart"
                />
              </Link>
              <Link onClick={handleLogout}>
                <img
                  src="https://img.hotimg.com/logout.png"
                  alt=""
                  id="logout"
                />
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup">
                <img
                  src="https://img.hotimg.com/sign-up.png"
                  alt="Signup"
                  className="usercred"
                />
              </Link>
              <Link to="/login">
                <img
                  src="https://img.hotimg.com/login718385d45bd21300.png"
                  className="usercred"
                  alt="login"
                  id="login"
                />
              </Link>
            </>
          )}
        </div>
      </nav>
      <div className="about">
        <div className="info">
          <i>
            <h1 className="lines">Bringing Home to Your Doorstep</h1>
            <br />
            <p className="lines">
              Welcome to Dabbawala, where efficiency meets comfort.
            </p>
            <p className="lines"> Inspired by Maharashtra's dabbawalas,</p>
            <p className="lines">we bring wholesome meals to your doorstep, </p>
            <p className="lines">ensuring every bite is a taste of home.</p>
          </i>
        </div>
        <img
          src="https://img.hotimg.com/Indian_Illustration-removebg-preview.png"
          alt="dabbawala"
          id="dabbawala"
        />
      </div>

      {dabbaStatus === true &&
      locationStatus === true &&
      itemStatus === true ? (
        <>
          <div className="categories">
            <div className="menu">
              <h2 id="cat-1">Popular categories</h2>
              <div className="fav">
                {items.map((item) => (
                  <div className="meal" key={item._id}>
                    <img src={item.img} alt="item" width="40px" />
                  </div>
                ))}
              </div>
            </div>

            <h2 id="cat-2">Choose your Dabba</h2>
            <div className="choose_dabba">
              {dabbas.map((dabba) => (
                <div className="dabba" key={dabba._id}>
                  <img src={dabba.Img} alt={dabba.Name} id="img" />

                  <p>{dabba.Name}</p>
                  <p>Price: {dabba.Price}</p>

                  <div className="items">
                    <p>Items:</p>
                    {dabba.items.map((item, index) => (
                      <i>
                        <p>{item},</p>
                      </i>
                    ))}
                  </div>
                  <br />
                  {loginInfo === "true" ? (
                    <button>Add to cart</button>
                  ) : (
                    <p></p>
                  )}
                </div>
              ))}
            </div>

            <h2 id="cat-3">Nearby locations</h2>
            <div className="locations">
              {locations.map((location) => (
                <div
                  className="location"
                  key={location._id}
                  onClick={() => handleLocationClick(location._id)}
                >
                  <img src={location.img} alt="location" id="location-img" />
                  <div className="content">{location.name}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="loader-cont">
            <div class="content-loader"></div>
          </div>
        </>
      )}

      <footer>
       
        <div className="footer-cont">

        <div>
          <h4>Contact us</h4>
          {/* <br /> */}
          <p className="foot-text">Contact no: +91-9284299770</p>
          <p className="foot-text">Email: dabbawala@gmail.com</p>
        </div>
        <div>
          <h4>Office address</h4>
          <p className="foot-text">Four Avenues,Loni-Kalbhor</p>
          <p className="foot-text">Pune-India</p>
          <br />
          <p className="foot-text"></p>
        </div>
        <div>
          <h4>Socials</h4>
          <div className="icons">
            <img src="https://img.hotimg.com/instagram775307dff8332d0e.png" alt="" className="social"/>
            <img src="https://img.hotimg.com/twitter.png" alt=""   className="social"/>
            <img src="https://img.hotimg.com/facebookdae9744a48f4d9f5.png" alt=""  className="social" />
          </div>
        </div>

        </div>
        <div className="copyright">
        &copy;2024 Dabbawala.Inc
        </div>
        
      </footer>
    </>
  );
}

export default Home;
