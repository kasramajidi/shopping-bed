import { JSX } from "react";
import {useTheme} from "@/context/ThemeContext"
interface TotalAmountProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function TotalAmount({
  subtotal,
  shipping,
  tax,
  total,
}: TotalAmountProps): JSX.Element {
  const {isDarkMode} = useTheme()
  return (
    <div className={`w-full sm:w-96 md:w-72 text-xs ${isDarkMode ? "dark:bg-[rgb(8,9,11)]" : "bg-blue-50"} p-8 rounded-xl space-y-4 h-fit`}>
      <div className={`flex justify-between pb-4 border-b border-[rgb(229,231,235)]`}>
        <span>Subtotal</span>
        <span>${(subtotal / 100).toFixed(2)}</span>
      </div>
      <div className={`flex justify-between pb-4 border-b border-[rgb(229,231,235)]`}>
        <span>Shipping</span>
        <span>${(shipping / 100).toFixed(2)}</span>
      </div>
      <div className={`flex justify-between pb-4 border-b border-[rgb(229,231,235)]`}>
        <span>Tax</span>
        <span>${(tax / 100).toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-sm">
        <span>Order Total</span>
        <span>${(total / 100).toFixed(2)}</span>
      </div>
    </div>  
  );
}
