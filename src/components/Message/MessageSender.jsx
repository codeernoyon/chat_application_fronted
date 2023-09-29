import { useStateProvider } from "@/context/StateContext";
import { SENDMESSAGE } from "@/utils/ApiRoutes";
import axios from "axios";
import { useState } from "react";
import AttachFile from "./Elements/AttachFile";
import AudioRecorder from "./Elements/AudioRecoder";
import Emoji from "./Elements/Emoji";
import MessageSenderInput from "./Elements/MessageSenderInput";
import SendMessage from "./Elements/SendMessage";

const MessageSender = () => {
  const [{ userInfo, currentMessageUser, socket }, dispatch] =
    useStateProvider();

  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

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
        fileType: "text",
      });
      // socket event listener
      socket.current.emit("send_message", {
        ...data.data,
      });
      // socket event listener
      // socket.current.emit("update_message", {
      //   ...data.data,
      // });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-panel-header-background2 py-3 px-8 relative w-full overflow-hidden">
      {/* container */}
      {isRecording ? (
        <AudioRecorder
          isRecording={isRecording}
          setIsRecording={setIsRecording}
        />
      ) : (
        <div className="flex items-center gap-7">
          <Emoji message={message} setMessage={setMessage} />
          <AttachFile />
          <MessageSenderInput message={message} setMessage={setMessage} />
          <SendMessage
            message={message}
            messageSend={handleMessageSender}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
          />
        </div>
      )}
    </div>
  );
};

export default MessageSender;
