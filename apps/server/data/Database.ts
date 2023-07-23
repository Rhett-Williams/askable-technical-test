import { faker } from "@faker-js/faker";
import {
  CreateProduct,
  Product,
  SortByCategories,
  generateProductData,
} from "./generator";

/**
 * Treat this as a fake local database.
 * Implement functions that will help you create/read/update/delete the mocked data
 */
export class Database {
  private static data = generateProductData();

  static async getProducts(sortedBy: SortByCategories) {
    const allProducts = this.data.products.slice();
    switch (sortedBy) {
      case "CreateDate":
        return allProducts.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "Price":
        return allProducts.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      default:
        return allProducts;
    }
  }

  static async getOneProduct(productId: string) {
    const allProducts = this.data.products;
    const product = allProducts.find((product) => product._id === productId);
    return product;
  }

  static async createProduct(product: CreateProduct) {
    const newProduct = {
      ...product,
      _id: faker.database.mongodbObjectId(),
      created_at: faker.date.past().toISOString(),
      order_id: null,
    };
    this.data.products.push(newProduct);
  }

  static async deleteProduct(productId: string) {
    const allProducts = this.data.products;
    const allOrders = this.data.orders;

    for (let i = allProducts.length - 1; i >= 0; i--) {
      if (allProducts[i]._id === productId) {
        this.data.products.splice(i, 1);
      }
    }

    for (let i = allOrders.length - 1; i >= 0; i--) {
      if (allOrders[i].product_id === productId) {
        this.data.orders.splice(i, 1);
      }
    }
  }

  static async getOrder(orderId: string) {
    const allOrders = this.data.orders;
    const order = allOrders.find((order) => order._id === orderId);
    return order;
  }

  static async createOrder(productId: string) {
    const allOrders = this.data.orders;

    const isProductUnavailable = allOrders.some(
      (order) => order.product_id === productId
    );
    if (isProductUnavailable) throw Error;

    const orderId = faker.database.mongodbObjectId();
    const newOrder = {
      _id: orderId,
      product_id: productId,
    };
    this.data.orders.push(newOrder);

    const allProducts = this.data.products;
    const product = allProducts.find((product) => product._id === productId);
    if (!product) throw Error;
    product.order_id = orderId;
  }
}
