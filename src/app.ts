import express from 'express';
import OrderController from './controllers/orders.controller';
import ProductController from './controllers/products.controller';
import UserController from './controllers/users.controller';

const app = express();

app.use(express.json());

const productController = new ProductController();
const userController = new UserController();
const orderController = new OrderController();

app.get('/products', productController.getAll);

app.post('/products', productController.create);

app.post('/users', userController.create);

app.get('/users', userController.getAll);

app.get('/orders', orderController.getAll);

export default app;