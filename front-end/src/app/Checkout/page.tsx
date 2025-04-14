"use client";

import { useEffect, useState } from "react";
import FormCheckout from "./../../components/Checkout/FormCheckout";
import TotalAmountCheck from "./../../components/Checkout/TotalAmountCheck";
import { useTheme } from "./../../context/ThemeContext";
interface CartItem {
  price: number;
  amount: number;
}
export default function Page() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { isDarkMode } = useTheme();
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
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
            place your order
          </h1>
          <div className="flex flex-col sm:flex-row mt-8 items-start gap-8">
            <FormCheckout total={total} totalAmount={totalAmount} />
            <TotalAmountCheck
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
            />
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
