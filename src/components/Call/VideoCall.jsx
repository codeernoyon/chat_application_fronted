import { useStateProvider } from "@/context/StateContext";
import { useEffect } from "react";
import Container from "./Container";

function VideoCall() {
  const [{ userInfo, videoCall, socket }, dispatch] = useStateProvider();

  useEffect(() => {
    if (videoCall.type === "out_going") {
      socket.current.emit("outgoing_video_call", {
        receiver: videoCall._id,
        sender: {
          id: userInfo._id,
          profileImage: userInfo.imageUrl,
          name: userInfo.name,
        },
        callType: videoCall.callType,
        roomId: videoCall.roomId,
      });
    }
  }, [videoCall]);
  return (
    <div className="h-screen w-full">
      <Container data={videoCall} />
    </div>
  );
}

export default VideoCall;
