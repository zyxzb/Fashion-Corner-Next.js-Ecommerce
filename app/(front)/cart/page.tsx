import { Metadata } from 'next';

import CartDetails from './CartDetails';

export const metadata: Metadata = {
  title: 'Shopping Cart',
};

const CartPage = () => {
  return (
    <div>
      <CartDetails />
    </div>
  );
};

export default CartPage;
