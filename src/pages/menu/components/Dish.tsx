import { useRef, useState } from "react";
import { dish } from "../../../hooks/useMenu";
import { motion as m } from "framer-motion";
import AltButton from "../../../components/altButton";
import { BiDollarCircle, BiEdit } from "react-icons/bi";
import CoolImage from "../../../components/coolImage/CoolImage";
import { FaComments, FaHandshake, FaStar } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import myAxios from "../../../api/axios";
import UseContext, { ERROR_MESSAGE } from "../../../context/UseContext";
function Dish({
  dish,
  showenCat,
  getMenu,
}: {
  dish: dish;
  showenCat: undefined | string;
  getMenu: () => void;
}) {
  const [isEditPrice, setIsEditPrice] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isShowComments, setIsShowComments] = useState(false);
  const { setServerResponse } = UseContext();
  const priceRef = useRef<HTMLInputElement>(null);
  function deleteDish(id: string) {
    myAxios
      .delete(`menu/${id}`)
      .then((res) => {
        if (res.status === 204) setServerResponse(ERROR_MESSAGE);
        else {
          setServerResponse({
            content: "DISH deleted successfully",
            type: "done",
          });
          getMenu();
        }
      })
      .catch(() => {
        setServerResponse(ERROR_MESSAGE);
      });
  }

  function editDishPrice(id: string) {
    if (Number.isNaN(parseInt(priceRef.current!.value))) {
      setServerResponse({
        content: "Write a right price",
        type: "error",
      });
      priceRef.current!.value = "";
    } else {
      myAxios
        .put(`menu/${id}`, { price: priceRef.current!.value })
        .then((res) => {
          if (res.status === 204) setServerResponse(ERROR_MESSAGE);
          else {
            setServerResponse({
              content: "DISH Price Updated successfully",
              type: "done",
            });
            getMenu();
          }
        })
        .catch(() => {
          setServerResponse(ERROR_MESSAGE);
        });
    }
  }
  return (
    <m.div
      key={dish._id}
      className="p-2 radius flex g-1 align-center flex-column w-full main-bg dark-box-shadow radius-s relative"
      initial={{
        opacity: 0,
        y: 100,
      }}
      animate={{
        opacity: 2,
        y: 0,
        transition: {
          delay: 0.5,
        },
      }}
    >
      {isEditPrice && (
        <div className="absolute l-0 t-0 main-bg flex flex-column align-center g-2 justify-center p-2 z-100000 w-100 h-100">
          <div className="fs-x-large cl-khaled">
            <BiEdit />
          </div>
          <input
            type="text"
            placeholder="WRITE NEW PRICE"
            className="cl-t w-100 alt-bg radius-s p-2"
            style={{
              border: "1px solid #e4c590",
            }}
            ref={priceRef}
          />
          <div className="flex g-1 fs-x-small w-100">
            <AltButton
              bgColor="green_gradient_bg"
              color="cl-b"
              content="Update the Price"
              valid={true}
              fn={() => editDishPrice(dish._id)}
            />
            <AltButton
              bgColor="khaled-bg"
              color="cl-b"
              content="Back"
              valid={true}
              fn={() => setIsEditPrice(false)}
            />
          </div>
        </div>
      )}
      {isDelete && (
        <div className="absolute l-0 t-0 main-bg flex flex-column align-center g-2 justify-center p-2 z-100000 w-100 h-100">
          <div className="fs-x-large cl-khaled">
            <MdDelete />
          </div>
          <p className="uppercase txt-c cl-t">
            are you sure you wan't to delete {dish.name} dish ?
          </p>
          <div className="flex g-1 fs-x-small w-100">
            <AltButton
              bgColor="red_gradient_bg"
              color="cl-b"
              content="Yes"
              valid={true}
              fn={() => deleteDish(dish._id)}
            />
            <AltButton
              bgColor="khaled-bg"
              color="cl-b"
              content="cancel"
              valid={true}
              fn={() => setIsDelete(false)}
            />
          </div>
        </div>
      )}
      {isShowComments && (
        <div className="absolute l-0 t-0 main-bg flex flex-column align-center g-2 justify-center p-2 z-100000 w-100 h-100">
          <div className="fs-x-large cl-khaled">
            <FaComments />
          </div>
          <ul className="flex flex-col g-1 w-100">
            {dish.peopleComments.map(
              (d: { comment: string; name: string }, id) => (
                <li
                  key={id}
                  className="p-1 alt-bg radius-s fs-small w-100 flex flex-column g-1"
                  style={{
                    border: "1px solid #e4c590",
                  }}
                >
                  <div className="flex g-1 align-center">
                    <span className="bold uppercase cl-khaled">NAME:</span>
                    <span className="uppercase neon cl-w">{d.name}</span>
                  </div>
                  <div className="flex g-1 align-center flex-wrap">
                    <span className="bold uppercase cl-khaled">Comment:</span>
                    <span className="uppercase cl-t">{d.comment}</span>
                  </div>
                </li>
              )
            )}
          </ul>

          <AltButton
            bgColor="khaled-bg"
            color="cl-b"
            content="Back"
            valid={true}
            fn={() => setIsShowComments(false)}
          />
        </div>
      )}
      <CoolImage
        url={`https://taleb-restaurant-api.onrender.com/assets/${dish.imageName.trim()}`}
        height={`${showenCat == "drinks" ? "150px" : ""}`}
        thumb=""
        width="150px"
        // url={`http://localhost:3500/assets/${dish.imageName.trim()}`}
      />
      <div className="flex align-center g-1 fs-small">
        <p className="uppercase cl-khaled bold letter-s-1">{dish.name}</p>
        <span className="cl-t">|</span>
        <span className="bold cl-g">{dish.price}</span>
      </div>
      <div className="flex align-center g-1">
        <span className="flex align-center g-1">
          <span className="bold">{dish.rate}</span>
          <div className="flex cl-y">
            <FaStar />
          </div>
        </span>
        <span className="cl-t">|</span>
        <span className="flex align-center g-1">
          <span className="bold">{dish.peopleComments.length}</span>
          <div className="flex cl-r">
            <FaComments />
          </div>
        </span>
        <span className="cl-t">|</span>
        <span className="flex align-center g-1">
          <span className="bold">{dish.orderTimes}</span>
          <div className="flex cl-bl">
            <FaHandshake />
          </div>
        </span>
      </div>
      {dish.peopleComments.length > 0 && (
        <div
          className="centering-content g-1 pointer"
          onClick={() => setIsShowComments(true)}
        >
          <span className="uppercase cl-t fs-small">show comments</span>
          <m.span
            className="flex cl-khaled"
            initial={{
              x: 15,
            }}
            animate={{
              x: 0,
            }}
            transition={{
              repeatType: "mirror",
              repeat: Infinity,
              duration: 1,
            }}
          >
            <BsArrowRight />
          </m.span>
        </div>
      )}
      <div className="flex g-1 w-100">
        <AltButton
          bgColor="blue_gradient_bg"
          color="cl-b"
          content="EDIT PRICE"
          Icon={BiDollarCircle}
          valid={true}
          extra="fs-small"
          width="w-100"
          fn={() => setIsEditPrice(true)}
        />
        <AltButton
          bgColor="red_gradient_bg"
          color="cl-b"
          content="Delete"
          Icon={MdDelete}
          valid={true}
          extra="fs-small"
          width="w-100"
          fn={() => setIsDelete(true)}
        />
      </div>
    </m.div>
  );
}
export default Dish;
