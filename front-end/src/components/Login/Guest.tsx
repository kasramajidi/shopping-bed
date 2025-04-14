import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
export default function Guest() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();
  const questApi = async () => {
    try {
      const response = await axios.post(
        "https://shopping-bed-backend.onrender.com/auth/guest"
      );
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      router.push("/");
      toast.success("welcome quset user", { position: "top-center" });
    } catch (err) {
      console.error("Error during guest login:", err);
      toast.error("Error about the guest", { position: "top-center" });
    }
  };

  return (
    <button
      type="submit"
      onClick={questApi}
      className={`${
        isDarkMode
          ? "dark:bg-[rgb(190,148,248)] dark:hover:bg-[rgb(190,108,248)] dark:text-black"
          : "bg-[rgb(83,58,143)] text-white hover:bg-[rgb(83,40,140,9)]"
      } mt-5  w-full rounded-lg cursor-pointer text-center py-3 px-4`}
    >
      GUEST USER
    </button>
  );
}
