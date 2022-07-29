import express from 'express';
import ProductController from './controllers/products.controller';

const app = express();

app.use(express.json());

const bookController = new ProductController();

app.get('/products', bookController.getAll);

export default app;