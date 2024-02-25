import NamedBanner from '../components/NamedBanner.tsx';
import { NavigationView } from '../components/ProductPage/NavigationView.tsx';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { IProductsParameters } from '../lib/interfaces.ts';
import ProductCard from '../components/ProductCard.tsx';
import { Flex, Row } from 'antd';
import { getProducts } from '../lib/utils/getProducts.ts';
import Title from 'antd/es/typography/Title';
import { LoadingOutlined } from '@ant-design/icons';

function ProductsPage() {
  const [visibleProductsId, setVisibleProductsId] = useState<Array<string>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const element = useRef(null);
  const page = useRef(1);
  const [gettingParameters, setGettingParameters] = useState<IProductsParameters>({
    searchQuery: '',
    category: '',
    priceRange: [0, 50],
    typeOfProducts: 'All products',
    sortingParameters: {
      priceUp: false,
      priceDown: false,
      sortAbc: false,
      sortZyx: false,
    },
  });
  const currentGettingParams = useRef(gettingParameters);

  setTimeout(() => {
    setIsSearching(false);
  }, 1000);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const visibleProductsId: string[] = getProducts(currentGettingParams.current);
          const separatedProductsId: string[] = visibleProductsId.slice(
            (page.current - 1) * 9,
            page.current * 9
          );
          setVisibleProductsId((prevState) => [...prevState, ...separatedProductsId]);
          page.current++;
        }
      },
      { threshold: 1, rootMargin: '50px' }
    )
  );

  useEffect(() => {
    setIsSearching(true);
    page.current = 1;
    setVisibleProductsId([]);
    currentGettingParams.current = gettingParameters;
    const currentElement = element.current;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [gettingParameters]);

  return (
    <Flex vertical={true}>
      <NamedBanner title={'OUR PRODUCTS'} />
      <NavigationView setProductsParameters={setGettingParameters} />
      {isSearching ? (
        <Flex
          justify={'space-around'}
          align={'center'}
          style={{ minHeight: '54.5vh' }}
          className={'flex-grow-1 bg-secondaryColor dark:bg-grayMColor'}
        >
          <Title level={1} className={'text-center'}>
            <LoadingOutlined />
          </Title>
        </Flex>
      ) : visibleProductsId.length > 0 ? (
        <Flex className="bg-primaryColor dark:bg-grayMColor h-auto p-sm text-center px-big flex flex-col flex-1 items-center">
          <Flex
            wrap={'wrap'}
            justify={'center'}
            className="md:justify-between mt-sm max-w-[1245px] pb-sm"
          >
            <Flex
              gap={'50px'}
              wrap={'wrap'}
              justify={'space-around'}
              className="mt-sm max-w-[1440px] pb-sm "
            >
              {visibleProductsId?.map(
                (productId): ReactNode => <ProductCard productId={productId} key={productId} />
              )}
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex
          justify={'space-around'}
          align={'center'}
          style={{ minHeight: '54.5vh' }}
          className={'flex-grow-1 bg-secondaryColor dark:bg-grayMColor'}
        >
          <Title level={3} className={'text-center'}>
            Nothing was found
          </Title>
        </Flex>
      )}
      <Row ref={element}></Row>
    </Flex>
  );
}

export default ProductsPage;
