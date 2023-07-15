import { useEffect, useState } from "react";
import { order } from "./useHome";
import myAxios from "../api/axios";
import UseContext, { ERROR_MESSAGE } from "../context/UseContext";
import { AxiosResponse } from "axios";
export type menuCategories =
  | "pizza"
  | "meal"
  | "salad"
  | "sweet"
  | "fastFood"
  | "breakFast"
  | "drinks";
function useOrders() {
  const { setServerResponse, setLoading } = UseContext();
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
    setLoading(true);
    myAxios
      .get("/order")
      .then((res: AxiosResponse) => {
        setLoading(false);
        setOrders(res.data);
      })
      .catch(() => {
        setLoading(false);
        setServerResponse(ERROR_MESSAGE);
      });
  }
  useEffect(() => {
    getOrders();
  }, []);
  return { orders, orderDishes, setOrderDishes };
}
export default useOrders;
