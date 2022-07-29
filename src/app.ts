import express from 'express';
import ProductController from './controllers/products.controller';

const app = express();

app.use(express.json());

const productController = new ProductController();

app.get('/products', productController.getAll);

app.post('/products', productController.create);

export default app;