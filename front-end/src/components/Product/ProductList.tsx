import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./../../context/ThemeContext";

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
export default function ProductList({ products, isLoading }: ProductListProps) {
  const { isDarkMode } = useTheme();

  if (isLoading) return <span>Loading...</span>;
  if (!products?.length) return <p>No products found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-6 sm:px-10 md:px-12 pt-8">
      {products.map((item) => (
        <Link key={item._id} href={`/Products/${item._id}`} passHref>
          <div
            className={`flex cursor-pointer px-4 pt-4 pb-8 flex-col items-center gap-10 shadow-xl hover:shadow-2xl transition duration-300 rounded-lg ${
              isDarkMode ? "dark:bg-[rgb(39,41,52)]" : "bg-white"
            }`}
          >
            <Image
              src={`https://res.cloudinary.com/dkvbdk078/image/upload/v1681234567/${item.image.path}`}
              width={320}
              height={180}
              alt={item.title}
              className="rounded-lg h-56 sm:h-48 w-full object-cover"
            />

            <div className="flex flex-col items-center gap-1">
              <h3
                className={`text-xl ${
                  isDarkMode
                    ? "dark:text-[rgb(247,247,241)]"
                    : "text-[rgb(57,78,106)]"
                }`}
              >
                {item.title}
              </h3>
              <span
                className={`${
                  isDarkMode
                    ? "dark:text-[rgb(190,148,248)]"
                    : "text-[rgb(70,58,161)]"
                } text-base sm:text-lg font-medium`}
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
