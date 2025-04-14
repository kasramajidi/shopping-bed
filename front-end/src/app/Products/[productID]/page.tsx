"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import AddToCartButton from "@/components/Product/AddToCartButton";
import { useTheme } from "./../../context/ThemeContext";

interface Product {
  title: string;
  company: string;
  price: string;
  description: string;
  image: {
    path: string;
  };
  colors: string[];
}

export default function Page() {
  const { productID } = useParams();
  const [data, setData] = useState<Product>();
  const [selectColors, setSelectColors] = useState<string | null>(null);
  const [selectAmount, setSelectAmount] = useState<number>(1);
  const { isDarkMode } = useTheme();

  const validProductID = Array.isArray(productID)
    ? productID[0]
    : productID ?? "";

  const handelSubmitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const saveValue = parseInt(e.target.value);
    setSelectAmount(saveValue);
  };

  const fetchProduct = async (id: string): Promise<Product> => {
    const response = await axios.get(
      `https://shopping-bed-backend.onrender.com/posts/getpost/${id}`
    );
    return response.data;
  };

  const mutation = useMutation<Product, Error, string>({
    mutationFn: fetchProduct,
    onSuccess: (data) => {
      setData(data);
      const defaultColor = JSON.parse(data.colors[0])[0];
      setSelectColors(defaultColor);
    },
  });

  useEffect(() => {
    if (productID) {
      mutation.mutate(Array.isArray(productID) ? productID[0] : productID);
    }
  }, [productID]);

  if (mutation.status === "pending")
    return <span className="loading loading-spinner loading-xl"></span>;
  if (mutation.status === "error")
    return <div>Error: {mutation.error?.message}</div>;

  return (
    <div className="max-w-7xl flex flex-col mx-auto px-6 sm:px-10 py-14 sm:py-20">
      <div
        className={`flex items-center gap-2 text-sm sm:text-md breadcrumbs ${
          isDarkMode ? "dark:text-white" : "text-[rgb(57,78,106)]"
        }`}
      >
        <Link href={"/"} className="hover:underline">
          Home
        </Link>
        <span>{">"}</span>
        <Link href={"/Products"} className="hover:underline">
          Product
        </Link>
      </div>

      {data ? (
        <div className="flex flex-col sm:flex-row items-center sm:items-start mt-6 gap-10 sm:gap-16">
          <Image
            src={`https://res.cloudinary.com/dkvbdk078/image/upload/v1681234567/${data.image.path}`}
            width={384}
            height={382}
            className="w-full sm:w-1/2 h-80 sm:h-96 object-cover rounded-lg"
            alt="Product Image"
          />

          <div className="flex self-start flex-col w-full sm:w-1/2">
            <h1
              className={`${
                isDarkMode ? "dark:text-white" : "text-[rgb(57,78,106)]"
              } text-2xl sm:text-3xl font-bold`}
            >
              {data.title}
            </h1>
            <h2 className="text-lg sm:text-xl font-bold mt-2 text-[rgb(199,201,209)]">
              {data.company}
            </h2>
            <span
              className={`mt-3 text-lg sm:text-xl ${
                isDarkMode ? "dark:text-white" : "text-[rgb(57,78,106)]"
              }`}
            >
              ${data.price}
            </span>

            <p
              className={`mt-4 sm:mt-6 text-sm sm:text-base leading-6 sm:leading-8 ${
                isDarkMode ? "dark:text-white" : "text-[rgb(57,78,106)]"
              }`}
            >
              {data.description}
            </p>

            <div className="flex items-center gap-2 mt-5 sm:mt-6">
              {JSON.parse(data.colors[0])?.map(
                (color: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectColors(color)}
                    className={`w-5 h-5 cursor-pointer sm:w-6 sm:h-6 rounded-full border-2 transition-all duration-200 ${
                      selectColors === color
                        ? isDarkMode
                          ? "dark:border-[rgb(190,148,248)] dark:scale-125"
                          : "border-black scale-125"
                        : isDarkMode
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                  ></button>
                )
              )}
            </div>

            <div className="form-control flex flex-col w-full max-w-xs mt-5 sm:mt-6">
              <label
                htmlFor="amount"
                className={`text-sm sm:text-md font-medium px-1 py-2  ${
                  isDarkMode ? "dark:text-white" : "text-[rgb(57,78,106)]"
                } capitalize`}
              >
                Amount
              </label>
              <select
                className={`select ${
                  isDarkMode
                    ? "dark:bg-[rgb(39,41,52)] text-white"
                    : "bg-white text-black"
                } pl-4 pr-10 h-10 sm:h-12 rounded-xl border border-[rgb(70,58,161)] focus:outline-2 focus:outline-[rgb(70,58,161)] focus:outline-offset-2 select-bordered`}
                value={selectAmount}
                onChange={handelSubmitChange}
              >
                {[...Array(6)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <AddToCartButton
              productID={validProductID}
              title={data.title}
              price={data.price}
              image={data.image}
              company={data.company}
              colors={selectColors}
              amount={selectAmount}
              description={data.description}
            />
          </div>
        </div>
      ) : (
        <p>No product found</p>
      )}
    </div>
  );
}
