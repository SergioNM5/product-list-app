"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Product } from "@/app/models/product";

const NavBar = () => {
  const pathname = usePathname();
  const products = useSelector((state: RootState) => state.cart.products);

  const calculateTotalPrice = (products: Product[]) => {
    return products.reduce((total, product) => total + product.price, 0);
  };

  return (
    <>
      <Link
        href="/"
        className={`${
          pathname === "/" ? "bg-blue-800" : "bg-blue-500"
        } hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded`}
      >
        Home
      </Link>
      <Link
        href="/product-list"
        className={`${
          pathname === "/product-list" ? "bg-blue-800" : "bg-blue-500"
        } hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded`}
      >
        Products
      </Link>
      <div
        className={`${
          pathname === "/cart" ? "bg-blue-800" : "bg-blue-500"
        } hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded flex gap-3 items-center relative`}
      >
        Cart
        <div>${calculateTotalPrice(products).toFixed(2)}</div>
        <div
          className="bg-blue-100 text-blue-600 rounded-full p-1 absolute text-xs w-6 h-6 flex items-center justify-center"
          style={{ top: "-10px", right: "-10px" }}
        >
          {products.length}
        </div>
      </div>
    </>
  );
};

export default NavBar;
