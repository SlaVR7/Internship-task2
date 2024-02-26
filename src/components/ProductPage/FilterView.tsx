import classNames from 'classnames';
import { useState } from 'react';
import { Button, Flex, Radio, Slider } from 'antd';
import { FilterIcon } from '../icons';
import Title from 'antd/es/typography/Title';
import { IFilterParameters, IProductsSetter } from '../../lib/interfaces.ts';

export default function FilterView({ setProductsParameters }: IProductsSetter) {
  const initialFilterParameters: IFilterParameters = {
    priceRange: [0, 50],
    typeOfProducts: 'All products',
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [filterParameters, setFilterParameters] =
    useState<IFilterParameters>(initialFilterParameters);

  function handleFilterClick() {
    setIsMenuOpen((prevState) => !prevState);
    setIsFilterActive(true);
    setProductsParameters((prevState) => {
      return { ...prevState, ...filterParameters };
    });
  }

  function handleResetClick() {
    setIsMenuOpen((prevState) => !prevState);
    setIsFilterActive(false);
    setProductsParameters((prevState) => {
      return { ...prevState, ...initialFilterParameters };
    });
    setFilterParameters((prevState) => {
      return { ...prevState, ...initialFilterParameters };
    });
  }

  return (
    <Flex style={{ border: 'none' }} className="relative text-basicColor">
      <Flex
        align={'center'}
        gap={'0.5rem'}
        className="transition text-primaryColor cursor-pointer hover:text-basicColor active:scale-95"
        onClick={() => setIsMenuOpen((prevState) => !prevState)}
      >
        <Flex
          className={
            isFilterActive
              ? `cursor-pointer p-2 rounded-normal w-[37px] h-[37px] bg-red-600 hover:bg-grayLColor`
              : `cursor-pointer p-2 rounded-normal w-[37px] h-[37px] bg-grayLColor/30 hover:bg-grayLColor`
          }
        >
          <FilterIcon />
        </Flex>
        <Flex className="hidden md:block text-[1rem]">Filter</Flex>
      </Flex>
      {isMenuOpen && (
        <Flex>
          <Flex
            vertical={true}
            justify={'space-between'}
            className={classNames(
              'absolute z-40 left-0 add:left-auto add:right-0 top-11 py-[10px] px-2 add:px-sm add:min-w-[170px] min-h-[172px]',
              'drop-shadow-lg bg-primaryColor rounded-md ring-1 ring-black ring-opacity-5',
              'text-sm text-grayMColor'
            )}
          >
            <Title level={4}>Filter settings</Title>
            <Radio.Group
              defaultValue={filterParameters.typeOfProducts}
              options={[
                {
                  label: 'Single product',
                  value: 'Single product',
                },
                {
                  label: 'Set of products',
                  value: 'Set of products',
                },
              ]}
              onChange={(e) => {
                setFilterParameters((prevState) => {
                  return { ...prevState, typeOfProducts: e.target.value };
                });
              }}
            />
            <Slider
              style={{ width: '100px' }}
              range
              max={50}
              defaultValue={filterParameters.priceRange}
              onChange={(value) =>
                setFilterParameters((prevState) => {
                  return { ...prevState, priceRange: value } as IFilterParameters;
                })
              }
            />
            <Flex vertical={true} justify={'space-between'} gap={'1rem'}>
              <Button
                onClick={() => {
                  handleFilterClick();
                }}
              >
                Filter
              </Button>
              <Button
                onClick={() => {
                  handleResetClick();
                }}
              >
                Reset
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
