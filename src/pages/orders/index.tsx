import { BiFoodMenu } from "react-icons/bi";
import { motion as m } from "framer-motion";
import PageTitle from "../../components/pageTitle";
import "./orders.scss";
import { ImSpoonKnife } from "react-icons/im";
import useOrders from "../../hooks/useOrders";
import { test } from "../home";
import AltButton from "../../components/altButton";
import { MdSoupKitchen } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { order } from "../../hooks/useHome";
import { TbSalad } from "react-icons/tb";
import { FaGlassCheers } from "react-icons/fa";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
SwiperCore.use([Pagination]);
import {
  GiMeat,
  GiPizzaSlice,
  GiSandwich,
  GiToaster,
  GiWrappedSweet,
} from "react-icons/gi";
SwiperCore.use([Pagination]);
function Orders() {
  const { orders, orderDishes, setOrderDishes } = useOrders();
  function getDishesNumber(order: order) {
    let sum = 0;
    order.total.forEach((dish) => {
      sum += dish.number;
    });
    return sum;
  }
  return (
    <div className="orders flex flex-column g-3 align-center">
      <PageTitle title="orders" icon={<BiFoodMenu />} />
      {orderDishes && (
        <>
          <div className="fixed l-0 t-0 w-100 h-100 z-10000 alt-bg opacity-90"></div>
          <m.div
            className="fixed l-50 p-3 flex flex-column justify-center g-3 z-100000 overflow-auto"
            style={{
              top: "10%",
              minWidth: "80%",
              minHeight: "80%",
              transform: "translateX(-50%)",
            }}
            initial={{
              opacity: 0,
              y: 150,
              x: "-50%",
            }}
            animate={{
              y: 0,
              opacity: 1,
              x: "-50%",
            }}
          >
            <div
              className="absolute pointer r-0 t-0 flex cl-r fs-med"
              onClick={() => setOrderDishes(undefined)}
            >
              <IoCloseCircle />
            </div>
            <Swiper
              effect={"slide"}
              grabCursor={true}
              slidesPerView={"auto"}
              pagination={true}
              className="mySwiper"
            >
              {orderDishes.map((dish, index) => (
                <SwiperSlide
                  key={index}
                  className="flex g-2 p-2 flex-column dark-box-shadow overflow-hidden radius-m alt-bg"
                  style={{
                    maxWidth: "300px",
                    border: "2px solid #777",
                  }}
                >
                  <div className="flex flex-column g-2">
                    <div className="flex fs-x-large justify-center cl-khaled">
                      {dish.category == "breakFast" ? (
                        <GiToaster />
                      ) : dish.category == "drinks" ? (
                        <FaGlassCheers />
                      ) : dish.category == "fastFood" ? (
                        <GiSandwich />
                      ) : dish.category == "meal" ? (
                        <GiMeat />
                      ) : dish.category == "pizza" ? (
                        <GiPizzaSlice />
                      ) : dish.category == "salad" ? (
                        <TbSalad />
                      ) : (
                        <GiWrappedSweet />
                      )}
                    </div>
                    <h1 className="cl-w uppercase txt-c neon">
                      {dish.category}
                    </h1>
                  </div>
                  <div
                    className="w-100 line-bg"
                    style={{
                      height: "2px",
                      transform: "scaleX(1.5)",
                    }}
                  ></div>
                  <h3 className="txt-c uppercase cl-m">{dish.name}</h3>
                  <span className="cl-bl uppercase fs-large txt-c">{`${
                    dish.number + (dish.number > 1 ? " Dishes" : " DISH")
                  }`}</span>
                  <div className="flex g-1 align-center justify-center">
                    <span className="cl-t bold uppercase">total Price :</span>
                    <span className="cl-t uppercase cl-g">{dish.price} SP</span>
                  </div>
                  <div className="flex g-1 align-center justify-center">
                    <span className="cl-t bold uppercase">dish price :</span>
                    <span className="cl-t uppercase cl-g">
                      {dish.price / dish.number} SP
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </m.div>
        </>
      )}
      {!orders || orders.length == 0 ? (
        <h2 className="cl-w neon uppercase">There is no orders write now</h2>
      ) : (
        <div className="orders_boxes w-100">
          {orders.map((order) => (
            <div
              className="box overflow-hidden p-2 radius-s flex flex-column g-3 alt-bg dark-box-shadow relative"
              key={order._id}
            >
              <div className="fs-x-large centering-content cl-khaled relative z_1">
                <ImSpoonKnife />
              </div>
              <div className="flex flex-column g-1">
                <div className="flex align-center g-1 uppercase">
                  <h5>Name :</h5>
                  <h5 className="extra-bold cl-m bold">{order.name}</h5>
                </div>
                <div className="flex align-center g-1 uppercase">
                  <h5>number of dishes :</h5>
                  <h5 className="extra-bold cl-bl">{getDishesNumber(order)}</h5>
                </div>
                <div className="flex align-center g-1 uppercase">
                  <h5>total price :</h5>
                  <h5 className="extra-bold cl-g bold">{order.price} SP</h5>
                </div>
                <div className="fs-small">
                  <AltButton
                    bgColor="khaled-bg"
                    color="cl-b"
                    content="order details"
                    Icon={MdSoupKitchen}
                    width="w-100"
                    valid={true}
                    fn={() => setOrderDishes(order.total)}
                  />
                </div>
              </div>
              {test(order) ? (
                <div
                  className="absolute centering-content "
                  style={{
                    transform: " rotate(-30deg)translate(-50%, -50%)",
                    width: " 200px",
                    height: "30px",
                    left: "50px",
                    top: "-20px",
                    backgroundColor: "#8b5160",
                  }}
                >
                  <span className="bold uppercase letter-s-1">bending</span>
                </div>
              ) : (
                <div
                  className="absolute centering-content green_gradient_bg"
                  style={{
                    transform: " rotate(-30deg)translate(-50%, -50%)",
                    width: " 200px",
                    height: "30px",
                    left: "50px",
                    top: "-20px",
                  }}
                >
                  <span className="bold uppercase letter-s-1">done</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Orders;
