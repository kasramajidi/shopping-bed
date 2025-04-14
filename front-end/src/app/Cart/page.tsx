"use client";
import { JSX, useEffect, useReducer } from "react";
import { cartReducer, initialState } from "../../components/cart/CartReducer";
import TotalAmount from "@/components/cart/TotalAmount";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import CartItems from "@/components/cart/CartItems";
import { useTheme } from "./../../context/ThemeContext";
export type CartItemType = {
  id: string;
  title: string;
  price: number;
  amount: number;
  image?: {
    path: string;
  };
  company: string;
  colors: string;
};

export type CartAction =
  | { type: "INIT_CART"; payload: CartItemType[] }
  | { type: "REMOVE"; payload: string }
  | { type: "CHANGE_AMOUNT"; payload: { id: string; amount: number } };

export default function CartPage(): JSX.Element {
  const [cartItems, dispatch] = useReducer(
    cartReducer as React.Reducer<CartItemType[], CartAction>,
    initialState
  );
  const { isDarkMode } = useTheme();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        const parsed: CartItemType[] = JSON.parse(stored);
        dispatch({ type: "INIT_CART", payload: parsed });
      } catch (err) {
        console.error("Invalid JSON in cart:", err);
      }
    }
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );

  const shipping = 500;
  const totalAmount = cartItems.reduce((acc, item) => acc + item.amount, 0);

  const tax = totalAmount * 1600;
  const total = subtotal + shipping + tax;

  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-18 flex flex-col ${
        isDarkMode ? "dark:text-[rgb(247,247,241)]" : "text-[rgb(57,78,106)]"
      }`}
    >
      {cartItems.length > 0 ? (
        <>
          <h1
            className={`text-2xl sm:text-3xl font-bold pb-6 border-b ${
              isDarkMode
                ? "dark:border-[rgb(8,9,11)]"
                : "border-[rgb(229,231,235)]"
            }`}
          >
            Shopping Cart
          </h1>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            <CartItems cartItems={cartItems} dispatch={dispatch} />

            <div className="flex flex-col mt-6 lg:mt-8 w-full lg:w-1/4 gap-4">
              <TotalAmount
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
              />

              <button
                className={`${
                  isDarkMode
                    ? "dark:bg-[rgb(255,80,197)] dark:hover:bg-[rgb(255,08,197)]"
                    : "bg-blue-500 hover:bg-blue-600"
                } uppercase text-white font-semibold w-full sm:w-96 md:w-72 py-3 rounded-xl  transition-all duration-300`}
              >
                <Link href={isAuthenticated ? "/Checkout" : "/Login"}>
                  {isAuthenticated ? "Proceed to Checkout" : "Please Login"}
                </Link>
              </button>
            </div>
          </div>
        </>
      ) : (
        <h1
          className={`text-2xl sm:text-3xl font-bold pb-6 ${
            isDarkMode
              ? "dark:border-b border-[rgb(8,9,11)]"
              : "border-b border-gray-300"
          }`}
        >
          Your cart is empty
        </h1>
      )}
    </div>
  );
}
