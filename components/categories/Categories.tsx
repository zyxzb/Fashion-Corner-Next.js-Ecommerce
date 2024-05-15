import Image from 'next/image';
import Link from 'next/link';

import Overlay from './Overlay';
import Handbags from '../../public/images/categories/Handbags.webp';
import Pants from '../../public/images/categories/Pants.webp';
import Shirts from '../../public/images/categories/Shirts.webp';

const Categories = () => {
  return (
    <div className='grid auto-rows-[300px] grid-cols-2 gap-4 md:auto-rows-[330px] md:grid-cols-4'>
      <Link
        href='/search?category=Shirts'
        className='group relative col-span-2 row-span-1 overflow-hidden md:row-span-2'
      >
        <Image
          src={Shirts}
          alt='Collection of shirts'
          width={500}
          height={500}
          className='h-full w-full object-cover'
          placeholder='blur'
          loading='lazy'
        />
        <Overlay category='Shirts' />
      </Link>
      <Link
        href='/search?category=Shirts'
        className='group relative col-span-2 overflow-hidden'
      >
        <Image
          src={Pants}
          alt='Collection of pants'
          width={500}
          height={500}
          className='h-full w-full object-cover'
          placeholder='blur'
          loading='lazy'
        />
        <Overlay category='Pants' />
      </Link>
      <Link
        href='/search?category=Handbags'
        className='group relative col-span-2 overflow-hidden'
      >
        <Image
          src={Handbags}
          alt='Collection of handbags'
          width={500}
          height={500}
          className='h-full w-full object-cover'
          placeholder='blur'
          loading='lazy'
        />
        <Overlay category='Handbags' />
      </Link>
    </div>
  );
};

export default Categories;
