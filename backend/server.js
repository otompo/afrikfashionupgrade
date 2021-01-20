import express from 'express';
import mongoose from 'mongoose'
import donenv from 'dotenv'
// import data from './data.js';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js'

donenv.config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoose.connect('mongodb://localhost/afrikfahion',{
//   useNewUrlParser:true,
//   useUnifiedTopology:true,
//   useCreateIndex:true,
// })
// eslint-disable-next-line no-undef



mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/afrikfahion', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});


// app.get('/api/products/:id', (req, res) => {
//   const product = data.products.find((x) => x._id === req.params.id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: 'Product Not Found' });
//   }
// });

// app.get('/api/products', (req, res) => {
//   res.send(data.products);
// });


app.use('/api/users', userRouter);
app.use('/api/products', productRouter)



app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use((err, req,res, next)=>{
  res.status(500).send({message: err.message})
})

// eslint-disable-next-line no-undef

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});