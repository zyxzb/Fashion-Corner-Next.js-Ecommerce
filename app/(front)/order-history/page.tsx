import React from 'react';
import MyOrders from './MyOrders';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order History',
};

const MyOrderPage = () => {
  return (
    <div>
      <h1 className='py-2 text-2xl'>Order History</h1>
      <MyOrders />
    </div>
  );
};

export default MyOrderPage;
