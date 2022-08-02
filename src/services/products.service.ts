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

  public async create(product: Product): Promise<Product> {
    const result = await this.productModel.create(product);

    return result;
  }

  public async updateOrderIdWhereProductId(orderId:number, productId: number): Promise<void> {
    await this.productModel.updateOrderIdWhereProductId(orderId, productId);
  }
}

export default ProductService;