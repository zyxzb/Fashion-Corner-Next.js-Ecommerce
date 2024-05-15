import { Metadata } from 'next';

import CardSlider from '@/components/cardSlider/CardSlider';
import Carousel from '@/components/carousel/carousel';
import Categories from '@/components/categories/Categories';
import Icons from '@/components/icons/Icons';
import ProductItem from '@/components/products/ProductItem';
import ReadMore from '@/components/readMore/ReadMore';
import Text from '@/components/readMore/Text';
import { CarouselItem } from '@/components/ui/carousel';
import productService from '@/lib/services/productService';
import { convertDocToObj } from '@/lib/utils';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Fullstack Next.js Store',
  description:
    process.env.NEXT_PUBLIC_APP_DESC ||
    'Fullstack Next.js Store - Server Components, MongoDB, Next Auth, Tailwind, Zustand',
};

const HomePage = async () => {
  const featuredProducts = await productService.getFeatured();
  const latestProducts = await productService.getLatest();
  const topRated = await productService.getTopRated();

  return (
    <div className='my-8 flex flex-col gap-4 md:gap-16'>
      <div>
        <Carousel featuredProducts={featuredProducts} />
      </div>
      <div className='flex flex-col gap-8 md:flex-row'>
        <div className='flex-1'>
          <p className='text-nowrap text-4xl font-semibold md:text-6xl'>
            Simply Unique/ <br /> Simply Better.
          </p>
        </div>
        <div className='flex flex-1 items-center'>
          <div>
            <span className='font-bold'>Fashion Corner</span> is a gift &
            clothes store based in HCMC, <br className='hidden sm:inline' />
            Vietnam. Est since 2019.
          </div>
        </div>
      </div>
      <Categories />
      <Icons />
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
      <div>
        <h2 className='my-2 text-2xl md:my-4'>Top Rated</h2>
        <CardSlider>
          {/*Wrap for SSR */}
          {topRated.map((product) => (
            <CarouselItem
              key={product.slug}
              className='sm:basis-1/2 md:basis-1/3 lg:basis-1/4'
            >
              <ProductItem product={convertDocToObj(product)} />
            </CarouselItem>
          ))}
        </CardSlider>
      </div>
      <ReadMore>
        <Text />
      </ReadMore>
    </div>
  );
};

export default HomePage;
