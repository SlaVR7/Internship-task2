import { ProductCardProps } from '../interfaces.ts';

export default function shuffleCards(data: ProductCardProps[]): ProductCardProps[] {
  const random: number[] = data.map(Math.random);
  data.sort((a, b) => random[data.indexOf(a)] - random[data.indexOf(b)]);
  return data;
}
