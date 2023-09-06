import { useState } from "react";
import AttachFile from "./Elements/AttachFile";
import Emoji from "./Elements/Emoji";
import MessageSenderInput from "./Elements/MessageSenderInput";
import SendMessage from "./Elements/SendMessage";

const MessageSender = () => {
  const [message, setMessage] = useState("");
  return (
    <div className="bg-panel-header-background2 py-3 px-8">
      {/* container */}
      <div className="flex items-center gap-7">
        <Emoji />
        <AttachFile />
        <MessageSenderInput message={message} setMessage={setMessage} />
        <SendMessage message={message} setMessage={setMessage} />
      </div>
    </div>
  );
};

export default MessageSender;
