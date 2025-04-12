import { format } from "date-fns";
import {useTheme} from "@/context/ThemeContext"
interface OrderItem {
  _id: string;
  name: string;
  address: string;
  orderTotal: number;
  numItemsInCart: number;
  createdAt: string;
}

interface TableOrderProps {
  data: OrderItem[];
}
export default function TableOrder({ data }: TableOrderProps) {
  const {isDarkMode} = useTheme()
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "hh:mm a - MMM dd'th', yyyy");
  };
  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-zebra w-full text-sm">
        <thead>
          <tr className={`text-xs font-bold ${isDarkMode ? "dark:text-white" : "text-[rgba(57,78,106,0.6)]"} border-b border-[rgb(229,231,235)]`}>
            <th className="p-2">Name</th>
            <th className="p-2">Address</th>
            <th className="p-2">Products</th>
            <th className="p-2">Cost</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} className={`${isDarkMode ? "dark:bg-[rgb(8,9,11)] dark:text-white" : "bg-white text-gray-700"}`}>
              <td className={`p-2 ${isDarkMode ? "dark:bg-[rgb(39,41,52)] dark:text-white" : "bg-white text-gray-700"} border-b border-[rgb(229,231,235)]`}>
                {item.name}
              </td>
              <td className={`p-2 ${isDarkMode ? "dark:bg-[rgb(39,41,52)] dark:text-white" : "bg-white text-gray-700"} border-b border-[rgb(229,231,235)]`}>
                {item.address}
              </td>
              <td className={`p-2 ${isDarkMode ? "dark:bg-[rgb(39,41,52)] dark:text-white" : "bg-white text-gray-700"} border-b border-[rgb(229,231,235)]`}>
                {item.numItemsInCart}
              </td>
              <td className={`p-2 ${isDarkMode ? "dark:bg-[rgb(39,41,52)] dark:text-white" : "bg-white text-gray-700"} border-b border-[rgb(229,231,235)]`}>
                ${(item.orderTotal / 100).toFixed(2)}
              </td>
              <td className={`p-2 ${isDarkMode ? "dark:bg-[rgb(39,41,52)] dark:text-white" : "bg-white text-gray-700"} border-b border-[rgb(229,231,235)]`}>
                {formatDate(item.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
