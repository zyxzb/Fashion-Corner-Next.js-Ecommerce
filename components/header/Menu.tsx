'use client';

import { ChevronDown, Moon, ShoppingCart, Sun } from 'lucide-react';
import Link from 'next/link';
import { signOut, signIn, useSession } from 'next-auth/react';

import useCartService from '@/lib/hooks/useCartStore';
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
            <Sun className='swap-on' />
            <Moon className='swap-off' />
          </label>
          <Link
            href='/cart'
            className='relative mr-1'
            aria-label='Shopping Cart'
          >
            <ShoppingCart />
            <span className='absolute -right-4 -top-4'>
              {items.length !== 0 && (
                <div className='badge badge-primary px-1.5'>
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
                <ChevronDown />
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
