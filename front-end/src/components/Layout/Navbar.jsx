"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaMoon } from "react-icons/fa6";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "../Theme/ThemeToggle";
import { useTheme } from "./../../context/ThemeContext"
export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0)
  const { isDarkMode } = useTheme()
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    const carts = storedCart ? JSON.parse(storedCart) : []
    setCartCount(carts.length)

    const handleStorageChange = () => {
      const updatedCart = localStorage.getItem("cart");
      const parsed = updatedCart ? JSON.parse(updatedCart) : [];
      setCartCount(parsed.length);
    };

    window.addEventListener("cart-updated", handleStorageChange);

    return () => {
      window.removeEventListener("cart-updated", handleStorageChange);
    };
  }, [])
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={`${isDarkMode ? "dark:bg-[rgb(23,25,32)]" : "bg-[#F0F6FF]"} py-3`}>
      <div className="text-[#394E6A] max-w-7xl mx-auto flex items-center justify-between px-10">
        {/* لوگو */}
        <Link
          href="/"
          className={`lg:block hidden px-4 ${isDarkMode ? "dark:bg-[rgb(255,80,197)] dark:hover:bg-[rgb(255,122,197)]" : "bg-[#057AFF] hover:bg-[#005CCC]"} rounded-lg transition delay-200 text-[#DBE1FF] pb-2 text-3xl`}
        >
          c
        </Link>

        {/* دکمه منو برای موبایل */}
        <button
          className="lg:hidden text-xl"
          onClick={toggleMenu}
        >
          {isOpen ? "X" : "☰"}
        </button>

        {/* منو */}
        <nav
          className={`lg:flex flex-col lg:flex-row lg:gap-5 lg:items-center absolute flex w-[463px] lg:static bg-[#F0F6FF] top-20 left-10 lg:w-auto lg:bg-transparent transition-all ${isOpen ? "block" : "hidden"
            }`}
        >
          {isAuthenticated ? (
            <>
              <Link
                href="/"
                className={`py-2 px-4 ${pathname === "/"
                  ? isDarkMode
                    ? "dark:bg-[rgb(65,68,87)] text-white active:text-[#C7C9D1] rounded-lg"
                    : "bg-[#021431] text-[#C7C9D1] active:text-[#C7C9D1] rounded-lg"
                  : isDarkMode
                    ? "bg-transparent text-white"
                    : "bg-transparent text-[#394E6A]"
                  }`}
              >
                Home
              </Link>

              <Link
                href="/About"
                className={`py-2 px-4 ${pathname === "/About"
                  ? isDarkMode
                    ? "dark:bg-[rgb(65,68,87)] text-white active:text-[#C7C9D1] rounded-lg"
                    : "bg-[#021431] text-[#C7C9D1] active:text-[#C7C9D1] rounded-lg"
                  : isDarkMode
                    ? "bg-transparent text-white"
                    : "bg-transparent text-[#394E6A]"
                  }`}
              >
                About
              </Link>
              <Link
                href="/Products"
                className={`py-2 px-4 ${pathname === "/Products"
                  ? isDarkMode
                    ? "dark:bg-[rgb(65,68,87)] text-white active:text-[#C7C9D1] rounded-lg"
                    : "bg-[#021431] text-[#C7C9D1] active:text-[#C7C9D1] rounded-lg"
                  : isDarkMode
                    ? "bg-transparent text-white"
                    : "bg-transparent text-[#394E6A]"
                  }`}
              >
                Products
              </Link>
              <Link
                href="/Cart"
                className={`py-2 px-4 ${pathname === "/Cart"
                  ? isDarkMode
                    ? "dark:bg-[rgb(65,68,87)] text-white active:text-[#C7C9D1] rounded-lg"
                    : "bg-[#021431] text-[#C7C9D1] active:text-[#C7C9D1] rounded-lg"
                  : isDarkMode
                    ? "bg-transparent text-white"
                    : "bg-transparent text-[#394E6A]"
                  }`}
              >
                Cart
              </Link>
              <Link
                href="/Checkout"
                className={`py-2 px-4 ${pathname === "/Checkout"
                  ? isDarkMode
                    ? "dark:bg-[rgb(65,68,87)] text-white active:text-[#C7C9D1] rounded-lg"
                    : "bg-[#021431] text-[#C7C9D1] active:text-[#C7C9D1] rounded-lg"
                  : isDarkMode
                    ? "bg-transparent text-white"
                    : "bg-transparent text-[#394E6A]"
                  }`}
              >
                CheckOut
              </Link>
              <Link
                href="/Order"
                className={`py-2 px-4 ${pathname === "/Order"
                  ? isDarkMode
                    ? "dark:bg-[rgb(65,68,87)] text-white active:text-[#C7C9D1] rounded-lg"
                    : "bg-[#021431] text-[#C7C9D1] active:text-[#C7C9D1] rounded-lg"
                  : isDarkMode
                    ? "bg-transparent text-white"
                    : "bg-transparent text-[#394E6A]"
                  }`}
              >
                Order
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/"
                className={`py-2 px-4 ${pathname === "/"
                  ? isDarkMode
                    ? "dark:bg-[rgb(65,68,87)] text-white active:text-[#C7C9D1] rounded-lg"
                    : "bg-[#021431] text-[#C7C9D1] active:text-[#C7C9D1] rounded-lg"
                  : isDarkMode
                    ? "bg-transparent text-white"
                    : "bg-transparent text-[#394E6A]"
                  }`}
              >
                Home
              </Link>
              <Link
                href="/About"
                className={`py-2 px-4 ${pathname === "/About"
                  ? isDarkMode
                    ? "dark:bg-[rgb(65,68,87)] text-white active:text-[#C7C9D1] rounded-lg"
                    : "bg-[#021431] text-[#C7C9D1] active:text-[#C7C9D1] rounded-lg"
                  : isDarkMode
                    ? "bg-transparent text-white"
                    : "bg-transparent text-[#394E6A]"
                  }`}
              >
                About
              </Link>
              <Link
                href="/Products"
                className={`py-2 px-4 ${pathname === "/Products"
                  ? isDarkMode
                    ? "dark:bg-[rgb(65,68,87)] text-white active:text-[#C7C9D1] rounded-lg"
                    : "bg-[#021431] text-[#C7C9D1] active:text-[#C7C9D1] rounded-lg"
                  : isDarkMode
                    ? "bg-transparent text-white"
                    : "bg-transparent text-[#394E6A]"
                  }`}
              >
                Products
              </Link>
              <Link
                href="/Cart"
                className={`py-2 px-4 ${pathname === "/Cart"
                  ? isDarkMode
                    ? "dark:bg-[rgb(65,68,87)] text-white active:text-[#C7C9D1] rounded-lg"
                    : "bg-[#021431] text-[#C7C9D1] active:text-[#C7C9D1] rounded-lg"
                  : isDarkMode
                    ? "bg-transparent text-white"
                    : "bg-transparent text-[#394E6A]"
                  }`}
              >
                Cart
              </Link>
            </>
          )}
        </nav>

        {/* آیکون‌ها */}
        <div className="flex items-center gap-5 text-xl">
          <ThemeToggle />
          <Link href="/Cart" className="relative lg:block hidden">
            <RiShoppingCart2Line className="cursor-pointer" />
            <span className={`${isDarkMode ? "dark:bg-[rgb(255,80,197)]" : "bg-[#0066CC]"} absolute px-1.5 text-white -top-4 rounded-lg -right-3 text-sm`}>
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </header >
  );
}
