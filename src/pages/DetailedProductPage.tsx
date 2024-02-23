import { useParams } from 'react-router-dom';
import { store } from '../store/store.ts';
import { Button, Carousel, Image } from 'antd';
import { observer } from 'mobx-react-lite';


function DetailedProductPageComponent() {
  const { productName } = useParams();
  const product = store.products.find(product => product.link.split('/')[1] === productName);

  return (
    <div className='bg-primaryColor dark:bg-grayMColor flex-1'>
      {product ? (
        <div className='max-w-[1440px] mx-auto px-8 lg:px-big py-4'>
          <h1 className='text-h2 py-4 text-center md:text-left text-accentColor dark:text-primaryColor'>{product.name}</h1>
          <div className='flex items-center flex-col md:flex-row md:justify-between md:items-start'>

            <div style={{ width: '360px' }}>
              <Carousel autoplay>
                {product?.imageSrc.map(src => {
                  return <div key={src} style={{ width: '360px' }}>
                    <Image.PreviewGroup items={product.imageSrc}>
                      <Image
                        width={360}
                        src={src}
                      />
                    </Image.PreviewGroup>
                  </div>
                })}
              </Carousel>
            </div>

            <div className='max-w-[400px] md:max-w-[60%] md:order-first'>
              <p className='text-h5 dark:text-primaryColor mb-sm'>{product.description}</p>
              <div className='flex items-center w-full justify-between mb-sm '>
                {product.salePrice ? (
                  <>
                    <div className='text-h3 md:text-h2 whitespace-nowrap'>{product.salePrice}</div>
                    <div className='flex items-center'>
                      <div
                        className='text-h5 md:text-h2 line-through text-graySColor dark:text-graySColor ml-8 whitespace-nowrap'>
                        {product.price}
                      </div>
                      <div className='h-min bg-red-500/90 text-primaryColor font-bold px-4 ml-8'>SALE</div>
                    </div>
                  </>
                ) : (
                  <div className='text-h2 whitespace-nowrap'>{product.price}</div>
                )}
              </div>
              <div className='flex gap-[15px] flex-wrap'>
                <Button onClick={() => product.addToCart(1)} disabled={!!product.quantityInCart}>Add to cart</Button>
                <Button onClick={() => product.removeFromCart()} disabled={!product.quantityInCart}>Remove from cart</Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>The product was not found</p>
      )}
    </div>
  );
}

const DetailedProductPage = observer(DetailedProductPageComponent);
export default DetailedProductPage;
