import bcrypt  from 'bcryptjs'



const data = {
  users:[
    {
    name:"Sasco",
    phoneNumber:'0248958661',
    email:'admin@gmail.com',
    password:bcrypt.hashSync('1234', 8),
    isAdmin:true
  },
    {
    name:"Mercy",
    phoneNumber:'0208958661',
    email:'mercy@gmail.com',
    password:bcrypt.hashSync('1234', 8),
    isAdmin:false
  }

],
  products: [
    {
      name: 'Midi sundress with ruched front',
      category: 'Shirts',
      image: '/images/dress3.jpg',
      price: 120,
      countInStock: 10,
      brand: 'cussi',
      rating: 4.5,
      numReviews: 10,
      description: 'This is for all the latest trends, no matter who you are, where you’re from and what you’re up to. Exclusive to ASOS, our universal brand is here for you, and comes in all our fit ranges: ASOS Curve, Tall, Petite and Maternity. Created by us, styled by you.',
    },
    {
      name: 'Adidas Fit Shirt',
      category: 'Shirts',
      image: '/images/p2.jpg',
      price: 100,
      countInStock: 20,
      brand: 'Adidas',
      rating: 4.0,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'cami maxi dress in polka dot',
      category: 'Shirts',
      image: '/images/dress4.jpg',
      price: 220,
      countInStock: 0,
      brand: 'Straight Dress',
      rating: 4.8,
      numReviews: 17,
      description: 'This is for all the latest trends, no matter who you are, where you’re from and what you’re up to. Exclusive to ASOS, our universal brand is here for you, and comes in all our fit ranges: ASOS Curve, Tall, Petite and Maternity. Created by us, styled by you.',
    },
    {
      name: 'Nike Slim Pant',
      category: 'Pants',
      image: '/images/p4.jpg',
      price: 78,
      countInStock: 15,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality product',
    },
    {
      name: 'Puma Slim Pant',
      category: 'Pants',
      image: '/images/p5.jpg',
      price: 65,
      countInStock: 5,
      brand: 'Puma',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'Adidas Fit Pant',
      category: 'Pants',
      image: '/images/p6.jpg',
      price: 139,
      countInStock: 12,
      brand: 'Adidas',
      rating: 4.5,
      numReviews: 15,
      description: 'high quality product',
    },
    {
     
      name: 'Midi sundress with shirring detail',
      category: 'Pants',
      image: '/images/dress1.jpg',
      price: 139,
      countInStock: 12,
      brand: 'Adidas',
      rating: 4.5,
      numReviews: 15,
      description: 'high quality product',
    },
    {
     
      name: 'Midi sundress with ruched front',
      category: 'Pants',
      image: '/images/dress2.jpg',
      price: 139,
      countInStock: 12,
      brand: 'Adidas',
      rating: 4.5,
      numReviews: 15,
      description: 'high quality product',
    },
  ]
};
export default data;
