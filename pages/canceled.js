import React from 'react';
import { BsBagDashFill } from 'react-icons/bs';
import Link from 'next/link';
const canceled = () => {
  return (
    <div className='cancel-wrapper'>
      <div className='cancel'>
        <p className='icon'>
          <BsBagDashFill />
        </p>
        <h2>Continue to shop around</h2>
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

export default canceled;
