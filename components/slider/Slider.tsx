import ProductItem from '@/components/products/ProductItem';
import CardSlider from '@/components/slider/CardSlider';
import { CarouselItem } from '@/components/ui/carousel';
import productService from '@/lib/services/productService';
import { convertDocToObj } from '@/lib/utils';

const Slider = async () => {
  const topRated = await productService.getTopRated();

  return (
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
  );
};

export default Slider;
