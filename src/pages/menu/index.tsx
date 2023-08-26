import { BiFoodMenu } from "react-icons/bi";
import PageTitle from "../../components/pageTitle";
import { Helmet } from "react-helmet";
import logo from "../../assets/logo.png";
import useMenu, { MENU_CATEGORIES } from "../../hooks/useMenu";
import { motion as m } from "framer-motion";
import {
  GiMeat,
  GiPizzaSlice,
  GiSandwich,
  GiToaster,
  GiWrappedSweet,
} from "react-icons/gi";
import { FaGlassCheers } from "react-icons/fa";
import { TbSalad } from "react-icons/tb";
import "./menu.scss";
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";
import Dish from "./components/Dish";
import { useRef, useState } from "react";
import { ImSpoonKnife } from "react-icons/im";
import AltButton from "../../components/altButton";
import { GrReturn } from "react-icons/gr";
import { CgAdd } from "react-icons/cg";
import UseContext from "../../context/UseContext";
function Menu() {
  const { setShownCat, showenCat, menu, getMenu, addDish } = useMenu();
  const { setServerResponse } = UseContext();
  const [valid, setValid] = useState(false);
  const [isAddNewDish, setIsAddNewDish] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const infoRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const formData = new FormData();
  function getPayload() {
    formData.append("name", nameRef.current!.value);
    formData.append("info", infoRef.current!.value);
    formData.append("price", priceRef.current!.value);
    formData.append("cat", menu![0].cat);
    formData.append("image", imageRef.current?.files![0]!);
    formData.append("imageName", imageRef.current?.files![0].name!);
    return formData;
  }
  function handleValid() {
    if (
      !nameRef.current?.value ||
      !infoRef.current?.value ||
      !priceRef.current?.value ||
      !imageRef.current?.files![0]
    ) {
      setValid(false);
    } else {
      setValid(true);
    }
  }
  function addNewDish() {
    if (valid) {
      addDish(getPayload());
      setIsAddNewDish(false);
    } else {
      setServerResponse({
        type: "error",
        content: "fields are required",
      });
    }
  }
  return (
    <div className="menu flex flex-column align-center g-3">
      <Helmet>
        <link rel="icon" href={logo} />
        <title>Taleb Restaurant | Menu</title>
      </Helmet>
      <PageTitle icon={BiFoodMenu} title="Menu" />
      {isAddNewDish && (
        <>
          <div
            className="fixed l-0 t-0 w-100 h-100 alt-bg opacity-90"
            style={{
              zIndex: 1000000,
            }}
          ></div>
          <div
            className="fixed t-50 l-50 translate-50 p-2 flex flex-column g-2 align-center main-bg dark-box-shadow radius add_Dish"
            style={{
              zIndex: 1000000000,
            }}
          >
            <div className="fs-large cl-khaled flex">
              <ImSpoonKnife />
            </div>
            <div className="input-container w-100">
              <input
                type="text"
                placeholder="DISH NAME"
                className="alt-bg p-1 cl-w"
                ref={nameRef}
                onChange={handleValid}
              />
            </div>
            <div className="input-container w-100">
              <input
                type="text"
                placeholder="DISH PRICE"
                className="alt-bg p-1 cl-w"
                ref={priceRef}
                onChange={handleValid}
              />
            </div>
            <div className="input-container w-100">
              <input
                type="text"
                placeholder="DISH INFO"
                className="alt-bg p-1 cl-w"
                ref={infoRef}
                onChange={handleValid}
              />
            </div>
            <div className="input-container w-100 flex">
              <m.label
                htmlFor="image"
                className="khaled-bg cl-b p-2 w-100 txt-c pointer uppercase bold "
                whileHover={{
                  scale: 0.9,
                }}
              >
                Add Image
              </m.label>
              <input
                type="file"
                id="image"
                name="image"
                className="d-none"
                ref={imageRef}
                onChange={handleValid}
              />
            </div>
            <div className="flex g-1 align-center w-100">
              <AltButton
                bgColor="red_gradient_bg"
                color="cl-b"
                content="Cancel"
                valid={true}
                Icon={GrReturn}
                fn={() => setIsAddNewDish(false)}
                extra="fs-small"
              />
              <AltButton
                bgColor="green_gradient_bg"
                color="cl-b"
                content="Add The Dish"
                valid={true}
                Icon={CgAdd}
                fn={addNewDish}
                extra="fs-small"
              />
            </div>
          </div>
        </>
      )}
      <ul className="flex flex-wrap w-100 justify-center g-2">
        {MENU_CATEGORIES.map((li) => (
          <li
            key={li}
            className={`flex flex-column g-2 align-center p-2 radius-s alt-bg dark-box-shadow overflow-auto ${
              showenCat === li ? showenCat : "pointer"
            }`}
            style={{
              width: "120px",
            }}
            onClick={() => {
              if (!showenCat) setShownCat(li);
            }}
          >
            {li === showenCat && (
              <div
                className="flex absolute r-0 t-0 fs-large pointer cl-r"
                onClick={(e) => {
                  e.stopPropagation();
                  setShownCat(undefined);
                }}
              >
                <IoCloseCircle />
              </div>
            )}
            <div className="flex fs-x-large justify-center cl-khaled">
              {li == "breakFast" ? (
                <GiToaster />
              ) : li == "drinks" ? (
                <FaGlassCheers />
              ) : li == "fastFood" ? (
                <GiSandwich />
              ) : li == "meal" ? (
                <GiMeat />
              ) : li == "pizza" ? (
                <GiPizzaSlice />
              ) : li == "salad" ? (
                <TbSalad />
              ) : (
                <GiWrappedSweet />
              )}
            </div>
            <p className="uppercase letter-s-1">{li}</p>
            {li === showenCat && (
              <div
                className="g-2 grid w-100 p-2 relative"
                style={{
                  gridTemplateColumns:
                    "repeat(auto-fill , minmax(300px , 1fr))",
                }}
              >
                <m.div
                  className="p-2 radius flex g-1 align-center justify-center flex-column w-full main-bg dark-box-shadow radius-s relative cl-w pointer"
                  initial={{
                    opacity: 0,
                    y: 100,
                  }}
                  animate={{
                    opacity: 2,
                    y: 0,
                    transition: {
                      delay: 1,
                    },
                  }}
                  onClick={() => setIsAddNewDish(true)}
                >
                  <div className="icon flex fs-x-large cl-khaled">
                    <IoAddCircle />
                  </div>
                  <p className="uppercase neon">Add New Dish</p>
                </m.div>
                {menu?.map((dish) => (
                  <>
                    <Dish
                      dish={dish}
                      showenCat={showenCat}
                      getMenu={getMenu}
                      key={dish._id}
                    />
                  </>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Menu;
