import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Logout() {
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();

  const LogoutApi = async () => {
    try {
      await axios.post(
        "http://localhost:5500/auth/logout"
      );
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      router.push("/Home");
      toast.success("logout user", { position: "top-center" });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button
      onClick={LogoutApi}
      className="bg-transparent px-2 text-xs rounded-sm cursor-pointer text-[rgb(5,122,255)] border border-[rgb(5,122,255)] hover:bg-[rgb(80,158,255)] hover:border-[rgb(80,158,255)] hover:text-white"
    >
      LOGOUT
    </button>
  );
}
