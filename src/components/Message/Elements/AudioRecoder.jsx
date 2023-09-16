import { timeFormater } from "@/utils/TimeFormater";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPlayCircleFill, BsPauseCircle, BsSend } from "react-icons/bs";
import WaveSurfer from "wavesurfer.js";

const AudioRecorder = ({ isRecording, setIsRecording }) => {
  const [startRecording, setStartRecording] = useState(isRecording);
  const [stopRecorder, setStopRecorder] = useState(false);
  const [duration, setDuration] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [renderAudio, setRenderAudio] = useState(null);
  const [waveSurfer, setWaveSurfer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // references
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const waveSurferRef = useRef(null);

  // handle stop recorder
  const handleStopRecorder = () => {
    setStopRecorder(!stopRecorder);
    if (mediaRecorderRef.current && startRecording) {
      mediaRecorderRef.current.stop();
      setStartRecording(false);

      // collect audio all chucks
      const audioChunks = [];
      mediaRecorderRef.current.addEventListener("dataavaliable", (e) => {
        audioChunks.push(e.data);
      });

      mediaRecorderRef.current.addEventListener("stop", async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        const audioFile = new File([audioBlob], "recording.mp3");
        setRenderAudio(audioFile);
        setIsPlaying(false);
      });
    }
  };

  // close recorder component
  const handleCloseRecorder = () => {
    setIsRecording(!isRecording);
    setDuration(0);
    setTotalDuration(0);
    setStopRecorder(!stopRecorder);
  };

  // handle play recording
  const handlePlayAudio = () => {
    if (recordedAudio) {
      recordedAudio.play();
      waveSurfer.stop();
      waveSurfer.play();
    }
  };
  // create wave surfer
  useEffect(() => {
    console.log("create");
    const wave = WaveSurfer.create({
      container: waveSurferRef.current,
      waveColor: "green",
      progressColor: "#383351",
      cursorColor: "#7ae3c3",
      barWidth: 2,
      height: 30,
      responsive: true,
    });
    setWaveSurfer(wave);
    wave.on("finish", () => {
      setIsPlaying(false);
    });
    console.log("finished");

    return () => {
      wave.destroy();
    };
  }, []);
  // start recording in useEffect
  useEffect(() => {
    if (!startRecording) return;

    if (startRecording) {
      setDuration(0);
      setTotalDuration(0);
      setIsPlaying(true);
      const handleRecording = async () => {
        try {
          navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
              const mediaRecorder = new MediaRecorder(stream);
              mediaRecorderRef.current = mediaRecorder;
              audioRef.current.srcObject = stream;

              // chunks from audio
              const chunks = [];
              mediaRecorder.ondataavailable = (e) => {
                chunks.push(e.data);
              };
              mediaRecorder.onstop = async () => {
                const blob = new Blob(chunks, {
                  type: "audio/ogg; cosecs=opus",
                });
                const audioUrl = URL.createObjectURL(blob);
                const audio = new Audio(audioUrl);
                setRecordedAudio(audio);
                console.log(waveSurfer);
                if (waveSurfer) waveSurfer.load(audioUrl);
              };

              mediaRecorder.start();
            });
        } catch (error) {
          console.error("Error accessing microphone");
        }
      };
      handleRecording();
    }
  }, [startRecording, waveSurfer]);

  // set duration
  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        setDuration((prvD) => {
          setTotalDuration(prvD + 1);
          return prvD + 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  return (
    <div className="flex justify-center items-center gap-5 w-full text-[25px]">
      {/* delete recorded message icon */}
      <div className="cursor-pointer" onClick={handleCloseRecorder}>
        <AiFillDelete />
      </div>

      {/* recording wave play and send */}
      <div className="border-[1px] border-green-500 bg-panel-header-background rounded-full px-5 py-2 flex gap-3 items-center text-[20px] w-fit">
        {/* play icon */}

        <BsFillPlayCircleFill
          className="cursor-pointer"
          onClick={handlePlayAudio}
        />

        {/* wave reader */}
        <div className="w-44 flex  items-center gap-2 justify-center">
          {/* wave */}
          <div className="w-full">
            {!stopRecorder && (
              <div className="w-full h-fit text-[18px] text-center text-red-500">
                Recording...
              </div>
            )}
            <div
              ref={waveSurferRef}
              className={`w-full ${!stopRecorder ? "hidden" : "block"}`}
            ></div>
          </div>

          {/* duration */}
          <div>
            <span className="text-sm text-slate-400">
              {timeFormater(duration)}s
            </span>
          </div>
        </div>
        {/* message send icon */}
        <BsSend className="rotate-45 cursor-pointer" />
      </div>
      {/* pause icon */}
      <div className=" cursor-pointer w-fit">
        {stopRecorder ? (
          <BsFillPlayCircleFill
            className=" text-green-500"
            onClick={() => {
              setStartRecording(true), setStopRecorder(false);
            }}
          />
        ) : (
          <BsPauseCircle
            className="text-red-600"
            onClick={handleStopRecorder}
          />
        )}
      </div>
      <audio ref={audioRef} hidden></audio>
    </div>
  );
};

export default AudioRecorder;
