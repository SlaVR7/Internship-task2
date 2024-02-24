import { FC } from 'react';
import { CheckoutSection, NewCollectionSection, PromoCode } from '../components';
import SaleSection from '../components/HomePage/SaleSection.tsx';
import RandomCardsSection from '../components/HomePage/RandomCardSection.tsx';

const HomePage: FC = () => {
  return (
    <>
      <NewCollectionSection />
      <CheckoutSection />
      <SaleSection />
      <PromoCode />
      <RandomCardsSection />
    </>
  );
};

export default HomePage;
