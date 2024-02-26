import { types } from 'mobx-state-tree';
import { UserData } from '../lib/interfaces.ts';

const Product = types
  .model({
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
  })
  .actions((self) => ({
    addToCart(quantity: number) {
      self.quantityInCart += quantity;
    },
    removeFromCart() {
      self.quantityInCart = 0;
    },
  }));

const User = types
  .model('User', {
    id: types.identifier,
    username: types.string,
    email: types.string,
    address: types.string,
    agreement: types.boolean,
    gender: types.string,
    password: types.string,
    phone: types.string,
  })
  .actions((self) => ({
    changeUserData(user: UserData) {
      self.username = user.username;
      self.email = user.email;
      self.address = user.address;
      self.phone = user.phone;
      self.password = user.password;
      self.gender = user.gender;
    },
  }));

const Order = types.model('Order', {
  orderId: types.identifier,
  productsData: types.maybe(types.array(types.string)),
  date: types.maybe(types.Date),
  totalPrice: types.string,
});

const AuthorizedUserId = types
  .model({
    authorizedUserId: types.string,
  })
  .actions((self) => ({
    setAuthorizedUser(user: UserData | null) {
      self.authorizedUserId = user ? user.id : '';
    },
  }));

export const authorizedUser = AuthorizedUserId.create({
  authorizedUserId: '',
});

const OnlineStore = types
  .model({
    products: types.array(Product),
    orders: types.array(Order),
    users: types.array(User),
    authorizedUserId: AuthorizedUserId,
  })
  .actions((self) => ({
    addUser(user: UserData) {
      const userId = (self.users.length + 1).toString();
      const userWithId = { ...user, id: userId };
      self.users.push(userWithId);
    },
    addOrder(productsData: string[], date: Date, totalPrice: string) {
      const orderId = (self.orders.length + 1).toString();
      self.orders.push({ orderId, productsData, date, totalPrice });
    },
    removeOrder(id: string) {
      const targetOrder = self.orders.find((order) => order.orderId === id);
      targetOrder?.orderId && self.orders.splice(self.orders.indexOf(targetOrder), 1);
    },
  }));

export const store = OnlineStore.create({
  products: [
    {
      id: '1',
      name: 'Candle "Witch" for rituals',
      price: 6.66,
      salePrice: 5.8,
      description:
        'The Witch candle for rituals is a mysterious and symbolic work created taking into account ancient traditions and magical aspects. It serves not only as a source of light, but also as a powerful tool for rituals, meditations and magical practices.',
      categories: ['candles', 'decor', 'decor/candles', 'sale'],
      imageSrc: [
        '/images/products/candles/Candle-Witch-for-rituals-1.jpg',
        '/images/products/candles/Candle-Witch-for-rituals-2.jpg',
      ],
      quantityInCart: 0,
      link: 'product/witch',
      type: 'Single products',
    },
    {
      id: '2',
      name: 'Pumpkin Candle',
      price: 8.0,
      description:
        'The Pumpkin candle is a cozy and atmospheric work created with the aim of adding the spirit of autumn comfort and conviviality to your home. It brings a feeling of warmth, light and joy, and is also associated with the Halloween holiday and everything connected with this magical time.',
      categories: ['candles', 'decor', 'decor/candles', 'new'],
      imageSrc: [
        '/images/products/candles/Pumpkin-Candle-1.jpg',
        '/images/products/candles/Pumpkin-Candle-2.jpg',
        '/images/products/candles/Pumpkin-Candle-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/pumpkin',
      type: 'Single products',
    },
    {
      id: '3',
      name: 'Chocolate',
      price: 5.0,
      salePrice: 4.33,
      description:
        'Fragrant and seductive soap, as if created from the most delicate and luxurious chocolate. Its warm brown palette reminds of a dark glaze enveloping your senses. At the first touch, you will feel a gentle, almost slightly melts on the skin, like chocolate in your hands. An exquisite fragrance will rise in the air, as if you are going to enjoy a cup of hot cocoa, awakening sensual sensations in you.',
      categories: ['soap', 'self-care', 'self-care/soap', 'sale'],
      imageSrc: [
        '/images/products/soap/Chocolate-1.jpg',
        '/images/products/soap/Chocolate-2.jpg',
        '/images/products/soap/Chocolate-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/chocolate',
      type: 'Set of products',
    },
    {
      id: '4',
      name: "Lovers' Candle with geranium",
      price: 11.0,
      description:
        'The candle "Lovers with geranium" is a magnificent handmade work created especially for those who want to give their loved ones a unique atmosphere of warmth, love and romance. This candle is perfect for various romantic events such as birthdays, anniversaries, weddings or just to express your feelings without words.',
      categories: ['candles', 'decor', 'decor/candles'],
      imageSrc: [
        "/images/products/candles/Lovers'-Candle-with-geranium-1.jpg",
        "/images/products/candles/Lovers'-Candle-with-geranium-2.jpg",
      ],
      quantityInCart: 0,
      link: 'product/geranium',
      type: 'Single products',
    },
    {
      id: '5',
      name: 'Sunflower',
      price: 10.0,
      description:
        'The appearance of this soap is fascinating: it has the shape of a sunflower with carefully sculpted petals and is gently colored in lively shades of yellow and green. It attracts the eye and brings a piece of summer mood at any time of the year.',
      categories: ['soap', 'self-care', 'self-care/soap'],
      imageSrc: ['/images/products/soap/Sunflower-1.jpg', '/images/products/soap/Sunflower-2.jpg'],
      quantityInCart: 0,
      link: 'product/sunflower',
      type: 'Set of products',
    },
    {
      id: '6',
      name: 'BLUE LAPIS LAZULI',
      price: 5.0,
      description:
        'The Lavender Bath bomb is a fragrant and soothing remedy created to enrich your bath with lavender aromas and give you a moment of relaxation and peace. Lavender is known for its relaxing properties and ability to help relieve stress and tension.',
      categories: ['bath-bombs', 'self-care', 'self-care/bath-bombs'],
      imageSrc: [
        '/images/products/bath-bombs/BLUE-LAPIS-LAZULI-1.jpg',
        '/images/products/bath-bombs/BLUE-LAPIS-LAZULI-2.jpg',
        '/images/products/bath-bombs/BLUE-LAPIS-LAZULI-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/LAZULI',
      type: 'Set of products',
    },
    {
      id: '7',
      name: 'Pug',
      price: 22.0,
      description:
        'Soap in the form of a pug is made of natural detergent components that carefully take care of your skin. Its texture and shape accurately convey the features of a cute pug: a curved back, curled tails and characteristic folds on the muzzle. It has a delicate fragrant composition that pleasantly refreshes and relaxes you while taking a shower or bath.',
      categories: ['soap', 'self-care', 'self-care/soap', 'new'],
      imageSrc: [
        '/images/products/soap/Pug-1.jpg',
        '/images/products/soap/Pug-2.jpg',
        '/images/products/soap/Pug-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/pug',
      type: 'Single products',
    },
    {
      id: '8',
      name: 'The Gemstone',
      price: 14.0,
      description:
        'The "Gemstone" bathroom bomb is designed to immerse you in an atmosphere of sophistication and luxury. Its shape and design may resemble the shape of various precious stones, such as emerald, amethyst, ruby and others.',
      categories: ['bath-bombs', 'self-care', 'self-care/bath-bombs', 'new'],
      imageSrc: [
        '/images/products/bath-bombs/The-Gemstone-1.jpg',
        '/images/products/bath-bombs/The-Gemstone-2.jpg',
        '/images/products/bath-bombs/The-Gemstone-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/gemstone',
      type: 'Set of products',
    },
    {
      id: '9',
      name: 'Lavender and sage',
      price: 9.0,
      description:
        'The Lavender and Sage Aroma sachets are sophisticated and relaxing pouches designed to bring the aromatic harmony of lavender and a refreshing note of sage into your space. These sachets create an atmosphere of peace and relaxation.',
      categories: ['aroma-sachet', 'decor', 'decor/aroma-sachet'],
      imageSrc: [
        '/images/products/aroma-sachet/Lavender-and-sage-1.jpg',
        '/images/products/aroma-sachet/Lavender-and-sage-2.jpg',
        '/images/products/aroma-sachet/Lavender-and-sage-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/sage',
      type: 'Set of products',
    },
    {
      id: '10',
      name: 'Aroma-sachet round',
      price: 4.0,
      description:
        'The round aroma sachet has an exquisite and versatile design. It is made in the shape of a circle, which gives it a stylish and harmonious look. The sachet can be made of various materials, such as natural fabrics, linen or cotton.',
      categories: ['aroma-sachet', 'decor', 'decor/aroma-sachet'],
      imageSrc: [
        '/images/products/aroma-sachet/Aroma-sachet-round-1.jpg',
        '/images/products/aroma-sachet/Aroma-sachet-round-2.jpg',
        '/images/products/aroma-sachet/Aroma-sachet-round-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/round',
      type: 'Set of products',
    },
    {
      id: '11',
      name: 'Knownledge day',
      price: 10.0,
      salePrice: 9.35,
      description:
        'We present you a unique handmade soap inspired by a joyful event – the Day of Knowledge, which is celebrated on September 1. This is not just a piece of soap, but a real bouquet of emotions and aromas, perfectly combining the symbolism of education and the freshness of blooming gardens.',
      categories: ['soap', 'self-care', 'self-care/soap', 'sale'],
      imageSrc: [
        '/images/products/soap/Knownledge-day-1.jpg',
        '/images/products/soap/Knownledge-day-2.jpg',
      ],
      quantityInCart: 0,
      link: 'product/knownledge-day',
      type: 'Set of products',
    },
    {
      id: '12',
      name: 'Truffle Body Scrub',
      price: 15.0,
      description:
        'Truffle Body Scrub is a luxurious and exclusive skin care product inspired by a rare and precious truffle. This scrub combines exfoliation, nutrition and rejuvenating properties, creating a sense of elegance and well-groomed.',
      categories: ['scrub', 'self-care', 'self-care/scrub'],
      imageSrc: [
        '/images/products/scrub/Truffle-Body-Scrub-1.jpg',
        '/images/products/scrub/Truffle-Body-Scrub-2.jpg',
      ],
      quantityInCart: 0,
      link: 'product/Truffle',
      type: 'Single products',
    },
    {
      id: '13',
      name: 'Candle "Rabbit"',
      price: 5.0,
      salePrice: 4.3,
      description:
        "A candle in the form of a rabbit is a playful and charming work that brings joy, tenderness and an atmosphere of children's joy to your home. This candle not only creates cozy lighting, but also visually decorates the space, making it brighter and more picturesque.",
      categories: ['candles', 'decor', 'decor/candles', 'sale'],
      imageSrc: [
        '/images/products/candles/Candle-Rabbit-1.jpg',
        '/images/products/candles/Candle-Rabbit-2.jpg',
        '/images/products/candles/Candle-Rabbit-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/candle-rabbit',
      type: 'Set of products',
    },
    {
      id: '14',
      name: 'Florentine Sachets',
      price: 7.0,
      description:
        'Wax aroma sachets "Florentine" have a unique design and shape, reflecting luxury and sophistication. They can be made in a style inspired by Italian culture, and may include decorative elements reminiscent of architectural details, floristry or art.',
      categories: ['aroma-sachet', 'decor', 'decor/aroma-sachet', 'new'],
      imageSrc: [
        '/images/products/aroma-sachet/Florentine-Sachets-1.jpg',
        '/images/products/aroma-sachet/Florentine-Sachets-2.jpg',
      ],
      quantityInCart: 0,
      link: 'product/Florentine',
      type: 'Set of products',
    },
    {
      id: '15',
      name: 'Heart',
      price: 7.0,
      description:
        'Heart-shaped aroma sachets are romantic and fragrant pouches created to bring tenderness, warmth and pleasant aromas into your space. These sachets can serve as a symbol of love and care, as well as add an atmosphere of romance.',
      categories: ['aroma-sachet', 'decor', 'decor/aroma-sachet'],
      imageSrc: [
        '/images/products/aroma-sachet/Heart-1.jpg',
        '/images/products/aroma-sachet/Heart-2.jpg',
        '/images/products/aroma-sachet/Heart-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/heart',
      type: 'Single products',
    },
    {
      id: '16',
      name: 'Spicy notes',
      price: 8.0,
      description:
        'Aromatic sachets with spicy notes are unique and stimulating pouches designed to bring warmth and intensity of aromas of various spices into your space. These sachets fill the air with coziness and energy, creating an atmosphere of warmth and comfort.',
      categories: ['aroma-sachet', 'decor', 'decor/aroma-sachet'],
      imageSrc: [
        '/images/products/aroma-sachet/Spicy-notes-1.jpg',
        '/images/products/aroma-sachet/Spicy-notes-2.jpg',
      ],
      quantityInCart: 0,
      link: 'product/spicy-notes',
      type: 'Single products',
    },
    {
      id: '17',
      name: 'Magnesium Salt based scrub',
      price: 12.0,
      description:
        'Magnesium salt scrub is a unique combination of minerals and natural ingredients for effective skin care. Magnesium salt has unique properties that promote muscle relaxation, improve sleep and overall health of the body. In this case, magnesium is also used for skin care, maintaining its health and hydration levels.',
      categories: ['scrub', 'self-care', 'self-care/scrub'],
      imageSrc: [
        '/images/products/scrub/Magnesium-Salt-based-scrub-1.jpg',
        '/images/products/scrub/Magnesium-Salt-based-scrub-2.jpg',
        '/images/products/scrub/Magnesium-Salt-based-scrub-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/Magnesium',
      type: 'Single products',
    },
    {
      id: '18',
      name: 'Bathroom bomb with praline',
      price: 11.0,
      salePrice: 9.8,
      description:
        'A praline bath bomb is an exquisite and caring product that will turn your bath into a source of sweet aromas and relaxation. Inspired by delicious chocolate pralines, this bomb combines aromatherapy, moisturizing and skin care.',
      categories: ['bath-bombs', 'self-care', 'self-care/bath-bombs', 'sale'],
      imageSrc: [
        '/images/products/bath-bombs/Bathroom-bomb-with-praline-1.jpg',
        '/images/products/bath-bombs/Bathroom-bomb-with-praline-2.jpg',
        '/images/products/bath-bombs/Bathroom-bomb-with-praline-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/praline',
      type: 'Set of products',
    },
    {
      id: '19',
      name: 'Aromatic sachets made of gypsum',
      price: 5.0,
      description:
        'Aromatic plaster sachets are unique and stylish items created to spread pleasant scents in your space. Made of gypsum, these sachets not only bring fragrance, but can also be used as decorative elements in your home.',
      categories: ['aroma-sachet', 'decor', 'decor/aroma-sachet'],
      imageSrc: [
        '/images/products/aroma-sachet/Aromatic-sachets-made-of-gypsum-1.jpg',
        '/images/products/aroma-sachet/Aromatic-sachets-made-of-gypsum-2.jpg',
      ],
      quantityInCart: 0,
      link: 'product/gypsum',
      type: 'Single products',
    },
    {
      id: '20',
      name: 'Rose candle in a jar',
      price: 25.0,
      description:
        'The candle is made in the form of a delicate rose blooming in a transparent glass jar. This design gives the candle an elegant and mysterious look, as if you have caught the blooming of the most delicate and beautiful rose. The jar complements the feeling of mystery and preserves the aroma of the candle for a long time.',
      categories: ['candles', 'decor', 'decor/candles'],
      imageSrc: [
        '/images/products/candles/Rose-candle-in-a-jar-1.jpg',
        '/images/products/candles/Rose-candle-in-a-jar-2.jpg',
      ],
      quantityInCart: 0,
      link: 'product/rose-candle',
      type: 'Single products',
    },
    {
      id: '21',
      name: 'Body scrub with herbs',
      price: 25.0,
      description:
        'Body scrub with herbs is a natural and revitalizing skin care product enriched with extracts and natural ingredients of plant origin. This scrub helps to exfoliate, cleanse and strengthen the skin, creating a feeling of freshness and health.',
      categories: ['scrub', 'self-care', 'self-care/scrub'],
      imageSrc: [
        '/images/products/scrub/Body-scrub-with-herbs-1.jpg',
        '/images/products/scrub/Body-scrub-with-herbs-2.jpg',
        '/images/products/scrub/Body-scrub-with-herbs-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/herbs',
      type: 'Single products',
    },
    {
      id: '22',
      name: 'Wedding candles',
      price: 19.0,
      description:
        'Wedding candles are sparkling symbols of tenderness and promise that create a magical glow around themselves, reflecting the radiance of burning hearts. When two candles are joined together, they become a metaphor for combining two unique paths into one common road.',
      categories: ['candles', 'decor', 'decor/candles', 'new'],
      imageSrc: [
        '/images/products/candles/Wedding-candles-1.jpg',
        '/images/products/candles/Wedding-candles-2.jpg',
      ],
      quantityInCart: 0,
      link: 'product/wedding',
      type: 'Single products',
    },
    {
      id: '23',
      name: 'Alcohol',
      price: 14.0,
      description:
        'Every detail of this soap is thought out: from high-quality ingredients to stunning appearance. Soap "Fragrant Elixir" is not just a skin care product, it is a source of joy, elegance and fragrant bliss. Feel the pleasure of each use and give yourself moments of luxury and care with this unique soap in the form of a bottle of alcohol.',
      categories: ['soap', 'self-care', 'self-care/soap', 'new'],
      imageSrc: [
        '/images/products/soap/Alcohol-1.jpg',
        '/images/products/soap/Alcohol-2.jpg',
        '/images/products/soap/Alcohol-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/alcohol',
      type: 'Single products',
    },
    {
      id: '24',
      name: 'Scrub massage tile with loofah',
      price: 14.0,
      salePrice: 12.0,
      description:
        'Scrub-massage tile with loofah is designed to provide complete skin care in one product. It has two sides: one side is covered with natural loofah, and the other contains a soft scrubbing surface.',
      categories: ['scrub', 'self-care', 'self-care/scrub', 'new', 'sale'],
      imageSrc: [
        '/images/products/scrub/Scrub-massage-tile-with-loofah-1.jpg',
        '/images/products/scrub/Scrub-massage-tile-with-loofah-2.jpg',
        '/images/products/scrub/Scrub-massage-tile-with-loofah-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/loofah',
      type: 'Single products',
    },
    {
      id: '25',
      name: 'Orange',
      price: 5.0,
      salePrice: 4.2,
      description:
        'Orange–colored soap is a bright and energetic product that attracts attention with its juicy and warm palette. Its color resembles a ripe orange or a rich shade of autumn, when the leaves turn into a golden-orange scale.',
      categories: ['soap', 'self-care', 'self-care/soap', 'sale'],
      imageSrc: [
        '/images/products/soap/Orange-1.jpg',
        '/images/products/soap/Orange-2.jpg',
        '/images/products/soap/Orange-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/orange',
      type: 'Set of products',
    },
    {
      id: '26',
      name: 'Bags of herbs',
      price: 13.0,
      salePrice: 10.2,
      description:
        'Aroma sachets with herbs and essential oils are designed to give your home a natural fragrance and create an atmosphere of tranquility. The pouches are usually made of natural materials, such as linen fabric or cotton, which allow the fragrance to penetrate through the fabric.',
      categories: ['aroma-sachet', 'decor', 'decor/aroma-sachet', 'sale'],
      imageSrc: [
        '/images/products/aroma-sachet/Bags-of-herbs-1.jpg',
        '/images/products/aroma-sachet/Bags-of-herbs-2.jpg',
        '/images/products/aroma-sachet/Bags-of-herbs-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/bags-of-herbs',
      type: 'Set of products',
    },
    {
      id: '27',
      name: 'Bath bomb "Triune Moon"',
      price: 10.0,
      salePrice: 7.6,
      description:
        'The Triune Moon bath bomb is a fragrant and relaxing tool for creating a real secluded corner of comfort and tranquility during a bath. Inspired by the symbolism of the Triune Moon, this bomb can add an atmosphere of magic and relaxation to your water ritual.',
      categories: ['bath-bombs', 'self-care', 'self-care/bath-bombs', 'sale'],
      imageSrc: [
        '/images/products/bath-bombs/Bath-bomb-Triune-Moon-1.jpg',
        '/images/products/bath-bombs/Bath-bomb-Triune-Moon-2.jpg',
        '/images/products/bath-bombs/Bath-bomb-Triune-Moon-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/triune-moon',
      type: 'Single products',
    },
    {
      id: '28',
      name: 'Body scrub "Coffee and Chocolate"',
      price: 11.0,
      description:
        'Body scrub "Coffee and Chocolate" is an exquisite and fragrant skin care product inspired by the popular combination of coffee and chocolate. This scrub combines exfoliation, moisturizing and aromatherapy, creating a feeling of luxury and well-groomed.',
      categories: ['scrub', 'self-care', 'self-care/scrub'],
      imageSrc: [
        '/images/products/scrub/Body-scrub-Coffee-and-Chocolate-1.jpg',
        '/images/products/scrub/Body-scrub-Coffee-and-Chocolate-2.jpg',
      ],
      quantityInCart: 0,
      link: 'product/cofee',
      type: 'Single products',
    },
    {
      id: '29',
      name: 'Bambi the Fawn',
      price: 15.0,
      description:
        'Bambi fawn soap is an incredibly cute and well-groomed product that not only provides gentle care for your skin, but also brings joy with its beautiful design. This soap is created with a love of detail and attention to quality.',
      categories: ['soap', 'self-care', 'self-care/soap', 'new'],
      imageSrc: [
        '/images/products/soap/Bambi-the-Fawn-1.jpg',
        '/images/products/soap/Bambi-the-Fawn-2.jpg',
        '/images/products/soap/Bambi-the-Fawn-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/bambi',
      type: 'Single products',
    },
    {
      id: '30',
      name: 'Citrus body scrub',
      price: 11.0,
      description:
        'Citrus Body Scrub is a refreshing and energizing skin care product enriched with extracts and essential oils of citrus fruits. This scrub helps to exfoliate, cleanse and tone the skin, while creating an aromatic pleasure and a feeling of freshness.',
      categories: ['scrub', 'self-care', 'self-care/scrub'],
      imageSrc: [
        '/images/products/scrub/Citrus-body-scrub-1.jpg',
        '/images/products/scrub/Citrus-body-scrub-2.jpg',
        '/images/products/scrub/Citrus-body-scrub-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/Citrus',
      type: 'Single products',
    },
    {
      id: '31',
      name: 'Cedar Nut Scrub',
      price: 4.0,
      description:
        'Cedar nut scrub is designed for effective and gentle skin care, giving her a sense of natural harmony and nutrition. Pine nuts are a rich source of vitamins, trace elements and fatty acids that help strengthen the skin and its renewal.',
      categories: ['scrub', 'self-care', 'self-care/scrub', 'new'],
      imageSrc: [
        '/images/products/scrub/Cedar-Nut-Scrub-1.jpg',
        '/images/products/scrub/Cedar-Nut-Scrub-2.jpg',
      ],
      quantityInCart: 0,
      link: 'product/Cedar-Nut',
      type: 'Single products',
    },
    {
      id: '32',
      name: 'Anti-cellulite massage scrub',
      price: 10.0,
      salePrice: 7.55,
      description:
        'Anti-cellulite scrub is an innovative tool that helps to combat unwanted manifestations of cellulite. Its formula is based on the synergy of two main properties: exfoliation and strengthening.',
      categories: ['scrub', 'self-care', 'self-care/scrub', 'sale'],
      imageSrc: [
        '/images/products/scrub/Anti-cellulite-massage-scrub-1.jpg',
        '/images/products/scrub/Anti-cellulite-massage-scrub-2.jpg',
        '/images/products/scrub/Anti-cellulite-massage-scrub-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/massage',
      type: 'Single products',
    },
    {
      id: '33',
      name: 'Candle "Raven\'s Skull"',
      price: 10.0,
      description:
        'The Raven Skull candle is a mysterious and symbolic work created for those who appreciate mysticism, mystery and unique decor. This candle not only illuminates the space, but also is an object that can bring a share of mystery and inspiration into your life.',
      categories: ['candles', 'decor', 'decor/candles'],
      imageSrc: [
        "/images/products/candles/Candle-Raven's-Skull-1.jpg",
        "/images/products/candles/Candle-Raven's-Skull-2.jpg",
        "/images/products/candles/Candle-Raven's-Skull-3.jpg",
      ],
      quantityInCart: 0,
      link: 'product/skull',
      type: 'Single products',
    },
    {
      id: '34',
      name: 'A set of aroma sachets made of wax',
      price: 3.0,
      salePrice: 2.35,
      description:
        'A set of aroma sachets made of wax is an elegant and original way to add flavor to your space with the help of decorative sachets made of wax. These sachets not only bring pleasant aromas, but also serve as decorative elements that can be placed in different corners of your home.',
      categories: ['aroma-sachet', 'decor', 'decor/aroma-sachet', 'sale'],
      imageSrc: [
        '/images/products/aroma-sachet/A-set-of-aroma-sachets-made-of-wax-1.jpg',
        '/images/products/aroma-sachet/A-set-of-aroma-sachets-made-of-wax-2.jpg',
        '/images/products/aroma-sachet/A-set-of-aroma-sachets-made-of-wax-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/wax',
      type: 'Set of products',
    },
    {
      id: '35',
      name: 'Body scrub with sea salt "Ice mint and flax"',
      price: 3.0,
      description:
        'Ice Mint and Flax scrub is designed for deep skin care, especially in those moments when you want to feel the excitement of a cool breeze and the purity of the ocean. The basis of the scrub is sea salt, which helps to effectively exfoliate dead cells, improving the texture of the skin and contributing to its renewal.',
      categories: ['scrub', 'self-care', 'self-care/scrub', 'new'],
      imageSrc: [
        '/images/products/scrub/Body-scrub-with-sea-salt-Ice-mint-and-flax-1.jpg',
        '/images/products/scrub/Body-scrub-with-sea-salt-Ice-mint-and-flax-2.jpg',
        '/images/products/scrub/Body-scrub-with-sea-salt-Ice-mint-and-flax-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/ice',
      type: 'Single products',
    },
    {
      id: '36',
      name: 'Candle-pot',
      price: 3.0,
      salePrice: 2.65,
      description:
        'A candle in the shape of a pot is like a piece from a fairy tale, taking us into a magical world and mysterious adventures. The design of this candle reminds of magic cauldrons in which magic potions and drinks are prepared. It usually includes small details that create the illusion of a magical item.',
      categories: ['candles', 'decor', 'decor/candles', 'sale'],
      imageSrc: [
        '/images/products/candles/Candle-pot-1.jpg',
        '/images/products/candles/Candle-pot-2.jpg',
        '/images/products/candles/Candle-pot-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/pot',
      type: 'Single products',
    },
    {
      id: '37',
      name: 'Candle Owl',
      price: 18.0,
      description:
        'A candle in the form of an owl is an amazing and symbolic work that brings wisdom, intuition and the mystery of nocturnal nature to your home. This candle not only serves as a light source, but also embodies the symbolic aspects of the owl – a bird often associated with wisdom and mystery.',
      categories: ['candles', 'decor', 'decor/candles'],
      imageSrc: [
        '/images/products/candles/Candle-Owl-1.jpg',
        '/images/products/candles/Candle-Owl-2.jpg',
        '/images/products/candles/Candle-Owl-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/owl',
      type: 'Single products',
    },
    {
      id: '38',
      name: 'Bouquet of tulips',
      price: 20.0,
      description:
        'This amazing soap is made in the form of a delicate bouquet of tulips, each of which looks like a real flower. The shades of the petals are carefully selected to convey the natural beauty and brightness of tulips. It is perfect as a gift for any occasion - from birthday to wedding or just as a sign of attention.',
      categories: ['soap', 'self-care', 'self-care/soap', 'new'],
      imageSrc: [
        '/images/products/soap/Bouquet-of-tulips-1.jpg',
        '/images/products/soap/Bouquet-of-tulips-2.jpg',
        '/images/products/soap/Bouquet-of-tulips-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/tulips',
      type: 'Set of products',
    },
    {
      id: '39',
      name: 'Mandarins',
      price: 13.0,
      description:
        'Soap in the form of tangerine is not only a functional hygiene item, but also a bright accessory for the bathroom or kitchen. Its design resembles a fresh and juicy tangerine, creating a pleasant atmosphere and adding bright notes to the interior.',
      categories: ['soap', 'self-care', 'self-care/soap'],
      imageSrc: [
        '/images/products/soap/Mandarins-1.jpg',
        '/images/products/soap/Mandarins-2.jpg',
        '/images/products/soap/Mandarins-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/mandarins',
      type: 'Set of products',
    },
    {
      id: '40',
      name: 'Bath bombs with Red clay',
      price: 12.0,
      description:
        'Red Clay bath bombs are unique and caring products designed to give your water treatments a touch of natural care and relaxation. Red clay is known for its cleansing and moisturizing properties, and these bombs help to improve the condition of the skin during a bath.',
      categories: ['bath-bombs', 'self-care', 'self-care/bath-bombs'],
      imageSrc: [
        '/images/products/bath-bombs/Bath-bombs-with-Red-clay-1.jpg',
        '/images/products/bath-bombs/Bath-bombs-with-Red-clay-2.jpg',
        '/images/products/bath-bombs/Bath-bombs-with-Red-clay-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/clay',
      type: 'Set of products',
    },
    {
      id: '41',
      name: 'Sugar body scrub "Lavender"',
      price: 8.0,
      salePrice: 7.35,
      description:
        'Sugar scrub "Lavender" is created for careful care of your skin, while giving you moments of peace and well-being. Its main component is natural sugar, which delicately and effectively removes keratinized cells, contributing to the renewal of the skin surface. This helps to increase its smoothness and give a healthy shine.',
      categories: ['scrub', 'self-care', 'self-care/scrub', 'sale'],
      imageSrc: [
        '/images/products/scrub/Sugar-body-scrub-Lavender-1.jpg',
        '/images/products/scrub/Sugar-body-scrub-Lavender-2.jpg',
        '/images/products/scrub/Sugar-body-scrub-Lavender-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/lavender',
      type: 'Single products',
    },
    {
      id: '42',
      name: 'Rabbit',
      price: 6.0,
      salePrice: 4.55,
      description:
        'The shape of the rabbit looks smiling and attractive. Ears, eyes, nose and tail – each part of rabbit soap is carefully thought out and created so as to ensure comfortable use. You can easily take care of your skin by simply picking up this cute rabbit.',
      categories: ['soap', 'self-care', 'self-care/soap', 'sale'],
      imageSrc: ['/images/products/soap/Rabbit-1.jpg', '/images/products/soap/Rabbit-2.jpg'],
      quantityInCart: 0,
      link: 'product/rabbit',
      type: 'Single products',
    },
    {
      id: '43',
      name: 'Donut',
      price: 14.0,
      description:
        'The Doughnut bath bomb is not only a way to add a fun touch to your water treatment, but also a way to take care of the condition of your skin. Its use can become a fun relaxation ritual and a pleasant self-care experience.',
      categories: ['bath-bombs', 'self-care', 'self-care/bath-bombs', 'new'],
      imageSrc: [
        '/images/products/bath-bombs/Donut-1.jpg',
        '/images/products/bath-bombs/Donut-2.jpg',
        '/images/products/bath-bombs/Donut-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/donut',
      type: 'Set of products',
    },
    {
      id: '44',
      name: 'Macaroon shaped bath bombs',
      price: 4.0,
      description:
        'Bath bombs in the form of macaroons are gentle and fragrant products created to give your water procedures charm and luxury. Inspired by popular desserts, these bombs will turn your bath into a real paradise of fragrances and skin care.',
      categories: ['bath-bombs', 'self-care', 'self-care/bath-bombs'],
      imageSrc: [
        '/images/products/bath-bombs/Macaroon-shaped-bath-bombs-1.jpg',
        '/images/products/bath-bombs/Macaroon-shaped-bath-bombs-2.jpg',
        '/images/products/bath-bombs/Macaroon-shaped-bath-bombs-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/macaroon',
      type: 'Single products',
    },
    {
      id: '45',
      name: 'Honey cake',
      price: 9.0,
      description:
        'Soap in the form of honey cake attracts the eye with its realistic appearance, which resembles a real sweet dessert. It is made with great care and attention to detail in order to convey the texture and shades of honey cake as much as possible.',
      categories: ['soap', 'self-care', 'self-care/soap'],
      imageSrc: [
        '/images/products/soap/Honey-cake-1.jpg',
        '/images/products/soap/Honey-cake-2.jpg',
      ],
      quantityInCart: 0,
      link: 'product/honey-cake',
      type: 'Set of products',
    },
    {
      id: '46',
      name: 'Cool duck',
      price: 12.0,
      salePrice: 10.55,
      description:
        'The Cool Duck Bath Bomb is not only a skin care product, but also a way to add joy and fun to your water routine. It can be a great gift or a way to relax after a long day, giving a smile and pleasant memories.',
      categories: ['bath-bombs', 'self-care', 'self-care/bath-bombs', 'sale'],
      imageSrc: [
        '/images/products/bath-bombs/Cool-duck-1.jpg',
        '/images/products/bath-bombs/Cool-duck-2.jpg',
        '/images/products/bath-bombs/Cool-duck-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/cool-duck',
      type: 'Single products',
    },
    {
      id: '47',
      name: 'Green wax candles',
      price: 7.0,
      description:
        'Wax candles of a green shade are like a light breath of nature in your home. Green is associated with growth, life and renewal. These candles recreate the atmosphere of tranquility and harmony, bringing with them notes of natural beauty.',
      categories: ['candles', 'decor', 'decor/candles', 'new'],
      imageSrc: [
        '/images/products/candles/Green-wax-candles-1.jpg',
        '/images/products/candles/Green-wax-candles-2.jpg',
        '/images/products/candles/Green-wax-candles-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/green',
      type: 'Set of products',
    },
    {
      id: '48',
      name: 'Roses aroma-sachet',
      price: 7.0,
      salePrice: 6.35,
      description:
        'Aroma sachet with roses is a refined and refined aromatic product that creates an atmosphere of tenderness, romance and relaxation in any room. It is a small bag or bottle filled with dried rose petals and other natural materials that preserve and convey a unique aroma.',
      categories: ['aroma-sachet', 'decor', 'decor/aroma-sachet', 'sale'],
      imageSrc: ['/images/products/aroma-sachet/Roses-aroma-sachet.jpg'],
      quantityInCart: 0,
      link: 'product/roses aroma-sachet',
      type: 'Set of products',
    },
    {
      id: '49',
      name: 'Lemons',
      price: 14.0,
      description:
        'Aroma sachets "Lemons" are fresh and energetic pouches created to bring a bright and refreshing aroma of lemons into your space. These sachets fill the air with freshness and joy, creating an atmosphere of wakefulness and spring mood.',
      categories: ['aroma-sachet', 'decor', 'decor/aroma-sachet', 'new'],
      imageSrc: [
        '/images/products/aroma-sachet/Lemons-1.jpg',
        '/images/products/aroma-sachet/Lemons-2.jpg',
        '/images/products/aroma-sachet/Lemons-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/lemons',
      type: 'Single products',
    },
    {
      id: '50',
      name: 'Bath bomb "Lavender"',
      price: 7.0,
      description:
        'The Lavender Bath bomb is a fragrant and soothing remedy created to enrich your bath with lavender aromas and give you a moment of relaxation and peace. Lavender is known for its relaxing properties and ability to help relieve stress and tension.',
      categories: ['bath-bombs', 'self-care', 'self-care/bath-bombs'],
      imageSrc: [
        '/images/products/bath-bombs/Bath-bomb-Lavender-1.jpg',
        '/images/products/bath-bombs/Bath-bomb-Lavender-2.jpg',
        '/images/products/bath-bombs/Bath-bomb-Lavender-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/Lavender',
      type: 'Set of products',
    },
    {
      id: '51',
      name: 'Cat',
      price: 8.0,
      description:
        'Aroma sachets in the form of a cat are cute and fragrant bags created to bring comfort and pleasant aromas into your space, as well as serve as decorative elements that add a touch of playfulness.',
      categories: ['aroma-sachet', 'decor', 'decor/aroma-sachet'],
      imageSrc: [
        '/images/products/aroma-sachet/Cat-1.jpg',
        '/images/products/aroma-sachet/Cat-2.jpg',
      ],
      quantityInCart: 0,
      link: 'product/cat',
      type: 'Single products',
    },
    {
      id: '52',
      name: 'Mimosa on flax',
      price: 7.0,
      salePrice: 6.45,
      description:
        'Mimosa on Flax aroma sachets are exquisite and fragrant bags created to bring a touch of spring freshness and joy to your surroundings. Inspired by the bright and delicate aroma of mimosa, these sachets will add a natural note and comfort to your home.',
      categories: ['aroma-sachet', 'decor', 'decor/aroma-sachet', 'sale'],
      imageSrc: [
        '/images/products/aroma-sachet/Mimosa-on-flux-1.jpg',
        '/images/products/aroma-sachet/Mimosa-on-flux-2.jpg',
      ],
      quantityInCart: 0,
      link: 'product/mimosa',
      type: 'Single products',
    },
    {
      id: '53',
      name: 'Bath bombs with flowers',
      price: 9.0,
      description:
        'Flower bath bombs are a way to add a romantic and natural touch to your water experience. They will help you relax, feel the aromas and beauty of nature, as well as take care of the condition of your skin.',
      categories: ['bath-bombs', 'self-care', 'self-care/bath-bombs'],
      imageSrc: [
        '/images/products/bath-bombs/Bath-bombs-with-flowers-1.jpg',
        '/images/products/bath-bombs/Bath-bombs-with-flowers-2.jpg',
        '/images/products/bath-bombs/Bath-bombs-with-flowers-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/bath-bombs-with-flowers',
      type: 'Single products',
    },
    {
      id: '54',
      name: 'Coconut Wax Candle ',
      price: 16.0,
      salePrice: 14.55,
      description:
        'The coconut wax candle is an environmentally friendly and unique piece created from natural materials for those who appreciate nature and take care of their surroundings. This candle combines natural beauty and high quality, making your candle lighting experience especially enjoyable and close to nature.',
      categories: ['candles', 'decor', 'decor/candles', 'sale'],
      imageSrc: [
        '/images/products/candles/Coconut-Wax-Candle-1.jpg',
        '/images/products/candles/Coconut-Wax-Candle-2.jpg',
        '/images/products/candles/Coconut-Wax-Candle-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/coconut',
      type: 'Single products',
    },
    {
      id: '55',
      name: 'Almonds in milk ',
      price: 12.0,
      description:
        'Bath bomb "Almonds in milk" is a luxurious and nutritious remedy created to transform your bath into a real grooming ritual. Inspired by natural ingredients, this bomb combines aromatherapy, hydration and relaxation.',
      categories: ['bath-bombs', 'self-care', 'self-care/bath-bombs'],
      imageSrc: [
        '/images/products/bath-bombs/Almonds-in-milk-1.jpg',
        '/images/products/bath-bombs/Almonds-in-milk-2.jpg',
        '/images/products/bath-bombs/Almonds-in-milk-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/Almonds',
      type: 'Single products',
    },
    {
      id: '56',
      name: 'Soy Eye Candle ',
      price: 12.0,
      description:
        'The shape of the candle is made in the form of an open eye, which gives it a mysterious and symbolic character. The eye, as an archetype, is often associated with observation, protection and penetration into the depths of the soul. It can become not only an interesting element of decor, but also an object of reflection.',
      categories: ['candles', 'decor', 'decor/candles'],
      imageSrc: [
        '/images/products/candles/Soy-Eye-Candle-1.jpg',
        '/images/products/candles/Soy-Eye-Candle-2.jpg',
        '/images/products/candles/Soy-Eye-Candle-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/eye',
      type: 'Single products',
    },
    {
      id: '57',
      name: 'Banana-raspberry ',
      price: 6.0,
      salePrice: 4.55,
      description:
        'Banana-raspberry bath bombs are a fragrant and caring product that will turn your bath into a real aromatic oasis. The combination of the aroma of ripe banana and fresh raspberries will create a pleasant atmosphere of relaxation and comfort.',
      categories: ['bath-bombs', 'self-care', 'self-care/bath-bombs', 'sale'],
      imageSrc: [
        '/images/products/bath-bombs/Banana-raspberry-1.jpg',
        '/images/products/bath-bombs/Banana-raspberry-2.jpg',
        '/images/products/bath-bombs/Banana-raspberry-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/banana-raspberry',
      type: 'Set of products',
    },
    {
      id: '58',
      name: 'Turkish Delight Body Scrub ',
      price: 11.0,
      salePrice: 10.35,
      description:
        'Turkish Delight Body Scrub is an exquisite and fragrant skin care product inspired by a sweet delicacy called Turkish delight or Turkish marmalade. This scrub is enriched with natural ingredients and creates a unique skin care experience, immersing you in a world of sweet flavors and tenderness.',
      categories: ['scrub', 'self-care', 'self-care/scrub', 'sale'],
      imageSrc: [
        '/images/products/scrub/Turkish-Delight-Body-Scrub-1.jpg',
        '/images/products/scrub/Turkish-Delight-Body-Scrub-2.jpg',
        '/images/products/scrub/Turkish-Delight-Body-Scrub-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/turkish',
      type: 'Single products',
    },
    {
      id: '59',
      name: 'Cedar body scrub ',
      price: 9.0,
      description:
        'Cedar nut scrub is designed for deep skin care, giving her a feeling of tenderness and nutrition. Pine nuts are a natural source of many vitamins, minerals and fatty acids that help strengthen the skin and renew it.',
      categories: ['scrub', 'self-care', 'self-care/scrub'],
      imageSrc: [
        '/images/products/scrub/Cedar-body-scrub-1.jpg',
        '/images/products/scrub/Cedar-body-scrub-2.jpg',
        '/images/products/scrub/Cedar-body-scrub-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/cedar',
      type: 'Single products',
    },
    {
      id: '60',
      name: 'Bouquet',
      price: 9.0,
      description:
        'A bouquet of soap is an original and creative gift that combines the beauty of flowers and the functionality of fragrant soap. Such a bouquet can be a wonderful decoration for your interior or a pleasant surprise for a loved one.',
      categories: ['soap', 'self-care', 'self-care/soap', 'new'],
      imageSrc: [
        '/images/products/soap/Bouquet-1.jpg',
        '/images/products/soap/Bouquet-2.jpg',
        '/images/products/soap/Bouquet-3.jpg',
      ],
      quantityInCart: 0,
      link: 'product/bouquet',
      type: 'Set of products',
    },
  ],
  authorizedUserId: {
    authorizedUserId: '',
  },
  users: [],
  orders: [],
});
