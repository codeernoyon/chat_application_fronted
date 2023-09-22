import { useStateProvider } from "@/context/StateContext";
import ChatListHeader from "./ChatListHeader";
import ChatListItems from "./Elements/ChatListItems";
import ChatListSlide from "./Elements/ChatListSlide";

function ChatList() {
  // get data from global state
  const [{ showSlide }] = useStateProvider();
  const { status, option } = showSlide;

  return (
    <div className="relative w-full col-span-3 min-h-screen border-r-[1px] border-slate-600">
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
