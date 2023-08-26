import SidebarLink from "../sidebarLink";
import { AiFillHome } from "react-icons/ai";
import { BiFoodMenu, BiLogInCircle } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { GrOrderedList } from "react-icons/gr";
import logo from "../../assets/logo.png";
import "./sidebar.scss";
import { motion as m } from "framer-motion";
import image from "../../assets/rate1.svg";
import UseContext from "../../context/UseContext";
function Sidebar() {
  const { setAuth } = UseContext();
  return (
    <div className="sidebar flex flex-column g-3 alt-bg sticky-top dark-box-shadow">
      <div className="p-2 centering-content relative z-10000 ">
        <img src={logo} alt="LOGO" width={70} />
      </div>
      <ul className="links flex flex-column links relative z-10000">
        <li className="link overflow-hidden">
          <SidebarLink path="/" content="home" icon={<AiFillHome />} />
        </li>
        <li className="link overflow-hidden">
          <SidebarLink
            path="employees"
            content="employees"
            icon={<BsPeopleFill />}
          />
        </li>
        <li className="link overflow-hidden">
          <SidebarLink
            path="orders"
            content="orders"
            icon={<GrOrderedList />}
          />
        </li>
        <li className="link overflow-hidden">
          <SidebarLink
            path="feedBacks"
            content="feedbacks"
            icon={<FaComments />}
          />
        </li>
        <li className="link overflow-hidden">
          <SidebarLink path="menu" content="menu" icon={<BiFoodMenu />} />
        </li>
        <m.li
          className="pointer overflow-hidden cl-t"
          whileHover={{
            backgroundColor: "#e4c590",
            color: "#000",
          }}
        >
          <div className="link" onClick={() => setAuth(false)}>
            <div className="sidebar_link flex align-center g-1  p-2 uppercase link letter-s-1">
              <span className="flex icon">
                <BiLogInCircle />
              </span>
              <span className="content">logout</span>
            </div>
          </div>
        </m.li>
      </ul>
    </div>
  );
}
export default Sidebar;
