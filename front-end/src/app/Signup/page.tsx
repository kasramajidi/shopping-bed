"use client";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { useTheme } from "./../../context/ThemeContext";
const schema = yup.object({
  username: yup.string().required().min(3),
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
  username: string;
  email: string;
  password: string;
}

interface ApiResponse {
  data: {
    message: string;
  };
}

const registerApi = async (user: Data): Promise<ApiResponse> => {
  try {
    const response = await axios.post(
      "https://shopping-bed-backend.onrender.com/auth/register",
      {
        username: user.username,
        email: user.email,
        password: user.password,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("ثبت‌نام ناموفق بود! لطفاً دوباره امتحان کنید.");
  }
};

export default function Page() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const Mutation: UseMutationResult<ApiResponse, Error, Data> = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      toast.success("account created successfully", { position: "top-center" });
      setTimeout(() => {
        router.push("/Login");
      }, 1500);
    },
    onError: () => {
      toast.error("Registration was unsuccessful", { position: "top-center" });
    },
  });

  const submitForm = (user: Data) => {
    Mutation.mutate(user);
  };

  return (
    <section
      className={`max-w-[450px] p-8  ${
        isDarkMode ? "dark:bg-[rgb(39,41,52)]" : "bg-white"
      } items-center mx-auto mt-40 shadow-xl`}
    >
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={handleSubmit(submitForm)}
      >
        <h1
          className={`${
            isDarkMode ? "dark:text-white" : "text-[rgb(57,78,106)]"
          } text-3xl font-bold`}
        >
          Register
        </h1>
        <div className="flex flex-col self-start gap-2 w-full">
          <label
            htmlFor="username"
            className={`${
              isDarkMode ? "dark:text-white" : "text-[#274d70]"
            } text-sm`}
          >
            Username
          </label>
          <input
            {...register("username")}
            type="text"
            id="username"
            className={`flex-shrink-1 rounded-lg px-4  py-2 border ${
              isDarkMode
                ? "dark:border-[rgb(247,247,241)] dark:focus:outline-[rgb(247,247,241)] dark:text-white"
                : "border-[rgba(57,78,106,0.2)] text-[rgb(57,78,106)] focus:outline-[rgba(57,78,106,0.2)]"
            }  focus:outline-2 focus:outline-offset-2`}
          />
          {errors.username && (
            <span className="text-red-600 text-lg">
              {errors.username.message}!
            </span>
          )}
        </div>
        <div className="flex flex-col self-start gap-2 w-full">
          <label
            htmlFor="email"
            className={`${
              isDarkMode ? "dark:text-white" : "text-[#274d70]"
            } text-sm`}
          >
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            id="email"
            className={`flex-shrink-1 rounded-lg px-4 py-2 border ${
              isDarkMode
                ? "dark:border-[rgb(247,247,241)] dark:focus:outline-[rgb(247,247,241)] dark:text-white"
                : "border-[rgba(57,78,106,0.2)] text-[rgb(57,78,106)] focus:outline-[rgba(57,78,106,0.2)]"
            }  focus:outline-2 focus:outline-offset-2`}
          />
          {errors.email && (
            <span className="text-red-600 text-xs">
              {errors.email.message}!
            </span>
          )}
        </div>
        <div className="flex flex-col self-start gap-2 w-full">
          <label
            htmlFor="password"
            className={`${
              isDarkMode ? "dark:text-white" : "text-[#274d70]"
            } text-sm`}
          >
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className={`flex-shrink-1 rounded-lg px-4  py-2 border ${
              isDarkMode
                ? "dark:border-[rgb(247,247,241)] dark:focus:outline-[rgb(247,247,241)] dark:text-white"
                : "border-[rgba(57,78,106,0.2)] text-[rgb(57,78,106)] focus:outline-[rgba(57,78,106,0.2)]"
            }  focus:outline-2 focus:outline-offset-2`}
          />
          {errors.password && (
            <span className="text-red-600 text-lg">
              !{errors.password.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className={`${
            isDarkMode
              ? "dark:bg-[rgb(255,122,197)] dark:text-black dark:hover:bg-[rgb(255,100,197)]"
              : "bg-[#0070E0] text-[#EBEEFF]"
          } w-full rounded-lg cursor-pointer text-center py-3 px-4`}
        >
          REGISTER
        </button>
        <span
          className={`flex items-center gap-2 ${
            isDarkMode ? "dark:text-white" : "text-[rgb(57,78,106)]"
          }`}
        >
          Already a member?
          <Link
            href={"/Login"}
            className={`${
              isDarkMode
                ? "dark:text-[rgb(255,80,197)]"
                : "text-[rgb(5,122,255)]"
            }`}
          >
            login
          </Link>
        </span>
      </form>
    </section>
  );
}
