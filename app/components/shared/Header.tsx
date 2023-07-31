import React from "react";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className="w-full px-4 py-4 flex align-center justify-between md:justify-center gap-2 bg-slate-800 text-white">
      <NavBar />
    </header>
  );
};

export default Header;
