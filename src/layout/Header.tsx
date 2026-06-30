// import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="flex fixed top-0 w-full gap-10 justify-start px-16 bg-black py-4 text-white z-50">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
                ? "active  underline underline-offset-8 decoration-[#FFAB5E]"
                : "text-[#A89A92]"
          }
        >
          Home
        </NavLink>
        <div className="relative group">
          <NavLink
            to="/blog"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                  ? "active  underline underline-offset-8 decoration-[#FFAB5E]"
                  : "text-[#A89A92]"
            }
          >
            Blog
          </NavLink>

          <div className="absolute left-0 hidden group-hover:block top-full pt-3 z-50">
            <div className="flex flex-col text-center w-40 px-2 py-1 rounded-md border bg-black border-[#FFAE5B]">
            
              <NavLink
                to="/blog/:id"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                      ? "active  underline underline-offset-8 decoration-[#FFAB5E]"
                      : "text-[#A89A92]"
                }
              >
                Blog Details
              </NavLink>
              <NavLink
                to="/user/:userId"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                      ? "active  underline underline-offset-8 decoration-[#FFAB5E]"
                      : "text-[#A89A92]"
                }
              >
                Author Details
              </NavLink>
            </div>
          </div>
        </div>
        <NavLink
          to="/joke"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
                ? "active  underline underline-offset-8 decoration-[#FFAB5E]"
                : "text-[#A89A92]"
          }
        >
          Random Joke
        </NavLink>
        <NavLink
          to="/weather"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
                ? "active  underline underline-offset-8 decoration-[#FFAB5E]"
                : "text-[#A89A92]"
          }
        >
          Weather
        </NavLink>
      </nav>
    </>
  );
};

export default Header;
