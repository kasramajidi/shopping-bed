"use client";
import { useState } from "react";
import { useTheme } from "./../../context/ThemeContext";

interface FilterOption {
  search: string;
  category: string;
  company: string;
  order: "a-z" | "z-a" | "high" | "low";
  price: number;
  shipping: boolean;
}

interface searchBarProps {
  onFilterChange: (filters: FilterOption) => void;
}

export default function SearchBar({ onFilterChange }: searchBarProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [company, setCompany] = useState("all");
  const [order, setOrder] = useState<"a-z" | "z-a" | "high" | "low">("a-z");
  const [price, setPrice] = useState(100000);
  const [shipping, setShipping] = useState(false);
  const { isDarkMode } = useTheme();

  const handelSearch = () => {
    onFilterChange({ search, category, company, order, price, shipping });
  };

  return (
    <section
      className={`${
        isDarkMode
          ? "dark:text-white dark:bg-[rgb(23,25,32)]"
          : "text-[rgb(57,78,106)] bg-[rgb(240,246,255)]"
      } px-6 sm:px-8 py-6 rounded-lg flex flex-col gap-6 lg:max-w-7xl sm:max-w-6xl lg:mx-0 sm:mx-auto`}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 w-full">
        <div className="flex flex-col gap-2 text-sm w-full sm:w-1/4">
          <label htmlFor="search">Search Product</label>
          <input
            id="search"
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 px-3 border rounded-lg border-[rgba(57,78,106)] focus:outline-2 focus:outline-[rgba(57,78,106)] focus:outline-offset-2"
          />
        </div>
        <div className="flex flex-col gap-2 text-sm w-full sm:w-1/4">
          <label htmlFor="category">Select Category</label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`h-10 pl-3 pr-8 border rounded-lg ${
              isDarkMode
                ? "dark:bg-[rgb(23,25,32)] dark:text-white"
                : "bg-white text-black "
            } cursor-pointer font-semibold border-[rgba(57,78,106)] focus:outline-2 focus:outline-[rgba(57,78,106)]`}
          >
            <option value="all">All</option>
            <option value="Tables">Tables</option>
            <option value="Chairs">Chairs</option>
            <option value="Kids">Kids</option>
            <option value="Sofas">Sofas</option>
            <option value="Beds">Beds</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 text-sm w-full sm:w-1/4">
          <label htmlFor="company">Select Company</label>
          <select
            id="company"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={`h-10 pl-3 pr-8 border rounded-lg ${
              isDarkMode
                ? "dark:bg-[rgb(23,25,32)] dark:text-white"
                : "bg-white text-black "
            } cursor-pointer font-semibold border-[rgba(57,78,106)] focus:outline-2 focus:outline-[rgba(57,78,106)]`}
          >
            <option value="all">All</option>
            <option value="Modenza">Modenza</option>
            <option value="Luxora">Luxora</option>
            <option value="Artifex">Artifex</option>
            <option value="Comfora">Comfora</option>
            <option value="Homestead">Homestead</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 text-sm w-full sm:w-1/4">
          <label htmlFor="order">order By</label>
          <select
            id="order"
            name="order"
            value={order}
            onChange={(e) =>
              setOrder(e.target.value as "a-z" | "z-a" | "high" | "low")
            }
            className={`h-10 pl-3 pr-8 border rounded-lg ${
              isDarkMode
                ? "dark:bg-[rgb(23,25,32)] dark:text-white"
                : "bg-white text-black "
            } cursor-pointer font-semibold border-[rgba(57,78,106)] focus:outline-2 focus:outline-[rgba(57,78,106)]`}
          >
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="high">High</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        <div className="flex flex-col gap-2 text-sm w-full sm:w-1/4">
          <label className="flex items-center justify-between" htmlFor="price">
            <span>Select Price</span>
            <span>${(price / 100).toFixed(2)}</span>
          </label>
          <input
            id="price"
            type="range"
            name="price"
            min="0"
            max="100000"
            className={`range ${
              isDarkMode ? "range-secondary" : "range-primary"
            }`}
            step="1000"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <div className="flex items-center justify-between">
            <span>$0</span>
            <span>Max: $1,000.00</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 text-sm w-full sm:w-1/4">
          <label htmlFor="shipping">free Shipping</label>
          <input
            id="shipping"
            type="checkbox"
            name="shipping"
            className={`checkbox ${
              isDarkMode ? "checkbox-secondary" : "checkbox-info"
            }`}
            checked={shipping}
            onChange={(e) => setShipping(e.target.checked)}
          />
        </div>
        <button
          onClick={handelSearch}
          className={`w-full sm:w-1/4 h-10 cursor-pointer ${
            isDarkMode
              ? "dark:text-[rgb(48,28,38)] dark:bg-[rgb(255,80,197)] dark:hover:bg-[rgb(255,50,197)]"
              : "text-white bg-[rgb(5,122,255)] hover:bg-[rgb(4,100,210)] "
          } rounded-lg transition`}
        >
          Search
        </button>
        <button
          onClick={() =>
            onFilterChange({
              search: "",
              category: "all",
              company: "all",
              order: "a-z",
              price: 100000,
              shipping: false,
            })
          }
          className={`w-full sm:w-1/4 h-10 cursor-pointer ${
            isDarkMode
              ? "dark:text-[rgb(49,38,26)] dark:bg-[rgb(255,183,107)] dark:hover:bg-[rgb(255,153,107)]"
              : "text-white bg-[rgb(193,73,173)] hover:bg-[rgb(193,30,173)]"
          } rounded-lg  transition`}
        >
          Reset
        </button>
      </div>
    </section>
  );
}
