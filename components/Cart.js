import Link from 'next/link';
import React, { useRef, useEffect } from 'react';
import { urlFor } from '../lib/client';
import { AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useStateContext } from '../context/Statecontext';
import { toast } from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const onOutsideClick = ({ setShowCart, cartRef }) => {
  const handleClick = (event) => {
    if (
      cartRef.current &&
      !cartRef.current.contains(event.target) &&
      !event.target.type
    ) {
      setShowCart(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [handleClick, cartRef]);
};

const Cart = () => {
  const cartRef = useRef();

  const { showCart, setShowCart, cartItems, totalPrice, onRemove } =
    useStateContext();

  onOutsideClick({ setShowCart, cartRef, showCart });

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className='cart-wrapper'>
      <div className='cart-container' ref={cartRef}>
        <button
          className='cart-heading'
          type='button'
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>
            ({cartItems.length || 0}) Items
          </span>
        </button>
        <div className='product-container'>
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className='product' key={item._id}>
                <div className='cart-image-container'>
                  <Image
                    src={urlFor(item.defaultProductVariant.images[0])}
                    alt={item.title}
                    layout='fill'
                    objectFit='contain'
                    objectPosition='center'
                    className='cart-product-image'
                  />
                  {/* <img
                  src={urlFor(item.defaultProductVariant.images[0])}
                  className='cart-product-image'
                  /> */}
                </div>
                <div className='item-desc'>
                  <h5>{item.title}</h5>
                  <h4>${item.defaultProductVariant.price}</h4>
                  <button
                    type='button'
                    className='remove-item'
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                    REMOVE ITEM
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your Shopping Cart is Empty</h3>
            <Link href='/'>
              <button
                type='button'
                className='btn'
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button type='button' className='btn' onClick={handleCheckout}>
                PAY WITH STRIPE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
