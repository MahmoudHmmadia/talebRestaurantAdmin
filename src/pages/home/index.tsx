import PageTitle from "../../components/pageTitle";
import { MdFoodBank } from "react-icons/md";
import { TfiComments } from "react-icons/tfi";
import { GiChefToque, GiKnifeFork } from "react-icons/gi";
import { BiCoinStack, BiLoaderAlt, BiMoney } from "react-icons/bi";
import {
  BsCheck,
  BsEmojiAngryFill,
  BsEmojiHeartEyesFill,
  BsEmojiNeutralFill,
  BsEmojiSmileFill,
  BsMenuAppFill,
  BsPeopleFill,
} from "react-icons/bs";
import { motion as m } from "framer-motion";
import "./home.scss";
import HomeBox from "./components/homeBox";
import useHome, { order } from "../../hooks/useHome";
import { Helmet } from "react-helmet";
import logo from "../../assets/logo.png";

function Home() {
  const { details } = useHome();
  return (
    <div className="home flex flex-column g-3 align-center">
      <Helmet>
        <link rel="icon" href={logo} />
        <title>Taleb Restaurant | Home</title>
      </Helmet>
      <PageTitle icon={<MdFoodBank />} title="HOME" />
      <div className="home_boxes w-100">
        <HomeBox
          title="customers"
          bg="sunny_gradient_bg"
          details={details?.customers ? details.customers : 0}
          icon={<BsPeopleFill />}
        />
        <HomeBox
          title="revenues"
          bg="green_gradient_bg"
          details={details?.revenues ? details.revenues : 0}
          icon={<BiMoney />}
        />
        <HomeBox
          title="employs"
          bg="khaled-bg"
          details={details?.employees ? details.employees : 0}
          icon={<GiChefToque />}
        />
        <HomeBox
          title="expenses"
          bg="red_gradient_bg"
          details={details?.expenses ? details.expenses : 0}
          icon={<BiCoinStack />}
        />
      </div>
      <div className="g-2 w-100 alt_home_boxes">
        <div className="latest-orders flex flex-column flex-1 main-bg radius-s dark-box-shadow pb-3">
          <div className="cl-w flex align-center g-1 p-2">
            <h2 className="uppercase">latest orders</h2>
            <div className="cl-khaled fs-med">
              <BsMenuAppFill />
            </div>
          </div>
          <ul className="flex g-2 flex-column">
            {details?.latestOrders.length == 0 && (
              <li className="txt-c fs-b-small align-center g-2 justify-center flex-1 uppercase neon letter-s-1 flex flex-column">
                <h3>There Is No New Orders Write Now</h3>
                <div className="flex fs-large cl-khaled">
                  <GiKnifeFork />
                </div>
              </li>
            )}
            {details?.latestOrders.map((order) => (
              <li
                key={order._id}
                className={`cl-t order p-2 g-1 grid fs-small ${
                  order.done ? "black-bg" : "alt-bg"
                }`}
                style={{
                  borderTop: `1px solid ${order.done ? "#ffa852" : "#05ba05"}`,
                  borderBottom: `1px solid ${
                    order.done ? "#ffa852" : "#05ba05"
                  }`,
                  gridTemplateColumns: "40% 40% 20%",
                }}
              >
                <div className="flex g-1 align-center flex-wrap">
                  <span className="cl-w bold">NAME :</span>
                  <span className="cl-t uppercase">{order.name}</span>
                </div>
                <div className="flex g-1 align-center flex-wrap">
                  <span className="cl-w bold">PRICE :</span>
                  <span className="cl-t uppercase">{order.price} SP</span>
                </div>
                {order.done ? (
                  <m.div
                    className="icon fs-b-small centering-content cl-m"
                    initial={{
                      rotate: 0,
                    }}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <BiLoaderAlt />
                  </m.div>
                ) : (
                  <div className="icon fs-b-small centering-content cl-g">
                    <BsCheck />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="latest_fideBacks flex flex-column flex-1 main-bg radius-s dark-box-shadow pb-3">
          <div className="cl-w flex align-center g-1 p-2">
            <h2 className="uppercase">latest feed backs</h2>
            <div className="cl-khaled fs-med">
              <TfiComments />
            </div>
          </div>
          <ul className="flex flex-column g-2">
            {details?.feedBacks.map((feedBack) => (
              <li
                className="p-2 flex g-1 align-center justify-between alt-bg"
                key={feedBack._id}
                style={{
                  borderTop: "1px solid #fff",
                  borderBottom: "1px solid #fff",
                }}
              >
                <div className="flex flex-column g-1 flex-1">
                  <div className="fs-small flex uppercase align-center g-1">
                    <span className="bold cl-w">Name :</span>
                    <span className="cl-t">{feedBack.name}</span>
                  </div>
                  <span className="cl-t uppercase fs-x-small">
                    {feedBack.comment}
                  </span>
                </div>
                <div className="flex fs-med">
                  {feedBack.rate == 5 ? (
                    <div className="cl-bl">
                      <BsEmojiHeartEyesFill />
                    </div>
                  ) : feedBack.rate == 4 ? (
                    <div className="cl-g">
                      <BsEmojiSmileFill />
                    </div>
                  ) : feedBack.rate == 2 ? (
                    <div className="cl-m">
                      <BsEmojiNeutralFill />
                    </div>
                  ) : (
                    <div className="cl-r">
                      <BsEmojiAngryFill />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Home;
