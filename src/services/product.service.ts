import productModel,
{ ProductInputtableTypes, ProductSequelizeModel } from '../database/models/product.model';

const createProduct = async (product: ProductInputtableTypes): Promise<ProductSequelizeModel> => {
  const productCreated = await productModel.create(product);
  return productCreated;
};

const getAllProducts = async (): Promise<ProductSequelizeModel[]> => {
  const products = await productModel.findAll();
  return products;
};

export default {
  createProduct,
  getAllProducts,
};