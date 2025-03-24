import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  _id: string;
  title: string;
  category: string;
  company: string;
  price: number;
  shipping: boolean;
  image: { path: string };
}

interface Meta {
  pagination: {
    page: number;
    pageSize: number;
    totalPage: number;
    filteredCount: number;
  };
}

interface FilterSearch {
  search: string;
  category: string;
  company: string;
  order: "a-z" | "z-a" | "high" | "low";
  price: number;
  shipping: boolean;
}

const getApiPost = async (): Promise<{ attributes: Post[]; meta: Meta }> => {
  const response = await axios.get("http://localhost:5500/posts/all-Post");
  return response.data;
};

export default function useSearchPost(filters: FilterSearch) {
  const { data, isLoading } = useQuery({
    queryKey: ["allPosts", filters],
    queryFn: getApiPost,

  });

  const filteredData = data?.attributes?.filter((item) => {
    let isMatch = true;

    if (filters.search) {
      isMatch = item.title.toLowerCase().includes(filters.search.toLowerCase());
    }

    if (filters.category !== "all" && item.category !== filters.category) {
      isMatch = false;
    }

    if (filters.company !== "all" && item.company !== filters.company) {
      isMatch = false;
    }

    if (filters.price && item.price > filters.price) {
      isMatch = false;
    }

    if (filters.shipping && !item.shipping) {
      isMatch = false;
    }

    return isMatch;
  }) || [];

  const sortedData = [...filteredData].sort((a, b) => {
    if (filters.order === "a-z") {
      return a.title.localeCompare(b.title);
    } else if (filters.order === "z-a") {
      return b.title.localeCompare(a.title);
    } else if (filters.order === "low") {
      return a.price - b.price;
    } else if (filters.order === "high") {
      return b.price - a.price;
    }
    return 0;
  });

  return { data: sortedData, meta: { pagination: { filteredCount: sortedData.length, totalPage: Math.ceil(sortedData.length / 10)} }, isLoading };
}
