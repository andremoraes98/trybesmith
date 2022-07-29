import Product from '../interfaces/product.interface';
import connection from '../models/connection';
import ProductModel from '../models/products.model';

class ProductService {
  public productModel: ProductModel;

  constructor() {
    this.productModel = new ProductModel(connection);
  }

  public async getAll(): Promise<Product[]> {
    const result = await this.productModel.getAll();

    return result;
  }
}

export default ProductService;