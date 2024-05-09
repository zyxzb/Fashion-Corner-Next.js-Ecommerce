'use client';

import useCartService from '@/lib/hooks/useCartStore';
import Link from 'next/link';
import { signOut, signIn, useSession } from 'next-auth/react';
import useLayoutService from '@/lib/hooks/useLayout';
import { SearchBox } from './SearchBox';

const Menu = () => {
  const { items, init } = useCartService();
  const { data: session } = useSession();
  const { theme, toggleTheme } = useLayoutService();

  const signOutHandler = () => {
    signOut({ callbackUrl: '/signin' });
    init();
  };

  const handleClick = () => {
    (document.activeElement as HTMLElement).blur();
  };

  return (
    <>
      <div className='hidden md:block'>
        <SearchBox />
      </div>
      <ul className='flex gap-2'>
        <li className='flex items-center gap-2 md:gap-4'>
          <label className='swap swap-rotate'>
            {/* this hidden checkbox controls the state */}
            <input
              type='checkbox'
              checked={theme === 'light'}
              onChange={toggleTheme}
            />

            {/* sun icon */}
            <svg
              className='swap-on h-8 w-8 fill-current'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
            >
              <path d='M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z' />
            </svg>

            {/* moon icon */}
            <svg
              className='swap-off h-8 w-8 fill-current'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
            >
              <path d='M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z' />
            </svg>
          </label>
          <Link href='/cart' className='flex gap-2'>
            <span>Cart</span>
            <span>
              {items.length !== 0 && (
                <div className='badge badge-secondary p-1'>
                  {items.reduce((a, c) => a + c.qty, 0)}
                </div>
              )}
            </span>
          </Link>
        </li>
        {session && session.user ? (
          <li>
            <div className='dropdown dropdown-end dropdown-bottom'>
              <label tabIndex={0} className='btn btn-ghost rounded-btn'>
                {session.user.name}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className='menu dropdown-content z-[1] w-52 rounded-box bg-base-300 p-2 shadow '
              >
                {session.user.isAdmin && (
                  <li onClick={handleClick}>
                    <Link href='/admin/dashboard'>Admin Dashboard</Link>
                  </li>
                )}

                <li onClick={handleClick}>
                  <Link href='/order-history'>Order history </Link>
                </li>
                <li onClick={handleClick}>
                  <Link href='/profile'>Profile</Link>
                </li>
                <li onClick={handleClick}>
                  <button type='button' onClick={signOutHandler}>
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </li>
        ) : (
          <li>
            <button
              className='btn btn-ghost rounded-btn'
              type='button'
              onClick={() => signIn()}
            >
              Sign in
            </button>
          </li>
        )}
      </ul>
    </>
  );
};

export default Menu;
