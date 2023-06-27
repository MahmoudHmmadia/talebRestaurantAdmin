import "./button.scss";
import { motion as m } from "framer-motion";
type props = {
  content: string;
  bgColor?: string;
  color?: string;
  altColor?: string;
  outline: string;
  button_circle_bg_color?: string;
  animate?: boolean;
  fn?: () => void;
  valid?: boolean;
};

function Button({
  content,
  button_circle_bg_color,
  bgColor,
  outline,
  color,
  altColor,
  animate,
  fn,
  valid,
}: props) {
  return (
    <m.button
      className={`button pl-4 pr-4 relative letter-s-2 uppercase centering-content relative overflow-hidden ${outline} ${bgColor} ${color} ${
        valid ? "pointer opacity-100" : "mouse-none opacity-50"
      }`}
      style={{
        fontWeight: "700",
        paddingBottom: "1.5rem",
        paddingTop: "1.5rem",
      }}
      initial={{
        y: animate ? "30%" : "",
        opacity: animate ? 0 : "",
      }}
      animate={{
        y: animate ? "0%" : "",
        opacity: animate ? 1 : "",
      }}
      transition={{
        duration: 0.5,
        delay: 2,
      }}
      onClick={fn}
    >
      <div
        className={`absolute button_circle smooth-2 l-50 circle ${button_circle_bg_color}`}
        style={{
          width: "200%",
          height: "200%",
          top: "-200%",
        }}
      ></div>
      <p className="">{content}</p>
      <p
        className={`absolute cool_text smooth-2 w-100 ${altColor}`}
        style={{
          top: "150%",
          left: "50%",
        }}
      >
        {content}
      </p>
    </m.button>
  );
}
export default Button;
