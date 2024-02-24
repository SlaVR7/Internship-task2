import { useEffect, useState } from 'react';
import { SortABC, SortPriceDown, SortZYX, SortPriceUp } from '../icons';
import { Button, Flex } from 'antd';
import { IProductsSetter } from '../../lib/interfaces.ts';

export default function SortingView({ setProductsParameters }: IProductsSetter) {
  const [sortButtonsState, setSortButtonsState] = useState({
    priceUp: false,
    priceDown: false,
    sortAbc: false,
    sortZyx: false,
  });

  useEffect(() => {
    setProductsParameters((prevState) => {
      return { ...prevState, sortingParameters: sortButtonsState };
    });
  }, [sortButtonsState]);

  function setBtnState(btnName: string) {
    setSortButtonsState({
      priceUp: btnName !== 'priceUp' ? false : !sortButtonsState.priceUp,
      priceDown: btnName !== 'priceDown' ? false : !sortButtonsState.priceDown,
      sortAbc: btnName !== 'sortAbc' ? false : !sortButtonsState.sortAbc,
      sortZyx: btnName !== 'sortZyx' ? false : !sortButtonsState.sortZyx,
    });
  }

  return (
    <Flex gap={'0.5rem'}>
      <Button
        className={`p-2 rounded-normal w-[37px] h-[37px] bg-grayLColor/30 hover:bg-grayLColor ${sortButtonsState.sortAbc && 'bg-red-600'}`}
        onClick={() => {
          setBtnState('sortAbc');
        }}
      >
        <SortABC />
      </Button>
      <Button
        className={`p-2 rounded-normal w-[37px] h-[37px] bg-grayLColor/30 hover:bg-grayLColor ${sortButtonsState.sortZyx && 'bg-red-600'}`}
        onClick={() => {
          setBtnState('sortZyx');
        }}
      >
        <SortZYX />
      </Button>
      <Button
        className={`p-2 rounded-normal w-[37px] h-[37px] bg-grayLColor/30 hover:bg-grayLColor ${sortButtonsState.priceUp && 'bg-red-600'}`}
        onClick={() => {
          setBtnState('priceUp');
        }}
      >
        <SortPriceUp />
      </Button>
      <Button
        className={`p-2 rounded-normal w-[37px] h-[37px] bg-grayLColor/30 hover:bg-grayLColor ${sortButtonsState.priceDown && 'bg-red-600'}`}
        onClick={() => {
          setBtnState('priceDown');
        }}
      >
        <SortPriceDown />
      </Button>
    </Flex>
  );
}
