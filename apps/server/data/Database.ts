import { faker } from "@faker-js/faker";
import { Product, generateProductData } from "./generator";

/**
 * Treat this as a fake local database.
 * Implement functions that will help you create/read/update/delete the mocked data
 */
export class Database {
  private static data = generateProductData();

  static async getProducts(sortedBy: "CreateDate" | "price" | undefined) {
    const allProducts = this.data.products.slice(); // Create a copy of the array
    switch (sortedBy) {
      case "CreateDate":
        return allProducts.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      case "price":
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

  static async createProduct(product: Product) {
    const newProduct = {
      ...product,
      _id: faker.database.mongodbObjectId(),
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

    const newOrder = {
      _id: faker.database.mongodbObjectId(),
      product_id: productId,
    };
    this.data.orders.push(newOrder);
  }
}
