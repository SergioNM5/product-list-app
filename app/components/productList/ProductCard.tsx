"use client";

import { Product } from "@/app/models/product";
import Image from "next/image";
import React from "react";
import ProductImage from "../../../public/images/image1.webp";
import { useDispatch } from "react-redux";
import { addProduct } from "@/app/store/features/cart/cartSlice";
import Stars from "../shared/Stars";

interface ProductCardInterface {
  product: Product;
}

const ProductCard = ({
  product: { id, title, description, price, currency, rating, image },
}: ProductCardInterface) => {
  const dispatch = useDispatch();

  const addProductToCart = () => {
    dispatch(
      addProduct({ id, title, description, price, currency, rating, image })
    );
  };

  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
      <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer flex-none">
        <Image
          className="w-full h-48 object-cover"
          src={ProductImage}
          alt="Product Image"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-gray-600 mt-2 line-clamp-3">{description}</p>
          <p className="mt-2 text-blue-500 font-semibold">${price}</p>
        </div>
        <div className="w-full p-4">
          <Stars rating={rating} />
        </div>
        <div className="w-full p-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
            onClick={addProductToCart}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
