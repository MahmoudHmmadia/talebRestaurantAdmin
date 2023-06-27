import { useEffect, useState } from "react";
import myAxios from "../api/axios";
import UseContext, { ERROR_MESSAGE } from "../context/UseContext";
export type feedBack = {
  _id: string;
  name: string;
  comment: string;
  rate: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
function useFeedBack() {
  const { setLoader, setServerResponse } = UseContext();
  const [feedBacks, setFeedBacks] = useState<feedBack[]>();
  function getFeedBacks() {
    myAxios
      .get("/admin/feedBacks")
      .then((res) => {
        setLoader(true);
        setFeedBacks(res.data);
      })
      .catch((_err) => {
        setServerResponse(ERROR_MESSAGE);
      });
  }
  useEffect(() => {
    getFeedBacks();
  }, []);
  return { feedBacks };
}
export default useFeedBack;
