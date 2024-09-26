import React, { useMemo, useState, useEffect } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import GooglePayButton from "@google-pay/button-react";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    const groupedItems = groupItems(cartItems);
    setCart(Object.values(groupedItems));
  }, []);

  const logout = () => {
    sessionStorage.removeItem("login");
    navigate("/");
  };

  const groupItems = (items) => {
    return items.reduce((acc, item) => {
      if (acc[item._id]) {
        acc[item._id].quantity += 1;
      } else {
        acc[item._id] = { ...item, quantity: 1 };
      }
      return acc;
    }, {});
  };

  const handleIncrement = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item._id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      sessionStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleDecrement = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item._id === id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter(item => item.quantity > 0);
      sessionStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.Price.replace("₹", ""));
      return total + price * item.quantity;
    }, 0);
  }, [cart]);

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
        {cart.length > 0 ? (
          <div className="sections">
            <div id="dabba-img">
              <h3>Cart</h3>
              <div id="line"></div>
              {cart.map((item, index) => (
                <div key={index}>
                  <div className="dish-cont">
                    <img src={item.Img} alt={item.Name} className="food" />
                  </div>
                  <div id="line2"></div>
                </div>
              ))}
            </div>
            <div id="product">
              <h3>Product</h3>
              <div id="line"></div>
              {cart.map((item, index) => (
                <>
                  <div key={index} className="dish-cont">
                    <p className="dish">{item.Name}</p>
                  </div>
                  <div id="line2"></div>
                </>
              ))}
            </div>
            <div id="price">
              <h3>Price</h3>
              <div id="line"></div>
              {cart.map((item, index) => (
                <>
                  <div key={index} className="dish-cont">
                    <p className="dish">{item.Price}</p>
                  </div>
                  <div id="line2"></div>
                </>
              ))}
            </div>
            <div id="quantity">
              <h3>Quantity</h3>
              <div id="line"></div>
              {cart.map((item, index) => (
                <>
                  <div key={index} className="dish-cont">
                    {/* <button onClick={() => handleDecrement(item._id)}>-</button> */}
                    <p className="dish">{item.quantity}</p>
                    {/* <button onClick={() => handleIncrement(item._id)}>+</button> */}
                  </div>
                  <div id="line2"></div>
                </>
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <img src="https://img.hotimg.com/shopping.png" alt="Empty Cart" id="emp" />
            <div className="empty-cart-cont">
            <h1>Your cart is empty</h1>
            <p>Looks like you have not added anything to your cart.</p>
            <Link to='/'>
            <button id="continue">continue shopping</button>
            </Link>
            

            </div>
           
          </div>
        )}
        {cart.length > 0 && (
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

              <GooglePayButton
                environment="TEST"
                paymentRequest={{
                  apiVersion: 2,
                  apiVersionMinor: 0,
                  allowedPaymentMethods: [
                    {
                      type: "CARD",
                      parameters: {
                        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                        allowedCardNetworks: ["MASTERCARD", "VISA"],
                      },
                      tokenizationSpecification: {
                        type: "PAYMENT_GATEWAY",
                        parameters: {
                          gateway: "example",
                          gatewayMerchantId: "exampleGateMerchant",
                        },
                      },
                    },
                  ],
                  merchantInfo: {
                    merchantId: "123456796533",
                    merchantName: "Demo Merchant",
                  },
                  transactionInfo: {
                    totalPriceStatus: "FINAL",
                    totalPriceLabel: "Total",
                    totalPrice: `${subtotal + 50}`,
                    currencyCode: "INR",
                    countryCode: "IN",
                  },
                  shippingAddressRequired: true,
                  callbackIntents: ["PAYMENT_AUTHORIZATION"],
                }}
                onLoadPaymentData={(paymentRequest) => {
                  console.log(paymentRequest);
                }}
                onPaymentAuthorized={(paymentData) => {
                  console.log(paymentData);
                  return { transactionState: "SUCCESS" };
                }}
                existingPaymentMethodRequired="false"
                buttonColor="Black"
                buttonType="buy"
              >
              </GooglePayButton>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
