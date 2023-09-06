import { useStateProvider } from "@/context/StateContext";
import { reducerCase } from "@/context/constants";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdGroups, MdMessage } from "react-icons/md";
import SettingPopup from "./Elements/SettingPopup";

const HeaderIcons = () => {
  const [{ userInfo }] = useStateProvider();
  const [showSetting, setShowSetting] = useState(false);
  const [showSlideData, setShowSlideData] = useState({
    status: false,
    option: "",
  });
  // call dispatch context
  const [{}, dispatch] = useStateProvider();

  // open profile slide function with set data
  const showWithSlide = (text) => {
    setShowSlideData({
      status: true,
      option: text,
    });
  };

  useEffect(() => {
    dispatch({
      type: reducerCase.SHOW_SLIDE,
      showSlide: { ...showSlideData },
    });
  }, [showSlideData]);
  return (
    <div className="px-5 py-2 2xl:py-3 flex justify-between items-center bg-secondary">
      {/* profile image */}
      <div className="cursor-pointer" onClick={() => showWithSlide("profile")}>
        <Image
          src={userInfo?.imageUrl}
          alt="profile image"
          height={50}
          width={50}
          className="rounded-full"
        />
      </div>
      {/* right side icons */}
      <div className="flex gap-8 2xl:gap-12 justify-center items-center">
        {/* group */}
        <div className="cursor-pointer" onClick={() => showWithSlide("group")}>
          <MdGroups className="text-[32px] 2xl:text-[40px]" />
        </div>
        {/* --status-- */}
        <div className="cursor-pointer">
          <svg
            viewBox="0 0 24 24"
            height="30"
            width="30"
            preserveAspectRatio="xMidYMid meet"
            className=""
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="5"
              stroke="currentColor"
              strokeWidth="2"
            ></circle>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20 12C20 12.9267 19.8424 13.8166 19.5526 14.6444C19.3824 15.1305 19.5352 15.6866 19.9709 15.9613C20.4736 16.2782 21.1446 16.0964 21.3551 15.5406C21.7719 14.44 22 13.2466 22 12C22 7.15998 18.5615 3.12307 13.9941 2.19883C13.4118 2.08101 12.9 2.55153 12.9 3.14558C12.9 3.66061 13.2896 4.08652 13.7916 4.20139C17.3473 5.0149 20 8.19767 20 12ZM12 20C14.2014 20 16.1951 19.1108 17.6416 17.672C18.0063 17.3094 18.5733 17.208 19.0083 17.4823C19.5115 17.7995 19.6362 18.4841 19.2249 18.9138C17.4045 20.8156 14.8406 22 12 22C9.13243 22 6.54677 20.793 4.72334 18.8594C4.31526 18.4266 4.44515 17.7429 4.95068 17.4295C5.38777 17.1585 5.95401 17.2641 6.31591 17.6295C7.76573 19.0933 9.77697 20 12 20ZM3.9996 15.9013C4.43726 15.63 4.59424 15.075 4.42776 14.5877C4.15046 13.776 4 12.9056 4 12C4 8.19767 6.65269 5.0149 10.2084 4.20139C10.7104 4.08652 11.1 3.66061 11.1 3.14558C11.1 2.55153 10.5882 2.08101 10.0059 2.19883C5.4385 3.12307 2 7.15998 2 12C2 13.2201 2.21851 14.3892 2.61853 15.4702C2.82479 16.0276 3.49447 16.2145 3.9996 15.9013ZM12.0438 2.00009L12 2L11.9562 2.00009H12.0438Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>

        {/* message */}
        <div className="cursor-pointer" onClick={() => showWithSlide("new")}>
          <MdMessage className="text-[25px] 2xl:text-[33px]" />
        </div>
        {/* options */}
        <div
          className={`cursor-pointer relative p-2 rounded-full transition-all duration-200 ${
            showSetting ? "bg-slate-700" : "bg-transparent"
          }`}
          onClick={() => setShowSetting(!showSetting)}
        >
          {/* setting popup */}
          {showSetting && (
            <SettingPopup
              setShowSetting={setShowSetting}
              setShowSlideData={setShowSlideData}
            />
          )}
          {/* icon */}
          <BiDotsVerticalRounded className="text-[25px] 2xl:text-[35px]" />
        </div>
      </div>
    </div>
  );
};

export default HeaderIcons;
