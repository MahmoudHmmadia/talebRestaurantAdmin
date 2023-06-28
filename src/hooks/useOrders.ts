import { useEffect, useState } from "react";
import { order } from "./useHome";
import myAxios from "../api/axios";
import UseContext, { ERROR_MESSAGE } from "../context/UseContext";
export type menuCategories =
  | "pizza"
  | "meal"
  | "salad"
  | "sweet"
  | "fastFood"
  | "breakFast"
  | "drinks";
function useOrders() {
  const { setServerResponse } = UseContext();
  const [orders, setOrders] = useState<undefined | order[]>();
  const [orderDishes, setOrderDishes] = useState<
    | undefined
    | {
        name: string;
        price: number;
        number: number;
        category: menuCategories;
      }[]
  >();
  function getOrders() {
    myAxios
      .get("/order")
      .then((res) => {
        setOrders(res.data);
      })
      .catch(() => {
        setServerResponse(ERROR_MESSAGE);
      });
  }
  useEffect(() => {
    getOrders();
  }, []);
  return { orders, orderDishes, setOrderDishes };
}
export default useOrders;
