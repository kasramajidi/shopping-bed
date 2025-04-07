"use client";
import { useState } from "react";

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

  const handelSearch = () => {
    onFilterChange({ search, category, company, order, price, shipping });
  };

  return (
    <section className="text-[rgb(57,78,106)] bg-[rgb(240,246,255)] px-6 sm:px-8 py-6 rounded-lg flex flex-col gap-6 lg:max-w-7xl sm:max-w-6xl lg:mx-0 sm:mx-auto">
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
            className="h-10 pl-3 pr-8 border rounded-lg bg-white cursor-pointer text-black font-semibold border-[rgba(57,78,106)] focus:outline-2 focus:outline-[rgba(57,78,106)]"
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
            className="h-10 pl-3 pr-8 border rounded-lg bg-white cursor-pointer text-black font-semibold border-[rgba(57,78,106)] focus:outline-2 focus:outline-[rgba(57,78,106)]"
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
            className="h-10 pl-3 pr-8 border rounded-lg bg-white cursor-pointer text-black font-semibold border-[rgba(57,78,106)] focus:outline-2 focus:outline-[rgba(57,78,106)]"
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
            className="range range-primary"
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
            className="checkbox checkbox-info"
            checked={shipping}
            onChange={(e) => setShipping(e.target.checked)}
          />
        </div>
        <button
          onClick={handelSearch}
          className="w-full sm:w-1/4 h-10 cursor-pointer text-white bg-[rgb(5,122,255)] rounded-lg hover:bg-[rgb(4,100,210)] transition"
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
          className="w-full sm:w-1/4 h-10 cursor-pointer text-white bg-[rgb(193,73,173)] rounded-lg hover:bg-[rgb(193,30,173)] transition"
        >
          Reset
        </button>
      </div>
    </section>
  );
}
