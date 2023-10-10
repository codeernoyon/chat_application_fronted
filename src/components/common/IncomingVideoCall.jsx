import { useStateProvider } from "@/context/StateContext";
import { usePeer } from "@/context/WebRTC";
import { reducerCase } from "@/context/constants";
import IncomingCall from "./IncomingCall";

function IncomingVideoCall() {
  const [{ incomingVideoCall, socket, WRTCPeer }, dispatch] = useStateProvider();
 const {createAnswer} = usePeer()
  /**
   * handle function for accept call
   */
  const handleAcceptCall =async  () => {
   

    dispatch({
      type: reducerCase.VIDEO_CALL,
      videoCall: {
        ...incomingVideoCall,
        callType: "in_coming_video",
      },
    });

    socket.current.emit("accept_incoming_call", {
      id: incomingVideoCall.id,
      answer: await createAnswer(incomingVideoCall?.offer)
    });
    
    dispatch({
      type: reducerCase.INCOMING_VIDEO_CALL,
      incomingVideoCall: undefined,
    });
  };
  /**
   * handle function for reject call
   */
  const handleRejectCall = () => {
    socket.current.emit("reject_video_call", { id: incomingVideoCall?.id });
    dispatch({
      type: reducerCase.END_CALL,
    });
  };
  return (
    <>
      <IncomingCall callData={...incomingVideoCall} handleAcceptCall={handleAcceptCall} handleRejectCall={handleRejectCall} />
    </>
  );
}

export default IncomingVideoCall;
