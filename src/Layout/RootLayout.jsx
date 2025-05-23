import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer/Footer";

const RootLayout = () => {
  const outletHeight = `calc(100vh - 64.95px - 103.99px)`;

  return (
    <div className="bg-base-100 text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main style={{ height: outletHeight, overflowY: "auto" }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
