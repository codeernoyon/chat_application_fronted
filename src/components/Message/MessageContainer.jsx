import { useStateProvider } from "@/context/StateContext";
import { reducerCase } from "@/context/constants";
import { GETALLMESSAGE } from "@/utils/ApiRoutes";
import { calculateTime } from "@/utils/CalculateTime";
import axios from "axios";
import { useEffect } from "react";
import MessageStatus from "../common/MessageStatus";

const MessageContainer = () => {
  const [{ userInfo, currentMessageUser, allMessages }, dispatch] =
    useStateProvider();

  // ---------- import all messages from database ------
  useEffect(() => {
    const getAllMessages = async () => {
      // api hit url and get all messages
      const { data } = await axios.get(
        `${GETALLMESSAGE}/${userInfo?.email}/${userInfo?._id}/${currentMessageUser?._id}`
      );

      // store all messages in stats variable
      dispatch({
        type: reducerCase.ALL_MESSAGES,
        allMessages: data.allMessages,
      });
    };

    getAllMessages();
  }, []);
  return (
    <div className="h-[82.5vh]">
      <div className="relative h-full bg-chat-background bg-opacity-35 before:absolute before:top-0 before:h-full before:w-full before:bg-panel-header-background before:bg-opacity-95 before:z-[10] bg-fixed overflow-hidden">
        {/* --------- container ----- */}
        <div className="relative z-[11] ">
          <ul className="flex  flex-col gap-2 items-end overflow-hidden overflow-y-scroll px-5 py-2 h-[82.5vh]">
            {allMessages?.map((message) => (
              <li
                key={message._id}
                className={` w-fit py-2 px-3 rounded-xl flex gap-2 ${
                  currentMessageUser?._id === message.receiver
                    ? "self-end bg-green-900"
                    : "self-start bg-panel-header-background2"
                }  `}
              >
                {/* text */}
                <div>
                  <span className="text-[18px]">{message.message}</span>
                </div>
                {/* time && icon */}
                <div className="text-sm flex items-center gap-1 relative top-[10px] text-slate-400">
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
