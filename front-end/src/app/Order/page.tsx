"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import TableOrder from "@/components/Order/TableOrder";

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

  const getApi = async () => {
    try {
      const responsive = await axios.get(
        "http://localhost:5500/orders/get-all-order"
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-18 flex flex-col text-[rgb(57,78,106)]">
      {data.length > 0 ? (
        <>
          <h1 className="text-2xl sm:text-3xl font-bold pb-6 border-b border-[rgb(229,231,235)]">
            Your Orders
          </h1>
          <h4 className="mt-8 mb-4 text-sm sm:text-base">
            Total Orders : {data.length}
          </h4>
          <TableOrder data={data} />
        </>
      ) : (
        <h1 className="text-2xl sm:text-3xl font-bold pb-6 border-b border-[rgb(229,231,235)]">
          Your cart is empty
        </h1>
      )}
    </div>
  );
}
