import { Link, useParams } from 'react-router-dom';
import { store } from '../store/store.ts';
import { Button, Carousel, Flex, Image, Result, Row } from 'antd';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

function DetailedProductPageComponent() {
  const { productName } = useParams();
  const product = store.products.find((product) => product.link.split('/')[1] === productName);

  return (
    <Flex className="bg-primaryColor dark:bg-grayMColor flex-1">
      {product ? (
        <Flex vertical className="max-w-[1440px] mx-auto px-8 lg:px-big py-4">
          <Row className="text-h2 py-4 text-center md:text-left text-accentColor dark:text-primaryColor">
            {product.name}
          </Row>
          <Flex vertical align={'center'} className="md:flex-row md:justify-between md:items-start">
            <Flex vertical className={'pt:w-[360px] w-[300px] mb-[20px] md:mb-0 md:ml-[20px]'}>
              <Carousel autoplay>
                {product?.imageSrc.map((src) => {
                  return (
                    <Image.PreviewGroup key={src} items={product.imageSrc}>
                      <Image src={src} />
                    </Image.PreviewGroup>
                  );
                })}
              </Carousel>
            </Flex>
            <Flex vertical className="max-w-[400px] md:max-w-[60%] md:order-first">
              <Row className="text-h5 dark:text-primaryColor mb-sm">{product.description}</Row>
              <Flex align={'center'} justify={'space-between'} className="w-full mb-sm">
                {product.salePrice ? (
                  <>
                    <Row className="text-h3 md:text-h2 whitespace-nowrap">
                      {product.salePrice} $
                    </Row>
                    <Flex align={'center'}>
                      <Row className="text-h5 md:text-h2 line-through text-graySColor dark:text-graySColor ml-8 whitespace-nowrap">
                        {product.price} $
                      </Row>
                      <Row className="h-min bg-red-500/90 text-primaryColor font-bold px-4 ml-8">
                        SALE
                      </Row>
                    </Flex>
                  </>
                ) : (
                  <Row className="text-h2 whitespace-nowrap">{product.price} $</Row>
                )}
              </Flex>
              <Flex wrap={'wrap'} gap={15}>
                <Button onClick={() => product.addToCart(1)} disabled={!!product.quantityInCart}>
                  Add to cart
                </Button>
                <Button
                  danger
                  onClick={() => product.removeFromCart()}
                  disabled={!product.quantityInCart}
                >
                  Remove from cart
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Result
          className={'w-[365px] mx-auto'}
          status="404"
          title="404"
          subTitle="Sorry, the product you found does not exist."
          extra={
            <Link to={'/'}>
              <Button
                className={classNames(
                  'transition text-secondaryColor text-[16px] font-bold',
                  'bg-accentColor dark:bg-accentDarkColor',
                  'rounded-normal h-[74px] px-12 w-min whitespace-nowrap'
                )}
                type="primary"
              >
                Back Home
              </Button>
            </Link>
          }
        />
      )}
    </Flex>
  );
}

const DetailedProductPage = observer(DetailedProductPageComponent);
export default DetailedProductPage;
