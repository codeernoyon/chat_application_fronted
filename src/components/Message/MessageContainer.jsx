import { useStateProvider } from "@/context/StateContext";
import { calculateTime } from "@/utils/CalculateTime";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
const MessageStatus = dynamic(() => import("../common/MessageStatus"), {
  ssr: false,
});
const AudioMessage = dynamic(() => import("./Elements/AudioMessage"), {
  ssr: false,
});

const MessageContainer = () => {
  const [{ userInfo, currentMessageUser, allMessages }, dispatch] =
    useStateProvider();
  const [filterMessages, setFilterMessages] = useState(null);

  // ---------- import all messages from database ------
  useEffect(() => {
    const messages = allMessages.filter(
      (message) =>
        (message.receiver === currentMessageUser._id &&
          message.sender === userInfo._id) ||
        (message.receiver === userInfo._id &&
          message.sender === currentMessageUser._id)
    );
    setFilterMessages(messages);
  }, [allMessages]);

  return (
    <div className="h-[82.5vh]">
      <div className="relative h-full bg-chat-background bg-opacity-35 before:absolute before:top-0 before:h-full before:w-full before:bg-panel-header-background before:bg-opacity-95 before:z-[10] bg-fixed overflow-hidden">
        {/* --------- container ----- */}
        <div className="relative z-[11] ">
          <ul className="flex  flex-col gap-2 items-end overflow-hidden overflow-y-scroll px-5 py-2 h-[82.5vh] will-change-scroll://#region ">
            {filterMessages?.map((message) => (
              <li
                key={message._id}
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
                {/* time && icon */}
                <div
                  className={`text-sm flex items-center gap-1 relative top-[10px] text-slate-400 ${
                    message?.fileType === "image" ? "self-end" : "self-start"
                  }`}
                >
                  <span>{calculateTime(message?.createdAt)}</span>
                  {userInfo?._id === message?.sender && (
                    <MessageStatus messageStatus={message?.status} />
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
