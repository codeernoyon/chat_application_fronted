import { HOST } from "@/utils/ApiRoutes";
import { timeFormater } from "@/utils/TimeFormater";
import { useEffect, useRef, useState } from "react";
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from "react-icons/bs";
import WaveSurfer from "wavesurfer.js";

const AudioMessage = ({ message }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioMessage, setAudioMessage] = useState(null);
  //   references
  const waveMessageSurferRef = useRef(null);
  const waveFrom = useRef(null);
  // handle play recording
  const handlePlayAudio = () => {
    if (audioMessage) {
      audioMessage.play();
      setIsPlaying(true);
    }
  };
  // handle pause recording
  const handlePauseAudio = () => {
    audioMessage.pause();
    setIsPlaying(false);
  };
  useEffect(() => {
    const setMessage = () => {
      const audioUrl = `${HOST}/${message.message}`;
      const audio = new Audio(audioUrl);
      setAudioMessage(audio);
      if (waveFrom.current) {
        waveFrom.current.load(audioUrl);
        waveFrom.current.on("ready", () => {
          setDuration(waveFrom.current.getDuration());
        });
      }
    };
    setMessage();
  }, [message.message]);
  // create wave surfer
  useEffect(() => {
    if (waveFrom.current === null) {
      waveFrom.current = WaveSurfer.create({
        container: waveMessageSurferRef.current,
        waveColor: "#ccc",
        progressColor: "#4a9eff",
        cursorColor: "#7ae3c3",
        barWidth: 2,
        height: 30,
        responsive: true,
      });

      waveFrom.current.on("finish", () => {
        setIsPlaying(false);
      });
    }
    return () => {
      waveFrom.current.destroy();
    };
  }, []);

  return (
    <div className=" px-5 py-1 flex gap-3 items-center text-[20px] w-fit">
      {/* play icon */}
      {isPlaying ? (
        <BsFillPauseCircleFill
          className="cursor-pointer text-green-600"
          onClick={handlePauseAudio}
        />
      ) : (
        <BsFillPlayCircleFill
          className="cursor-pointer"
          onClick={handlePlayAudio}
        />
      )}

      {/* wave reader */}
      <div className=" relative w-44 flex items-center gap-2 justify-center">
        {/* wave */}
        <div className="w-full">
          <div ref={waveMessageSurferRef} className={`w-full `}></div>
        </div>

        {/* duration */}
        <div>
          <span className="text-sm text-slate-400">
            {timeFormater(duration)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AudioMessage;
