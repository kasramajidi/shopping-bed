"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

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

  const fetchProduct = async (id: string): Promise<Product> => {
    const response = await axios.get(
      `http://localhost:5500/posts/getpost/${id}`
    );
    return response.data; 
  };

  const mutation = useMutation<Product, Error, string>({
    mutationFn: fetchProduct,
    onSuccess: (data) => {
      setData(data);
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
      <div className="flex items-center gap-2 text-sm sm:text-md breadcrumbs text-[rgb(57,78,106)]">
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
            src={`http://localhost:5500${data.image.path}`}
            width={384}
            height={382}
            className="w-full sm:w-1/2 h-80 sm:h-96 object-cover rounded-lg"
            alt="Product Image"
          />

          <div className="flex self-start flex-col w-full sm:w-1/2">
            <h1 className="text-[rgb(57,78,106)] text-2xl sm:text-3xl font-bold">
              {data.title}
            </h1>
            <h2 className="text-lg sm:text-xl font-bold mt-2 text-[rgb(199,201,209)]">
              {data.company}
            </h2>
            <span className="mt-3 text-lg sm:text-xl text-[rgb(57,78,106)]">
              ${data.price}
            </span>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-6 sm:leading-8 text-[rgb(57,78,106)]">
              {data.description}
            </p>

            <div className="flex items-center gap-2 mt-5 sm:mt-6">
              {JSON.parse(data.colors[0])?.map(
                (color: string, index: number) => (
                  <button
                    key={index}
                    className="w-5 h-5 sm:w-6 sm:h-6 border-secondary rounded-full"
                    style={{ backgroundColor: color }}
                  ></button>
                )
              )}
            </div>

            <div className="form-control flex flex-col w-full max-w-xs mt-5 sm:mt-6">
              <label
                htmlFor="amount"
                className="text-sm sm:text-md font-medium px-1 py-2 text-[rgb(57,78,106)] capitalize"
              >
                Amount
              </label>
              <select className="select bg-white text-black pl-4 pr-10 h-10 sm:h-12 rounded-xl border border-[rgb(70,58,161)] focus:outline-2 focus:outline-[rgb(70,58,161)] focus:outline-offset-2 select-bordered">
                {[...Array(20)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <button className="px-4 self-start rounded-lg cursor-pointer py-2 mt-6 sm:mt-10 bg-[rgb(70,58,161)] transition hover:bg-[rgb(70,10,161)] text-[rgb(219,212,237)]">
              ADD TO CART
            </button>
          </div>
        </div>
      ) : (
        <p>No product found</p>
      )}
    </div>
  );
}
