"use client";
import {toast} from "react-toastify"
interface AddToCartButtonProps {
  productID: string;
  title: string;
  price: string;
  image: {
    path: string;
  };
  company: string;
  colors: string | null;
  amount: number;
  description: string;
}

export default function AddToCartButton({
  productID,
  title,
  price,
  image,
  company,
  colors,
  amount,
  description,
}: AddToCartButtonProps) {
  const handelAddToCart = () => {
    const selectedColor = colors || "defaultColor";

    const cartItem = {
      id: productID,
      title,
      price,
      image,
      company,
      colors: selectedColor,
      amount,
      description,
    };

    const storedCart = localStorage.getItem("cart");
    const carts = storedCart ? JSON.parse(storedCart) : [];

    carts.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(carts));

    const event = new CustomEvent("cart-updated", {
      detail: { updatedCount: carts.length },
    });
    window.dispatchEvent(event);

    toast.success("Item added to cart", {position: "top-center"})
  };

  return (
    <button
      className="px-4 self-start rounded-lg cursor-pointer py-2 mt-6 sm:mt-10 bg-[rgb(70,58,161)] transition hover:bg-[rgb(70,10,161)] text-[rgb(219,212,237)]"
      onClick={handelAddToCart}
    >
      ADD TO CART
    </button>
  );
}
