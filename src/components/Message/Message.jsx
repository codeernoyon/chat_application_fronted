import { useStateProvider } from "@/context/StateContext";
import EmptyMessage from "../Chatlist/Elements/EmptyMessage";
import MessageContainer from "./MessageContainer";
import MessageHeader from "./MessageHeader";
import MessageSender from "./MessageSender";

const Message = () => {
  const [{ showMessageCurrentUser }] = useStateProvider();
  return (
    <div className="col-span-9 w-full  ">
      {showMessageCurrentUser ? (
        <>
          <MessageHeader />
          <MessageContainer />
          <MessageSender />
        </>
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
};

export default Message;
