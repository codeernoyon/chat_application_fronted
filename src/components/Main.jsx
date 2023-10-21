import { useStateProvider } from "@/context/StateContext";
import { usePeer } from "@/context/WebRTC";
import { reducerCase } from "@/context/constants";
import { HOST, UPDATEMESSAGES } from "@/utils/ApiRoutes";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import VideoCall from "./Call/VideoCall";
import VoiceCall from "./Call/VoiceCall";
import ChatList from "./Chatlist/ChatList";
import Message from "./Message/Message";
import IncomingVideoCall from "./common/IncomingVideoCall";
import IncomingVoiceCall from "./common/IncomingVoiceCall";

function Main() {
  const { setRemoteAns } = usePeer();
  const [
    {
      userInfo,
      voiceCall,
      videoCall,
      incomingVoiceCall,
      incomingVideoCall,
      WRTCPeer,
    },
    dispatch,
  ] = useStateProvider();
  const socket = useRef();
  const [oneTimeRunSocketEvent, setOneTimeRunSocketEvent] = useState(false);

  // socket io set for client and add global state
  useEffect(() => {
    const handleFunction = async () => {
      if (userInfo) {
        socket.current = io(HOST);
        socket.current.emit("add_user", userInfo._id);
        dispatch({
          type: reducerCase.SET_SOCKET,
          socket,
        });
        try {
          // api hit url and get all messages
          await axios.get(`${UPDATEMESSAGES}/${userInfo?._id}`);
        } catch (error) {
          console.log(error);
        }
      }
    };
    handleFunction();
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
       * it's event for incoming accept && set answer call
       */
      socket.current.on("accept_call", async ({ answer }) => {
        await setRemoteAns(answer);
      });
      /**
       * it's event for incoming video call
       */
      socket.current.on(
        "incoming_video_call",
        ({ sender, roomId, callType, offer }) => {
          dispatch({
            type: reducerCase.INCOMING_VIDEO_CALL,
            incomingVideoCall: {
              ...sender,
              roomId,
              callType,
              offer,
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
      return () => {};
    }
  }, [userInfo, socket.current]);
  return (
    <div className="w-full h-full relative xl:grid xl:grid-flow-col text-slate-300">
      {incomingVoiceCall && <IncomingVoiceCall />}
      {incomingVideoCall && <IncomingVideoCall />}
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
