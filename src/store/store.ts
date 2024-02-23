import { types } from 'mobx-state-tree';
import { UserData } from '../lib/interfaces.ts';

const Product = types.model({
  id: types.identifier,
  name: types.string,
  price: types.number,
  salePrice: types.maybe(types.number),
  description: types.string,
  imageSrc: types.array(types.string),
  categories: types.array(types.string),
  quantityInCart: types.number,
  link: types.string,
  type: types.enumeration('ProductType', ['All products', 'Set of products', 'Single products']),
}).actions(self => ({
  addToCart(quantity: number) {
    self.quantityInCart += quantity;
  },
  removeFromCart() {
    self.quantityInCart = 0;
  }
}));

const User = types.model('User',{
  id: types.identifier,
  username: types.string,
  email: types.string,
  address: types.string,
  agreement: types.boolean,
  gender: types.string,
  password: types.string,
  phone: types.string,
});

const Order = types.model('Order', {
  orderId: types.identifier,
  productsData: types.maybe(types.array(types.string)),
  date: types.maybe(types.Date),
  totalPrice: types.string,
})

const AuthorizedUserId = types.model({
  authorizedUserId: types.string,
}).actions(self => ({
  setAuthorizedUser(user: UserData | null) {
    self.authorizedUserId = user ? user.id : '';
  },
}));

export const authorizedUser = AuthorizedUserId.create({
  authorizedUserId: '',
});

const OnlineStore = types.model({
  products: types.array(Product),
  orders: types.array(Order),
  users: types.array(User),
  authorizedUserId: AuthorizedUserId,
}).actions(self => ({
  addUser(user: UserData) {
    const userId = (self.users.length + 1).toString();
    const userWithId = {...user, id: userId};
    self.users.push(userWithId);
  },
  addOrder(productsData: string[], date: Date, totalPrice: string) {
    const orderId = (self.orders.length + 1).toString();
    self.orders.push({orderId, productsData, date, totalPrice})
  },
  removeOrder(id: string) {
    const targetOrder = self.orders.find(order => order.orderId === id);
    targetOrder?.orderId && self.orders.splice(self.orders.indexOf(targetOrder), 1);
}
}));

export const store = OnlineStore.create({
  products: [
    {
      id: '1',
      name: 'Candle "Witch" for rituals',
      price: 6.66,
      salePrice: 5.80,
      description: 'The Witch candle for rituals is a mysterious and symbolic work created taking into account ancient traditions and magical aspects. It serves not only as a source of light, but also as a powerful tool for rituals, meditations and magical practices.',
      categories: ['candles', 'decor', 'decor/candles'],
      imageSrc: ['/images/products/candles/Candle-Witch-for-rituals-1.jpg', '/images/products/candles/Candle-Witch-for-rituals-2.jpg'],
      quantityInCart: 0,
      link: 'product/witch',
      type: 'Single products',
    },
    {
      id: '2',
      name: 'Pumpkin Candle',
      price: 8.00,
      description: 'The Pumpkin candle is a cozy and atmospheric work created with the aim of adding the spirit of autumn comfort and conviviality to your home. It brings a feeling of warmth, light and joy, and is also associated with the Halloween holiday and everything connected with this magical time.',
      categories: ['candles', 'decor', 'decor/candles'],
      imageSrc: ['/images/products/candles/Pumpkin-Candle-1.jpg', '/images/products/candles/Pumpkin-Candle-2.jpg', '/images/products/candles/Pumpkin-Candle-3.jpg'],
      quantityInCart: 0,
      link: 'product/pumpkin',
      type: 'Single products',
    },
    {
      id: '3',
      name: 'Chocolate',
      price: 5.00,
      salePrice: 4.33,
      description: 'Fragrant and seductive soap, as if created from the most delicate and luxurious chocolate. Its warm brown palette reminds of a dark glaze enveloping your senses. At the first touch, you will feel a gentle, almost slightly melts on the skin, like chocolate in your hands. An exquisite fragrance will rise in the air, as if you are going to enjoy a cup of hot cocoa, awakening sensual sensations in you.',
      categories: ['soap', 'self-care', 'self-care/soap'],
      imageSrc: ['/images/products/soap/Chocolate-1.jpg', '/images/products/soap/Chocolate-2.jpg', '/images/products/soap/Chocolate-3.jpg'],
      quantityInCart: 0,
      link: 'product/chocolate',
      type: 'Set of products',
    },
    {
      id: '4',
      name: 'Candle "Witch" for rituals',
      price: 6.66,
      salePrice: 5.80,
      description: 'The Witch candle for rituals is a mysterious and symbolic work created taking into account ancient traditions and magical aspects. It serves not only as a source of light, but also as a powerful tool for rituals, meditations and magical practices.',
      categories: ['candles', 'decor', 'decor/candles'],
      imageSrc: ['/images/products/candles/Candle-Witch-for-rituals-1.jpg', '/images/products/candles/Candle-Witch-for-rituals-2.jpg'],
      quantityInCart: 0,
      link: 'product/witch',
      type: 'Single products',
    },
    {
      id: '5',
      name: 'Pumpkin Candle',
      price: 8.00,
      description: 'The Pumpkin candle is a cozy and atmospheric work created with the aim of adding the spirit of autumn comfort and conviviality to your home. It brings a feeling of warmth, light and joy, and is also associated with the Halloween holiday and everything connected with this magical time.',
      categories: ['candles', 'decor', 'decor/candles'],
      imageSrc: ['/images/products/candles/Pumpkin-Candle-1.jpg', '/images/products/candles/Pumpkin-Candle-2.jpg', '/images/products/candles/Pumpkin-Candle-3.jpg'],
      quantityInCart: 0,
      link: 'product/pumpkin',
      type: 'Single products',
    },
    {
      id: '6',
      name: 'Chocolate',
      price: 5.00,
      salePrice: 4.33,
      description: 'Fragrant and seductive soap, as if created from the most delicate and luxurious chocolate. Its warm brown palette reminds of a dark glaze enveloping your senses. At the first touch, you will feel a gentle, almost slightly melts on the skin, like chocolate in your hands. An exquisite fragrance will rise in the air, as if you are going to enjoy a cup of hot cocoa, awakening sensual sensations in you.',
      categories: ['soap', 'self-care', 'self-care/soap'],
      imageSrc: ['/images/products/soap/Chocolate-1.jpg', '/images/products/soap/Chocolate-2.jpg', '/images/products/soap/Chocolate-3.jpg'],
      quantityInCart: 0,
      link: 'product/chocolate',
      type: 'Set of products',
    },
    {
      id: '7',
      name: 'Candle "Witch" for rituals',
      price: 6.66,
      salePrice: 5.80,
      description: 'The Witch candle for rituals is a mysterious and symbolic work created taking into account ancient traditions and magical aspects. It serves not only as a source of light, but also as a powerful tool for rituals, meditations and magical practices.',
      categories: ['candles', 'decor', 'decor/candles'],
      imageSrc: ['/images/products/candles/Candle-Witch-for-rituals-1.jpg', '/images/products/candles/Candle-Witch-for-rituals-2.jpg'],
      quantityInCart: 0,
      link: 'product/witch',
      type: 'Single products',
    },
    {
      id: '8',
      name: 'Pumpkin Candle',
      price: 8.00,
      description: 'The Pumpkin candle is a cozy and atmospheric work created with the aim of adding the spirit of autumn comfort and conviviality to your home. It brings a feeling of warmth, light and joy, and is also associated with the Halloween holiday and everything connected with this magical time.',
      categories: ['candles', 'decor', 'decor/candles'],
      imageSrc: ['/images/products/candles/Pumpkin-Candle-1.jpg', '/images/products/candles/Pumpkin-Candle-2.jpg', '/images/products/candles/Pumpkin-Candle-3.jpg'],
      quantityInCart: 0,
      link: 'product/pumpkin',
      type: 'Single products',
    },
    {
      id: '9',
      name: 'Chocolate',
      price: 5.00,
      salePrice: 4.33,
      description: 'Fragrant and seductive soap, as if created from the most delicate and luxurious chocolate. Its warm brown palette reminds of a dark glaze enveloping your senses. At the first touch, you will feel a gentle, almost slightly melts on the skin, like chocolate in your hands. An exquisite fragrance will rise in the air, as if you are going to enjoy a cup of hot cocoa, awakening sensual sensations in you.',
      categories: ['soap', 'self-care', 'self-care/soap'],
      imageSrc: ['/images/products/soap/Chocolate-1.jpg', '/images/products/soap/Chocolate-2.jpg', '/images/products/soap/Chocolate-3.jpg'],
      quantityInCart: 0,
      link: 'product/chocolate',
      type: 'Set of products',
    },
    {
      id: '10',
      name: 'Candle "Witch" for rituals',
      price: 6.66,
      salePrice: 5.80,
      description: 'The Witch candle for rituals is a mysterious and symbolic work created taking into account ancient traditions and magical aspects. It serves not only as a source of light, but also as a powerful tool for rituals, meditations and magical practices.',
      categories: ['candles', 'decor', 'decor/candles'],
      imageSrc: ['/images/products/candles/Candle-Witch-for-rituals-1.jpg', '/images/products/candles/Candle-Witch-for-rituals-2.jpg'],
      quantityInCart: 0,
      link: 'product/witch',
      type: 'Single products',
    },
    {
      id: '11',
      name: 'Pumpkin Candle',
      price: 8.00,
      description: 'The Pumpkin candle is a cozy and atmospheric work created with the aim of adding the spirit of autumn comfort and conviviality to your home. It brings a feeling of warmth, light and joy, and is also associated with the Halloween holiday and everything connected with this magical time.',
      categories: ['candles', 'decor', 'decor/candles'],
      imageSrc: ['/images/products/candles/Pumpkin-Candle-1.jpg', '/images/products/candles/Pumpkin-Candle-2.jpg', '/images/products/candles/Pumpkin-Candle-3.jpg'],
      quantityInCart: 0,
      link: 'product/pumpkin',
      type: 'Single products',
    },
    {
      id: '12',
      name: 'Chocolate',
      price: 5.00,
      salePrice: 4.33,
      description: 'Fragrant and seductive soap, as if created from the most delicate and luxurious chocolate. Its warm brown palette reminds of a dark glaze enveloping your senses. At the first touch, you will feel a gentle, almost slightly melts on the skin, like chocolate in your hands. An exquisite fragrance will rise in the air, as if you are going to enjoy a cup of hot cocoa, awakening sensual sensations in you.',
      categories: ['soap', 'self-care', 'self-care/soap'],
      imageSrc: ['/images/products/soap/Chocolate-1.jpg', '/images/products/soap/Chocolate-2.jpg', '/images/products/soap/Chocolate-3.jpg'],
      quantityInCart: 0,
      link: 'product/chocolate',
      type: 'Set of products',
    },
    {
      id: '13',
      name: 'Candle "Witch" for rituals',
      price: 6.66,
      salePrice: 5.80,
      description: 'The Witch candle for rituals is a mysterious and symbolic work created taking into account ancient traditions and magical aspects. It serves not only as a source of light, but also as a powerful tool for rituals, meditations and magical practices.',
      categories: ['candles', 'decor', 'decor/candles'],
      imageSrc: ['/images/products/candles/Candle-Witch-for-rituals-1.jpg', '/images/products/candles/Candle-Witch-for-rituals-2.jpg'],
      quantityInCart: 0,
      link: 'product/witch',
      type: 'Single products',
    },
    {
      id: '14',
      name: 'Pumpkin Candle',
      price: 8.00,
      description: 'The Pumpkin candle is a cozy and atmospheric work created with the aim of adding the spirit of autumn comfort and conviviality to your home. It brings a feeling of warmth, light and joy, and is also associated with the Halloween holiday and everything connected with this magical time.',
      categories: ['candles', 'decor', 'decor/candles'],
      imageSrc: ['/images/products/candles/Pumpkin-Candle-1.jpg', '/images/products/candles/Pumpkin-Candle-2.jpg', '/images/products/candles/Pumpkin-Candle-3.jpg'],
      quantityInCart: 0,
      link: 'product/pumpkin',
      type: 'Single products',
    },
    {
      id: '15',
      name: 'Chocolate',
      price: 5.00,
      salePrice: 4.33,
      description: 'Fragrant and seductive soap, as if created from the most delicate and luxurious chocolate. Its warm brown palette reminds of a dark glaze enveloping your senses. At the first touch, you will feel a gentle, almost slightly melts on the skin, like chocolate in your hands. An exquisite fragrance will rise in the air, as if you are going to enjoy a cup of hot cocoa, awakening sensual sensations in you.',
      categories: ['soap', 'self-care', 'self-care/soap'],
      imageSrc: ['/images/products/soap/Chocolate-1.jpg', '/images/products/soap/Chocolate-2.jpg', '/images/products/soap/Chocolate-3.jpg'],
      quantityInCart: 0,
      link: 'product/chocolate',
      type: 'Set of products',
    },
  ],
  authorizedUserId: {
    authorizedUserId: '',
  },
  users: [],
  orders: [],
});
