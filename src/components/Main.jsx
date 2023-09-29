import { useStateProvider } from "@/context/StateContext";
import { reducerCase } from "@/context/constants";
import { HOST } from "@/utils/ApiRoutes";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import VideoCall from "./Call/VideoCall";
import VoiceCall from "./Call/VoiceCall";
import ChatList from "./Chatlist/ChatList";
import Message from "./Message/Message";

function Main() {
  const [{ userInfo, voiceCall, videoCall }, dispatch] = useStateProvider();
  const socket = useRef();
  const [oneTimeRunSocketEvent, setOneTimeRunSocketEvent] = useState(false);
  const [oneTimeRunSocketEvent2, setOneTimeRunSocketEvent2] = useState(false);

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
      socket.current.on("message_update_receive", (data) => {
        console.log(data);
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
      {voiceCall && <VoiceCall />}
      {videoCall && <VideoCall />}
      {!voiceCall && !videoCall && (
        <>
          <ChatList />
          <Message />
        </>
      )}
    </div>
  );
}

export default Main;
