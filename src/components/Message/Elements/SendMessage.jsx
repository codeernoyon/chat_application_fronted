import { BsMic, BsSend } from "react-icons/bs";

const SendMessage = ({ message }) => {
  return (
    <div className="text-[25px] text-slate-400 hover:text-slate-200 cursor-pointer">
      {!message ? (
        <div>
          <BsMic />
        </div>
      ) : (
        <div>
          <BsSend className="rotate-45" />
        </div>
      )}
    </div>
  );
};

export default SendMessage;
