import { useStateProvider } from "@/context/StateContext";
import dynamic from "next/dynamic";
import EmptyMessage from "../Chatlist/Elements/EmptyMessage";
import LoadingBar from "../LoadingBer.js";
import MessageHeader from "./MessageHeader";
import MessageSender from "./MessageSender";
const MessageContainer = dynamic(() => import("./MessageContainer"), {
  loading: () => <LoadingBar />,
});

const Message = () => {
  const [{ showMessageCurrentUser, loading }] = useStateProvider();
  return (
    <div className="col-span-9 w-full  ">
      {showMessageCurrentUser ? (
        <>
          <MessageHeader />
          {loading ? <LoadingBar /> : <MessageContainer />}
          <MessageSender />
        </>
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
};

export default Message;
