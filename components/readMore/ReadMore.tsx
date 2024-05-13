'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

const ReadMore = ({ children }: { children: React.ReactNode }) => {
  const [isMore, setIsMore] = useState(false);

  return (
    <div className='mb-10 py-5 md:py-10'>
      <div
        className={cn(
          `relative mx-auto w-full overflow-hidden ${isMore ? 'h-full' : 'h-[400px]'}`,
        )}
      >
        {!isMore && (
          <div className='absolute bottom-0 flex h-2/3 w-full items-center bg-gradient-to-b from-transparent to-base-100'>
            <button
              onClick={() => setIsMore(true)}
              className='btn mx-auto mt-2 self-end'
            >
              Read More
              <ChevronDown />
            </button>
          </div>
        )}
        {children}
        <div className='flex items-center'>
          {isMore && (
            <button onClick={() => setIsMore(false)} className='btn mx-auto'>
              Hide
              <ChevronUp />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadMore;
