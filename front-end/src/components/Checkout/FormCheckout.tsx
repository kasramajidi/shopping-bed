"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import {useTheme} from "@/context/ThemeContext"
interface FormData {
  name: string;
  address: string;
}

interface UserWithTotal extends FormData {
  orderTotal: number;
  numItemsInCart: number;
}

interface CheckoutResponse {
  message: string;
}

const checkOutApi = async (
  user: UserWithTotal
): Promise<CheckoutResponse | undefined> => {
  try {
    const responsive = await axios.post(
      "http://localhost:5500/orders/create-order",
      {
        name: user.name,
        address: user.address,
        orderTotal: user.orderTotal,
        numItemsInCart: user.numItemsInCart
      }
    );
    return responsive.data;
  } catch (err) {
    if (err instanceof Error) {
      console.error("API Error:", err.message);
    } else {
      console.error("Unexpected error", err);
    }
  }
};

const schema = yup.object({
  name: yup.string().required().min(3),
  address: yup.string().required().min(3),
});

interface FormCheckoutProps {
  total: number;
  totalAmount: number;
}
export default function FormCheckout({ total, totalAmount }: FormCheckoutProps) {
  const router = useRouter();
  const {isDarkMode} = useTheme()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const submitForm: SubmitHandler<FormData> = (user) => {
    const userWithTotal = {
      ...user,
      orderTotal: total,
      numItemsInCart: totalAmount
    };
    checkOutApi(userWithTotal);
    router.push("/Order");
  };

  return (
    <form
      method="post"
      className="flex order-2 lg:order-1 flex-col gap-y-4 w-full sm:w-4/5 md:w-2/3 lg:w-1/2"
      onSubmit={handleSubmit(submitForm)}
    >
      <h4 className="font-medium text-xl capitalize">shipping information</h4>

      <div className="flex flex-col gap-5">
        <label htmlFor="name">Name</label>
        <input
          {...register("name")}
          type="text"
          id="name"
          className={`px-4 h-12 rounded-lg border ${isDarkMode ? "dark:border-[rgb(247,247,241)] dark:focus:outline-[rgb(247,247,241)]" : "border-[rgba(57,78,106,0.2)] focus:outline-[rgba(57,78,106,0.2)]"} focus:outline-2 focus:outline-offset-2 select-bordered`}
        />
        {errors.name && (
          <span className="text-red-600 text-lg">{errors.name.message}!</span>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <label htmlFor="address">address</label>
        <input
          {...register("address")}
          type="text"
          id="address"
          className={`px-4 h-12 rounded-lg border ${isDarkMode ? "dark:border-[rgb(247,247,241)] dark:focus:outline-[rgb(247,247,241)]" : "border-[rgba(57,78,106,0.2)] focus:outline-[rgba(57,78,106,0.2)]"} focus:outline-2  focus:outline-offset-2 select-bordered`}
        />
        {errors.address && (
          <span className="text-red-600 text-lg">
            {errors.address.message}!
          </span>
        )}
      </div>

      <button
        type="submit"
        className={`btn ${isDarkMode ? "btn-secondary" : "btn-primary"} btn-block text-sm h-12 mt-4 uppercase`}
      >
        place your order
      </button>
    </form>
  );
}
