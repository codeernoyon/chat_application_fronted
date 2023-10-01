import { useStateProvider } from "@/context/StateContext";
import { useEffect } from "react";
import Container from "./Container";

function VoiceCall() {
  const [{ userInfo, voiceCall, socket }] = useStateProvider();
  useEffect(() => {
    if (voiceCall.type === "out-going") {
      socket.current.emit("outgoing_voice_call", {
        receiver: voiceCall._id,
        sender: {
          id: userInfo._id,
          profileImage: userInfo.imageUrl,
          name: userInfo.name,
        },
        callType: voiceCall.callType,
        roomId: voiceCall.roomId,
      });
    }
  }, [voiceCall]);
  return (
    <div className="h-screen w-full">
      <Container data={voiceCall} />
    </div>
  );
}

export default VoiceCall;
