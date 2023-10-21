import { useStateProvider } from "@/context/StateContext";
import { usePeer } from "@/context/WebRTC";
import { reducerCase } from "@/context/constants";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsTelephoneFill } from "react-icons/bs";
import ReactPlayer from "react-player";

function Container({ data }) {
  const { sendStream, remoteStream } = usePeer();
  const [{ socket, WRTCPeer, WRTCAnswer }, dispatch] = useStateProvider();
  const [acceptCall, setAcceptCall] = useState(false);
  const [stream, setStream] = useState(null);
  // handle end call
  const handleEndCall = () => {
    if (data.callType === "voiceCall") {
      socket.current.emit("reject_voice_call", { id: data._id });
    } else {
      socket.current.emit("reject_video_call", { id: data._id });
    }
    dispatch({
      type: reducerCase.END_CALL,
    });
  };
  const getStream = async () => {
    if (data.callType === "videoCall") {
      const strm = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      sendStream(strm);
      setStream(strm);
    }
  };
  useEffect(() => {
    getStream();
  }, []);

  return (
    <div className="h-full w-full flex justify-center items-center flex-col gap-7 relative">
      {data?.callType === "videoCall" && (
        <div>
          <ReactPlayer
            url={stream}
            muted
            playing
            width={remoteStream ? "30%" : "100%"}
            height={remoteStream ? "30%" : "100%"}
            className={`fixed text-center h-[100vh] ${
              remoteStream ? "right-10 top-10" : "top-0 left-0"
            } z-[2]`}
          />
          {remoteStream && (
            <ReactPlayer
              url={remoteStream}
              muted
              playing
              width="100%"
              height="100%"
              className="absolute bottom-0 left-0 z-[1]"
            />
          )}
        </div>
      )}
      {data?.callType === "in_coming_video" && (
        <div>
          <ReactPlayer
            url={stream}
            muted
            playing
            width={remoteStream ? "30%" : "100%"}
            height={remoteStream ? "30%" : "100%"}
            className={`absolute ${
              remoteStream ? "right-10 top-10" : "top-0 left-0"
            } z-[2]`}
          />
          {remoteStream && (
            <ReactPlayer
              url={remoteStream}
              muted
              playing
              width="100%"
              height="100%"
              className="absolute bottom-0 left-0 z-[1]"
            />
          )}
        </div>
      )}
      {/* name */}
      <div className="flex flex-col items-center gap-2 z-[30]">
        <span className="text-3xl font-semibold">{data?.name}</span>
        <span className="text-sm">
          {data?.callType === "videoCall" ? "On going call..." : "calling..."}
        </span>
      </div>
      {/* caller image */}
      {!acceptCall && data?.callType === "voiceCall" && (
        <Image
          src={data?.imageUrl}
          alt="photo"
          height={200}
          width={200}
          className="rounded-full"
        />
      )}
      {/* End call */}
      <div
        className="absolute bottom-20 left-[50%] translate-x-[-50%] px-6 py-6 rounded-full bg-red-500 cursor-pointer z-[30]"
        onClick={handleEndCall}
      >
        <BsTelephoneFill className="text-[20px]" />
      </div>
    </div>
  );
}

export default Container;
