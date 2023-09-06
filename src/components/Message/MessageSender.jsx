import AttachFile from "./Elements/AttachFile";
import Emoji from "./Elements/Emoji";
import MessageSenderInput from "./Elements/MessageSenderInput";

const MessageSender = () => (
  <div>
    {/* container */}
    <div>
      <Emoji />
      <AttachFile />
      <MessageSenderInput />
    </div>
  </div>
);

export default MessageSender;
