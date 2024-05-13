'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import useCartService from '@/lib/hooks/useCartStore';

const CartDetails = () => {
  const { items, itemsPrice, decrease, increase } = useCartService();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, [items, itemsPrice, decrease, increase]);

  if (!mounted) return <>Loading...</>;

  return (
    <div>
      <h1 className='py-4 text-2xl'>Shopping Cart</h1>
      {items.length === 0 ? (
        <div>
          <p className='mb-2'>Cart is empty :(</p>
          <Link href='/' className='btn'>
            Go shopping
          </Link>
        </div>
      ) : (
        <div className='grid md:grid-cols-4 md:gap-5'>
          <div className='overflow-x-auto md:col-span-3'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.slug}>
                    <td className='flex items-center'>
                      <Link
                        href={`/product/${item.slug}`}
                        className='flex items-center'
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                      </Link>
                      <span className='px-2'>{item.name}</span>
                    </td>
                    <td>
                      <div>
                        <button
                          className='btn'
                          type='button'
                          onClick={() => decrease(item)}
                        >
                          -
                        </button>
                        <span className='px-2'>{item.qty}</span>
                        <button
                          className='btn'
                          type='button'
                          onClick={() => increase(item)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>$ {item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='card' bg-base-300>
            <div className='card-body'>
              <ul>
                <li className='pb-3 text-xl'>
                  Subtotal: {items.reduce((acc, item) => acc + item.qty, 0)}:
                  <br />$ {itemsPrice}
                </li>
                <li>
                  <button
                    type='button'
                    className='btn btn-primary w-full'
                    onClick={() => router.push('/shipping')}
                  >
                    Proceed to Checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDetails;
