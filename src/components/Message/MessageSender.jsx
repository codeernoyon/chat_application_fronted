import { useStateProvider } from "@/context/StateContext";
import { reducerCase } from "@/context/constants";
import { SENDMESSAGE } from "@/utils/ApiRoutes";
import axios from "axios";
import { useState } from "react";
import AttachFile from "./Elements/AttachFile";
import Emoji from "./Elements/Emoji";
import MessageSenderInput from "./Elements/MessageSenderInput";
import SendMessage from "./Elements/SendMessage";

const MessageSender = () => {
  const [{ userInfo, currentMessageUser, socket }, dispatch] =
    useStateProvider();
  const [message, setMessage] = useState("");

  // handle message sender function for send message
  const handleMessageSender = async () => {
    try {
      setMessage("");
      // ++++++++++++ request send message in database ++++++++++++
      const { data } = await axios.post(SENDMESSAGE, {
        email: userInfo?.email,
        message: message,
        sender: userInfo?._id,
        receiver: currentMessageUser?._id,
      });
      // socket event listener
      socket.current.emit("send_message", {
        ...data.data,
      });
      // add message live on global state
      dispatch({
        type: reducerCase.ADD_MESSAGE,
        newMessage: { ...data.data },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-panel-header-background2 py-3 px-8 relative">
      {/* container */}
      <div className="flex items-center gap-7">
        <Emoji message={message} setMessage={setMessage} />
        <AttachFile />
        <MessageSenderInput message={message} setMessage={setMessage} />
        <SendMessage message={message} messageSend={handleMessageSender} />
      </div>
    </div>
  );
};

export default MessageSender;
