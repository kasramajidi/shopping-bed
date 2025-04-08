"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaMoon } from "react-icons/fa6";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0)

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
    <header className="bg-[#F0F6FF] py-3">
      <div className="text-[#394E6A] max-w-7xl mx-auto flex items-center justify-between px-10">
        {/* لوگو */}
        <Link
          href="/"
          className="lg:block hidden px-4 bg-[#057AFF] rounded-lg transition delay-200 text-[#DBE1FF] pb-2 text-3xl hover:bg-[#005CCC]"
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
          className={`lg:flex flex-col lg:flex-row lg:gap-5 lg:items-center absolute flex max-w-[250px] lg:static bg-[#F0F6FF] w-full top-20 left-10 lg:w-auto lg:bg-transparent transition-all ${isOpen ? "block" : "hidden"
            }`}
        >
          {isAuthenticated ? (
            <>
              <Link
                href="/"
                className={`py-2 px-4 ${pathname === "/" ? "bg-[#021431] text-[#C7C9D1] rounded-lg" : "bg-transparent text-[#394E6A]"}`}
              >
                Home
              </Link>
              <Link
                href="/About"
                className={`py-2 px-4 ${pathname === "/About" ? "bg-[#021431] text-[#C7C9D1] rounded-lg" : "bg-transparent text-[#394E6A]"}`}
              >
                About
              </Link>
              <Link
                href="/Products"
                className={`py-2 px-4 ${pathname === "/Products" ? "bg-[#021431] text-[#C7C9D1] rounded-lg" : "bg-transparent text-[#394E6A]"}`}
              >
                Products
              </Link>
              <Link
                href="/Cart"
                className={`py-2 px-4 ${pathname === "/Cart" ? "bg-[#021431] text-[#C7C9D1] rounded-lg" : "bg-transparent text-[#394E6A]"}`}
              >
                Cart
              </Link>
              <Link
                href="/Checkout"
                className={`py-2 px-4 ${pathname === "/Checkout" ? "bg-[#021431] text-[#C7C9D1] rounded-lg" : "bg-transparent text-[#394E6A]"}`}
              >
                CheckOut
              </Link>
              <Link
                href="/Order"
                className={`py-2 px-4 ${pathname === "/Order" ? "bg-[#021431] text-[#C7C9D1] rounded-lg" : "bg-transparent text-[#394E6A]"}`}
              >
                Order
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/"
                className={`py-2 px-4 ${pathname === "/" ? "bg-[#021431] text-[#C7C9D1] rounded-lg" : "bg-transparent text-[#394E6A]"}`}
              >
                Home
              </Link>
              <Link
                href="/About"
                className={`py-2 px-4 ${pathname === "/About" ? "bg-[#021431] text-[#C7C9D1] rounded-lg" : "bg-transparent text-[#394E6A]"}`}
              >
                About
              </Link>
              <Link
                href="/Products"
                className={`py-2 px-4 ${pathname === "/Products" ? "bg-[#021431] text-[#C7C9D1] rounded-lg" : "bg-transparent text-[#394E6A]"}`}
              >
                Products
              </Link>
              <Link
                href="/Cart"
                className={`py-2 px-4 ${pathname === "/Cart" ? "bg-[#021431] text-[#C7C9D1] rounded-lg" : "bg-transparent text-[#394E6A]"}`}
              >
                Cart
              </Link>
            </>
          )}
        </nav>

        {/* آیکون‌ها */}
        <div className="flex items-center gap-5 text-xl">
          <FaMoon className="text-[rgb(57, 78, 106)] cursor-pointer" />
          <Link href="/Cart" className="relative lg:block hidden">
            <RiShoppingCart2Line className="cursor-pointer" />
            <span className="bg-[#0066CC] absolute px-1.5 text-white -top-4 rounded-lg -right-3 text-sm">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
