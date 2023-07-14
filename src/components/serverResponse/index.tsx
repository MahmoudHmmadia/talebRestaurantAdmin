import { motion as m } from "framer-motion";
import AltButton from "../altButton";
import { BiLike } from "react-icons/bi";
import { CgCheck } from "react-icons/cg";
import { CiWarning } from "react-icons/ci";
import { IoMdReturnLeft } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { TbTruck } from "react-icons/tb";
import UseContext from "../../context/UseContext";
type res = {
  content: string | { name: string; date: string; time: string };
  type: string;
};
type props = {
  response: res | undefined;
  reset?: () => void;
};
function ServerResponse({ response, reset }: props) {
  const { setServerResponse } = UseContext();
  return (
    <m.div
      className="fixed overflow-hidden l-50 p-3 radius-s flex flex-column g-2 main-bg z-100000 dark-box-shadow order-res"
      style={{
        minWidth: "60%",
        top: "20%",
        transform: "translateX(-50%)",
        zIndex: "1111111111110000000000",
      }}
      initial={{
        opacity: 0,
        y: 150,
        x: "-50%",
      }}
      animate={{
        opacity: 1,
        y: 0,
        x: "-50%",
      }}
    >
      <div
        className={`centering-content fs-x-large ${
          response?.type == "error" ? "cl-r" : "cl-g"
        }`}
      >
        {response?.type === "order" || response?.type === "special" ? (
          <TbTruck />
        ) : response?.type === "error" ? (
          <CiWarning />
        ) : response?.type === "reservation" ? (
          <MdDateRange />
        ) : (
          <BiLike />
        )}
      </div>
      <h3 className="cl-t txt-c uppercase">
        {typeof response?.content == "string"
          ? response.content
          : `Your Reservation In
        ${response?.content.date} at ${response?.content.time} And The Name Is ${response?.content.name}`}
      </h3>
      <div className="flex g-1 align-center">
        <AltButton
          bgColor="khaled-bg"
          color="cl-b"
          content={`${response?.type === "error" ? "Back to home" : "done"}`}
          Icon={response?.type === "error" ? IoMdReturnLeft : CgCheck}
          fn={() => {
            setServerResponse(undefined);
            reset && reset();
          }}
          valid={true}
        />
      </div>
    </m.div>
  );
}
export default ServerResponse;
