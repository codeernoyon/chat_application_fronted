import { useStateProvider } from "@/context/StateContext";
import { reducerCase } from "@/context/constants";
import { HOST } from "@/utils/ApiRoutes";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import ChatList from "./Chatlist/ChatList";
import Message from "./Message/Message";

function Main() {
  const [{ userInfo }, dispatch] = useStateProvider();
  const socket = useRef();
  const [oneTimeRunSocketEvent, setOneTimeRunSocketEvent] = useState(false);

  // socket io set for client and add global state
  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST);
      socket.current.emit("add_user", userInfo._id);
      dispatch({
        type: reducerCase.SET_SOCKET,
        socket,
      });
    }
  }, [userInfo]);

  // one time run socket event
  useEffect(() => {
    if (socket.current && !oneTimeRunSocketEvent) {
      socket.current.on("message_receive", (data) => {
        dispatch({
          type: reducerCase.ADD_MESSAGE,
          newMessage: { ...data },
        });
      });
    }
    setOneTimeRunSocketEvent(true);
  }, [socket.current]);
  return (
    <div className="min-w-screen min-h-screen relative grid grid-flow-col text-slate-300">
      <ChatList />
      <Message />
    </div>
  );
}

export default Main;
