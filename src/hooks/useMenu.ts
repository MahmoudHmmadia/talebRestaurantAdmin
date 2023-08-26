import { useEffect, useState } from "react";
import UseContext, { ERROR_MESSAGE } from "../context/UseContext";
import myAxios from "../api/axios";
import { AxiosResponse } from "axios";
export type menuCategories =
  | "pizza"
  | "meal"
  | "salad"
  | "sweet"
  | "fastFood"
  | "breakFast"
  | "drinks";
export const MENU_CATEGORIES: menuCategories[] = [
  "pizza",
  "meal",
  "salad",
  "sweet",
  "fastFood",
  "breakFast",
  "drinks",
];
export type dish = {
  _id: string;
  imageName: string;
  name: string;
  info: string;
  price: string;
  rate: number;
  orderTimes: number;
  peopleComments: [];
  cat: menuCategories;
  type?: string;
  rotate?: number;
  left?: string;
  bottom?: string;
  top?: string;
  right?: string;
  transform?: string;
  dishNumber?: number;
  blurHash: string;
};
function useMenu() {
  const { setLoader, setServerResponse } = UseContext();
  const [menu, setMenu] = useState<undefined | dish[]>();
  const [showenCat, setShownCat] = useState<undefined | menuCategories>(
    undefined
  );
  function getMenu() {
    setLoader(true);
    setMenu(undefined);
    myAxios
      .get("menu")
      .then((res: AxiosResponse) => {
        setLoader(false);
        if (res.status === 200) {
          setMenu(res.data.filter((d: dish) => d.cat === showenCat));
        } else if (res.status === 204) console.log(res.data.message);
      })
      .catch(() => {
        setLoader(false);
        setServerResponse({
          content: "The Server Is Not Working Write Now , Try Again Letter",
          type: "error",
        });
      });
  }
  function addDish(payload: FormData) {
    setLoader(true);
    myAxios
      .post("menu", payload)
      .then((res) => {
        setMenu((prev) => {
          if (prev)
            return [...prev?.filter((d) => d._id !== res.data._id), res.data];
          else {
            return [res.data];
          }
        });
        setServerResponse({
          content: "Added New Dish !",
          type: "done",
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
    setTimeout(() => {
      getMenu();
    }, 500);
  }, [showenCat]);
  return { showenCat, setShownCat, menu, getMenu, addDish };
}
export default useMenu;
