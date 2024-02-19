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
  price: string;
  salePrice?: string;
  isInCart: boolean;
  link: string;
}
