// import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
// import Footer from "./Footer";

const Wrapper = () => {
  return (
    <>
      <div>
        <Header />
        <main className="pt-16">
          <Outlet />
        </main>

        {/* <Footer/> */}
      </div>
    </>
  );
};

export default Wrapper;
