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
  const { setServerResponse, setLoading, setLoader } = UseContext();
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
  function doneOrder(id: string) {
    setLoader(true);
    myAxios
      .put(`/order/done/${id}`)
      .then((res) => {
        setOrders((prev) => {
          if (prev)
            return [...prev.filter((d) => d._id !== res.data._id), res.data];
          else return [res.data];
        });
      })
      .catch(() => {
        setServerResponse(ERROR_MESSAGE);
      })
      .finally(() => {
        setLoader(false);
      });
  }
  useEffect(() => {
    getOrders();
  }, []);
  return { orders, orderDishes, setOrderDishes, doneOrder };
}
export default useOrders;
