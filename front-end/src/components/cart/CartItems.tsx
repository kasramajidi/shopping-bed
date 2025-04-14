import Image from "next/image";
import { CartItemType, CartAction } from "@/app/Cart/page";
import { toast } from "react-toastify";
import { JSX } from "react";
import { useTheme } from "@/context/ThemeContext";
type CartItemsProps = {
  cartItems: CartItemType[];
  dispatch: React.Dispatch<CartAction>;
};

export default function CartItems({
  cartItems,
  dispatch,
}: CartItemsProps): JSX.Element {
  const { isDarkMode } = useTheme();
  return (
    <div className="flex-1 space-y-6">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className={`flex flex-col  lg:flex-row items-start gap-6 pb-6 border-b ${
            isDarkMode
              ? "dark:border-[rgb(8,9,11)]"
              : "border-[rgb(229,231,235)]"
          } p-4 mt-8 justify-between`}
        >
          <Image
            width={96}
            height={96}
            src={`https://shopping-bed-backend.onrender.com${
              item.image?.path || ""
            }`}
            alt={item.title}
            className="w-32 h-32 rounded-lg object-cover"
          />
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">{item.title}</h2>
            <p
              className={`text-sm ${
                isDarkMode ? "dark:text-gray-300" : "text-gray-500"
              }`}
            >
              {item.company}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span>Color:</span>
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.colors }}
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <label
              htmlFor="amount"
              className={`${
                isDarkMode ? "dark:text-gray-300" : "text-[rgb(57,78,106)]"
              } text-sm`}
            >
              Amount
            </label>
            <select
              className={`select ${
                isDarkMode
                  ? "dark:bg-[rgb(39,41,52)] dark:text-white"
                  : "bg-white text-black"
              } pl-2 pr-5 cursor-pointer w-[50px] lg:h-6 sm:h-12 rounded-xl border border-[rgba(57,78,106,0.2)] focus:outline-2 focus:outline-[rgba(57,78,106,0.2)] focus:outline-offset-2 select-bordered`}
              id="amount"
              value={item.amount}
              onChange={(e) => {
                const newAmount = Number(e.target.value);

                dispatch({
                  type: "CHANGE_AMOUNT",
                  payload: {
                    id: item.id,
                    amount: newAmount,
                  },
                });

                const updatedCart = cartItems.map((cartItem) =>
                  cartItem.id === item.id
                    ? { ...cartItem, amount: newAmount }
                    : cartItem
                );
                localStorage.setItem("cart", JSON.stringify(updatedCart));

                toast.success("Cart updated", { position: "top-center" });
                window.dispatchEvent(new Event("cart-updated"));
              }}
            >
              {[...Array(6)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <button
              className={`${
                isDarkMode
                  ? "dark:text-[rgb(255,80,197)]"
                  : "text-[rgb(5,122,255)]"
              } text-sm hover:underline cursor-pointer`}
              onClick={() => {
                dispatch({ type: "REMOVE", payload: item.id });
                const updatedCart = cartItems.filter((i) => i.id !== item.id);
                localStorage.setItem("cart", JSON.stringify(updatedCart));

                toast.error("Item removed from cart", {
                  position: "top-center",
                });
                window.dispatchEvent(new Event("cart-updated"));
              }}
            >
              remove
            </button>
          </div>
          <div className="font-semibold text-right">
            ${(Number(item.price) / 100).toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}
