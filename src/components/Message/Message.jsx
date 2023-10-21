import { useStateProvider } from "@/context/StateContext";
import dynamic from "next/dynamic";
import EmptyMessage from "../Chatlist/Elements/EmptyMessage";
import LoadingBar from "../LoadingBer.js";
import MessageHeader from "./MessageHeader";
import MessageSender from "./MessageSender";
const MessageContainer = dynamic(() => import("./MessageContainer"), {
  loading: () => <LoadingBar />,
  ssr: false,
});

const Message = () => {
  const [{ showMessageCurrentUser, loading, showSmDeviceMessage }] =
    useStateProvider();
  return (
    <div
      className={`h-screen w-screen xl:h-full xl:w-full absolute top-0 left-[-105%] xl:left-0 xl:relative xl:col-span-9 ${
        showSmDeviceMessage ? "z-[99991] left-[0%]" : "z-[0]"
      }`}
    >
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
