import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { BsEmojiLaughing } from "react-icons/bs";

const Emoji = ({ message, setMessage }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const ref = useRef();
  // handle emoji picker function
  const handleEmojiPicker = () => {
    setShowEmojiPicker(true);
  };
  // handle a function send emoji in massage state
  const handleEmojiSend = (emoji) => {
    setMessage((message) => message + emoji.emoji);
  };

  useEffect(() => {
    const outSideClickEmojiPicker = (e) => {
      if (e.target.id !== "emoji-picker") {
        if (ref.current && !ref.current.contains(e.target)) {
          setShowEmojiPicker(false);
        }
      }
    };
    document.addEventListener("click", outSideClickEmojiPicker);
    return () => {
      document.removeEventListener("click", outSideClickEmojiPicker);
    };
  }, []);
  return (
    <div
      className="text-[25px] text-slate-400 cursor-pointer hover:text-slate-200 "
      id="emoji-picker"
      ref={ref}
    >
      <BsEmojiLaughing onClick={() => handleEmojiPicker()} />
      <div
        className={`absolute bottom-[110%] z-[99] ${
          showEmojiPicker ? "block" : "hidden"
        }`}
        id="emoji-picker"
      >
        <EmojiPicker onEmojiClick={handleEmojiSend} />
      </div>
    </div>
  );
};

export default Emoji;
