import { useStateProvider } from "@/context/StateContext";
import { calculateTime } from "@/utils/CalculateTime";
import dynamic from "next/dynamic";
import Image from "next/image";
import MessageStatus from "../common/MessageStatus";
const AudioMessage = dynamic(() => import("./Elements/AudioMessage"), {
  ssr: false,
});

const MessageContainer = () => {
  const [{ userInfo, currentMessageUser, allMessages }, dispatch] =
    useStateProvider();
  return (
    <div className="h-[82.5vh] bg-panel-header-background">
      <div className="relative h-full bg-chat-background before:absolute before:top-0 before:h-full before:w-full before:bg-panel-header-background before:bg-opacity-95 before:z-[10] bg-fixed overflow-hidden">
        {/* --------- container ----- */}
        <div className="relative z-[11]">
          <ul
            className={`relative flex gap-2 flex-col px-5 py-2 h-[82.5vh] overflow-y-scroll overflow-x-hidden scroll-smooth scroll://#endregion`}
          >
            {allMessages?.map((message) => (
              <li
                key={message?._id}
                className={` w-fit px-3 rounded-xl flex gap-2 ${
                  currentMessageUser?._id === message.receiver
                    ? "self-end bg-green-900"
                    : "self-start bg-panel-header-background2"
                } ${
                  message?.fileType === "image"
                    ? "flex-col py-3"
                    : "flex-row py-2"
                } `}
              >
                {/* text */}
                {message?.fileType === "text" && (
                  <div>
                    <span className="text-[18px]">{message.message}</span>
                  </div>
                )}
                {/* image */}
                {message?.fileType === "image" && (
                  <div>
                    <Image
                      src={message.message}
                      alt="photo"
                      height={200}
                      width={200}
                      className="rounded-md"
                    />
                  </div>
                )}
                {/* audio */}
                {message?.fileType === "audio" && (
                  <AudioMessage message={message} />
                )}
                {/* status */}
                <div
                  className={`text-sm flex items-center gap-1 relative top-[10px] text-slate-400 ${
                    message?.fileType === "image" ? "self-end" : "self-start"
                  }`}
                >
                  <span>{calculateTime(message?.createdAt)}</span>
                  {userInfo?._id === message?.sender && (
                    <MessageStatus messageStatus={message.status} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
