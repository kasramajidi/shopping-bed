"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import TableOrder from "./../../components/Order/TableOrder";
import { useTheme } from "./../../context/ThemeContext";
interface Order {
  _id: string;
  name: string;
  address: string;
  orderTotal: number;
  numItemsInCart: number;
  createdAt: string;
}
export default function Page() {
  const [data, setData] = useState<Order[]>([]);
  const { isDarkMode } = useTheme();
  const getApi = async () => {
    try {
      const responsive = await axios.get(
        "https://shopping-bed-backend.onrender.com/orders/get-all-order"
      );
      setData(responsive.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getApi();
  }, []);

  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-18 flex flex-col ${
        isDarkMode ? "dark:text-white" : "text-[rgb(57,78,106)]"
      }`}
    >
      {data.length > 0 ? (
        <>
          <h1
            className={`text-2xl sm:text-3xl font-bold pb-6 ${
              isDarkMode
                ? "dark:border-b border-[rgb(8,9,11)]"
                : "border-b border-gray-300"
            }`}
          >
            Your Orders
          </h1>
          <h4 className="mt-8 mb-4 text-sm sm:text-base">
            Total Orders : {data.length}
          </h4>
          <TableOrder data={data} />
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
