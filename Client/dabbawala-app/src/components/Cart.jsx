import React from "react";
import "../App.css";
 
import { Link, Navigate, useNavigate } from "react-router-dom";

function Cart() {
  // const handleLogout = () => {
  //     sessionStorage.removeItem('login');
  //     {<Navigate to='/'></Navigate>}
  //   };
  const navigate = useNavigate();

  const logout = ()=>{
    sessionStorage.removeItem('login')
    navigate('/')
  }

  return (
    <>
      <nav>
        <div className="cart-nav">
          <img
            src="https://img.hotimg.com/Designer__2_-removebg-preview.png"
            alt="logo"
            id="logo"
          />
          <div id="empty"> </div>
          <Link to="/">
            <img src="https://img.hotimg.com/home-2.png" alt="" id="home" />
          </Link>
          <Link onClick={logout} to='/'>
          <img src="https://img.hotimg.com/logout.png" alt="" id="logout" />
          </Link>
        
        </div>
      </nav>
      <div className="grid">
        <div className="sections">
          <div id="dabba-img">
            <h3>Cart</h3>
            <div id="line"></div>
            <div className="dish-cont">
              <img
                src="https://img.hotimg.com/salad.png"
                alt="salad"
                className="food"
              />
            </div>

            <div id="line2"></div>

            <div className="dish-cont">
              <img
                src="https://img.hotimg.com/Fish-in-a-box.png"
                alt="salad"
                className="food"
              />
            </div>

          </div>
          <div id="product">
            <h3>Product</h3>
            <div id="line"></div>
            <div className="dish-cont">
              <p className="dish">Salad Extravaganza</p>
            </div>

            <div id="line2"></div>
            <div className="dish-cont">
              <p className="dish">Fish-in-a-box</p>
            </div>
          </div>
          <div id="price">
            <h3>Price</h3>
            <div id="line"></div>
            <div className="dish-cont">
              <p className="dish">₹250</p>
            </div>

            <div id="line2"></div>
            <div className="dish-cont">
              <p className="dish">₹250</p>
            </div>
          </div>
          <div id="quantity">
            <h3>Quantity</h3>
            <div id="line"></div>
            <div className="dish-cont">
              <input type="number" className="dish" />
            </div>

            <div id="line2"></div>
            
            <div className="dish-cont">
              <input type="number" className="dish" />
            </div>
          </div>
        </div>
        <div className="checkout">
          <h2>Order Summary</h2>
          <div className="order">
            <div id="line3"></div>
            <div className="total">
              <p>Subtotal</p>
              <p>₹500</p>
            </div>
            <div id="line3"></div>
            <div className="total">
              <p>Shipping</p>
              <p>₹50</p>
            </div>
            <div id="line3"></div>
            <div className="total">
              <p>Total</p>
              <p>₹550</p>
            </div>
            
              <button id="checkout-btn"><Link to='/pay'>Checkout</Link></button>
        
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
