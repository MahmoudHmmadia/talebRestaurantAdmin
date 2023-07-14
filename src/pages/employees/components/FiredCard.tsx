import { CgDanger } from "react-icons/cg";
import { motion as m } from "framer-motion";
import { employee } from "../../../context/UseContext";
import AltButton from "../../../components/altButton";
import { GrReturn } from "react-icons/gr";
import { BsDoorClosedFill } from "react-icons/bs";
function FiredCard({
  employee,
  setFiredCard,
  fired,
}: {
  employee: employee | undefined;
  setFiredCard: React.Dispatch<React.SetStateAction<employee | undefined>>;
  fired: (id: string) => void;
}) {
  return (
    <m.div
      className="fixed card w-50 l-50 p-3 dark-box-shadow radius-s flex flex-column g-2 centering-content alt-bg z-100000"
      style={{
        top: "20%",
      }}
      initial={{
        opacity: 0,
        y: 200,
        x: "-50%",
      }}
      animate={{
        opacity: 1,
        y: 0,
        x: "-50%",
      }}
    >
      <div className="flex flex-column align-center">
        <div className="fs-x-large cl-r">
          <CgDanger />
        </div>
        <h1 className="cl-r uppercase">are you sure ?</h1>
      </div>
      <p className="cl-t uppercase letter-s-1 fs-small">
        if you fired {employee?.name} you will need new {employee?.jobTitle} as
        soon as possible !
      </p>
      <div className="flex align-center g-1 w-100">
        {employee && (
          <AltButton
            bgColor="red_gradient_bg"
            color=" cl-b"
            content="yes"
            Icon={BsDoorClosedFill}
            fn={() => {
              setFiredCard(undefined);
              fired(employee?._id);
            }}
            valid={true}
          />
        )}
        <AltButton
          bgColor="green_gradient_bg"
          color=" cl-b"
          content="No"
          Icon={GrReturn}
          fn={() => setFiredCard(undefined)}
          valid={true}
        />
      </div>
    </m.div>
  );
}
export default FiredCard;
