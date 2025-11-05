import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: any) => {
  return (
    <div className="w-full flex flex-col">
      <Header />
      <div className="">{children}</div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
