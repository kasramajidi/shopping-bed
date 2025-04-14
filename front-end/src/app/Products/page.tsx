"use client";
import { useState } from "react";
import SearchBar from "./../../components/Product/SearchBar";
import ProductList from "./../../components/Product/ProductList";
import useSearchPost from "./../../components/Product/useSearchPost";
import ProductListVertical from "./../../components/Product/ProductListVertical";
import Pagination from "./../../components/Product/Pagination";
import Image from "next/image";
import { IoMenuSharp } from "react-icons/io5";
import { useTheme } from "./../../context/ThemeContext";
interface FilterSearch {
  search: string;
  category: string;
  company: string;
  order: "a-z" | "z-a" | "high" | "low";
  price: number;
  shipping: boolean;
}

export default function Page() {
  const [isGridView, setIsGridView] = useState(true);
  const [filters, setFilters] = useState<FilterSearch>({
    search: "",
    category: "all",
    company: "all",
    order: "a-z",
    price: 100000,
    shipping: false,
  });
  const { isDarkMode } = useTheme();
  const { data: products, meta, isLoading } = useSearchPost(filters);

  if (isLoading) return <div>Loading...</div>;

  const totalPages = meta?.pagination.totalPage || 1;

  return (
    <div className="max-w-7xl mx-auto px-10 py-18 flex flex-col">
      <SearchBar onFilterChange={setFilters} />
      <div
        className={`flex justify-between items-center mt-6 sm:mt-8 ${
          isDarkMode
            ? "dark:border-b border-[rgb(8,9,11)]"
            : "border-b border-gray-300"
        } pb-4 sm:pb-5`}
      >
        <div
          className={`font-medium text-sm sm:text-md ${
            isDarkMode ? "dark:text-white" : "text-[rgb(57,78,106)]"
          }`}
        >
          <span>{meta?.pagination.filteredCount}</span> <span>products</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            className={`w-8 h-8 p-1 flex items-center justify-center rounded-lg transition-all cursor-pointer ${
              isGridView
                ? isDarkMode
                  ? "dark:bg-[rgb(255,80,197)]"
                  : "bg-[rgb(226,232,244)]"
                : isDarkMode
                ? "dark:bg-[rgb(39,41,52)] dark:hover:bg-[rgb(255,80,197)]"
                : "bg-white hover:bg-[rgb(226,232,244)]"
            }`}
            onClick={() => setIsGridView(true)}
          >
            <Image
              src="/svg/menu.svg"
              width={24}
              height={24}
              alt="Grid View"
              className="w-5 h-5"
            />
          </button>

          <button
            className={`w-8 h-8 p-1 flex items-center justify-center rounded-lg transition-all cursor-pointer ${
              isGridView
                ? isDarkMode
                  ? "dark:bg-[rgb(39,41,52)] dark:hover:bg-[rgb(255,80,197)]"
                  : "bg-white hover:bg-[rgb(226,232,244)]"
                : isDarkMode
                ? "dark:bg-[rgb(255,80,197)]"
                : "bg-[rgb(226,232,244)]"
            }`}
            onClick={() => setIsGridView(false)}
          >
            <IoMenuSharp className="text-xl text-black" />
          </button>
        </div>
      </div>

      {isGridView ? (
        <ProductList products={products} isLoading={isLoading} />
      ) : (
        <ProductListVertical products={products} isLoading={isLoading} />
      )}

      {/* ارسال اطلاعات صفحه‌بندی به کامپوننت Pagination */}
      <Pagination totalPages={totalPages} />
    </div>
  );
}
