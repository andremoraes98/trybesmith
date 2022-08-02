import express from 'express';
import OrderController from './controllers/orders.controller';
import ProductController from './controllers/products.controller';
import UserController from './controllers/users.controller';
import validateUser from './middleware/user.middleware';
import validateProduct from './middleware/product.middleware'; 
import errorMiddleware from './middleware/error.middleware';
import 'express-async-errors';

const app = express();

app.use(express.json());

const productController = new ProductController();
const userController = new UserController();
const orderController = new OrderController();

app.get('/products', productController.getAll);

app.post(
  '/products',
  validateProduct.productName,
  validateProduct.productAmount,
  productController.create,
);

app.post(
  '/users',
  validateUser.username,
  validateUser.classe,
  validateUser.level,
  validateUser.password,
  userController.create,
);

app.get('/users', userController.getAll);

app.get('/orders', orderController.getAll);

app.post('/login', validateUser.body, validateUser.credentials, userController.login);

app.post(
  '/orders',
  validateProduct.validToken,
  validateProduct.bodyProduct,
  orderController.create,
);

app.use(errorMiddleware);

export default app;