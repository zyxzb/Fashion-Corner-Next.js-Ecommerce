'use client';

import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';

export const SearchBox = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';
  const router = useRouter();

  const [formCategory, setFormCategory] = useState(category);
  const [formQuery, setFormQuery] = useState(q);

  const {
    data: categories,
    error,
    isLoading,
  } = useSWR('/api/products/categories');

  if (error) return error.message;

  if (isLoading) return 'Loading...';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?category=${formCategory}&q=${formQuery}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='join'>
        <select
          name='category'
          defaultValue={formCategory}
          className='join-item select select-bordered w-[100px]'
          onChange={(e) => setFormCategory(e.target.value)}
        >
          <option value='all'>All</option>
          {categories?.map((c: string) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          className='input join-item input-bordered w-48'
          placeholder='Search'
          defaultValue={q}
          name='q'
          onChange={(e) => setFormQuery(e.target.value)}
        />
        <button className='btn join-item' type='submit'>
          Search
        </button>
      </div>
    </form>
  );
};
