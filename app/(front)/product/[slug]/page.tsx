import Link from 'next/link';
import Image from 'next/image';
import AddToCart from '@/components/products/AddToCart';

import productService from '@/lib/services/productService';
import { convertDocToObj } from '@/lib/utils';
import { Rating } from '@/components/products/Rating';

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const product = await productService.getBySlug(params.slug);
  return {
    title: product.name,
    description: product.description,
  };
};

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const product = await productService.getBySlug(params.slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='my-2'>
      <div className='my-4 py-1'>
        <Link href='/'>{`<- Back to Products`}</Link>
      </div>
      <div className='grid gap-4 md:grid-cols-4'>
        <div className='relative aspect-square md:col-span-2'>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes='100vw'
            className='h-full w-full object-contain'
          />
        </div>
        <div>
          <ul className='space-y-4'>
            <li>
              <h1 className='text-xl'>{product.name}</h1>
            </li>
            {/* <li>
              {product.rating} of {product.numReviews} reviews
            </li> */}
            <li>
              <Rating
                value={product.rating}
                caption={`${product.numReviews} ratings`}
              />
            </li>
            <li>{product.brand}</li>
            <li>
              <div className='divider'></div>
            </li>
            <li>
              <p>Description: {product.description}</p>
            </li>
          </ul>
        </div>
        <div>
          <div className='card mt-3 bg-base-300 shadow-xl md:mt-0'>
            <div className='card-body'>
              <div className='flex justify-between'>
                <div>Price</div>
                <div>${product.price}</div>
              </div>
              <div className='mb-2 flex justify-between'>
                <div>Status</div>
                <div>
                  {product.countInStock > 0 ? 'In Stock' : 'Unavailable'}
                </div>
              </div>
              {product.countInStock !== 0 && (
                <div className='card-actions justify-center'>
                  <AddToCart
                    item={{
                      ...convertDocToObj(product),
                      qty: 0,
                      color: '',
                      size: '',
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
