import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className='grid flex-1 place-items-center'>
      <div className='flex flex-col justify-center'>
        <h1 className='mb-4 text-xl font-semibold'>404 - Page not found</h1>
        <Link href='/' className='btn'>
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
