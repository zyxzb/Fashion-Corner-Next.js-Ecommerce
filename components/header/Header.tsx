import { AlignJustify } from 'lucide-react';
import Link from 'next/link';

import Menu from './Menu';
import { SearchBox } from './SearchBox';

const Header = () => {
  return (
    <header>
      <nav>
        <div className='navbar justify-between bg-base-300'>
          <div>
            <label htmlFor='my-drawer' className='btn btn-square btn-ghost'>
              <AlignJustify />
            </label>
            <Link
              href='/'
              className='ml-2 text-base font-semibold sm:ml-4 sm:text-lg'
            >
              Fashion Corner
            </Link>
          </div>
          <Menu />
        </div>
        <div className='block bg-base-300 pb-3 text-center md:hidden'>
          <SearchBox />
        </div>
      </nav>
    </header>
  );
};

export default Header;
