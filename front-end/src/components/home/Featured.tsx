"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import {useTheme} from "@/context/ThemeContext"
interface Product {
  _id: string;
  title: string;
  price: number;
  image: {
    path: string;
  };
}

export default function Featured() {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const {isDarkMode} = useTheme()
  const getApi = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/posts/getpost?featured=true"
      );
      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("There was an error loading the featured products.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <section className="flex flex-col pt-24">
      <h2 className={`text-3xl font-medium tracking-wider capitalize ${isDarkMode ? "dark:text-[rgb(247,247,241)]" : "text-[rgb(57,78,106)]"} border-b pb-5 border-[rgb(229,231,235)]`}>
        Featured Products
      </h2>

      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-6 sm:px-10 md:px-12 pt-12">
          {data.map((item) => (
            <Link key={item._id} href={`/Products/${item._id}`} passHref>
              <div className={`flex cursor-pointer px-4 pt-4 pb-8 flex-col items-center gap-10 shadow-xl hover:shadow-2xl transition duration-300 rounded-lg ${isDarkMode ? "dark:bg-[rgb(39,41,52)]" : "bg-white"}`}>
                <Image
                  src={`http://localhost:5500${item.image.path}`}
                  width={320}
                  height={180}
                  alt="Product image"
                  className="rounded-xl h-64 md:h-48 w-full object-cover"
                />
                <div className="flex flex-col items-center gap-2">
                  <h3 className={`text-xl ${isDarkMode ? "dark:text-[rgb(247,247,241)]" :"text-[rgb(57,78,106)]"}`}>{item.title}</h3>
                  <span className={`${isDarkMode ? "dark:text-[rgb(190,148,248)]" : "text-[rgb(70,58,161)]"} text-base sm:text-lg font-medium`}>${item.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}