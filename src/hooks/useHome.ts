import { useEffect, useState } from "react";
import myAxios from "../api/axios";
import UseContext, { ERROR_MESSAGE } from "../context/UseContext";
import { menuCategories } from "./useOrders";
import { AxiosResponse } from "axios";
export type order = {
  _id: string;
  name: string;
  address: string;
  phoneID: string;
  pay: string;
  total: {
    name: string;
    price: number;
    number: number;
    category: menuCategories;
  }[];
  price: number;
  createdAt: {
    date: string;
    hour: number;
    minute: number;
  };
  done: boolean;
  __v: number;
};
type feedBacks = {
  _id: string;
  name: string;
  comment: string;
  rate: number;
  createdAt: string;
  __v: number;
};
function useHome() {
  type details = {
    customers: number;
    revenues: number;
    employees: number;
    expenses: number;
    latestOrders: order[];
    feedBacks: feedBacks[];
  };
  const { setServerResponse, setLoading } = UseContext();
  const [details, setDetails] = useState<undefined | details>();

  useEffect(() => {
    setLoading(true);
    myAxios
      .get("/admin")
      .then((res: AxiosResponse) => {
        setDetails(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setServerResponse(ERROR_MESSAGE);
      });
  }, []);
  return { details };
}
export default useHome;
