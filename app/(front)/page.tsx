import Carousel from '@/components/carousel/carousel';
import ProductItem from '@/components/products/ProductItem';
import productService from '@/lib/services/productService';
import { convertDocToObj } from '@/lib/utils';
import { Metadata } from 'next';
import Icons from './icons/Icons';
import CardSlider from '@/components/cardSlider/CardSlider';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Fullstack Next.js Store',
  description:
    process.env.NEXT_PUBLIC_APP_DESC ||
    'Fullstack Next.js Store - Server Components,MongoDB, Next Auth, Tailwind, Zustand',
};

const HomePage = async () => {
  const featuredProducts = await productService.getFeatured();
  const latestProducts = await productService.getLatest();

  return (
    <div className='my-8 flex flex-col gap-4 md:gap-16'>
      <div>
        <Carousel featuredProducts={featuredProducts} />
      </div>
      {/* text */}
      <div className='flex flex-col gap-8 md:flex-row'>
        <div className='flex-1'>
          <h1 className='text-nowrap text-4xl font-semibold md:text-6xl'>
            Simply Unique/ <br /> Simply Better.
          </h1>
        </div>
        <div className='flex flex-1 items-center'>
          <div>
            <span className='font-bold'>Fashion Corner</span> is a gift &
            clothes store based in HCMC, <br className='hidden sm:inline' />{' '}
            Vietnam. Est since 2019.{' '}
          </div>
        </div>
      </div>
      {/* icons */}
      <Icons />
      {/* latest products */}
      <div>
        <h2 className='my-2 text-2xl md:my-4'>Latest Products</h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4'>
          {latestProducts.map((product) => (
            <ProductItem
              key={product.slug}
              product={convertDocToObj(product)}
            />
          ))}
        </div>
      </div>
      {/* Card slider */}
      <CardSlider products={latestProducts} />
    </div>
  );
};

export default HomePage;
