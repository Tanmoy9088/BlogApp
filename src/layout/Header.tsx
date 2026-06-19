// import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="flex fixed top-0 w-full gap-10 justify-start px-16 bg-black py-4 text-white">
        <NavLink
          to="/home"
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

          <div className="absolute left-0 hidden group-hover:block top-full w-32 px-2 py-2 border z-50 bg-black">
            <div className="flex flex-col">
              {" "}
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
