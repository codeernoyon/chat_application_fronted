import { useStateProvider } from "@/context/StateContext";
import { reducerCase } from "@/context/constants";
import { HOST } from "@/utils/ApiRoutes";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import VideoCall from "./Call/VideoCall";
import VoiceCall from "./Call/VoiceCall";
import ChatList from "./Chatlist/ChatList";
import Message from "./Message/Message";
import IncomingCall from "./common/IncomingCall";
import IncomingVideoCall from "./common/IncomingVideoCall";

function Main() {
  const [
    { userInfo, voiceCall, videoCall, incomingVoiceCall, incomingVideoCall },
    dispatch,
  ] = useStateProvider();
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
    /**
     * check socket event
     */
    if (socket.current && !oneTimeRunSocketEvent) {
      /**
       * it's event for receive message
       */
      socket.current.on("message_receive", (data) => {
        dispatch({
          type: reducerCase.ADD_MESSAGE,
          newMessage: { ...data },
        });
      });
      /**
       * it's event for incoming voice call
       */
      socket.current.on(
        "incoming_voice_call",
        ({ sender, roomId, callType }) => {
          dispatch({
            type: reducerCase.INCOMING_VOICE_CALL,
            incomingVoiceCall: {
              ...sender,
              roomId,
              callType,
            },
          });
        }
      );
      /**
       * it's event for incoming video call
       */
      socket.current.on(
        "incoming_video_call",
        ({ sender, roomId, callType }) => {
          console.log(sender);
          dispatch({
            type: reducerCase.INCOMING_VIDEO_CALL,
            incomingVideoCall: {
              ...sender,
              roomId,
              callType,
            },
          });
        }
      );
      /**
       * it's event for  reject voice call
       */
      socket.current.on("voice_call_rejected", () => {
        dispatch({
          type: reducerCase.END_CALL,
        });
      });
      /**
       * it's event for  reject video call
       */
      socket.current.on("video_call_rejected", () => {
        dispatch({
          type: reducerCase.END_CALL,
        });
      });
      setOneTimeRunSocketEvent(true);
    }
  }, [socket.current]);

  return (
    <div className="w-full h-full relative grid grid-flow-col text-slate-300">
      {incomingVideoCall && <IncomingVideoCall />}
      {incomingVoiceCall && <IncomingCall />}
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
