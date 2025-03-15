"use client";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import Guest from "@/components/Login/Guest";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required(
      "The password must contain numbers and lowercase and uppercase letters."
    )
    .min(8)
    .max(25),
});

interface Data {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const LoginApi = async (user: Data): Promise<LoginResponse> => {
  try {
    const response = await axios.post("http://localhost:5500/auth/login", {
      email: user.email,
      password: user.password,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("Login failed");
  }
};

export default function Page() {
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const Mutation: UseMutationResult<LoginResponse, Error, Data> = useMutation({
    mutationFn: LoginApi,
    onSuccess: (data) => {
      toast.success("Logged in successfully", { position: "top-center" });
      setTimeout(() => {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        router.push("/");
      }, 1500);
    },
    onError: (error) => {
      toast.error(error?.message || "logged was unsuccessful", {
        position: "top-center",
      });
    },
  });

  const submitForm = (user: Data) => {
    Mutation.mutate(user);
  };

  return (
    <section className="max-w-[450px] p-8 mx-auto mt-40 shadow-lg ">
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={handleSubmit(submitForm)}
      >
        <h1 className="text-[rgb(57,78,106)] text-3xl font-bold">Login</h1>
        <div className="flex flex-col self-start gap-2 w-full">
          <label htmlFor="email" className="text-[#274d70] text-sm">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            id="email"
            className="flex-shrink-1 rounded-lg px-4 text-[rgb(57,78,106)] py-2 border border-[rgba(57,78,106,0.2)] focus:outline-2 focus:outline-[rgba(39,77,112,0.2)] focus:outline-offset-2"
          />
          {errors.email && (
            <span className="text-red-600 text-lg">
              !{errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col self-start gap-2 w-full">
          <label htmlFor="password" className="text-[#274d70] text-sm">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="flex-shrink-1 rounded-lg px-4 text-[rgb(57,78,106)] py-2 border border-[rgba(57,78,106,0.2)] focus:outline-2 focus:outline-[rgba(39,77,112,0.2)] focus:outline-offset-2"
          />
          {errors.password && (
            <span className="text-red-600 text-lg">
              !{errors.password.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#0070E0] w-full rounded-lg cursor-pointer text-center text-[#EBEEFF] py-3 px-4"
        >
          Login
        </button>
      </form>
      <Guest />
      <span className="flex items-center justify-center mt-5 gap-2 text-[rgb(57,78,106)]">
        Already a member?
        <Link href={"/Signup"} className="text-[rgb(5,122,255)]">
          Register
        </Link>
      </span>
    </section>
  );
}
