"use client";
import { useState } from 'react';
import Link from 'next/link';

import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    updateQuantity,
  } = useCart();

  return (
    <>
    <div className="cart-page">
      {cart.length < 1 ? (
        <h2>Your Cart is Empty 
            <Link href='/products' style={{textDecoration:"none"}}>
              <button className="continue-shopping">
                <span className="cart-arrow-left">←</span>
                Start shopping
              </button>
            </Link>
        </h2>
          ):(
        <div className="cart-container">
        <header className="cart-header">
          <h1 className="cart-title">My Cart</h1>
          <a href='/products' style={{textDecoration:"none"}}>
          <button className="continue-shopping">
            <span className="cart-arrow-left">←</span>
            Continue shopping
          </button>
          </a>
        </header>

        <div className="cart-table">
          <div className="cart-table-header">
            <div className="col-product">PRODUCT</div>
            <div className="col-total">SUB TOTAL</div>
            <div className="col-qty">QTY</div>
            <div className="col-qty">REMOVE</div>
          </div>
     
          {cart.map((item) => (
            <div key={item.cartItemId} className="cart-item">
              <div className="col-product">
                <img src={item.image1} alt={item.name} className="cart-product-image" />
                <div className="cart-product-info">
                  <h3 className="cart-product-name">{item.name}</h3>
                  <p className="cart-product-details"><b>ALC/VOL:</b> {item.alcVol}</p>
                  <p className="cart-product-details"><b>Purchase Type:</b> {item.purchaseType}</p>
                </div>
              </div>

              <div className="cart-col-price">
                <div className="unit-price">Subtotal: ₦{(item.price * item.quantity).toLocaleString()}</div>
              </div>

              <div className="col-qty">
                <div className="cart-quantity-control">
                  <button 
                   onClick={() =>
                      updateQuantity(
                        item.id,
                        item.sku,
                        item.purchaseType,
                        item.quantity - 1
                      )
                    }

                    className="cart-qty-btn"
                  >
                    −
                  </button>
                  <span className="cart-qty-value">{item.quantity}</span>
                  <button 
                   onClick={() =>
                      updateQuantity(
                        item.id,
                        item.sku,
                        item.purchaseType,
                        item.quantity + 1
                      )
                    }

                    className="cart-qty-btn"
                  >
                    +
                  </button>
                </div>
                
              </div>

              <div className="col-remove">
                <span className="cart-line-total">
                <button
                      className="cart-qty-btn"
                      onClick={() =>
                        removeFromCart(item.id, item.sku, item.purchaseType)
                      }
                    >
                    X 
                </button>
                </span>
              </div>


          <div>
            <p>Total Items: {item.purchaseType === "carton"
                    ? `${item.bottlesPerCarton! * item.quantity} bottles`
                    : `${item.quantity} bottle${item.quantity > 1 ? "s" : ""}`}</p>
            <p>Item Price: ₦{item.price.toLocaleString()}</p>
          </div>

            </div>
          ))}
        </div>

        <div>
          <button
              onClick={clearCart}
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
            >
              Clear Cart
            </button>
        </div>
        
        <div className="cart-bottom-section">
          {/* <div className="cart-shipping-section">
            <h3 className="cart-shipping-title">Choose delivery method:</h3>
            
            <label className="cart-shipping-option">
              <input
                type="radio"
                name="shipping"
                value="pickup"
              />
              <span className="cart-radio-custom"></span>
              <span className="cart-shipping-text">
                Store pickup (5-10 min) · <strong>FREE</strong>
              </span>
            </label>

            <label className="cart-shipping-option">
              <input
                type="radio"
                name="shipping"
                value="delivery"
              />
              <span className="radio-custom"></span>
              <span className="cart-shipping-text">
                Delivery at home ( Under 2-4 days ) · <strong>₦3000.00</strong>
                <span className="cart-shipping-address">
                 Lagos, Nigeria.
                </span>
              </span>
            </label>
          </div> */}

          <div className="cart-summary-card">
             <div className="cart-summary-row">
              <span className="cart-summary-label"><b>TOTAL ITEMS:</b> {totalItems}</span>
              <span className="cart-summary-value">
                
              </span>
            </div>

            <div className="cart-summary-row">
              <span className="cart-summary-label"><b>SUBTOTAL:</b> ₦{totalPrice.toLocaleString()}</span>
              <span className="cart-summary-value"></span>
            </div>

            <div className="cart-summary-row">
              <span className="cart-summary-label"><del>DELIVERY FEE:</del></span>
              <span className="cart-summary-value"></span>
            </div>
           
            <div className="cart-summary-row cart-summary-total">
              <span className="cart-summary-label"><b>TOTAL PRICE:</b> ₦{totalPrice.toLocaleString()}</span>
              <span className="cart-summary-value"></span>
            </div>
            <button 
              className="cart-checkout-btn"
            >
              Checkout <span className="cart-checkout-price"></span>
            </button>
          </div>
        </div>
      </div>
      ) }
    </div>
    
    </>
  );
}
