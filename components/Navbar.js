import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '../context/Statecontext';
import { Cart } from '../components';
const Navbar = () => {
  const { cartItems, setShowCart, showCart } = useStateContext();
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>Art Webshop</Link>
      </p>
      <button
        type='button'
        className='cart-icon'
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className='cart-item-qty'>{cartItems.length || 0}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
