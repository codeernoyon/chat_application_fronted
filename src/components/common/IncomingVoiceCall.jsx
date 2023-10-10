


import { useStateProvider } from "@/context/StateContext";
import { reducerCase } from "@/context/constants";
import IncomingCall from "./IncomingCall";

function IncomingVoiceCall() {
  const [{ incomingVoiceCall, socket }, dispatch] = useStateProvider();
  /**
   * handle function for accept call
   */
  const handleAcceptCall = () => {
    dispatch({
      type: reducerCase.VOICE_CALL,
      voiceCall: {
        ...incomingVoiceCall,
        callType: "in_coming_voice",
      },
    });
    socket.current.emit("accept_incoming_call", {
      id: incomingVoiceCall.id,
    });
    dispatch({
      type: reducerCase.INCOMING_VOICE_CALL,
      incomingVoiceCall: undefined,
    });
  };
  /**
   * handle function for reject call
   */
  const handleRejectCall = () => {
    socket.current.emit("reject_video_call", { id: incomingVoiceCall?.id });
    dispatch({
      type: reducerCase.END_CALL,
    });
  };

  return (
    <>
      <IncomingCall callData={...incomingVoiceCall} handleAcceptCall={handleAcceptCall} handleRejectCall={handleRejectCall} />
    </>
  );
}

export default IncomingVoiceCall;
