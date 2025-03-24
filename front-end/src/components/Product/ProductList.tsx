import Link from "next/link";
import Image from "next/image";

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
  if (isLoading) return <span>Loading...</span>;
  if (!products?.length) return <p>No products found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-6 sm:px-10 md:px-12 pt-8">
      {products.map((item) => (
        <Link key={item._id} href={`/Products/${item._id}`} passHref>
          <div className="flex cursor-pointer px-4 pt-4 pb-6 flex-col items-center gap-6 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg bg-white">
            <Image
              src={`http://localhost:5500${item.image.path}`}
              width={320}
              height={180}
              alt={item.title}
              className="rounded-lg h-56 sm:h-48 w-full object-cover"
            />

            <div className="flex flex-col items-center gap-1">
              <h3 className="text-lg sm:text-xl font-semibold text-[rgb(57,78,106)]">
                {item.title}
              </h3>
              <span className="text-[rgb(70,58,161)] text-base sm:text-lg font-medium">
                ${item.price}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

