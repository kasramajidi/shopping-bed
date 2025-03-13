import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {useAuth} from "@/context/AuthContext"
export default function Guest() {
    const router = useRouter();
    const {setIsAuthenticated} = useAuth()
    const questApi = async () => {
        try {
            const response = await axios.post("http://localhost:5500/auth/guest");
            localStorage.setItem("token", response.data.token);
            setIsAuthenticated(true)
            router.push("/pages/Home");
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
            className="bg-[rgb(83,58,143)] mt-5 hover:bg-[rgb(83,40,140,9)] w-full rounded-lg cursor-pointer text-center py-3 px-4"
        >
            GUEST USER
        </button>
    );
}

