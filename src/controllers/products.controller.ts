import { Request, Response } from 'express';
import ProductService from '../services/products.service';

class ProductController {
  constructor(private productService = new ProductService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const result = await this.productService.getAll();

    res.status(200).json(result);
  };

  public create = async (req: Request, res: Response) => {
    const { product } = req.body;

    const createdProduct = this.productService.create(product);

    res.status(201).json(createdProduct);
  };
}

export default ProductController;