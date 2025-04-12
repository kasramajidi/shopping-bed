"use client";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

export default function LeftSide() {
  const { isDarkMode } = useTheme();

  return (
    <section className="flex flex-col w-full md:w-1/2 gap-8 px-6 md:px-12 py-8">
      <h1
        className={`max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl md:text-4xl lg:text-5xl ${
          isDarkMode ? "text-[rgb(247,247,241)]" : "text-[rgb(57,78,106)]"
        }`}
      >
        We are changing the way people shop
      </h1>
      <span
        className={`max-w-xl text-lg leading-8 ${
          isDarkMode ? "text-[rgb(247,247,241)]" : "text-[rgb(57,78,106)]"
        } sm:text-xl md:text-xl`}
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore repellat explicabo enim soluta temporibus asperiores aut obcaecati perferendis porro nobis.
      </span>
      <Link
        href={"/Products"}
        className={`bg-[rgb(5,122,255)] px-4 py-3 text-[#DBE1FF] hover:bg-[rgb(5,100,255)] border self-start uppercase ${
          isDarkMode
            ? "dark:hover:border-[rgb(255,122,197)] dark:text-black dark:border-[rgb(255,122,197)] dark:bg-[rgb(255,80,197)] dark:hover:bg-[rgb(255,122,197)]"
            : "border-[rgb(5,122,255)]"
        } rounded-lg mt-6`}
        aria-label="View our products"
      >
        Our Products
      </Link>
    </section>
  );
}
