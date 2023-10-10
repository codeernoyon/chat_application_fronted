import { useStateProvider } from "@/context/StateContext";
import { usePeer } from "@/context/WebRTC";
import { useEffect } from "react";
import Container from "./Container";

function VideoCall() {
  const [{ userInfo, videoCall, socket }, dispatch] = useStateProvider();
  const { offer } = usePeer();
  // listen socket event
  useEffect(() => {
    const functionCall = async () => {
      if (videoCall.type === "out_going") {
        //  * create offer video call

        socket.current.emit("outgoing_video_call", {
          receiver: videoCall._id,
          sender: {
            id: userInfo._id,
            profileImage: userInfo.imageUrl,
            name: userInfo.name,
          },
          callType: videoCall.callType,
          roomId: videoCall.roomId,
          offer: await offer(),
        });
      }
    };
    functionCall();
  }, [videoCall]);

  return (
    <div className="h-screen w-full">
      <Container data={videoCall} />
    </div>
  );
}

export default VideoCall;
