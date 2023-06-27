import { NavLink } from "react-router-dom";
type props = {
  path: string;
  content: string;
  icon: any;
};
import { motion as m } from "framer-motion";
function SidebarLink({ path, content, icon }: props) {
  return (
    <m.div
      whileHover={{
        backgroundColor: "#e4c590",
        color: "#000",
      }}
      className="cl-t"
    >
      <NavLink className="sidebar_link p-2 uppercase link letter-s-1" to={path}>
        <div className="flex align-center g-1">
          <span className="flex icon">{icon}</span>
          <span className="content">{content}</span>
        </div>
      </NavLink>
    </m.div>
  );
}
export default SidebarLink;
