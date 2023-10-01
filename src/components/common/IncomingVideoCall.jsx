import { useStateProvider } from "@/context/StateContext";
import Image from "next/image";
import Button from "./Button";

function IncomingVideoCall() {
  const [{ incomingVideoCall }, dispatch] = useStateProvider();
  console.log(incomingVideoCall);
  /**
   * handle function for accept call
   */
  const handleAcceptCall = () => {};
  /**
   * handle function for reject call
   */
  const handleRejectCall = () => {};
  return (
    <div className="fixed right-10 top-20 px-12 py-7 border-[2px] border-green-600 rounded-xl bg-panel-header-background z-[999]">
      <div className="h-full w-full flex flex-col gap-5">
        {/* ------- info -------- */}
        <div className="flex items-center gap-5">
          <Image
            src={incomingVideoCall?.profileImage}
            alt="photo"
            width={70}
            height={70}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-[24px] font-semibold">
              {incomingVideoCall?.name}
            </span>
            <span className="text-sm">Incoming video calls...</span>
          </div>
        </div>
        {/* ------ buttons ------- */}
        <div className="flex justify-between items-center gap-10 w-full">
          {/* accept */}
          <Button
            title="Accept"
            className="bg-green-600 px-10 py-2 rounded-full font-semibold"
            onClick={handleAcceptCall}
          />
          {/* reject */}
          <Button
            title="Reject"
            className="bg-red-600 px-10 py-2 rounded-full font-semibold"
            onClick={handleRejectCall}
          />
        </div>
      </div>
    </div>
  );
}

export default IncomingVideoCall;
