import React, { useMemo } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

function Cart() { // Receive cart as a prop

  const cart = JSON.parse(sessionStorage.getItem('cart'))
  console.log("cart issss",cart)
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("login");
    navigate("/");
  };

  
  const subtotal = useMemo(()=>{
    return cart.reduce((total, dabba) => {

      const price = parseFloat(dabba.Price.replace("₹", ""));
      return total + price;
    }, 0);
  },[cart])
  
  

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
          <Link onClick={logout} to="/">
            <img src="https://img.hotimg.com/logout.png" alt="" id="logout" />
          </Link>
        </div>
      </nav>
      <div className="grid">
        <div className="sections">
          <div id="dabba-img">
            <h3>Cart</h3>
            <div id="line"></div>
            {cart.map((dabba, index) => (
              <div key={index}>
                <div className="dish-cont">
                  <img src={dabba.Img} alt={dabba.Name} className="food" />
                </div>
                <div id="line2"></div>
              </div>
            ))}
          </div>
          <div id="product">
            <h3>Product</h3>
            <div id="line"></div>
            {cart.map((dabba, index) => (
              <>
                <div key={index} className="dish-cont">
                <p className="dish">{dabba.Name}</p>
                
              </div>

              <div id="line2"></div>
              </>
              
            ))}
          </div>
          <div id="price">
            <h3>Price</h3>
            <div id="line"></div>
            {cart.map((dabba, index) => (
              <>
              
              <div key={index} className="dish-cont">
                <p className="dish">{dabba.Price}</p>
              </div>
              <div id="line2"></div>

              </>
            ))}
          </div>
          <div id="quantity">
            <h3>Quantity</h3>
            <div id="line"></div>
            {cart.map((dabba, index) => (
              <>
              <div key={index} className="dish-cont">
                <input type="number" className="dish" />
              </div>
              <div id="line2"></div>
              </>
            ))}
          </div>
        </div>
        <div className="checkout">
          <h2>Order Summary</h2>
          <div className="order">
            <div id="line3"></div>
            <div className="total">
              <p>Subtotal</p>
              <p>₹{subtotal}</p>
            </div>
            <div id="line3"></div>
            <div className="total">
              <p>Shipping</p>
              <p>₹50</p>
            </div>
            <div id="line3"></div>
            <div className="total">
              <p>Total</p>
              <p>₹{subtotal + 50}</p>
            </div>

            <button id="checkout-btn">
              <Link to="/checkout/payment">Checkout</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
