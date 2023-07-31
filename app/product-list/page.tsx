import React from "react";
import { Product } from "../models/product";
import ProductList from "../components/productList/ProductList";
import { Metadata } from "next";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export const metadata: Metadata = {
  title: "Product List",
  description: "Coding challenge",
};

export default async function ProductListPage() {
  const products: Product[] = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24">
      <h1 className="text-4xl font-bold text-center text-blue-500 my-8">
        Products
      </h1>
      <ProductList products={products} />
    </main>
  );
}
