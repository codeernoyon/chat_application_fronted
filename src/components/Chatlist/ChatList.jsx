import { useStateProvider } from "@/context/StateContext";
import dynamic from "next/dynamic";
import ChatListHeader from "./ChatListHeader";
import ChatListItems from "./Elements/ChatListItems";
const ChatListSlide = dynamic(() => import("./Elements/ChatListSlide"), {
  ssr: false,
});

function ChatList() {
  // get data from global state
  const [{ showSlide }] = useStateProvider();
  const { status, option } = showSlide;

  return (
    <div className="relative w-screen h-screen  xl:w-full xl:col-span-3 xl:border-r-[1px] border-slate-600">
      {/* chat list slide */}
      <ChatListSlide status={status} option={option} />
      {/* chat list header */}
      <ChatListHeader />
      {/* all chat list items */}
      <ChatListItems />
    </div>
  );
}

export default ChatList;
