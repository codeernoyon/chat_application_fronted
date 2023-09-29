import { useStateProvider } from "@/context/StateContext";
import { reducerCase } from "@/context/constants";
import Image from "next/image";
import { BsCameraVideo, BsChevronDown, BsTelephone } from "react-icons/bs";
import { MdSearch } from "react-icons/md";

const MessageHeader = () => {
  const [{ currentMessageUser }, dispatch] = useStateProvider();

  // handle audio call
  const handleVoiceCall = () => {
    dispatch({
      type: reducerCase.VOICE_CALL,
      voiceCall: {
        ...currentMessageUser,
        type: "out_going",
        callType: "voiceCall",
        roomId: Date.now(),
      },
    });
  };
  // handle video call
  const handleVideoCall = () => {
    dispatch({
      type: reducerCase.VIDEO_CALL,
      videoCall: {
        ...currentMessageUser,
        type: "out_going",
        callType: "videoCall",
        roomId: Date.now(),
      },
    });
  };
  return (
    <div className="py-2 px-5 pr-8 bg-panel-header-background2 flex justify-between items-center">
      {/* --------- image & status ---------- */}
      <div className="flex items-center gap-5">
        {/* image */}
        <Image
          src={currentMessageUser?.imageUrl}
          alt="photo"
          height={50}
          width={50}
          className="rounded-full"
        />
        <div className="flex flex-col">
          {/* name */}
          <span className="text-[18px] font-medium">
            {currentMessageUser?.name}
          </span>
          {/* active status */}
          <span className="text-sm text-slate-500">active status</span>
        </div>
      </div>
      {/* ----------- right side call & search & setting ---------- */}
      <div className="text-[20px] flex items-center gap-10 text-slate-400">
        {/* it's video component added from Call folder  */}
        <div className="cursor-pointer" onClick={handleVideoCall}>
          <BsCameraVideo />
        </div>
        {/* it's audio component added from Call folder  */}
        <div className="cursor-pointer" onClick={handleVoiceCall}>
          <BsTelephone />
        </div>
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
