import { useStateProvider } from "@/context/StateContext";
import { reducerCase } from "@/context/constants";
import Image from "next/image";
import { useState } from "react";
import { BsTelephoneFill } from "react-icons/bs";

function Container({ data }) {
  const [{ voiceCall }, dispatch] = useStateProvider();
  const [acceptCall, setAcceptCall] = useState(false);
  // handle end call
  const handleEndCall = () => {
    dispatch({
      type: reducerCase.END_CALL,
    });
  };

  return (
    <div className="h-full w-full flex justify-center items-center flex-col gap-7 relative">
      {/* name */}
      <div className="flex flex-col items-center gap-2">
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
        className="absolute bottom-5 left-[50%] translate-x-[-50%] px-6 py-6 rounded-full bg-red-500 cursor-pointer"
        onClick={handleEndCall}
      >
        <BsTelephoneFill className="text-[20px]" />
      </div>
    </div>
  );
}

export default Container;
