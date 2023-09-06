import { useStateProvider } from "@/context/StateContext";
import { reducerCase } from "@/context/constants";
import { AiOutlineArrowLeft } from "react-icons/ai";
import GroupSlide from "./GroupSlide";
import NewMessage from "./NewMessage";
import ProfileSlide from "./ProfileSlide";
import SettingSlide from "./SettingSlide";

const ChatListSlide = ({ status, option }) => {
  const [{}, dispatch] = useStateProvider();
  // close slide function update global state status = false
  const closeSlide = () => {
    dispatch({
      type: reducerCase.SHOW_SLIDE,
      showSlide: {
        status: false,
        option: "",
      },
    });
  };
  return (
    <div
      className={`h-full w-full absolute top-0 bg-panel-header-background transition-all duration-300 text-slate-400 z-[599] overflow-hidden ${
        status ? "left-0" : "left-[-100%]"
      }`}
    >
      {/* top part of slide */}
      <div className="flex min-h-[100px] 2xl:min-h-[150px] items-center gap-5 bg-secondary pt-8 pl-8 text-slate-200">
        {/* icon */}
        <span className="text-[22px] cursor-pointer" onClick={closeSlide}>
          <AiOutlineArrowLeft />
        </span>
        {/* option text */}
        <span className="text-[22px] 2xl:text-[30px] capitalize">{option}</span>
      </div>
      <div>{option === "profile" && <ProfileSlide />}</div>
      <div>{option === "group" && <GroupSlide />}</div>
      <div>{option === "setting" && <SettingSlide />}</div>
      <div>{option === "new" && <NewMessage />}</div>
    </div>
  );
};

export default ChatListSlide;
