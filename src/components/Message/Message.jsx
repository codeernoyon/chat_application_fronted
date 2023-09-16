import { useStateProvider } from "@/context/StateContext";
import dynamic from "next/dynamic";
import EmptyMessage from "../Chatlist/Elements/EmptyMessage";
import MessageHeader from "./MessageHeader";
import MessageSender from "./MessageSender";
const MessageContainer = dynamic(() => import("./MessageContainer"), {
  loading: () => <p>loading .....</p>,
});

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
