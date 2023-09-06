import ChatList from "./Chatlist/ChatList";
import Message from "./Message/Message";

function Main() {
  return (
    <div className="min-w-screen min-h-screen relative grid grid-flow-col text-slate-300">
      <ChatList />
      <Message />
    </div>
  );
}

export default Main;
