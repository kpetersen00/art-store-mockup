import Link from 'next/link';
import React, { useEffect } from 'react';
import { BsBagCheckFill } from 'react-icons/bs';
import { useStateContext } from '../context/Statecontext';
const success = () => {
  const { setCartItems, setTotalPrice } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
  }, []);

  return (
    <div className='success-wrapper'>
      <div className='success'>
        <p className='icon'>
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your purchase!</h2>
        <p className='email-msg'>A receipt will be emailed to you.</p>
        <p className='question'>
          If you have any questions or concerns please email
          <a className='email' href='mailto:orders@email.com'>
            orders@email.com
          </a>
        </p>
        <Link href='/'>
          <button className='btn' type='button'>
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default success;
