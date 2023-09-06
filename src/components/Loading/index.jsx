"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

function Loading() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    // ---- it's just vue component timer ---- //
    setTimeout(() => {
      setLoading(false);
    }, 6000);
    // ----- progress ber increment interval ----- //
    const interval = setInterval(() => {
      if (progress <= 100) {
        setProgress((prv) => prv + 1);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [loading]);
  return (
    <div
      className={` w-screen h-screen absolute top-0 left-0 bg-panel-header-background flex justify-center items-center flex-col gap-5 !z-[999] ${
        loading ? "block" : "hidden"
      }`}
    >
      <Image src="/whatsapp.gif" alt="whatsapp_icon" width={200} height={200} />
      <div
        className={`relative h-[5px] w-[300px] bg-slate-500 rounded overflow-hidden`}
      >
        <div
          className=" absolute top-0 left-0 h-[100%] bg-teal-600 rounded transition-all duration-100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-slate-500 text-xl">
        <span>End to End - encrypted</span>
      </div>
    </div>
  );
}

export default Loading;
