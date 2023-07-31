"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/app/models/product";
import Pagination from "./Pagination";

interface ProductListInterface {
  products: Product[];
}

const ProductList = ({ products }: ProductListInterface) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentItems, setCurrentItems] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState("none");
  const [inputTitle, setInputTitle] = useState("");

  const PRICE_LOW_TO_HIGH = "priceLowToHigh";
  const PRICE_HIGH_TO_LOW = "priceHighToLow";
  const RATING = "rating";

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  useEffect(() => {
    setCurrentItems(products.slice(firstItemIndex, lastItemIndex));
    setInputTitle("");
    setSortBy("none");
  }, [currentPage]);

  const filterByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
    setCurrentItems(
      products.filter((product) =>
        product.title.toLowerCase().includes(e.target.value)
      )
    );
  };

  const handleChangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setSortBy(selectedOption);
    sortProducts(selectedOption);
    setInputTitle("");
  };

  const sortProducts = (option: string) => {
    let sortedProducts = [...products];

    if (option === PRICE_LOW_TO_HIGH) {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === PRICE_HIGH_TO_LOW) {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (option === RATING) {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    }

    setCurrentItems(sortedProducts.slice(firstItemIndex, lastItemIndex));
  };

  return (
    <>
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8 align-middle">
        <input
          type="text"
          className="border h-10 border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Filter by name..."
          onChange={(e) => filterByName(e)}
          value={inputTitle}
        />
        <div className="flex gap-2 items-center">
          <label
            className=" text-gray-700 text-sm font-bold mb-2 w-100 items-center"
            htmlFor="selectSort"
          >
            Sort by:
          </label>
          <select
            id="selectSort"
            className="w-300 h-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={sortBy}
            onChange={handleChangeSort}
          >
            <option value="none">None</option>
            <option value={PRICE_LOW_TO_HIGH}>Price: Low to High</option>
            <option value={PRICE_HIGH_TO_LOW}>Price: High to Low</option>
            <option value={RATING}>Rating</option>
          </select>
        </div>
      </div>

      <div className="w-full flex flex-wrap">
        {currentItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {currentItems.length > 9 && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={products.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default ProductList;
