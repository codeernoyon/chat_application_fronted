import { useStateProvider } from "@/context/StateContext";
import Image from "next/image";
import { BsChevronDown } from "react-icons/bs";
import { MdSearch } from "react-icons/md";
import VideoCall from "../Call/VideoCall";
import VoiceCall from "../Call/VoiceCall";

const MessageHeader = () => {
  const [{ userInfo }] = useStateProvider();
  return (
    <div className="py-2 px-5 pr-8 bg-panel-header-background2 flex justify-between items-center">
      {/* --------- image & status ---------- */}
      <div className="flex items-center gap-5">
        {/* image */}
        <Image
          src={userInfo?.imageUrl}
          alt="photo"
          height={50}
          width={50}
          className="rounded-full"
        />
        <div className="flex flex-col">
          {/* name */}
          <span className="text-[18px] font-medium">{userInfo?.name}</span>
          {/* active status */}
          <span className="text-sm text-slate-500">active status</span>
        </div>
      </div>
      {/* ----------- right side call & search & setting ---------- */}
      <div className="text-[20px] flex items-center gap-10 text-slate-400">
        {/* it's video component added from Call folder  */}
        <VideoCall />
        {/* it's audio component added from Call folder  */}
        <VoiceCall />
        {/* ber */}
        <div className="h-[25px] w-[2px] bg-slate-600"></div>
        {/* search icon */}
        <div className="text-[25px] cursor-pointer">
          <MdSearch />
        </div>
        {/* down icon for setting options */}
        <div className="text-inherit cursor-pointer">
          <BsChevronDown />
        </div>
      </div>
    </div>
  );
};

export default MessageHeader;
