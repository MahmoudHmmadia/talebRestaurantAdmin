import { motion as m } from "framer-motion";
import { IconType } from "react-icons";
type props = {
  content: string;
  color: string;
  bgColor: string;
  Icon?: any;
  fn?: () => void;
  width?: string;
  valid?: boolean;
};
function AltButton({ content, bgColor, color, fn, Icon, width, valid }: props) {
  return (
    <m.button
      className={`p-2 bold uppercase letter-s-1 m-auto centering-content g-1 ${bgColor} ${color} ${
        width ? width : "w-60"
      } ${valid ? "pointer opacity-100" : "mouse-none opacity-50"}`}
      onClick={fn}
      whileHover={{
        scale: 0.9,
      }}
    >
      <span>{content}</span>
      {Icon && (
        <span className="fs-med flex">
          <Icon />
        </span>
      )}
    </m.button>
  );
}
export default AltButton;
