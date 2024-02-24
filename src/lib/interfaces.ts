import React from 'react';
import { CarouselRef } from 'antd/lib/carousel';

export interface IBurgerMenu {
  isUserAuthorized: boolean;
  logout: () => void;
}

export interface BannerProps {
  label: string;
  title: string;
  description: string;
  buttonText: string;
  linkAddress: string;
}

export interface CategoryCardProps {
  name: string;
  path: string;
  link: string;
}

export interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  imageSrc: string[];
  price: number;
  salePrice?: number;
  quantityInCart: number;
  link: string;
  type: 'All products' | 'Set of products' | 'Single products';
}

export interface PageNameProp {
  title: string;
}

export interface IFilterParameters {
  priceRange: [number, number];
  typeOfProducts: 'All products' | 'Set of products' | 'Single products';
}

export interface IProductsParameters {
  searchQuery: string;
  category: string;
  priceRange: [number, number];
  typeOfProducts: 'All products' | 'Set of products' | 'Single products';
  sortingParameters: {
    priceUp: boolean;
    priceDown: boolean;
    sortAbc: boolean;
    sortZyx: boolean;
  };
}

export interface IProductsSetter {
  setProductsParameters: React.Dispatch<React.SetStateAction<IProductsParameters>>;
}

export interface UserData {
  id: string;
  username: string;
  address: string;
  agreement: boolean;
  email: string;
  gender: string;
  password: string;
  phone: string;
  changeUserData: (arg0: UserData) => void;
}

export interface CartItem {
  productId: string;
  readOnly: boolean;
}

export interface IOrder {
  orderId: string;
  productsData?: string[];
  date?: Date;
  totalPrice: string;
}

export interface ICartList {
  isPromoCodeActive: boolean;
  isOrderPage: boolean;
}

export interface IUserDataForm {
  onFinish: (arg0: UserData) => void;
  userData?: UserData;
}

export interface ICarouselRef {
  carouselRef: React.RefObject<CarouselRef>;
}
