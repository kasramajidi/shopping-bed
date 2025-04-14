import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

interface Products {
  _id: string;
  title: string;
  price: number;
  category?: string;
  company?: string;
  shipping?: boolean;
  order?: "a-z" | "z-a" | "high" | "low";
  image: {
    path: string;
  };
}

interface ProductListProps {
  products: Products[] | undefined;
  isLoading: boolean;
}

export default function ProductListVertical({
  products,
  isLoading,
}: ProductListProps) {
  const { isDarkMode } = useTheme();
  if (isLoading) return <span>Loading...</span>;
  if (!products?.length) return <p>No products found.</p>;

  return (
    <div className="grid grid-cols-1 gap-5 px-4 sm:px-6 md:px-10 lg:px-12 pt-6">
      {products.map((item) => (
        <Link key={item._id} href={`/Products/${item._id}`} passHref>
          <div
            className={`flex flex-col sm:flex-row cursor-pointer p-6 sm:p-8 gap-6 sm:gap-8 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl ${
              isDarkMode ? "dark:bg-[rgb(39,41,52)]" : "bg-white"
            }`}
          >
            <Image
              src={`https://res.cloudinary.com/dkvbdk078/image/upload/v1681234567/${item.image.path}`}
              width={320}
              height={180}
              alt={item.title}
              className="h-20 w-20 xs:h-24 xs:w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 rounded-lg object-cover transition duration-300 transform hover:scale-105"
            />

            <div className="flex lg:flex-row flex-col justify-between w-full">
              <div className="flex flex-col gap-2">
                <h3
                  className={`text-md xs:text-lg sm:text-xl font-semibold ${
                    isDarkMode ? "dark:text-white" : "text-[rgb(57,78,106)]"
                  }`}
                >
                  {item.title}
                </h3>
                <span
                  className={`capitalize text-sm xs:text-md sm:text-lg ${
                    isDarkMode ? "dark:text-gray-300" : "text-gray-500"
                  }`}
                >
                  {item.category}
                </span>
              </div>
              <span
                className={`${
                  isDarkMode ? "dark:text-white" : "text-[rgb(70,58,161)]"
                } text-base sm:text-lg md:text-xl font-medium`}
              >
                ${item.price}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
