// تایپ‌ها
import { CartItemType } from "@/app/Cart/page";

export const initialState: CartItemType[] = [];

export type CartAction =
  | { type: "INIT_CART"; payload: CartItemType[] }
  | { type: "REMOVE"; payload: string }
  | { type: "CHANGE_AMOUNT"; payload: { id: string; amount: number } };

export function cartReducer(
  state: CartItemType[],
  action: CartAction
): CartItemType[] {
  switch (action.type) {
    case "INIT_CART":
      return action.payload;

    case "REMOVE":
      return state.filter((item) => item.id !== action.payload);

    case "CHANGE_AMOUNT":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, amount: action.payload.amount }
          : item
      );

    default:
      return state;
  }
}
