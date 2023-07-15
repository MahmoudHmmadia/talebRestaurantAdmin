import { GiConversation } from "react-icons/gi";
import PageTitle from "../../components/pageTitle";
import { BiHeartCircle } from "react-icons/bi";
import {
  BsEmojiAngryFill,
  BsEmojiHeartEyesFill,
  BsEmojiNeutralFill,
  BsEmojiSmileFill,
} from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import { TbHeartBroken } from "react-icons/tb";
import { motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import "./feedBacks.scss";
import useFeedBack, { feedBack } from "../../hooks/useFeedBacks";
import { Helmet } from "react-helmet";
import logo from "../../assets/logo.png";
function FeedBacks() {
  const { feedBacks } = useFeedBack();
  const [isGoodFeedBacks, setIsGoodFeedBacks] = useState(true);
  const [filteredFeedBacks, setFilteredFeedBacks] = useState<feedBack[]>();
  useEffect(() => {
    if (feedBacks && feedBacks.length > 0) {
      isGoodFeedBacks
        ? setFilteredFeedBacks(
            feedBacks.filter((feedBack) => feedBack.rate > 3)
          )
        : setFilteredFeedBacks(
            feedBacks.filter((feedBack) => feedBack.rate < 3)
          );
    }
  }, [feedBacks, isGoodFeedBacks]);
  return (
    <div className="fideBacks flex flex-column g-3 align-center">
      <Helmet>
        <link rel="icon" href={logo} />
        <title>Taleb Restaurant | FeedBacks</title>
      </Helmet>
      <PageTitle title="feed backs" icon={<GiConversation />} />
      <ul className="alt-bg radius-m fideBacks_filter overflow-hidden p-2 g-1 grid">
        <m.li
          className={`pointer g-1 p-2 uppercase radius-s centering-content ${
            isGoodFeedBacks ? "good cl-w mouse-none" : "pointer cl-t"
          }`}
          whileHover={{
            color: "#fff",
            background: "linear-gradient(90deg, #1d9f86 0%, #1edeac)",
          }}
          onClick={() => setIsGoodFeedBacks(true)}
        >
          <span
            style={{
              textShadow: isGoodFeedBacks ? "1px 1px 20px #fff" : "0 0 0 ",
            }}
          >
            good feed backs
          </span>
          <span className="flex icon fs-med">
            <BiHeartCircle />
          </span>
        </m.li>
        <m.li
          className={`pointer  g-1 p-2 uppercase radius-s centering-content ${
            !isGoodFeedBacks ? "bad mouse-none" : "pointer cl-t"
          }`}
          whileHover={{
            color: "#fff",
            background: "linear-gradient(90deg, #f00 0%, #ce0505)",
          }}
          onClick={() => setIsGoodFeedBacks(false)}
        >
          <span
            style={{
              textShadow: !isGoodFeedBacks ? "1px 1px 20px #fff" : "0 0 0 ",
            }}
          >
            bad feed backs
          </span>
          <span className="flex icon fs-med">
            <TbHeartBroken />
          </span>
        </m.li>
      </ul>
      {(filteredFeedBacks?.length == 0 || !filteredFeedBacks) && (
        <h2 className="neon letter-s-1 w-100 uppercase txt-c">
          THERE IS No FEEDBACKS TO SHOWN
        </h2>
      )}
      <div className="fideBacks_boxes w-100">
        {filteredFeedBacks?.map((f) => (
          <div
            className="box radius-s alt-bg dark-box-shadow p-2 flex flex-column g-2"
            key={f._id}
          >
            <div className="flex fs-x-large centering-content">
              {f.rate == 5 ? (
                <div className="cl-bl">
                  <BsEmojiHeartEyesFill />
                </div>
              ) : f.rate == 4 ? (
                <div className="cl-g">
                  <BsEmojiSmileFill />
                </div>
              ) : f.rate == 2 ? (
                <div className="cl-m">
                  <BsEmojiNeutralFill />
                </div>
              ) : (
                <div className="cl-r">
                  <BsEmojiAngryFill />
                </div>
              )}
            </div>
            <div className="flex g-1 align-center uppercase fs-small">
              <span className="bold">NAME :</span>
              <span className="bold cl-m">{f.name}</span>
            </div>
            <div className="flex flex-column uppercase g-2 fs-small">
              <span className="bold">COMMENT :</span>
              <div
                className="flex g-1 p-2 radius-m align-center"
                style={{
                  border: "1px solid #aaa",
                }}
              >
                <div className="flex cl-khaled">
                  <FaComment />
                </div>
                <p className="cl-t">{f.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default FeedBacks;
