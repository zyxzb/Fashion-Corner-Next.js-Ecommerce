import productService from '@/lib/services/productService';
import { convertDocToObj, delay } from '@/lib/utils';

import ProductItem from './ProductItem';

const ProductItems = async () => {
  await delay(4000);
  const latestProducts = await productService.getLatest();

  return (
    <div>
      <h2 className='my-2 text-2xl md:my-4'>Latest Products</h2>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4'>
        {latestProducts.map((product) => (
          <ProductItem key={product.slug} product={convertDocToObj(product)} />
        ))}
      </div>
    </div>
  );
};

export default ProductItems;

const ProductItemSkeleton = () => {
  return (
    <div className='card mb-4 bg-base-300'>
      <div>
        <div className='skeleton relative aspect-square h-full w-full' />
      </div>
      <div className='card-body'>
        <div className='skeleton mb-2 h-6 w-3/4' />
        <div className='skeleton mb-2 h-4 w-1/2' />
        <div className='skeleton mb-2 h-4 w-1/3' />
        <div className='card-actions flex items-center justify-between'>
          <div className='skeleton h-8 w-20' />
        </div>
      </div>
    </div>
  );
};

export const ProductItemsSkeleton = ({
  qty,
  name,
}: {
  qty: number;
  name: string;
}) => {
  return (
    <div>
      <h2 className='my-2 text-2xl md:my-4'>{name}</h2>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4'>
        {Array.from({ length: qty }).map((_, i) => {
          return <ProductItemSkeleton key={i} />;
        })}
      </div>
    </div>
  );
};
