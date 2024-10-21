import React from "react";
import Header from "../componets/Header";
import Footer from "../componets/Footer";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
