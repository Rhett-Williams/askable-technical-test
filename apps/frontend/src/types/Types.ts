export type OmitFields<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export namespace Types {
  export interface Product {
    title: string;
    order_id: String | null;
    category: Categories;
    created_at: string;
    price: string;
    _id: string
  }

  export type CreateProduct = OmitFields<Product, "_id" | "created_at" | "order_id">

  export type Categories = "Sneakers" | "Clothing" | "Watches" | "Hats";
}
