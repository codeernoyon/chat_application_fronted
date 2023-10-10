import { BsCheck, BsCheckAll } from "react-icons/bs";

function MessageStatus({ messageStatus }) {
  return (
    <div>
      {messageStatus === "sent" && <BsCheck className="text-[20px]" />}
      {messageStatus === "deliver" && <BsCheckAll className="text-[20px]" />}
      {messageStatus === "read" && (
        <BsCheckAll className="text-[20px] text-cyan-500" />
      )}
    </div>
  );
}

export default MessageStatus;
