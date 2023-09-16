import { BsMic, BsSend } from "react-icons/bs";

const SendMessage = ({ message, messageSend, isRecording, setIsRecording }) => {
  // ********* handle show recording component ************
  const handleShowRecordingComponent = () => {
    setIsRecording(!isRecording);
  };
  return (
    <div className="text-[25px] text-slate-400 ">
      {!message ? (
        <div
          className={`cursor-pointer hover:text-slate-200`}
          onClick={handleShowRecordingComponent}
        >
          <BsMic />
        </div>
      ) : (
        <div onClick={messageSend}>
          <BsSend className="rotate-45 cursor-pointer hover:text-slate-200" />
        </div>
      )}
    </div>
  );
};

export default SendMessage;
